#!/usr/bin/env node
/**
 * The Power of 10+ mark for dark backgrounds (Technology hero), made from the white-background
 * original in images-src: the white turns transparent and "THE POWER OF" turns white.
 *
 *   node scripts/p10-logo-on-dark.mjs
 *
 * Grey pixels (the lettering) become white, with their distance from white as opacity. Coloured
 * pixels stay opaque except along the anti-aliased edge, which is "unmultiplied" from white so it
 * keeps its hue instead of leaving a white fringe.
 */
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'images-src/sdvoe-alliance-introduces-the-power-of-10.jpg');
const OUT = join(root, 'src/lib/assets/img/power-of-10-logo-on-dark.webp');
const WIDTH = 560;

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const px = Buffer.alloc(width * height * 4);
let [x0, y0, x1, y1] = [width, height, 0, 0];

for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
	const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
	// jpeg noise around the white: anything this close to white is background
	const a = Math.max(0, 255 - Math.min(r, g, b) - 6) / 249;
	if (a <= 0) continue;
	let R, G, B, A;
	if (Math.max(r, g, b) - Math.min(r, g, b) < 24) {
		// the lettering is a neutral dark grey: white, with its anti-aliasing as opacity
		[R, G, B, A] = [255, 255, 255, Math.min(1, a * 1.25)]; // the grey (#333) is a = 0.8: solid white
	} else {
		// colours: the pale tints of the ring are solid colour, not white showing through, so they
		// stay opaque; only the thin anti-aliased edge (the palest pixels) becomes see-through
		A = Math.min(1, a * 3);
		const un = (c) => Math.max(0, Math.min(255, Math.round((c - (1 - A) * 255) / A)));
		[R, G, B] = [un(r), un(g), un(b)];
	}
	px.set([R, G, B, Math.round(A * 255)], j);
	const p = j / 4;
	const [x, y] = [p % width, Math.floor(p / width)];
	if (a > 0.1) [x0, y0, x1, y1] = [Math.min(x0, x), Math.min(y0, y), Math.max(x1, x), Math.max(y1, y)];
}

const pad = 4;
await sharp(px, { raw: { width, height, channels: 4 } })
	.extract({ left: x0 - pad, top: y0 - pad, width: x1 - x0 + 1 + 2 * pad, height: y1 - y0 + 1 + 2 * pad })
	.resize({ width: WIDTH })
	.webp({ quality: 90, alphaQuality: 100 })
	.toFile(OUT)
	.then((i) => console.log(`${OUT}: ${i.width}×${i.height}, ${(i.size / 1024).toFixed(1)} kB`));

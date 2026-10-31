#!/usr/bin/env node
/**
 * Recolours photos into the SDVoE palette while keeping their light: every pixel keeps its own
 * perceptual brightness (OKLab L), only hue and colourfulness are replaced, taken from a ramp
 * through the brand colours — deep navy in the shadows, Deep Blue (#0C67BA) in the mid-tones,
 * Sky Blue (#31A3E3) towards the highlights, an icy white at the top. Highlights, gloss and
 * depth stay where they were; the original hues go, so different photos read as one set.
 *
 *   npm run tint                       # the Explore SDVoE card backgrounds
 *   npm run tint -- --out <dir>        # write somewhere else (to preview)
 *
 * Quality: the maths runs in floating point on the full-colour original (not on an 8-bit grey
 * copy), with a touch of dithering, so smooth gradients don't band.
 *
 * Originals live in images-src/; the results replace the WebP files in src/lib/assets/img/,
 * so run this after `npm run images` if that ever regenerates them.
 */
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const OUT = args.includes('--out') ? args[args.indexOf('--out') + 1] : join(root, 'src/lib/assets/img');

const FILES = ['explore-certified-bg', 'explore-ten-bg', 'explore-academy-bg', 'explore-alliance-bg'];
const WIDTH = 1200; // cards are at most ~420px wide, so 2x plus margin
const QUALITY = 84;

// Colour anchors: their hue and colourfulness are used at their own brightness
const ANCHORS = ['#020814', '#08305e', '#0c67ba', '#31a3e3', '#e8f6ff'];
// A light S-curve on brightness (0 = none) for a bit more depth and sparkle
const CONTRAST = 0.18;

// ── OKLab ──
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
function rgbToLab(r, g, b) {
	const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
	const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
	const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
	return [
		0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
		1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
		0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
	];
}
function labToRgb(L, a, b) {
	const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
	return [
		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
	];
}
const hexLch = (hex) => {
	const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255));
	const [L, a, bb] = rgbToLab(r, g, b);
	return [L, Math.hypot(a, bb), Math.atan2(bb, a)];
};
const anchors = ANCHORS.map(hexLch);

// Brightness → linear RGB, precomputed. Chroma and hue come from the anchors around that
// brightness; chroma is reduced if needed to stay inside sRGB.
const STEPS = 4096;
const lut = Array.from({ length: STEPS }, (_, i) => {
	const L = i / (STEPS - 1);
	let j = anchors.findIndex(([al]) => al >= L);
	if (j <= 0) j = j === 0 ? 1 : anchors.length - 1;
	const [l0, c0, h0] = anchors[j - 1];
	const [l1, c1, h1] = anchors[j];
	const k = Math.min(1, Math.max(0, (L - l0) / (l1 - l0)));
	let C = c0 + (c1 - c0) * k;
	const h = h0 + (h1 - h0) * k;
	for (;;) {
		const rgb = labToRgb(L, C * Math.cos(h), C * Math.sin(h));
		if (rgb.every((v) => v >= -1e-4 && v <= 1.0001) || C < 1e-3) return rgb.map((v) => Math.min(1, Math.max(0, v)));
		C *= 0.97;
	}
});

const sCurve = (x) => x + CONTRAST * (x * x * (3 - 2 * x) - x);

async function tint(name) {
	const { data, info } = await sharp(join(root, 'images-src', name + '.jpg'))
		.resize({ width: WIDTH, kernel: 'lanczos3' })
		.removeAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const n = info.width * info.height;
	const Ls = new Float32Array(n);
	for (let i = 0; i < n; i++) {
		const p = i * info.channels;
		Ls[i] = rgbToLab(toLinear(data[p] / 255), toLinear(data[p + 1] / 255), toLinear(data[p + 2] / 255))[0];
	}
	// stretch brightness between the 0.5th and 99.5th percentile, so dark and light photos use
	// the whole ramp without clipping their highlights
	const sorted = Float32Array.from(Ls).sort();
	const lo = sorted[Math.floor(n * 0.005)];
	const hi = sorted[Math.floor(n * 0.995)];
	const out = Buffer.alloc(n * 3);
	for (let i = 0; i < n; i++) {
		const t = sCurve(Math.min(1, Math.max(0, (Ls[i] - lo) / (hi - lo || 1))));
		const L = 0.06 + t * 0.92; // keep a little room at both ends
		const rgb = lut[Math.round(L * (STEPS - 1))];
		for (let c = 0; c < 3; c++) {
			const dither = Math.random() - 0.5; // ±½ step: no banding in smooth gradients
			out[i * 3 + c] = Math.min(255, Math.max(0, Math.round(toGamma(rgb[c]) * 255 + dither)));
		}
	}
	const target = join(OUT, name + '.webp');
	const res = await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
		.webp({ quality: QUALITY, smartSubsample: true })
		.toFile(target);
	console.log(`  ✓ ${name}.webp ${info.width}×${info.height} ${(res.size / 1024).toFixed(0)} KB`);
}

await mkdir(OUT, { recursive: true });
for (const f of FILES) await tint(f);

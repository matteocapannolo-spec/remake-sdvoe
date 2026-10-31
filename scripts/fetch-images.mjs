#!/usr/bin/env node
/**
 * Downloads every image the site references from sdvoe.org, optimizes it to WebP
 * and stores it in src/lib/assets/img/. After running it, the build is fully
 * self-contained: no request to sdvoe.org at runtime.
 *
 *   npm run images                 # download from https://sdvoe.org/wp-content/uploads/
 *   npm run images -- --from ./raw # convert files you already have in ./raw
 *   npm run images -- --force      # re-download files that already exist
 *
 * Image names are collected automatically from src/lib/content (JS and generated JSON) and the routes,
 * so new images are picked up without editing this script.
 */
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'src/lib/assets/img');
const ORIGIN = process.env.IMG_ORIGIN || 'https://sdvoe.org/wp-content/uploads/';
const args = process.argv.slice(2);
const FROM = args.includes('--from') ? args[args.indexOf('--from') + 1] : null;
const FORCE = args.includes('--force');
// --only name.jpg: (re)convert just that image, e.g. after adding it to `trim`
const ONLY = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

// Size rules: logos stay small, photos and diagrams get a generous width for retina.
// Full-bleed hero backgrounds get more pixels for wide retina screens.
const widthFor = (name) => (/^logo|avixa|-logo./.test(name) ? 360 : /^hero/.test(name) ? 2400 : 1600);
// Originals with a dark frame baked into the file: pixels to cut from every side (at the original size)
const trim = {
	'case-study-virginia-senate-00.jpg': 2
};
const qualityFor = (name) => (/diagram|drawing|timeline|logo/.test(name) ? 82 : 72);

async function walk(dir) {
	const out = [];
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) out.push(...(await walk(p)));
		else if (/\.(js|svelte|json)$/.test(e.name)) out.push(p);
	}
	return out;
}

async function collectNames() {
	const files = [...(await walk(join(root, 'src/lib/content'))), ...(await walk(join(root, 'src/routes'))), ...(await walk(join(root, 'src/lib/components')))];
	const names = new Set();
	for (const f of files) {
		const src = await readFile(f, 'utf8');
		// Quotes for JS/JSON, pipes for the case-study index rows in caseStudies.js
		for (const m of src.matchAll(/['"`|]([\w.-]+\.(?:jpg|jpeg|png))['"`|]/gi)) names.add(m[1]);
		for (const m of src.matchAll(/uploads\/([\w.-]+\.(?:jpg|jpeg|png))/gi)) names.add(m[1]);
	}
	return [...names].sort();
}

const exists = (p) => access(p).then(() => true, () => false);

async function load(name) {
	if (FROM) return readFile(join(FROM, name));
	const res = await fetch(ORIGIN + name);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return Buffer.from(await res.arrayBuffer());
}

async function main() {
	await mkdir(OUT, { recursive: true });
	const names = ONLY ? [ONLY] : await collectNames();
	console.log(`Found ${names.length} images referenced in the source.\n`);
	let done = 0, skipped = 0, failed = [];
	let before = 0, after = 0;
	for (const name of names) {
		const target = join(OUT, basename(name, extname(name)) + '.webp');
		if (!FORCE && !ONLY && (await exists(target))) {
			skipped++;
			continue;
		}
		try {
			const input = await load(name);
			// No flatten: PNGs keep their transparency (the white logo sits on dark surfaces)
			let img = sharp(input);
			if (trim[name]) {
				const { width, height } = await img.metadata();
				const t = trim[name];
				img = sharp(input).extract({ left: t, top: t, width: width - 2 * t, height: height - 2 * t });
			}
			const out = await img
				.resize({ width: widthFor(name), withoutEnlargement: true })
				.webp({ quality: qualityFor(name) })
				.toBuffer();
			await writeFile(target, out);
			before += input.length;
			after += out.length;
			done++;
			console.log(`  ✓ ${name.padEnd(60)} ${(input.length / 1024).toFixed(0).padStart(5)} KB → ${(out.length / 1024).toFixed(0).padStart(4)} KB`);
		} catch (e) {
			failed.push(`${name} (${e.message})`);
			console.log(`  ✗ ${name}: ${e.message}`);
		}
	}
	console.log(`\n${done} converted, ${skipped} already present, ${failed.length} failed.`);
	if (done) console.log(`Total ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB.`);
	if (failed.length) {
		console.log('\nImages that could not be fetched keep loading from sdvoe.org until fixed:');
		failed.forEach((f) => console.log('  - ' + f));
		process.exitCode = 1;
	}
}

main();

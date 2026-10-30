#!/usr/bin/env node
/**
 * Imports content from the current WordPress site through its public REST API.
 * Today: the full text of all case studies (child pages of /technology/case-studies/) and the
 * board of directors (names, companies, photos, biographies).
 *
 *   npm run import            # writes src/lib/content/generated/case-studies.json and board.json
 *   npm run import -- --dry   # prints what would be written
 *
 * The cleaner keeps the story (paragraphs, headings, lists, quotes, images) and drops
 * WordPress page-builder shortcodes and the boilerplate repeated on every case study
 * (benefits list, newsletter prompt, PDF link, trademark notice, "About <company>").
 * Run `npm run images` afterwards to copy the new images locally.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse } from 'node-html-parser';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = process.env.WP_API || 'https://sdvoe.org/wp-json/wp/v2';
const CASE_STUDIES_PARENT = 901; // page id of /technology/case-studies/
const DRY = process.argv.includes('--dry');

const BOILERPLATE = [
	/^SDVoE reaches beyond existing standards/i,
	/^For more information on the SDVoE Alliance/i,
	/^Keep up (to date|with the latest news)/i,
	/^To download the case study/i,
	/^SDVoE Alliance® is a registered trademark/i,
	/^(Download|Read more)\b/i,
	/^Topics$/i
];
// 'list': drop the list items that follow (images stay), stop at the next paragraph.
// 'section': drop everything up to the next heading (company profiles, product shots).
const DROP_SECTIONS = [
	[/^Benefits of SDVoE/i, 'list'],
	[/^About\s/i, 'section'],
	[/^Topics$/i, 'section'],
	[/^Stay informed$/i, 'section']
];
// Photo credits are kept even inside dropped sections; the trademark notice glued to them is not.
const CREDIT = /^(Video and photos|Photos?)\b/i;
const TRADEMARK_TAIL = /\s*(“Christie” is a trademark|DLP® is a registered trademark)[\s\S]*$/;
const dropModeFor = (t) => DROP_SECTIONS.find(([re]) => re.test(t))?.[1] ?? false;

const decode = (s) =>
	s
		.replace(/&#8217;|&rsquo;/g, '’')
		.replace(/&#8216;|&lsquo;/g, '‘')
		.replace(/&#8220;|&ldquo;/g, '“')
		.replace(/&#8221;|&rdquo;/g, '”')
		.replace(/&#8211;|&ndash;/g, '–')
		.replace(/&#8212;|&mdash;/g, '—')
		.replace(/&#038;|&amp;/g, '&')
		.replace(/&nbsp;/g, ' ')
		.replace(/&#\d+;/g, '');
const text = (el) => decode(el.textContent).replace(/\s+/g, ' ').trim();
// The page builder writes subheadings as <p><strong>Challenge</strong></p>
const isBoldLine = (el, t) => t.length < 100 && el.querySelectorAll('strong,b').map(text).join(' ').trim() === t;
// Thumbnails (name-300x93.jpg) are wrapped in a link to the full-size file: prefer that
const UPLOAD = /\/wp-content\/uploads\/(?:.*\/)?([^/?#]+\.(?:jpe?g|png))/i;
const uploadName = (url) => (url || '').match(UPLOAD)?.[1];

export function cleanContent(html) {
	const cleaned = html.replace(/\[\/?(vc_|mk_)[^\]]*\]/g, ' ');
	const doc = parse(cleaned);
	doc.querySelectorAll('script,style,form,iframe,noscript').forEach((e) => e.remove());

	const blocks = [];
	let dropping = false;
	for (const el of doc.querySelectorAll('h1,h2,h3,h4,p,li,blockquote,img')) {
		const tag = el.tagName.toLowerCase();
		if (tag === 'img') {
			const file = uploadName(el.closest('a')?.getAttribute('href')) ?? uploadName(el.getAttribute('src'));
			if (file && !/logo|icon/i.test(file) && dropping !== 'section') blocks.push({ type: 'img', src: file });
			continue;
		}
		if (tag !== 'li' && el.closest('li')) continue;
		if (tag !== 'blockquote' && el.closest('blockquote')) continue;
		const t = text(el);
		if (!t) continue;
		if (/^h\d$/.test(tag) || (tag === 'p' && isBoldLine(el, t))) {
			dropping = dropModeFor(t);
			if (!dropping) blocks.push({ type: 'h', text: t });
			continue;
		}
		if (tag === 'p' && CREDIT.test(t)) {
			blocks.push({ type: 'credit', text: t.replace(TRADEMARK_TAIL, '') });
			continue;
		}
		if (dropping === 'list' && tag === 'p' && !BOILERPLATE.some((re) => re.test(t))) dropping = false;
		if (dropping || BOILERPLATE.some((re) => re.test(t))) continue;
		if (tag === 'li') blocks.push({ type: 'li', text: t });
		else if (tag === 'blockquote') blocks.push({ type: 'q', text: t.replace(/^[“"]|[”"]$/g, '') });
		else blocks.push({ type: 'p', text: t });
	}
	// drop exact duplicates (page builders often repeat a block for mobile)
	const seen = new Set();
	return blocks.filter((b) => {
		const k = b.type + (b.text || b.src);
		if (seen.has(k)) return false;
		seen.add(k);
		return true;
	});
}

// Thumbnails with no link to the original: use the full-size file when the server has it
async function useFullSizeImages(cases) {
	const origin = API.replace(/\/wp-json\/.*$/, '/wp-content/uploads/');
	for (const b of cases.flatMap((c) => c.blocks)) {
		const full = b.type === 'img' && b.src.replace(/-\d+x\d+(\.\w+)$/, '$1');
		if (!full || full === b.src) continue;
		const res = await fetch(origin + full, { method: 'HEAD' }).catch(() => null);
		if (res?.ok) b.src = full;
	}
}

async function getJSON(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`WordPress API answered ${res.status} for ${url}`);
	return res.json();
}

async function writeGenerated(file, data) {
	if (DRY) return;
	const dir = join(root, 'src/lib/content/generated');
	await mkdir(dir, { recursive: true });
	await writeFile(join(dir, file), JSON.stringify(data, null, 1));
	console.log(`Wrote src/lib/content/generated/${file}`);
}

// Biography pages lose their <p> structure around the shortcodes (text sits outside any tag),
// so split on paragraph tags instead of parsing elements. Drops the title (h1), the
// "Board of directors" back link (h4) and the repeated name/company line.
function bioParagraphs(html, skip) {
	return html
		.replace(/\[\/?(vc_|mk_)[^\]]*\]/g, ' ')
		.replace(/<h\d[^>]*>[\s\S]*?<\/h\d>/g, ' ')
		.split(/<\/?p[^>]*>/)
		.map((chunk) => text(parse(chunk)))
		.filter((t) => t && !skip.includes(t))
		.map((t) => ({ type: 'p', text: t }));
}

// Board of directors: one page with a column per person (photo, <strong>name</strong> + company,
// link to a child page with the biography), under "President" and "Directors" headings.
async function importBoard() {
	const [page] = await getJSON(`${API}/pages?slug=board-of-directors&_fields=id,modified,content`);
	const html = page.content.rendered.replace(/&#8221;|&#8243;/g, '"');
	const people = [];
	let role = 'Director';
	for (const col of html.split(/\[vc_column(?=[\s\]])/)) {
		const heading = col.match(/<h\d[^>]*>([^<]+)<\/h\d>/)?.[1].trim();
		if (/^President$/i.test(heading)) role = 'President';
		if (/^Directors$/i.test(heading)) role = 'Director';
		const image = col.match(/vc_single_image image="(\d+)"/)?.[1];
		const slug = col.match(/link="https:\/\/sdvoe\.org\/board-of-directors\/([\w-]+)\/?"/)?.[1];
		const caption = col.match(/\[vc_column_text[^\]]*\]([\s\S]*?)\[\/vc_column_text\]/)?.[1];
		if (!image || !slug || !caption) continue;
		const name = text(parse(caption.match(/<strong>([\s\S]*?)<\/strong>/)?.[1] ?? ''));
		const company = text(parse(caption.replace(/<strong>[\s\S]*?<\/strong>/, '')));
		people.push({ slug, name, company, role, image });
	}

	const media = await getJSON(`${API}/media?include=${people.map((p) => p.image).join(',')}&per_page=100&_fields=id,source_url`);
	const bios = await getJSON(`${API}/pages?slug=${people.map((p) => p.slug).join(',')}&per_page=100&_fields=slug,content`);
	const out = people.map(({ image, ...p }) => {
		const bio = bios.find((b) => b.slug === p.slug);
		return {
			...p,
			photo: uploadName(media.find((m) => m.id === Number(image))?.source_url),
			bio: bio ? bioParagraphs(bio.content.rendered, [p.name, p.company]) : []
		};
	});

	console.log(`\nFetched the board of directors (updated ${page.modified.slice(0, 10)}):`);
	for (const p of out) console.log(`  ${p.role.padEnd(9)} ${p.name} · ${p.company} · ${p.bio.length} paragraphs · ${p.photo}`);
	await writeGenerated('board.json', { updated: page.modified.slice(0, 10), people: out });
}

async function main() {
	await importCaseStudies();
	await importBoard();
}

async function importCaseStudies() {
	const pages = await getJSON(`${API}/pages?parent=${CASE_STUDIES_PARENT}&per_page=100&_fields=slug,title,date,modified,content`);
	const out = pages
		.map((p) => ({ slug: p.slug, title: decode(p.title.rendered), date: p.date.slice(0, 10), modified: p.modified.slice(0, 10), blocks: cleanContent(p.content.rendered) }))
		.sort((a, b) => b.date.localeCompare(a.date));
	await useFullSizeImages(out);

	console.log(`Fetched ${out.length} case studies.`);
	for (const c of out) console.log(`  ${c.date}  ${String(c.blocks.length).padStart(3)} blocks  ${c.slug}`);
	await writeGenerated('case-studies.json', out);
	console.log('Case studies missing from the index in src/lib/content/caseStudies.js will not be shown until added there.');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch((e) => {
		console.error(e.message);
		process.exitCode = 1;
	});
}

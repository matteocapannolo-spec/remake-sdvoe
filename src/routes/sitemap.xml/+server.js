// Generated at build time from the route files, so new pages are added automatically.
import { caseStudies } from '$lib/content/caseStudies.js';
import { board } from '$lib/content/board.js';

export const prerender = true;
export const trailingSlash = 'never';

const SITE = 'https://sdvoe.org';

// Slugs for each dynamic route
const slugs = {
	'/solutions/case-studies/[slug]/': caseStudies.map((c) => c.slug),
	'/alliance/board/[slug]/': board.map((p) => p.slug)
};

const pages = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
	.map((p) => p.replace('/src/routes', '').replace('/+page.svelte', '') + '/')
	.map((p) => p.replace(/\/+/g, '/'))
	.flatMap((p) => (p.includes('[slug]') ? (slugs[p] ?? []).map((s) => p.replace('[slug]', s)) : [p]))
	.sort();

export function GET() {
	const today = new Date().toISOString().slice(0, 10);
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}

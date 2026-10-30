import { error } from '@sveltejs/kit';
import { caseStudies } from '$lib/content/caseStudies.js';

// Prerender one page per case study.
export const entries = () => caseStudies.map((c) => ({ slug: c.slug }));

export function load({ params }) {
	const i = caseStudies.findIndex((c) => c.slug === params.slug);
	if (i === -1) error(404, 'Case study not found');
	const item = caseStudies[i];
	const related = caseStudies.filter((c) => c.sector === item.sector && c.slug !== item.slug).slice(0, 3);
	return { item, related };
}

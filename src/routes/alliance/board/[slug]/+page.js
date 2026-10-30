import { error } from '@sveltejs/kit';
import { board } from '$lib/content/board.js';

// Prerender one biography page per board member.
export const entries = () => board.map((p) => ({ slug: p.slug }));

export function load({ params }) {
	const person = board.find((p) => p.slug === params.slug);
	if (!person) error(404, 'Board member not found');
	return { person, others: board.filter((p) => p.slug !== person.slug) };
}

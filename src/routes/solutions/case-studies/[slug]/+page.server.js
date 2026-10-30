import { caseStudies } from '$lib/content/caseStudies.js';
import { storyBlocks } from '$lib/server/caseStudyStories.js';

// Only this case study's text: prerendered into the page and its __data.json.
export function load({ params }) {
	const item = caseStudies.find((c) => c.slug === params.slug);
	return { blocks: item ? storyBlocks(item.slug, item.cover) : null };
}

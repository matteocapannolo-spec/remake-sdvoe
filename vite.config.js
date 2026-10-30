import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		// Sub-folder of a preview build (e.g. '/remake-sdvoe' on GitHub Pages), '' for the real site.
		// $app/paths `base` is relative at prerender time, so Seo.svelte needs the absolute value.
		__BASE_PATH__: JSON.stringify(process.env.BASE_PATH ?? '')
	}
});

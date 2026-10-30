import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Static output: every page is prerendered to plain HTML and served from a CDN.
		adapter: adapter({ fallback: '404.html' }),
		appDir: 'app', // '_app' is reserved on some static hosts
		paths: {
			// Sub-folder the site is served from: empty for the real site, '/remake-sdvoe' for the
			// GitHub Pages preview (set by .github/workflows/pages.yml). A non-empty BASE_PATH also marks
			// the build as a preview, kept out of search engines (vite.config.js → Seo.svelte).
			base: process.env.BASE_PATH ?? '',
			// Relative asset paths so the build also works from a sub-folder or a preview host.
			relative: true
		},
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;

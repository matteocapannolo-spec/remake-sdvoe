import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Static output: every page is prerendered to plain HTML and served from a CDN.
		adapter: adapter({ fallback: '404.html' }),
		appDir: 'app', // '_app' is reserved on some static hosts
		paths: {
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

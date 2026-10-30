<script>
	import '@fontsource/open-sans/latin-400.css';
	import '@fontsource/open-sans/latin-500.css';
	import '@fontsource/open-sans/latin-600.css';
	import '$lib/styles/global.css';
	import { page } from '$app/state';
	import Announcement from '$lib/components/Announcement.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';

	let { children } = $props();
	const isHome = $derived(page.route.id === '/');
</script>

<a class="skip" href="#main">Skip to content</a>
<Announcement />
<Nav overlay={isHome} />
<main id="main">
	{@render children()}
</main>
<Footer />
<BackToTop />

<style>
	main {
		padding-bottom: var(--s-section);
	}
	main:has(> :global(.band:last-child)) {
		padding-bottom: 0;
	}
	.skip {
		position: absolute;
		left: 16px;
		top: -60px;
		z-index: 100;
		padding: 8px 16px;
		border-radius: var(--r-full);
		background: var(--primary);
		color: #fff;
	}
	.skip:focus {
		top: 16px;
	}
</style>

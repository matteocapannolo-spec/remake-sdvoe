<script>
	import { page } from '$app/state';
	let { title, description } = $props();

	const SITE = 'https://sdvoe.org';
	const full = $derived(title ? `${title} | SDVoE Alliance` : 'SDVoE Alliance — Zero-latency AV over 10G Ethernet');
	const canonical = $derived(SITE + page.url.pathname);
</script>

<svelte:head>
	<title>{full}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:site_name" content="SDVoE Alliance" />
	<meta property="og:title" content={full} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={SITE + '/og.jpg'} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@sdvoe" />
</svelte:head>

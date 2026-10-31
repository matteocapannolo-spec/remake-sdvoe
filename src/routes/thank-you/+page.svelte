<script>
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { href } from '$lib/link.js';

	// Where the contact form (Zoho Bigin) sends visitors after they submit it: text from sdvoe.org/thank-you/.
</script>

<Seo title="Thank you" description="Thank you for contacting the SDVoE Alliance." noindex />

<PageHero eyebrow="Thank you" title="Welcome to the SDVoE Alliance!" lead="Stay connected: follow us on LinkedIn for news on SDVoE technology and the alliance.">
	<a class="btn btn-primary" href="https://www.linkedin.com/company/sdvoe-alliance" target="_blank" rel="noopener">Follow us on LinkedIn</a>
	<a class="btn btn-outline" href={href('/')}>Back to the home page</a>
</PageHero>

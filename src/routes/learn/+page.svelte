<script>
	import Img from '$lib/components/Img.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { img, designPartners } from '$lib/content/site.js';

	const ACADEMY = 'https://academy.sdvoe.org';
	const courses = [
		{ title: 'Introduction to network troubleshooting — Part 1', text: "What's the single most likely cause of network failure? Find out, and learn where to go from there." },
		{ title: 'Introduction to network troubleshooting — Part 2', text: 'The networking issues that can affect an SDVoE system, and how to use the tools from Part 1 to keep it at peak performance.' },
		{ title: '8K and HDMI 2.1', text: 'How HDMI 2.1 differs from 2.0, how it carries 8K, and whether it is backward compatible.' }
	];
	const certifications = [
		{
			title: 'Design Partner',
			who: 'Consultants and designers',
			text: 'Recognized experts who guide integrators, installers and end users through high-performance SDVoE deployments. Earned through a free Academy track.',
			href: 'https://sdvoe.org/alliance/design-partners/',
			featured: true
		},
		{
			title: 'Design House',
			who: 'Design and integration firms',
			text: 'Companies with certified staff and a track record of SDVoE system design.',
			href: 'https://sdvoe.org/alliance/design-partners/sdvoe-certified-design-houses/'
		},
		{
			title: 'Product Interoperability',
			who: 'Manufacturers',
			text: 'Independent testing that proves a product interoperates with the rest of the SDVoE ecosystem.',
			href: 'https://sdvoe.org/contact/'
		}
	];
</script>

<Seo title="Learn" description="Free SDVoE Academy courses on video, networking and system design, plus Design Partner, Design House and product interoperability certifications." />

<!-- Academy + three certification pages + partner directories, in one place. -->
<PageHero eyebrow="SDVoE Academy" title="Learn AV over IP. Free." lead="Self-paced lessons on video and networking basics, system design and sales — whether you design, integrate, install, sell or manage pro AV systems.">
	<a class="btn btn-primary" href={ACADEMY}>Start learning ↗</a>
	<a class="btn btn-outline" href="#certifications">Get certified</a>
</PageHero>

<section class="container section">
	<div class="head-row">
		<h2 class="t-h3">New courses.</h2>
		<a class="btn btn-soft btn-sm" href={ACADEMY}>All courses ↗</a>
	</div>
	<div class="grid grid-3" style="margin-top: var(--s-lg)">
		{#each courses as c}
			<a class="card course" href={ACADEMY}>
				<p class="tier">Course</p>
				<h3 class="t-title">{c.title}</h3>
				<p class="t-sm t-muted">{c.text}</p>
			</a>
		{/each}
	</div>
</section>

<section id="certifications" class="container section">
	<div class="section-head">
		<h2 class="t-h2">Three certifications. One page.</h2>
		<p class="t-lead">For people, for companies, and for products.</p>
	</div>
	<div class="grid grid-3">
		{#each certifications as c}
			<article class={c.featured ? 'option selected cert' : 'option cert'}>
				<div class="cert-top">
					<h3 class="t-h4">{c.title}</h3>
					{#if c.featured}<span class="option-badge">Free</span>{/if}
				</div>
				<p class="tier">{c.who}</p>
				<p class="t-body t-muted">{c.text}</p>
				<a class={c.featured ? 'btn btn-primary' : 'btn btn-outline'} href={c.href}>About {c.title}</a>
			</article>
		{/each}
	</div>
	<div class="avixa">
		<Img src={img('avixa-200x141.png')} alt="AVIXA CTS Renewal Unit provider" width="90" height="63" loading="lazy">{#snippet fallback()}<span class="pill">AVIXA CTS RU</span>{/snippet}</Img>
		<p class="t-sm t-muted">SDVoE Academy courses earn AVIXA CTS renewal units.</p>
	</div>
</section>

<section id="partners" class="container section">
	<div class="card-inverse partners on-dark">
		<div>
			<p class="tier">SDVoE Certified Design Partners</p>
			<h2 class="t-h2">{designPartners.count.toLocaleString('en-US')} certified designers worldwide.</h2>
			<p style="color: var(--inverse-text-faint)">AV designers and consultants at more than {designPartners.companies.toLocaleString('en-US')} companies have completed SDVoE Design Partner certification. Ask your integrator or consultant for theirs.</p>
		</div>
		<div class="partner-actions">
			<a class="btn btn-inverse" href={designPartners.list}>Download the list (PDF)</a>
			<a class="btn btn-primary" href="https://academy.sdvoe.org">Get certified</a>
			<p class="t-caption" style="color: var(--inverse-text-faint)">List updated {designPartners.updated}.</p>
		</div>
	</div>
</section>

<section class="container section">
	<div class="grid grid-2">
		<a class="card-soft res" href="https://sdvoe.org/blog/">
			<span class="pill">Video</span>
			<h3 class="t-h4">Face to Face AV with Justin Kennington</h3>
			<p class="t-body t-muted">A weekly show on what's moving in pro AV.</p>
			<span class="t-sm arrow t-blue">Watch</span>
		</a>
		<a class="card-soft res" href="https://sdvoe.org/blog/">
			<span class="pill">Articles</span>
			<h3 class="t-h4">Blog and white papers</h3>
			<p class="t-body t-muted">Latency, interoperability, ASICs and the API — explained by the people who build them.</p>
			<span class="t-sm arrow t-blue">Read</span>
		</a>
	</div>
</section>

<style>
	.head-row {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: var(--s-md);
	}
	.course,
	.res {
		display: grid;
		gap: var(--s-sm);
		align-content: start;
		justify-items: start;
	}
	.cert {
		display: grid;
		gap: var(--s-sm);
		align-content: start;
		justify-items: start;
		padding: var(--s-xl);
	}
	.cert .btn {
		margin-top: var(--s-md);
	}
	.cert-top {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}
	.avixa {
		display: flex;
		align-items: center;
		gap: var(--s-md);
		margin-top: var(--s-xl);
	}
	.partners {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: var(--s-lg) var(--s-xxl);
		align-items: center;
		padding: clamp(28px, 5vw, 56px);
	}
	.partners > div > * + * {
		margin-top: var(--s-sm);
	}
	.partner-actions {
		display: grid;
		gap: var(--s-sm);
		justify-items: start;
	}
	@media (max-width: 860px) {
		.partners {
			grid-template-columns: 1fr;
		}

	}
</style>

<script>
	import Img from '$lib/components/Img.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import SubNav from '$lib/components/SubNav.svelte';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import { caseStudies, caseSectors } from '$lib/content/caseStudies.js';
	import { applications, sectors } from '$lib/content/solutions.js';

	let sector = $state('All');
	const sectorList = caseSectors;
	const filtered = $derived(sector === 'All' ? caseStudies : caseStudies.filter((c) => c.sector === sector));
</script>

<Seo title="Solutions" description="SDVoE for matrix switching, KVM, video walls and multiviewers, across control rooms, education, government, medical, live production and more." />

<PageHero eyebrow="Solutions" title="Any source. Any screen. Any scale." lead="Matrix switches, KVM, video walls and multiviewers become software running on the same network — for whatever your sector demands." />

<SubNav items={[{ id: 'applications', label: 'By application' }, { id: 'sectors', label: 'By sector' }, { id: 'case-studies', label: 'Case studies' }]} />

<section id="applications" class="container section">
	<div class="section-head">
		<h2 class="t-h2">By application.</h2>
		<p class="t-lead">For designers: what each traditional box becomes on SDVoE.</p>
	</div>
	<div class="grid grid-2">
		{#each applications as a}
			<article class="card app" id={a.id}>
				<div class="media"><Img src={a.image} alt={'Diagram: ' + a.title + ' with SDVoE'} loading="lazy">{#snippet fallback()}<div class="ph"><span>{a.title} diagram</span></div>{/snippet}</Img></div>
				<h3 class="t-h4">{a.title}</h3>
				<p class="t-body t-muted">{a.text}</p>
			</article>
		{/each}
	</div>
</section>

<section id="sectors" class="container section">
	<div class="section-head">
		<h2 class="t-h2">By sector.</h2>
		<p class="t-lead">For owners and IT: where zero latency and one network pay off.</p>
	</div>
	<div class="grid grid-4">
		{#each sectors as s}
			<svelte:element this={s.href ? 'a' : 'div'} href={s.href} class="card-soft sector">
				<h3 class="t-title">{s.title}</h3>
				<p class="t-sm t-muted">{s.text}</p>
				{#if s.href}<span class="t-sm arrow t-blue">Read the whitepaper</span>{/if}
			</svelte:element>
		{/each}
	</div>
	<p class="t-caption" style="margin-top: var(--s-md)">Draft: each sector becomes its own landing page in phase 2, fed by the matching case studies.</p>
</section>

<section id="case-studies" class="container section">
	<div class="section-head">
		<h2 class="t-h2">Case studies.</h2>
		<p class="t-lead">{caseStudies.length} installations worldwide. Filter by sector.</p>
	</div>
	<div class="filters toggles" role="group" aria-label="Filter by sector">
		{#each sectorList as s}
			<button aria-pressed={sector === s} onclick={() => (sector = s)}>{s}</button>
		{/each}
	</div>
	<div class="grid grid-3" style="margin-top: var(--s-xl)">
		{#each filtered as c (c.slug)}
			<CaseCard item={c} />
		{/each}
	</div>
</section>

<style>
	.app {
		display: grid;
		gap: var(--s-md);
		align-content: start;
	}
	.app .media {
		aspect-ratio: 16 / 9;
		background: #fff;
		border: 1px solid var(--hairline-soft);
	}
	.app .media :global(img) {
		object-fit: contain;
		padding: 8px;
	}
	.sector {
		display: grid;
		gap: 8px;
		align-content: start;
		text-decoration: none;
	}
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>

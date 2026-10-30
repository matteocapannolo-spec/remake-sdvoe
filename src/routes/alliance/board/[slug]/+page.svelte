<script>
	import Seo from '$lib/components/Seo.svelte';
	import Img from '$lib/components/Img.svelte';
	import BoardGrid from '$lib/components/BoardGrid.svelte';
	import { href } from '$lib/link.js';

	let { data } = $props();
	const p = $derived(data.person);
	const summary = $derived(`${p.name}, ${p.company}: ${p.role === 'President' ? 'President' : 'Director'} of the SDVoE Alliance Board of Directors.`);
</script>

<Seo title={`${p.name} · Board of directors`} description={summary} />

<article class="container bio">
	<nav aria-label="Breadcrumb" class="crumbs t-sm">
		<a href={href('/alliance')}>Alliance</a> <span aria-hidden="true">›</span>
		<a href={href('/alliance#board')}>Board of directors</a>
	</nav>

	<div class="layout">
		<div class="photo">
			{#if p.photo}
				<Img src={p.photo} alt={`Portrait of ${p.name}`} width="768" height="570">{#snippet fallback()}<div class="ph" aria-hidden="true"></div>{/snippet}</Img>
			{/if}
		</div>
		<div class="copy">
			<p class="tier">{p.role === 'President' ? 'President' : 'Director'}</p>
			<h1 class="t-h1">{p.name}</h1>
			<p class="company">
				{#if p.logo}
					<Img src={p.logo} alt={p.company} width="140" height="49">{#snippet fallback()}<span class="t-lead">{p.company}</span>{/snippet}</Img>
				{:else}
					<span class="t-lead">{p.company}</span>
				{/if}
			</p>
			{#each p.bio as b}
				<p class="t-body">{b.text}</p>
			{/each}
		</div>
	</div>
</article>

<section class="others section">
	<div class="container">
		<div class="section-head left"><h2 class="t-h3">The rest of the board</h2></div>
		<BoardGrid people={data.others} />
	</div>
</section>

<style>
	.bio {
		padding-block: var(--s-section) 0;
	}
	.crumbs {
		color: var(--ink-secondary);
	}
	.crumbs a {
		color: inherit;
		text-decoration: none;
	}
	.crumbs a:hover {
		color: var(--primary);
		text-decoration: underline;
	}
	.layout {
		display: grid;
		grid-template-columns: 280px minmax(0, 1fr);
		gap: var(--s-huge);
		align-items: start;
		margin-top: var(--s-xl);
		padding-bottom: var(--s-section);
	}
	.photo {
		aspect-ratio: 1 / 1;
		border-radius: var(--r-sm);
		background: var(--fog);
		overflow: hidden;
	}
	.photo :global(img) {
		object-position: 50% 30%;
	}
	.photo :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.copy > * + * {
		margin-top: var(--s-md);
	}
	.copy .t-h1 {
		margin-top: var(--s-xs);
	}
	.company {
		margin-top: var(--s-sm);
		margin-bottom: var(--s-xl);
	}
	.company :global(img) {
		max-height: 36px;
		max-width: 160px;
		width: auto;
		object-fit: contain;
	}
	.copy .t-body {
		max-width: 680px;
	}
	.others {
		background: #f0f1f3;
	}
	@media (max-width: 768px) {
		.layout {
			grid-template-columns: 1fr;
			gap: var(--s-xl);
		}
		.photo {
			width: 160px;
		}
	}
</style>

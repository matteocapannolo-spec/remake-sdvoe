<script>
	import Seo from '$lib/components/Seo.svelte';
	import Img from '$lib/components/Img.svelte';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import { img, formatDate } from '$lib/content/site.js';
	import { href } from '$lib/link.js';

	let { data } = $props();
	const item = $derived(data.item);
</script>

<Seo title={item.title} description={item.summary} />

<article>
	<!-- Hero: full-bleed photo with the title overlaid (DJI field-card scaled up) -->
	<header class="hero on-dark">
		<div class="hero-media">
			{#if item.image}
				<Img src={item.image} alt="" width="1600" height="900">{#snippet fallback()}<div class="ph" aria-hidden="true"></div>{/snippet}</Img>
			{:else}
				<div class="ph" aria-hidden="true"></div>
			{/if}
		</div>
		<div class="hero-copy container">
			<nav aria-label="Breadcrumb" class="crumbs">
				<a href={href('/solutions')}>Solutions</a> <span aria-hidden="true">›</span>
				<a href={href('/solutions#case-studies')}>Case studies</a>
			</nav>
			<p class="tier">{item.sector}</p>
			<h1 class="t-h1">{item.title}</h1>
		</div>
	</header>

	<div class="container layout">
		<div class="body">
			<p class="t-lead summary">{item.summary}</p>

			{#if data.blocks}
				{#each data.blocks as b}
					{#if b.type === 'h'}
						<h2 class="t-h4">{b.text}</h2>
					{:else if b.type === 'p'}
						<p class="t-body">{b.text}</p>
					{:else if b.type === 'li'}
						<p class="t-body li">{b.text}</p>
					{:else if b.type === 'q'}
						<blockquote>
							<p>“{b.text}”</p>
							{#if b.cite}<cite class="t-sm t-muted">{b.cite}</cite>{/if}
						</blockquote>
					{:else if b.type === 'credit'}
						<p class="t-sm t-muted credit">{b.text}</p>
					{:else if b.type === 'img'}
						<figure class="media">
							<Img src={img(b.src)} alt="" loading="lazy" width="1200" height="675">{#snippet fallback()}<div class="ph ph-light" aria-hidden="true"></div>{/snippet}</Img>
						</figure>
					{/if}
				{/each}
			{:else}
				<div class="panel pending">
					<p class="t-body">The full story of this installation is being migrated to the new site.</p>
					<a class="link" href={item.original}>Read it on the current sdvoe.org</a>
				</div>
			{/if}
		</div>

		<aside class="facts">
			<dl>
				<div><dt class="t-caption">Sector</dt><dd>{item.sector}</dd></div>
				{#if item.member}<div><dt class="t-caption">Solution from</dt><dd>{item.member}</dd></div>{/if}
				<div><dt class="t-caption">Published</dt><dd>{formatDate(item.date)}</dd></div>
				<div><dt class="t-caption">Technology</dt><dd>SDVoE over 10G Ethernet</dd></div>
			</dl>
			<a class="btn btn-primary" href={href('/products#finder')}>Find products</a>
			<a class="btn btn-outline" href="https://sdvoe.org/contact/">Talk to an expert</a>
		</aside>
	</div>
</article>

{#if data.related.length}
	<section class="section">
		<div class="container section-head"><h2 class="t-h3">More in {item.sector}.</h2></div>
		<div class="bleed tiles card-row">
			{#each data.related as c (c.slug)}<CaseCard item={c} />{/each}
		</div>
	</section>
{/if}

<style>
	.hero {
		position: relative;
		min-height: min(70vh, 640px);
		display: flex;
		align-items: flex-end;
		background: var(--media-black);
		color: #fff;
		overflow: hidden;
	}
	.hero-media {
		position: absolute;
		inset: 0;
	}
	.hero-media :global(img),
	.hero-media :global(.ph) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.hero::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgb(0 0 0 / 0.1) 20%, rgb(0 0 0 / 0.78));
	}
	.hero-copy {
		position: relative;
		z-index: 1;
		padding-block: var(--s-huge);
	}
	.hero-copy > * + * {
		margin-top: var(--s-sm);
	}
	.hero .t-h1 {
		max-width: 900px;
		color: #fff;
		font-size: clamp(1.875rem, 1.3rem + 2vw, 3rem);
	}
	.crumbs {
		font-size: var(--fs-ui);
		color: rgb(255 255 255 / 0.8);
	}
	.crumbs a {
		color: inherit;
		text-decoration: none;
	}
	.crumbs a:hover {
		color: #fff;
		text-decoration: underline;
	}
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 280px;
		gap: var(--s-huge);
		padding-block: var(--s-section);
	}
	.body {
		max-width: 720px;
	}
	.body > * + * {
		margin-top: var(--s-lg);
	}
	.body h2 {
		margin-top: var(--s-xxxl);
	}
	.summary {
		color: var(--ink);
	}
	.li {
		padding-left: 18px;
		position: relative;
	}
	.li::before {
		content: '';
		position: absolute;
		left: 2px;
		top: 0.7em;
		width: 6px;
		height: 6px;
		background: var(--primary);
	}
	blockquote {
		margin: var(--s-xxl) 0;
		padding-left: var(--s-xl);
		border-left: 2px solid var(--primary);
	}
	blockquote p {
		font-size: var(--fs-subhead);
		line-height: 1.4;
		color: var(--ink);
	}
	cite {
		display: block;
		margin-top: var(--s-xs);
		font-style: normal;
	}
	figure.media {
		margin-block: var(--s-xxl);
		aspect-ratio: 16 / 9;
	}
	.credit {
		margin-top: var(--s-xxl);
	}
	.pending {
		display: grid;
		gap: var(--s-xs);
		justify-items: start;
	}
	.facts {
		position: sticky;
		top: calc(var(--nav-h) + 24px);
		align-self: start;
		display: grid;
		gap: var(--s-sm);
	}
	.facts dl {
		display: grid;
		margin-bottom: var(--s-md);
		border-top: 1px solid var(--divider);
	}
	.facts dl > div {
		display: grid;
		gap: 2px;
		padding: 12px 0;
		border-bottom: 1px solid var(--divider);
	}
	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
		}
		.facts {
			position: static;
		}
	}
</style>

<script>
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { specs } from '$lib/content/technology.js';
	import { href } from '$lib/link.js';

	const groups = [
		{ title: 'Performance', items: specs.performance, featured: true },
		{ title: 'Basic features', items: specs.basic },
		{ title: 'Optional features', note: 'Product specific', items: specs.optional }
	];
</script>

<Seo title="Specifications" description="SDVoE performance and feature specifications: under 100 µs latency, uncompressed 4K60 4:4:4, multichannel audio, RS-232, IR, embedded 1G Ethernet." />

<PageHero eyebrow="Specifications" title="The numbers behind the platform" lead="One latency figure, stated the same way everywhere: under 100 microseconds end to end — less than 1/150th of a video frame." />

<section class="container">
	<div class="grid grid-3">
		{#each groups as g}
			<div class={g.featured ? 'card-soft spec' : 'card spec'}>
				<div class="spec-head">
					<h2 class="t-h4">{g.title}</h2>
					{#if g.note}<span class="pill">{g.note}</span>{/if}
				</div>
				<ul role="list">
					{#each g.items as item}
						<li class="t-body">{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<section class="container section">
	<div class="card-inverse interop">
		<h2 class="t-h3">Interoperable by design</h2>
		<p style="color: var(--inverse-text-faint)">{specs.interop}</p>
		<div class="btn-row">
			<a class="btn btn-inverse" href={href('/products#finder')}>Browse certified products</a>
		</div>
	</div>
</section>

<style>
	.spec {
		display: grid;
		gap: var(--s-md);
		align-content: start;
	}
	.spec-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
	}
	.spec ul {
		display: grid;
		gap: 0;
		margin: 0;
	}
	.spec li {
		padding: 12px 0;
		border-top: 1px solid var(--hairline-soft);
	}
	.card-soft.spec li {
		border-color: var(--canvas);
		color: var(--ink);
	}
	.interop {
		display: grid;
		gap: var(--s-md);
		justify-items: start;
		padding: clamp(28px, 5vw, 56px);
	}
	.interop p {
		max-width: 760px;
	}
</style>

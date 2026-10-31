<script>
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { certifiedProducts, typeLabels } from '$lib/content/products.js';
	import { href } from '$lib/link.js';

	const CATALOG = 'https://products.sdvoe.org/avcat/ctl18883/index.cfm?manufacturer=all';

	let q = $state('');
	let type = $state('All');
	let brand = $state('All');
	let media = $state('All');
	let processingOnly = $state(false);
	let danteOnly = $state(false);

	const brands = ['All', ...new Set(certifiedProducts.map((p) => p.brand))];
	const results = $derived(
		certifiedProducts.filter(
			(p) =>
				(type === 'All' || p.type === type) &&
				(brand === 'All' || p.brand === brand) &&
				(media === 'All' || p.media.includes(media)) &&
				(!processingOnly || p.processing) &&
				(!danteOnly || p.dante) &&
				(!q || (p.model + ' ' + p.desc + ' ' + p.brand).toLowerCase().includes(q.toLowerCase()))
		)
	);

	function reset() {
		q = '';
		type = brand = media = 'All';
		processingOnly = danteOnly = false;
	}
</script>

<Seo title="Products" description="Find SDVoE Certified Interoperable products: transmitters, receivers and transceivers from multiple manufacturers." />

<PageHero eyebrow="Products" title="Mix brands. Keep the picture" lead="Every SDVoE product shares the same chip and API, so devices from different manufacturers work together. Certified products have been tested to prove it.">
	<a class="btn btn-primary" href="#finder">Product finder</a>
	<a class="btn btn-outline" href={CATALOG} target="_blank" rel="noopener">Full member catalog ↗</a>
</PageHero>

<section id="finder" class="container section">
	<div class="finder-head">
		<div>
			<h2 class="t-h2">Certified interoperable products</h2>
			<p class="t-body t-muted" aria-live="polite">{results.length} of {certifiedProducts.length} products</p>
		</div>
		<span class="tier">SDVoE Certified Interoperable</span>
	</div>

	<div class="filters panel">
		<label class="search">
			<span class="visually-hidden">Search models</span>
			<input class="input" type="search" placeholder="Search model, feature or brand" bind:value={q} />
		</label>
		<div class="toggles" role="group" aria-label="Device type">
			{#each ['All', 'TX', 'RX', 'TR'] as t}
				<button aria-pressed={type === t} onclick={() => (type = t)}>{t === 'All' ? 'All types' : typeLabels[t]}</button>
			{/each}
		</div>
		<div class="row">
			<label class="sel">
				<span class="t-caption">Manufacturer</span>
				<select class="input" bind:value={brand}>
					{#each brands as b}<option value={b}>{b === 'TBC' ? 'To be confirmed' : b}</option>{/each}
				</select>
			</label>
			<label class="sel">
				<span class="t-caption">Media</span>
				<select class="input" bind:value={media}>
					{#each ['All', 'Copper', 'Fiber'] as m}<option>{m}</option>{/each}
				</select>
			</label>
			<label class="toggle"><input type="checkbox" bind:checked={processingOnly} /> <span>Processing (scaling, walls)</span></label>
			<label class="toggle"><input type="checkbox" bind:checked={danteOnly} /> <span>Dante audio</span></label>
			<button class="btn btn-sm btn-outline" onclick={reset}>Reset</button>
		</div>
	</div>

	{#if results.length}
		<div class="table-wrap results">
			<table>
				<thead>
					<tr>
						<th scope="col">Model</th>
						<th scope="col">Manufacturer</th>
						<th scope="col">Type</th>
						<th scope="col">Description</th>
						<th scope="col">Processing</th>
					</tr>
				</thead>
				<tbody>
					{#each results as p (p.model + p.type)}
						<tr>
							<th scope="row" class="model">{p.model}</th>
							<td>{p.brand === 'TBC' ? '—' : p.brand}</td>
							<td><span class="pill">{typeLabels[p.type]}</span></td>
							<td class="t-muted">{p.desc}</td>
							<td>{p.processing ? 'Yes' : 'No'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div class="card-soft empty">
			<p class="t-title">No certified products match.</p>
			<p class="t-body t-muted">Try fewer filters, or search the full catalog of 700+ member products.</p>
			<div class="btn-row"><button class="btn btn-outline" onclick={reset}>Clear filters</button><a class="btn btn-primary" href={CATALOG}>Member catalog ↗</a></div>
		</div>
	{/if}
	<p class="t-caption" style="margin-top: var(--s-md)">Draft data from the current certified products page. Phase 2: one product database with manufacturer, photos, datasheets and AV-iQ links.</p>
</section>

<section id="orchestrator" class="container section">
	<div class="grid grid-2">
		<div class="card-inverse orch">
			<span class="pill pill-accent">Free</span>
			<h2 class="t-h3">SDVoE Orchestrator</h2>
			<p style="color: var(--inverse-text-faint)">Free software to manage, route, configure and monitor SDVoE networks — across brands.</p>
			<a class="btn btn-inverse" href="https://sdvoe.org/contact/">Request Orchestrator</a>
		</div>
		<div class="card-soft orch">
			<span class="pill">New in 2026</span>
			<h2 class="t-h3">An API ready for AI agents</h2>
			<p class="t-muted">The SDVoE API now supports agentic, AI-assisted workflows: natural-language control, faster deployment and quicker troubleshooting.</p>
			<a class="btn btn-outline" href={href('/developers#ai')}>Developers & API</a>
		</div>
	</div>
</section>

<section class="container">
	<div class="card get-cert">
		<div>
			<h2 class="t-h4">Make a product?</h2>
			<p class="t-body t-muted">Get it SDVoE Certified Interoperable and listed here.</p>
		</div>
		<a class="btn btn-primary" href={href('/learn#certifications')}>Product certification</a>
	</div>
</section>

<style>
	.finder-head {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: var(--s-md);
		margin-bottom: var(--s-lg);
	}
	.filters {
		display: grid;
		gap: var(--s-md);
	}
	.filters .input {
		background: var(--canvas);
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		gap: var(--s-md);
	}
	.sel {
		display: grid;
		gap: 4px;
		min-width: 180px;
	}
	.toggle {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		min-height: 48px;
		font-size: var(--fs-ui);
		color: var(--ink);
		cursor: pointer;
	}
	.toggle input {
		width: 18px;
		height: 18px;
		accent-color: var(--primary);
	}
	.results {
		margin-top: var(--s-lg);
		max-height: 640px;
		overflow: auto;
	}
	.results thead th {
		position: sticky;
		top: 0;
	}
	.model {
		font-weight: var(--w-bold);
		color: var(--ink);
		white-space: nowrap;
	}
	.empty {
		margin-top: var(--s-lg);
		display: grid;
		gap: var(--s-sm);
		justify-items: start;
	}
	.orch {
		display: grid;
		gap: var(--s-md);
		justify-items: start;
		align-content: start;
		padding: var(--s-xl);
	}
	.get-cert {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: var(--s-md);
		padding: var(--s-xl);
	}
</style>

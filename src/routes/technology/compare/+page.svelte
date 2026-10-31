<script>
	import Img from '$lib/components/Img.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Check from '$lib/components/Check.svelte';
	import { hdbaset, ipmx } from '$lib/content/technology.js';
	import { href } from '$lib/link.js';

	let tab = $state('hdbaset');
	const data = $derived(tab === 'hdbaset' ? hdbaset : ipmx);
	const other = $derived(tab === 'hdbaset' ? 'HDBaseT' : 'IPMX');
</script>

<Seo title="SDVoE vs. HDBaseT and IPMX" description="Side-by-side comparison of SDVoE with HDBaseT matrix designs and with IPMX." />

<!-- Two comparison pages merged into one, switched with a segmented control. -->
<PageHero eyebrow="Compare" title="SDVoE, side by side" lead="How SDVoE stacks up against the two technologies designers ask about most." />

<div class="container">
	<div class="tabs" role="tablist" aria-label="Compare with">
		<button role="tab" aria-selected={tab === 'hdbaset'} onclick={() => (tab = 'hdbaset')}>vs. HDBaseT</button>
		<button role="tab" aria-selected={tab === 'ipmx'} onclick={() => (tab = 'ipmx')}>vs. IPMX</button>
	</div>

	<section class="section" role="tabpanel" aria-label={'SDVoE vs. ' + other}>
		<div class="table-wrap">
			<table class="cmp">
				<thead>
					<tr>
						<th scope="col"><span class="visually-hidden">Feature</span></th>
						<th scope="col" class="hl">SDVoE</th>
						<th scope="col">{other}</th>
					</tr>
				</thead>
				<tbody>
					{#each data.rows as [label, a, b]}
						<tr>
							<th scope="row">{label}</th>
							<td class="hl"><Check value={a} /></td>
							<td><Check value={b} /></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if tab === 'hdbaset'}
			<div class="section-head" style="margin-top: var(--s-section)">
				<h2 class="t-h2">Half the devices for the same brief</h2>
				<p class="t-lead">{hdbaset.example.text}</p>
			</div>
			<div class="grid grid-2">
				<figure class="card diagram">
					<figcaption><span class="t-h3">{hdbaset.example.traditional.devices}</span> <span class="t-muted">devices · HDBaseT matrix design</span></figcaption>
					<div class="media"><Img src={hdbaset.example.traditional.image} alt="System drawing of a traditional HDBaseT matrix design with 22 devices" loading="lazy">{#snippet fallback()}<div class="ph"><span>System drawing of a traditional HDBaseT matrix design with 22 devices</span></div>{/snippet}</Img></div>
				</figure>
				<figure class="card-soft diagram">
					<figcaption><span class="t-h3 t-blue">{hdbaset.example.sdvoe.devices}</span> <span class="t-muted">devices · SDVoE design</span></figcaption>
					<div class="media"><Img src={hdbaset.example.sdvoe.image} alt="System drawing of an SDVoE design with 12 devices" loading="lazy">{#snippet fallback()}<div class="ph"><span>System drawing of an SDVoE design with 12 devices</span></div>{/snippet}</Img></div>
				</figure>
			</div>
			<p class="t-lead" style="margin-top: var(--s-xl)">
				Fewer devices plus off-the-shelf Ethernet typically means <strong>{hdbaset.example.savings}</strong> savings on the system budget — more as systems grow.
			</p>
		{:else}
			<div class="grid grid-2" style="margin-top: var(--s-section)">
				{#each ipmx.points as p}
					<div class="card-soft">
						<h3 class="t-title">{p.title}</h3>
						<p class="t-body t-muted" style="margin-top: 8px">{p.text}</p>
					</div>
				{/each}
			</div>
			<p class="t-body t-muted" style="margin-top: var(--s-xl); text-align: center">{ipmx.note}</p>
			<p class="t-caption" style="margin-top: var(--s-sm); text-align: center">IPMX data as of {ipmx.asOf}, from AIMS announcements. To be reviewed by the Alliance before publishing.</p>
		{/if}

		<div class="card-inverse cta on-dark">
			<h2 class="t-h3">Designing a system?</h2>
			<p style="color: var(--inverse-text-faint)">The Alliance offers free network design help from experts in North America, Europe and Asia Pacific.</p>
			<div class="btn-row">
				<a class="btn btn-inverse" href="https://sdvoe.org/contact/">Get design help</a>
				<a class="btn btn-ghost link" href={href('/learn#partners')}>Certified design partners</a>
			</div>
		</div>
	</section>
</div>

<style>
	.cmp {
		font-size: var(--fs-body);
	}
	.cmp th[scope='row'] {
		font-weight: var(--w-text);
		color: var(--ink);
	}
	.cmp td,
	.cmp thead th:not(:first-child) {
		text-align: center;
		width: 22%;
	}
	.cmp thead th {
		font-size: var(--fs-ui);
		color: var(--ink);
	}
	.cmp .hl {
		background: var(--canvas-soft);
		color: var(--primary);
		font-weight: var(--w-bold);
	}
	.diagram {
		display: grid;
		gap: var(--s-md);
		margin: 0;
	}
	.diagram .media {
		background: #fff;
		padding: var(--s-sm);
	}
	.diagram :global(img) {
		object-fit: contain;
	}
	.cta {
		margin-top: var(--s-section);
		display: grid;
		gap: var(--s-md);
		justify-items: start;
	}
	.ghost {
		color: #fff;
		border-color: rgb(255 255 255 / 0.25);
	}
</style>

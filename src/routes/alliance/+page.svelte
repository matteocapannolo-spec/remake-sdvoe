<script>
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import SubNav from '$lib/components/SubNav.svelte';
	import LogoWall from '$lib/components/LogoWall.svelte';
	import Check from '$lib/components/Check.svelte';
	import BoardGrid from '$lib/components/BoardGrid.svelte';
	import { members, memberCount } from '$lib/content/site.js';
	import { board } from '$lib/content/board.js';

	const goals = [
		'Standardize Ethernet as the transport for AV signals in professional environments',
		'Enable a hardware/software platform tailored to each user’s needs',
		'Make systems more flexible, reliable and cost-effective than point-to-point and circuit switches',
		'Deliver true AV/IT convergence on a single infrastructure',
		'Bring manufacturers, developers, chip designers and integrators under one banner',
		'Educate the industry and train it for the new paradigm'
	];

	// From sdvoe.org/alliance/membership — VERIFY which column each benefit belongs to (the current table lost its ticks).
	const benefits = [
		['Eligible to serve on the Board of Directors', true, false],
		['Contribute white papers and application notes, promoted across SDVoE channels', true, false],
		['Priority speaker slots at SDVoE events and trade shows', true, false],
		['Priority logo placement on the members page', true, false],
		['Logo and reciprocal link on the members page', true, true],
		['New-member press release on sdvoe.org', true, true],
		['Contribute design briefs, case studies and blog posts', true, true],
		['Products featured in the SDVoE product catalog', true, true],
		['Participation in SDVoE trade show booths', true, true],
		['Full access to SDVoE Academy training materials', true, true]
	];

	const faq = [
		{ q: 'What is the SDVoE Alliance?', a: 'SDVoE stands for Software Defined Video over Ethernet. The Alliance is a nonprofit consortium of technology providers standardizing Ethernet as the transport for AV signals in professional environments, and building an ecosystem where software defines AV applications.' },
		{ q: 'Why does SDVoE need an alliance?', a: 'The move to AV over IP is inevitable, but too many competing approaches confused the market and slowed adoption. The Alliance brings leading companies together on one interoperable platform.' },
		{ q: 'Is SDVoE license or royalty based?', a: 'No. Manufacturers use SDVoE technology without licenses or royalties.' },
		{ q: 'Do SDVoE products need special network switches?', a: 'No. SDVoE runs on commercial off-the-shelf 10G Ethernet switches. The Alliance also offers free network design assistance.' },
		{ q: 'How do I become a member?', a: 'Contact the Alliance to set up a short call about the benefits for your company, then choose contributing or adopting membership.' }
	];
</script>

<Seo title="The Alliance" description={`The SDVoE Alliance is a nonprofit consortium of ${memberCount} pro AV, IT and chip companies. Meet the members and join.`} />

<PageHero eyebrow="The Alliance" title={`${memberCount} companies. One standard.`} lead="A nonprofit consortium of pro AV manufacturers, IT vendors, chip designers and software developers, working so that any SDVoE product works with any other.">
	<a class="btn btn-primary" href="#join">Join the Alliance</a>
	<a class="btn btn-outline" href="#members">Meet the members</a>
</PageHero>

<SubNav items={[{ id: 'mission', label: 'Mission' }, { id: 'board', label: 'Board' }, { id: 'members', label: 'Members' }, { id: 'join', label: 'Join' }, { id: 'faq', label: 'FAQ' }]} />

<section id="mission" class="container section">
	<div class="mission">
		<h2 class="t-h2">What we're here to do.</h2>
		<ol role="list" class="goals">
			{#each goals as g, i}
				<li><span class="num">{String(i + 1).padStart(2, '0')}</span><span class="t-body">{g}</span></li>
			{/each}
		</ol>
	</div>
</section>

{#if board.length}
	<!-- grey store band with white rounded cards, as on the home page; the president's card is wider -->
	<section id="board" class="board-band section">
		<div class="container">
			<div class="section-head left">
				<h2 class="t-h2">Board of directors</h2>
				<p class="t-lead">The Alliance president and {board.length - 1} directors from member companies.</p>
			</div>
			<BoardGrid people={board} />
		</div>
	</section>
{/if}

<section id="members" class="container section">
	<div class="section-head">
		<h2 class="t-h2">Members.</h2>
	</div>
	<div class="tier">
		<div class="tier-head"><p class="tier">Steering members</p><p class="t-sm t-muted">Founders: Christie, NETGEAR, Semtech</p></div>
		<LogoWall logos={members.steering} />
	</div>
	<div class="tier">
		<div class="tier-head"><p class="tier">Contributing members</p></div>
		<LogoWall logos={members.contributing} />
	</div>
	<div class="tier">
		<div class="tier-head"><p class="tier">Adopting members</p></div>
		<LogoWall logos={members.adopting} />
	</div>
</section>

<section id="join" class="container section">
	<div class="section-head">
		<h2 class="t-h2">Join the Alliance.</h2>
		<p class="t-lead">Ship interoperable products into a growing ecosystem, and help shape where it goes next.</p>
	</div>
	<div class="grid grid-2 tiers">
		<div class="option selected plan">
			<span class="option-badge">Most influence</span>
			<p class="tier">Contributing member</p>
			<h3 class="t-h4">Shape the standard.</h3>
			<p class="t-body t-muted">Board eligibility, priority visibility and a voice in the roadmap.</p>
			<a class="btn btn-primary" href="https://sdvoe.org/contact/">Talk to us</a>
		</div>
		<div class="option plan">
			<p class="tier">Adopting member</p>
			<h3 class="t-h4">Build on SDVoE.</h3>
			<p class="t-body t-muted">List your products and join the ecosystem.</p>
			<a class="btn btn-outline" href="https://sdvoe.org/contact/">Talk to us</a>
		</div>
	</div>
	<div class="table-wrap" style="margin-top: var(--s-lg)">
		<table class="cmp">
			<thead><tr><th scope="col">Benefit</th><th scope="col" class="hl">Contributing</th><th scope="col">Adopting</th></tr></thead>
			<tbody>
				{#each benefits as [b, c, a]}
					<tr><th scope="row">{b}</th><td class="hl"><Check value={c} /></td><td><Check value={a} /></td></tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="t-caption" style="margin-top: var(--s-sm)">VERIFY: the current membership table shows no ticks, so the split between columns is a draft assumption.</p>
</section>

<section id="faq" class="container section">
	<div class="section-head"><h2 class="t-h2">FAQ</h2></div>
	<div class="faq">
		{#each faq as f}
			<details>
				<summary class="t-body">{f.q}</summary>
				<p class="t-body t-muted">{f.a}</p>
			</details>
		{/each}
	</div>
</section>

<style>
	.mission {
		display: grid;
		grid-template-columns: 1fr 1.4fr;
		text-align: left;
		gap: var(--s-xxl);
	}
	.goals {
		display: grid;
		margin: 0;
	}
	.goals li {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: var(--s-md);
		padding: var(--s-md) 0;
		border-top: 1px solid var(--divider);
		color: var(--ink);
	}
	.num {
		color: var(--tier);
		font-weight: var(--w-bold);
		font-size: var(--fs-ui);
		padding-top: 2px;
	}
	.board-band {
		background: #f0f1f3;
	}
	.tier + .tier {
		margin-top: var(--s-xxl);
	}
	.tier-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--s-sm) var(--s-lg);
		margin-bottom: var(--s-md);
	}
	.plan {
		display: grid;
		gap: var(--s-md);
		justify-items: start;
		padding: var(--s-xl);
	}
	.cmp th[scope='row'] {
		font-weight: var(--w-text);
		color: var(--ink);
	}
	.cmp td,
	.cmp thead th:not(:first-child) {
		text-align: center;
		width: 18%;
	}
	.cmp .hl {
		background: var(--canvas-soft);
	}
	.faq {
		max-width: 860px;
		margin-inline: auto;
		border-top: 1px solid var(--divider);
	}
	@media (max-width: 860px) {
		.mission {
			grid-template-columns: 1fr;
		}
	}
</style>

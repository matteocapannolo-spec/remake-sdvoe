<script>
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import SubNav from '$lib/components/SubNav.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import YouTube from '$lib/components/YouTube.svelte';
	import LightBeams from '$lib/components/LightBeams.svelte';
	import { BadgeDollarSign, ArrowLeftRight, TrendingUp, Server, Network, Wrench, Download } from '@lucide/svelte';
	import { powerOf10, localImg } from '$lib/content/site.js';
	import { stackLayers, benefits, processing } from '$lib/content/technology.js';
	import { href } from '$lib/link.js';

	// Each reason takes its colour from the Power of 10+ campaign wheel. fill: the wheel colour
	// (top rule, number pill); on: text on that fill; ink: the same hue dark enough for text on
	// white (WCAG AA 4.5:1), used for the title on hover. Bonus bandwidth is the Sky Blue of the
	// "+Bonus Bandwidth" line, with Deep Blue as its ink (Sky Blue is never text on white).
	const wheel = {
		'Zero latency': ['#f7941d', '#3d2300', '#a85a00'],
		'No compression': ['#0b7f94', '#ffffff', '#0b7f94'],
		'Multiview and video wall': ['#ee5a3a', '#3f1205', '#c2401f'],
		KVM: ['#d7282f', '#ffffff', '#d7282f'],
		InstaSwitch: ['#b91d7f', '#ffffff', '#b91d7f'],
		'USB 2.0 + video': ['#7e4a8d', '#ffffff', '#7e4a8d'],
		'Ultra-low power': ['#e2c51e', '#3b3200', '#7a6a00'],
		'Proven interoperability': ['#10adcf', '#04313b', '#0a7a93'],
		'Standard software interface': ['#2dbda8', '#053a33', '#0f7a6b'],
		'Ultimate flexibility': ['#8cc63f', '#1f3305', '#4a7a12'],
		'Bonus bandwidth': ['#31a3e3', '#062a4a', '#0c67ba']
	};
	// benefit icon key (technology.js) → Lucide icon
	const benefitIcons = { cost: BadgeDollarSign, ports: ArrowLeftRight, scale: TrendingUp, rack: Server, network: Network, tools: Wrench };

	const hue = (title) => {
		const [fill, on, ink] = wheel[title] ?? ['#0c67ba', '#ffffff', '#0c67ba'];
		return `--wheel-fill:${fill}; --wheel-on:${on}; --wheel-ink:${ink}`;
	};

	const sections = [
		{ id: 'power-of-10', label: 'Power of 10+' },
		{ id: 'how-it-works', label: 'How it works' },
		{ id: 'beyond-the-matrix', label: 'Beyond the matrix' },
		{ id: 'convergence', label: 'AV/IT convergence' },
		{ id: 'sustainability', label: 'Sustainability' },
		{ id: 'benefits', label: 'Benefits' }
	];
</script>

<Seo title="Why SDVoE" description="The Power of 10+: uncompressed, zero-latency AV over standard 10G Ethernet, with a full-stack platform and one open API." />

<!--
  One page replaces five on the current site: Power of 10, The matrix transformed,
  A full stack solution, Benefits, AV/IT convergence (+ Sustainability shootout).
-->
<SubNav items={sections} />

{#snippet actions()}
	<a class="btn btn-primary" href={href('/technology/compare')}>Compare with HDBaseT and IPMX</a>
	<a class="btn btn-outline" href={href('/technology/specifications')}>Specifications</a>
{/snippet}

<PageHero eyebrow="Why SDVoE" title="10 + 1 Reasons, one Ecosystem" lead="Ten core capabilities plus bonus bandwidth, shared by every certified product across an alliance of interoperable manufacturers.">
	{#snippet backdrop()}
		<!-- darkened abstract render (images-src/why-hero-bg.jpg), with one light beam per reason in its wheel colour -->
		<img class="why-bg" src={localImg('why-hero-bg.jpg')} alt="" width="1600" height="900" decoding="async" />
		<LightBeams colors={Object.values(wheel).map(([fill]) => fill)} />
	{/snippet}
	{#snippet mark()}
		<!-- campaign mark for dark backgrounds, made by scripts/p10-logo-on-dark.mjs -->
		<img class="p10-logo" src={localImg('power-of-10-logo-on-dark.png')} alt="The Power of 10+" width="560" height="416" fetchpriority="high" />
	{/snippet}
	<a class="btn btn-ghost" href={href('/technology/specifications')}>Specifications</a>
</PageHero>

<section id="power-of-10" class="container section" aria-labelledby="p10-title">
	<!-- the visible title is the page h1 above; this keeps the card titles (h3) under an h2 -->
	<h2 id="p10-title" class="visually-hidden">The Power of 10+ reasons</h2>
	<ol role="list" class="grid grid-3 p10">
		{#each powerOf10 as b, i}
			<li class="card" style={hue(b.title)}>
				<span class="num">{String(i + 1).padStart(2, '0')}</span>
				<h3 class="t-title">{b.title}</h3>
				<p class="t-sm t-muted">{b.text}</p>
			</li>
		{/each}
		<li class="card-inverse quote">
			<p class="t-title">“Upgrading to 10 Gbps infrastructure is no longer a forward-looking investment — it's an essential step for unlocking performance and efficiency in audiovisual systems.”</p>
			<p class="t-sm" style="color: var(--inverse-text-faint)">Stephane Tremblay, President, SDVoE Alliance</p>
		</li>
	</ol>
</section>

<section id="how-it-works" class="container section">
	<div class="section-head">
		<h2 class="t-h2">A full stack, not a piece of one</h2>
		<p class="t-lead">Other technologies solve one layer — moving bits, or fixing timing. SDVoE specifies every layer of the OSI model, from the cable to the API.</p>
	</div>
	<HowItWorks />
	<ol role="list" class="stack">
		{#each stackLayers as l}
			<li>
				<span class="pill">{l.layer}</span>
				<div>
					<h3 class="t-title">{l.name}</h3>
					<p class="t-body t-muted">{l.text}</p>
				</div>
			</li>
		{/each}
	</ol>
	<!-- where to go next, for readers who got this far -->
	<div class="btn-row stack-actions">{@render actions()}</div>
</section>

<section id="beyond-the-matrix" class="container section">
	<div class="two">
		<div class="stack-text">
			<h2 class="t-h2">We still need matrix switching. We no longer need the matrix switch</h2>
			<p class="t-body">
				A matrix switch is the big, expensive box at the center of most AV systems. Matrix switching is what users
				actually need: getting any source to any screen without harming the signal. Matrix switches exist because
				they are easy to manufacture, not because they are well suited to the job.
			</p>
			<p class="t-body">
				Every form of electronic communication has moved from analog, to digital circuits, to packets on a network,
				to software platforms. SDVoE takes pro AV through the last two steps at once — and because software defines
				the system, it can change when the business does, instead of being torn out.
			</p>
		</div>
		<div class="card-soft">
			<h3 class="t-h4">Processing built into the endpoints</h3>
			<ul role="list" class="chips">
				{#each processing as p}
					<li class="pill pill-outline">{p}</li>
				{/each}
			</ul>
			<h3 class="t-h4" style="margin-top: var(--s-xl)">Out of the walled garden</h3>
			<p class="t-body t-muted">
				Standard protocols and one control API across vendors give AV the interoperability IT takes for granted: a
				IDK encoder works with a Christie projector, and a NETGEAR switch configures both.
			</p>
		</div>
	</div>
</section>

<section id="convergence" class="container section">
	<div class="card-inverse conv">
		<div>
			<p class="t-caption" style="color: var(--inverse-text-faint)">AV/IT convergence</p>
			<h2 class="t-h2">Only at 10G</h2>
		</div>
		<div class="conv-cols">
			<div>
				<h3 class="t-title">At 1G, someone loses</h3>
				<p class="t-body" style="color: var(--inverse-text-faint)">Prioritize video and file transfers crawl. Prioritize data and video breaks up under heavy compression and added latency. So most sites end up building two parallel networks — the opposite of convergence.</p>
			</div>
			<div>
				<h3 class="t-title">At 10G, nobody does</h3>
				<p class="t-body" style="color: var(--inverse-text-faint)">Video travels with little or no compression and a full gigabit stays reserved for IT. 10G gear connects to the existing 1G network, so you upgrade only where high-quality video is needed.</p>
			</div>
		</div>
	</div>
</section>

<section id="sustainability" class="container section">
	<div class="two">
		<div class="stack-text">
			<h2 class="t-h2">Better image, less power</h2>
			<p class="t-body">
				The BlueRiver ASIC at the heart of SDVoE draws about 2 W. An ASIC can use more than 80% less power than an FPGA
				doing the same job. In the Alliance's side-by-side shootout against popular 1G systems, SDVoE delivered the
				better picture at the lower power draw.
			</p>
			<p class="t-body">Don't take our word for it: download the test pattern, show it 1:1 on your own system, and compare.</p>
			<div class="btn-row shootout-btns">
				<a class="btn btn-outline arrow" href="https://sdvoe.org/technology/sustainability-shootout/">Watch the shootout</a>
				<a class="btn btn-download" href="https://sdvoe.org/technology/sustainability-shootout/"><Download size={18} strokeWidth={2} aria-hidden="true" />Download the test pattern</a>
			</div>
		</div>
		<YouTube id="2F6p5deD7N8" title="Sustainability Shootout: SDVoE is the best!" />
	</div>
</section>

<section id="benefits" class="container section">
	<div class="section-head">
		<h2 class="t-h2">What standard IT brings to AV</h2>
	</div>
	<div class="grid grid-3">
		{#each benefits as b}
			<div class="card-soft">
				{#if benefitIcons[b.icon]}{@const Icon = benefitIcons[b.icon]}<span class="b-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5} /></span>{/if}
				<h3 class="t-title">{b.title}</h3>
				<p class="t-sm t-muted" style="margin-top: 8px">{b.text}</p>
			</div>
		{/each}
	</div>
</section>

<style>
	/* the render, darkened: faint over the near-black stage */
	.why-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.32;
	}
	.p10-logo {
		width: min(200px, 55%);
		height: auto;
		margin: var(--s-md) auto var(--s-lg);
	}
	.stack-actions {
		justify-content: center;
		margin-top: var(--s-xxl);
	}
	.p10 {
		margin: 0;
	}
	/* wheel colour: a rule along the top and the number in a pill; on hover the title takes it too */
	.p10 .card {
		display: grid;
		gap: 8px;
		align-content: start;
		border-top: 4px solid var(--wheel-fill);
	}
	.num {
		justify-self: start;
		padding: 2px 10px;
		border-radius: var(--r-full);
		background: var(--wheel-fill);
		color: var(--wheel-on);
		font-weight: var(--w-bold);
		font-size: var(--fs-caption);
		line-height: 1.5;
	}
	.p10 .card .t-title {
		transition: color 0.2s ease;
	}
	.p10 .card:hover .t-title {
		color: var(--wheel-ink);
	}
	.quote {
		display: grid;
		gap: var(--s-md);
		align-content: space-between;
	}
	.stack {
		display: grid;
		gap: 0;
		margin: var(--s-xl) 0 0;
	}
	.stack li {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: var(--s-lg);
		padding: var(--s-lg) 0;
		border-top: 1px solid var(--hairline-soft);
	}
	.stack .pill {
		justify-self: start;
		height: fit-content;
	}
	.stack li > div > * + * {
		margin-top: 6px;
	}
	.two {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: var(--s-xxl);
		align-items: start;
	}
	.stack-text > * + * {
		margin-top: var(--s-md);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: var(--s-md) 0 0;
	}
	.chips .pill {
		background: var(--canvas);
	}
	.conv {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: var(--s-xxl);
		padding: clamp(28px, 5vw, 64px);
	}
	.conv-cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--s-xl);
	}
	.conv-cols > div > * + * {
		margin-top: var(--s-sm);
	}
	/* side by side; they stack only where both can't fit */
	.shootout-btns .btn {
		white-space: nowrap;
	}
	/* same icon tile as the sector cards (solutions) and the menu */
	.b-icon {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		margin-bottom: 12px;
		border-radius: var(--r-sm);
		background: var(--primary-tint);
		color: var(--primary);
	}
	/* Sky Blue with white text, the client's choice: an accepted exception to WCAG AA (about 2.9:1) */
	.btn-download {
		background: var(--sdvoe-sky-blue);
		color: #fff;
	}
	.btn-download:hover {
		background: #2793d0;
	}
	@media (max-width: 900px) {
		.two,
		.conv,
		.conv-cols {
			grid-template-columns: 1fr;
		}
		.stack li {
			grid-template-columns: 1fr;
			gap: var(--s-sm);
		}
	}
</style>

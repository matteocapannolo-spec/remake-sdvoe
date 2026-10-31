<script>
	import Img from '$lib/components/Img.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import SubNav from '$lib/components/SubNav.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import { powerOf10, img } from '$lib/content/site.js';
	import { stackLayers, benefits, processing } from '$lib/content/technology.js';
	import { href } from '$lib/link.js';

	const sections = [
		{ id: 'power-of-10', label: 'Power of Ten+' },
		{ id: 'how-it-works', label: 'How it works' },
		{ id: 'beyond-the-matrix', label: 'Beyond the matrix' },
		{ id: 'convergence', label: 'AV/IT convergence' },
		{ id: 'sustainability', label: 'Sustainability' },
		{ id: 'benefits', label: 'Benefits' }
	];
</script>

<Seo title="Why SDVoE" description="The Power of Ten+: uncompressed, zero-latency AV over standard 10G Ethernet, with a full-stack platform and one open API." />

<!--
  One page replaces five on the current site: Power of 10, The matrix transformed,
  A full stack solution, Benefits, AV/IT convergence (+ Sustainability shootout).
-->
<PageHero eyebrow="Why SDVoE" title="The Power of Ten+" lead="10 gigabits per second is enough to move video without compressing it. That one fact is why SDVoE matches a matrix switch on quality and latency — and beats it on everything else.">
	<a class="btn btn-primary" href={href('/technology/compare')}>Compare with HDBaseT and IPMX</a>
	<a class="btn btn-outline" href={href('/technology/specifications')}>Specifications</a>
</PageHero>

<SubNav items={sections} />

<section id="power-of-10" class="container section">
	<div class="section-head">
		<h2 class="t-h2">Eleven reasons, one platform.</h2>
		<p class="t-lead">An off-the-shelf, end-to-end platform instead of a patchwork of components.</p>
	</div>
	<ol role="list" class="grid grid-3 p10">
		{#each powerOf10 as b, i}
			<li class="card">
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
		<h2 class="t-h2">A full stack, not a piece of one.</h2>
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
</section>

<section id="beyond-the-matrix" class="container section">
	<div class="two">
		<div class="stack-text">
			<h2 class="t-h2">We still need matrix switching. We no longer need the matrix switch.</h2>
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
			<h2 class="t-h2">Only at 10G.</h2>
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
			<h2 class="t-h2">Better image. Less power.</h2>
			<p class="t-body">
				The BlueRiver ASIC at the heart of SDVoE draws about 2 W. An ASIC can use more than 80% less power than an FPGA
				doing the same job. In the Alliance's side-by-side shootout against popular 1G systems, SDVoE delivered the
				better picture at the lower power draw.
			</p>
			<p class="t-body">Don't take our word for it: download the test pattern, show it 1:1 on your own system, and compare.</p>
			<div class="btn-row">
				<a class="btn btn-outline arrow" href="https://sdvoe.org/technology/sustainability-shootout/">Watch the shootout</a>
				<a class="btn btn-soft" href="https://sdvoe.org/technology/sustainability-shootout/">Download the test pattern</a>
			</div>
		</div>
		<div class="energy card-soft">
			<p class="t-caption">Chip power, indicative</p>
			<div class="meter"><span style="--w: 18%"></span><b>SDVoE ASIC · ~2 W</b></div>
			<div class="meter fpga"><span style="--w: 100%"></span><b>FPGA-based · 5× or more</b></div>
			<p class="t-caption">VERIFY: replace with measured figures from the shootout before publishing.</p>
		</div>
	</div>
</section>

<section id="benefits" class="container section">
	<div class="section-head">
		<h2 class="t-h2">What standard IT brings to AV.</h2>
	</div>
	<div class="grid grid-3">
		{#each benefits as b}
			<div class="card-soft">
				<h3 class="t-title">{b.title}</h3>
				<p class="t-sm t-muted" style="margin-top: 8px">{b.text}</p>
			</div>
		{/each}
	</div>
	<figure class="media stackimg">
		<Img src={img('analog-software-timeline.jpg')} alt="Timeline: every electronic communication moves from analog to digital, to packets, to software platforms." loading="lazy">{#snippet fallback()}<div class="ph ph-wide"><span>Analog → digital → packets → software platforms</span></div>{/snippet}</Img>
	</figure>
</section>

<style>
	.p10 {
		margin: 0;
	}
	.p10 .card {
		display: grid;
		gap: 8px;
		align-content: start;
	}
	.num {
		color: var(--primary);
		font-weight: var(--w-bold);
		font-size: var(--fs-ui);
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
	.energy {
		display: grid;
		gap: var(--s-md);
		padding: var(--s-xl);
	}
	.meter {
		position: relative;
		height: 56px;
		border-radius: var(--r-full);
		background: var(--canvas);
		overflow: hidden;
	}
	.meter span {
		position: absolute;
		inset: 0 auto 0 0;
		width: var(--w);
		border-radius: var(--r-full);
		background: var(--accent);
	}
	.meter.fpga span {
		background: var(--hairline);
	}
	.meter b {
		position: relative;
		display: flex;
		align-items: center;
		height: 100%;
		padding-left: 20px;
		color: var(--ink);
		font-size: var(--fs-ui);
	}
	.stackimg {
		margin-top: var(--s-xl);
		border-radius: var(--r-md);
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

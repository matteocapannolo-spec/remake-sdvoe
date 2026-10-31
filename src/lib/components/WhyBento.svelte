<script>
	// DJI "Why shop with DJI Store" bento: white cards on the grey band, title on top,
	// one big graphic below. Figures come from `stats` in site.js, the AI card from ai.js.
	import Img from '$lib/components/Img.svelte';
	import AiIcon from '$lib/components/AiIcon.svelte';
	import { Plus } from '@lucide/svelte';
	import { stats, img, localImg } from '$lib/content/site.js';
	import { aiPoints, agentPlatforms } from '$lib/content/ai.js';
	import { href } from '$lib/link.js';

	const [latency, video, products] = stats;
	const aiBackdrop = localImg('ai-band-bg.jpg');
</script>

<div class="bento">
	<a class="cell latency" href={href('/technology/specifications')}>
		<h3 class="title">{latency.label}</h3>
		<div class="latency-body">
			<p class="big">{latency.value}</p>
			<!-- one video frame, with the sliver SDVoE takes: under 1/150th -->
			<div class="frame" aria-hidden="true"><span class="sliver"></span></div>
			<div class="frame-legend" aria-hidden="true"><span class="t-blue">SDVoE</span><span>1 video frame</span></div>
			<p class="note">Under 1/150th of a frame</p>
		</div>
	</a>

	<a class="cell" href={href('/technology')}>
		<h3 class="title">Uncompressed {video.value.split(' ')[0]}</h3>
		<p class="big">4:4:4</p>
	</a>

	<a class="cell" href={href('/technology#how-it-works')}>
		<h3 class="title">Off-the-shelf 10G switches</h3>
		<svg class="glyph" viewBox="0 0 160 80" aria-hidden="true">
			<rect x="10" y="22" width="140" height="40" rx="4" fill="none" stroke="#3a3f46" stroke-width="4" />
			{#each [0, 1, 2, 3, 4, 5] as i}
				<rect x={24 + i * 17} y="34" width="11" height="9" rx="1.5" fill="#3a3f46" />
				<rect x={26 + i * 17} y="48" width="7" height="3" rx="1" fill="#31a3e3" />
			{/each}
			<rect x="128" y="34" width="10" height="17" rx="2" fill="#0c67ba" />
			<path d="M0 12h46M10 4h28" stroke="#0c67ba" stroke-width="4" stroke-linecap="round" />
		</svg>
	</a>

	<a class="cell" href={href('/products#finder')}>
		<h3 class="title">{products.label}</h3>
		<p class="big">{products.value}</p>
	</a>

	<!-- DJI store card: title on top, a cut-out product photo running off the bottom-right edge -->
	<a class="cell photo" href={href('/solutions#applications')}>
		<h3 class="title">Video walls & multiview built in</h3>
		<Img src={img('why-video-wall.png')} alt="" loading="lazy" width="720" height="712">{#snippet fallback()}{/snippet}</Img>
	</a>

	<a class="cell" href={href('/technology')}>
		<h3 class="title">InstaSwitch: no glitch on change</h3>
		<svg class="glyph" viewBox="0 0 160 80" aria-hidden="true">
			<rect x="8" y="14" width="56" height="40" rx="3" fill="#3a3f46" />
			<rect x="96" y="14" width="56" height="40" rx="3" fill="#0c67ba" />
			<path d="M70 34h18m-7-8 8 8-8 8" fill="none" stroke="#31a3e3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M28 66h16M116 66h16" stroke="#d9d9d9" stroke-width="4" stroke-linecap="round" />
		</svg>
	</a>

	<!-- AI Ready: the three agentic-AI points take turns, then the platforms it works with slide
	     past one at a time (CSS only; the full text of the points is on Developers) -->
	<a class="cell members ai-ready" href={href('/developers#ai')}>
		{#if aiBackdrop}<img class="ai-bg" src={aiBackdrop} alt="" loading="lazy" width="1600" height="1600" />{/if}
		<h3 class="title">AI Ready</h3>
		<ul role="list" class="ai-points">
			{#each aiPoints as p, i}
				<li style={`--i:${i}`}>
					<AiIcon icon={p.icon} size={48} delay={i * 0.9} />
					<p class="ai-title">{p.title}</p>
				</li>
			{/each}
		</ul>
		<span class="ai-dots" aria-hidden="true">{#each aiPoints as _, i}<span style={`--i:${i}`}></span>{/each}</span>
		<p class="works">Works with</p>
		<ul role="list" class="agents">
			{#each agentPlatforms as a, i}
				<li style={`--i:${i}`}><img src={a.logo} alt="" width="16" height="16" />{a.name}</li>
			{/each}
			<li class="more" style={`--i:${agentPlatforms.length}`}><Plus size={14} strokeWidth={2} aria-hidden="true" /><span class="long">Other agent platforms</span><span class="short" aria-hidden="true">Others</span></li>
		</ul>
	</a>
</div>

<style>
	/* 4 columns × 6 half-rows: tall | 2 stacked | 2 stacked | short over tall */
	.bento {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(6, minmax(64px, auto));
		gap: 16px;
	}
	.cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--s-md);
		padding: var(--s-xl) var(--s-lg);
		border-radius: var(--r-sm);
		background: var(--canvas);
		color: var(--ink);
		text-align: center;
		text-decoration: none;
		grid-row: span 3;
	}
	.cell:hover .title {
		color: var(--primary);
	}
	.latency {
		grid-column: 1;
		grid-row: 1 / 7;
	}
	.latency-body {
		display: grid;
		gap: var(--s-xs);
		width: 100%;
		margin-block: auto;
	}
	.cell:nth-child(4) {
		grid-column: 4;
		grid-row: 1 / 3;
	}
	.members {
		grid-column: 4;
		grid-row: 3 / 7;
	}
	.title {
		font-size: var(--fs-subhead);
		font-weight: var(--w-bold);
		letter-spacing: var(--track-body);
		line-height: 1.25;
		transition: color 0.15s ease;
	}
	.big {
		margin-block: auto;
		font-size: clamp(2.5rem, 1.8rem + 2.2vw, 3.75rem);
		font-weight: var(--w-bold);
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--primary);
	}
	.latency .big {
		margin-block: 0 var(--s-xl);
	}
	.frame {
		position: relative;
		height: 28px;
		border-radius: var(--r-xs);
		background: var(--fog);
		box-shadow: inset 0 0 0 1px var(--card-border);
	}
	.sliver {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: max(2px, calc(100% / 150));
		border-radius: var(--r-xs) 0 0 var(--r-xs);
		background: var(--primary);
	}
	.frame-legend {
		display: flex;
		justify-content: space-between;
		font-size: var(--fs-caption);
		font-weight: var(--w-bold);
		color: var(--ink-tertiary);
	}
	.latency .note {
		margin-top: var(--s-md);
	}
	.cell:nth-child(4) .big {
		margin-block: 0;
	}
	.glyph {
		width: min(100%, 180px);
		margin-block: auto;
	}
	/* the photo is a bit wider than the card, tilted a few degrees and cropped by its edges;
	   drop-shadow follows the cut-out's outline (the one shadow allowed in these cards) */
	.photo {
		position: relative;
		overflow: hidden;
	}
	.photo .title {
		position: relative;
		z-index: 1;
	}
	.photo :global(img) {
		position: absolute;
		left: -6%;
		/* just under the title (two lines on desktop, up to three on phones) */
		top: max(22%, 62px);
		width: 112%;
		height: auto;
		max-width: none;
		rotate: -4deg;
		filter: drop-shadow(0 12px 14px rgb(0 0 0 / 0.22)) drop-shadow(0 2px 3px rgb(0 0 0 / 0.12));
		transition: translate 0.4s ease;
	}
	.photo:hover :global(img) {
		translate: 0 -6px;
	}
	.note {
		font-size: var(--fs-ui);
		color: var(--ink-secondary);
	}
	/* ── AI Ready ── same blurred backdrop and light veil as the AI band on Developers */
	.ai-ready {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		gap: var(--s-sm);
		/* narrower side padding so the pills sit two to a row and the card stays compact */
		padding-inline: var(--s-md);
	}
	.ai-bg {
		position: absolute;
		inset: 0;
		z-index: -2;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.ai-ready::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: rgb(247 248 251 / 0.72);
	}
	/* the three points share one spot and take turns: 4 s each, 12 s per cycle */
	.ai-points {
		display: grid;
		flex: 1;
		align-items: center;
		width: 100%;
		margin: 0;
		padding: 0;
	}
	.ai-points li {
		grid-area: 1 / 1;
		display: grid;
		justify-items: center;
		gap: 6px;
		opacity: 0;
		animation: ai-turn 12s ease-in-out calc(var(--i) * 4s) infinite;
	}
	.ai-points :global(.ai-icon) {
		margin-bottom: 6px;
	}
	.ai-title {
		font-size: var(--fs-body);
		font-weight: var(--w-bold);
		line-height: 1.25;
	}
	@keyframes ai-turn {
		0% {
			opacity: 0;
			transform: translateY(14px);
		}
		5%,
		29% {
			opacity: 1;
			transform: none;
		}
		34%,
		100% {
			opacity: 0;
			transform: translateY(-14px);
		}
	}
	.ai-dots {
		display: flex;
		gap: 6px;
	}
	.ai-dots span {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--primary);
		opacity: 0.25;
		animation: ai-dot 12s ease-in-out calc(var(--i) * 4s) infinite;
	}
	@keyframes ai-dot {
		0%,
		34%,
		100% {
			opacity: 0.25;
			transform: none;
		}
		5%,
		29% {
			opacity: 1;
			transform: scale(1.3);
		}
	}
	.works {
		margin-top: var(--s-xs);
		font-size: var(--fs-caption);
		font-weight: var(--w-bold);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--ink-secondary);
	}
	/* one pill at a time: each slides in from the right, holds, slides out to the left.
	   4 pills × 2 s = 8 s per cycle; the strip's edges fade so they enter and leave softly */
	.agents {
		display: grid;
		justify-items: center;
		width: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
		mask-image: linear-gradient(90deg, transparent, #000 12px, #000 calc(100% - 12px), transparent);
	}
	.agents li {
		grid-area: 1 / 1;
		opacity: 0;
		animation: pill-slide 8s cubic-bezier(0.4, 0, 0.2, 1) calc(var(--i) * 2s) infinite;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 30px;
		padding: 4px 12px 4px 9px;
		border: 1px solid var(--divider);
		border-radius: var(--r-full);
		background: var(--canvas);
		font-size: var(--fs-caption);
		font-weight: var(--w-medium);
		white-space: nowrap;
	}
	.agents img {
		width: 16px;
		height: 16px;
	}
	.agents .more {
		border-style: dashed;
		border-color: var(--steel);
		background: rgb(255 255 255 / 0.6);
		color: var(--ink-secondary);
	}
	/* "Others" only where the card is too narrow for the full label (phones) */
	.more .short {
		display: none;
	}
	@keyframes pill-slide {
		0% {
			opacity: 0;
			transform: translateX(90px);
		}
		5%,
		20% {
			opacity: 1;
			transform: none;
		}
		25%,
		100% {
			opacity: 0;
			transform: translateX(-90px);
		}
	}
	/* reduced motion: the first point stays put, the pills sit side by side */
	@media (prefers-reduced-motion: reduce) {
		.ai-points li,
		.ai-dots span {
			animation: none;
		}
		.ai-points li:first-child {
			opacity: 1;
		}
		.agents {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 6px;
			mask-image: none;
		}
		.agents li {
			opacity: 1;
			animation: none;
		}
	}
	@media (max-width: 900px) {
		.bento {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: none;
		}
		.cell,
		.latency,
		.cell:nth-child(4),
		.members {
			grid-column: auto;
			grid-row: auto;
			min-height: 200px;
		}
		/* latency on its own row, then the other six two by two: no card left alone */
		.latency {
			grid-column: 1 / -1;
		}
		/* wide, short cards here: room for the photo below the title */
		.photo {
			min-height: 270px;
		}
	}
	@media (max-width: 480px) {
		.bento {
			gap: 12px;
		}
		.cell,
		.latency,
		.cell:nth-child(4),
		.members {
			min-height: 160px;
			padding: var(--s-md) var(--s-sm);
			gap: var(--s-sm);
		}
		.title {
			font-size: var(--fs-body);
		}
		/* half-width AI card: short label on screen, full label still read out */
		.more .long {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
		}
		.more .short {
			display: inline;
		}
		/* taller, so the photo shows more than its top edge (the row's other card grows with it) */
		.photo {
			min-height: 200px;
		}
		.photo :global(img) {
			top: 48px;
		}
		.big {
			font-size: 2.25rem;
		}
		.latency .big {
			font-size: 3rem;
		}
	}
</style>

<script>
	// DJI "Why shop with DJI Store" bento: white cards on the grey band, title on top,
	// one big graphic below. Figures come from `stats` in site.js, the AI card from ai.js.
	import AiIcon from '$lib/components/AiIcon.svelte';
	import { Plus } from '@lucide/svelte';
	import { stats, img, localImg } from '$lib/content/site.js';
	import { aiPoints, agentPlatforms } from '$lib/content/ai.js';
	import { href } from '$lib/link.js';
	import scadaVideo from '$lib/assets/video/instaswitch-scada.mp4?url';
	import cityVideo from '$lib/assets/video/instaswitch-city.mp4?url';

	const [latency, video, products] = stats;
	const aiBackdrop = localImg('ai-band-bg.jpg');

	// InstaSwitch monitor: both clips play only while the card is on screen (nothing loads before),
	// so the hover switch is instant. Without hover (touch screens) the source switches by
	// itself every 3 s. Reduced motion: no playback, the posters still switch on hover.
	// The posters are set only when the card gets near the screen: a poster attribute downloads
	// straight away, and they would compete with the hero photo for bandwidth.
	let instaCard;
	let videoA;
	let videoB;
	let altSource = $state(false);
	let near = $state(false);
	$effect(() => {
		const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const touch = matchMedia('(hover: none)').matches;
		let timer;
		const soon = new IntersectionObserver(([e]) => {
			if (e.isIntersecting) {
				near = true;
				soon.disconnect();
			}
		}, { rootMargin: '600px 0px' });
		soon.observe(instaCard);
		const io = new IntersectionObserver(([e]) => {
			for (const v of [videoA, videoB]) {
				if (e.isIntersecting && !still) v.play().catch(() => {});
				else v.pause();
			}
			clearInterval(timer);
			if (e.isIntersecting && touch) timer = setInterval(() => (altSource = !altSource), 3000);
		}, { threshold: 0.3 });
		io.observe(instaCard);
		return () => {
			soon.disconnect();
			io.disconnect();
			clearInterval(timer);
		};
	});
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
		<h3 class="title">Runs on standard 10G switches</h3>
		<!-- a NETGEAR 10G switch, cut out along its outline (images-src/why-switch.png) -->
		<img class="switch" src={img('why-switch.png')} alt="" loading="lazy" width="638" height="155" />
	</a>

	<a class="cell" href={href('/products#finder')}>
		<h3 class="title">{products.label}</h3>
		<p class="big">{products.value}</p>
	</a>

	<!-- DJI store card: title on top, a cut-out product photo running off the bottom-right edge -->
	<a class="cell photo" href={href('/solutions#applications')}>
		<h3 class="title">Video walls & multiview built in</h3>
		<!-- three stacked layers cut from one photo (images-src/why-video-wall*.png): the wall,
		     and the two detached panels, which lift further on hover -->
		<span class="wall" aria-hidden="true">
			<img class="base" src={img('why-video-wall-base.png')} alt="" loading="lazy" width="720" height="712" />
			<img class="piece p2" src={img('why-video-wall-panel-2.png')} alt="" loading="lazy" width="720" height="712" />
			<img class="piece p3" src={img('why-video-wall-panel-3.png')} alt="" loading="lazy" width="720" height="712" />
		</span>
	</a>

	<!-- InstaSwitch: a monitor playing a control-room feed; on hover the source switches to a city
	     feed in the same frame, with no fade (that is the point). Clips: Pexels, free licence. -->
	<a class="cell insta" class:alt={altSource} href={href('/technology')} bind:this={instaCard}>
		<h3 class="title">InstaSwitch: no glitch on change</h3>
		<!-- the area left under the title; the monitor hangs from its top edge, so it never reaches the text -->
		<span class="monitor-area" aria-hidden="true">
			<span class="monitor">
				<span class="screen">
					<video class="src-a" bind:this={videoA} src={scadaVideo} poster={near ? img('instaswitch-scada-poster.jpg') : undefined} muted loop playsinline preload="none" width="640" height="360"></video>
					<video class="src-b" bind:this={videoB} src={cityVideo} poster={near ? img('instaswitch-city-poster.jpg') : undefined} muted loop playsinline preload="none" width="640" height="360"></video>
				</span>
				<img class="bezel" src={img('instaswitch-monitor.png')} alt="" loading="lazy" width="640" height="566" />
			</span>
		</span>
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
		transition: box-shadow 0.3s ease;
	}
	/* DJI store: the card lifts off the grey band with a soft shadow (titles keep their colour) */
	.cell:hover {
		box-shadow:
			0 8px 20px rgb(0 0 0 / 0.12),
			0 2px 4px rgb(0 0 0 / 0.08);
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
		color: var(--sdvoe-deep-blue);
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
	/* cut-out photo: drop-shadow follows its outline; on hover it comes forward, the shadow deepens */
	.switch {
		width: min(100%, 300px);
		height: auto;
		margin-block: auto;
		filter: drop-shadow(0 8px 10px rgb(0 0 0 / 0.18)) drop-shadow(0 2px 3px rgb(0 0 0 / 0.1));
		transition:
			scale 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
			filter 0.45s ease;
	}
	.cell:hover .switch {
		scale: 1.08;
		filter: drop-shadow(0 16px 18px rgb(0 0 0 / 0.24)) drop-shadow(0 4px 6px rgb(0 0 0 / 0.12));
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
	.wall {
		position: absolute;
		left: -6%;
		/* just under the title (two lines on desktop, up to three on phones) */
		top: max(22%, 62px);
		width: 112%;
		aspect-ratio: 720 / 712;
		rotate: -4deg;
		pointer-events: none;
		/* one shadow for the composed layers (a filter on each overlapping layer paints wrong
		   in Chrome); it is worked out from the layers' current positions, so it follows the
		   panels as they move */
		filter: drop-shadow(0 12px 14px rgb(0 0 0 / 0.22)) drop-shadow(0 2px 3px rgb(0 0 0 / 0.12));
	}
	.wall img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		max-width: none;
		transition: translate 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	/* on hover the wall rises a little and the detached panels pull away from it, the farther
	   one the most */
	.photo:hover .base {
		translate: 0 -6px;
	}
	.photo:hover .p2 {
		translate: 6px -16px;
	}
	.photo:hover .p3 {
		translate: 12px -26px;
	}
	/* ── InstaSwitch monitor: the clips sit behind the bezel image, in its (transparent) screen.
	   Screen position measured on the artwork: 3.28% / 3.93%, 93.44% × 55.68% of the image. */
	/* large and cropped by the card's bottom edge, like the LED wall: the stand runs off the card */
	.insta {
		position: relative;
		overflow: hidden;
	}
	/* fills the card below the title (and the gap after it) without adding height of its own */
	.monitor-area {
		position: relative;
		display: block;
		flex: 1 1 0;
		align-self: stretch;
		min-height: 0;
	}
	/* The card's bottom edge (the area plus the card's bottom padding, --pad-b) always cuts the
	   monitor at 90% of its height, half-way down the stand. It is as tall as the room under the
	   title allows, but never wider than the card; when the width is what limits it (narrow
	   cards), it moves down so the cut stays on the stand. */
	.insta {
		--pad-b: var(--s-xl);
	}
	.monitor-area {
		container-type: size;
	}
	.monitor {
		--h: min(calc((100cqh + var(--pad-b)) / 0.9), calc(100cqw * 566 / 640));
		position: absolute;
		top: calc(100cqh + var(--pad-b) - 0.9 * var(--h));
		left: 50%;
		display: block;
		height: var(--h);
		aspect-ratio: 640 / 566;
		translate: -50% 0;
	}
	.screen {
		position: absolute;
		left: 3.28%;
		top: 3.93%;
		width: 93.44%;
		height: 55.68%;
		overflow: hidden;
		background: #0b0d10;
	}
	.screen video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	/* the switch: no transition on purpose — instant, like the real thing */
	.src-b {
		visibility: hidden;
	}
	.insta:hover .src-b,
	.insta.alt .src-b {
		visibility: visible;
	}
	.bezel {
		position: relative;
		width: 100%;
		height: auto;
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
		.ai-points li {
			animation: none;
		}
		.cell:hover .switch {
			scale: none;
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
		.insta {
			--pad-b: var(--s-md);
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
		.wall {
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

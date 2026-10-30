<script>
	// Hero backdrop: a bundle of three neon fibres sweeping up from the lower right, with light
	// pulses racing along them (speed, low latency, smooth flow). Pure SVG + CSS, no JS.
	// - Fibres: stacked translucent strokes (no blur filters) with a gradient along their length,
	//   so they fade in from the bottom and thin out towards the exit.
	// - Each pulse: a tail that fades away behind it (several translucent dashes of growing length,
	//   all ending at the head, so it hugs the curve) and a comet riding the same curve with CSS
	//   motion path (compositor): tapered gradient body, bright tip, soft glow. Pulses blend with
	//   "screen", so they add light to the photo instead of painting over it.
	// Paths use pathLength="1000": dash lengths and offsets are in thousandths of a fibre.
	// transparent: no black base, for use over a photo (the blue glow and the fibres stay).

	let { transparent = false } = $props();

	// Nested arcs: each enters almost flat from the bottom and bends up steeply. The first leaves
	// through the top edge (kept right of the headline and buttons), the second through the right
	// edge near the top, the third, shorter, through the right edge half-way up.
	const fibres = [
		{ from: [420, 830], to: [1110, -30], d: 'M420 830C860 760 1080 420 1110 -30', core: 0.5, width: 1.1 },
		{ from: [760, 830], to: [1470, 80], d: 'M760 830C1130 760 1360 470 1470 80', core: 0.95, width: 1.6 },
		{ from: [1080, 840], to: [1470, 430], d: 'M1080 840C1270 790 1410 640 1470 430', core: 0.5, width: 1.1 }
	];

	// Tail: stacked dashes ending at the head; overlapping near the head, alone further back.
	const tail = [
		{ len: 70, width: 2.2, opacity: 0.32 },
		{ len: 150, width: 1.8, opacity: 0.22 },
		{ len: 260, width: 1.4, opacity: 0.14 },
		{ len: 400, width: 1.1, opacity: 0.08 }
	];
	const pulses = [
		{ fibre: 1, dur: 2.2, delay: 0 },
		{ fibre: 1, dur: 2.2, delay: 1.1 },
		{ fibre: 0, dur: 2.8, delay: 0.5 },
		{ fibre: 0, dur: 2.8, delay: 1.9 },
		{ fibre: 2, dur: 1.9, delay: 0.9 },
		{ fibre: 2, dur: 1.9, delay: 2.1 }
	];
	// The head runs from the start (0) to the end (1000) of its fibre: dashoffset = len − head.
	// --rest freezes the pulse part-way for reduced motion.
	const offsets = (len, rest) => `--len:${len}; --from:${len}; --to:${len - 1000}; --rest:${len - rest}`;
</script>

<svg viewBox="0 0 1440 800" preserveAspectRatio="xMaxYMid slice" class="neon" aria-hidden="true">
	<defs>
		<radialGradient id="neon-bg" cx="0.78" cy="0.42" r="0.55">
			<stop offset="0" stop-color="#0C67BA" stop-opacity="0.5" />
			<stop offset="1" stop-color="#0C67BA" stop-opacity="0" />
		</radialGradient>
		{#each fibres as f, i}
			<linearGradient id={`neon-fibre-${i}`} gradientUnits="userSpaceOnUse" x1={f.from[0]} y1={f.from[1]} x2={f.to[0]} y2={f.to[1]}>
				<stop offset="0" stop-color="#31A3E3" stop-opacity="0" />
				<stop offset="0.3" stop-color="#31A3E3" />
				<stop offset="0.8" stop-color="#5bb8ec" />
				<stop offset="1" stop-color="#5bb8ec" stop-opacity="0.2" />
			</linearGradient>
		{/each}
		<!-- comet body: transparent at the back, white at the tip (it points along +x) -->
		<linearGradient id="neon-comet">
			<stop offset="0" stop-color="#31A3E3" stop-opacity="0" />
			<stop offset="0.6" stop-color="#5bb8ec" stop-opacity="0.65" />
			<stop offset="0.92" stop-color="#d6efff" />
			<stop offset="1" stop-color="#ffffff" />
		</linearGradient>
		<radialGradient id="neon-halo">
			<stop offset="0" stop-color="#7cc8f0" stop-opacity="0.45" />
			<stop offset="0.45" stop-color="#31A3E3" stop-opacity="0.18" />
			<stop offset="1" stop-color="#31A3E3" stop-opacity="0" />
		</radialGradient>
		<radialGradient id="neon-tip">
			<stop offset="0" stop-color="#ffffff" stop-opacity="0.9" />
			<stop offset="0.35" stop-color="#bfe6ff" stop-opacity="0.45" />
			<stop offset="1" stop-color="#31A3E3" stop-opacity="0" />
		</radialGradient>
	</defs>

	{#if !transparent}<rect width="1440" height="800" fill="#07090c" />{/if}
	<rect width="1440" height="800" fill="url(#neon-bg)" />

	<!-- the fibres: wide faint halo, narrower halo, thin core, all fading along their length -->
	<g class="fibres" fill="none" stroke-linecap="round">
		{#each fibres as f, i}
			<path d={f.d} stroke={`url(#neon-fibre-${i})`} stroke-width="20" stroke-opacity="0.05" />
			<path d={f.d} stroke={`url(#neon-fibre-${i})`} stroke-width="6" stroke-opacity="0.13" />
			<path d={f.d} stroke={`url(#neon-fibre-${i})`} stroke-width={f.width} stroke-opacity={f.core} />
		{/each}
	</g>

	<!-- the light pulses -->
	{#each pulses as p, i}
		{@const d = fibres[p.fibre].d}
		<g class="pulse" style={`--dur:${p.dur}s; --delay:${p.delay}s; --path:path('${d}')`}>
			{#each tail as t}
				<path class="tail" {d} pathLength="1000" fill="none" stroke-linecap="round" stroke-width={t.width} stroke-opacity={t.opacity} style={offsets(t.len, 420 + i * 90)} />
			{/each}
			<g class="comet">
				<ellipse cx="-26" rx="86" ry="15" fill="url(#neon-halo)" />
				<path d="M2.2 0C2.2 1.2 1.2 2.2 0 2.2L-64 0.35V-0.35L0 -2.2C1.2 -2.2 2.2 -1.2 2.2 0Z" fill="url(#neon-comet)" />
				<circle r="11" fill="url(#neon-tip)" />
			</g>
		</g>
	{/each}
</svg>

<style>
	.neon {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.fibres {
		animation: breathe 5s ease-in-out infinite alternate;
	}
	/* light adds to what is underneath */
	.pulse {
		mix-blend-mode: screen;
	}
	.tail,
	.comet {
		/* quick launch, long glide out: reads as speed */
		animation: var(--dur) cubic-bezier(0.3, 0.1, 0.2, 1) var(--delay) infinite;
	}
	.tail {
		stroke: #31a3e3;
		stroke-dasharray: var(--len) 3000;
		stroke-dashoffset: var(--from);
		animation-name: run;
	}
	/* the comet needs CSS motion path; without it only the tail runs */
	.comet {
		display: none;
	}
	@supports (offset-path: path('M0 0H1')) {
		.comet {
			display: inline;
			offset-path: var(--path);
			offset-rotate: auto;
			animation-name: ride;
		}
	}
	/* travel for 85% of the cycle, then a short rest off the end of the fibre */
	@keyframes run {
		0% {
			stroke-dashoffset: var(--from);
		}
		85%,
		100% {
			stroke-dashoffset: var(--to);
		}
	}
	@keyframes ride {
		0% {
			offset-distance: 0%;
		}
		85%,
		100% {
			offset-distance: 100%;
		}
	}
	@keyframes breathe {
		from {
			opacity: 0.8;
		}
		to {
			opacity: 1;
		}
	}
	/* reduced motion: still fibres with the tails frozen part-way along */
	@media (prefers-reduced-motion: reduce) {
		.fibres,
		.tail {
			animation: none;
		}
		.tail {
			stroke-dashoffset: var(--rest);
		}
		.comet {
			display: none;
		}
	}
</style>

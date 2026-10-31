<script>
	// Backdrop for a dark header: one beam of light per colour, each gliding horizontally with a
	// long tail that fades behind it (no fixed lines: the light is only where the beam is).
	// Lighter than the home hero's neon pulses: thin, translucent, no blending.
	// Only transforms animate (each comet on its own GPU layer), so the page never repaints for them.
	let { colors } = $props();

	// Height (% of the header), duration and delay (s), beam length with its tail (px) for each beam,
	// in the order of `colors`; negative delays so the beams are already spread out when the page opens.
	const layout = [
		[14, 9.5, -2, 340],
		[71, 12, -7, 400],
		[33, 10.5, -4.5, 280],
		[88, 8.5, -1, 360],
		[24, 13, -9, 440],
		[58, 9, -6, 300],
		[45, 11.5, -3, 380],
		[80, 10, -8.5, 280],
		[8, 12.5, -5.5, 360],
		[64, 8, -0.5, 320],
		[38, 14, -11, 460]
	];
	const beams = $derived(colors.map((c, i) => { const [y, dur, delay, len] = layout[i % layout.length]; return { c, y, dur, delay, len }; }));
</script>

<div class="beams" aria-hidden="true">
	{#each beams as { c, y, dur, delay, len }}
		<div class="beam" style={`--c:${c}; --y:${y}%; --dur:${dur}s; --delay:${delay}s; --len:${len}px`}>
			<span class="run"><span class="comet"></span></span>
		</div>
	{/each}
</div>

<style>
	.beams {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}
	.beam {
		position: absolute;
		inset-inline: 0;
		top: var(--y);
	}
	/* a full-width runner with the comet at its right end: it slides from fully left of the header
	   (comet just off the left edge) to one comet-length right of it (comet just off the right edge),
	   then rests off screen for the last part of the cycle */
	.run {
		position: absolute;
		inset-inline: 0;
		transform: translate3d(-100%, 0, 0);
		animation: sweep var(--dur) cubic-bezier(0.45, 0.05, 0.55, 0.95) var(--delay) infinite;
		will-change: transform;
	}
	.comet {
		position: absolute;
		right: 0;
		top: -0.5px;
		width: var(--len);
		height: 2px;
		border-radius: 1px;
		/* long fading tail, full colour near the head, white tip */
		background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--c) 35%, transparent) 45%, var(--c) 85%, #fff);
		opacity: 0.7;
	}
	/* soft glow around the comet, drawn once: the layer only moves */
	.comet::before {
		content: '';
		position: absolute;
		inset: -6px 0;
		border-radius: 50%;
		background: linear-gradient(90deg, transparent 55%, var(--c));
		filter: blur(6px);
		opacity: 0.55;
	}
	@keyframes sweep {
		0% {
			transform: translate3d(-100%, 0, 0);
		}
		80%,
		100% {
			transform: translate3d(var(--len), 0, 0);
		}
	}
	/* reduced motion: no beams, the backdrop stays still */
	@media (prefers-reduced-motion: reduce) {
		.run {
			display: none;
		}
	}
</style>

<script>
	import Img from '$lib/components/Img.svelte';
	import { img } from '$lib/content/site.js';
	let { logos, marquee = false } = $props();

	// Marquee logos start lazy (they don't compete with the hero while the page loads); once the row
	// comes near the screen they all switch to eager, so none pops in while it scrolls past.
	let row;
	let near = $state(false);
	$effect(() => {
		if (!row) return;
		const io = new IntersectionObserver(([e]) => e.isIntersecting && ((near = true), io.disconnect()), { rootMargin: '400px 0px' });
		io.observe(row);
		return () => io.disconnect();
	});
</script>

{#if marquee}
	<div class="marquee" aria-label="SDVoE Alliance members" bind:this={row}>
		<ul role="list" class="track">
			{#each [...logos, ...logos] as [name, file], i}
				<!-- plain <img>, not the Img component: the logos are local files, and 76 components
				     with their own error state were a measurable part of the home's start-up work -->
				<li class="tile" aria-hidden={i >= logos.length ? 'true' : undefined}>
					<img src={img(file)} alt={i < logos.length ? name : ''} loading={near ? 'eager' : 'lazy'} decoding="async" width="140" height="60" draggable="false" />
				</li>
			{/each}
		</ul>
	</div>
{:else}
	<ul role="list" class="wall">
		{#each logos as [name, file]}
			<li class="tile"><Img src={img(file)} alt={name} loading="lazy" width="140" height="60" draggable="false">{#snippet fallback()}<span class="name">{name}</span>{/snippet}</Img></li>
		{/each}
	</ul>
{/if}

<style>
	.tile {
		display: grid;
		place-items: center;
		height: 96px;
		padding: 14px 20px;
	}
	.tile :global(img) {
		max-height: 52px;
		width: auto;
		object-fit: contain;
	}
	/* Full colour, no tile: the logo files have white backgrounds, multiply drops them on a light band.
	   Not in the marquee: a blend mode repaints the whole row on every frame and makes it stutter
	   (the marquee sits on white, where the backgrounds don't show anyway). */
	.wall .tile :global(img) {
		mix-blend-mode: multiply;
	}
	.name {
		color: var(--ink);
		font-weight: var(--w-bold);
		font-size: var(--fs-ui);
		letter-spacing: var(--track-body);
		text-align: center;
		line-height: 1.15;
	}
	.wall {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: var(--tile-gap);
		margin: 0;
	}
	/* runs continuously (no pause on hover); logos can't be selected or dragged */
	.marquee {
		overflow: hidden;
		mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
		user-select: none;
		-webkit-user-select: none;
	}
	.marquee :global(img) {
		-webkit-user-drag: none;
		pointer-events: none;
	}
	/* the row moves on its own GPU layer, so each frame is only a shift, never a repaint */
	.track {
		display: flex;
		gap: var(--tile-gap);
		width: max-content;
		margin: 0;
		animation: scroll 45s linear infinite;
		will-change: transform;
		backface-visibility: hidden;
	}
	.track .tile {
		width: 180px;
	}
	@keyframes scroll {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(calc(-50% - var(--tile-gap) / 2), 0, 0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
			flex-wrap: wrap;
			width: auto;
		}
	}
</style>

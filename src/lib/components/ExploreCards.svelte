<script>
	// DJI "What's Hot" product cards: square, rounded, a photographic backdrop with a dark scrim
	// at the bottom for the copy, and an optional cut-out object that overhangs the top edge.
	// Three up on wide screens with the fourth peeking in; a scroll-snap row with arrows.
	//
	// Per card:  backdrop  photo filling the card (cover), e.g. 'explore-certified-bg.jpg'
	//            cutout    transparent PNG/WebP of an object, drawn over the top edge
	// Both go through img() (src/lib/assets/img). A card with neither shows its gradient
	// and the placeholder vector render.
	import Img from '$lib/components/Img.svelte';
	import Render from '$lib/components/Render.svelte';
	import { img } from '$lib/content/site.js';
	import { href } from '$lib/link.js';

	let { cards } = $props();
	// keep room above the row only when something actually overhangs
	const overhang = $derived(cards.some((c) => c.cutout || !c.backdrop));

	let track = $state();
	let canPrev = $state(false);
	let canNext = $state(false);

	// Arrows go to an exact card. While a smooth scroll is still running, the next click counts
	// from where that scroll is heading, not from the half-way position, so no click is lost.
	let target = null;
	let settle;

	function update() {
		if (!track) return;
		canPrev = track.scrollLeft > 4;
		canNext = track.scrollLeft + track.clientWidth < track.scrollWidth - 4;
		clearTimeout(settle);
		settle = setTimeout(() => (target = null), 150);
	}
	function step(dir) {
		const starts = [...track.children].map((li) => li.offsetLeft - track.firstElementChild.offsetLeft);
		const max = track.scrollWidth - track.clientWidth;
		const nearest = starts.reduce((best, x, i) => (Math.abs(x - track.scrollLeft) < Math.abs(starts[best] - track.scrollLeft) ? i : best), 0);
		target = Math.max(0, Math.min(starts.length - 1, (target ?? nearest) + dir));
		track.scrollTo({ left: Math.min(starts[target], max), behavior: 'smooth' });
	}

	$effect(() => {
		update();
		const ro = new ResizeObserver(update);
		ro.observe(track);
		return () => ro.disconnect();
	});
</script>

<div class="wrap" class:flat={!overhang}>
	<ul role="list" class="track" bind:this={track} onscroll={update}>
		{#each cards as c}
			<li class="card on-dark" class:has-cutout={c.cutout}>
				<div class="surface" style={`--bg: ${c.bg}`}>
					{#if c.backdrop}<Img src={img(c.backdrop)} alt="" loading="lazy" width="800" height="800">{#snippet fallback()}{/snippet}</Img>{/if}
				</div>
				<!-- the vector render is only a stand-in: a card with a photo shows no object until it gets a cutout -->
				{#if c.cutout || !c.backdrop}
					<div class="art">
						{#if c.cutout}
							<Img src={img(c.cutout)} alt="" loading="lazy" width="800" height="600">{#snippet fallback()}{/snippet}</Img>
						{:else}
							<Render kind={c.render} tone={c.tone} tight />
						{/if}
					</div>
				{/if}
				<div class="copy">
					<p class="tier">{c.tier}</p>
					<h3 class="name">{c.name}</h3>
					<p class="tagline">{c.tagline}</p>
					<div class="foot">
						<span class="fact">{c.fact}</span>
						<a class="btn btn-white" href={href(c.href)}>{c.cta}<span class="visually-hidden">: {c.name}</span></a>
					</div>
				</div>
			</li>
		{/each}
	</ul>
	{#if canPrev}
		<button class="arrow-btn prev" aria-label="Previous" onclick={() => step(-1)}>
			<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" stroke-width="2" /></svg>
		</button>
	{/if}
	{#if canNext}
		<button class="arrow-btn next" aria-label="Next" onclick={() => step(1)}>
			<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="m7.5 4 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" /></svg>
		</button>
	{/if}
</div>

<style>
	.wrap {
		position: relative;
		--overhang: 80px;
	}
	.wrap.flat {
		--overhang: 0px;
	}
	.track {
		display: grid;
		grid-auto-flow: column;
		/* three cards per view; the fourth peeks in */
		grid-auto-columns: calc((100% - 2 * 16px) / 3.15);
		gap: 16px;
		margin: 0;
		/* room for the objects that overhang the cards */
		padding-top: var(--overhang);
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	}
	.track::-webkit-scrollbar {
		display: none;
	}
	.card {
		position: relative;
		aspect-ratio: 1 / 1;
		color: #fff;
		scroll-snap-align: start;
	}
	/* background layer: gradient, optional photo, and a scrim so the copy always reads */
	.surface {
		position: absolute;
		inset: 0;
		overflow: hidden;
		border-radius: var(--r-sm);
		background: var(--bg);
	}
	.surface :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
	}
	.card:hover .surface :global(img) {
		transform: scale(1.04);
	}
	/* the object sits over the top edge: its upper part overhangs the card */
	.art {
		position: absolute;
		top: calc(-1 * var(--overhang));
		left: 8%;
		right: 8%;
		height: calc(48% + var(--overhang));
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.4s ease;
		pointer-events: none;
	}
	.art :global(img),
	.art :global(svg) {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		object-fit: contain;
	}
	.art :global(svg) {
		width: 100%;
	}
	.card:hover .art {
		transform: translateY(-8px);
	}
	.copy {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		display: grid;
		gap: 6px;
		padding: var(--s-xl) clamp(20px, 2vw, 28px);
	}
	/* scrim tied to the copy block, so the text reads on light photos at any card size */
	.copy::before {
		content: '';
		position: absolute;
		inset: -72px 0 0;
		z-index: -1;
		border-radius: 0 0 var(--r-sm) var(--r-sm);
		background: linear-gradient(180deg, transparent, rgb(0 0 0 / 0.55) 72px, rgb(0 0 0 / 0.8));
	}
	.tier {
		font-size: var(--fs-caption);
	}
	.name {
		font-size: clamp(1.25rem, 1rem + 0.7vw, 1.625rem);
		font-weight: var(--w-bold);
		letter-spacing: var(--track-heading);
		line-height: 1.15;
		color: #fff;
	}
	.tagline {
		color: rgb(255 255 255 / 0.8);
		font-size: var(--fs-ui);
		line-height: 1.4;
	}
	.foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--s-sm);
		margin-top: var(--s-md);
	}
	.fact {
		font-size: var(--fs-ui);
		white-space: nowrap;
	}
	.foot .btn {
		flex: none;
		min-height: 36px;
		padding-inline: 16px;
		font-size: var(--fs-ui);
	}
	/* above the cards' copy (z-index 1), so a click on an arrow never lands on the card under it */
	.arrow-btn {
		position: absolute;
		z-index: 2;
		top: calc(50% + var(--overhang) / 2);
		translate: 0 -50%;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border: 0;
		border-radius: var(--r-full);
		background: rgb(0 0 0 / 0.55);
		color: #fff;
		cursor: pointer;
	}
	.arrow-btn:hover {
		background: rgb(0 0 0 / 0.75);
	}
	.prev {
		left: 8px;
	}
	.next {
		right: 8px;
	}
	@media (max-width: 900px) {
		.track {
			grid-auto-columns: calc((100% - 16px) / 2.15);
		}
	}
	@media (max-width: 600px) {
		.wrap {
			--overhang: 56px;
		}
		.track {
			grid-auto-columns: 84%;
		}
		/* a touch taller than square so the copy and the object don't collide on phones */
		.card {
			aspect-ratio: 4 / 5;
		}
		.art {
			height: calc(40% + var(--overhang));
		}
		.arrow-btn {
			display: none;
		}
	}
</style>

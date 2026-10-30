<script>
	import Img from '$lib/components/Img.svelte';
	import { img } from '$lib/content/site.js';
	let { logos, marquee = false } = $props();
</script>

{#if marquee}
	<div class="marquee" aria-label="SDVoE Alliance members">
		<ul role="list" class="track">
			{#each [...logos, ...logos] as [name, file], i}
				<li class="tile" aria-hidden={i >= logos.length ? 'true' : undefined}>
					<Img src={img(file)} alt={i < logos.length ? name : ''} loading="lazy" width="140" height="60" draggable="false">{#snippet fallback()}<span class="name">{name}</span>{/snippet}</Img>
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
	/* Full colour, no tile: the logo files have white backgrounds, multiply drops them on any light band */
	.tile :global(img) {
		max-height: 52px;
		width: auto;
		object-fit: contain;
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
	.track {
		display: flex;
		gap: var(--tile-gap);
		width: max-content;
		margin: 0;
		animation: scroll 45s linear infinite;
	}
	.track .tile {
		width: 180px;
	}
	@keyframes scroll {
		to {
			transform: translateX(calc(-50% - var(--tile-gap) / 2));
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

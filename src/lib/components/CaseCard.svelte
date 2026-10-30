<script>
	// DJI field-card: full photo, square corners, white title and link overlaid at the bottom.
	import Img from '$lib/components/Img.svelte';
	import { href } from '$lib/link.js';
	let { item } = $props();
</script>

<a class="field on-dark" href={href(`/solutions/case-studies/${item.slug}`)}>
	<div class="media">
		{#if item.image}
			<Img src={item.image} alt="" loading="lazy" width="640" height="480">{#snippet fallback()}<div class="ph" aria-hidden="true"></div>{/snippet}</Img>
		{:else}
			<div class="ph" aria-hidden="true"></div>
		{/if}
	</div>
	<div class="copy">
		<p class="eyebrow">{item.sector}{#if item.member} · {item.member}{/if}</p>
		<h3 class="title">{item.title}</h3>
		<span class="link t-sm">Read the case study</span>
	</div>
</a>

<style>
	.field {
		position: relative;
		display: block;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		color: #fff;
		text-decoration: none;
		background: var(--media-black);
	}
	.media {
		position: absolute;
		inset: 0;
		background: transparent;
	}
	.media :global(img),
	.media :global(.ph) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}
	.field:hover .media :global(img) {
		transform: scale(1.04);
	}
	.field::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 30%, rgb(0 0 0 / 0.75));
	}
	.copy {
		position: absolute;
		inset: auto 0 0;
		z-index: 1;
		display: grid;
		gap: 6px;
		padding: var(--s-xl);
	}
	.title {
		font-size: var(--fs-subhead);
		font-weight: var(--w-medium);
		line-height: 1.25;
		letter-spacing: -0.02em;
		text-wrap: balance;
	}
</style>

<script>
	// YouTube video behind a click: the page shows only the thumbnail and a play button, and the
	// player (youtube-nocookie, several hundred KB of script) loads when the visitor asks for it.
	import { Play } from '@lucide/svelte';

	let { id, title } = $props();
	let playing = $state(false);
</script>

<div class="yt">
	{#if playing}
		<iframe
			src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
			{title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	{:else}
		<button type="button" onclick={() => (playing = true)} aria-label={`Play video: ${title}`}>
			<img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" width="1280" height="720" loading="lazy" decoding="async" />
			<span class="play" aria-hidden="true"><Play size={26} strokeWidth={2} fill="currentColor" /></span>
		</button>
	{/if}
</div>

<style>
	.yt {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: var(--fog);
	}
	iframe,
	button,
	img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
	button {
		padding: 0;
		cursor: pointer;
		background: none;
	}
	img {
		object-fit: cover;
	}
	.play {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		display: grid;
		place-items: center;
		width: 68px;
		height: 68px;
		padding-left: 4px;
		border-radius: 50%;
		background: var(--primary);
		color: #fff;
		transition:
			scale 0.15s ease,
			background-color 0.15s ease;
	}
	button:hover .play {
		scale: 1.08;
		background: var(--primary-hover);
	}
	button:focus-visible {
		outline: 3px solid var(--primary);
		outline-offset: -3px;
	}
</style>

<script>
	// DJI floating-circle-button — the one element allowed a shadow.
	let show = $state(false);
	$effect(() => {
		const on = () => (show = window.scrollY > 900);
		on();
		window.addEventListener('scroll', on, { passive: true });
		return () => window.removeEventListener('scroll', on);
	});
</script>

{#if show}
	<button class="top" aria-label="Back to top" onclick={() => window.scrollTo({ top: 0 })}>
		<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 10l5-5 5 5" fill="none" stroke="currentColor" stroke-width="1.6" /></svg>
	</button>
{/if}

<style>
	.top {
		position: fixed;
		right: 20px;
		bottom: 24px;
		z-index: 40;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border: 0;
		border-radius: 50%;
		background: var(--canvas);
		color: var(--ink);
		box-shadow: var(--float-shadow);
		cursor: pointer;
	}
</style>

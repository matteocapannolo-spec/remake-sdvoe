<script>
	// Text fallback for the SDVoE logo (used when the logo file cannot be loaded).
	let { inverse = false } = $props();
</script>

<span class="wm" class:inverse aria-label="SDVoE Alliance">
	<span class="top">SDV<span class="o">o</span>E</span>
	<span class="bottom">ALLIANCE</span>
</span>

<style>
	.wm {
		display: inline-grid;
		line-height: 1;
		color: var(--primary);
	}
	.top {
		font-size: 1.5rem;
		font-weight: var(--w-bold);
		letter-spacing: -0.01em;
	}
	.o {
		color: var(--accent);
	}
	.bottom {
		font-size: 0.5rem;
		font-weight: var(--w-bold);
		letter-spacing: 0.42em;
		color: var(--text-muted);
	}
	.inverse {
		color: #fff;
	}
	.inverse .bottom {
		color: var(--inverse-text-faint);
	}
</style>

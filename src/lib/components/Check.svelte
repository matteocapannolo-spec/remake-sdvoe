<script>
	// Renders a comparison cell: true → check, false → dash, string → text.
	let { value } = $props();
</script>

{#if value === true}
	<span class="yes" role="img" aria-label="Yes"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
{:else if value === false}
	<span class="no" role="img" aria-label="No">—</span>
{:else}
	<span>{value}</span>
{/if}

<style>
	.yes {
		display: inline-grid;
		place-items: center;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: var(--primary);
		color: #fff;
	}
	.no {
		color: var(--text-faint);
	}
</style>

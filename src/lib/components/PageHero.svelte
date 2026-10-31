<script>
	// DJI category-page header: grey eyebrow, 48px+ title, centred, actions as pills.
	// mark: optional logo between the eyebrow and the title (Technology: the Power of 10+ campaign mark).
	let { eyebrow = '', title, lead = '', mark, children } = $props();
</script>

<section class="hero container">
	{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
	{#if mark}{@render mark()}{/if}
	<h1 class="t-h1">{title}</h1>
	{#if lead}<p class="t-lead">{lead}</p>{/if}
	{#if children}<div class="btn-row">{@render children()}</div>{/if}
</section>

<style>
	.hero {
		padding-block: var(--s-section-lg) var(--s-huge);
		max-width: 860px;
		text-align: center;
	}
	.hero > * + * {
		margin-top: var(--s-md);
	}
	.t-lead {
		max-width: 660px;
		margin-inline: auto;
	}
	.btn-row {
		justify-content: center;
		margin-top: var(--s-xl);
	}
</style>

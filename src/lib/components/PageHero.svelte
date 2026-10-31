<script>
	// DJI category-page header: grey eyebrow, 48px+ title, centred, actions as pills.
	// mark: optional logo between the eyebrow and the title (Technology: the Power of 10+ campaign mark).
	// backdrop: optional full-width dark background (photo, animation) behind the header; the text turns white.
	let { eyebrow = '', title, lead = '', mark, backdrop, children } = $props();
</script>

{#snippet header()}
	<section class="hero container">
		{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
		{#if mark}{@render mark()}{/if}
		<h1 class="t-h1">{title}</h1>
		{#if lead}<p class="t-lead">{lead}</p>{/if}
		{#if children}<div class="btn-row">{@render children()}</div>{/if}
	</section>
{/snippet}

{#if backdrop}
	<div class="stage on-dark">
		{@render backdrop()}
		{@render header()}
	</div>
{:else}
	{@render header()}
{/if}

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
	.stage {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		background: #080d16;
	}
	.stage .hero {
		position: relative;
		z-index: 1;
		padding-bottom: var(--s-section-lg);
	}
	.stage .t-h1 {
		color: #fff;
	}
	.stage .t-lead {
		color: rgb(255 255 255 / 0.85);
	}
	.stage .eyebrow {
		color: rgb(255 255 255 / 0.75);
	}
</style>

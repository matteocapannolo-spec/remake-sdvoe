<script>
	// In-page section tabs (DJI comparison-tabs): underline on a hairline track, sticky under the nav.
	let { items } = $props();
	let current = $state(items[0]?.id);

	$effect(() => {
		const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
		const io = new IntersectionObserver(
			(entries) => {
				const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (vis[0]) current = vis[0].target.id;
			},
			{ rootMargin: '-140px 0px -55% 0px' }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<nav class="subnav" aria-label="On this page">
	<div class="tabs container">
		{#each items as item}
			<a href={'#' + item.id} aria-current={current === item.id ? 'true' : undefined}>{item.label}</a>
		{/each}
	</div>
</nav>

<style>
	.subnav {
		position: sticky;
		top: var(--nav-h);
		z-index: 20;
		background: rgb(255 255 255 / 0.96);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	.tabs {
		justify-content: flex-start;
	}
	@media (min-width: 769px) {
		.tabs {
			justify-content: center;
		}
	}
</style>

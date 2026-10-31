<script>
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { news, events, formatDate } from '$lib/content/site.js';

	// Press releases, member press releases, blog and events in one newsroom.
	let kind = $state('All');
	const kinds = ['All', 'Alliance', 'Members', 'Blog'];
	const list = $derived(kind === 'All' ? news : news.filter((n) => n.kind === kind));
</script>

<Seo title="News & events" description="SDVoE Alliance press releases, member news, blog posts and upcoming trade shows." />

<PageHero eyebrow="Newsroom" title="News & events" lead="Alliance announcements, member news and articles in one place." />

<section id="events" class="container">
	<div class="grid grid-2">
		{#each events as e, i}
			<div class={i === 0 ? 'card-inverse ev' : 'card-soft ev'}>
				<span class={i === 0 ? 'pill pill-accent' : 'pill'}>{i === 0 ? 'Next' : 'Upcoming'}</span>
				<h2 class="t-h3">{e.name}</h2>
				<p class={i === 0 ? '' : 't-muted'} style={i === 0 ? 'color: var(--inverse-text-faint)' : ''}>{e.place} · {e.date}</p>
				<p class="t-caption" style={i === 0 ? 'color: var(--inverse-text-faint)' : ''}>{e.status}</p>
			</div>
		{/each}
	</div>
</section>

<section class="container section">
	<div class="filters toggles" role="group" aria-label="Filter news">
		{#each kinds as k}
			<button aria-pressed={kind === k} onclick={() => (kind = k)}>{k}</button>
		{/each}
	</div>
	<ul role="list" class="list">
		{#each list as n (n.href)}
			<li>
				<a href={n.href} target="_blank" rel="noopener">
					<span class="meta t-caption">{formatDate(n.date)}<span class="pill">{n.kind}</span></span>
					<span class="t-title">{n.title}</span>
					<span class="go" aria-hidden="true">→</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.ev {
		display: grid;
		gap: var(--s-sm);
		justify-items: start;
		padding: var(--s-xl);
	}
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.list {
		margin: var(--s-lg) 0 0;
	}
	.list li + li {
		border-top: 1px solid var(--hairline-soft);
	}
	.list a {
		display: grid;
		grid-template-columns: 200px 1fr 24px;
		gap: var(--s-lg);
		align-items: center;
		padding: var(--s-lg) 0;
		text-decoration: none;
	}
	.list a:hover .t-title,
	.list a:hover .go {
		color: var(--primary);
	}
	.meta {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.go {
		color: var(--text-faint);
		font-size: 1.25rem;
	}
	@media (max-width: 720px) {
		.list a {
			grid-template-columns: 1fr;
			gap: 8px;
		}
		.go {
			display: none;
		}
	}
</style>

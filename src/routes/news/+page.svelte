<script>
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { news, events, formatDate, localImg } from '$lib/content/site.js';
	import iseLogo from '$lib/assets/events/ise-2027-logo-white.svg?url';

	// Show logos (third-party marks, PROGETTO.md §5): ISE's vector logo recoloured white for the photo,
	// the InfoComm 2027 stamp as published by AVIXA. w × h: the box each one gets on the card.
	const showLogos = {
		ise: { src: iseLogo, alt: 'ISE', w: 148, h: 50 },
		infocomm: { src: localImg('infocomm-2027-logo.png'), alt: 'InfoComm 2027', w: 52, h: 64 }
	};

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
			{@const logo = showLogos[e.logo]}
			{@const bg = localImg(e.bg)}
			<div class="ev on-dark">
				{#if bg}<img class="ev-bg" src={bg} alt="" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />{/if}
				<div class="ev-top">
					{#if logo?.src}<img class="ev-logo" class:tall={e.logo === 'infocomm'} src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} />{/if}
					<span class={i === 0 ? 'pill pill-accent' : 'pill pill-glass'}>{i === 0 ? 'Next' : 'Upcoming'}</span>
				</div>
				<div class="ev-copy">
					<h2 class="t-h3">{e.name}</h2>
					<p class="ev-place">{e.place} · {e.date}</p>
					<p class="t-caption ev-status">{e.status}</p>
				</div>
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
	/* show photo under a dark veil (stronger at the bottom, where the text sits), logo top-left */
	.ev {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--s-xxl);
		min-height: 340px;
		padding: var(--s-xl);
		overflow: hidden;
		background: #0b0d12;
		color: #fff;
	}
	.ev::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(to top, rgb(8 11 18 / 0.92) 0%, rgb(8 11 18 / 0.72) 45%, rgb(8 11 18 / 0.45) 100%);
	}
	.ev-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	/* layers: photo (0) · veil (1) · logo and text (2) */
	.ev-top,
	.ev-copy {
		position: relative;
		z-index: 2;
	}
	.ev-copy h2 {
		color: #fff;
	}
	.ev-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--s-md);
	}
	.ev-logo {
		width: auto;
		height: 50px;
	}
	/* the InfoComm stamp is a tall triangle: a little taller to match the ISE wordmark's weight */
	.ev-logo.tall {
		height: 72px;
	}
	.ev-copy {
		display: grid;
		gap: var(--s-xs);
	}
	.ev-place {
		color: #e8edf3;
	}
	.ev-status {
		color: #c9d3de;
	}
	/* "Upcoming": a light pill that reads on the photo */
	.pill-glass {
		background: rgb(255 255 255 / 0.16);
		color: #fff;
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

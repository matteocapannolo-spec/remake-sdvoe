<script>
	import Seo from '$lib/components/Seo.svelte';
	import Logotype from '$lib/components/Logotype.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import LogoWall from '$lib/components/LogoWall.svelte';
	import CaseCard from '$lib/components/CaseCard.svelte';
	import ExploreCards from '$lib/components/ExploreCards.svelte';
	import WhyBento from '$lib/components/WhyBento.svelte';
	import NeonFiber from '$lib/components/NeonFiber.svelte';
	import { stats, audiences, members, memberCount, news, formatDate, localImg } from '$lib/content/site.js';

	// Hero backdrop photo (original in images-src/, converted by `npm run images -- --from images-src`)
	const heroPhoto = localImg('hero-bg.jpg');
	// Smaller copies (made from images-src/hero-bg.jpg) so phones don't download and decode the
	// 2400px one. On a portrait screen the photo is cropped to the hero's height, so its width
	// follows the height; it sits under a dark veil, so a slightly soft copy is fine there.
	const heroSrcset = [
		[localImg('hero-bg-800.jpg'), 800],
		[localImg('hero-bg-1400.jpg'), 1400],
		[heroPhoto, 2400]
	]
		.filter(([src]) => src)
		.map(([src, w]) => `${src} ${w}w`)
		.join(', ');
	import { featuredCaseStudies, caseStudies } from '$lib/content/caseStudies.js';
	import { href } from '$lib/link.js';

	const allLogos = [...members.steering, ...members.contributing, ...members.adopting];

	// DJI "What's Hot" cards. `backdrop`: photo filling the card (originals in images-src/, converted by
	// `npm run images -- --from images-src`); `cutout`: optional transparent object overhanging the top.
	// `bg` is the gradient shown while the photo loads, or if it is missing.
	const cards = [
		{
			tier: 'SDVoE Certified',
			name: 'Certified products',
			tagline: 'Mix encoders, decoders and transceivers from different brands.',
			fact: `${stats[2].value} products`,
			cta: 'Find products',
			href: '/products#finder',
			render: 'endpoint',
			backdrop: 'explore-certified-bg.jpg',
			tone: 'dark',
			bg: 'radial-gradient(120% 70% at 50% 0%, #2c3540 0%, #0b0d10 70%)'
		},
		{
			tier: 'The Power of 10+',
			name: 'Uncompressed at 10G',
			tagline: 'Matrix-switch quality and latency, on a standard network.',
			fact: 'Under 100 µs',
			cta: 'Why SDVoE',
			href: '/technology',
			render: 'ten',
			backdrop: 'explore-ten-bg.jpg',
			tone: 'light',
			bg: 'linear-gradient(180deg, #eef1f4 0%, #b9c0c8 22%, #3a4048 42%, #15181c 58%, #0b0d10 100%)'
		},
		{
			tier: 'SDVoE Academy',
			name: 'Learn AV over IP',
			tagline: 'Self-paced courses and Design Partner certification.',
			fact: 'Free courses',
			cta: 'Start learning',
			href: '/learn',
			render: 'academy',
			backdrop: 'explore-academy-bg.jpg',
			tone: 'dark',
			bg: 'radial-gradient(110% 60% at 50% 0%, #0c67ba 0%, #08325c 55%, #061a30 100%)'
		},
		{
			tier: 'For manufacturers',
			name: 'Join the Alliance',
			tagline: 'Build on a royalty-free platform and ship into the ecosystem.',
			fact: `${memberCount} members`,
			cta: 'Membership',
			href: '/alliance#join',
			render: 'alliance',
			backdrop: 'explore-alliance-bg.jpg',
			tone: 'dark',
			bg: 'radial-gradient(120% 70% at 50% 0%, #253b4f 0%, #0d1620 65%, #0b0d10 100%)'
		}
	];

</script>

<Seo description="SDVoE delivers uncompressed 4K60 video with under 100 µs latency over standard 10G Ethernet, interoperable across hundreds of products from dozens of manufacturers." />

<!-- 1 · Hero: full-bleed dark backdrop, copy lower-left, ghost pills -->
<section class="hero on-dark">
	<div class="hero-art">
		{#if heroPhoto}
			<!-- the photo is light: a night-blue veil (denser behind the copy) keeps white text and the neon readable -->
			<img class="hero-photo" src={heroPhoto} srcset={heroSrcset} sizes="(orientation: portrait) 90vh, 100vw" alt="" width="2400" height="1350" fetchpriority="high" decoding="async" />
			<div class="hero-veil"></div>
		{/if}
		<NeonFiber transparent={!!heroPhoto} />
	</div>
	<div class="hero-copy">
		<p class="tier">The Power of 10+</p>
		<h1 class="t-display">Matrix-grade video.<br />Ethernet freedom</h1>
		<p class="hero-sub">
			Uncompressed 4K60 4:4:4 over standard 10G Ethernet, with under 100 µs of latency — and every certified product
			works with every other.
		</p>
		<div class="btn-row">
			<a class="btn btn-primary" href={href('/products#finder')}>Find products</a>
			<a class="btn btn-ghost btn-sm link" href={href('/technology')}>Why SDVoE</a>
		</div>
	</div>
</section>

<!-- 2 · Ecosystem: the members, right under the hero -->
<section class="members" aria-label="SDVoE Alliance members">
	<p class="container t-body t-muted members-intro">An ecosystem built together by multiple pro AV, IT and chip companies for a full interoperability</p>
	<div class="bleed"><LogoWall logos={allLogos} marquee /></div>
	<p class="members-link"><a class="arrow" href={href('/alliance/#members')}>See all members</a></p>
</section>

<!-- 3–4 · Grey store band: "What's Hot" cards, then the "Why" bento with the key figures -->
<section class="store">
	<div class="container">
		<h2 class="t-h2 store-head">Explore <Logotype /></h2>
		<ExploreCards {cards} />
		<h2 class="t-h2 store-head why-head">Why <Logotype /></h2>
		<WhyBento />
	</div>
</section>

<!-- from here down, sections render only when they near the screen (.defer-render) -->

<!-- 5 · How it works -->
<section class="container section defer-render">
	<div class="section-head">
		<h2 class="t-h2">One network replaces the matrix</h2>
		<p class="t-lead">Transmitters turn HDMI, USB and control into network streams. An off-the-shelf 10G switch does the routing. Receivers scale, build walls and composite multiviews at the screen.</p>
	</div>
	<HowItWorks />
	<p class="center" style="margin-top: var(--s-xl)"><a class="link" href={href('/technology#how-it-works')}>The full stack, layer by layer</a></p>
</section>

<!-- 6 · Explore band: audience paths as white cards on fog -->
<section class="explore section defer-render">
	<div class="container">
		<div class="section-head"><h2 class="t-h2">Start where you are</h2></div>
		<div class="grid grid-3">
			{#each audiences as a}
				<article class="explore-card">
					<p class="eyebrow">{a.eyebrow}</p>
					<h3 class="t-h4">{a.title}</h3>
					<p class="t-body t-muted">{a.text}</p>
					<ul role="list">
						{#each a.links as l}<li><a class="link" href={href(l.href)}>{l.label}</a></li>{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- 8 · Field cards: case studies -->
<section class="section defer-render">
	<div class="container section-head"><h2 class="t-h2">Running today, worldwide</h2><p class="t-lead">{caseStudies.length} published case studies, from parliaments to theme parks.</p></div>
	<div class="bleed tiles card-row">
		{#each featuredCaseStudies as c}<CaseCard item={c} />{/each}
	</div>
	<p class="center" style="margin-top: var(--s-xl)"><a class="link" href={href('/solutions#case-studies')}>All case studies</a></p>
</section>

<!-- 9 · News cards -->
<section class="container section defer-render">
	<div class="section-head"><h2 class="t-h2">Latest news</h2></div>
	<div class="grid grid-3 news">
		{#each news.slice(0, 3) as n}
			<a class="news-card" href={n.href} target="_blank" rel="noopener">
				<p class="eyebrow">{formatDate(n.date)} · {n.kind}</p>
				<h3 class="t-title">{n.title}</h3>
				<span class="link t-sm">Read more</span>
			</a>
		{/each}
	</div>
	<p class="center" style="margin-top: var(--s-xl)"><a class="link" href={href('/news')}>Newsroom</a></p>
</section>

<style>
	.center {
		text-align: center;
	}
	/* hero */
	.hero {
		position: relative;
		min-height: min(88vh, 820px);
		display: flex;
		align-items: flex-end;
		color: #fff;
		overflow: hidden;
		background: #07090c;
	}
	.hero-art {
		position: absolute;
		inset: 0;
	}
	.hero-photo,
	.hero-veil {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.hero-photo {
		object-fit: cover;
	}
	.hero-veil {
		background:
			linear-gradient(0deg, rgb(4 12 28 / 0.7), transparent 45%),
			linear-gradient(90deg, rgb(4 12 28 / 0.9) 0%, rgb(4 12 28 / 0.72) 45%, rgb(6 26 58 / 0.4) 100%);
	}
	.hero-copy {
		position: relative;
		width: min(100% - 2 * var(--gutter), var(--container));
		margin: 0 auto;
		padding: calc(var(--nav-h) + 80px) 0 clamp(48px, 8vh, 96px);
	}
	.hero-copy > * + * {
		margin-top: var(--s-md);
	}
	.hero .t-display {
		color: #fff;
		max-width: 760px;
	}
	.hero-sub {
		max-width: 560px;
		color: rgb(255 255 255 / 0.78);
		font-size: clamp(1rem, 0.95rem + 0.3vw, 1.125rem);
	}
	.hero .btn-row {
		align-items: center;
		margin-top: var(--s-xl);
	}
	/* grey store band (DJI store page background) */
	.store {
		padding-block: var(--s-section);
		background: #f0f1f3;
		/* the Explore row runs to the window edges: never let it widen the page */
		overflow-x: clip;
	}
	/* a slim band: the logos keep their size, with less air around them */
	.members {
		padding-block: var(--s-xxl) var(--s-xl);
	}
	.members-intro {
		margin-bottom: var(--s-xs);
		text-align: center;
	}
	.members-link {
		font-size: var(--fs-ui);
		text-align: center;
	}
	.members-link a {
		color: var(--ink-tertiary);
	}
	.members-link a:hover {
		text-decoration: underline;
	}
	.store-head {
		margin-bottom: var(--s-xl);
		text-align: center;
	}
	.why-head {
		margin: var(--s-section) 0 var(--s-xl);
	}
	/* explore band */
	.explore {
		background: var(--fog);
	}
	.explore-card {
		display: flex;
		flex-direction: column;
		gap: var(--s-sm);
		padding: var(--s-xxl);
		background: var(--canvas);
	}
	.explore-card ul {
		display: grid;
		gap: 8px;
		margin-top: auto;
		padding-top: var(--s-md);
	}
	/* news */
	.news-card {
		display: grid;
		gap: var(--s-sm);
		align-content: start;
		padding: var(--s-xl) 0;
		border-top: 2px solid var(--ink);
		text-decoration: none;
	}
	.news-card:hover .t-title {
		color: var(--primary);
	}
</style>

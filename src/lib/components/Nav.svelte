<script>
	import { page } from '$app/state';
	import Img from '$lib/components/Img.svelte';
	import Wordmark from '$lib/components/Wordmark.svelte';
	import LangSwitch from '$lib/components/LangSwitch.svelte';
	import { nav, logos } from '$lib/content/site.js';
	import { href, isExternal } from '$lib/link.js';
	import {
		Zap, Workflow, GitCompareArrows, ListChecks, Braces, LayoutGrid, Factory, BookOpenText, Search, Library,
		MonitorCog, GraduationCap, BadgeCheck, Users, Info, Landmark, Building, Handshake, Newspaper
	} from '@lucide/svelte';

	// Icon keys used by the menu in site.js (Lucide, ISC licence); `rainbow: true` on an item gives
	// its icon the Power of 10+ colours on hover
	const icons = {
		zap: Zap, workflow: Workflow, compare: GitCompareArrows, specs: ListChecks, code: Braces, grid: LayoutGrid,
		factory: Factory, book: BookOpenText, search: Search, library: Library, orchestrator: MonitorCog,
		academy: GraduationCap, badge: BadgeCheck, users: Users, info: Info, board: Landmark, building: Building,
		handshake: Handshake, news: Newspaper
	};

	// overlay: transparent nav with white labels over the home hero (DJI nav-bar-overlay).
	// Solid (any other page, or the home once scrolled or with a menu open): Deep Blue like the footer,
	// white labels and logo, so the bar keeps the same look whether or not it is over the hero.
	let { overlay = false } = $props();

	let open = $state(false);
	let openItem = $state(null);
	let scrolled = $state(false);

	// The mobile sheet starts right under the bar, wherever the bar is (the announcement
	// above it can push it down), so the close button is never covered.
	let header;
	let sheetTop = $state(64);
	function toggleSheet() {
		if (!open) sheetTop = Math.round(header.getBoundingClientRect().bottom);
		open = !open;
	}

	const solid = $derived(!overlay || scrolled || open || openItem !== null);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	$effect(() => {
		page.url.pathname;
		open = false;
		openItem = null;
	});

	$effect(() => {
		document.documentElement.style.overflow = open ? 'hidden' : '';
	});

	const isActive = (item) => page.url.pathname.includes(item.href.replace(/\/$/, '') + '/');

	function onKey(e) {
		if (e.key === 'Escape') {
			open = false;
			openItem = null;
		}
	}
</script>

<svelte:window onkeydown={onKey} />

<header class="nav" class:overlay class:solid bind:this={header} style={`--sheet-top: ${sheetTop}px`} onmouseleave={() => (openItem = null)}>
	<nav class="bar" aria-label="Main">
		<a class="brand" href={href('/')} aria-label="SDVoE Alliance home">
			<!-- white on both the hero and the Deep Blue bar -->
			<span class="logo">
				<Img src={logos.white} alt="SDVoE Alliance" width="104" height="36">{#snippet fallback()}<Wordmark inverse />{/snippet}</Img>
			</span>
		</a>

		<ul class="links" role="list">
			{#each nav as item}
				<li>
					<button
						class="link-btn"
						class:active={isActive(item) || openItem === item.label}
						aria-expanded={openItem === item.label}
						onmouseenter={() => (openItem = item.label)}
						onclick={() => (openItem = openItem === item.label ? null : item.label)}
					>
						{item.label}
					</button>
				</li>
			{/each}
		</ul>

		<div class="actions">
			<div class="lang"><LangSwitch inverse /></div>
			<!-- Deep Blue pill over the hero, white pill on the Deep Blue bar -->
			<a class={solid ? 'btn btn-sm store light' : 'btn btn-primary btn-sm store'} href={href('/products#finder')}>Find products</a>
			<button class="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onclick={toggleSheet}>
				<span></span><span></span><span></span>
			</button>
		</div>
	</nav>

	<!-- Mega panel: full-width white sheet under the bar -->
	{#each nav as item}
		{#if openItem === item.label}
			<div class="mega" role="region" aria-label={item.label}>
				<div class="mega-inner container">
					<a class="mega-title" href={href(item.href)}>{item.label} <span aria-hidden="true">›</span></a>
					<ul role="list" class="mega-list">
						{#each item.children as c}
							<li>
								<a href={href(c.href)} target={isExternal(c.href) ? '_blank' : undefined} rel={isExternal(c.href) ? 'noopener' : undefined}>
									{#if icons[c.icon]}{@const Icon = icons[c.icon]}<span class="m-icon" class:rainbow={c.rainbow} aria-hidden="true"><Icon size={20} strokeWidth={1.5} /></span>{/if}
									<span class="m-label">{c.label}{#if c.external}<span aria-hidden="true"> ↗</span>{/if}</span>
									<span class="m-desc">{c.desc}</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	{/each}

	{#if open}
		<div class="sheet">
			<ul role="list">
				{#each nav as item}
					<li class="sheet-item">
						<button class="sheet-link" aria-expanded={openItem === item.label} onclick={() => (openItem = openItem === item.label ? null : item.label)}>
							{item.label}
							<svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" stroke-width="1.3" /></svg>
						</button>
						{#if openItem === item.label}
							<ul role="list" class="sheet-sub">
								{#each item.children as c}
									<li>
										<a href={href(c.href)}>
											{#if icons[c.icon]}{@const Icon = icons[c.icon]}<span class="s-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.5} /></span>{/if}
											{c.label}{#if c.external} ↗{/if}
										</a>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
			<div class="sheet-foot">
				<a class="btn btn-lg light" href={href('/products#finder')}>Find products</a>
				<a class="btn btn-inverse btn-lg" href={href('/alliance#join')}>Join the Alliance</a>
				<p class="sheet-label">Language</p>
				<LangSwitch variant="sheet" inverse />
			</div>
		</div>
	{/if}
</header>

<style>
	.nav {
		--nav-fade: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--footer);
		color: #fff;
		transition:
			background-color var(--nav-fade),
			color var(--nav-fade);
	}
	/* focus rings: white on the blue bar, menus and sheet (the global ring is Deep Blue) */
	.nav :focus-visible {
		outline-color: #fff;
	}
	/* home: sit on top of the hero */
	.nav.overlay {
		margin-bottom: calc(-1 * var(--nav-h));
	}
	.nav.overlay:not(.solid) {
		background: transparent;
		color: #fff;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: var(--s-xl);
		height: var(--nav-h);
		padding: 0 var(--gutter);
	}
	.brand {
		flex: none;
		display: grid;
	}
	.logo {
		display: flex;
		align-items: center;
	}
	.brand :global(img) {
		width: 112px;
		height: auto;
	}
	.links {
		display: flex;
		gap: var(--s-xs);
		margin: 0;
	}
	.link-btn {
		height: var(--nav-h);
		padding: 0 12px;
		border: 0;
		border-bottom: 2px solid transparent;
		background: none;
		color: inherit;
		font-size: var(--fs-ui);
		line-height: 1;
		cursor: pointer;
		transition: border-color var(--nav-fade);
	}
	.link-btn.active {
		border-bottom-color: currentColor;
	}
	/* white pill with Deep Blue text, on the blue bar and in the sheet */
	.light {
		background: #fff;
		color: var(--primary);
	}
	.light:hover {
		background: var(--primary-tint);
	}
	.actions {
		display: flex;
		align-items: center;
		gap: var(--s-sm);
		margin-left: auto;
	}
	.burger {
		display: none;
		position: relative;
		width: 40px;
		height: 40px;
		border: 0;
		background: none;
		color: inherit;
		cursor: pointer;
	}
	.burger span {
		position: absolute;
		left: 10px;
		right: 10px;
		height: 1.5px;
		background: currentColor;
		transition: transform 0.2s ease, opacity 0.2s ease;
	}
	.burger span:nth-child(1) {
		top: 13px;
	}
	.burger span:nth-child(2) {
		top: 19px;
	}
	.burger span:nth-child(3) {
		top: 25px;
	}
	.burger[aria-expanded='true'] span:nth-child(1) {
		transform: translateY(6px) rotate(45deg);
	}
	.burger[aria-expanded='true'] span:nth-child(2) {
		opacity: 0;
	}
	.burger[aria-expanded='true'] span:nth-child(3) {
		transform: translateY(-6px) rotate(-45deg);
	}
	.mega {
		position: absolute;
		left: 0;
		right: 0;
		top: var(--nav-h);
		background: var(--footer);
		color: #fff;
		border-top: 1px solid var(--footer-divider);
		box-shadow: var(--float-shadow);
	}
	.mega-inner {
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: var(--s-xxl);
		padding-block: var(--s-xxl);
	}
	.mega-title {
		font-size: var(--fs-title);
		font-weight: var(--w-bold);
		letter-spacing: var(--track-heading);
		color: #fff;
		text-decoration: none;
	}
	.mega-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: var(--s-md) var(--s-xxl);
		margin: 0;
	}
	/* icon tile on the left, label over description on the right */
	.mega-list a {
		display: grid;
		grid-template-columns: 40px 1fr;
		column-gap: var(--s-sm);
		row-gap: 2px;
		align-items: center;
		text-decoration: none;
	}
	.m-icon {
		grid-row: span 2;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: var(--r-sm);
		background: rgb(255 255 255 / 0.14);
		color: #fff;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}
	.mega-list a:hover .m-icon {
		background: #fff;
		color: var(--primary);
	}
	/* "Power of 10+" item (rainbow: true in site.js): on hover the tile fills with the ten colours
	   of the Power of 10+ wheel, flowing sideways as flat bands. The colours are the
	   wheel's own, used only here (the "no orange" rule covers the UI, not this mark). */
	.m-icon.rainbow {
		position: relative;
		overflow: hidden;
		isolation: isolate;
	}
	.m-icon.rainbow::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		/* flat bands, one per wheel colour (10px each), so every colour stays distinct */
		background: linear-gradient(
				90deg,
				#d7282f 0 10%,
				#ee5a3a 0 20%,
				#f7941d 0 30%,
				#e2c51e 0 40%,
				#8cc63f 0 50%,
				#2dbda8 0 60%,
				#10adcf 0 70%,
				#0b7f94 0 80%,
				#7e4a8d 0 90%,
				#b91d7f 0
			)
			0 0 / 100px 100% repeat-x;
		opacity: 0;
		transition: opacity 0.25s ease;
		/* the 40px tile shows four bands at a time; the whole wheel passes in 2.5s */
		animation: power-flow 2.5s linear infinite paused;
	}
	.mega-list a:hover .m-icon.rainbow {
		background: transparent;
	}
	.mega-list a:hover .m-icon.rainbow::before {
		opacity: 1;
		animation-play-state: running;
	}
	@keyframes power-flow {
		to {
			background-position: 100px 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.m-icon.rainbow::before {
			animation: none;
		}
	}
	.m-label {
		grid-column: 2;
		align-self: end;
		font-size: var(--fs-body);
		color: #fff;
	}
	.mega-list a:hover .m-label {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.m-desc {
		grid-column: 2;
		align-self: start;
		font-size: var(--fs-caption);
		color: var(--footer-placeholder);
	}
	.sheet {
		position: fixed;
		inset: var(--sheet-top, var(--nav-h)) 0 0;
		overflow-y: auto;
		padding: var(--s-md) var(--gutter) var(--s-huge);
		background: var(--footer);
		color: #fff;
	}
	.sheet > ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.sheet-item {
		border-bottom: 1px solid var(--footer-divider);
	}
	.sheet-link {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 16px 0;
		border: 0;
		background: none;
		color: inherit;
		font-size: var(--fs-body);
		font-weight: var(--w-bold);
		cursor: pointer;
	}
	.sheet-link[aria-expanded='true'] svg {
		transform: rotate(180deg);
	}
	.sheet-sub {
		list-style: none;
		margin: 0 0 var(--s-sm);
		padding: 0;
	}
	.sheet-sub a {
		display: flex;
		align-items: center;
		gap: var(--s-sm);
		padding: 10px 0;
		color: var(--footer-link);
		font-size: var(--fs-ui);
		text-decoration: none;
	}
	.s-icon {
		display: inline-flex;
		color: #fff;
	}
	.sheet-foot {
		display: grid;
		gap: var(--s-sm);
		margin-top: var(--s-xxl);
		justify-items: stretch;
	}
	.sheet-label {
		margin-top: var(--s-md);
		font-size: var(--fs-caption);
		font-weight: var(--w-bold);
		color: var(--footer-placeholder);
	}

	@media (max-width: 1023px) {
		.links,
		.actions > .lang {
			display: none;
		}
		.burger {
			display: block;
		}
		.mega {
			display: none;
		}
	}
</style>

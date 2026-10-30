<script>
	import Img from '$lib/components/Img.svelte';
	import Wordmark from '$lib/components/Wordmark.svelte';
	import { nav, logos, social } from '$lib/content/site.js';
	import { href, isExternal } from '$lib/link.js';

	const year = new Date().getFullYear(); // never a stale copyright again
	let sent = $state(false);
</script>

<footer class="footer">
	<div class="container">
		<!-- DJI "Only in the app" row → SDVoE Academy -->
		<div class="promo">
			<div>
				<p class="promo-title">Free courses and certification at SDVoE Academy</p>
				<p class="promo-sub">Video, networking and system design — self-paced.</p>
			</div>
			<a class="btn pill-dark" href="https://academy.sdvoe.org">Start learning</a>
		</div>

		<div class="cols">
			{#each nav as group}
				<div>
					<h2 class="col-title">{group.label}</h2>
					<ul role="list">
						{#each group.children as c}
							<li><a href={href(c.href)} target={isExternal(c.href) ? '_blank' : undefined} rel={isExternal(c.href) ? 'noopener' : undefined}>{c.label}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
			<div class="subscribe">
				<div class="sub-intro">
					<h2 class="col-title">Subscribe</h2>
					<p class="small">Alliance news, trade show demos and new courses. A few emails a year.</p>
				</div>
				<div class="sub-action">
				{#if sent}
					<p class="small" role="status" style="color: #fff">Thanks — you're on the list.</p>
				{:else}
					<form onsubmit={(e) => { e.preventDefault(); sent = true; }}>
						<label class="visually-hidden" for="ft-email">Work email</label>
						<input id="ft-email" type="email" required placeholder="Work email" autocomplete="email" />
						<button type="submit" aria-label="Subscribe">
							<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
						</button>
					</form>
				{/if}
				<ul role="list" class="social" id="social">
					{#each social as sItem}<li><a href={sItem.href} target="_blank" rel="noopener">{sItem.label}</a></li>{/each}
				</ul>
				</div>
			</div>
		</div>

		<div class="legal">
			<a class="brand" href={href('/')} aria-label="SDVoE Alliance home">
				<Img src={logos.white} alt="SDVoE Alliance" width="96" height="33" loading="lazy">{#snippet fallback()}<Wordmark inverse />{/snippet}</Img>
			</a>
			<p class="copyright">© {year} SDVoE Alliance. All rights reserved. SDVoE Alliance® is a registered trademark; SDVoE™ and SDVoE API™ are trademarks of the SDVoE Alliance.</p>
			<div class="legal-links">
				<a href="https://sdvoe.org/privacypolicy/">Privacy policy</a>
				<a href="https://sdvoe.org/contact/">Contact</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--footer);
		color: var(--footer-link);
		/* the floating back-to-top button is kept clear with right padding on the legal row (see .legal), not a band below it */
		padding: var(--s-xxl) 0 var(--s-xl);
		/* room the back-to-top button (40 px, 20 px from the right edge, BackToTop.svelte) needs at the right of the
		   bottom line, minus the page margin already there; 0 on wide screens. 76 px = 60 px button + 8 px gap + 8 px scrollbar slack */
		--top-clear: max(0px, 76px - max(var(--gutter), (100vw - var(--container)) / 2));
		font-size: var(--fs-caption);
	}
	.promo {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: var(--s-md);
		padding-bottom: var(--s-xxl);
		border-bottom: 1px solid var(--footer-divider);
	}
	.promo-title {
		color: #fff;
		font-size: var(--fs-body);
	}
	.promo-sub {
		margin-top: 2px;
	}
	.pill-dark {
		background: var(--footer-pill);
		color: #fff;
		border-radius: 100px;
	}
	.pill-dark:hover {
		background: #4a4a4a;
	}
	.cols {
		display: grid;
		grid-template-columns: repeat(5, 1fr) 1.6fr;
		gap: var(--s-xl);
		padding: var(--s-xxl) 0;
		border-bottom: 1px solid var(--footer-divider);
	}
	.col-title {
		margin-bottom: var(--s-xs);
		color: #fff;
		font-size: var(--fs-caption);
		font-weight: var(--w-medium);
		line-height: 2;
	}
	.cols ul {
		display: grid;
		gap: 6px;
		margin: 0;
	}
	.footer a {
		color: var(--footer-link);
		text-decoration: none;
	}
	.footer a:hover {
		color: #fff;
	}
	.small {
		line-height: 1.5;
	}
	form {
		display: flex;
		margin-top: var(--s-sm);
		max-width: 320px;
	}
	input {
		flex: 1;
		min-width: 0;
		height: 32px;
		padding: 4px 0 4px 12px;
		border: 1px solid #6c7073;
		border-right: 0;
		border-radius: var(--r-xs) 0 0 var(--r-xs);
		background: transparent;
		color: #fff;
		font-size: var(--fs-ui);
	}
	input::placeholder {
		color: #8c8c8c;
	}
	form button {
		width: 40px;
		height: 32px;
		border: 0;
		background: #6c7073;
		color: #fff;
		cursor: pointer;
	}
	.cols .social {
		display: flex;
		gap: var(--s-md);
		margin: var(--s-lg) 0 0;
	}
	/* logo · copyright · links on one line; below 1024 px: logo and links on top, copyright under */
	.legal {
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-areas: 'brand copy links';
		align-items: center;
		gap: var(--s-sm) var(--s-xl);
		padding-top: var(--s-xl);
		padding-right: var(--top-clear);
	}
	.brand {
		grid-area: brand;
	}
	.copyright {
		grid-area: copy;
	}
	.legal-links {
		grid-area: links;
		display: flex;
		gap: var(--s-xl);
	}
	.brand :global(img) {
		width: 88px;
	}
	/* below desktop: the newsletter becomes a full row above the link columns (copy left, form right),
	   and the five link columns stay on one line down to 768 px */
	@media (max-width: 1023px) {
		.cols {
			grid-template-columns: repeat(5, 1fr);
			gap: var(--s-xl) var(--s-md);
		}
		.subscribe {
			grid-column: 1 / -1;
			grid-row: 1;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: var(--s-sm) var(--s-xl);
			align-items: start;
			padding-bottom: var(--s-xl);
			border-bottom: 1px solid var(--footer-divider);
		}
		.subscribe form {
			margin-top: 0;
			max-width: none;
		}
		.legal {
			grid-template-columns: auto 1fr;
			grid-template-areas:
				'brand links'
				'copy copy';
			/* the copyright is the bottom line here: only it makes room for the button, the links stay flush right */
			padding-right: 0;
		}
		.copyright {
			padding-right: var(--top-clear);
			/* at least two lines tall, so the links row above stays clear of the button (top 64 px from the bottom)
			   even where the copyright fits on one line (~900–1023 px) */
			min-height: 36px;
		}
		.legal-links {
			justify-content: flex-end;
		}
	}
	@media (max-width: 767px) {
		.cols {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (max-width: 560px) {
		.cols {
			grid-template-columns: 1fr 1fr;
		}
		.subscribe {
			grid-template-columns: 1fr;
		}
	}
</style>

<script>
	import { href } from '$lib/link.js';
	import { localImg } from '$lib/content/site.js';
	// DJI announcement bar — one current message, editable in one place.
	let visible = $state(true);
	// the AI message sits on the same blurred backdrop as the AI band on Developers (17 KB)
	const backdrop = localImg('ai-band-bg.jpg');
	// badge: optional small label shown in a blue pill before the text
	const msg = {
		badge: 'New',
		text: 'The SDVoE API now supports agentic, AI-assisted AV-over-IP workflows.',
		link: 'What it means for developers',
		href: '/developers#ai'
	};
</script>

{#if visible}
	<div class="ann" role="region" aria-label="Announcement" style={backdrop ? `--backdrop: url(${backdrop})` : undefined}>
		<p>{#if msg.badge}<span class="badge">{msg.badge}</span> {/if}{msg.text} <a class="link" href={href(msg.href)}>{msg.link}</a></p>
		<button aria-label="Dismiss announcement" onclick={() => (visible = false)}>
			<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.4" /></svg>
		</button>
	</div>
{/if}

<style>
	.ann {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 40px;
		padding: 8px 48px;
		/* the photo's lightest strip (30% down), under a light veil: strong in the middle where
		   the text is (the photo has a few dark spots; the blue link needs 4.5:1), fading at the
		   sides so the photo shows there */
		background:
			linear-gradient(90deg, rgb(247 248 251 / 0.35), rgb(247 248 251 / 0.9) 22%, rgb(247 248 251 / 0.9) 78%, rgb(247 248 251 / 0.35)),
			var(--backdrop, none) center 30% / cover,
			var(--announce);
		font-size: var(--fs-ui);
		text-align: center;
		color: var(--ink);
	}
	/* small label: pill corners are allowed for labels; Deep Blue keeps white text AA */
	.badge {
		display: inline-block;
		margin-right: 4px;
		padding: 1px 8px;
		border-radius: var(--r-full);
		background: var(--sdvoe-deep-blue);
		color: #fff;
		font-size: var(--fs-caption);
		font-weight: var(--w-medium);
		line-height: 18px;
		vertical-align: 1px;
	}
	/* narrow screens: the text spans the whole bar, so the veil does too */
	@media (max-width: 900px) {
		.ann {
			background:
				linear-gradient(rgb(247 248 251 / 0.88), rgb(247 248 251 / 0.88)),
				var(--backdrop, none) center 30% / cover,
				var(--announce);
		}
	}
	button {
		position: absolute;
		right: 12px;
		top: 50%;
		translate: 0 -50%;
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border: 0;
		background: none;
		color: var(--ink-tertiary);
		cursor: pointer;
	}
</style>

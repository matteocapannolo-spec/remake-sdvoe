<script>
	import { href } from '$lib/link.js';
	// DJI announcement bar — one current message, editable in one place.
	let visible = $state(true);
	// badge: optional small label shown in a blue pill before the text
	const msg = {
		badge: 'New',
		text: 'The SDVoE API now supports agentic, AI-assisted AV-over-IP workflows.',
		link: 'What it means for developers',
		href: '/developers#ai'
	};
</script>

{#if visible}
	<div class="ann" role="region" aria-label="Announcement">
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
		background: var(--announce);
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

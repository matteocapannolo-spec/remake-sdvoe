<script>
	// Board member, in the store style of the home page: white rounded card on the grey band,
	// small round portrait, role label, name and the company logo in place of its name.
	// `featured` (the president): wider, larger portrait and the first sentence of the biography.
	import Img from '$lib/components/Img.svelte';
	import { href } from '$lib/link.js';

	let { person, featured = false } = $props();
	const initials = $derived(person.name.split(' ').map((w) => w[0]).join(''));
	const intro = $derived(person.bio[0]?.text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? '');
</script>

<a class="member" class:featured href={href(`/alliance/board/${person.slug}`)}>
	<span class="avatar">
		{#if person.photo}
			<Img src={person.photo} alt="" loading="lazy" width="768" height="570">{#snippet fallback()}<span class="ph" aria-hidden="true">{initials}</span>{/snippet}</Img>
		{:else}
			<span class="ph" aria-hidden="true">{initials}</span>
		{/if}
	</span>
	<span class="body">
		<span class="tier">{person.role}</span>
		<span class="name">{person.name}</span>
		{#if featured && intro}<span class="intro">{intro}</span>{/if}
		<span class="company">
			{#if person.logo}
				<Img src={person.logo} alt={person.company} loading="lazy" width="140" height="49">{#snippet fallback()}<span class="company-name">{person.company}</span>{/snippet}</Img>
			{:else}
				<span class="company-name">{person.company}</span>
			{/if}
		</span>
	</span>
	<svg class="go" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6" /></svg>
</a>

<style>
	.member {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--s-md);
		height: 100%;
		padding: var(--s-xl);
		border-radius: var(--r-sm);
		background: var(--canvas);
		color: var(--ink);
		text-decoration: none;
	}
	.avatar {
		flex: none;
		width: 72px;
		height: 72px;
		overflow: hidden;
		border-radius: var(--r-full);
		background: var(--fog);
	}
	.avatar :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 30%;
		transition: transform 0.4s ease;
	}
	.member:hover .avatar :global(img) {
		transform: scale(1.06);
	}
	.ph {
		display: grid;
		place-items: center;
		height: 100%;
		font-weight: var(--w-bold);
		color: var(--steel);
	}
	.body {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 2px;
	}
	.tier {
		font-size: var(--fs-caption);
		font-weight: var(--w-bold);
		color: var(--tier);
	}
	.name {
		font-size: var(--fs-subhead);
		font-weight: var(--w-bold);
		letter-spacing: var(--track-body);
		line-height: 1.25;
		transition: color 0.15s ease;
	}
	.member:hover .name {
		color: var(--primary);
	}
	.intro {
		margin-top: var(--s-xs);
		font-size: var(--fs-ui);
		line-height: 1.5;
		color: var(--ink-secondary);
	}
	/* logo sits at the bottom, under a hairline, so the row of cards lines up */
	.company {
		display: flex;
		align-items: center;
		height: 56px;
		margin-top: auto;
		padding-top: var(--s-md);
		border-top: 1px solid var(--hairline);
	}
	.name {
		margin-bottom: var(--s-md);
	}
	.company :global(img) {
		max-height: 38px;
		max-width: 140px;
		width: auto;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	.company-name {
		font-size: var(--fs-ui);
		font-weight: var(--w-bold);
		color: var(--ink-secondary);
	}
	.go {
		position: absolute;
		top: var(--s-xl);
		right: var(--s-xl);
		color: var(--steel);
		transition:
			color 0.15s ease,
			transform 0.15s ease;
	}
	.member:hover .go {
		color: var(--primary);
		transform: translateX(3px);
	}
	/* president: portrait left, copy right */
	.featured {
		flex-direction: row;
		gap: var(--s-xl);
	}
	.featured .avatar {
		width: 112px;
		height: 112px;
	}
	.featured .name {
		font-size: var(--fs-title);
	}
	@media (max-width: 480px) {
		.featured {
			flex-direction: column;
			gap: var(--s-md);
		}
		.featured .avatar {
			width: 88px;
			height: 88px;
		}
	}
</style>

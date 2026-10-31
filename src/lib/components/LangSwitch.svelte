<script>
	// Language switcher, interface only: no translations yet, so picking a language just closes
	// the panel. variant 'bar': pill with flag + code that opens a panel; 'sheet': flat grid for the
	// mobile menu. inverse: white pill over the home hero.
	import { languages, currentLanguage } from '$lib/content/site.js';
	import gb from 'flag-icons/flags/4x3/gb.svg?url';
	import jp from 'flag-icons/flags/4x3/jp.svg?url';
	import cn from 'flag-icons/flags/4x3/cn.svg?url';
	import itFlag from 'flag-icons/flags/4x3/it.svg?url';
	import fr from 'flag-icons/flags/4x3/fr.svg?url';
	import pt from 'flag-icons/flags/4x3/pt.svg?url';
	import sa from 'flag-icons/flags/4x3/sa.svg?url';
	import kr from 'flag-icons/flags/4x3/kr.svg?url';
	import es from '$lib/assets/flags/es.svg?url'; // civil flag: the library one with the arms is 80 KB

	let { variant = 'bar', inverse = false } = $props();

	const flags = { gb, jp, cn, it: itFlag, fr, es, pt, sa, kr };
	const current = languages.find((l) => l.code === currentLanguage);

	let open = $state(false);
	let root;

	function onWindowClick(e) {
		if (open && root && !root.contains(e.target)) open = false;
	}
	function onKey(e) {
		if (open && e.key === 'Escape') open = false;
	}
</script>

<svelte:window onclick={onWindowClick} onkeydown={onKey} />

{#if variant === 'bar'}
	<div class="switch" class:inverse bind:this={root}>
		<button class="pill" aria-expanded={open} aria-haspopup="true" aria-label={`${current.code.toUpperCase()}: language, ${current.label}`} onclick={() => (open = !open)}>
			<img class="flag" src={flags[current.flag]} alt="" width="20" height="15" />
			<span class="code">{current.code.toUpperCase()}</span>
			<svg class="chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" stroke-width="1.4" /></svg>
		</button>
		{#if open}
			<ul class="panel" role="list" aria-label="Choose a language">
				{#each languages as l}
					<li>
						<button class="option" class:current={l.code === current.code} aria-current={l.code === current.code ? 'true' : undefined} onclick={() => (open = false)}>
							<img class="flag" src={flags[l.flag]} alt="" width="20" height="15" loading="lazy" />
							<span lang={l.code} dir={l.dir}>{l.label}</span>
							{#if l.code === current.code}<svg class="tick" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="1.8" /></svg>{/if}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{:else}
	<ul class="grid" class:inverse role="list" aria-label="Choose a language">
		{#each languages as l}
			<li>
				<button class="option chip" class:current={l.code === current.code} aria-current={l.code === current.code ? 'true' : undefined}>
					<img class="flag" src={flags[l.flag]} alt="" width="20" height="15" loading="lazy" />
					<span lang={l.code} dir={l.dir}>{l.label}</span>
				</button>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.switch {
		position: relative;
	}
	.pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 32px;
		padding: 0 10px 0 8px;
		border: 0;
		border-radius: var(--r-pill);
		background: var(--fog);
		color: var(--ink);
		font-size: var(--fs-ui);
		cursor: pointer;
		transition:
			background-color 0.35s cubic-bezier(0.4, 0, 0.2, 1),
			color 0.35s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.pill:hover {
		background: var(--divider);
	}
	.inverse .pill {
		background: rgb(255 255 255 / 0.15);
		color: #fff;
	}
	.inverse .pill:hover {
		background: rgb(255 255 255 / 0.25);
	}
	.inverse .pill:focus-visible,
	.inverse .chip:focus-visible {
		outline-color: #fff;
	}
	.flag {
		flex: none;
		width: 20px;
		height: 15px;
		border-radius: 2px;
		object-fit: cover;
		box-shadow: 0 0 0 1px rgb(0 0 0 / 0.08);
	}
	.code {
		font-weight: var(--w-medium);
		letter-spacing: 0.02em;
	}
	.chev {
		transition: transform 0.2s ease;
	}
	.pill[aria-expanded='true'] .chev {
		transform: rotate(180deg);
	}
	/* menu panel: one of the two elements allowed a shadow */
	.panel {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		z-index: 60;
		display: grid;
		min-width: 200px;
		margin: 0;
		padding: 6px;
		border-radius: var(--r-sm);
		background: var(--canvas);
		color: var(--ink);
		box-shadow: var(--float-shadow);
		list-style: none;
	}
	.option {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 10px;
		border: 0;
		border-radius: var(--r-xs);
		background: none;
		color: var(--ink);
		font-size: var(--fs-ui);
		text-align: left;
		cursor: pointer;
	}
	.option:hover {
		background: var(--fog);
	}
	.option.current {
		color: var(--primary);
		font-weight: var(--w-medium);
	}
	.tick {
		margin-left: auto;
		color: var(--primary);
	}
	/* mobile menu: two-column grid of chips */
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 6px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.chip {
		border: 1px solid var(--divider);
		border-radius: var(--r-sm);
	}
	.chip.current {
		border-color: var(--primary);
		background: var(--primary-tint);
	}
	/* on the Deep Blue mobile menu */
	.inverse .chip {
		border-color: rgb(255 255 255 / 0.3);
		color: #fff;
	}
	.inverse .chip:hover {
		background: rgb(255 255 255 / 0.12);
	}
	.inverse .chip.current {
		border-color: #fff;
		background: #fff;
		color: var(--primary);
	}
</style>

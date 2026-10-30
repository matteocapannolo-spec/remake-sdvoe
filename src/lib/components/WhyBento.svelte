<script>
	// DJI "Why shop with DJI Store" bento: white cards on the grey band, title on top,
	// one big graphic below. Figures come from `stats` and `members` in site.js.
	import Img from '$lib/components/Img.svelte';
	import { stats, members, img } from '$lib/content/site.js';
	import { href } from '$lib/link.js';

	const [latency, video, products, memberStat] = stats;
</script>

<div class="bento">
	<a class="cell latency" href={href('/technology/specifications')}>
		<h3 class="title">{latency.label}</h3>
		<div class="latency-body">
			<p class="big">{latency.value}</p>
			<!-- one video frame, with the sliver SDVoE takes: under 1/150th -->
			<div class="frame" aria-hidden="true"><span class="sliver"></span></div>
			<div class="frame-legend" aria-hidden="true"><span class="t-blue">SDVoE</span><span>1 video frame</span></div>
			<p class="note">Under 1/150th of a frame</p>
		</div>
	</a>

	<a class="cell" href={href('/technology')}>
		<h3 class="title">Uncompressed {video.value.split(' ')[0]}</h3>
		<p class="big">4:4:4</p>
	</a>

	<a class="cell" href={href('/technology#how-it-works')}>
		<h3 class="title">Off-the-shelf 10G switches</h3>
		<svg class="glyph" viewBox="0 0 160 80" aria-hidden="true">
			<rect x="10" y="22" width="140" height="40" rx="4" fill="none" stroke="#3a3f46" stroke-width="4" />
			{#each [0, 1, 2, 3, 4, 5] as i}
				<rect x={24 + i * 17} y="34" width="11" height="9" rx="1.5" fill="#3a3f46" />
				<rect x={26 + i * 17} y="48" width="7" height="3" rx="1" fill="#31a3e3" />
			{/each}
			<rect x="128" y="34" width="10" height="17" rx="2" fill="#0c67ba" />
			<path d="M0 12h46M10 4h28" stroke="#0c67ba" stroke-width="4" stroke-linecap="round" />
		</svg>
	</a>

	<a class="cell" href={href('/products#finder')}>
		<h3 class="title">{products.label}</h3>
		<p class="big">{products.value}</p>
	</a>

	<a class="cell" href={href('/solutions#applications')}>
		<h3 class="title">Video walls & multiview built in</h3>
		<svg class="glyph" viewBox="0 0 160 90" aria-hidden="true">
			{#each [[22, 6], [82, 6], [22, 44], [82, 44]] as [x, y], i}
				<rect {x} {y} width="56" height="34" rx="2" fill={i === 1 ? '#0c67ba' : '#3a3f46'} />
			{/each}
			<path d="M24 38 50 18 80 34 112 14 136 28" fill="none" stroke="#31a3e3" stroke-width="3" stroke-linejoin="round" />
		</svg>
	</a>

	<a class="cell" href={href('/technology')}>
		<h3 class="title">InstaSwitch: no glitch on change</h3>
		<svg class="glyph" viewBox="0 0 160 80" aria-hidden="true">
			<rect x="8" y="14" width="56" height="40" rx="3" fill="#3a3f46" />
			<rect x="96" y="14" width="56" height="40" rx="3" fill="#0c67ba" />
			<path d="M70 34h18m-7-8 8 8-8 8" fill="none" stroke="#31a3e3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M28 66h16M116 66h16" stroke="#d9d9d9" stroke-width="4" stroke-linecap="round" />
		</svg>
	</a>

	<a class="cell members" href={href('/alliance#members')}>
		<h3 class="title">{memberStat.value} {memberStat.label.toLowerCase()}</h3>
		<ul role="list" class="logos">
			{#each members.steering as [name, file]}
				<li><Img src={img(file)} alt={name} loading="lazy" width="140" height="60">{#snippet fallback()}<span>{name}</span>{/snippet}</Img></li>
			{/each}
		</ul>
		<p class="note">Steering members</p>
	</a>
</div>

<style>
	/* 4 columns × 6 half-rows: tall | 2 stacked | 2 stacked | short over tall */
	.bento {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(6, minmax(64px, auto));
		gap: 16px;
	}
	.cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--s-md);
		padding: var(--s-xl) var(--s-lg);
		border-radius: var(--r-sm);
		background: var(--canvas);
		color: var(--ink);
		text-align: center;
		text-decoration: none;
		grid-row: span 3;
	}
	.cell:hover .title {
		color: var(--primary);
	}
	.latency {
		grid-column: 1;
		grid-row: 1 / 7;
	}
	.latency-body {
		display: grid;
		gap: var(--s-xs);
		width: 100%;
		margin-block: auto;
	}
	.cell:nth-child(4) {
		grid-column: 4;
		grid-row: 1 / 3;
	}
	.members {
		grid-column: 4;
		grid-row: 3 / 7;
	}
	.title {
		font-size: var(--fs-subhead);
		font-weight: var(--w-bold);
		letter-spacing: var(--track-body);
		line-height: 1.25;
		transition: color 0.15s ease;
	}
	.big {
		margin-block: auto;
		font-size: clamp(2.5rem, 1.8rem + 2.2vw, 3.75rem);
		font-weight: var(--w-bold);
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--primary);
	}
	.latency .big {
		margin-block: 0 var(--s-xl);
	}
	.frame {
		position: relative;
		height: 28px;
		border-radius: var(--r-xs);
		background: var(--fog);
		box-shadow: inset 0 0 0 1px var(--card-border);
	}
	.sliver {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: max(2px, calc(100% / 150));
		border-radius: var(--r-xs) 0 0 var(--r-xs);
		background: var(--primary);
	}
	.frame-legend {
		display: flex;
		justify-content: space-between;
		font-size: var(--fs-caption);
		font-weight: var(--w-bold);
		color: var(--ink-tertiary);
	}
	.latency .note {
		margin-top: var(--s-md);
	}
	.cell:nth-child(4) .big {
		margin-block: 0;
	}
	.glyph {
		width: min(100%, 180px);
		margin-block: auto;
	}
	.note {
		font-size: var(--fs-ui);
		color: var(--ink-secondary);
	}
	.logos {
		display: grid;
		gap: var(--s-sm);
		justify-items: center;
		margin: auto 0;
		padding: 0;
	}
	.logos :global(img) {
		max-height: 36px;
		width: auto;
		mix-blend-mode: multiply;
	}
	.logos span {
		font-weight: var(--w-bold);
	}
	@media (max-width: 900px) {
		.bento {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: none;
		}
		.cell,
		.latency,
		.cell:nth-child(4),
		.members {
			grid-column: auto;
			grid-row: auto;
			min-height: 200px;
		}
		.latency,
		.members {
			grid-column: 1 / -1;
		}
		.logos {
			grid-template-columns: repeat(3, auto);
			gap: var(--s-md) var(--s-xl);
		}
	}
	@media (max-width: 480px) {
		.bento {
			gap: 12px;
		}
		.cell,
		.latency,
		.cell:nth-child(4),
		.members {
			min-height: 160px;
			padding: var(--s-md) var(--s-sm);
			gap: var(--s-sm);
		}
		.title {
			font-size: var(--fs-body);
		}
		.big {
			font-size: 2.25rem;
		}
		.latency .big {
			font-size: 3rem;
		}
	}
</style>

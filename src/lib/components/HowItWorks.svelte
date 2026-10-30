<!--
  The diagram the current site is missing: source → transmitter → off-the-shelf 10G switch → receiver → display.
  Pure SVG, no image request, scales from phone to desktop.
-->
<figure class="hiw">
	<svg class="wide" viewBox="0 0 960 300" role="img" aria-labelledby="hiw-title hiw-desc">
		<title id="hiw-title">How SDVoE works</title>
		<desc id="hiw-desc">HDMI sources connect to SDVoE transmitters, which send uncompressed video over a standard 10G Ethernet switch to SDVoE receivers driving displays, a video wall and a multiview screen.</desc>
		<defs>
			<marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
				<path d="M0 0 10 5 0 10z" fill="#0C67BA" />
			</marker>
		</defs>

		<!-- columns labels -->
		<g font-family="Open Sans, sans-serif" font-size="13" font-weight="600" fill="#6e6e6e" text-anchor="middle">
			<text x="70" y="24">Sources</text>
			<text x="250" y="24">SDVoE TX</text>
			<text x="480" y="24">10G Ethernet switch</text>
			<text x="710" y="24">SDVoE RX</text>
			<text x="890" y="24">Displays</text>
		</g>

		<!-- sources -->
		{#each [70, 150, 230] as y, i}
			<rect x="20" y={y - 22} width="100" height="44" rx="12" fill="#FFFFFF" />
			<text x="70" y={y + 5} text-anchor="middle" font-family="Open Sans, sans-serif" font-size="13" font-weight="600" fill="#262626">{['PC', 'Camera', 'Media player'][i]}</text>
			<line x1="124" y1={y} x2="196" y2={y} stroke="#A9ADB3" stroke-width="2" stroke-dasharray="4 4" />
			<rect x="200" y={y - 22} width="100" height="44" rx="22" fill="#fff" stroke="#D9D9D9" stroke-width="1.5" />
			<text x="250" y={y + 5} text-anchor="middle" font-family="Open Sans, sans-serif" font-size="13" font-weight="600" fill="#0C67BA">TX</text>
			<path d={`M304 ${y} C 360 ${y}, 360 150, 396 150`} fill="none" stroke="#0C67BA" stroke-width="2.5" marker-end="url(#arr)" />
		{/each}

		<!-- switch -->
		<rect x="400" y="104" width="160" height="92" rx="24" fill="#0C67BA" />
		<g fill="#ffffff" opacity="0.9">
			{#each Array(8) as _, i}
				<rect x={420 + i * 16} y="128" width="10" height="10" rx="2" />
				<rect x={420 + i * 16} y="144" width="10" height="10" rx="2" />
			{/each}
		</g>
		<text x="480" y="180" text-anchor="middle" font-family="Open Sans, sans-serif" font-size="13" font-weight="600" fill="#ffffff">Off-the-shelf</text>

		<!-- receivers -->
		{#each [70, 150, 230] as y, i}
			<path d={`M564 150 C 600 150, 600 ${y}, 656 ${y}`} fill="none" stroke="#0C67BA" stroke-width="2.5" marker-end="url(#arr)" />
			<rect x="660" y={y - 22} width="100" height="44" rx="22" fill="#fff" stroke="#D9D9D9" stroke-width="1.5" />
			<text x="710" y={y + 5} text-anchor="middle" font-family="Open Sans, sans-serif" font-size="13" font-weight="600" fill="#0C67BA">RX</text>
			<line x1="764" y1={y} x2="836" y2={y} stroke="#A9ADB3" stroke-width="2" stroke-dasharray="4 4" />
			<rect x="840" y={y - 22} width="100" height="44" rx="12" fill="#FFFFFF" />
			<text x="890" y={y + 5} text-anchor="middle" font-family="Open Sans, sans-serif" font-size="13" font-weight="600" fill="#262626">{['Projector', 'Video wall', 'Multiview'][i]}</text>
		{/each}

		<g font-family="Open Sans, sans-serif" font-size="12" fill="#6e6e6e" text-anchor="middle">
			<text x="160" y="286">HDMI · USB · RS-232 · IR · audio</text>
			<text x="480" y="286">Uncompressed 4K60 4:4:4 · under 100 µs</text>
			<text x="800" y="286">Scaling · wall · multiview at the endpoint</text>
		</g>
	</svg>
	<!-- Phones: the same flow as a vertical sequence, no sideways scrolling -->
	<ol class="steps" role="list" aria-label="How SDVoE works">
		{#each [
			{ k: 'Sources', v: 'PC, camera, media player', d: 'HDMI · USB · RS-232 · IR · audio' },
			{ k: 'SDVoE TX', v: 'Transmitters', d: 'Turn signals into network streams', node: true },
			{ k: '10G Ethernet switch', v: 'Off-the-shelf', d: 'Uncompressed 4K60 4:4:4 · under 100 µs', hub: true },
			{ k: 'SDVoE RX', v: 'Receivers', d: 'Scaling, video wall, multiview at the endpoint', node: true },
			{ k: 'Displays', v: 'Projector, video wall, multiview', d: '' }
		] as st, i}
			<li class:hub={st.hub} class:node={st.node}>
				<span class="k">{st.k}</span>
				<span class="v">{st.v}</span>
				{#if st.d}<span class="d">{st.d}</span>{/if}
			</li>
		{/each}
	</ol>
</figure>

<style>
	.hiw {
		padding: clamp(16px, 4vw, 56px);
		background: var(--fog);
	}
	.wide {
		width: 100%;
	}
	.steps {
		display: none;
		margin: 0;
	}
	.steps li {
		position: relative;
		display: grid;
		gap: 2px;
		padding: 14px 16px;
		background: #fff;
		text-align: center;
	}
	.steps li + li {
		margin-top: 28px;
	}
	.steps li + li::before {
		content: '';
		position: absolute;
		left: 50%;
		top: -24px;
		width: 2px;
		height: 20px;
		background: var(--primary);
	}
	.steps li + li::after {
		content: '';
		position: absolute;
		left: calc(50% - 5px);
		top: -9px;
		border: 5px solid transparent;
		border-top: 6px solid var(--primary);
	}
	.steps .node {
		border: 1.5px solid var(--card-border);
		border-radius: var(--r-full);
	}
	.steps .hub {
		background: var(--primary);
		color: #fff;
		border-radius: var(--r-sm);
	}
	.k {
		font-size: var(--fs-caption);
		color: var(--ink-tertiary);
	}
	.hub .k,
	.hub .d {
		color: rgb(255 255 255 / 0.92);
	}
	.v {
		font-weight: var(--w-bold);
	}
	.node .v {
		color: var(--primary);
	}
	.d {
		font-size: var(--fs-caption);
		color: var(--ink-secondary);
	}
	@media (max-width: 640px) {
		.wide {
			display: none;
		}
		.steps {
			display: block;
		}
	}
</style>

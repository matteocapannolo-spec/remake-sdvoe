<script>
	// Studio-style vector "renders" standing in for product photography (DJI product cards).
	// Replace with real product shots from members in phase 1.
	// tone: 'light' for light backdrops, 'dark' lifts the greys and swaps the floor shadow for a blue glow.
	// tight: crop the canvas to the object, so it can overhang the top edge of a card.
	let { kind = 'endpoint', tone = 'light', tight = false } = $props();

	const crops = {
		endpoint: '40 150 540 180',
		ten: '30 40 540 290',
		academy: '90 50 420 260',
		alliance: '120 60 360 260'
	};
	const id = $derived(`${kind}-${tone}`);
	const dark = $derived(tone === 'dark');
</script>

<svg viewBox={tight ? crops[kind] : '0 0 600 360'} class="render" aria-hidden="true">
	<defs>
		<linearGradient id="body-{id}" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color={dark ? '#545b65' : '#3a3f46'} />
			<stop offset="1" stop-color={dark ? '#1f2329' : '#16191d'} />
		</linearGradient>
		<linearGradient id="top-{id}" x1="0" y1="0" x2="1" y2="0">
			<stop offset="0" stop-color={dark ? '#8a929c' : '#5b626b'} />
			<stop offset="1" stop-color={dark ? '#3f454d' : '#2b3036'} />
		</linearGradient>
		<radialGradient id="floor-{id}" cx="0.5" cy="0.5" r="0.5">
			<stop offset="0" stop-color={dark ? '#31A3E3' : '#000'} stop-opacity={dark ? 0.35 : 0.22} />
			<stop offset="1" stop-color={dark ? '#31A3E3' : '#000'} stop-opacity="0" />
		</radialGradient>
		<linearGradient id="beam-{id}" x1="0" x2="1">
			<stop offset="0" stop-color="#31A3E3" stop-opacity="0" />
			<stop offset="0.5" stop-color="#31A3E3" />
			<stop offset="1" stop-color="#31A3E3" stop-opacity="0" />
		</linearGradient>
	</defs>

	{#if kind === 'endpoint'}
		<!-- TX and RX endpoints joined by a fibre beam -->
		<ellipse cx="170" cy="290" rx="150" ry="18" fill="url(#floor-{id})" />
		<ellipse cx="430" cy="290" rx="150" ry="18" fill="url(#floor-{id})" />
		{#each [[60, 'TX'], [320, 'RX']] as [x, label]}
			<g transform={`translate(${x} 170)`}>
				<path d="M0 30 L30 0 H250 L220 30 Z" fill={`url(#top-${id})`} />
				<rect x="0" y="30" width="220" height="90" rx="6" fill={`url(#body-${id})`} />
				<path d="M220 30 L250 0 V90 L220 120 Z" fill={dark ? '#191c21' : '#101215'} />
				<rect x="18" y="58" width="34" height="18" rx="3" fill="#0b0c0e" stroke="#4a5058" />
				<rect x="62" y="58" width="22" height="18" rx="3" fill="#0b0c0e" stroke="#4a5058" />
				<rect x="94" y="58" width="22" height="18" rx="3" fill="#0b0c0e" stroke="#4a5058" />
				<circle cx="190" cy="67" r="4" fill="#31A3E3" />
				<text x="18" y="102" fill={dark ? '#aab1b9' : '#8c939b'} font-family="Open Sans, sans-serif" font-size="12" font-weight="600">SDVoE {label}</text>
			</g>
		{/each}
		<rect x="200" y="148" width="200" height="3" fill="url(#beam-{id})" />
	{:else if kind === 'ten'}
		<ellipse cx="300" cy="300" rx="220" ry="20" fill="url(#floor-{id})" />
		<text x="300" y="262" text-anchor="middle" font-family="Open Sans, sans-serif" font-weight="600" font-size="230" letter-spacing="-14" fill="url(#body-{id})">10G</text>
		{#each [70, 110, 150, 190] as y, i}
			<rect x={40 + i * 30} {y} width={520 - i * 60} height="2" fill="url(#beam-{id})" opacity={0.9 - i * 0.18} />
		{/each}
	{:else if kind === 'academy'}
		<ellipse cx="300" cy="300" rx="200" ry="18" fill="url(#floor-{id})" />
		<rect x="140" y="70" width="320" height="200" rx="10" fill={`url(#body-${id})`} />
		<rect x="154" y="84" width="292" height="172" rx="4" fill="#0c67ba" />
		<rect x="154" y="84" width="292" height="172" rx="4" fill="url(#beam-{id})" opacity="0.35" />
		<circle cx="300" cy="170" r="30" fill="#fff" fill-opacity="0.95" />
		<path d="M292 156 L316 170 L292 184 Z" fill="#0c67ba" />
		<path d="M110 270 H490 L470 292 H130 Z" fill={`url(#top-${id})`} />
	{:else if kind === 'alliance'}
		<ellipse cx="300" cy="300" rx="220" ry="18" fill="url(#floor-{id})" />
		{#each [[300, 110], [180, 180], [420, 180], [240, 260], [360, 260]] as [cx, cy]}
			<line x1={cx} y1={cy} x2="300" y2="190" stroke="#31A3E3" stroke-width="2" opacity="0.7" />
		{/each}
		{#each [[300, 110, 34], [180, 180, 30], [420, 180, 30], [240, 260, 26], [360, 260, 26]] as [cx, cy, r]}
			<circle {cx} {cy} {r} fill={`url(#body-${id})`} />
			<circle {cx} {cy} r={r * 0.32} fill="#31A3E3" />
		{/each}
		<circle cx="300" cy="190" r="44" fill="#0c67ba" />
		<text x="300" y="196" text-anchor="middle" font-family="Open Sans, sans-serif" font-size="16" font-weight="600" fill="#fff">SDVoE</text>
	{/if}
</svg>

<style>
	.render {
		display: block;
		width: 100%;
		max-width: 560px;
		margin-inline: auto;
	}
</style>

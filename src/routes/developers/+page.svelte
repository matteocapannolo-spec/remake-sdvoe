<script>
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { href } from '$lib/link.js';

	const build = [
		{ title: 'Switching and routing', text: 'Route video, audio, USB, RS-232 and IR independently, between any endpoints, from any vendor.' },
		{ title: 'Video walls and multiview', text: 'Scaling, cropping and compositing run in the endpoints — no dedicated processing hardware.' },
		{ title: 'KVM', text: 'Roam keyboard, mouse and USB 2.0 peripherals across workstations with instant switching.' },
		{ title: 'Control interfaces', text: 'Touch panels, web UIs and room controllers on top of one consistent command set.' },
		{ title: 'Monitoring', text: 'Discover devices, read status and catch problems before users do.' },
		{ title: 'Platform integrations', text: 'Bring SDVoE systems into management platforms — AVI-SPL Symphony already uses the SDVoE API.' }
	];

	const ai = [
		{ title: 'Natural-language control', text: 'Describe what you want — "send the lectern laptop to the left wall" — and an agent turns intent into valid API calls.' },
		{ title: 'Faster deployment', text: 'Agents generate system configurations, integrations and control UIs in minutes instead of days.' },
		{ title: 'Assisted troubleshooting', text: 'Diagnostics, one of the slowest parts of AV-over-IP support, become a conversation with the system.' }
	];
</script>

<Seo title="Developers & API" description="One open API across every SDVoE product. Build switching, video walls, KVM and control apps — now with AI-assisted, agentic workflows through MCP servers." />

<PageHero eyebrow="Developers & API" title="One API. Every SDVoE product." lead="The SDVoE API is the same on every device, from every manufacturer. Write your application once and it controls the whole ecosystem — and now AI agents can drive it too.">
	<a class="btn btn-primary" href="https://sdvoe.org/contact/">Request API access</a>
	<a class="btn btn-outline" href="#ai">AI-assisted workflows</a>
</PageHero>

<section class="container">
	<div class="stack-grid">
		<div class="code on-dark" aria-label="Example: what an agent does with a natural-language request">
			<p class="code-label">You</p>
			<p class="prompt">Show the lectern laptop on the left video wall and the camera feed in the corner.</p>
			<p class="code-label">Agent → SDVoE API</p>
			<pre><code>route    source=lectern-laptop  wall=left
window   source=ptz-camera      wall=left  pos=bottom-right  size=25%
verify   wall=left  → 2 windows, 0 ms switch</code></pre>
			<p class="code-note">Illustrative pseudocode, not actual API syntax.</p>
		</div>
		<div class="why">
			<h2 class="t-h3">Why build on SDVoE.</h2>
			<ul role="list">
				<li><strong>Interoperable by design.</strong> The API, clock resynchronization and session management are identical across vendors, so your software works with any certified device.</li>
				<li><strong>The hardware does the heavy lifting.</strong> Scaling, compositing and frame-rate conversion happen in the endpoints; your code just describes the result.</li>
				<li><strong>Royalty free.</strong> No licenses or royalties to build on the platform.</li>
				<li><strong>Standard networks.</strong> Off-the-shelf 10G switches and the IT tools that already manage them.</li>
			</ul>
		</div>
	</div>
</section>

<section class="container section">
	<div class="section-head">
		<h2 class="t-h2">What you can build.</h2>
		<p class="t-lead">Matrix switches, video wall processors and multiviewers used to be boxes. On SDVoE they are applications.</p>
	</div>
	<div class="grid grid-3">
		{#each build as b}
			<div class="card">
				<h3 class="t-title">{b.title}</h3>
				<p class="t-sm t-muted" style="margin-top: 8px">{b.text}</p>
			</div>
		{/each}
	</div>
</section>

<section id="ai" class="ai-band section">
	<div class="container">
		<div class="section-head">
			<p class="tier">New in 2026</p>
			<h2 class="t-h2">Ready for AI agents.</h2>
			<p class="t-lead">The SDVoE API now supports agentic, AI-assisted workflows. Combined with MCP servers and Agent Skills, systems can be designed, deployed, monitored and fixed through natural-language prompts and automated tools.</p>
		</div>
		<div class="grid grid-3">
			{#each ai as a}
				<div class="explore-card">
					<h3 class="t-h4">{a.title}</h3>
					<p class="t-body t-muted">{a.text}</p>
				</div>
			{/each}
		</div>
		<div class="proof">
			<p class="eyebrow">Already shipping</p>
			<p class="t-body">
				<strong>DVIGear DisplayNet Connect for AI Agents</strong> is an MCP server built on SDVoE that works with Claude, OpenAI Codex, Gemini CLI and other agent platforms to configure, control and troubleshoot DisplayNet systems.
			</p>
			<div class="btn-row">
				<a class="link" href="https://sdvoe.org/news/press-releases/sdvoe-alliance-expands-api-capabilities-for-agentic-ai-assisted-av-over-ip-workflows/">Read the announcement</a>
				<a class="link" href="https://sdvoe.org/news/press-releases/dvigear-introduces-displaynet-connect-for-ai-agents-bringing-natural-language-control-to-professional-av-over-ip-systems/">DVIGear DisplayNet Connect</a>
			</div>
		</div>
	</div>
</section>

<section class="container section">
	<div class="section-head"><h2 class="t-h2">Tools and resources.</h2></div>
	<div class="grid grid-3">
		<div class="option selected tool">
			<span class="option-badge">Free</span>
			<p class="tier">Software</p>
			<h3 class="t-h4">SDVoE Orchestrator</h3>
			<p class="t-body t-muted">Manage, route, configure and monitor SDVoE networks across brands — a ready-made application and a reference for your own.</p>
			<a class="btn btn-primary" href="https://sdvoe.org/contact/">Request Orchestrator</a>
		</div>
		<div class="option tool">
			<p class="tier">Training</p>
			<h3 class="t-h4">SDVoE Academy</h3>
			<p class="t-body t-muted">Free courses on video, networking and SDVoE system design — the foundation for building on the API.</p>
			<a class="btn btn-outline" href="https://academy.sdvoe.org">Start learning</a>
		</div>
		<div class="option tool">
			<p class="tier">Documentation</p>
			<h3 class="t-h4">API reference</h3>
			<p class="t-body t-muted">Command set, device model and examples for the SDVoE API. Available to developers through the Alliance.</p>
			<a class="btn btn-outline" href="https://sdvoe.org/contact/">Ask for the docs</a>
		</div>
	</div>
	<p class="t-caption" style="margin-top: var(--s-md)">VERIFY: how developers get the API documentation and Orchestrator today (public download, registration, or via members).</p>
</section>

<style>
	.stack-grid {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: var(--s-huge);
		align-items: center;
	}
	.code {
		background: var(--media-black);
		color: #fff;
		padding: var(--s-xxl);
		font-size: var(--fs-ui);
		min-width: 0; /* let the <pre> scroll instead of widening the grid on phones */
	}
	.code-label {
		color: rgb(255 255 255 / 0.6);
		font-size: var(--fs-caption);
		margin-bottom: 6px;
	}
	.prompt {
		margin-bottom: var(--s-xl);
		font-size: var(--fs-body);
	}
	pre {
		margin: 0 0 var(--s-md);
		padding: var(--s-md);
		background: rgb(255 255 255 / 0.06);
		overflow-x: auto;
		color: #9fd3f5;
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.8125rem;
		line-height: 1.7;
		letter-spacing: 0;
	}
	.code-note {
		color: rgb(255 255 255 / 0.6);
		font-size: var(--fs-caption);
	}
	.why ul {
		display: grid;
		gap: var(--s-md);
		margin: var(--s-xl) 0 0;
	}
	.why li {
		padding-top: var(--s-md);
		border-top: 1px solid var(--divider);
		color: var(--ink-secondary);
	}
	.why strong {
		color: var(--ink);
		font-weight: var(--w-bold);
	}
	.ai-band {
		background: var(--fog);
	}
	.explore-card {
		display: grid;
		gap: var(--s-sm);
		align-content: start;
		padding: var(--s-xxl);
		background: var(--canvas);
	}
	.proof {
		display: grid;
		gap: var(--s-sm);
		max-width: 760px;
		margin: var(--s-xxxl) auto 0;
		text-align: center;
	}
	.proof strong {
		font-weight: var(--w-bold);
	}
	.proof .btn-row {
		justify-content: center;
		gap: var(--s-xl);
	}
	.tool {
		display: grid;
		gap: var(--s-sm);
		align-content: start;
		justify-items: start;
	}
	.tool .btn {
		margin-top: var(--s-sm);
	}
	@media (max-width: 900px) {
		.stack-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

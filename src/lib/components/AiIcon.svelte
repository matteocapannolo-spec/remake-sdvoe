<script>
	// Animated icon tile for the agentic-AI points: a light core with the Lucide icon, a thin
	// gradient ring that keeps turning (SDVoE blues with the violet of the AI backdrop), a soft
	// glow that pulses and a sparkle that twinkles. Only transform and opacity are animated,
	// so it all runs on the compositor. Still under prefers-reduced-motion.
	import { MessageSquareText, Rocket, ScanSearch, Sparkles } from '@lucide/svelte';

	const icons = { language: MessageSquareText, deploy: Rocket, diagnose: ScanSearch };

	// size in px; delay (s) keeps several tiles out of step
	let { icon, size = 56, delay = 0 } = $props();
	const Icon = $derived(icons[icon]);
</script>

<span class="ai-icon" style={`--size:${size}px; --delay:${-delay}s`} aria-hidden="true">
	<span class="glow"></span>
	<span class="ring"><span class="spin"></span></span>
	<span class="core"><Icon size={Math.round(size * 0.46)} strokeWidth={1.6} /></span>
	<span class="spark"><Sparkles size={Math.round(size * 0.28)} strokeWidth={2} /></span>
</span>

<style>
	.ai-icon {
		position: relative;
		display: grid;
		place-items: center;
		flex: none;
		width: var(--size);
		height: var(--size);
		isolation: isolate;
	}
	.glow {
		position: absolute;
		inset: -35%;
		z-index: -1;
		border-radius: 50%;
		background: radial-gradient(circle, rgb(49 163 227 / 0.5), rgb(139 124 246 / 0.18) 45%, transparent 70%);
		animation: pulse 2.8s ease-in-out var(--delay) infinite;
	}
	.ring {
		position: absolute;
		inset: 0;
		overflow: hidden;
		border-radius: var(--r-sm);
	}
	.spin {
		position: absolute;
		inset: -50%;
		background: conic-gradient(from 0deg, #0c67ba, #31a3e3, #8b7cf6, #31a3e3, #0c67ba);
		animation: spin 4s linear var(--delay) infinite;
	}
	.core {
		position: absolute;
		inset: 2px;
		display: grid;
		place-items: center;
		border-radius: 6px;
		background: linear-gradient(145deg, #f5f9ff, #e3effb);
		color: var(--primary);
	}
	.core :global(svg) {
		animation: breathe 2.8s ease-in-out var(--delay) infinite;
	}
	.spark {
		position: absolute;
		top: -9%;
		right: -9%;
		display: grid;
		color: var(--sdvoe-sky-blue);
		animation: twinkle 2.8s ease-in-out var(--delay) infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(1turn);
		}
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 0.35;
			transform: scale(0.85);
		}
		50% {
			opacity: 0.95;
			transform: scale(1.1);
		}
	}
	@keyframes breathe {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.08);
		}
	}
	@keyframes twinkle {
		0%,
		100% {
			opacity: 0;
			transform: scale(0.4) rotate(-20deg);
		}
		45%,
		60% {
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.glow,
		.spin,
		.core :global(svg),
		.spark {
			animation: none;
		}
		.glow {
			opacity: 0.6;
		}
		.spark {
			opacity: 0;
		}
	}
</style>

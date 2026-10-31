// Agentic AI on the SDVoE API: the three points and the agent platforms, shared by the
// Developers page (#ai) and the "AI Ready" card of the home bento.
//
// icon: key of the Lucide icon, mapped in components/AiIcon.svelte
// Platform marks from Lobe Icons (MIT, lobehub/lobe-icons), in each brand's own colours.
import claudeLogo from '$lib/assets/agents/claude.svg?url';
import openaiLogo from '$lib/assets/agents/openai.svg?url';
import geminiLogo from '$lib/assets/agents/gemini.svg?url';

export const aiPoints = [
	{ icon: 'language', title: 'Natural-language control', text: 'Describe what you want — "send the lectern laptop to the left wall" — and an agent turns intent into valid API calls.' },
	{ icon: 'deploy', title: 'Faster deployment', text: 'Agents generate system configurations, integrations and control UIs in minutes instead of days.' },
	{ icon: 'diagnose', title: 'Assisted troubleshooting', text: 'Diagnostics, one of the slowest parts of AV-over-IP support, become a conversation with the system.' }
];

// DisplayNet Connect for AI Agents (DVIGear) names these platforms
export const agentPlatforms = [
	{ name: 'Claude', logo: claudeLogo },
	{ name: 'OpenAI Codex', logo: openaiLogo },
	{ name: 'Gemini CLI', logo: geminiLogo }
];

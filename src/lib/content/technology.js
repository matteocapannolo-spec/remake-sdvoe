import { img } from './site.js';

export const stackLayers = [
	{
		name: 'SDVoE API',
		layer: 'Layer 7',
		text: 'The interface between applications and everything below. Manufacturers, developers and integrators use it to reimagine AV use cases — and invent new ones.'
	},
	{
		name: 'Session management',
		layer: 'Layers 5–6',
		text: 'Decides which device broadcasts on which multicast address, who subscribes to which audio and video feeds, and where IR and RS-232 control signals go.'
	},
	{
		name: 'Adaptive clock resynchronization',
		layer: 'Layer 4',
		text: 'Encodes and decodes HDMI audio and video into network streams and back, with timing restored at the far end.'
	},
	{
		name: 'Standard IT infrastructure',
		layer: 'Layers 1–3',
		text: 'The best of what IT already offers: TIA-568 cabling, Ethernet, TCP/IP and IGMP on off-the-shelf 10G switches.'
	}
];

// icon: key of the Lucide icon, mapped in routes/technology/+page.svelte
export const benefits = [
	{ icon: 'cost', title: 'Up to 90% lower cost per port', text: 'Ethernet switches cost far less per port than custom AV switches, and the price keeps falling.' },
	{ icon: 'ports', title: 'Every port is an input or an output', text: 'Ethernet ports are bidirectional, so no more stranded inputs or outputs on a fixed chassis.' },
	{ icon: 'scale', title: 'Scales without a forklift', text: 'High-bandwidth uplinks grow the system beyond the first switch. Custom AV frames must be replaced.' },
	{ icon: 'rack', title: '48+ ports per rack unit', text: 'Ethernet switches use about a quarter of the rack space of custom AV switches.' },
	{ icon: 'network', title: 'One shared network', text: 'A full gigabit channel stays reserved for data, so AV and IT can share a single 10G backbone.' },
	{ icon: 'tools', title: 'Tools IT already knows', text: 'Decades of LAN monitoring and control software apply directly to AV switching.' }
];

export const processing = [
	'Scaling',
	'Instant switching',
	'Video wall cropping',
	'Multiview and compositing',
	'Independent audio and video routing',
	'Audio downmixing',
	'USB 2.0 transport'
];

export const hdbaset = {
	rows: [
		['Zero latency delivery', true, true],
		['No image artifacts', true, true],
		['Unified audio, video and control', true, true],
		['Flexible off-the-shelf switching infrastructure', true, false],
		['Cost', '$', '$$$'],
		['Number of devices', 'Minimal', 'Double'],
		['Built-in video walls', true, false],
		['Built-in image compositing', true, false],
		['Multi-vendor interoperability guaranteed by API', true, false],
		['Susceptible to EMI', 'No', 'Yes'],
		['Shielded category cable', 'Recommended', 'Required']
	],
	example: {
		text: 'Same brief for both: switching of multiple inputs, extension, a 2×2 video wall, one multiview display and KVM control over sources.',
		traditional: { devices: 22, image: img('traditional-system-drawing.png') },
		sdvoe: { devices: 12, image: img('sdvoe-system-drawing.png') },
		savings: '30–50%'
	}
};

// Updated Oct 2026. IPMX became a certifiable standard in 2026: AIMS certified its first
// products in January/February (announced at ISE 2026) and 14 more in August.
// Sources: AIMS / ibc.org / advanced-television.com — see PROGETTO.md.
export const ipmx = {
	asOf: 'October 2026',
	rows: [
		['Designed for', 'Pro AV from day one', 'Broadcast (ST 2110) extended to pro AV'],
		['On the market since', '2016', 'First certified products in 2026'],
		['Certified products', '700+ interoperable products', 'About 60 certified (AIMS registry)'],
		['Video at 10G', 'Uncompressed 4K60 4:4:4', 'Uncompressed or JPEG XS, product dependent'],
		['Silicon', 'Common ASIC (about 2 W) plus FPGA', 'Varies by vendor, often FPGA / SoC'],
		['Licensing', 'License and royalty free', 'Open specifications; codec licensing may apply'],
		['Video walls, multiview, scaling', 'Built into the endpoints', 'Product dependent']
	],
	points: [
		{ title: 'Proven in the field', text: 'SDVoE has been deployed since 2016 in education, healthcare, enterprise, entertainment, government and military. IPMX certified its first products in 2026.' },
		{ title: 'No compression to manage', text: 'At 10G, SDVoE never compresses 4K60 4:4:4, so there is no codec choice, no compression artifacts and no codec licensing to evaluate.' },
		{ title: 'One chip, one API', text: 'Every SDVoE product shares the same silicon and control API, so interoperability is designed in, not tested in afterwards.' },
		{ title: 'Processing included', text: 'Scaling, cropping, compositing, frame rate and colour space conversion are part of the endpoints — no extra boxes for walls and multiview.' }
	],
	note: 'IPMX and SDVoE can coexist: many venues will run both. Choose SDVoE where zero latency and uncompressed quality matter most.'
};

export const specs = {
	performance: [
		'End-to-end transport latency under 100 microseconds (under 1/150th of a video frame)',
		'Fully uncompressed transmission for all HD and 4K30 signals',
		'Artifact-free transmission of true 4K60 (4:4:4), indistinguishable from the source'
	],
	basic: [
		'HDMI video up to full 4K60',
		'Multi-channel audio with independent audio routing',
		'RS-232 and infrared control',
		'1 Gbps embedded Ethernet for compressed video or other data'
	],
	optional: [
		'Broadcast-quality up- and downscaling with aspect ratio management and frame rate conversion',
		'Display wall processing with bezel compensation and microsecond synchronization',
		'Multi-image compositing and display',
		'Multichannel audio downmixing to stereo'
	],
	interop:
		'Every SDVoE product shares the same API, clock resynchronization and session management, so devices from different manufacturers are interoperable by design. AV and control pass from any device to any other, and one API controls all functions of any SDVoE core hardware.'
};

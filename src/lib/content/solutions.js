import { img } from './site.js';

export const applications = [
	{
		id: 'matrix',
		title: 'Matrix switching',
		text: 'Replace the matrix frame with Ethernet. Ports are bidirectional, so you only count ports — not inputs versus outputs. Switches stack to thousands of ports.',
		image: img('matrix-switch-diagram.jpg')
	},
	{
		id: 'kvm',
		title: 'KVM',
		text: 'Full USB 2.0 at 480 Mbps, beyond simple HID: keyboards and mice, but also card readers, fingerprint scanners and webcams.',
		image: img('kvm-diagram.jpg')
	},
	{
		id: 'video-walls',
		title: 'Video walls',
		text: 'Receivers scale, crop and stretch. Software tells each one its position, and outputs stay perfectly synchronized — at no extra cost.',
		image: img('video-wall-diagram.jpg')
	},
	{
		id: 'multiview',
		title: 'Multiviewers',
		text: 'Processing is spread across endpoints, so no single expensive central processor. Add transmitters and receivers one by one.',
		image: img('multiview-diagram-2.jpg')
	}
];

export const sectors = [
	{ title: 'Control rooms & command centers', text: 'Zero latency and instant switching for operators who cannot wait.' },
	{ title: 'Government & judicial', text: 'Chambers, hearing rooms and offices on one scalable network.' },
	{ title: 'Education', text: 'Hybrid and HyFlex classrooms, lecture halls and campus-wide distribution.' },
	{ title: 'Medical', text: 'Visually lossless endoscopic video for operating rooms.', href: 'https://sdvoe.org/technology/use-cases/medical/' },
	{ title: 'Live production & esports', text: 'Frame-accurate switching for stages, arenas and competitive gaming.' },
	{ title: 'Enterprise & conference rooms', text: 'USB, BYOD and video over a single cable to every room.' },
	{ title: 'Defense & simulation', text: 'Glass-to-glass latency measured in hundredths of a millisecond.' },
	{ title: 'Venues & culture', text: 'Auditoriums, opera houses and civic centers that change program nightly.' }
];

// Site-wide content. Text is taken from sdvoe.org (Oct 2026) and condensed for the new hierarchy.
// Anything marked VERIFY needs confirmation from the Alliance before going live (see PROGETTO.md).

export const ORIGIN = 'https://sdvoe.org';
// Images: local WebP copies (made by `npm run images`) are used when present,
// otherwise the file is loaded from sdvoe.org. Vite fingerprints the local files.
const localImages = import.meta.glob('../assets/img/*.webp', { eager: true, query: '?url', import: 'default' });
const localByName = Object.fromEntries(
	Object.entries(localImages).map(([path, url]) => [path.split('/').pop().replace(/\.webp$/, ''), url])
);
export const img = (file) => localByName[file.replace(/\.(jpe?g|png)$/i, '')] ?? `${ORIGIN}/wp-content/uploads/${file}`;
// For images that exist only in this project (images-src/): the local copy, or null if not converted yet
export const localImg = (file) => localByName[file.replace(/\.(jpe?g|png)$/i, '')] ?? null;
export const hasLocalImages = Object.keys(localByName).length > 0;

// From the official list (PDF, 99 pages, last updated March 30, 2026): 3,528 people;
// about 1,345 distinct employers among those who named one. The list has no country field,
// so a by-country directory needs data from the Academy — see PROGETTO.md.
export const designPartners = {
	count: 3528,
	companies: 1300,
	updated: 'March 2026',
	list: 'https://sdvoe.org/wp-content/uploads/sdvoe-certified-design-partners.pdf'
};

// Language switcher. Interface only for now: no translations exist yet, so choosing a language
// does nothing (see PROGETTO.md §5). `flag` is the country code of the flag shown next to it.
export const languages = [
	{ code: 'en', label: 'English', flag: 'gb' },
	{ code: 'ja', label: '日本語', flag: 'jp' },
	{ code: 'zh', label: '中文', flag: 'cn' },
	{ code: 'it', label: 'Italiano', flag: 'it' },
	{ code: 'fr', label: 'Français', flag: 'fr' },
	{ code: 'es', label: 'Español', flag: 'es' },
	{ code: 'pt', label: 'Português', flag: 'pt' },
	{ code: 'ar', label: 'العربية', flag: 'sa', dir: 'rtl' },
	{ code: 'ko', label: '한국어', flag: 'kr' }
];
export const currentLanguage = 'en';

export const social = [
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/sdvoe-alliance' },
	{ label: 'YouTube', href: 'https://www.youtube.com/channel/UCI_ikZd7p5__VM3l5RaNQEg' },
	{ label: 'X', href: 'https://twitter.com/sdvoe' }
];

export const logos = {
	colour: img('logo-colour-300x105.png'),
	white: img('logo.png')
};

export const nav = [
	{
		label: 'Technology',
		href: '/technology',
		children: [
			{ label: 'Why SDVoE', href: '/technology', desc: 'The Power of 10 in one page', icon: 'zap' },
			{ label: 'How it works', href: '/technology#how-it-works', desc: 'From source to screen over 10G', icon: 'workflow' },
			{ label: 'Compare', href: '/technology/compare', desc: 'SDVoE vs. HDBaseT and IPMX', icon: 'compare' },
			{ label: 'Specifications', href: '/technology/specifications', desc: 'Performance and features', icon: 'specs' },
			{ label: 'Developers & API', href: '/developers', desc: 'One API, now ready for AI agents', icon: 'code' }
		]
	},
	{
		label: 'Solutions',
		href: '/solutions',
		children: [
			{ label: 'By application', href: '/solutions#applications', desc: 'Matrix, KVM, video walls, multiview', icon: 'grid' },
			{ label: 'By sector', href: '/solutions#sectors', desc: 'Control rooms, education, medical…', icon: 'factory' },
			{ label: 'Case studies', href: '/solutions#case-studies', desc: 'Real installations worldwide', icon: 'book' }
		]
	},
	{
		label: 'Products',
		href: '/products',
		children: [
			{ label: 'Product finder', href: '/products#finder', desc: 'Certified interoperable products', icon: 'search' },
			{ label: 'Member catalog', href: 'https://products.sdvoe.org/avcat/ctl18883/index.cfm?manufacturer=all', desc: '700+ products on AV-iQ', external: true, icon: 'library' },
			{ label: 'SDVoE Orchestrator', href: '/products#orchestrator', desc: 'Free system management software', icon: 'orchestrator' }
		]
	},
	{
		label: 'Learn',
		href: '/learn',
		children: [
			{ label: 'SDVoE Academy', href: '/learn', desc: 'Free self-paced courses', icon: 'academy' },
			{ label: 'Certifications', href: '/learn#certifications', desc: 'Design partners and design houses', icon: 'badge' },
			{ label: 'Certified design partners', href: '/learn#partners', desc: '3,500+ certified designers', icon: 'users' }
		]
	},
	{
		label: 'Alliance',
		href: '/alliance',
		children: [
			{ label: 'About', href: '/alliance', desc: 'Mission and governance', icon: 'info' },
			{ label: 'Board of directors', href: '/alliance#board', desc: 'The people who lead the Alliance', icon: 'board' },
			{ label: 'Members', href: '/alliance#members', desc: 'Pro AV, IT and chip companies', icon: 'building' },
			{ label: 'Join the Alliance', href: '/alliance#join', desc: 'Contributing and adopting membership', icon: 'handshake' },
			{ label: 'News & events', href: '/news', desc: 'Press, trade shows, blog', icon: 'news' }
		]
	}
];

// Key figures. Each one is quoted somewhere on the current site.
export const stats = [
	{ value: '<100 µs', label: 'End-to-end latency', note: 'Under 1/150th of a video frame' },
	{ value: '4K60 4:4:4', label: 'Uncompressed video', note: 'Artifact-free, identical to source' },
	{ value: '700+', label: 'Interoperable products', note: 'VERIFY: figure from the current Products page' },
	{ value: 'MEMBERS', label: 'Member companies', note: 'Counted from the members list' }
];

export const powerOf10 = [
	{ title: 'Zero latency', text: 'End-to-end transport under 100 microseconds, for real-time and interactive applications.' },
	{ title: 'No compression', text: 'Uncompressed 4K60 with 4:4:4 chroma, plus 21:9, 32:9 and 5K formats.' },
	{ title: 'Multiview and video wall', text: 'Native high-quality scaling makes multiview and video walls part of the distribution system.' },
	{ title: 'KVM', text: 'A full suite of commands and features for simple and complex KVM deployments.' },
	{ title: 'InstaSwitch', text: 'Instant transitions without visual disruption — built for live production and control rooms.' },
	{ title: 'USB 2.0 + video', text: 'Full 480 Mbps USB 2.0 alongside video on a single 10G link.' },
	{ title: 'Ultra-low power', text: 'The BlueRiver ASIC draws about 2 W, far below FPGA-based alternatives.' },
	{ title: 'Proven interoperability', text: 'A common ASIC and API keep devices from different manufacturers compatible by design.' },
	{ title: 'Standard software interface', text: 'One API lets developers build custom applications for any vertical.' },
	{ title: 'Ultimate flexibility', text: 'Bidirectional transceivers, copper or fibre, point-to-point or networked, three chip options.' },
	{ title: 'Bonus bandwidth', text: '1G Ethernet at every endpoint, even while carrying 4K60 4:4:4.' }
];

export const audiences = [
	{
		eyebrow: 'Consultants & integrators',
		title: 'I design AV systems.',
		text: 'Compare architectures, check specifications and get certified as an SDVoE Design Partner — free.',
		links: [
			{ label: 'Compare with HDBaseT', href: '/technology/compare' },
			{ label: 'Specifications', href: '/technology/specifications' },
			{ label: 'SDVoE Academy', href: '/learn' }
		]
	},
	{
		eyebrow: 'IT & technology managers',
		title: 'I run the network.',
		text: 'See why true AV/IT convergence only happens at 10G, and how SDVoE runs on off-the-shelf switches.',
		links: [
			{ label: 'AV/IT convergence', href: '/technology#convergence' },
			{ label: 'How it works', href: '/technology#how-it-works' },
			{ label: 'Case studies', href: '/solutions#case-studies' }
		]
	},
	{
		eyebrow: 'Manufacturers',
		title: 'I build AV products.',
		text: 'Ship interoperable endpoints on a royalty-free platform and join the companies already in the ecosystem.',
		links: [
			{ label: 'Membership benefits', href: '/alliance#join' },
			{ label: 'Product certification', href: '/learn#certifications' },
			{ label: 'Members', href: '/alliance#members' }
		]
	}
];

// Case studies moved to ./caseStudies.js

// Source of truth: sdvoe.org/alliance/members/ (confirmed as the most up-to-date list, Oct 2026).
// Founders: Christie, NETGEAR, Semtech.
export const members = {
	steering: [
		['Broadata', 'logo-broadata.jpg'],
		['Christie', 'logo-christie.jpg'],
		['IDK', 'logo-idk.png'],
		['NETGEAR Business', 'logo-netgear-color.jpg'],
		['Semtech', 'logo-semtech.jpg']
	],
	contributing: [
		['Aurora Multimedia', 'logo-aurora.jpg'],
		['DVIGear', 'logo-dvigear.jpg'],
		['Kramer', 'logo-kramer.jpg'],
		['ProITAV', 'logo-proitav.jpg'],
		['Snap One', 'logo-snapone.jpg'],
		['TT Visual Design', 'logo-tt-visual-design.jpg']
	],
	adopting: [
		['Analog Way', 'logo-analog-way.jpg'],
		['Apantac', 'logo-apantac.jpg'],
		['AVPro Edge', 'logo-avpro.jpg'],
		['Bluestream', 'logo-bluestream.jpg'],
		['Canare', 'logo-canare.jpg'],
		['Cypress', 'logo-cypress.jpg'],
		['DEXON', 'logo-dexon.jpg'],
		['FS', 'logo-fs.jpg'],
		['HDCVT', 'logo-hdcvt-1.jpg'],
		['High Sec Labs', 'logo-high-sec-labs.jpg'],
		['Honestar', 'logo-honestar.jpg'],
		['HPC', 'logo-hpc.jpg'],
		['Hyn@net', 'logo-hynanet.jpg'],
		['Imagenics', 'logo-imagenics.jpg'],
		['Jam Labs', 'logo-jam-labs.jpg'],
		['Liberty AV Solutions', 'logo-libertyav.jpg'],
		['Lightwave', 'logo-lightwave.jpg'],
		['Lindy', 'logo-lindy.jpg'],
		['Niveo', 'logo-niveo.jpg'],
		['Ruckus Networks', 'logo-ruckus.jpg'],
		['Theatrixx', 'logo-theatrixx.jpg'],
		['Vigilink', 'logo-vigilink.jpg'],
		['Wavesplitter', 'logo-wavesplitter.jpg'],
		['WyreStorm', 'logo-wyrestorm.jpg'],
		['Yamaha', 'logo-yamaha.jpg'],
		['Yarward', 'logo-yarward.jpg'],
		['Yuan', 'logo-yuan.jpg']
	]
};

// One source of truth: the number shown everywhere is the length of the members list above.
export const memberCount =
	members.steering.length + members.contributing.length + members.adopting.length;
for (const st of stats) if (st.value === 'MEMBERS') st.value = String(memberCount);

export const news = [
	{
		title: 'SDVoE Alliance spotlights Semtech, Broadata and AVPro Edge demonstrations at InfoComm 2026',
		date: '2026-06-09',
		kind: 'Alliance',
		href: `${ORIGIN}/news/press-releases/sdvoe-alliance-spotlights-semtech-broadata-and-avpro-edge-demonstrations-at-infocomm-2026/`
	},
	{
		title: 'Member demonstrations from IDK, Aurora Multimedia and Kramer at InfoComm 2026',
		date: '2026-05-27',
		kind: 'Alliance',
		href: `${ORIGIN}/news/press-releases/sdvoe-alliance-to-feature-member-demonstrations-from-idk-corporation-aurora-multimedia-and-kramer-at-infocomm-2026/`
	},
	{
		title: 'DVIGear introduces DisplayNet Connect for AI agents',
		date: '2026-05-21',
		kind: 'Members',
		href: `${ORIGIN}/news/press-releases/dvigear-introduces-displaynet-connect-for-ai-agents-bringing-natural-language-control-to-professional-av-over-ip-systems/`
	},
	{
		title: 'SDVoE Alliance expands API capabilities for agentic AI-assisted AV-over-IP workflows',
		date: '2026-05-19',
		kind: 'Alliance',
		href: `${ORIGIN}/news/press-releases/sdvoe-alliance-expands-api-capabilities-for-agentic-ai-assisted-av-over-ip-workflows/`
	},
	{
		title: 'DEXON Systems joins the SDVoE Alliance as an adopting member',
		date: '2026-04-23',
		kind: 'Alliance',
		href: `${ORIGIN}/news/press-releases/dexon-systems-joins-the-sdvoe-alliance-as-an-adopting-member/`
	},
	{
		title: 'Yarward joins the SDVoE Alliance as an adopting member',
		date: '2026-03-30',
		kind: 'Alliance',
		href: `${ORIGIN}/news/press-releases/yarward-joins-the-sdvoe-alliance-as-an-adopting-member/`
	},
	{
		title: 'SDVoE Alliance welcomes FS as an adopting member',
		date: '2025-11-07',
		kind: 'Alliance',
		href: `${ORIGIN}/news/press-releases/sdvoe-alliance-welcomes-fs-as-an-adopting-member/`
	},
	{
		title: 'SDVoE Alliance and NETGEAR join forces to build resources for the future of AV-over-IP',
		date: '2025-09-30',
		kind: 'Alliance',
		href: `${ORIGIN}/news/press-releases/sdvoe-alliance-and-netgear-join-forces-to-build-resources-for-the-future-of-av-over-ip/`
	},
	{
		title: 'Latency: reflections from modern AV over IP applications',
		date: '2023-10-24',
		kind: 'Blog',
		href: `${ORIGIN}/blog/latency-reflections-from-modern-av-over-ip-applications/`
	},
	{
		title: 'The truth is: SDVoE-based products are interoperable, no testing needed',
		date: '2022-08-18',
		kind: 'Blog',
		href: `${ORIGIN}/blog/the-truth-is-sdvoe-based-products-are-interoperable-no-testing-needed/`
	}
];

export const events = [
	{ name: 'ISE 2027', place: 'Fira Barcelona Gran Via, Spain', date: 'February 2–5, 2027', status: 'SDVoE booth: to be announced' },
	{ name: 'InfoComm 2027', place: 'Orange County Convention Center, Orlando', date: 'Exhibits June 16–18, 2027', status: 'SDVoE booth: to be announced' }
];

export const formatDate = (iso) =>
	new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

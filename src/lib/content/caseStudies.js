// Case studies — index of all 38 case studies published on sdvoe.org (WordPress pages under
// /technology/case-studies/, read through the WordPress REST API in Oct 2026).
//
// Full texts: `npm run import` writes src/lib/content/generated/case-studies.json from the
// WordPress API. They are read only on the server (src/lib/server/caseStudyStories.js): when a
// case study has full text there, its page renders it; otherwise the page shows the summary and
// links to the original.

import { img } from './site.js';

// slug | title | date | image | sector | summary | member (who supplied the solution, if named)
const rows = `
sdvoe-technology-bolsters-mission-critical-content-for-the-european-parliament-with-over-1000-endpoints|European Parliament: mission-critical interpretation video over 1,000 endpoints|2023-04-27|case-study-european-parliament-01-1.jpg|Government|Interpreters in up to 30 booths per room switch instantly between chamber, speaker, presentation and media views — one of the largest AV-over-IP installations worldwide.|IDK
sdvoe-technology-delegates-expandable-av-over-ip-distribution-for-the-virginia-senate|Virginia Senate: expandable AV-over-IP for a new General Assembly Building|2024-01-02|case-study-virginia-senate-00.jpg|Government|A nearly $300 million building with chambers, committee rooms and offices, linked to the State Capitol and ready to scale to 4K.|IDK
sdvoe-technology-empowers-centralized-control-room-operations-for-black-rock-mine-operations|Black Rock Mine Operations: one control room for three mines|2023-12-04|case-study-black-rock-mine-operations-00.jpg|Control rooms|A horseshoe video wall of 84 screens and 21 operator stations centralizes SCADA, CCTV and process data for 3.6 million tons of ore a year.|VuWall
military-tank-manufacturer-standardizes-sdvoe-technology-for-zero-latency-video-distribution-in-defense-simulators|Defense simulators: zero-latency video for tank crew training|2023-11-20|case-study-military-tank-02.jpg|Defense & simulation|Glass-to-glass encoding and decoding in under 0.03 ms for training simulators delivered with every tank.|Black Box
the-dutch-national-opera-and-ballet-integrates-future-proof-low-latency-technology-with-the-sdvoe-alliance|Dutch National Opera & Ballet: from 1986 analog video to low-latency IP|2023-11-14|case-study-dutch-national-opera-01.jpg|Venues & culture|The largest theater production house in the Netherlands replaces a composite analog system installed in 1986.|
sdvoe-technology-bolsters-flexible-communication-for-hybrid-hyflex-classrooms-at-ritsumeikan-asia-pacific-university|Ritsumeikan Asia Pacific University: hybrid HyFlex classrooms|2023-10-31|case-study-ritsumeikan-03.jpg|Education|A campus of nearly 6,000 students from 106 countries teaching in the room and online at the same time.|
zeevee-zyper4k-encoder-and-decoder-powered-by-sdvoe-technology-enhances-visualization-at-jefferson-parish-emergency-operations-center|Jefferson Parish Emergency Operations Center|2023-10-31|case-study-jefferson-parish-02.jpg|Control rooms|Better visualization for the emergency operations center of the most populous parish in the Greater New Orleans region.|ZeeVee
sdvoe-technology-empowers-reliable-distribution-for-mission-critical-dispatch-center-at-coserv|CoServ: reliable video for a mission-critical dispatch center|2023-10-23|sdvoe-case-study-coserv-01.jpg|Control rooms|An electric and gas cooperative serving about 425,000 customers in Northern Texas.|
sdvoe-technology-enables-low-latency-and-seamless-switching-for-esports-training-at-hongguang-university|Hongguang University: low-latency switching for esports training|2023-10-23|esports-00.jpg|Esports|Seamless switching and low latency for a competitive esports program in Taichung, Taiwan.|
cardinal-tien-college-of-healthcare-and-management-creates-an-immersive-educational-environment-with-sdvoe-technology|Cardinal Tien College: an immersive teaching environment|2023-09-06|case-study-cardinal-tien-00.jpg|Education|A healthcare and management college with campuses in New Taipei and Yilan builds immersive classrooms.|
sdvoe-technology-simplifies-video-distribution-at-shannon-brewing-company|Shannon Brewing Company: simple video distribution for a taproom|2023-05-26|case-study-shannon-brewing-01.jpg|Hospitality & retail|A growing craft brewery outside Fort Worth, Texas, sends any source to any screen.|
christie-terra-with-sdvoe-technology-empowers-immersive-educational-environment-at-ircad-3|IRCAD 3: immersive surgical training|2023-04-27|case-study-ircad3-02.jpg|Healthcare & research|A world-renowned surgical research and training institute at the University Hospital of Strasbourg.|Christie
sdvoe-delivers-low-latency-distribution-at-furuno-electrics-showroom-that-reproduces-the-wheel-house-of-the-ships|Furuno Electric: a showroom that recreates a ship's wheelhouse|2023-04-12|case-study-furuno-electric-01.jpg|Hospitality & retail|The marine electronics maker shows radar and navigation systems in a realistic bridge, fed with low-latency video.|
av-links-4k-60hz-av-over-ip-upgraded-the-thailand-based-event-venue-connext-sriracha|Connext Sriracha: 4K60 for a meeting and wedding venue|2023-03-29|case-study-connext-sriracha-02.jpg|Venues & culture|Instant, seamless switching for seminars, conferences and ceremonies in Thailand.|
av-links-sdvoe-solution-upgraded-the-thailand-based-event-venue-connext-sriracha|Connext Sriracha: video case study|2023-02-15||Venues & culture|A video tour of the upgraded event venue in Sriracha, Thailand.|
av-links-sdvoe-solutions-transport-synchronized-video-to-multiple-spaces-in-a-serviced-apartment|Yuu Residence Sriracha: synchronized video across a serviced apartment|2022-06-21|case-study-yuu-residence-sriracha-01.jpg|Hospitality & retail|A 29-storey residence with 285 rooms and over 1,600 m² of public space.|
houston-cougars-engage-fans-with-on-court-projection-powered-by-christie-solutions-including-terra-with-sdvoe-technology|Houston Cougars: on-court projection mapping|2022-02-22|case-study-houston-cougars-01.jpg|Venues & culture|A dramatic 3D pre-game show projected onto the basketball court at the Fertitta Center.|Christie
unc-esports-arena-powered-by-black-box-and-sdvoe|UNC Chapel Hill: the Carolina Gaming Arena|2022-01-21|case-study-unc-esports-arena-01.jpg|Esports|An on-campus arena where students play, compete and stream.|Black Box
sdvoe-delivers-4k-video-across-three-million-square-foot-american-dream-retail-space|American Dream: 4K across three million square feet|2021-11-09|case-study-aurora-american-dream-01.jpg|Hospitality & retail|Video distribution across a giant retail and entertainment complex near New York City.|Aurora Multimedia
christie-solutions-and-sdvoe-deliver-immersive-visuals-in-journey-to-the-west-theme-park|Journey to the West theme park: immersive dark rides|2021-10-07|journey-to-the-west-01.jpg|Venues & culture|Two immersive dark rides in Huai'an, China, based on the classic novel.|Christie
netgear-and-sdvoe-power-harrisburg-universitys-esports-facility|Harrisburg University: a varsity esports facility|2021-06-03|netgear-esports-02.jpg|Esports|An award-winning varsity program setting a new standard for collegiate esports.|NETGEAR
christie-projection-auto-calibration-image-processing-and-sdvoe-solutions-light-up-lotte-worlds-magic-castle|Lotte World: lighting up the Magic Castle|2021-01-18|christie-lotte-world-01.jpg|Venues & culture|Projection, auto-calibration and image processing on the landmark castle of Seoul's Magic Island.|Christie
latin-american-company-installs-christie-video-wall-powered-by-christie-terra-sdvoe-system|Ecuador: an auditorium video wall|2020-12-04|christie-ecuador-01.jpg|Corporate|One of Ecuador's largest private companies equips its new auditorium with a video wall.|Christie
christie-terra-sdvoe-technology-ties-it-all-together-at-montgomery-county-emergency-operations-center|Montgomery County Emergency Operations Center|2020-10-13|montgomery-county-eoc-02.jpg|Control rooms|The mission-critical hub where agencies in Conroe, Texas, manage large-scale events.|Christie
christie-and-sdvoe-bring-culture-to-life-at-korean-museum|National Museum of Korea: bringing culture to life|2020-10-13|national-museum-of-korea-03.jpg|Venues & culture|Immersive exhibits for the country's largest museum and its 220,000 objects.|Christie
christie-aus-licht|Aus LICHT: Stockhausen's opera cycle|2019-10-30|christie-aus-licht-01.jpg|Venues & culture|Projection for a landmark staging of Karlheinz Stockhausen's seven-opera cycle.|Christie
christie-beach-festival|Barcelona Beach Festival|2019-09-04|christie-beach-festival-01.jpg|Venues & culture|Twelve hours of visuals on the sands of Platja del Fòrum.|Christie
christie-barcelona|MWC Barcelona|2019-04-09|christie-barcelona-1.jpg|Venues & culture|Immersive experiences for more than 109,000 attendees from 198 countries.|Christie
quadram-institute|Quadram Institute: from endoscopy to auditorium|2019-03-14|or-staff.png|Healthcare & research|Demanding AV requirements across a food and health research institute, from the endoscopy unit up.|ZeeVee
christie-capital-one|Capital One Arena|2019-01-31|case-study-christie-cap-one-01.jpg|Venues & culture|Home of the Washington Capitals and Wizards, and a major live music venue.|Christie
zurich-opera-house|Zurich Opera House|2018-12-13|zurich-01.jpg|Venues & culture|Video for a new production of Monteverdi's L'incoronazione di Poppea.|
yale|Yale Law School|2018-12-07|yale-01.jpg|Education|AV over IP in the Sterling Law Building, built in 1931.|
christie-circa|Circa, Los Angeles|2018-10-03|case-study-christie-cover.jpg|Hospitality & retail|A landmark development in downtown L.A. that draws more than six million visitors.|Christie
indiana-state-museum|Indiana State Museum|2018-01-30|case-study-indiana-state-cover.jpg|Venues & culture|70,000 square feet of exhibits and over 450,000 artifacts in Indianapolis.|
excise-department|Thai Excise Department: command and control|2017-12-18|case-study-excise-bangkok-cover.jpg|Control rooms|An upgraded command and control space for the Thai government in Bangkok.|
brandstar|BrandStar: a branded entertainment studio|2017-10-12|brandstar-01.jpg|Corporate|A production company making programs for Lifetime, Fox Business and the History Channel.|
ntnu|NTNU: campus-wide deployment|2017-10-12|ntnu-01.jpg|Education|Norway's largest university, with 40,000 students, deployed by Atea.|
pledj|Pledj: AV on a superyacht|2017-10-12|pledj-01.jpg|Hospitality & retail|An AV system with a wow factor for one of the world's top private yachts.|
`;

// Case studies whose solution came from companies no longer listed as members.
// REVIEW: former member — see PROGETTO.md §5, item 10.
export const FORMER_MEMBERS = ['Black Box', 'ZeeVee'];

export const caseStudies = rows
	.trim()
	.split('\n')
	.map((line) => {
		const [slug, title, date, image, sector, summary, member] = line.split('|');
		return {
			slug,
			title,
			date,
			image: image ? img(image) : null,
			cover: image || null,
			sector,
			summary,
			member: member || null,
			formerMember: FORMER_MEMBERS.includes(member),
			original: `https://sdvoe.org/technology/case-studies/${slug}/`
		};
	})
	.sort((a, b) => b.date.localeCompare(a.date));

export const featuredCaseStudies = [
	'sdvoe-technology-bolsters-mission-critical-content-for-the-european-parliament-with-over-1000-endpoints',
	'sdvoe-technology-delegates-expandable-av-over-ip-distribution-for-the-virginia-senate',
	'sdvoe-technology-empowers-centralized-control-room-operations-for-black-rock-mine-operations'
].map((s) => caseStudies.find((c) => c.slug === s));

export const caseSectors = ['All', ...[...new Set(caseStudies.map((c) => c.sector))].sort()];

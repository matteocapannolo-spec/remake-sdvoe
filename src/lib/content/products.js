// SDVoE Certified Interoperable Products, from sdvoe.org/products/certified-products/ (Oct 2026).
// The current page does not name the manufacturer of each table. Brands below are inferred
// from model names — VERIFY before publishing. "TBC" = not identified.
// REVIEW: former member — the ZeeVee rows are kept for now; see PROGETTO.md §5, item 10.

const rows = `
TBC|SDM-SDVoE-R||RX|0
TBC|SDM-FIB-R-Pro||RX|1
TBC|SDM-FIB-R||RX|0
TBC|OG-HDM2.0-FIB-II-Tx||TX|1
TBC|HDM2.0-FIB-II-Tx-Pro||TX|1
TBC|HDM2.0-FIB-II-Rx-Pro||RX|1
TBC|HDM2.0-FIB-II-R||RX|0
TBC|HDM2.0-FIB-II-E||TX|0
TBC|SDCNV-200|Converter|TX|1
TBC|SDCNV-200|Converter|RX|1
IDK|NJR-L01UC-R|Receiver, copper|RX|0
IDK|NJR-L01UF-R|Receiver, fiber|RX|0
IDK|NJR-L01UF-T|Transmitter, fiber|TX|0
IDK|NJR-L01UC-T|Transmitter, copper|TX|0
IDK|NJR-P01UF-T|Transmitter, fiber|TX|1
IDK|NJR-P01UFW-TR|Transceiver, fiber|TR|1
IDK|NJR-P01UFW-T|Transmitter, fiber|TX|1
IDK|NJR-P01UF-TR|Transceiver, fiber|TR|1
IDK|NJR-P01UCW-TR|Transceiver, copper|TR|1
IDK|NJR-P01UCW-T|Transmitter, copper|TX|1
IDK|NJR-P01UC-T|Transmitter, copper|TX|1
IDK|NJR-P01UC-TR|Transceiver, copper|TR|1
IDK|NJR-P01UF-R|Receiver, fiber|RX|1
IDK|NJR-P01UC-R|Receiver, copper|RX|1
ZeeVee|Z4KC2XS-E|ZyPerXSE copper encoder, HID USB, no Dante|TX|1
ZeeVee|Z4KF2XS-E|ZyPerXSE fiber encoder, HID USB, no Dante|TX|1
ZeeVee|Z4KC2XS-DAU|ZyPerXSE copper decoder, Icron USB, Dante audio|RX|1
ZeeVee|Z4KC2XS-EAU|ZyPerXSE copper encoder, Icron USB, Dante audio|TX|1
ZeeVee|Z4KC2XS-D|ZyPerXSE copper decoder, HID USB, no Dante|RX|1
ZeeVee|Z4KF2XS-D|ZyPerXSE fiber decoder, HID USB, no Dante|RX|1
ZeeVee|Z4KF2XS-DAU|ZyPerXSE fiber decoder, Icron USB, Dante audio|RX|1
ZeeVee|Z4KF2XS-EAU|ZyPerXSE fiber encoder, Icron USB, Dante audio|TX|1
Aurora|IPT6002-UD-000|Transceiver, copper + fiber, USB-C + HDMI in, HDMI out, Icron USB 2.0, Dante I/O|TR|1
Aurora|IPT6002-H-000|Transceiver, copper + fiber, USB-C + HDMI in, HDMI out, USB HID|TR|1
Aurora|IPT6000ASF-UD-000|Transceiver, fiber, HDMI I/O, Icron USB 2.0, Dante out|TR|1
Aurora|IPT6000ASF-H-000|Transceiver, fiber, HDMI I/O, USB HID|TR|1
Aurora|IPT6000ASC-UD-000|Transceiver, copper, HDMI I/O, Icron USB 2.0, Dante out|TR|1
Aurora|IPT6000ASC-H-000|Transceiver, copper, HDMI I/O, USB HID|TR|1
Aurora|IPT6000ASCF-UD-000|Transceiver, copper + fiber, HDMI I/O, Icron USB 2.0, Dante I/O|TR|1
Aurora|IPT6000ASCF-H-000|Transceiver, copper + fiber, HDMI I/O, USB HID|TR|1
Aurora|IPE6000W-US-UD-000|Transmitter, US 3-gang wall plate, USB-C + HDMI in, Icron USB 2.0, Dante out|TX|1
Aurora|IPE6000W-US-H-000|Transmitter, US 3-gang wall plate, USB-C + HDMI in, USB HID|TX|1
Aurora|IPE6000W-EU-UD-000|Transmitter, EU 3-gang wall plate, USB-C + HDMI in, Icron USB 2.0, Dante out|TX|1
Aurora|IPE6000W-EU-H-000|Transmitter, EU 3-gang wall plate, USB-C + HDMI in, USB HID|TX|1
Aurora|IPE6000LASF-001|Transmitter, ultra compact, fiber, HDMI in|TX|0
Aurora|IPE6000LASC-000|Transmitter, copper, HDMI in, audio, LAN, RS-232, IR|TX|0
Aurora|IPE6000ASF-UD-000|Transmitter, fiber, HDMI I/O, Icron USB 2.0, Dante out|TX|1
Aurora|IPE6000ASC-UD-000|Transmitter, copper, HDMI I/O, Icron USB 2.0, Dante out|TX|1
Aurora|IPE6000ASC-H-000|Transmitter, copper, HDMI I/O, USB HID|TX|1
Aurora|IPD6000W-US-U-000|Receiver, US 3-gang wall plate, HDMI out, Icron USB 2.0|RX|1
Aurora|IPD6000W-US-H-000|Receiver, US 3-gang wall plate, HDMI out, USB HID|RX|1
Aurora|IPD6000W-EU-U-000|Receiver, EU 3-gang wall plate, HDMI out, Icron USB 2.0|RX|1
Aurora|IPD6000W-EU-H-000|Receiver, EU 3-gang wall plate, HDMI out, USB HID|RX|1
Aurora|IPD6000LASF-001|Receiver, ultra compact, fiber, HDMI out|RX|0
Aurora|IPD6000LASC-000|Receiver, copper, HDMI out, audio, LAN, RS-232, IR|RX|0
Aurora|IPD6000ASF-U-000|Receiver, fiber, HDMI I/O, Icron USB 2.0|RX|1
Aurora|IPD6000ASF-H-000|Receiver, fiber, HDMI I/O, USB HID|RX|1
Aurora|IPD6000ASC-U-000|Receiver, copper, HDMI I/O, Icron USB 2.0|RX|1
Aurora|IPD6000ASC-H-000|Receiver, copper, HDMI I/O, USB HID|RX|1
`;

export const certifiedProducts = rows
	.trim()
	.split('\n')
	.map((line) => {
		const [brand, model, desc, type, proc] = line.split('|');
		const d = (desc || '').toLowerCase();
		return {
			brand,
			model,
			desc: desc || '—',
			type,
			processing: proc === '1',
			media: d.includes('copper + fiber') ? 'Copper + fiber' : d.includes('fiber') ? 'Fiber' : d.includes('copper') ? 'Copper' : '—',
			usb: d.includes('icron') ? 'USB 2.0' : d.includes('hid') ? 'USB HID' : '—',
			dante: d.includes('dante') && !d.includes('no dante')
		};
	});

export const typeLabels = { TX: 'Transmitter', RX: 'Receiver', TR: 'Transceiver' };

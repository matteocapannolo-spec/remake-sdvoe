// Board of directors, imported from sdvoe.org/board-of-directors by `npm run import`
// (names, companies, photos and biographies in generated/board.json).
import { img, members, logos } from './site.js';

const generated = Object.values(import.meta.glob('./generated/board.json', { eager: true, import: 'default' }))[0] ?? { people: [] };

export const boardUpdated = generated.updated ?? null;

// Company logo: the Alliance's own for its president, otherwise the member whose name shares
// the first word ("NETGEAR" ↔ "NETGEAR Business", "IDK Corporation" ↔ "IDK").
const allMembers = [...members.steering, ...members.contributing, ...members.adopting];
const firstWord = (s) => s.split(/\s+/)[0].toLowerCase();
function logoFor(company) {
	if (/^SDVoE/i.test(company)) return logos.colour;
	const m = allMembers.find(([name]) => firstWord(name) === firstWord(company));
	return m ? img(m[1]) : null;
}

// President first, then directors in the order of the current site
export const board = generated.people.map((p) => ({ ...p, photo: p.photo ? img(p.photo) : null, logo: logoFor(p.company) }));

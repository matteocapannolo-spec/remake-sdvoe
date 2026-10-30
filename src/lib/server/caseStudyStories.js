// Full texts of the case studies (generated/case-studies.json, ~200 KB). Server-only: each case
// study page gets just its own blocks through +page.server.js, so the texts never end up in the
// JavaScript shared by every page.

const generated = Object.values(import.meta.glob('../content/generated/case-studies.json', { eager: true, import: 'default' }))[0] ?? [];
const fullBySlug = Object.fromEntries(generated.map((g) => [g.slug, g]));
const baseName = (file) => file.replace(/\.\w+$/, '');

// The hero already shows the cover photo: don't repeat it in the story
export const storyBlocks = (slug, cover) => fullBySlug[slug]?.blocks.filter((b) => !(b.type === 'img' && cover && baseName(b.src) === baseName(cover))) ?? null;

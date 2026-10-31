# CLAUDE.md — sdvoe.org remake

Contesto per Claude Code. Il progetto è il rifacimento del sito della SDVoE Alliance (sdvoe.org): SvelteKit 2 + Svelte 5, generato in HTML statico.
Documenti da leggere prima di lavorare:
- `PROGETTO.md` — obiettivi, struttura, design system, **punti aperti (sezione 5)** e roadmap (sezione 6)
- `README.md` — comandi e dove si modifica cosa

Lingua: l'utente scrive in italiano, quindi rispondere in italiano. I testi del sito sono in inglese.

## Comandi

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # sito statico in /build (deve finire senza errori)
npm run import    # casi studio e board of directors dall'API WordPress di sdvoe.org
npm run images    # scarica e converte in WebP tutte le immagini usate (src/lib/assets/img)
```

Sul computer dell'utente sdvoe.org è raggiungibile. **Primo compito della prima sessione:**
lanciare `npm run import` e poi `npm run images`, verificare che la build passi e che le pagine
dei casi studio mostrino il testo completo. Infine aggiornare la roadmap in PROGETTO.md.

## Struttura

- `src/lib/content/` — tutti i contenuti (site.js, technology.js, solutions.js, products.js, caseStudies.js, board.js, generated/)
- `src/lib/server/` — dati letti solo in fase di build (testi completi dei casi studio): i contenuti pesanti vanno qui, non in `content/`, altrimenti finiscono nel JS di ogni pagina
- `src/lib/styles/tokens.css` — design token; `global.css` — classi comuni
- `src/lib/components/` — Nav, Footer, Announcement, PageHero, SubNav, HowItWorks, Render, ExploreCards, WhyBento, BoardCard, BoardGrid, LangSwitch, NeonFiber, LightBeams, LogoWall, CaseCard, Check, Img, Wordmark, Seo, BackToTop
- `src/routes/` — pagine; `solutions/case-studies/[slug]` è prerenderizzata da `entries()`
- `scripts/` — `fetch-images.mjs`, `import-content.mjs`, `p10-logo-on-dark.mjs` (logo Power of 10+ per fondi scuri)
- `static/_redirects` + `vercel.json` — redirect 301 dai vecchi URL (tenerli allineati)

## Design system (vincoli)

Base: `docs/DESIGN-dji.md` (struttura e componenti DJI). Font **Open Sans** 400/500/600. Colori **SDVoE**:
Deep Blue `#0C67BA` per tutte le azioni, Sky Blue `#31A3E3` solo su fondi scuri, testo `#262626` / `#58595B`.
- Riquadri e card **squadrati**; arrotondati (8px) solo pulsanti a pillola, "option card", piccole etichette e le card della home in stile store DJI (`ExploreCards`, `WhyBento`)
- Niente ombre, tranne pannello del menu, pulsante "torna su", hover delle card della home in stile store DJI (`ExploreCards`, `WhyBento`) e le immagini scontornate che sporgono (ledwall)
- **Niente arancione.** Le etichette di rango (`.tier`, `--tier`) sono Deep Blue su fondo chiaro e Sky Blue su fondo scuro (`.on-dark`)
- Icone del menu: Lucide (`@lucide/svelte`), scelte con la chiave `icon` delle voci di `nav` in site.js e mappate in Nav.svelte
- Contrasto WCAG AA obbligatorio (i grigi DJI sono già stati scuriti)
- Link interni sempre con `href()` da `$lib/link.js`; immagini con `img()` da `site.js`

## Regole sui contenuti

- Latenza: scrivere sempre "under 100 µs (under 1/150th of a frame)". Mai "zero-millisecond" o "sub-microsecond".
- Titoli (h1–h6, titoli di card e di hero) senza punto finale. Un punto interno fra due frasi resta ("Matrix-grade video. Ethernet freedom").
- Campagna: sempre "Power of 10+" (cifre, con il +). Mai "Power of Ten", "Power of Ten+" o "Power of 10" senza +.
- Numero membri: calcolato da `members` in site.js (fonte: pagina Members, confermata come la più aggiornata).
- Steering member: Broadata, Christie, IDK, NETGEAR, Semtech. Fondatori: Christie, NETGEAR, Semtech.
- `VERIFY` nel codice = dato da confermare con l'alleanza; `REVIEW: former member` = contenuti di ex membri (Black Box, ZeeVee), restano finché non si decide (PROGETTO.md §5 punto 10).
- Non inventare dati: se manca un'informazione, segnarla in PROGETTO.md §5.

## Qualità

Prima di consegnare: `npm run build` senza errori. Su pagine nuove: Lighthouse accessibilità e SEO 100, nessun overflow orizzontale a 375 px.

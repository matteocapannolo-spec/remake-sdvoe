# sdvoe.org: nuovo sito (draft)

SvelteKit 2 + Svelte 5, generato in HTML statico. Il documento di progetto (obiettivi, struttura, design system, punti aperti, roadmap) è in [PROGETTO.md](PROGETTO.md).

## Avvio

```bash
npm install
npm run import   # una volta: importa casi studio e board of directors dall'API WordPress
npm run images   # una volta: scarica e ottimizza le immagini da sdvoe.org (vedi sotto)
npm run dev      # http://localhost:5173
npm run build    # sito statico in /build
npm run preview  # serve /build in locale
```

Serve Node 20 o superiore.

## Anteprima su GitHub Pages

Ogni push su `main` pubblica un'anteprima su https://matteocapannolo-spec.github.io/remake-sdvoe/ (workflow `.github/workflows/pages.yml`). Non sostituisce sdvoe.org.

- La build dell'anteprima vive nella sottocartella `/remake-sdvoe`: la imposta la variabile `BASE_PATH`. In locale: `BASE_PATH=/remake-sdvoe npm run build` (in Git Bash su Windows anteporre `MSYS_NO_PATHCONV=1`).
- Ogni build in sottocartella ha `noindex, nofollow`, così l'anteprima non finisce nei motori di ricerca come copia di sdvoe.org. La build normale (`npm run build`) non lo ha.
- GitHub Pages non gestisce i redirect: `static/_redirects` e `vercel.json` servono solo sull'hosting definitivo.
- Prima volta: su GitHub, Settings → Pages → Source: **GitHub Actions**.

## Dove si modifica cosa

| Cosa | Dove |
|---|---|
| Board of directors | `src/lib/content/board.js` (legge `generated/board.json`, generato da `npm run import`) |
| Casi studio | `src/lib/content/caseStudies.js` (indice: titolo, settore, sintesi, membro) e `src/lib/content/generated/case-studies.json` (testi completi, generato da `npm run import`; letto solo lato server da `src/lib/server/caseStudyStories.js`, così non finisce nel JS delle altre pagine) |
| Testi, elenchi, numeri | `src/lib/content/*.js`. `site.js` contiene menu, numeri chiave, membri, casi studio, news ed eventi. `technology.js` contiene Power of 10, livelli, confronti e specifiche. `solutions.js` applicazioni e settori. `products.js` i prodotti certificati |
| Colori, font, spaziature, raggi | `src/lib/styles/tokens.css` (token del design system) |
| Stili comuni (pulsanti, card, linguette, tabelle, FAQ) | `src/lib/styles/global.css` |
| Componenti | `src/lib/components/` |
| Pagine | `src/routes/<pagina>/+page.svelte` |
| Barra annunci in cima | `src/lib/components/Announcement.svelte` (un messaggio solo) |
| Redirect dai vecchi URL | `static/_redirects` (Netlify, Cloudflare Pages) e `vercel.json` (Vercel) |

L'**immagine per le condivisioni social** è `static/og.jpg` (1200×630).

Il **numero dei membri** non si scrive a mano: viene calcolato dall'elenco `members` in `site.js`, quindi basta aggiungere o togliere un logo. Anche la **sitemap** (`/sitemap.xml`) si genera da sola dalle pagine presenti e l'anno del copyright si aggiorna da solo.

## Contenuti dal sito attuale

`npm run import` legge l'API pubblica di WordPress (`/wp-json/wp/v2/pages?parent=901`) e scrive i testi completi dei casi studio in `src/lib/content/generated/case-studies.json`. Toglie gli shortcode del page builder e il testo ripetuto su ogni caso studio: elenco dei benefici, invito alla newsletter, link al PDF, nota sui marchi, sezioni "About …". I sottotitoli scritti come paragrafi in grassetto (Challenge, Solution…) diventano titoli veri, i crediti fotografici restano e le miniature vengono sostituite dall'immagine originale. La foto di copertina non viene ripetuta nel testo.

Lo stesso comando importa il **board of directors** dalla pagina /board-of-directors/ e dalle sue pagine figlie: nome, azienda, ruolo (President o Director), foto e biografia, in `src/lib/content/generated/board.json`. Quando l'alleanza cambia il board sul sito attuale basta rilanciare `npm run import` e `npm run images`.

Le pagine dei casi studio mostrano il testo completo se presente; altrimenti mostrano la sintesi e un link all'originale. Con `npm run import -- --dry` vedi cosa verrebbe importato senza scrivere nulla.

## Immagini

Le immagini dei contenuti (loghi, foto dei casi studio, schemi) si richiamano per nome con `img('nome-file.jpg')`.

- Se esiste una copia locale in `src/lib/assets/img/nome-file.webp`, il sito usa quella. Vite le ottimizza e le include nella build; quelle sotto i 4 KB diventano direttamente parte della pagina.
- Altrimenti l'immagine viene caricata da `https://sdvoe.org/wp-content/uploads/`.

`npm run images` trova da solo tutti i nomi usati nel codice, li scarica, li converte in WebP (loghi a 360 px, foto e schemi a 1600 px) e li salva in `src/lib/assets/img/`. Opzioni:

- `npm run images -- --from ./cartella` per convertire file che hai già. Le immagini fornite per il sito (per ora gli sfondi delle card "Explore" in home) stanno in `images-src/`: si convertono con `npm run images -- --from images-src`;
- `npm run images -- --force` per riscaricare tutto.

Dopo questo passaggio il sito non dipende più da sdvoe.org. Se un'immagine non si carica, i componenti mostrano un segnaposto (nome del membro in testo, riquadro scuro per le foto) invece dell'icona dell'immagine rotta.

## Note di sviluppo

- **Link interni:** usare `href('/percorso')` da `$lib/link.js`, che aggiunge base path e barra finale. Le pagine sono generate come `cartella/index.html` e funzionano su qualsiasi hosting statico.
- **Cartella dei file generati:** si chiama `app/` (`kit.appDir`) invece di `_app`, perché alcuni hosting riservano i nomi che iniziano con `_`.
- **Segnaposti nel codice:** `VERIFY` indica un dato da confermare, `REVIEW: former member` un contenuto di ex membri da ripensare. L'elenco completo è in PROGETTO.md, sezione 5.
- **Qualità (Lighthouse mobile, ottobre 2026):** prestazioni 99–100, accessibilità 100, SEO 100 su tutte le pagine. "Best practices" era a 96 solo per le immagini caricate da sdvoe.org; ora sono tutte in locale (da rimisurare).

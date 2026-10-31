# SDVoE.org: progetto di rifacimento

Draft v0.6 (testi completi dei 38 casi studio e immagini in locale), 30 ottobre 2026

## 1. Obiettivi

Il sito attuale ha tre problemi: non dice in apertura cosa offre, sparge il messaggio su troppe pagine e dà l'impressione di essere fermo (news ferme a giugno, eventi già passati, © 2025, sezione membri vuota, numeri sulla latenza che si contraddicono).

Il nuovo sito deve:

1. **Dire subito cosa offre SDVoE.** Qualità e latenza di una matrice su una rete 10G standard, con prodotti di marchi diversi che funzionano tra loro.
2. **Portare ogni pubblico alla sua azione.** I progettisti verso confronti, specifiche e Academy. Chi gestisce l'IT verso la convergenza AV/IT. I produttori verso l'adesione all'alleanza.
3. **Portare le visite ai membri.** L'alleanza non vende: il sito deve portare ai prodotti certificati, ai partner e ai cataloghi dei membri.
4. **Essere veloce, accessibile e facile da aggiornare.**

## 2. Architettura dell'informazione

### Navigazione: 5 voci invece di 8, circa 18 sotto-voci invece di 30

| Voce | Contenuto | Pagine attuali che sostituisce |
|---|---|---|
| **Technology** | Why SDVoE (Power of 10+, come funziona, oltre la matrice, convergenza, sostenibilità, benefici) · Compare · Specifications · Developers & API | Power of 10, The matrix transformed, A full stack solution, Benefits, AV/IT convergence, Sustainability shootout, SDVoE vs HDBaseT, SDVoE vs IPMX, Specifications |
| **Solutions** | Per applicazione · per settore · tutti i 38 casi studio, filtrabili, ognuno con la sua pagina | Use cases (5 pagine), Case studies |
| **Products** | Ricerca prodotti certificati · catalogo AV-iQ · Orchestrator · API per l'AI | Products, Member products, Certified products |
| **Learn** | Academy · tre certificazioni · elenco dei partner | Academy, 4 voci di certificazione, Design Partners, Design Houses |
| **Alliance** | Missione · board of directors (con una pagina di biografia per persona) · membri per livello · adesione · FAQ · News ed eventi | About, Board, Members, Apply, FAQ, Events, Blog, News, Member press releases |

Pulsante fisso nella barra di navigazione: **Find products**. Pulsante secondario ricorrente: **Join the Alliance**. Al posto del link 日本語 c'è un selettore di lingua con bandierine (inglese predefinito, giapponese, cinese, italiano, francese, spagnolo, portoghese, arabo, coreano). Per ora è solo interfaccia: scegliere una lingua non fa nulla (vedi §5 punto 16).

### Ordine della homepage

1. Hero scura con la promessa ("Matrix-grade video. Ethernet freedom.") e due pulsanti
2. Quattro card in stile "What's Hot" dello store DJI: prodotti certificati, Power of 10+, Academy, adesione
3. Griglia "Why SDVoE" in stile bento (come "Why shop with DJI Store"): latenza, 4K60 4:4:4, switch 10G, prodotti, video wall, InstaSwitch, membri
4. Loghi dei membri che scorrono
5. Schema "come funziona" (sorgente → TX → switch 10G → RX → display)
6. Tre percorsi per pubblico
7. Confronto con HDBaseT (12 dispositivi contro 22)
8. Tre casi studio
9. Notizie
10. Fascia con tre collegamenti (prodotti, aiuto alla progettazione, prossima fiera)
11. Newsletter nel footer: un solo campo, senza captcha visibile

### Cosa è stato tolto

- "Welcome to the SDVoE ecosystem" e il testo ripetuto due volte
- Il comunicato stampa usato come pagina Power of 10
- Le pagine Technology che dicevano la stessa cosa (unite in /technology)
- Il link "Log In" generico (resta solo per l'Academy, che è su un dominio esterno)
- Lo slider

## 3. Design system (v0.2: DJI)

Base: **DESIGN-dji.md**, cioè uno "showroom": fondo bianco, riquadri squadrati separati da sottili spazi bianchi, ogni azione è una pillola in un solo blu, testo compatto con interlinea stretta, fasce grigie piatte e footer antracite. Font come DJI: **Open Sans**. Colori: **marchio SDVoE**.

| Ruolo | DJI | SDVoE (usato) |
|---|---|---|
| Font | Open Sans 400 / 500 / 600, spaziatura tra lettere −0,02 em (testo) e −0,03 em (titoli) | Uguale. Font caricati dal sito stesso con @fontsource, senza Google Fonts |
| Colore delle azioni (pulsanti principali, link) | #0070D5 | **#0C67BA** SDVoE Deep Blue |
| Pulsante "morbido" | #DEEAFD | #E3EEF9 (Deep Blue molto chiaro) |
| Etichette di rango ("Recommended", "Steering members") | arancione #BE4E04 | **Niente arancione** (deciso il 30 ottobre): Deep Blue su fondo chiaro, Sky Blue su fondo scuro |
| Accento sui fondi scuri | — | **#31A3E3** SDVoE Sky Blue (scie nella hero, punti luce nei disegni) |
| Testo | #262626 / #595959 / #8C8C8C | #262626 / **#58595B** (grigio SDVoE) / #8C8C8C |
| Fondi | #FFFFFF, #F5F5F5 (riquadri), #F7F9FA (fasce) | Uguali |
| Footer | #272727 | Uguale |

**Componenti ripresi da DJI**
- Barra annunci in cima a ogni pagina, con un messaggio solo, chiudibile. Oggi annuncia l'API per gli agenti AI.
- Barra di navigazione bianca alta 64 px. In homepage è trasparente sopra la hero e diventa bianca allo scorrimento. I menu si aprono in un pannello largo quanto la pagina.
- Hero a tutta larghezza su fondo scuro, testo in basso a sinistra, pulsante blu più pulsante "fantasma" bianco.
- Riga di numeri chiave grandi, a peso normale, con didascalia grigia (come le specifiche dei prodotti DJI).
- Card della home come "What's Hot" dello store DJI: card scure con angoli da 8 px, disegno vettoriale che sporge dal bordo superiore, nome e frase in bianco, un dato in basso a sinistra e un pulsante bianco a pillola. Quattro per riga, a scorrimento orizzontale sugli schermi stretti.
- Numeri chiave come "Why shop with DJI Store": griglia bento di card bianche su fascia grigia, titolo in alto e grande grafica blu sotto.
- Pannello del menu con un'icona (Lucide) accanto a ogni sottovoce.
- Card con foto e titolo bianco sovrapposto per i casi studio. Card bianche su fascia grigia per i percorsi per pubblico.
- Confronto a colonne con valori grandi e linguette sottolineate. Filtri come pillole che si riempiono di nero quando sono attive.
- Livelli di adesione come le schede "opzione" dello store DJI: angoli da 8 px, bordo blu da 2 px sulla scheda consigliata, badge blu nell'angolo.
- FAQ a righe separate da un filo. Fascia finale con tre collegamenti (prodotti, aiuto alla progettazione, prossima fiera). Footer antracite con promozione dell'Academy, iscrizione alla newsletter e colonne di link. Pulsante "torna su" galleggiante.

**Regole:** niente angoli arrotondati su riquadri e card (solo pillole, schede opzione, etichette e le card in stile store della home). Niente ombre, tranne pannello del menu, pulsante "torna su", hover delle card in stile store della home (come su DJI) e immagini scontornate che sporgono. Niente arancione: gli accenti sono solo i due blu SDVoE (unica eccezione: i colori della ruota "Power of 10+" sull'icona di "Why SDVoE" nel menu). Testo mai nero puro.

**Fotografia.** Il sistema DJI vive di foto di prodotto. Nel draft i riquadri usano disegni vettoriali provvisori. Per la fase 1 servono foto da studio dei prodotti dei membri (su fondo grigio chiaro) e foto delle installazioni per i casi studio.

## 4. Stack e prestazioni

- **SvelteKit 2 + Svelte 5** con `adapter-static`: ogni pagina è generata in HTML statico e servita da CDN (Cloudflare Pages, Netlify o Vercel). Non serve un server, la superficie d'attacco è minima e il costo di hosting è quasi nullo.
- JavaScript minimo: navigazione, filtri, selettori a schede. Le pagine funzionano anche senza JS.
- Font self-hosted e solo 4 pesi. Niente jQuery, Revolution Slider o plugin WordPress.
- Immagini caricate solo quando servono (lazy-load), con dimensioni dichiarate (CLS ≈ 0). Lo schema "come funziona" è SVG inline, senza richieste di rete.
- Accessibilità: link "salta al contenuto", focus visibile, un solo H1 per pagina, tabelle con intestazioni, rispetto di `prefers-reduced-motion` (la striscia dei loghi si ferma).
- Obiettivi: Lighthouse ≥ 95 in tutte le categorie, LCP < 1,5 s su 4G, meno di 100 KB di JS per pagina.
- **Misurato (Lighthouse mobile, 30 ottobre 2026, 7 pagine):** prestazioni 99–100, accessibilità 100, SEO 100, best practices 96. Il 96 dipendeva solo dalle immagini caricate da sdvoe.org: dal 30 ottobre tutte le 142 immagini sono in locale (WebP, 18 MB → 5 MB) e la build non fa più richieste a sdvoe.org. LCP 1,1–1,4 s, CLS ≤ 0,004.
- **Rimisurato (Lighthouse mobile, 30 ottobre 2026, home, Alliance, una biografia del board):** accessibilità, SEO e best practices 100; prestazioni scese a 80–90 (TBT ~350 ms), con ~360 KB di JS per pagina.
- **Alleggerimento (30 ottobre 2026):** JS per pagina da ~360 KB a 167–200 KB (62–75 KB compressi).
  - I testi completi dei casi studio (~200 KB) si leggono solo lato server (`src/lib/server/caseStudyStories.js` + `+page.server.js`): ogni pagina riceve solo il suo testo (nel caso di navigazione interna arriva dal suo `__data.json`).
  - Le immagini piccole non diventano più base64 nel JS (`build.assetsInlineLimit: 0` in `vite.config.js`).
  - Il filo neon dell'hero è diviso in tre livelli (sfondo fermo, fibre animate solo in opacità, impulsi fusi con la foto in un passaggio solo) e gli impulsi partono a pagina caricata e si fermano quando l'hero esce dallo schermo.
  - Lighthouse mobile dopo l'intervento: home 91–93 (era 79, TBT da ~590 a ~200 ms), Alliance e casi studio 96, Technology 90; accessibilità, SEO e best practices 100 ovunque. Le misure in locale oscillano di qualche punto da un'esecuzione all'altra.
  - Resta sopra l'obiettivo l'LCP della home su mobile (~2,8 s, è la foto dell'hero): da guardare insieme al CSS che blocca il rendering. Il resto del JS è il runtime di Svelte, i componenti e l'elenco degli URL delle immagini (~31 KB, ~5 KB compressi).
- **Secondo giro (31 ottobre 2026), dopo le nuove card animate della home.** Misure con un confronto A/B nelle stesse condizioni (la versione pubblicata servita accanto, misure alternate), perché la velocità della macchina variava del 20–25% durante la giornata (vedi l'indice `benchmarkIndex` nei report Lighthouse).
  - Home: lavoro del thread principale da ~7–8 s a ~2,5–3 s; prestazioni da 76–82 a 80–90 nelle stesse condizioni (85 nell'ultima misura). Accessibilità, best practices e SEO 100 su home, Technology, Solutions, Developers e Alliance; prestazioni 92–100 sulle altre pagine.
  - Cosa è stato fatto: le sezioni della home sotto la piega usano `content-visibility: auto` (classe `.defer-render` in `global.css`: impaginate e disegnate solo vicino allo schermo); gli impulsi del filo neon partono al primo movimento del visitatore o dopo ~3,5 s; la foto dell'hero ha copie da 800 e 1400 px (`srcset`); il nastro dei loghi usa `<img>` semplici invece di 76 componenti `Img`; le anteprime dei video InstaSwitch si caricano solo vicino alla scheda.
  - Provato e scartato: CSS dentro l'HTML (`inlineStyleThreshold`): misurato peggio (un unico blocco più lungo di lettura e stili, TBT più alto).
  - Attenzione nelle misure: `vite preview` legge l'elenco dei file all'avvio; dopo un nuovo `npm run build` va riavviato, altrimenti i file con il nuovo hash rispondono 404 e Lighthouse misura una pagina senza CSS.
  - Resta: LCP della home ~2,9 s su mobile simulato (la foto è scaricata in 0,2 s; il tempo è attesa del thread principale, soprattutto l'idratazione iniziale di Svelte).
- **Accessibilità:** per superare il contrasto WCAG AA i grigi di DJI sono stati scuriti (#8C8C8C → #6E6E6E, #9FA3A6 → #707477). Le differenze a occhio sono minime. Sky Blue non si usa mai come testo su fondo chiaro (contrasto insufficiente). Unica eccezione voluta: il pulsante "Download the test pattern" in Technology → Sustainability è Sky Blue con testo bianco (circa 2,9:1, sotto AA), scelta del committente; Lighthouse lo segnala e l'accessibilità di quella pagina non arriva a 100.
- **Su mobile** lo schema "come funziona" diventa una sequenza verticale, senza scorrimento laterale.

### Struttura del codice

```
src/
  lib/
    content/        contenuti (site, technology, solutions, products)
    components/     Announcement, Nav, Footer, BackToTop, PageHero, SubNav, HowItWorks, Render, ExploreCards, WhyBento, BoardCard, BoardGrid, LangSwitch, NeonFiber, LogoWall, CaseCard, Check, Img, Wordmark, Seo
    styles/         tokens.css (design token), global.css
  routes/           una cartella per pagina
```

I contenuti sono separati dalla grafica: nella fase 2 i file in `lib/content` si sostituiscono con un CMS headless (Sanity, Storyblok o Directus) senza toccare i componenti.

## 5. Contenuti da verificare prima della pubblicazione

Aggiornato il 30 ottobre 2026. Nel codice i punti ancora aperti sono segnati come `VERIFY`.

### Risolti nel draft

| Punto | Come è stato risolto |
|---|---|
| Latenza | Ovunque "under 100 µs (under 1/150th of a frame)", come nella pagina Specifications. Eliminati "zero-millisecond" e "sub-microsecond" |
| Numero dei membri | **38** (5 steering, 6 contributing, 27 adopting), contati dalla pagina Members. Il numero viene calcolato in automatico dall'elenco dei membri e si aggiorna da solo in tutte le pagine. Nota: la pagina Products attuale dice "over 50", va corretta o va aggiornato l'elenco |
| Confronto con IPMX | Riscritto con dati 2026. IPMX è certificabile dall'inizio del 2026: AIMS ha certificato i primi 48 prodotti di 10 produttori (annunciati a ISE 2026) e altri 14 ad agosto, quindi circa 60. Tolte le affermazioni superate ("0 prodotti", "API pubblica nell'estate 2021"). Il nuovo testo spiega dove SDVoE resta diverso (sul mercato dal 2016, nessuna compressione a 10G, un chip e un'API comuni, elaborazione video integrata) e dice che le due tecnologie possono convivere |
| Fiere 2027 | ISE 2027: 2–5 febbraio, Fira Barcelona Gran Via. InfoComm 2027: Orange County Convention Center di Orlando, area espositiva 16–18 giugno (formazione 12–18 giugno). Lo stand SDVoE è indicato come "da annunciare" |
| Link social e privacy | Presi dall'intestazione del sito attuale: LinkedIn (sdvoe-alliance), YouTube, X (@sdvoe). Privacy policy: /privacypolicy/ |
| Copyright | Anno calcolato in automatico |
| Steering member | Confermata come fonte la pagina Members: Broadata, Christie, IDK, NETGEAR, Semtech. Fondatori: Christie, NETGEAR, Semtech. Sul sito attuale vanno corretti la pagina Alliance (cita ancora Black Box e ZeeVee) e le FAQ (fondatori Aquantia, Sony, ZeeVee). Nel draft l'esempio di interoperabilità ora cita IDK invece di ZeeVee |

### Ancora aperti (servono risposte dall'alleanza)

1. **Numero dei prodotti.** "700+" viene dalla pagina Products attuale. Va confermato con il catalogo AV-iQ.
2. **Tabella benefici dell'adesione.** Sul sito attuale le spunte non si vedono. La divisione tra Contributing e Adopting nel draft è un'ipotesi.
3. **Produttori dei prodotti certificati.** Nel draft sono dedotti dai codici modello (IDK, ZeeVee, Aurora), il resto è "da confermare".
4. **Stand SDVoE a ISE e InfoComm 2027.**
5. **Grafico consumi** (ASIC ~2 W contro FPGA). Va sostituito con i dati misurati del test sui consumi (Sustainability Shootout).
6. **Product Interoperability Certification.** Oggi il link porta al login di WordPress. Serve una pagina vera.
7. **Confronto con IPMX.** Da far rivedere all'alleanza prima della pubblicazione (tono e affermazioni tecniche).
8. **Testi.** Il draft è in inglese: serve una revisione editoriale.
9. **Immagini.** Fatto il 30 ottobre: `npm run images` ha copiato in locale tutte le 142 immagini (loghi, schemi e foto dei casi studio). Dove WordPress mostrava solo una miniatura (es. 300×200) l'import usa l'originale. Restano da avere le foto da studio dei prodotti dei membri.
10. **Da ripensare: contenuti di ex membri (Black Box, ZeeVee).** Non sono più nell'elenco dei membri, ma per ora restano nel draft (decisione del 30 ottobre 2026). Con la migrazione di tutti i 38 casi studio i punti sono diventati sei:
    - caso studio "Defense simulators" (Black Box);
    - caso studio "UNC Chapel Hill: the Carolina Gaming Arena" (Black Box);
    - caso studio "Jefferson Parish Emergency Operations Center" (ZeeVee);
    - caso studio "Quadram Institute" (ZeeVee);
    - 8 prodotti ZeeVee ZyPerXSE nell'elenco dei prodotti certificati;
    - nel codice ogni caso studio ha il campo `member`, e `formerMember` è vero per questi: se si decide di nasconderli basta un filtro su quel campo.

    Da decidere con l'alleanza prima del lancio: tenerli come installazioni e certificazioni reali (magari senza nominare il marchio nei titoli), sostituirli con casi e prodotti di membri attuali, o toglierli. Nel codice i punti sono segnati `REVIEW: former member`.
11. **Accesso per gli sviluppatori.** La nuova pagina Developers & API rimanda al modulo di contatto per documentazione API e Orchestrator. Va chiarito come li si ottiene oggi (download pubblico, registrazione o tramite i membri).
12. **FlexLinQ.** Nel menu del sito attuale c'era una voce "Flexlinq", poi sparita, e la stampa di settore ne parla come una tecnologia per far funzionare l'AV-over-IP su reti meno ideali. Nel draft non c'è perché mancano informazioni affidabili: se è un prodotto o una funzione dell'alleanza, merita una sezione in Technology.
13. **Elenco dei design partner.** Il PDF ufficiale (99 pagine, aggiornato a marzo 2026) elenca 3.528 persone con l'azienda, ma senza paese. Il draft mostra il numero e il link al PDF. Per una vera ricerca per paese o per azienda servono dati puliti dall'Academy (paese, azienda normalizzata, consenso alla pubblicazione).
14. **Casi studio video.** Due casi studio sono in pratica dei video: "Connext Sriracha: video case study" (AV LINK, video incorporato nella pagina) e "Quadram Institute" (rimanda a un video sull'Academy). L'import non porta i video, quindi le due pagine sono brevi. Da decidere: incorporare i video (serve sapere dove sono ospitati) o unire il primo all'altro caso studio di Connext Sriracha.
15. **Profili "About" dei membri.** L'import toglie da ogni caso studio le sezioni ripetute "About Christie", "About NETGEAR" ecc. e i "For more information… visit" verso i siti dei membri. Restano i crediti fotografici. Se l'alleanza vuole un link al membro su ogni caso, va aggiunto nel riquadro laterale ("Solution from"), non nel testo.
16. **Lingue.** Il selettore in alto elenca 9 lingue ma per decisione del 30 ottobre è solo interfaccia: non esistono traduzioni e il clic non fa nulla, nemmeno per il giapponese (che oggi c'è su sdvoe.org/ja/). Da decidere: quali lingue tradurre davvero, chi traduce (agenzia, membri, traduzione automatica rivista) e come gestirle (URL /ja/, /it/… e CMS con contenuti per lingua). Per l'arabo serve anche il layout da destra a sinistra. Bandiere: Regno Unito per l'inglese, Arabia Saudita per l'arabo, Portogallo per il portoghese, Spagna senza stemma.
17. **Licenze di immagini e video aggiunti nel draft.** Da verificare prima del lancio:
    - scheda InstaSwitch (home): due clip Pexels (licenza Pexels, nessuna attribuzione obbligatoria), tagliate a 6 s e ricompresse in `src/lib/assets/video/`: "Futuristic HUD Interface Display Visualization" di humanoidevfx (pexels.com/video/30744462) e "Drone shot of city with skyscrapers" di manila girl tours (pexels.com/video/9752400);
    - monitor della stessa scheda: illustrazione fornita come `blank-screen-computer-icon-isolated-white-background.zip` (file 47727, probabilmente da Freepik): se è la licenza gratuita di Freepik serve l'attribuzione all'autore, oppure un abbonamento;
    - loghi di Claude, OpenAI e Gemini (Lobe Icons, MIT): marchi di terzi, uso da far confermare all'alleanza o a DVIGear;
    - foto fornite per gli sfondi (Explore, hero, sezione AI, ledwall): verificare la fonte e la licenza di ciascuna;
    - card eventi della pagina News: loghi di ISE 2027 (SVG dal sito iseurope.org, ricolorato in bianco) e InfoComm 2027 (timbro "IC27" da infocommshow.org), marchi di Integrated Systems Events e AVIXA; foto di sfondo fornite (`images-src/event-ise-bg.jpg`, `event-infocomm-bg.jpg`, quest'ultima solo 739 px di larghezza): verificarne fonte e licenza.
18. **Pagine Contact, Privacy policy e Thank you (31 ottobre).** Testi presi da sdvoe.org (`/contact/`, `/privacypolicy/`, `/thank-you/`) e impaginati nella nuova UI; `/privacypolicy/` ora reindirizza a `/privacy-policy/`. Da verificare:
    - il modulo di `/contact/` invia direttamente allo Zoho Bigin dell'alleanza, con campi, opzioni e token copiati dal modulo attuale (`src/lib/content/contact.js`). Non è stato provato con un invio reale: farlo fare all'alleanza dopo il lancio, e confermare che il token non sia cambiato;
    - dopo l'invio Bigin rimanda a `https://sdvoe.org/thank-you/`, che nel nuovo sito esiste (noindex, fuori dalla sitemap);
    - la privacy policy è quella del 1° marzo 2019 e cita ancora Privacy Shield e Google+: aggiornarla è compito dell'alleanza (legale);
    - il campo newsletter nella scheda "Stay connected" della pagina Contact, come quello del footer, non è collegato a nessun servizio.

### Fonti per IPMX ed eventi
- AIMS: prime 48 certificazioni IPMX, ISE 2026 (ibc.org, ravepubs.com)
- AIMS: 14 nuovi prodotti certificati, settembre 2026 (advanced-television.com)
- InfoComm 2027: infocommshow.org (priority space selection)
- ISE 2027: lindy.com/eu/event/ise-2027 e altri calendari fieristici

## 6. Roadmap

| Fase | Contenuto | Durata indicativa |
|---|---|---|
| **0 · Draft** (questo) | Struttura, design system, tutte le pagine principali con contenuti reali | fatto |
| **1 · Contenuti** | In corso. Verificati latenza, membri, IPMX, fiere 2027 e link social (sezione 5). Immagini tutte in locale (142, in WebP). Restano: risposte dell'alleanza, testi definitivi, foto da studio dei prodotti | 2–3 settimane |
| **2 · CMS e dati** | Iniziata. Fatto: indice dei 38 casi studio con una pagina per ciascuno e testi completi di tutti e 38 importati dall'API WordPress (30 ottobre). L'import riconosce i sottotitoli in grassetto (Challenge, Solution…), toglie le parti ripetute (benefici, newsletter, "About …"), tiene i crediti fotografici e usa le immagini originali al posto delle miniature. Resta: CMS headless, database prodotti unico, elenco design partner con i dati dell'Academy, newsletter collegata al CRM | 3–5 settimane |
| **3 · Nuove pagine** | Fatto: pagina Developers & API (API comune, flussi con agenti AI tramite MCP, Orchestrator, Academy). Resta: una pagina per settore, archivio risorse (whitepaper, CAD), calcolatore banda/costi, contenuti per l'IT (switch testati, IGMP) | 3 settimane |
| **4 · Lancio** | Già pronti: 31 redirect 301 (compresi quelli generici per i vecchi URL dei casi studio e delle biografie del board) (`static/_redirects` e `vercel.json`), sitemap generata in automatico, robots.txt, URL canonici e meta per i social, accessibilità verificata. Fatta anche l'immagine per le condivisioni social (`static/og.jpg`). Restano: Analytics, versione giapponese, scelta dell'hosting | 1 settimana |

### Redirect principali (fase 4)

| Vecchio URL | Nuovo URL |
|---|---|
| /power-of-10/ · /technology/benefits/ · /technology/the-matrix-transformed/ · /technology/av-it-convergence/ · /technology/sustainability-shootout/ | /technology/ (con ancora alla sezione) |
| /technology/sdvoe-vs-hdbaset/ · /technology/sdvoe-vs-ipmx/ | /technology/compare/ |
| /technology/use-cases/* · /technology/case-studies/ | /solutions/ |
| /products/certified-products/ | /products/#finder |
| /academy/ · /alliance/design-partners/* | /learn/ |
| /alliance/members/ · /alliance/membership/ · /alliance/faq/ · /board-of-directors/ | /alliance/ (con ancora) |
| /board-of-directors/&lt;nome&gt;/ | /alliance/board/&lt;nome&gt;/ |
| /events/ · /blog/ · /news/* | /news/ |

## 7. Domande aperte

- Chi aggiorna il sito dopo il lancio, e con che frequenza? Da questo dipende la scelta del CMS.
- Il catalogo AV-iQ resta esterno o i dati vanno integrati nella ricerca prodotti?
- L'Academy (Moodle su academy.sdvoe.org) va adattata alla nuova grafica?
- Ci sono dati di Analytics da guardare prima di tagliare definitivamente le pagine?

## Avvio in locale

Dettagli tecnici nel [README](README.md).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # sito statico in /build
```

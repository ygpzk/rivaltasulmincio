# STYLE.md

## Scopo

Definisci linguaggio visivo di **Rivalta sul Mincio — il paese, in ogni suo dato**.

Direzione:

**Claude Code × web 2010 × atlante territoriale × editoriale contemporaneo**

Il risultato deve sembrare un prodotto digitale costruito oggi, ma con anima da software e portali evoluti dei primi anni 2010.

Non usare estetica minimalista sterile.

Non usare estetica SaaS moderna standard.

Non usare look "Apple clean".

## DIREZIONE VISIVA

Il sito deve avere:

* personalità;
* densità;
* struttura;
* contrasto;
* dettagli tecnici;
* superfici materiche;
* bordi sottili;
* pannelli;
* numeri;
* metadata;
* elementi cartografici;
* piccoli riferimenti terminali;
* forte identità cromatica.

Sensazione desiderata:

**"strumento digitale locale costruito da qualcuno che conosce davvero il territorio."**

## RIFERIMENTO ESTETICO

Prendi ispirazione concettuale da:

* terminali;
* IDE;
* documentazione tecnica;
* software desktop primi anni 2010;
* mappe cartacee;
* archivi;
* giornali locali;
* pannelli informativi;
* interfacce tecniche;
* dashboard geografiche.

Non copiare interfacce esistenti.

Usa riferimenti solo come linguaggio visuale.

## CLAUDE CODE 2010

Interpretazione visiva:

```text
terminal
+
editor
+
documentation
+
map
+
editorial archive
```

Elementi ammessi:

* breadcrumb tecnici;
* etichette monospace;
* coordinate;
* timestamp;
* piccoli marker;
* righe divisorie;
* pannelli laterali;
* barre informative;
* codici identificativi;
* status indicator;
* numeri grandi;
* blocchi dati;
* griglie sottili.

Non trasformare il sito in terminale finto.

## PALETTE

Dal 2.11.2026 il sito è impaginato come reflection.ai, con la sua tavolozza: **avorio, inchiostro, verde profondo, lime, lilla**.

Fondo e superfici:

```text
avorio #f8f6f0 (fondo), avorio 2 #f1ede1 (etichette, riquadri delle icone, testate), avorio 3 #e8e3d4
```

Testo:

```text
inchiostro #1a1b1a, grigio #525252 per il testo secondario, #a3a3a3 solo sul verde
```

Colore identitario:

```text
verde profondo #1e3207: tasti pieni, link, icone, le schede scure e il pannello in fondo
lime #dcef54 (al passaggio #cee04b): l'accento vivo, i tasti sul verde, le icone al passaggio
lilla #c9bdf0: di contorno, per un'etichetta
```

Sul lime si scrive in inchiostro; sul verde profondo in avorio.

Il verde della natura (#4e7a4b) e dell'acqua (#3f7a78) resta per le categorie dei luoghi e i dati ambientali; lo stato «successo» usa #2f7a4a.

Le tavolozze precedenti (marrone e crema; carta e minio) sono superate.

## IMPAGINAZIONE

La struttura è quella di reflection.ai, presa pezzo per pezzo:

* **barra flottante**: fissa in cima, staccata di 12 px dai bordi, arrotondata (1rem), su avorio con un filo di bordo; marchio a sinistra, voci e pillola «Cerca» a destra da 1150 px; sotto, il tasto apre un pannello a tutto schermo con le voci in righe; scendendo si nasconde, risalendo torna;
* **apertura** a tutto schermo: titolo in graziato leggero al centro, una riga, due pillole, la ricerca; dietro, un campo di puntini ad anelli disegnato in canvas che respira e si scosta dal puntatore;
* **la frase** che si accende parola per parola scorrendo (opacità da 0,32 a 1 per indice di parola);
* **le sezioni** come schede con icona in riquadro, titolo in graziato e riga sotto; l'icona si accende di lime al passaggio;
* **un modulo in evidenza** con testo che resta a sinistra e contenuto a destra (meteo);
* **il nastro** delle fonti che scorre da solo e si ferma al passaggio;
* **la scheda grande** con gli angoli a 2rem (mappa) e **la scheda verde** di chiusura con i numeri;
* **il piè di pagina** che finisce con gli angoli arrotondati e scopre sotto di sé il pannello verde con il nome del paese.

Pillole: etichetta arrotondata con il puntino a destra che al passaggio si allarga in un cerchio e mostra la freccia. Etichette di sezione: riquadro su avorio 2, angoli 0,375rem. Angoli: 0,375 → 0,75 → 1 → 2rem, pillole per i tasti.

## TOKEN CSS OBBLIGATORI

Tutti i valori visuali ricorrenti devono essere definiti tramite token CSS centralizzati.

È vietato inserire valori arbitrari nei componenti quando esiste token equivalente.

### Root

Creare token almeno in:

```css
:root {
  /* colors */
  --color-bg: ...;
  --color-surface: ...;
  --color-surface-raised: ...;
  --color-surface-muted: ...;

  --color-text: ...;
  --color-text-secondary: ...;
  --color-text-muted: ...;
  --color-text-inverse: ...;

  --color-primary: ...;
  --color-primary-hover: ...;
  --color-primary-active: ...;

  --color-accent: ...;
  --color-accent-hover: ...;

  --color-border: ...;
  --color-border-subtle: ...;
  --color-border-strong: ...;

  --color-success: ...;
  --color-warning: ...;
  --color-danger: ...;
  --color-info: ...;

  --color-official: ...;
  --color-water: ...;
  --color-nature: ...;
  --color-earth: ...;

  /* typography */
  --font-sans: ...;
  --font-mono: ...;

  --text-xs: ...;
  --text-sm: ...;
  --text-md: ...;
  --text-lg: ...;
  --text-xl: ...;
  --text-2xl: ...;
  --text-3xl: ...;
  --text-display: ...;

  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  --leading-tight: ...;
  --leading-normal: ...;
  --leading-relaxed: ...;

  --tracking-tight: ...;
  --tracking-normal: ...;
  --tracking-wide: ...;

  /* spacing */
  --space-1: ...;
  --space-2: ...;
  --space-3: ...;
  --space-4: ...;
  --space-5: ...;
  --space-6: ...;
  --space-8: ...;
  --space-10: ...;
  --space-12: ...;
  --space-16: ...;
  --space-20: ...;
  --space-24: ...;
  --space-32: ...;

  /* radius */
  --radius-none: 0;
  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
  --radius-xl: ...;

  /* borders */
  --border-width-thin: ...;
  --border-width-medium: ...;
  --border-width-strong: ...;

  /* shadows */
  --shadow-none: none;
  --shadow-sm: ...;
  --shadow-md: ...;
  --shadow-lg: ...;

  /* layout */
  --container-sm: ...;
  --container-md: ...;
  --container-lg: ...;
  --container-xl: ...;
  --container-max: ...;

  --page-padding: ...;
  --content-max: ...;

  /* z-index */
  --z-base: ...;
  --z-dropdown: ...;
  --z-sticky: ...;
  --z-overlay: ...;
  --z-modal: ...;
  --z-toast: ...;

  /* motion */
  --duration-instant: ...;
  --duration-fast: ...;
  --duration-normal: ...;
  --duration-slow: ...;

  --ease-standard: ...;
  --ease-enter: ...;
  --ease-exit: ...;
  --ease-emphasis: ...;
}
```

I valori finali devono essere definiti nei relativi documenti specializzati.

`STYLE.md` definisce struttura dei token.

`COLORS.md`, `TYPOGRAPHY.md`, `SPACING.md`, `RADIUS.md`, `BORDERS.md`, `SHADOWS.md`, `RESPONSIVE.md`, `ANIMATIONS.md` definiscono valori e comportamento specifici.

### Regola token

Prima di scrivere:

```css
padding: 18px;
```

cerca token esistente.

Preferisci:

```css
padding: var(--space-4);
```

Prima di scrivere:

```css
border-radius: 6px;
```

cerca:

```css
border-radius: var(--radius-md);
```

Prima di scrivere:

```css
color: #...
```

usa token semantico.

### Token semantici

Preferisci:

```css
color: var(--color-text);
background: var(--color-surface);
border-color: var(--color-border);
```

non:

```css
color: var(--brown-900);
```

Componenti devono usare significato, non valore cromatico diretto.

### Nessun valore magico

Valore hardcoded ammesso solo quando:

* proprietà tecnica non ripetuta;
* compensazione ottica documentata;
* requisito browser;
* SVG/geometria specifica;
* dimensione intrinseca asset.

Non usare numeri casuali per risolvere problemi di layout.

## SUPERFICI

Fondo principale:

caldo, leggermente cartaceo.

Evitare bianco puro come superficie dominante.

Usare:

* cream;
* warm gray;
* parchment;
* soft beige.

Card possono avere superficie quasi bianca.

Pannelli importanti possono usare marrone scuro.

## CONTRASTO

Usa contrasto più forte rispetto al vecchio sistema.

Esempio:

```text
cream background
↓
brown typography
↓
burnt-red actions
```

oppure:

```text
dark brown panel
↓
cream text
↓
red accent
```

Non usare interfaccia tutta chiara.

## PANNELLI

Pannelli sono elementi principali.

Usali per:

* dati;
* mappe;
* giornale;
* fonti;
* meteo;
* uffici;
* filtri;
* schede.

Pannello deve sembrare modulo di uno strumento tecnico.

Non tutte le informazioni devono vivere dentro card arrotondate.

## CARD

Card meno "bubble".

Preferire:

* radius piccolo;
* bordo;
* padding controllato;
* superficie distinta;
* header;
* metadata.

Card può sembrare una scheda archivio.

Evita:

```text
radius enorme
shadow enorme
glassmorphism
```

## BORDI

Bordi visibili ma sottili.

Usa linee per creare struttura.

Pattern possibile:

```text
┌─────────────────────────────
│ titolo
├─────────────────────────────
│ contenuto
├─────────────────────────────
│ metadata
└─────────────────────────────
```

Questo linguaggio deve ricorrere in:

* giornale;
* dati;
* mappe;
* schede;
* fonti.

## GRIGLIA E TEXTURE

Nessuna griglia e nessuna grana: l'avorio è piatto. La struttura la danno i fili d'inchiostro velato, i riquadri e gli angoli ampi.

## OMBRE

Ombre meno morbide rispetto a design SaaS.

Preferire:

```text
subtle offset
```

oppure:

```text
small hard shadow
```

solo in componenti specifici.

Evitare enormi shadow blur.

## RADIUS

Radius contenuto.

Direzione:

```text
2px
4px
6px
8px
```

Radius grandi solo per elementi particolari.

Interfaccia deve avere geometria più tecnica.

## TIPOGRAFIA

Usa combinazione:

**sans moderna + monospace tecnica**

Sans:

* moderna;
* pulita;
* compatta;
* leggibile.

Monospace:

* coordinate;
* timestamp;
* ID;
* dati tecnici;
* label;
* codice;
* metadata.

Non usare monospace per intera pagina.

## FONT

reflection.ai usa NaN Serf Sans e NaN Serf B, caratteri commerciali della fonderia NaN: non si copiano. I più vicini liberi, self-hosted dai pacchetti @fontsource:

* **Newsreader** (variabile, 200–800, dimensione ottica) per i titoli, leggero (350) con tracking −0,05em come il loro graziato;
* **Hanken Grotesk** (variabile) per il testo, le voci e i tasti, tracking −0,02em;
* il mono di sistema per codice e tasti.

Con una licenza NaN si sostituiscono le due famiglie in `src/styles/fonts.css`. Niente altri caratteri, niente host esterni. Il testo si scrive normale (niente minuscolo forzato); le sole maiuscole sono le etichette «details» (0,6875rem, 0,08em).

## HEADLINE

Titoli:

* grandi;
* compatti;
* peso alto;
* tracking leggermente negativo;
* forte presenza.

Il graziato leggero è il carattere dei titoli grandi e dei numeri; il grottesco di tutto il resto.

## MONOSPACE

Usalo per:

```text
45.16842, 10.66931
09:42
OSM-48291
UPDATED 20.09.2026
```

Questo crea linguaggio tecnico senza rendere pagina "programmatore".

## MICRO-LABEL

Etichette «details» come su reflection.ai: grottesco 0,6875rem, peso 500, maiuscole, tracking 0,08em. Si usano per occhielli, breadcrumb, etichette dei numeri.

```text
LIVE
UFFICIALE
OSM
AGGIORNATO
```

## GIORNALE

Il giornale deve sembrare un vero modulo editoriale.

Struttura:

```text
GIORNALE / 20.09.2026

[TEMA]

Titolo principale

estratto...

Fonte
18:42
```

L'articolo principale deve avere forte presenza.

Articoli secondari possono sembrare righe di archivio.

## HOME

Home deve alternare:

```text
hero
↓
giornale
↓
mappa
↓
dati
↓
servizi
↓
meteo
↓
territorio
↓
fonti
```

Evita sequenza infinita di card identiche.

## HERO

Hero non deve essere una semplice grande scritta.

Usa composizione più ricca:

```text
RIVALTA
SUL MINCIO

il paese, in ogni suo dato

[search]

45°10'...
11...
UPDATED...
```

Possibili elementi:

* coordinate;
* micro-grid;
* linee;
* metadata;
* mini mappa;
* stato dati;
* timestamp.

## IERI (ARCHIVIO)

Le fotografie d'epoca hanno una pagina, `/ieri`, e un modulo in Home.

Il confronto com'era/com'è:

```text
[ 1992 c. ]                      [ 1997 c. ]
|  foto di prima  |<>|  foto di oggi       |
La trattoria «Al Pescatore»   1992 c. → 1997 c.
una riga su che cosa è cambiato
```

* due fotografie sovrapposte, angoli 1 rem, la linea avorio con il grip tondo;
* la foto di prima entra da sinistra fino a metà quando la figura arriva in vista, poi comanda chi trascina;
* gli anni in pillola mono: lime per prima, avorio per oggi, sopra il riquadro intero così la linea non li taglia;
* senza JavaScript le due foto stanno affiancate.

I giorni: testo fermo a sinistra, nastro di fotografie che scorre a destra, ognuna apre la finestra (`<dialog>` sul verde, frecce e tasti freccia).

Regola: una fotografia d'archivio dice sempre da dove viene. La scheda verde dei libri chiude la pagina e i volumi stanno nel registro fonti.

## MAPPA

Mappa deve sembrare integrata con UI, non elemento esterno.

Pannelli mappa:

* marrone scuro;
* cream;
* rosso accent;
* monospace metadata.

Marker devono avere sistema coerente con palette.

## DATI

Sezione dati deve sembrare quasi una console editoriale.

Esempio:

```text
POPOLAZIONE

2.847

+0,8%
2025 → 2026
```

Numeri grandi.

Metadata piccoli.

Bordi sottili.

## METEO

Meteo deve sembrare modulo informativo tecnico.

Esempio:

```text
WEATHER / RIVALTA

18°
SERENO

W 8 km/h
72%
UPDATED 21:42
```

## FONTI

Fonti devono sembrare record verificabili.

Esempio:

```text
SOURCE
Comune di Rodigo
OFFICIAL ✓

SOURCE
OpenStreetMap
GEODATA

SOURCE
MeteoMincio
WEATHER
```

## BADGE

Badge non devono sembrare pill SaaS colorate.

Preferire:

```text
[ OFFICIAL ✓ ]
[ OSM ]
[ LIVE ]
[ ARCHIVE ]
```

Forma rettangolare o radius minimo.

## BUTTONS

Bottoni più tecnici.

Preferire:

```text
[ ESPLORA MAPPA ]
[ APRI FONTE ]
[ VEDI ARCHIVIO ]
```

Possono avere:

* bordo;
* fondo;
* icona;
* microtransizione.

Non usare pill enormi.

## NAVIGAZIONE

Header deve sembrare strumento, non landing page.

Può includere:

```text
RIVALTA
MAPPA
GIORNALE
DATI
SERVIZI
METEO
```

con indicatori piccoli.

Possibile elemento terminale:

```text
/ search
```

## SEARCH

La ricerca è componente fondamentale.

Deve ricordare ricerca di IDE/documentazione.

Esempio:

```text
⌕ Cerca Rivalta...
```

Possibili metadata:

```text
⌘ K
```

solo desktop.

## TABELLE

Tabelle tecniche possono essere molto presenti.

Preferire:

* header forte;
* righe sottilmente separate;
* numeri tabulari;
* monospace per dati tecnici.

## MODAL

Modal deve sembrare pannello software.

Non usare enorme floating card centrale con shadow morbida.

Preferire:

* bordo;
* header;
* close;
* contenuto;
* footer azioni.

## DRAWER

Drawer laterale ideale per:

* filtri;
* mappa;
* schede;
* fonti;
* dati tecnici.

## ANIMAZIONI

Animazioni possono essere più sofisticate del design precedente.

Usa:

* GSAP;
* reveal;
* line draw;
* shared layout;
* panel transition;
* map movement;
* number counter;
* clip reveal.

Movimento deve sembrare "software vivo".

Non usare animazioni da startup marketing.

Vedi `ANIMATIONS.md`.

## HOVER

Desktop può avere hover più evidente:

* bordo che cambia;
* linea che si espande;
* accent color;
* icon move;
* background shift.

Non usare scale aggressive.

## MICRO-DETAIL

Il progetto deve avere molti piccoli dettagli.

Esempi:

```text
ID 001
UPDATED 21:42
SOURCE VERIFIED
LAT 45.16842
LON 10.66931
OPENSTREETMAP
DATASET 2026
```

Non tutti devono essere visibili contemporaneamente.

## WEB 2010

Richiami ammessi:

* pannelli;
* tab;
* toolbar;
* bordi;
* texture leggere;
* griglia;
* piccoli gradienti molto controllati;
* header strutturati;
* metadata;
* status indicator.

Da evitare:

* skeuomorphism pesante;
* gloss anni 2000;
* bevel pesanti;
* button 3D;
* drop shadow esagerate;
* gradienti metallici.

Obiettivo:

**2010 reinterpretato nel 2026.**

## DENSITÀ

Interfaccia deve essere più densa del design minimale precedente.

Desktop può mostrare molta informazione contemporaneamente.

Mobile conserva densità ma riordina contenuti.

Non comprimere testo fino a renderlo difficile.

## RESPONSIVE

Desktop:

```text
3–4 zone visive
```

Tablet:

```text
2 zone
```

Mobile:

```text
1 zona
```

Mappa e giornale possono diventare componenti dominanti.

Regole complete in `RESPONSIVE.md`.

## ACCESSIBILITÀ

Estetica tecnica non deve ridurre accessibilità.

Mantieni:

* contrasto;
* focus;
* keyboard;
* target touch;
* reduced motion;
* semantica HTML.

## ANTI-TEMPLATE

Se una sezione sembra uscita da un template SaaS:

**rifalla.**

Se ogni blocco è una card arrotondata:

**rifalla.**

Se tutto è bianco:

**rifalla.**

Se tutti gli elementi hanno stessa gerarchia:

**rifalla.**

Se manca identità locale:

**rifalla.**

## REGOLA VISIVA

Il sito deve far percepire:

**Rivalta documentata come se fosse un territorio analizzato da uno strumento digitale professionale.**

Non:

**Rivalta presentata come destinazione turistica.**

## REGOLA FINALE

**Brown. Burnt red. Cream. Charcoal. Modern sans. Technical monospace. Borders. Panels. Data. Maps. Editorial density. 2010 software soul, 2026 execution.**

Il design deve essere riconoscibile anche senza logo.

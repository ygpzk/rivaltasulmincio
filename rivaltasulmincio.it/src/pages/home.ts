import type { PageResult } from '../app/page';
import { site } from '../app/site';
import { emptyState } from '../components/empty-state';
import { mark } from '../components/header';
import { icon, type IconName } from '../components/icons';
import { mapBlock } from '../components/map';
import { officialBadge } from '../components/official-badge';
import { pill, tagLabel } from '../components/pill';
import { searchForm } from '../components/search';
import { statNumber } from '../components/stat';
import { weatherHome } from '../components/weather';
import { journalLead, journalRows } from '../journal/card';
import { archiveArticles, homeSelection } from '../journal/service';
import { formatDateShort } from '../lib/dates';
import { html, type Html } from '../lib/html';
import { MAP_ZOOM } from '../map/config';
import { categoryLine } from '../places/list';
import { activePlaces, mapCenter, osmDataTimestamp, placesByCategory } from '../places/service';
import { isOfficial, listSources } from '../services/sources';
import { METEOMINCIO } from '../services/weather/meteomincio.ts';

/**
 * Home, nella composizione di reflection.ai (STYLE.md «IMPAGINAZIONE»):
 * apertura a tutto schermo con il campo di puntini, la frase che si accende
 * parola per parola, le sezioni del sito come schede con icona, il meteo in
 * evidenza, il nastro delle fonti, il giornale, la mappa in una scheda
 * grande e, a chiudere, la scheda verde con i numeri dell'atlante. Ogni
 * numero viene dai dati reali.
 */
export function render(): PageResult {
  const now = new Date();
  const today = formatDateShort(now.toISOString());
  const { lead, others } = homeSelection(now);
  const groups = placesByCategory();
  const places = activePlaces().length;
  const center = mapCenter();
  const osmTimestamp = osmDataTimestamp();
  const osmDate = osmTimestamp ? formatDateShort(osmTimestamp) : undefined;
  const sources = listSources();
  const official = sources.filter(isOfficial).length;
  const articles = archiveArticles(now).length;

  // ── Apertura ────────────────────────────────────────────────────────────
  const hero = html`<section class="hero" aria-labelledby="apertura">
    <div class="hero__canvas" data-hero-canvas aria-hidden="true"></div>
    <div class="hero__inner">
      <h1 class="hero__title display" id="apertura">Rivalta sul Mincio, il paese in ogni suo dato</h1>
      <p class="hero__lead">Luoghi, notizie, meteo e fonti di una frazione sul Mincio, raccolti in un atlante aperto.</p>
      <div class="hero__actions">
        ${pill({ href: '/mappa', label: 'Apri la mappa', tone: 'primary' })}
        ${pill({ href: '/giornale', label: 'Il giornale' })}
      </div>
      ${searchForm()}
    </div>
  </section>`;

  // ── La frase ─────────────────────────────────────────────────────────────
  const statement = html`<section class="statement" aria-labelledby="frase">
    <span class="statement__mark" aria-hidden="true">${mark()}</span>
    <div data-scroll-reveal>
      <h2 class="statement__title" id="frase">${words(site.institutional.split('. ')[0] + '.', 0)}</h2>
      <p class="statement__text lead">${words(site.institutional.split('. ').slice(1).join('. '), site.institutional.split('. ')[0].split(/\s+/).length)}</p>
    </div>
    <div class="statement__action">${pill({ href: '/fonti', label: 'Le fonti del progetto' })}</div>
  </section>`;

  // ── Le sezioni ───────────────────────────────────────────────────────────
  const offers: { href: string; icon: IconName; title: string; text: string; count: string }[] = [
    { href: '/giornale', icon: 'newspaper', title: 'Giornale', text: 'Notizie, avvisi ed eventi del paese, con la fonte accanto a ogni articolo e un archivio che non butta via niente.', count: `${articles} ${articles === 1 ? 'articolo' : 'articoli'}` },
    { href: '/mappa', icon: 'map', title: 'Mappa', text: 'Il paese e la campagna vicina su OpenStreetMap, con i luoghi filtrabili per categoria e la scheda di ciascuno.', count: `${places} luoghi` },
    { href: '/luoghi', icon: 'map-pin', title: 'Luoghi', text: 'Attività, servizi, cultura, sport, natura, mobilità, storia, territorio e acqua: ogni luogo con nome ha una scheda.', count: `${groups.length} categorie` },
    ...(site.features.weather
      ? [{ href: '/meteo', icon: 'cloud-sun' as IconName, title: 'Meteo', text: 'Le condizioni di adesso, le prossime ore e i prossimi giorni dalla stazione meteorologica del paese.', count: METEOMINCIO.name }]
      : []),
    { href: '/fonti', icon: 'database', title: 'Fonti', text: 'Ogni dato del progetto mantiene la propria provenienza: enti, istituti e archivi, con la data dell’ultima verifica.', count: `${sources.length} registrate · ${official} ${official === 1 ? 'ufficiale' : 'ufficiali'}` },
  ];
  const sezioni = html`<section class="section" aria-labelledby="sezioni-titolo" data-reveal>
    <header class="section__head">
      ${tagLabel('Sezioni')}
      <h2 id="sezioni-titolo">Un atlante del paese, costruito sui dati</h2>
    </header>
    <ul class="offer list-plain">
      ${offers.map(
        (offer) => html`<li>
        <a class="offer__item" href="${offer.href}">
          <span class="offer__icon">${icon(offer.icon, 20)}</span>
          <span class="offer__body">
            <h3>${offer.title}</h3>
            <p>${offer.text}</p>
            <span class="offer__count">${offer.count}</span>
          </span>
        </a>
      </li>`,
      )}
    </ul>
  </section>`;

  // ── Meteo in evidenza ───────────────────────────────────────────────────
  const meteo = site.features.weather
    ? html`<section class="section" aria-labelledby="meteo-titolo" data-reveal>
    <div class="feature">
      <div class="feature__copy">
        ${tagLabel('Meteo')}
        <h2 class="headline" id="meteo-titolo">Il tempo a Rivalta, adesso</h2>
        <p>La stazione ${METEOMINCIO.name} misura temperatura, vento, pioggia e pressione in paese, e il modello WXSIM dice che cosa aspettarsi.</p>
        <div class="feature__actions">
          ${pill({ href: '/meteo', label: 'Meteo completo', tone: 'primary', size: 'sm' })}
          ${pill({ href: METEOMINCIO.url, label: 'La stazione', size: 'sm', external: true })}
        </div>
      </div>
      <div class="feature__media">${weatherHome()}</div>
    </div>
  </section>`
    : html``;

  // ── Il nastro delle fonti ───────────────────────────────────────────────
  const nastro = html`<ul class="list-plain">
    ${sources.map((source) => html`<li class="marquee__item">${source.name}${isOfficial(source) ? officialBadge({ compact: true }) : ''}</li>`)}
  </ul>`;
  const fonti = html`<section class="marquee" aria-labelledby="fonti-nastro" data-marquee>
    <h2 class="marquee__title" id="fonti-nastro">Le fonti</h2>
    <div class="marquee__viewport" role="group" aria-label="Le fonti del progetto, in un nastro che scorre" tabindex="0">
      <div class="marquee__track">${nastro}<div aria-hidden="true">${nastro}</div></div>
    </div>
  </section>`;

  // ── Giornale ────────────────────────────────────────────────────────────
  const giornaleBody = lead
    ? html`<div class="journal-home">
        ${journalLead(lead, { now, level: 3 })}
        ${others.length > 0 ? journalRows(others, { now }) : ''}
      </div>`
    : articles > 0
      ? emptyState({ title: 'Nessuna notizia in corso', text: "Gli articoli passati restano nell'archivio del giornale." })
      : emptyState({ title: 'Nessun articolo pubblicato', text: 'Il giornale non ha ancora contenuti pubblicati.' });
  const giornale = html`<section class="section" aria-labelledby="giornale-titolo" data-reveal>
    <div class="split">
      <div class="split__copy">
        ${tagLabel('Giornale')}
        <h2 id="giornale-titolo">Le notizie di Rivalta, con la fonte accanto</h2>
        <p>Avvisi, eventi e aggiornamenti dal paese, aggiornati al ${today}. Quello che è passato resta nell’archivio.</p>
        ${pill({ href: '/giornale', label: 'Tutto il giornale', size: 'sm' })}
      </div>
      <div>${giornaleBody}</div>
    </div>
  </section>`;

  // ── Mappa ───────────────────────────────────────────────────────────────
  const mappa = html`<section class="section" aria-labelledby="mappa-titolo" data-reveal>
    <header class="section__head">
      ${tagLabel('Mappa')}
      <h2 id="mappa-titolo">${places} luoghi, uno per uno</h2>
      <p class="section__intro">Il paese e la campagna vicina su OpenStreetMap. Ogni marker apre la scheda del luogo.</p>
      ${pill({ href: '/mappa', label: 'Apri la mappa', tone: 'primary', size: 'sm', class: 'section__more' })}
    </header>
    <div class="map-card home-map">
      ${mapBlock({ id: 'home-mappa', mode: 'embed', center, zoom: MAP_ZOOM.village, label: 'Mappa di Rivalta sul Mincio', title: 'Mappa · OpenStreetMap', updatedAt: osmDate })}
      <div class="home-map__data">
        <div class="home-map__stat">
          <p>${statNumber(places)}</p>
          <p class="label">luoghi censiti in OpenStreetMap</p>
        </div>
        <ul class="category-list list-plain">
          ${groups.map((group) => html`<li><a href="/luoghi#${group.category}">${categoryLine(group.category, group.places.length)}</a></li>`)}
        </ul>
      </div>
    </div>
  </section>`;

  // ── Chiusura: i numeri ──────────────────────────────────────────────────
  const dati = html`<section class="section" aria-labelledby="dati-titolo" data-reveal>
    <div class="outro inverse">
      <div class="outro__copy">
        <h2 class="headline" id="dati-titolo">Quanto contiene oggi l’atlante</h2>
        <p>Ogni numero ha una fonte e una data. I luoghi vengono da OpenStreetMap, le notizie dal giornale, il meteo dalla stazione del paese.</p>
        <div class="outro__action">${pill({ href: '/fonti', label: 'Tutte le fonti', tone: 'accent' })}</div>
      </div>
      <dl class="outro__data">
        ${datum('Luoghi', places, osmDate ? `OpenStreetMap · ${osmDate}` : 'OpenStreetMap')}
        ${datum('Categorie', groups.length, 'Tassonomia del progetto')}
        ${datum('Articoli', articles, 'Giornale · archivio')}
        ${datum('Fonti', sources.length, `${official} ${official === 1 ? 'ufficiale verificata' : 'ufficiali verificate'}`)}
      </dl>
    </div>
  </section>`;

  return {
    title: site.name,
    description: site.description,
    main: html`${hero}${statement}${sezioni}${meteo}${fonti}${giornale}${mappa}${dati}`,
  };
}

/** Ogni parola in uno <span> con il suo indice, per la frase che si accende (src/home/statement.ts). */
function words(text: string, offset: number): Html[] {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => html`<span style="--i:${offset + index}">${word} </span>`);
}

/** Un numero della chiusura: etichetta, numero grande, provenienza. */
function datum(label: string, value: number, meta: string): Html {
  return html`<div class="outro__datum">
    <dt class="label">${label}</dt>
    <dd>${statNumber(value)}</dd>
    <dd class="outro__meta">${meta}</dd>
  </div>`;
}

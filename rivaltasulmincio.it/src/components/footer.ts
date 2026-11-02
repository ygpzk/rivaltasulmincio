import { site } from '../app/site';
import { formatDateShort, formatTime } from '../lib/dates';
import { html, raw, type Html } from '../lib/html';
import { osmDataTimestamp } from '../places/service';
import { linkedSources } from '../services/sources';

/**
 * Piè di pagina, nella composizione di albertopecchini.it: pannello
 * d'inchiostro, tutto centrato, dall'alto in basso: il nome del paese e il
 * motto, la fila delle pagine, le fonti principali, la nota, la riga di stato
 * in mono (attribuzione, data dei dati OSM, momento della build) con la firma
 * di chi ha fatto il progetto, «torna su». Il sito è statico: «adesso» è la
 * build.
 */
export function footer(path: string): Html {
  const built = new Date().toISOString();
  const osm = osmDataTimestamp();
  return html`<footer class="site-footer inverse">
  <div class="container site-footer__inner">
    <div class="site-footer__sign">
      <a class="site-footer__name" href="/" aria-label="${site.name} — home">${site.name}</a>
      <p class="site-footer__tag">${site.description}</p>
    </div>
    <nav class="site-footer__nav" aria-label="Pagine del sito">
      <ul class="list-plain">
        ${site.navigation.map((item) => html`<li><a class="uline" href="${item.href}"${isActive(path, item.href) ? raw(' aria-current="page"') : ''}>${item.label}</a></li>`)}
      </ul>
    </nav>
    <div class="site-footer__sources">
      <p class="label">Fonti principali</p>
      <ul class="list-plain">
        ${linkedSources().map((source) => html`<li><a class="uline" href="${source.url}" rel="noopener noreferrer">${source.name}</a></li>`)}
      </ul>
    </div>
    <p class="site-footer__note">La presenza di un ente o di un'attività nel progetto non implica approvazione, collaborazione o patrocinio, salvo indicazione esplicita e documentata.</p>
    <p class="site-footer__meta">
      <span>© OpenStreetMap contributors · ODbL</span>
      ${osm ? html`<span>Dati OSM <time datetime="${osm}">${formatDateShort(osm)}</time></span>` : ''}
      <span>Build <time datetime="${built}">${formatDateShort(built)} ${formatTime(built)}</time></span>
      <span>Progetto di <a class="uline" href="${site.author.url}" rel="author">${site.author.name}</a></span>
    </p>
    <a class="site-footer__top" href="#contenuto">Torna su ↑</a>
  </div>
</footer>`;
}

function isActive(path: string, href: string): boolean {
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}

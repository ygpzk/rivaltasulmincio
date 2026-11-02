import { site } from '../app/site';
import { formatDateShort, formatTime } from '../lib/dates';
import { html, raw, type Html } from '../lib/html';
import { osmDataTimestamp } from '../places/service';
import { linkedSources } from '../services/sources';
import { mark } from './header';

/**
 * Piè di pagina, nella composizione di reflection.ai: la pagina avorio
 * finisce con gli angoli arrotondati e, scorrendo fino in fondo, scopre
 * sotto di sé il pannello verde con il nome del paese (footerReveal, reso da
 * layouts/base.ts fuori dal flusso). Qui: marchio e descrizione a sinistra,
 * tre colonne di collegamenti a destra (sezioni, fonti, progetto), la nota e
 * la riga di stato. Il sito è statico: «adesso» è la build.
 */
export function footer(path: string): Html {
  const built = new Date().toISOString();
  const osm = osmDataTimestamp();
  return html`<footer class="site-footer">
  <div class="container site-footer__inner">
    <div class="site-footer__about">
      <a class="site-header__brand wordmark" href="/" aria-label="${site.name} — home">${mark()}<span>${site.name}</span></a>
      <p>${site.description}</p>
      <p class="site-footer__note">La presenza di un ente o di un'attività nel progetto non implica approvazione, collaborazione o patrocinio, salvo indicazione esplicita e documentata.</p>
    </div>
    <nav class="site-footer__nav" aria-label="Collegamenti del piè di pagina">
      <div class="site-footer__col">
        <span>Sezioni</span>
        <ul class="list-plain">
          ${site.navigation.map((item) => html`<li><a class="uline" href="${item.href}"${isActive(path, item.href) ? raw(' aria-current="page"') : ''}>${item.label}</a></li>`)}
        </ul>
      </div>
      <div class="site-footer__col">
        <span>Fonti principali</span>
        <ul class="list-plain">
          ${linkedSources().map((source) => html`<li><a class="uline" href="${source.url}" rel="noopener noreferrer">${source.name}</a></li>`)}
        </ul>
      </div>
      <div class="site-footer__col">
        <span>Progetto</span>
        <ul class="list-plain">
          <li><a class="uline" href="${site.author.url}" rel="author">Progetto di ${site.author.name}</a></li>
          <li><a class="uline" href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer">© OpenStreetMap contributors · ODbL</a></li>
          ${osm ? html`<li><span class="site-footer__plain">Dati OSM <time datetime="${osm}">${formatDateShort(osm)}</time></span></li>` : ''}
          <li><span class="site-footer__plain">Build <time datetime="${built}">${formatDateShort(built)} ${formatTime(built)}</time></span></li>
        </ul>
      </div>
    </nav>
  </div>
</footer>`;
}

/** Il pannello fisso che la pagina scopre in fondo. */
export function footerReveal(): Html {
  const year = new Date().getFullYear();
  return html`<div class="footer-reveal inverse" aria-hidden="true">
  <p class="footer-reveal__name">${site.name}</p>
  <p class="footer-reveal__line"><span>© ${year} ${site.name} · ${site.tagline}</span><span>Progetto di <a href="${site.author.url}" tabindex="-1">${site.author.name}</a></span></p>
</div>`;
}

function isActive(path: string, href: string): boolean {
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}

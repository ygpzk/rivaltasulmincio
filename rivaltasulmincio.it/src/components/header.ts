import { site } from '../app/site';
import { html, raw, type Html } from '../lib/html';
import { mapCenter } from '../places/service';
import { icon } from './icons';
import { pill } from './pill';

/*
 * Testata, nella composizione di reflection.ai: una barra flottante con il
 * marchio a sinistra e, a destra, le voci e la pillola «Cerca» da 1150 px in
 * su. Sotto, il tasto del menu apre un pannello a tutto schermo con le voci
 * in righe (src/nav/client.ts). Il pulsante è reso nascosto e lo attiva il
 * client, così senza JavaScript le voci restano in vista. La Home è il
 * marchio: non compare tra le voci.
 */
export function header(path: string): Html {
  const items = site.navigation.filter(
    (item) => item.href !== '/' && (item.href !== '/meteo' || site.features.weather),
  );
  const center = mapCenter();
  const entry = (item: (typeof items)[number], index: number) =>
    html`<li class="site-nav__item" style="--i:${index}"><a class="site-nav__link" href="${item.href}"${isActive(path, item.href) ? raw(' aria-current="page"') : ''}><span class="site-nav__index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${item.label}${'badge' in item ? html`<span class="site-nav__badge">${item.badge}</span>` : ''}</a></li>`;

  return html`<header class="site-header" data-header>
  <div class="site-header__inner">
    <a class="site-header__brand wordmark" href="/" aria-label="${site.name} — home">${mark()}<span>${site.name}</span></a>
    <div class="site-header__right">
      <nav class="site-nav" id="navigazione" aria-label="Navigazione principale">
        <ul class="site-nav__list site-nav__list--l list-plain">
          ${items.slice(0, 3).map((item, index) => entry(item, index))}
        </ul>
        <ul class="site-nav__list site-nav__list--r list-plain">
          ${items.slice(3).map((item, index) => entry(item, index + 3))}
          <li class="site-nav__item site-nav__item--search">${pill({ href: '/#ricerca', label: 'Cerca', size: 'sm', class: 'site-header__search' })}</li>
        </ul>
        <p class="site-nav__foot"><span>${center.lat.toFixed(5)} N · ${center.lng.toFixed(5)} E</span><span>${site.tagline}</span></p>
      </nav>
      <button class="site-menu" type="button" aria-expanded="false" aria-controls="navigazione" aria-label="Menu" data-menu-toggle hidden>
        <span class="site-menu__icon site-menu__icon--open">${icon('menu', 22)}</span>
        <span class="site-menu__icon site-menu__icon--close">${icon('x', 22)}</span>
      </button>
    </div>
  </div>
</header>`;
}

/** Il marchio: due anelli che si toccano, il paese e il fiume. */
export function mark(): Html {
  return raw(
    '<svg class="mark" viewBox="0 0 28 18" fill="none" aria-hidden="true" focusable="false"><circle cx="9" cy="9" r="7.25" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="9" r="7.25" fill="currentColor"/></svg>',
  );
}

function isActive(path: string, href: string): boolean {
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}

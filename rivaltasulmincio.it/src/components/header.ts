import { site } from '../app/site';
import { html, raw, type Html } from '../lib/html';
import { mapCenter } from '../places/service';
import { icon } from './icons';

/*
 * Testata, nella composizione di albertopecchini.it: il nome del sito al
 * centro, le voci ai lati (tre a sinistra, due e «cerca» a destra) da 1100 px
 * in su. Sotto, il tasto del menu a sinistra e «cerca» a destra: il menu
 * apre la navigazione a tutto schermo (src/nav/client.ts). Il pulsante è reso
 * nascosto e lo attiva il client, così senza JavaScript le voci restano in
 * vista. La Home è il nome: non compare tra le voci, che portano un numero
 * d'ordine in mono visibile solo nel menu a tutto schermo.
 */
const SPLIT = 3;

export function header(path: string): Html {
  const items = site.navigation.filter(
    (item) => item.href !== '/' && (item.href !== '/meteo' || site.features.weather),
  );
  const center = mapCenter();
  const entry = (item: (typeof items)[number], index: number) =>
    html`<li class="site-nav__item" style="--i:${index}"><a class="site-nav__link" href="${item.href}"${isActive(path, item.href) ? raw(' aria-current="page"') : ''}><span class="site-nav__index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${item.label}</a></li>`;

  return html`<header class="site-header">
  <div class="container site-header__inner">
    <button class="site-menu" type="button" aria-expanded="false" aria-controls="navigazione" aria-label="Menu" data-menu-toggle hidden>
      <span class="site-menu__icon site-menu__icon--open">${icon('menu', 22)}</span>
      <span class="site-menu__icon site-menu__icon--close">${icon('x', 22)}</span>
      <span class="site-menu__label">Menu</span>
    </button>
    <a class="wordmark site-header__brand" href="/" aria-label="${site.name} — home">${site.name}</a>
    <nav class="site-nav" id="navigazione" aria-label="Navigazione principale">
      <ul class="site-nav__list site-nav__list--l list-plain">
        ${items.slice(0, SPLIT).map((item, index) => entry(item, index))}
      </ul>
      <ul class="site-nav__list site-nav__list--r list-plain">
        ${items.slice(SPLIT).map((item, index) => entry(item, index + SPLIT))}
        <li class="site-nav__item site-nav__item--search"><a class="site-header__search" href="/#ricerca" aria-label="Cerca">${icon('search', 16)}<span>Cerca</span><kbd class="kbd" aria-hidden="true" data-search-kbd>Ctrl K</kbd></a></li>
      </ul>
      <p class="site-nav__foot"><span>${center.lat.toFixed(5)} N · ${center.lng.toFixed(5)} E</span><span>${site.tagline}</span></p>
    </nav>
    <a class="site-header__search" href="/#ricerca" aria-label="Cerca">${icon('search', 18)}<span>Cerca</span></a>
  </div>
</header>`;
}

function isActive(path: string, href: string): boolean {
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}

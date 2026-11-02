import type { PageResult } from '../app/page';
import { bookCard, compareFigure, dayStrip, lightbox } from '../archive/components';
import { archiveBooks, archiveDays, archivePhotoCount, pairsByTheme } from '../archive/service';
import { pageHeader } from '../components/page-header';
import { pill, tagLabel } from '../components/pill';
import { html } from '../lib/html';

/**
 * /ieri — Rivalta com'era: le fotografie d'archivio riprodotte da due libri
 * del paese. Prima le coppie com'era/com'è, per tema; poi i giorni, ognuno
 * con il suo nastro di fotografie; in fondo i due libri, perché una
 * fotografia d'archivio dice sempre da dove viene.
 */
export function render(): PageResult {
  const themes = pairsByTheme();
  const days = archiveDays();
  const books = archiveBooks();
  const photos = archivePhotoCount();
  const pairs = themes.reduce((total, theme) => total + theme.pairs.length, 0);

  return {
    title: 'Com’era',
    description: `${photos} fotografie d’archivio di Rivalta sul Mincio da due libri del paese: ${pairs} luoghi fotografati com’erano e come sono, e i giorni che il paese ricorda.`,
    main: html`
      ${pageHeader({
        title: 'Rivalta com’era',
        crumbs: [{ label: 'Com’era' }],
        lead: html`${photos} fotografie da due libri del paese: ${pairs} punti ripresi due volte, fra gli anni Ottanta e il 2000, e le giornate che Rivalta ricorda. Trascina la linea per vedere com’era.`,
        extra: html`<div class="hero__actions hero__actions--start">
          ${pill({ href: '#confronti', label: 'Com’era, com’è', tone: 'primary', size: 'sm' })}
          ${pill({ href: '#giorni', label: 'I giorni', size: 'sm' })}
          ${pill({ href: '#libri', label: 'I libri', size: 'sm' })}
        </div>`,
      })}

      <section class="section" id="confronti" aria-labelledby="confronti-titolo">
        <header class="section__head">
          ${tagLabel('Com’era, com’è')}
          <h2 id="confronti-titolo">Lo stesso punto, vent’anni dopo</h2>
          <p class="section__intro">Il Circolo Fotografico Rivalta ha fotografato strade, case e corti negli anni Ottanta e poi di nuovo nel 2000, dallo stesso punto. La fotografia di prima sta a sinistra della linea.</p>
        </header>
        ${themes.map(
          (theme, index) => html`<div class="theme" data-reveal>
          <h3 class="theme__title"><span class="theme__index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${theme.theme}</h3>
          <div class="compare-grid">${theme.pairs.map((pair) => compareFigure(pair, { heading: 'h4' }))}</div>
        </div>`,
        )}
      </section>

      <section class="section" id="giorni" aria-labelledby="giorni-titolo">
        <header class="section__head">
          ${tagLabel('I giorni')}
          <h2 id="giorni-titolo">Le giornate che il paese ricorda</h2>
          <p class="section__intro">Dodici anni di feste, visite e ricorrenze, raccolti dal libro «Eventi e Ricordi». Ogni fotografia si apre a tutto schermo.</p>
        </header>
        <div class="days">${days.map((day, index) => dayStrip(day, index))}</div>
      </section>

      <section class="section" id="libri" aria-labelledby="libri-titolo" data-reveal>
        <div class="books inverse">
          <div class="books__head">
            <h2 class="headline" id="libri-titolo">Da dove vengono queste fotografie</h2>
            <p>Due volumi stampati a Rivalta, riprodotti pagina per pagina. Chi riconosce un luogo, una persona o una data sbagliata può scrivere al progetto: la didascalia si corregge.</p>
          </div>
          ${books.map((book) => bookCard(book))}
        </div>
      </section>
      ${lightbox()}
    `,
  };
}

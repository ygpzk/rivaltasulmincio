import { icon } from '../components/icons';
import { html, raw, type Html } from '../lib/html';
import type { ArchiveBook, ArchiveDay, ArchivePair, ArchivePhoto } from '../types';
import { coverSrc, coverSrcset, photoDate, photoSize, photoSrc, photoSrcset } from './service';

/*
 * I pezzi della pagina /ieri (archivio.css):
 *
 *   compareFigure  lo stesso punto com'era e com'è, due fotografie
 *                  sovrapposte e una linea da trascinare (src/archive/client.ts);
 *                  senza JavaScript stanno una accanto all'altra;
 *   dayStrip       un giorno: il testo a sinistra, le fotografie in un nastro
 *                  che scorre a destra, ognuna apre la finestra (lightbox);
 *   bookCard       il libro da cui vengono, perché una fotografia d'archivio
 *                  dice sempre da dove viene;
 *   lightbox       la finestra sulla fotografia, un <dialog> nativo.
 */

const GRIP = raw(
  '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m9 7-5 5 5 5"/><path d="m15 7 5 5-5 5"/></svg>',
);

function img(photo: ArchivePhoto, sizes: string, loading: 'eager' | 'lazy'): Html {
  const size = photoSize();
  return html`<img src="${photoSrc(photo)}" srcset="${photoSrcset(photo)}" sizes="${sizes}" alt="${photo.alt}" width="${size.width}" height="${size.height}" loading="${loading}" decoding="async" />`;
}

export function compareFigure(
  pair: ArchivePair,
  options: { sizes?: string; loading?: 'eager' | 'lazy'; heading?: 'h3' | 'h4'; id?: boolean } = {},
): Html {
  const sizes = options.sizes ?? '(max-width: 64rem) 100vw, 40rem';
  const loading = options.loading ?? 'lazy';
  const before = photoDate(pair.before);
  const after = photoDate(pair.after);
  const heading = options.heading ?? 'h3';
  const title = heading === 'h4' ? html`<h4 class="compare__title">${pair.title}</h4>` : html`<h3 class="compare__title">${pair.title}</h3>`;
  return html`<figure class="compare"${options.id === false ? '' : html` id="${pair.id}"`} data-compare>
  <div class="compare__stage">
    <div class="compare__pane compare__pane--after">${img(pair.after, sizes, loading)}</div>
    <div class="compare__pane compare__pane--before">${img(pair.before, sizes, loading)}</div>
    ${before ? html`<span class="tag tag--accent compare__year">${before}</span>` : ''}
    ${after ? html`<span class="tag compare__year compare__year--after">${after}</span>` : ''}
    <label class="compare__control">
      <span class="visually-hidden">Quanto mostrare della fotografia di prima, da sinistra</span>
      <input type="range" min="0" max="100" step="0.5" value="50" />
    </label>
    <div class="compare__handle" aria-hidden="true"><span class="compare__grip">${GRIP}</span></div>
  </div>
  <figcaption class="compare__caption">
    <div class="compare__head">
      ${title}
      ${before && after ? html`<span class="compare__dates">${before} → ${after}</span>` : ''}
    </div>
    <p>${pair.text}</p>
    <p class="compare__legend"><span>Prima: ${pair.before.caption}.</span> <span>Dopo: ${pair.after.caption}.</span></p>
  </figcaption>
</figure>`;
}

export function dayStrip(day: ArchiveDay, index: number): Html {
  const count = day.photos.length;
  return html`<section class="day" id="${day.id}" aria-labelledby="${day.id}-titolo" style="--i:${index}">
  <div class="day__copy">
    ${day.date ? html`<span class="label">${day.date}</span>` : ''}
    <h3 id="${day.id}-titolo">${day.title}</h3>
    <p>${day.text}</p>
    <span class="day__count">${count} ${count === 1 ? 'fotografia' : 'fotografie'}</span>
  </div>
  <ul class="strip list-plain" aria-label="Fotografie: ${day.title}">
    ${day.photos.map(
      (photo) => html`<li class="strip__item">
      <a class="strip__link" href="${photoSrc(photo)}" data-lightbox="${[photoDate(photo), photo.caption].filter(Boolean).join(' · ')}">
        <span class="strip__frame">${img(photo, '(max-width: 48rem) 78vw, 24rem', 'lazy')}</span>
        <span class="strip__caption">${photoDate(photo) ? html`<span class="strip__date">${photoDate(photo)}</span> ` : ''}${photo.caption}</span>
      </a>
    </li>`,
    )}
  </ul>
</section>`;
}

export function bookCard(book: ArchiveBook): Html {
  return html`<article class="book" id="${book.id}">
  <div class="book__cover">
    <img src="${coverSrc(book)}" srcset="${coverSrcset(book)}" sizes="9rem" alt="${book.cover.alt}" width="${book.cover.width}" height="${book.cover.height}" loading="lazy" decoding="async" />
  </div>
  <div class="book__body">
    <h3>${book.title}</h3>
    <p class="book__publisher">${book.publisher}</p>
    <p>${book.text}</p>
    <p class="book__gift">Arrivato al progetto in dono da <strong>${book.gift}</strong>. Grazie.</p>
  </div>
</article>`;
}

/** La finestra sulla fotografia: vuota finché il client non la riempie. */
export function lightbox(): Html {
  return html`<dialog class="lightbox inverse" aria-label="Fotografia ingrandita" data-lightbox-dialog>
  <div class="lightbox__inner">
    <div class="lightbox__bar">
      <span class="label" data-lightbox-counter></span>
      <div class="lightbox__buttons">
        <button class="lightbox__button lightbox__button--prev" type="button" aria-label="Fotografia precedente" data-lightbox-prev>${icon('arrow-right', 18)}</button>
        <button class="lightbox__button" type="button" aria-label="Fotografia successiva" data-lightbox-next>${icon('arrow-right', 18)}</button>
        <button class="lightbox__button" type="button" aria-label="Chiudi" data-lightbox-close>${icon('x', 18)}</button>
      </div>
    </div>
    <img class="lightbox__image" alt="" />
    <p class="lightbox__caption" data-lightbox-caption></p>
  </div>
</dialog>`;
}

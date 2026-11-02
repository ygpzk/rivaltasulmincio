import { archive } from '../data/archive';
import type { ArchiveBook, ArchiveDay, ArchivePair, ArchivePhoto, SearchEntry } from '../types';

/*
 * L'archivio fotografico (data/images/archive-images.json): le coppie
 * com'era/com'è, i giorni e i due libri da cui tutto viene. Il percorso dei
 * file si costruisce qui e in nessun altro posto.
 */

export const ARCHIVE_PATH = '/ieri';

export function archivePairs(): ArchivePair[] {
  return archive.pairs;
}

export function archiveDays(): ArchiveDay[] {
  return archive.days;
}

export function archiveBooks(): ArchiveBook[] {
  return archive.books;
}

export function bookById(id: string): ArchiveBook | undefined {
  return archive.books.find((book) => book.id === id);
}

export function pairById(id: string): ArchivePair | undefined {
  return archive.pairs.find((pair) => pair.id === id);
}

/** Le coppie raggruppate per tema, nell'ordine del libro. */
export function pairsByTheme(): { theme: string; pairs: ArchivePair[] }[] {
  const groups: { theme: string; pairs: ArchivePair[] }[] = [];
  for (const pair of archive.pairs) {
    const group = groups.find((entry) => entry.theme === pair.theme);
    if (group) group.pairs.push(pair);
    else groups.push({ theme: pair.theme, pairs: [pair] });
  }
  return groups;
}

/** Tutte le fotografie, coppie e giorni insieme. */
export function archivePhotos(): ArchivePhoto[] {
  return [...archive.pairs.flatMap((pair) => [pair.before, pair.after]), ...archive.days.flatMap((day) => day.photos)];
}

export function archivePhotoCount(): number {
  return archivePhotos().length;
}

/** `/foto/archivio/<file>-<larghezza>.webp`; senza larghezza, la più grande. */
export function photoSrc(photo: ArchivePhoto, width = archive.format.width): string {
  return `${archive.format.dir}/${photo.file}-${width}.webp`;
}

export function photoSrcset(photo: ArchivePhoto): string {
  return archive.format.widths.map((width) => `${photoSrc(photo, width)} ${width}w`).join(', ');
}

export function photoSize(): { width: number; height: number } {
  return { width: archive.format.width, height: archive.format.height };
}

export function coverSrc(book: ArchiveBook, width = book.cover.width): string {
  return `${archive.format.dir}/${book.cover.file}-${width}.webp`;
}

export function coverSrcset(book: ArchiveBook): string {
  return book.cover.widths.map((width) => `${coverSrc(book, width)} ${width}w`).join(', ');
}

/** «1981», «1981 c.», «27 giu 2004»: la data come la dà il libro. */
export function photoDate(photo: ArchivePhoto): string | undefined {
  if (!photo.date) return undefined;
  return photo.approx ? `${photo.date} c.` : photo.date;
}

/** Le voci per l'indice di ricerca: una per coppia, una per giorno. */
export function archiveSearchEntries(): SearchEntry[] {
  const pairs: SearchEntry[] = archive.pairs.map((pair) => ({
    id: pair.id,
    kind: 'Com’era, com’è',
    title: pair.title,
    text: [pair.theme, pair.text, pair.before.caption, pair.after.caption, photoDate(pair.before), photoDate(pair.after)]
      .filter(Boolean)
      .join(' '),
    url: `${ARCHIVE_PATH}#${pair.id}`,
  }));
  const days: SearchEntry[] = archive.days.map((day) => ({
    id: day.id,
    kind: 'Fotografie',
    title: day.title,
    text: [day.date, day.text, ...day.photos.map((photo) => photo.caption)].filter(Boolean).join(' '),
    url: `${ARCHIVE_PATH}#${day.id}`,
  }));
  return [...pairs, ...days];
}

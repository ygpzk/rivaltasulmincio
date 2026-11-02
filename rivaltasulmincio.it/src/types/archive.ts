/*
 * Fotografie d'archivio (IMAGES.md «Metadati», «Crediti»): riprodotte da
 * due libri del paese, non da OpenStreetMap. Una fotografia d'archivio dice
 * sempre da dove viene: ogni coppia e ogni giorno rimanda al suo libro, e il
 * libro al registro delle fonti (`Source.id`).
 */

export type ArchivePhoto = {
  /** ID stabile (`arc-001`): non cambia mai. */
  id: string;
  /** Nome del file senza larghezza né estensione: `public/foto/archivio/<file>-<larghezza>.webp`. */
  file: string;
  /** Descrizione del contenuto reale (IMAGES.md «Alt text»). */
  alt: string;
  /** Didascalia breve, come la dice il libro. */
  caption: string;
  /** La data come si legge: «1981», «27 giu 2004». */
  date?: string;
  /** La data è «circa»: il libro non la dà esatta. */
  approx?: boolean;
  /** Data ISO, intera o solo l'anno, quando si sa. */
  dateTaken?: string;
  /** Pagina del libro, quando il libro la numera. */
  page?: number;
};

/** Lo stesso punto fotografato due volte: com'era e com'è. */
export type ArchivePair = {
  id: string;
  /** Il gruppo in cui il libro la mette («Le cascine»). */
  theme: string;
  title: string;
  /** Che cosa è cambiato, in una riga. */
  text: string;
  /** Il libro da cui viene (`ArchiveBook.id`). */
  book: string;
  before: ArchivePhoto;
  after: ArchivePhoto;
};

/** Un giorno del paese, in più fotografie. */
export type ArchiveDay = {
  id: string;
  title: string;
  text: string;
  book: string;
  date?: string;
  dateTaken?: string;
  photos: ArchivePhoto[];
};

export type ArchiveBook = {
  id: string;
  /** Voce del registro fonti (`data/sources/sources.json`). */
  sourceId: string;
  title: string;
  publisher: string;
  text: string;
  /** Chi ha donato la copia al progetto. */
  gift: string;
  cover: {
    file: string;
    widths: number[];
    width: number;
    height: number;
    alt: string;
  };
};

/** Il formato comune a tutte le fotografie dell'archivio. */
export type ArchiveFormat = {
  dir: string;
  widths: number[];
  width: number;
  height: number;
};

export type ArchiveData = {
  format: ArchiveFormat;
  books: ArchiveBook[];
  pairs: ArchivePair[];
  days: ArchiveDay[];
};

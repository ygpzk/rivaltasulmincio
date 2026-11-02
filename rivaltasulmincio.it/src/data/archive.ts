import archiveJson from '../../data/images/archive-images.json';
import type { ArchiveData } from '../types';

/** Fotografie d'archivio: dataset → tipo. La logica sta in `src/archive/service.ts`. */
export const archive: ArchiveData = archiveJson as ArchiveData;

/*
 * Derivate WebP di una cartella di fotografie (IMAGES.md «Responsive images»).
 *
 *   node scripts/foto-webp.ts <sorgente> <destinazione> [larghezze]
 *
 * Da ogni JPEG o PNG della sorgente scrive `<nome>-<larghezza>.webp` nella
 * destinazione, una per larghezza (predefinite: 480, 720, 960, 1440, 1600),
 * senza mai ingrandire: una larghezza superiore all'originale viene saltata.
 * Le derivate esistenti non vengono rifatte. I master restano fuori dal
 * repository; qui dentro entrano solo le derivate.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const [source, target, widthsArg] = process.argv.slice(2);
if (!source || !target) {
  console.error('uso: node scripts/foto-webp.ts <sorgente> <destinazione> [larghezze es. 480,720,960]');
  process.exit(1);
}

const widths = (widthsArg ?? '480,720,960,1440,1600')
  .split(',')
  .map((value) => Number.parseInt(value, 10))
  .filter((value) => Number.isFinite(value) && value > 0);

fs.mkdirSync(target, { recursive: true });

const files = fs.readdirSync(source).filter((file) => /\.(jpe?g|png)$/i.test(file));
let written = 0;
for (const file of files) {
  const stem = file.replace(/\.(jpe?g|png)$/i, '');
  const input = path.join(source, file);
  const meta = await sharp(input).metadata();
  const original = meta.width ?? 0;
  for (const width of widths) {
    if (width > original) continue;
    const output = path.join(target, `${stem}-${width}.webp`);
    if (fs.existsSync(output)) continue;
    await sharp(input).resize({ width }).webp({ quality: 82 }).toFile(output);
    written += 1;
  }
}

console.log(`foto-webp: ${files.length} originali, ${written} derivate scritte in ${path.relative(process.cwd(), target) || '.'}`);

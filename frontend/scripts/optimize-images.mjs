/**
 * One-off image optimiser for the bundled institute photography.
 *
 * The originals were downloaded straight from the official site at full camera
 * resolution — one is a 930 KB, 1200px-wide JPEG. Nothing on the page renders
 * wider than ~1600px, so each photograph is capped and re-encoded at a sane
 * quality. Portraits and recruiter marks are left alone; they are already small.
 *
 * Run with: npm run optimize:images
 */

import { readdir, stat, rename, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const galleryDir = path.join(root, 'src/assets/images/gallery');

const MAX_WIDTH = 1600;
const QUALITY = 78;

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function optimize(file) {
  const full = path.join(galleryDir, file);
  const before = (await stat(full)).size;

  const image = sharp(full);
  const { width } = await image.metadata();

  const tmp = `${full}.tmp`;
  await image
    .resize({ width: Math.min(width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(tmp);

  const after = (await stat(tmp)).size;

  // Only keep the re-encode when it actually helps.
  if (after < before) {
    await unlink(full);
    await rename(tmp, full);
    console.log(`${file.padEnd(26)} ${kb(before).padStart(8)} -> ${kb(after).padStart(8)}`);
  } else {
    await unlink(tmp);
    console.log(`${file.padEnd(26)} ${kb(before).padStart(8)}    (kept)`);
  }
}

const files = (await readdir(galleryDir)).filter((f) => /\.(jpe?g)$/i.test(f));
for (const file of files) {
  await optimize(file);
}
console.log(`\nOptimised ${files.length} photographs.`);

/**
 * Converts every raster image the site ships to WebP.
 *
 * Walks `src/assets` and `public`, re-encodes each PNG/JPEG as WebP next to
 * the original, then deletes the original. Photographs are also capped at
 * 1600px wide — nothing on the page renders wider. Already-WebP files are
 * skipped, so the script is safe to re-run after adding new images.
 *
 * Two files stay as they are, because their consumers do not reliably accept
 * WebP: the favicon (browser tabs, iOS home screen) and the Open Graph logo
 * (link previews in WhatsApp, Facebook, etc.).
 *
 * Run with: npm run optimize:images
 */

import { readFile, readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['src/assets', 'public'];
const KEEP = new Set(['public/favicon.png', 'public/satpuda-iti-logo.jpg']);

const MAX_WIDTH = 1600;

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;
const rel = (p) => path.relative(root, p).split(path.sep).join('/');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function convert(file) {
  const out = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const isPhoto = /\.jpe?g$/i.test(file);
  const before = (await stat(file)).size;

  // Read into memory first: on Windows sharp holds the file open, which would
  // block deleting the original.
  const image = sharp(await readFile(file));
  const { width } = await image.metadata();

  await image
    .resize({ width: Math.min(width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    // PNGs are logos, marks and portraits with flat colour and alpha — a higher
    // quality keeps their edges clean.
    .webp(isPhoto ? { quality: 80, effort: 6 } : { quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(out);

  const after = (await stat(out)).size;
  await unlink(file);
  console.log(`${rel(file).padEnd(56)} ${kb(before).padStart(8)} -> ${kb(after).padStart(8)}`);
  return [before, after];
}

let total = [0, 0];
let count = 0;
for (const dir of DIRS) {
  for await (const file of walk(path.join(root, dir))) {
    if (!/\.(png|jpe?g)$/i.test(file) || KEEP.has(rel(file))) continue;
    const [b, a] = await convert(file);
    total = [total[0] + b, total[1] + a];
    count += 1;
  }
}
console.log(`\nConverted ${count} images: ${kb(total[0])} -> ${kb(total[1])}`);

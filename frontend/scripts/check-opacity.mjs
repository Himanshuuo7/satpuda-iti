/**
 * Guards against a silent Tailwind failure mode.
 *
 * A colour/opacity modifier like `bg-white/92` or `border-white/12` emits **no
 * CSS at all** unless that step exists on the `opacity` scale — the class is
 * simply dropped, so a background or border silently disappears with no build
 * error. This caught exactly that: the sticky navbar shipped with no background
 * on non-home routes, leaving dark text on a dark page.
 *
 * Any step used here must be on Tailwind's default scale or added to
 * `theme.extend.opacity` in tailwind.config.js.
 *
 * Run with: npm run check:opacity
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

// Tailwind's default opacity scale, plus the steps this project adds in
// tailwind.config.js under theme.extend.opacity.
const VALID = new Set([
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  12, 92,
]);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jsx?|css)$/.test(e.name)) yield p;
  }
}

let bad = 0;
for await (const file of walk('src')) {
  const text = await readFile(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    // color-utility/NN  (skip arbitrary /[0.xx] and fractions inside brackets)
    const re = /(?:^|[\s'"`])((?:bg|text|border|ring|from|via|to|divide|outline|shadow|decoration|placeholder|caret|accent)-[a-z0-9-]+)\/(\d{1,3})(?![\d.\]])/g;
    let m;
    while ((m = re.exec(line))) {
      if (!VALID.has(Number(m[2]))) {
        bad += 1;
        console.log(`${file}:${i + 1}  ${m[1]}/${m[2]}   <-- not on the default opacity scale`);
      }
    }
  });
}
if (bad === 0) {
  console.log('All opacity modifiers resolve to a real CSS rule.');
} else {
  console.log(`\n${bad} modifier(s) would emit no CSS. Add the step to theme.extend.opacity.`);
  process.exit(1);
}

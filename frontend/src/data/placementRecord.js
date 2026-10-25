import { GROUP_PLACEMENTS_UPTO, groupPlacements } from './groupPlacements';

/**
 * The Satpuda group's placement record, summed — what every page that quotes
 * the record reads, so no figure on the site can drift from another. The
 * rows, and how they were read from the ITIs' own campus-drive sheets, are in
 * groupPlacements.js.
 *
 * It imports nothing but groupPlacements.js, so placementPages.js (and
 * through it the site navigation) can quote it without a cycle.
 */

const add = (rows, key) => rows.reduce((n, r) => n + (r[key] ?? 0), 0);
const totalsOf = (rows) => ({
  drives: add(rows, 'drives'),
  attended: add(rows, 'attended'),
  selected: add(rows, 'selected'),
  itis: new Set(rows.map((r) => r.iti)).size,
});

const years = [...new Set(groupPlacements.map((r) => r.year).filter(Boolean))].sort((a, b) => a - b);

/** One row per year: drives, candidates attended and selected, ITIs that held drives. */
export const placementByYear = years.map((year) => ({
  year,
  ...totalsOf(groupPlacements.filter((r) => r.year === year)),
}));

/** Every year together — including the few drives that carry no date. */
export const placementTotals = {
  first: years[0],
  last: years[years.length - 1],
  ...totalsOf(groupPlacements),
};

/** The year with the most candidates selected. */
export const placementPeak = placementByYear.reduce((a, b) => (b.selected > a.selected ? b : a));

/** The latest year on record, which runs only to `placementUpTo`. */
export const placementLatest = placementByYear[placementByYear.length - 1];

const lastDrive = new Date(`${GROUP_PLACEMENTS_UPTO}T00:00:00`);

/** The last drive on record: "23 Oct 2026", "23 अक्टूबर 2026", "23 अक्टूबर". */
export const placementUpTo = {
  en: lastDrive.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  hi: lastDrive.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
  hiDayMonth: lastDrive.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long' }),
};

/** Where the figures come from, and what "selected" counts. */
export const placementSourceHi = `ये आँकड़े सतपुड़ा समूह के ${placementTotals.itis} ITI के अपने कैंपस ड्राइव रिकॉर्ड से जोड़े गए हैं — ${placementTotals.first} से ${placementUpTo.hi} तक। ओपन कैंपस ड्राइव में दूसरे संस्थानों के उम्मीदवार भी आते हैं, इसलिए चयन की संख्या उस ड्राइव में चुने गए सभी उम्मीदवारों की है। जिन ड्राइव के आँकड़े नहीं भेजे गए, वे केवल ड्राइव की गिनती में शामिल हैं।`;

/**
 * Every ITI's drives, turnout and selections over the whole record, most
 * selected first. `attended`/`selected` stay null for an ITI that never
 * reported one; `first`/`last` are the years of its dated drives.
 */
export const placementByIti = [
  ...groupPlacements
    .reduce((map, r) => {
      const t = map.get(r.iti) ?? { iti: r.iti, drives: 0, attended: null, selected: null, first: null, last: null };
      t.drives += r.drives;
      if (r.attended != null) t.attended = (t.attended ?? 0) + r.attended;
      if (r.selected != null) t.selected = (t.selected ?? 0) + r.selected;
      if (r.year) {
        t.first = Math.min(t.first ?? r.year, r.year);
        t.last = Math.max(t.last ?? r.year, r.year);
      }
      return map.set(r.iti, t);
    }, new Map())
    .values(),
].sort((a, b) => (b.selected ?? -1) - (a.selected ?? -1) || b.drives - a.drives);

import { useState } from 'react';
import { Link } from 'react-router-dom';

import PlacementHero from './PlacementHero';
import PlacementNext from './PlacementNext';
import SegmentedControl from '../ui/SegmentedControl';
import StatCounter from '../ui/StatCounter';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { placementDetails as content } from '../../data/placementContent';
import { getItiProfile } from '../../data/itiProfiles';
import {
  placementByIti,
  placementByYear,
  placementPeak,
  placementSourceHi,
  placementTotals as T,
  placementUpTo,
} from '../../data/placementRecord';
import cn from '../../utils/cn';

/**
 * Placement Details — the group's record, year by year and ITI by ITI.
 *
 * A metric switch re-draws one bar chart for candidates selected, candidates
 * attended or campus drives; bars ease between metrics rather than jumping.
 * Hovering (or focusing) a year highlights it in the chart and the year table
 * together. The same record follows ITI by ITI, each linking to its page.
 */

const n = (v) => v.toLocaleString('en-IN');

/** The chart's top line: the peak rounded up to its leading digit (3,844 → 4,000). */
const niceCeil = (v) => {
  const step = 10 ** Math.floor(Math.log10(v));
  return Math.ceil(v / step) * step;
};

const METRICS = [
  { id: 'selected', label: 'Candidates selected', format: n },
  { id: 'attended', label: 'Candidates attended', format: n },
  { id: 'drives', label: 'Campus drives', format: (v) => String(v) },
];

/** A figure an ITI never reported. */
function NotReported() {
  return (
    <>
      <span aria-hidden="true" className="text-ink-soft">—</span>
      <span className="sr-only">not reported</span>
    </>
  );
}

function Chart({ metric, hover, onHover }) {
  const rows = placementByYear;
  const m = METRICS.find((x) => x.id === metric);
  const values = rows.map((r) => r[metric]);
  const peak = Math.max(...values);
  const max = niceCeil(peak);
  const grid = [0, 0.25, 0.5, 0.75, 1];

  return (
    <figure className="rounded-panel border border-navy-100 bg-white p-5 sm:p-8">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-label uppercase text-ink-soft">{m.label} · per year</span>
        <span className="font-display text-[1.125rem] font-semibold text-navy-800">
          {hover ? (
            <>
              {hover}: <span className="text-royal">{m.format(rows.find((r) => r.year === hover)[metric])}</span>
            </>
          ) : (
            <>
              Peak: <span className="text-signal">{m.format(peak)}</span>
            </>
          )}
        </span>
      </figcaption>

      <div className="relative mt-10 h-64 pl-12 sm:h-72 sm:pl-16">
        {grid.map((g) => (
          <div key={g} aria-hidden="true" className="absolute left-12 right-0 border-t border-navy-50 sm:left-16" style={{ bottom: `${g * 100}%` }}>
            <span className="absolute -left-12 w-10 -translate-y-1/2 text-right font-mono text-[0.625rem] tabular text-ink-soft sm:-left-16 sm:w-14">
              {m.format(Math.round(max * g))}
            </span>
          </div>
        ))}

        <ul className="relative flex h-full items-end gap-1.5 sm:gap-3 lg:gap-5">
          {rows.map((r, i) => {
            const v = r[metric];
            const isPeak = v === peak;
            const isHover = hover === r.year;
            return (
              <li key={r.year} className="relative flex h-full min-w-0 flex-1 flex-col justify-end">
                <div
                  tabIndex={0}
                  role="img"
                  aria-label={`${r.year}: ${m.label} ${m.format(v)}`}
                  onPointerEnter={() => onHover(r.year)}
                  onPointerLeave={() => onHover(null)}
                  onFocus={() => onHover(r.year)}
                  onBlur={() => onHover(null)}
                  className={cn(
                    'sec-bar relative mx-auto w-full max-w-[3.5rem] cursor-default rounded-t-[4px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech',
                    isHover ? 'bg-tech-500' : isPeak ? 'bg-signal' : 'bg-royal'
                  )}
                  style={{ height: `${Math.max((v / max) * 100, 1)}%`, '--i': i }}
                >
                  <span
                    className={cn(
                      'absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.625rem] font-semibold tabular transition-[color,transform] duration-300 sm:text-[0.6875rem]',
                      isHover ? '-translate-y-0.5 text-navy-800' : 'text-ink-muted',
                      // On a phone the columns are too narrow for every label.
                      !isHover && !isPeak && 'hidden md:block'
                    )}
                  >
                    {m.format(v)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Years sit below the plot, so every column is measured from the zero line. */}
      <div aria-hidden="true" className="mt-2 flex gap-1.5 pl-12 sm:gap-3 sm:pl-16 lg:gap-5">
        {rows.map((r) => (
          <span
            key={r.year}
            className={cn(
              'min-w-0 flex-1 text-center font-mono text-[0.6875rem] tabular transition-colors duration-300',
              hover === r.year ? 'text-navy-800' : 'text-ink-muted'
            )}
          >
            <span className="sm:hidden">’{String(r.year).slice(2)}</span>
            <span className="hidden sm:inline">{r.year}</span>
          </span>
        ))}
      </div>
    </figure>
  );
}

function YearTable({ hover, onHover }) {
  const c = content.columns;
  const rows = placementByYear;

  return (
    <>
      {/* Tablet and up */}
      <div className="hidden overflow-hidden rounded-panel border border-navy-100 bg-white sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">
              Satpuda group placement details by year, {T.first} to {placementUpTo.en}
            </caption>
            <thead>
              <tr className="border-b border-navy-100 bg-canvas-soft">
                {['Sl.No.', c.year, c.drives, c.attended, c.selected, c.itis].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={cn(
                      'px-4 py-4 font-mono text-[0.625rem] font-medium uppercase leading-snug tracking-[0.12em] text-ink-muted lg:px-6',
                      i > 1 && 'text-right'
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.year}
                  onPointerEnter={() => onHover(r.year)}
                  onPointerLeave={() => onHover(null)}
                  className={cn(
                    'border-b border-navy-50 transition-colors duration-200 last:border-b-0',
                    hover === r.year ? 'bg-navy-50/80' : 'hover:bg-navy-50/60'
                  )}
                >
                  <td className="px-4 py-4 font-mono text-[0.8125rem] tabular text-ink-soft lg:px-6">{i + 1}</td>
                  <th scope="row" className="px-4 py-4 font-display text-[1.0625rem] font-semibold tabular text-navy-800 lg:px-6">
                    <span className="inline-flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-200', hover === r.year ? 'bg-signal' : 'bg-navy-200')}
                      />
                      {r.year}
                    </span>
                  </th>
                  <td className="px-4 py-4 text-right font-mono text-[0.875rem] tabular text-navy-700 lg:px-6">
                    {String(r.drives).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-[0.875rem] tabular text-navy-700 lg:px-6">{n(r.attended)}</td>
                  <td className="px-4 py-4 lg:px-6">
                    <span className="flex items-center justify-end gap-3">
                      <span aria-hidden="true" className="hidden h-1 w-16 overflow-hidden rounded-full bg-navy-100 md:block">
                        <span
                          className="block h-full rounded-full bg-tech-500"
                          style={{ width: `${(r.selected / placementPeak.selected) * 100}%` }}
                        />
                      </span>
                      <span className="font-mono text-[0.875rem] font-semibold tabular text-navy-800">{n(r.selected)}</span>
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-[0.875rem] tabular text-navy-700 lg:px-6">{r.itis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phones: one card per year */}
      <ul className="grid gap-3 sm:hidden">
        {rows.map((r) => (
          <li key={r.year} className="reveal rounded-panel border border-navy-100 bg-white p-5">
            <p className="flex items-baseline justify-between">
              <span className="font-display text-[1.5rem] font-semibold tabular text-navy-800">{r.year}</span>
              <span className="font-mono text-[0.875rem] font-semibold tabular text-royal">{n(r.selected)} selected</span>
            </p>
            <dl className="mt-4 grid grid-cols-3 gap-x-3 gap-y-4 border-t border-navy-50 pt-4">
              {[
                [c.drives, String(r.drives).padStart(2, '0')],
                [c.attended, n(r.attended)],
                [c.itis, String(r.itis)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.5625rem] uppercase leading-snug tracking-[0.1em] text-ink-soft">{k}</dt>
                  <dd className="mt-1 font-mono text-[0.8125rem] font-semibold tabular text-navy-800">{v}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

function ItiTable() {
  const c = content.columns;
  const rows = placementByIti.map((t) => ({ ...t, inst: getItiProfile(t.iti) }));
  const years = (t) => (t.first === t.last ? String(t.first) : `${t.first}–${t.last}`);

  return (
    <>
      {/* Tablet and up */}
      <div className="hidden overflow-hidden rounded-panel border border-navy-100 bg-white sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">Satpuda group placement details by ITI, up to {placementUpTo.en}</caption>
            <thead>
              <tr className="border-b border-navy-100 bg-canvas-soft">
                {['ITI', 'Years', c.drives, c.attended, c.selected].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={cn(
                      'px-4 py-4 font-mono text-[0.625rem] font-medium uppercase leading-snug tracking-[0.12em] text-ink-muted lg:px-6',
                      i > 1 && 'text-right'
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.iti} className="border-b border-navy-50 transition-colors duration-200 last:border-b-0 hover:bg-navy-50/60">
                  <th scope="row" className="px-4 py-4 lg:px-6">
                    <Link
                      to={t.inst.path}
                      className="font-display text-[1.0625rem] font-semibold text-navy-800 transition-colors duration-200 hover:text-signal"
                    >
                      {t.inst.namePlace}
                    </Link>
                    <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft">{t.inst.district}</span>
                  </th>
                  <td className="px-4 py-4 font-mono text-[0.8125rem] tabular text-ink-muted lg:px-6">{years(t)}</td>
                  <td className="px-4 py-4 text-right font-mono text-[0.875rem] tabular text-navy-700 lg:px-6">
                    {String(t.drives).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-[0.875rem] tabular text-navy-700 lg:px-6">
                    {t.attended == null ? <NotReported /> : n(t.attended)}
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-[0.875rem] font-semibold tabular text-navy-800 lg:px-6">
                    {t.selected == null ? <NotReported /> : n(t.selected)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phones: one card per ITI */}
      <ul className="grid gap-3 sm:hidden">
        {rows.map((t) => (
          <li key={t.iti} className="reveal rounded-panel border border-navy-100 bg-white p-5">
            <p className="flex items-baseline justify-between gap-3">
              <Link to={t.inst.path} className="font-display text-[1.25rem] font-semibold text-navy-800 hover:text-signal">
                {t.inst.namePlace}
              </Link>
              <span className="font-mono text-[0.75rem] tabular text-ink-muted">{years(t)}</span>
            </p>
            <dl className="mt-4 grid grid-cols-3 gap-x-3 gap-y-4 border-t border-navy-50 pt-4">
              {[
                [c.drives, String(t.drives).padStart(2, '0')],
                [c.attended, t.attended == null ? <NotReported /> : n(t.attended)],
                [c.selected, t.selected == null ? <NotReported /> : n(t.selected)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.5625rem] uppercase leading-snug tracking-[0.1em] text-ink-soft">{k}</dt>
                  <dd className="mt-1 font-mono text-[0.8125rem] font-semibold tabular text-navy-800">{v}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

function SummaryCard() {
  const ref = useReveal({ threshold: 0.2 });
  return (
    <div ref={ref} className="relative overflow-hidden rounded-panel bg-navy-800 p-6 shadow-deep sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      <div className="relative grid grid-cols-2 gap-x-5 gap-y-8">
        <StatCounter tone="dark" value={T.selected} label="Candidates selected" note={`${T.first}–${T.last}`} />
        <StatCounter tone="dark" value={T.drives} label="Campus drives" note={`${T.first}–${T.last}`} />
        <StatCounter tone="dark" value={placementPeak.selected} label="Most in a year" note={String(placementPeak.year)} />
        <StatCounter tone="dark" value={T.itis} label="ITIs on record" note={`Up to ${placementUpTo.en}`} />
      </div>
    </div>
  );
}

export function Details({ page }) {
  const [metric, setMetric] = useState('selected');
  const [hover, setHover] = useState(null);
  const chart = useReveal({ threshold: 0.12 });
  const table = useReveal({ threshold: 0.05 });
  const byIti = useReveal({ threshold: 0.05 });

  return (
    <>
      <PlacementHero
        page={page}
        eyebrow="Placement record"
        lines={[
          <>
            Placement <span className="text-royal">Details</span>
            <span className="text-signal">.</span>
          </>,
        ]}
        lede={content.lede}
        aside={<SummaryCard />}
      />

      <section ref={chart} aria-labelledby="chart-title" className="bg-white py-20 sm:py-26">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="chart-title"
              eyebrow="Year by year"
              title={
                <>
                  {T.first} to {T.last}, <span className="text-ink-muted">drive by drive.</span>
                </>
              }
              className="max-w-2xl"
            />
            <div className="reveal" style={{ '--reveal-delay': '160ms' }}>
              <SegmentedControl options={METRICS} value={metric} onChange={setMetric} label="Chart metric" />
            </div>
          </div>

          <div className="reveal mt-10" style={{ '--reveal-delay': '200ms' }}>
            <Chart metric={metric} hover={hover} onHover={setHover} />
          </div>
        </div>
      </section>

      <section ref={table} aria-labelledby="table-title" className="bg-canvas-soft py-20 sm:py-26">
        <div className="shell">
          <SectionHeading id="table-title" eyebrow="The full table" title="Placement Details" />
          <div className="reveal mt-10" style={{ '--reveal-delay': '120ms' }}>
            <YearTable hover={hover} onHover={setHover} />
          </div>
        </div>
      </section>

      <section ref={byIti} aria-labelledby="iti-table-title" className="bg-white py-20 sm:py-26">
        <div className="shell">
          <SectionHeading
            id="iti-table-title"
            eyebrow="ITI by ITI"
            title={
              <>
                Every campus, <span className="text-ink-muted">its own record.</span>
              </>
            }
          />
          <div className="reveal mt-10" style={{ '--reveal-delay': '120ms' }}>
            <ItiTable />
          </div>
          <p lang="hi" className="reveal mt-5 max-w-4xl text-[0.8125rem] leading-relaxed text-ink-soft" style={{ '--reveal-delay': '160ms' }}>
            {placementSourceHi} प्लेसमेंट सहायता का अर्थ नौकरी की गारंटी नहीं है।
          </p>
        </div>
      </section>

      <PlacementNext page={page} />
    </>
  );
}

export default Details;

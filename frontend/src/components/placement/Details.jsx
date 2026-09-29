import { useState } from 'react';

import PlacementHero from './PlacementHero';
import PlacementNext from './PlacementNext';
import SegmentedControl from '../ui/SegmentedControl';
import StatCounter from '../ui/StatCounter';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { placementDetails as content, placementTotals as T } from '../../data/placementContent';
import { toLakh } from '../../utils/format';
import cn from '../../utils/cn';

/**
 * Placement Details — the institute's year-by-year table.
 *
 * A metric switch re-draws one bar chart for trainees placed, placement
 * percentage, placement drives or salary package; bars ease between metrics
 * rather than jumping. Hovering (or focusing) a year highlights it in the chart
 * and the table together. The table keeps the published column names.
 */

const rupees = (v) => `₹${v.toLocaleString('en-IN')}/-`;

const METRICS = [
  { id: 'placed', label: 'Trainees placed', format: (v) => v.toLocaleString('en-IN') },
  { id: 'percentage', label: 'Placement %', format: (v) => `${v}%`, ceiling: 100 },
  { id: 'drives', label: 'Placement drives', format: (v) => String(v) },
  { id: 'salary', label: 'Salary package', format: (v) => `₹${toLakh(v)}` },
];

function Chart({ metric, hover, onHover }) {
  const rows = content.record;
  const m = METRICS.find((x) => x.id === metric);
  const values = rows.map((r) => r[metric]);
  const max = m.ceiling ?? Math.max(...values);
  const peak = Math.max(...values);
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

        <ul className="relative flex h-full items-end gap-2 sm:gap-5">
          {rows.map((r, i) => {
            const v = r[metric];
            const isPeak = v === peak;
            const isHover = hover === r.year;
            return (
              <li key={r.year} className="relative flex h-full flex-1 flex-col justify-end">
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
                  style={{ height: `${(v / max) * 100}%`, '--i': i }}
                >
                  <span
                    className={cn(
                      'absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.625rem] font-semibold tabular transition-[color,transform] duration-300 sm:text-[0.6875rem]',
                      isHover ? '-translate-y-0.5 text-navy-800' : 'text-ink-muted'
                    )}
                  >
                    {m.format(v)}
                  </span>
                </div>
                <span
                  className={cn(
                    'mt-2 text-center font-mono text-[0.6875rem] tabular transition-colors duration-300',
                    isHover ? 'text-navy-800' : 'text-ink-muted'
                  )}
                >
                  {r.year}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}

function Table({ hover, onHover }) {
  const c = content.columns;
  const rows = content.record;

  return (
    <>
      {/* Tablet and up: the published table */}
      <div className="hidden overflow-hidden rounded-panel border border-navy-100 bg-white sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">Satpuda ITI placement details, {T.first} to {T.last}</caption>
            <thead>
              <tr className="border-b border-navy-100 bg-canvas-soft">
                {['Sl.No.', c.year, c.drives, c.placed, c.percentage, c.salary].map((h, i) => (
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
                  <td className="px-4 py-4 text-right font-mono text-[0.875rem] font-semibold tabular text-navy-800 lg:px-6">
                    {r.placed.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    <span className="flex items-center justify-end gap-3">
                      <span aria-hidden="true" className="hidden h-1 w-16 overflow-hidden rounded-full bg-navy-100 md:block">
                        <span className="block h-full rounded-full bg-tech-500" style={{ width: `${r.percentage}%` }} />
                      </span>
                      <span className="font-mono text-[0.875rem] tabular text-navy-800">{r.percentage}%</span>
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-[0.875rem] tabular text-navy-700 lg:px-6">{rupees(r.salary)}</td>
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
              <span className="font-mono text-[0.875rem] font-semibold tabular text-royal">{r.percentage}%</span>
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-navy-50 pt-4">
              {[
                [c.drives, String(r.drives).padStart(2, '0')],
                [c.placed, r.placed.toLocaleString('en-IN')],
                [c.salary, rupees(r.salary)],
              ].map(([k, v], i) => (
                <div key={k} className={i === 2 ? 'col-span-2' : undefined}>
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
        <StatCounter tone="dark" value={T.placed} label="Trainees placed" note={`${T.first}–${T.last}`} />
        <StatCounter tone="dark" value={T.drives} label="Placement drives" note={`${T.first}–${T.last}`} />
        <StatCounter tone="dark" value={T.bestRate} suffix="%" label="Best placement %" note={String(T.bestRateYear)} />
        <StatCounter
          tone="dark"
          value={T.topPackage / 100000}
          decimals={1}
          prefix="₹"
          suffix=" L"
          label="Top salary package"
          note={rupees(T.topPackage)}
        />
      </div>
    </div>
  );
}

export function Details({ page }) {
  const [metric, setMetric] = useState('placed');
  const [hover, setHover] = useState(null);
  const chart = useReveal({ threshold: 0.12 });
  const table = useReveal({ threshold: 0.05 });

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
            <Table hover={hover} onHover={setHover} />
          </div>
          <p className="reveal mt-5 text-[0.8125rem] text-ink-soft" style={{ '--reveal-delay': '160ms' }}>
            Placement support is not a guarantee of employment.
          </p>
        </div>
      </section>

      <PlacementNext page={page} />
    </>
  );
}

export default Details;

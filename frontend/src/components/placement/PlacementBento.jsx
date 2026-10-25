import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

import { groupPlacements } from '../../data/groupPlacements';
import { getItiProfile } from '../../data/itiProfiles';
import { placementByYear, placementPeak, placementTotals, placementUpTo } from '../../data/placementRecord';
import { cn } from '../../utils/cn';

/**
 * The group's campus-drive record as a bento of white cards around one chosen
 * period: every year together (the default), or a single year.
 *
 * The large card counts the candidates selected, with one column per year
 * that rises in once revealed; a column (click, tap or the arrow keys) picks
 * that year and "All years" goes back. The cards beside it answer for the
 * same period — campus drives and turnout, each with every year as small
 * columns — and the wide card below breaks it down by ITI, each name linking
 * to that institute's page. Nothing moves on its own; figures count between
 * periods.
 *
 * Every figure comes from the group record (`placementRecord`), and the ITI
 * breakdown from its rows (`groupPlacements`). The latest year runs only to
 * the last drive listed, which the chart says. The full record is also a
 * table for assistive technology.
 */

const ROWS = groupPlacements;
const BY_YEAR = placementByYear;
/** Every year together, with the few drives that carry no date. */
const ALL = { ...placementTotals, year: null };
const PEAK = BY_YEAR.indexOf(placementPeak);
const MAX = {
  drives: Math.max(...BY_YEAR.map((r) => r.drives)),
  attended: Math.max(...BY_YEAR.map((r) => r.attended)),
  selected: Math.max(...BY_YEAR.map((r) => r.selected)),
};

const SPAN = `${placementTotals.first}–${placementTotals.last}`;
const UPTO = placementUpTo.en;

/**
 * One period's ITIs, most selected first. `selected` stays null for an ITI
 * that reported no selections in it, and such ITIs come last.
 */
function itisOf(year) {
  const totals = new Map();
  for (const r of ROWS) {
    if (year != null && r.year !== year) continue;
    const t = totals.get(r.iti) ?? { iti: r.iti, drives: 0, selected: null };
    t.drives += r.drives;
    if (r.selected != null) t.selected = (t.selected ?? 0) + r.selected;
    totals.set(r.iti, t);
  }
  return [...totals.values()].sort((a, b) => (b.selected ?? -1) - (a.selected ?? -1) || b.drives - a.drives);
}

const ITIS_ALL = itisOf(null);
const ITIS_BY_YEAR = BY_YEAR.map((r) => itisOf(r.year));

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const grouped = (n) => Math.round(n).toLocaleString('en-IN');

/**
 * A figure that counts from the one it showed last to its new value. Text is
 * written straight to the node, so React never renders per frame.
 */
function Tween({ value, format, duration = 650 }) {
  const ref = useRef(null);
  const shown = useRef(value);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const from = shown.current;
    if (from === value || prefersReducedMotion()) {
      shown.current = value;
      node.textContent = format(value, true);
      return undefined;
    }
    let frame = 0;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      shown.current = from + (value - from) * (1 - (1 - p) ** 4);
      node.textContent = p < 1 ? format(shown.current, false) : format(value, true);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, format, duration]);

  return <span ref={ref} className="tabular" />;
}

function Delta({ row, prev }) {
  if (row.year == null) {
    return (
      <span className="text-ink-soft">
        {BY_YEAR.length} years · {ITIS_ALL.length} ITIs
      </span>
    );
  }
  if (!prev) return <span className="text-ink-soft">First year on record</span>;
  const change = row.selected - prev.selected;
  const Icon = change > 0 ? ArrowUpRight : change < 0 ? ArrowDownRight : Minus;
  const tone = change > 0 ? 'text-tech-700' : change < 0 ? 'text-signal-600' : 'text-ink-soft';
  return (
    <span className="inline-flex items-center gap-1">
      <Icon aria-hidden="true" strokeWidth={2.25} className={`h-3.5 w-3.5 ${tone}`} />
      <span className={tone}>{change === 0 ? 'Level' : `${change > 0 ? '+' : '−'}${grouped(Math.abs(change))}`}</span>
      <span className="text-ink-soft">vs {prev.year}</span>
    </span>
  );
}

/**
 * Shared card shell: white, hairline border, a lift under the pointer. The
 * outer box rises in with the section (staggered by `delay`); the inner one
 * owns the hover lift, so the two transforms never fight.
 */
function Card({ className = '', delay = 0, children }) {
  return (
    <div className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>
      <div className="pb2-card relative flex h-full flex-col rounded-panel border border-navy-100 bg-white p-4 shadow-card sm:p-5">
        {children}
      </div>
    </div>
  );
}

const Label = ({ children }) => (
  <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">{children}</p>
);

/** Every year as a small column; the chosen one — or all of them — in red. */
function Minis({ field, active }) {
  return (
    <div aria-hidden="true" className="mt-auto flex h-12 items-end gap-1 pt-4">
      {BY_YEAR.map((r, i) => (
        <span
          key={r.year}
          className="pb2-mini flex-1 rounded-t-[3px]"
          data-on={active < 0 || i === active ? '' : undefined}
          style={{ height: `${Math.max((r[field] / MAX[field]) * 100, 4)}%` }}
        />
      ))}
    </div>
  );
}

/** Selected per year, one column each; the column is the year's button. */
function YearColumns({ active, onPick }) {
  const boxRef = useRef(null);

  return (
    <div
      ref={boxRef}
      role="group"
      aria-label="Choose a year"
      data-all={active < 0 ? '' : undefined}
      className="pb2-chart mt-6 flex gap-0.5 sm:gap-1"
    >
      {BY_YEAR.map((r, i) => (
        <button
          key={r.year}
          type="button"
          data-year={i}
          aria-pressed={i === active}
          aria-label={String(r.year)}
          onClick={() => onPick(i)}
          onKeyDown={(e) => {
            const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (!step) return;
            e.preventDefault();
            const to = (i + step + BY_YEAR.length) % BY_YEAR.length;
            onPick(to);
            boxRef.current?.querySelector(`[data-year="${to}"]`)?.focus();
          }}
          className="pb2-year pb2-col flex min-w-0 flex-1 flex-col items-center rounded-edge px-0.5 pt-1"
        >
          <span className="relative flex h-44 w-full items-end justify-center pt-5 sm:h-48">
            {i === PEAK && (
              <span className="absolute inset-x-0 top-1 text-center font-mono text-[0.5625rem] font-medium uppercase tracking-[0.1em] text-signal">
                Peak
              </span>
            )}
            <span
              className="pb2-bar block w-full max-w-[1.75rem] rounded-t-[3px]"
              style={{ height: `${Math.max((r.selected / MAX.selected) * 100, 1.5)}%`, '--i': i }}
            />
          </span>
          <span className="mt-2 font-mono text-[0.6875rem] tabular">
            <span className="sm:hidden">’{String(r.year).slice(2)}</span>
            <span className="hidden sm:inline">{r.year}</span>
          </span>
          <span aria-hidden="true" className="pb2-year-mark mb-1.5 mt-1 block h-[2px] w-4 rounded-full bg-signal" />
        </button>
      ))}
    </div>
  );
}

export function PlacementBento({ className = '' }) {
  /** Index into the years, or -1 for every year together. */
  const [active, setActive] = useState(-1);
  const all = active < 0;
  const period = all ? ALL : BY_YEAR[active];
  const prev = active > 0 ? BY_YEAR[active - 1] : null;
  const itis = all ? ITIS_ALL : ITIS_BY_YEAR[active];
  const itiMax = Math.max(1, ...itis.map((t) => t.selected ?? 0));
  const when = all ? SPAN : `in ${period.year}`;

  const pick = useCallback((i) => setActive(i), []);

  // The live sentence speaks only once the visitor has chosen a period.
  const touched = useRef(false);
  const [announce, setAnnounce] = useState(false);
  useEffect(() => {
    if (touched.current) setAnnounce(true);
    touched.current = true;
  }, [active]);

  return (
    <div className={className}>
      <p className="sr-only" aria-live={announce ? 'polite' : 'off'} aria-atomic="true">
        {all ? `All years, ${SPAN}` : period.year}: {grouped(period.selected)} candidates selected,{' '}
        {grouped(period.drives)} campus drives, {grouped(period.attended)} attended.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4">
        {/* Selected, year by year */}
        <Card className="col-span-2 sm:col-span-4 sm:row-span-2" delay={80}>
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
            <div>
              <Label>Candidates selected</Label>
              <p aria-hidden="true" className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-[2.5rem] font-semibold leading-none tracking-tight text-navy-800 sm:text-[2.875rem]">
                  <Tween value={period.selected} format={grouped} />
                </span>
                <span className="font-mono text-[0.75rem] tabular text-ink-muted">{when}</span>
              </p>
              <p key={active} aria-hidden="true" className="pb2-rise mt-2 font-mono text-[0.6875rem] tabular">
                <Delta row={period} prev={prev} />
              </p>
            </div>
            <button
              type="button"
              aria-pressed={all}
              onClick={() => pick(-1)}
              className={cn(
                'inline-flex min-h-[2.25rem] items-center rounded-full border px-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors duration-200',
                all
                  ? 'border-navy-800 bg-navy-800 text-white'
                  : 'border-navy-100 text-ink-muted hover:border-navy-300 hover:text-navy-800'
              )}
            >
              All years
            </button>
          </div>

          <div className="mt-auto">
            <YearColumns active={active} onPick={pick} />
            <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft">
              Record up to {UPTO}
            </p>
          </div>
        </Card>

        {/* Campus drives */}
        <Card className="sm:col-span-2" delay={180}>
          <Label>Campus drives</Label>
          <p aria-hidden="true" className="mt-2 font-display text-[2rem] font-semibold leading-none tracking-tight text-navy-800 sm:text-[2.25rem]">
            <Tween value={period.drives} format={grouped} />
          </p>
          <p aria-hidden="true" className="mt-1.5 font-mono text-[0.6875rem] tabular text-ink-muted">{when}</p>
          <Minis field="drives" active={active} />
        </Card>

        {/* Turnout */}
        <Card className="sm:col-span-2" delay={260}>
          <Label>Candidates attended</Label>
          <p aria-hidden="true" className="mt-2 font-display text-[2rem] font-semibold leading-none tracking-tight text-navy-800 sm:text-[2.25rem]">
            <Tween value={period.attended} format={grouped} />
          </p>
          <p aria-hidden="true" className="mt-1.5 font-mono text-[0.6875rem] tabular text-ink-muted">{when}</p>
          <Minis field="attended" active={active} />
        </Card>

        {/* By ITI */}
        <Card className="col-span-2 sm:col-span-6" delay={340}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <Label>Selected by ITI</Label>
            <p className="font-mono text-[0.6875rem] tabular text-ink-muted">
              {all ? SPAN : period.year} · {itis.length} ITIs
            </p>
          </div>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {itis.map((t) => {
              const inst = getItiProfile(t.iti);
              return (
                <li key={t.iti} className="grid grid-cols-[minmax(0,6.5rem)_1fr_3.5rem] items-center gap-x-3">
                  <span className="min-w-0">
                    <Link
                      to={inst.path}
                      className="block truncate text-[0.875rem] font-semibold text-navy-800 transition-colors duration-200 hover:text-signal"
                    >
                      {inst.namePlace}
                    </Link>
                    <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft">
                      {t.drives} {t.drives === 1 ? 'drive' : 'drives'}
                    </span>
                  </span>
                  <span aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-navy-50">
                    <span
                      className="pb2-iti-bar block h-full rounded-full bg-navy-600"
                      style={{ width: `${((t.selected ?? 0) / itiMax) * 100}%` }}
                    />
                  </span>
                  <span className="text-right font-display text-[1rem] font-semibold tabular text-navy-800">
                    {t.selected == null ? (
                      <>
                        <span aria-hidden="true" className="text-ink-soft">—</span>
                        <span className="sr-only">not reported</span>
                      </>
                    ) : (
                      grouped(t.selected)
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* The record in full, for assistive technology. */}
      <table className="sr-only">
        <caption>Satpuda group campus drives by year, all ITIs, up to {UPTO}</caption>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Drives</th>
            <th scope="col">Attended</th>
            <th scope="col">Selected</th>
          </tr>
        </thead>
        <tbody>
          {BY_YEAR.map((r) => (
            <tr key={r.year}>
              <th scope="row">{r.year}</th>
              <td>{r.drives}</td>
              <td>{r.attended}</td>
              <td>{r.selected}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">All years</th>
            <td>{ALL.drives}</td>
            <td>{ALL.attended}</td>
            <td>{ALL.selected}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PlacementBento;

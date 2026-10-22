import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

import Odometer from '../ui/Odometer';
import { placement } from '../../data/satpudaData';
import { toLakh } from '../../utils/format';

/**
 * The placement record as a bento of white cards around one chosen year.
 *
 * The large card is the placement-rate trend — an area chart that draws
 * itself in once revealed, with the peak year marked. Choosing a year
 * (its button, a tap, the arrow keys, or a mouse moving across the chart)
 * slides the marker there, and the three cards beside it answer for that
 * year: trainees placed (with every year's count as small columns), campus
 * drives (one dot per drive) and the package (a marker on the range the six
 * years span). Nothing moves on its own; the figures count between years.
 *
 * Shape follows the ui-ux-pro-max guidance this was built from: a bento grid
 * of varied card sizes, a line/area chart for a short time series, motion
 * limited to the chart's draw-in and the changes the visitor asks for,
 * selection that never depends on hover alone, and the full record as a
 * table for assistive technology. Every figure is from the published
 * year-wise record; changes and ranges are worked out from it.
 */

const ROWS = placement.record;
const LAST = ROWS.length - 1;
const PEAK = ROWS.reduce((best, r, i) => (r.percentage > ROWS[best].percentage ? i : best), 0);
const RATE_MIN = Math.min(...ROWS.map((r) => r.percentage));
const RATE_MAX = Math.max(...ROWS.map((r) => r.percentage));
const MAX_PLACED = Math.max(...ROWS.map((r) => r.placed));
const MAX_DRIVES = Math.max(...ROWS.map((r) => r.drives));
const SAL_MIN = Math.min(...ROWS.map((r) => r.salary));
const SAL_MAX = Math.max(...ROWS.map((r) => r.salary));

/* Chart frame, in CSS pixels. The rate axis runs 80–100%. */
const H = 210;
const PAD = { l: 38, r: 16, t: 38, b: 12 };
const Y_LO = 80;
const Y_HI = 100;
const GRID = [80, 90, 100];

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const grouped = (n) => Math.round(n).toLocaleString('en-IN');
const rupees = (n, done) => `₹${done ? toLakh(n) : `${(n / 100000).toFixed(2)} L`}`;

/** Monotone cubic through the points (never overshoots a value). */
function monotonePath(pts) {
  const n = pts.length;
  const m = [];
  for (let i = 0; i < n - 1; i += 1) m.push((pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]));
  const t = pts.map((_, i) => {
    if (i === 0) return m[0];
    if (i === n - 1) return m[n - 2];
    return m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  });
  for (let i = 0; i < n - 1; i += 1) {
    if (m[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
    } else {
      const a = t[i] / m[i];
      const b = t[i + 1] / m[i];
      const s = a * a + b * b;
      if (s > 9) {
        const k = 3 / Math.sqrt(s);
        t[i] = k * a * m[i];
        t[i + 1] = k * b * m[i];
      }
    }
  }
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i += 1) {
    const h = (pts[i + 1][0] - pts[i][0]) / 3;
    d += ` C${pts[i][0] + h},${pts[i][1] + t[i] * h} ${pts[i + 1][0] - h},${pts[i + 1][1] - t[i + 1] * h} ${pts[i + 1][0]},${pts[i + 1][1]}`;
  }
  return d;
}

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
  if (!prev) return <span className="text-ink-soft">First year on record</span>;
  const change = row.percentage - prev.percentage;
  const Icon = change > 0 ? ArrowUpRight : change < 0 ? ArrowDownRight : Minus;
  const tone = change > 0 ? 'text-tech-700' : change < 0 ? 'text-signal-600' : 'text-ink-soft';
  return (
    <span className="inline-flex items-center gap-1">
      <Icon aria-hidden="true" strokeWidth={2.25} className={`h-3.5 w-3.5 ${tone}`} />
      <span className={tone}>{change === 0 ? 'Level' : `${change > 0 ? '+' : '−'}${Math.abs(change)} pts`}</span>
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

/** The rate trend: area, line, points, the peak, and the chosen year. */
function TrendChart({ active, onPick }) {
  const boxRef = useRef(null);
  const [w, setW] = useState(0);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const measure = () => setW(Math.round(box.clientWidth));
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  const x = (i) => PAD.l + (i * (w - PAD.l - PAD.r)) / LAST;
  const y = (v) => PAD.t + ((Y_HI - v) / (Y_HI - Y_LO)) * (H - PAD.t - PAD.b);
  const pts = ROWS.map((r, i) => [x(i), y(r.percentage)]);
  const line = w ? monotonePath(pts) : '';
  const area = w ? `${line} L${x(LAST)},${H - PAD.b} L${x(0)},${H - PAD.b} Z` : '';
  const [ax, ay] = pts[active] ?? [0, 0];
  const half = (w - PAD.l - PAD.r) / LAST / 2;

  // A mouse moving across the chart picks the year under it.
  const onScrub = (e, i) => {
    if (e.pointerType === 'mouse') onPick(i);
  };

  return (
    <div ref={boxRef} className="relative mt-4" style={{ height: H + 48 }}>
      {w > 0 && (
        <svg width={w} height={H} aria-hidden="true" focusable="false" className="block overflow-visible">
          <defs>
            <linearGradient id="pb2-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1B4680" stopOpacity="0.18" />
              <stop offset="1" stopColor="#1B4680" stopOpacity="0" />
            </linearGradient>
          </defs>

          {GRID.map((g) => (
            <g key={g}>
              <line x1={PAD.l} x2={w - PAD.r} y1={y(g)} y2={y(g)} className="stroke-navy-100" strokeWidth="1" />
              <text x="0" y={y(g) + 3.5} className="fill-ink-soft font-mono text-[0.625rem]">
                {g}%
              </text>
            </g>
          ))}

          {/* Guide under the chosen year */}
          <line
            x1="0"
            x2="0"
            y1={PAD.t - 6}
            y2={H - PAD.b}
            className="pb2-glide stroke-navy-200"
            strokeWidth="1"
            style={{ transform: `translateX(${ax}px)` }}
          />

          <path d={area} fill="url(#pb2-area)" className="pb2-area" />
          <path d={line} pathLength="1" fill="none" strokeWidth="2.25" strokeLinecap="round" className="pb2-line stroke-navy-600" />

          {pts.map(([px, py], i) => (
            <circle
              key={ROWS[i].year}
              cx={px}
              cy={py}
              r="4"
              strokeWidth="2"
              className="pb2-dot fill-white stroke-navy-600"
              style={{ '--i': i }}
            />
          ))}

          {/* Peak label, unless the peak is the chosen year */}
          {active !== PEAK && (
            <text
              x={pts[PEAK][0]}
              y={pts[PEAK][1] - 12}
              textAnchor="middle"
              className="pb2-peak fill-signal font-mono text-[0.5625rem] font-medium uppercase tracking-[0.14em]"
            >
              Peak
            </text>
          )}

          {/* The chosen year: halo, marker and value pill glide together */}
          <g className="pb2-glide" style={{ transform: `translate(${ax}px, ${ay}px)` }}>
            <circle key={active} r="12" className="pb2-halo fill-signal" />
            <circle r="6" strokeWidth="2.5" className="fill-signal stroke-white" />
            <g transform="translate(0,-30)">
              <rect x="-22" y="-11" width="44" height="22" rx="4" className="fill-navy-800" />
              <text y="4" textAnchor="middle" className="fill-white font-mono text-[0.6875rem] font-medium">
                {ROWS[active].percentage}%
              </text>
            </g>
          </g>

          {/* Mouse scrub targets, one band per year */}
          {pts.map(([px], i) => (
            <rect
              key={ROWS[i].year}
              x={px - half}
              y="0"
              width={half * 2}
              height={H}
              fill="transparent"
              onPointerEnter={(e) => onScrub(e, i)}
            />
          ))}
        </svg>
      )}

      {/* Year buttons under their points — the way to choose by tap or key */}
      {w > 0 &&
        ROWS.map((r, i) => (
          <button
            key={r.year}
            type="button"
            data-year={i}
            aria-pressed={i === active}
            onClick={() => onPick(i)}
            onKeyDown={(e) => {
              const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
              if (!step) return;
              e.preventDefault();
              const to = (i + step + ROWS.length) % ROWS.length;
              onPick(to);
              boxRef.current?.querySelector(`[data-year="${to}"]`)?.focus();
            }}
            className="pb2-year absolute bottom-0 flex h-11 w-12 -translate-x-1/2 flex-col items-center justify-center rounded-edge font-mono text-[0.6875rem] tabular"
            style={{ left: x(i) }}
          >
            {r.year}
            <span aria-hidden="true" className="pb2-year-mark mt-1 block h-[2px] w-4 rounded-full bg-signal" />
          </button>
        ))}
    </div>
  );
}

export function PlacementBento({ className = '' }) {
  const [active, setActive] = useState(LAST);
  const row = ROWS[active];
  const prev = ROWS[active - 1] ?? null;
  const salaryAt = (s) => ((s - SAL_MIN) / (SAL_MAX - SAL_MIN)) * 100;

  const pick = useCallback((i) => setActive(i), []);

  // The live sentence speaks only once the visitor has chosen a year.
  const touched = useRef(false);
  const [announce, setAnnounce] = useState(false);
  useEffect(() => {
    if (touched.current) setAnnounce(true);
    touched.current = true;
  }, [active]);

  return (
    <div className={className}>
      <p className="sr-only" aria-live={announce ? 'polite' : 'off'} aria-atomic="true">
        {row.year}: {row.percentage}% placement rate, {grouped(row.placed)} trainees placed, {row.drives} campus drives,
        package ₹{toLakh(row.salary)}.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4">
        {/* Rate trend */}
        <Card className="col-span-2 sm:col-span-4 sm:row-span-2" delay={80}>
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div>
              <Label>Placement rate</Label>
              <p aria-hidden="true" className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-[2.5rem] font-semibold leading-none tracking-tight text-navy-800 sm:text-[2.875rem]">
                  <span className="tabular">
                    <Odometer value={String(row.percentage)} />
                  </span>
                  <span className="text-signal">%</span>
                </span>
                <span className="font-mono text-[0.75rem] tabular text-ink-muted">in {row.year}</span>
              </p>
              <p key={row.year} aria-hidden="true" className="pb2-rise mt-2 font-mono text-[0.6875rem] tabular">
                <Delta row={row} prev={prev} />
              </p>
            </div>
            <p className="max-w-[13rem] text-[0.8125rem] leading-snug text-ink-muted sm:text-right">
              Between <span className="font-semibold text-navy-800">{RATE_MIN}%</span> and{' '}
              <span className="font-semibold text-navy-800">{RATE_MAX}%</span> every year, {ROWS[0].year}–{ROWS[LAST].year}.
            </p>
          </div>

          <div role="group" aria-label="Choose a year" className="mt-auto">
            <TrendChart active={active} onPick={pick} />
          </div>
        </Card>

        {/* Trainees placed */}
        <Card className="sm:col-span-2" delay={180}>
          <Label>Trainees placed</Label>
          <p aria-hidden="true" className="mt-2 font-display text-[2rem] font-semibold leading-none tracking-tight text-navy-800 sm:text-[2.25rem]">
            <Tween value={row.placed} format={grouped} />
          </p>
          <p aria-hidden="true" className="mt-1.5 font-mono text-[0.6875rem] tabular text-ink-muted">in {row.year}</p>
          <div aria-hidden="true" className="mt-auto flex h-12 items-end gap-1.5 pt-4">
            {ROWS.map((r, i) => (
              <span
                key={r.year}
                className="pb2-mini flex-1 rounded-t-[3px]"
                data-on={i === active ? '' : undefined}
                style={{ height: `${(r.placed / MAX_PLACED) * 100}%`, '--i': i }}
              />
            ))}
          </div>
        </Card>

        {/* Campus drives */}
        <Card className="sm:col-span-2" delay={260}>
          <Label>Campus drives</Label>
          <p aria-hidden="true" className="mt-2 font-display text-[2rem] font-semibold leading-none tracking-tight text-navy-800 sm:text-[2.25rem]">
            <Tween value={row.drives} format={grouped} />
          </p>
          <p aria-hidden="true" className="mt-1.5 font-mono text-[0.6875rem] tabular text-ink-muted">in {row.year} · one dot each</p>
          <div aria-hidden="true" className="mt-auto flex flex-wrap gap-1 pt-4">
            {Array.from({ length: MAX_DRIVES }, (_, i) => (
              <span key={i} className="pb2-drive" data-on={i < row.drives ? '' : undefined} style={{ '--i': i }} />
            ))}
          </div>
        </Card>

        {/* Package */}
        <Card className="col-span-2 sm:col-span-6" delay={340}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div className="shrink-0">
              <Label>Package</Label>
              <p aria-hidden="true" className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-[2rem] font-semibold leading-none tracking-tight text-navy-800 sm:text-[2.25rem]">
                  <Tween value={row.salary} format={rupees} />
                </span>
                <span className="font-mono text-[0.75rem] tabular text-ink-muted">in {row.year}</span>
              </p>
            </div>

            <div aria-hidden="true" className="min-w-0 flex-1 pb-1">
              <div className="relative h-6">
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-navy-100" />
                {ROWS.map((r) => (
                  <span
                    key={r.year}
                    className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-navy-300"
                    style={{ left: `${salaryAt(r.salary)}%` }}
                  />
                ))}
                <span className="pb2-glide absolute inset-0" style={{ transform: `translateX(${salaryAt(row.salary)}%)` }}>
                  <span className="absolute left-0 top-1/2 block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-signal shadow-[0_2px_8px_rgba(224,27,36,0.45)]" />
                </span>
              </div>
              <div className="mt-2 flex justify-between font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft">
                <span>Lowest ₹{toLakh(SAL_MIN)}</span>
                <span>Highest ₹{toLakh(SAL_MAX)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* The record in full, for assistive technology. */}
      <table className="sr-only">
        <caption>Satpuda ITI placement record by year</caption>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Drives</th>
            <th scope="col">Placed</th>
            <th scope="col">Package</th>
            <th scope="col">Rate</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.year}>
              <th scope="row">{r.year}</th>
              <td>{r.drives}</td>
              <td>{r.placed}</td>
              <td>₹{toLakh(r.salary)}</td>
              <td>{r.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlacementBento;

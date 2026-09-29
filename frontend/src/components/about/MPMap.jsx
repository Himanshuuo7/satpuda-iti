import { useMemo, useState } from 'react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { headOffice, itiInstitutes } from '../../data/itiInstitutes';
import { tradeById } from '../../data/trades';
import { telHref } from '../../utils/format';
import cn from '../../utils/cn';

/**
 * Madhya Pradesh presence — a schematic SVG map.
 *
 * The state outline is a deliberately simplified polygon (a few dozen boundary
 * points), not survey geometry, and the section says so. Pins are placed from
 * each record's town-level `mapPoint`; institutes within a few kilometres of
 * one another share a pin. Pins are real HTML buttons laid over the SVG so they
 * take focus, show the global focus ring and work with a keyboard.
 */

// Simplified MP boundary, [lng, lat], clockwise from the south-west.
const OUTLINE = [
  [74.1, 22.3], [74.3, 22.9], [74.6, 23.2], [74.9, 23.6], [74.7, 24.0], [74.6, 24.5], [74.8, 24.8],
  [75.2, 24.7], [75.5, 24.9], [75.9, 24.4], [75.7, 24.1], [76.1, 24.0], [76.5, 24.2], [76.8, 24.6],
  [77.0, 24.9], [77.1, 25.4], [76.9, 25.8], [77.3, 26.1], [77.6, 26.5], [78.1, 26.8], [78.8, 26.8],
  [79.1, 26.4], [78.8, 26.0], [78.5, 25.6], [78.3, 25.2], [78.3, 24.6], [78.6, 24.3], [78.9, 24.5],
  [79.0, 25.0], [79.5, 25.1], [80.0, 25.3], [80.5, 25.2], [80.9, 25.1], [81.3, 25.2], [81.8, 25.1],
  [82.3, 24.8], [82.8, 24.2], [82.7, 23.9], [82.3, 23.6], [81.9, 23.2], [81.6, 22.9], [81.7, 22.5],
  [81.3, 22.3], [81.0, 22.0], [80.7, 21.6], [80.4, 21.3], [80.1, 21.6], [79.6, 21.6], [79.2, 21.5],
  [78.9, 21.6], [78.4, 21.4], [78.0, 21.3], [77.5, 21.4], [77.1, 21.1], [76.6, 21.2], [76.2, 21.3],
  [75.6, 21.4], [75.0, 21.5], [74.5, 21.7], [74.2, 21.9],
];

const W = 920;
const H = 664;
const LNG0 = 73.8;
const LAT0 = 27.1;
const K = 100;
const project = ([lng, lat]) => [(lng - LNG0) * K, (LAT0 - lat) * K * 1.08];

const OUTLINE_D = `M ${OUTLINE.map((p) => project(p).map((n) => n.toFixed(1)).join(' ')).join(' L ')} Z`;

/** Groups institutes whose pins would overlap (within ~0.12°). */
function cluster(list) {
  const groups = [];
  list.forEach((inst) => {
    const { lat, lng } = inst.mapPoint;
    const g = groups.find((c) => Math.hypot(c.lat - lat, c.lng - lng) < 0.12);
    if (g) g.items.push(inst);
    else groups.push({ lat, lng, items: [inst] });
  });
  return groups.map((g) => {
    const [x, y] = project([g.lng, g.lat]);
    return {
      id: g.items.map((i) => i.id).join('+'),
      x,
      y,
      items: g.items,
      district: g.items[0].district,
      label: g.items.map((i) => i.shortName).join(' · '),
      isHQ: g.items.some((i) => i.id === headOffice.id),
    };
  });
}

export function MPMap({ onView }) {
  const ref = useReveal({ threshold: 0.2 });
  const clusters = useMemo(() => cluster(itiInstitutes), []);
  const hq = clusters.find((c) => c.isHQ);
  const [activeId, setActiveId] = useState(hq.id);
  const [hoverId, setHoverId] = useState(null);
  const active = clusters.find((c) => c.id === activeId) ?? hq;

  return (
    <section
      id="presence"
      ref={ref}
      aria-labelledby="presence-title"
      className="about-grain about-grain-dark relative scroll-mt-[var(--header-h)] overflow-hidden bg-navy-900 py-20 sm:py-26 lg:py-30"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_40%,rgba(11,22,201,0.28),transparent_70%)]"
      />

      <div className="shell relative">
        <SectionHeading
          id="presence-title"
          tone="dark"
          eyebrow="Presence across MP"
          title={
            <>
              {clusters.length} locations. <span className="text-tech">{new Set(itiInstitutes.map((i) => i.district)).size} districts.</span>
            </>
          }
          lede="From the head office at Manjhapur, Balaghat, the network runs west to Itarsi and north to Rewa and Mauganj. Select a location to see the institutes there."
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Map */}
          <div className="lg:col-span-8">
            <div className="relative" style={{ aspectRatio: `${W}/${H}` }}>
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
                <defs>
                  <pattern id="mp-dots" width="14" height="14" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#16C7D9" opacity="0.22" />
                  </pattern>
                </defs>
                <path d={OUTLINE_D} fill="url(#mp-dots)" />
                <path
                  d={OUTLINE_D}
                  pathLength="1"
                  className="about-map-outline"
                  fill="none"
                  stroke="#5FDFEE"
                  strokeOpacity="0.7"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* Links from head office */}
                {clusters
                  .filter((c) => !c.isHQ)
                  .map((c, i) => {
                    const mx = (hq.x + c.x) / 2;
                    const my = (hq.y + c.y) / 2 - Math.hypot(c.x - hq.x, c.y - hq.y) * 0.22;
                    const on = c.id === activeId || c.id === hoverId;
                    return (
                      <path
                        key={c.id}
                        d={`M ${hq.x} ${hq.y} Q ${mx} ${my} ${c.x} ${c.y}`}
                        pathLength="1"
                        className="about-map-link"
                        style={{ '--i': i }}
                        fill="none"
                        stroke={on ? '#E01B24' : '#16C7D9'}
                        strokeOpacity={on ? 0.95 : 0.45}
                        strokeWidth={on ? 1.75 : 1}
                      />
                    );
                  })}
                <text x={W - 16} y={H - 14} textAnchor="end" fill="#A9C2E3" fontSize="11" fontFamily='"JetBrains Mono", monospace' letterSpacing="2">
                  MADHYA PRADESH · SCHEMATIC
                </text>
              </svg>

              {clusters.map((c, i) => {
                const on = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    onMouseEnter={() => setHoverId(c.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onFocus={() => setHoverId(c.id)}
                    onBlur={() => setHoverId(null)}
                    aria-pressed={on}
                    aria-label={`${c.label}, ${c.district} — ${c.items.length} institute${c.items.length > 1 ? 's' : ''}`}
                    className="about-map-pin group absolute grid h-8 w-8 place-items-center rounded-full"
                    style={{ left: `${(c.x / W) * 100}%`, top: `${(c.y / H) * 100}%`, '--i': i }}
                  >
                    <span
                      aria-hidden="true"
                      className={cn('about-pulse absolute inset-2 rounded-full', on ? 'bg-signal' : 'bg-tech')}
                      style={{ animationDelay: `${i * 180}ms` }}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        'relative grid place-items-center rounded-full border-2 font-mono text-[0.5625rem] font-semibold text-white transition-colors duration-200',
                        c.isHQ ? 'h-6 w-6' : 'h-5 w-5',
                        on ? 'border-white bg-signal' : 'border-navy-900 bg-tech-500 group-hover:bg-tech-400'
                      )}
                    >
                      {c.items.length > 1 ? c.items.length : ''}
                    </span>
                    {/* Hover / focus label */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-sharp bg-white px-2 py-1 text-[0.6875rem] font-semibold text-navy-800 shadow-card transition-opacity duration-200',
                        hoverId === c.id ? 'opacity-100' : 'opacity-0'
                      )}
                    >
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-navy-200/70">
              Simplified state outline · pins placed at town level, not exact campus locations
            </p>
          </div>

          {/* Info card */}
          <div className="lg:col-span-4">
            <div aria-live="polite" className="rounded-panel border border-white/12 bg-navy-800/80 p-6">
              <p className="flex items-center gap-2 font-mono text-label uppercase text-tech">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-signal" />
                {active.district} district {active.isHQ && '· Head office'}
              </p>
              <h3 className="mt-3 font-display text-[1.5rem] font-semibold leading-tight text-white">{active.label}</h3>
              <ul className="mt-5 space-y-4">
                {active.items.map((inst) => (
                  <li key={inst.id} className="border-t border-white/10 pt-4">
                    <p className="font-medium text-white">{inst.name}</p>
                    <p className="mt-1 text-[0.8125rem] text-navy-100/70">
                      {inst.trades.length
                        ? inst.trades.map((t) => tradeById[t.id]?.name).join(', ')
                        : 'Contact the campus for trades'}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <a href={telHref(inst.phone)} className="inline-flex min-h-[2.25rem] items-center gap-1.5 font-mono text-[0.8125rem] tabular text-navy-100 hover:text-tech">
                        <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                        {inst.phone}
                      </a>
                      <button
                        type="button"
                        onClick={() => onView(inst)}
                        className="group inline-flex min-h-[2.25rem] items-center gap-1.5 text-[0.8125rem] font-semibold text-white hover:text-tech"
                      >
                        Details<span className="sr-only">: {inst.name}</span>
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location index — also the fastest way to navigate on small screens */}
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="All locations">
              {clusters.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    aria-pressed={c.id === activeId}
                    className={cn(
                      'min-h-[2.25rem] rounded-full border px-3 text-[0.75rem] font-medium transition-colors',
                      c.id === activeId
                        ? 'border-signal bg-signal text-white'
                        : 'border-white/15 text-navy-100 hover:border-tech hover:text-white'
                    )}
                  >
                    {c.items.length > 1 ? `${c.items[0].shortName} +${c.items.length - 1}` : c.items[0].shortName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MPMap;

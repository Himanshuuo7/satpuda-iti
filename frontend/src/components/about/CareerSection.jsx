import { Briefcase, Compass, Factory, HardHat, Lightbulb, TrendingUp } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { placement } from '../../data/satpudaData';
import {
  placementByYear,
  placementLatest,
  placementPeak,
  placementSourceHi,
  placementTotals,
} from '../../data/placementRecord';
import cn from '../../utils/cn';

/**
 * Industry & career.
 *
 * Six pillars of career support. The placement record is the group's — the
 * campus drives of every Satpuda ITI that sent its record — charted as one
 * series (candidates selected) with the drives, turnout and ITIs in each
 * bar's tooltip and a full table view beneath. The language is "support" and
 * "record" — never a guarantee.
 */

const PILLARS = [
  {
    icon: Factory,
    title: 'Industry exposure',
    body: 'समय-समय पर उद्योग भ्रमण, जिनमें शिक्षक और विद्यार्थी मिलकर उद्योगों की वास्तविक समस्याएँ सुलझाते हैं।',
  },
  {
    icon: HardHat,
    title: 'On-the-job training',
    body: 'फील्ड का अनुभव, हाथों से व्यावहारिक अभ्यास और औद्योगिक प्रोजेक्ट सीखने की प्रक्रिया का हिस्सा हैं।',
  },
  {
    icon: TrendingUp,
    title: 'Skill development',
    body: 'NCVT ट्रेड के साथ-साथ STEP (कौशल संवर्धन प्रशिक्षण कार्यक्रम) और NSDC कोर्स।',
  },
  {
    icon: Briefcase,
    title: 'Placement support',
    body: 'प्लेसमेंट सेल कैंपस इंटरव्यू आयोजित करता है और स्थानीय उद्योगों से उनकी कार्यबल संबंधी ज़रूरतों के लिए संपर्क करता है।',
  },
  {
    icon: Lightbulb,
    title: 'Entrepreneurship',
    body: 'स्वरोज़गार शिविरों में सरकारी स्वरोज़गार योजनाओं की जानकारी दी जाती है।',
  },
  {
    icon: Compass,
    title: 'Career development',
    body: 'निजी और सरकारी क्षेत्र के विशेषज्ञों से काउंसलिंग, अतिथि शिक्षक, और स्थानीय रोज़गार के अवसरों पर सेमिनार।',
  },
];

/** Gridlines every 1,000, up to the first one above the best year. */
const STEP = 1000;
const SCALE_MAX = Math.ceil(placementPeak.selected / STEP) * STEP;
const GRID = Array.from({ length: SCALE_MAX / STEP + 1 }, (_, i) => i * STEP);

const n = (v) => v.toLocaleString('en-IN');
const count = (v, one, many) => `${n(v)} ${v === 1 ? one : many}`;

function PlacementChart() {
  const rows = placementByYear;
  const peak = placementPeak;
  const latest = placementLatest;

  return (
    <figure className="reveal rounded-panel border border-navy-100 bg-white p-5 sm:p-7" style={{ '--reveal-delay': '120ms' }}>
      <figcaption>
        <p className="font-mono text-label uppercase text-ink-soft">Placement record · candidates selected per year</p>
        <p className="mt-2 font-display text-[1.25rem] font-semibold text-navy-800">
          {n(placementTotals.selected)} candidates selected, {placementTotals.first}–{placementTotals.last}
        </p>
      </figcaption>

      <div className="relative mt-8 h-60 pl-10">
        {/* Grid + axis */}
        {GRID.map((g) => (
          <div
            key={g}
            aria-hidden="true"
            className="absolute left-10 right-0 border-t border-navy-50"
            style={{ bottom: `${(g / SCALE_MAX) * 100}%` }}
          >
            <span className="absolute -left-10 -translate-y-1/2 font-mono text-[0.625rem] tabular text-ink-soft">
              {g.toLocaleString('en-IN')}
            </span>
          </div>
        ))}

        <ul className="relative flex h-full items-end gap-1.5 sm:gap-3">
          {rows.map((r, i) => {
            const label = r === peak || r === latest;
            return (
              <li key={r.year} className="group relative flex h-full min-w-0 flex-1 flex-col justify-end">
                <div
                  tabIndex={0}
                  aria-label={`${r.year}: ${n(r.selected)} selected, ${count(r.drives, 'drive', 'drives')}, ${n(r.attended)} attended, ${count(r.itis, 'ITI', 'ITIs')}`}
                  className="about-bar relative mx-auto w-full max-w-[3rem] rounded-t-[4px] bg-royal outline-none transition-colors duration-200 hover:bg-signal focus-visible:bg-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech"
                  style={{ height: `${(r.selected / SCALE_MAX) * 100}%`, '--i': i }}
                >
                  {label && (
                    <span
                      className={cn(
                        'absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[0.6875rem] font-semibold tabular text-navy-800 transition-opacity group-hover:opacity-0 group-focus-within:opacity-0',
                        // On a phone the columns are too narrow for two labels side by side.
                        r !== peak && 'hidden sm:block'
                      )}
                    >
                      {n(r.selected)}
                    </span>
                  )}
                </div>
                {/* Tooltip */}
                <div
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute z-10 mb-2 w-40 rounded-edge bg-navy-900 p-3 text-left text-white opacity-0 shadow-deep transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100',
                    // Edge bars anchor their tooltip inward so it never leaves the chart.
                    i === 0 ? 'left-0' : i === rows.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                  )}
                  style={{ bottom: `${(r.selected / SCALE_MAX) * 100}%` }}
                >
                  <p className="font-mono text-[0.625rem] tracking-[0.14em] text-tech">{r.year}</p>
                  <p className="mt-1 font-display text-[1.125rem] font-semibold tabular">{n(r.selected)} selected</p>
                  <p className="mt-1 text-[0.75rem] text-navy-100/80">
                    {count(r.drives, 'drive', 'drives')} · {n(r.attended)} attended · {count(r.itis, 'ITI', 'ITIs')}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Years sit below the plot, so every bar is measured from the zero line. */}
      <div aria-hidden="true" className="mt-2 flex gap-1.5 pl-10 sm:gap-3">
        {rows.map((r) => (
          <span key={r.year} className="min-w-0 flex-1 text-center font-mono text-[0.6875rem] tabular text-ink-muted">
            <span className="sm:hidden">’{String(r.year).slice(2)}</span>
            <span className="hidden sm:inline">{r.year}</span>
          </span>
        ))}
      </div>

      <details className="group/table mt-6 border-t border-navy-50 pt-4">
        <summary className="cursor-pointer list-none text-[0.8125rem] font-medium text-navy-700 hover:text-royal [&::-webkit-details-marker]:hidden">
          <span className="group-open/table:hidden">Show as table</span>
          <span className="hidden group-open/table:inline">Hide table</span>
        </summary>
        <div className="relative mt-3 overflow-x-auto">
          <table className="w-full min-w-[28rem] text-[0.8125rem]">
            <thead>
              <tr className="border-b border-navy-100 text-left text-ink-soft">
                <th scope="col" className="py-2 pr-3 font-medium">Year</th>
                <th scope="col" className="py-2 pr-3 text-right font-medium">Drives</th>
                <th scope="col" className="py-2 pr-3 text-right font-medium">Attended</th>
                <th scope="col" className="py-2 pr-3 text-right font-medium">Selected</th>
                <th scope="col" className="py-2 text-right font-medium">ITIs</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular text-navy-800">
              {rows.map((r) => (
                <tr key={r.year} className="border-b border-navy-50">
                  <th scope="row" className="py-2 pr-3 text-left font-medium">{r.year}</th>
                  <td className="py-2 pr-3 text-right">{r.drives}</td>
                  <td className="py-2 pr-3 text-right">{n(r.attended)}</td>
                  <td className="py-2 pr-3 text-right">{n(r.selected)}</td>
                  <td className="py-2 text-right">{r.itis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p lang="hi" className="mt-4 text-[0.75rem] leading-relaxed text-ink-soft">
        {placementSourceHi} प्लेसमेंट सहायता का अर्थ नौकरी की गारंटी नहीं है।
      </p>
    </figure>
  );
}

export function CareerSection() {
  const ref = useReveal({ threshold: 0.08 });

  return (
    <section
      id="career"
      ref={ref}
      aria-labelledby="career-title"
      className="relative scroll-mt-[var(--header-h)] bg-canvas-soft py-20 sm:py-26 lg:py-30"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            id="career-title"
            eyebrow="Industry & career"
            title={
              <>
                From the workshop <span className="text-royal">to the workplace.</span>
              </>
            }
            lede={placement.interface}
          />

          <ul className="mt-10 grid gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <li
                key={p.title}
                className="reveal group bg-white p-5 transition-colors duration-300 hover:bg-canvas-soft"
                style={{ '--reveal-delay': `${i * 50}ms` }}
              >
                <p.icon
                  aria-hidden="true"
                  className="h-5 w-5 text-signal transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]"
                  strokeWidth={1.75}
                />
                <h3 className="mt-4 text-[1rem] font-semibold text-navy-800">{p.title}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-[1.6] text-ink-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:pt-4">
          <PlacementChart />
        </div>
      </div>
    </section>
  );
}

export default CareerSection;

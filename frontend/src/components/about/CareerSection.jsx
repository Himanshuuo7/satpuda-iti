import { Briefcase, Compass, Factory, HardHat, Lightbulb, TrendingUp } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { placement } from '../../data/satpudaData';
import { toLakh } from '../../utils/format';
import cn from '../../utils/cn';

/**
 * Industry & career.
 *
 * Six pillars, each a paraphrase of a specific line on the official training
 * or placement page. The placement record is the institute's own published
 * table, charted as one series (trainees placed) with the rate, drives and
 * salary in each bar's tooltip and a full table view beneath. The language is
 * "support" and "record" — never a guarantee.
 */

const PILLARS = [
  {
    icon: Factory,
    title: 'Industry exposure',
    body: 'Periodic industry visits, with faculty and students taking up real-life problems from industry for problem solving.',
    source: '/placement',
  },
  {
    icon: HardHat,
    title: 'On-the-job training',
    body: 'Field exposure, hands-on practice and industrial projects are part of the learning process.',
    source: '/training',
  },
  {
    icon: TrendingUp,
    title: 'Skill development',
    body: 'STEP (Skill Enhancement Training Programme) and NSDC courses alongside the NCVT trade.',
    source: '/about-us',
  },
  {
    icon: Briefcase,
    title: 'Placement support',
    body: 'The placement cell arranges campus interviews and contacts local industries for their manpower requirements.',
    source: '/placement',
  },
  {
    icon: Lightbulb,
    title: 'Entrepreneurship',
    body: 'Self-employment camps share information on government self-employment schemes.',
    source: '/placement',
  },
  {
    icon: Compass,
    title: 'Career development',
    body: 'Counselling from private and government sectors, guest faculty, and seminars on local employment opportunities.',
    source: '/placement',
  },
];

const SCALE_MAX = 1200;
const GRID = [0, 400, 800, 1200];

function PlacementChart() {
  const rows = placement.record;
  const peak = rows.reduce((a, b) => (b.placed > a.placed ? b : a));
  const latest = rows[rows.length - 1];

  return (
    <figure className="reveal rounded-panel border border-navy-100 bg-white p-5 sm:p-7" style={{ '--reveal-delay': '120ms' }}>
      <figcaption>
        <p className="font-mono text-label uppercase text-ink-soft">Placement record · trainees placed per year</p>
        <p className="mt-2 font-display text-[1.25rem] font-semibold text-navy-800">
          {rows.reduce((n, r) => n + r.placed, 0).toLocaleString('en-IN')} trainees placed, {rows[0].year}–{latest.year}
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

        <ul className="relative flex h-full items-end gap-2 sm:gap-4">
          {rows.map((r, i) => {
            const label = r === peak || r === latest;
            return (
              <li key={r.year} className="group relative flex h-full flex-1 flex-col justify-end">
                <div
                  tabIndex={0}
                  aria-label={`${r.year}: ${r.placed.toLocaleString('en-IN')} placed, ${r.percentage}% placement, ${r.drives} drives`}
                  className="about-bar relative mx-auto w-full max-w-[3rem] rounded-t-[4px] bg-royal outline-none transition-colors duration-200 hover:bg-signal focus-visible:bg-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech"
                  style={{ height: `${(r.placed / SCALE_MAX) * 100}%`, '--i': i }}
                >
                  {label && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[0.6875rem] font-semibold tabular text-navy-800 transition-opacity group-hover:opacity-0 group-focus-within:opacity-0">
                      {r.placed.toLocaleString('en-IN')}
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
                  style={{ bottom: `${(r.placed / SCALE_MAX) * 100}%` }}
                >
                  <p className="font-mono text-[0.625rem] tracking-[0.14em] text-tech">{r.year}</p>
                  <p className="mt-1 font-display text-[1.125rem] font-semibold tabular">{r.placed.toLocaleString('en-IN')} placed</p>
                  <p className="mt-1 text-[0.75rem] text-navy-100/80">
                    {r.percentage}% · {r.drives} drives · {toLakh(r.salary)}
                  </p>
                </div>
                <span className="mt-2 text-center font-mono text-[0.6875rem] tabular text-ink-muted">{r.year}</span>
              </li>
            );
          })}
        </ul>
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
                <th scope="col" className="py-2 pr-3 text-right font-medium">Placed</th>
                <th scope="col" className="py-2 pr-3 text-right font-medium">Rate</th>
                <th scope="col" className="py-2 text-right font-medium">Salary (p.a.)</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular text-navy-800">
              {rows.map((r) => (
                <tr key={r.year} className="border-b border-navy-50">
                  <th scope="row" className="py-2 pr-3 text-left font-medium">{r.year}</th>
                  <td className="py-2 pr-3 text-right">{r.drives}</td>
                  <td className="py-2 pr-3 text-right">{r.placed.toLocaleString('en-IN')}</td>
                  <td className="py-2 pr-3 text-right">{r.percentage}%</td>
                  <td className="py-2 text-right">{toLakh(r.salary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="mt-4 text-[0.75rem] leading-relaxed text-ink-soft">
        Figures as published by Satpuda ITI on{' '}
        <a href="https://satpudaiti.com/placement/" target="_blank" rel="noopener noreferrer" className="underline decoration-navy-200 underline-offset-4 hover:text-royal">
          satpudaiti.com/placement
        </a>
        . Placement support is not a guarantee of employment.
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
                <p className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-soft">satpudaiti.com{p.source}</p>
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

import { ArrowRight } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { placement } from '../../data/satpudaData';
import { recruiterLogos } from '../../data/media';
import { toLakh } from '../../utils/format';
import useReveal from '../../hooks/useReveal';

/**
 * Placements.
 *
 * The institute publishes a precise year-by-year record, so that table is the
 * section — presented as a real data table with tabular figures and a bar for
 * each year's rate, not as a set of hero statistics. A semantic <table> keeps it
 * navigable; on phones each row reflows into a labelled block.
 *
 * The published headline ("2456 Campus placements in last 3 Years") is quoted
 * as written, and the language stays "assistance"/"record" — never "guaranteed".
 */
export function Placements() {
  const ref = useReveal();
  const peak = Math.max(...placement.record.map((r) => r.percentage));

  return (
    <section
      id="placements"
      ref={ref}
      aria-labelledby="placements-title"
      className="relative bg-canvas-soft py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="05"
              eyebrow="Placements"
              title={
                <>
                  Campus drives,
                  <br />
                  <span className="text-ink-muted">year on year.</span>
                </>
              }
            />
            <p
              className="reveal mt-6 max-w-prose text-[1.0625rem] leading-[1.78] text-ink-muted"
              style={{ '--reveal-delay': '140ms' }}
            >
              {placement.campusNote}
            </p>

            <p
              className="reveal mt-7 font-display text-xl font-medium tracking-tight text-navy-800"
              style={{ '--reveal-delay': '180ms' }}
            >
              “{placement.headline}”
            </p>

            <div className="reveal mt-9" style={{ '--reveal-delay': '220ms' }}>
              <Button to="/placements" variant="outline">
                Placement details
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Button>
            </div>
          </div>

          {/* Record table */}
          <div className="reveal lg:col-span-7" style={{ '--reveal-delay': '100ms' }}>
            <div className="overflow-hidden rounded-panel border border-navy-100 bg-white shadow-card">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Satpuda ITI placement record by year, as published on the official website
                </caption>
                <thead>
                  <tr className="border-b border-navy-100 bg-canvas-soft">
                    <th scope="col" className="px-4 py-3.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted sm:px-5">
                      Year
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-right font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted sm:px-5">
                      Drives
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-right font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted sm:px-5">
                      Placed
                    </th>
                    <th scope="col" className="hidden px-4 py-3.5 text-right font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted sm:table-cell sm:px-5">
                      Package
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-right font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted sm:px-5">
                      Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {placement.record.map((row) => (
                    <tr
                      key={row.year}
                      className="group border-b border-navy-100 last:border-b-0 transition-colors duration-200 hover:bg-navy-50/60"
                    >
                      <th
                        scope="row"
                        className="px-4 py-4 font-mono text-[0.875rem] font-medium tabular text-navy-800 sm:px-5"
                      >
                        {row.year}
                      </th>
                      <td className="px-4 py-4 text-right font-mono text-[0.8125rem] tabular text-ink-muted sm:px-5">
                        {String(row.drives).padStart(2, '0')}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-[0.8125rem] tabular text-navy-700 sm:px-5">
                        {row.placed}
                      </td>
                      <td className="hidden px-4 py-4 text-right font-mono text-[0.8125rem] tabular text-ink-muted sm:table-cell sm:px-5">
                        ₹{toLakh(row.salary)}
                      </td>
                      <td className="px-4 py-4 sm:px-5">
                        <div className="flex items-center justify-end gap-3">
                          {/* Rate bar — the comparison the table is actually for. */}
                          <span
                            aria-hidden="true"
                            className="hidden h-1 w-20 overflow-hidden rounded-full bg-navy-100 sm:block"
                          >
                            <span
                              className="block h-full rounded-full bg-tech transition-colors duration-200 group-hover:bg-signal"
                              style={{ width: `${(row.percentage / peak) * 100}%` }}
                            />
                          </span>
                          <span className="font-mono text-[0.875rem] font-medium tabular text-navy-800">
                            {row.percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-soft">
              {placement.sourceNote}
            </p>
          </div>
        </div>

        {/* Recruiter marks */}
        <div className="reveal mt-16">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-signal" />
            <h3 className="eyebrow text-ink-muted">Our esteemed recruiters</h3>
            <span aria-hidden="true" className="h-px flex-1 tick-rule text-navy-200" />
          </div>

          <div className="mask-fade-x mt-8 overflow-hidden">
            <ul className="flex w-max animate-marquee items-center gap-12 sm:gap-16 lg:gap-20">
              {[...recruiterLogos, ...recruiterLogos].map((logo, i) => (
                <li key={i} className="shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    width="100"
                    height="50"
                    className="h-14 w-auto max-w-[11rem] object-contain opacity-55 grayscale transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0 sm:h-16 sm:max-w-[13rem] lg:h-20 lg:max-w-[15rem]"
                  />
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-[0.8125rem] text-ink-soft">
            Recruiter marks as displayed on the official Satpuda ITI website.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Placements;

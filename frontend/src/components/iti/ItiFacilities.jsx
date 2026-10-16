import { Building2 } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import CountUp from './CountUp';
import { tradeById } from '../../data/trades';
import useRevealEach from '../../hooks/useRevealEach';

/**
 * Facilities & Infrastructure — the campus page's "Trade Specific
 * Infrastructure" table, one panel per trade. Cells the page leaves blank are
 * left out rather than shown empty.
 *
 * Motion: each panel's unit count rolls up and a single measurement sweep
 * runs along its header as it appears; area cells settle in turn; panels lift
 * on hover.
 */

const area = (value) => `${value} m²`;

export function ItiFacilities({ inst, id }) {
  const ref = useRevealEach();

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby="iti-facilities-title"
      className="relative scroll-mt-[calc(var(--navbar-h-scrolled)+4.5rem)] bg-canvas py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 blueprint-light [mask-image:linear-gradient(180deg,#000,transparent_70%)]"
      />

      <div className="shell relative">
        <SectionHeading
          id="iti-facilities-title"
          eyebrow="Workshops"
          title="Facilities & Infrastructure"
          lede={
            <span lang="hi">
              ट्रेड के अनुसार कक्षाओं और वर्कशॉप का क्षेत्रफल, जैसा संस्थान के आधिकारिक कैंपस पेज की “Trade Specific
              Infrastructure – Building & Workshop” तालिका में प्रकाशित है।
            </span>
          }
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {inst.infrastructure.map((row, i) => {
            const cells = [
              { label: 'Classroom area / unit', value: row.classroomPerUnit },
              { label: 'Total classroom area', value: row.classroomTotal },
              { label: 'Workshop area / unit', value: row.workshopPerUnit },
              { label: 'Total workshop area', value: row.workshopTotal, note: row.note },
            ].filter((c) => c.value);

            return (
              <li key={row.trade} className="reveal flex" style={{ '--reveal-delay': `${80 + i * 70}ms` }}>
                <article className="iti-lift group flex w-full flex-col overflow-hidden rounded-panel border border-navy-100 bg-white shadow-card hover:border-navy-200">
                  <header className="relative flex items-center justify-between gap-4 border-b border-navy-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="iti-panel-icon grid h-10 w-10 place-items-center rounded-edge bg-royal-50 text-royal">
                        <Building2 aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
                      </span>
                      <h3 className="font-display text-[1.125rem] font-semibold tracking-tight text-navy-800">
                        {tradeById[row.trade]?.name ?? row.trade}
                      </h3>
                    </div>
                    <p className="text-right">
                      <CountUp
                        value={row.units}
                        duration={1100}
                        className="block font-display text-[1.75rem] font-semibold leading-none text-navy-800"
                      />
                      <span className="mt-1 block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-soft">
                        Units
                      </span>
                    </p>
                    <span aria-hidden="true" className="iti-scan" style={{ '--d': `${350 + i * 140}ms` }} />
                  </header>

                  <dl className="iti-stagger grid flex-1 grid-cols-2 gap-px bg-navy-100">
                    {cells.map((c, j) => (
                      <div key={c.label} className="bg-white px-6 py-4" style={{ '--i': j + 2 }}>
                        <dt className="text-[0.75rem] leading-snug text-ink-soft">{c.label}</dt>
                        <dd className="mt-1 font-mono text-[0.9375rem] font-medium tabular text-navy-800">
                          {area(c.value)}
                          {c.note && (
                            <span lang="hi" className="mt-0.5 block font-sans text-[0.75rem] font-normal text-ink-muted">
                              {c.note}
                            </span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </li>
            );
          })}
        </ul>

        <p lang="hi" className="reveal mt-8 max-w-prose border-l border-tech/50 pl-5 text-[0.875rem] leading-[1.7] text-ink-muted">
          क्षेत्रफल वर्ग मीटर (m²) में है और संस्थान द्वारा प्रकाशित रूप में दिया गया है। नवीनतम जानकारी के लिए संस्थान से
          पुष्टि करें।
        </p>
      </div>
    </section>
  );
}

export default ItiFacilities;

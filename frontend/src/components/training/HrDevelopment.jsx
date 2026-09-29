import { Quote } from 'lucide-react';

import TrainingHero from './TrainingHero';
import TrainingNext from './TrainingNext';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { iconFor } from './icons';
import { hrDevelopment as content } from '../../data/trainingContent';

/**
 * Human Resource Development Satpuda ITI — Faculty.
 *
 * The institute's statement on its people, the NCVT norms it follows for each
 * role, and the three published duties of its HR cell as a sequence from
 * selection to ongoing staff training.
 */

function Statement() {
  return (
    <figure className="relative overflow-hidden rounded-panel bg-navy-800 p-7 text-white shadow-deep sm:p-9">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      <Quote aria-hidden="true" className="relative h-8 w-8 text-signal" strokeWidth={1.5} />
      <blockquote className="relative mt-5 font-display text-[1.25rem] font-medium leading-[1.5] sm:text-[1.4375rem]">
        {content.statement}
      </blockquote>
      <figcaption className="relative mt-6 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-tech">
        Satpuda Industrial Training Institute
      </figcaption>
    </figure>
  );
}

export function HrDevelopment({ page }) {
  const norms = useReveal({ threshold: 0.2 });
  const cell = useReveal({ threshold: 0.1 });

  return (
    <>
      <TrainingHero
        page={page}
        eyebrow={content.kicker}
        lines={[
          'Human Resource',
          <span className="text-royal">
            Development<span className="text-signal">.</span>
          </span>,
        ]}
        lede="Our human resources are the most valuable assets — so faculty are chosen to NCVT norms, selected by an eminent committee, and trained continuously."
        aside={<Statement />}
      />

      <section ref={norms} aria-labelledby="norms-title" className="border-b border-navy-100 bg-white py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading id="norms-title" eyebrow="NCVT norms" title="Qualified to the standard." />
            <p className="reveal mt-6 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted" style={{ '--reveal-delay': '140ms' }}>
              {content.norms}
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3 lg:col-span-6">
            {content.roles.map((r, i) => (
              <li key={r} className="reveal" style={{ '--reveal-delay': `${120 + i * 80}ms` }}>
                <div className="group h-full rounded-panel border border-navy-100 bg-canvas-soft px-5 py-6 text-center transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-royal hover:bg-white">
                  <span className="font-mono text-[0.625rem] tabular text-navy-300 group-hover:text-signal">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mt-2 block text-[1rem] font-semibold text-navy-800">{r}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section ref={cell} aria-labelledby="hr-cell-title" className="bg-canvas-soft py-20 sm:py-26">
        <div className="shell">
          <SectionHeading
            id="hr-cell-title"
            eyebrow="HR cell"
            title={
              <>
                Recruitment of faculty <span className="text-ink-muted">and other staff.</span>
              </>
            }
            lede={content.cellLead}
            className="max-w-3xl"
          />
          <ol className="mt-14 grid gap-5 lg:grid-cols-3">
            {content.cell.map((c, i) => {
              const Icon = iconFor(c.icon);
              const last = i === content.cell.length - 1;
              return (
                <li key={c.title} className="reveal relative" style={{ '--reveal-delay': `${i * 100}ms` }}>
                  {!last && (
                    <span aria-hidden="true" className="absolute -right-5 top-12 z-10 hidden h-px w-5 bg-navy-200 lg:block">
                      <span className="sec-seg-x absolute inset-0 bg-signal" style={{ '--i': i }} />
                    </span>
                  )}
                  <div className="group relative flex h-full flex-col rounded-panel border border-navy-100 bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift sm:p-8">
                    <span className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-edge bg-navy-800 text-tech transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-105">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-display text-[2.5rem] font-bold leading-none tabular text-navy-100 transition-colors duration-300 group-hover:text-royal">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </span>
                    <h3 className="mt-7 text-[1.1875rem] font-semibold text-navy-800">{c.title}</h3>
                    <p className="mt-3 text-[0.9688rem] leading-[1.7] text-ink-muted">{c.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <TrainingNext page={page} />
    </>
  );
}

export default HrDevelopment;

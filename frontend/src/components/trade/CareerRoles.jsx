import { Briefcase, MapPin } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import { themeFor } from './theme';
import useReveal from '../../hooks/useReveal';
import cn from '../../utils/cn';

/**
 * Careers — the job roles the curriculum names, each with its NCO-2015 code so
 * a student can look it up, and the workplaces its job description mentions.
 * No salaries and no placement figures: the curriculum publishes none.
 */
export function CareerRoles({ trade }) {
  const ref = useReveal();
  const { accent } = themeFor(trade);
  const { roles, settings, settingsNote } = trade.careers;

  return (
    <section
      id="careers"
      ref={ref}
      aria-labelledby="careers-title"
      className="relative scroll-mt-[var(--header-h)] bg-white py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <SectionHeading
          id="careers-title"
          eyebrow="Career opportunities"
          title={
            <>
              Where the trade
              <br />
              <span className={accent.text}>can take you.</span>
            </>
          }
          lede="The job roles the DGT curriculum names for this trade, with their National Classification of Occupations (NCO-2015) codes."
          className="max-w-2xl"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          <ul className={cn('grid gap-4 lg:col-span-8', roles.length > 1 && 'sm:grid-cols-2')}>
            {roles.map((r, i) => (
              <li
                key={r.nco}
                className={cn(
                  'reveal group relative flex flex-col overflow-hidden rounded-panel border border-navy-100 bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:p-7',
                  accent.hoverBorder,
                  roles.length % 2 === 1 && i === roles.length - 1 && roles.length > 1 && 'sm:col-span-2'
                )}
                style={{ '--reveal-delay': `${i * 70}ms` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <Briefcase
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className={cn('h-5 w-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5', accent.text)}
                  />
                  <span className="rounded-full border border-navy-100 px-2.5 py-1 font-mono text-[0.625rem] tabular tracking-[0.08em] text-ink-muted">
                    NCO {r.nco}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.375rem] font-semibold leading-tight text-navy-800">{r.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ink-muted">{r.body}</p>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100',
                    accent.bg
                  )}
                />
              </li>
            ))}
          </ul>

          <aside
            aria-labelledby="settings-title"
            className="reveal rounded-panel border border-navy-100 bg-canvas-soft p-6 sm:p-7 lg:col-span-4"
            style={{ '--reveal-delay': '140ms' }}
          >
            <h3 id="settings-title" className="font-display text-[1.25rem] font-semibold text-navy-800">
              Where the work is
            </h3>
            <ul className="mt-5 space-y-1">
              {settings.map((s) => (
                <li
                  key={s}
                  className="group flex items-center gap-3 rounded-edge px-2 py-2.5 text-[0.9375rem] font-medium text-navy-700 transition-colors duration-200 hover:bg-white"
                >
                  <MapPin
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className={cn('h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5', accent.text)}
                  />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-navy-100 pt-4 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.12em] text-ink-soft">
              {settingsNote}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CareerRoles;

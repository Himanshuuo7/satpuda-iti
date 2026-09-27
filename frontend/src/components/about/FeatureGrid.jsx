import { useState } from 'react';
import { Minus } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { baseline, featureGroups, features } from '../../data/features';
import { iconFor } from './icons';
import cn from '../../utils/cn';

/**
 * What makes Satpuda different — the institute's own published comparison.
 *
 * The baseline column is kept quiet and attributed (it is Satpuda's
 * characterisation, not ours). The fifteen points sit in a hairline grid; the
 * group switch highlights a theme without reflowing the grid, so nothing jumps.
 */
export function FeatureGrid() {
  const ref = useReveal({ threshold: 0.08 });
  const [group, setGroup] = useState('all');

  return (
    <section
      id="why"
      ref={ref}
      aria-labelledby="why-title"
      className="relative scroll-mt-[var(--header-h)] bg-white py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            id="why-title"
            index="03"
            eyebrow="What makes Satpuda different"
            title={
              <>
                It’s different <span className="text-signal">@</span>{' '}
                <span className="text-royal">Satpuda ITIs.</span>
              </>
            }
            lede="Satpuda publishes this list against a baseline ITI. Each point is the institute’s own; the one-line notes draw on its training and placement pages."
            className="lg:col-span-7"
          />

          <aside
            aria-labelledby="baseline-title"
            className="reveal self-end rounded-panel border border-dashed border-navy-200 p-6 lg:col-span-5"
            style={{ '--reveal-delay': '120ms' }}
          >
            <h3 id="baseline-title" className="font-mono text-label uppercase text-ink-soft">
              Other ITIs — per Satpuda’s comparison
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {baseline.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[0.875rem] text-ink-soft">
                  <Minus aria-hidden="true" className="mt-1 h-3 w-3 shrink-0" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Theme switch */}
        <div
          role="group"
          aria-label="Highlight a theme"
          className="reveal mt-14 flex flex-wrap items-center gap-2"
          style={{ '--reveal-delay': '160ms' }}
        >
          {[{ id: 'all', label: 'All points' }, ...featureGroups].map((g) => {
            const on = g.id === group;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={on}
                onClick={() => setGroup(g.id)}
                className={cn(
                  'min-h-[2.5rem] rounded-full border px-4 text-[0.8125rem] font-medium transition-colors duration-200',
                  on
                    ? 'border-navy-800 bg-navy-800 text-white'
                    : 'border-navy-100 bg-white text-navy-700 hover:border-royal hover:text-royal'
                )}
              >
                {g.label}
                {g.id !== 'all' && (
                  <span className={cn('ml-2 font-mono text-[0.625rem] tabular', on ? 'text-tech' : 'text-ink-soft')}>
                    {features.filter((f) => f.group === g.id).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <ul className="reveal mt-6 grid gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-3" style={{ '--reveal-delay': '200ms' }}>
          {features.map((f, i) => {
            const Icon = iconFor(f.icon);
            const dim = group !== 'all' && f.group !== group;
            return (
              <li
                key={f.id}
                className={cn(
                  'about-tile group relative bg-white p-6 transition-[opacity,background-color] duration-300 sm:p-7',
                  dim ? 'opacity-35' : 'hover:bg-canvas-soft'
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-edge border border-navy-100 text-royal transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:border-royal group-hover:bg-royal group-hover:text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[0.625rem] tabular text-ink-soft transition-colors duration-300 group-hover:text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.0625rem] font-semibold tracking-tight text-navy-800 transition-colors duration-300 group-hover:text-royal">
                  {f.title}
                </h3>
                <p className="mt-2 text-[0.9063rem] leading-[1.65] text-ink-muted">{f.detail}</p>
              </li>
            );
          })}
          {/* Fills the odd cell in the two-column layout so no bare hairline shows. */}
          <li aria-hidden="true" className="hidden bg-white blueprint-light sm:block lg:hidden" />
        </ul>

        <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft">
          Source: satpudaiti.com/about-us · /training · /placement
        </p>
      </div>
    </section>
  );
}

export default FeatureGrid;

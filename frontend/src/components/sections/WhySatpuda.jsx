import { Check, Minus } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import { differentiators, qualityPolicy } from '../../data/satpudaData';
import useReveal from '../../hooks/useReveal';

/**
 * Why Satpuda.
 *
 * The institute publishes its own side-by-side comparison against a baseline
 * ITI, so that comparison is the section rather than a generic feature grid.
 * The baseline column is deliberately quiet and the Satpuda column carries the
 * weight, with the published Quality Policy set beneath as measurable targets.
 */
export function WhySatpuda() {
  const ref = useReveal();

  return (
    <section
      id="why"
      ref={ref}
      aria-labelledby="why-title"
      className="relative bg-canvas-soft py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Why Satpuda"
          title={differentiators.heading}
          lede="The institute publishes this comparison against a baseline ITI. Both columns below are reproduced from its own statement."
          className="max-w-2xl"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Baseline column — intentionally recessive */}
          <div className="reveal lg:col-span-4">
            <div className="h-full rounded-panel border border-navy-100 bg-white/60 p-6 sm:p-7">
              <h3 className="font-mono text-label uppercase text-ink-soft">
                {differentiators.otherLabel}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {differentiators.other.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-[1.6] text-ink-soft">
                    <Minus
                      aria-hidden="true"
                      strokeWidth={2}
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-soft/60"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Satpuda column — the weight */}
          <div className="reveal lg:col-span-8" style={{ '--reveal-delay': '100ms' }}>
            <div className="h-full rounded-panel border border-navy-200 bg-white p-6 shadow-card sm:p-8">
              <div className="flex items-center gap-3">
                <h3 className="font-mono text-label uppercase text-signal">
                  {differentiators.satpudaLabel}
                </h3>
                <span aria-hidden="true" className="h-px flex-1 tick-rule text-navy-200" />
                <span className="font-mono text-[0.625rem] tabular text-ink-soft">
                  {differentiators.satpuda.length} points
                </span>
              </div>

              <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {differentiators.satpuda.map((item) => (
                  <li
                    key={item}
                    className="group flex items-start gap-3 text-[0.9375rem] leading-[1.6] text-navy-700"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-tech/15 transition-colors duration-200 group-hover:bg-signal/15">
                      <Check
                        aria-hidden="true"
                        strokeWidth={3}
                        className="h-2.5 w-2.5 text-tech-700 transition-colors duration-200 group-hover:text-signal"
                      />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quality policy — published, measurable targets */}
        <div className="reveal mt-8 overflow-hidden rounded-panel border border-navy-100 bg-navy-800">
          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-10">
            <div className="lg:w-56 lg:shrink-0">
              <h3 className="font-mono text-label uppercase text-tech">Quality Policy</h3>
              <p className="mt-2.5 text-[0.8125rem] leading-[1.6] text-navy-100/60">
                Targets the institute holds itself to.
              </p>
            </div>
            <ul className="flex flex-1 flex-wrap gap-x-3 gap-y-2.5">
              {qualityPolicy.map((item) => (
                <li
                  key={item}
                  className="rounded-edge border border-white/12 px-3.5 py-2 text-[0.8125rem] leading-snug text-navy-100/85 transition-colors duration-200 hover:border-tech/50 hover:text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySatpuda;

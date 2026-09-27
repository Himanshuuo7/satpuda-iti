import { ArrowRight } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import Figure from '../ui/Figure';
import { training } from '../../data/satpudaData';
import { photos } from '../../data/media';
import useReveal from '../../hooks/useReveal';

/**
 * Training / learning experience.
 *
 * A sticky editorial column holds the philosophy while the teaching methods
 * scroll past as a ruled index — the numbering is real here because the site
 * publishes these as an enumerated list of methods. Two workshop photographs
 * break the column so the section reads as the practical floor it describes.
 */
export function Training() {
  const ref = useReveal();

  return (
    <section
      id="training"
      ref={ref}
      aria-labelledby="training-title"
      className="relative bg-canvas py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          {/* Sticky statement */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                index="04"
                eyebrow="Learning Process"
                title={
                  <>
                    More practice.
                    <br />
                    <span className="text-ink-muted">Less theory.</span>
                  </>
                }
              />

              <p
                className="reveal mt-6 max-w-prose text-[1.0625rem] leading-[1.78] text-ink-muted"
                style={{ '--reveal-delay': '140ms' }}
              >
                {training.intro}
              </p>

              {/* The institute's own emphasis, pulled out as a quote. */}
              <blockquote
                className="reveal mt-8 border-l-2 border-signal pl-5"
                style={{ '--reveal-delay': '180ms' }}
              >
                <p className="font-display text-xl font-medium leading-[1.45] tracking-tight text-navy-800 sm:text-2xl">
                  {training.emphasis}
                </p>
              </blockquote>

              <p
                className="reveal mt-6 font-mono text-[0.75rem] leading-[1.65] text-ink-soft"
                style={{ '--reveal-delay': '220ms' }}
              >
                {training.nimiNote}
              </p>

              <div className="reveal mt-9" style={{ '--reveal-delay': '260ms' }}>
                <Button to="/training" variant="outline">
                  Inside the training
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Methods + imagery */}
          <div className="lg:col-span-7">
            <div className="reveal">
              <Figure
                src={photos.practicalWorkshop.src}
                alt={photos.practicalWorkshop.alt}
                ratio="16/10"
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="rounded-panel"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/45 to-transparent"
                />
                <span className="absolute bottom-4 left-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/85">
                  Practical session
                </span>
              </Figure>
            </div>

            <h3 className="reveal mt-12 flex items-center gap-3 font-mono text-label uppercase text-ink-muted">
              <span aria-hidden="true" className="h-px w-6 bg-signal" />
              Methods used in teaching
            </h3>

            <ol className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {training.methods.map((method, i) => (
                <li
                  key={method}
                  className="reveal group flex items-baseline gap-4 border-b border-navy-100 py-3.5"
                  style={{ '--reveal-delay': `${i * 40}ms` }}
                >
                  <span className="font-mono text-[0.625rem] tabular text-tech-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.9375rem] text-navy-700 transition-colors duration-200 group-hover:text-navy-800">
                    {method}
                  </span>
                </li>
              ))}
            </ol>

            {/* Facilities */}
            <div className="reveal mt-12 rounded-panel border border-navy-100 bg-canvas-soft p-6 sm:p-7">
              <h3 className="font-mono text-label uppercase text-ink-muted">
                Resources &amp; faculty development
              </h3>
              <ul className="mt-5 space-y-3.5">
                {training.facilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.9375rem] leading-[1.7] text-ink-muted"
                  >
                    {/* Whole-pixel offset and height — a 1px rule at a
                        fractional offset antialiases to grey. */}
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-0.5 w-3.5 shrink-0 bg-tech"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Training;

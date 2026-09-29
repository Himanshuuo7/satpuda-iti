import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import TrainingHero from './TrainingHero';
import TrainingNext from './TrainingNext';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { iconFor } from './icons';
import { iconFor as activityIconFor } from '../activity/icons';
import { holistic as content } from '../../data/trainingContent';
import { trainingPageBySlug } from '../../data/trainingPages';
import { activityPageBySlug } from '../../data/activityPages';
import cn from '../../utils/cn';

/**
 * All Round Holistic Development.
 *
 * The published diagram is a core ("excellent training with industry's
 * cooperation") ringed by four petals. Here the petals are the four quadrants
 * of one panel and the core sits over their meeting point, its ring breathing
 * slowly; on phones the core leads and the petals stack.
 */

/** Which inner corner of each quadrant gives way to the core. */
const CORNER = ['sm:pb-24 sm:pr-24', 'sm:pb-24 sm:pl-24', 'sm:pr-24 sm:pt-24', 'sm:pl-24 sm:pt-24'];

/** Pages where the development happens — in Training and in Activity. */
const RELATED = [
  { page: trainingPageBySlug.competency, iconFor },
  { page: activityPageBySlug['students-life'], iconFor: activityIconFor },
  { page: activityPageBySlug.safety, iconFor: activityIconFor },
];

export function Holistic({ page }) {
  const flower = useReveal({ threshold: 0.12 });
  const related = useReveal({ threshold: 0.15 });

  return (
    <>
      <TrainingHero
        page={page}
        eyebrow="Every trainee, every ability"
        lines={[
          'All Round',
          <span className="text-royal">
            Holistic Development<span className="text-signal">.</span>
          </span>,
        ]}
        lede={content.subtitleEn + '.'}
      >
        <p lang="hi" className="max-w-2xl font-display text-[1.25rem] font-medium leading-snug text-navy-800 sm:text-[1.5rem]">
          {content.subtitleHi}
        </p>
      </TrainingHero>

      <section ref={flower} aria-labelledby="flower-title" className="bg-white py-20 sm:py-26">
        <div className="shell">
          <h2 id="flower-title" className="sr-only">
            {content.title}
          </h2>

          <div className="relative mx-auto max-w-5xl">
            {/* Core */}
            <div className="relative z-10 mx-auto mb-5 aspect-square w-60 sm:absolute sm:left-1/2 sm:top-1/2 sm:mb-0 sm:w-56 sm:-translate-x-1/2 sm:-translate-y-1/2 lg:w-64">
              <div className="reveal relative grid h-full w-full place-items-center" style={{ '--reveal-delay': '80ms' }}>
                <span aria-hidden="true" className="sec-ring absolute inset-0 rounded-full border-2 border-signal/50" />
                <div className="relative grid h-full w-full place-items-center rounded-full border-[6px] border-signal bg-navy-800 p-7 text-center shadow-deep">
                  <div>
                    <p lang="hi" className="font-display text-[1.125rem] font-semibold leading-snug text-white lg:text-[1.25rem]">
                      {content.core.hi}
                    </p>
                    <p className="mt-2 text-[0.75rem] leading-snug text-navy-100/75">{content.core.en}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Petals */}
            <ul className="grid gap-4 sm:grid-cols-2">
              {content.petals.map((p, i) => {
                const Icon = iconFor(p.icon);
                return (
                  <li key={p.en} className="reveal" style={{ '--reveal-delay': `${150 + i * 90}ms` }}>
                    <div
                      className={cn(
                        'group relative h-full min-h-[14rem] overflow-hidden rounded-panel border border-navy-100 bg-canvas-soft p-7 transition-[background-color,border-color,box-shadow] duration-300 hover:border-navy-200 hover:bg-white hover:shadow-lift sm:min-h-[18rem] sm:p-9',
                        CORNER[i],
                        i % 2 === 1 && 'sm:text-right'
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-12 w-12 place-items-center rounded-full bg-white text-royal shadow-card transition-[transform,background-color,color] duration-500 ease-out group-hover:-rotate-12 group-hover:bg-royal group-hover:text-white',
                          i % 2 === 1 && 'sm:ml-auto'
                        )}
                      >
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <p lang="hi" className="mt-6 font-display text-[1.375rem] font-semibold leading-snug text-navy-800 sm:text-[1.5rem]">
                        {p.hi}
                      </p>
                      <p className="mt-2 text-[0.9375rem] text-ink-muted">{p.en}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section ref={related} aria-labelledby="related-title" className="bg-canvas-soft py-20 sm:py-24">
        <div className="shell">
          <SectionHeading id="related-title" eyebrow="In practice" title="Where the development happens." className="max-w-3xl" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {RELATED.map(({ page: r, iconFor: resolve }, i) => {
              const Icon = resolve(r.icon);
              return (
                <li key={r.to} className="reveal" style={{ '--reveal-delay': `${i * 80}ms` }}>
                  <Link
                    to={r.to}
                    className="group flex h-full flex-col rounded-panel border border-navy-100 bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
                  >
                    <span className="flex items-center justify-between">
                      <Icon aria-hidden="true" className="h-5 w-5 text-royal" strokeWidth={1.75} />
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-navy-300 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                        strokeWidth={2}
                      />
                    </span>
                    <span className="mt-5 text-[1.0625rem] font-semibold text-navy-800 group-hover:text-royal">{r.label}</span>
                    <span className="mt-1.5 text-[0.875rem] leading-[1.6] text-ink-muted">{r.summary}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <TrainingNext page={page} />
    </>
  );
}

export default Holistic;

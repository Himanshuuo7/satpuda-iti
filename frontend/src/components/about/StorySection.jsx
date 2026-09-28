import { Quote } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import GearOutline from '../ui/GearOutline';
import useRevealEach from '../../hooks/useRevealEach';
import useCountUp from '../../hooks/useCountUp';
import { story } from '../../data/satpudaHistory';
import { missionVision, placement } from '../../data/satpudaData';
import { itiInstitutes } from '../../data/itiInstitutes';

/**
 * Satpuda story — split editorial layout.
 *
 * The founding year is set as a large outlined numeral that stays pinned while
 * the story scrolls beside it. Mission and vision are the institute's own
 * published wording. The three counters are either derived from the data files
 * or quoted from the official site with their source.
 */

const PLACED_TOTAL = placement.record.reduce((n, r) => n + r.placed, 0);
const FIRST = placement.record[0].year;
const LAST = placement.record[placement.record.length - 1].year;

function Counter({ value, suffix = '', label, note }) {
  const [ref, current] = useCountUp(value, { duration: 1400 });
  return (
    <div ref={ref} className="border-l border-navy-100 pl-4">
      <p className="font-display text-[2.25rem] font-semibold leading-none tabular text-navy-800">
        {current.toLocaleString('en-IN')}
        <span className="text-signal">{suffix}</span>
      </p>
      <p className="mt-2 text-[0.875rem] font-medium text-navy-700">{label}</p>
      {note && <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft">{note}</p>}
    </div>
  );
}

export function StorySection() {
  const ref = useRevealEach();

  return (
    <section
      id="story"
      ref={ref}
      aria-labelledby="story-title"
      className="relative scroll-mt-[var(--header-h)] bg-white py-20 sm:py-26 lg:py-30"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Year column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <div className="reveal relative">
              <GearOutline
                teeth={14}
                className="pointer-events-none absolute -left-10 -top-8 h-56 w-56 text-navy-100 sm:h-72 sm:w-72"
              />
              <p className="relative font-mono text-label uppercase text-signal">Est.</p>
              <p
                aria-label={`Established ${story.foundedYear}`}
                className="relative mt-2 font-display text-[clamp(6rem,4rem+10vw,11rem)] font-bold leading-[0.85] tracking-[-0.05em] text-transparent [-webkit-text-stroke:2px_theme(colors.royal.DEFAULT)]"
              >
                {story.foundedYear}
              </p>
              <p className="relative mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-ink-muted">
                {story.operator} begins its work in education and training.
              </p>
            </div>

            {/* 1999 → 2022 rail */}
            <div className="reveal mt-10 max-w-sm" style={{ '--reveal-delay': '120ms' }}>
              <div className="flex items-center justify-between font-mono text-[0.625rem] tabular text-ink-soft">
                <span>1999</span>
                <span className="text-royal">23 years</span>
                <span>2022</span>
              </div>
              <div className="relative mt-2 h-[3px] rounded-full bg-navy-50">
                <span className="absolute inset-y-0 left-0 w-full origin-left animate-rule-draw rounded-full bg-gradient-to-r from-royal to-signal" />
              </div>
              <p className="mt-3 text-[0.8125rem] text-ink-soft">
                “23 years of excellent technical education” — Satpuda Group, 2022.
              </p>
            </div>
          </div>
        </div>

        {/* Story column */}
        <div className="lg:col-span-7">
          <SectionHeading
            id="story-title"
            eyebrow="Our story"
            title={
              <>
                From Balaghat to a network across <span className="text-royal">Madhya Pradesh.</span>
              </>
            }
          />

          <div className="mt-8 space-y-5">
            {story.paragraphs.map((p, i) => (
              <p
                key={i}
                className="reveal max-w-prose text-[1.0625rem] leading-[1.8] text-ink-muted"
                style={{ '--reveal-delay': `${140 + i * 60}ms` }}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="reveal mt-12 grid gap-8 sm:grid-cols-3" style={{ '--reveal-delay': '160ms' }}>
            <Counter value={23} suffix=" yrs" label="Of technical education" note="1999–2022 · official" />
            <Counter value={itiInstitutes.length} label="Verified ITI records" note="satpudaiti.com/contact" />
            <Counter value={PLACED_TOTAL} label={`Trainees placed, ${FIRST}–${LAST}`} note="Published placement table" />
          </div>

          {/* Mission & vision */}
          <div id="mission" className="mt-16 grid scroll-mt-[calc(var(--header-h)+1.5rem)] gap-5 md:grid-cols-2">
            <article className="reveal relative overflow-hidden rounded-panel bg-navy-800 p-7 text-white sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
              <p className="relative font-mono text-label uppercase text-tech">Mission</p>
              <p className="relative mt-5 font-display text-[1.25rem] font-medium leading-[1.45] tracking-[-0.01em]">
                {missionVision.mission}
              </p>
            </article>
            <article
              className="reveal relative rounded-panel border border-navy-100 bg-canvas-soft p-7 sm:p-8"
              style={{ '--reveal-delay': '100ms' }}
            >
              <p className="font-mono text-label uppercase text-signal">Vision</p>
              <p className="mt-5 text-[1.0625rem] leading-[1.7] text-navy-700">{missionVision.vision}</p>
            </article>
          </div>

          <figure className="reveal mt-10 flex gap-4 border-l-2 border-signal pl-5" style={{ '--reveal-delay': '120ms' }}>
            <Quote aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-royal" strokeWidth={1.75} />
            <div>
              <blockquote>
                <p lang="hi" className="font-display text-[1.375rem] font-semibold text-navy-800">
                  {story.taglineHi}
                </p>
                <p className="mt-1 text-[1rem] text-ink-muted">{story.taglineEn}</p>
              </blockquote>
              <figcaption className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">
                Satpuda ITIs — official about page
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default StorySection;

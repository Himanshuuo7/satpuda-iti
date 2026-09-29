import { useEffect, useRef, useState } from 'react';
import { Award, Building2, Flag, GraduationCap, School, Trophy } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import useRevealEach from '../../hooks/useRevealEach';
import useScrollProgress from '../../hooks/useScrollProgress';
import { milestones } from '../../data/satpudaHistory';
import cn from '../../utils/cn';

/**
 * Journey — a vertical timeline whose spine draws as the reader scrolls.
 *
 * On phones the spine runs down the left edge; from `md` it sits in the centre
 * and milestones alternate sides. The milestone crossing the middle of the
 * viewport becomes active (year highlighted, icon turns), and every milestone
 * already passed stays "reached". Each year lists the institutions it opened.
 */

const KIND_ICON = {
  origin: Flag,
  campus: Building2,
  college: GraduationCap,
  school: School,
  record: Trophy,
  legacy: Award,
};

export function JourneyTimeline() {
  const ref = useRevealEach();
  const spine = useScrollProgress({ anchor: 0.55 });
  const items = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = items.current.filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="journey"
      ref={ref}
      aria-labelledby="journey-title"
      className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-canvas-soft py-20 sm:py-26 lg:py-30"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-light opacity-60" />
      <div className="shell relative">
        <SectionHeading
          id="journey-title"
          eyebrow="Our journey"
          title={
            <>
              From one ITI in Garra <span className="text-ink-muted">to a network across MP.</span>
            </>
          }
          lede="Since 1999, Maharana Pratap Shikshan Samiti has opened ITIs, colleges and a school across Madhya Pradesh — here is how the Satpuda family grew, year by year."
          className="max-w-3xl"
        />

        <ol ref={spine} className="relative mt-16 md:mt-20">
          {/* Spine */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-px bg-navy-100 md:left-1/2 md:-translate-x-1/2"
          >
            <span className="about-spine absolute inset-0 bg-gradient-to-b from-royal via-royal to-signal" />
          </span>

          {milestones.map((m, i) => {
            const Icon = KIND_ICON[m.kind] ?? Building2;
            const isActive = i === active;
            const reached = i <= active;
            const right = i % 2 === 1;

            return (
              <li
                key={m.year}
                ref={(el) => (items.current[i] = el)}
                data-index={i}
                className={cn(
                  'group about-milestone relative pb-14 pl-16 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0',
                  isActive && 'is-active'
                )}
              >
                {/* Marker */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'about-milestone-icon absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border md:left-1/2 md:-translate-x-1/2',
                    reached
                      ? 'border-royal bg-royal text-white shadow-[0_0_0_6px_rgba(11,22,201,0.10)]'
                      : 'border-navy-200 bg-white text-navy-400',
                    isActive && 'border-signal bg-signal shadow-[0_0_0_6px_rgba(224,27,36,0.14)]'
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>

                <div
                  className={cn(
                    'reveal md:pt-0.5',
                    right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'
                  )}
                >
                  <p
                    className={cn(
                      'font-display text-[2.5rem] font-bold leading-none tracking-[-0.03em] tabular transition-colors duration-300 sm:text-[3rem]',
                      isActive ? 'text-signal' : reached ? 'text-royal' : 'text-navy-200',
                      'group-hover:text-royal'
                    )}
                  >
                    <time dateTime={m.year}>{m.year}</time>
                  </p>
                  <h3 className="mt-3 text-[1.25rem] font-semibold tracking-tight text-navy-800">{m.title}</h3>
                  <p
                    className={cn(
                      'mt-2 max-w-md text-[0.9688rem] leading-[1.7] text-ink-muted',
                      !right && 'md:ml-auto'
                    )}
                  >
                    {m.body}
                  </p>

                  {m.institutions.length > 0 && (
                    <ul
                      aria-label={`Institutions opened in ${m.year}`}
                      className={cn(
                        'mt-5 max-w-md divide-y divide-navy-50 overflow-hidden rounded-edge border border-navy-100 bg-white text-left',
                        !right && 'md:ml-auto'
                      )}
                    >
                      {m.institutions.map((inst) => (
                        <li key={`${inst.name}-${inst.place}`} className="px-4 py-3">
                          <p className="text-[0.9063rem] font-semibold text-navy-800">{inst.name}</p>
                          <p className="mt-0.5 text-[0.8125rem] text-ink-muted">{inst.place}</p>
                          <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-royal">
                            {inst.affiliation}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default JourneyTimeline;

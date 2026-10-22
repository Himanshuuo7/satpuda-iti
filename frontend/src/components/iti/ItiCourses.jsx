import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionHeading from '../ui/SectionHeading';
import CountUp from './CountUp';
import { ItiApplyCard, ItiNearbyTrades } from './ItiCourseExtras';
import { tradeIcon } from './tradeIcons';
import useRevealEach from '../../hooks/useRevealEach';
import useSpotlight from '../../hooks/useSpotlight';

/**
 * Courses & Trades — each trade the campus page lists, with its duration,
 * shifts and intake as published there, and a link to the trade's own page.
 *
 * Motion: cards lift under a soft glow that follows the cursor; the icon tile
 * turns red and the trade's own icon answers (the bolt flickers, the wrench
 * twists, the cog turns, the monitor blips); the intake counts up once.
 *
 * A campus running only one or two trades would leave the row short, so the
 * grid is completed with the trades its neighbours teach and, where a single
 * trade leaves two places free, a card to apply for it (ItiCourseExtras).
 */

/** "2 years" → "2 वर्ष". */
const years = (duration) => `${parseInt(duration, 10)} वर्ष`;

export function ItiCourses({ inst, id }) {
  const ref = useRevealEach();
  const trackSpotlight = useSpotlight();
  const count = inst.courses.length;

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby="iti-courses-title"
      className="relative scroll-mt-[calc(var(--navbar-h-scrolled)+4.5rem)] bg-canvas-soft py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <SectionHeading
          id="iti-courses-title"
          eyebrow="Programmes"
          title="Courses & Trades"
          lede={
            <span lang="hi">
              इस संस्थान में संचालित ट्रेड, उनकी अवधि और प्रवेश क्षमता — जैसा संस्थान के आधिकारिक कैंपस पेज पर प्रकाशित है।
              सभी ट्रेड NCVT के Craftsman Training Scheme (CTS) के अंतर्गत हैं।
            </span>
          }
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {inst.courses.map((course, i) => {
            const [Icon, iconClass] = tradeIcon(course.icon);
            const specs = [
              { label: 'Duration', value: years(course.duration) },
              { label: 'Shifts', value: String(course.shifts), count: true },
              { label: 'Intake capacity', value: course.intake ? String(course.intake) : null, count: true },
              { label: 'Eligibility', value: course.eligibilityHi, hi: true, wide: true },
            ].filter((s) => s.value);

            return (
              <li key={course.id} className="reveal flex" style={{ '--reveal-delay': `${80 + i * 70}ms` }}>
                <article
                  onPointerMove={trackSpotlight}
                  className="iti-trade iti-lift spotlight-host relative flex w-full flex-col overflow-hidden rounded-panel border border-navy-100 bg-white p-6 shadow-card hover:border-navy-200 sm:p-7"
                >
                  <div aria-hidden="true" className="iti-glow pointer-events-none absolute inset-0" />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="iti-trade-icon grid h-12 w-12 place-items-center rounded-edge bg-navy-800 text-tech">
                      <Icon aria-hidden="true" className={`${iconClass} h-5 w-5`} strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-label uppercase text-ink-soft">{course.code}</span>
                  </div>

                  <h3 className="relative mt-6 font-display text-[1.375rem] font-semibold leading-tight tracking-tight text-navy-800">
                    {course.name}
                  </h3>
                  {course.fullName && <p className="relative mt-1 text-[0.875rem] text-ink-muted">{course.fullName}</p>}

                  <p lang="hi" className="relative mt-4 text-[0.9375rem] leading-[1.75] text-ink-muted">
                    {course.summary}
                  </p>

                  <dl className="iti-stagger relative mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-edge border border-navy-100 bg-navy-100">
                    {specs.map((s, j) => (
                      <div
                        key={s.label}
                        className={s.wide ? 'col-span-3 bg-canvas-soft px-3 py-3' : 'bg-canvas-soft px-3 py-3'}
                        style={{ '--i': j + 2 }}
                      >
                        <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-soft">{s.label}</dt>
                        <dd lang={s.hi ? 'hi' : undefined} className="mt-1 text-[0.9375rem] font-semibold tabular text-navy-800">
                          {s.count ? <CountUp value={s.value} /> : s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="relative mt-auto pt-6">
                    <Link
                      to={course.slug}
                      className="group inline-flex min-h-[2.75rem] items-center gap-2 text-[0.875rem] font-semibold text-navy-800 transition-colors hover:text-signal"
                    >
                      Trade details
                      <span className="sr-only">: {course.name}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        strokeWidth={2}
                        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}

          {/* Completing a short row: 2 trades + nearby (full width on
              tablets); 1 trade + nearby + apply (apply full width there). */}
          {count <= 2 && (
            <ItiNearbyTrades
              inst={inst}
              delay={80 + count * 70}
              className={count === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}
            />
          )}
          {count === 1 && <ItiApplyCard inst={inst} delay={220} className="sm:col-span-2 lg:col-span-1" />}
        </ul>

        <p lang="hi" className="reveal mt-8 max-w-prose border-l border-tech/50 pl-5 text-[0.875rem] leading-[1.7] text-ink-muted">
          प्रवेश क्षमता संस्थान के आधिकारिक कैंपस पेज पर प्रकाशित आँकड़ों के अनुसार है। मौजूदा सत्र में सीटों की उपलब्धता
          के लिए संस्थान से संपर्क करें।
        </p>
      </div>
    </section>
  );
}

export default ItiCourses;

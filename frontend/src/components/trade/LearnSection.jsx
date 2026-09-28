import { useRef, useState } from 'react';
import { BookOpen, Check } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import { tradeIcon } from './icons';
import { themeFor } from './theme';
import useReveal from '../../hooks/useReveal';
import cn from '../../utils/cn';

/**
 * What you will learn — the curriculum's learning outcomes, grouped into skill
 * areas. Two-year trades get a year switch (a real tablist, arrow keys and
 * all). Where the curriculum allots hours to its outcomes, a rail above the
 * cards shows how the year divides between the areas; pointing at a segment
 * or a card lights its partner.
 */

const SEGMENT = ['bg-navy-800', 'bg-navy-500', 'bg-navy-300', 'bg-navy-200', 'bg-navy-600', 'bg-navy-400'];

function HoursRail({ groups, hot, onHot, accent }) {
  const total = groups.reduce((n, g) => n + g.hours, 0);
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-label uppercase text-ink-soft">Hours by skill area</p>
        <p className="font-mono text-[0.6875rem] tabular text-ink-soft">{total.toLocaleString('en-IN')} hrs</p>
      </div>
      <div className="trade-bar mt-3 flex h-3 gap-0.5 overflow-hidden rounded-sharp" onMouseLeave={() => onHot(null)}>
        {groups.map((g, i) => (
          <span
            key={g.title}
            onMouseEnter={() => onHot(i)}
            title={`${g.title}: ${g.hours} hrs`}
            className={cn(
              'h-full transition-[opacity,filter] duration-200',
              hot === i ? accent.bg : SEGMENT[i % SEGMENT.length],
              hot !== null && hot !== i && 'opacity-40'
            )}
            style={{ width: `${(g.hours / total) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function Groups({ groups, accent }) {
  const [hot, setHot] = useState(null);
  const withHours = groups.every((g) => g.hours);

  return (
    <>
      {withHours && <HoursRail groups={groups} hot={hot} onHot={setHot} accent={accent} />}
      <ul className={cn('grid gap-4 sm:grid-cols-2 xl:gap-5', groups.length === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3')}>
        {groups.map((g, i) => {
          const Icon = tradeIcon(g.icon);
          const lit = hot === i;
          return (
            <li
              key={g.title}
              onMouseEnter={() => setHot(i)}
              onMouseLeave={() => setHot(null)}
              className={cn(
                'about-enter group relative flex flex-col rounded-panel border bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift',
                lit ? 'border-navy-300' : 'border-navy-100'
              )}
              style={{ '--i': i }}
            >
              <div className="flex items-center gap-3">
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={cn(
                    'h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110',
                    accent.text
                  )}
                />
                <h3 className="font-display text-[1.1875rem] font-semibold leading-snug text-navy-800">{g.title}</h3>
              </div>
              {g.hours && (
                <span className="mt-3 self-start rounded-full bg-canvas-soft px-2.5 py-1 font-mono text-[0.625rem] tabular text-navy-700">
                  {g.hours} hrs
                </span>
              )}
              <ul className="mt-4 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-[1.6] text-ink-muted">
                    <Check aria-hidden="true" strokeWidth={2.25} className={cn('mt-1 h-3.5 w-3.5 shrink-0', accent.text)} />
                    {item}
                  </li>
                ))}
              </ul>
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-x-6 bottom-0 h-[2px] origin-left scale-x-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-x-100',
                  accent.bg
                )}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function LearnSection({ trade }) {
  const ref = useReveal();
  const { accent } = themeFor(trade);
  const [tab, setTab] = useState(0);
  const tabs = useRef([]);
  const multi = trade.learn.length > 1;

  const onKeyDown = (e) => {
    const n = trade.learn.length;
    const next = { ArrowRight: tab + 1, ArrowLeft: tab - 1, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + n) % n;
    setTab(i);
    tabs.current[i]?.focus();
  };

  return (
    <section
      id="learn"
      ref={ref}
      aria-labelledby="learn-title"
      className="relative scroll-mt-[var(--header-h)] bg-white py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="learn-title"
            eyebrow="What you will learn"
            title={
              multi ? (
                <>
                  Skills,
                  <span className={accent.text}> year by year.</span>
                </>
              ) : (
                <>
                  Skills,
                  <span className={accent.text}> area by area.</span>
                </>
              )
            }
            lede="The learning outcomes of the DGT curriculum, grouped by skill area. Assessment in the All India Trade Test is set against these outcomes."
            className="max-w-2xl"
          />

          {multi && (
            <div
              role="tablist"
              aria-label="Year of training"
              onKeyDown={onKeyDown}
              className="reveal relative flex self-start rounded-full border border-navy-100 bg-canvas-soft p-1 lg:self-auto"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-1 left-1 rounded-full bg-navy-800 shadow-card transition-transform duration-500 ease-out"
                style={{ width: `calc((100% - 0.5rem) / ${trade.learn.length})`, transform: `translateX(${tab * 100}%)` }}
              />
              {trade.learn.map((y, i) => (
                <button
                  key={y.label}
                  ref={(el) => (tabs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`learn-tab-${i}`}
                  aria-selected={tab === i}
                  aria-controls="learn-panel"
                  tabIndex={tab === i ? 0 : -1}
                  onClick={() => setTab(i)}
                  className={cn(
                    'relative min-h-[2.75rem] min-w-[8.5rem] rounded-full px-5 text-[0.875rem] font-semibold transition-colors duration-300',
                    tab === i ? 'text-white' : 'text-navy-700 hover:text-navy-900'
                  )}
                >
                  {y.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          id="learn-panel"
          role={multi ? 'tabpanel' : undefined}
          aria-labelledby={multi ? `learn-tab-${tab}` : undefined}
          className="reveal mt-12"
          style={{ '--reveal-delay': '120ms' }}
        >
          <Groups key={tab} groups={trade.learn[tab].groups} accent={accent} />
        </div>

        <p className="reveal mt-8 flex items-start gap-2.5 text-[0.875rem] leading-[1.6] text-ink-muted">
          <BookOpen aria-hidden="true" strokeWidth={1.75} className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft" />
          {trade.core}
        </p>
      </div>
    </section>
  );
}

export default LearnSection;

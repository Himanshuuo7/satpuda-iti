import { useRef, useState } from 'react';
import { Check } from 'lucide-react';

import TrainingHero from './TrainingHero';
import TrainingNext from './TrainingNext';
import Figure from '../ui/Figure';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { iconFor } from './icons';
import { photos } from '../../data/media';
import { learningProcess as content } from '../../data/trainingContent';
import cn from '../../utils/cn';

/**
 * Learning Process.
 *
 * The published text in three movements: how teaching is delivered (the nine
 * methods as a grid), the NIMI material it rests on, and the eleven measures
 * of the advanced teaching methodology — grouped into tabs so each group reads
 * on its own.
 */

function HeroPhoto() {
  const ref = useReveal({ threshold: 0.2 });
  return (
    <figure ref={ref} className="group">
      <Figure
        src={photos.practicalWorkshop.src}
        alt={photos.practicalWorkshop.alt}
        ratio="4/3"
        priority
        className="rounded-panel shadow-lift"
        imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        sizes="(min-width: 1024px) 40vw, 100vw"
      >
        <span aria-hidden="true" className="about-shutter absolute inset-0 bg-navy-800" style={{ '--reveal-delay': '300ms' }} />
      </Figure>
    </figure>
  );
}

function MethodologyTabs() {
  const [active, setActive] = useState(content.measures[0].id);
  const tabs = useRef([]);
  const group = content.measures.find((m) => m.id === active);

  const onKeyDown = (e, i) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + content.measures.length) % content.measures.length;
    setActive(content.measures[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div role="tablist" aria-label="Teaching methodology" aria-orientation="vertical" className="flex gap-2 overflow-x-auto lg:col-span-4 lg:flex-col lg:overflow-visible">
        {content.measures.map((m, i) => {
          const Icon = iconFor(m.icon);
          const on = m.id === active;
          return (
            <button
              key={m.id}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`tab-${m.id}`}
              aria-selected={on}
              aria-controls={`panel-${m.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(m.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'group relative flex min-h-[3.5rem] shrink-0 items-center gap-4 overflow-hidden rounded-panel border px-4 py-3 text-left transition-[border-color,background-color,color,box-shadow] duration-300 lg:px-5 lg:py-4',
                on ? 'border-navy-800 bg-navy-800 text-white shadow-lift' : 'border-navy-100 bg-white text-navy-800 hover:border-navy-300'
              )}
            >
              <span
                className={cn(
                  'grid h-10 w-10 shrink-0 place-items-center rounded-edge transition-[background-color,color,transform] duration-300',
                  on ? 'bg-signal text-white' : 'bg-canvas-soft text-royal group-hover:-rotate-6'
                )}
              >
                <Icon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
              </span>
              <span className="whitespace-nowrap text-[0.9375rem] font-semibold lg:whitespace-normal">{m.title}</span>
              <span className={cn('ml-auto hidden font-mono text-[0.6875rem] tabular lg:block', on ? 'text-tech' : 'text-navy-300')}>
                {String(m.items.length).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>

      <div
        key={group.id}
        role="tabpanel"
        id={`panel-${group.id}`}
        aria-labelledby={`tab-${group.id}`}
        tabIndex={0}
        className="sec-page rounded-panel border border-navy-100 bg-white p-6 outline-none sm:p-8 lg:col-span-8"
      >
        <ul className="divide-y divide-navy-50">
          {group.items.map((item, i) => (
            <li key={item} className="sec-rise flex gap-4 py-4 first:pt-0 last:pb-0" style={{ '--d': `${i * 70}ms` }}>
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-tech/15 text-tech-700">
                <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <p className="text-[1rem] leading-[1.7] text-navy-800">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function LearningProcess({ page }) {
  const methods = useReveal({ threshold: 0.08 });
  const nimi = useReveal({ threshold: 0.3 });
  const methodology = useReveal({ threshold: 0.1 });

  return (
    <>
      <TrainingHero
        page={page}
        eyebrow="Teaching Learning Process"
        lines={[
          'Learning',
          <span className="text-royal">
            Process<span className="text-signal">.</span>
          </span>,
        ]}
        lede={content.intro[0]}
        aside={<HeroPhoto />}
      />

      <section ref={methods} aria-labelledby="methods-title" className="bg-white py-20 sm:py-26">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="methods-title"
              eyebrow="Methods"
              title={
                <>
                  Nine methods, <span className="text-ink-muted">one learning process.</span>
                </>
              }
              lede={`${content.methodsLead}.`}
            />
            <p className="reveal mt-6 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted" style={{ '--reveal-delay': '140ms' }}>
              {content.intro[1]}
            </p>
            <blockquote
              className="reveal mt-8 border-l-2 border-signal pl-5 font-display text-[1.25rem] font-medium leading-[1.5] text-navy-800"
              style={{ '--reveal-delay': '180ms' }}
            >
              {content.emphasis}
            </blockquote>
          </div>

          <ol className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-panel border border-navy-100 bg-navy-100 sm:grid-cols-3 lg:col-span-7">
            {content.methods.map((m, i) => {
              const Icon = iconFor(m.icon);
              return (
                <li key={m.label} className="reveal" style={{ '--reveal-delay': `${i * 55}ms` }}>
                  <div className="sec-tile group relative flex h-full min-h-[9.5rem] flex-col justify-between bg-white p-5 transition-colors duration-300 hover:bg-canvas-soft sm:p-6">
                    <span className="flex items-start justify-between">
                      <Icon
                        aria-hidden="true"
                        className="h-6 w-6 text-royal transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-12"
                        strokeWidth={1.6}
                      />
                      <span className="font-mono text-[0.625rem] tabular text-navy-300 group-hover:text-signal">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </span>
                    <span className="mt-6 text-[0.9688rem] font-semibold leading-snug text-navy-800">{m.label}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section ref={nimi} aria-label="NIMI instructional material" className="relative overflow-hidden bg-navy-800 py-16 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />
        <div className="shell relative grid items-center gap-8 lg:grid-cols-12">
          <p aria-hidden="true" className="reveal font-display text-[5rem] font-bold leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(22,199,217,0.6)] sm:text-[7rem] lg:col-span-4">
            NIMI
          </p>
          <p className="reveal font-display text-[1.375rem] font-medium leading-[1.5] text-white sm:text-[1.75rem] lg:col-span-8" style={{ '--reveal-delay': '100ms' }}>
            {content.nimi}
          </p>
        </div>
      </section>

      <section ref={methodology} aria-labelledby="methodology-title" className="bg-canvas-soft py-20 sm:py-26">
        <div className="shell">
          <SectionHeading
            id="methodology-title"
            eyebrow="Advance teaching methodology"
            title={
              <>
                Every measure <span className="text-ink-muted">relating to industrial training.</span>
              </>
            }
            lede={content.methodologyLead}
            className="max-w-3xl"
          />
          <div className="reveal mt-12" style={{ '--reveal-delay': '160ms' }}>
            <MethodologyTabs />
          </div>
        </div>
      </section>

      <TrainingNext page={page} />
    </>
  );
}

export default LearningProcess;

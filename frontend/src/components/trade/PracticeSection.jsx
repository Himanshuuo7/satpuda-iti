import { useRef, useState } from 'react';

import SectionHeading from '../ui/SectionHeading';
import { tradeIcon } from './icons';
import useRevealEach from '../../hooks/useRevealEach';
import cn from '../../utils/cn';

/**
 * Tools & practical training, on the navy workshop surface.
 *
 * Each trade opens with its own picture of practice — the Electrician's job
 * sequence, the Fitter's tightening tolerances, the Mechanic Diesel's engine
 * systems, COPA's hours per module — then the tool wall. Every tool named is
 * from the curriculum's list of trade tools and equipment; the section says
 * what students are trained on, not what any one campus owns.
 */

function Sequence({ steps, label }) {
  return (
    <div>
      {label && <p className="reveal mb-8 font-mono text-label uppercase text-navy-200/70">{label}</p>}
      <ol className={cn('relative grid gap-8', steps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4', 'lg:gap-6')}>
        {/* Rail + travelling pulse */}
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-7 top-6 w-px overflow-hidden bg-white/15 lg:bottom-auto lg:left-7 lg:right-7 lg:top-7 lg:h-px lg:w-auto"
        >
          <span className="trade-rail-pulse absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-transparent via-tech to-transparent lg:inset-y-0 lg:left-0 lg:h-full lg:w-1/5 lg:bg-gradient-to-r" />
        </span>

        {steps.map((s, i) => {
          const Icon = tradeIcon(s.icon);
          return (
            <li
              key={s.title}
              className="reveal group relative pl-20 lg:pl-0"
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <span className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-navy-900 text-tech transition-[border-color,transform,background-color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-tech group-hover:bg-navy-800 lg:relative">
                <Icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </span>
              <h3 className="pt-3.5 font-display text-[1.125rem] font-semibold text-white lg:mt-5 lg:pt-0">{s.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-[1.6] text-navy-100/70">{s.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ToleranceLadder({ stages }) {
  return (
    <figure className="reveal m-0 rounded-panel border border-white/12 bg-navy-800/60 p-6 sm:p-8">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 font-mono text-label uppercase text-navy-200/70">
        <span>Tolerance band, to scale</span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-px bg-white/60" />
          Nominal size
        </span>
      </figcaption>
      <ol className="mt-4">
        {stages.map((s, i) => (
          <li
            key={s.stage}
            className="grid gap-4 border-t border-white/10 py-6 last:pb-0 sm:grid-cols-[minmax(0,14rem)_1fr_8.5rem] sm:items-center sm:gap-6"
          >
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-tech">{s.stage}</p>
              <p className="mt-1.5 text-[0.875rem] leading-[1.55] text-navy-100/70">{s.body}</p>
            </div>
            <div className="relative h-10" aria-hidden="true">
              <span className="absolute inset-y-0 left-1/2 w-px bg-white/50" />
              <span
                className="trade-band absolute inset-y-2.5 left-0 right-0 rounded-sharp bg-signal/85"
                style={{ '--w': s.width, '--i': i }}
              />
            </div>
            <div className="sm:text-right">
              <p className="whitespace-nowrap font-display text-[1.75rem] font-semibold leading-none tabular text-white">{s.linear}</p>
              {s.angular && (
                <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-navy-200/70">
                  Angular {s.angular}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function EngineSystems({ systems }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const sys = systems[active];

  const onKeyDown = (e) => {
    const n = systems.length;
    const next = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + n) % n;
    setActive(i);
    tabs.current[i]?.focus();
  };

  return (
    <div className="reveal grid gap-4 lg:grid-cols-12 lg:gap-6">
      <div
        role="tablist"
        aria-label="Engine systems"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-[var(--shell-pad)] flex gap-2 overflow-x-auto px-[var(--shell-pad)] pb-1 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {systems.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => (tabs.current[i] = el)}
            type="button"
            role="tab"
            id={`system-tab-${s.id}`}
            aria-selected={active === i}
            aria-controls="system-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              'group flex min-h-[3rem] shrink-0 items-center gap-3 rounded-edge border px-4 text-left text-[0.9375rem] font-medium transition-[background-color,border-color,color] duration-300',
              active === i
                ? 'border-white bg-white text-navy-900'
                : 'border-white/12 text-navy-100 hover:border-tech/60 hover:text-white'
            )}
          >
            {s.label}
            <span
              aria-hidden="true"
              className={cn(
                'ml-auto hidden h-px transition-all duration-300 lg:block',
                active === i ? 'w-6 bg-signal' : 'w-0 bg-tech group-hover:w-3'
              )}
            />
          </button>
        ))}
      </div>

      <div
        id="system-panel"
        role="tabpanel"
        aria-labelledby={`system-tab-${sys.id}`}
        className="rounded-panel border border-white/12 bg-navy-800/60 p-6 sm:p-8 lg:col-span-8"
      >
        <div key={sys.id} className="campus-swap">
          <h3 className="font-display text-[1.75rem] font-semibold leading-tight text-white" style={{ '--i': 1 }}>
            {sys.label}
          </h3>
          <p className="mt-4 max-w-prose text-[1rem] leading-[1.7] text-navy-100/80" style={{ '--i': 2 }}>
            {sys.body}
          </p>
          {sys.tools.length > 0 && (
            <div className="mt-6" style={{ '--i': 3 }}>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-navy-200/60">Curriculum equipment</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {sys.tools.map((t) => (
                  <li key={t} className="rounded-sharp border border-white/15 bg-white/5 px-3 py-1.5 text-[0.8125rem] text-navy-100">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModuleHours({ modules }) {
  const totals = modules.map((m) => m.practical + m.theory);
  const max = Math.max(...totals);
  const sum = totals.reduce((a, b) => a + b, 0);

  return (
    <figure className="reveal m-0 rounded-panel border border-white/12 bg-navy-800/60 p-6 sm:p-8">
      <figcaption className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-label uppercase text-navy-200/70">
          Hours per module · {sum.toLocaleString('en-IN')} trade hours
        </span>
        <span className="flex items-center gap-4 text-[0.75rem] text-navy-100/70">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sharp bg-tech" /> Practical
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sharp bg-navy-300" /> Theory
          </span>
        </span>
      </figcaption>
      <ul className="mt-6 space-y-3.5">
        {modules.map((m, i) => {
          const total = totals[i];
          return (
            <li key={m.label} className="group grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 sm:grid-cols-[13rem_1fr_3.5rem]">
              <span className="truncate text-[0.8125rem] text-navy-100/80 transition-colors group-hover:text-white">{m.label}</span>
              <span className="text-right font-mono text-[0.75rem] tabular text-white sm:order-last">{total} h</span>
              <span className="relative col-span-2 h-2.5 overflow-hidden rounded-sharp bg-white/5 sm:col-span-1" aria-hidden="true">
                <span className="trade-bar absolute inset-y-0 left-0 flex" style={{ width: `${(total / max) * 100}%`, '--i': i }}>
                  <span className="h-full bg-tech transition-[filter] group-hover:brightness-125" style={{ width: `${(m.practical / total) * 100}%` }} />
                  <span className="h-full flex-1 bg-navy-300" />
                </span>
              </span>
              <span className="sr-only">
                {m.practical} practical hours and {m.theory} theory hours
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

function ToolWall({ tools }) {
  return (
    <div className="mt-20">
      <div className="reveal flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <h3 className="font-display text-[1.5rem] font-semibold text-white sm:text-[1.75rem]">Tools & equipment</h3>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-navy-200/60">
          From the curriculum’s list of trade tools & equipment
        </p>
      </div>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-panel border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((g, i) => {
          const Icon = tradeIcon(g.icon);
          return (
            <li
              key={g.title}
              className="reveal group bg-navy-900 p-6 transition-colors duration-300 hover:bg-navy-800"
              style={{ '--reveal-delay': `${i * 70}ms` }}
            >
              <div className="flex items-center gap-3">
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="h-5 w-5 text-tech transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110"
                />
                <h4 className="font-display text-[1.0625rem] font-semibold text-white">{g.title}</h4>
              </div>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[0.875rem] leading-[1.55] text-navy-100/75">
                    <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-tech/60 transition-[width] duration-300 group-hover:w-4" />
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Signature({ practice }) {
  switch (practice.signature) {
    case 'tolerance':
      return (
        <>
          <ToleranceLadder stages={practice.stages} />
          <div className="mt-16">
            <Sequence steps={practice.steps} label="How a fitting job runs" />
          </div>
        </>
      );
    case 'engine':
      return (
        <>
          <EngineSystems systems={practice.systems} />
          <div className="mt-16">
            <Sequence steps={practice.steps} label="How an engine job runs" />
          </div>
        </>
      );
    case 'stack':
      return <ModuleHours modules={practice.modules} />;
    default:
      return <Sequence steps={practice.steps} />;
  }
}

export function PracticeSection({ trade }) {
  const ref = useRevealEach();
  const { practice } = trade;

  return (
    <section
      id="practice"
      ref={ref}
      aria-labelledby="practice-title"
      className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-navy-900 py-20 sm:py-26 lg:py-30"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />

      <div className="shell relative">
        <SectionHeading
          id="practice-title"
          tone="dark"
          eyebrow="Practical training"
          title={practice.title}
          lede={practice.lede}
          className="max-w-3xl"
        />

        <div className="mt-14">
          <Signature practice={practice} />
        </div>

        <ToolWall tools={practice.tools} />
      </div>
    </section>
  );
}

export default PracticeSection;

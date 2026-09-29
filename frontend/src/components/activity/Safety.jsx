import { HardHat, ShieldCheck, Timer, Users } from 'lucide-react';

import ActivityHero from './ActivityHero';
import ActivityNext from './ActivityNext';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { iconFor } from './icons';
import { safety as content } from '../../data/activityContent';

/**
 * Safety.
 *
 * The health, safety and security norms the administration maintains, then
 * the safety programmes from the institute's "सुरक्षा पर विशेष ध्यान" graphic,
 * with that graphic's four slogans as badges and a slow marquee.
 */

const SLOGAN_ICONS = [ShieldCheck, Users, Timer, HardHat];

function Badges() {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {content.slogans.map((s, i) => {
        const Icon = SLOGAN_ICONS[i];
        return (
          <li
            key={s}
            className="group grid aspect-square place-items-center rounded-full border-2 border-dashed border-navy-200 bg-white p-4 text-center shadow-card transition-[transform,border-color] duration-500 ease-out hover:rotate-6 hover:border-signal"
          >
            <span>
              <Icon aria-hidden="true" className="mx-auto h-7 w-7 text-signal transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
              <span className="mt-2 block font-display text-[0.875rem] font-bold uppercase leading-tight tracking-wide text-navy-800 sm:text-[0.9375rem]">
                {s}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function Safety({ page }) {
  const norms = useReveal({ threshold: 0.08 });
  const programmes = useReveal({ threshold: 0.06 });
  const row = [...content.slogans, ...content.slogans];

  return (
    <>
      <ActivityHero
        page={page}
        eyebrow="Health · Safety · Security"
        lines={[
          <>
            Safety<span className="text-signal">.</span>
          </>,
          <span lang="hi" className="text-royal">
            {content.focusHi}
          </span>,
        ]}
        lede="The health, safety and security norms the institute’s administration maintains — and the safety programmes every trainee takes part in."
        aside={<Badges />}
      />

      <section ref={norms} aria-labelledby="norms-title" className="bg-white py-20 sm:py-26">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading id="norms-title" eyebrow="Norms" title="Health, safety and security." lede={content.lead} />
          </div>
          <ol className="grid gap-px self-start overflow-hidden rounded-panel border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:col-span-8">
            {content.norms.map((n, i) => {
              const Icon = iconFor(n.icon);
              return (
                <li key={n.text} className="reveal" style={{ '--reveal-delay': `${i * 60}ms` }}>
                  <div className="sec-tile group relative flex h-full gap-4 bg-white p-6 transition-colors duration-300 hover:bg-canvas-soft">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-signal/10 text-signal transition-[transform,background-color,color] duration-500 ease-out group-hover:-rotate-12 group-hover:bg-signal group-hover:text-white">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-mono text-[0.625rem] tabular text-navy-300">{String(i + 1).padStart(2, '0')}</p>
                      <p className="mt-1 text-[0.9688rem] leading-[1.6] text-navy-800">{n.text}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Slogan marquee */}
      <div aria-hidden="true" className="sec-marquee mask-fade-x overflow-hidden border-y border-navy-700 bg-navy-900 py-6">
        <ul className="flex w-max animate-marquee items-center">
          {row.map((s, i) => (
            <li key={`${s}-${i}`} className="flex items-center">
              <span className="whitespace-nowrap px-8 font-display text-[1.75rem] font-bold uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(22,199,217,0.7)] sm:text-[2.25rem]">
                {s}
              </span>
              <span className="h-2 w-2 shrink-0 rotate-45 bg-signal" />
            </li>
          ))}
        </ul>
      </div>

      <section ref={programmes} aria-labelledby="programmes-title" className="bg-canvas-soft py-20 sm:py-26">
        <div className="shell">
          <div className="max-w-3xl">
            <div className="reveal flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 tick-rule text-navy-300" />
              <span className="eyebrow text-ink-muted">{content.focusEn}</span>
            </div>
            <h2 id="programmes-title" lang="hi" className="reveal mt-5 font-display text-display-md font-semibold text-navy-800" style={{ '--reveal-delay': '60ms' }}>
              {content.focusHi}
            </h2>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.programmes.map((p, i) => {
              const Icon = iconFor(p.icon);
              return (
                <li key={p.en} className="reveal" style={{ '--reveal-delay': `${Math.min(i * 45, 540)}ms` }}>
                  <div className="group flex h-full items-start gap-4 rounded-panel border border-navy-100 bg-white p-5 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-edge bg-navy-800 text-tech transition-transform duration-500 ease-out group-hover:-rotate-6">
                      <Icon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
                    </span>
                    <span>
                      <span lang="hi" className="block text-[1rem] font-semibold leading-snug text-navy-800">
                        {p.hi}
                      </span>
                      <span className="mt-1 block text-[0.8438rem] leading-snug text-ink-muted">{p.en}</span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ActivityNext page={page} />
    </>
  );
}

export default Safety;

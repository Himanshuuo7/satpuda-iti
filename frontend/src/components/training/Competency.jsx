import { ArrowLeftRight } from 'lucide-react';

import TrainingHero from './TrainingHero';
import TrainingNext from './TrainingNext';
import MixDonut from './MixDonut';
import GearOutline from '../ui/GearOutline';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { iconFor } from './icons';
import { competency as content } from '../../data/trainingContent';

/**
 * Competency Based Learning — हमारी प्रशिक्षण प्रणाली.
 *
 * The principle (what the market demands ⇌ how the trainee is prepared for
 * it) as the hero instrument, the published training mix, the twelve work
 * skills in English and Hindi, and everything a trainee gets.
 */

function Principle() {
  const { principle } = content;
  return (
    <figure className="rounded-panel border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <figcaption lang="hi" className="text-center font-display text-[1.25rem] font-semibold text-navy-800">
        {principle.titleHi}
      </figcaption>
      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="relative grid aspect-square place-items-center">
          <GearOutline spin strokeWidth={2.5} className="absolute inset-0 h-full w-full text-signal/80" />
          <div className="relative grid aspect-square w-[74%] place-items-center rounded-full bg-navy-800 p-3 text-center">
            <p className="text-[0.75rem] font-medium leading-snug text-white sm:text-[0.8125rem]">{principle.demand.en}</p>
          </div>
        </div>
        <ArrowLeftRight aria-hidden="true" className="h-6 w-6 animate-pulse-marker text-navy-400" strokeWidth={1.75} />
        <div className="grid aspect-square place-items-center rounded-full border-[6px] border-signal p-1">
          <div className="grid h-full w-full place-items-center rounded-full bg-navy-800 p-3 text-center">
            <p className="text-[0.75rem] font-medium leading-snug text-white sm:text-[0.8125rem]">{principle.prepare.en}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-navy-50 pt-4 text-center">
        <p lang="hi" className="text-[0.8125rem] leading-snug text-ink-muted">
          {principle.demand.hi}
        </p>
        <p lang="hi" className="text-[0.8125rem] leading-snug text-ink-muted">
          {principle.prepare.hi}
        </p>
      </div>
    </figure>
  );
}

export function Competency({ page }) {
  const mix = useReveal({ threshold: 0.15 });
  const skills = useReveal({ threshold: 0.08 });
  const get = useReveal({ threshold: 0.08 });

  return (
    <>
      <TrainingHero
        page={page}
        eyebrow="Our training system"
        lines={[
          'Competency',
          <span className="text-royal">
            Based Learning<span className="text-signal">.</span>
          </span>,
        ]}
        lede={content.subtitleEn + ': what a trainee must be able to do, as industry demands — and how the training prepares them for it.'}
        aside={<Principle />}
      >
        <p lang="hi" className="font-display text-[1.25rem] font-medium text-navy-800 sm:text-[1.5rem]">
          {content.subtitleHi}
        </p>
      </TrainingHero>

      {/* Training mix */}
      <section ref={mix} aria-labelledby="mix-title" className="bg-white py-20 sm:py-26">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="mix-title"
              eyebrow="Training mix"
              title={
                <>
                  More than a third <span className="text-ink-muted">is practical.</span>
                </>
              }
              lede={`Practicals take ${content.mix[0].value}% of training time — followed by classroom sessions, technical presentations, audio-visual sessions, technical activities, group discussions and projects.`}
            />
          </div>
          <div className="reveal lg:col-span-7" style={{ '--reveal-delay': '140ms' }}>
            <MixDonut tone="light" />
          </div>
        </div>
      </section>

      {/* Twelve skills */}
      <section ref={skills} aria-labelledby="skills-title" className="bg-canvas-soft py-20 sm:py-26">
        <div className="shell">
          <div className="max-w-3xl">
            <div className="reveal flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 tick-rule text-navy-300" />
              <span className="eyebrow text-ink-muted">{content.skillsTitleEn}</span>
            </div>
            <h2 id="skills-title" lang="hi" className="reveal mt-5 font-display text-display-md font-semibold text-navy-800" style={{ '--reveal-delay': '60ms' }}>
              {content.skillsTitleHi}
            </h2>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100 md:grid-cols-3 lg:grid-cols-4">
            {content.skills.map((s, i) => (
              <li key={s.en} className="reveal" style={{ '--reveal-delay': `${i * 40}ms` }}>
                <div className="group relative flex h-full min-h-[8.5rem] flex-col justify-between overflow-hidden bg-white p-5 transition-colors duration-300 hover:bg-navy-800 sm:p-6">
                  <span className="font-mono text-[0.625rem] tabular text-navy-300 transition-colors duration-300 group-hover:text-tech">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-[1rem] font-semibold leading-snug text-navy-800 transition-colors duration-300 group-hover:text-white sm:text-[1.0625rem]">
                      {s.en}
                    </span>
                    <span lang="hi" className="mt-1 block text-[0.875rem] text-ink-muted transition-colors duration-300 group-hover:text-navy-100/80">
                      {s.hi}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What you get */}
      <section ref={get} aria-labelledby="get-title" className="relative overflow-hidden bg-navy-800 py-20 sm:py-26">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />
        <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              id="get-title"
              tone="dark"
              eyebrow="Certificates & programmes"
              title={
                <>
                  What you get <span className="text-tech">@ Satpuda ITI.</span>
                </>
              }
            />
            <p aria-hidden="true" className="reveal mt-8 font-display text-[4.5rem] font-bold leading-none tabular text-white/10">
              {content.get.length}
            </p>
          </div>
          <ol className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
            {content.get.map((g, i) => {
              const Icon = iconFor(g.icon);
              return (
                <li
                  key={g.label}
                  className="reveal group flex items-center gap-4 border-b border-white/10 py-4"
                  style={{ '--reveal-delay': `${Math.min(i * 40, 480)}ms` }}
                >
                  <span className="w-6 font-mono text-[0.6875rem] tabular text-navy-200/50 transition-colors duration-300 group-hover:text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-tech transition-transform duration-300 group-hover:scale-125" strokeWidth={1.75} />
                  <span className="text-[1rem] font-medium text-navy-50 transition-transform duration-300 ease-out group-hover:translate-x-1">{g.label}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <TrainingNext page={page} />
    </>
  );
}

export default Competency;

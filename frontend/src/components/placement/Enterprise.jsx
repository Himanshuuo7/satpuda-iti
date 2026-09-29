import { ArrowUpRight, BadgeCheck, Flag, Lightbulb, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

import PlacementHero from './PlacementHero';
import PlacementNext from './PlacementNext';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { entrepreneurship as content } from '../../data/placementContent';
import { placementPageBySlug } from '../../data/placementPages';
import cn from '../../utils/cn';

/**
 * Entrepreneurship Development — उद्यमिता विकास.
 *
 * Ten stages. On large screens they snake across two rows the way the
 * published flowchart does (left to right, down, then right to left) and the
 * connecting track draws itself stage by stage; below that they run as one
 * vertical track.
 */

/** Grid placement for the snake: row one left→right, row two right→left. */
const SNAKE = [
  'lg:col-start-1 lg:row-start-1',
  'lg:col-start-2 lg:row-start-1',
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-4 lg:row-start-1',
  'lg:col-start-5 lg:row-start-1',
  'lg:col-start-5 lg:row-start-2',
  'lg:col-start-4 lg:row-start-2',
  'lg:col-start-3 lg:row-start-2',
  'lg:col-start-2 lg:row-start-2',
  'lg:col-start-1 lg:row-start-2',
];

function StagesCard() {
  return (
    <div className="relative overflow-hidden rounded-panel border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-signal/[0.06]" />
      <div className="relative flex items-center gap-4">
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-signal text-white">
          <span aria-hidden="true" className="absolute inset-0 animate-ping-once rounded-full bg-signal" />
          <Lightbulb aria-hidden="true" className="relative h-6 w-6 animate-float-soft" strokeWidth={1.75} />
        </span>
        <p lang="hi" className="font-display text-[1.5rem] font-semibold text-navy-800">
          {content.titleHi}
        </p>
      </div>
      <p className="relative mt-8 font-display text-[4.5rem] font-bold leading-none tabular text-navy-800">
        {content.steps.length}
        <span className="ml-2 align-top text-[1rem] font-medium tracking-normal text-ink-muted">stages</span>
      </p>
      <div className="relative mt-6 flex items-center gap-3 border-t border-navy-100 pt-5 text-[0.875rem] font-medium leading-snug text-navy-700">
        <Flag aria-hidden="true" className="h-4 w-4 shrink-0 text-signal" strokeWidth={2} />
        <span className="min-w-0">{content.steps[0].title}</span>
        <span aria-hidden="true" className="h-px w-6 shrink-0 tick-rule text-navy-300 sm:w-auto sm:flex-1" />
        <span className="min-w-0 text-right">{content.steps[content.steps.length - 1].title}</span>
        <Trophy aria-hidden="true" className="h-4 w-4 shrink-0 text-signal" strokeWidth={2} />
      </div>
    </div>
  );
}

function Node({ step, n }) {
  const edge = step.kind === 'start' || step.kind === 'end';
  const check = step.kind === 'checkpoint';
  return (
    <span
      className={cn(
        'relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-[0.75rem] font-semibold tabular transition-[transform,background-color,border-color,color] duration-500 ease-out group-hover:scale-110',
        edge && 'border-signal bg-signal text-white shadow-[0_0_0_6px_rgba(224,27,36,0.12)]',
        check && 'border-tech-600 bg-white text-tech-700 shadow-[0_0_0_6px_rgba(22,199,217,0.14)] group-hover:bg-tech-600 group-hover:text-white',
        !edge && !check && 'border-navy-200 bg-white text-navy-700 group-hover:border-royal group-hover:bg-royal group-hover:text-white'
      )}
    >
      {String(n).padStart(2, '0')}
      {check && (
        <BadgeCheck aria-hidden="true" className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-white text-tech-600" strokeWidth={2.25} />
      )}
    </span>
  );
}

function Stage({ step, index, total }) {
  const last = index === total - 1;
  const row1 = index < 4; // stages 1–4 draw right; 5 turns down; 6–9 draw left
  const turn = index === 4;

  return (
    <li
      className={cn(
        'reveal group relative flex gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center',
        SNAKE[index]
      )}
      style={{ '--reveal-delay': `${index * 60}ms` }}
    >
      {/* Track, small screens: straight down to the next stage */}
      {!last && (
        <span aria-hidden="true" className="absolute bottom-[-2rem] left-5 top-10 w-px bg-navy-100 lg:hidden">
          <span className="sec-seg-y absolute inset-0 bg-royal" style={{ '--i': index }} />
        </span>
      )}

      {/* Track, large screens: the snake */}
      {!last && row1 && (
        <span aria-hidden="true" className="absolute left-1/2 top-5 hidden h-px w-[calc(100%+1.5rem)] bg-navy-100 lg:block">
          <span className="sec-seg-x absolute inset-0 bg-royal" style={{ '--i': index }} />
        </span>
      )}
      {turn && (
        <span aria-hidden="true" className="absolute left-1/2 top-5 hidden h-[calc(100%+4rem)] w-px bg-navy-100 lg:block">
          <span className="sec-seg-y absolute inset-0 bg-royal" style={{ '--i': index }} />
        </span>
      )}
      {!last && !row1 && !turn && (
        <span aria-hidden="true" className="absolute right-1/2 top-5 hidden h-px w-[calc(100%+1.5rem)] bg-navy-100 lg:block">
          <span className="sec-seg-x sec-seg-x-rev absolute inset-0 bg-royal" style={{ '--i': index }} />
        </span>
      )}

      <Node step={step} n={index + 1} />

      {/* At the turn the track runs down behind this label, so it gets a backing. */}
      <div className={cn('min-w-0 pt-1.5 lg:pt-0', turn && 'lg:relative lg:z-10 lg:rounded-edge lg:bg-white lg:px-2 lg:py-1')}>
        <h3
          className={cn(
            'text-[1.0625rem] font-semibold leading-snug tracking-tight transition-colors duration-300',
            step.kind === 'start' || step.kind === 'end' ? 'text-signal' : 'text-navy-800 group-hover:text-royal'
          )}
        >
          {step.title}
        </h3>
        {step.pair && (
          <p className="mt-1.5 text-[0.9063rem] font-medium text-navy-700">
            <span aria-hidden="true" className="mr-1 font-mono text-tech-700">+</span>
            <span className="sr-only">and </span>
            {step.pair}
          </p>
        )}
        {step.hi && (
          <p lang="hi" className="mt-1.5 text-[0.9063rem] text-ink-muted">
            {step.hi}
          </p>
        )}
        {step.kind === 'checkpoint' && (
          <p className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-tech-700">Checkpoint</p>
        )}
      </div>
    </li>
  );
}

export function Enterprise({ page }) {
  const road = useReveal({ threshold: 0.12 });
  const camps = useReveal({ threshold: 0.3 });
  const cell = placementPageBySlug['industrial-interface'];

  return (
    <>
      <PlacementHero
        page={page}
        eyebrow="Become Entrepreneur"
        lines={['Entrepreneurship', <span className="text-royal">Development<span className="text-signal">.</span></span>]}
        lede={content.lede}
        aside={<StagesCard />}
      />

      <section ref={road} aria-labelledby="road-title" className="relative overflow-hidden bg-white py-20 sm:py-26">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-light opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />
        <div className="shell relative">
          <SectionHeading
            id="road-title"
            eyebrow="The roadmap"
            title={
              <>
                From a business mind set <span className="text-ink-muted">to enjoying the success.</span>
              </>
            }
            className="max-w-3xl"
          />

          <ol className="mt-16 grid gap-y-8 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-16">
            {content.steps.map((step, i) => (
              <Stage key={step.title} step={step} index={i} total={content.steps.length} />
            ))}
          </ol>
        </div>
      </section>

      <section ref={camps} aria-labelledby="camps-title" className="bg-canvas-soft py-16 sm:py-20">
        <div className="shell">
          <div className="reveal grid gap-8 rounded-panel border border-navy-100 bg-white p-7 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p id="camps-title" className="eyebrow text-signal">
                Self Employment Camps
              </p>
              <blockquote className="mt-4 font-display text-[1.25rem] font-medium leading-[1.5] text-navy-800 sm:text-[1.5rem]">
                {content.camps}
              </blockquote>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to={cell.to}
                className="group inline-flex min-h-[2.75rem] items-center gap-2 text-[0.9375rem] font-semibold text-navy-800 transition-colors hover:text-signal"
              >
                All activities of the cell
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PlacementNext page={page} />
    </>
  );
}

export default Enterprise;

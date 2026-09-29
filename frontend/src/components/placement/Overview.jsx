import { ArrowDownRight } from 'lucide-react';

import PlacementHero from './PlacementHero';
import PlacementNext from './PlacementNext';
import SectionPageGrid from '../section/SectionPageGrid';
import StatCounter from '../ui/StatCounter';
import Figure from '../ui/Figure';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import useCountUp from '../../hooks/useCountUp';
import { iconFor } from './icons';
import { photos } from '../../data/media';
import { placementPages } from '../../data/placementPages';
import { overview, placementDetails, placementTotals as T } from '../../data/placementContent';

/**
 * /placements — the placement cell at a glance: the headline figure, the
 * institute's own description of campus recruitment, the record in four
 * numbers, and a door into each of the six pages.
 */

const PEAK = Math.max(...placementDetails.record.map((r) => r.placed));

/** Hero instrument: the headline figure over a small bar record of each year. */
function HeadlineInstrument() {
  const [ref, value] = useCountUp(overview.headline.value, { duration: 1800 });
  const reveal = useReveal({ threshold: 0.2 });

  return (
    <div ref={reveal} className="relative rounded-panel border border-white/12 bg-navy-900/60 p-6 backdrop-blur-sm sm:p-8">
      <p className="font-mono text-label uppercase text-tech">Campus placements</p>
      <p ref={ref} className="mt-4 font-display text-[4.5rem] font-bold leading-none tabular text-white sm:text-[5.5rem]">
        {value.toLocaleString('en-IN')}
      </p>
      <p className="mt-3 text-[0.9375rem] text-navy-100/80">{overview.headline.label}</p>

      <div aria-hidden="true" className="mt-8 flex h-24 items-end gap-2 border-b border-white/15">
        {placementDetails.record.map((r, i) => (
          <div key={r.year} className="flex h-full flex-1 flex-col justify-end">
            <span
              className="sec-bar block rounded-t-[3px] bg-gradient-to-t from-royal-400 to-tech"
              style={{ height: `${(r.placed / PEAK) * 100}%`, '--i': i }}
            />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="mt-2 flex gap-2">
        {placementDetails.record.map((r) => (
          <span key={r.year} className="flex-1 text-center font-mono text-[0.625rem] tabular text-navy-200/60">
            {String(r.year).slice(2)}
          </span>
        ))}
      </div>
      <p className="sr-only">
        Trainees placed each year:{' '}
        {placementDetails.record.map((r) => `${r.year}: ${r.placed}`).join(', ')}.
      </p>
    </div>
  );
}

export function Overview() {
  const intro = useReveal({ threshold: 0.12 });
  const stats = useReveal({ threshold: 0.2 });
  const cells = useReveal({ threshold: 0.05 });

  return (
    <>
      <PlacementHero
        tone="dark"
        eyebrow="Placement Cell"
        lines={[
          'From campus',
          <>
            <span className="text-tech">to career</span>
            <span className="text-signal">.</span>
          </>,
        ]}
        lede="Campus interviews, industry exposure, career guidance and entrepreneurship development — everything the Satpuda Placement & Guidance Cell does to take a trainee from the workshop to a job."
        aside={<HeadlineInstrument />}
      >
        <a
          href="#cell"
          className="group inline-flex min-h-[2.875rem] items-center gap-2.5 rounded-edge border border-white/25 px-6 text-[0.9375rem] font-medium text-white transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-tech/70 hover:bg-white/10 active:translate-y-px"
        >
          Explore the placement cell
          <ArrowDownRight
            aria-hidden="true"
            strokeWidth={2}
            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:translate-y-0.5"
          />
        </a>
      </PlacementHero>

      {/* Campus recruitment, in the institute's words */}
      <section ref={intro} aria-labelledby="campus-title" className="relative bg-white py-20 sm:py-26">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id="campus-title" eyebrow="Campus Recruitment Programme" title="A very vital activity." />
            <p
              className="reveal mt-8 max-w-prose font-display text-[1.25rem] font-medium leading-[1.55] tracking-[-0.01em] text-navy-800 sm:text-[1.4375rem]"
              style={{ '--reveal-delay': '140ms' }}
            >
              {overview.campusNote}
            </p>
          </div>
          <figure className="reveal group lg:col-span-5" style={{ '--reveal-delay': '120ms' }}>
            <Figure
              src={photos.practicalTraining.src}
              alt={photos.practicalTraining.alt}
              ratio="4/3"
              className="rounded-panel"
              imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            >
              <span aria-hidden="true" className="about-shutter absolute inset-0 bg-navy-800" style={{ '--reveal-delay': '200ms' }} />
            </Figure>
            <figcaption className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">
              Hands-on practical training · Satpuda ITI
            </figcaption>
          </figure>
        </div>
      </section>

      {/* The record in four numbers */}
      <section ref={stats} aria-label="Placement record" className="border-y border-navy-100 bg-canvas-soft py-14 sm:py-16">
        <div className="shell">
          <div className="reveal grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            <StatCounter value={T.placed} label="Trainees placed" note={`${T.first}–${T.last}`} />
            <StatCounter value={T.drives} label="Placement drives" note={`${T.first}–${T.last}`} />
            <StatCounter value={T.bestRate} suffix="%" label="Best placement percentage" note={String(T.bestRateYear)} />
            <StatCounter
              value={T.topPackage / 100000}
              decimals={1}
              prefix="₹"
              suffix=" L"
              label="Highest salary package"
              note={`₹${T.topPackage.toLocaleString('en-IN')}/-`}
            />
          </div>
        </div>
      </section>

      {/* The six pages */}
      <section id="cell" ref={cells} aria-labelledby="cell-title" className="scroll-mt-[calc(var(--navbar-h-scrolled)+3.5rem)] bg-white py-20 sm:py-26">
        <div className="shell">
          <SectionHeading
            id="cell-title"
            eyebrow="Inside the placement cell"
            title={
              <>
                Six ways we prepare <span className="text-royal">every trainee.</span>
              </>
            }
            className="max-w-3xl"
          />
          <SectionPageGrid pages={placementPages} iconFor={iconFor} className="mt-14" />
        </div>
      </section>

      <PlacementNext page={null} />
    </>
  );
}

export default Overview;

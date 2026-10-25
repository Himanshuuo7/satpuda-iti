import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import CountUp from '../iti/CountUp';
import PlacementBento from '../placement/PlacementBento';
import { placement } from '../../data/satpudaData';
import { placementSourceHi, placementTotals } from '../../data/placementRecord';
import { recruiterLogos } from '../../data/media';
import { recruiters } from '../../data/placementContent';
import { PLACEMENT_BASE } from '../../data/placementPages';
import useReveal from '../../hooks/useReveal';

/**
 * Placements.
 *
 * The campus-drive record of every Satpuda ITI that sent one in is the
 * section: a bento of white cards (`PlacementBento`) — candidates selected
 * year by year with a year picker, that period's drives and turnout, and the
 * same period ITI by ITI — beside the totals of that record and a note on
 * where the figures come from. Recruiters follow as two rows of logo tiles
 * drifting in opposite directions.
 *
 * Totals are sums of the records' rows, nothing more, and the language stays
 * "selected"/"record" — never "guaranteed".
 */

const { first: FIRST, last: LAST } = placementTotals;

const TOTALS = [
  { value: placementTotals.drives.toLocaleString('en-IN'), label: 'Campus drives' },
  { value: placementTotals.selected.toLocaleString('en-IN'), label: 'Selected' },
  { value: String(placementTotals.itis), label: 'ITIs' },
];

/** Second row starts part-way through, so the two rows never line up. */
const ROW_B = [...recruiterLogos.slice(5), ...recruiterLogos.slice(0, 5)];

function LogoRow({ logos, reverse = false, decorative = false }) {
  return (
    <div
      aria-hidden={decorative || undefined}
      className={`flex w-max animate-marquee ${reverse ? 'sec-marquee-rev' : ''}`}
    >
      {[0, 1].map((copy) => {
        const named = !decorative && copy === 0;
        return (
          <ul
            key={copy}
            aria-label={named ? 'Recruiters' : undefined}
            aria-hidden={!decorative && copy === 1 ? true : undefined}
            className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
          >
            {logos.map((logo) => (
              <li
                key={logo.src}
                className="pl-logo relative flex h-[4.5rem] w-36 shrink-0 items-center justify-center overflow-hidden rounded-panel border border-navy-100 bg-white px-3 shadow-card sm:h-24 sm:w-48 sm:px-4"
              >
                <span aria-hidden="true" className="pl-logo-rule absolute inset-x-0 top-0 h-[2px] bg-signal" />
                <img
                  src={logo.src}
                  alt={named ? logo.alt : ''}
                  loading="lazy"
                  decoding="async"
                  width="100"
                  height="50"
                  className="pl-logo-img h-14 w-auto max-w-full bg-transparent object-contain sm:h-20"
                />
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

export function Placements() {
  const ref = useReveal();

  return (
    <section
      id="placements"
      ref={ref}
      aria-labelledby="placements-title"
      className="relative overflow-hidden bg-canvas-soft py-20 sm:py-26 lg:py-30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 blueprint-light [mask-image:radial-gradient(60%_55%_at_0%_0%,#000_15%,transparent_75%)]"
      />

      <div className="shell relative">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="placements-title"
              eyebrow="Placements"
              title={
                <>
                  Campus drives,
                  <br />
                  <span className="text-ink-muted">year on year.</span>
                </>
              }
            />
            <p
              className="reveal mt-6 max-w-prose text-[1.0625rem] leading-[1.78] text-ink-muted"
              style={{ '--reveal-delay': '140ms' }}
            >
              {placement.campusNote}
            </p>

            {/* Totals of the published record */}
            <div className="reveal mt-8" style={{ '--reveal-delay': '180ms' }}>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">
                Record · {FIRST}–{LAST}
              </p>
              <dl className="mt-3 grid grid-cols-3 divide-x divide-navy-100 border-y border-navy-100">
                {TOTALS.map((t) => (
                  <div key={t.label} className="group flex flex-col px-3 py-4 first:pl-0 sm:px-5">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">{t.label}</dt>
                    <dd className="mt-auto pt-2 font-display text-[1.75rem] font-semibold leading-none tracking-tight text-navy-800 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 sm:text-[2rem]">
                      <CountUp value={t.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Where the figures come from */}
            <div className="reveal relative mt-8 pl-5" style={{ '--reveal-delay': '220ms' }}>
              <span
                aria-hidden="true"
                className="absolute inset-y-1 left-0 w-[2px] origin-top scale-y-0 rounded-full bg-signal transition-transform delay-300 duration-700 ease-out [.is-visible_&]:scale-y-100"
              />
              <p lang="hi" className="text-[0.9375rem] leading-[1.75] text-ink-muted">
                {placementSourceHi}
              </p>
            </div>

            <div className="reveal mt-9" style={{ '--reveal-delay': '260ms' }}>
              <Button to={`${PLACEMENT_BASE}/details`} variant="outline">
                Placement details
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <PlacementBento />
          </div>
        </div>

        {/* Recruiter marks */}
        <div className="reveal mt-20 lg:mt-24">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-signal" />
            <h3 className="eyebrow shrink-0 text-ink-muted">Our esteemed recruiters</h3>
            <span aria-hidden="true" className="h-px flex-1 tick-rule text-navy-200" />
            <Link
              to={`${PLACEMENT_BASE}/recruiters`}
              className="group inline-flex shrink-0 items-center gap-1.5 text-[0.8125rem] font-medium text-navy-800 transition-colors duration-200 hover:text-signal"
            >
              All {recruiters.names.length} recruiters
              <ArrowRight
                aria-hidden="true"
                strokeWidth={2}
                className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="reveal sec-marquee mask-fade-x relative mt-6 overflow-hidden py-4" style={{ '--reveal-delay': '120ms' }}>
        <LogoRow logos={recruiterLogos} />
        <div className="mt-3 sm:mt-4">
          <LogoRow logos={ROW_B} reverse decorative />
        </div>
      </div>
    </section>
  );
}

export default Placements;

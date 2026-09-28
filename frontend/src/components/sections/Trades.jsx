import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Cog,
  MonitorCog,
  Settings,
  ShieldCheck,
  Trophy,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Figure from '../ui/Figure';
import GearOutline from '../ui/GearOutline';
import { homeCounters, trades } from '../../data/satpudaData';
import { photos } from '../../data/media';
import useReveal from '../../hooks/useReveal';
import cn from '../../utils/cn';

/**
 * Trades — the four NCVT trades as a four-up card register.
 *
 * Each card carries a photograph of that kind of work, a numbered tab, a
 * hand-lettered note and the trade's published scope. All four rest white and
 * identical, so the row reads as one register rather than a ranked set.
 *
 * Motion is all hover-and-reveal: the section rises once on scroll (via
 * `useReveal`), then each card answers the pointer by inverting onto the navy
 * surface — white type, red arrow — while it lifts, the photograph pushes in,
 * the rule under the number extends and the icon badge rises. Every one of
 * those is a transform or a colour, and the global reduced-motion rule in
 * index.css switches the lot off.
 *
 * No duration is shown because the official course pages publish none.
 */

/**
 * Per-trade presentation. This is styling, not content, so it lives with the
 * component rather than in the data module — the photographs and the notes are
 * editorial choices about how to show a trade, not facts about it.
 *
 * The registry has no engine-bay or computer-lab photograph, so Mechanic
 * Diesel and COPA borrow the closest real ones: an industrial visit with
 * vehicles, and a control room with a workstation.
 */
const CARDS = {
  electrician: {
    icon: Zap,
    photo: photos.practicalWorkshop,
    note: ['Powering', 'Possibilities'],
  },
  fitter: {
    icon: Wrench,
    photo: photos.garraWorkshop,
    note: ['Build', 'With Precision'],
  },
  'diesel-mechanic': {
    icon: Cog,
    photo: photos.students01,
    note: ['Keep', 'Machines Moving'],
  },
  copa: {
    icon: MonitorCog,
    photo: photos.students03,
    note: ['Code', 'Your Career'],
  },
};

/** Standing the scheme carries, shown beside the lede. */
const ASSURANCES = [
  { icon: ShieldCheck, label: 'NCVT', detail: 'Affiliated' },
  { icon: Settings, label: 'Industry', detail: 'Aligned' },
  { icon: BarChart3, label: 'Skill based', detail: 'Future ready' },
];

const enrolled = homeCounters.find((c) => c.label === 'Students Enrolled');

/** Closing measures. The first is the institute's own published counter. */
const MEASURES = [
  {
    icon: Users,
    value: enrolled ? `${enrolled.value}${enrolled.suffix}+` : '45K+',
    label: enrolled?.label ?? 'Students Enrolled',
  },
  { icon: Briefcase, value: 'Industry Oriented', label: 'Practical Learning' },
  { icon: Trophy, value: 'Better Opportunities', label: 'For Brighter Future' },
];

/** A 4x4 red dot field, lifted from the gear ring's rivets. */
function DotField({ className }) {
  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <circle key={`${r}-${c}`} cx={4 + c * 12} cy={4 + r * 12} r="2.4" fill="currentColor" />
        ))
      )}
    </svg>
  );
}

function TradeCard({ trade, i }) {
  const card = CARDS[trade.id] ?? { icon: Cog, photo: photos.garraWorkshop, note: [] };
  const { icon: Icon, photo, note } = card;

  return (
    <li className="reveal" style={{ '--reveal-delay': `${i * 90}ms` }}>
      <Link
        to={trade.slug}
        aria-label={`${trade.name} — ${trade.scheme}`}
        /* Every card rests white; the navy treatment is the hover state, so
           the whole row answers the pointer the same way. */
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-[0.875rem]',
          'border border-navy-100 bg-white shadow-card',
          'transition-[transform,box-shadow,border-color,background-color] duration-500 ease-out',
          'hover:-translate-y-1.5 hover:border-navy-700 hover:bg-navy-800 hover:shadow-deep'
        )}
      >
        {/* Photograph */}
        <div className="relative overflow-hidden">
          <Figure
            src={photo.src}
            alt={photo.alt}
            ratio="3/2"
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
            imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          >
            {/* Grades the lower half so the hand-lettered note stays legible. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent"
            />
          </Figure>

          {/* Hand-lettered note */}
          {note.length > 0 && (
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-4 block text-right font-script text-[1.35rem] font-semibold leading-[1.05] text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5 sm:text-[1.5rem]"
            >
              {note.map((n) => (
                <span key={n} className="block">
                  {n}
                </span>
              ))}
            </span>
          )}
        </div>

        {/* Icon badge, straddling the photograph's lower edge. */}
        <span className="relative z-10 -mt-7 ml-5 grid h-14 w-14 shrink-0 place-items-center rounded-[0.75rem] bg-white text-signal shadow-card transition-[transform,color] duration-500 ease-out group-hover:-translate-y-1 group-hover:text-navy-700">
          <Icon aria-hidden="true" strokeWidth={2} className="h-6 w-6" />
        </span>

        {/* Body */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <h3 className="font-display text-[1.375rem] font-bold tracking-tight text-navy-800 transition-colors duration-500 ease-out group-hover:text-white">
            {trade.name}
          </h3>
          <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-ink-muted transition-colors duration-500 ease-out group-hover:text-navy-100/80">
            {trade.scope}
          </p>

          <div className="mt-auto flex items-center justify-between gap-4 pt-7">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft transition-colors duration-500 ease-out group-hover:text-navy-100/55">
              {trade.scheme}
            </span>
            <span
              aria-hidden="true"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy-200 text-navy-800 transition-colors duration-300 ease-out group-hover:border-signal group-hover:bg-signal group-hover:text-white"
            >
              <ArrowRight
                strokeWidth={2}
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export function Trades() {
  const ref = useReveal();

  return (
    <section
      id="trades"
      ref={ref}
      aria-labelledby="trades-title"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Technical substrate */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,#F6F8FB_0%,#FFFFFF_38%,#FFFFFF_62%,#F6F8FB_100%)]"
      />
      <GearOutline
        spin
        className="pointer-events-none absolute -top-28 right-[20%] hidden h-[22rem] w-[22rem] text-navy-600/[0.06] lg:block"
      />
      <DotField className="pointer-events-none absolute right-6 top-8 hidden h-11 w-11 text-signal/70 lg:block" />

      <div className="shell relative">
        {/* ------------------------------- Masthead ------------------------------- */}
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="reveal flex items-center gap-3.5">
              <span aria-hidden="true" className="h-[3px] w-8 rounded-full bg-signal" />
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-navy-700">
                Craftsman Training Scheme
              </span>
            </div>

            <h2
              id="trades-title"
              className="reveal mt-5 font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-navy-800"
              style={{ '--reveal-delay': '60ms' }}
            >
              Four trades.
              <br />
              <span className="text-signal">One</span> standard.
            </h2>

            <p
              className="reveal mt-4 text-[1.0625rem] font-medium leading-[1.5] text-navy-700"
              style={{ '--reveal-delay': '110ms' }}
            >
              Hands-on training. Real industry exposure. A better tomorrow.
            </p>
          </div>

          <div className="lg:col-span-5">
            <p
              className="reveal text-[0.9375rem] leading-[1.7] text-ink-muted"
              style={{ '--reveal-delay': '150ms' }}
            >
              Each trade runs under the Craftsman Training Scheme and is affiliated to
              the National Council for Vocational Training, New Delhi.
            </p>

            <ul
              className="reveal mt-6 flex flex-wrap items-center gap-y-4"
              style={{ '--reveal-delay': '200ms' }}
            >
              {ASSURANCES.map(({ icon: Icon, label, detail }) => (
                <li
                  key={label}
                  className="group/a flex items-center gap-2.5 border-navy-100 pr-3.5 [&+&]:border-l [&+&]:pl-3.5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.6rem] border border-navy-100 bg-canvas-soft text-navy-700 transition-[border-color,transform] duration-300 ease-out group-hover/a:-translate-y-0.5 group-hover/a:border-navy-300">
                    <Icon aria-hidden="true" strokeWidth={1.8} className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block whitespace-nowrap text-[0.6875rem] font-bold uppercase leading-tight tracking-[0.08em] text-navy-800">
                      {label}
                    </span>
                    <span className="block whitespace-nowrap text-[0.625rem] uppercase leading-tight tracking-[0.1em] text-ink-soft">
                      {detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hand-lettered motto */}
          <div
            className="reveal hidden lg:col-span-2 lg:flex lg:items-start lg:justify-end"
            style={{ '--reveal-delay': '250ms' }}
          >
            <span aria-hidden="true" className="relative block -rotate-[7deg] pr-2 text-right">
              <span className="block font-script text-[2rem] font-bold leading-[0.9] text-navy-800 xl:text-[2.5rem]">
                Skill
              </span>
              <span className="block font-script text-[2rem] font-bold leading-[0.9] text-navy-800 xl:text-[2.5rem]">
                Train
              </span>
              <span className="block font-script text-[2rem] font-bold leading-[0.9] text-navy-800 xl:text-[2.5rem]">
                Empower
              </span>
              <svg
                viewBox="0 0 120 14"
                fill="none"
                className="mt-1 h-3 w-full text-signal"
                aria-hidden="true"
              >
                <path
                  d="M2 9C26 3 74 2 118 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* -------------------------------- Cards --------------------------------- */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {trades.map((trade, i) => (
            <TradeCard key={trade.id} trade={trade} i={i} />
          ))}
        </ul>

        {/* ------------------------------- Closing -------------------------------- */}
        <div className="reveal relative mt-12 lg:mt-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-8 lg:pr-[15rem] xl:pr-[17rem]">
            <ul className="flex flex-wrap items-center gap-y-5">
              {MEASURES.map(({ icon: Icon, value, label }) => (
                <li
                  key={label}
                  className="group/m flex items-center gap-3 border-navy-100 pr-5 [&+&]:border-l [&+&]:pl-5"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.6}
                    className="h-7 w-7 shrink-0 text-navy-700 transition-transform duration-300 ease-out group-hover/m:-translate-y-0.5"
                  />
                  <span>
                    <span className="block whitespace-nowrap font-display text-[1.0625rem] font-bold leading-tight tabular text-navy-800">
                      {value}
                    </span>
                    <span className="block whitespace-nowrap text-[0.8125rem] leading-tight text-ink-muted">
                      {label}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Red closing block, running out to the section edge. */}
          <a
            href="https://www.skillindia.gov.in/"
            target="_blank"
            rel="noreferrer noopener"
            className="group/skill absolute -right-[var(--shell-pad)] bottom-0 hidden items-center gap-5 bg-signal py-5 pl-12 pr-[var(--shell-pad)] text-white transition-colors duration-300 hover:bg-signal-600 lg:flex"
            style={{ clipPath: 'polygon(1.75rem 0, 100% 0, 100% 100%, 0 100%)' }}
          >
            <span className="text-[0.6875rem] font-semibold uppercase leading-[1.5] tracking-[0.22em]">
              Skilled
              <br />
              India
              <br />
              Progressive
              <br />
              India
            </span>
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={2}
              className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover/skill:-translate-y-0.5 group-hover/skill:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Trades;

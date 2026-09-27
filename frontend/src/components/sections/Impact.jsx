import { useRef } from 'react';
import { BookOpenText, GraduationCap, Landmark, Users } from 'lucide-react';

import GearOutline from '../ui/GearOutline';
import { homeCounters, placement } from '../../data/satpudaData';
import { photos } from '../../data/media';
import useCountUp from '../../hooks/useCountUp';
import useReveal from '../../hooks/useReveal';
import cn from '../../utils/cn';

/**
 * Impact — "By the numbers".
 *
 * A light editorial panel: the exam-hall photograph bleeds in from the left and
 * dissolves into the canvas, the headline sits to its right, and the four
 * published counters float over the seam as raised cards. The latest dated
 * placement year closes the section on a navy award banner.
 *
 * Motion is layered but quiet — staggered reveal, count-up figures, cards that
 * tilt toward the pointer with a moving highlight, a medal that floats, a
 * banner sheen, and a growth chart that draws itself once in view. Everything
 * collapses to static under reduced motion (see index.css).
 */

const ICONS = [GraduationCap, Users, BookOpenText, Landmark];
// Badges alternate red / navy, exactly as the counters do in the brand artwork.
const TONES = ['signal', 'navy', 'signal', 'navy'];

function StatCard({ value, suffix, label, index }) {
  const [countRef, current] = useCountUp(value);
  const cardRef = useRef(null);
  const Icon = ICONS[index % ICONS.length];
  const tone = TONES[index % TONES.length];

  // Pointer-tracked tilt + highlight. Written to CSS variables so React never
  // re-renders on pointer move.
  const onMove = (e) => {
    const el = cardRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      className="reveal [perspective:900px]"
      style={{ '--reveal-delay': `${220 + index * 90}ms` }}
    >
      <div
        ref={cardRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="impact-card group relative flex h-full flex-col items-center overflow-hidden rounded-[1.1rem] border border-white bg-white/90 px-4 pb-6 pt-5 text-center shadow-[0_2px_6px_rgba(7,27,51,0.05),0_22px_44px_-22px_rgba(7,27,51,0.32)] backdrop-blur-sm transition-[box-shadow,transform] duration-500 ease-out hover:shadow-[0_4px_10px_rgba(7,27,51,0.07),0_34px_60px_-26px_rgba(7,27,51,0.42)] sm:pt-6"
      >
        {/* Pointer highlight */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
            tone === 'signal'
              ? '[background:radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,0%),rgba(224,27,36,0.08),transparent_70%)]'
              : '[background:radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,0%),rgba(27,70,128,0.10),transparent_70%)]'
          )}
        />

        {/* Icon badge */}
        <span className="relative grid h-16 w-16 place-items-center sm:h-[4.5rem] sm:w-[4.5rem]">
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-0 rounded-full opacity-0 group-hover:animate-ping-once',
              tone === 'signal' ? 'bg-signal/25' : 'bg-navy-500/25'
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-0 rounded-full border-[3px] border-white ring-1 transition-transform duration-500 ease-out group-hover:scale-110',
              tone === 'signal'
                ? 'bg-[radial-gradient(circle_at_35%_30%,#F4545C,#E01B24_55%,#A11015)] shadow-[0_8px_18px_-6px_rgba(224,27,36,0.55)] ring-signal/20'
                : 'bg-[radial-gradient(circle_at_35%_30%,#3B67A8,#0B2D5C_55%,#051324)] shadow-[0_8px_18px_-6px_rgba(11,45,92,0.55)] ring-navy-600/20'
            )}
          />
          <Icon
            aria-hidden="true"
            strokeWidth={2.1}
            className="relative h-7 w-7 text-white transition-transform duration-500 ease-out group-hover:-rotate-[8deg] group-hover:scale-110 sm:h-8 sm:w-8"
          />
        </span>

        <span
          ref={countRef}
          className="mt-4 font-display text-[clamp(2.4rem,1.7rem+2.2vw,3.6rem)] font-bold leading-none tracking-[-0.035em] tabular text-navy-700 transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
        >
          {current}
          <span className="text-signal">{suffix}</span>
        </span>

        <span className="mt-2.5 text-[0.9375rem] font-medium leading-snug text-ink sm:text-base">
          {label}
        </span>

        <span
          aria-hidden="true"
          className={cn(
            'mt-4 h-[3px] w-9 rounded-full transition-[width] duration-500 ease-out group-hover:w-16',
            tone === 'signal' ? 'bg-signal' : 'bg-navy-600'
          )}
        />
      </div>
    </div>
  );
}

/** Gold award rosette with ribbon tails. */
function Medal() {
  return (
    <svg viewBox="0 0 96 112" aria-hidden="true" focusable="false" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="impact-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF4C2" />
          <stop offset="0.35" stopColor="#F5C84B" />
          <stop offset="0.7" stopColor="#C98E1C" />
          <stop offset="1" stopColor="#FBE38A" />
        </linearGradient>
        <linearGradient id="impact-ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7D774" />
          <stop offset="1" stopColor="#B7811A" />
        </linearGradient>
        <clipPath id="impact-medal-clip">
          <circle cx="48" cy="42" r="34" />
        </clipPath>
      </defs>
      <path d="M30 62 L18 106 L31 99 L38 111 L48 72 Z" fill="url(#impact-ribbon)" />
      <path d="M66 62 L78 106 L65 99 L58 111 L48 72 Z" fill="url(#impact-ribbon)" />
      <circle cx="48" cy="42" r="36" fill="url(#impact-gold)" />
      <circle cx="48" cy="42" r="28" fill="none" stroke="#FFF7D6" strokeWidth="2.5" opacity="0.9" />
      <circle cx="48" cy="42" r="22" fill="#0B2D5C" />
      <path
        d="M48 29.5l3.7 7.6 8.3 1.2-6 5.9 1.4 8.3L48 48.6l-7.4 3.9 1.4-8.3-6-5.9 8.3-1.2z"
        fill="#F8D66D"
      />
      {/* Moving glint, clipped to the medal face */}
      <g clipPath="url(#impact-medal-clip)">
        <rect x="-30" y="0" width="16" height="90" fill="#fff" opacity="0.55" className="impact-glint" />
      </g>
    </svg>
  );
}

/** Rising bar chart with an arrow that draws itself on reveal. */
function GrowthChart() {
  const bars = [22, 34, 48, 66];
  return (
    <svg viewBox="0 0 120 96" aria-hidden="true" focusable="false" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="impact-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#A9C2E3" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {bars.map((h, i) => (
        <rect
          key={h}
          x={18 + i * 24}
          y={92 - h}
          width="15"
          height={h}
          rx="2"
          fill="url(#impact-bar)"
          className="impact-bar"
          style={{ '--bar-delay': `${500 + i * 110}ms` }}
        />
      ))}
      <path
        d="M2 70 C 30 66, 60 48, 104 10"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength="1"
        className="impact-arrow"
      />
      <path d="M92 8 L108 6 L104 22" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="impact-arrow-head" />
    </svg>
  );
}

/** Brand swooshes framing the panel — red and navy bands off the corners. */
function Swooshes() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1960 800"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="impact-red" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C4151D" />
          <stop offset="0.5" stopColor="#F4545C" />
          <stop offset="1" stopColor="#E01B24" />
        </linearGradient>
        <linearGradient id="impact-navy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1B4680" />
          <stop offset="1" stopColor="#071B33" />
        </linearGradient>
      </defs>

      {/* top-right corner */}
      <g className="impact-drift impact-drift-tr">
        <path d="M1700 0 Q1860 26 1960 120 L1960 0 Z" fill="url(#impact-navy)" />
        <path d="M1630 0 Q1830 14 1960 78 L1960 50 Q1850 4 1730 0 Z" fill="url(#impact-red)" />
      </g>

      {/* bottom-right sweep */}
      <g className="impact-drift impact-drift-br">
        <path d="M1960 470 Q1860 560 1700 640 Q1500 742 1180 800 L1960 800 Z" fill="url(#impact-navy)" />
        <path d="M1960 430 Q1850 530 1690 612 Q1490 716 1120 800 L1180 800 Q1500 742 1700 640 Q1860 560 1960 470 Z" fill="url(#impact-red)" />
        <path d="M1960 400 Q1840 500 1680 585 Q1480 690 1070 800" fill="none" stroke="#E01B24" strokeWidth="3" opacity="0.5" />
      </g>

      {/* bottom-left sweep */}
      <g className="impact-drift impact-drift-bl">
        <path d="M0 600 Q240 730 560 772 Q760 796 980 800 L0 800 Z" fill="url(#impact-red)" />
        <path d="M0 646 Q260 760 620 790 Q760 800 900 800 L0 800 Z" fill="#fff" />
        <path d="M0 700 Q300 790 760 800" fill="none" stroke="#1B4680" strokeWidth="3" opacity="0.55" />
      </g>
    </svg>
  );
}

export function Impact() {
  const ref = useReveal();
  const latest = placement.record[placement.record.length - 1];

  return (
    <section
      ref={ref}
      aria-labelledby="impact-title"
      className="impact relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FB_100%)]"
    >
      {/* Photograph — bleeds in from the left and dissolves into the canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] sm:h-[28rem] lg:inset-y-0 lg:right-auto lg:h-auto lg:w-[46%]"
      >
        <img
          src={photos.campusPanorama.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="impact-photo h-full w-full object-cover object-left [mask-image:linear-gradient(to_bottom,#000_45%,transparent_100%)] lg:[mask-image:linear-gradient(to_right,#000_40%,rgba(0,0,0,0.55)_68%,transparent_100%)]"
        />
      </div>

      {/* Faint technical gears, top-right */}
      <GearOutline
        spin
        strokeWidth={9}
        className="pointer-events-none absolute right-[14%] top-[10%] hidden h-56 w-56 text-signal/15 lg:block"
      />
      <GearOutline
        spin
        strokeWidth={8}
        className="pointer-events-none absolute right-[4%] top-[6%] hidden h-40 w-40 text-navy-300/25 [animation-direction:reverse] lg:block"
      />
      <GearOutline
        spin
        strokeWidth={8}
        className="pointer-events-none absolute -right-16 top-[22%] hidden h-72 w-72 text-navy-200/30 lg:block"
      />
      {/* Dot grid accent near the seam */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[14%] left-[26%] hidden h-28 w-40 opacity-50 [background-image:radial-gradient(#6E95CB_1px,transparent_1.2px)] [background-size:12px_12px] lg:block"
      />

      <Swooshes />

      <div className="relative px-4 pb-24 pt-[17rem] sm:px-8 sm:pt-[21rem] lg:px-0 lg:pb-30 lg:pt-16 xl:pt-20">
        {/* Heading block */}
        <div className="lg:ml-[38.5%] lg:mr-[14%]">
          <div className="reveal flex items-center gap-3">
            <span aria-hidden="true" className="h-[2px] w-10 origin-left rounded-full bg-signal [.is-visible_&]:animate-rule-draw" />
            <span className="text-label-lg font-semibold uppercase text-navy-700">By the numbers</span>
          </div>

          <h2
            id="impact-title"
            className="reveal mt-5 font-display text-[clamp(2.4rem,1.4rem+3.6vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-navy-700"
            style={{ '--reveal-delay': '60ms' }}
          >
            A group built across
            <br />
            <span className="impact-headline-accent bg-[linear-gradient(90deg,#E01B24,#F4545C_45%,#C4151D_55%,#E01B24)] bg-[length:220%_100%] bg-clip-text text-transparent">
              Madhya Pradesh.
            </span>
          </h2>

          <p
            className="reveal mt-5 max-w-[42rem] text-[1rem] leading-[1.6] text-ink-muted sm:text-[1.0625rem]"
            style={{ '--reveal-delay': '140ms' }}
          >
            Transforming young minds with skill-based training and placement support to build a
            stronger, brighter and self-reliant Madhya Pradesh.
          </p>
        </div>

        {/* Counters + award banner */}
        <div className="mt-10 lg:ml-[29%] lg:mr-[10%] lg:mt-12">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {homeCounters.map((item, i) => (
              <StatCard key={item.label} index={i} {...item} />
            ))}
          </div>

          <div
            className="reveal group relative mt-4 overflow-hidden rounded-[1.1rem] border border-navy-400/40 bg-[linear-gradient(100deg,#0B2D5C_0%,#092647_45%,#0B2D5C_100%)] px-5 py-6 shadow-[0_24px_48px_-24px_rgba(5,19,36,0.7)] transition-transform duration-500 ease-out hover:-translate-y-1 sm:px-8 sm:py-5 lg:mt-5"
            style={{ '--reveal-delay': '600ms' }}
          >
            {/* Sparkle field + sheen */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1.3px)] [background-size:22px_22px] [mask-image:linear-gradient(90deg,transparent,#000_70%)]"
            />
            <span
              aria-hidden="true"
              className="impact-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]"
            />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <div className="h-20 w-[4.25rem] shrink-0 animate-impact-float sm:ml-4 sm:h-24 sm:w-20">
                <Medal />
              </div>

              <span aria-hidden="true" className="hidden h-20 w-px bg-white/25 sm:block" />

              <div className="min-w-0 flex-1">
                <p className="font-display text-label-lg font-bold uppercase text-signal-400">
                  Our placement record
                </p>
                <p className="mt-2.5 font-display text-[1.25rem] font-medium leading-snug text-white sm:text-[1.6rem]">
                  In {latest.year}, we achieved a{' '}
                  <span className="font-bold text-yellow-300">{latest.percentage}%</span>{' '}
                  <span className="font-bold">placement rate,</span>
                </p>
                <p className="mt-1.5 text-[0.9375rem] text-navy-100 sm:text-[1.0625rem]">
                  with <span className="font-semibold tabular text-yellow-300">{latest.placed}</span>{' '}
                  trainees placed across{' '}
                  <span className="font-semibold tabular text-white">{latest.drives}</span> campus
                  drives.
                </p>
              </div>

              <div className="hidden h-24 w-28 shrink-0 md:block lg:mr-2">
                <GrowthChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Impact;

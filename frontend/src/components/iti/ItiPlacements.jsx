import { useId, useRef, useState } from 'react';
import { ArrowUpRight, CalendarDays, Flag, IndianRupee, MapPin, Repeat, Sparkles, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionHeading from '../ui/SectionHeading';
import CountUp from './CountUp';
import { PLACEMENT_BASE } from '../../data/placementPages';
import useRevealEach from '../../hooks/useRevealEach';

/**
 * Placements — the campus's own drive record (`inst.drives`, from
 * itiDrives.js), set as an honours board: four laurelled figures, a navy
 * plaque of the record's highlights, and every drive by year.
 *
 * Every figure is counted from the drives themselves. Selections and
 * salaries appear only where the campus's record lists them (Seoni's does,
 * Kundipura's lists turnout alone, Mandla's dates alone), so a record without
 * them never speaks of trainees placed.
 *
 * Motion: as each tile reveals its laurel grows leaf by leaf up both
 * branches and the figure counts up; plaques and drive tickets settle in
 * turn and lift under a fine pointer.
 */

const STATE_HI = {
  'Andhra Pradesh': 'आंध्र प्रदेश',
  Chhattisgarh: 'छत्तीसगढ़',
  Gujarat: 'गुजरात',
  Haryana: 'हरियाणा',
  'Jammu and Kashmir': 'जम्मू और कश्मीर',
  Karnataka: 'कर्नाटक',
  Maharashtra: 'महाराष्ट्र',
  'Madhya Pradesh': 'मध्य प्रदेश',
  Rajasthan: 'राजस्थान',
  'Tamil Nadu': 'तमिलनाडु',
  Telangana: 'तेलंगाना',
  Uttarakhand: 'उत्तराखंड',
  'Uttar Pradesh': 'उत्तर प्रदेश',
};
const STATE_SHORT = {
  'Andhra Pradesh': 'AP',
  Chhattisgarh: 'CG',
  'Jammu and Kashmir': 'J&K',
  'Madhya Pradesh': 'MP',
  'Tamil Nadu': 'TN',
  'Uttar Pradesh': 'UP',
};
/** The states note on the award tile names this many, then counts the rest. */
const STATES_NAMED = 3;
/** A record with this many drives is read a year at a time, in tabs. */
const YEAR_TABS_FROM = 40;

const asDate = (iso) => new Date(`${iso}T00:00:00`);
const fullDate = (iso) => asDate(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const fullDateHi = (iso) => asDate(iso).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
const dayMonth = (iso) => asDate(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
const yearOf = (iso) => Number(iso.slice(0, 4));
const statesOf = (d) => [].concat(d.state ?? []);
/** A joint drive or job fair goes by its `title`; its companies are listed under it. */
const heading = (d) => d.title ?? d.company;
/** A drive that drew companies from several states names its places alone. */
const where = (d) => (Array.isArray(d.state) ? d.place : [d.place, d.state].filter(Boolean).join(', ')) ?? '';
const rupees = (n) => `₹${n.toLocaleString('en-IN')}`;
const salaryOf = (d) => (d.salaryTo ? `${rupees(d.salary)}–${d.salaryTo.toLocaleString('en-IN')}` : rupees(d.salary));
const grouped = (n) => n.toLocaleString('en-IN');

/** "a, b और c" */
const listHi = (items) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} और ${items.at(-1)}`);

const most = (items, value) => (items.length ? items.reduce((a, b) => (value(b) > value(a) ? b : a)) : null);

/** Everything the section shows, counted from one campus's drives. */
function summarise(drives) {
  const sorted = [...drives].sort((a, b) => a.date.localeCompare(b.date));
  const byRecruiter = new Map();
  for (const d of sorted) {
    for (const key of [].concat(d.recruiter ?? d.company)) {
      byRecruiter.set(key, [...(byRecruiter.get(key) ?? []), d]);
    }
  }
  // Drives a company held on its own, rather than one of several at a joint drive.
  const alone = (ds) => ds.filter((d) => !Array.isArray(d.recruiter));
  const reported = sorted.filter((d) => d.attended != null);
  const withSelections = sorted.filter((d) => d.selected != null);
  const stateCounts = new Map();
  for (const st of sorted.flatMap(statesOf)) stateCounts.set(st, (stateCounts.get(st) ?? 0) + 1);
  const states = [...stateCounts.keys()].sort((a, b) => stateCounts.get(b) - stateCounts.get(a));
  const years = [...new Set(sorted.map((d) => yearOf(d.date)))];
  const [returning, returningDrives] = [...byRecruiter].reduce((a, b) =>
    b[1].length > a[1].length || (b[1].length === a[1].length && alone(b[1]).length > alone(a[1]).length) ? b : a
  );
  const selected = withSelections.reduce((n, d) => n + d.selected, 0);
  const attendedAtSelections = withSelections.reduce((n, d) => n + (d.attended ?? 0), 0);
  const byYear = years.map((y) => ({ year: y, drives: sorted.filter((d) => yearOf(d.date) === y) }));

  return {
    sorted,
    first: sorted[0],
    latest: sorted.at(-1),
    years,
    byYear,
    busiestYear: most(byYear, (y) => y.drives.length),
    recruiters: byRecruiter.size,
    returningCount: [...byRecruiter.values()].filter((ds) => ds.length > 1).length,
    returning:
      returningDrives.length > 1
        ? {
            name: returning,
            drives: returningDrives,
            places: [...new Set(alone(returningDrives).map((d) => d.place).filter(Boolean))],
          }
        : null,
    attended: reported.reduce((n, d) => n + d.attended, 0),
    reported: reported.length,
    largest: most(reported, (d) => d.attended),
    selected,
    selectedReported: withSelections.length,
    selectedShare: attendedAtSelections ? Math.round((selected / attendedAtSelections) * 100) : null,
    mostSelected: most(withSelections, (d) => d.selected),
    topSalary: most(
      sorted.filter((d) => d.salary != null),
      (d) => d.salaryTo ?? d.salary
    ),
    salaryReported: sorted.filter((d) => d.salary != null).length,
    states,
  };
}

/* One laurel branch, bottom to top round the left of a 120-unit wreath: the
   stem, then a pair of leaves at each step, angled off it to either side. */
const CX = 60;
const CY = 58;
const R = 44;
const STEPS = 7;
const at = (deg) => {
  const a = (deg * Math.PI) / 180;
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a), tangent: (Math.atan2(Math.cos(a), -Math.sin(a)) * 180) / Math.PI };
};
const STEM_FROM = at(104);
const STEM_TO = at(238);
const STEM = `M${STEM_FROM.x.toFixed(2)} ${STEM_FROM.y.toFixed(2)} A${R} ${R} 0 0 1 ${STEM_TO.x.toFixed(2)} ${STEM_TO.y.toFixed(2)}`;
const LEAVES = Array.from({ length: STEPS }, (_, i) => {
  const p = at(112 + i * 19);
  const top = i === STEPS - 1;
  return (top ? [p.tangent] : [p.tangent - 32, p.tangent + 32]).map((rot) => ({ ...p, rot, i }));
}).flat();
const LEAF = 'M0 0C3.6-4.2 9.6-4.6 14 0C9.6 4.6 3.6 4.2 0 0Z';

function Laurel() {
  const gid = `itp-gold-${useId().replace(/:/g, '')}`;
  const branch = (
    <>
      <path d={STEM} pathLength="1" fill="none" stroke={`url(#${gid})`} strokeWidth="1.6" strokeLinecap="round" className="itp-stem" />
      {LEAVES.map((l, k) => (
        <g key={k} transform={`translate(${l.x.toFixed(2)} ${l.y.toFixed(2)}) rotate(${l.rot.toFixed(1)})`}>
          <path d={LEAF} fill={`url(#${gid})`} className="itp-leaf" style={{ '--i': l.i }} />
        </g>
      ))}
    </>
  );

  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7D774" />
          <stop offset="0.5" stopColor="#D9A42E" />
          <stop offset="1" stopColor="#B7811A" />
        </linearGradient>
      </defs>
      {branch}
      <g transform="translate(120 0) scale(-1 1)">{branch}</g>
      {/* The tie where the branches meet */}
      <path d="M54 104 L60 110 L66 104" fill="none" stroke="#E01B24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="itp-tie" />
    </svg>
  );
}

function AwardTile({ value, label, note, index, className = '' }) {
  return (
    <li className={`reveal flex ${className}`} style={{ '--reveal-delay': `${80 + index * 80}ms` }}>
      <div className="iti-lift relative flex w-full flex-col items-center rounded-panel border border-navy-100 bg-white px-4 pb-6 pt-6 text-center shadow-card hover:border-navy-200">
        <div className="relative grid h-32 w-32 place-items-center sm:h-36 sm:w-36">
          <Laurel />
          {/* Longer grouped figures ("1,063", "23,038") step down a size to stay inside the wreath. */}
          <span
            className={`relative -mt-2 font-display font-bold leading-none tracking-[-0.03em] text-navy-800 ${
              value.length > 5 ? 'text-[1.25rem] sm:text-[1.4375rem]' : value.length > 4 ? 'text-[1.5rem] sm:text-[1.75rem]' : 'text-[2.25rem] sm:text-[2.5rem]'
            }`}
          >
            <CountUp value={value} />
          </span>
        </div>
        <p className="mt-3 text-[0.9375rem] font-semibold text-navy-800">{label}</p>
        <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">{note}</p>
      </div>
    </li>
  );
}

function Plaque({ icon: Icon, label, title, meta, figure, figureLabel, index }) {
  return (
    <li className="reveal flex" style={{ '--reveal-delay': `${80 + index * 80}ms` }}>
      <div className="iti-lift relative flex w-full flex-col overflow-hidden rounded-panel border border-white/12 bg-navy-900/60 p-5 sm:p-6">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#FFF4C2,#E9B949_45%,#B7811A)] text-navy-900 shadow-[0_8px_18px_-8px_rgba(233,185,73,0.7)]"
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-tech">{label}</p>
        <p className="mt-1.5 font-display text-[1.125rem] font-semibold leading-snug text-white">{title}</p>
        <p className="mt-1 text-[0.8125rem] leading-snug text-navy-100/70">{meta}</p>
        {figure != null && (
          <p className="mt-auto flex items-baseline gap-2 pt-5">
            <span className="font-display text-[1.75rem] font-bold leading-none tabular text-yellow-300">{figure}</span>
            <span className="text-[0.8125rem] text-navy-100/80">{figureLabel}</span>
          </p>
        )}
      </div>
    </li>
  );
}

/** One drive: its date and figures, the company (or a joint drive's heading over its line-up), place and salary. */
function DriveTicket({ d, top }) {
  return (
    <article className="iti-lift iti-hairline h-full overflow-hidden rounded-edge border border-navy-100 bg-white p-4 shadow-card hover:border-navy-200">
      <div className="flex items-center justify-between gap-3">
        <time dateTime={d.date} className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
          {dayMonth(d.date)}
        </time>
        {(d.selected ?? d.attended) != null && (
          <span className="inline-flex items-center gap-1 rounded-full bg-royal-50 px-2 py-0.5 font-mono text-[0.6875rem] tabular text-royal-800">
            {top && <Trophy aria-hidden="true" className="h-3 w-3 text-[#B7811A]" strokeWidth={2.25} />}
            {d.selected == null
              ? `${d.attended} attended`
              : d.attended == null
                ? `${d.selected} selected`
                : `${grouped(d.selected)} of ${grouped(d.attended)} selected`}
          </span>
        )}
      </div>
      <h4 className="mt-2 text-[0.9375rem] font-semibold leading-snug text-navy-800">{heading(d)}</h4>
      {d.title && <p className="mt-1 text-[0.75rem] leading-snug text-ink-soft">{d.company}</p>}
      {where(d) && (
        <p className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] leading-snug text-ink-muted">
          <MapPin aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" strokeWidth={2} />
          {where(d)}
        </p>
      )}
      {d.salary != null && (
        <p className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] leading-snug text-ink-muted">
          <IndianRupee aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B7811A]" strokeWidth={2} />
          <span>
            <span className="font-semibold tabular text-navy-800">{salaryOf(d)}</span> a month
          </span>
        </p>
      )}
    </article>
  );
}

/**
 * A long record read a year at a time: a row of year tabs (latest first
 * selected) over that year's drives. Arrow keys, Home and End move between
 * tabs. The tab panel is re-keyed per year so its tickets settle in afresh.
 */
function YearTabs({ byYear, top }) {
  const [year, setYear] = useState(byYear.at(-1).year);
  const tabs = useRef([]);
  const current = byYear.find((y) => y.year === year);
  const sum = (key) => current.drives.reduce((n, d) => n + (d[key] ?? 0), 0);
  const reported = (key) => current.drives.some((d) => d[key] != null);

  const onKeyDown = (e, i) => {
    const step = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: byYear.length - 1 }[e.key];
    if (step == null) return;
    e.preventDefault();
    const next = (step + byYear.length) % byYear.length;
    setYear(byYear[next].year);
    tabs.current[next]?.focus();
  };

  return (
    <div className="reveal mt-8" style={{ '--reveal-delay': '80ms' }}>
      <div role="tablist" aria-label="Campus drives by year" className="flex flex-wrap gap-2">
        {byYear.map(({ year: y, drives }, i) => {
          const selected = y === year;
          return (
            <button
              key={y}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`itp-tab-${y}`}
              aria-selected={selected}
              aria-controls="itp-year-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setYear(y)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`inline-flex min-h-[2.75rem] items-baseline gap-2 rounded-edge border px-3.5 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech focus-visible:ring-offset-2 ${
                selected
                  ? 'border-navy-800 bg-navy-800 text-white shadow-card'
                  : 'border-navy-100 bg-white text-navy-800 hover:border-navy-300'
              }`}
            >
              <span className="font-display text-[1.0625rem] font-bold leading-none tabular">{y}</span>
              <span className={`font-mono text-[0.625rem] tabular ${selected ? 'text-tech' : 'text-ink-soft'}`}>{drives.length}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft" aria-live="polite">
        {year} · {current.drives.length} {current.drives.length === 1 ? 'drive' : 'drives'}
        {reported('attended') && ` · ${grouped(sum('attended'))} attended`}
        {reported('selected') && ` · ${grouped(sum('selected'))} selected`}
      </p>

      <ul
        key={year}
        id="itp-year-panel"
        role="tabpanel"
        aria-labelledby={`itp-tab-${year}`}
        className="itp-panel mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {current.drives.map((d, i) => (
          <li key={`${d.date}-${d.company}`} style={{ '--i': i }}>
            <DriveTicket d={d} top={d === top} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ItiPlacements({ inst, id }) {
  const ref = useRevealEach();
  const s = summarise(inst.drives);
  // The drive the record's top plaque names, marked with a trophy on its ticket.
  const top = s.mostSelected ?? s.largest;
  const span = s.years.length > 1 ? `${s.years[0]}–${s.years.at(-1)}` : String(s.years[0]);

  const namedStates = s.states.slice(0, STATES_NAMED).map((st) => STATE_SHORT[st] ?? st);
  const awards = [
    { value: String(s.sorted.length), label: 'Campus drives', note: span },
    {
      value: String(s.recruiters),
      label: 'Recruiting companies',
      note: s.returningCount ? `${s.returningCount} came back again` : 'One drive each',
    },
    s.reported && { value: grouped(s.attended), label: 'Trainees attended', note: `Across ${s.reported} recorded drives` },
    s.selectedReported && {
      value: grouped(s.selected),
      label: 'Trainees selected',
      note: s.selectedShare != null ? `${s.selectedShare}% of those attending` : `Across ${s.selectedReported} drives`,
    },
    {
      value: String(s.states.length),
      label: s.states.length === 1 ? 'State' : 'States',
      note: [...namedStates, s.states.length > STATES_NAMED && `+${s.states.length - STATES_NAMED}`].filter(Boolean).join(' · '),
    },
  ]
    .filter(Boolean)
    // Four tiles: where selections are recorded they take the states' place.
    .slice(0, 4);

  const dated = (d) => [where(d), fullDate(d.date)].filter(Boolean).join(' · ');
  const plaques = [
    s.mostSelected
      ? {
          icon: Trophy,
          label: 'Most selected',
          title: heading(s.mostSelected),
          meta: dated(s.mostSelected),
          figure: grouped(s.mostSelected.selected),
          figureLabel: s.mostSelected.attended != null ? `of ${grouped(s.mostSelected.attended)} selected` : 'trainees selected',
        }
      : s.largest
        ? {
            icon: Trophy,
            label: 'Largest turnout',
            title: heading(s.largest),
            meta: dated(s.largest),
            figure: grouped(s.largest.attended),
            figureLabel: 'trainees attended',
          }
        : // A record of dates alone: the year with the most drives.
          s.busiestYear.drives.length > 1 && {
            icon: CalendarDays,
            label: 'Busiest year',
            title: String(s.busiestYear.year),
            meta: [...new Set(s.busiestYear.drives.flatMap((d) => d.recruiter ?? d.company))].join(' · '),
            figure: s.busiestYear.drives.length,
            figureLabel: 'campus drives',
          },
    s.topSalary && {
      icon: IndianRupee,
      label: 'Highest salary offered',
      title: heading(s.topSalary),
      meta: dated(s.topSalary),
      figure: salaryOf(s.topSalary),
      figureLabel: 'a month',
    },
    s.returning && {
      icon: Repeat,
      label: 'Returning recruiter',
      title: s.returning.name,
      meta: [`${yearOf(s.returning.drives[0].date)}–${yearOf(s.returning.drives.at(-1).date)}`, s.returning.places.join(' & ')]
        .filter(Boolean)
        .join(' · '),
      figure: s.returning.drives.length,
      figureLabel: 'campus drives',
    },
    {
      icon: Flag,
      label: 'First drive on record',
      title: heading(s.first),
      meta: dated(s.first),
    },
    {
      icon: Sparkles,
      label: 'Latest drive',
      title: heading(s.latest),
      meta: dated(s.latest),
      ...(s.latest.selected != null
        ? {
            figure: s.latest.selected,
            figureLabel: s.latest.attended != null ? `of ${grouped(s.latest.attended)} selected` : 'trainees selected',
          }
        : { figure: s.latest.attended, figureLabel: 'trainees attended' }),
    },
  ]
    .filter(Boolean)
    // Four plaques; the first drive gives way first (the plaque's dates still open on it).
    .filter((p, _, all) => all.length <= 4 || p.icon !== Flag);

  const statesHi = s.states.length > 4 ? `${s.states.length} राज्यों` : listHi(s.states.map((st) => STATE_HI[st] ?? st));

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby="iti-placements-title"
      className="relative scroll-mt-[calc(var(--navbar-h-scrolled)+4.5rem)] overflow-hidden bg-canvas py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 blueprint-light [mask-image:radial-gradient(55%_50%_at_100%_0%,#000_10%,transparent_75%)]"
      />

      <div className="shell relative">
        <SectionHeading
          id="iti-placements-title"
          eyebrow="Placements"
          title="Campus Placement Record"
          lede={
            <span lang="hi">
              {inst.name} में {s.years[0]} से अब तक {s.sorted.length} कैंपस ड्राइव हुई हैं, जिनमें {statesHi} की{' '}
              {s.recruiters} कंपनियाँ प्रशिक्षुओं की भर्ती के लिए कैंपस आईं
              {s.selectedReported
                ? ` और ${grouped(s.selected)} प्रशिक्षुओं का चयन हुआ।`
                : s.returningCount
                  ? ' — इनमें से कुछ बार-बार लौटीं।'
                  : '।'}
            </span>
          }
        />

        {/* Laurelled figures */}
        <ul className={`mt-12 grid grid-cols-2 gap-4 sm:gap-5 ${awards.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
          {awards.map((a, i) => (
            <AwardTile
              key={a.label}
              index={i}
              // An odd last tile spans the phone's two columns.
              className={awards.length % 2 && i === awards.length - 1 ? 'col-span-2 lg:col-span-1' : ''}
              {...a}
            />
          ))}
        </ul>

        {/* Highlights plaque */}
        <div className="reveal relative mt-6 overflow-hidden rounded-panel bg-navy-800 p-5 shadow-deep sm:mt-8 sm:p-8" style={{ '--reveal-delay': '120ms' }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />
          <span
            aria-hidden="true"
            className="itp-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]"
          />
          <div className="relative flex flex-wrap items-end justify-between gap-3">
            <h3 className="flex items-center gap-3 font-display text-[1.25rem] font-semibold tracking-tight text-white">
              <span aria-hidden="true" className="h-px w-6 bg-signal" />
              Placement highlights
            </h3>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-navy-100/60">
              {fullDate(s.first.date)} – {fullDate(s.latest.date)}
            </p>
          </div>
          <ul className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plaques.map((p, i) => (
              <Plaque key={p.label} index={i} {...p} />
            ))}
          </ul>
        </div>

        {/* Drive by drive */}
        <div className="mt-16 sm:mt-20">
          <h3 className="reveal flex items-center gap-3 font-display text-[1.25rem] font-semibold tracking-tight text-navy-800">
            <span aria-hidden="true" className="h-px w-6 bg-signal" />
            Drive by drive
          </h3>

          {s.sorted.length >= YEAR_TABS_FROM ? (
            <YearTabs byYear={s.byYear} top={top} />
          ) : (
            <ol className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {s.byYear.map(({ year, drives }, col) => (
                <li key={year} className="reveal relative border-t-2 border-navy-100 pt-6" style={{ '--reveal-delay': `${60 + col * 90}ms` }}>
                  <span aria-hidden="true" className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-signal" />
                  <p className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-[2rem] font-bold leading-none tracking-[-0.03em] tabular text-navy-800">{year}</span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">
                      {drives.length} {drives.length === 1 ? 'drive' : 'drives'}
                    </span>
                  </p>

                  <ul className="iti-stagger mt-5 space-y-3">
                    {drives.map((d, i) => (
                      <li key={`${d.date}-${d.company}`} style={{ '--i': i + 1 }}>
                        <DriveTicket d={d} top={d === top} />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="reveal mt-12 flex flex-col gap-5 border-t border-navy-100 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p lang="hi" className="max-w-3xl border-l border-tech/50 pl-5 text-[0.875rem] leading-[1.7] text-ink-muted">
            यह सूची संस्थान के अपने प्लेसमेंट रिकॉर्ड से है ({fullDateHi(s.first.date)} से {fullDateHi(s.latest.date)} तक)।{' '}
            {s.selectedReported ? (
              <>
                {s.selectedReported === s.sorted.length ? 'हर' : s.selectedReported} ड्राइव में उपस्थित और चयनित प्रशिक्षुओं की
                संख्या{s.salaryReported ? ' और प्रस्तावित मासिक वेतन' : ''} इसी रिकॉर्ड में दर्ज है; ओपन कैंपस ड्राइव के चयन में दूसरे
                संस्थानों के प्रशिक्षु भी शामिल हो सकते हैं।
              </>
            ) : s.reported ? (
              <>उपस्थिति {s.reported} ड्राइव के लिए दर्ज है, और चयनित प्रशिक्षुओं की संख्या इस रिकॉर्ड में दर्ज नहीं है।</>
            ) : (
              <>इसमें हर ड्राइव की तारीख़ और कंपनी दर्ज है; उपस्थित या चयनित प्रशिक्षुओं की संख्या दर्ज नहीं है।</>
            )}{' '}
            प्लेसमेंट सहायता का अर्थ नौकरी की गारंटी नहीं है।
          </p>
          <Link
            to={`${PLACEMENT_BASE}/details`}
            className="group inline-flex min-h-[2.75rem] shrink-0 items-center gap-2 text-[0.875rem] font-semibold text-navy-800 transition-colors hover:text-signal"
          >
            Group placement record
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={2}
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ItiPlacements;

import { Award, BadgeCheck, CalendarCheck, Clock, GraduationCap, Layers } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import { themeFor } from './theme';
import useReveal from '../../hooks/useReveal';
import cn from '../../utils/cn';

/**
 * Course information — a specification sheet.
 *
 * Six facts on hairline rows, then the two pictures that say most: where the
 * course sits on the ten NSQF levels, and how each year's hours split between
 * practical, theory, employability skills and on-the-job training.
 */

const NSQF_LEVELS = 10;

function NsqfMeter({ level, accent }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-label uppercase text-ink-soft">NSQF level</p>
        <p className="font-display text-[1.75rem] font-semibold leading-none tabular text-navy-800">
          {level}
          <span className="text-[0.875rem] font-medium text-ink-soft"> / {NSQF_LEVELS}</span>
        </p>
      </div>
      <div className="mt-4 grid grid-cols-10 gap-1" role="img" aria-label={`NSQF level ${level} of ${NSQF_LEVELS}`}>
        {Array.from({ length: NSQF_LEVELS }, (_, i) => {
          const fill = Math.max(0, Math.min(1, level - i));
          return (
            <span key={i} className="relative h-3 overflow-hidden rounded-sharp bg-navy-100">
              {fill > 0 && (
                <span
                  className={cn('trade-bar absolute inset-y-0 left-0', accent.bg)}
                  style={{ width: `${fill * 100}%`, '--i': i }}
                />
              )}
            </span>
          );
        })}
      </div>
      <p className="mt-2 text-[0.8125rem] leading-[1.6] text-ink-muted">
        The National Skills Qualifications Framework places every qualification on ten levels of competence.
      </p>
    </div>
  );
}

function HoursChart({ structure, accent }) {
  const max = Math.max(...structure.map((y) => y.practical + y.theory + y.employability + y.ojt));
  const parts = [
    { key: 'practical', label: 'Practical', className: accent.bg },
    { key: 'theory', label: 'Theory', className: 'bg-navy-400' },
    { key: 'employability', label: 'Employability', className: 'bg-navy-200' },
  ];

  return (
    <div>
      <p className="font-mono text-label uppercase text-ink-soft">Training hours</p>
      <ul className="mt-4 space-y-5">
        {structure.map((y, i) => {
          const taught = y.practical + y.theory + y.employability;
          return (
            <li key={i}>
              <div className="flex items-baseline justify-between text-[0.8125rem]">
                <span className="font-medium text-navy-800">{structure.length > 1 ? `Year ${i + 1}` : 'The year'}</span>
                <span className="font-mono tabular text-ink-soft">
                  {taught.toLocaleString('en-IN')} + {y.ojt} OJT hrs
                </span>
              </div>
              <div
                className="mt-2 flex h-4 gap-px"
                role="img"
                aria-label={`${y.practical} practical, ${y.theory} theory, ${y.employability} employability skills and ${y.ojt} on-the-job training hours`}
              >
                <span className="trade-bar flex overflow-hidden rounded-l-sharp" style={{ width: `${(taught / max) * 100}%`, '--i': i * 2 }}>
                  {parts.map((p) => (
                    <span key={p.key} className={p.className} style={{ width: `${(y[p.key] / taught) * 100}%` }} />
                  ))}
                </span>
                <span
                  className="trade-bar rounded-r-sharp border border-dashed border-tech-600 bg-tech-50"
                  style={{ width: `${(y.ojt / max) * 100}%`, '--i': i * 2 + 1 }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[0.75rem] text-ink-muted">
        {parts.map((p) => (
          <li key={p.key} className="flex items-center gap-1.5">
            <span aria-hidden="true" className={cn('h-2.5 w-2.5 rounded-sharp', p.className)} />
            {p.label}
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sharp border border-dashed border-tech-600 bg-tech-50" />
          On-the-job training / group project
        </li>
      </ul>
    </div>
  );
}

export function CourseInfo({ trade }) {
  const ref = useReveal();
  const { accent } = themeFor(trade);
  const f = trade.facts;

  const specs = [
    { icon: Clock, label: 'Duration', value: f.duration, note: f.hours },
    { icon: GraduationCap, label: 'Entry qualification', value: f.entry },
    { icon: CalendarCheck, label: 'Minimum age', value: `${f.minAge} years`, note: 'On the first day of the academic session' },
    { icon: Award, label: 'Certificate', value: 'National Trade Certificate (NTC)', note: 'Awarded by DGT after the All India Trade Test' },
    { icon: BadgeCheck, label: 'To pass', value: trade.passRule },
    { icon: Layers, label: 'Scheme', value: `Craftsman Training Scheme · ${trade.kind}`, note: `Trade code ${trade.code} · Sector: ${trade.sector}` },
  ];

  return (
    <section
      id="course"
      ref={ref}
      aria-labelledby="course-title"
      className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-canvas-soft py-20 sm:py-26 lg:py-30"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-light opacity-60" />

      <div className="shell relative">
        <SectionHeading
          id="course-title"
          eyebrow="Course information"
          title={
            <>
              The course,
              <br />
              <span className={accent.text}>at a glance.</span>
            </>
          }
          lede="Every figure below is from the trade’s DGT curriculum."
          className="max-w-2xl"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <dl className="reveal grid gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:col-span-7">
            {specs.map(({ icon: Icon, label, value, note }) => (
              <div key={label} className="group bg-white p-6 transition-colors duration-300 hover:bg-canvas-soft">
                <dt className="flex items-center gap-2.5 font-mono text-label uppercase text-ink-soft">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className={cn('h-4 w-4 transition-transform duration-300 ease-out group-hover:scale-110', accent.text)}
                  />
                  {label}
                </dt>
                <dd className="mt-3">
                  <span className="block text-[1rem] font-semibold leading-snug text-navy-800">{value}</span>
                  {note && <span className="mt-1.5 block text-[0.8125rem] leading-[1.55] text-ink-muted">{note}</span>}
                </dd>
              </div>
            ))}
          </dl>

          <div
            className="reveal flex flex-col gap-10 rounded-panel border border-navy-100 bg-white p-6 sm:p-8 lg:col-span-5"
            style={{ '--reveal-delay': '100ms' }}
          >
            <NsqfMeter level={f.nsqf} accent={accent} />
            <HoursChart structure={trade.structure} accent={accent} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseInfo;

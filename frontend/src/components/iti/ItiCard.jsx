import { memo } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

import ItiMedia from './ItiMedia';

/**
 * One institute in the homepage marquee. The whole card is a single link to
 * the institute's page, so the target is the full tile rather than a small
 * "read more". Its accessible name is just the institute's name.
 *
 * `decorative` marks the copy rendered only so the marquee can loop: it stays
 * clickable for the pointer but is skipped by Tab and screen readers (its
 * group is aria-hidden), and it carries no ids so nothing is duplicated.
 */
export const ItiCard = memo(function ItiCard({ inst, decorative = false }) {
  const nameId = decorative ? undefined : `iti-card-${inst.slug}`;

  return (
    <Link
      to={inst.path}
      data-iti-card=""
      tabIndex={decorative ? -1 : undefined}
      aria-labelledby={nameId}
      className="iti-card group relative flex h-full w-[16.5rem] flex-col rounded-panel border border-navy-100 bg-white text-left shadow-card sm:w-[18.5rem]"
    >
      <ItiMedia
        inst={inst}
        sizes="(min-width: 640px) 296px, 264px"
        className="aspect-[16/10] rounded-t-[5px]"
      />

      <span aria-hidden="true" className="iti-card-rule absolute inset-x-0 top-0 z-10 h-[3px] rounded-t-[5px] bg-signal" />

      <span className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Two lines reserved so every card in the strip aligns; names wrap,
            never truncate. */}
        <span
          id={nameId}
          className="block min-h-[2.75rem] font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-navy-800 sm:min-h-[2.9rem] sm:text-[1.125rem]"
        >
          {inst.name}
        </span>

        <span className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] leading-snug text-ink-muted">
          <MapPin aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" strokeWidth={2} />
          {inst.location}
        </span>

        {inst.courses.length > 0 && (
          <span className="mt-4 flex flex-wrap gap-1.5">
            {inst.courses.map((c) => (
              <span
                key={c.id}
                className="rounded-sharp bg-royal-50 px-2 py-1 text-[0.75rem] font-medium leading-none text-royal-800"
              >
                {c.name}
              </span>
            ))}
          </span>
        )}

        <span className="mt-auto block pt-4">
          <span className="flex items-center justify-between border-t border-navy-50 pt-3.5">
            <span className="text-[0.875rem] font-semibold text-navy-800 transition-colors duration-200 group-hover:text-signal">
              View institute
            </span>
            <ArrowRight aria-hidden="true" strokeWidth={2} className="iti-card-arrow h-4 w-4 text-signal" />
          </span>
        </span>
      </span>
    </Link>
  );
});

export default ItiCard;

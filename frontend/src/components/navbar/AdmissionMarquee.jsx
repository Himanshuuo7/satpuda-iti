import { Link } from 'react-router-dom';
import { ArrowRight, Award, ClipboardCheck, GraduationCap, Phone, Wrench } from 'lucide-react';

import { contact, trades } from '../../data/satpudaData';
import { itiInstitutes } from '../../data/itiInstitutes';
import { placementTotals } from '../../data/placementRecord';
import cn from '../../utils/cn';

/**
 * Admission announcement — the red band directly above the navigation bar.
 *
 * A navy "Admission Open" tab holds still on the left (its sheared edge
 * echoes the enquiry rail's) while the facts an applicant wants scroll past
 * beside it; the whole band is one link to the application form. Every
 * fact comes from the site's own data, so the band never drifts from the
 * pages it points to. It collapses with the enquiry rail once the page
 * scrolls, which keeps the scrolled header at `--navbar-h-scrolled`; the
 * loop pauses under a mouse and stands still under reduced motion.
 */

const ITEMS = [
  { icon: GraduationCap, text: `Admissions open at ${itiInstitutes.length} Satpuda ITI campuses` },
  { icon: null, text: 'प्रवेश प्रारंभ — आज ही आवेदन करें', hi: true },
  { icon: Wrench, text: `NCVT trades: ${trades.map((t) => t.name).join(' · ')}` },
  {
    icon: Award,
    text: `${placementTotals.selected.toLocaleString('en-IN')} selected in campus drives since ${placementTotals.first}`,
  },
  { icon: ClipboardCheck, text: 'Apply online in 2 minutes' },
  { icon: Phone, text: `Enquiry: ${contact.enquiry.phone}` },
];

export function AdmissionMarquee({ collapsed }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-signal text-white transition-all duration-400 ease-out',
        collapsed ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
      )}
    >
      <Link
        to="/admission"
        tabIndex={collapsed ? -1 : 0}
        aria-label={`Admission open at ${itiInstitutes.length} Satpuda ITI campuses — apply online`}
        className="group flex h-[var(--announce-h)] items-stretch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
      >
        {/* The fixed tab */}
        <span
          className="relative z-10 flex shrink-0 items-center gap-2.5 bg-navy-800 pl-[var(--shell-pad)] pr-7"
          style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 0.875rem) 100%, 0 100%)' }}
        >
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-75 motion-reduce:animate-none" />
            <span className="relative h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em]">Admission Open</span>
        </span>

        {/* The loop: two identical runs, shifted by half their width */}
        <span aria-hidden="true" className="mask-fade-x relative -ml-3.5 flex min-w-0 flex-1 items-center overflow-hidden">
          <span className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((run) => (
              <span key={run} className="flex shrink-0 items-center">
                {ITEMS.map(({ icon: Icon, text, hi }) => (
                  <span key={text} className="flex items-center whitespace-nowrap">
                    <span className="flex items-center gap-2 px-6 text-[0.75rem] font-medium tracking-tight sm:text-[0.8125rem]">
                      {Icon && <Icon strokeWidth={2} className="h-3.5 w-3.5 shrink-0 text-white/80" />}
                      <span lang={hi ? 'hi' : undefined}>{text}</span>
                    </span>
                    <span className="h-1 w-1 rotate-45 bg-white/55" />
                  </span>
                ))}
              </span>
            ))}
          </span>
        </span>

        {/* The way in, on screens wide enough to spare it */}
        <span className="relative z-10 hidden shrink-0 items-center gap-1.5 bg-navy-800/25 pl-5 pr-[var(--shell-pad)] font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 group-hover:bg-navy-800 sm:flex">
          Apply now
          <ArrowRight
            aria-hidden="true"
            strokeWidth={2.25}
            className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        </span>
      </Link>
    </div>
  );
}

export default AdmissionMarquee;

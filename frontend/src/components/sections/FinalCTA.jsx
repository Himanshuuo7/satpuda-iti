import { ArrowRight, Mail, Phone } from 'lucide-react';

import Button from '../ui/Button';
import GearOutline from '../ui/GearOutline';
import { contact, missionVision } from '../../data/satpudaData';
import { telHref } from '../../utils/format';
import useReveal from '../../hooks/useReveal';

/**
 * Closing call to action.
 *
 * The heaviest red on the page lands here, on the one action the section exists
 * for. The institute's own mission line carries the supporting copy, and the
 * published enquiry number sits directly beneath for anyone who would rather
 * call than fill in a form.
 */
export function FinalCTA() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-navy-900"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,rgba(27,70,128,0.5),transparent_65%)]"
      />
      <GearOutline
        spin
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 text-tech/[0.06]"
      />

      <div className="shell relative py-22 text-center sm:py-26 lg:py-34">
        <div className="reveal mx-auto flex items-center justify-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-signal" />
          <span className="eyebrow text-tech">Admissions</span>
          <span aria-hidden="true" className="h-px w-8 bg-signal" />
        </div>

        <h2
          id="cta-title"
          className="reveal mx-auto mt-7 max-w-4xl font-display text-display-xl font-bold leading-[1.02] text-white"
          style={{ '--reveal-delay': '60ms' }}
        >
          Ready to build
          <br />
          your <span className="text-tech">future</span>
          <span className="text-signal">?</span>
        </h2>

        <p
          className="reveal mx-auto mt-7 max-w-prose text-[1.0625rem] leading-[1.75] text-navy-100/80 sm:text-lg"
          style={{ '--reveal-delay': '120ms' }}
        >
          {missionVision.mission}
        </p>

        <div
          className="reveal mx-auto mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ '--reveal-delay': '180ms' }}
        >
          <Button to="/courses" variant="primary" size="lg" className="w-full sm:w-auto">
            Explore Trades
            <ArrowRight
              aria-hidden="true"
              strokeWidth={2}
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </Button>
          <Button to="/admission" variant="ghostLight" size="lg" className="w-full sm:w-auto">
            Apply Now
          </Button>
        </div>

        {/* Direct lines — published enquiry details */}
        <div
          className="reveal mx-auto mt-12 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-8"
          style={{ '--reveal-delay': '220ms' }}
        >
          <a
            href={telHref(contact.enquiry.phone)}
            className="group flex items-center gap-3 text-[0.9375rem] text-white transition-colors duration-200 hover:text-tech"
          >
            <Phone
              aria-hidden="true"
              strokeWidth={1.5}
              className="h-4 w-4 text-tech transition-colors group-hover:text-signal"
            />
            <span className="font-mono tabular">{contact.enquiry.phone}</span>
          </a>
          <span aria-hidden="true" className="hidden h-4 w-px bg-white/15 sm:block" />
          <a
            href={`mailto:${contact.enquiry.email}`}
            className="group flex items-center gap-3 break-all text-[0.9375rem] text-navy-100/80 transition-colors duration-200 hover:text-white"
          >
            <Mail
              aria-hidden="true"
              strokeWidth={1.5}
              className="h-4 w-4 shrink-0 text-tech transition-colors group-hover:text-signal"
            />
            {contact.enquiry.email}
          </a>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;

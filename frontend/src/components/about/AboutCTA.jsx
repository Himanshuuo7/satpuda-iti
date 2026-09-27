import { ArrowDownRight, ArrowRight, Phone } from 'lucide-react';

import Button from '../ui/Button';
import GearOutline from '../ui/GearOutline';
import useReveal from '../../hooks/useReveal';
import useMagnetic from '../../hooks/useMagnetic';
import { contact } from '../../data/satpudaData';
import { telHref } from '../../utils/format';

/**
 * Closing call to action — navy stage with a red industrial wedge and the
 * logo's gear. The three actions map to the three things a reader leaves this
 * page wanting: a campus, a trade, or an admission conversation.
 */

function Magnetic({ children }) {
  const ref = useMagnetic(5);
  return (
    <span ref={ref} className="about-magnet inline-flex w-full sm:w-auto">
      {children}
    </span>
  );
}

export function AboutCTA() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      aria-labelledby="about-cta-title"
      className="about-grain about-grain-dark relative overflow-hidden bg-navy-900 text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      {/* Red wedge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 top-0 hidden w-[42%] bg-signal [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)] lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 top-0 hidden w-[42%] bg-[linear-gradient(to_right,rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:22px_100%] [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)] lg:block"
      />
      <GearOutline
        spin
        teeth={12}
        strokeWidth={1.2}
        className="pointer-events-none absolute -bottom-32 right-[8%] hidden h-[30rem] w-[30rem] text-white/25 lg:block"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden bg-white/10">
        <span className="about-scan absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-tech to-transparent" />
      </div>

      <div className="shell relative py-22 sm:py-26 lg:py-34">
        <div className="max-w-3xl">
          <div className="reveal flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-signal" />
            <span className="eyebrow text-tech">Admissions</span>
          </div>

          <h2
            id="about-cta-title"
            className="reveal mt-7 font-display text-display-md font-bold text-white"
            style={{ '--reveal-delay': '60ms' }}
          >
            Your Skill. Your Future.
            <br />
            <span className="text-tech">Your Journey Starts Here.</span>
          </h2>

          <p className="reveal mt-7 max-w-prose text-[1.0625rem] leading-[1.75] text-navy-100/80" style={{ '--reveal-delay': '120ms' }}>
            Choose a campus near you, pick an NCVT trade, and talk to the admissions team — online, or on the enquiry line
            below.
          </p>

          <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ '--reveal-delay': '180ms' }}>
            <Magnetic>
              <Button to="/admission" variant="primary" size="lg" className="w-full sm:w-auto">
                Admission Enquiry
                <ArrowRight aria-hidden="true" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="#network" variant="ghostLight" size="lg" className="w-full sm:w-auto">
                Explore Institutes
                <ArrowDownRight aria-hidden="true" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button to="/courses" variant="ghostLight" size="lg" className="w-full sm:w-auto">
                Explore Trades
                <ArrowRight aria-hidden="true" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Button>
            </Magnetic>
          </div>

          <p className="reveal mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-navy-100/70" style={{ '--reveal-delay': '220ms' }}>
            <Phone aria-hidden="true" className="h-4 w-4 text-tech" />
            Enquiry:
            <a href={telHref(contact.enquiry.phone)} className="font-mono tabular text-white underline decoration-tech/50 underline-offset-4 hover:text-tech">
              {contact.enquiry.phone}
            </a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${contact.enquiry.email}`} className="break-all text-white underline decoration-tech/50 underline-offset-4 hover:text-tech">
              {contact.enquiry.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;

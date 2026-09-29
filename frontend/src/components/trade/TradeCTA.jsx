import { ArrowRight, ArrowUpRight, Cog, Mail, MonitorCog, Phone, Wrench, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

import Button from '../ui/Button';
import GearOutline from '../ui/GearOutline';
import { contact } from '../../data/satpudaData';
import { tradePages } from '../../data/tradePages';
import { telHref } from '../../utils/format';
import useReveal from '../../hooks/useReveal';
import useSpotlight from '../../hooks/useSpotlight';

/**
 * Closing call to action — the page's heaviest red lands on "Apply", the
 * published enquiry line sits beneath it, and the other three trades are one
 * click away.
 */

const TRADE_ICON = { electrician: Zap, fitter: Wrench, 'mechanic-diesel': Cog, copa: MonitorCog };

export function TradeCTA({ trade }) {
  const ref = useReveal();
  const onPointerMove = useSpotlight();
  const others = tradePages.filter((t) => t.id !== trade.id);

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      aria-labelledby="trade-cta-title"
      className="spotlight-host relative overflow-hidden bg-navy-900"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-50" />
      <div aria-hidden="true" className="spotlight pointer-events-none absolute inset-0" />
      <GearOutline
        spin
        className="pointer-events-none absolute -bottom-40 -right-24 h-[30rem] w-[30rem] text-tech/[0.06]"
      />

      <div className="shell relative py-22 sm:py-26 lg:py-30">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="reveal flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-signal" />
              <span className="eyebrow text-tech">Admissions</span>
            </div>
            <h2
              id="trade-cta-title"
              className="reveal mt-6 font-display text-display-lg font-bold text-white"
              style={{ '--reveal-delay': '60ms' }}
            >
              Start your <span className="text-tech">{trade.name}</span> training
              <span className="text-signal">.</span>
            </h2>
            <p
              className="reveal mt-6 max-w-prose text-[1.0625rem] leading-[1.75] text-navy-100/80"
              style={{ '--reveal-delay': '120ms' }}
            >
              For seats, admission dates and fees this session, call the enquiry line or your nearest Satpuda campus.
            </p>

            <div className="reveal mt-9 flex flex-col gap-3 xs:flex-row" style={{ '--reveal-delay': '180ms' }}>
              <Button to="/admission" variant="primary" size="lg" className="w-full xs:w-auto">
                Apply / Enquire
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Button>
              <Button to="/contact" variant="ghostLight" size="lg" className="w-full xs:w-auto">
                Contact us
              </Button>
            </div>

            <div
              className="reveal mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:gap-8"
              style={{ '--reveal-delay': '220ms' }}
            >
              <a
                href={telHref(contact.enquiry.phone)}
                className="group flex items-center gap-3 text-[0.9375rem] text-white transition-colors duration-200 hover:text-tech"
              >
                <Phone aria-hidden="true" strokeWidth={1.5} className="campus-ring h-4 w-4 text-tech" />
                <span className="font-mono tabular">{contact.enquiry.phone}</span>
              </a>
              <a
                href={`mailto:${contact.enquiry.email}`}
                className="group flex items-center gap-3 break-all text-[0.9375rem] text-navy-100/80 transition-colors duration-200 hover:text-white"
              >
                <Mail aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 shrink-0 text-tech transition-transform duration-300 group-hover:-translate-y-0.5" />
                {contact.enquiry.email}
              </a>
            </div>
          </div>

          <nav aria-labelledby="other-trades-title" className="lg:col-span-5">
            <p id="other-trades-title" className="reveal font-mono text-label uppercase text-navy-200/70">
              Explore other trades
            </p>
            <ul className="mt-5 space-y-3">
              {others.map((t, i) => {
                const Icon = TRADE_ICON[t.id] ?? Cog;
                return (
                  <li key={t.id} className="reveal" style={{ '--reveal-delay': `${120 + i * 70}ms` }}>
                    <Link
                      to={t.slug}
                      className="group flex items-center gap-4 rounded-panel border border-white/12 bg-white/[0.03] p-4 transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-tech/50 hover:bg-white/[0.06] active:translate-y-px sm:p-5"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-edge bg-white/5 text-tech transition-colors duration-300 group-hover:bg-tech group-hover:text-navy-900">
                        <Icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[1.125rem] font-semibold text-white">{t.name}</span>
                        <span className="mt-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-navy-200/70">
                          {t.facts.duration} · NSQF {t.facts.nsqf}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        strokeWidth={2}
                        className="h-4 w-4 text-navy-200 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default TradeCTA;

import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import CopyButton from './CopyButton';
import { mapsDirectionsFor, mapsEmbedFor, mapsHrefFor } from '../../data/itiInstitutes';
import { telHref } from '../../utils/format';
import useRevealEach from '../../hooks/useRevealEach';
import cn from '../../utils/cn';

/**
 * Contact Information — the institute's lines from the official contact page,
 * the way there, and a live map pinned on the same place the directions use.
 *
 * Motion: rows lift on hover, the pin hops, the phone rings and the envelope
 * tips up; the phone number and email copy in one click with a confirmation.
 */

const ROW = 'iti-lift group flex items-center gap-2 rounded-panel border border-navy-100 bg-white pr-3 hover:border-navy-200';
const LINK = 'flex min-w-0 flex-1 items-start gap-4 rounded-panel p-5';
const ICON =
  'grid h-10 w-10 shrink-0 place-items-center rounded-edge bg-navy-800 text-tech transition-colors duration-200 group-hover:bg-signal group-hover:text-white';
const LABEL = 'block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft';

export function ItiContact({ inst, id }) {
  const ref = useRevealEach();
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby="iti-contact-title"
      className="relative scroll-mt-[calc(var(--navbar-h-scrolled)+4.5rem)] bg-canvas-soft py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <SectionHeading
          id="iti-contact-title"
          eyebrow="Reach us"
          title="Contact Information"
          lede={
            <span lang="hi">
              प्रवेश और सीटों से जुड़ी जानकारी के लिए संस्थान से सीधे संपर्क करें। नीचे दिए गए पता, फ़ोन और ईमेल Satpuda ITI
              के आधिकारिक संपर्क पेज पर प्रकाशित हैं।
            </span>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="reveal flex flex-col gap-3 lg:col-span-5" style={{ '--reveal-delay': '80ms' }}>
            <ul className="iti-stagger flex flex-col gap-3">
              <li style={{ '--i': 0 }}>
                <a href={mapsHrefFor(inst)} target="_blank" rel="noreferrer" className={cn(ROW, 'pr-5')}>
                  <span className={LINK}>
                    <span className={ICON}>
                      <MapPin aria-hidden="true" className="about-pin-hop h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className={LABEL}>Address</span>
                      <span className="mt-1.5 block text-[0.9688rem] leading-[1.6] text-navy-800">{inst.address}</span>
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="h-4 w-4 shrink-0 text-ink-soft transition-[color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                  />
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </a>
              </li>

              <li style={{ '--i': 1 }}>
                <div className={ROW}>
                  <a href={telHref(inst.phone)} className={LINK}>
                    <span className={ICON}>
                      <Phone aria-hidden="true" className="campus-ring h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className={LABEL}>Phone</span>
                      <span className="mt-1.5 block font-mono text-[1.0625rem] tabular text-navy-800">{inst.phone}</span>
                    </span>
                  </a>
                  <CopyButton value={inst.phone} label="phone number" />
                </div>
              </li>

              <li style={{ '--i': 2 }}>
                <div className={ROW}>
                  <a href={`mailto:${inst.email}`} className={LINK}>
                    <span className={ICON}>
                      <Mail aria-hidden="true" className="iti-mail h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className={LABEL}>Email</span>
                      <span className="mt-1.5 block break-all text-[0.9688rem] text-navy-800">{inst.email}</span>
                    </span>
                  </a>
                  <CopyButton value={inst.email} label="email address" />
                </div>
              </li>
            </ul>

            <div className="mt-3 flex flex-col gap-3 xs:flex-row">
              <Button href={mapsDirectionsFor(inst)} target="_blank" rel="noreferrer" variant="solid" className="w-full xs:w-auto">
                Directions
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only"> to {inst.name} (opens Google Maps in a new tab)</span>
              </Button>
              <Button to="/admission" variant="primary" className="w-full xs:w-auto">
                Apply Now
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Button>
            </div>
          </div>

          {/* The map is a picture; the whole block is one link to the same
              place in Google Maps. */}
          <div className="reveal flex lg:col-span-7" style={{ '--reveal-delay': '140ms' }}>
            <a
              href={mapsHrefFor(inst)}
              target="_blank"
              rel="noreferrer"
              className="iti-lift group relative flex min-h-[18rem] w-full flex-col overflow-hidden rounded-panel border border-navy-100 bg-navy-900"
            >
              <span className="relative block flex-1 overflow-hidden">
                <iframe
                  src={mapsEmbedFor(inst)}
                  title={`Google Map showing ${inst.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                  aria-hidden="true"
                  onLoad={() => setLoaded(true)}
                  className={cn(
                    'pointer-events-none absolute inset-0 h-full w-full border-0 grayscale-[30%] transition-[filter,opacity,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0',
                    loaded ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'blueprint absolute inset-0 grid place-items-center transition-opacity duration-500',
                    loaded ? 'opacity-0' : 'opacity-100'
                  )}
                >
                  <span className="flex flex-col items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-navy-100/60">
                    <MapPin strokeWidth={1.75} className="h-6 w-6 animate-pulse-marker text-signal" />
                    Loading map
                  </span>
                </span>
              </span>
              <span aria-hidden="true" className="flex items-center justify-between gap-3 border-t border-white/12 px-4 py-3">
                <span className="flex min-w-0 items-center gap-2">
                  <MapPin strokeWidth={2} className="about-pin-hop h-4 w-4 shrink-0 text-signal" />
                  <span className="truncate text-[0.875rem] font-medium text-white">{inst.location}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-navy-100/60 transition-colors duration-200 group-hover:text-tech">
                  Open in Google Maps
                  <ArrowUpRight
                    strokeWidth={2}
                    className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </span>
              <span className="sr-only">Open {inst.name} in Google Maps (new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItiContact;

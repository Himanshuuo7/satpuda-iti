import { Briefcase, HandHeart, HardHat, MessageCircle, Phone, Wrench } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { partnerships, trainingPlacementOfficer as tpo } from '../../data/partnerships';
import { telHref } from '../../utils/format';
import useReveal from '../../hooks/useReveal';

/**
 * Training & Placement partnerships — the invitation to industry.
 *
 * The Training & Placement Officer's card (photograph, role, a short note
 * and the two ways to reach him: WhatsApp and a phone call) sits beside a
 * panel of the four ways an organisation can work with the institute, closed
 * by a single line. Everything is in the site's own vocabulary — the section
 * masthead, the red primary button and the outline button, hairline panels,
 * mono indices — and the only motion is the shared scroll reveal.
 *
 * All copy and contact details live in `data/partnerships.js`.
 */

const ICONS = {
  recruitment: Briefcase,
  training: Wrench,
  apprenticeships: HardHat,
  csr: HandHeart,
};

/** "Let's Build a Skilled Workforce Together" → the last word in accent. */
const splitAt = partnerships.title.lastIndexOf(' ');
const TITLE_LEAD = partnerships.title.slice(0, splitAt);
const TITLE_LAST = partnerships.title.slice(splitAt + 1);

export function TrainingPlacementPartnerships() {
  const ref = useReveal();

  return (
    <section
      id="training-placement-partnerships"
      ref={ref}
      aria-labelledby="training-placement-partnerships-title"
      className="relative overflow-hidden border-y border-navy-100 bg-canvas py-20 sm:py-26 lg:py-30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 blueprint-light [mask-image:radial-gradient(60%_55%_at_100%_0%,#000_15%,transparent_75%)]"
      />

      <div className="shell relative">
        <SectionHeading
          id="training-placement-partnerships-title"
          eyebrow={partnerships.eyebrow}
          title={
            <>
              {TITLE_LEAD} <span className="text-royal">{TITLE_LAST}</span>
            </>
          }
          lede={partnerships.description}
          className="max-w-3xl"
        />

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          {/* Training & Placement Officer */}
          <article
            aria-labelledby="tpo-name"
            className="reveal relative flex flex-col overflow-hidden rounded-panel border border-navy-100 bg-white shadow-card lg:col-span-5"
            style={{ '--reveal-delay': '120ms' }}
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-signal" />

            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-panel bg-navy-50 sm:w-36">
                  <img
                    src={tpo.photo.src}
                    alt={tpo.photo.alt}
                    width={tpo.photo.width}
                    height={tpo.photo.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className="min-w-0 pt-1">
                  <p className="eyebrow text-signal">Point of contact</p>
                  <h3
                    id="tpo-name"
                    className="mt-3 font-display text-[1.375rem] font-semibold leading-tight tracking-tight text-navy-800 sm:text-[1.75rem]"
                  >
                    {tpo.name}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-navy-700">{tpo.designation}</p>
                  <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
                    {tpo.additionalDesignation}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-[0.9688rem] leading-[1.7] text-ink-muted">{tpo.summary}</p>

              <dl className="mt-6 flex items-center justify-between gap-4 border-y border-navy-100 py-3.5">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">Mobile</dt>
                <dd>
                  <a
                    href={telHref(tpo.mobile)}
                    className="rounded-sharp font-mono text-[0.9375rem] font-medium tabular text-navy-800 transition-colors duration-200 hover:text-signal"
                  >
                    {tpo.mobile}
                  </a>
                </dd>
              </dl>

              {/* Side by side wherever the card is wide enough for both
                  labels on one line; stacked on phones and in the narrower
                  two-column laptop layout. */}
              <div className="mt-6 flex flex-col gap-3 sm:mt-auto sm:flex-row sm:pt-6 lg:flex-col xl:flex-row">
                <Button
                  href={tpo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full sm:flex-1"
                >
                  <MessageCircle aria-hidden="true" strokeWidth={2} className="h-[1.125rem] w-[1.125rem]" />
                  Contact TPO
                  <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                </Button>
                <Button href={telHref(tpo.mobile)} variant="outline" className="w-full sm:flex-1">
                  <Phone aria-hidden="true" strokeWidth={2} className="h-[1.125rem] w-[1.125rem]" />
                  Call TPO
                  <span className="sr-only"> on {tpo.mobile}</span>
                </Button>
              </div>
            </div>
          </article>

          {/* Ways to partner */}
          <div
            className="reveal flex flex-col rounded-panel border border-navy-100 bg-canvas-soft p-5 sm:p-7 lg:col-span-7"
            style={{ '--reveal-delay': '200ms' }}
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-signal" />
              <h3 className="eyebrow shrink-0 text-ink-muted">Ways to partner</h3>
              <span aria-hidden="true" className="h-px flex-1 tick-rule text-navy-200" />
            </div>

            <ul className="mt-6 grid gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100 sm:grid-cols-2">
              {partnerships.opportunities.map((o, i) => {
                const Icon = ICONS[o.id];
                return (
                  <li key={o.id} className="flex flex-col bg-white p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-panel bg-navy-50 text-navy-700">
                        <Icon aria-hidden="true" strokeWidth={1.9} className="h-5 w-5" />
                      </span>
                      <span aria-hidden="true" className="font-mono text-[0.6875rem] tabular text-navy-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h4 className="mt-5 font-display text-[1.125rem] font-semibold leading-snug tracking-tight text-navy-800">
                      {o.title}
                    </h4>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{o.description}</p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 flex items-start gap-3 lg:mt-auto lg:pt-6">
              <span aria-hidden="true" className="mt-[0.7em] h-[2px] w-5 shrink-0 rounded-full bg-signal" />
              <span className="font-display text-[1.0625rem] font-medium leading-snug tracking-tight text-navy-800 sm:text-[1.1875rem]">
                {partnerships.closing}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrainingPlacementPartnerships;

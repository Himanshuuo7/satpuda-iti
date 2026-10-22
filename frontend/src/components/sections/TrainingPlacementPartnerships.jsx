import {
  ArrowUpRight,
  Briefcase,
  Factory,
  GraduationCap,
  HandHeart,
  Handshake,
  HardHat,
  MessageCircle,
  Phone,
  Wrench,
} from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import CopyButton from '../iti/CopyButton';
import { partnerships, trainingPlacementOfficer as tpo, whatsappWith } from '../../data/partnerships';
import { telHref } from '../../utils/format';
import useReveal from '../../hooks/useReveal';

/**
 * Training & Placement partnerships — the invitation to industry.
 *
 * The Training & Placement Officer's card (photograph, role, a short note,
 * the mobile number and the two ways to reach him: WhatsApp and a phone
 * call) sits beside a panel of the four ways an organisation can work with
 * the institute. Each way is itself a link that opens WhatsApp with that
 * topic already typed. Inside the card, above the buttons, a small bridge —
 * Satpuda ITI on one side, industry on the other, a handshake between —
 * pictures the officer's role.
 *
 * Motion is quiet and mostly asked for:
 *  - on reveal, a navy shutter lifts off the photograph, cyan corner marks
 *    close in on it, the red rule on the card draws across, the four ways
 *    rise in turn, and pulses cross the bridge twice before it rests;
 *  - under a mouse, the photograph eases closer and its corner marks open
 *    out, the call icon rings and the chat icon hops, and a way to partner
 *    darkens its icon, draws a red hairline and slides its arrow (the same
 *    on keyboard focus); hovering the card sets the bridge running again;
 *  - copying the number pops a check and a "Copied" pill.
 * Everything settles to its final state under reduced motion.
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

const messageAbout = (topic) => `Hello ${tpo.name}, I would like to discuss ${topic} with Satpuda ITI.`;

/** Satpuda ITI and industry, a handshake between, pulses crossing both ways. */
function Bridge() {
  return (
    <div aria-hidden="true" className="tpp-bridge flex w-full items-center gap-3 sm:gap-4">
      <span className="flex flex-col items-center gap-2">
        <span className="tpp-node grid h-11 w-11 place-items-center rounded-panel border border-navy-100 bg-white text-navy-700 shadow-card">
          <GraduationCap strokeWidth={1.9} className="h-5 w-5" />
        </span>
        <span className="whitespace-nowrap font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-soft">
          {partnerships.bridge.from}
        </span>
      </span>

      <span className="relative -mt-5 h-4 flex-1">
        <span className="tick-rule absolute inset-x-0 top-1/2 h-px -translate-y-1/2 text-navy-200" />
        <span className="tpp-pulse-track tpp-pulse-out absolute inset-0">
          <span className="absolute left-0 top-1/2 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
        </span>
        <span className="tpp-pulse-track tpp-pulse-in absolute inset-0">
          <span className="absolute left-0 top-1/2 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tech" />
        </span>
        <span className="tpp-hub absolute left-1/2 top-1/2 grid h-9 w-9 place-items-center rounded-full border-2 border-signal bg-white text-signal shadow-card">
          <Handshake strokeWidth={2} className="h-4 w-4" />
        </span>
      </span>

      <span className="flex flex-col items-center gap-2">
        <span className="tpp-node grid h-11 w-11 place-items-center rounded-panel border border-navy-100 bg-white text-navy-700 shadow-card">
          <Factory strokeWidth={1.9} className="h-5 w-5" />
        </span>
        <span className="whitespace-nowrap font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-soft">
          {partnerships.bridge.to}
        </span>
      </span>
    </div>
  );
}

export function TrainingPlacementPartnerships() {
  const ref = useReveal();

  return (
    <section
      id="training-placement-partnerships"
      ref={ref}
      aria-labelledby="training-placement-partnerships-title"
      className="tpp relative overflow-hidden border-y border-navy-100 bg-canvas py-20 sm:py-26 lg:py-30"
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
            className="tpp-card reveal relative flex flex-col overflow-hidden rounded-panel border border-navy-100 bg-white shadow-card lg:col-span-5"
            style={{ '--reveal-delay': '120ms' }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-signal [.is-visible_&]:animate-rule-draw"
            />

            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <div className="flex items-start gap-5 sm:gap-7">
                <div className="relative aspect-[4/5] w-28 shrink-0 sm:w-36">
                  <div className="relative h-full w-full overflow-hidden rounded-panel bg-navy-50">
                    <img
                      src={tpo.photo.src}
                      alt={tpo.photo.alt}
                      width={tpo.photo.width}
                      height={tpo.photo.height}
                      loading="lazy"
                      decoding="async"
                      className="tpp-photo h-full w-full object-cover object-top"
                    />
                    <span
                      aria-hidden="true"
                      className="about-shutter absolute inset-0 bg-navy-700"
                      style={{ '--reveal-delay': '300ms' }}
                    />
                  </div>
                  {/* Cyan corner marks frame the portrait */}
                  <span aria-hidden="true" className="tpp-corners pointer-events-none absolute -inset-2">
                    <span className="tpp-corner left-0 top-0 border-l-2 border-t-2" data-c="tl" />
                    <span className="tpp-corner right-0 top-0 border-r-2 border-t-2" data-c="tr" />
                    <span className="tpp-corner bottom-0 left-0 border-b-2 border-l-2" data-c="bl" />
                    <span className="tpp-corner bottom-0 right-0 border-b-2 border-r-2" data-c="br" />
                  </span>
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

              <dl className="mt-6 flex items-center justify-between gap-4 border-y border-navy-100 py-2.5">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">Mobile</dt>
                <dd className="flex items-center gap-3">
                  <a
                    href={telHref(tpo.mobile)}
                    className="rounded-sharp font-mono text-[0.9375rem] font-medium tabular text-navy-800 transition-colors duration-200 hover:text-signal"
                  >
                    {tpo.mobile}
                  </a>
                  <CopyButton value={tpo.mobile} label="mobile number" />
                </dd>
              </dl>

              {/* The officer is the bridge: it takes whatever height the
                  card has beyond its content, centred. */}
              <div className="flex flex-1 items-center py-7">
                <Bridge />
              </div>

              {/* Side by side wherever the card is wide enough for both
                  labels on one line; stacked on phones and in the narrower
                  two-column laptop layout. */}
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button
                  href={tpo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full sm:flex-1"
                >
                  <MessageCircle aria-hidden="true" strokeWidth={2} className="tpp-hop h-[1.125rem] w-[1.125rem]" />
                  Contact TPO
                  <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                </Button>
                <Button href={telHref(tpo.mobile)} variant="outline" className="w-full sm:flex-1">
                  <Phone aria-hidden="true" strokeWidth={2} className="campus-ring h-[1.125rem] w-[1.125rem]" />
                  Call TPO
                  <span className="sr-only"> on {tpo.mobile}</span>
                </Button>
              </div>
            </div>
          </article>

          {/* Ways to partner */}
          <div
            className="tpp-panel reveal flex flex-col rounded-panel border border-navy-100 bg-canvas-soft p-5 sm:p-7 lg:col-span-7"
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
                  <li key={o.id} className="reveal flex bg-white" style={{ '--reveal-delay': `${280 + i * 90}ms` }}>
                    <a
                      href={whatsappWith(messageAbout(o.topic))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tpp-way relative flex w-full flex-col p-5 sm:p-6"
                    >
                      <span aria-hidden="true" className="tpp-way-rule absolute inset-x-0 top-0 h-[2px] bg-signal" />
                      <span className="flex items-center justify-between">
                        <span className="tpp-way-icon grid h-11 w-11 place-items-center rounded-panel bg-navy-50 text-navy-700">
                          <Icon aria-hidden="true" strokeWidth={1.9} className="h-5 w-5" />
                        </span>
                        <span aria-hidden="true" className="tpp-way-num font-mono text-[0.6875rem] tabular text-navy-300">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </span>
                      <span className="mt-5 block font-display text-[1.125rem] font-semibold leading-snug tracking-tight text-navy-800">
                        {o.title}
                      </span>
                      <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink-muted">{o.description}</span>
                      <span className="tpp-way-cta mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">
                        Discuss on WhatsApp
                        <ArrowUpRight aria-hidden="true" strokeWidth={2} className="tpp-way-arrow h-3.5 w-3.5" />
                      </span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
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

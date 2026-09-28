import { useId, useState } from 'react';
import { CircleHelp, Mail, Phone, Plus } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import { themeFor } from './theme';
import { contact } from '../../data/satpudaData';
import { telHref } from '../../utils/format';
import useReveal from '../../hooks/useReveal';
import cn from '../../utils/cn';

/**
 * FAQ — an accordion of real buttons and regions. Answers open on grid rows
 * (no height measuring), the plus turns to a cross, and the answer text fades
 * in a beat after the panel starts to open.
 */
function Item({ q, a, open, onToggle, accent }) {
  const id = useId();
  return (
    <li className="border-b border-navy-100">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-6 py-5 text-left"
        >
          <span
            className={cn(
              'font-display text-[1.125rem] font-semibold leading-snug transition-colors duration-200 sm:text-[1.1875rem]',
              open ? 'text-navy-900' : 'text-navy-800 group-hover:text-navy-900'
            )}
          >
            {q}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ease-out',
              open ? cn('rotate-45 border-transparent text-white', accent.bg) : 'border-navy-200 text-navy-700 group-hover:border-navy-400'
            )}
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className="trade-faq-panel"
        data-open={open}
      >
        <div>
          <p className="max-w-prose pb-6 pr-12 text-[0.9375rem] leading-[1.7] text-ink-muted">{a}</p>
        </div>
      </div>
    </li>
  );
}

export function TradeFAQ({ trade }) {
  const ref = useReveal();
  const { accent } = themeFor(trade);
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      ref={ref}
      aria-labelledby="faq-title"
      className="relative scroll-mt-[var(--header-h)] bg-white py-20 sm:py-26 lg:py-30"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title={
              <>
                Questions,
                <br />
                <span className={accent.text}>answered.</span>
              </>
            }
          />

          <div className="reveal mt-10 rounded-panel border border-navy-100 bg-canvas-soft p-6" style={{ '--reveal-delay': '140ms' }}>
            <CircleHelp aria-hidden="true" strokeWidth={1.75} className={cn('h-5 w-5', accent.text)} />
            <p className="mt-3 font-display text-[1.125rem] font-semibold text-navy-800">Still have a question?</p>
            <p className="mt-1.5 text-[0.875rem] leading-[1.6] text-ink-muted">
              Seats, dates and fees change each session — the enquiry desk has the current answer.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={telHref(contact.enquiry.phone)}
                className="group inline-flex min-h-[2.5rem] items-center gap-2.5 text-[0.9375rem] font-medium text-navy-800 hover:text-royal"
              >
                <Phone aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 text-signal transition-transform duration-300 group-hover:-rotate-12" />
                <span className="font-mono tabular">{contact.enquiry.phone}</span>
              </a>
              <a
                href={`mailto:${contact.enquiry.email}`}
                className="group inline-flex min-h-[2.5rem] items-center gap-2.5 break-all text-[0.875rem] text-navy-700 hover:text-royal"
              >
                <Mail aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 shrink-0 text-signal transition-transform duration-300 group-hover:-translate-y-0.5" />
                {contact.enquiry.email}
              </a>
            </div>
          </div>
        </div>

        <ul className="reveal border-t border-navy-100 lg:col-span-8" style={{ '--reveal-delay': '80ms' }}>
          {trade.faqs.map((f, i) => (
            <Item
              key={f.q}
              q={f.q}
              a={f.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              accent={accent}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TradeFAQ;

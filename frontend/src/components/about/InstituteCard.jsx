import { ArrowRight, Mail, MapPin, Navigation, Phone } from 'lucide-react';

import { mapsHrefFor } from '../../data/itiInstitutes';
import { tradeById } from '../../data/trades';
import { telHref } from '../../utils/format';

/**
 * One verified institute. Everything shown comes from the record; fields the
 * official site does not publish are simply omitted, never filled in.
 */
export function InstituteCard({ inst, index, onView }) {
  const people = inst.principal
    ? { label: 'Principal', value: inst.principal }
    : inst.contactPerson
      ? { label: 'Contact', value: inst.contactPerson }
      : null;

  return (
    <article
      className="about-enter group relative flex h-full flex-col rounded-panel border border-navy-100 bg-white p-6 shadow-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
      style={{ '--i': index }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-[2px] origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="flex min-h-[1.375rem] items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 font-mono text-label uppercase text-royal">
          <MapPin aria-hidden="true" className="about-pin-hop h-3.5 w-3.5 text-signal" strokeWidth={2.25} />
          {inst.district}
        </p>
        <div className="flex items-center gap-1.5">
          {inst.flagship && (
            <span className="rounded-sharp bg-navy-800 px-1.5 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-white">
              Head office
            </span>
          )}
          {inst.established && (
            <span className="rounded-sharp border border-navy-100 px-1.5 py-0.5 font-mono text-[0.625rem] tabular text-ink-muted">
              Est. {inst.established}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 font-display text-[1.25rem] font-semibold leading-snug tracking-tight text-navy-800">
        {inst.name}
      </h3>
      <p className="mt-1 text-[0.875rem] text-ink-muted">{inst.location}</p>

      <div className="mt-5">
        {inst.trades.length > 0 ? (
          <ul aria-label="Trades" className="flex flex-wrap gap-1.5">
            {inst.trades.map((t) => (
              <li
                key={t.id}
                className="rounded-sharp bg-royal-50 px-2 py-1 text-[0.75rem] font-medium text-royal-800"
              >
                {tradeById[t.id]?.name ?? t.id}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[0.8125rem] italic text-ink-soft">Contact the campus for trades</p>
        )}
      </div>

      <dl className="mt-5 space-y-2 border-t border-navy-50 pt-4 text-[0.8438rem]">
        {people && (
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 text-ink-soft">{people.label}</dt>
            <dd className="font-medium text-navy-700">{people.value}</dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 text-ink-soft">
            <Phone aria-hidden="true" className="inline h-3.5 w-3.5" /> <span className="sr-only">Phone</span>
          </dt>
          <dd>
            <a href={telHref(inst.phone)} className="font-mono tabular text-navy-700 hover:text-royal">
              {inst.phone}
            </a>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 text-ink-soft">
            <Mail aria-hidden="true" className="inline h-3.5 w-3.5" /> <span className="sr-only">Email</span>
          </dt>
          <dd className="min-w-0">
            <a href={`mailto:${inst.email}`} className="break-all text-navy-700 hover:text-royal">
              {inst.email}
            </a>
          </dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <a
          href={mapsHrefFor(inst)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-[0.8125rem] font-medium text-ink-muted transition-colors hover:text-royal"
        >
          <Navigation aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          Location
          <span className="sr-only">of {inst.name} on Google Maps (opens in a new tab)</span>
        </a>
        <button
          type="button"
          onClick={() => onView(inst)}
          className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-edge px-1 text-[0.875rem] font-semibold text-navy-800 transition-colors hover:text-signal"
        >
          View institute
          <span className="sr-only">: {inst.name}</span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            strokeWidth={2}
          />
        </button>
      </div>
    </article>
  );
}

export default InstituteCard;

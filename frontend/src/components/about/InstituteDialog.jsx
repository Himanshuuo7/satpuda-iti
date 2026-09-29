import { useEffect, useRef } from 'react';
import { Mail, Navigation, Phone, X } from 'lucide-react';

import { mapsHrefFor } from '../../data/itiInstitutes';
import { tradeById } from '../../data/trades';
import { telHref } from '../../utils/format';

/**
 * Full institute record in a native modal <dialog>.
 *
 * `showModal()` gives focus trapping, Escape-to-close and an inert page for
 * free; focus returns to the "View institute" button on close. Missing fields
 * point the reader to the campus, and a field still being confirmed reads
 * "To be verified" — the dialog never guesses.
 */

function Row({ label, children, note }) {
  return (
    <div className="grid gap-1 border-b border-navy-50 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft sm:pt-0.5">{label}</dt>
      <dd className="text-[0.9375rem] text-navy-800">
        {children}
        {note && <span className="mt-0.5 block text-[0.75rem] text-ink-soft">{note}</span>}
      </dd>
    </div>
  );
}

const Missing = ({ verify }) => (
  <span className={verify ? 'font-medium text-signal-600' : 'text-ink-soft'}>
    {verify ? 'To be verified' : 'Contact the campus'}
  </span>
);

export function InstituteDialog({ inst, onClose }) {
  const ref = useRef(null);
  const returnFocus = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (inst && !dialog.open) {
      returnFocus.current = document.activeElement;
      dialog.showModal();
    } else if (!inst && dialog.open) {
      dialog.close();
    }
  }, [inst]);

  const handleClose = () => {
    onClose();
    returnFocus.current?.focus?.();
  };

  const verify = (field) => inst?.toVerify?.includes(field);

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-labelledby="inst-dialog-title"
      className="about-dialog m-auto max-h-[min(92vh,52rem)] w-[min(100%-2rem,44rem)] overflow-y-auto rounded-panel border border-navy-100 bg-white p-0 text-left shadow-deep"
    >
      {inst && (
        <div>
          <header className="relative overflow-hidden bg-navy-800 px-6 pb-7 pt-6 text-white sm:px-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
            <div className="relative flex items-start justify-between gap-4">
              <p className="font-mono text-label uppercase text-tech">
                {inst.district} district · {inst.state}
              </p>
              <button
                type="button"
                onClick={() => ref.current.close()}
                className="-mr-2 -mt-2 grid h-10 w-10 shrink-0 place-items-center rounded-edge text-navy-100 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <h2
              id="inst-dialog-title"
              className="relative mt-3 font-display text-[1.625rem] font-semibold leading-tight sm:text-[1.875rem]"
            >
              {inst.name}
            </h2>
            <p className="relative mt-1 text-navy-100/80">{inst.location}</p>
          </header>

          <div className="px-6 py-4 sm:px-8">
            <dl>
              <Row label="Address">{inst.address}</Row>
              <Row label="Established">{inst.established ?? <Missing verify={verify('established')} />}</Row>
              <Row label={inst.principal ? 'Principal' : 'Contact person'}>
                {inst.principal ?? inst.contactPerson ?? <Missing />}
              </Row>
              <Row label="Phone">
                <a href={telHref(inst.phone)} className="font-mono tabular hover:text-royal">
                  {inst.phone}
                </a>
              </Row>
              <Row label="Email">
                <a href={`mailto:${inst.email}`} className="break-all hover:text-royal">
                  {inst.email}
                </a>
              </Row>
              <Row label="Trades">
                {inst.trades.length ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {inst.trades.map((t) => {
                      const trade = tradeById[t.id];
                      return (
                        <li key={t.id} className="rounded-sharp bg-royal-50 px-2 py-1 text-[0.8125rem] text-royal-800">
                          {trade?.name}
                          {trade?.duration && <span className="ml-1.5 text-royal-700">· {trade.duration}</span>}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <Missing />
                )}
              </Row>
              <Row label="Affiliation">{inst.affiliation ?? <Missing />}</Row>
              {inst.dgetRef && (
                <Row label="DGET reference">
                  <span className="font-mono text-[0.875rem]">{inst.dgetRef}</span>
                </Row>
              )}
              {inst.itiCode && (
                <Row label="ITI code">
                  <span className="font-mono text-[0.875rem]">{inst.itiCode}</span>
                </Row>
              )}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={telHref(inst.phone)}
                className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-edge bg-signal px-4 text-[0.875rem] font-medium text-white transition-colors hover:bg-signal-600"
              >
                <Phone aria-hidden="true" className="h-4 w-4" /> Call
              </a>
              <a
                href={`mailto:${inst.email}`}
                className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-edge border border-navy-200 px-4 text-[0.875rem] font-medium text-navy-800 transition-colors hover:border-royal hover:text-royal"
              >
                <Mail aria-hidden="true" className="h-4 w-4" /> Email
              </a>
              <a
                href={mapsHrefFor(inst)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-edge border border-navy-200 px-4 text-[0.875rem] font-medium text-navy-800 transition-colors hover:border-royal hover:text-royal"
              >
                <Navigation aria-hidden="true" className="h-4 w-4" /> Open in Maps
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default InstituteDialog;

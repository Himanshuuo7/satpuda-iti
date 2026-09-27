import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import Button from '../components/ui/Button';
import GearOutline from '../components/ui/GearOutline';
import useSeo from '../hooks/useSeo';
import { contact } from '../data/satpudaData';
import { telHref } from '../utils/format';

/**
 * Coming-soon placeholder for routes that are not built in this phase.
 *
 * Deliberately restrained but fully in the site's visual world — same navy
 * surface, blueprint grid, gear outline and type system — so an early visitor
 * lands somewhere that looks finished rather than broken. It always offers a
 * real next step: the published enquiry line and a route back home.
 */
export function PlaceholderPage({ title, eyebrow, description }) {
  useSeo({
    title: `${title} | Satpuda ITI`,
    description:
      description ??
      `${title} — Satpuda Private Industrial Training Institute. This section is being prepared.`,
  });

  return (
    <main id="main" className="relative flex min-h-screen flex-col overflow-hidden bg-navy-800 pt-[var(--header-h)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_75%_at_50%_0%,rgba(27,70,128,0.5),transparent_65%)]"
      />
      <GearOutline
        spin
        className="pointer-events-none absolute -right-32 top-1/3 h-[30rem] w-[30rem] text-tech/[0.06]"
      />

      <div className="shell relative flex flex-1 items-center py-20 sm:py-26">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-signal" />
            <p className="eyebrow text-tech">{eyebrow ?? 'Satpuda ITI'}</p>
          </div>

          <h1 className="mt-7 font-display text-display-lg font-bold leading-[1.02] text-white">
            {title}
          </h1>

          <p className="mt-6 inline-flex items-center gap-3 rounded-edge border border-white/15 px-4 py-2.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse-marker rounded-full bg-signal"
            />
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-navy-100/80">
              Coming soon
            </span>
          </p>

          <p className="mt-7 max-w-prose text-[1.0625rem] leading-[1.75] text-navy-100/75">
            {description ??
              'This section is being prepared. In the meantime the homepage carries the institute’s trades, training approach, placement record and campus network.'}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/" variant="ghostLight" size="lg" className="w-full sm:w-auto">
              <ArrowLeft
                aria-hidden="true"
                strokeWidth={2}
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1"
              />
              Back to home
            </Button>
            <Button to="/admission" variant="primary" size="lg" className="w-full sm:w-auto">
              Apply Now
              <ArrowRight
                aria-hidden="true"
                strokeWidth={2}
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </Button>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="text-[0.875rem] text-navy-100/60">
              For admission enquiries, call{' '}
              <a
                href={telHref(contact.enquiry.phone)}
                className="font-mono tabular text-white underline decoration-tech/50 transition-colors hover:text-tech"
              >
                {contact.enquiry.phone}
              </a>{' '}
              or email{' '}
              <a
                href={`mailto:${contact.enquiry.email}`}
                className="break-all text-white underline decoration-tech/50 transition-colors hover:text-tech"
              >
                {contact.enquiry.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/** 404 — same world, different message. */
export function NotFoundPage() {
  return (
    <PlaceholderPage
      eyebrow="Error 404"
      title="Page not found."
      description="The page you were looking for does not exist or has moved. Use the navigation above, or head back to the homepage."
    />
  );
}

export default PlaceholderPage;

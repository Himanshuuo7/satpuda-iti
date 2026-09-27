import { Link } from 'react-router-dom';
import { Facebook, Mail, MapPin, Phone } from 'lucide-react';

import Logo from '../ui/Logo';
import {
  campuses,
  contact,
  groupInstitutions,
  institute,
  trades,
} from '../../data/satpudaData';
import { telHref } from '../../utils/format';

/**
 * Footer.
 *
 * Four columns on desktop collapsing to a single readable stack on phones. Only
 * the social account the official site actually links is shown — no placeholder
 * icons for accounts that may not exist.
 */

const QUICK_LINKS = [
  { label: 'About Satpuda ITI', to: '/about' },
  { label: 'Training', to: '/training' },
  { label: 'Placements', to: '/placements' },
  { label: 'Campuses', to: '/campuses' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Admission', to: '/admission' },
];

const ICONS = { Facebook };

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />

      <div className="shell relative">
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* Identity */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-[1.75] text-navy-100/70">
              {institute.groupNote}
            </p>

            {contact.social.length > 0 && (
              <div className="mt-7 flex items-center gap-2.5">
                {contact.social.map((item) => {
                  const Icon = ICONS[item.icon] ?? Facebook;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Satpuda ITI on ${item.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-edge border border-white/15 text-navy-100/80 transition-colors duration-200 hover:border-tech hover:text-tech"
                    >
                      <Icon aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="font-mono text-label uppercase text-tech">Quick Links</h2>
            <ul className="mt-5 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex min-h-[1.75rem] items-center text-[0.875rem] text-navy-100/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Trades */}
          <div className="lg:col-span-2">
            <h2 className="font-mono text-label uppercase text-tech">Trades</h2>
            <ul className="mt-5 space-y-2.5">
              {trades.map((trade) => (
                <li key={trade.id}>
                  <Link
                    to={trade.slug}
                    className="inline-flex min-h-[1.75rem] items-center text-[0.875rem] text-navy-100/70 transition-colors duration-200 hover:text-white"
                  >
                    {trade.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-mono text-label uppercase text-tech">Group</h2>
            <ul className="mt-5 space-y-2.5">
              {groupInstitutions.map((item) => (
                <li key={item.name} className="text-[0.875rem] leading-snug text-navy-100/70">
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h2 className="font-mono text-label uppercase text-tech">
              {contact.headOffice.label}
            </h2>

            <address className="mt-5 flex flex-col gap-4 not-italic">
              <p className="flex items-start gap-3 text-[0.9375rem] leading-[1.7] text-navy-100/70">
                <MapPin
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mt-1 h-4 w-4 shrink-0 text-tech"
                />
                {contact.headOffice.address}
              </p>

              <a
                href={telHref(contact.headOffice.phone)}
                className="group flex items-center gap-3 text-[0.9375rem] text-white transition-colors duration-200 hover:text-tech"
              >
                <Phone
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-4 w-4 shrink-0 text-tech transition-colors group-hover:text-signal"
                />
                <span className="font-mono tabular">{contact.headOffice.phone}</span>
              </a>

              <a
                href={`mailto:${contact.headOffice.email}`}
                className="group flex items-center gap-3 break-all text-[0.9375rem] text-navy-100/70 transition-colors duration-200 hover:text-white"
              >
                <Mail
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-4 w-4 shrink-0 text-tech transition-colors group-hover:text-signal"
                />
                {contact.headOffice.email}
              </a>
            </address>

            <div className="mt-7 border-t border-white/10 pt-5">
              <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-navy-100/45">
                {contact.enquiry.label}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={telHref(contact.enquiry.phone)}
                  className="font-mono text-[0.875rem] tabular text-navy-100/80 transition-colors hover:text-white"
                >
                  {contact.enquiry.phone}
                </a>
                <a
                  href={`mailto:${contact.enquiry.email}`}
                  className="break-all text-[0.875rem] text-navy-100/80 transition-colors hover:text-white"
                >
                  {contact.enquiry.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Campus rail */}
        <div className="border-t border-white/10 py-6">
          <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-navy-100/45">
            Satpuda I.T.I. Locations
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {campuses.map((campus) => (
              <li key={campus.id}>
                <Link
                  to="/campuses"
                  className="inline-flex min-h-[1.75rem] items-center text-[0.8125rem] text-navy-100/60 transition-colors duration-200 hover:text-tech"
                >
                  {campus.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-navy-100/50">
            © {year} Satpuda Group. All rights reserved.
          </p>
          <p className="text-[0.75rem] text-navy-100/40">
            {institute.trust} · Since {institute.establishedYear}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import { useMemo, useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, Loader2, Mail, MapPin, Navigation, Phone, RotateCcw } from 'lucide-react';

import Button from '../components/ui/Button';
import PageHero from '../components/forms/PageHero';
import useForm from '../components/forms/useForm';
import { SelectField, TextAreaField, TextField } from '../components/forms/Field';
import useSeo from '../hooks/useSeo';
import { contact } from '../data/satpudaData';
import { headOffice, itiInstitutes, itiRegions, mapsDirectionsFor, mapsEmbedFor } from '../data/itiInstitutes';
import { submitContact } from '../services/contentService';
import { telHref } from '../utils/format';
import cn from '../utils/cn';

/**
 * Contact — /contact.
 *
 * The published head-office and enquiry details, a message form that saves to
 * the backend (POST /api/contact), the head-office map and a filterable
 * directory of every campus's phone and email.
 */

const SUBJECT_OPTIONS = [
  { value: 'admission', label: 'Admission' },
  { value: 'placement', label: 'Placement' },
  { value: 'fees', label: 'Fees & scholarships' },
  { value: 'campus', label: 'Campus / facilities' },
  { value: 'other', label: 'Other' },
];

const INITIAL = { name: '', phone: '', email: '', subject: '', message: '' };

const CARDS = [
  {
    icon: Phone,
    title: contact.enquiry.label,
    lines: [{ text: contact.enquiry.phone, href: telHref(contact.enquiry.phone), mono: true }],
    sub: { text: contact.enquiry.email, href: `mailto:${contact.enquiry.email}` },
  },
  {
    icon: Mail,
    title: 'Email',
    lines: [{ text: contact.headOffice.email, href: `mailto:${contact.headOffice.email}` }],
    sub: { text: contact.group.email, href: `mailto:${contact.group.email}` },
  },
  {
    icon: MapPin,
    title: contact.headOffice.label,
    lines: [{ text: contact.headOffice.address }],
  },
];

function InfoCard({ icon: Icon, title, lines, sub }) {
  return (
    <div className="flex gap-4 rounded-panel border border-navy-100 bg-white p-5 shadow-card sm:p-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-edge bg-navy-50 text-navy-600">
        <Icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="eyebrow text-ink-soft">{title}</p>
        {lines.map((l) =>
          l.href ? (
            <a
              key={l.text}
              href={l.href}
              className={cn(
                'mt-2 block break-words text-navy-800 transition-colors hover:text-royal',
                l.mono ? 'font-mono text-lg tabular' : 'text-[0.9375rem] font-medium'
              )}
            >
              {l.text}
            </a>
          ) : (
            <p key={l.text} className="mt-2 text-[0.9375rem] leading-[1.6] text-ink-muted">
              {l.text}
            </p>
          )
        )}
        {sub && (
          <a href={sub.href} className="mt-1 block break-all text-[0.8125rem] text-ink-soft transition-colors hover:text-royal">
            {sub.text}
          </a>
        )}
      </div>
    </div>
  );
}

function ContactForm() {
  const { field, status, message, onSubmit, reset } = useForm(INITIAL, submitContact);
  const submitting = status === 'submitting';

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="py-10 text-center">
        <CheckCircle2 aria-hidden="true" strokeWidth={1.5} className="mx-auto h-14 w-14 text-tech-600" />
        <h2 className="mt-6 font-display text-display-sm font-bold text-navy-800">Message sent.</h2>
        <p className="mx-auto mt-4 max-w-md text-[1rem] leading-[1.7] text-ink-muted">{message}</p>
        <Button variant="outline" onClick={reset} className="mt-8">
          <RotateCcw aria-hidden="true" strokeWidth={2} className="h-4 w-4" />
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <TextField label="Your name" required autoComplete="name" maxLength={100} {...field('name')} />
      <TextField
        label="Mobile number"
        type="tel"
        inputMode="numeric"
        required
        autoComplete="tel-national"
        placeholder="10-digit mobile"
        {...field('phone')}
      />
      <TextField label="Email" type="email" autoComplete="email" {...field('email')} />
      <SelectField label="Subject" required options={SUBJECT_OPTIONS} {...field('subject')} />
      <TextAreaField
        label="Message"
        required
        rows={5}
        minLength={10}
        maxLength={2000}
        placeholder="How can we help?"
        className="sm:col-span-2"
        {...field('message')}
      />

      {status === 'error' && message && (
        <p role="alert" className="rounded-edge border border-signal-300 bg-signal-50 px-4 py-3 text-[0.875rem] text-signal-700 sm:col-span-2">
          {message}
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" strokeWidth={2} className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight
                aria-hidden="true"
                strokeWidth={2}
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function CampusDirectory() {
  const [region, setRegion] = useState('all');
  const list = useMemo(
    () => (region === 'all' ? itiInstitutes : itiInstitutes.filter((i) => i.district.toLowerCase() === region)),
    [region]
  );

  return (
    <section aria-labelledby="campus-directory" className="bg-white">
      <div className="shell py-14 sm:py-16 lg:py-20">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-10 bg-signal" />
          <p className="eyebrow text-royal">Campus directory</p>
        </div>
        <h2 id="campus-directory" className="mt-5 font-display text-display-sm font-bold text-navy-800">
          Contact a campus directly.
        </h2>

        <div role="group" aria-label="Filter by district" className="mt-8 flex flex-wrap gap-2">
          {itiRegions.map((r) => (
            <button
              key={r.id}
              type="button"
              aria-pressed={region === r.id}
              onClick={() => setRegion(r.id)}
              className={cn(
                'min-h-[2.375rem] rounded-edge border px-3.5 text-[0.8125rem] transition-colors duration-200',
                region === r.id
                  ? 'border-navy-700 bg-navy-700 text-white'
                  : 'border-navy-100 bg-white text-ink-muted hover:border-navy-300 hover:text-navy-800'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((inst) => (
            <li key={inst.id} className="flex flex-col rounded-panel border border-navy-100 bg-canvas-soft p-5">
              <p className="eyebrow text-ink-soft">{inst.district}</p>
              <h3 className="mt-2 font-display text-[1.0625rem] font-semibold leading-snug text-navy-800">{inst.name}</h3>
              <p className="mt-2 text-[0.875rem] leading-[1.6] text-ink-muted">{inst.address}</p>
              <div className="mt-4 space-y-1.5 border-t border-navy-100 pt-4 text-[0.875rem]">
                {inst.phone && (
                  <a href={telHref(inst.phone)} className="flex items-center gap-2 font-mono tabular text-navy-800 hover:text-royal">
                    <Phone aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5 text-tech-700" />
                    {inst.phone}
                  </a>
                )}
                {inst.email && (
                  <a href={`mailto:${inst.email}`} className="flex items-center gap-2 break-all text-navy-800 hover:text-royal">
                    <Mail aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5 shrink-0 text-tech-700" />
                    {inst.email}
                  </a>
                )}
              </div>
              <a
                href={mapsDirectionsFor(inst)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 self-start text-[0.8125rem] font-medium text-royal hover:text-navy-800"
              >
                <Navigation aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5" />
                Directions
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ContactPage() {
  useSeo({
    title: 'Contact | Satpuda ITI',
    description:
      'Contact Satpuda Private ITI — admission enquiry phone, email, head office address at Manjhapur, Balaghat, and phone numbers for every campus.',
  });

  return (
    <main id="main" className="pt-[var(--header-h)]">
      <PageHero
        crumb="Contact"
        eyebrow="Get in touch"
        lines={['We are here', 'to help.']}
        lede="Questions about admission, trades, fees or placement? Call the enquiry line, send us a message, or reach any campus directly."
      />

      <section className="relative bg-canvas-soft">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-light opacity-60" />
        <div className="shell relative py-14 sm:py-16 lg:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            {CARDS.map((card) => (
              <InfoCard key={card.title} {...card} />
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="rounded-panel border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:col-span-7 lg:p-10">
              <h2 className="font-display text-display-sm font-bold text-navy-800">Send us a message</h2>
              <p className="mt-3 text-[0.9375rem] text-ink-muted">Leave your number and the right team will get back to you.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-panel border border-navy-100 bg-white shadow-card lg:col-span-5">
              <iframe
                title={`Map — ${headOffice.name}`}
                src={mapsEmbedFor(headOffice)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full flex-1 border-0 lg:h-auto lg:min-h-[22rem]"
              />
              <div className="flex items-start gap-3 border-t border-navy-100 p-5">
                <Building2 aria-hidden="true" strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />
                <div className="min-w-0">
                  <p className="font-medium text-navy-800">{contact.headOffice.org}</p>
                  <p className="mt-1 text-[0.875rem] leading-[1.6] text-ink-muted">{contact.group.address}</p>
                  <a
                    href={mapsDirectionsFor(headOffice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-royal hover:text-navy-800"
                  >
                    <Navigation aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5" />
                    Get directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CampusDirectory />
    </main>
  );
}

export default ContactPage;

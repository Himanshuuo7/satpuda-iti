import { useMemo } from 'react';
import { ArrowRight, CheckCircle2, FileText, Loader2, Phone, RotateCcw } from 'lucide-react';

import Button from '../components/ui/Button';
import PageHero from '../components/forms/PageHero';
import useForm from '../components/forms/useForm';
import {
  FormSection,
  RadioGroupField,
  SelectField,
  TextAreaField,
  TextField,
} from '../components/forms/Field';
import useSeo from '../hooks/useSeo';
import { contact, trades } from '../data/satpudaData';
import { itiInstitutes } from '../data/itiInstitutes';
import { submitAdmission } from '../services/contentService';
import { telHref } from '../utils/format';

/**
 * Admission — /admission.
 *
 * A single-page application form for the basic details the admission team
 * needs to call an applicant back. It saves to the backend (POST
 * /api/admissions) and returns a reference number; documents and fees are
 * handled at counselling, not online.
 */

// Trade ids as the campus records and the API use them (the slug's last part).
const TRADE_OPTIONS = trades.map((t) => ({ value: t.slug.split('/').pop(), label: t.name }));

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const QUALIFICATION_OPTIONS = [
  { value: '10th', label: '10th pass' },
  { value: '12th', label: '12th pass' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'other', label: 'Other' },
];

const INITIAL = {
  fullName: '',
  fatherName: '',
  dateOfBirth: '',
  gender: '',
  phone: '',
  email: '',
  qualification: '',
  percentage: '',
  trade: '',
  campus: '',
  address: '',
  district: '',
  message: '',
};

const DOCUMENTS = [
  '10th mark sheet (and 12th, if passed)',
  'Aadhaar card',
  'Transfer / school leaving certificate',
  'Caste and domicile certificate, where applicable',
  'Recent passport-size photographs',
];

const NEXT_STEPS = [
  'The admission team calls you on the mobile number you give.',
  'Visit the campus for counselling and document verification.',
  'Seat confirmation as per NCVT / DTE Madhya Pradesh norms.',
];

/** Latest date of birth that still makes an applicant 14 today. */
const maxDob = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 14);
  return d.toISOString().slice(0, 10);
};

export function AdmissionPage() {
  useSeo({
    title: 'Admission | Apply Online | Satpuda ITI',
    description:
      'Apply online for admission to Satpuda Private ITI — Electrician, Fitter, Mechanic Diesel and COPA trades. Fill in your basic details and our admission team will call you.',
  });

  const form = useForm(INITIAL, submitAdmission);
  const { values, field, status, message, result, onSubmit, reset } = form;

  // Only the campuses that publish the chosen trade.
  const campusOptions = useMemo(
    () =>
      itiInstitutes
        .filter((i) => !values.trade || i.trades.some((t) => t.id === values.trade))
        .map((i) => ({ value: i.id, label: `${i.shortName} — ${i.district}` })),
    [values.trade]
  );

  const tradeField = field('trade');
  const onTradeChange = (e) => {
    tradeField.onChange(e);
    const stillOffered = itiInstitutes
      .find((i) => i.id === values.campus)
      ?.trades.some((t) => t.id === e.target.value);
    if (values.campus && !stillOffered) {
      field('campus').onChange({ target: { name: 'campus', value: '' } });
    }
  };

  const submitting = status === 'submitting';

  return (
    <main id="main" className="pt-[var(--header-h)]">
      <PageHero
        crumb="Admission"
        eyebrow="Admission open · Apply online"
        lines={['Apply to', 'Satpuda ITI.']}
        lede="Fill in your basic details below. It takes about two minutes — our admission team will call you back to guide you through counselling and documents."
      />

      <section className="relative bg-canvas-soft">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-light opacity-60" />

        <div className="shell relative grid gap-8 py-14 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Form */}
          <div className="lg:col-span-8">
            <div className="rounded-panel border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:p-10">
              {status === 'success' ? (
                <div role="status" aria-live="polite" className="py-6 text-center sm:py-10">
                  <CheckCircle2 aria-hidden="true" strokeWidth={1.5} className="mx-auto h-14 w-14 text-tech-600" />
                  <h2 className="mt-6 font-display text-display-sm font-bold text-navy-800">Application received.</h2>
                  <p className="mx-auto mt-4 max-w-md text-[1rem] leading-[1.7] text-ink-muted">{message}</p>
                  {result?.data?.referenceNo && (
                    <p className="mx-auto mt-8 inline-flex flex-col items-center gap-1 rounded-edge border border-navy-100 bg-canvas-soft px-6 py-4">
                      <span className="eyebrow text-ink-soft">Reference number</span>
                      <span className="font-mono text-xl font-semibold tabular text-navy-800">
                        {result.data.referenceNo}
                      </span>
                    </p>
                  )}
                  <p className="mt-6 text-[0.875rem] text-ink-soft">Keep this number for any follow-up.</p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button variant="outline" onClick={reset}>
                      <RotateCcw aria-hidden="true" strokeWidth={2} className="h-4 w-4" />
                      Submit another application
                    </Button>
                    <Button to="/" variant="solid">
                      Back to home
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-8">
                  <FormSection index={1} title="Personal details">
                    <TextField label="Full name" required autoComplete="name" maxLength={100} placeholder="As on your 10th mark sheet" {...field('fullName')} />
                    <TextField label="Father's name" required maxLength={100} {...field('fatherName')} />
                    <TextField label="Date of birth" type="date" required max={maxDob()} {...field('dateOfBirth')} />
                    <RadioGroupField label="Gender" required options={GENDER_OPTIONS} {...field('gender')} />
                  </FormSection>

                  <FormSection index={2} title="Contact details">
                    <TextField
                      label="Mobile number"
                      type="tel"
                      inputMode="numeric"
                      required
                      autoComplete="tel-national"
                      placeholder="10-digit mobile"
                      hint="We will call you on this number."
                      {...field('phone')}
                    />
                    <TextField label="Email" type="email" autoComplete="email" {...field('email')} />
                    <TextAreaField
                      label="Address"
                      required
                      rows={2}
                      maxLength={300}
                      autoComplete="street-address"
                      placeholder="House / ward, village or town"
                      className="sm:col-span-2"
                      {...field('address')}
                    />
                    <TextField label="District" required maxLength={60} placeholder="e.g. Balaghat" {...field('district')} />
                  </FormSection>

                  <FormSection index={3} title="Education">
                    <SelectField label="Highest qualification" required options={QUALIFICATION_OPTIONS} {...field('qualification')} />
                    <TextField
                      label="Percentage"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      max={100}
                      step="0.01"
                      placeholder="e.g. 68.5"
                      {...field('percentage')}
                    />
                  </FormSection>

                  <FormSection index={4} title="Course preference">
                    <SelectField label="Trade" required options={TRADE_OPTIONS} {...tradeField} onChange={onTradeChange} />
                    <SelectField
                      label="Preferred campus"
                      required
                      options={campusOptions}
                      hint={values.trade ? 'Showing campuses that offer this trade.' : 'Choose a trade first to narrow the list.'}
                      {...field('campus')}
                    />
                    <TextAreaField
                      label="Anything else?"
                      rows={3}
                      maxLength={1000}
                      placeholder="Questions about fees, hostel, timing…"
                      className="sm:col-span-2"
                      {...field('message')}
                    />
                  </FormSection>

                  {status === 'error' && message && (
                    <p role="alert" className="rounded-edge border border-signal-300 bg-signal-50 px-4 py-3 text-[0.875rem] text-signal-700">
                      {message}
                    </p>
                  )}

                  <div className="flex flex-col gap-4 border-t border-navy-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[0.8125rem] text-ink-soft">
                      Fields marked <span className="text-signal">*</span> are required.
                    </p>
                    <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                      {submitting ? (
                        <>
                          <Loader2 aria-hidden="true" strokeWidth={2} className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit application
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
              )}
            </div>
          </div>

          {/* Aside */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-panel border border-navy-100 bg-white p-6 shadow-card">
              <p className="eyebrow text-royal">What happens next</p>
              <ol className="mt-5 space-y-4">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step} className="flex gap-3.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-50 font-mono text-[0.6875rem] tabular text-navy-700">
                      {i + 1}
                    </span>
                    <span className="text-[0.9375rem] leading-[1.6] text-ink-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-panel border border-navy-100 bg-white p-6 shadow-card">
              <p className="eyebrow flex items-center gap-2 text-royal">
                <FileText aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5" />
                Keep ready for counselling
              </p>
              <ul className="mt-5 space-y-2.5">
                {DOCUMENTS.map((doc) => (
                  <li key={doc} className="flex gap-2.5 text-[0.9375rem] leading-[1.55] text-ink-muted">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tech-600" />
                    {doc}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-navy-100 pt-4 text-[0.8125rem] leading-[1.6] text-ink-soft">
                Electrician requires 10th pass with Science, as published by the institute. Confirm eligibility for
                other trades with the admission team.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-panel bg-navy-800 p-6 text-white shadow-lift">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />
              <div className="relative">
                <p className="eyebrow text-tech">Prefer to talk?</p>
                <p className="mt-3 text-[0.9375rem] leading-[1.6] text-navy-100/80">Call the admission enquiry line.</p>
                <a
                  href={telHref(contact.enquiry.phone)}
                  className="mt-4 inline-flex items-center gap-2.5 font-mono text-lg tabular text-white transition-colors hover:text-tech"
                >
                  <Phone aria-hidden="true" strokeWidth={2} className="h-4 w-4 text-tech" />
                  {contact.enquiry.phone}
                </a>
                <a
                  href={`mailto:${contact.enquiry.email}`}
                  className="mt-2 block break-all text-[0.875rem] text-navy-100/70 underline decoration-tech/40 transition-colors hover:text-tech"
                >
                  {contact.enquiry.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default AdmissionPage;

import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { inHindi } from '../utils/messagesHi';

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
  qualification: '',
  percentage: '',
  trade: '',
  campus: '',
  address: '',
  district: '',
  message: '',
};

/**
 * `?trade=…&campus=…` (from a campus page's "Apply" card) pre-selects the
 * trade and campus. Unknown values are ignored, and a campus that does not
 * run the chosen trade is left for the applicant to pick.
 */
function prefilled(params) {
  const wanted = params.get('trade');
  const trade = TRADE_OPTIONS.some((t) => t.value === wanted) ? wanted : '';
  const inst = itiInstitutes.find((i) => i.id === params.get('campus'));
  const campus = inst && (!trade || inst.trades.some((t) => t.id === trade)) ? inst.id : '';
  return { ...INITIAL, trade, campus };
}

const DOCUMENTS = [
  '10वीं की अंकसूची (और 12वीं की भी, यदि उत्तीर्ण हैं)',
  'आधार कार्ड',
  'स्थानांतरण प्रमाणपत्र (TC) / स्कूल छोड़ने का प्रमाणपत्र',
  'जाति और मूल निवास प्रमाणपत्र (जहाँ लागू हो)',
  'हाल ही में खिंचवाई गई पासपोर्ट साइज़ फ़ोटो',
];

const NEXT_STEPS = [
  'प्रवेश टीम आपके दिए गए मोबाइल नंबर पर आपको कॉल करेगी।',
  'काउंसलिंग और दस्तावेज़ों के सत्यापन के लिए कैंपस आएँ।',
  'NCVT / DTE मध्य प्रदेश के नियमों के अनुसार सीट की पुष्टि।',
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

  const [params] = useSearchParams();
  const [initial] = useState(() => prefilled(params));
  const form = useForm(initial, submitAdmission);
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
        lede="नीचे अपनी बुनियादी जानकारी भरें। इसमें लगभग दो मिनट लगते हैं — फिर हमारी प्रवेश टीम आपको कॉल करके काउंसलिंग और दस्तावेज़ों के बारे में मार्गदर्शन देगी।"
      />

      <section className="relative bg-canvas-soft">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-light opacity-60" />

        <div className="shell relative grid gap-8 py-14 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Form */}
          <div className="lg:col-span-8">
            <div className="rounded-panel border border-navy-100 bg-white p-5 shadow-card sm:p-7 lg:p-8">
              {status === 'success' ? (
                <div role="status" aria-live="polite" className="py-6 text-center sm:py-10">
                  <CheckCircle2 aria-hidden="true" strokeWidth={1.5} className="mx-auto h-14 w-14 text-tech-600" />
                  <h2 className="mt-6 font-display text-display-sm font-bold text-navy-800">Application received.</h2>
                  <p className="mx-auto mt-4 max-w-md text-[1rem] leading-[1.7] text-ink-muted">{inHindi(message)}</p>
                  {result?.data?.referenceNo && (
                    <p className="mx-auto mt-8 inline-flex flex-col items-center gap-1 rounded-edge border border-navy-100 bg-canvas-soft px-6 py-4">
                      <span className="eyebrow text-ink-soft">Reference number</span>
                      <span className="font-mono text-xl font-semibold tabular text-navy-800">
                        {result.data.referenceNo}
                      </span>
                    </p>
                  )}
                  <p className="mt-6 text-[0.875rem] text-ink-soft">आगे की किसी भी जानकारी के लिए यह नंबर संभालकर रखें।</p>
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
                <form onSubmit={onSubmit} className="space-y-6">
                  <FormSection index={1} title="Personal details">
                    <TextField label="Full name" required autoComplete="name" maxLength={100} placeholder="जैसा 10वीं की अंकसूची में लिखा है" {...field('fullName')} />
                    <TextField label="Father's name" required maxLength={100} {...field('fatherName')} />
                    <TextField label="Date of birth" type="date" required max={maxDob()} {...field('dateOfBirth')} />
                    <RadioGroupField label="Gender" required options={GENDER_OPTIONS} {...field('gender')} />
                    <TextField
                      label="Mobile number"
                      type="tel"
                      inputMode="numeric"
                      required
                      autoComplete="tel-national"
                      placeholder="10 अंकों का मोबाइल नंबर"
                      {...field('phone')}
                    />
                    <TextField label="District" required maxLength={60} placeholder="जैसे: बालाघाट" {...field('district')} />
                    <TextField
                      label="Address"
                      required
                      maxLength={300}
                      autoComplete="street-address"
                      placeholder="मकान / वार्ड, गाँव या शहर"
                      className="sm:col-span-2"
                      {...field('address')}
                    />
                  </FormSection>

                  <FormSection index={2} title="Education">
                    <SelectField label="Highest qualification" required options={QUALIFICATION_OPTIONS} {...field('qualification')} />
                    <TextField
                      label="Percentage"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      max={100}
                      step="0.01"
                      placeholder="जैसे: 68.5"
                      {...field('percentage')}
                    />
                    <SelectField label="Trade" required options={TRADE_OPTIONS} {...tradeField} onChange={onTradeChange} />
                    <SelectField
                      label="Select ITI"
                      required
                      options={campusOptions}
                      {...field('campus')}
                    />
                    <TextAreaField
                      label="Anything else?"
                      rows={2}
                      maxLength={1000}
                      placeholder="फीस, हॉस्टल, समय आदि से जुड़े सवाल…"
                      className="sm:col-span-2"
                      {...field('message')}
                    />
                  </FormSection>

                  {status === 'error' && message && (
                    <p role="alert" className="rounded-edge border border-signal-300 bg-signal-50 px-4 py-3 text-[0.875rem] text-signal-700">
                      {inHindi(message)}
                    </p>
                  )}

                  <div className="flex flex-col gap-4 border-t border-navy-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[0.8125rem] text-ink-soft">
                      <span className="text-signal">*</span> चिह्नित फ़ील्ड भरना ज़रूरी है।
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
                संस्थान के अनुसार Electrician ट्रेड के लिए विज्ञान विषय के साथ 10वीं पास होना ज़रूरी है। अन्य ट्रेडों की
                पात्रता की पुष्टि प्रवेश टीम से कर लें।
              </p>
            </div>

            <div className="relative overflow-hidden rounded-panel bg-navy-800 p-6 text-white shadow-lift">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />
              <div className="relative">
                <p className="eyebrow text-tech">Prefer to talk?</p>
                <p className="mt-3 text-[0.9375rem] leading-[1.6] text-navy-100/80">प्रवेश पूछताछ लाइन पर कॉल करें।</p>
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

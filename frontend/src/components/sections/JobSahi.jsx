import {
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Languages,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from 'lucide-react';
import jobsahiLogo from '../../assets/images/brand/jobsahi-logo.webp';
import jobsahiMark from '../../assets/images/brand/jobsahi-mark.svg';
import useReveal from '../../hooks/useReveal';
import { cn } from '../../utils/cn';

/**
 * JobSahi showcase — Satpuda Group's placement platform, presented in its own
 * identity rather than the ITI palette. Colours, the logo and the favicon mark
 * come from jobsahi.com; every feature line below is taken from the live site
 * (institute/recruiter registration, the candidate "how it works" steps and the
 * recruiter policy). The two audiences share one split frame.
 *
 * As across the site, headings, labels and buttons are in English and every
 * paragraph is in Hindi (rendered with lang="hi").
 *
 * The dashboard and phone are illustrative previews, so they carry labels from
 * the real product but no figures.
 */

const SITE = 'https://www.jobsahi.com';

const LINKS = {
  institute: `${SITE}/institute-register`,
  recruiter: `${SITE}/recruiter-register`,
  candidate: `${SITE}/create-account`,
  app: 'https://play.google.com/store/apps/details?id=com.jobsahi.app',
};

const PILLARS = [
  { icon: BadgeCheck, label: 'Verified jobs' },
  { icon: Sparkles, label: 'AI-powered matching' },
  { icon: Languages, label: 'English & हिंदी' },
];

const PARTNER_FEATURES = [
  {
    icon: CalendarDays,
    title: 'Mega campus drives',
    text: 'एक ही इंस्टीट्यूट डैशबोर्ड से विद्यार्थियों के आवेदन ट्रैक करें और कैंपस ड्राइव आयोजित करें।',
  },
  {
    icon: ClipboardList,
    title: 'Placement visibility',
    text: 'प्लेसमेंट के आँकड़े, विद्यार्थियों की प्रगति और नियोक्ताओं के अनुरोध — जैसे ही आएँ, तुरंत देखें।',
  },
  {
    icon: ShieldCheck,
    title: 'A verified network',
    text: 'रिक्रूटर वास्तविक संगठनों का प्रतिनिधित्व करते हैं — फ़र्ज़ी या भ्रामक जॉब पोस्ट की अनुमति नहीं है।',
  },
];

const CANDIDATE_STEPS = [
  { title: 'Create profile', text: 'साइन अप करें और कुछ ही मिनटों में अपनी प्रोफ़ाइल बनाएँ।' },
  { title: 'Match skills', text: 'आपके कौशल को सबसे उपयुक्त अवसरों से मिलाया जाता है।' },
  { title: 'Join campus drive', text: 'ड्राइव के लिए रजिस्टर करें और सत्यापित नौकरियों पर आवेदन करें।' },
  { title: 'Get hired', text: 'इंटरव्यू पास करें और अपनी करियर यात्रा शुरू करें।' },
];

function ExternalCta({ href, children, variant, className }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group/cta inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variant === 'green' &&
          'bg-jobsahi-green text-white shadow-[0_10px_30px_-10px_rgba(92,154,36,0.9)] hover:bg-jobsahi-green-light focus-visible:ring-jobsahi-lime focus-visible:ring-offset-jobsahi-navy',
        variant === 'ghost-light' &&
          'border border-white/30 text-white hover:border-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-jobsahi-navy',
        variant === 'blue' &&
          'bg-jobsahi-blue text-white shadow-[0_10px_30px_-10px_rgba(11,83,125,0.8)] hover:bg-jobsahi-navy focus-visible:ring-jobsahi-blue focus-visible:ring-offset-jobsahi-leaf',
        variant === 'ghost-dark' &&
          'border border-jobsahi-blue/30 text-jobsahi-blue hover:border-jobsahi-blue hover:bg-white focus-visible:ring-jobsahi-blue focus-visible:ring-offset-jobsahi-leaf',
        className
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
      />
      <span className="sr-only">(opens jobsahi.com in a new tab)</span>
    </a>
  );
}

function Eyebrow({ icon: Icon, children, tone }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]',
        tone === 'dark' ? 'bg-white/10 text-jobsahi-lime ring-1 ring-white/15' : 'bg-white text-jobsahi-green-dark ring-1 ring-jobsahi-sprout'
      )}
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}

/** Illustrative institute dashboard — real section labels, no figures. */
function DashboardPreview() {
  const tiles = [
    { label: 'Student applications', bars: [40, 58, 46, 70, 64, 86] },
    { label: 'Campus drives', bars: [30, 44, 62, 50, 74, 68] },
    { label: 'Employer requests', bars: [52, 40, 66, 58, 80, 92] },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[560px]">
      <div className="jobsahi-float absolute -right-2 -top-6 z-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_18px_40px_-16px_rgba(0,40,64,0.6)] sm:-right-6">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-jobsahi-sprout text-jobsahi-green-dark">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <span className="text-[0.6875rem] font-semibold leading-tight text-jobsahi-ink">
          Verified recruiter
          <span className="block font-medium text-ink-soft">joined your drive</span>
        </span>
      </div>

      <div className="overflow-hidden rounded-t-2xl border border-b-0 border-white/15 bg-white shadow-[0_40px_80px_-30px_rgba(0,20,35,0.9)] transition-transform duration-700 ease-out group-hover/panel:-translate-y-2">
        <div className="flex items-center gap-1.5 border-b border-slate-100 bg-jobsahi-mist px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="ml-3 truncate rounded-md bg-white px-2.5 py-0.5 text-[0.625rem] text-ink-soft ring-1 ring-slate-200">
            jobsahi.com/institute
          </span>
        </div>

        <div className="flex">
          <div className="hidden w-14 shrink-0 flex-col items-center gap-3 border-r border-slate-100 py-4 xs:flex">
            <img src={jobsahiMark} alt="" className="h-7 w-7" />
            {[Building2, Users, CalendarDays, ClipboardList].map((Icon, i) => (
              <span
                key={i}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg',
                  i === 2 ? 'bg-jobsahi-blue text-white' : 'text-slate-400'
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.8125rem] font-bold text-jobsahi-ink">⚡ Institute Dashboard</p>
              <span className="hidden rounded-full bg-jobsahi-leaf px-2 py-0.5 text-[0.625rem] font-semibold text-jobsahi-green-dark sm:inline">
                Campus Management
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {tiles.map((t, i) => (
                <div key={t.label} className="rounded-xl bg-jobsahi-mist p-2.5 ring-1 ring-slate-100 sm:p-3">
                  <p className="line-clamp-2 text-[0.5625rem] font-medium leading-tight text-ink-soft sm:text-[0.625rem]">
                    {t.label}
                  </p>
                  <div className="mt-3 flex h-10 items-end gap-[3px]">
                    {t.bars.map((h, j) => (
                      <span
                        key={j}
                        className={cn(
                          'jobsahi-bar flex-1 rounded-sm',
                          j === t.bars.length - 1
                            ? i === 2
                              ? 'bg-jobsahi-green'
                              : 'bg-jobsahi-blue'
                            : 'bg-jobsahi-blue/20'
                        )}
                        style={{ height: `${h}%`, '--bar-delay': `${j * 70 + i * 120}ms` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-jobsahi-blue/30 p-3">
              <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-jobsahi-blue/10 text-jobsahi-blue sm:flex">
                <CalendarDays className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.75rem] font-semibold text-jobsahi-ink">Campus Drive Details</p>
                <p className="truncate text-[0.625rem] text-ink-soft">Electrician · Fitter · COPA</p>
              </div>
              <span className="shrink-0 rounded-full bg-jobsahi-green px-3 py-1 text-[0.625rem] font-semibold text-white">
                Launch Campaign
              </span>
            </div>

            <div className="mt-3 hidden rounded-xl ring-1 ring-slate-100 lg:block">
              {['Employer request · Campus hiring', 'Employer request · Apprentices'].map((row, i) => (
                <div
                  key={row}
                  className={cn('flex items-center gap-3 px-3 py-2.5', i > 0 && 'border-t border-slate-100')}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-jobsahi-leaf text-jobsahi-green-dark">
                    <Building2 className="h-3.5 w-3.5" />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-[0.6875rem] font-medium text-jobsahi-ink">{row}</p>
                  <BadgeCheck className="h-4 w-4 shrink-0 text-jobsahi-green" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Illustrative candidate app — real labels and the official logo. */
function PhonePreview() {
  const jobs = [
    { role: 'Electrician', meta: 'Full-time · Madhya Pradesh', tag: 'Matching' },
    { role: 'Fitter Apprentice', meta: 'Apprenticeship · On-site', tag: 'Verified' },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto w-[260px] sm:w-[280px]">
      <div className="jobsahi-float absolute -right-6 top-10 z-10 hidden items-center gap-2 rounded-2xl bg-jobsahi-navy px-3 py-2 text-white shadow-[0_18px_40px_-16px_rgba(0,40,64,0.7)] xs:flex sm:-right-16 [animation-delay:-2s]">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-jobsahi-lime text-jobsahi-navy">
          <BadgeCheck className="h-4 w-4" />
        </span>
        <span className="text-[0.6875rem] font-semibold leading-tight">
          Registered for
          <span className="block font-medium text-white/70">mega campus drive</span>
        </span>
      </div>

      <div className="rounded-t-[2.4rem] border-[7px] border-b-0 border-jobsahi-ink bg-jobsahi-ink p-0 shadow-[0_40px_80px_-30px_rgba(0,57,91,0.65)] transition-transform duration-700 ease-out group-hover/panel:-translate-y-2">
        <div className="overflow-hidden rounded-t-[1.9rem] bg-jobsahi-mist">
          <div className="mx-auto mt-2 h-4 w-20 rounded-full bg-jobsahi-ink" />
          <div className="px-4 pb-6 pt-3">
            <div className="flex items-center justify-between">
              <img src={jobsahiLogo} alt="" className="h-5 w-auto" />
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-jobsahi-blue ring-1 ring-slate-200">
                <UserRound className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-[0.6875rem] text-ink-soft ring-1 ring-slate-200">
              <Search className="h-3.5 w-3.5 text-jobsahi-blue" />
              Explore verified jobs
            </div>

            <div className="mt-3 flex gap-1.5 text-[0.625rem] font-semibold">
              <span className="rounded-full bg-jobsahi-blue px-3 py-1 text-white">Find Jobs</span>
              <span className="rounded-full bg-white px-3 py-1 text-jobsahi-blue ring-1 ring-slate-200">Campus Drives</span>
            </div>

            <div className="mt-3 space-y-2">
              {jobs.map((j) => (
                <div key={j.role} className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-jobsahi-leaf text-jobsahi-green-dark">
                      <Briefcase className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.75rem] font-bold text-jobsahi-ink">{j.role}</p>
                      <p className="truncate text-[0.5625rem] text-ink-soft">{j.meta}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-jobsahi-sprout px-2 py-0.5 text-[0.5625rem] font-semibold text-jobsahi-green-dark">
                      {j.tag}
                    </span>
                  </div>
                </div>
              ))}

              <div className="rounded-xl bg-gradient-to-br from-jobsahi-blue to-jobsahi-navy p-3 text-white">
                <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-jobsahi-lime">
                  Join Campus Drive
                </p>
                <p className="mt-1 text-[0.75rem] font-bold">Participate in mega drives</p>
                <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-[0.5625rem] font-semibold text-jobsahi-blue">
                  Register now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function JobSahi() {
  const ref = useReveal({ threshold: 0.08 });

  return (
    <section
      id="jobsahi"
      ref={ref}
      aria-labelledby="jobsahi-title"
      className="relative overflow-hidden bg-jobsahi-mist pb-14 pt-16 font-sans text-jobsahi-ink sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_10%_0%,rgba(11,83,125,0.12),transparent_70%),radial-gradient(40%_40%_at_95%_100%,rgba(92,154,36,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,83,125,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,#000,transparent_45%)]"
      />

      <div className="shell relative">
        {/* Header — JobSahi identity first, Satpuda Group as a quiet credit. */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <div className="reveal">
            <p className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              <span className="h-px w-8 bg-jobsahi-green" aria-hidden="true" />
              A Product of Satpuda Group
            </p>
            <img
              src={jobsahiLogo}
              alt="JobSahi"
              width="640"
              height="145"
              className="mt-6 h-11 w-auto sm:h-14"
            />
            <h2
              id="jobsahi-title"
              className="mt-7 max-w-[17ch] font-sans text-[clamp(2rem,1.3rem+3vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em]"
            >
              India&rsquo;s smartest bridge between{' '}
              <span className="text-jobsahi-green">technical talent</span> and{' '}
              <span className="text-jobsahi-blue">industry.</span>
            </h2>
          </div>

          <div className="reveal" style={{ '--reveal-delay': '140ms' }}>
            <p lang="hi" className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              सत्यापित नौकरियाँ, कैंपस ड्राइव और करियर के अवसर — सब एक भरोसेमंद प्लेटफ़ॉर्म पर।
              JobSahi युवाओं को सशक्त बनाता है, संस्थानों को मज़बूत करता है और भारत के आने वाले
              कल के कार्यबल के लिए बनाया गया है।
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {PILLARS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[0.8125rem] font-semibold text-jobsahi-blue shadow-[0_6px_20px_-12px_rgba(11,83,125,0.5)] ring-1 ring-slate-200"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-jobsahi-green" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Split stage — one frame, two audiences. */}
        <div className="relative mt-12 lg:mt-14">
          <div className="grid overflow-hidden rounded-[2rem] shadow-[0_50px_100px_-50px_rgba(0,40,64,0.55)] ring-1 ring-jobsahi-ink/10 lg:grid-cols-2">
            {/* LEFT — TPOs, institutions & employers */}
            <article
              aria-labelledby="jobsahi-partners-title"
              className="jobsahi-panel-l reveal group/panel relative isolate flex flex-col overflow-hidden bg-jobsahi-navy text-white"
              style={{ '--reveal-delay': '220ms' }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_0%_0%,#0C5A8D_0%,transparent_60%),linear-gradient(160deg,#0B537D_0%,#00395B_55%,#002840_100%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(70%_60%_at_30%_20%,#000,transparent)]"
              />

              <div className="px-6 pt-10 sm:px-10 sm:pt-12 xl:px-14 xl:pt-14">
                <Eyebrow icon={Building2} tone="dark">
                  For TPOs, Institutions &amp; Employers
                </Eyebrow>
                <h3
                  id="jobsahi-partners-title"
                  className="mt-5 max-w-[18ch] font-sans text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em]"
                >
                  Bring the right recruiters to your campus.
                </h3>
                <p lang="hi" className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-white/75">
                  संस्थान कैंपस प्लेसमेंट को आसान बनाते हैं और विद्यार्थियों को शीर्ष नियोक्ताओं से
                  जोड़ते हैं। रिक्रूटर कंपनियों और संस्थानों के सत्यापित नेटवर्क से जुड़कर नौकरी के
                  लिए तैयार तकनीकी प्रतिभा खोजते हैं।
                </p>

                <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-1 lg:gap-4 xl:grid-cols-3 xl:gap-5">
                  {PARTNER_FEATURES.map(({ icon: Icon, title, text }) => (
                    <li key={title} className="flex gap-3 border-t border-white/15 pt-4 sm:block lg:flex xl:block">
                      <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-jobsahi-lime" />
                      <div>
                        <p className="text-sm font-semibold text-white sm:mt-3 lg:mt-0 xl:mt-3">{title}</p>
                        <p lang="hi" className="mt-1 text-[0.8125rem] leading-relaxed text-white/70">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ExternalCta href={LINKS.institute} variant="green">
                    Register your institute
                  </ExternalCta>
                  <ExternalCta href={LINKS.recruiter} variant="ghost-light">
                    Hire on JobSahi
                  </ExternalCta>
                </div>
              </div>

              <div className="mt-auto px-6 pt-12 sm:px-10 xl:px-14">
                <DashboardPreview />
              </div>
            </article>

            {/* RIGHT — students & job seekers */}
            <article
              aria-labelledby="jobsahi-candidates-title"
              className="jobsahi-panel-r reveal group/panel relative isolate flex flex-col overflow-hidden bg-jobsahi-leaf"
              style={{ '--reveal-delay': '320ms' }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_100%_0%,rgba(140,214,62,0.28),transparent_65%),radial-gradient(60%_50%_at_50%_100%,rgba(11,83,125,0.1),transparent_70%)]"
              />

              <div className="px-6 pt-10 sm:px-10 sm:pt-12 lg:pl-16 xl:pl-20 xl:pr-14 xl:pt-14">
                <Eyebrow icon={GraduationCap}>For Students &amp; Job Seekers</Eyebrow>
                <h3
                  id="jobsahi-candidates-title"
                  className="mt-5 max-w-[18ch] font-sans text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-jobsahi-ink"
                >
                  Find verified jobs. Join campus drives.{' '}
                  <span className="text-jobsahi-green">Get hired.</span>
                </h3>
                <p lang="hi" className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink-muted">
                  हज़ारों सत्यापित नौकरियाँ खोजें, मेगा कैंपस ड्राइव में हिस्सा लें और प्रोफ़ाइल से
                  पहले ऑफ़र तक का सफ़र तय करें — अंग्रेज़ी या हिंदी में।
                </p>

                <ol className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  {CANDIDATE_STEPS.map((s, i) => (
                    <li key={s.title} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-mono text-xs font-semibold text-jobsahi-blue ring-1 ring-jobsahi-sprout transition-colors duration-300 group-hover/panel:bg-jobsahi-green group-hover/panel:text-white group-hover/panel:ring-jobsahi-green">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-jobsahi-ink">{s.title}</p>
                        <p lang="hi" className="mt-0.5 text-[0.8125rem] leading-relaxed text-ink-muted">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ExternalCta href={LINKS.candidate} variant="blue">
                    Create your free profile
                  </ExternalCta>
                  <ExternalCta href={LINKS.app} variant="ghost-dark">
                    Get the Android app
                  </ExternalCta>
                </div>
              </div>

              <div className="mt-auto pt-12">
                <PhonePreview />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobSahi;

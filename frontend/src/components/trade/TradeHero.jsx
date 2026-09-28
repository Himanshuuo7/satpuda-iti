import { ArrowDownRight, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import Button from '../ui/Button';
import { themeFor } from './theme';
import { tradeVisuals } from './TradeVisuals';
import cn from '../../utils/cn';

/**
 * Trade hero — the headline, the four facts a student asks first (duration,
 * level, entry, certificate) and the trade's own working instrument.
 *
 * Electrician and Mechanic Diesel sit on the navy surface, Fitter on the
 * drawing-office canvas and COPA on white, so the four pages are told apart
 * at a glance while sharing one layout and one type system.
 */

export const CHAPTERS = [
  { id: 'overview', label: 'Overview' },
  { id: 'course', label: 'Course' },
  { id: 'learn', label: 'Learn' },
  { id: 'practice', label: 'Practice' },
  { id: 'careers', label: 'Careers' },
  { id: 'path', label: 'Path' },
  { id: 'faq', label: 'FAQ' },
];

const SURFACE = {
  electric: 'bg-navy-900',
  engine: 'bg-navy-800',
  blueprint: 'bg-canvas-soft',
  digital: 'bg-white',
};

function Backdrop({ theme }) {
  if (theme === 'electric') {
    return (
      <>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_78%_45%,rgba(224,27,36,0.16),transparent_70%)]"
        />
      </>
    );
  }
  if (theme === 'engine') {
    return (
      <>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_75%_40%,rgba(27,70,128,0.55),transparent_70%)]"
        />
      </>
    );
  }
  if (theme === 'blueprint') {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 blueprint-light [mask-image:radial-gradient(85%_75%_at_65%_40%,#000_35%,transparent_85%)]"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,166,184,0.2)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_70%_at_70%_40%,#000_30%,transparent_80%)]"
    />
  );
}

export function TradeHero({ trade }) {
  const { dark, accent } = themeFor(trade);
  const { Visual, caption } = tradeVisuals[trade.theme];

  const specs = [
    { label: 'Duration', value: trade.facts.duration },
    { label: 'NSQF level', value: String(trade.facts.nsqf) },
    { label: 'Entry', value: trade.facts.entryShort },
    { label: 'Certificate', value: 'NTC · DGT' },
  ];

  return (
    <section
      aria-labelledby="trade-title"
      className={cn('relative overflow-hidden pt-[var(--header-h)]', SURFACE[trade.theme])}
    >
      <Backdrop theme={trade.theme} />

      <div className="shell relative">
        <div className="grid items-center gap-12 pb-10 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-14 lg:pt-16">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="trade-rise">
              <ol
                className={cn(
                  'flex flex-wrap items-center gap-1.5 text-[0.8125rem]',
                  dark ? 'text-navy-200/70' : 'text-ink-soft'
                )}
              >
                <li>
                  <Link to="/" className={cn('rounded-sharp transition-colors', dark ? 'hover:text-white' : 'hover:text-navy-800')}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                </li>
                <li>Trades</li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                </li>
                <li aria-current="page" className={dark ? 'text-white' : 'text-navy-800'}>
                  {trade.name}
                </li>
              </ol>
            </nav>

            <div className="trade-rise mt-8 flex items-center gap-3" style={{ '--d': '80ms' }}>
              <span aria-hidden="true" className={cn('h-px w-10', accent.bg)} />
              <p className={cn('eyebrow', dark ? 'text-tech' : accent.text)}>
                {trade.kind} · CTS · NCVT
              </p>
            </div>

            <h1
              id="trade-title"
              className={cn(
                'mt-6 font-display text-display-xl font-bold',
                dark ? 'text-white' : 'text-navy-800'
              )}
            >
              <span className="trade-line">
                <span style={{ '--d': '120ms' }}>
                  {trade.name}
                  <span className={dark ? accent.onDark : accent.text}>.</span>
                </span>
              </span>
            </h1>

            {trade.fullName && (
              <p
                className={cn(
                  'trade-rise mt-3 font-display text-[1.25rem] font-medium tracking-tight sm:text-[1.5rem]',
                  dark ? 'text-navy-100' : 'text-navy-700'
                )}
                style={{ '--d': '220ms' }}
              >
                {trade.fullName}
              </p>
            )}

            <p
              className={cn(
                'trade-rise mt-6 max-w-[38rem] text-[1.0625rem] leading-[1.75] sm:text-lg',
                dark ? 'text-navy-100/80' : 'text-ink-muted'
              )}
              style={{ '--d': '260ms' }}
            >
              {trade.hero.lede}
            </p>

            <div className="trade-rise mt-9 flex flex-col gap-3 xs:flex-row xs:items-center" style={{ '--d': '340ms' }}>
              <Button to="/admission" variant="primary" size="lg" className="w-full xs:w-auto">
                Apply for admission
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Button>
              <Button
                href="#learn"
                variant={dark ? 'ghostLight' : 'outlineStrong'}
                size="lg"
                className="w-full xs:w-auto"
              >
                What you will learn
                <ArrowDownRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </Button>
            </div>

            <dl
              className={cn(
                'trade-rise mt-12 grid grid-cols-2 gap-px border-y sm:grid-cols-4',
                dark ? 'border-white/12 bg-white/10' : 'border-navy-100 bg-navy-100'
              )}
              style={{ '--d': '420ms' }}
            >
              {specs.map((s) => (
                <div key={s.label} className={cn('px-4 py-4', SURFACE[trade.theme])}>
                  <dt
                    className={cn(
                      'font-mono text-[0.625rem] uppercase tracking-[0.16em]',
                      dark ? 'text-navy-200/70' : 'text-ink-soft'
                    )}
                  >
                    {s.label}
                  </dt>
                  <dd
                    className={cn(
                      'mt-2 font-display text-[1.125rem] font-semibold leading-tight tabular',
                      dark ? 'text-white' : 'text-navy-800'
                    )}
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="trade-rise m-0 lg:col-span-5" style={{ '--d': '200ms' }}>
            <div
              className={cn(
                'relative mx-auto w-full max-w-[28rem] lg:max-w-none',
                trade.theme === 'digital' ? 'py-8' : trade.theme === 'engine' ? 'aspect-[400/360]' : 'aspect-[480/420]'
              )}
            >
              <Visual />
            </div>
            <figcaption
              className={cn(
                'mx-auto mt-4 max-w-[28rem] font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.12em] lg:max-w-none',
                dark ? 'text-navy-200/60' : 'text-ink-soft'
              )}
            >
              {caption}
            </figcaption>
          </figure>
        </div>

        {/* On this page */}
        <nav
          aria-label="On this page"
          className="relative -mx-[var(--shell-pad)] overflow-x-auto px-[var(--shell-pad)] mask-fade-r lg:[-webkit-mask-image:none] lg:[mask-image:none]"
        >
          <ol className={cn('flex h-[4.5rem] min-w-max items-center gap-6 border-t sm:gap-8', dark ? 'border-white/10' : 'border-navy-100')}>
            {CHAPTERS.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className={cn(
                    'group flex items-baseline gap-2 rounded-sharp py-2 text-[0.875rem] font-medium transition-colors duration-200',
                    dark ? 'text-navy-100 hover:text-white' : 'text-navy-700 hover:text-navy-900'
                  )}
                >
                  <span className="relative">
                    {c.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100',
                        dark ? 'bg-tech' : accent.bg
                      )}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

export default TradeHero;

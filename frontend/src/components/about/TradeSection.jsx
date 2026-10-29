import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { tradeDetails } from '../../data/trades';
import { itiInstitutes } from '../../data/itiInstitutes';
import { iconFor } from './icons';
import cn from '../../utils/cn';

/**
 * Training & trades — an industrial dashboard.
 *
 * Four trade panels carry the published duration and, where an official page
 * states it, eligibility. Each panel's campus coverage is computed from the
 * institute records and names the campuses, so nobody has to assume every
 * campus runs every trade.
 */

const TOTAL = itiInstitutes.length;

function TradePanel({ trade, index }) {
  const Icon = iconFor(trade.icon);
  const count = trade.campuses.length;

  return (
    <article
      className="reveal group relative flex flex-col overflow-hidden rounded-panel border border-navy-100 bg-white transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift"
      style={{ '--reveal-delay': `${index * 80}ms` }}
    >
      <div className="flex items-center justify-between border-b border-navy-100 bg-canvas-soft px-5 py-3">
        <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.18em] text-royal">{trade.code}</span>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">{trade.scheme}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-edge bg-navy-800 text-tech transition-transform duration-500 ease-out group-hover:rotate-[-8deg]">
            <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-navy-800">{trade.name}</h3>
            {trade.fullName && <p className="mt-0.5 text-[0.8125rem] text-ink-muted">{trade.fullName}</p>}
          </div>
        </div>

        <p className="mt-4 text-[0.875rem] leading-[1.65] text-ink-muted">{trade.summary}</p>

        <dl className="mt-5 divide-y divide-navy-50 border-y border-navy-50 text-[0.8438rem]">
          <div className="flex justify-between gap-3 py-2.5">
            <dt className="text-ink-soft">Duration</dt>
            <dd className="font-mono font-medium tabular text-navy-800">{trade.duration}</dd>
          </div>
          <div className="flex justify-between gap-3 py-2.5">
            <dt className="shrink-0 text-ink-soft">Eligibility</dt>
            <dd className="text-right font-medium text-navy-800">
              {trade.eligibility ?? <span className="font-normal text-ink-soft">वर्तमान DGT प्रवेश सूचना देखें</span>}
            </dd>
          </div>
        </dl>

        {/* Coverage gauge */}
        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <span className="text-[0.8125rem] text-ink-muted">Campuses offering</span>
            <span className="font-display text-[1.25rem] font-semibold tabular text-navy-800">
              {count}
              <span className="text-[0.8125rem] font-normal text-ink-soft"> / {TOTAL}</span>
            </span>
          </div>
          <div className="mt-2 grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${TOTAL}, minmax(0, 1fr))` }} aria-hidden="true">
            {Array.from({ length: TOTAL }, (_, i) => (
              <span key={i} className={cn('h-2 rounded-[1px]', i < count ? 'bg-royal' : 'bg-navy-50')} />
            ))}
          </div>
          <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-soft">
            {trade.campuses.map((c) => c.shortName).join(' · ')}
          </p>
        </div>

        <Link
          to={trade.slug}
          className="mt-auto inline-flex min-h-[2.75rem] items-center gap-1.5 pt-5 text-[0.875rem] font-semibold text-navy-800 transition-colors hover:text-signal"
        >
          Trade page
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export function TradeSection() {
  const ref = useReveal({ threshold: 0.08 });

  return (
    <section
      id="trades"
      ref={ref}
      aria-labelledby="trades-title"
      className="relative scroll-mt-[var(--header-h)] bg-white py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <SectionHeading
          id="trades-title"
          eyebrow="Training & trades"
          title={
            <>
              Four NCVT trades. <span className="text-ink-muted">Not every trade at every campus.</span>
            </>
          }
          lede="सभी ट्रेड Craftsman Training Scheme (CTS) के अंतर्गत चलते हैं और NCVT, नई दिल्ली से संबद्ध हैं। हर ट्रेड के साथ लिखा है कि वह किन कैंपसों में उपलब्ध है।"
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {tradeDetails.map((t, i) => (
            <TradePanel key={t.id} trade={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TradeSection;

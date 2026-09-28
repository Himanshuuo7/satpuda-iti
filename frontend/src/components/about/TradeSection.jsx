import { ArrowUpRight, Check } from 'lucide-react';
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
 * states it, eligibility. Campus coverage is computed from the institute
 * records, then laid out in full as a campus × trade matrix so nobody has to
 * assume every campus runs every trade.
 */

const TOTAL = itiInstitutes.length;
const UNPUBLISHED = itiInstitutes.filter((i) => !i.trades.length).map((i) => i.shortName);

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
              {trade.eligibility ?? <span className="font-normal text-ink-soft">See current DGT admission notice</span>}
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
          lede="Trades run under the Craftsman Training Scheme (CTS), affiliated to NCVT, New Delhi. Durations are those published on each campus page; the matrix shows exactly which campus publishes which trade."
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {tradeDetails.map((t, i) => (
            <TradePanel key={t.id} trade={t} index={i} />
          ))}
        </div>

        {/* Campus × trade matrix */}
        <div className="reveal mt-12 rounded-panel border border-navy-100" style={{ '--reveal-delay': '120ms' }}>
          <div
            className="about-scroll-x relative overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="Campus and trade matrix (scrolls horizontally)"
          >
            <table className="w-full min-w-[40rem] border-collapse text-left text-[0.875rem]">
              <caption className="border-b border-navy-100 bg-canvas-soft px-5 py-3 text-left font-mono text-label uppercase text-ink-muted">
                Trades published per campus
              </caption>
              <thead>
                <tr className="border-b border-navy-100">
                  <th scope="col" className="sticky left-0 z-10 bg-white px-5 py-3 font-medium text-ink-soft">
                    Campus
                  </th>
                  {tradeDetails.map((t) => (
                    <th key={t.id} scope="col" className="px-4 py-3 text-center font-mono text-[0.6875rem] font-semibold tracking-[0.14em] text-royal">
                      <abbr title={t.name} className="no-underline">{t.code}</abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {itiInstitutes.map((inst) => (
                  <tr key={inst.id} className="group border-b border-navy-50 transition-colors last:border-0 hover:bg-canvas-soft">
                    <th scope="row" className="sticky left-0 z-10 bg-white px-5 py-2.5 font-medium text-navy-800 transition-colors group-hover:bg-canvas-soft">
                      <span className="block">{inst.shortName}</span>
                      <span className="block text-[0.75rem] font-normal text-ink-soft">{inst.district}</span>
                    </th>
                    {tradeDetails.map((t) => {
                      const has = inst.trades.some((x) => x.id === t.id);
                      return (
                        <td key={t.id} className="px-4 py-2.5 text-center">
                          {has ? (
                            <span className="inline-grid h-6 w-6 place-items-center rounded-sharp bg-royal text-white">
                              <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                              <span className="sr-only">Offered</span>
                            </span>
                          ) : (
                            <span className="text-navy-200">
                              <span aria-hidden="true">—</span>
                              <span className="sr-only">{inst.trades.length ? 'Not offered' : 'Not published'}</span>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-navy-100 px-5 py-3 text-[0.75rem] text-ink-soft">
            {UNPUBLISHED.join(', ')} — trade lists not published on the official site.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TradeSection;

import { useDeferredValue, useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import InstituteCard from './InstituteCard';
import InstituteFilter from './InstituteFilter';
import useReveal from '../../hooks/useReveal';
import useRegionParam from '../../hooks/useRegionParam';
import { itiInstitutes } from '../../data/itiInstitutes';

/**
 * Satpuda ITI network — every institute, as cards. Filters are search, trade
 * and district (the district lives in the URL and is shared with the regional
 * directory further down).
 */
export function InstituteNetwork({ onView }) {
  const ref = useReveal({ threshold: 0.05 });
  const [region, setRegion] = useRegionParam();
  const [trade, setTrade] = useState('all');
  const [query, setQuery] = useState('');
  const q = useDeferredValue(query.trim().toLowerCase());

  const results = useMemo(
    () =>
      itiInstitutes.filter(
        (i) =>
          (region === 'all' || i.district.toLowerCase() === region) &&
          (trade === 'all' || i.trades.some((t) => t.id === trade)) &&
          (!q || `${i.name} ${i.location} ${i.district}`.toLowerCase().includes(q))
      ),
    [region, trade, q]
  );

  const reset = () => {
    setRegion('all');
    setTrade('all');
    setQuery('');
  };

  return (
    <section
      id="network"
      ref={ref}
      aria-labelledby="network-title"
      className="relative scroll-mt-[var(--header-h)] bg-canvas-soft py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <SectionHeading
          id="network-title"
          eyebrow="Our ITI network"
          title={
            <>
              {itiInstitutes.length} institutes.{' '}
              <span className="text-royal">One standard of training.</span>
            </>
          }
          lede="Every Satpuda ITI with its address, phone and email. Search by name, or filter by trade and district to find the campus nearest you."
          className="max-w-3xl"
        />

        <div className="reveal mt-14" style={{ '--reveal-delay': '160ms' }}>
          <InstituteFilter
            query={query}
            onQuery={setQuery}
            trade={trade}
            onTrade={setTrade}
            region={region}
            onRegion={setRegion}
          />
        </div>

        <p aria-live="polite" className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">
          Showing <span className="tabular text-navy-800">{results.length}</span> of {itiInstitutes.length} institutes
        </p>

        {results.length ? (
          <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
            {results.map((inst, i) => (
              <li key={`${region}-${trade}-${inst.id}`}>
                <InstituteCard inst={inst} index={i} onView={onView} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 flex flex-col items-center rounded-panel border border-dashed border-navy-200 bg-white px-6 py-14 text-center">
            <SearchX aria-hidden="true" className="h-6 w-6 text-ink-soft" />
            <p className="mt-3 font-medium text-navy-800">No institute matches these filters.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 min-h-[2.75rem] rounded-edge border border-navy-200 px-4 text-[0.875rem] font-medium text-navy-800 hover:border-royal hover:text-royal"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default InstituteNetwork;

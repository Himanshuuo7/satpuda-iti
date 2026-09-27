import { ChevronDown, Search, X } from 'lucide-react';

import RegionalFilter from './RegionalFilter';
import { tradeDetails } from '../../data/trades';

/**
 * Network controls: free-text search, a trade select and the district switch.
 * The select is native so it is keyboard- and screen-reader-accessible
 * everywhere without custom listbox code.
 */
export function InstituteFilter({ query, onQuery, trade, onTrade, region, onRegion }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="inst-search" className="sr-only">
            Search institutes by name or town
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
          />
          <input
            id="inst-search"
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search by name or town"
            autoComplete="off"
            className="h-12 w-full rounded-edge border border-navy-100 bg-white pl-10 pr-10 text-[0.9375rem] text-navy-800 placeholder:text-ink-soft focus:border-royal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQuery('')}
              className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-edge text-ink-soft hover:text-signal"
            >
              <X aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>

        <div className="relative sm:w-60">
          <label htmlFor="inst-trade" className="sr-only">
            Filter by trade
          </label>
          <select
            id="inst-trade"
            value={trade}
            onChange={(e) => onTrade(e.target.value)}
            className="h-12 w-full cursor-pointer appearance-none rounded-edge border border-navy-100 bg-white pl-4 pr-10 text-[0.9375rem] text-navy-800 focus:border-royal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tech"
          >
            <option value="all">All trades</option>
            {tradeDetails.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
          />
        </div>
      </div>

      <RegionalFilter value={region} onChange={onRegion} />
    </div>
  );
}

export default InstituteFilter;

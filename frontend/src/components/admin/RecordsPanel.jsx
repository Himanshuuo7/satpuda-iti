import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Download, Inbox, Loader2, RefreshCw, Search } from 'lucide-react';

import cn from '../../utils/cn';
import { deleteRecord, exportRecords, listRecords, updateStatus } from '../../services/adminApi';
import DetailDrawer from './DetailDrawer';
import StatusBadge from './StatusBadge';
import { downloadCsv } from './csv';
import { CAMPUS_LABELS, STATUSES, STATUS_META, SUBJECT_LABELS, TRADE_LABELS, timeAgo, formatDateTime } from './labels';

/**
 * One dashboard tab: toolbar (search, status, filters, refresh, export), the
 * records table (cards on phones), pagination and the detail drawer.
 */

const PAGE_SIZE = 15;

function useDebounced(value, delay = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

/** Table cells per tab: [header, render(row), className]. */
const COLUMNS = {
  admissions: [
    [
      'Applicant',
      (r) => (
        <>
          <p className="font-medium text-navy-800">{r.fullName}</p>
          <p className="font-mono text-[0.75rem] tabular text-ink-soft">{r.referenceNo}</p>
        </>
      ),
    ],
    ['Mobile', (r) => <span className="font-mono tabular">{r.phone}</span>],
    ['Trade', (r) => TRADE_LABELS[r.trade] ?? r.trade],
    ['Campus', (r) => CAMPUS_LABELS[r.campus] ?? r.campus, 'hidden xl:table-cell'],
    ['District', (r) => r.district, 'hidden 2xl:table-cell'],
  ],
  contacts: [
    [
      'Name',
      (r) => (
        <>
          <p className="font-medium text-navy-800">{r.name}</p>
          {r.email && <p className="truncate text-[0.75rem] text-ink-soft">{r.email}</p>}
        </>
      ),
    ],
    ['Mobile', (r) => <span className="font-mono tabular">{r.phone}</span>],
    ['Subject', (r) => SUBJECT_LABELS[r.subject] ?? r.subject],
    ['Message', (r) => <p className="line-clamp-1 max-w-[22rem] text-ink-muted">{r.message}</p>, 'hidden xl:table-cell'],
  ],
};

const selectClass =
  'h-10 appearance-none rounded-edge border border-navy-100 bg-white pl-3 pr-9 text-[0.8125rem] text-navy-800 hover:border-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-tech/40';

export function RecordsPanel({ resource, onChanged, refreshKey }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [exporting, setExporting] = useState(false);

  const search = useDebounced(q);
  const params = { q: search, status, ...filters };
  const paramsKey = JSON.stringify(params);

  // Any filter change goes back to page 1.
  useEffect(() => setPage(1), [paramsKey]);

  // Only the latest request may update the table.
  const requestId = useRef(0);

  const load = useCallback(async () => {
    const id = ++requestId.current;
    setLoading(true);
    setError('');
    try {
      const res = await listRecords(resource.api, { ...JSON.parse(paramsKey), page, limit: PAGE_SIZE });
      if (id === requestId.current) setData(res);
    } catch (err) {
      if (id === requestId.current) setError(err.message);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [resource.api, paramsKey, page]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const onStatus = async (record, next) => {
    const res = await updateStatus(resource.api, record._id, next);
    setSelected(res.data);
    setData((d) => ({ ...d, items: d.items.map((i) => (i._id === record._id ? res.data : i)) }));
    onChanged();
  };

  const onDelete = async (record) => {
    await deleteRecord(resource.api, record._id);
    setSelected(null);
    await load();
    onChanged();
  };

  const onExport = async () => {
    setExporting(true);
    try {
      const res = await exportRecords(resource.api, params);
      const stamp = new Date().toISOString().slice(0, 10);
      downloadCsv(`satpuda-${resource.key}-${stamp}.csv`, res.items, resource.csv);
    } catch (err) {
      setError(err.message);
    } finally {
      setExporting(false);
    }
  };

  const columns = COLUMNS[resource.key];
  const filtered = Boolean(search || status || Object.values(filters).some(Boolean));
  const from = data.total ? (page - 1) * PAGE_SIZE + 1 : 0;
  const to = Math.min(page * PAGE_SIZE, data.total);

  return (
    <div className="rounded-panel border border-navy-100 bg-white shadow-card">
      {/* Toolbar */}
      <div className="space-y-3 border-b border-navy-100 p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search</span>
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" strokeWidth={2} />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={resource.searchPlaceholder}
              className="h-10 w-full rounded-edge border border-navy-100 bg-white pl-9 pr-3 text-[0.875rem] text-ink placeholder:text-ink-soft/70 hover:border-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-tech/40"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            {resource.filters.map((f) => (
              <div key={f.name} className="relative">
                <select
                  aria-label={f.label}
                  value={filters[f.name] ?? ''}
                  onChange={(e) => setFilters((prev) => ({ ...prev, [f.name]: e.target.value }))}
                  className={selectClass}
                >
                  <option value="">{f.label}</option>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" strokeWidth={2} />
              </div>
            ))}

            <button
              type="button"
              onClick={load}
              aria-label="Refresh"
              title="Refresh"
              className="flex h-10 w-10 items-center justify-center rounded-edge border border-navy-100 text-navy-700 hover:border-navy-300"
            >
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={onExport}
              disabled={exporting || !data.total}
              className="inline-flex h-10 items-center gap-2 rounded-edge border border-navy-100 px-3.5 text-[0.8125rem] font-medium text-navy-800 hover:border-navy-300 disabled:opacity-50"
            >
              {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" strokeWidth={2} />}
              Export CSV
            </button>
          </div>
        </div>

        {/* Status tabs */}
        <div role="tablist" aria-label="Filter by status" className="flex flex-wrap gap-1.5">
          {['', ...STATUSES].map((s) => (
            <button
              key={s || 'all'}
              type="button"
              role="tab"
              aria-selected={status === s}
              onClick={() => setStatus(s)}
              className={cn(
                'inline-flex min-h-[2.125rem] items-center gap-1.5 rounded-full px-3.5 text-[0.8125rem] font-medium transition-colors',
                status === s ? 'bg-navy-700 text-white' : 'bg-canvas-sunk text-ink-muted hover:text-navy-800'
              )}
            >
              {s && <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', STATUS_META[s].dot)} />}
              {s ? STATUS_META[s].label : 'All'}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p role="alert" className="m-4 rounded-edge border border-signal-300 bg-signal-50 px-4 py-3 text-[0.8125rem] text-signal-700">
          {error}
        </p>
      )}

      {/* Body */}
      {loading && !data.items.length ? (
        <div className="flex items-center justify-center gap-2 py-24 text-[0.875rem] text-ink-soft">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : !data.items.length ? (
        <div className="flex flex-col items-center py-24 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas-sunk text-ink-soft">
            <Inbox className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <p className="mt-4 font-medium text-navy-800">
            {filtered ? `No ${resource.label.toLowerCase()} match these filters.` : `No ${resource.label.toLowerCase()} yet.`}
          </p>
          <p className="mt-1 text-[0.875rem] text-ink-soft">
            {filtered ? 'Try clearing the search or filters.' : 'New submissions from the website will appear here.'}
          </p>
        </div>
      ) : (
        <div className={cn('transition-opacity', loading && 'opacity-60')}>
          {/* Desktop table */}
          <table className="hidden w-full text-left text-[0.875rem] md:table">
            <thead>
              <tr className="border-b border-navy-100 bg-canvas-soft text-[0.75rem] uppercase tracking-wide text-ink-soft">
                {columns.map(([h, , cls]) => (
                  <th key={h} scope="col" className={cn('px-5 py-3 font-medium', cls)}>
                    {h}
                  </th>
                ))}
                <th scope="col" className="px-5 py-3 font-medium">Status</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {data.items.map((r) => (
                <tr
                  key={r._id}
                  tabIndex={0}
                  onClick={() => setSelected(r)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelected(r))}
                  className={cn(
                    'cursor-pointer text-ink transition-colors hover:bg-navy-50/60 focus:bg-navy-50/60 focus:outline-none',
                    r.status === 'new' && 'bg-signal-50/30'
                  )}
                >
                  {columns.map(([h, render, cls]) => (
                    <td key={h} className={cn('px-5 py-3.5 align-middle', cls)}>
                      {render(r)}
                    </td>
                  ))}
                  <td className="px-5 py-3.5">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-right text-[0.8125rem] text-ink-soft" title={formatDateTime(r.createdAt)}>
                    {timeAgo(r.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phone cards */}
          <ul className="divide-y divide-navy-100 md:hidden">
            {data.items.map((r) => (
              <li key={r._id}>
                <button type="button" onClick={() => setSelected(r)} className="block w-full px-4 py-4 text-left hover:bg-navy-50/60">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-navy-800">{resource.title(r)}</p>
                      <p className="mt-0.5 font-mono text-[0.75rem] tabular text-ink-soft">{r.phone}</p>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="mt-2 text-[0.8125rem] text-ink-muted">
                    {resource.key === 'admissions'
                      ? `${TRADE_LABELS[r.trade] ?? r.trade} · ${CAMPUS_LABELS[r.campus] ?? r.campus}`
                      : SUBJECT_LABELS[r.subject]}
                    <span className="text-ink-soft"> · {timeAgo(r.createdAt)}</span>
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pagination */}
      {data.total > 0 && (
        <div className="flex items-center justify-between gap-3 border-t border-navy-100 px-4 py-3 sm:px-5">
          <p className="text-[0.8125rem] text-ink-soft">
            <span className="font-mono tabular text-navy-800">{from}–{to}</span> of{' '}
            <span className="font-mono tabular text-navy-800">{data.total}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage((p) => p - 1)}
              disabled={page <= 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-edge border border-navy-100 text-navy-700 hover:border-navy-300 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 font-mono text-[0.8125rem] tabular text-ink-muted">
              {page} / {data.pages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= data.pages}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-edge border border-navy-100 text-navy-700 hover:border-navy-300 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <DetailDrawer
        resource={resource}
        record={selected}
        onClose={() => setSelected(null)}
        onStatus={onStatus}
        onDelete={onDelete}
      />
    </div>
  );
}

export default RecordsPanel;

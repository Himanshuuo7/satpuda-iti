import { useCallback, useEffect, useState } from 'react';
import { CalendarDays, ClipboardList, ExternalLink, LogOut, MessageSquareText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import cn from '../../utils/cn';
import Logo from '../ui/Logo';
import { getStats } from '../../services/adminApi';
import RecordsPanel from './RecordsPanel';
import { RESOURCES } from './resources';
import { STATUSES, STATUS_META, SUBJECT_LABELS, TRADE_LABELS } from './labels';

/**
 * The signed-in dashboard: headline counts, a status / breakdown summary, and
 * one tab each for admission applications and contact enquiries.
 */

function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div className="rounded-panel border border-navy-100 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-[0.8125rem] font-medium text-ink-muted">{label}</p>
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-edge', accent)}>
          <Icon aria-hidden="true" strokeWidth={1.75} className="h-[1.125rem] w-[1.125rem]" />
        </span>
      </div>
      <p className="mt-3 font-display text-[2rem] font-bold leading-none tabular text-navy-800">{value ?? '–'}</p>
      {sub && <p className="mt-2 text-[0.8125rem] text-ink-soft">{sub}</p>}
    </div>
  );
}

function Breakdown({ title, rows, labels, total }) {
  return (
    <div>
      <p className="eyebrow text-royal">{title}</p>
      {rows.length ? (
        <ul className="mt-4 space-y-3">
          {rows.map((r) => {
            const pct = total ? Math.round((r.count / total) * 100) : 0;
            return (
              <li key={r.key}>
                <div className="flex items-baseline justify-between text-[0.8125rem]">
                  <span className="text-navy-800">{labels[r.key] ?? r.key}</span>
                  <span className="font-mono tabular text-ink-muted">
                    {r.count} <span className="text-ink-soft">· {pct}%</span>
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-canvas-sunk">
                  <div className="h-full rounded-full bg-navy-500" style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-4 text-[0.8125rem] text-ink-soft">No data yet.</p>
      )}
    </div>
  );
}

function StatusSplit({ title, summary }) {
  const total = summary?.total ?? 0;
  return (
    <div>
      <p className="eyebrow text-royal">{title}</p>
      <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-canvas-sunk">
        {total > 0 &&
          STATUSES.map((s) => (
            <div key={s} className={STATUS_META[s].dot} style={{ width: `${(summary.status[s] / total) * 100}%` }} />
          ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {STATUSES.map((s) => (
          <li key={s} className="flex items-center gap-1.5 text-[0.8125rem] text-ink-muted">
            <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', STATUS_META[s].dot)} />
            {STATUS_META[s].label}
            <span className="font-mono tabular text-navy-800">{summary?.status[s] ?? 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TABS = [
  { key: 'admissions', icon: ClipboardList },
  { key: 'contacts', icon: MessageSquareText },
];

export function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('admissions');
  const [stats, setStats] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadStats = useCallback(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadStats();
    // Pick up new website submissions while the dashboard is open.
    const t = setInterval(() => {
      loadStats();
      setRefreshKey((k) => k + 1);
    }, 60_000);
    return () => clearInterval(t);
  }, [loadStats]);

  const a = stats?.admissions;
  const c = stats?.contacts;

  return (
    <div className="min-h-screen bg-canvas-soft">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-navy-800">
        <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Logo tone="dark" showWordmark={false} />
            <div className="hidden h-6 w-px bg-white/15 sm:block" />
            <div>
              <p className="font-display text-[0.9375rem] font-semibold text-white">Admin dashboard</p>
              <p className="hidden text-[0.75rem] text-navy-200/70 sm:block">Satpuda Pvt. I.T.I.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-edge px-3 py-2 text-[0.8125rem] text-navy-100/80 hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              View website <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-edge border border-white/20 px-3.5 py-2 text-[0.8125rem] font-medium text-white hover:border-tech/70 hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-shell px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div>
          <h1 className="font-display text-display-sm font-bold text-navy-800">Overview</h1>
          <p className="mt-1 text-[0.9375rem] text-ink-muted">Applications and enquiries submitted through the website.</p>
        </div>

        {/* Stats */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={ClipboardList}
            label="Admission applications"
            value={a?.total}
            sub={a && `${a.week} in the last 7 days`}
            accent="bg-navy-50 text-navy-600"
          />
          <StatCard
            icon={Sparkles}
            label="New applications"
            value={a?.status.new}
            sub="Not yet contacted"
            accent="bg-signal-50 text-signal-600"
          />
          <StatCard
            icon={MessageSquareText}
            label="Contact enquiries"
            value={c?.total}
            sub={c && `${c.status.new} new · ${c.week} this week`}
            accent="bg-tech-50 text-tech-700"
          />
          <StatCard
            icon={CalendarDays}
            label="Received today"
            value={a && c ? a.today + c.today : undefined}
            sub={a && c && `${a.today} applications · ${c.today} enquiries`}
            accent="bg-amber-50 text-amber-700"
          />
        </div>

        {/* Summary */}
        <div className="mt-4 grid gap-6 rounded-panel border border-navy-100 bg-white p-5 shadow-card sm:p-6 md:grid-cols-2 xl:grid-cols-4">
          <StatusSplit title="Application status" summary={a} />
          <Breakdown title="Applications by trade" rows={a?.breakdown ?? []} labels={TRADE_LABELS} total={a?.total} />
          <StatusSplit title="Enquiry status" summary={c} />
          <Breakdown title="Enquiries by subject" rows={c?.breakdown ?? []} labels={SUBJECT_LABELS} total={c?.total} />
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Records" className="mt-10 flex gap-1 border-b border-navy-100">
          {TABS.map(({ key, icon: Icon }) => {
            const active = tab === key;
            const count = key === 'admissions' ? a?.status.new : c?.status.new;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(key)}
                className={cn(
                  '-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-[0.9375rem] font-medium transition-colors',
                  active ? 'border-signal text-navy-800' : 'border-transparent text-ink-muted hover:text-navy-800'
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {RESOURCES[key].label}
                {count > 0 && (
                  <span className="rounded-full bg-signal px-2 py-0.5 font-mono text-[0.6875rem] tabular text-white" title={`${count} new`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <RecordsPanel key={tab} resource={RESOURCES[tab]} onChanged={loadStats} refreshKey={refreshKey} />
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;

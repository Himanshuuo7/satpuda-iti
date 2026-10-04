import { useEffect, useRef, useState } from 'react';
import { Loader2, Mail, MessageCircle, Phone, Trash2, X } from 'lucide-react';

import cn from '../../utils/cn';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import StatusBadge from './StatusBadge';
import { STATUSES, STATUS_META, formatDateTime } from './labels';

/**
 * Right-hand drawer with every field of one record, quick contact actions,
 * the status switcher and a two-step delete.
 */
export function DetailDrawer({ resource, record, onClose, onStatus, onDelete }) {
  const [busy, setBusy] = useState(null); // 'status:<s>' | 'delete'
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');
  const closeRef = useRef(null);
  const open = Boolean(record);

  useLockBodyScroll(open);

  useEffect(() => {
    setConfirmDelete(false);
    setError('');
    if (open) closeRef.current?.focus();
  }, [record?._id, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!record) return null;

  const run = async (key, fn) => {
    setBusy(key);
    setError('');
    try {
      await fn();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(null);
    }
  };

  const whatsapp = `https://wa.me/91${record.phone}`;
  const note = resource.note?.(record);

  return (
    <div className="fixed inset-0 z-50">
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-navy-950/50 backdrop-blur-[2px]" />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-white shadow-deep"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-navy-100 px-6 py-5">
          <div className="min-w-0">
            <p className="eyebrow text-ink-soft">{resource.singular}</p>
            <h2 id="drawer-title" className="mt-1.5 truncate font-display text-xl font-bold text-navy-800">
              {resource.title(record)}
            </h2>
            <p className="mt-1 font-mono text-[0.8125rem] tabular text-ink-muted">{resource.subtitle(record)}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-edge text-ink-soft hover:bg-canvas-sunk hover:text-navy-800"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href={`tel:+91${record.phone}`}
              className="flex flex-col items-center gap-1.5 rounded-edge border border-navy-100 py-3 text-[0.8125rem] font-medium text-navy-800 hover:border-navy-300 hover:bg-canvas-soft"
            >
              <Phone className="h-4 w-4 text-navy-600" strokeWidth={2} aria-hidden="true" />
              Call
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-edge border border-navy-100 py-3 text-[0.8125rem] font-medium text-navy-800 hover:border-navy-300 hover:bg-canvas-soft"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" strokeWidth={2} aria-hidden="true" />
              WhatsApp
            </a>
            {record.email ? (
              <a
                href={`mailto:${record.email}`}
                className="flex flex-col items-center gap-1.5 rounded-edge border border-navy-100 py-3 text-[0.8125rem] font-medium text-navy-800 hover:border-navy-300 hover:bg-canvas-soft"
              >
                <Mail className="h-4 w-4 text-royal" strokeWidth={2} aria-hidden="true" />
                Email
              </a>
            ) : (
              <span className="flex flex-col items-center gap-1.5 rounded-edge border border-dashed border-navy-100 py-3 text-[0.8125rem] text-ink-soft">
                <Mail className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                No email
              </span>
            )}
          </div>

          {/* Status */}
          <div className="mt-6 rounded-panel border border-navy-100 bg-canvas-soft p-4">
            <div className="flex items-center justify-between">
              <p className="text-[0.8125rem] font-medium text-navy-800">Status</p>
              <StatusBadge status={record.status} />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {STATUSES.map((s) => {
                const active = record.status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={active || busy !== null}
                    onClick={() => run(`status:${s}`, () => onStatus(record, s))}
                    className={cn(
                      'flex min-h-[2.5rem] items-center justify-center gap-1.5 rounded-edge border text-[0.8125rem] font-medium transition-colors',
                      active
                        ? 'border-navy-700 bg-navy-700 text-white'
                        : 'border-navy-100 bg-white text-navy-800 hover:border-navy-300 disabled:opacity-60'
                    )}
                  >
                    {busy === `status:${s}` && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                    {active ? STATUS_META[s].label : `Mark ${STATUS_META[s].label.toLowerCase()}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fields */}
          {resource.sections.map((section) => (
            <section key={section.title} className="mt-7">
              <h3 className="eyebrow text-royal">{section.title}</h3>
              <dl className="mt-3 divide-y divide-navy-100 rounded-panel border border-navy-100">
                {section.fields.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[8.5rem_1fr] gap-3 px-4 py-2.5 text-[0.875rem]">
                    <dt className="text-ink-soft">{label}</dt>
                    <dd className="break-words font-medium text-navy-800">{value(record) ?? '—'}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          {note && (
            <section className="mt-7">
              <h3 className="eyebrow text-royal">{resource.noteLabel ?? 'Message from applicant'}</h3>
              <p className="mt-3 whitespace-pre-line rounded-panel border border-navy-100 bg-canvas-soft p-4 text-[0.9375rem] leading-[1.65] text-ink">
                {note}
              </p>
            </section>
          )}

          <p className="mt-7 text-[0.8125rem] text-ink-soft">
            Submitted {formatDateTime(record.createdAt)}
            {record.updatedAt !== record.createdAt && <> · Updated {formatDateTime(record.updatedAt)}</>}
          </p>

          {error && (
            <p role="alert" className="mt-4 rounded-edge border border-signal-300 bg-signal-50 px-4 py-3 text-[0.8125rem] text-signal-700">
              {error}
            </p>
          )}
        </div>

        {/* Footer — delete */}
        <div className="border-t border-navy-100 px-6 py-4">
          {confirmDelete ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[0.875rem] text-navy-800">Delete this {resource.singular} permanently?</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="min-h-[2.375rem] rounded-edge border border-navy-100 px-4 text-[0.8125rem] font-medium text-navy-800 hover:border-navy-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => run('delete', () => onDelete(record))}
                  className="inline-flex min-h-[2.375rem] items-center gap-1.5 rounded-edge bg-signal px-4 text-[0.8125rem] font-medium text-white hover:bg-signal-600 disabled:opacity-60"
                >
                  {busy === 'delete' && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                  Yes, delete
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-signal-600 hover:text-signal-700"
            >
              <Trash2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Delete {resource.singular}
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

export default DetailDrawer;

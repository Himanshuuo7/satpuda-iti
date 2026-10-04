import { trades } from '../../data/satpudaData';
import { itiInstitutes } from '../../data/itiInstitutes';

/** Human labels for the ids the API stores. */

export const TRADE_LABELS = Object.fromEntries(trades.map((t) => [t.slug.split('/').pop(), t.name]));

export const CAMPUS_LABELS = Object.fromEntries(
  itiInstitutes.map((i) => [i.id, i.shortName === i.district ? i.shortName : `${i.shortName}, ${i.district}`])
);

export const SUBJECT_LABELS = {
  admission: 'Admission',
  placement: 'Placement',
  fees: 'Fees & scholarships',
  campus: 'Campus / facilities',
  other: 'Other',
};

export const QUALIFICATION_LABELS = {
  '10th': '10th pass',
  '12th': '12th pass',
  diploma: 'Diploma',
  graduate: 'Graduate',
  other: 'Other',
};

export const GENDER_LABELS = { male: 'Male', female: 'Female', other: 'Other' };

export const STATUS_META = {
  new: { label: 'New', dot: 'bg-signal', chip: 'bg-signal-50 text-signal-700 ring-signal-100' },
  contacted: { label: 'Contacted', dot: 'bg-amber-500', chip: 'bg-amber-50 text-amber-800 ring-amber-200' },
  closed: { label: 'Closed', dot: 'bg-emerald-500', chip: 'bg-emerald-50 text-emerald-800 ring-emerald-200' },
};

export const STATUSES = Object.keys(STATUS_META);

const toOptions = (map) => Object.entries(map).map(([value, label]) => ({ value, label }));
export const TRADE_OPTIONS = toOptions(TRADE_LABELS);
export const CAMPUS_OPTIONS = toOptions(CAMPUS_LABELS);
export const SUBJECT_OPTIONS = toOptions(SUBJECT_LABELS);

const dateFmt = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const timeFmt = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' });

export const formatDate = (iso) => (iso ? dateFmt.format(new Date(iso)) : '—');
export const formatDateTime = (iso) =>
  iso ? `${dateFmt.format(new Date(iso))}, ${timeFmt.format(new Date(iso))}` : '—';

/** "2 h ago", "3 d ago" — short relative time for the table. */
export function timeAgo(iso) {
  const s = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)} d ago`;
  return formatDate(iso);
}

export function ageFrom(iso) {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 3600 * 1000));
}

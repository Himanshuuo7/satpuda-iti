import { STATUSES } from '../config/options.js';

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Builds a Mongo filter from the dashboard's query string: ?status, ?q (text
 * search across `searchFields`) and exact matches on `filterFields`.
 */
export function buildFilter(query, { searchFields = [], filterFields = [] } = {}) {
  const filter = {};
  if (STATUSES.includes(query.status)) filter.status = query.status;
  for (const f of filterFields) {
    if (typeof query[f] === 'string' && query[f]) filter[f] = query[f];
  }
  const q = typeof query.q === 'string' ? query.q.trim().slice(0, 100) : '';
  if (q && searchFields.length) {
    const re = new RegExp(escapeRegex(q), 'i');
    filter.$or = searchFields.map((f) => ({ [f]: re }));
  }
  return filter;
}

/** Paginated listing: ?page, ?limit (max 100). */
export async function paginate(Model, query, filterOptions) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 20));
  const filter = buildFilter(query, filterOptions);

  const [items, total] = await Promise.all([
    Model.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Model.countDocuments(filter),
  ]);

  return { items, total, page, pages: Math.ceil(total / limit) || 1 };
}

/** Every matching record (capped) for CSV export. */
export function exportAll(Model, query, filterOptions) {
  return Model.find(buildFilter(query, filterOptions)).sort({ createdAt: -1 }).limit(5000).lean();
}

export async function setStatus(Model, req, res) {
  const { status } = req.body ?? {};
  if (!STATUSES.includes(status)) {
    return res.status(422).json({ success: false, message: `Status must be one of: ${STATUSES.join(', ')}.` });
  }
  const doc = await Model.findByIdAndUpdate(
    req.params.id,
    { status },
    { returnDocument: 'after', runValidators: true }
  ).lean();
  if (!doc) return res.status(404).json({ success: false, message: 'Not found.' });
  res.json({ success: true, data: doc });
}

export async function removeOne(Model, req, res) {
  const doc = await Model.findByIdAndDelete(req.params.id).lean();
  if (!doc) return res.status(404).json({ success: false, message: 'Not found.' });
  res.json({ success: true, message: 'Deleted.' });
}

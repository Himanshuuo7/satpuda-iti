import env from '../config/env.js';
import Admission from '../models/Admission.js';
import Contact from '../models/Contact.js';
import { createToken, safeEqual } from '../utils/token.js';

export function login(req, res) {
  const { password } = req.body ?? {};
  if (!env.adminPassword || !env.tokenSecret) {
    return res.status(503).json({ success: false, message: 'Admin login is not configured on the server.' });
  }
  if (typeof password !== 'string' || !safeEqual(password, env.adminPassword)) {
    return res.status(401).json({ success: false, message: 'Incorrect password.' });
  }
  res.json({ success: true, ...createToken({ role: 'admin' }) });
}

export function me(req, res) {
  res.json({ success: true, data: { role: req.admin.role, exp: req.admin.exp } });
}

/** Counts by status, today / last 7 days, and a breakdown by one field. */
async function summarize(Model, breakdownField) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000);

  const [byStatus, today, week, breakdown] = await Promise.all([
    Model.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Model.countDocuments({ createdAt: { $gte: startOfDay } }),
    Model.countDocuments({ createdAt: { $gte: weekAgo } }),
    Model.aggregate([
      { $group: { _id: `$${breakdownField}`, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  const status = { new: 0, contacted: 0, closed: 0 };
  for (const s of byStatus) status[s._id] = s.count;
  const total = Object.values(status).reduce((a, b) => a + b, 0);

  return {
    total,
    today,
    week,
    status,
    breakdown: breakdown.map((b) => ({ key: b._id, count: b.count })),
  };
}

export async function stats(req, res) {
  const [admissions, contacts] = await Promise.all([
    summarize(Admission, 'trade'),
    summarize(Contact, 'subject'),
  ]);
  res.json({ success: true, data: { admissions, contacts } });
}

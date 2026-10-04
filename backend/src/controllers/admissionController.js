import Admission from '../models/Admission.js';
import { exportAll, paginate, removeOne, setStatus } from './listHelpers.js';

const LIST_OPTIONS = {
  searchFields: ['fullName', 'fatherName', 'phone', 'email', 'referenceNo', 'district'],
  filterFields: ['trade', 'campus'],
};

export async function createAdmission(req, res) {
  const admission = await Admission.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Application received. Our admission team will call you shortly.',
    data: { id: admission._id, referenceNo: admission.referenceNo, createdAt: admission.createdAt },
  });
}

export async function listAdmissions(req, res) {
  res.json({ success: true, ...(await paginate(Admission, req.query, LIST_OPTIONS)) });
}

export async function exportAdmissions(req, res) {
  res.json({ success: true, items: await exportAll(Admission, req.query, LIST_OPTIONS) });
}

export async function getAdmission(req, res) {
  const doc = await Admission.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ success: false, message: 'Not found.' });
  res.json({ success: true, data: doc });
}

export const updateAdmissionStatus = (req, res) => setStatus(Admission, req, res);
export const deleteAdmission = (req, res) => removeOne(Admission, req, res);

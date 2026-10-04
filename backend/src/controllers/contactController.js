import Contact from '../models/Contact.js';
import { exportAll, paginate, removeOne, setStatus } from './listHelpers.js';

const LIST_OPTIONS = {
  searchFields: ['name', 'phone', 'email', 'message'],
  filterFields: ['subject'],
};

export async function createContact(req, res) {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Thank you — your message has been sent. We will get back to you soon.',
    data: { id: contact._id, createdAt: contact.createdAt },
  });
}

export async function listContacts(req, res) {
  res.json({ success: true, ...(await paginate(Contact, req.query, LIST_OPTIONS)) });
}

export async function exportContacts(req, res) {
  res.json({ success: true, items: await exportAll(Contact, req.query, LIST_OPTIONS) });
}

export const updateContactStatus = (req, res) => setStatus(Contact, req, res);
export const deleteContact = (req, res) => removeOne(Contact, req, res);

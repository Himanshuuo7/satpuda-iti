import { CONTACT_SUBJECTS } from '../config/options.js';
import {
  maxLen,
  minLen,
  normalizePhone,
  oneOf,
  optionalEmail,
  phone,
  required,
  runRules,
  str,
} from './helpers.js';

const rules = {
  name: [required('Name'), minLen('Name', 2), maxLen('Name', 100)],
  phone: [required('Mobile number'), phone],
  email: [optionalEmail, maxLen('Email', 120)],
  subject: [oneOf('Subject', CONTACT_SUBJECTS)],
  message: [required('Message'), minLen('Message', 10), maxLen('Message', 2000)],
};

export function validateContact(body = {}) {
  const errors = runRules(body, rules);
  const data = {
    name: str(body.name),
    phone: normalizePhone(body.phone),
    email: str(body.email) || undefined,
    subject: body.subject,
    message: str(body.message),
  };
  return { errors, data };
}

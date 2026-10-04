import { CAMPUSES, GENDERS, QUALIFICATIONS, TRADES } from '../config/options.js';
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

/** Applicants must be at least 14 on the date they apply (NCVT CTS minimum). */
const dob = (v) => {
  if (!str(v)) return 'Date of birth is required.';
  const date = new Date(v);
  if (Number.isNaN(date.getTime())) return 'Enter a valid date of birth.';
  const age = (Date.now() - date.getTime()) / (365.25 * 24 * 3600 * 1000);
  if (age < 14) return 'Applicant must be at least 14 years old.';
  if (age > 60) return 'Enter a valid date of birth.';
  return null;
};

const percentage = (v) => {
  if (v === undefined || v === null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 && n <= 100 ? null : 'Percentage must be between 0 and 100.';
};

const rules = {
  fullName: [required('Full name'), minLen('Full name', 2), maxLen('Full name', 100)],
  fatherName: [required("Father's name"), minLen("Father's name", 2), maxLen("Father's name", 100)],
  dateOfBirth: [dob],
  gender: [oneOf('Gender', GENDERS)],
  phone: [required('Mobile number'), phone],
  email: [optionalEmail, maxLen('Email', 120)],
  qualification: [oneOf('Qualification', QUALIFICATIONS)],
  percentage: [percentage],
  trade: [oneOf('Trade', TRADES)],
  campus: [oneOf('Campus', CAMPUSES)],
  address: [required('Address'), maxLen('Address', 300)],
  district: [required('District'), maxLen('District', 60)],
  message: [maxLen('Message', 1000)],
};

/** Validates and returns { errors, data } with only whitelisted, cleaned fields. */
export function validateAdmission(body = {}) {
  const errors = runRules(body, rules);
  const data = {
    fullName: str(body.fullName),
    fatherName: str(body.fatherName),
    dateOfBirth: body.dateOfBirth,
    gender: body.gender,
    phone: normalizePhone(body.phone),
    email: str(body.email) || undefined,
    qualification: body.qualification,
    percentage: body.percentage === '' || body.percentage == null ? undefined : Number(body.percentage),
    trade: body.trade,
    campus: body.campus,
    address: str(body.address),
    district: str(body.district),
    message: str(body.message) || undefined,
  };
  return { errors, data };
}

/**
 * Tiny field validators. Each returns an error message or null, so a form's
 * rules read as a list and the errors come back keyed by field — the shape the
 * frontend renders next to each input.
 */
const PHONE_RE = /^[6-9]\d{9}$/; // Indian mobile, 10 digits
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strips spaces, dashes and a leading +91 / 0 so "+91 98765-43210" passes. */
export const normalizePhone = (value = '') =>
  String(value).replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');

export const str = (v) => (typeof v === 'string' ? v.trim() : '');

export const required = (label) => (v) => (str(v) ? null : `${label} is required.`);

export const maxLen = (label, n) => (v) =>
  str(v).length > n ? `${label} must be at most ${n} characters.` : null;

export const minLen = (label, n) => (v) =>
  str(v) && str(v).length < n ? `${label} must be at least ${n} characters.` : null;

export const phone = (v) =>
  PHONE_RE.test(normalizePhone(v)) ? null : 'Enter a valid 10-digit mobile number.';

export const optionalEmail = (v) =>
  !str(v) || EMAIL_RE.test(str(v)) ? null : 'Enter a valid email address.';

export const oneOf = (label, list) => (v) =>
  list.includes(v) ? null : `Select a valid ${label.toLowerCase()}.`;

/** Runs `rules` ({ field: [validators] }) against `body`; returns { field: message }. */
export function runRules(body, rules) {
  const errors = {};
  for (const [field, checks] of Object.entries(rules)) {
    for (const check of checks) {
      const message = check(body[field], body);
      if (message) {
        errors[field] = message;
        break;
      }
    }
  }
  return errors;
}

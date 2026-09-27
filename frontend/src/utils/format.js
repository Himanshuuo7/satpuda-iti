/** Formats a rupee figure in the Indian numbering system. */
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Turns a phone string into a tel: href. */
export function telHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** Compact lakh form for salary figures, e.g. 240000 -> "2.4 L". */
export function toLakh(amount) {
  const lakh = amount / 100000;
  return `${Number.isInteger(lakh) ? lakh : lakh.toFixed(2).replace(/0$/, '')} L`;
}

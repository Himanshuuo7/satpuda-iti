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

/**
 * Per-trade presentation. This is styling, not content, so it lives with the
 * components rather than in the data module.
 *
 * Each trade takes one accent from the existing palette — red for the
 * Electrician's bolt, royal blue for the Fitter's drawing ink, brand navy for
 * the Mechanic Diesel's steel and cyan for COPA's screen — and a hero surface.
 * Class names are written out in full so Tailwind can see them.
 */

const ACCENTS = {
  signal: {
    text: 'text-signal',
    bg: 'bg-signal',
    soft: 'bg-signal-50',
    border: 'border-signal',
    hoverText: 'group-hover:text-signal',
    hoverBorder: 'hover:border-signal/50',
    onDark: 'text-signal-400',
  },
  royal: {
    text: 'text-royal',
    bg: 'bg-royal',
    soft: 'bg-royal-50',
    border: 'border-royal',
    hoverText: 'group-hover:text-royal',
    hoverBorder: 'hover:border-royal/40',
    onDark: 'text-royal-200',
  },
  navy: {
    text: 'text-navy-600',
    bg: 'bg-navy-600',
    soft: 'bg-navy-50',
    border: 'border-navy-600',
    hoverText: 'group-hover:text-navy-800',
    hoverBorder: 'hover:border-navy-400',
    onDark: 'text-tech',
  },
  tech: {
    text: 'text-tech-700',
    bg: 'bg-tech-500',
    soft: 'bg-tech-50',
    border: 'border-tech-500',
    hoverText: 'group-hover:text-tech-700',
    hoverBorder: 'hover:border-tech-500/50',
    onDark: 'text-tech',
  },
};

export const THEMES = {
  electric: { dark: true, accent: ACCENTS.signal },
  blueprint: { dark: false, accent: ACCENTS.royal },
  engine: { dark: true, accent: ACCENTS.navy },
  digital: { dark: false, accent: ACCENTS.tech },
};

export const themeFor = (trade) => THEMES[trade.theme] ?? THEMES.electric;

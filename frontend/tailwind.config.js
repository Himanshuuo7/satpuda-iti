/**
 * Satpuda ITI — Design System
 *
 * Tokens are derived from the official Satpuda (Pvt.) Industrial Training
 * Institute logo: a royal-blue circular wordmark, a red industrial gear ring,
 * cyan technical tools and a red lightning bolt.
 *
 * Role discipline:
 *   navy  — the dominant brand surface and primary voice
 *   red   — action only (CTA, active state, key data emphasis). Never decoration.
 *   cyan  — technical accent: measurement rules, blueprint grid, focus, markers
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Mobile-first breakpoints, tuned for the five target classes.
    screens: {
      xs: '480px', // large phone
      sm: '640px', // phablet
      md: '768px', // tablet
      lg: '1024px', // laptop
      xl: '1280px', // desktop
      '2xl': '1536px', // large desktop
      '3xl': '1800px', // ultrawide
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2D5C',
          50: '#EEF3FA',
          100: '#D6E2F2',
          200: '#A9C2E3',
          300: '#6E95CB',
          400: '#3B67A8',
          500: '#1B4680',
          600: '#0B2D5C', // brand navy
          700: '#092647',
          800: '#071B33',
          900: '#051324',
          950: '#030B17',
        },
        // Industrial red — reserved for action and emphasis.
        signal: {
          DEFAULT: '#E01B24',
          50: '#FEF2F2',
          100: '#FEE2E2',
          300: '#FCA5A5',
          400: '#F4545C',
          500: '#E01B24',
          600: '#C4151D',
          700: '#A11015',
        },
        // Technical cyan — measurement, blueprint, focus, markers.
        // 400 and lighter are for dark surfaces only; 700 is the readable
        // weight for cyan text on the light canvas (5.9:1 on canvas-soft).
        tech: {
          DEFAULT: '#16C7D9',
          50: '#ECFDFF',
          100: '#CFF8FD',
          200: '#A2EFF8',
          300: '#5FDFEE',
          400: '#16C7D9',
          500: '#0BA6B8',
          600: '#0A8494',
          700: '#0D6A77',
        },
        // Royal blue lifted straight from the logo's circular wordmark. Used
        // for display type and key accents on light surfaces only — navy stays
        // the dominant surface colour.
        royal: {
          DEFAULT: '#0B16C9',
          50: '#EEF0FF',
          100: '#DADFFF',
          200: '#B3BBFA',
          400: '#4A55E0',
          600: '#0B16C9',
          700: '#0A12A3',
          800: '#080F75',
        },
        // Text weights, all verified at >=4.5:1 against canvas and canvas-soft
        // so secondary and metadata copy stays readable at small sizes.
        ink: {
          DEFAULT: '#111827', // 16.7:1
          muted: '#5C6B80', //  5.1:1
          soft: '#647285', //  4.6:1
        },
        canvas: {
          DEFAULT: '#FFFFFF',
          soft: '#F6F8FB',
          sunk: '#EDF1F7',
        },
      },
      fontFamily: {
        // Display: technical, industrial character with real personality.
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        // Body: neutral, highly legible at small sizes.
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Mono is reserved for genuine data: refs, phones, years, measurements.
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        // Hand-lettered accent — the hero plate note only.
        script: ['Caveat', 'cursive'],
      },
      fontSize: {
        // Eyebrow / technical label role
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        'label-lg': ['0.75rem', { lineHeight: '1', letterSpacing: '0.16em' }],
        // Fluid display ramp — capped so display type never exceeds ~6rem.
        'display-sm': ['clamp(1.75rem, 1.35rem + 2vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2.25rem, 1.6rem + 3.2vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.75rem, 1.8rem + 4.6vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(3rem, 1.9rem + 5.6vw, 6rem)', { lineHeight: '0.96', letterSpacing: '-0.04em' }],
        /**
         * Hero headline. Unlike the ramp above it is bounded by viewport
         * *height* as well as width — a 1280x720 laptop is wide enough for
         * 72px type but not tall enough to also hold the body, the actions and
         * the fact rail underneath it. `min()` lets whichever axis is scarcer
         * govern, which is what makes the hero fit in one viewport without a
         * per-breakpoint font-size ladder.
         */
        'display-hero': [
          'clamp(3rem, min(9.2vw, 16.5vh), 8.5rem)',
          { lineHeight: '0.9', letterSpacing: '-0.045em' },
        ],
      },
      spacing: {
        // 4-unit base gives the useful middle steps an 8-only scale misses.
        4.5: '1.125rem',
        13: '3.25rem',
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
      },
      maxWidth: {
        prose: '68ch', // 65–75ch reading measure
        shell: '1440px',
      },
      /**
       * Extra alpha steps the design relies on. Tailwind's colour/opacity
       * modifier resolves against this scale, and a value that is not on it
       * silently emits no rule at all — so `border-white/12` (the hairline on
       * navy surfaces) and `bg-white/92` (the scrolled navbar) must live here.
       */
      opacity: {
        12: '0.12',
        92: '0.92',
      },
      borderRadius: {
        // Restrained radii — industrial, not pill-shaped.
        sharp: '2px',
        edge: '4px',
        panel: '6px',
      },
      boxShadow: {
        // Every shadow carries an offset and a soft blur.
        card: '0 1px 2px rgba(7, 27, 51, 0.04), 0 8px 24px -12px rgba(7, 27, 51, 0.14)',
        lift: '0 2px 4px rgba(7, 27, 51, 0.06), 0 18px 40px -18px rgba(7, 27, 51, 0.28)',
        deep: '0 4px 8px rgba(3, 11, 23, 0.20), 0 32px 64px -28px rgba(3, 11, 23, 0.55)',
      },
      transitionTimingFunction: {
        // Exponential ease-out: fast commit, long settle.
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'rule-draw': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        'marquee-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'gear-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-marker': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.82)' },
        },
        'ping-once': {
          '0%': { transform: 'scale(1)', opacity: '0.9' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        'impact-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(-3deg)' },
        },
      },
      animation: {
        'ping-once': 'ping-once 900ms cubic-bezier(0, 0, 0.2, 1) 1',
        'impact-float': 'impact-float 4.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rule-draw': 'rule-draw 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        marquee: 'marquee-x 46s linear infinite',
        'gear-spin': 'gear-spin 64s linear infinite',
        'float-soft': 'float-soft 16s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-marker': 'pulse-marker 2.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

import { useLayoutEffect, useRef } from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

import Button from '../ui/Button';
import { itiInstitutes } from '../../data/itiInstitutes';
import { story } from '../../data/satpudaHistory';
import { tradeDetails } from '../../data/trades';

/**
 * About hero — an editorial headline beside an "instrument" drawn from the
 * logo: the red toothed gear, the cyan crossed tools and the red lightning
 * bolt, set inside a measuring dial whose ring carries the institute's name.
 *
 * Every figure in the fact rail is derived from the verified data files, so
 * the hero can never drift from the records below it.
 */

const districts = new Set(itiInstitutes.map((i) => i.district)).size;

const FACTS = [
  { value: String(story.foundedYear), label: 'Founded in Balaghat' },
  { value: String(itiInstitutes.length), label: 'Verified ITI records' },
  { value: String(districts), label: 'Districts in MP' },
  { value: String(tradeDetails.length), label: 'NCVT trades' },
];

export const CHAPTERS = [
  { id: 'story', label: 'Story' },
  { id: 'journey', label: 'Journey' },
  { id: 'why', label: 'Difference' },
  { id: 'network', label: 'Network' },
  { id: 'presence', label: 'Presence' },
  { id: 'trades', label: 'Trades' },
  { id: 'career', label: 'Career' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'quality', label: 'Quality' },
  { id: 'regions', label: 'Regions' },
];

/** Filled gear with a centre bore, matching the logo's ring. */
function gearPath({ teeth = 12, outer = 178, depth = 24, bore = 124, cx = 260, cy = 260 }) {
  const inner = outer - depth;
  const step = (Math.PI * 2) / teeth;
  const pt = (r, a) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  const ring = Array.from({ length: teeth }, (_, i) => {
    const a0 = i * step - Math.PI / 2;
    const w = step * 0.27;
    return [
      `${i === 0 ? 'M' : 'L'} ${pt(inner, a0 - w * 1.15)}`,
      `L ${pt(outer, a0 - w * 0.85)}`,
      `L ${pt(outer, a0 + w * 0.85)}`,
      `L ${pt(inner, a0 + w * 1.15)}`,
      `A ${inner} ${inner} 0 0 1 ${pt(inner, a0 + step - w * 1.15)}`,
    ].join(' ');
  }).join(' ');
  const hole = `M ${cx + bore} ${cy} A ${bore} ${bore} 0 1 0 ${cx - bore} ${cy} A ${bore} ${bore} 0 1 0 ${cx + bore} ${cy} Z`;
  return `${ring} Z ${hole}`;
}

const GEAR = gearPath({});

function Instrument() {
  const ticks = Array.from({ length: 120 }, (_, i) => i);

  return (
    <svg viewBox="0 0 520 520" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <path id="about-ring-path" d="M 260 260 m -214 0 a 214 214 0 1 1 428 0 a 214 214 0 1 1 -428 0" />
        <radialGradient id="about-plate" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EEF1FA" />
        </radialGradient>
      </defs>

      {/* Dial */}
      <g data-depth="0.4">
        <circle cx="260" cy="260" r="252" fill="url(#about-plate)" stroke="#D6E2F2" />
        <g stroke="#0B2D5C">
          {ticks.map((i) => {
            const a = (i / ticks.length) * Math.PI * 2;
            const long = i % 10 === 0;
            const r1 = long ? 232 : 239;
            const r2 = 246;
            return (
              <line
                key={i}
                x1={260 + r1 * Math.cos(a)}
                y1={260 + r1 * Math.sin(a)}
                x2={260 + r2 * Math.cos(a)}
                y2={260 + r2 * Math.sin(a)}
                strokeWidth={long ? 1.4 : 0.7}
                opacity={long ? 0.6 : 0.3}
              />
            );
          })}
        </g>
      </g>

      {/* Name ring */}
      <g className="about-spin-rev" data-depth="0.6">
        <text
          fill="#0B16C9"
          fontFamily='"JetBrains Mono", ui-monospace, monospace'
          fontSize="12.5"
          fontWeight="600"
          letterSpacing="3.2"
        >
          <textPath href="#about-ring-path">
            SATPUDA (PVT.) INDUSTRIAL TRAINING INSTITUTES • SINCE 1999 • MADHYA PRADESH •
          </textPath>
        </text>
      </g>

      {/* Red gear */}
      <g data-depth="1">
        <path className="about-spin-slow" d={GEAR} fill="#E01B24" fillRule="evenodd" />
      </g>

      {/* Bore: blueprint cross + cyan tools + bolt */}
      <g data-depth="1.6">
        <circle cx="260" cy="260" r="118" fill="#FFFFFF" />
        <g stroke="#16C7D9" strokeWidth="0.8" opacity="0.55">
          <line x1="150" y1="260" x2="370" y2="260" strokeDasharray="3 5" />
          <line x1="260" y1="150" x2="260" y2="370" strokeDasharray="3 5" />
          <circle cx="260" cy="260" r="86" fill="none" />
        </g>
        {/* Crossed spanners, line-art like the logo's cyan tools */}
        <g fill="none" stroke="#16C7D9" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 206 316 L 310 212" />
          <path d="M 300 196 a 22 22 0 1 0 30 30 l -12 -4 l -8 -8 z" strokeWidth="5" />
          <path d="M 314 316 L 210 212" />
          <path d="M 220 196 a 22 22 0 1 1 -30 30 l 12 -4 l 8 -8 z" strokeWidth="5" />
          <circle cx="200" cy="322" r="8" strokeWidth="5" />
          <circle cx="320" cy="322" r="8" strokeWidth="5" />
        </g>
        {/* Bolt */}
        <path d="M 274 178 L 236 272 L 262 270 L 246 348 L 290 244 L 264 246 L 284 178 Z" fill="#E01B24" />
      </g>

      {/* Dimension callouts */}
      <g
        data-depth="2.2"
        fontFamily='"JetBrains Mono", ui-monospace, monospace'
        fontSize="11"
        fill="#0B2D5C"
        letterSpacing="1.5"
      >
        <line x1="84" y1="96" x2="150" y2="150" stroke="#0B2D5C" strokeWidth="0.8" />
        <circle cx="150" cy="150" r="3" fill="#E01B24" />
        <text x="24" y="88">EST. 1999</text>
        <line x1="440" y1="436" x2="376" y2="378" stroke="#0B2D5C" strokeWidth="0.8" />
        <circle cx="376" cy="378" r="3" fill="#16C7D9" />
        <text x="404" y="456">NCVT · CTS</text>
      </g>
    </svg>
  );
}

export function AboutHero() {
  const root = useRef(null);
  const plate = useRef(null);

  // Entrance: rule draws, lines rise out of their masks, the instrument settles.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out', duration: 1 } })
        .fromTo('[data-a="rule"]', { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, 0)
        .fromTo('[data-a="eyebrow"]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.05)
        .fromTo('[data-a="line"]', { yPercent: 110 }, { yPercent: 0, stagger: 0.09 }, 0.1)
        .fromTo('[data-a="fade"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.8 }, 0.45)
        .fromTo(
          '[data-a="plate"]',
          { opacity: 0, scale: 0.92, rotate: -8 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.4 },
          0.15
        );
    }, root);

    return () => ctx.revert();
  }, []);

  // Pointer parallax on the instrument's layers (fine pointers only).
  useLayoutEffect(() => {
    const node = plate.current;
    if (!node) return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    const layers = [...node.querySelectorAll('[data-depth]')].map((el) => ({
      el,
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
      depth: Number(el.getAttribute('data-depth')),
    }));

    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      layers.forEach((l) => {
        l.x(dx * l.depth * 6);
        l.y(dy * l.depth * 6);
      });
    };
    const onLeave = () => layers.forEach((l) => (l.x(0), l.y(0)));

    const host = root.current;
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="about-hero-title"
      className="about-grain relative overflow-hidden bg-canvas-soft pt-[var(--header-h)]"
    >
      {/* Blueprint grid, faded toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 blueprint-light [mask-image:radial-gradient(80%_70%_at_70%_40%,#000_30%,transparent_80%)]"
      />
      {/* Engineering hairlines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[var(--shell-pad)] hidden w-px bg-navy-100 lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[5.5rem] h-px overflow-hidden bg-navy-100">
        <span className="about-scan absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-signal to-transparent" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-12 pb-12 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-14 lg:pt-16">
          {/* Type block */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span data-a="rule" aria-hidden="true" className="h-px w-10 origin-left bg-signal" />
              <p data-a="eyebrow" className="eyebrow text-royal">
                About Satpuda ITI
              </p>
            </div>

            <h1
              id="about-hero-title"
              className="mt-7 font-display text-display-lg font-bold text-navy-800"
            >
              <span className="about-line">
                <span data-a="line">Building Skills.</span>
              </span>
              <span className="about-line">
                <span data-a="line" className="text-royal">
                  Shaping Careers.
                </span>
              </span>
              <span className="about-line">
                <span data-a="line">
                  Powering Industry<span className="text-signal">.</span>
                </span>
              </span>
            </h1>

            <p
              data-a="fade"
              className="mt-8 max-w-[36rem] text-[1.0625rem] leading-[1.75] text-ink-muted sm:text-lg"
            >
              Since {story.foundedYear}, Satpuda Private Industrial Training Institutes have trained
              young people from rural and urban Madhya Pradesh in NCVT trades — a network run by{' '}
              {story.operator}, built on one idea:{' '}
              <span lang="hi" className="font-semibold text-navy-800">
                {story.mottoHi}
              </span>{' '}
              <span className="text-ink-soft">({story.mottoEn.toLowerCase()}).</span>
            </p>

            <div data-a="fade" className="mt-9 flex flex-col gap-3 xs:flex-row xs:items-center">
              <Button href="#network" variant="solid" size="lg" className="w-full xs:w-auto">
                Explore the network
                <ArrowDownRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </Button>
              <Button href="#story" variant="quiet" size="lg" className="justify-start">
                Read our story
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Button>
            </div>

            <dl
              data-a="fade"
              className="mt-12 grid grid-cols-2 gap-px border-y border-navy-100 bg-navy-100 sm:grid-cols-4"
            >
              {FACTS.map((f) => (
                <div key={f.label} className="bg-canvas-soft px-4 py-5">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-soft">
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-display text-[2rem] font-semibold leading-none tabular text-navy-800">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Instrument */}
          <div className="lg:col-span-5">
            <div
              ref={plate}
              data-a="plate"
              className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none"
            >
              <Instrument />
            </div>
          </div>
        </div>

        {/* Chapter index */}
        <nav aria-label="On this page" className="relative -mx-[var(--shell-pad)] overflow-x-auto px-[var(--shell-pad)] mask-fade-r lg:[-webkit-mask-image:none] lg:[mask-image:none]">
          <ol className="flex h-[5.5rem] min-w-max items-center gap-6 sm:gap-8">
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="group flex items-baseline gap-2 rounded-sharp py-2 text-[0.875rem] font-medium text-navy-700 transition-colors duration-200 hover:text-royal"
                >
                  <span className="font-mono text-[0.625rem] tabular text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative">
                    {c.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-royal transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

export default AboutHero;

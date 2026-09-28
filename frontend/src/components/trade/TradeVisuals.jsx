import GearOutline from '../ui/GearOutline';

/**
 * Hero instruments — one per trade, each a small working picture of what the
 * trade actually does rather than decoration:
 *
 *  - Electrician: a single-line diagram (supply → meter → MCB → distribution
 *    board → loads and earth) with current pulsing along the wiring.
 *  - Fitter: a drawing sheet where the male half of a square fit slides home
 *    into its recess, dimensioned with the curriculum's first-year tolerance.
 *  - Mechanic Diesel: a four-stroke cylinder whose piston, rod and crank run
 *    on the real slider-crank geometry, the injector firing at the start of
 *    the power stroke.
 *  - COPA: a terminal listing the year's modules.
 *
 * All motion is CSS (index.css, "Trade pages") and stops under reduced motion.
 */

const MONO = '"JetBrains Mono", ui-monospace, monospace';

function CircuitVisual() {
  const wires = [
    'M 80 40 V 170 H 140 V 262',
    'M 80 40 V 170 H 240 V 262',
    'M 80 40 V 170 H 340 V 262',
  ];

  return (
    <svg viewBox="0 0 480 420" className="h-full w-full" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="478" height="418" rx="6" fill="#071B33" stroke="rgba(255,255,255,0.12)" />
      <text x="24" y="398" fill="#6E95CB" fontFamily={MONO} fontSize="10" letterSpacing="2">
        SINGLE-LINE DIAGRAM
      </text>

      {/* Wiring */}
      <g fill="none" stroke="#A9C2E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
        <path d="M 80 20 V 170" />
        <path d="M 80 170 H 400" />
        <path d="M 140 170 V 262 M 240 170 V 262 M 340 170 V 262 M 400 170 V 280" />
      </g>

      {/* Current */}
      <g fill="none" stroke="#16C7D9" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {wires.map((d, i) => (
          <path key={d} d={d} className="trade-current" style={{ '--d': `${i * -1.05}s` }} />
        ))}
      </g>

      {/* Energy meter */}
      <rect x="52" y="52" width="56" height="30" rx="3" fill="#0B2D5C" stroke="#A9C2E3" strokeWidth="1.5" />
      <text x="80" y="72" textAnchor="middle" fill="#FFFFFF" fontFamily={MONO} fontSize="11" fontWeight="600">
        kWh
      </text>

      {/* MCB */}
      <rect x="64" y="104" width="32" height="36" rx="3" fill="#0B2D5C" stroke="#A9C2E3" strokeWidth="1.5" />
      <path d="M 72 132 L 88 112" stroke="#E01B24" strokeWidth="2.5" strokeLinecap="round" />
      <text x="104" y="126" fill="#A9C2E3" fontFamily={MONO} fontSize="10" letterSpacing="1.5">
        MCB
      </text>

      {/* Distribution board bus */}
      <rect x="74" y="164" width="332" height="12" rx="2" fill="#1B4680" />
      <text x="414" y="160" textAnchor="end" fill="#A9C2E3" fontFamily={MONO} fontSize="10" letterSpacing="1.5">
        DB
      </text>

      {/* Lamp */}
      <circle cx="140" cy="286" r="30" fill="#FFFFFF" className="trade-glow" />
      <circle cx="140" cy="286" r="20" fill="#071B33" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M 126 272 L 154 300 M 154 272 L 126 300" stroke="#FFFFFF" strokeWidth="2" />

      {/* Socket */}
      <path d="M 220 296 A 20 20 0 0 1 260 296" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M 240 262 V 276" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M 214 296 H 266" stroke="#FFFFFF" strokeWidth="2" />

      {/* Motor */}
      <circle cx="340" cy="290" r="26" fill="#071B33" stroke="#FFFFFF" strokeWidth="2" />
      <text x="340" y="297" textAnchor="middle" fill="#FFFFFF" fontFamily={MONO} fontSize="20" fontWeight="600">
        M
      </text>

      {/* Earth */}
      <path d="M 384 280 H 416 M 390 288 H 410 M 396 296 H 404" stroke="#16C7D9" strokeWidth="2" strokeLinecap="round" />

      <g fill="#6E95CB" fontFamily={MONO} fontSize="9.5" letterSpacing="1.5" textAnchor="middle">
        <text x="140" y="340">LAMP</text>
        <text x="240" y="340">SOCKET</text>
        <text x="340" y="340">MOTOR</text>
        <text x="400" y="316">EARTH</text>
      </g>

      {/* Voltmeter */}
      <g transform="translate(360 88)">
        <path d="M -44 0 A 44 44 0 0 1 44 0" fill="none" stroke="#A9C2E3" strokeWidth="1.5" />
        {Array.from({ length: 9 }, (_, i) => {
          const a = Math.PI + (i / 8) * Math.PI;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 36}
              y1={Math.sin(a) * 36}
              x2={Math.cos(a) * 44}
              y2={Math.sin(a) * 44}
              stroke="#A9C2E3"
              strokeWidth={i % 4 === 0 ? 2 : 1}
            />
          );
        })}
        <rect x="-1.5" y="-38" width="3" height="38" rx="1.5" fill="#E01B24" className="trade-needle" />
        <circle r="5" fill="#FFFFFF" />
        <text y="22" textAnchor="middle" fill="#FFFFFF" fontFamily={MONO} fontSize="12" fontWeight="600">
          V
        </text>
      </g>
    </svg>
  );
}

function BlueprintVisual() {
  return (
    <div className="relative h-full w-full">
      <GearOutline
        spin
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 text-royal/15"
      />
      <svg viewBox="0 0 480 420" className="relative h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="fit-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#A9C2E3" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Sheet */}
        <rect x="1" y="1" width="478" height="418" rx="6" fill="#FFFFFF" stroke="#D6E2F2" />
        <rect x="16" y="16" width="448" height="388" fill="none" stroke="#A9C2E3" />

        {/* Centre line */}
        <path d="M 240 40 V 350" stroke="#0BA6B8" strokeWidth="1" strokeDasharray="14 4 3 4" />

        {/* Female half */}
        <path
          d="M 120 200 H 200 V 250 H 280 V 200 H 360 V 320 H 120 Z"
          fill="url(#fit-hatch)"
          stroke="#0B2D5C"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Male half — slides home */}
        <g className="trade-fit">
          <path
            d="M 150 130 H 330 V 200 H 280 V 250 H 200 V 200 H 150 Z"
            fill="#EEF0FF"
            stroke="#0B16C9"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* Dimensions */}
        <g fill="none" stroke="#0B16C9" strokeWidth="1">
          <path d="M 200 344 H 280" pathLength="1" className="trade-dim" style={{ '--d': '1500ms' }} />
          <path d="M 200 326 V 350 M 280 326 V 350" />
          <path d="M 384 200 V 250" pathLength="1" className="trade-dim" style={{ '--d': '1700ms' }} />
          <path d="M 366 200 H 392 M 290 250 H 392" strokeDasharray="3 3" />
        </g>
        <path d="M 200 344 l 8 -4 v 8 z M 280 344 l -8 -4 v 8 z" fill="#0B16C9" />
        <g fill="#0B16C9" fontFamily={MONO} fontSize="11" fontWeight="600">
          <text x="240" y="366" textAnchor="middle">±0.04</text>
          <text x="398" y="229">±0.04</text>
        </g>

        {/* Title block */}
        <g fontFamily={MONO} fontSize="9.5" letterSpacing="1.2" fill="#0B2D5C">
          <rect x="300" y="40" width="148" height="70" fill="#FFFFFF" stroke="#A9C2E3" />
          <path d="M 300 63 H 448 M 300 86 H 448" stroke="#D6E2F2" />
          <text x="310" y="56">JOB · SQUARE FIT</text>
          <text x="310" y="79">TOL · ±0.04 mm</text>
          <text x="310" y="102">ANGLE · 30′</text>
        </g>
        <text x="32" y="56" fill="#647285" fontFamily={MONO} fontSize="9.5" letterSpacing="2">
          FITTER · YEAR 1
        </text>
      </svg>
    </div>
  );
}

const STROKES = ['Intake', 'Compression', 'Power', 'Exhaust'];

function EngineVisual() {
  return (
    <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="398" height="358" rx="6" fill="#071B33" stroke="rgba(255,255,255,0.12)" />

      {/* Crankcase */}
      <circle cx="160" cy="268" r="50" fill="none" stroke="#1B4680" strokeWidth="2" strokeDasharray="4 5" />

      {/* Crank */}
      <g className="trade-crank">
        <path d="M 160 268 L 160 240" stroke="#6E95CB" strokeWidth="14" strokeLinecap="round" />
        <path d="M 138 282 A 26 26 0 0 0 182 282 Z" fill="#1B4680" />
        <circle cx="160" cy="240" r="6" fill="#A9C2E3" />
      </g>
      <circle cx="160" cy="268" r="7" fill="#FFFFFF" />

      {/* Connecting rod */}
      <g className="trade-rod">
        <path d="M 160 150 L 160 240" stroke="#A9C2E3" strokeWidth="10" strokeLinecap="round" />
        <circle cx="160" cy="240" r="10" fill="none" stroke="#A9C2E3" strokeWidth="4" />
      </g>

      {/* Piston */}
      <g className="trade-piston">
        <rect x="116" y="122" width="88" height="50" rx="4" fill="#D6E2F2" />
        <path d="M 116 130 H 204 M 116 137 H 204" stroke="#6E95CB" strokeWidth="2" />
        <circle cx="160" cy="150" r="6" fill="#0B2D5C" />
      </g>

      {/* Cylinder, head, valves, injector */}
      <path d="M 110 100 V 238 M 210 100 V 238" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <rect x="96" y="72" width="128" height="28" rx="3" fill="#0B2D5C" stroke="#A9C2E3" strokeWidth="1.5" />
      <path d="M 130 52 V 98 M 190 52 V 98" stroke="#A9C2E3" strokeWidth="3" />
      <path d="M 120 98 H 140 M 180 98 H 200" stroke="#A9C2E3" strokeWidth="4" strokeLinecap="round" />
      <rect x="153" y="36" width="14" height="60" rx="3" fill="#E01B24" />
      <path d="M 160 100 L 148 120 H 172 Z" fill="#F4545C" className="trade-spray" />

      {/* Stroke labels — each lights for its half-turn of the crank */}
      <g fontFamily={MONO} fontSize="11" fontWeight="600" letterSpacing="1.5" fill="#FFFFFF">
        {STROKES.map((s, i) => (
          <g key={s} className="trade-stroke" style={{ '--d': `${i === 0 ? 0 : (i - 4) * 1.6}s` }}>
            <circle cx="262" cy={90 + i * 34} r="4" fill={s === 'Power' ? '#E01B24' : '#16C7D9'} />
            <text x="276" y={94 + i * 34}>
              {s.toUpperCase()}
            </text>
          </g>
        ))}
      </g>
      <g fill="#6E95CB" fontFamily={MONO} fontSize="9.5" letterSpacing="1.5">
        <text x="258" y="236">FOUR-STROKE</text>
        <text x="258" y="252">DIESEL CYCLE</text>
      </g>
    </svg>
  );
}

const MODULES = [
  ['os', 'DOS · PowerShell'],
  ['office', 'docs · sheets · slides'],
  ['mysql', 'databases'],
  ['network', 'LAN · Internet · security'],
  ['web', 'HTML · CSS · JavaScript'],
  ['cloud-ai', 'services · tools'],
  ['python', 'programs'],
];

function TerminalVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[30rem]">
      {/* Spreadsheet card, peeking behind */}
      <div
        aria-hidden="true"
        className="absolute -right-4 -top-10 z-10 hidden w-44 animate-float-soft rounded-panel border border-navy-100 bg-white p-3 shadow-card sm:block"
      >
        <p className="font-mono text-[0.625rem] text-ink-soft">fx =SUM(B2:B6)</p>
        <div className="mt-2 grid grid-cols-3 gap-px bg-navy-100">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className={i < 3 ? 'h-3 bg-navy-50' : 'h-3 bg-white'} />
          ))}
        </div>
        <div className="mt-2 flex h-8 items-end gap-1">
          {[40, 70, 55, 90, 65].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-sharp bg-tech-500/70" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-panel border border-navy-700 bg-navy-900 shadow-deep">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-signal" />
          <span className="h-2.5 w-2.5 rounded-full bg-navy-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-tech" />
          <span className="ml-3 truncate font-mono text-[0.6875rem] text-navy-200/70">copa@satpuda-iti: ~</span>
        </div>
        <div className="px-4 py-5 font-mono text-[0.75rem] leading-[1.9] sm:px-5 sm:text-[0.8125rem]" aria-hidden="true">
          <p className="trade-type text-white" style={{ '--i': 0 }}>
            <span className="text-tech">$</span> copa --modules
          </p>
          {MODULES.map(([name, desc], i) => (
            <p key={name} className="trade-type flex gap-3" style={{ '--i': i + 1 }}>
              <span className="text-tech">▸</span>
              <span className="w-[4.75rem] shrink-0 text-white sm:w-[5.5rem]">{name}</span>
              <span className="min-w-0 truncate text-navy-200/75">{desc}</span>
            </p>
          ))}
          <p className="trade-type text-white" style={{ '--i': MODULES.length + 1 }}>
            <span className="text-tech">$</span>{' '}
            <span className="trade-cursor inline-block h-[1.05em] w-[0.55em] translate-y-[0.2em] bg-tech" />
          </p>
        </div>
      </div>

      {/* HTML card, bottom left */}
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -left-3 z-10 hidden animate-float-soft rounded-panel border border-navy-100 bg-white px-3.5 py-2.5 font-mono text-[0.6875rem] shadow-card sm:block"
        style={{ animationDelay: '-6s' }}
      >
        <span className="text-royal">&lt;h1&gt;</span>
        <span className="text-navy-800">Hello</span>
        <span className="text-royal">&lt;/h1&gt;</span>
      </div>
    </div>
  );
}

export const tradeVisuals = {
  electric: {
    Visual: CircuitVisual,
    caption: 'Single-line diagram — supply, energy meter, MCB, distribution board, loads and earth.',
  },
  blueprint: {
    Visual: BlueprintVisual,
    caption: 'A square fit, dimensioned to the first-year fitting tolerance of ±0.04 mm.',
  },
  engine: {
    Visual: EngineVisual,
    caption: 'Four-stroke diesel cycle — two crank turns, fuel injected at the start of the power stroke.',
  },
  digital: {
    Visual: TerminalVisual,
    caption: 'The modules of the COPA year, from operating systems to Python.',
  },
};

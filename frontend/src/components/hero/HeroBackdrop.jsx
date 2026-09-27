import GearOutline from '../ui/GearOutline';

/**
 * Hero backdrop — the light industrial stage the hero type and plate sit on.
 *
 * Three layers, back to front:
 *   1. pale canvas planes that slice the frame on a diagonal,
 *   2. a faded line drawing of the institute facade, sitting behind the type,
 *   3. the brand geometry — a red wedge in the top-right corner and a navy
 *      chevron running out of the bottom-right, with gear outlines riding it.
 *
 * Everything here is decoration, so the whole block is inert and hidden from
 * assistive technology. The SVG stretches (`preserveAspectRatio="none"`) — the
 * shapes are abstract planes, so the composition holds at any hero width.
 */

/**
 * The institute facade, drawn rather than photographed.
 *
 * The published photograph of the building is not in the media registry, and a
 * line drawing survives the watermark treatment better anyway: at 6% it stays
 * crisp at every size instead of turning into grey mush.
 */
function FacadeWatermark({ className }) {
  const windows = (y, h) =>
    Array.from({ length: 9 }, (_, i) => (
      <rect key={`${y}-${i}`} x={34 + i * 38} y={y} width="22" height={h} rx="1" />
    ));

  return (
    <svg
      viewBox="0 0 400 260"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        {/* Central tower and cupola */}
        <path d="M196 18h8M200 18v14" strokeLinecap="round" />
        <path d="M176 46c0-13 11-24 24-24s24 11 24 24z" />
        <path d="M170 46h60v10h-60z" />
        <path d="M178 56h44v40h-44z" />
        <path d="M190 68h20v28h-20z" />

        {/* Roof line and cornice */}
        <path d="M14 96h372v12H14z" />
        <path d="M22 108h356" />

        {/* Main block */}
        <path d="M22 108h356v140H22z" />

        {/* Signboard */}
        <path d="M96 120h208v30H96z" />

        {/* Window registers */}
        <g strokeWidth="1.2">
          {windows(164, 34)}
          {windows(210, 30)}
        </g>

        {/* Plinth */}
        <path d="M8 248h384" strokeLinecap="round" />
      </g>

      <text
        x="200"
        y="141"
        textAnchor="middle"
        fill="currentColor"
        className="font-display"
        style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '0.04em' }}
      >
        SATPUDA (PVT.) ITI
      </text>
    </svg>
  );
}

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1 — Canvas planes */}
      <svg
        viewBox="0 0 1440 720"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="hero-red" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#F4545C" />
            <stop offset="55%" stopColor="#E01B24" />
            <stop offset="100%" stopColor="#A11015" />
          </linearGradient>
          <linearGradient id="hero-navy" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#1B4680" />
            <stop offset="45%" stopColor="#092647" />
            <stop offset="100%" stopColor="#030B17" />
          </linearGradient>
          <linearGradient id="hero-navy-soft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B67A8" />
            <stop offset="100%" stopColor="#0B2D5C" />
          </linearGradient>
        </defs>

        {/* Pale diagonal planes — the frame is never one flat white. Kept
            faint so the two edges read as a shift in light, not as seams. */}
        <path d="M735 0H1440v720H405z" fill="#F6F8FB" />
        <path d="M1055 0H1440v720H680z" fill="#EDF1F7" opacity="0.5" />

        {/* 3a — Red corner wedge, bitten out on a quarter radius. */}
        <path
          d="M1116 0H1440v212H1328C1328 95 1233 0 1116 0Z"
          fill="url(#hero-red)"
        />

        {/* 3b — Navy chevron out of the bottom-right. The deep plane carries
            the weight; the soft plane and the cyan sliver only bevel its
            leading edge, so they stay well under it in contrast. */}
        <path d="M1440 372v76L472 720H196Z" fill="#D6E2F2" opacity="0.42" />
        <path d="M1440 452v14L506 720H452Z" fill="#16C7D9" opacity="0.16" />
        <path d="M1440 466v254H482Z" fill="url(#hero-navy)" />
        <path d="M1440 556v164H808Z" fill="#030B17" opacity="0.5" />
        <path d="M1440 466v34L586 720h-104Z" fill="url(#hero-navy-soft)" opacity="0.38" />

        {/* Detached navy shard, left of the chevron. */}
        <path d="M232 720l232-52 40 52Z" fill="#0B2D5C" opacity="0.8" />
      </svg>

      {/* 2 — Facade watermark, behind the headline and plate */}
      <FacadeWatermark className="absolute left-[30%] top-[-2%] hidden w-[24rem] text-navy-600/[0.05] md:block lg:w-[28rem] xl:w-[32rem]" />

      {/* 3c — Gear outlines. Two on the light canvas, one riding the navy.
          They sit low and centre so they never crowd the headline. */}
      <GearOutline
        spin
        className="absolute left-[38%] top-[58%] h-[20rem] w-[20rem] text-navy-600/[0.05] lg:h-[26rem] lg:w-[26rem]"
      />
      <GearOutline
        className="absolute left-[54%] top-[82%] h-[11rem] w-[11rem] animate-float-soft text-navy-600/[0.04] lg:h-[14rem] lg:w-[14rem]"
      />
      <GearOutline
        spin
        className="absolute -bottom-20 right-[5%] hidden h-[17rem] w-[17rem] text-white/[0.09] lg:block"
      />

      {/* A last wash keeps the type column clean on the left. */}
      <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-white via-white/85 to-transparent" />
    </div>
  );
}

export default HeroBackdrop;

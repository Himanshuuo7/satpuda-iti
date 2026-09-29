import { ArrowRight } from 'lucide-react';

import PlacementHero from './PlacementHero';
import PlacementNext from './PlacementNext';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import useScrollProgress from '../../hooks/useScrollProgress';
import { iconFor } from './icons';
import { careerPath as content } from '../../data/placementContent';
import cn from '../../utils/cn';

/**
 * Career Path.
 *
 * The published diagram has three columns — Career in Industry, Qualifications
 * Knowledge and Become Entrepreneur — each ending in an outcome, and all three
 * pointing down to Work as Freelancer. Here each column is a ladder whose rail
 * fills as it scrolls; Qualifications stays in the centre and on navy, as it
 * sits at the heart of the original. Hovering one route quietens the others.
 */

/** Hero diagram: one certificate, three routes, one shared destination. */
function RouteMap() {
  const branches = [
    { y: 64, label: 'Industry', d: 'M 78 180 C 150 180, 140 64, 214 64' },
    { y: 180, label: 'Qualifications', d: 'M 78 180 L 214 180' },
    { y: 296, label: 'Enterprise', d: 'M 78 180 C 150 180, 140 296, 214 296' },
  ];
  const merges = [
    'M 246 64 C 320 64, 310 180, 372 180',
    'M 246 180 L 372 180',
    'M 246 296 C 320 296, 310 180, 372 180',
  ];

  return (
    <div className="relative rounded-panel border border-navy-100 bg-white p-5 shadow-card sm:p-7">
      <svg viewBox="0 0 440 360" className="h-auto w-full" role="img" aria-labelledby="route-map-title">
        <title id="route-map-title">
          An NCVT ITI certificate branches into careers in industry, further qualifications and entrepreneurship; all three can lead to freelance work.
        </title>
        <g fill="none" strokeWidth="1.6" strokeLinecap="round">
          {branches.map((b, i) => (
            <path key={b.label} d={b.d} pathLength="1" stroke="#0B16C9" className="sec-draw" style={{ '--d': `${300 + i * 120}ms` }} />
          ))}
          {merges.map((d, i) => (
            <path key={d} d={d} pathLength="1" stroke="#16C7D9" className="sec-draw" style={{ '--d': `${900 + i * 120}ms` }} />
          ))}
        </g>

        {/* Start */}
        <g className="sec-pop" style={{ '--d': '200ms' }}>
          <circle cx="62" cy="180" r="16" fill="#E01B24" />
          <circle cx="62" cy="180" r="24" fill="none" stroke="#E01B24" strokeOpacity="0.25" />
        </g>
        <text x="62" y="228" textAnchor="middle" fontFamily='"JetBrains Mono", monospace' fontSize="11" letterSpacing="1.4" fill="#071B33">
          NCVT ITI
        </text>

        {/* Routes */}
        {branches.map((b, i) => (
          <g key={b.label} className="sec-pop" style={{ '--d': `${700 + i * 120}ms` }}>
            <circle cx="230" cy={b.y} r="14" fill="#FFFFFF" stroke="#0B16C9" strokeWidth="1.6" />
            <circle cx="230" cy={b.y} r="5" fill="#0B16C9" />
            <text x="230" y={b.y - 24} textAnchor="middle" fontFamily='"Space Grotesk", sans-serif' fontSize="13" fontWeight="600" fill="#071B33">
              {b.label}
            </text>
          </g>
        ))}

        {/* Destination */}
        <g className="sec-pop" style={{ '--d': '1400ms' }}>
          <rect x="360" y="160" width="40" height="40" rx="6" fill="#071B33" />
          <path d="M 373 180 h 14 m -5 -5 l 5 5 l -5 5" stroke="#16C7D9" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text x="380" y="228" textAnchor="middle" fontFamily='"JetBrains Mono", monospace' fontSize="11" letterSpacing="1.4" fill="#071B33">
          FREELANCER
        </text>
      </svg>
    </div>
  );
}

function Rung({ step, featured }) {
  const chip = cn(
    'block rounded-edge border px-3.5 py-2.5 text-[0.9063rem] font-medium leading-snug transition-[border-color,background-color,color,transform] duration-300 ease-out hover:translate-x-0.5',
    featured
      ? 'border-white/12 bg-white/[0.04] text-navy-50 hover:border-tech/60 hover:bg-white/10'
      : 'border-navy-100 bg-canvas-soft text-navy-800 hover:border-royal hover:bg-white'
  );

  return (
    <li className="relative">
      <span
        aria-hidden="true"
        className={cn(
          'absolute -left-[1.4rem] top-[1.05rem] h-2.5 w-2.5 rounded-full border-2',
          featured ? 'border-tech bg-navy-800' : 'border-royal bg-white'
        )}
      />
      {step.length === 1 ? (
        <span className={chip}>{step[0]}</span>
      ) : (
        <span className="grid grid-cols-2 gap-2">
          {step.map((s) => (
            <span key={s} className={chip}>
              {s}
            </span>
          ))}
        </span>
      )}
    </li>
  );
}

function Track({ track, index, featured }) {
  const rail = useScrollProgress({ anchor: 0.75 });
  const Icon = iconFor(track.icon);

  return (
    <div
      className={cn('reveal', featured && 'order-first lg:order-none lg:-my-4')}
      style={{ '--reveal-delay': `${index * 90}ms` }}
    >
      <article
        className={cn(
          'relative flex h-full flex-col rounded-panel border p-6 transition-[opacity,box-shadow] duration-500 sm:p-7',
          featured ? 'border-navy-700 bg-navy-800 shadow-deep lg:py-11' : 'border-navy-100 bg-white hover:shadow-lift'
        )}
      >
        {featured && <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-panel blueprint opacity-30" />}

        <header className="relative flex items-center gap-4">
          <span
            className={cn(
              'grid h-12 w-12 shrink-0 place-items-center rounded-edge',
              featured ? 'bg-signal text-white' : 'bg-navy-800 text-tech'
            )}
          >
            <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className={cn('font-mono text-[0.625rem] uppercase tracking-[0.16em]', featured ? 'text-tech' : 'text-ink-soft')}>
              Route {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className={cn('mt-1 font-display text-[1.375rem] font-semibold leading-tight', featured ? 'text-white' : 'text-navy-800')}>
              {track.title}
            </h3>
          </div>
        </header>

        <div ref={rail} className="relative mt-8 flex-1 pl-7">
          <span
            aria-hidden="true"
            className={cn('absolute bottom-4 left-[0.6rem] top-4 w-px', featured ? 'bg-white/15' : 'bg-navy-100')}
          >
            <span className={cn('sec-fill-y absolute inset-0', featured ? 'bg-tech' : 'bg-royal')} />
          </span>
          <ol className="space-y-2.5">
            {track.steps.map((step) => (
              <Rung key={step.join('|')} step={step} featured={featured} />
            ))}
          </ol>
        </div>

        <div className={cn('relative mt-8 border-t pt-6', featured ? 'border-white/12' : 'border-navy-100')}>
          <p className={cn('font-mono text-[0.625rem] uppercase tracking-[0.16em]', featured ? 'text-navy-200/70' : 'text-ink-soft')}>
            Leads to
          </p>
          <p className="mt-2 flex items-center gap-2 font-display text-[1.25rem] font-semibold text-signal">
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2.25} />
            <span className={featured ? 'text-white' : 'text-navy-800'}>{track.outcome}</span>
          </p>
        </div>
      </article>
    </div>
  );
}

export function CareerRoutes({ page }) {
  const routes = useReveal({ threshold: 0.05 });
  const freelance = useReveal({ threshold: 0.2 });

  return (
    <>
      <PlacementHero
        page={page}
        eyebrow="Career guidance"
        lines={[
          <>
            Career Path<span className="text-signal">.</span>
          </>,
          <span className="text-royal">Three routes, one trade.</span>,
        ]}
        lede={content.lede}
        aside={<RouteMap />}
      />

      <section ref={routes} aria-labelledby="routes-title" className="bg-white py-20 sm:py-26">
        <div className="shell">
          <SectionHeading
            id="routes-title"
            eyebrow="Where an ITI can take you"
            title={
              <>
                Climb in industry, study further, <span className="text-ink-muted">or build your own business.</span>
              </>
            }
            className="max-w-3xl"
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:items-stretch lg:[&:hover>*:not(:hover)>article]:opacity-55">
            {content.tracks.map((t, i) => (
              <Track key={t.id} track={t} index={i} featured={t.id === 'qualifications'} />
            ))}
          </div>

          {/* All three routes point down to freelance work. */}
          <div ref={freelance} aria-hidden="true" className="mt-4 hidden grid-cols-3 lg:grid">
            {content.tracks.map((t, i) => (
              <div key={t.id} className="flex flex-col items-center">
                <span className="sec-seg-y block h-12 w-px bg-navy-200" style={{ '--i': i }} />
                <span className="h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-navy-300" />
              </div>
            ))}
          </div>

          <div className="reveal relative mt-6 overflow-hidden rounded-panel bg-navy-900 px-6 py-10 sm:px-10 lg:mt-3">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="eyebrow text-tech">Every route can lead to</p>
                <h3 className="mt-3 font-display text-display-sm font-semibold text-white">{content.freelance.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2 lg:max-w-[40rem] lg:justify-end">
                {content.freelance.roles.map((r, i) => (
                  <li key={r} className="reveal" style={{ '--reveal-delay': `${120 + i * 50}ms` }}>
                    <span className="block rounded-full border border-white/15 px-4 py-2 text-[0.875rem] font-medium text-navy-50 transition-[background-color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-signal hover:bg-signal">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PlacementNext page={page} />
    </>
  );
}

export default CareerRoutes;

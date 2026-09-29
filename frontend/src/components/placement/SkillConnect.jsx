import PlacementHero from './PlacementHero';
import PlacementNext from './PlacementNext';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { iconFor } from './icons';
import { skillConnect as content } from '../../data/placementContent';
import cn from '../../utils/cn';

/**
 * Skill – Connect · Skill – Industry – Manpower.
 *
 * The published diagram is a hub ringed by four clusters of partners and
 * programmes. On large screens the hub sits at the centre of a 3 × 3 grid with
 * a cluster on each side; connectors grow out from the hub once the section
 * is in view, and the ring of words inside the hub turns slowly (pausing on
 * hover). Below that the hub leads and the clusters stack.
 */

/** Where each cluster sits around the hub on large screens. */
const PLACE = {
  global: 'lg:col-start-2 lg:row-start-1 lg:self-end',
  industry: 'lg:col-start-1 lg:row-start-2 lg:self-center',
  partners: 'lg:col-start-3 lg:row-start-2 lg:self-center',
  exchange: 'lg:col-start-2 lg:row-start-3 lg:self-start',
};

/** Hero diagram: the three words of the tagline, joined. */
function Triad() {
  const nodes = [
    { x: 80, y: 200, label: 'SKILL', fill: '#0B16C9' },
    { x: 220, y: 70, label: 'INDUSTRY', fill: '#071B33' },
    { x: 360, y: 200, label: 'MANPOWER', fill: '#E01B24' },
  ];
  return (
    <div className="rounded-panel border border-navy-100 bg-white p-5 shadow-card sm:p-7">
      <svg viewBox="0 0 440 280" className="h-auto w-full" role="img" aria-labelledby="triad-title">
        <title id="triad-title">Skill, industry and manpower, each connected to the other two.</title>
        <g fill="none" stroke="#A9C2E3" strokeWidth="1.5">
          <path d="M 80 200 L 220 70" pathLength="1" className="sec-draw" style={{ '--d': '400ms' }} />
          <path d="M 220 70 L 360 200" pathLength="1" className="sec-draw" style={{ '--d': '600ms' }} />
          <path d="M 360 200 L 80 200" pathLength="1" className="sec-draw" style={{ '--d': '800ms' }} />
        </g>
        <circle cx="220" cy="156" r="30" fill="none" stroke="#16C7D9" strokeDasharray="3 5" className="sec-orbit" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <text x="220" y="160" textAnchor="middle" fontFamily='"JetBrains Mono", monospace' fontSize="9" letterSpacing="1.2" fill="#0D6A77">
          CONNECT
        </text>
        {nodes.map((n, i) => (
          <g key={n.label}>
            <g className="sec-pop" style={{ '--d': `${200 + i * 150}ms` }}>
              <circle cx={n.x} cy={n.y} r="22" fill={n.fill} />
              <circle cx={n.x} cy={n.y} r="30" fill="none" stroke={n.fill} strokeOpacity="0.2" />
            </g>
            <text
              x={n.x}
              y={n.y + (n.y > 100 ? 52 : -40)}
              textAnchor="middle"
              fontFamily='"JetBrains Mono", monospace'
              fontSize="11"
              letterSpacing="1.6"
              fill="#071B33"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Hub() {
  const words = content.words;
  return (
    <div className="sec-hub relative grid aspect-square w-full max-w-[18rem] place-items-center rounded-full bg-navy-800 shadow-deep">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full blueprint opacity-40" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-tech/30" />

      {/* Ring of words */}
      <div aria-hidden="true" className="sec-orbit absolute inset-0">
        {words.map((w, i) => {
          const angle = (i / words.length) * 360;
          return (
            <span
              key={w}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `rotate(${angle}deg) translateY(-6.1rem) rotate(${-angle}deg)` }}
            >
              <span className="sec-orbit-word block">
                <span className="block whitespace-nowrap font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-tech sm:text-[0.625rem]">
                  {w}
                </span>
              </span>
            </span>
          );
        })}
      </div>

      <p className="relative text-center font-display text-[1.25rem] font-bold leading-[1.05] text-white">
        Skill
        <br />
        <span className="text-signal">–</span> Connect
      </p>
      <p className="sr-only">Built on: {words.join(', ')}.</p>
    </div>
  );
}

function Cluster({ cluster, index }) {
  const Icon = iconFor(cluster.icon);
  return (
    <div className={cn('reveal w-full', PLACE[cluster.id])} style={{ '--reveal-delay': `${200 + index * 90}ms` }}>
      <article className="group relative h-full w-full rounded-panel border border-navy-100 bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift sm:p-7">
        <header className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-edge bg-canvas-soft text-royal transition-[background-color,color,transform] duration-300 ease-out group-hover:-rotate-6 group-hover:bg-royal group-hover:text-white">
            <Icon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
          </span>
          <h3 className="font-mono text-label uppercase text-ink-muted">{cluster.label}</h3>
        </header>
        <ul className="mt-5 space-y-2.5">
          {cluster.items.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[0.9688rem] font-medium text-navy-800">
              <span aria-hidden="true" className="h-px w-3 shrink-0 bg-tech-600 transition-[width] duration-300 ease-out group-hover:w-5" />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export function SkillConnect({ page }) {
  const map = useReveal({ threshold: 0.12 });

  return (
    <>
      <PlacementHero
        page={page}
        eyebrow={content.tagline}
        lines={[
          <>
            Skill <span className="text-signal">–</span> Connect<span className="text-signal">.</span>
          </>,
        ]}
        lede={content.lede}
        aside={<Triad />}
      />

      <section ref={map} aria-labelledby="network-map-title" className="relative overflow-hidden bg-canvas-soft py-20 sm:py-26">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-light opacity-70 [mask-image:radial-gradient(60%_60%_at_50%_55%,#000_20%,transparent_75%)]" />
        <div className="shell relative">
          <SectionHeading
            id="network-map-title"
            eyebrow="The connect network"
            title={
              <>
                Everyone around <span className="text-royal">a Satpuda trainee.</span>
              </>
            }
            lede={`${content.tagline} — four circles of partners and programmes, all connected through the institute.`}
            align="center"
            className="mx-auto max-w-3xl"
          />

          <div className="relative mt-16 grid justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_18rem_1fr] lg:grid-rows-[auto_auto_auto] lg:gap-10">
            {/* The ring that joins the four clusters, as in the original. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[min(44rem,62%)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-navy-200 lg:block"
            />

            {/* Hub, with connectors that reach out to each cluster */}
            <div className="relative flex w-full justify-center sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2 lg:self-center">
              <span aria-hidden="true" className="sec-link sec-link-y absolute bottom-1/2 left-1/2 top-[-2.5rem] hidden w-px origin-bottom bg-royal lg:block" />
              <span aria-hidden="true" className="sec-link sec-link-y absolute bottom-[-2.5rem] left-1/2 top-1/2 hidden w-px origin-top bg-royal lg:block" />
              <span aria-hidden="true" className="sec-link sec-link-x absolute left-[-2.5rem] right-1/2 top-1/2 hidden h-px origin-right bg-royal lg:block" />
              <span aria-hidden="true" className="sec-link sec-link-x absolute left-1/2 right-[-2.5rem] top-1/2 hidden h-px origin-left bg-royal lg:block" />
              <div className="reveal relative w-full max-w-[18rem]">
                <Hub />
              </div>
            </div>

            {content.clusters.map((c, i) => (
              <Cluster key={c.id} cluster={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <PlacementNext page={page} />
    </>
  );
}

export default SkillConnect;

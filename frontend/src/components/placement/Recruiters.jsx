import { ArrowDown } from 'lucide-react';

import PlacementHero from './PlacementHero';
import PlacementNext from './PlacementNext';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import useCountUp from '../../hooks/useCountUp';
import { recruiterLogos } from '../../data/media';
import { recruiters as content } from '../../data/placementContent';

/**
 * Recruiters – Satpuda ITIs.
 *
 * The headline figure, a slow marquee of every recruiter's name, the marks the
 * institute publishes as a logo wall, and the full list from its recruiters
 * board. The marquee is decorative (aria-hidden); the list is the accessible
 * version of the same names.
 */

function HeadlineCard() {
  const [ref, value] = useCountUp(content.headline.value, { duration: 1800 });
  return (
    <div className="relative overflow-hidden rounded-panel bg-navy-800 p-7 text-white shadow-deep sm:p-9">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(22,199,217,0.25),transparent_70%)]" />
      <p className="relative flex items-center gap-2 font-mono text-label uppercase text-tech">
        <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-marker rounded-full bg-signal" />
        Placement record
      </p>
      <p ref={ref} className="relative mt-6 font-display text-[4.5rem] font-bold leading-none tabular sm:text-[5.5rem]">
        {value.toLocaleString('en-IN')}
      </p>
      <p className="relative mt-3 max-w-[16rem] text-[1rem] leading-snug text-navy-100/85">{content.headline.label}</p>
    </div>
  );
}

function NameRow({ names, reverse, outline }) {
  const row = [...names, ...names];
  return (
    <div className="flex overflow-hidden">
      <ul className={`flex w-max shrink-0 animate-marquee items-center ${reverse ? 'sec-marquee-rev' : ''}`}>
        {row.map((n, i) => (
          <li key={`${n}-${i}`} className="flex items-center">
            <span
              className={
                outline
                  ? 'whitespace-nowrap px-6 font-display text-[2.25rem] font-bold tracking-tight text-transparent [-webkit-text-stroke:1px_#A9C2E3] sm:text-[3.25rem]'
                  : 'whitespace-nowrap px-6 font-display text-[2.25rem] font-bold tracking-tight text-navy-800 sm:text-[3.25rem]'
              }
            >
              {n}
            </span>
            <span className="h-2 w-2 shrink-0 rotate-45 bg-signal" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Recruiters({ page }) {
  const wall = useReveal({ threshold: 0.08 });
  const list = useReveal({ threshold: 0.05 });
  const half = Math.ceil(content.names.length / 2);
  const more = content.names.length - recruiterLogos.length;

  return (
    <>
      <PlacementHero
        page={page}
        eyebrow="Recruiters"
        lines={[
          <>
            Recruiters<span className="text-signal">.</span>
          </>,
          <span className="text-royal">Satpuda ITIs.</span>,
        ]}
        lede="Government departments, public sector undertakings and multinational companies recruit Satpuda trainees through campus drives."
        aside={<HeadlineCard />}
      />

      {/* Name marquee */}
      <div aria-hidden="true" className="sec-marquee mask-fade-x border-b border-navy-100 bg-white py-10 sm:py-14">
        <NameRow names={content.names.slice(0, half)} />
        <div className="mt-2 sm:mt-4">
          <NameRow names={content.names.slice(half)} reverse outline />
        </div>
      </div>

      {/* Logo wall */}
      <section ref={wall} aria-labelledby="wall-title" className="bg-canvas-soft py-20 sm:py-26">
        <div className="shell">
          <SectionHeading
            id="wall-title"
            eyebrow="Our esteemed recruiters"
            title={
              <>
                Companies that recruit <span className="text-ink-muted">from Satpuda campuses.</span>
              </>
            }
            className="max-w-3xl"
          />

          <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {recruiterLogos.map((logo, i) => (
              <li key={logo.src} className="reveal" style={{ '--reveal-delay': `${i * 45}ms` }}>
                <div className="group relative flex aspect-[4/3] h-full flex-col items-center justify-center gap-3 bg-white p-5 transition-colors duration-300 hover:bg-canvas-soft">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    width="100"
                    height="100"
                    className="h-20 w-auto max-w-[80%] bg-transparent object-contain opacity-80 grayscale transition duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 sm:h-24"
                  />
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft transition-colors duration-300 group-hover:text-navy-800">
                    {logo.name}
                  </span>
                </div>
              </li>
            ))}
            <li className="reveal bg-navy-800" style={{ '--reveal-delay': `${recruiterLogos.length * 45}ms` }}>
              <a
                href="#all-recruiters"
                className="group flex aspect-[4/3] h-full flex-col items-center justify-center gap-2 p-5 text-center text-white transition-colors duration-300 hover:bg-navy-700"
              >
                <span className="font-display text-[2rem] font-bold leading-none tabular">+{more}</span>
                <span className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-navy-100/80 transition-colors group-hover:text-white">
                  more recruiters
                  <ArrowDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-y-0.5" strokeWidth={2} />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Every name on the board */}
      <section
        id="all-recruiters"
        ref={list}
        aria-labelledby="all-recruiters-title"
        className="scroll-mt-[calc(var(--navbar-h-scrolled)+3.5rem)] bg-white py-20 sm:py-26"
      >
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              id="all-recruiters-title"
              eyebrow="The recruiters board"
              title={
                <>
                  {content.names.length} <span className="text-royal">recruiters.</span>
                </>
              }
              lede="Every company on the Satpuda ITIs recruiters board, in alphabetical order."
            />
          </div>
          <ol className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
            {content.names.map((n, i) => (
              <li
                key={n}
                className="reveal group flex items-center gap-4 border-b border-navy-100 py-3.5"
                style={{ '--reveal-delay': `${Math.min(i * 25, 500)}ms` }}
              >
                <span className="w-6 font-mono text-[0.6875rem] tabular text-navy-300 transition-colors duration-300 group-hover:text-signal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[0.9688rem] font-medium text-navy-800 transition-[color,transform] duration-300 ease-out group-hover:translate-x-1 group-hover:text-royal">
                  {n}
                </span>
                <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 scale-0 rounded-full bg-signal transition-transform duration-300 ease-out group-hover:scale-100" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PlacementNext page={page} />
    </>
  );
}

export default Recruiters;

import PlacementHero from './PlacementHero';
import PlacementNext from './PlacementNext';
import Figure from '../ui/Figure';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import useRevealEach from '../../hooks/useRevealEach';
import { iconFor } from './icons';
import { photos } from '../../data/media';
import { industrialInterface as content } from '../../data/placementContent';
import cn from '../../utils/cn';

/**
 * Industrial Interface & Student Development.
 *
 * The institute describes five arrangements in one paragraph; they are set as
 * a bento of cards, then the nine published activities of the Placement &
 * Guidance Cell run as a numbered register on the navy surface.
 */

function HeroPhoto() {
  const ref = useReveal({ threshold: 0.2 });
  return (
    <figure ref={ref} className="group relative">
      <Figure
        src={photos.garraWorkshop.src}
        alt={photos.garraWorkshop.alt}
        ratio="4/3"
        priority
        className="rounded-panel shadow-lift"
        imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        sizes="(min-width: 1024px) 40vw, 100vw"
      >
        <span aria-hidden="true" className="about-shutter absolute inset-0 bg-navy-800" style={{ '--reveal-delay': '300ms' }} />
      </Figure>
      <figcaption className="absolute -bottom-5 left-5 right-5 flex items-center gap-3 rounded-edge border border-navy-100 bg-white px-4 py-3 shadow-card sm:left-auto sm:right-6 sm:max-w-[17rem]">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 animate-pulse-marker rounded-full bg-signal" />
        <span className="text-[0.8125rem] font-medium leading-snug text-navy-800">
          Real-life problems from industry, taken up for problem solving.
        </span>
      </figcaption>
    </figure>
  );
}

function Arrangement({ item, index, wide }) {
  const Icon = iconFor(item.icon);
  return (
    <li
      className={cn('reveal', wide && 'md:col-span-2 lg:col-span-1 lg:row-span-2')}
      style={{ '--reveal-delay': `${index * 70}ms` }}
    >
      <div className="sec-tile group relative flex h-full flex-col overflow-hidden bg-white p-6 transition-colors duration-300 hover:bg-canvas-soft sm:p-8">
        <div className="flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-edge bg-navy-800 text-tech transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-105">
            <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="font-mono text-[0.6875rem] tabular text-navy-300 transition-colors duration-300 group-hover:text-signal">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3
          className={cn(
            'mt-8 font-semibold tracking-tight text-navy-800 transition-colors duration-300 group-hover:text-royal',
            wide ? 'font-display text-[1.625rem] leading-tight sm:text-[2rem]' : 'text-[1.125rem]'
          )}
        >
          {item.title}
        </h3>
        <p className={cn('mt-3 leading-[1.7] text-ink-muted', wide ? 'max-w-md text-[1.0625rem]' : 'text-[0.9375rem]')}>
          {item.body}
        </p>
        {wide && (
          <div aria-hidden="true" className="mt-auto hidden pt-10 lg:block">
            <div className="h-px w-full tick-rule text-navy-200" />
          </div>
        )}
      </div>
    </li>
  );
}

export function Interface({ page }) {
  const arrangements = useReveal({ threshold: 0.08 });
  const activities = useRevealEach();

  return (
    <>
      <PlacementHero
        page={page}
        eyebrow="Placement Cell"
        lines={[
          'Industrial Interface',
          <>
            <span className="text-royal">&amp; Student Development</span>
            <span className="text-signal">.</span>
          </>,
        ]}
        lede={content.lede}
        aside={<HeroPhoto />}
      />

      <section ref={arrangements} aria-labelledby="arrange-title" className="bg-white py-20 sm:py-26">
        <div className="shell">
          <SectionHeading
            id="arrange-title"
            eyebrow="What SITI arranges"
            title={
              <>
                Industry in the classroom. <span className="text-ink-muted">Trainees in industry.</span>
              </>
            }
            className="max-w-3xl"
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100 md:grid-cols-2 lg:grid-cols-3">
            {content.arrangements.map((item, i) => (
              <Arrangement key={item.title} item={item} index={i} wide={i === 0} />
            ))}
          </ul>
        </div>
      </section>

      <section ref={activities} aria-labelledby="cell-activities-title" className="relative overflow-hidden bg-navy-800 py-20 sm:py-26">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />
        <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--navbar-h-scrolled)+6rem)]">
              <SectionHeading
                id="cell-activities-title"
                tone="dark"
                eyebrow="Placement & Guidance Cell"
                title={
                  <>
                    Activities of the <span className="text-tech">cell.</span>
                  </>
                }
                lede="Nine things the cell does for every trainee — from campus interviews to job searching online."
              />
              <p className="reveal mt-8 font-display text-[4rem] font-bold leading-none tabular text-white/10" aria-hidden="true">
                0{content.activities.length}
              </p>
            </div>
          </div>

          <ol className="lg:col-span-8">
            {content.activities.map((a, i) => {
              const Icon = iconFor(a.icon);
              return (
                <li
                  key={a.text}
                  className="reveal group relative flex gap-5 border-t border-white/10 py-6 last:border-b sm:gap-7 sm:py-7"
                  style={{ '--reveal-delay': '40ms' }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-4 right-0 origin-left scale-x-0 rounded-edge bg-white/[0.04] transition-transform duration-500 ease-out group-hover:scale-x-100 sm:-left-6"
                  />
                  <span className="relative w-8 shrink-0 pt-1 font-mono text-[0.75rem] tabular text-navy-200/60 transition-colors duration-300 group-hover:text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-tech transition-[transform,border-color,background-color] duration-500 ease-out group-hover:-rotate-12 group-hover:border-tech/60 group-hover:bg-tech/10">
                    <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <p className="relative pt-1.5 text-[1rem] leading-[1.65] text-navy-100/90 transition-colors duration-300 group-hover:text-white sm:text-[1.0625rem]">
                    {a.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <PlacementNext page={page} />
    </>
  );
}

export default Interface;

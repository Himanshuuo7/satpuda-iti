import { useState } from 'react';
import { ArrowUpRight, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

import ActivityHero from './ActivityHero';
import ActivityNext from './ActivityNext';
import Figure from '../ui/Figure';
import Lightbox from '../ui/Lightbox';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { iconFor } from './icons';
import { photos } from '../../data/media';
import { activities as content } from '../../data/activityContent';
import { activityPageBySlug } from '../../data/activityPages';
import cn from '../../utils/cn';

/**
 * Student's Life – Activities.
 *
 * The institute's "विविध गतिविधियां" board as four groups, then its photographs
 * — campus life, industrial visits (औद्योगिक भ्रमण) and the activities board
 * itself — each opening in one shared viewer.
 */

const LIFE = [photos.culturalDance, photos.sportsTrophy, photos.sportsGroup, photos.certificates];
const VISITS = [photos.moilVisit, photos.powerHouseVisit, photos.industrialVisit];
const BOARD = photos.activitiesCollage;
const ALL = [...LIFE, ...VISITS, BOARD];

function Photo({ photo, onOpen, ratio, className, sizes, delay = 0 }) {
  return (
    <figure className={cn('reveal', className)} style={{ '--reveal-delay': `${delay}ms` }}>
      <button
        type="button"
        onClick={onOpen}
        className="group relative block h-full w-full overflow-hidden rounded-panel text-left"
        aria-label={`View photo: ${photo.alt}`}
      >
        <Figure
          src={photo.src}
          alt={photo.alt}
          ratio={ratio}
          className="h-full rounded-panel"
          imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          sizes={sizes}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-panel bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-navy-800 opacity-0 shadow-card transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          <ZoomIn className="h-4 w-4" strokeWidth={2} />
        </span>
      </button>
    </figure>
  );
}

function HeroPhoto() {
  const ref = useReveal({ threshold: 0.2 });
  return (
    <figure ref={ref} className="group relative">
      <Figure
        src={photos.culturalDance.src}
        alt={photos.culturalDance.alt}
        ratio="4/3"
        priority
        className="rounded-panel shadow-lift"
        imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        sizes="(min-width: 1024px) 40vw, 100vw"
      >
        <span aria-hidden="true" className="about-shutter absolute inset-0 bg-navy-800" style={{ '--reveal-delay': '300ms' }} />
      </Figure>
      <figcaption
        lang="hi"
        className="absolute -bottom-5 left-5 rounded-edge border border-navy-100 bg-white px-4 py-3 font-display text-[1.125rem] font-semibold text-navy-800 shadow-card sm:left-auto sm:right-6"
      >
        {content.titleHi}
      </figcaption>
    </figure>
  );
}

export function Activities({ page }) {
  const [open, setOpen] = useState(null);
  const groups = useReveal({ threshold: 0.08 });
  const life = useReveal({ threshold: 0.1 });
  const visits = useReveal({ threshold: 0.15 });
  const board = useReveal({ threshold: 0.15 });
  const news = activityPageBySlug.news;
  const total = content.groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <ActivityHero
        page={page}
        eyebrow="Student’s Life"
        lines={[
          'Student’s Life',
          <span className="text-royal">
            Activities<span className="text-signal">.</span>
          </span>,
        ]}
        lede={content.lede}
        aside={<HeroPhoto />}
      />

      {/* The activities board, grouped */}
      <section ref={groups} aria-labelledby="groups-title" className="bg-white py-20 sm:py-26">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              id="groups-title"
              eyebrow={`${total} activities`}
              title={
                <>
                  Beyond the workshop, <span className="text-ink-muted">all year round.</span>
                </>
              }
              className="lg:col-span-8"
            />
            <p lang="hi" className="reveal font-display text-[1.75rem] font-semibold text-navy-100 lg:col-span-4 lg:text-right" style={{ '--reveal-delay': '100ms' }}>
              {content.titleHi}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {content.groups.map((g, gi) => {
              const Icon = iconFor(g.icon);
              return (
                <article key={g.id} className="reveal" style={{ '--reveal-delay': `${gi * 90}ms` }}>
                  <div className="group h-full rounded-panel border border-navy-100 bg-canvas-soft p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-navy-200 hover:bg-white hover:shadow-lift">
                    <header className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-edge bg-navy-800 text-tech transition-transform duration-500 ease-out group-hover:-rotate-6">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[0.6875rem] tabular text-navy-300">{String(g.items.length).padStart(2, '0')}</span>
                    </header>
                    <h3 className="mt-5 text-[1.0625rem] font-semibold text-navy-800">{g.label}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {g.items.map((it) => (
                        <li key={it.en} className="group/item flex gap-3">
                          <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-signal/70 transition-transform duration-300 group-hover/item:scale-150" />
                          <span>
                            <span lang="hi" className="block text-[0.9688rem] font-medium leading-snug text-navy-800">
                              {it.hi}
                            </span>
                            <span className="block text-[0.8125rem] text-ink-muted">{it.en}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campus life */}
      <section ref={life} aria-labelledby="life-title" className="bg-canvas-soft py-20 sm:py-26">
        <div className="shell">
          <SectionHeading id="life-title" eyebrow="Campus life" title="Culture, sports and celebration." className="max-w-3xl" />
          <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] lg:grid-cols-4">
            {LIFE.map((p, i) => (
              <Photo
                key={p.src}
                photo={p}
                onOpen={() => setOpen(i)}
                ratio="auto"
                className={cn((i === 0 || i === 3) && 'col-span-2', i === 0 && 'row-span-2')}
                sizes={i === 0 || i === 3 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Industrial visits */}
      <section ref={visits} aria-labelledby="visits-title" className="relative overflow-hidden bg-navy-800 py-20 sm:py-26">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />
        <div className="shell relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading id="visits-title" tone="dark" eyebrow="Industrial visits" title={<span lang="hi">{content.visitsHi}</span>} />
            <p className="reveal max-w-sm text-[0.9375rem] leading-relaxed text-navy-100/75" style={{ '--reveal-delay': '120ms' }}>
              Industry Visit is one of the nine teaching methods — from the MOIL site at Tirodi to a power house.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {VISITS.map((p, i) => (
              <Photo
                key={p.src}
                photo={p}
                onOpen={() => setOpen(LIFE.length + i)}
                ratio="4/3"
                sizes="(min-width: 768px) 33vw, 100vw"
                delay={i * 90}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The activities board */}
      <section ref={board} aria-labelledby="board-title" className="bg-white py-20 sm:py-26">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              id="board-title"
              eyebrow="The activities board"
              title="In the news, on the board."
              lede="Newspaper coverage of institute events and photographs from industrial visits, as pinned on the Satpuda ITI activities board."
            />
            <Link
              to={news.to}
              className="reveal group mt-8 inline-flex min-h-[2.75rem] items-center gap-2 text-[0.9375rem] font-semibold text-navy-800 transition-colors hover:text-signal"
              style={{ '--reveal-delay': '180ms' }}
            >
              Read the headlines
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </div>
          <Photo photo={BOARD} onOpen={() => setOpen(ALL.length - 1)} ratio={BOARD.ratio} className="lg:col-span-8" sizes="(min-width: 1024px) 60vw, 100vw" delay={120} />
        </div>
      </section>

      <Lightbox items={ALL} index={open} onIndex={setOpen} onClose={() => setOpen(null)} label="Activities photographs" />
      <ActivityNext page={page} />
    </>
  );
}

export default Activities;

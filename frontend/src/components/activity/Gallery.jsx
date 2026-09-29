import { useMemo, useState } from 'react';
import { ZoomIn } from 'lucide-react';

import ActivityHero from './ActivityHero';
import ActivityNext from './ActivityNext';
import Lightbox from '../ui/Lightbox';
import SegmentedControl from '../ui/SegmentedControl';
import useReveal from '../../hooks/useReveal';
import { galleryGroups, galleryPhotos, photos } from '../../data/media';

/**
 * Gallery — the institute's own photographs.
 *
 * A group filter over a masonry of every photograph at its own proportions;
 * after a filter change the tiles settle back in one after another. Any tile
 * opens the viewer, which steps through the photographs currently shown.
 */

const FAN = [photos.garraWorkshop, photos.moilVisit, photos.culturalDance];

/** Hero instrument: three photographs fanned like prints; they spread on hover. */
function Fan() {
  return (
    <div className="group relative mx-auto aspect-[5/4] w-full max-w-md">
      {FAN.map((p, i) => (
        <div
          key={p.src}
          className={[
            'absolute w-[62%] overflow-hidden rounded-panel border-4 border-white bg-white shadow-lift transition-transform duration-700 ease-out',
            i === 0 && 'left-0 top-[8%] -rotate-6 group-hover:-translate-x-3 group-hover:-rotate-[9deg]',
            i === 1 && 'left-[19%] top-0 z-10 rotate-1 group-hover:-translate-y-2',
            i === 2 && 'right-0 top-[14%] rotate-6 group-hover:translate-x-3 group-hover:rotate-[9deg]',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <img src={p.src} alt="" aria-hidden="true" className="aspect-[4/3] h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

export function Gallery({ page }) {
  const [group, setGroup] = useState('all');
  const [open, setOpen] = useState(null);
  const grid = useReveal({ threshold: 0.02 });

  const shown = useMemo(() => (group === 'all' ? galleryPhotos : galleryPhotos.filter((p) => p.group === group)), [group]);
  const options = useMemo(
    () => [
      { id: 'all', label: 'All', count: galleryPhotos.length },
      ...galleryGroups.map((g) => ({ ...g, count: galleryPhotos.filter((p) => p.group === g.id).length })),
    ],
    []
  );

  return (
    <>
      <ActivityHero
        page={page}
        eyebrow="Photographs"
        lines={[
          <>
            Gallery<span className="text-signal">.</span>
          </>,
          <span className="text-royal">Life at Satpuda ITIs.</span>,
        ]}
        lede="Workshops and practicals, classrooms and sessions, industrial visits and campus life — photographs from Satpuda ITI campuses."
        aside={<Fan />}
      />

      <section ref={grid} aria-labelledby="gallery-title" className="bg-white py-16 sm:py-20">
        <div className="shell">
          <h2 id="gallery-title" className="sr-only">
            Photographs
          </h2>
          <div className="reveal flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SegmentedControl options={options} value={group} onChange={setGroup} label="Filter photographs" />
            <p aria-live="polite" className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">
              Showing <span className="tabular text-navy-800">{shown.length}</span> photographs
            </p>
          </div>

          <ul key={group} className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
            {shown.map((p, i) => (
              <li key={p.key} className="about-enter break-inside-avoid" style={{ '--i': Math.min(i, 12) }}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`View photo: ${p.alt}`}
                  className="group relative block w-full overflow-hidden rounded-panel bg-navy-50 text-left"
                  style={{ aspectRatio: p.ratio }}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 bottom-4 flex translate-y-2 items-end justify-between gap-3 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                  >
                    <span className="text-[0.8125rem] leading-snug text-white">{p.alt}</span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-navy-800">
                      <ZoomIn className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Lightbox items={shown} index={open} onIndex={setOpen} onClose={() => setOpen(null)} label="Gallery photographs" />
      <ActivityNext page={page} />
    </>
  );
}

export default Gallery;

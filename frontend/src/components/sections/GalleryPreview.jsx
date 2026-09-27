import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionHeading from '../ui/SectionHeading';
import Figure from '../ui/Figure';
import { galleryPreview } from '../../data/media';
import { institute } from '../../data/satpudaData';
import useReveal from '../../hooks/useReveal';

/**
 * Gallery preview — editorial mosaic.
 *
 * The spans are chosen so the eight photographs tile a 4×3 grid exactly at
 * `lg` and above: wide frames take two columns, the one portrait frame takes
 * two rows, and every cell is filled. Narrower breakpoints reflow into two
 * columns where the same spans cannot tile perfectly, so `grid-flow-dense`
 * backfills rather than leaving gaps.
 *
 * Span order follows the photograph's own shape, so nothing is badly cropped.
 */
const SPANS = [
  'col-span-2', // campus panorama — wide
  'col-span-1', // garra workshop
  'col-span-1 row-span-2', // students-02 — the one portrait frame
  'col-span-1', // classroom
  'col-span-2', // practical workshop — wide
  'col-span-1', // practical training
  'col-span-2', // students-01 — wide
  'col-span-1', // students-03
];

export function GalleryPreview() {
  const ref = useReveal();

  return (
    <section
      id="gallery"
      ref={ref}
      aria-labelledby="gallery-title"
      className="relative bg-canvas-soft py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="07"
            eyebrow="Gallery"
            title="Life on campus."
            lede={institute.excellenceNote}
            className="max-w-2xl"
          />
          <Link
            to="/gallery"
            className="reveal group inline-flex shrink-0 items-center gap-2.5 self-start border-b border-navy-300 pb-1.5 font-medium tracking-tight text-navy-800 transition-colors duration-200 hover:border-signal hover:text-signal lg:self-auto"
          >
            View full gallery
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={2}
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <ul className="mt-14 grid grid-flow-row-dense auto-rows-[8.5rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:gap-4 lg:grid-cols-4 xl:auto-rows-[12.5rem]">
          {galleryPreview.map((photo, i) => (
            <li
              key={photo.src}
              className={`reveal ${SPANS[i] ?? 'col-span-1'}`}
              style={{ '--reveal-delay': `${i * 55}ms` }}
            >
              <Figure
                src={photo.src}
                alt={photo.alt}
                ratio="auto"
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="group h-full rounded-panel"
                imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-navy-900/0 transition-colors duration-500 group-hover:bg-navy-900/25"
                />
              </Figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default GalleryPreview;

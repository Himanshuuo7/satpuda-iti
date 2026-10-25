import { useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Expand, Images } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import Lightbox from '../ui/Lightbox';
import Odometer from '../ui/Odometer';
import useRevealEach from '../../hooks/useRevealEach';
import useTilt from '../../hooks/useTilt';
import cn from '../../utils/cn';

/**
 * Campus Gallery — only photographs of this campus: the ones its campus page
 * publishes, or the ones the institute supplied (`credit`). Each opens in
 * the shared full-screen viewer.
 *
 * Layout: a bento grid in which every fifth photograph is a feature tile,
 * features alternating sides. Where the photographs carry albums, a filter
 * above the grid narrows them; the tiles glide to their new places (View
 * Transitions, where supported) and the outlined count rolls to the new
 * total.
 *
 * Motion: tiles wipe open in turn as they reach the viewport. On a fine
 * pointer a tile tilts toward the cursor under a moving glare, the
 * photograph pushes in and warms, corner brackets close on the frame, the
 * index and album chips drop in, the caption rises, and a red "View" disc
 * follows the pointer across the grid. Keyboard focus gets the same frame.
 * All of it settles to still under reduced motion.
 */

const ALL = 'All';

const pad = (n) => String(n).padStart(2, '0');
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Where a tile sits in the current view. Photographs come in blocks of five:
 * a feature (alternating sides on desktop) and up to four tiles beside it.
 * A short last block stretches its tiles so the block is still a rectangle;
 * `wide` marks a tile that spans the full width of a phone.
 */
const isFeature = (pos) => pos % 5 === 0;
function tileLayout(pos, total) {
  const start = pos - (pos % 5);
  if (isFeature(pos)) {
    const alone = total - start === 1;
    return {
      wide: true,
      className: cn(
        'col-span-2 lg:row-span-2',
        alone ? 'lg:col-span-12' : 'lg:col-span-6',
        !alone && Math.floor(pos / 5) % 2 === 1 && 'lg:col-start-7'
      ),
    };
  }
  const beside = Math.min(4, total - start - 1);
  const nth = (pos % 5) - 1;
  if (beside === 1) return { wide: true, className: 'col-span-2 lg:col-span-6 lg:row-span-2' };
  if (beside === 2) return { wide: false, className: 'lg:col-span-3 lg:row-span-2' };
  if (beside === 3 && nth === 2) return { wide: true, className: 'col-span-2 lg:col-span-6' };
  return { wide: false, className: 'lg:col-span-3' };
}

function Tile({ photo, pos, total, hidden, onOpen }) {
  const tiltRef = useTilt(4);
  const { className: layout, wide } = tileLayout(pos, total);

  // The layout classes change with the filter, so the reveal lives on an
  // inner box whose class React never rewrites (it would drop `is-visible`).
  return (
    <li hidden={hidden} className={layout} style={{ viewTransitionName: `itg-${photo.key}` }}>
      <div className="reveal h-full" style={{ '--reveal-delay': `${80 + (pos % 5) * 90}ms` }}>
        <button
          ref={tiltRef}
          type="button"
          onClick={onOpen}
          className={cn(
            'itg-tile iti-tilt iti-wipe group relative block w-full overflow-hidden rounded-panel bg-navy-900 text-left shadow-card outline-none focus-visible:ring-2 focus-visible:ring-tech focus-visible:ring-offset-2 lg:h-full',
            wide ? 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto' : 'aspect-[4/3] lg:aspect-auto'
          )}
        >
          <img
            src={photo.thumb ?? photo.src}
            srcSet={photo.thumb ? `${photo.thumb} 900w, ${photo.src} 1600w` : undefined}
            sizes={wide ? '(min-width: 1024px) 640px, 92vw' : '(min-width: 1024px) 320px, 46vw'}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="itg-img absolute inset-0 h-full w-full object-cover"
          />
          <span data-glare aria-hidden="true" className="iti-glare pointer-events-none absolute inset-0" />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,11,23,0.45)_0%,transparent_28%,transparent_50%,rgba(3,11,23,0.82)_100%)]"
          />

          {/* Corner brackets close on the frame */}
          <span aria-hidden="true" className="itg-corner absolute left-2 top-2 h-7 w-7 border-l-2 border-t-2 border-tech" />
          <span aria-hidden="true" className="itg-corner absolute bottom-2 right-2 h-7 w-7 border-b-2 border-r-2 border-signal" />

          <span aria-hidden="true" className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 sm:p-4">
            <span className="itg-chip shrink-0 rounded-sharp bg-navy-900/70 px-2 py-1 font-mono text-[0.625rem] tabular tracking-[0.12em] text-white backdrop-blur-sm">
              {pad(pos + 1)} / {pad(total)}
            </span>
            {photo.album && (
              <span
                className={cn(
                  'itg-chip rounded-sharp bg-white/90 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-navy-800 [transition-delay:60ms]',
                  // A half-width phone tile has room for the index only.
                  !wide && 'hidden sm:inline-block'
                )}
              >
                {photo.album}
              </span>
            )}
          </span>

          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 overflow-hidden">
            <span
              lang="hi"
              className={cn(
                // Top padding keeps the Devanagari marks inside the box that slides away.
                'iti-caption block px-4 pb-4 pr-16 pt-3 leading-snug text-white',
                wide ? 'text-[0.9375rem] sm:text-[1.0625rem]' : 'text-[0.8125rem]'
              )}
            >
              {photo.alt}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-3.5 right-3.5 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy-800 shadow-card"
          >
            <Expand className="iti-expand h-4 w-4" strokeWidth={2} />
          </span>
          <span className="sr-only">
            Open photo {pos + 1} of {total}
          </span>
        </button>
      </div>
    </li>
  );
}

/** Album switch: one navy pill slides under whichever album is chosen. */
function AlbumFilter({ albums, counts, value, onChange }) {
  const groupRef = useRef(null);
  const pillRef = useRef(null);

  useLayoutEffect(() => {
    const group = groupRef.current;
    const pill = pillRef.current;
    if (!group || !pill) return undefined;
    const place = () => {
      const active = group.querySelector('[aria-pressed="true"]');
      if (!active) return;
      pill.style.setProperty('--x', `${active.offsetLeft}px`);
      pill.style.setProperty('--w', `${active.offsetWidth}px`);
      active.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    };
    place();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(place);
    ro.observe(group);
    return () => ro.disconnect();
  }, [value]);

  return (
    <div className="-mx-1 max-w-full overflow-x-auto px-1 py-1 [scrollbar-width:none]">
      <div
        ref={groupRef}
        role="group"
        aria-label="Filter photos by album"
        className="relative inline-flex rounded-full border border-navy-100 bg-white p-1 shadow-card"
      >
        <span ref={pillRef} aria-hidden="true" className="sec-indicator absolute inset-y-1 left-0 rounded-full bg-navy-800" />
        {albums.map((a) => {
          const on = a === value;
          return (
            <button
              key={a}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(a)}
              className={cn(
                'relative z-10 inline-flex min-h-[2.5rem] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-[0.8125rem] font-semibold transition-colors duration-300',
                on ? 'text-white' : 'text-ink-muted hover:text-navy-800'
              )}
            >
              {a}
              <span className={cn('font-mono text-[0.625rem] tabular', on ? 'text-tech' : 'text-ink-soft')}>{counts[a]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ItiGallery({ inst, id }) {
  const ref = useRevealEach();
  const gridRef = useRef(null);
  const cursorRef = useRef(null);
  const frame = useRef(0);
  const [album, setAlbum] = useState(ALL);
  const [open, setOpen] = useState(null);

  const photos = inst.gallery.map((p, key) => ({ ...p, key }));
  const albums = [ALL, ...new Set(photos.map((p) => p.album).filter(Boolean))];
  const counts = Object.fromEntries(albums.map((a) => [a, a === ALL ? photos.length : photos.filter((p) => p.album === a).length]));
  const shown = album === ALL ? photos : photos.filter((p) => p.album === album);
  const position = new Map(shown.map((p, i) => [p.key, i]));
  const supplied = photos.some((p) => p.credit);

  /** Filters glide where the browser can animate the change; elsewhere they switch. */
  const choose = (next) => {
    if (next === album) return;
    const apply = () => setAlbum(next);
    if (document.startViewTransition && !prefersReducedMotion()) document.startViewTransition(() => flushSync(apply));
    else apply();
  };

  /* The "View" disc: follows a mouse across the grid, shown over a tile. */
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const grid = gridRef.current;
    const cursor = cursorRef.current;
    if (!grid || !cursor) return;
    const r = grid.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const over = Boolean(e.target.closest?.('.itg-tile'));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (over) cursor.dataset.on = '';
      else delete cursor.dataset.on;
    });
  };
  const onPointerLeave = () => {
    cancelAnimationFrame(frame.current);
    if (cursorRef.current) delete cursorRef.current.dataset.on;
  };

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby="iti-gallery-title"
      className="relative scroll-mt-[calc(var(--navbar-h-scrolled)+4.5rem)] overflow-hidden bg-canvas py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 blueprint-light [mask-image:radial-gradient(55%_45%_at_0%_0%,#000_10%,transparent_75%)]"
      />

      <div className="shell relative">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="iti-gallery-title"
            eyebrow="Gallery"
            title="Campus Gallery"
            className="lg:col-span-8"
            lede={
              <span lang="hi">
                {inst.galleryIntro ?? `${inst.namePlace} कैंपस के जीवन की झलक — कक्षाएँ और प्रोजेक्ट, खेल, उत्सव और साथ बिताए पल।`}{' '}
                {supplied
                  ? 'ये तस्वीरें संस्थान ने स्वयं उपलब्ध कराई हैं।'
                  : 'ये तस्वीरें संस्थान की आधिकारिक वेबसाइट पर प्रकाशित हैं।'}
              </span>
            }
          />

          {/* The count, as an outlined numeral that rolls when the album changes */}
          <div className="reveal flex items-end gap-4 lg:col-span-4 lg:justify-end" style={{ '--reveal-delay': '160ms' }}>
            <p
              aria-hidden="true"
              className="font-display text-[clamp(4.5rem,3rem+5vw,7.5rem)] font-bold leading-[0.85] tracking-[-0.05em] text-transparent tabular [-webkit-text-stroke:2px_theme(colors.royal.DEFAULT)]"
            >
              <Odometer value={pad(shown.length)} />
            </p>
            <p className="pb-2 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
              <span className="sr-only">{shown.length} </span>
              Photographs
              <br />
              {album !== ALL ? album : albums.length > 2 ? `${albums.length - 1} albums` : 'On campus'}
            </p>
          </div>
        </div>

        {albums.length > 2 && (
          <div className="reveal mt-10" style={{ '--reveal-delay': '200ms' }}>
            <AlbumFilter albums={albums} counts={counts} value={album} onChange={choose} />
          </div>
        )}

        <div ref={gridRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="relative mt-8">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-flow-dense lg:auto-rows-[11.5rem] lg:grid-cols-12">
            {photos.map((photo) => {
              const pos = position.get(photo.key);
              return (
                <Tile
                  key={photo.key}
                  photo={photo}
                  pos={pos ?? 0}
                  total={shown.length}
                  hidden={pos === undefined}
                  onOpen={() => setOpen(pos)}
                />
              );
            })}
          </ul>

          <span
            ref={cursorRef}
            aria-hidden="true"
            className="itg-cursor pointer-events-none absolute left-0 top-0 z-20 -ml-10 -mt-10 grid h-20 w-20 place-items-center rounded-full bg-signal font-mono text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_-10px_rgba(224,27,36,0.7)]"
          >
            View
          </span>
        </div>

        <div className="reveal mt-10 flex flex-col gap-5 border-t border-navy-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p lang="hi" className="max-w-2xl border-l border-tech/50 pl-5 text-[0.875rem] leading-[1.7] text-ink-muted">
            किसी भी तस्वीर पर क्लिक करके उसे बड़े आकार में देखें — कीबोर्ड के तीर या स्वाइप से अगली और पिछली तस्वीर पर जाएँ।
          </p>
          <button
            type="button"
            onClick={() => setOpen(0)}
            className="group inline-flex min-h-[2.875rem] shrink-0 items-center gap-2.5 self-start rounded-edge bg-navy-800 px-5 text-[0.875rem] font-semibold text-white transition-[background-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:bg-signal active:translate-y-px sm:self-auto"
          >
            <Images aria-hidden="true" className="h-4 w-4 transition-transform duration-300 ease-out group-hover:rotate-[-8deg]" strokeWidth={2} />
            View all {shown.length} photos
          </button>
        </div>
      </div>

      <Lightbox
        items={shown}
        index={open}
        onIndex={setOpen}
        onClose={() => setOpen(null)}
        label={`${inst.name} campus photographs`}
      />
    </section>
  );
}

export default ItiGallery;

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, Dices, Expand, MapPin } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import ActivityHero from './ActivityHero';
import ActivityNext from './ActivityNext';
import Lightbox from '../ui/Lightbox';
import Odometer from '../ui/Odometer';
import SegmentedControl from '../ui/SegmentedControl';
import useTilt from '../../hooks/useTilt';
import cn from '../../utils/cn';
import { ARCHIVE_THEMES, archiveCampuses, archivePhotos, themeLabel } from '../../data/photoArchive';

/**
 * Gallery — every campus photograph on the site in one archive
 * (photoArchive.js): the website's own gallery and each ITI page's gallery.
 *
 * The hero's deck of prints deals one photograph per campus, the top print
 * flying off as the next steps up (paused under the pointer, still under
 * reduced motion). Below, a rail of campuses — each with its own photograph
 * and count — and a row of themes filter the archive; both are kept in the
 * URL (`?campus=seoni&theme=celebrations`) so a view can be shared. The grid
 * is a bento rhythm in which every tile names its campus: tiles rise in as
 * they reach the viewport while a navy curtain lifts off the photograph, and
 * under a fine pointer they tilt under a glare with a red "View" disc
 * following the cursor. The archive is read a page at a time; "Surprise me"
 * opens a photograph at random. Any tile opens the viewer, which steps
 * through every photograph of the current view.
 */

const ALL = 'all';
const PAGE = 24;
const SHUFFLE_MS = 3600;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const campusById = Object.fromEntries(archiveCampuses.map((c) => [c.id, c]));
const withMeta = (p) => ({ ...p, meta: `${p.place} · ${themeLabel[p.theme]}` });
const CAMPUS_COUNT = archiveCampuses.filter((c) => c.path).length;
const THEME_COUNT = new Set(archivePhotos.map((p) => p.theme)).size;

/** The hero's deck: each campus's first photograph, in archive order. */
const DECK = archiveCampuses.map((c) => withMeta(archivePhotos.find((p) => p.campus === c.id)));

/**
 * The grid's rhythm, ten tiles long: a feature, tall and wide tiles among
 * squares. `wide` marks the tiles that span two columns, for `sizes`.
 */
const RHYTHM = [
  { span: 'col-span-2 row-span-2', wide: true },
  {},
  {},
  { span: 'row-span-2' },
  {},
  {},
  { span: 'col-span-2', wide: true },
  {},
  { span: 'row-span-2' },
  {},
];

/* --------------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------------ */

/** Figures that roll up from zero once the hero has settled. */
function HeroStats() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 500);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { value: archivePhotos.length, label: 'Photographs' },
    { value: CAMPUS_COUNT, label: 'Campuses' },
    { value: THEME_COUNT, label: 'Themes' },
  ];

  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-5">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse">
          <dt className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">{s.label}</dt>
          <dd className="font-display text-[2.25rem] font-bold leading-none tracking-[-0.03em] tabular text-navy-800 sm:text-[2.75rem]">
            <span className="sr-only">{s.value}</span>
            <Odometer value={on ? String(s.value) : String(s.value).replace(/\d/g, '0')} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * A deck of prints, one per campus. Every few seconds the top print flies off
 * and the rest step up; a hairline under the deck runs down the time to the
 * next deal. The top print opens in the viewer.
 */
function PhotoDeck({ onOpen }) {
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      if (!document.hidden) setStart((s) => s + 1);
    }, SHUFFLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const at = (n) => DECK[((n % DECK.length) + DECK.length) % DECK.length];
  const top = at(start);

  return (
    <div
      className="pa-deck relative mx-auto w-full max-w-md"
      data-paused={paused ? '' : undefined}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ '--pa-shuffle': `${SHUFFLE_MS}ms` }}
    >
      <div className="relative aspect-[5/4]">
        {[-1, 0, 1, 2].map((pos) => {
          const n = start + pos;
          const photo = at(n);
          const front = pos === 0;
          return (
            <button
              key={n}
              type="button"
              data-pos={pos}
              tabIndex={front ? 0 : -1}
              aria-hidden={front ? undefined : true}
              onClick={() => front && onOpen(((n % DECK.length) + DECK.length) % DECK.length)}
              className="pa-card absolute inset-x-[7%] bottom-[9%] top-[5%] overflow-hidden rounded-panel border-[5px] border-white bg-white text-left shadow-lift outline-none focus-visible:ring-2 focus-visible:ring-tech focus-visible:ring-offset-4"
            >
              <img src={photo.thumb ?? photo.src} alt="" decoding="async" className="h-full w-full object-cover" />
              {front && <span className="sr-only">Open photo: {photo.alt}</span>}
            </button>
          );
        })}
      </div>

      <div className="relative z-10 -mt-1 flex items-center justify-between gap-3 px-[7%]">
        <p key={start} className="pa-deck-label flex min-w-0 items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-navy-800">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-signal" strokeWidth={2} />
          <span className="truncate">{top.meta}</span>
        </p>
        <span aria-hidden="true" className="h-px w-16 shrink-0 overflow-hidden bg-navy-100">
          <span key={start} className="pa-timer block h-full bg-signal" />
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Filters
 * ------------------------------------------------------------------------ */

/**
 * The campus rail: a radio group of campus chips, each with its own
 * photograph and count, a navy pill sliding under the chosen one. Arrow keys
 * move the choice; the rail scrolls sideways on narrow screens.
 */
function CampusRail({ value, onChange }) {
  const listRef = useRef(null);
  const pillRef = useRef(null);
  const options = [
    { id: ALL, place: 'All campuses', count: archivePhotos.length, covers: archiveCampuses.slice(0, 3).map((c) => c.cover) },
    ...archiveCampuses,
  ];

  useLayoutEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return undefined;
    const place = () => {
      const active = list.querySelector('[aria-checked="true"]');
      if (!active) return;
      pill.style.setProperty('--x', `${active.offsetLeft}px`);
      pill.style.setProperty('--w', `${active.offsetWidth}px`);
      pill.style.opacity = '1';
    };
    place();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(place) : null;
    ro?.observe(list);
    document.fonts?.ready.then(place);
    return () => ro?.disconnect();
  }, [value]);

  // Keep the chosen chip in view when it changes from the keyboard or the URL.
  useEffect(() => {
    const active = listRef.current?.querySelector('[aria-checked="true"]');
    const rail = listRef.current?.parentElement;
    if (!active || !rail) return;
    const left = active.offsetLeft - (rail.clientWidth - active.offsetWidth) / 2;
    rail.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [value]);

  const onKeyDown = (e) => {
    const i = options.findIndex((o) => o.id === value);
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = options[(i + step + options.length) % options.length];
    onChange(next.id);
    listRef.current?.querySelector(`[data-id="${next.id}"]`)?.focus();
  };

  return (
    <div className="-mx-[var(--shell-pad)] overflow-x-auto px-[var(--shell-pad)] py-1 [mask-image:linear-gradient(90deg,transparent,#000_var(--shell-pad),#000_calc(100%-var(--shell-pad)),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        ref={listRef}
        role="radiogroup"
        aria-label="Filter photographs by campus"
        onKeyDown={onKeyDown}
        className="relative inline-flex min-w-max gap-1 rounded-full border border-navy-100 bg-white p-1.5 shadow-card"
      >
        <span
          ref={pillRef}
          aria-hidden="true"
          className="sec-indicator pointer-events-none absolute inset-y-1.5 left-0 rounded-full bg-navy-800 opacity-0 shadow-card"
        />
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              data-id={o.id}
              onClick={() => onChange(o.id)}
              className={cn(
                'pa-chip relative inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-full py-1 pl-1.5 pr-4 text-[0.8125rem] font-semibold transition-colors duration-300 active:scale-[0.97]',
                active ? 'text-white' : 'text-navy-800 hover:bg-canvas-soft'
              )}
            >
              {o.covers ? (
                <span aria-hidden="true" className="flex -space-x-3">
                  {o.covers.map((src) => (
                    <img key={src} src={src} alt="" className="pa-avatar h-8 w-8 rounded-full object-cover ring-2 ring-white" />
                  ))}
                </span>
              ) : (
                <img
                  src={o.cover}
                  alt=""
                  aria-hidden="true"
                  className={cn('pa-avatar h-8 w-8 rounded-full object-cover ring-2', active ? 'ring-tech' : 'ring-white', !o.path && 'bg-white p-0.5')}
                />
              )}
              {o.place}
              <span className={cn('font-mono text-[0.625rem] tabular', active ? 'text-tech' : 'text-navy-300')}>{o.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Grid
 * ------------------------------------------------------------------------ */

function ArchiveTile({ photo, index, onOpen }) {
  const tiltRef = useTilt(4);
  const beat = RHYTHM[index % RHYTHM.length];

  return (
    <li data-pa-tile className={cn('pa-tile', beat.span)} style={{ '--d': `${(index % 4) * 80}ms` }}>
      <button
        ref={tiltRef}
        type="button"
        onClick={onOpen}
        className="itg-tile iti-tilt group relative block h-full w-full overflow-hidden rounded-panel bg-navy-900 text-left shadow-card outline-none focus-visible:ring-2 focus-visible:ring-tech focus-visible:ring-offset-2"
      >
        <img
          ref={(el) => {
            if (el?.complete) el.dataset.loaded = '';
          }}
          src={photo.thumb ?? photo.src}
          srcSet={photo.thumb ? `${photo.thumb} 900w, ${photo.src} 1600w` : undefined}
          sizes={beat.wide ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onLoad={(e) => {
            e.currentTarget.dataset.loaded = '';
          }}
          className="itg-img pa-img absolute inset-0 h-full w-full object-cover"
        />
        <span data-glare aria-hidden="true" className="iti-glare pointer-events-none absolute inset-0" />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,11,23,0.5)_0%,transparent_30%,transparent_52%,rgba(3,11,23,0.85)_100%)]"
        />
        {/* Lifts off the photograph as the tile rises in. */}
        <span aria-hidden="true" className="pa-curtain absolute inset-0 border-b-2 border-signal bg-navy-800" />

        <span aria-hidden="true" className="itg-corner absolute left-2 top-2 h-7 w-7 border-l-2 border-t-2 border-tech" />
        <span aria-hidden="true" className="itg-corner absolute bottom-2 right-2 h-7 w-7 border-b-2 border-r-2 border-signal" />

        <span aria-hidden="true" className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 sm:p-3.5">
          <span className="inline-flex min-w-0 items-center gap-1 rounded-sharp bg-navy-900/70 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            <MapPin className="h-3 w-3 shrink-0 text-signal" strokeWidth={2.25} />
            <span className="truncate">{photo.place}</span>
          </span>
          <span
            className={cn(
              'itg-chip shrink-0 rounded-sharp bg-white/90 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-navy-800 [transition-delay:60ms]',
              !beat.wide && 'hidden sm:inline-block'
            )}
          >
            {themeLabel[photo.theme]}
          </span>
        </span>

        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 overflow-hidden">
          <span
            lang="hi"
            className={cn(
              'iti-caption block px-4 pb-4 pr-16 pt-3 leading-snug text-white',
              beat.wide ? 'text-[0.9375rem] sm:text-[1.0625rem]' : 'text-[0.8125rem]'
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
          Open photo {index + 1}: {photo.alt} ({photo.place})
        </span>
      </button>
    </li>
  );
}

export function Gallery({ page }) {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(null);
  const [deckOpen, setDeckOpen] = useState(null);
  const [more, setMore] = useState({ key: '', n: PAGE });
  const [spin, setSpin] = useState(0);
  const gridRef = useRef(null);
  const cursorRef = useRef(null);
  const frame = useRef(0);

  const rawCampus = params.get('campus');
  const campus = rawCampus && campusById[rawCampus] ? rawCampus : ALL;
  const rawTheme = params.get('theme');

  const inCampus = useMemo(() => (campus === ALL ? archivePhotos : archivePhotos.filter((p) => p.campus === campus)), [campus]);
  const themeCounts = useMemo(() => {
    const counts = {};
    for (const p of inCampus) counts[p.theme] = (counts[p.theme] ?? 0) + 1;
    return counts;
  }, [inCampus]);
  // A theme this campus has no photographs of falls back to all of them.
  const theme = rawTheme && themeCounts[rawTheme] ? rawTheme : ALL;

  const list = useMemo(() => (theme === ALL ? inCampus : inCampus.filter((p) => p.theme === theme)), [inCampus, theme]);
  const items = useMemo(() => list.map(withMeta), [list]);
  const viewKey = `${campus}:${theme}`;
  const limit = more.key === viewKey ? more.n : PAGE;
  const visible = list.slice(0, limit);
  const remaining = list.length - visible.length;

  const themeOptions = [
    { id: ALL, label: 'All', count: inCampus.length },
    ...ARCHIVE_THEMES.filter((t) => themeCounts[t.id]).map((t) => ({ id: t.id, label: t.label, count: themeCounts[t.id] })),
  ];

  const setFilter = useCallback(
    (key, value) => {
      setParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (value === ALL) p.delete(key);
          else p.set(key, value);
          if (key === 'campus') p.delete('theme');
          return p;
        },
        { replace: true, preventScrollReset: true }
      );
    },
    [setParams]
  );

  /* Tiles rise in as they reach the viewport — the first page, each later
     page, and every new view. */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    const tiles = grid.querySelectorAll('[data-pa-tile]:not(.is-in)');
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      tiles.forEach((t) => t.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    tiles.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [viewKey, limit]);

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

  const surprise = () => {
    if (!list.length) return;
    let i = Math.floor(Math.random() * list.length);
    if (list.length > 1 && i === open) i = (i + 1) % list.length;
    setSpin((s) => s + 1);
    setOpen(i);
  };

  const campusName = campus === ALL ? null : campusById[campus].place;
  const nextPeek = list.slice(limit, limit + 3);

  return (
    <div className="pa-gallery">
      <ActivityHero
        page={page}
        eyebrow="Photographs"
        lines={[
          <>
            Gallery<span className="text-signal">.</span>
          </>,
          <span className="text-royal">Life at Satpuda ITIs.</span>,
        ]}
        lede={
          <span lang="hi">
            {CAMPUS_COUNT} कैंपस, {archivePhotos.length} तस्वीरें — वर्कशॉप और प्रैक्टिकल, प्लेसमेंट ड्राइव, औद्योगिक भ्रमण, उत्सव और
            कैंपस जीवन। हर तस्वीर पर उसके कैंपस का नाम है; किसी एक कैंपस या विषय की तस्वीरें चुनकर देखें।
          </span>
        }
        aside={<PhotoDeck onOpen={setDeckOpen} />}
      >
        <HeroStats />
      </ActivityHero>

      <section aria-labelledby="gallery-title" className="relative bg-white py-16 sm:py-20">
        <div className="shell">
          <h2 id="gallery-title" className="sr-only">
            Photographs
          </h2>

          <div className="flex flex-col gap-5">
            <div className="flex items-end justify-between gap-4">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">Campus</p>
              <button
                type="button"
                onClick={surprise}
                className="group inline-flex min-h-[2.75rem] shrink-0 items-center gap-2 rounded-full border border-navy-100 bg-white px-4 text-[0.8125rem] font-semibold text-navy-800 shadow-card transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-signal hover:bg-signal hover:text-white active:translate-y-px"
              >
                <Dices key={spin} aria-hidden="true" className={cn('h-4 w-4', spin > 0 && 'pa-dice-spin')} strokeWidth={2} />
                Surprise me
              </button>
            </div>
            <CampusRail value={campus} onChange={(v) => setFilter('campus', v)} />

            <div className="mt-2 flex items-end justify-between gap-4">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">Theme</p>
              <p aria-live="polite" className="flex min-w-0 items-baseline gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">
                <span className="sr-only">{list.length} photographs</span>
                <span aria-hidden="true" className="font-display text-[1.5rem] font-bold leading-none tracking-[-0.02em] tabular text-navy-800">
                  <Odometer value={String(list.length)} />
                </span>
                <span aria-hidden="true" className="truncate">
                  photographs{campusName && ` · ${campusName}`}
                  {theme !== ALL && ` · ${themeLabel[theme]}`}
                </span>
              </p>
            </div>
            <SegmentedControl options={themeOptions} value={theme} onChange={(v) => setFilter('theme', v)} label="Filter photographs by theme" />
          </div>

          <div ref={gridRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="relative mt-10">
            <ul
              key={viewKey}
              className="grid grid-flow-dense auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[12.5rem] lg:grid-cols-4"
            >
              {visible.map((p, i) => (
                <ArchiveTile key={p.key} photo={p} index={i} onOpen={() => setOpen(i)} />
              ))}
            </ul>

            <span
              ref={cursorRef}
              aria-hidden="true"
              className="itg-cursor pointer-events-none absolute left-0 top-0 z-20 -ml-10 -mt-10 grid h-20 w-20 place-items-center rounded-full bg-signal font-mono text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_-10px_rgba(224,27,36,0.7)]"
            >
              View
            </span>
          </div>

          {/* Progress through the view, and the next page */}
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <div aria-hidden="true" className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-navy-100">
              <span className="pa-progress block h-full rounded-full bg-signal" style={{ width: `${(visible.length / list.length) * 100}%` }} />
            </div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">
              <span className="tabular text-navy-800">{visible.length}</span> / <span className="tabular">{list.length}</span> photographs
            </p>
            {remaining > 0 ? (
              <button
                type="button"
                onClick={() => setMore({ key: viewKey, n: limit + PAGE })}
                className="pa-more group mt-1 inline-flex min-h-[3rem] items-center gap-3 rounded-full bg-navy-800 py-1.5 pl-2 pr-5 text-[0.875rem] font-semibold text-white shadow-card transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-signal active:translate-y-px"
              >
                <span aria-hidden="true" className="pa-peek flex -space-x-3">
                  {nextPeek.map((p) => (
                    <img key={p.key} src={p.thumb ?? p.src} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-navy-800 transition-[box-shadow] group-hover:ring-signal" />
                  ))}
                </span>
                Load {Math.min(PAGE, remaining)} more
                <ArrowDown aria-hidden="true" className="pa-bounce h-4 w-4" strokeWidth={2} />
              </button>
            ) : (
              list.length > PAGE && (
                <p lang="hi" className="text-[0.9375rem] text-ink-muted">
                  आपने इस चयन की सारी तस्वीरें देख लीं।
                </p>
              )
            )}
          </div>

          <p lang="hi" className="mx-auto mt-12 max-w-2xl border-t border-navy-100 pt-8 text-center text-[0.875rem] leading-[1.7] text-ink-muted">
            ये तस्वीरें Satpuda ITI की आधिकारिक वेबसाइट से और हर कैंपस द्वारा उपलब्ध कराई गई हैं। किसी भी तस्वीर पर क्लिक करके उसे बड़े
            आकार में देखें — कीबोर्ड के तीर या स्वाइप से अगली और पिछली तस्वीर पर जाएँ।
          </p>
        </div>
      </section>

      <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} label="Gallery photographs" />
      <Lightbox items={DECK} index={deckOpen} onIndex={setDeckOpen} onClose={() => setDeckOpen(null)} label="One photograph from each campus" />
      <ActivityNext page={page} />
    </div>
  );
}

export default Gallery;

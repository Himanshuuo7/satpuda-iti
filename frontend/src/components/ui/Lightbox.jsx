import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import cn from '../../utils/cn';

/**
 * Full-screen photo viewer in a native modal <dialog>.
 *
 * `showModal()` gives focus trapping, Escape-to-close and an inert page;
 * focus returns to whatever opened it. Arrow keys and a horizontal swipe step
 * through `items`; a tap on the backdrop closes. `index` is controlled —
 * null means closed.
 */
export function Lightbox({ items, index, onIndex, onClose, label = 'Photo viewer' }) {
  const ref = useRef(null);
  const returnFocus = useRef(null);
  const touch = useRef(null);
  const open = index !== null && index !== undefined;
  const many = items.length > 1;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocus.current = document.activeElement;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const step = (d) => onIndex((index + d + items.length) % items.length);

  const onKeyDown = (e) => {
    if (!many) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  const onTouchStart = (e) => {
    touch.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touch.current === null || !many) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
  };

  const item = open ? items[index] : null;

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={() => {
        onClose();
        returnFocus.current?.focus?.();
      }}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="sec-lightbox m-0 h-full max-h-none w-full max-w-none bg-transparent p-0"
    >
      {item && (
        <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-16 sm:px-20">
          <figure key={index} className="sec-lightbox-figure pointer-events-auto flex max-h-full max-w-full flex-col items-center">
            <img
              src={item.src}
              alt={item.alt}
              decoding="async"
              className="max-h-[calc(100svh-10rem)] w-auto max-w-full rounded-edge bg-navy-900 object-contain shadow-deep"
            />
            <figcaption className="mt-3 max-w-2xl text-center text-[0.875rem] leading-snug text-navy-100/85">
              {item.alt}
              {many && (
                <span className="ml-2 font-mono text-[0.6875rem] tabular text-navy-200/60">
                  {index + 1} / {items.length}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}

      <button
        type="button"
        onClick={() => ref.current.close()}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-navy-900/60 text-white transition-colors hover:border-signal hover:bg-signal"
      >
        <X aria-hidden="true" className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </button>

      {many && (
        <>
          {[
            { d: -1, Icon: ChevronLeft, label: 'Previous photo', side: 'left-2 sm:left-5' },
            { d: 1, Icon: ChevronRight, label: 'Next photo', side: 'right-2 sm:right-5' },
          ].map(({ d, Icon, label: l, side }) => (
            <button
              key={d}
              type="button"
              onClick={() => step(d)}
              className={cn(
                'group absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-navy-900/60 text-white transition-colors hover:border-tech hover:bg-white/10',
                side
              )}
            >
              <Icon
                aria-hidden="true"
                className={cn('h-5 w-5 transition-transform duration-300 ease-out', d < 0 ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5')}
              />
              <span className="sr-only">{l}</span>
            </button>
          ))}
        </>
      )}
    </dialog>
  );
}

export default Lightbox;

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import cn from '../../utils/cn';

/**
 * The institute page's chapters, pinned under the header.
 *
 * Only the sections this institute's page actually has are listed. As the
 * reader scrolls, the chapter in the middle band of the viewport is marked
 * current and the red indicator slides to it; a hairline along the bottom
 * shows how far through the page they are (CSS scroll timeline, so no script
 * runs per frame). On narrow screens the row scrolls sideways and keeps the
 * current chapter in view — without ever moving the page vertically.
 */
export function ItiChapterNav({ chapters }) {
  const [active, setActive] = useState(null);
  const listRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const visible = new Set();
    const order = chapters.map((c) => c.id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        setActive(order.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: '-38% 0px -58% 0px' }
    );
    order.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [chapters]);

  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return undefined;

    const place = () => {
      const current = list.querySelector('[aria-current]');
      if (!current) {
        indicator.style.opacity = '0';
        return;
      }
      indicator.style.opacity = '1';
      indicator.style.setProperty('--x', `${current.offsetLeft}px`);
      indicator.style.setProperty('--w', `${current.offsetWidth}px`);

      if (list.scrollWidth > list.clientWidth) {
        const left = current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        list.scrollTo({ left: Math.max(left, 0), behavior: reduced ? 'auto' : 'smooth' });
      }
    };

    place();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(place) : null;
    ro?.observe(list);
    document.fonts?.ready.then(place);
    return () => ro?.disconnect();
  }, [active]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[var(--navbar-h-scrolled)] z-30 border-b border-navy-100 bg-white/92 backdrop-blur-md"
    >
      <div className="shell">
        <ul
          ref={listRef}
          className="relative -mx-[var(--shell-pad)] flex items-stretch gap-1 overflow-x-auto px-[var(--shell-pad)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {chapters.map((c, i) => {
            const current = c.id === active;
            return (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  aria-current={current ? 'location' : undefined}
                  className={cn(
                    'group flex h-14 items-center gap-2 px-3 text-[0.875rem] font-medium tracking-tight transition-colors duration-200',
                    current ? 'text-navy-800' : 'text-ink-muted hover:text-navy-800'
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-[0.625rem] tabular transition-colors duration-200',
                      current ? 'text-signal' : 'text-navy-300 group-hover:text-signal'
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {c.label}
                </a>
              </li>
            );
          })}
          <li
            ref={indicatorRef}
            aria-hidden="true"
            className="sec-indicator pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-signal opacity-0"
          />
        </ul>
      </div>
      <span aria-hidden="true" className="iti-progress absolute inset-x-0 -bottom-px h-px bg-tech" />
    </nav>
  );
}

export default ItiChapterNav;

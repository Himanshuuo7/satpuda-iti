import { useLayoutEffect, useMemo, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import cn from '../../utils/cn';

/**
 * A section's sub-navigation (Placement, Training) — its own menu, pinned
 * under the header.
 *
 * It sits outside the routed page, so it stays mounted while the reader moves
 * between the section's pages and its red indicator slides from the old page
 * to the new one. On narrow screens the row scrolls sideways and the active
 * page is brought into view.
 */
export function SectionNav({ section }) {
  const items = useMemo(
    () => [
      // Only a section with an overview page gets an Overview tab.
      ...(section.overview ? [{ label: 'Overview', to: section.base, end: true }] : []),
      ...section.pages.map((p) => ({ label: p.short, to: p.to, index: p.index })),
    ],
    [section]
  );
  const { pathname } = useLocation();
  const listRef = useRef(null);
  const indicatorRef = useRef(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return undefined;

    const place = () => {
      const active = list.querySelector('[aria-current="page"]');
      if (!active) {
        indicator.style.opacity = '0';
        return;
      }
      indicator.style.opacity = '1';
      indicator.style.setProperty('--x', `${active.offsetLeft}px`);
      indicator.style.setProperty('--w', `${active.offsetWidth}px`);
    };

    place();

    // Bring the active page into view without moving the page vertically.
    const active = list.querySelector('[aria-current="page"]');
    if (active && list.scrollWidth > list.clientWidth) {
      const target = active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      list.scrollTo({ left: Math.max(target, 0), behavior: reduced ? 'auto' : 'smooth' });
    }

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(place) : null;
    ro?.observe(list);
    // Web fonts change label widths once they load.
    document.fonts?.ready.then(place);
    return () => ro?.disconnect();
  }, [pathname]);

  return (
    <nav
      aria-label={section.label}
      className="sticky top-[var(--navbar-h-scrolled)] z-30 border-b border-navy-100 bg-white/92 backdrop-blur-md"
    >
      <div className="shell">
        <ul
          ref={listRef}
          className="relative -mx-[var(--shell-pad)] flex items-stretch gap-1 overflow-x-auto px-[var(--shell-pad)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li key={item.to} className="shrink-0">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'group flex h-14 items-center gap-2 px-3 text-[0.875rem] font-medium tracking-tight transition-colors duration-200',
                    isActive ? 'text-navy-800' : 'text-ink-muted hover:text-navy-800'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.index && (
                      <span
                        className={cn(
                          'font-mono text-[0.625rem] tabular transition-colors duration-200',
                          isActive ? 'text-signal' : 'text-navy-300 group-hover:text-signal'
                        )}
                      >
                        {String(item.index).padStart(2, '0')}
                      </span>
                    )}
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li
            ref={indicatorRef}
            aria-hidden="true"
            className="sec-indicator pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-signal opacity-0"
          />
        </ul>
      </div>
    </nav>
  );
}

export default SectionNav;

import { useLayoutEffect, useRef } from 'react';

import cn from '../../utils/cn';

/**
 * A single-choice pill switch (radio group) whose navy pill slides to the
 * selected option. Arrow keys move the selection; only the selected option
 * is in the tab order. On narrow screens the row scrolls sideways.
 *
 * `options` is [{ id, label, count? }].
 */
export function SegmentedControl({ options, value, onChange, label }) {
  const listRef = useRef(null);
  const pillRef = useRef(null);

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
    <div className="-mx-[var(--shell-pad)] overflow-x-auto px-[var(--shell-pad)] [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
      <div
        ref={listRef}
        role="radiogroup"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="relative inline-flex min-w-max rounded-full border border-navy-100 bg-canvas-soft p-1"
      >
        <span
          ref={pillRef}
          aria-hidden="true"
          className="sec-indicator pointer-events-none absolute inset-y-1 left-0 rounded-full bg-navy-800 opacity-0 shadow-card"
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
                'relative inline-flex min-h-[2.5rem] items-center gap-1.5 rounded-full px-4 text-[0.8125rem] font-medium transition-colors duration-300 active:scale-[0.98]',
                active ? 'text-white' : 'text-ink-muted hover:text-navy-800'
              )}
            >
              {o.label}
              {o.count !== undefined && (
                <span className={cn('font-mono text-[0.625rem] tabular', active ? 'text-tech' : 'text-navy-300')}>{o.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SegmentedControl;

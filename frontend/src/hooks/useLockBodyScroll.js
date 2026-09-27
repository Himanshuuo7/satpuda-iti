import { useEffect } from 'react';

/**
 * Freezes background scrolling while an overlay (the mobile drawer) is open.
 *
 * Compensates for the disappearing scrollbar so the page behind does not shift
 * sideways, and restores whatever overflow value was there before.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}

export default useLockBodyScroll;

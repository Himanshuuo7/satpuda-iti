import { useEffect } from 'react';

import { lockPageScroll, unlockPageScroll } from '../utils/smoothScroll';

/**
 * Freezes background scrolling while an overlay (the mobile drawer, the photo
 * viewer) is open.
 *
 * Compensates for the disappearing scrollbar so the page behind does not shift
 * sideways, and restores whatever overflow value was there before. Scroll
 * anchoring is held off while locked and for a couple of frames after: the
 * browser would otherwise answer the overflow and padding changes by nudging
 * the page a few pixels.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { body, documentElement: root } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const previousAnchor = root.style.overflowAnchor;
    const gap = window.innerWidth - root.clientWidth;

    root.style.overflowAnchor = 'none';
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    // The smooth scroller drives the window itself, so it must pause too.
    lockPageScroll();

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      unlockPageScroll();
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          root.style.overflowAnchor = previousAnchor;
        })
      );
    };
  }, [locked]);
}

export default useLockBodyScroll;

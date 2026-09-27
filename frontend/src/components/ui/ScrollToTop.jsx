import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores scroll position on navigation.
 *
 * A hash target is honoured by scrolling to that element; otherwise the new
 * route starts at the top. Because the homepage is code-split, a hash target
 * usually does not exist yet on the first effect pass, so the lookup is retried
 * for a few frames before giving up rather than silently landing at the top.
 */
const MAX_ATTEMPTS = 40; // ~650ms at 60fps

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }

    let frame = 0;
    let attempts = 0;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tryScroll = () => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({
          behavior: reduced ? 'instant' : 'smooth',
          block: 'start',
        });
        return;
      }
      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        frame = requestAnimationFrame(tryScroll);
      }
    };

    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;

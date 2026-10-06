import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { scrollToTarget, startSmoothScroll } from '../../utils/smoothScroll';

/**
 * Owns page scrolling: starts the smooth scroller and restores position on
 * navigation.
 *
 * A hash target is honoured by scrolling to that element; otherwise the new
 * route starts at the top. Because the homepage is code-split, a hash target
 * usually does not exist yet on the first effect pass, so the lookup is retried
 * for a few frames before giving up rather than silently landing at the top.
 *
 * Within a page the jump glides; arriving from another page it lands directly,
 * since an animation from wherever the previous page was left means nothing.
 */
const MAX_ATTEMPTS = 40; // ~650ms at 60fps

export function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navigate = useNavigate();
  const lastPath = useRef(pathname);
  // Clicking the same `#section` link twice is a new navigation with the same
  // hash — keying on it scrolls again. Without a hash the key is ignored, so
  // query-string updates never throw the page back to the top.
  const hashNavigation = hash ? key : '';

  useEffect(() => startSmoothScroll(), []);

  // Plain `<a href="#section">` links would make the browser jump natively.
  // Route them through the router instead so they share the smooth path above
  // and still land in history. The skip link keeps its native behaviour.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      if (!link || link.target || link.hasAttribute('download')) return;
      const href = link.getAttribute('href');
      if (href === '#' || href === '#main') return;
      e.preventDefault();
      navigate({ hash: href });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  useEffect(() => {
    const samePage = lastPath.current === pathname;
    lastPath.current = pathname;

    if (!hash) {
      scrollToTarget(0, { immediate: true });
      return undefined;
    }

    let frame = 0;
    let attempts = 0;

    // By id rather than `querySelector`, which throws on hashes that are not
    // valid selectors (e.g. `#1st-year`).
    const id = decodeURIComponent(hash.slice(1));

    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        scrollToTarget(target, { immediate: !samePage });
        return;
      }
      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        frame = requestAnimationFrame(tryScroll);
      }
    };

    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, hashNavigation]);

  return null;
}

export default ScrollToTop;

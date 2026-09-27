import { useEffect, useRef } from 'react';

/**
 * Writes how far the viewport has travelled through an element to a
 * `--progress` custom property (0 → 1), measured against a line `anchor` of the
 * way down the viewport.
 *
 * Nothing re-renders: the value goes straight onto the node, reads are
 * throttled to animation frames, and the listener is only attached while the
 * element is near the viewport. Under reduced motion the value is pinned to 1.
 */
export function useScrollProgress({ anchor = 0.6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.setProperty('--progress', '1');
      return undefined;
    }

    let frame = 0;
    const read = () => {
      frame = 0;
      const r = node.getBoundingClientRect();
      const line = window.innerHeight * anchor;
      const p = Math.min(Math.max((line - r.top) / r.height, 0), 1);
      node.style.setProperty('--progress', p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    let attached = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !attached) {
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll, { passive: true });
          attached = true;
          read();
        } else if (!entry.isIntersecting && attached) {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
          attached = false;
          read();
        }
      },
      { rootMargin: '25% 0px 25% 0px' }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [anchor]);

  return ref;
}

export default useScrollProgress;

import { useEffect, useState } from 'react';

/**
 * Tracks whether the page has scrolled past a threshold, for the navbar's
 * transparent-to-solid transition. Reads are throttled to animation frames so
 * the scroll handler never blocks.
 */
export function useScrollState(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

export default useScrollState;

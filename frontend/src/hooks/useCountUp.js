import { useEffect, useRef, useState } from 'react';

/**
 * Counts a verified figure up once, when it first scrolls into view.
 *
 * Used only where the number itself is the content (the impact strip). Anyone
 * with reduced motion enabled sees the final value immediately, and the value
 * is always the real published figure — never an animated approximation left
 * hanging if the observer misfires.
 */
export function useCountUp(target, { duration = 1600 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setValue(target);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done.current) return;
          done.current = true;
          observer.unobserve(entry.target);

          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // Exponential ease-out: quick commit, long settle.
            const eased = 1 - Math.pow(1 - progress, 4);
            setValue(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(step);
            else setValue(target);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, value];
}

export default useCountUp;

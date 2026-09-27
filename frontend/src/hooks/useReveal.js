import { useEffect, useRef } from 'react';

/**
 * Scroll reveal via IntersectionObserver.
 *
 * Deliberately quiet: a single short rise used as supporting motion so the
 * hero keeps ownership of the page's one authored moment. Elements start
 * visible for anyone with reduced motion enabled, and the observer
 * disconnects after firing so nothing re-animates on scroll-back.
 */
export function useReveal({ threshold = 0.16, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      node.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          entry.target
            .querySelectorAll('.reveal')
            .forEach((el) => el.classList.add('is-visible'));
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

export default useReveal;

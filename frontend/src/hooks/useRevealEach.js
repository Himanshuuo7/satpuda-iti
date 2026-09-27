import { useEffect, useRef } from 'react';

/**
 * Like `useReveal`, but observes every `.reveal` inside the container on its
 * own — for tall sections (the journey timeline) where revealing everything
 * when the section first enters would spend the motion off-screen.
 */
export function useRevealEach({ rootMargin = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const targets = node.querySelectorAll('.reveal');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-visible'));
      node.classList.add('is-visible');
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        });
      },
      { threshold: 0.1, rootMargin }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}

export default useRevealEach;

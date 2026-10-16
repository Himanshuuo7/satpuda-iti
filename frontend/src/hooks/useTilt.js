import { useEffect, useRef } from 'react';

/**
 * Tilts an element a few degrees toward the pointer, with an optional glare
 * layer (`[data-glare]` inside it) that follows the pointer.
 *
 * Fine pointers with motion allowed only. Reads are throttled to animation
 * frames and the result is written straight to `transform` — nothing
 * re-renders, and no inherited custom property makes every child restyle.
 * The element's own CSS transition smooths each step and the return to rest.
 */
export function useTilt(max = 5) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    const glare = node.querySelector('[data-glare]');
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      node.style.transform = `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${((x + 0.5) * 100).toFixed(1)}% ${((y + 0.5) * 100).toFixed(1)}%, rgba(255,255,255,0.55), transparent 55%)`;
      }
    };

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = node.getBoundingClientRect();
      x = (e.clientX - r.left) / r.width - 0.5;
      y = (e.clientY - r.top) / r.height - 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      node.style.transform = '';
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max]);

  return ref;
}

export default useTilt;

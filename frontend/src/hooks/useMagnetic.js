import { useEffect, useRef } from 'react';

/**
 * Nudges an element a few pixels toward the pointer while it hovers.
 *
 * Only runs for a fine pointer with motion allowed, and writes the offset to
 * `--mx`/`--my` custom properties rather than `transform` so the element's own
 * hover lift keeps working — the CSS composes the two.
 */
export function useMagnetic(strength = 6) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      node.style.setProperty('--mx', `${(x * strength).toFixed(2)}px`);
      node.style.setProperty('--my', `${(y * strength).toFixed(2)}px`);
    };
    const onLeave = () => {
      node.style.setProperty('--mx', '0px');
      node.style.setProperty('--my', '0px');
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);

  return ref;
}

export default useMagnetic;

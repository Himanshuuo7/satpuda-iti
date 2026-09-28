import { useCallback } from 'react';

/**
 * Pointer handler for the cyan glow that follows a mouse across a navy panel.
 * It writes the pointer position to `--sx`/`--sy` on the `.spotlight-host`;
 * the `.spotlight` layer inside it (index.css) reads them. Touch and pen are
 * ignored, so the glow never sticks after a tap.
 */
export function useSpotlight() {
  return useCallback((e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--sx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--sy', `${e.clientY - r.top}px`);
  }, []);
}

export default useSpotlight;

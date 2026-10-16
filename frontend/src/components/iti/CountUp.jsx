import { useLayoutEffect, useRef } from 'react';

/**
 * A published figure that counts up once, the first time it is mostly in
 * view. Each frame writes the node's text directly, so React never renders
 * per frame. The figure keeps its published form — "06" counts 00 → 06 — and
 * assistive technology only ever reads the final value. With reduced motion,
 * or a value that is not a whole number, it simply shows the value.
 */
export function CountUp({ value, duration = 1300, className }) {
  const ref = useRef(null);
  const raw = String(value);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    node.textContent = raw;

    const target = /^\d+$/.test(raw) ? Number(raw) : NaN;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!Number.isFinite(target) || target === 0 || reduced || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const width = raw.startsWith('0') ? raw.length : 0;
    const format = (n) => String(n).padStart(width, '0');
    node.textContent = format(0);

    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          // Exponential ease-out: quick commit, long settle.
          const eased = 1 - Math.pow(1 - p, 4);
          node.textContent = p < 1 ? format(Math.round(target * eased)) : raw;
          if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      node.textContent = raw;
    };
  }, [raw, duration]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="tabular" />
      <span className="sr-only">{raw}</span>
    </span>
  );
}

export default CountUp;

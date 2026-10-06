import Lenis from 'lenis';

/**
 * Page-level smooth scrolling.
 *
 * One Lenis instance owns the window's scroll position. It eases wheel and
 * trackpad input (touch keeps the platform's own momentum, which already feels
 * right), and every scroll the app starts itself — route changes, `#hash`
 * jumps, "scroll to panel" — goes through `scrollToTarget` so it rides the same
 * curve instead of fighting Lenis with a native smooth scroll.
 *
 * Reduced motion: Lenis tracks input 1:1 and programmatic scrolls are instant.
 * Without Lenis (before mount, or if it is ever torn down) everything falls
 * back to native scrolling.
 */

let lenis = null;
let locks = 0;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Long jumps take a little longer, but never drag: 0.6s – 1.4s. */
const durationFor = (distance) => Math.min(1.4, Math.max(0.6, 0.6 + distance / 5000));

/** Gentle start, long soft landing. */
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function startSmoothScroll() {
  if (lenis) return stopSmoothScroll;

  lenis = new Lenis({
    autoRaf: true,
    // Ease of the wheel: low enough to glide, high enough to stay responsive.
    lerp: 0.1,
    wheelMultiplier: 1,
    // Inner scrollers (mobile drawer, campus register, dialogs) keep native
    // scrolling, and nothing scrolls the page from inside a modal dialog.
    allowNestedScroll: true,
    prevent: (node) => node.nodeName === 'DIALOG',
    stopInertiaOnNavigate: true,
  });
  if (locks > 0) lenis.stop();

  return stopSmoothScroll;
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

/**
 * Scrolls the page to an element or a y offset. Element targets honour their
 * `scroll-margin-top`, so sections land clear of the fixed header.
 */
export function scrollToTarget(target, { immediate = false } = {}) {
  const instant = immediate || reducedMotion();

  if (!lenis) {
    const behavior = instant ? 'instant' : 'smooth';
    if (typeof target === 'number') window.scrollTo({ top: target, behavior });
    else target.scrollIntoView({ behavior, block: 'start' });
    return;
  }

  // Lenis caches the page height. Right after a route change it can still hold
  // the previous page's, which would clamp the jump short — measure afresh.
  lenis.resize();
  const to = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
  lenis.scrollTo(target, {
    immediate: instant,
    duration: durationFor(Math.abs(to - window.scrollY)),
    easing: easeInOutCubic,
    // Programmatic jumps still run while an overlay is closing.
    force: true,
  });
}

/** Freezes page scrolling for overlays. Nested locks are counted. */
export function lockPageScroll() {
  locks += 1;
  lenis?.stop();
}

export function unlockPageScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) lenis?.start();
}

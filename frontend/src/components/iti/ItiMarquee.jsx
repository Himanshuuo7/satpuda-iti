import { memo, useCallback, useEffect, useRef, useState } from 'react';

import ItiCard from './ItiCard';
import ItiTicker from './ItiTicker';
import { itiProfiles } from '../../data/itiProfiles';

/**
 * The fourteen institutes as one continuous strip, with an index line under
 * it counting which institute is in front ("03 / 14").
 *
 * The motion is a single CSS keyframe on the track's `transform`, so it runs
 * on the compositor and React never renders per frame. The cards are
 * rendered twice; the second, aria-hidden copy exists only so the loop has no
 * seam. It runs continuously — a resting mouse does not stop it — and pauses
 * only while the strip is pressed (a finger or the mouse button), while a
 * card holds keyboard focus, and while it is off-screen.
 *
 * Dragging: a sideways swipe, or a mouse drag on desktop, moves the strip and
 * a flick coasts on, by seeking that same animation, so the loop never falls
 * out of step. Once the pointer lifts and the strip has slowed to its own
 * pace, the animation carries on from wherever it was left; a tap or click
 * that did not travel still opens the card. A sideways wheel — a touchpad's
 * two-finger swipe, or Shift + wheel — moves it too. Vertical swipes and
 * wheel turns still scroll the page.
 *
 * The front institute is the card under the index line's left edge, which
 * lines up with the page's content column; on first load the strip is set so
 * the first card starts exactly there.
 *
 * With reduced motion the strip does not move at all and becomes a scrollable
 * row, and the index line follows the scroll position instead.
 */

const COUNT = itiProfiles.length;
/** The last card, fully travelled — clear of the rounding in `show`. */
const LAST = COUNT - 0.01;

/** Gap kept between a focused card and the strip's edge. */
const EDGE = 16;
/** Finger travel, in px, before a touch counts as a swipe rather than a tap. */
const SLOP = 8;
/** Share of a flick's speed kept per 60 fps frame while it coasts. */
const FRICTION = 0.95;
/** Speed, in px/ms, below which a coast against the strip's direction ends. */
const REST = 0.02;
/** A finger held still this long (ms) before lifting leaves no flick. */
const FLICK_WINDOW = 80;
/** A click this soon (ms) after a swipe ends is the swipe's own, not a tap. */
const CLICK_WINDOW = 500;
/** Pixels per line, for a wheel that reports its turn in lines. */
const LINE = 40;

const mod = (n, m) => ((n % m) + m) % m;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The strip's running animation and one loop's length in time and space —
 * one copy of the cards. Null under reduced motion, where nothing animates.
 */
function readLoop(viewport) {
  const track = viewport?.firstElementChild;
  const animation = track?.getAnimations?.()[0];
  if (!animation) return null;

  const duration = Number(animation.effect?.getTiming().duration);
  const groupWidth = track.scrollWidth / 2;
  if (!duration || !groupWidth) return null;
  return { animation, duration, groupWidth };
}

/** How far the strip has travelled left, in px, within the current loop. */
const shiftOf = ({ animation, duration, groupWidth }) =>
  (mod(animation.currentTime ?? 0, duration) / duration) * groupWidth;

/** Puts the strip `shift` px along, wrapped into one loop. */
const seek = ({ animation, duration, groupWidth }, shift) => {
  animation.currentTime = (mod(shift, groupWidth) / groupWidth) * duration;
};

/** The card strip never re-renders when the marquee's own state changes. */
const Track = memo(function Track() {
  return (
    <div className="iti-marquee-track">
      <ul className="iti-marquee-group" aria-label="Satpuda ITI institutes">
        {itiProfiles.map((inst) => (
          <li key={inst.id} className="flex">
            <ItiCard inst={inst} />
          </li>
        ))}
      </ul>
      <ul className="iti-marquee-group" aria-hidden="true">
        {itiProfiles.map((inst) => (
          <li key={inst.id} className="flex">
            <ItiCard inst={inst} decorative />
          </li>
        ))}
      </ul>
    </div>
  );
});

export function ItiMarquee() {
  const viewportRef = useRef(null);
  const tickerRef = useRef(null);
  const loopRef = useRef(null);
  const gestureRef = useRef(null);
  const coastRef = useRef(0);
  /** When the last swipe ended, so the click it may end in is swallowed. */
  const swipeEndRef = useRef(-Infinity);
  const [current, setCurrent] = useState(0);

  /** Cached between frames; re-read once the animation is replaced. */
  const getLoop = useCallback(() => {
    const cached = loopRef.current;
    if (cached && cached.animation.playState !== 'idle') return cached;
    loopRef.current = readLoop(viewportRef.current);
    return loopRef.current;
  }, []);

  /**
   * Index line sync. While the strip is on screen, each frame reads where
   * the animation is — cheap arithmetic, no layout — and turns it into the
   * front card and how far it has travelled. Under reduced motion the same
   * is read from the scroll position, on scroll.
   */
  useEffect(() => {
    const viewport = viewportRef.current;
    const ticker = tickerRef.current;
    if (!viewport || !ticker) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let anchor = 0;
    let inView = true;
    let frame = 0;
    let shown = -1;
    let written = '';

    // The index line's left edge, in the strip's coordinates.
    const measure = () => {
      anchor = ticker.getBoundingClientRect().left - viewport.getBoundingClientRect().left;
      loopRef.current = null;
    };

    // `pos` counts cards past the anchor: 2.25 is a quarter of the way
    // through the third.
    const show = (pos) => {
      const base = Math.floor(pos + 1e-3);
      const travelled = Math.min(Math.max(pos - base, 0), 1).toFixed(3);
      if (travelled !== written) {
        written = travelled;
        ticker.style.setProperty('--iti-seg', travelled);
      }
      const index = mod(base, COUNT);
      if (index !== shown) {
        shown = index;
        setCurrent(index);
      }
    };

    const fromAnimation = () => {
      const loop = getLoop();
      return loop && (anchor + shiftOf(loop)) / (loop.groupWidth / COUNT);
    };

    const fromScroll = () => {
      const [first, second] = viewport.querySelectorAll('[data-iti-card]');
      if (!first || !second) return null;
      const left = first.getBoundingClientRect().left;
      const stride = second.getBoundingClientRect().left - left;
      const atEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1;
      if (atEnd || !stride) return LAST;
      const pos = (anchor - (left - viewport.getBoundingClientRect().left)) / stride;
      return Math.min(Math.max(pos, 0), LAST);
    };

    const update = () => {
      const pos = reduce.matches ? fromScroll() : fromAnimation();
      if (pos != null) show(pos);
    };

    const tick = () => {
      update();
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (inView && !reduce.matches) frame = requestAnimationFrame(tick);
      else update();
    };

    const onScroll = () => {
      if (reduce.matches) update();
      // Older browsers without `overflow: clip` still let focus scroll a
      // hidden overflow box; undo it so the strip and its animation stay
      // aligned.
      else if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
    };

    const onReduceChange = () => {
      loopRef.current = null;
      sync();
    };

    measure();
    // First card starts under the index line's left edge, so "01" is the
    // card above it.
    const loop = getLoop();
    if (loop) seek(loop, -anchor);
    update();

    // Off-screen, the animation stops — written straight to the DOM so it
    // never costs a render. Several entries for the one target can arrive in
    // a single batch; only the latest reflects where it is now.
    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => {
        inView = entries[entries.length - 1].isIntersecting;
        viewport.dataset.inview = inView ? 'true' : 'false';
        sync();
      });
      io.observe(viewport);
    } else {
      sync();
    }

    const onResize = () => {
      measure();
      update();
    };
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(onResize);
      ro.observe(viewport);
      ro.observe(viewport.firstElementChild);
    } else {
      window.addEventListener('resize', onResize);
    }

    viewport.addEventListener('scroll', onScroll, { passive: true });
    reduce.addEventListener?.('change', onReduceChange);

    return () => {
      cancelAnimationFrame(frame);
      io?.disconnect();
      ro?.disconnect();
      window.removeEventListener('resize', onResize);
      viewport.removeEventListener('scroll', onScroll);
      reduce.removeEventListener?.('change', onReduceChange);
    };
  }, [getLoop]);

  useEffect(() => () => cancelAnimationFrame(coastRef.current), []);

  /**
   * A sideways wheel moves the strip and the animation carries on from
   * there; an upright one is left to the page. A native listener, since
   * React's is passive and the browser's own sideways gesture (history back)
   * must be stopped.
   */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const onWheel = (e) => {
      let dx = e.deltaX;
      let dy = e.deltaY;
      // Shift + wheel, on a mouse whose browser does not turn it sideways.
      if (e.shiftKey && !dx) [dx, dy] = [dy, 0];
      if (Math.abs(dx) <= Math.abs(dy) || prefersReducedMotion()) return;
      const loop = getLoop();
      if (!loop) return;

      e.preventDefault();
      const unit = e.deltaMode === 1 ? LINE : e.deltaMode === 2 ? viewport.clientWidth : 1;
      seek(loop, shiftOf(loop) + dx * unit);
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [getLoop]);

  /** Lets the CSS animation run again. */
  const release = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    delete viewport.dataset.held;
    delete viewport.dataset.swiping;
  }, []);

  /**
   * Carries a flick on, slowing it frame by frame. Heading the strip's own
   * way, it hands back as soon as it has slowed to the strip's pace, so the
   * motion never stalls; heading the other way, it runs down to a stop.
   */
  const coast = useCallback(
    (loop, velocity) => {
      const pace = loop.groupWidth / loop.duration;
      let v = velocity;
      let last = performance.now();

      const step = (now) => {
        const dt = Math.min(now - last, 32);
        last = now;
        v *= FRICTION ** (dt / (1000 / 60));
        if (v >= -pace && v < REST) {
          release();
          return;
        }
        seek(loop, shiftOf(loop) - v * dt);
        coastRef.current = requestAnimationFrame(step);
      };
      coastRef.current = requestAnimationFrame(step);
    },
    [release]
  );

  /**
   * A finger or the mouse button on the strip holds it still; it may become
   * a tap or a swipe.
   */
  const onPointerDown = useCallback(
    (e) => {
      if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0) || prefersReducedMotion()) return;
      const viewport = viewportRef.current;
      const loop = getLoop();
      if (!viewport || !loop) return;

      cancelAnimationFrame(coastRef.current);
      viewport.dataset.held = 'true';
      gestureRef.current = {
        id: e.pointerId,
        x: e.clientX,
        start: shiftOf(loop),
        swiping: false,
        lastX: e.clientX,
        lastT: e.timeStamp,
        v: 0,
      };
    },
    [getLoop]
  );

  /**
   * Sideways travel drags the strip. `touch-action: pan-y` leaves vertical
   * travel to the browser, which then cancels the pointer instead. Once it
   * is a swipe the strip captures the pointer, so a mouse dragged past its
   * edges keeps dragging it.
   */
  const onPointerMove = useCallback(
    (e) => {
      const g = gestureRef.current;
      if (!g || e.pointerId !== g.id) return;
      const loop = getLoop();
      if (!loop) return;

      if (!g.swiping) {
        if (Math.abs(e.clientX - g.x) < SLOP) return;
        // Measured from here on, so the strip does not jump by the slop.
        g.swiping = true;
        g.x = e.clientX;
        g.start = shiftOf(loop);
        viewportRef.current.dataset.swiping = 'true';
        viewportRef.current.setPointerCapture?.(e.pointerId);
      }

      const dt = e.timeStamp - g.lastT;
      if (dt > 0) g.v = 0.8 * ((e.clientX - g.lastX) / dt) + 0.2 * g.v;
      g.lastX = e.clientX;
      g.lastT = e.timeStamp;
      seek(loop, g.start - (e.clientX - g.x));
    },
    [getLoop]
  );

  /**
   * Ends a press on lift or cancel — or when a mouse wanders off the strip
   * before it has travelled far enough to swipe (a swipe holds the capture,
   * so it never leaves).
   */
  const onPointerEnd = useCallback(
    (e) => {
      const g = gestureRef.current;
      if (!g || e.pointerId !== g.id) return;
      gestureRef.current = null;
      swipeEndRef.current = g.swiping ? e.timeStamp : -Infinity;

      const loop = getLoop();
      const flick = e.type === 'pointerup' && e.timeStamp - g.lastT < FLICK_WINDOW ? g.v : 0;
      if (g.swiping && loop && flick) coast(loop, flick);
      else release();
    },
    [coast, getLoop, release]
  );

  /**
   * A mouse press may become a drag: no native drag of the link or its
   * image, no text selection, and no focus — which would pause the strip and
   * seek it to fit the card. Keyboard focus is unaffected.
   */
  const onMouseDown = useCallback((e) => {
    if (e.button === 0 && !prefersReducedMotion()) e.preventDefault();
  }, []);

  /** A swipe that ends over a card must not open it. */
  const onClickCapture = useCallback((e) => {
    if (e.timeStamp - swipeEndRef.current > CLICK_WINDOW) return;
    swipeEndRef.current = -Infinity;
    e.preventDefault();
    e.stopPropagation();
  }, []);

  /**
   * Keyboard focus pauses the strip (CSS :focus-within). If the focused card
   * is partly outside the strip, seek the paused animation until the whole
   * card is visible — the strip itself never scrolls, so the loop stays in
   * step when focus leaves and the motion resumes from there.
   */
  const onFocus = useCallback(
    (e) => {
      const card = e.target.closest?.('[data-iti-card]');
      const viewport = viewportRef.current;
      const loop = getLoop();
      if (!card || !viewport || !loop) return;

      const offset = -shiftOf(loop);
      const left = card.offsetLeft;
      const right = left + card.offsetWidth;
      const width = viewport.clientWidth;

      let next;
      if (left + offset < EDGE) next = EDGE - left;
      else if (right + offset > width - EDGE) next = width - EDGE - right;
      else return;

      seek(loop, -Math.min(0, Math.max(-loop.groupWidth, next)));
    },
    [getLoop]
  );

  return (
    <>
      <div
        ref={viewportRef}
        onFocus={onFocus}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerEnd}
        onMouseDown={onMouseDown}
        onClickCapture={onClickCapture}
        className="iti-marquee mask-fade-x relative mt-10 lg:mt-12"
      >
        <Track />
      </div>

      <div className="shell">
        <div ref={tickerRef} className="reveal mt-1" style={{ '--reveal-delay': '200ms' }}>
          <ItiTicker current={current} />
        </div>
      </div>
    </>
  );
}

export default ItiMarquee;

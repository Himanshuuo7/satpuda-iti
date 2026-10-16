import { memo, useCallback, useEffect, useRef } from 'react';

import SectionHeading from '../ui/SectionHeading';
import ItiCard from '../iti/ItiCard';
import { institute } from '../../data/satpudaData';
import { itiDistricts, itiProfiles } from '../../data/itiProfiles';
import useReveal from '../../hooks/useReveal';

/**
 * Our ITI Institutes — the fourteen Satpuda ITIs as one continuous strip.
 *
 * The motion is a single CSS keyframe on the track's `transform`, so it runs
 * on the compositor and React never renders per frame. The cards are
 * rendered twice; the second, aria-hidden copy exists only so the loop has no
 * seam. It runs continuously and pauses only while the mouse rests on it
 * (resuming the moment it leaves), while a card holds keyboard focus, and
 * while it is off-screen. With reduced motion it does not move at all and
 * becomes a scrollable row.
 */

const STATS = [
  { value: String(itiProfiles.length), label: 'ITI institutes' },
  { value: String(itiDistricts.length), label: 'Districts' },
  { value: String(institute.establishedYear), label: 'Group since' },
];

/** Gap kept between a focused card and the strip's edge. */
const EDGE = 16;

/** The card strip never re-renders when the section's own state changes. */
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

export function ItiInstitutes() {
  const ref = useReveal();
  const viewportRef = useRef(null);

  // Off-screen, the animation stops — written straight to the DOM so it
  // never costs a render.
  useEffect(() => {
    const node = viewportRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    // Several entries for the one target can arrive in a single batch; only
    // the latest reflects where it is now.
    const io = new IntersectionObserver((entries) => {
      node.dataset.inview = entries[entries.length - 1].isIntersecting ? 'true' : 'false';
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  /**
   * Keyboard focus pauses the strip (CSS :focus-within). If the focused card
   * is partly outside the strip, seek the paused animation until the whole
   * card is visible — the strip itself never scrolls, so the loop stays in
   * step when focus leaves and the motion resumes from there.
   */
  const onFocus = useCallback((e) => {
    const card = e.target.closest?.('[data-iti-card]');
    const viewport = viewportRef.current;
    const track = viewport?.firstElementChild;
    const animation = track?.getAnimations?.()[0];
    if (!card || !animation) return;

    const duration = Number(animation.effect?.getTiming().duration);
    const groupWidth = track.scrollWidth / 2;
    if (!duration || !groupWidth) return;

    const offset = -(((animation.currentTime ?? 0) % duration) / duration) * groupWidth;
    const left = card.offsetLeft;
    const right = left + card.offsetWidth;
    const width = viewport.clientWidth;

    let next;
    if (left + offset < EDGE) next = EDGE - left;
    else if (right + offset > width - EDGE) next = width - EDGE - right;
    else return;

    next = Math.min(0, Math.max(-groupWidth, next));
    animation.currentTime = (-next / groupWidth) * duration;
  }, []);

  // Older browsers without `overflow: clip` still let focus scroll a hidden
  // overflow box; undo it so the strip and its animation stay aligned.
  const onScroll = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (e.currentTarget.scrollLeft !== 0) e.currentTarget.scrollLeft = 0;
  }, []);

  return (
    <section
      id="iti-institutes"
      ref={ref}
      aria-labelledby="iti-institutes-title"
      className="relative overflow-hidden border-y border-navy-100 bg-canvas py-20 sm:py-26 lg:py-30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 blueprint-light [mask-image:radial-gradient(70%_60%_at_80%_0%,#000_20%,transparent_75%)]"
      />

      <div className="shell relative">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            id="iti-institutes-title"
            eyebrow="Satpuda ITI network"
            title="Our ITI Institutes"
            lede={
              <span lang="hi">
                मध्य प्रदेश के {itiDistricts.length} ज़िलों में फैले Satpuda समूह के {itiProfiles.length} आईटीआई
                संस्थानों को जानें। किसी भी संस्थान को चुनें और उसके ट्रेड, प्राचार्य, संपर्क और अन्य उपलब्ध जानकारी देखें।
              </span>
            }
            className="max-w-2xl"
          />

          <dl
            className="reveal grid shrink-0 grid-cols-3 divide-x divide-navy-100 border-y border-navy-100"
            style={{ '--reveal-delay': '160ms' }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="px-3 py-4 first:pl-0 sm:px-6">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">{s.label}</dt>
                <dd className="mt-2 font-display text-[1.75rem] font-semibold leading-none tracking-tight tabular text-navy-800 sm:text-[2rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div
        ref={viewportRef}
        onFocus={onFocus}
        onScroll={onScroll}
        className="iti-marquee mask-fade-x relative mt-10 lg:mt-12"
      >
        <Track />
      </div>
    </section>
  );
}

export default ItiInstitutes;

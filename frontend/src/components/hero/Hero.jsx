import { useEffect, useRef } from 'react';
import { ArrowRight, Briefcase, GraduationCap, Wrench } from 'lucide-react';
import gsap from 'gsap';

import Button from '../ui/Button';
import Figure from '../ui/Figure';
import HeroBackdrop from './HeroBackdrop';
import { photos } from '../../data/media';

/**
 * Hero — the single authored motion moment on the page.
 *
 * The composition is a light industrial stage: an editorial type block on the
 * left, and on the right a tilted workshop plate carrying a hand-lettered note
 * and a red testimonial card, set against a red corner wedge and a navy
 * chevron.
 *
 * Sizing. From `lg` up the section is exactly one viewport tall: it reserves
 * the fixed header with `pt-[var(--header-h)]` and takes `min-height: 100svh`
 * from `.hero-viewport`, so the content box is `viewport - header`. Nothing
 * inside carries a fixed height — the headline, the vertical rhythm and the
 * plate are all bounded by viewport height through `clamp()`/`min()`, so a
 * 1280x720 laptop compresses the same layout instead of overflowing it. The
 * grid is then centred in whatever space is left over.
 *
 * Motion. The entrance reads as the stage assembling: the measure rule draws
 * across, the headline lines rise out of a slight blur, and the plate settles
 * into its tilt. Everything else is hover-scale polish. All of it is skipped
 * outright under `prefers-reduced-motion`.
 */

const FACTS = [
  { icon: GraduationCap, label: 'NCVT Affiliated', detail: 'CTS Scheme' },
  { icon: Wrench, label: 'Practical Training', detail: 'Workshop-led' },
  { icon: Briefcase, label: 'Industry Exposure', detail: 'On-the-job training' },
];

/** How far the plate may drift toward the pointer, in px. Deliberately tiny. */
const MAGNET_RANGE = 6;

export function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    let detachMagnet;

    const ctx = gsap.context((self) => {
      const tl = gsap.timeline({
        // Exponential ease-out — fast commit, long settle. Matches the
        // cubic-bezier(0.16, 1, 0.3, 1) the CSS transitions use.
        defaults: { ease: 'expo.out', duration: 1.1 },
      });

      tl.fromTo('[data-hero="rule"]', { scaleX: 0 }, { scaleX: 1, duration: 0.9 }, 0)
        .fromTo(
          '[data-hero="eyebrow"]',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.12
        )
        .fromTo(
          '[data-hero="line"]',
          { opacity: 0, yPercent: 108, filter: 'blur(10px)' },
          { opacity: 1, yPercent: 0, filter: 'blur(0px)', stagger: 0.09 },
          0.2
        )
        // The red word lands a beat after its line — emphasis, not a flourish.
        .fromTo(
          '[data-hero="accent"]',
          { opacity: 0.55, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.8, transformOrigin: 'left center' },
          0.62
        )
        .fromTo(
          '[data-hero="cta"]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          0.68
        )
        // The plate settles into its tilt rather than sliding in.
        .fromTo(
          '[data-hero="plate"]',
          { opacity: 0, rotate: 1.4, y: 28 },
          { opacity: 1, rotate: 0, y: 0, duration: 1.3 },
          0.24
        )
        .fromTo(
          '[data-hero="shot"] img',
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 1.2 },
          0.3
        )
        .fromTo(
          '[data-hero="note"]',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.07 },
          0.9
        )
        .fromTo(
          '[data-hero="quote"]',
          { opacity: 0, x: 22, y: 10 },
          { opacity: 1, x: 0, y: 0, duration: 1 },
          1
        )
        .fromTo(
          '[data-hero="fact"]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          0.95
        );

      /**
       * Magnetic plate.
       *
       * The pointer pulls the plate by at most `MAGNET_RANGE` px. `quickTo`
       * keeps this to one interpolated tween per axis rather than a new tween
       * per pointer event, and it writes to a wrapper of its own so it never
       * fights the entrance tween (on the outer node) or the static tilt (a
       * class on the inner node). Coarse pointers get nothing.
       */
      if (!window.matchMedia('(pointer: fine)').matches) return;

      const [magnet] = self.selector('[data-hero="magnet"]');
      const [surface] = self.selector('[data-hero="plate"]');
      const [shot] = self.selector('[data-hero="shot"] img');
      if (!magnet || !surface || !shot) return;

      const xTo = gsap.quickTo(magnet, 'x', { duration: 0.65, ease: 'power3.out' });
      const yTo = gsap.quickTo(magnet, 'y', { duration: 0.65, ease: 'power3.out' });
      const clamp = gsap.utils.clamp(-1, 1);

      const onMove = (e) => {
        const r = magnet.getBoundingClientRect();
        xTo(clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * MAGNET_RANGE);
        yTo(clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * MAGNET_RANGE);
      };
      // The photograph's hover scale is a tween rather than a CSS class: the
      // entrance already writes an inline transform to this same node, and an
      // inline style outranks a class, so CSS could not take it back.
      const onEnter = () => gsap.to(shot, { scale: 1.015, duration: 0.5, ease: 'power3.out' });
      const onLeave = () => {
        xTo(0);
        yTo(0);
        gsap.to(shot, { scale: 1, duration: 0.5, ease: 'power3.out' });
      };

      surface.addEventListener('pointerenter', onEnter);
      surface.addEventListener('pointermove', onMove);
      surface.addEventListener('pointerleave', onLeave);
      detachMagnet = () => {
        surface.removeEventListener('pointerenter', onEnter);
        surface.removeEventListener('pointermove', onMove);
        surface.removeEventListener('pointerleave', onLeave);
      };
    }, root);

    return () => {
      detachMagnet?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      /* `hero-viewport` pins the section to one viewport from lg up; the
         padding reserves the fixed header inside that same box. */
      className="hero-viewport relative isolate flex flex-col overflow-hidden bg-white pt-[var(--header-h)]"
    >
      <HeroBackdrop />

      <div className="shell relative flex flex-1 flex-col justify-center">
        <div className="grid items-center gap-y-[clamp(2rem,5vh,3.5rem)] py-[clamp(1.5rem,4vh,3rem)] lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
          {/* ---------------------------------------------------------------
              Editorial type block
          --------------------------------------------------------------- */}
          <div className="lg:col-span-7 2xl:col-span-6">
            <div className="flex items-center gap-4">
              <span
                data-hero="rule"
                aria-hidden="true"
                className="h-[3px] w-9 origin-left rounded-full bg-signal"
              />
              <p
                data-hero="eyebrow"
                className="text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.3em] text-navy-700 sm:text-[0.75rem]"
              >
                A Government Recognized ITI
              </p>
            </div>

            <h1
              id="hero-title"
              className="mt-[clamp(1.25rem,3.2vh,1.75rem)] text-7xl font-display text-display-hero font-bold text-navy-800"
            >
              {['Build Skills.', 'Shape Your', 'Future.'].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <span data-hero="line" className="block">
                    {i === 2 ? (
                      <>
                        <span data-hero="accent" className="inline-block text-signal">
                          Future
                        </span>
                        .
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h1>

            <div className="mt-[clamp(1.75rem,4.5vh,2.75rem)] flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <span data-hero="cta" className="contents sm:block">
                <Button to="/admission" variant="primary" size="lg" className="w-full sm:w-auto">
                  Apply Now
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </Button>
              </span>
            </div>

            {/* Verified fact rail */}
            <ul className="mt-[clamp(1.5rem,4.2vh,3rem)] flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-4">
              {FACTS.map(({ icon: Icon, label, detail }) => (
                <li
                  key={label}
                  data-hero="fact"
                  /* Sized to content, not `flex-1` — equal thirds are narrower
                     than the longest label and force it to wrap. */
                  className="sm:border-r sm:border-navy-100 sm:px-3.5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
                >
                  {/* The lift lives on this wrapper, not the <li>: the entrance
                      tween writes an inline transform to the <li>, which would
                      outrank a hover class on the same node. */}
                  <span className="group/fact flex items-center gap-2.5 transition-transform duration-300 ease-out hover:-translate-y-0.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy-200 bg-white/70 text-navy-700 transition-[border-color,box-shadow,transform] duration-300 ease-out group-hover/fact:-translate-y-0.5 group-hover/fact:border-navy-400 group-hover/fact:shadow-card">
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.6}
                        className="h-[1.05rem] w-[1.05rem]"
                      />
                    </span>
                    <span>
                      <span className="block whitespace-nowrap font-display text-[0.9375rem] font-bold leading-tight text-navy-800">
                        {label}
                      </span>
                      <span className="mt-1 block whitespace-nowrap text-[0.625rem] font-medium uppercase leading-tight tracking-[0.13em] text-ink-soft">
                        {detail}
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------------
              Tilted workshop plate
          --------------------------------------------------------------- */}
          <div className="lg:col-span-5 2xl:col-span-6">
            <div
              data-hero="plate"
              /* `85vh` caps the plate on short viewports: its height tracks its
                 width through the photograph's ratio, so bounding the width is
                 what keeps it inside the hero without a fixed height. The
                 negative margin lets it run past the shell gutter. */
              className="relative mx-auto w-full max-w-[34rem] pb-14 pr-1 sm:pb-16 lg:ml-auto lg:-mr-2 lg:max-w-[min(100%,85vh)] lg:pb-12 xl:-mr-6"
            >
              <div data-hero="magnet">
                <div className="group relative rotate-[-2.4deg]">
                  {/* Red bracket riding the left edge of the plate. It stops at
                      the chamfer so the two cuts do not collide. */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-3.5 bottom-[20%] top-[5%] w-5 rounded-l-[2rem] bg-signal shadow-[0_10px_30px_-14px_rgba(224,27,36,0.8)] transition-transform duration-500 ease-out group-hover:-translate-x-1 sm:-left-5 sm:w-7"
                  />

                  {/* The plate: photograph + hand-lettered note, one cut sheet.
                      The shadow lives on the wrapper as a drop-shadow filter —
                      a box-shadow would be clipped away by the clip-path below. */}
                  <div
                    className="transition-[filter] duration-500 ease-out"
                    style={{ filter: 'drop-shadow(0 22px 44px rgba(3, 11, 23, 0.3))' }}
                  >
                    <div
                      className="relative flex overflow-hidden bg-white"
                      /* The bottom-left corner is chamfered so the sheet reads
                         as cut stock rather than a plain rectangle. */
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 80%)' }}
                    >
                      <figure data-hero="shot" className="relative m-0 w-[76%]">
                        <Figure
                          src={photos.garraWorkshop.src}
                          alt={photos.garraWorkshop.alt}
                          ratio="5/4"
                          priority
                          sizes="(min-width: 1024px) 38vw, 76vw"
                          imgClassName="origin-center will-change-transform"
                        >
                          {/* A whisper of navy keeps the photograph in the palette. */}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 mix-blend-overlay bg-navy-600/15"
                          />
                        </Figure>
                      </figure>

                      {/* Hand-lettered note */}
                      <div className="relative flex w-[24%] flex-col justify-center gap-0.5 bg-white px-2 py-4 sm:px-3">
                        <span
                          data-hero="note"
                          className="font-script text-[1.35rem] font-bold leading-[0.95] tracking-tight text-navy-800 sm:text-[1.75rem] lg:text-[1.6rem] xl:text-[2rem]"
                        >
                          Skill
                        </span>
                        <span
                          data-hero="note"
                          className="font-script text-[1.15rem] font-semibold leading-[1] tracking-tight text-navy-800 sm:text-[1.45rem] lg:text-[1.35rem] xl:text-[1.7rem]"
                        >
                          today
                        </span>
                        <span
                          data-hero="note"
                          className="mt-1.5 font-script text-[1.15rem] font-semibold leading-[1] tracking-tight text-navy-800 sm:text-[1.45rem] lg:text-[1.35rem] xl:text-[1.7rem]"
                        >
                          Stronger
                        </span>
                        <span
                          data-hero="note"
                          className="font-script text-[1.15rem] font-semibold leading-[1] tracking-tight text-navy-800 sm:text-[1.45rem] lg:text-[1.35rem] xl:text-[1.7rem]"
                        >
                          tomorrow
                        </span>
                        <span
                          data-hero="note"
                          aria-hidden="true"
                          className="mt-2 h-[3px] w-10 rounded-full bg-signal sm:w-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Red testimonial card, overhanging the cut corner. */}
                  <figure
                    data-hero="quote"
                    className="absolute -bottom-12 right-0 m-0 w-[58%] max-w-[15.5rem] overflow-hidden rounded-br-[1.75rem] rounded-tl-[1.75rem] bg-gradient-to-br from-signal-400 via-signal to-signal-700 px-5 py-4 shadow-[0_18px_44px_-18px_rgba(161,16,21,0.75)] sm:-bottom-14 sm:px-6 sm:py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-2 font-display text-[3.25rem] font-bold leading-none text-white/25"
                    >
                      &ldquo;
                    </span>
                    <blockquote className="relative pl-6 font-display text-[0.9375rem] leading-[1.45] text-white sm:text-base">
                      Training
                      <br />
                      <em className="font-semibold italic">Real Skills</em>
                      <br />
                      for a <em className="font-semibold italic">Brighter</em>
                      <br />
                      <span className="inline-flex items-center gap-2">
                        <em className="font-semibold italic">Tomorrow</em>
                        <span
                          aria-hidden="true"
                          className="h-[2px] w-6 rounded-full bg-signal-700"
                        />
                      </span>
                    </blockquote>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

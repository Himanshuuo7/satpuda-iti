import { ArrowRight } from 'lucide-react';

import Button from '../ui/Button';
import Figure from '../ui/Figure';
import { institute, missionVision } from '../../data/satpudaData';
import { photos } from '../../data/media';
import useReveal from '../../hooks/useReveal';

/**
 * About — editorial split.
 *
 * Large display type carries the institute's position on the left; the official
 * description sits on the right at a comfortable measure. Mission and vision are
 * set as a pair of plates beneath, and the classroom photograph anchors the
 * composition rather than decorating it.
 */
export function About() {
  const ref = useReveal();

  return (
    <section id="about" ref={ref} aria-labelledby="about-title" className="relative bg-canvas py-20 sm:py-26 lg:py-30">
      <div className="shell">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:gap-x-16">
          {/* Left: statement */}
          <div className="lg:col-span-5">
            <div className="reveal flex items-center gap-3">
              <span className="font-mono text-label tabular text-signal">01</span>
              <span aria-hidden="true" className="h-px w-8 tick-rule text-navy-300" />
              <span className="eyebrow text-ink-muted">About the Institute</span>
            </div>

            <h2
              id="about-title"
              className="reveal mt-6 font-display text-display-lg font-semibold leading-[1.02] text-navy-800"
              style={{ '--reveal-delay': '60ms' }}
            >
              Technical education,
              <br />
              <span className="text-ink-muted">built on the</span>
              <br />
              workshop floor.
            </h2>

            <div className="reveal mt-10" style={{ '--reveal-delay': '140ms' }}>
              <Figure
                src={photos.classroom.src}
                alt={photos.classroom.alt}
                ratio="5/4"
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="rounded-panel"
              />
              <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">
                Classroom session · Satpuda ITI
              </p>
            </div>
          </div>

          {/* Right: official description */}
          <div className="lg:col-span-7">
            <div className="reveal space-y-6 text-[1.0625rem] leading-[1.78] text-ink-muted" style={{ '--reveal-delay': '80ms' }}>
              <p className="text-[1.1875rem] leading-[1.7] text-navy-800">
                {institute.intro}
              </p>
              <p>{institute.purpose}</p>
              <p>{institute.management}</p>
            </div>

            {/* Mission / Vision pair */}
            <div className="reveal mt-12 grid gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100 sm:grid-cols-2" style={{ '--reveal-delay': '160ms' }}>
              <article className="bg-white p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 font-mono text-label uppercase text-signal">
                  <span aria-hidden="true" className="h-px w-5 bg-signal" />
                  Mission
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.75] text-navy-700">
                  {missionVision.mission}
                </p>
              </article>
              <article className="bg-white p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 font-mono text-label uppercase text-tech-700">
                  <span aria-hidden="true" className="h-px w-5 bg-tech" />
                  Vision
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.75] text-navy-700">
                  {missionVision.vision}
                </p>
              </article>
            </div>

            {/* Affiliation note — set as technical fine print, because it is. */}
            <p className="reveal mt-8 border-l border-tech/50 pl-5 text-[0.875rem] leading-[1.7] text-ink-muted" style={{ '--reveal-delay': '200ms' }}>
              {institute.affiliationStatement}
            </p>

            <div className="reveal mt-9" style={{ '--reveal-delay': '240ms' }}>
              <Button to="/about" variant="outline">
                Discover Satpuda
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

import SectionHeading from '../ui/SectionHeading';
import Figure from '../ui/Figure';
import useRevealEach from '../../hooks/useRevealEach';
import useScrollProgress from '../../hooks/useScrollProgress';
import { photos } from '../../data/media';
import { training } from '../../data/satpudaData';

/**
 * Infrastructure — an editorial photo spread.
 *
 * Every photograph is the institute's own, from satpudaiti.com. Each lifts out
 * from behind a navy shutter as it scrolls in and drifts a few percent against
 * the scroll. The facilities and methods listed are the official training
 * page's; no area, count or equipment figure is asserted beyond them.
 */

function Plate({ photo, caption, className, delay = 0, priority = false }) {
  return (
    <figure className={`reveal ${className ?? ''}`} style={{ '--reveal-delay': `${delay}ms` }}>
      <Figure
        src={photo.src}
        alt={photo.alt}
        ratio={photo.ratio}
        priority={priority}
        className="rounded-panel"
        imgClassName="about-parallax"
        sizes="(min-width: 1024px) 50vw, 100vw"
      >
        <span aria-hidden="true" className="about-shutter absolute inset-0 bg-navy-800" style={{ '--reveal-delay': `${delay + 80}ms` }} />
      </Figure>
      <figcaption className="mt-3 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">
        <span aria-hidden="true" className="h-px w-4 bg-signal" />
        {caption}
      </figcaption>
    </figure>
  );
}

export function InfrastructureSection() {
  const ref = useRevealEach();
  const spread = useScrollProgress({ anchor: 0.9 });

  return (
    <section
      id="infrastructure"
      ref={ref}
      aria-labelledby="infra-title"
      className="relative scroll-mt-[var(--header-h)] bg-white py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <SectionHeading
            id="infra-title"
            index="08"
            eyebrow="Infrastructure"
            title={
              <>
                Workshops first. <span className="text-ink-muted">Classrooms that serve them.</span>
              </>
            }
            className="lg:col-span-7"
          />
          <p className="reveal max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted lg:col-span-5">
            {training.emphasis} {training.nimiNote}
          </p>
        </div>

        <div ref={spread} className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Ratios are paired so each row's two plates share a height (7/12 at
              16:9 ≈ 5/12 at 5:4). */}
          <Plate
            photo={{ ...photos.garraWorkshop, ratio: '16/9' }}
            caption="Fitter workshop · Satpuda ITI Garra"
            className="lg:col-span-7"
          />
          <Plate
            photo={{ ...photos.practicalTraining, ratio: '5/4' }}
            caption="Hands-on practical instruction"
            className="lg:col-span-5"
            delay={120}
          />
          <Plate
            photo={{ ...photos.classroom, ratio: '5/4' }}
            caption="Classroom session"
            className="lg:col-span-5"
          />
          <Plate
            photo={{ ...photos.campusPanorama, ratio: '16/9' }}
            caption="Examination hall"
            className="lg:col-span-7"
            delay={120}
          />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h3 className="reveal font-mono text-label uppercase text-signal">Training facilities</h3>
            <ol className="mt-5 divide-y divide-navy-100 border-y border-navy-100">
              {training.facilities.map((f, i) => (
                <li key={f} className="reveal flex gap-5 py-4" style={{ '--reveal-delay': `${i * 50}ms` }}>
                  <span className="font-mono text-[0.6875rem] tabular text-royal">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-[0.9688rem] leading-[1.65] text-navy-700">{f}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <h3 className="reveal font-mono text-label uppercase text-signal">How trades are taught</h3>
            <ul className="reveal mt-5 flex flex-wrap gap-2" style={{ '--reveal-delay': '80ms' }}>
              {training.methods.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-navy-100 bg-canvas-soft px-3.5 py-2 text-[0.8438rem] text-navy-700 transition-colors duration-200 hover:border-royal hover:text-royal"
                >
                  {m}
                </li>
              ))}
            </ul>
            <p className="reveal mt-6 text-[0.75rem] text-ink-soft" style={{ '--reveal-delay': '120ms' }}>
              Source: satpudaiti.com/training · Photographs: satpudaiti.com gallery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfrastructureSection;

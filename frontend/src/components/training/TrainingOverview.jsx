import { ArrowDownRight } from 'lucide-react';

import TrainingHero from './TrainingHero';
import TrainingNext from './TrainingNext';
import SectionPageGrid from '../section/SectionPageGrid';
import StatCounter from '../ui/StatCounter';
import Figure from '../ui/Figure';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import MixDonut from './MixDonut';
import { iconFor } from './icons';
import { photos } from '../../data/media';
import { trainingPages } from '../../data/trainingPages';
import { admissionToPlacement, competency, learningProcess, trainingOverview } from '../../data/trainingContent';

/**
 * /training — how Satpuda trains, at a glance: the published training mix as
 * the hero instrument, the practical-first emphasis, four real figures and a
 * door into each of the ten pages.
 */

export function TrainingOverview() {
  const intro = useReveal({ threshold: 0.12 });
  const stats = useReveal({ threshold: 0.2 });
  const pages = useReveal({ threshold: 0.05 });

  return (
    <>
      <TrainingHero
        tone="dark"
        eyebrow="Learning Process · NCVT"
        lines={[
          'Skills built',
          <>
            <span className="text-tech">by doing</span>
            <span className="text-signal">.</span>
          </>,
        ]}
        lede={trainingOverview.lede}
        aside={<MixDonut />}
      >
        <a
          href="#pages"
          className="group inline-flex min-h-[2.875rem] items-center gap-2.5 rounded-edge border border-white/25 px-6 text-[0.9375rem] font-medium text-white transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-tech/70 hover:bg-white/10 active:translate-y-px"
        >
          Explore training
          <ArrowDownRight
            aria-hidden="true"
            strokeWidth={2}
            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:translate-y-0.5"
          />
        </a>
      </TrainingHero>

      {/* Practical first */}
      <section ref={intro} aria-labelledby="practical-title" className="bg-white py-20 sm:py-26">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading id="practical-title" eyebrow="Practical first" title="The workshop is the classroom." />
            <blockquote
              className="reveal mt-8 border-l-2 border-signal pl-5 font-display text-[1.375rem] font-medium leading-[1.45] tracking-[-0.01em] text-navy-800 sm:text-[1.625rem]"
              style={{ '--reveal-delay': '140ms' }}
            >
              {trainingOverview.emphasis}
            </blockquote>
            <p className="reveal mt-6 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted" style={{ '--reveal-delay': '180ms' }}>
              {learningProcess.intro[1]}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            {[photos.benchPractical, photos.wiringProject].map((p, i) => (
              <figure key={p.src} className={`reveal group ${i === 1 ? 'mt-10' : ''}`} style={{ '--reveal-delay': `${120 + i * 100}ms` }}>
                <Figure
                  src={p.src}
                  alt={p.alt}
                  ratio="3/4"
                  className="rounded-panel"
                  imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                >
                  <span aria-hidden="true" className="about-shutter absolute inset-0 bg-navy-800" style={{ '--reveal-delay': `${200 + i * 120}ms` }} />
                </Figure>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Four published figures */}
      <section ref={stats} aria-label="Training in figures" className="border-y border-navy-100 bg-canvas-soft py-14 sm:py-16">
        <div className="shell">
          <div className="reveal grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            <StatCounter value={learningProcess.methods.length} label="Teaching methods" note="Lecture to industrial projects" />
            <StatCounter value={admissionToPlacement.step.hours} suffix=" h" label="STEP special training" note="Alongside regular training" />
            <StatCounter value={competency.mix[0].value} suffix="%" label="Of training is practical" note="The largest share" />
            <StatCounter value={competency.skills.length} label="Work skills developed" note="Coordination to multi-skilling" />
          </div>
        </div>
      </section>

      {/* The ten pages */}
      <section id="pages" ref={pages} aria-labelledby="pages-title" className="scroll-mt-[calc(var(--navbar-h-scrolled)+3.5rem)] bg-white py-20 sm:py-26">
        <div className="shell">
          <SectionHeading
            id="pages-title"
            eyebrow="Inside training"
            title={
              <>
                From admission <span className="text-royal">to placement.</span>
              </>
            }
            className="max-w-3xl"
          />
          <SectionPageGrid pages={trainingPages} iconFor={iconFor} className="mt-14" />
        </div>
      </section>

      <TrainingNext page={null} />
    </>
  );
}

export default TrainingOverview;

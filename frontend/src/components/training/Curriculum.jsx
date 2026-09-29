import TrainingHero from './TrainingHero';
import TrainingNext from './TrainingNext';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { iconFor } from './icons';
import { curriculum as content } from '../../data/trainingContent';

/**
 * Curriculum @ Satpuda ITIs.
 *
 * The cycle the published text describes (NCVT guidelines → IMC approval →
 * review before each session → weekly delivery) as a four-step track, the
 * text itself as a numbered policy document, and the academic cell's nine
 * duties on the navy surface.
 */

export function Curriculum({ page }) {
  const cycle = useReveal({ threshold: 0.15 });
  const policy = useReveal({ threshold: 0.05 });
  const cell = useReveal({ threshold: 0.08 });

  return (
    <>
      <TrainingHero
        page={page}
        eyebrow="NCVT syllabus"
        lines={[
          'Curriculum',
          <span className="text-royal">
            @ Satpuda ITIs<span className="text-signal">.</span>
          </span>,
        ]}
        lede="SITI follow the curriculum and syllabus guidelines provided by NCVT — reviewed before every session, delivered week by week, and given to every student with any amendments."
      />

      {/* The cycle */}
      <section ref={cycle} aria-labelledby="cycle-title" className="bg-white py-20 sm:py-26">
        <div className="shell">
          <SectionHeading
            id="cycle-title"
            eyebrow="How it stays current"
            title={
              <>
                From NCVT guidelines <span className="text-ink-muted">to every tutor’s week.</span>
              </>
            }
            className="max-w-3xl"
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {content.cycle.map((c, i) => {
              const Icon = iconFor(c.icon);
              const last = i === content.cycle.length - 1;
              return (
                <li key={c.title} className="reveal group relative" style={{ '--reveal-delay': `${i * 90}ms` }}>
                  {!last && (
                    <span aria-hidden="true" className="absolute left-12 top-6 hidden h-px w-[calc(100%-1.5rem)] bg-navy-100 lg:block">
                      <span className="sec-seg-x absolute inset-0 bg-royal" style={{ '--i': i }} />
                    </span>
                  )}
                  <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-navy-200 bg-white text-royal transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover:scale-110 group-hover:border-royal group-hover:bg-royal group-hover:text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-soft">Step {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 text-[1.125rem] font-semibold text-navy-800">{c.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.65] text-ink-muted">{c.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* The policy, in full */}
      <section ref={policy} aria-labelledby="policy-title" className="bg-canvas-soft py-20 sm:py-26">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--navbar-h-scrolled)+6rem)]">
              <SectionHeading id="policy-title" eyebrow="Curriculum policy" title={content.title} />
            </div>
          </div>
          <ol className="lg:col-span-8">
            {content.paragraphs.map((p, i) => (
              <li
                key={i}
                className="reveal group grid grid-cols-[2.5rem_1fr] gap-4 border-t border-navy-100 py-6 last:border-b sm:grid-cols-[3.5rem_1fr]"
                style={{ '--reveal-delay': `${Math.min(i * 50, 250)}ms` }}
              >
                <span className="pt-1 font-mono text-[0.75rem] tabular text-navy-300 transition-colors duration-300 group-hover:text-signal">
                  §{i + 1}
                </span>
                <p className="text-[1.0313rem] leading-[1.8] text-navy-700 transition-colors duration-300 group-hover:text-navy-900">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The academic cell */}
      <section ref={cell} aria-labelledby="cell-title" className="relative overflow-hidden bg-navy-800 py-20 sm:py-26">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />
        <div className="shell relative">
          <SectionHeading
            id="cell-title"
            tone="dark"
            eyebrow="Academic cell"
            title={
              <>
                The work of the <span className="text-tech">academic cell.</span>
              </>
            }
            lede={content.cellLead}
            className="max-w-3xl"
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-panel border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {content.cell.map((c, i) => {
              const Icon = iconFor(c.icon);
              return (
                <li key={c.text} className="reveal" style={{ '--reveal-delay': `${i * 50}ms` }}>
                  <div className="group flex h-full items-start gap-4 bg-navy-800 p-6 transition-colors duration-300 hover:bg-navy-700">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-tech transition-[transform,border-color] duration-500 ease-out group-hover:-rotate-12 group-hover:border-tech/60">
                      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <p className="pt-2 text-[0.9688rem] leading-[1.55] text-navy-100/90 transition-colors duration-300 group-hover:text-white">{c.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <TrainingNext page={page} />
    </>
  );
}

export default Curriculum;

import TrainingHero from './TrainingHero';
import TrainingNext from './TrainingNext';
import useReveal from '../../hooks/useReveal';
import useRevealEach from '../../hooks/useRevealEach';
import useCountUp from '../../hooks/useCountUp';
import useScrollProgress from '../../hooks/useScrollProgress';
import { admissionToPlacement as content } from '../../data/trainingContent';
import cn from '../../utils/cn';

/**
 * Admission to Placement — प्रशिक्षण प्रक्रिया (प्रवेश से प्लेसमेंट तक).
 *
 * The published flowchart as one journey: a rail that fills as the reader
 * scrolls, a stage per box in the order its arrows run, the STEP programme
 * set apart on navy, and its module figures as bars.
 */

function StepBadge() {
  const [ref, hours] = useCountUp(content.step.hours, { duration: 1600 });
  const { step } = content;
  return (
    <div className="relative overflow-hidden rounded-panel bg-navy-800 p-7 text-white shadow-deep sm:p-9">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      <span aria-hidden="true" className="sec-ring pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full border-2 border-signal/60" />
      <p className="relative font-display text-[3.5rem] font-bold leading-none tracking-[0.08em] text-white">
        S<span className="text-signal">T</span>E<span className="text-tech">P</span>
      </p>
      <p className="relative mt-3 text-[0.9375rem] font-medium text-navy-100">{step.full}</p>
      <p lang="hi" className="relative mt-1 text-[0.9375rem] text-navy-200/80">
        {step.hi}
      </p>
      <div className="relative mt-7 flex items-end gap-3 border-t border-white/12 pt-6">
        <p ref={ref} className="font-display text-[3rem] font-bold leading-none tabular text-white">
          {hours}
        </p>
        <p className="pb-1 text-[0.875rem] leading-snug text-navy-100/80">
          hours of special training,
          <br />
          alongside regular training
        </p>
      </div>
    </div>
  );
}

function Modules({ modules }) {
  const ref = useReveal({ threshold: 0.3 });
  const max = Math.max(...modules.map((m) => m.value));
  return (
    <ul ref={ref} className="mt-5 grid gap-3">
      {modules.map((m, i) => (
        <li key={m.en} className="grid gap-1.5 sm:grid-cols-[minmax(0,13rem)_1fr] sm:items-center sm:gap-3">
          <span className="text-[0.8438rem] leading-snug text-navy-700">
            {m.en}
            <span lang="hi" className="block text-[0.75rem] text-ink-soft">
              {m.hi}
            </span>
          </span>
          <span className="flex items-center gap-3">
            <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-navy-50">
              <span
                className="sec-bar-x block h-full rounded-full bg-gradient-to-r from-royal to-tech"
                style={{ width: `${(m.value / max) * 100}%`, '--i': i }}
              />
            </span>
            <span className="w-9 text-right font-mono text-[0.8125rem] font-semibold tabular text-navy-800">{m.value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Stage({ stage, index, last }) {
  const n = String(index + 1).padStart(2, '0');

  return (
    <li className="reveal relative pb-10 pl-14 last:pb-0 sm:pl-20">
      {/* Node on the rail */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border font-mono text-[0.75rem] font-semibold tabular sm:left-2',
          stage.step
            ? 'border-signal bg-signal text-white shadow-[0_0_0_6px_rgba(224,27,36,0.12)]'
            : last
              ? 'border-tech-600 bg-tech-600 text-white shadow-[0_0_0_6px_rgba(22,199,217,0.16)]'
              : 'border-navy-200 bg-white text-navy-700'
        )}
      >
        {n}
      </span>

      <article
        className={cn(
          'group rounded-panel border p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 sm:p-7',
          stage.step
            ? 'border-navy-700 bg-navy-800 text-white shadow-deep'
            : 'border-navy-100 bg-white hover:border-navy-200 hover:shadow-lift'
        )}
      >
        {stage.hi && (
          <h3 lang="hi" className={cn('font-display text-[1.25rem] font-semibold leading-snug sm:text-[1.375rem]', stage.step ? 'text-white' : 'text-navy-800')}>
            {stage.hi}
          </h3>
        )}
        <p
          className={cn(
            stage.hi ? 'mt-1.5 text-[0.9375rem]' : 'font-display text-[1.25rem] font-semibold',
            stage.step ? 'text-navy-100/80' : stage.hi ? 'text-ink-muted' : 'text-navy-800'
          )}
        >
          {stage.en}
        </p>

        {stage.step && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-tech">
            {content.step.name} · {content.step.full}
          </p>
        )}

        {stage.items && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {stage.items.map((it) => (
              <li
                key={it.en}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-[0.8438rem] transition-colors duration-300',
                  last
                    ? 'border-tech-600/30 bg-tech/10 font-medium text-navy-800 hover:bg-tech-600 hover:text-white'
                    : 'border-navy-100 bg-canvas-soft text-navy-700 hover:border-royal hover:text-royal'
                )}
              >
                {it.hi ? (
                  <>
                    <span lang="hi">{it.hi}</span>
                    <span className="ml-1.5 text-ink-soft">· {it.en}</span>
                  </>
                ) : (
                  it.en
                )}
              </li>
            ))}
          </ul>
        )}

        {stage.modules && <Modules modules={stage.modules} />}
      </article>
    </li>
  );
}

export function AdmissionToPlacement({ page }) {
  const journey = useRevealEach();
  const rail = useScrollProgress({ anchor: 0.6 });

  return (
    <>
      <TrainingHero
        page={page}
        eyebrow="Training process"
        lines={[
          'Admission',
          <span className="text-royal">
            to Placement<span className="text-signal">.</span>
          </span>,
        ]}
        lede={`${content.titleEn}: counselling, assessment, a personal career plan, the ${content.step.hours}-hour STEP programme, value addition and job placement.`}
        aside={<StepBadge />}
      >
        <p lang="hi" className="font-display text-[1.25rem] font-medium text-navy-800 sm:text-[1.5rem]">
          {content.titleHi}
        </p>
      </TrainingHero>

      <section ref={journey} aria-labelledby="journey-title" className="relative bg-white py-20 sm:py-26">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint-light opacity-50 [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)]" />
        <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--navbar-h-scrolled)+6rem)]">
              <div className="reveal flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 tick-rule text-navy-300" />
                <span className="eyebrow text-ink-muted">{content.stages.length} stages</span>
              </div>
              <h2 id="journey-title" lang="hi" className="reveal mt-5 font-display text-display-sm font-semibold text-navy-800" style={{ '--reveal-delay': '60ms' }}>
                प्रवेश से <span className="text-royal">प्लेसमेंट</span> तक
              </h2>
              <p className="reveal mt-4 max-w-sm text-[1rem] leading-[1.7] text-ink-muted" style={{ '--reveal-delay': '120ms' }}>
                From the first counselling session to job placement and alumni registration, in the order the training process runs.
              </p>
            </div>
          </div>

          <ol ref={rail} className="relative lg:col-span-8">
            <li aria-hidden="true" className="absolute bottom-6 left-5 top-5 w-px bg-navy-100 sm:left-7">
              <span className="sec-fill-y absolute inset-0 bg-gradient-to-b from-royal via-signal to-tech" />
            </li>
            {content.stages.map((s, i) => (
              <Stage key={s.en} stage={s} index={i} last={i === content.stages.length - 1} />
            ))}
          </ol>
        </div>
      </section>

      <TrainingNext page={page} />
    </>
  );
}

export default AdmissionToPlacement;

import SectionHeading from '../ui/SectionHeading';
import GearOutline from '../ui/GearOutline';
import useReveal from '../../hooks/useReveal';
import { commitments, qualityTargets, rightFour } from '../../data/features';
import { missionVision } from '../../data/satpudaData';

/**
 * Safety & quality — a dark blueprint sheet.
 *
 * The commitment statement and the four principles are the institute's own
 * (Hindi verbatim, English translated). The Quality Policy is set as a spec
 * sheet: each published target figure against the measure it applies to.
 */

/** Blueprint corner brackets for a panel. */
function Corners() {
  const c = 'absolute h-3 w-3 border-tech/60';
  return (
    <span aria-hidden="true">
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}

export function SafetySection() {
  const ref = useReveal({ threshold: 0.08 });

  return (
    <section
      id="quality"
      ref={ref}
      aria-labelledby="quality-title"
      className="about-grain about-grain-dark relative scroll-mt-[var(--header-h)] overflow-hidden bg-navy-950 py-20 text-white sm:py-26 lg:py-30"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(22,199,217,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,199,217,0.07)_1px,transparent_1px)] [background-size:14px_14px]"
      />
      <GearOutline
        spin
        strokeWidth={0.6}
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] text-tech/[0.08]"
      />

      <div className="shell relative">
        <SectionHeading
          id="quality-title"
          tone="dark"
          eyebrow="Safety & quality"
          title={
            <>
              A safe place to learn a trade. <span className="text-tech">A standard to hold it to.</span>
            </>
          }
          className="max-w-3xl"
        />

        {/* Commitment */}
        <div className="reveal relative mt-14 border border-white/12 p-6 sm:p-10" style={{ '--reveal-delay': '100ms' }}>
          <Corners />
          <p className="font-mono text-label uppercase text-signal-400">Our commitment</p>
          <p lang="hi" className="mt-5 max-w-4xl font-display text-[clamp(1.375rem,1rem+1.6vw,2.25rem)] font-semibold leading-[1.35] text-white">
            {missionVision.commitmentHi}
          </p>
          <p className="mt-4 max-w-3xl text-[1.0625rem] leading-[1.7] text-navy-100/80">{missionVision.commitmentEn}</p>
        </div>

        {/* Four principles */}
        <ul className="mt-6 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c, i) => (
            <li
              key={c.label}
              className="reveal group relative bg-navy-950 p-6 transition-colors duration-300 hover:bg-navy-900"
              style={{ '--reveal-delay': `${140 + i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-label uppercase text-tech">{c.label}</span>
              </div>
              <p className="mt-4 text-[0.9688rem] leading-[1.65] text-white">{c.en}</p>
              <p lang="hi" className="mt-3 text-[0.8125rem] leading-[1.7] text-navy-100/60">
                {c.hi}
              </p>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Quality policy spec sheet */}
          <div className="lg:col-span-7">
            <h3 className="reveal flex items-center gap-3 font-mono text-label uppercase text-navy-100/80">
              <span aria-hidden="true" className="h-px w-6 bg-tech" />
              Quality policy · our targets
            </h3>
            <table className="reveal mt-5 w-full border-collapse text-left" style={{ '--reveal-delay': '80ms' }}>
              <caption className="sr-only">Satpuda ITI quality policy targets</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Target</th>
                  <th scope="col">Measure</th>
                </tr>
              </thead>
              <tbody>
                {qualityTargets.map((q) => (
                  <tr key={q.measure} className="border-b border-white/10 transition-colors hover:bg-white/[0.03]">
                    <td className="w-28 py-3.5 pr-4 align-top font-mono text-[1.125rem] font-semibold tabular text-tech sm:w-36 sm:text-[1.375rem]">
                      {q.value}
                    </td>
                    <th scope="row" className="py-3.5 align-middle text-[0.9375rem] font-normal text-navy-100/85">
                      {q.measure}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* We provide */}
          <div className="lg:col-span-5">
            <h3 className="reveal flex items-center gap-3 font-mono text-label uppercase text-navy-100/80">
              <span aria-hidden="true" className="h-px w-6 bg-signal" />
              We provide
            </h3>
            <ul className="mt-5 space-y-3">
              {rightFour.map((r, i) => (
                <li
                  key={r.en}
                  className="reveal relative border border-white/12 px-5 py-4"
                  style={{ '--reveal-delay': `${80 + i * 60}ms` }}
                >
                  <p className="flex items-center gap-3 font-display text-[1.125rem] font-semibold">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />
                    {r.en}
                  </p>
                  <p lang="hi" className="mt-1 pl-5 text-[0.8125rem] text-navy-100/60">
                    {r.hi}
                  </p>
                </li>
              ))}
            </ul>
            <p className="reveal mt-6 text-[0.75rem] leading-relaxed text-navy-200/70">
              Affiliated with NCVT, New Delhi · Recommended by the Quality Council of India · Administered by the
              Directorate of Technical Education, Govt. of MP.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SafetySection;

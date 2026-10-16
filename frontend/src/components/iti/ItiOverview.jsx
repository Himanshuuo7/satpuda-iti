import SectionHeading from '../ui/SectionHeading';
import CopyButton from './CopyButton';
import { institute } from '../../data/satpudaData';
import useRevealEach from '../../hooks/useRevealEach';

/**
 * About the Institute — who runs it and under what affiliation, the group's
 * founding statement that the campus pages carry, the objectives list where
 * the campus page publishes one, and the institute's record at a glance.
 *
 * Motion: objectives and record rows settle in one after another as they
 * reach the viewport; on a fine pointer an objective row takes a red bar.
 * The DGET reference can be copied in one click.
 */
export function ItiOverview({ inst, id }) {
  const ref = useRevealEach();

  const record = [
    { label: 'Location', value: inst.location },
    { label: 'District', value: `${inst.district}, ${inst.state}` },
    { label: 'Established', value: inst.established },
    { label: 'Managed by', value: institute.trust },
    { label: 'Affiliation', value: inst.affiliation },
    { label: 'DGET reference', value: inst.dgetRef, mono: true, copy: true },
  ].filter((r) => r.value);

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby="iti-about-title"
      className="relative scroll-mt-[calc(var(--navbar-h-scrolled)+4.5rem)] bg-canvas py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              id="iti-about-title"
              eyebrow="Overview"
              title="About the Institute"
              lede={
                inst.affiliation && (
                  <span lang="hi">
                    {inst.name} का संचालन Maharana Pratap Shikshan Samiti, बालाघाट करती है। संस्थान D.G.T. और NCVT से
                    संबद्ध है तथा Quality Council of India (Q.C.I.), नई दिल्ली द्वारा अनुशंसित और मान्यता प्राप्त है।
                  </span>
                )
              }
            />

            <p
              lang="hi"
              className="reveal mt-5 max-w-prose text-[1.0625rem] leading-[1.8] text-ink-muted"
              style={{ '--reveal-delay': '160ms' }}
            >
              Satpuda समूह की स्थापना 15 दिसंबर 1999 को युवाओं की कॉर्पोरेट और उद्यमशील क्षमताओं को निरंतर गति देने के
              स्पष्ट उद्देश्य के साथ हुई थी।
            </p>

            {inst.objectives && (
              <div className="reveal mt-12">
                <h3 className="flex items-center gap-3 font-display text-[1.25rem] font-semibold tracking-tight text-navy-800">
                  <span aria-hidden="true" className="h-px w-6 bg-signal" />
                  Institute Objectives
                </h3>
                <ol className="iti-stagger mt-6 grid gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100">
                  {inst.objectives.map((item, i) => (
                    <li key={item} style={{ '--i': i }}>
                      <div className="iti-objective flex h-full gap-4 bg-white px-5 py-4">
                        <span
                          aria-hidden="true"
                          className="iti-objective-num mt-0.5 font-mono text-[0.75rem] font-medium tabular text-royal"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span lang="hi" className="text-[0.9688rem] leading-[1.7] text-navy-700">
                          {item}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <aside className="reveal lg:col-span-5" style={{ '--reveal-delay': '120ms' }} aria-labelledby="iti-record-title">
            <div className="iti-hairline overflow-hidden rounded-panel border border-navy-100 bg-canvas-soft p-6 sm:p-7 lg:sticky lg:top-[calc(var(--navbar-h-scrolled)+5rem)]">
              <h3 id="iti-record-title" className="eyebrow text-ink-muted">
                Institute record
              </h3>
              <dl className="iti-stagger mt-5 divide-y divide-navy-100">
                {record.map((r, i) => (
                  <div
                    key={r.label}
                    className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-4 py-3.5 first:pt-0 last:pb-0"
                    style={{ '--i': i }}
                  >
                    <dt className="text-[0.8125rem] text-ink-soft">{r.label}</dt>
                    <dd
                      className={
                        r.mono
                          ? 'flex min-w-0 items-center justify-between gap-3 font-mono text-[0.8125rem] tabular text-navy-800'
                          : 'text-[0.9375rem] font-medium text-navy-800'
                      }
                    >
                      {r.copy ? (
                        <>
                          <span className="break-words">{r.value}</span>
                          <CopyButton value={r.value} label="DGET reference" className="-my-1.5 shrink-0" />
                        </>
                      ) : (
                        r.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ItiOverview;

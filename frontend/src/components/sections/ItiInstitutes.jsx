import SectionHeading from '../ui/SectionHeading';
import ItiMarquee from '../iti/ItiMarquee';
import { institute } from '../../data/satpudaData';
import { itiDistricts, itiProfiles } from '../../data/itiProfiles';
import useReveal from '../../hooks/useReveal';

/**
 * Our ITI Institutes — the fourteen Satpuda ITIs, oldest first, as one
 * continuous strip with an index line counting through them. The strip, its
 * touch swiping and the index line live in `ItiMarquee`.
 */

const STATS = [
  { value: String(itiProfiles.length), label: 'ITI institutes' },
  { value: String(itiDistricts.length), label: 'Districts' },
  { value: String(institute.establishedYear), label: 'Group since' },
];

export function ItiInstitutes() {
  const ref = useReveal();

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

      <ItiMarquee />
    </section>
  );
}

export default ItiInstitutes;

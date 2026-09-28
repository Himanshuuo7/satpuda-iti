import { useMemo } from 'react';
import { ArrowRight, Mail, Navigation, Phone } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import RegionalFilter from './RegionalFilter';
import useReveal from '../../hooks/useReveal';
import useRegionParam from '../../hooks/useRegionParam';
import { itiInstitutes, mapsHrefFor } from '../../data/itiInstitutes';
import { telHref } from '../../utils/format';

/**
 * Institutes by region — a contact directory grouped by district.
 *
 * Denser than the network cards: this is where someone who already knows
 * their district finds a phone number fast. It shares the `?region=` URL state
 * with the network grid, so choosing a district in either place moves both.
 */
export function RegionalSection({ onView }) {
  const ref = useReveal({ threshold: 0.08 });
  const [region, setRegion] = useRegionParam();

  const groups = useMemo(() => {
    const byDistrict = new Map();
    itiInstitutes
      .filter((i) => region === 'all' || i.district.toLowerCase() === region)
      .forEach((i) => {
        if (!byDistrict.has(i.district)) byDistrict.set(i.district, []);
        byDistrict.get(i.district).push(i);
      });
    return [...byDistrict.entries()];
  }, [region]);

  return (
    <section
      id="regions"
      ref={ref}
      aria-labelledby="regions-title"
      className="relative scroll-mt-[var(--header-h)] bg-white py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="regions-title"
            eyebrow="Institutes by region"
            title={
              <>
                Find the campus <span className="text-royal">nearest you.</span>
              </>
            }
            className="max-w-xl"
          />
          <RegionalFilter value={region} onChange={setRegion} label="Show institutes in district" className="reveal lg:max-w-[40rem] lg:justify-end" />
        </div>

        <div aria-live="polite" className="mt-12 border-t border-navy-800">
          {groups.map(([district, list], gi) => (
            <div
              key={`${region}-${district}`}
              className="about-enter grid gap-4 border-b border-navy-100 py-8 lg:grid-cols-12 lg:gap-8"
              style={{ '--i': gi }}
            >
              <div className="lg:col-span-3">
                <h3 className="font-display text-[1.75rem] font-semibold leading-none tracking-tight text-navy-800">{district}</h3>
                <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">
                  {list.length} institute{list.length > 1 ? 's' : ''}
                </p>
              </div>

              <ul className="divide-y divide-navy-50 lg:col-span-9">
                {list.map((inst) => (
                  <li key={inst.id} className="group grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-12 md:items-center md:gap-6">
                    <div className="md:col-span-5">
                      <p className="font-semibold text-navy-800 transition-colors group-hover:text-royal">{inst.name}</p>
                      <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-ink-muted">{inst.address}</p>
                    </div>
                    <div className="flex flex-col gap-1 text-[0.8438rem] md:col-span-4">
                      <a href={telHref(inst.phone)} className="inline-flex items-center gap-2 font-mono tabular text-navy-700 hover:text-royal">
                        <Phone aria-hidden="true" className="h-3.5 w-3.5 text-ink-soft" />
                        {inst.phone}
                      </a>
                      <a href={`mailto:${inst.email}`} className="inline-flex min-w-0 items-center gap-2 text-navy-700 hover:text-royal">
                        <Mail aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-ink-soft" />
                        <span className="break-all">{inst.email}</span>
                      </a>
                    </div>
                    <div className="flex items-center gap-4 md:col-span-3 md:justify-end">
                      <a
                        href={mapsHrefFor(inst)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-[0.8125rem] text-ink-muted hover:text-royal"
                      >
                        <Navigation aria-hidden="true" className="h-3.5 w-3.5" />
                        Map<span className="sr-only"> for {inst.name} (opens in a new tab)</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => onView(inst)}
                        className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-[0.8125rem] font-semibold text-navy-800 hover:text-signal"
                      >
                        Details<span className="sr-only">: {inst.name}</span>
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RegionalSection;

import { useState } from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { campuses, campusDistricts } from '../../data/satpudaData';
import { brand } from '../../data/media';
import { telHref } from '../../utils/format';
import useReveal from '../../hooks/useReveal';
import cn from '../../utils/cn';

/**
 * Campus network.
 *
 * A selectable register rather than sixteen identical cards: the list on the
 * left is scannable at a glance, and choosing an entry resolves its full
 * published record — address, phone, email, and where available the year of
 * establishment and DGET reference — in the detail panel.
 *
 * The map is the institute's own footer artwork, used as an orienting graphic;
 * it is not an interactive map and is not presented as one.
 */
export function Campuses() {
  const ref = useReveal();
  const [activeId, setActiveId] = useState(campuses[0].id);
  const active = campuses.find((c) => c.id === activeId) ?? campuses[0];

  return (
    <section
      id="campuses"
      ref={ref}
      aria-labelledby="campuses-title"
      className="relative bg-canvas py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="06"
            eyebrow="Campus network"
            title={
              <>
                {campuses.length} campuses across
                <br />
                <span className="text-ink-muted">{campusDistricts.length} districts.</span>
              </>
            }
            className="max-w-xl"
          />
          <Button to="/campuses" variant="outline" className="reveal self-start lg:self-auto">
            All campuses
            <ArrowRight
              aria-hidden="true"
              strokeWidth={2}
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </Button>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Register */}
          <div className="reveal lg:col-span-5">
            {/* Full height on phones — a nested scroll area traps touch
                scrolling. Only constrained once it sits beside the panel. */}
            <ul className="rounded-panel border border-navy-100 bg-canvas-soft p-1.5 lg:max-h-[34rem] lg:overflow-y-auto">
              {campuses.map((campus, i) => {
                const selected = campus.id === activeId;
                return (
                  <li key={campus.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(campus.id)}
                      aria-pressed={selected}
                      className={cn(
                        'group flex w-full items-center gap-4 rounded-edge px-3.5 py-3 text-left transition-colors duration-200',
                        selected ? 'bg-navy-800' : 'hover:bg-white'
                      )}
                    >
                      <span
                        className={cn(
                          'font-mono text-[0.625rem] tabular transition-colors duration-200',
                          selected ? 'text-tech' : 'text-ink-soft'
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block truncate text-[0.9375rem] font-medium transition-colors duration-200',
                            selected ? 'text-white' : 'text-navy-700'
                          )}
                        >
                          {campus.city}
                        </span>
                        <span
                          className={cn(
                            'mt-0.5 block truncate text-[0.75rem] transition-colors duration-200',
                            selected ? 'text-navy-100/65' : 'text-ink-soft'
                          )}
                        >
                          {campus.name}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200',
                          selected ? 'bg-signal' : 'bg-navy-200 group-hover:bg-tech'
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Detail panel */}
          <div className="reveal lg:col-span-7" style={{ '--reveal-delay': '100ms' }}>
            <div className="relative h-full overflow-hidden rounded-panel border border-navy-100 bg-navy-800">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />

              {/* Institute's own locations map, as an orienting graphic. */}
              <img
                src={brand.map}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute -right-8 top-1/2 h-auto w-64 -translate-y-1/2 opacity-[0.14] sm:w-80 lg:w-96"
              />

              <div className="relative flex h-full flex-col justify-between gap-10 p-6 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-label uppercase text-tech">
                      {active.district} district
                    </span>
                    {active.established && (
                      <>
                        <span aria-hidden="true" className="h-3 w-px bg-white/20" />
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] tabular text-navy-100/60">
                          Est. {active.established}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-[2rem]">
                    {active.name}
                  </h3>

                  <p className="mt-5 flex items-start gap-3 text-[0.9375rem] leading-[1.7] text-navy-100/75">
                    <MapPin
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mt-1 h-4 w-4 shrink-0 text-tech"
                    />
                    {active.address}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                    <a
                      href={telHref(active.phone)}
                      className="group flex items-center gap-3 text-[0.9375rem] text-white transition-colors duration-200 hover:text-tech"
                    >
                      <Phone
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="h-4 w-4 shrink-0 text-tech transition-colors group-hover:text-signal"
                      />
                      <span className="font-mono tabular">{active.phone}</span>
                    </a>
                    <a
                      href={`mailto:${active.email}`}
                      className="group flex items-center gap-3 break-all text-[0.9375rem] text-navy-100/80 transition-colors duration-200 hover:text-white"
                    >
                      <Mail
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="h-4 w-4 shrink-0 text-tech transition-colors group-hover:text-signal"
                      />
                      {active.email}
                    </a>
                  </div>

                  {active.ref && (
                    <p className="border-t border-white/12 pt-4 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.1em] text-navy-100/45">
                      Affiliated with NCVT, New Delhi · Recommended by Quality Council of India
                      <br />
                      Ref. {active.ref}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Campuses;

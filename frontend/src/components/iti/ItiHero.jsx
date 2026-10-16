import { ArrowRight, ChevronRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

import Button from '../ui/Button';
import ItiMedia from './ItiMedia';
import useMagnetic from '../../hooks/useMagnetic';
import useTilt from '../../hooks/useTilt';
import { telHref } from '../../utils/format';

/**
 * Institute hero: where the visitor is (breadcrumb), the institute's official
 * name with its place set large, the campus page's own introduction, the two
 * actions the official page offers (apply, call) and the record's key facts.
 * The picture is the campus photograph, or the official mark where the site
 * publishes none.
 *
 * Motion: the copy rises line by line; the picture is wiped open, settles,
 * and its corner brackets draw in; on a fine pointer the picture tilts toward
 * the cursor under a soft glare, Apply Now leans toward the pointer, and the
 * phone icon rings on hover.
 */
export function ItiHero({ inst }) {
  const magnetRef = useMagnetic(5);
  const tiltRef = useTilt(5);

  const facts = [
    { label: 'Established', value: inst.established },
    { label: 'District', value: inst.district },
    { label: 'Trades', value: inst.courses.length ? String(inst.courses.length) : null },
    { label: 'Affiliation', value: inst.affiliation ? 'NCVT · QCI' : null },
  ].filter((f) => f.value);

  return (
    <section aria-labelledby="iti-title" className="relative overflow-hidden bg-navy-900 pt-[var(--header-h)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_65%_at_80%_40%,rgba(27,70,128,0.6),transparent_70%)]"
      />

      <div className="shell relative">
        <div className="grid items-center gap-12 pb-12 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-16">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="sec-rise">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-navy-200/70">
                <li>
                  <Link to="/" className="iti-crumb rounded-sharp hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                </li>
                <li>
                  <Link to={{ pathname: '/', hash: '#iti-institutes' }} className="iti-crumb rounded-sharp hover:text-white">
                    Our ITI Institutes
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                </li>
                <li aria-current="page" className="text-white">
                  {inst.namePlace}
                </li>
              </ol>
            </nav>

            <div className="sec-rise mt-8 flex items-center gap-3" style={{ '--d': '80ms' }}>
              <span
                aria-hidden="true"
                className="h-px w-10 origin-left animate-rule-draw bg-signal [animation-delay:250ms] [transform:scaleX(0)]"
              />
              <p className="eyebrow text-tech">{inst.location}</p>
            </div>

            {/* The official name, unbroken for assistive technology; the place
                is simply set larger. */}
            <h1 id="iti-title" className="mt-6 font-display font-bold text-white">
              {inst.namePrefix && (
                <>
                  <span className="sec-line text-[1.375rem] font-semibold leading-tight tracking-tight text-navy-100 sm:text-[1.75rem]">
                    <span style={{ '--d': '120ms' }}>{inst.namePrefix},</span>
                  </span>{' '}
                </>
              )}
              <span className="sec-line mt-1 text-display-lg">
                <span style={{ '--d': '180ms' }}>
                  {inst.namePlace}
                  <span aria-hidden="true" className="text-signal">.</span>
                </span>
              </span>
            </h1>

            <p
              lang="hi"
              className="sec-rise mt-6 max-w-[40rem] text-[1.0625rem] leading-[1.8] text-navy-100/80 sm:text-lg"
              style={{ '--d': '260ms' }}
            >
              {inst.intro}
            </p>

            <div className="sec-rise mt-9 flex flex-col gap-3 xs:flex-row xs:items-center" style={{ '--d': '340ms' }}>
              <span ref={magnetRef} className="about-magnet inline-flex w-full xs:w-auto">
                <Button to="/admission" variant="primary" size="lg" className="w-full xs:w-auto">
                  Apply Now
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </Button>
              </span>
              <Button href={telHref(inst.phone)} variant="ghostLight" size="lg" className="w-full xs:w-auto">
                <Phone aria-hidden="true" strokeWidth={2} className="campus-ring h-4 w-4" />
                Call institute
                <span className="sr-only">: {inst.phone}</span>
              </Button>
            </div>

            <dl
              className="sec-rise mt-12 grid grid-cols-2 gap-px border-y border-white/12 bg-white/10 sm:grid-cols-4"
              style={{ '--d': '420ms' }}
            >
              {facts.map((f, i) => (
                <div key={f.label} className="iti-hairline bg-navy-900 px-4 py-4">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy-200/70">{f.label}</dt>
                  <dd
                    className="sec-rise mt-1.5 font-display text-[1.0625rem] font-semibold tracking-tight tabular text-white"
                    style={{ '--d': `${520 + i * 70}ms` }}
                  >
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="sec-rise lg:col-span-5" style={{ '--d': '200ms' }}>
            <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-0">
              <span
                aria-hidden="true"
                className="iti-bracket absolute -left-3 -top-3 h-16 w-16 origin-top-left border-l-2 border-t-2 border-tech/60"
              />
              <span
                aria-hidden="true"
                className="iti-bracket absolute -bottom-3 -right-3 h-16 w-16 origin-bottom-right border-b-2 border-r-2 border-signal/70"
                style={{ '--d': '1120ms' }}
              />
              <div ref={tiltRef} className="iti-tilt relative">
                <ItiMedia
                  inst={inst}
                  image={inst.heroImage}
                  variant="hero"
                  priority
                  sizes="(min-width: 1024px) 448px, 92vw"
                  className="iti-unveil aspect-[4/3] rounded-panel border border-white/12 shadow-deep"
                />
                <span data-glare aria-hidden="true" className="iti-glare pointer-events-none absolute inset-0 rounded-panel" />
              </div>
            </div>
            {inst.heroImage && (
              <p className="mx-auto mt-4 max-w-md font-mono text-[0.625rem] uppercase tracking-[0.14em] text-navy-200/60 lg:ml-auto lg:mr-0">
                <span lang="hi">कैंपस फ़ोटो</span> · satpudaiti.com
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItiHero;

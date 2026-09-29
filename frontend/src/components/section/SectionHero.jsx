import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import cn from '../../utils/cn';

/**
 * Hero for a section page (Placement, Training) — breadcrumb, page index, the
 * headline and a lede, with an optional visual on the right.
 *
 * `section` is the section's config ({ label, base, pages, overview? }). `lines` is the
 * headline split into the lines that rise out of their masks one after
 * another. `tone="dark"` puts the hero on the navy surface (the overviews);
 * the section's own pages sit on the light drawing-office canvas.
 */
export function SectionHero({ section, page, eyebrow, lines, lede, tone = 'light', aside, children }) {
  const dark = tone === 'dark';
  const total = section.pages.length;

  return (
    <section
      aria-labelledby="section-title"
      className={cn('relative overflow-hidden', dark ? 'bg-navy-800' : 'bg-canvas-soft')}
    >
      {dark ? (
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_78%_40%,rgba(27,70,128,0.6),transparent_70%)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 blueprint-light [mask-image:radial-gradient(85%_75%_at_70%_40%,#000_30%,transparent_85%)]"
        />
      )}
      {/* A hairline with a travelling light closes the hero. */}
      <div aria-hidden="true" className={cn('pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden', dark ? 'bg-white/10' : 'bg-navy-100')}>
        <span className="about-scan absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-signal to-transparent" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-12 pb-14 pt-10 sm:pb-16 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-14">
          <div className={aside ? 'lg:col-span-7' : 'lg:col-span-10'}>
            <nav aria-label="Breadcrumb" className="sec-rise">
              <ol
                className={cn(
                  'flex flex-wrap items-center gap-1.5 text-[0.8125rem]',
                  dark ? 'text-navy-200/70' : 'text-ink-soft'
                )}
              >
                <li>
                  <Link to="/" className={cn('rounded-sharp transition-colors', dark ? 'hover:text-white' : 'hover:text-navy-800')}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                </li>
                {page ? (
                  <>
                    <li>
                      {/* A section without an overview (Activity) is a menu only. */}
                      {section.overview ? (
                        <Link
                          to={section.base}
                          className={cn('rounded-sharp transition-colors', dark ? 'hover:text-white' : 'hover:text-navy-800')}
                        >
                          {section.label}
                        </Link>
                      ) : (
                        section.label
                      )}
                    </li>
                    <li aria-hidden="true">
                      <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </li>
                    <li aria-current="page" className={dark ? 'text-white' : 'text-navy-800'}>
                      {page.short}
                    </li>
                  </>
                ) : (
                  <li aria-current="page" className={dark ? 'text-white' : 'text-navy-800'}>
                    {section.label}
                  </li>
                )}
              </ol>
            </nav>

            <div className="sec-rise mt-8 flex items-center gap-3" style={{ '--d': '80ms' }}>
              <span aria-hidden="true" className="h-px w-10 bg-signal" />
              <p className={cn('eyebrow', dark ? 'text-tech' : 'text-royal')}>{eyebrow}</p>
              {page && (
                <p className={cn('ml-auto shrink-0 whitespace-nowrap font-mono text-[0.6875rem] tabular sm:ml-3', dark ? 'text-navy-200/60' : 'text-ink-soft')}>
                  <span className={dark ? 'text-white' : 'text-navy-800'}>{String(page.index).padStart(2, '0')}</span>
                  {' / '}
                  {String(total).padStart(2, '0')}
                </p>
              )}
            </div>

            <h1
              id="section-title"
              className={cn('mt-6 font-display text-display-lg font-bold', dark ? 'text-white' : 'text-navy-800')}
            >
              {lines.map((line, i) => (
                <span key={i} className="sec-line">
                  <span style={{ '--d': `${120 + i * 90}ms` }}>{line}</span>
                </span>
              ))}
            </h1>

            {lede && (
              <p
                className={cn(
                  'sec-rise mt-7 max-w-[40rem] text-[1.0625rem] leading-[1.75] sm:text-lg',
                  dark ? 'text-navy-100/80' : 'text-ink-muted'
                )}
                style={{ '--d': `${220 + lines.length * 90}ms` }}
              >
                {lede}
              </p>
            )}

            {children && (
              <div className="sec-rise mt-9" style={{ '--d': `${300 + lines.length * 90}ms` }}>
                {children}
              </div>
            )}
          </div>

          {aside && (
            <div className="sec-rise lg:col-span-5" style={{ '--d': '260ms' }}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SectionHero;

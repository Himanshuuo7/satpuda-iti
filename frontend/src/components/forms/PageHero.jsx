import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Compact navy hero for standalone pages (Admission, Contact): breadcrumb,
 * eyebrow, headline and lede on the blueprint surface used across the site.
 */
export function PageHero({ crumb, eyebrow, lines, lede }) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden bg-navy-800">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_78%_40%,rgba(27,70,128,0.6),transparent_70%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden bg-white/10">
        <span className="about-scan absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-signal to-transparent" />
      </div>

      <div className="shell relative pb-14 pt-10 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-14">
        <nav aria-label="Breadcrumb" className="sec-rise">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-navy-200/70">
            <li>
              <Link to="/" className="rounded-sharp transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            </li>
            <li aria-current="page" className="text-white">
              {crumb}
            </li>
          </ol>
        </nav>

        <div className="sec-rise mt-8 flex items-center gap-3" style={{ '--d': '80ms' }}>
          <span aria-hidden="true" className="h-px w-10 bg-signal" />
          <p className="eyebrow text-tech">{eyebrow}</p>
        </div>

        <h1 id="page-title" className="mt-6 max-w-4xl font-display text-display-lg font-bold text-white">
          {lines.map((line, i) => (
            <span key={i} className="sec-line">
              <span style={{ '--d': `${120 + i * 90}ms` }}>{line}</span>
            </span>
          ))}
        </h1>

        {lede && (
          <p
            className="sec-rise mt-7 max-w-[40rem] text-[1.0625rem] leading-[1.75] text-navy-100/80 sm:text-lg"
            style={{ '--d': `${220 + lines.length * 90}ms` }}
          >
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageHero;

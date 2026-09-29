import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * A door into each page of a section, as a hairline-ruled grid of cards. Each
 * card lifts its icon, draws its red edge (sec-tile) and nudges its arrow on
 * hover; cards stagger in with the surrounding section's reveal.
 *
 * `iconFor` resolves the page's icon name for the section's own icon map.
 */
export function SectionPageGrid({ pages, iconFor, className = '' }) {
  // Fill the last row of the three-column layout so no bare hairline shows.
  const filler = (3 - (pages.length % 3)) % 3;

  return (
    <ul className={`grid gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {pages.map((page, i) => {
        const Icon = iconFor(page.icon);
        return (
          <li key={page.slug} className="reveal" style={{ '--reveal-delay': `${Math.min(i * 60, 480)}ms` }}>
            <Link
              to={page.to}
              className="sec-tile group relative flex h-full flex-col overflow-hidden bg-white p-6 transition-colors duration-300 hover:bg-canvas-soft sm:p-7"
            >
              <span className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-edge border border-navy-100 text-royal transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:border-royal group-hover:bg-royal group-hover:text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="font-mono text-[0.6875rem] tabular text-navy-300 transition-colors duration-300 group-hover:text-signal">
                  {String(page.index).padStart(2, '0')}
                </span>
              </span>
              <span className="mt-7 block text-[1.125rem] font-semibold leading-snug tracking-tight text-navy-800 transition-colors duration-300 group-hover:text-royal">
                {page.label}
              </span>
              <span className="mt-2 block flex-1 text-[0.9063rem] leading-[1.65] text-ink-muted">{page.summary}</span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-navy-800">
                Open page
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </span>
            </Link>
          </li>
        );
      })}
      {Array.from({ length: filler }, (_, i) => (
        <li key={`fill-${i}`} aria-hidden="true" className="hidden bg-white blueprint-light lg:block" />
      ))}
    </ul>
  );
}

export default SectionPageGrid;

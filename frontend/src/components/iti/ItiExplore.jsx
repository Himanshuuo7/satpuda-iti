import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { itiProfiles } from '../../data/itiProfiles';
import useRevealEach from '../../hooks/useRevealEach';

/**
 * Explore Other Institutes — the rest of the network, in the official menu's
 * order starting after this one, plus the routes back to the homepage list.
 *
 * Motion: tiles settle in turn; on hover or focus red hairlines draw along
 * the top and left edge, the place name leans in and the arrow slides.
 */
export function ItiExplore({ inst, id }) {
  const ref = useRevealEach();
  const at = itiProfiles.findIndex((p) => p.slug === inst.slug);
  const others = [...itiProfiles.slice(at + 1), ...itiProfiles.slice(0, at)];

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby="iti-explore-title"
      className="relative scroll-mt-[calc(var(--navbar-h-scrolled)+4.5rem)] bg-canvas py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="iti-explore-title"
            eyebrow="Satpuda ITI network"
            title="Explore Other Institutes"
            lede={<span lang="hi">Satpuda समूह के बाकी {others.length} आईटीआई संस्थानों के बारे में भी जानें।</span>}
            className="max-w-xl"
          />
          <div className="reveal flex flex-col gap-3 xs:flex-row">
            <Button to={{ pathname: '/', hash: '#iti-institutes' }} variant="outline" className="w-full xs:w-auto">
              <ArrowLeft
                aria-hidden="true"
                strokeWidth={2}
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1"
              />
              All institutes
            </Button>
            <Button to="/" variant="quiet" className="w-full xs:w-auto">
              Back to home
            </Button>
          </div>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {others.map((p, i) => (
            <li key={p.slug} className="reveal flex" style={{ '--reveal-delay': `${Math.min(i, 8) * 45}ms` }}>
              <Link
                to={p.path}
                aria-label={p.name}
                className="iti-lift sec-tile group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-panel border border-navy-100 bg-white px-5 py-4 hover:border-navy-300"
              >
                <span className="iti-nudge min-w-0">
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-royal">{p.district}</span>
                  <span className="mt-1 block font-display text-[1.125rem] font-semibold leading-tight tracking-tight text-navy-800">
                    {p.namePlace}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-muted">{p.name}</span>
                </span>
                <span aria-hidden="true" className="flex shrink-0 flex-col items-end gap-2">
                  <span className="font-mono text-[0.625rem] tabular text-navy-300">{String(p.order).padStart(2, '0')}</span>
                  <ArrowRight strokeWidth={2} className="iti-arrow h-4 w-4 text-ink-soft" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ItiExplore;

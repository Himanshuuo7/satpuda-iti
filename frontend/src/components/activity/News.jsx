import { useState } from 'react';
import { ArrowUpRight, Facebook, ZoomIn } from 'lucide-react';

import ActivityHero from './ActivityHero';
import ActivityNext from './ActivityNext';
import Figure from '../ui/Figure';
import Lightbox from '../ui/Lightbox';
import SectionHeading from '../ui/SectionHeading';
import useReveal from '../../hooks/useReveal';
import { iconFor } from './icons';
import { photos } from '../../data/media';
import { contact } from '../../data/satpudaData';
import { news as content } from '../../data/activityContent';

/**
 * News — the notice board and the press.
 *
 * The events on the institute's notice board, kept with the year they were
 * published for; the headlines of the newspaper coverage pinned on its
 * activities board, beside the board itself; and the institute's Facebook
 * page for what is new.
 */

const facebook = contact.social.find((s) => s.name === 'Facebook');

function Masthead() {
  return (
    <div className="relative overflow-hidden rounded-panel border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between border-b-2 border-navy-800 pb-3">
        <p className="font-display text-[1.25rem] font-bold tracking-tight text-navy-800">Satpuda ITI</p>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-soft">In the press</p>
      </div>
      <p lang="hi" className="mt-5 font-display text-[1.5rem] font-bold leading-snug text-navy-800 sm:text-[1.75rem]">
        {content.press[0].hi}
      </p>
      <p className="mt-2 text-[0.875rem] text-ink-muted">{content.press[0].en}</p>
      <div aria-hidden="true" className="mt-6 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((c) => (
          <div key={c} className="space-y-1.5">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="block h-1.5 rounded-full bg-navy-50" style={{ width: `${100 - ((i + c) % 3) * 14}%` }} />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[0.6875rem] tabular text-ink-soft">
        <span className="text-navy-800">{content.press.length}</span> headlines
      </p>
    </div>
  );
}

export function News({ page }) {
  const [open, setOpen] = useState(null);
  const board = useReveal({ threshold: 0.15 });
  const press = useReveal({ threshold: 0.05 });
  const follow = useReveal({ threshold: 0.3 });
  const clipping = photos.activitiesCollage;

  return (
    <>
      <ActivityHero
        page={page}
        eyebrow="Notice board & press"
        lines={[
          <>
            News<span className="text-signal">.</span>
          </>,
          <span className="text-royal">Events & headlines.</span>,
        ]}
        lede="What is on the institute’s notice board, and what the newspapers have written about Satpuda ITI."
        aside={<Masthead />}
      />

      {/* Notice board */}
      <section ref={board} aria-labelledby="board-title" className="bg-white py-20 sm:py-26">
        <div className="shell">
          <SectionHeading
            id="board-title"
            eyebrow="New events"
            title={
              <>
                On the notice board<span className="text-signal">.</span>
              </>
            }
            lede="Each notice is shown with the year it was published for."
            className="max-w-3xl"
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {content.events.map((e, i) => {
              const Icon = iconFor(e.icon);
              return (
                <li key={e.title} className="reveal" style={{ '--reveal-delay': `${i * 90}ms` }}>
                  <article className="group relative h-full overflow-hidden rounded-panel border border-navy-100 bg-canvas-soft p-6 transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-navy-200 hover:bg-white hover:shadow-lift sm:p-7">
                    <span aria-hidden="true" className="absolute right-6 top-0 h-6 w-3 rounded-b-sm bg-signal transition-[height] duration-300 group-hover:h-8" />
                    <span className="grid h-11 w-11 place-items-center rounded-edge bg-navy-800 text-tech transition-transform duration-500 ease-out group-hover:-rotate-6">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <p className="mt-6 font-mono text-[0.6875rem] tabular text-ink-soft">
                      <time dateTime={String(e.year)}>{e.year}</time>
                    </p>
                    <h3 className="mt-1 text-[1.1875rem] font-semibold text-navy-800">{e.title}</h3>
                    <p className="mt-2 text-[0.9688rem] leading-[1.6] text-ink-muted">{e.detail}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* In the press */}
      <section ref={press} aria-labelledby="press-title" className="bg-canvas-soft py-20 sm:py-26">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--navbar-h-scrolled)+6rem)]">
              <SectionHeading
                id="press-title"
                eyebrow="In the press"
                title={
                  <>
                    Satpuda ITI <span className="text-royal">in the newspapers.</span>
                  </>
                }
                lede="Headlines of the coverage pinned on the institute’s activities board."
              />
              <figure className="reveal mt-8" style={{ '--reveal-delay': '160ms' }}>
                <button
                  type="button"
                  onClick={() => setOpen(0)}
                  aria-label={`View photo: ${clipping.alt}`}
                  className="group relative block w-full overflow-hidden rounded-panel"
                >
                  <Figure
                    src={clipping.src}
                    alt={clipping.alt}
                    ratio={clipping.ratio}
                    className="rounded-panel"
                    imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 35vw, 100vw"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[0.75rem] font-semibold text-navy-800 shadow-card transition-transform duration-300 group-hover:-translate-y-0.5">
                    <ZoomIn aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} /> View the board
                  </span>
                </button>
              </figure>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {content.press.map((p, i) => (
              <li key={p.hi} className="reveal" style={{ '--reveal-delay': `${Math.min(i * 50, 400)}ms` }}>
                <article className="group grid grid-cols-[2.25rem_1fr] gap-4 border-t border-navy-100 py-6 sm:grid-cols-[3rem_1fr]">
                  <span className="pt-1.5 font-mono text-[0.75rem] tabular text-navy-300 transition-colors duration-300 group-hover:text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                    <h3 lang="hi" className="font-display text-[1.25rem] font-semibold leading-snug text-navy-800 transition-colors duration-300 group-hover:text-royal sm:text-[1.4375rem]">
                      {p.hi}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] text-ink-muted">{p.en}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Follow */}
      {facebook && (
        <section ref={follow} aria-label="Follow Satpuda ITI" className="bg-white py-16 sm:py-20">
          <div className="shell">
            <div className="reveal">
              <a
                href={facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-6 rounded-panel border border-navy-100 bg-canvas-soft p-7 transition-[border-color,box-shadow] duration-300 hover:border-navy-200 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-10"
              >
                <span className="flex items-center gap-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-royal text-white transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-105">
                    <Facebook aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block font-display text-[1.5rem] font-semibold text-navy-800">Follow Satpuda ITI on Facebook</span>
                    <span className="mt-1 block text-[0.9375rem] text-ink-muted">Placement drives, admissions and campus events as they happen.</span>
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-navy-800 group-hover:text-signal">
                  facebook.com/satpudaiti
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </div>
          </div>
        </section>
      )}

      <Lightbox items={[clipping]} index={open} onIndex={setOpen} onClose={() => setOpen(null)} label="Activities board" />
      <ActivityNext page={page} />
    </>
  );
}

export default News;

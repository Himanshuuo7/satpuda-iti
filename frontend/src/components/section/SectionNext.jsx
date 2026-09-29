import { ArrowLeft, ArrowRight, ArrowUpRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

import Button from '../ui/Button';
import GearOutline from '../ui/GearOutline';
import useReveal from '../../hooks/useReveal';
import useSpotlight from '../../hooks/useSpotlight';
import { contact } from '../../data/satpudaData';
import { telHref } from '../../utils/format';

/**
 * Close of every section page: the next page as one large link (a section
 * reads as a sequence), a quieter link back, and the admission call to action
 * on the navy surface.
 *
 * `section` is the section's config: { base, pages, overview?: { label,
 * summary }, cta: { eyebrow, eyebrowLang?, title, body } }. `page` is null on
 * the overview itself.
 */
export function SectionNext({ section, page }) {
  const ref = useReveal({ threshold: 0.1 });
  const onPointerMove = useSpotlight();

  // Without an overview page (Activity) the sequence wraps round its own pages.
  const overview = section.overview ? { ...section.overview, short: 'Overview', to: section.base } : null;
  const i = page ? page.index - 1 : -1;
  const next = section.pages[i + 1] ?? overview ?? section.pages[0];
  const prev = i < 0 ? null : i === 0 ? overview : section.pages[i - 1];
  const { cta } = section;

  return (
    <section ref={ref} aria-label="Continue" className="relative bg-white">
      <div className="shell py-16 sm:py-20">
        <div className="reveal">
          <Link
            to={next.to}
            className="group relative block overflow-hidden rounded-panel border border-navy-100 bg-canvas-soft p-7 transition-[border-color,box-shadow] duration-300 hover:border-navy-200 hover:shadow-lift sm:p-10"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-navy-800 transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
            <span className="relative flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-signal" />
              <span className="eyebrow text-ink-muted transition-colors duration-500 group-hover:text-tech">
                Next{next.index ? ` · ${String(next.index).padStart(2, '0')}` : ''}
              </span>
            </span>
            <span className="relative mt-5 flex items-end justify-between gap-6">
              <span>
                <span className="block font-display text-display-sm font-semibold text-navy-800 transition-colors duration-500 group-hover:text-white">
                  {next.label}
                </span>
                <span className="mt-3 block max-w-xl text-[0.9688rem] leading-relaxed text-ink-muted transition-colors duration-500 group-hover:text-navy-100/80">
                  {next.summary}
                </span>
              </span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-navy-200 text-navy-800 transition-[background-color,border-color,color,transform] duration-500 ease-out group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-white sm:h-14 sm:w-14">
                <ArrowUpRight aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
              </span>
            </span>
          </Link>
        </div>

        {prev && (
          <div className="reveal mt-5" style={{ '--reveal-delay': '80ms' }}>
            <Link
              to={prev.to}
              className="group inline-flex min-h-[2.75rem] items-center gap-2 text-[0.875rem] font-medium text-ink-muted transition-colors hover:text-navy-800"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" strokeWidth={2} />
              Back to {prev.short}
            </Link>
          </div>
        )}
      </div>

      <div onPointerMove={onPointerMove} className="spotlight-host relative overflow-hidden bg-navy-900">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
        <div aria-hidden="true" className="spotlight pointer-events-none absolute inset-0" />
        <GearOutline spin className="pointer-events-none absolute -bottom-36 -right-20 h-[26rem] w-[26rem] text-tech/[0.06]" />

        <div className="shell relative grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p lang={cta.eyebrowLang} className="reveal eyebrow text-tech">
              {cta.eyebrow}
            </p>
            <h2 className="reveal mt-5 font-display text-display-md font-semibold text-white" style={{ '--reveal-delay': '60ms' }}>
              {cta.title}
            </h2>
            <p className="reveal mt-5 max-w-prose text-[1.0625rem] leading-[1.7] text-navy-100/80" style={{ '--reveal-delay': '120ms' }}>
              {cta.body}
            </p>
          </div>

          <div className="reveal flex flex-col gap-3 xs:flex-row lg:col-span-5 lg:justify-end" style={{ '--reveal-delay': '160ms' }}>
            <Button to="/admission" variant="primary" size="lg">
              Apply Now
              <ArrowRight aria-hidden="true" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Button>
            <Button href={telHref(contact.enquiry.phone)} variant="ghostLight" size="lg">
              <Phone aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
              <span className="font-mono tabular">{contact.enquiry.phone}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionNext;

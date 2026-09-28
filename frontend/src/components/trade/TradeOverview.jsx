import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

import SectionHeading from '../ui/SectionHeading';
import Figure from '../ui/Figure';
import { tradeIcon } from './icons';
import { themeFor } from './theme';
import { photos } from '../../data/media';
import useReveal from '../../hooks/useReveal';
import useCountUp from '../../hooks/useCountUp';
import cn from '../../utils/cn';

/**
 * Overview — what the trade is, in one paragraph, one number and six areas.
 *
 * The number is the practical share of the curriculum's training hours: the
 * single fact that says most about what an ITI year feels like. The six areas
 * sit on a hairline grid rather than in cards, and a Satpuda photograph joins
 * them only where one of that kind of work exists.
 */
export function TradeOverview({ trade }) {
  const ref = useReveal();
  const { accent } = themeFor(trade);
  const year = trade.structure[0];
  const total = year.practical + year.theory + year.employability;
  const share = Math.round((year.practical / total) * 100);
  const [shareRef, shareValue] = useCountUp(share, { duration: 1200 });
  const photo = trade.overview.photo ? photos[trade.overview.photo] : null;

  return (
    <section
      id="overview"
      ref={ref}
      aria-labelledby="overview-title"
      className="relative scroll-mt-[var(--header-h)] bg-white py-20 sm:py-26 lg:py-30"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="overview-title"
            eyebrow="Overview"
            title={
              <>
                What the trade
                <br />
                <span className={accent.text}>is about.</span>
              </>
            }
          />
          <p
            className="reveal mt-6 max-w-prose text-[1.0625rem] leading-[1.75] text-ink-muted"
            style={{ '--reveal-delay': '120ms' }}
          >
            {trade.overview.intro}
          </p>

          {/* Practical share */}
          <div className="reveal mt-10 border-l-2 border-navy-100 pl-5" style={{ '--reveal-delay': '160ms' }}>
            <p ref={shareRef} className="font-display text-[3.25rem] font-semibold leading-none tabular text-navy-800">
              {shareValue}
              <span className={accent.text}>%</span>
            </p>
            <p className="mt-2 text-[0.9375rem] font-medium text-navy-700">
              of each year’s training hours are trade practical
            </p>
            <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft">
              {year.practical.toLocaleString('en-IN')} of {total.toLocaleString('en-IN')} hours · DGT curriculum
            </p>
          </div>

          {/* Where Satpuda runs it */}
          {trade.campuses.length > 0 && (
            <div className="reveal mt-10" style={{ '--reveal-delay': '200ms' }}>
              <p className="font-mono text-label uppercase text-ink-soft">Offered at Satpuda campuses</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {trade.campuses.map((c) => (
                  <li
                    key={c.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-canvas-soft px-3 py-1.5 text-[0.8125rem] font-medium text-navy-700"
                  >
                    <MapPin aria-hidden="true" strokeWidth={2} className={cn('h-3.5 w-3.5', accent.text)} />
                    {c.shortName}
                  </li>
                ))}
              </ul>
              <Link
                to={{ pathname: '/', hash: '#campuses' }}
                className="group mt-4 inline-flex min-h-[2.75rem] items-center gap-2 text-[0.875rem] font-semibold text-navy-800 hover:text-royal"
              >
                Campus addresses & phone numbers
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          {photo && (
            <figure className="reveal group m-0 mb-px">
              <Figure
                src={photo.src}
                alt={photo.alt}
                ratio="16/9"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="rounded-t-panel"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              >
                <div aria-hidden="true" className="about-shutter absolute inset-0 bg-navy-800" />
              </Figure>
              <figcaption className="border-x border-navy-100 bg-canvas-soft px-5 py-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft">
                {trade.overview.photoCaption}
              </figcaption>
            </figure>
          )}

          <ul
            className={cn(
              'grid gap-px overflow-hidden border border-navy-100 bg-navy-100 sm:grid-cols-2',
              photo ? 'rounded-b-panel' : 'rounded-panel'
            )}
          >
            {trade.overview.areas.map((a, i) => {
              const Icon = tradeIcon(a.icon);
              return (
                <li
                  key={a.title}
                  className="about-tile reveal group relative bg-white p-6 transition-colors duration-300 hover:bg-canvas-soft sm:p-7"
                  style={{ '--reveal-delay': `${i * 60}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className={cn(
                        'h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110',
                        accent.text
                      )}
                    />
                    <h3 className="font-display text-[1.125rem] font-semibold leading-snug text-navy-800">{a.title}</h3>
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ink-muted">{a.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TradeOverview;

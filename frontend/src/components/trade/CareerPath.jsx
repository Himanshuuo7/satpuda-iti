import { Award, GraduationCap, Handshake, TrendingUp, Wrench } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import { tradeIcon } from './icons';
import { themeFor } from './theme';
import useRevealEach from '../../hooks/useRevealEach';
import useScrollProgress from '../../hooks/useScrollProgress';
import cn from '../../utils/cn';

/**
 * Career path — admission to the top of the ladder the curriculum describes,
 * as one spine that fills with scroll; each step lights as it is reached. The
 * other progression pathways the curriculum lists sit beside it as branches.
 */
export function CareerPath({ trade }) {
  const ref = useRevealEach();
  const spine = useScrollProgress({ anchor: 0.6 });
  const { accent } = themeFor(trade);
  const { ladder, routes } = trade.pathway;
  const [first, ...growth] = ladder;

  const steps = [
    {
      icon: GraduationCap,
      label: 'Admission',
      title: trade.facts.entryShort,
      body: `Minimum age ${trade.facts.minAge} years on the first day of the session.`,
    },
    {
      icon: Wrench,
      label: 'ITI training',
      title: `${trade.facts.duration} · ${trade.facts.hours}`,
      body: 'Trade practical and theory, employability skills, and on-the-job training or a group project.',
    },
    {
      icon: Award,
      label: 'Certification',
      title: 'National Trade Certificate',
      body: 'Awarded by DGT after the All India Trade Test.',
    },
    {
      icon: Handshake,
      label: 'First step',
      title: `Apprenticeship or ${first}`,
      body: `An apprenticeship in industry leading to the NAC, or joining industry as a ${first.toLowerCase()}.`,
    },
    ...growth.map((role) => ({ icon: TrendingUp, label: 'Growth', title: role, small: true })),
  ];

  const branches = routes.filter((r) => r.title !== 'Apprenticeship');

  return (
    <section
      id="path"
      ref={ref}
      aria-labelledby="path-title"
      className="relative scroll-mt-[var(--header-h)] bg-canvas-soft py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <SectionHeading
          id="path-title"
          eyebrow="Career path"
          title={
            <>
              From admission
              <br />
              <span className={accent.text}>to career growth.</span>
            </>
          }
          lede="The route and progression pathways set out in the DGT curriculum for this trade."
          className="max-w-2xl"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ol ref={spine} className="relative lg:col-span-7">
            <span aria-hidden="true" className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-navy-100">
              <span className={cn('trade-spine absolute inset-0', accent.bg)} />
            </span>

            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={`${s.label}-${s.title}`}
                  className={cn('reveal group relative pl-16', s.small ? 'pb-5' : 'pb-10', 'last:pb-0')}
                  style={{ '--reveal-delay': '60ms' }}
                >
                  <span
                    className={cn(
                      'trade-step-dot absolute grid place-items-center rounded-full border-2 border-navy-100 bg-white text-ink-soft',
                      '[.is-visible>&]:border-navy-800 [.is-visible>&]:bg-navy-800 [.is-visible>&]:text-white',
                      // Both sizes centre on the spine at 1.375rem.
                      s.small ? 'left-1 top-0.5 h-9 w-9' : 'left-0 top-0 h-11 w-11'
                    )}
                  >
                    <Icon aria-hidden="true" strokeWidth={1.75} className={s.small ? 'h-4 w-4' : 'h-5 w-5'} />
                  </span>
                  <p className="pt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">
                    {s.label}
                  </p>
                  <h3
                    className={cn(
                      'mt-1 font-display font-semibold leading-snug text-navy-800 transition-colors duration-300',
                      s.small ? 'text-[1.125rem]' : 'text-[1.375rem]',
                      accent.hoverText
                    )}
                  >
                    {s.title}
                  </h3>
                  {s.body && <p className="mt-2 max-w-prose text-[0.9375rem] leading-[1.65] text-ink-muted">{s.body}</p>}
                </li>
              );
            })}
          </ol>

          <aside aria-labelledby="routes-title" className="lg:col-span-5">
            <h3 id="routes-title" className="reveal font-display text-[1.375rem] font-semibold text-navy-800">
              Other routes after ITI
            </h3>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-panel border border-navy-100 bg-navy-100">
              {branches.map((r, i) => {
                const Icon = tradeIcon(r.icon);
                return (
                  <li
                    key={r.title}
                    className="reveal group flex gap-4 bg-white p-5 transition-colors duration-300 hover:bg-canvas-soft"
                    style={{ '--reveal-delay': `${i * 60}ms` }}
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className={cn('mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5', accent.text)}
                    />
                    <div>
                      <p className="font-semibold text-navy-800">{r.title}</p>
                      <p className="mt-1 text-[0.875rem] leading-[1.6] text-ink-muted">{r.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CareerPath;

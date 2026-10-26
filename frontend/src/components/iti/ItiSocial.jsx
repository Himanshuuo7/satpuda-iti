import { ArrowUpRight, Facebook, Instagram } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import useRevealEach from '../../hooks/useRevealEach';
import cn from '../../utils/cn';

/**
 * Social Media — the campus's own Facebook and Instagram pages
 * (`inst.social`), each a card under the network's own mark that opens the
 * page in a new tab. The page shows this section only for an institute whose
 * record lists a page.
 *
 * Motion: cards settle in turn and lift on hover; the mark tips and the
 * arrow slides out toward the page it opens.
 */

const NETWORKS = {
  facebook: {
    name: 'Facebook',
    // Lucide's "f", filled solid as on Facebook's own mark.
    mark: <Facebook aria-hidden="true" strokeWidth={0} fill="currentColor" className="h-8 w-8" />,
    tile: 'bg-[#1877F2]',
    noun: 'पेज',
  },
  instagram: {
    name: 'Instagram',
    mark: <Instagram aria-hidden="true" strokeWidth={2} className="h-8 w-8" />,
    tile: 'bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]',
    noun: 'पेज',
  },
};

export function ItiSocial({ inst, id }) {
  const ref = useRevealEach();
  const pages = inst.social.filter((p) => NETWORKS[p.network]);

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby="iti-social-title"
      className="relative scroll-mt-[calc(var(--navbar-h-scrolled)+4.5rem)] overflow-hidden bg-navy-800 py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />

      <div className="shell relative grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
        <SectionHeading
          id="iti-social-title"
          tone="dark"
          eyebrow="Stay connected"
          title="Follow Us Online"
          className="lg:col-span-5"
          lede={
            <span lang="hi">
              {inst.namePlace} कैंपस की गतिविधियों, कार्यक्रमों और सूचनाओं के लिए संस्थान के सोशल मीडिया पेज से जुड़िए — क्लिक
              करते ही पेज नए टैब में खुल जाएगा।
            </span>
          }
        />

        <div className="reveal lg:col-span-7" style={{ '--reveal-delay': '120ms' }}>
          <ul className="iti-stagger grid gap-4 sm:grid-cols-2">
            {pages.map((p, i) => {
              const n = NETWORKS[p.network];
              return (
                <li key={p.href} style={{ '--i': i }} className={cn(pages.length === 1 && 'sm:col-span-2')}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="iti-lift group flex h-full items-center gap-5 rounded-panel border border-white/12 bg-white/5 p-5 hover:border-tech/50 sm:p-6"
                  >
                    <span
                      className={cn(
                        'grid h-16 w-16 shrink-0 place-items-center rounded-edge text-white shadow-deep transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105',
                        n.tile
                      )}
                    >
                      {n.mark}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[1.125rem] font-semibold tracking-tight text-white sm:text-[1.25rem]">
                        {n.name}
                      </span>
                      <span lang="hi" className="mt-1 block text-[0.875rem] leading-snug text-navy-100/75">
                        {inst.name} का {n.name} {n.noun}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={2}
                      className="h-5 w-5 shrink-0 text-navy-100/60 transition-[color,transform] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tech"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ItiSocial;

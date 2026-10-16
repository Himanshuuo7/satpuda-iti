import { useState } from 'react';
import { Quote } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import useRevealEach from '../../hooks/useRevealEach';

/**
 * Message from the Principal — the message, name and photograph as the campus
 * page publishes them. Where the page carries no photograph (or it fails to
 * load), the person's initials stand in rather than a stock portrait.
 *
 * Motion: a navy shutter lifts off the portrait as it settles from a slight
 * push-in; the quote mark pops in, the paragraphs follow one by one, and the
 * name is underlined.
 */

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function ItiPrincipal({ inst, id }) {
  const ref = useRevealEach();
  const { message } = inst;
  const [failed, setFailed] = useState(false);
  const showPhoto = message.photo && !failed;
  const roleHi = message.role === 'Principal' ? 'प्राचार्य' : 'संपर्क व्यक्ति';

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby="iti-message-title"
      className="relative scroll-mt-[calc(var(--navbar-h-scrolled)+4.5rem)] overflow-hidden bg-navy-800 py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-30" />

      <div className="shell relative">
        <SectionHeading id="iti-message-title" tone="dark" eyebrow="Leadership" title="Message from the Principal" />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <figure className="reveal lg:col-span-4" style={{ '--reveal-delay': '100ms' }}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-panel border border-white/12 bg-navy-900 shadow-deep lg:mx-0">
              {showPhoto ? (
                <img
                  src={message.photo}
                  alt={`${roleHi} ${message.name}`}
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailed(true)}
                  className="iti-portrait-img absolute inset-0 h-full w-full object-cover object-top"
                />
              ) : (
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center blueprint">
                  <span className="iti-portrait-img grid h-24 w-24 place-items-center rounded-full border border-tech/40 bg-navy-800 font-display text-[2rem] font-semibold tracking-tight text-white">
                    {initials(message.name)}
                  </span>
                </div>
              )}
              <span aria-hidden="true" className="about-shutter absolute inset-0 bg-navy-700" style={{ '--reveal-delay': '150ms' }} />
            </div>
            <figcaption className="mx-auto mt-5 max-w-[18rem] lg:mx-0">
              <span className="relative inline-block font-display text-[1.25rem] font-semibold tracking-tight text-white">
                {message.name}
                <span aria-hidden="true" className="iti-underline absolute -bottom-1 left-0 h-[2px] w-full bg-signal" />
              </span>
              <span className="mt-2.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-tech">{message.role}</span>
              <span className="mt-1.5 block text-[0.8125rem] text-navy-100/70">{inst.name}</span>
            </figcaption>
          </figure>

          <blockquote className="reveal lg:col-span-8" style={{ '--reveal-delay': '160ms' }}>
            <Quote aria-hidden="true" className="iti-quote h-9 w-9 text-signal" strokeWidth={1.5} />
            <div lang="hi" className="iti-stagger mt-5 space-y-5 text-[1.0625rem] leading-[1.9] text-navy-100/85 sm:text-[1.125rem]">
              {message.paragraphs.map((p, i) => (
                <p key={p.slice(0, 24)} style={{ '--i': i * 2 + 4 }}>
                  {p}
                </p>
              ))}
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default ItiPrincipal;

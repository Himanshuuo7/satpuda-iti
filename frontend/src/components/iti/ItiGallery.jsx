import { useState } from 'react';
import { Expand } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import Lightbox from '../ui/Lightbox';
import useRevealEach from '../../hooks/useRevealEach';

/**
 * Campus Gallery — only photographs the official site publishes for this
 * campus. Each opens in the shared full-screen viewer.
 *
 * Motion: tiles wipe open one after another; on hover or keyboard focus the
 * photograph pushes in, the expand mark turns and the caption rises.
 */
export function ItiGallery({ inst, id }) {
  const ref = useRevealEach();
  const [open, setOpen] = useState(null);

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby="iti-gallery-title"
      className="relative scroll-mt-[calc(var(--navbar-h-scrolled)+4.5rem)] bg-canvas py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <SectionHeading
          id="iti-gallery-title"
          eyebrow="Campus"
          title="Campus Gallery"
          lede={<span lang="hi">{inst.namePlace} कैंपस की ये तस्वीरें संस्थान की आधिकारिक वेबसाइट पर प्रकाशित हैं।</span>}
        />

        <ul className="mt-12 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4">
          {inst.gallery.map((photo, i) => (
            <li key={photo.src} className="reveal" style={{ '--reveal-delay': `${80 + i * 90}ms` }}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="iti-lift iti-wipe group relative block aspect-[4/3] w-full overflow-hidden rounded-panel bg-navy-50 text-left shadow-card"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="iti-media-img absolute inset-0 h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(3,11,23,0.75)_100%)]"
                />
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 overflow-hidden">
                  <span lang="hi" className="iti-caption block px-4 pb-3.5 pr-14 text-[0.8125rem] leading-snug text-white">
                    {photo.alt}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy-800 shadow-card"
                >
                  <Expand className="iti-expand h-4 w-4" strokeWidth={2} />
                </span>
                <span className="sr-only">
                  Open photo {i + 1} of {inst.gallery.length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        items={inst.gallery}
        index={open}
        onIndex={setOpen}
        onClose={() => setOpen(null)}
        label={`${inst.name} campus photographs`}
      />
    </section>
  );
}

export default ItiGallery;

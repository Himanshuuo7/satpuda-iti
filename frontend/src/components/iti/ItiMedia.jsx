import { useState } from 'react';

import GearOutline from '../ui/GearOutline';
import { brand } from '../../data/media';
import cn from '../../utils/cn';

/**
 * An institute's picture: its own campus photograph where the official site
 * publishes one, otherwise a plate carrying the official Satpuda ITI mark.
 *
 * Both share one composition — the mark top-left, the place name and the
 * year along the bottom — so a strip of photo cards and plate cards reads as
 * one set. A photograph that fails to load degrades to the plate rather than
 * a broken-image glyph. The overlay text repeats what the surrounding card or
 * page already says, so it is hidden from assistive technology; the
 * photograph keeps its own alt text.
 */
export function ItiMedia({ inst, image = inst.image, variant = 'card', priority = false, sizes, className }) {
  const [failed, setFailed] = useState(false);
  const photo = image && !failed;
  const hero = variant === 'hero';

  return (
    <div className={cn('relative isolate overflow-hidden bg-navy-900', className)}>
      {photo ? (
        <img
          src={image.src}
          alt={image.alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
          className="iti-media-img absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 blueprint opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_85%_10%,rgba(27,70,128,0.85),transparent_70%)]" />
          <GearOutline
            className={cn(
              'iti-media-img absolute text-tech/[0.14]',
              hero ? '-bottom-16 -right-16 h-72 w-72' : '-bottom-10 -right-10 h-40 w-40'
            )}
          />
        </div>
      )}

      {/* Scrim — heavier over a photograph so the white type always holds. */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0',
          photo
            ? 'bg-[linear-gradient(180deg,rgba(3,11,23,0.35)_0%,rgba(3,11,23,0)_32%,rgba(3,11,23,0)_45%,rgba(3,11,23,0.88)_100%)]'
            : 'bg-[linear-gradient(180deg,transparent_45%,rgba(3,11,23,0.55)_100%)]'
        )}
      />

      <div aria-hidden="true" className={cn('absolute inset-0 flex flex-col justify-between', hero ? 'p-5 sm:p-6' : 'p-4')}>
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              'grid shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_6px_18px_-8px_rgba(0,0,0,0.6)]',
              hero ? 'h-14 w-14' : 'h-10 w-10'
            )}
          >
            <img src={brand.mark} alt="" width="56" height="56" loading="lazy" className="h-full w-full object-contain" />
          </span>
          {inst.established && (
            <span className="rounded-sharp border border-white/25 bg-navy-950/40 px-1.5 py-1 font-mono text-[0.625rem] uppercase leading-none tracking-[0.12em] tabular text-white backdrop-blur-[2px]">
              Est. {inst.established}
            </span>
          )}
        </div>

        <div>
          <span className="flex items-center gap-2">
            <span className="h-px w-5 bg-signal" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy-100/85">
              {inst.district}
            </span>
          </span>
          <span
            className={cn(
              'mt-1.5 block font-display font-semibold leading-none tracking-[-0.03em] text-white',
              hero ? 'text-[2rem] sm:text-[2.5rem]' : 'text-[1.625rem]'
            )}
          >
            {inst.namePlace}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ItiMedia;

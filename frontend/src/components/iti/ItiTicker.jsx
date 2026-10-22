import { memo } from 'react';

import Odometer from '../ui/Odometer';
import { itiProfiles } from '../../data/itiProfiles';

/**
 * The index line under the institutes marquee: which institute is in front
 * ("03 / 14"), the year it was established and where it is, over a line of
 * fourteen numbered segments.
 *
 * Every digit sits on a drum that rolls through the numbers in between, like
 * an odometer, and the place name rises in behind a mask. The segments
 * before the front one stay filled; the front one fills from `--iti-seg`,
 * which the marquee writes straight to the DOM as its card travels, so this
 * component renders only when the front institute changes.
 *
 * It mirrors the card list, which already names every institute, so it is
 * hidden from assistive technology.
 */

const pad = (n) => String(n).padStart(2, '0');
const TOTAL = pad(itiProfiles.length);

const placeOf = (inst) =>
  inst.namePlace === inst.district ? inst.namePlace : `${inst.namePlace}, ${inst.district}`;

export const ItiTicker = memo(function ItiTicker({ current }) {
  const inst = itiProfiles[current];

  return (
    <div aria-hidden="true">
      <div className="flex items-end justify-between gap-6">
        <p className="flex items-baseline gap-2">
          <span className="font-display text-[2.5rem] font-semibold leading-none tracking-tight tabular text-navy-800 sm:text-[3rem]">
            <Odometer value={pad(current + 1)} />
          </span>
          <span className="font-mono text-[0.75rem] tabular text-ink-soft">/ {TOTAL}</span>
        </p>

        <p className="min-w-0 pb-0.5 text-right">
          <span className="block font-mono text-[0.625rem] uppercase leading-none tracking-[0.14em] tabular text-ink-soft">
            Est. <Odometer value={inst.established} />
          </span>
          <span className="mt-2 block overflow-hidden">
            <span
              key={inst.id}
              className="iti-ticker-in block truncate font-display text-[0.9375rem] font-semibold leading-snug tracking-tight text-navy-800 sm:text-[1.0625rem]"
            >
              {placeOf(inst)}
            </span>
          </span>
        </p>
      </div>

      <ol className="mt-4 flex gap-[3px] sm:mt-5 sm:gap-1">
        {itiProfiles.map((p, i) => (
          <li
            key={p.id}
            className="iti-seg min-w-0 flex-1"
            data-state={i < current ? 'done' : i === current ? 'front' : 'next'}
            style={{ '--seg': i }}
          >
            <span className="iti-seg-bar">
              <span className="iti-seg-fill" />
            </span>
            <span className="iti-seg-num block text-center font-mono text-[0.5625rem] leading-none tabular sm:text-left sm:text-[0.625rem]">
              {pad(i + 1)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
});

export default ItiTicker;

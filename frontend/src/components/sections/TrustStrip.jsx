import { accreditations } from '../../data/satpudaData';

/**
 * Accreditation band.
 *
 * A thin technical rail rather than a logo wall — the official site names these
 * bodies in text but publishes no marks for them, so inventing badges would be
 * asserting something it does not. The row scrolls continuously on narrow
 * screens and settles into a static grid once there is room.
 */
export function TrustStrip() {
  const items = accreditations;

  return (
    <section
      aria-label="Affiliations and recognition"
      className="relative border-y border-navy-100 bg-canvas-soft"
    >
      <div className="shell flex flex-col gap-4 py-5 xl:flex-row xl:items-center xl:gap-10 xl:py-4">
        <div className="flex shrink-0 items-center gap-3">
          <span aria-hidden="true" className="h-px w-6 bg-signal" />
          <p className="eyebrow text-ink-muted">Affiliated &amp; Recognised</p>
        </div>

        {/* Marquee below xl. Six abbreviations plus their notes need ~1280px
            to sit still without the row overflowing, so the static rail only
            takes over at xl. */}
        <div className="mask-fade-x -mx-[var(--shell-pad)] overflow-hidden px-[var(--shell-pad)] xl:hidden">
          <ul className="flex w-max animate-marquee items-center gap-8">
            {[...items, ...items].map((item, i) => (
              <li key={`${item.abbr}-${i}`} className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="font-display text-sm font-bold tracking-tight text-navy-700">
                  {item.abbr}
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-soft">
                  {item.note}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Static rail on wide screens */}
        <ul className="hidden min-w-0 flex-1 items-center justify-between gap-6 xl:flex">
          {items.map((item) => (
            <li key={item.abbr} className="group min-w-0">
              <span
                className="block font-display text-[0.9375rem] font-bold tracking-tight text-navy-700 transition-colors duration-200 group-hover:text-signal"
                title={item.name}
              >
                {item.abbr}
              </span>
              <span className="mt-0.5 block truncate font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-soft">
                {item.note}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TrustStrip;

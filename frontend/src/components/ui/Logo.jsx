import { Link } from 'react-router-dom';
import { brand } from '../../data/media';
import cn from '../../utils/cn';

/**
 * Official Satpuda ITI mark and wordmark lock-up.
 *
 * The supplied artwork is a circular lock-up on an opaque white field, so it is
 * always presented inside a white disc at its native aspect ratio — never
 * recoloured, stretched, or cropped into the wordmark ring. On navy surfaces
 * the disc reads as an intentional badge; on light surfaces a hairline ring
 * keeps its edge defined.
 *
 * The wordmark is set in three registers — name, full designation, then the
 * motto — closed by three red markers lifted from the gear ring.
 */
export function Logo({ tone = 'dark', showWordmark = true, className, to = '/' }) {
  const onDark = tone === 'dark';

  const content = (
    <>
      <span
        className={cn(
          'relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-white',
          'h-12 w-12 sm:h-14 sm:w-14',
          // The mark alone takes the hover, so the wordmark never shifts.
          'transition-[box-shadow,transform] duration-300 ease-out group-hover/logo:scale-[1.04]',
          onDark
            ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_6px_18px_-8px_rgba(0,0,0,0.6)]'
            : 'shadow-[0_0_0_1px_rgba(11,45,92,0.1)]'
        )}
      >
        <img
          src={brand.mark}
          alt=""
          width="56"
          height="56"
          className="h-full w-full object-contain"
        />
      </span>

      {showWordmark && (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              'font-display text-[1.0625rem] font-bold leading-none tracking-[-0.02em] sm:text-[1.25rem]',
              onDark ? 'text-white' : 'text-navy-800'
            )}
          >
            SATPUDA ITI
          </span>
          <span
            className={cn(
              'mt-[0.3rem] font-display text-[0.625rem] font-bold uppercase leading-none tracking-[0.015em] sm:text-[0.75rem]',
              onDark ? 'text-navy-100' : 'text-navy-700'
            )}
          >
            Industrial Training Institute
          </span>
          <span
            className={cn(
              'mt-[0.35rem] hidden text-[0.5rem] font-medium uppercase leading-none tracking-[0.28em] sm:block',
              onDark ? 'text-navy-200/70' : 'text-ink-soft'
            )}
          >
            Skill · Train · Empower
          </span>

          {/* Three markers from the gear ring — the only red at this size. */}
          <span aria-hidden="true" className="mt-[0.45rem] hidden items-center gap-1.5 sm:flex">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-[5px] w-[5px] rounded-full bg-signal" />
            ))}
          </span>
        </span>
      )}
    </>
  );

  const classes = cn('group/logo flex items-center gap-3', className);

  if (!to) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link
      to={to}
      className={cn(classes, 'rounded-edge transition-opacity duration-200 hover:opacity-90')}
      aria-label="Satpuda Private Industrial Training Institute — home"
    >
      {content}
    </Link>
  );
}

export default Logo;

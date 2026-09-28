import cn from '../../utils/cn';

/**
 * Section masthead: a technical rule, an eyebrow label, the heading, and
 * an optional lede held to a comfortable reading measure.
 *
 * `tone` switches the whole block between the light canvas and the navy
 * surfaces; secondary text is tinted from the surface hue rather than going
 * generic gray.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  tone = 'light',
  align = 'left',
  className,
  children,
}) {
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'reveal flex items-center gap-3',
            align === 'center' && 'justify-center'
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'h-px w-8 tick-rule',
              dark ? 'text-tech/60' : 'text-navy-300'
            )}
          />
          <span
            className={cn(
              'eyebrow',
              dark ? 'text-navy-100/75' : 'text-ink-muted'
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        id={id}
        className={cn(
          'reveal mt-5 text-display-md font-semibold',
          dark ? 'text-white' : 'text-navy-800'
        )}
        style={{ '--reveal-delay': '60ms' }}
      >
        {title}
      </h2>

      {lede && (
        <p
          className={cn(
            'reveal mt-5 max-w-prose text-[1.0625rem] leading-[1.7]',
            dark ? 'text-navy-100/80' : 'text-ink-muted'
          )}
          style={{ '--reveal-delay': '120ms' }}
        >
          {lede}
        </p>
      )}

      {children}
    </div>
  );
}

export default SectionHeading;

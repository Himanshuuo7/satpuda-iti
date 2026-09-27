import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import cn from '../../utils/cn';

/**
 * Responsive image with a reserved box and a real failure state.
 *
 * The aspect ratio is applied to the wrapper so layout never shifts while the
 * file resolves, and a failed load degrades to a labelled blueprint panel
 * rather than a broken-image glyph.
 */
export function Figure({
  src,
  alt,
  ratio = '4/3',
  className,
  imgClassName,
  priority = false,
  sizes,
  children,
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      /* `w-full` is load-bearing: with only an inline aspect-ratio and an
         `auto` width, the ratio resolves width *from* height, so a box with a
         min-height can grow far past its grid column. Pinning the width makes
         the ratio drive height, which is what every caller means. */
      className={cn('relative w-full overflow-hidden bg-navy-50', className)}
      style={ratio === 'auto' ? undefined : { aspectRatio: ratio }}
    >
      {failed ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-navy-800 blueprint text-navy-200"
          role="img"
          aria-label={alt}
        >
          <ImageOff className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
          <span className="px-6 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em]">
            Image unavailable
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          // React 18 passes only the lowercase attribute through to the DOM.
          fetchpriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
          className={cn('absolute inset-0 h-full w-full object-cover', imgClassName)}
        />
      )}
      {children}
    </div>
  );
}

export default Figure;

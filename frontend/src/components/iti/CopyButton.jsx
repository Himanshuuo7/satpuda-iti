import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';

import cn from '../../utils/cn';

/**
 * Copies a value to the clipboard. The icon morphs to a check and a small
 * "Copied" pill rises from the button; screen readers hear the same through
 * a polite live region. Not rendered where the Clipboard API is unavailable
 * (insecure contexts), so it never offers an action that cannot work.
 */
export function CopyButton({ value, label, className }) {
  const [copied, setCopied] = useState(false);
  const supported = typeof navigator !== 'undefined' && Boolean(navigator.clipboard?.writeText);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  if (!supported) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Permission refused — the link beside it still works.
    }
  };

  return (
    <span className={cn('relative inline-flex', className)}>
      <button
        type="button"
        onClick={copy}
        className={cn(
          'grid h-11 w-11 place-items-center rounded-edge border text-ink-muted transition-[border-color,color,background-color,transform] duration-200 active:scale-[0.94]',
          copied ? 'border-tech/60 bg-tech-50 text-tech-700' : 'border-navy-100 bg-white hover:border-navy-300 hover:text-navy-800'
        )}
      >
        <span key={copied ? 'done' : 'idle'} className="campus-pop grid place-items-center">
          {copied ? (
            <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          )}
        </span>
        <span className="sr-only">Copy {label}</span>
      </button>
      <span
        aria-hidden="true"
        data-show={copied}
        className="iti-copied pointer-events-none absolute -top-8 left-1/2 whitespace-nowrap rounded-full bg-navy-800 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white shadow-card"
      >
        Copied
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied` : ''}
      </span>
    </span>
  );
}

export default CopyButton;

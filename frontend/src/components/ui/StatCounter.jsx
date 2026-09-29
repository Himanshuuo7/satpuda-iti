import useCountUp from '../../hooks/useCountUp';
import cn from '../../utils/cn';

/**
 * A figure that counts up once when it scrolls into view. Numbers are set in
 * the Indian system (2,40,000) and always land on the exact value; `decimals`
 * counts in tenths (or finer) for figures such as 2.4 lakh.
 */
export function StatCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  label,
  note,
  tone = 'light',
  className,
  duration = 1500,
}) {
  const scale = 10 ** decimals;
  const [ref, raw] = useCountUp(Math.round(value * scale), { duration });
  const current = raw / scale;
  const dark = tone === 'dark';

  return (
    <div ref={ref} className={cn('border-l pl-4', dark ? 'border-white/15' : 'border-navy-100', className)}>
      <p
        className={cn(
          'font-display text-[2.25rem] font-semibold leading-none tabular sm:text-[2.5rem]',
          dark ? 'text-white' : 'text-navy-800'
        )}
      >
        <span className={dark ? 'text-tech' : 'text-royal'}>{prefix}</span>
        {current.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        <span className="text-signal">{suffix}</span>
      </p>
      <p className={cn('mt-2.5 text-[0.875rem] font-medium', dark ? 'text-navy-100' : 'text-navy-700')}>{label}</p>
      {note && (
        <p className={cn('mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em]', dark ? 'text-navy-200/60' : 'text-ink-soft')}>
          {note}
        </p>
      )}
    </div>
  );
}

export default StatCounter;

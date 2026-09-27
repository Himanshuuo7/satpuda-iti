import { itiRegions, regionCount } from '../../data/itiInstitutes';
import cn from '../../utils/cn';

/**
 * District switch shared by the network grid and the regional directory. The
 * value lives in the URL (see useRegionParam), so both stay in step.
 *
 * `tone` switches between the light canvas and navy surfaces.
 */
export function RegionalFilter({ value, onChange, label = 'Filter by district', tone = 'light', className }) {
  const dark = tone === 'dark';
  return (
    <div role="group" aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {itiRegions.map((r) => {
        const on = r.id === value;
        return (
          <button
            key={r.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(r.id)}
            className={cn(
              'inline-flex min-h-[2.5rem] items-center gap-2 rounded-full border px-4 text-[0.8125rem] font-medium transition-colors duration-200',
              on
                ? 'border-signal bg-signal text-white'
                : dark
                  ? 'border-white/20 text-navy-100 hover:border-tech hover:text-white'
                  : 'border-navy-100 bg-white text-navy-700 hover:border-royal hover:text-royal'
            )}
          >
            {r.label}
            <span
              className={cn(
                'font-mono text-[0.625rem] tabular',
                on ? 'text-white/80' : dark ? 'text-navy-200/70' : 'text-ink-soft'
              )}
            >
              {regionCount(r.id)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default RegionalFilter;

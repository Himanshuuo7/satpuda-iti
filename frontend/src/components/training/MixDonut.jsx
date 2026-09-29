import { competency } from '../../data/trainingContent';

/**
 * Donut of how training time is divided, as published (sums to 100%), with
 * a legend in English and Hindi. `tone` matches the surface it sits on.
 */

export const MIX_COLORS = ['#E01B24', '#0B16C9', '#16C7D9', '#3B67A8', '#6E95CB', '#A9C2E3', '#D6E2F2'];

export function MixDonut({ tone = 'dark' }) {
  const dark = tone === 'dark';
  const r = 70;
  let offset = 0;
  const segments = competency.mix.map((m, i) => {
    const seg = { ...m, color: MIX_COLORS[i], dash: m.value, gap: 100 - m.value, offset: -offset };
    offset += m.value;
    return seg;
  });
  const lead = competency.mix[0];

  return (
    <figure className={`rounded-panel p-6 sm:p-8 ${dark ? 'border border-white/12 bg-navy-900/60 backdrop-blur-sm' : 'border border-navy-100 bg-white shadow-card'}`}>
      <figcaption className={`font-mono text-label uppercase ${dark ? 'text-tech' : 'text-ink-soft'}`}>Training mix</figcaption>
      <div className="mt-6 grid items-center gap-6 sm:grid-cols-[11rem_1fr]">
        <div className="relative mx-auto aspect-square w-44">
          <svg viewBox="0 0 180 180" className="sec-pop h-full w-full -rotate-90" aria-hidden="true" style={{ '--d': '300ms' }}>
            <circle cx="90" cy="90" r={r} fill="none" stroke={dark ? 'rgba(255,255,255,0.08)' : '#EEF3FA'} strokeWidth="20" />
            {segments.map((s) => (
              <circle
                key={s.en}
                cx="90"
                cy="90"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="20"
                pathLength="100"
                strokeDasharray={`${s.dash - 0.6} ${s.gap + 0.6}`}
                strokeDashoffset={s.offset}
              />
            ))}
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className={`font-display text-[2.25rem] font-bold leading-none tabular ${dark ? 'text-white' : 'text-navy-800'}`}>{lead.value}%</p>
              <p className={`mt-1 text-[0.75rem] ${dark ? 'text-navy-100/80' : 'text-ink-muted'}`}>{lead.en}</p>
            </div>
          </div>
        </div>
        <ul className="grid gap-1.5">
          {segments.map((s) => (
            <li key={s.en} className={`flex items-center gap-2.5 text-[0.8125rem] ${dark ? 'text-navy-100/85' : 'text-navy-700'}`}>
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-sharp" style={{ background: s.color }} />
              <span className="flex-1">
                {s.en} <span lang="hi" className={dark ? 'text-navy-200/60' : 'text-ink-soft'}>· {s.hi}</span>
              </span>
              <span className={`font-mono tabular ${dark ? 'text-white' : 'text-navy-800'}`}>{s.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

export default MixDonut;

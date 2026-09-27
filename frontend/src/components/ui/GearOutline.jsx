import cn from '../../utils/cn';

/**
 * Gear outline drawn from the logo's toothed ring.
 *
 * Authored rather than borrowed so the tooth count, stroke weight and inner
 * rings stay consistent with the mark. Purely decorative, so it is hidden from
 * assistive technology.
 */
export function GearOutline({ teeth = 16, className, spin = false, strokeWidth = 1 }) {
  const outer = 50;
  const toothDepth = 7;
  const inner = outer - toothDepth;

  const path = Array.from({ length: teeth }, (_, i) => {
    const step = (Math.PI * 2) / teeth;
    const a0 = i * step;
    const w = step * 0.3;
    const pt = (r, a) => `${(60 + r * Math.cos(a)).toFixed(2)} ${(60 + r * Math.sin(a)).toFixed(2)}`;
    return [
      `${i === 0 ? 'M' : 'L'} ${pt(inner, a0 - w)}`,
      `L ${pt(outer, a0 - w * 0.62)}`,
      `L ${pt(outer, a0 + w * 0.62)}`,
      `L ${pt(inner, a0 + w)}`,
      `A ${inner} ${inner} 0 0 1 ${pt(inner, a0 + step - w)}`,
    ].join(' ');
  }).join(' ');

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn(spin && 'animate-gear-spin', className)}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
        <path d={`${path} Z`} />
        <circle cx="60" cy="60" r="30" />
        <circle cx="60" cy="60" r="13" />
        {/* Technical centre cross */}
        <path d="M60 41v-9M60 88v-9M41 60h-9M88 60h-9" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  );
}

export default GearOutline;

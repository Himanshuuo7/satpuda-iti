import { Link } from 'react-router-dom';
import cn from '../../utils/cn';

/**
 * The one action primitive.
 *
 * `primary` is the red industrial CTA and is the only place red appears at
 * size — keeping it rare is what gives it force. Every variant shares the same
 * 44px minimum target and the global cyan focus ring.
 */

const base =
  'group relative inline-flex items-center justify-center gap-2.5 min-h-[2.875rem] ' +
  'font-medium tracking-tight rounded-edge ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out ' +
  'hover:-translate-y-0.5 active:translate-y-px ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary:
    'bg-signal text-white px-6 py-3 shadow-[0_1px_2px_rgba(122,12,17,0.22),0_10px_24px_-12px_rgba(224,27,36,0.55)] ' +
    'hover:bg-signal-600 hover:shadow-[0_2px_4px_rgba(122,12,17,0.26),0_16px_32px_-14px_rgba(224,27,36,0.62)]',
  solid:
    'bg-navy text-white px-6 py-3 shadow-[0_1px_2px_rgba(7,27,51,0.2),0_10px_24px_-14px_rgba(7,27,51,0.5)] ' +
    'hover:bg-navy-500',
  outline:
    'border border-navy-200 text-navy px-6 py-3 bg-white/70 ' +
    'hover:border-navy-400 hover:bg-white hover:shadow-card',
  // The hero's secondary action, which sits beside the red CTA at the same
  // weight — so it carries a heavier navy rule than the quiet `outline`.
  outlineStrong:
    'border-[1.5px] border-navy-600 text-navy-800 px-6 py-3 bg-white font-semibold ' +
    'hover:border-navy-800 hover:bg-navy-50 hover:shadow-card',
  ghostLight:
    'border border-white/25 text-white px-6 py-3 backdrop-blur-[2px] ' +
    'hover:border-tech/70 hover:bg-white/10',
  quiet:
    'text-navy px-2 py-2 hover:text-signal',
};

const sizes = {
  sm: 'text-[0.8125rem] px-4 py-2 min-h-[2.375rem]',
  md: 'text-[0.9375rem]',
  lg: 'text-base px-7 py-3.5 min-h-[3.125rem]',
};

export function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  const Tag = as ?? 'button';
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

export default Button;

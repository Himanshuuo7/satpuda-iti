import cn from '../../utils/cn';
import { STATUS_META } from './labels';

export function StatusBadge({ status, className }) {
  const meta = STATUS_META[status] ?? STATUS_META.new;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.75rem] font-medium ring-1 ring-inset',
        meta.chip,
        className
      )}
    >
      <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', meta.dot)} />
      {meta.label}
    </span>
  );
}

export default StatusBadge;

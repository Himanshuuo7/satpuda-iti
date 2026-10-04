import { useId } from 'react';
import { ChevronDown } from 'lucide-react';

import cn from '../../utils/cn';

/**
 * Form primitives for the Admission and Contact pages.
 *
 * Each field owns its label, hint and error so the forms read as a flat list.
 * Errors are wired with aria-invalid / aria-describedby, and the control's
 * border turns red only when there is something to fix — red stays reserved
 * for action and emphasis everywhere else.
 */

const control =
  'block w-full rounded-edge border bg-white px-3.5 py-3 text-[0.9375rem] text-ink ' +
  'placeholder:text-ink-soft/70 transition-[border-color,box-shadow] duration-200 ' +
  'hover:border-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-tech/40';

const border = (error) => (error ? 'border-signal-400' : 'border-navy-100');

function FieldShell({ id, label, required, hint, error, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline gap-1 text-[0.8125rem] font-medium text-navy-800">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-signal">*</span>
        ) : (
          <span className="font-normal text-ink-soft">(optional)</span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8125rem] text-signal-600">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-[0.8125rem] text-ink-soft">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function useFieldProps({ name, error, hint, required }) {
  const id = `${useId()}-${name}`;
  return {
    id,
    a11y: {
      id,
      name,
      required,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
    },
  };
}

export function TextField({ label, name, error, hint, required, className, ...props }) {
  const { id, a11y } = useFieldProps({ name, error, hint, required });
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <input {...a11y} {...props} className={cn(control, border(error))} />
    </FieldShell>
  );
}

export function TextAreaField({ label, name, error, hint, required, className, rows = 4, ...props }) {
  const { id, a11y } = useFieldProps({ name, error, hint, required });
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <textarea {...a11y} rows={rows} {...props} className={cn(control, 'resize-y', border(error))} />
    </FieldShell>
  );
}

/** `options` is [{ value, label }]; the empty first option is the prompt. */
export function SelectField({
  label,
  name,
  error,
  hint,
  required,
  className,
  options,
  placeholder = 'Select',
  ...props
}) {
  const { id, a11y } = useFieldProps({ name, error, hint, required });
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <div className="relative">
        <select {...a11y} {...props} className={cn(control, 'appearance-none pr-10', border(error))}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={2}
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
        />
      </div>
    </FieldShell>
  );
}

/** Segmented radio group (gender etc.). */
export function RadioGroupField({ label, name, value, onChange, options, error, required, className }) {
  const id = `${useId()}-${name}`;
  return (
    <fieldset className={className} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="flex items-baseline gap-1 text-[0.8125rem] font-medium text-navy-800">
        {label}
        {required && (
          <span aria-hidden="true" className="text-signal">*</span>
        )}
      </legend>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                'relative flex min-h-[2.875rem] cursor-pointer items-center rounded-edge border px-4 text-[0.9375rem] transition-colors duration-200',
                'focus-within:ring-2 focus-within:ring-tech/40',
                checked
                  ? 'border-navy-600 bg-navy-50 font-medium text-navy-800'
                  : cn('bg-white text-ink-muted hover:border-navy-300', border(error))
              )}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={onChange}
                required={required}
                aria-invalid={error ? true : undefined}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8125rem] text-signal-600">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** Numbered group heading inside a long form. */
export function FormSection({ index, title, children }) {
  return (
    <section className="border-t border-navy-100 pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.6875rem] tabular text-royal">{String(index).padStart(2, '0')}</span>
        <h2 className="font-display text-lg font-semibold text-navy-800">{title}</h2>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

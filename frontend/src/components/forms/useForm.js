import { useState } from 'react';
import { ApiError } from '../../services/api';

/**
 * Minimal controlled-form state: values, field errors from the API's 422, a
 * status flag and one top-level message. Validation rules live on the server
 * so the two sides cannot drift; the browser's own `required` / `type` checks
 * catch the obvious cases before a request is made.
 */
export function useForm(initial, submit) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    try {
      const res = await submit(values);
      setResult(res);
      setMessage(res.message);
      setStatus('success');
    } catch (err) {
      setErrors(err instanceof ApiError && err.errors ? err.errors : {});
      setMessage(err.message);
      setStatus('error');
      // Move focus to the first field that needs fixing.
      requestAnimationFrame(() => document.querySelector('form [aria-invalid="true"]')?.focus());
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setStatus('idle');
    setMessage('');
    setResult(null);
  };

  /** Spread onto a field: name, value, onChange and its error. */
  const field = (name) => ({ name, value: values[name], onChange, error: errors[name] });

  return { values, errors, status, message, result, onSubmit, reset, field };
}

export default useForm;

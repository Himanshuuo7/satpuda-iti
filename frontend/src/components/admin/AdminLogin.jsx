import { useState } from 'react';
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';

import Button from '../ui/Button';
import Logo from '../ui/Logo';
import GearOutline from '../ui/GearOutline';
import { login } from '../../services/adminApi';

/** Password gate for the dashboard. */
export function AdminLogin({ onSuccess, notice }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(password);
      onSuccess();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-800 px-4 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(27,70,128,0.6),transparent_70%)]"
      />
      <GearOutline spin className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] text-tech/[0.06]" />

      <div className="relative w-full max-w-md">
        <div className="flex justify-center">
          <Logo tone="dark" />
        </div>

        <div className="mt-10 rounded-panel bg-white p-7 shadow-deep sm:p-9">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-edge bg-navy-50 text-navy-600">
              <Lock aria-hidden="true" strokeWidth={1.75} className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold text-navy-800">Admin dashboard</h1>
              <p className="text-[0.8125rem] text-ink-soft">Admissions &amp; contact enquiries</p>
            </div>
          </div>

          {notice && !error && (
            <p className="mt-6 rounded-edge border border-amber-200 bg-amber-50 px-4 py-3 text-[0.8125rem] text-amber-800">
              {notice}
            </p>
          )}

          <form onSubmit={onSubmit} className="mt-7">
            <label htmlFor="admin-password" className="text-[0.8125rem] font-medium text-navy-800">
              Password
            </label>
            <div className="relative mt-1.5">
              <input
                id="admin-password"
                type={show ? 'text' : 'password'}
                autoComplete="current-password"
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? 'admin-password-error' : undefined}
                className="block w-full rounded-edge border border-navy-100 bg-white px-3.5 py-3 pr-11 text-[0.9375rem] text-ink transition-[border-color,box-shadow] hover:border-navy-300 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-tech/40"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-edge text-ink-soft hover:text-navy-800"
              >
                {show ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
              </button>
            </div>
            {error && (
              <p id="admin-password-error" role="alert" className="mt-2 text-[0.8125rem] text-signal-600">
                {error}
              </p>
            )}

            <Button type="submit" variant="solid" size="lg" disabled={busy || !password} className="mt-6 w-full">
              {busy && <Loader2 aria-hidden="true" strokeWidth={2} className="h-4 w-4 animate-spin" />}
              {busy ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-[0.75rem] text-navy-200/60">Authorised staff only.</p>
      </div>
    </main>
  );
}

export default AdminLogin;

import { useEffect, useState } from 'react';

import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import useSeo from '../hooks/useSeo';
import { SESSION_EXPIRED, getToken, logout, verifySession } from '../services/adminApi';

/**
 * Admin — /admin.
 *
 * Shows the login screen until the backend issues a session token, then the
 * dashboard. Rendered without the public header and footer (see App.jsx) and
 * kept out of search engines.
 */
export function AdminPage() {
  useSeo({ title: 'Admin | Satpuda ITI', description: 'Satpuda ITI admin dashboard.' });

  // 'checking' while an existing token is verified on load.
  const [state, setState] = useState(() => (getToken() ? 'checking' : 'out'));
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let robots = document.head.querySelector('meta[name="robots"]');
    const previous = robots?.getAttribute('content');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');
    return () => {
      if (previous) robots.setAttribute('content', previous);
      else robots.remove();
    };
  }, []);

  useEffect(() => {
    if (state !== 'checking') return;
    verifySession()
      .then(() => setState('in'))
      .catch(() => setState('out'));
  }, [state]);

  useEffect(() => {
    const onExpired = () => {
      setNotice('Your session has expired. Please sign in again.');
      setState('out');
    };
    window.addEventListener(SESSION_EXPIRED, onExpired);
    return () => window.removeEventListener(SESSION_EXPIRED, onExpired);
  }, []);

  if (state === 'checking') {
    return <div className="min-h-screen bg-navy-800" role="status" aria-label="Loading" />;
  }

  if (state === 'out') {
    return (
      <AdminLogin
        notice={notice}
        onSuccess={() => {
          setNotice('');
          setState('in');
        }}
      />
    );
  }

  return (
    <AdminDashboard
      onLogout={() => {
        logout();
        setState('out');
      }}
    />
  );
}

export default AdminPage;

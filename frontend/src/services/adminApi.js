import { API_BASE_URL, ApiError } from './api';

/**
 * Admin dashboard API. The session token lives in sessionStorage, so closing
 * the browser tab logs the admin out; any 401 clears it and notifies the
 * dashboard through a window event so it can fall back to the login screen.
 */

const TOKEN_KEY = 'satpuda-admin-token';
export const SESSION_EXPIRED = 'satpuda-admin:session-expired';

export function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token) {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // Storage blocked: the session simply won't survive a reload.
  }
}

async function call(method, path, body) {
  const token = getToken();
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('Could not reach the server. Is the backend running?', 0);
  }

  const data = await response.json().catch(() => ({}));
  if (response.status === 401 && path !== '/api/admin/login') {
    setToken(null);
    window.dispatchEvent(new Event(SESSION_EXPIRED));
  }
  if (!response.ok) {
    throw new ApiError(data.message ?? 'Something went wrong.', response.status, data.errors ?? null);
  }
  return data;
}

const qs = (params) => {
  const clean = Object.entries(params).filter(([, v]) => v !== '' && v != null);
  return clean.length ? `?${new URLSearchParams(clean)}` : '';
};

export async function login(password) {
  const data = await call('POST', '/api/admin/login', { password });
  setToken(data.token);
  return data;
}

export function logout() {
  setToken(null);
}

export const verifySession = () => call('GET', '/api/admin/me');
export const getStats = () => call('GET', '/api/admin/stats');

/** `resource` is 'admissions' or 'contact'. */
export const listRecords = (resource, params) => call('GET', `/api/${resource}${qs(params)}`);
export const exportRecords = (resource, params) => call('GET', `/api/${resource}/export${qs(params)}`);
export const updateStatus = (resource, id, status) => call('PATCH', `/api/${resource}/${id}/status`, { status });
export const deleteRecord = (resource, id) => call('DELETE', `/api/${resource}/${id}`);

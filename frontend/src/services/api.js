/**
 * Transport seam for the future MERN backend.
 *
 * Today every resource resolves from the local `src/data` modules. When the
 * Express/Mongo API exists, set `VITE_API_BASE_URL` and the domain services in
 * this folder start hitting it — no component changes required, because they
 * already consume the same promise-based shapes.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

/** True once a real backend is configured. */
export const hasRemoteApi = Boolean(API_BASE_URL);

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export { ApiError };

/**
 * Thin fetch wrapper. Unused while `hasRemoteApi` is false, but present so the
 * request/error contract is already settled.
 */
export async function request(path, options = {}) {
  if (!hasRemoteApi) {
    throw new ApiError('No API base URL configured', 0);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(`Request failed: ${path}`, response.status);
  }

  return response.json();
}

/**
 * Resolves local data now, remote data later.
 *
 * @param {string} path   API path to use once a backend exists.
 * @param {Function} local Thunk returning the bundled fallback.
 */
export async function resolve(path, local) {
  if (hasRemoteApi) {
    try {
      return await request(path);
    } catch {
      // A backend outage should never blank the site.
      return local();
    }
  }
  return local();
}

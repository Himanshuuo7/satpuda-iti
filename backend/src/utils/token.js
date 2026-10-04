import crypto from 'node:crypto';
import env from '../config/env.js';

/**
 * Small signed session token (payload.signature, both base64url) — enough for
 * a single admin account without pulling in a JWT library.
 */
const b64 = (value) => Buffer.from(value).toString('base64url');
const sign = (data) => crypto.createHmac('sha256', env.tokenSecret).update(data).digest('base64url');

export function createToken(claims = {}) {
  const exp = Date.now() + env.tokenTtlHours * 3600 * 1000;
  const payload = b64(JSON.stringify({ ...claims, exp }));
  return { token: `${payload}.${sign(payload)}`, expiresAt: new Date(exp).toISOString() };
}

/** Returns the claims, or null if the token is malformed, forged or expired. */
export function verifyToken(token = '') {
  const [payload, signature] = String(token).split('.');
  if (!payload || !signature || !env.tokenSecret) return null;
  if (!safeEqual(signature, sign(payload))) return null;
  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return claims.exp > Date.now() ? claims : null;
  } catch {
    return null;
  }
}

/** Constant-time string comparison. */
export function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

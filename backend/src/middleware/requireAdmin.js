import { verifyToken } from '../utils/token.js';

/** Guards admin routes: expects `Authorization: Bearer <token>` from POST /api/admin/login. */
export function requireAdmin(req, res, next) {
  const [scheme, token] = (req.get('authorization') || '').split(' ');
  const claims = scheme === 'Bearer' ? verifyToken(token) : null;
  if (!claims) {
    return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
  }
  req.admin = claims;
  next();
}

export default requireAdmin;

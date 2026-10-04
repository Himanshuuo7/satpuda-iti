import { Router } from 'express';
import { login, me, stats } from '../controllers/adminController.js';
import requireAdmin from '../middleware/requireAdmin.js';
import { loginLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/login', loginLimiter, login);
router.get('/me', requireAdmin, me);
router.get('/stats', requireAdmin, stats);

export default router;

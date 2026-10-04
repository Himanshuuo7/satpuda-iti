import { Router } from 'express';
import {
  createAdmission,
  deleteAdmission,
  exportAdmissions,
  getAdmission,
  listAdmissions,
  updateAdmissionStatus,
} from '../controllers/admissionController.js';
import requireAdmin from '../middleware/requireAdmin.js';
import validate from '../middleware/validate.js';
import { submitLimiter } from '../middleware/rateLimit.js';
import { validateAdmission } from '../validators/admission.js';

const router = Router();

router.post('/', submitLimiter, validate(validateAdmission), createAdmission);
router.get('/', requireAdmin, listAdmissions);
router.get('/export', requireAdmin, exportAdmissions);
router.get('/:id', requireAdmin, getAdmission);
router.patch('/:id/status', requireAdmin, updateAdmissionStatus);
router.delete('/:id', requireAdmin, deleteAdmission);

export default router;

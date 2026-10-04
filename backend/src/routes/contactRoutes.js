import { Router } from 'express';
import {
  createContact,
  deleteContact,
  exportContacts,
  listContacts,
  updateContactStatus,
} from '../controllers/contactController.js';
import requireAdmin from '../middleware/requireAdmin.js';
import validate from '../middleware/validate.js';
import { submitLimiter } from '../middleware/rateLimit.js';
import { validateContact } from '../validators/contact.js';

const router = Router();

router.post('/', submitLimiter, validate(validateContact), createContact);
router.get('/', requireAdmin, listContacts);
router.get('/export', requireAdmin, exportContacts);
router.patch('/:id/status', requireAdmin, updateContactStatus);
router.delete('/:id', requireAdmin, deleteContact);

export default router;

import mongoose from 'mongoose';
import { CONTACT_SUBJECTS, STATUSES } from '../config/options.js';

/** A message sent from the contact page. */
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, maxlength: 120 },
    subject: { type: String, required: true, enum: CONTACT_SUBJECTS },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: { type: String, enum: STATUSES, default: 'new' },
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });

export default mongoose.model('Contact', contactSchema);

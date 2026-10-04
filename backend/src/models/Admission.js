import mongoose from 'mongoose';
import { CAMPUSES, GENDERS, QUALIFICATIONS, STATUSES, TRADES } from '../config/options.js';

/** An online admission application (basic details). */
const admissionSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    fatherName: { type: String, required: true, trim: true, maxlength: 100 },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: GENDERS },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, maxlength: 120 },
    qualification: { type: String, required: true, enum: QUALIFICATIONS },
    percentage: { type: Number, min: 0, max: 100 },
    trade: { type: String, required: true, enum: TRADES },
    campus: { type: String, required: true, enum: CAMPUSES },
    address: { type: String, required: true, trim: true, maxlength: 300 },
    district: { type: String, required: true, trim: true, maxlength: 60 },
    message: { type: String, trim: true, maxlength: 1000 },
    status: { type: String, enum: STATUSES, default: 'new' },
    referenceNo: { type: String, unique: true },
  },
  { timestamps: true }
);

admissionSchema.index({ createdAt: -1 });

/** Short, human-readable reference shown to the applicant, e.g. SITI-26-4F7K2Q. */
admissionSchema.pre('validate', function setReference() {
  if (!this.referenceNo) {
    const year = String(new Date().getFullYear()).slice(-2);
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    this.referenceNo = `SITI-${year}-${rand}`;
  }
});

export default mongoose.model('Admission', admissionSchema);

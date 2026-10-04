/**
 * Domain services. Each function returns the shape a REST endpoint would,
 * so swapping `resolve()` over to the live API later is a one-line change
 * per resource.
 */

import { post, resolve } from './api';
import {
  accreditations,
  campuses,
  contact,
  differentiators,
  homeCounters,
  institute,
  missionVision,
  noticeBoard,
  placement,
  qualityPolicy,
  testimonials,
  trades,
  training,
} from '../data/satpudaData';

export const getInstitute = () =>
  resolve('/api/institute', () => ({ ...institute, missionVision, qualityPolicy }));

export const getTrades = () => resolve('/api/trades', () => trades);

export const getCampuses = () => resolve('/api/campuses', () => campuses);

export const getPlacement = () => resolve('/api/placement', () => placement);

export const getTraining = () => resolve('/api/training', () => training);

export const getTestimonials = () => resolve('/api/testimonials', () => testimonials);

export const getAccreditations = () => resolve('/api/accreditations', () => accreditations);

export const getDifferentiators = () => resolve('/api/differentiators', () => differentiators);

export const getCounters = () => resolve('/api/stats', () => homeCounters);

export const getNotices = () => resolve('/api/notices', () => noticeBoard);

export const getContact = () => resolve('/api/contact-info', () => contact);

/** Online admission application (basic details). Resolves { message, data: { referenceNo } }. */
export const submitAdmission = (form) => post('/api/admissions', form);

/** Contact-page message. */
export const submitContact = (form) => post('/api/contact', form);

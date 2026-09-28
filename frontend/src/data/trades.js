/**
 * Trade details for the About page.
 *
 * Duration is the value every official campus page publishes for the trade.
 * Eligibility is only set where an official page states it plainly; where the
 * site's wording is unclear it stays null and the UI points to the current
 * DGT admission notice instead. Which campus offers which trade is derived
 * from itiInstitutes.js, never listed here.
 *
 * Retrieved 2026-09-26.
 */

import { itiInstitutes } from './itiInstitutes';

const VERIFIED_AT = '2026-09-26';

export const tradeDetails = [
  {
    id: 'electrician',
    code: 'ELE',
    name: 'Electrician',
    duration: '2 years',
    eligibility: '10th pass with Science',
    summary:
      'A job-oriented vocational course; successful candidates are awarded vocational training certificates.',
    scheme: 'CTS · NCVT',
    slug: '/trades/electrician',
    icon: 'Zap',
    sourceUrls: ['https://satpudaiti.com/betul/', 'https://satpudaiti.com/iti-rewa/'],
  },
  {
    id: 'fitter',
    code: 'FIT',
    name: 'Fitter',
    duration: '2 years',
    eligibility: null,
    summary:
      'Opens routes into shipbuilding and repair, infrastructure and defence organisations, and public-sector industry.',
    scheme: 'CTS · NCVT',
    slug: '/trades/fitter',
    icon: 'Wrench',
    sourceUrls: ['https://satpudaiti.com/betul/'],
  },
  {
    id: 'mechanic-diesel',
    code: 'MDL',
    name: 'Mechanic Diesel',
    duration: '1 year',
    eligibility: null,
    summary:
      'Automobile engineering with a specialisation in the mechanics of diesel engines.',
    scheme: 'CTS · NCVT',
    slug: '/trades/mechanic-diesel',
    icon: 'Cog',
    sourceUrls: ['https://satpudaiti.com/betul/'],
  },
  {
    id: 'copa',
    code: 'COPA',
    name: 'COPA',
    fullName: 'Computer Operator & Programming Assistant',
    duration: '1 year',
    eligibility: null,
    summary:
      'Operates computers and peripheral equipment to process business, scientific and engineering data.',
    scheme: 'CTS · NCVT',
    slug: '/trades/copa',
    icon: 'MonitorCog',
    sourceUrls: ['https://satpudaiti.com/itarsi/'],
  },
].map((trade) => ({
  ...trade,
  verifiedAt: VERIFIED_AT,
  campuses: itiInstitutes.filter((i) => i.trades.some((x) => x.id === trade.id)),
}));

export const tradeById = Object.fromEntries(tradeDetails.map((t) => [t.id, t]));

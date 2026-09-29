/**
 * Placement section — the six pages under /placements.
 *
 * They mirror the Placement menu of the institute's website, in the same order
 * and under the same names. Kept free of imports so the site navigation
 * (satpudaData.js) can build the Placement dropdown from it.
 */

export const PLACEMENT_BASE = '/placements';

export const placementPages = [
  {
    slug: 'industrial-interface',
    label: 'Industrial Interface & Student Development',
    short: 'Industrial Interface',
    summary: 'Industry experts in the classroom, periodic industry visits and a Placement & Guidance Cell.',
    icon: 'Factory',
  },
  {
    slug: 'career-path',
    label: 'Career Path',
    short: 'Career Path',
    summary: 'Three routes from an NCVT ITI — a career in industry, higher qualifications or a business of your own.',
    icon: 'Route',
  },
  {
    slug: 'entrepreneurship',
    label: 'Entrepreneurship Development',
    short: 'Entrepreneurship',
    summary: 'उद्यमिता विकास — every stage from a business mind set to franchisee development.',
    icon: 'Lightbulb',
  },
  {
    slug: 'recruiters',
    label: 'Recruiters',
    short: 'Recruiters',
    summary: '2456 campus placements in the last three years, with recruiters from across industry.',
    icon: 'Building2',
  },
  {
    slug: 'skill-connect',
    label: 'Skill Connect',
    short: 'Skill Connect',
    summary: 'Skill – Industry – Manpower: the partners and programmes that surround every trainee.',
    icon: 'Network',
  },
  {
    slug: 'details',
    label: 'Placement Details',
    short: 'Placement Details',
    summary: 'Year by year: placement drives, trainees placed, placement percentage and salary package.',
    icon: 'BarChart3',
  },
].map((p, i) => ({ ...p, index: i + 1, to: `${PLACEMENT_BASE}/${p.slug}` }));

export const placementPageBySlug = Object.fromEntries(placementPages.map((p) => [p.slug, p]));

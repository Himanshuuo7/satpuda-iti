/**
 * Activity section — the four pages under /activity.
 *
 * They mirror the Activity menu of the institute's website, in the same order
 * and under the same names. As there, Activity is a menu only — it has no page
 * of its own. Kept free of imports so the site navigation (satpudaData.js) can
 * build the Activity dropdown from it. `short` is the compact label used by the
 * section's own sub-navigation.
 */

export const ACTIVITY_BASE = '/activity';

export const activityPages = [
  {
    slug: 'students-life',
    label: 'Student’s Life – Activities',
    short: 'Student’s Life',
    summary: 'विविध गतिविधियां — national days, workshops, sports, culture and industrial visits.',
    icon: 'PartyPopper',
  },
  {
    slug: 'safety',
    label: 'Safety',
    short: 'Safety',
    summary: 'Health, safety and security norms, and the institute’s safety programmes.',
    icon: 'ShieldCheck',
  },
  {
    slug: 'gallery',
    label: 'Gallery',
    short: 'Gallery',
    summary: 'Workshops, classrooms, industrial visits and campus life, in photographs.',
    icon: 'Images',
  },
  {
    slug: 'news',
    label: 'News',
    short: 'News',
    summary: 'Events on the notice board and Satpuda ITI in the press.',
    icon: 'Newspaper',
  },
].map((p, i) => ({ ...p, index: i + 1, to: `${ACTIVITY_BASE}/${p.slug}` }));

export const activityPageBySlug = Object.fromEntries(activityPages.map((p) => [p.slug, p]));

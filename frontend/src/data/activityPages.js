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
    summary: 'विविध गतिविधियां — राष्ट्रीय दिवस, कार्यशालाएँ, खेलकूद, सांस्कृतिक कार्यक्रम और औद्योगिक भ्रमण।',
    icon: 'PartyPopper',
  },
  {
    slug: 'safety',
    label: 'Safety',
    short: 'Safety',
    summary: 'स्वास्थ्य, सुरक्षा और संरक्षा के मानदंड, और संस्थान के सुरक्षा कार्यक्रम।',
    icon: 'ShieldCheck',
  },
  {
    slug: 'gallery',
    label: 'Gallery',
    short: 'Gallery',
    summary: 'वर्कशॉप, कक्षाएँ, औद्योगिक भ्रमण और कैंपस जीवन — तस्वीरों में।',
    icon: 'Images',
  },
  {
    slug: 'news',
    label: 'News',
    short: 'News',
    summary: 'नोटिस बोर्ड के कार्यक्रम और अख़बारों में Satpuda ITI।',
    icon: 'Newspaper',
  },
].map((p, i) => ({ ...p, index: i + 1, to: `${ACTIVITY_BASE}/${p.slug}` }));

export const activityPageBySlug = Object.fromEntries(activityPages.map((p) => [p.slug, p]));

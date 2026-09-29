/**
 * Training section — the six pages under /training.
 *
 * They mirror the Training menu of the institute's website, in the same order
 * and under the same names. Kept free of imports so the site navigation
 * (satpudaData.js) can build the Training dropdown from it. `short` is the
 * compact label used by the section's own sub-navigation.
 */

export const TRAINING_BASE = '/training';

export const trainingPages = [
  {
    slug: 'learning-process',
    label: 'Learning Process',
    short: 'Learning',
    summary: 'Nine teaching methods, NIMI instructional material and an advanced teaching methodology.',
    icon: 'BookOpen',
  },
  {
    slug: 'admission-to-placement',
    label: 'Admission to Placement',
    short: 'Admission',
    summary: 'प्रशिक्षण प्रक्रिया — every stage from counselling at admission to job placement.',
    icon: 'Route',
  },
  {
    slug: 'curriculum',
    label: 'Curriculum',
    short: 'Curriculum',
    summary: 'The NCVT syllabus, how it is kept current, and the work of the academic cell.',
    icon: 'ClipboardList',
  },
  {
    slug: 'holistic-development',
    label: 'Holistic Development',
    short: 'Holistic',
    summary: 'सर्वांगीण विकास — all-round development of every trainee’s abilities.',
    icon: 'Sprout',
  },
  {
    slug: 'competency',
    label: 'Competency',
    short: 'Competency',
    summary: 'Competency-based learning, the training mix, twelve work skills and what you get.',
    icon: 'Target',
  },
  {
    slug: 'human-resource-development',
    label: 'Human Resource Development',
    short: 'HR Development',
    summary: 'Faculty — qualifications to NCVT norms, the HR cell and staff training.',
    icon: 'Users',
  },
].map((p, i) => ({ ...p, index: i + 1, to: `${TRAINING_BASE}/${p.slug}` }));

export const trainingPageBySlug = Object.fromEntries(trainingPages.map((p) => [p.slug, p]));

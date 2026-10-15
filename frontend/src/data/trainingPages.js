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
    summary: 'नौ शिक्षण विधियाँ, NIMI की शिक्षण सामग्री और उन्नत शिक्षण पद्धति।',
    icon: 'BookOpen',
  },
  {
    slug: 'admission-to-placement',
    label: 'Admission to Placement',
    short: 'Admission',
    summary: 'प्रशिक्षण प्रक्रिया — प्रवेश के समय काउंसलिंग से लेकर जॉब प्लेसमेंट तक हर चरण।',
    icon: 'Route',
  },
  {
    slug: 'curriculum',
    label: 'Curriculum',
    short: 'Curriculum',
    summary: 'NCVT सिलेबस, उसे अद्यतन कैसे रखा जाता है, और अकादमिक सेल का काम।',
    icon: 'ClipboardList',
  },
  {
    slug: 'holistic-development',
    label: 'Holistic Development',
    short: 'Holistic',
    summary: 'सर्वांगीण विकास — हर प्रशिक्षु की क्षमताओं का चहुँमुखी विकास।',
    icon: 'Sprout',
  },
  {
    slug: 'competency',
    label: 'Competency',
    short: 'Competency',
    summary: 'योग्यता आधारित सीखना, प्रशिक्षण का अनुपात, बारह कार्य कौशल और आपको क्या-क्या मिलता है।',
    icon: 'Target',
  },
  {
    slug: 'human-resource-development',
    label: 'Human Resource Development',
    short: 'HR Development',
    summary: 'शिक्षक — NCVT मानदंडों के अनुसार योग्यता, HR सेल और स्टाफ प्रशिक्षण।',
    icon: 'Users',
  },
].map((p, i) => ({ ...p, index: i + 1, to: `${TRAINING_BASE}/${p.slug}` }));

export const trainingPageBySlug = Object.fromEntries(trainingPages.map((p) => [p.slug, p]));

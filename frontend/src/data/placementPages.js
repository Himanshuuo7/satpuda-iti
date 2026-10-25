import { placementTotals as T } from './placementRecord';

/**
 * Placement section — the six pages under /placements.
 *
 * They mirror the Placement menu of the institute's website, in the same order
 * and under the same names. The only import is the placement record (which
 * imports nothing from here or satpudaData.js), so the site navigation
 * (satpudaData.js) can build the Placement dropdown from it without a cycle.
 */

export const PLACEMENT_BASE = '/placements';

export const placementPages = [
  {
    slug: 'industrial-interface',
    label: 'Industrial Interface & Student Development',
    short: 'Industrial Interface',
    summary: 'कक्षा में उद्योग विशेषज्ञ, समय-समय पर उद्योग भ्रमण और प्लेसमेंट एवं मार्गदर्शन सेल।',
    icon: 'Factory',
  },
  {
    slug: 'career-path',
    label: 'Career Path',
    short: 'Career Path',
    summary: 'NCVT ITI के बाद तीन रास्ते — उद्योग में करियर, आगे की पढ़ाई या अपना खुद का व्यवसाय।',
    icon: 'Route',
  },
  {
    slug: 'entrepreneurship',
    label: 'Entrepreneurship Development',
    short: 'Entrepreneurship',
    summary: 'उद्यमिता विकास — व्यावसायिक सोच से लेकर फ्रेंचाइज़ी विकास तक हर चरण।',
    icon: 'Lightbulb',
  },
  {
    slug: 'recruiters',
    label: 'Recruiters',
    short: 'Recruiters',
    summary: `${T.first} से अब तक ${T.drives} कैंपस ड्राइव में ${T.selected.toLocaleString('en-IN')} उम्मीदवारों का चयन — विभिन्न उद्योगों की भर्ती करने वाली कंपनियों के साथ।`,
    icon: 'Building2',
  },
  {
    slug: 'skill-connect',
    label: 'Skill Connect',
    short: 'Skill Connect',
    summary: 'कौशल – उद्योग – कार्यबल: वे साझेदार और कार्यक्रम जो हर प्रशिक्षु के साथ जुड़े हैं।',
    icon: 'Network',
  },
  {
    slug: 'details',
    label: 'Placement Details',
    short: 'Placement Details',
    summary: 'साल-दर-साल और ITI-वार: कैंपस ड्राइव, उनमें शामिल हुए उम्मीदवार और चयनित उम्मीदवार।',
    icon: 'BarChart3',
  },
].map((p, i) => ({ ...p, index: i + 1, to: `${PLACEMENT_BASE}/${p.slug}` }));

export const placementPageBySlug = Object.fromEntries(placementPages.map((p) => [p.slug, p]));

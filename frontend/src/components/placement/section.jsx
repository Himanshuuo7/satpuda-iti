import { PLACEMENT_BASE, placementPages } from '../../data/placementPages';

/** The Placement section's config for the shared section components. */
export const placementSection = {
  label: 'Placement',
  base: PLACEMENT_BASE,
  pages: placementPages,
  overview: { label: 'Placement overview', summary: 'प्लेसमेंट सेल की एक झलक।' },
  cta: {
    eyebrow: 'हुनर से रोजगार तक',
    eyebrowLang: 'hi',
    title: (
      <>
        Your placement starts <span className="text-signal">with admission.</span>
      </>
    ),
    body: 'किसी Satpuda ITI में NCVT ट्रेड का प्रशिक्षण लें और प्लेसमेंट एवं मार्गदर्शन सेल द्वारा आयोजित कैंपस ड्राइव में शामिल हों।',
  },
};

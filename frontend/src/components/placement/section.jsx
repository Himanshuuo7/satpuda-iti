import { PLACEMENT_BASE, placementPages } from '../../data/placementPages';

/** The Placement section's config for the shared section components. */
export const placementSection = {
  label: 'Placement',
  base: PLACEMENT_BASE,
  pages: placementPages,
  overview: { label: 'Placement overview', summary: 'The placement cell at a glance.' },
  cta: {
    eyebrow: 'हुनर से रोजगार तक',
    eyebrowLang: 'hi',
    title: (
      <>
        Your placement starts <span className="text-signal">with admission.</span>
      </>
    ),
    body: 'Train in an NCVT trade at a Satpuda ITI and join the campus drives run by the Placement & Guidance Cell.',
  },
};

import { TRAINING_BASE, trainingPages } from '../../data/trainingPages';

/** The Training section's config for the shared section components. */
export const trainingSection = {
  label: 'Training',
  base: TRAINING_BASE,
  pages: trainingPages,
  overview: { label: 'Training overview', summary: 'How Satpuda trains, from the first class to placement.' },
  cta: {
    eyebrow: 'NCVT · Craftsman Training Scheme',
    title: (
      <>
        Learn your trade <span className="text-signal">the Satpuda way.</span>
      </>
    ),
    body: 'NCVT trades taught practical-first, with STEP training alongside and a placement cell at the end of the course.',
  },
};

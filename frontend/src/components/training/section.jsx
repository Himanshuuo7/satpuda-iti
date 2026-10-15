import { TRAINING_BASE, trainingPages } from '../../data/trainingPages';

/** The Training section's config for the shared section components. */
export const trainingSection = {
  label: 'Training',
  base: TRAINING_BASE,
  pages: trainingPages,
  overview: { label: 'Training overview', summary: 'Satpuda में प्रशिक्षण कैसे होता है — पहली कक्षा से प्लेसमेंट तक।' },
  cta: {
    eyebrow: 'NCVT · Craftsman Training Scheme',
    title: (
      <>
        Learn your trade <span className="text-signal">the Satpuda way.</span>
      </>
    ),
    body: 'NCVT ट्रेड, जिनकी पढ़ाई प्रैक्टिकल से शुरू होती है — साथ में STEP प्रशिक्षण, और कोर्स के अंत में प्लेसमेंट सेल का सहयोग।',
  },
};

/**
 * Media registry.
 *
 * Every image here was downloaded from the official Satpuda ITI website and is
 * bundled locally under `src/assets/images/`. They are imported (not hot-linked)
 * for two reasons: the origin currently serves an expired TLS certificate, which
 * would make browsers refuse the images outright, and bundling lets Vite
 * fingerprint and cache them.
 *
 * To swap an image later, change only the import below — no component edits.
 */

// Brand
import logoMark from '../assets/images/brand/logo-round.png';
import mpMap from '../assets/images/brand/mp-locations-map.png';

// Campus / training photography
import campusPanorama from '../assets/images/gallery/campus-panorama.jpg';
import classroom from '../assets/images/gallery/classroom.jpg';
import garraWorkshop from '../assets/images/gallery/garra-workshop.jpg';
import practicalWorkshop from '../assets/images/gallery/practical-workshop.jpg';
import practicalTraining from '../assets/images/gallery/practical-training.jpg';
import students01 from '../assets/images/gallery/students-01.jpg';
import students02 from '../assets/images/gallery/students-02.jpg';
import students03 from '../assets/images/gallery/students-03.jpg';

// Alumni portraits
import shailendra from '../assets/images/testimonials/shailendra-mishra.png';
import deepak from '../assets/images/testimonials/deepak-patre.png';
import abhimanyu from '../assets/images/testimonials/abhimanyu-jamre.png';
import lomesh from '../assets/images/testimonials/lomesh-sanodiya.png';

export const brand = {
  mark: logoMark,
  map: mpMap,
  /**
   * Full-resolution lock-up. Served from `public/` rather than imported, so it
   * stays out of the JS bundle and keeps a stable URL for Open Graph.
   */
  full: '/satpuda-iti-logo.jpg',
};

/**
 * Each photograph carries its own descriptive alt text and intrinsic aspect
 * ratio so layout is reserved before the file resolves.
 */
export const photos = {
  garraWorkshop: {
    src: garraWorkshop,
    alt: 'Fitter trainees working at bench vices with hacksaws in the Satpuda ITI Garra workshop',
    ratio: '16/9',
  },
  campusPanorama: {
    src: campusPanorama,
    alt: 'Wide view of a Satpuda ITI examination hall with trainees seated at desks',
    ratio: '3/2',
  },
  classroom: {
    src: classroom,
    alt: 'Trainees seated in a Satpuda ITI classroom session',
    ratio: '4/3',
  },
  practicalWorkshop: {
    src: practicalWorkshop,
    alt: 'Practical workshop session in progress at Satpuda ITI',
    ratio: '4/3',
  },
  practicalTraining: {
    src: practicalTraining,
    alt: 'Trainees receiving hands-on practical instruction at Satpuda ITI',
    ratio: '4/3',
  },
  students01: {
    src: students01,
    alt: 'Satpuda ITI trainees during a campus activity',
    ratio: '4/3',
  },
  students02: {
    src: students02,
    alt: 'Satpuda ITI trainees gathered on campus',
    ratio: '3/4',
  },
  students03: {
    src: students03,
    alt: 'Satpuda ITI trainees at an institute event',
    ratio: '4/3',
  },
};

export const portraits = {
  'shailendra-mishra.png': shailendra,
  'deepak-patre.png': deepak,
  'abhimanyu-jamre.png': abhimanyu,
  'lomesh-sanodiya.png': lomesh,
};

/**
 * Recruiter marks shown on the official homepage. They are presented as
 * published logos only — the site does not name the companies in text, so no
 * company name is asserted here.
 */
const recruiterModules = import.meta.glob(
  '../assets/images/recruiters/*.png',
  { eager: true, import: 'default' }
);

export const recruiterLogos = Object.entries(recruiterModules)
  .sort(([a], [b]) => {
    const n = (s) => Number(s.match(/recruiter-(\d+)/)?.[1] ?? 0);
    return n(a) - n(b);
  })
  .map((entry, i) => ({ src: entry[1], alt: `Recruiter ${i + 1}` }));

/** Ordered set used by the homepage gallery preview. */
export const galleryPreview = [
  photos.campusPanorama,
  photos.garraWorkshop,
  photos.practicalWorkshop,
  photos.students02,
  photos.classroom,
  photos.practicalTraining,
  photos.students01,
  photos.students03,
];

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
import benchPractical from '../assets/images/gallery/bench-practical.jpg';
import certificates from '../assets/images/gallery/certificates.jpg';
import culturalDance from '../assets/images/gallery/cultural-dance.jpg';
import examHall from '../assets/images/gallery/exam-hall.jpg';
import facultyClassroom from '../assets/images/gallery/faculty-classroom.jpg';
import fittingWorkshop from '../assets/images/gallery/fitting-workshop.jpg';
import industrialVisit from '../assets/images/gallery/industrial-visit.jpg';
import moilVisit from '../assets/images/gallery/moil-visit.jpg';
import nsdcTraining from '../assets/images/gallery/nsdc-training.jpg';
import powerHouseVisit from '../assets/images/gallery/power-house-visit.jpg';
import sportsGroup from '../assets/images/gallery/sports-group.jpg';
import sportsTrophy from '../assets/images/gallery/sports-trophy.jpg';
import wiringProject from '../assets/images/gallery/wiring-project.jpg';
import workshopAssembly from '../assets/images/gallery/workshop-assembly.jpg';
import workshopFloor from '../assets/images/gallery/workshop-floor.jpg';
import workshopSeminar from '../assets/images/gallery/workshop-seminar.jpg';
import activitiesCollage from '../assets/images/gallery/activities-collage.jpg';

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
    alt: 'Fitter trainees working at bench vices with hacksaws in a Satpuda ITI workshop',
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
  // From the institute's gallery and activities pages.
  benchPractical: {
    src: benchPractical,
    alt: 'Trainees working at a bench with their instructor during a practical session',
    ratio: '4/3',
  },
  certificates: {
    src: certificates,
    alt: 'Trainees holding up their certificates in a hall at Satpuda Pvt. ITI',
    ratio: '3/2',
  },
  culturalDance: {
    src: culturalDance,
    alt: 'Trainees performing a dance on stage at a Satpuda Pvt. ITI cultural programme',
    ratio: '3/2',
  },
  examHall: {
    src: examHall,
    alt: 'Trainees seated at rows of desks in a Satpuda ITI examination hall',
    ratio: '3/2',
  },
  facultyClassroom: {
    src: facultyClassroom,
    alt: 'Faculty members with trainees in a Satpuda ITI classroom',
    ratio: '2/1',
  },
  fittingWorkshop: {
    src: fittingWorkshop,
    alt: 'Fitting workshop with rows of bench vices at a Satpuda ITI campus',
    ratio: '4/3',
  },
  industrialVisit: {
    src: industrialVisit,
    alt: 'Trainees with their instructor during an industrial visit',
    ratio: '16/9',
  },
  moilVisit: {
    src: moilVisit,
    alt: 'Trainees on an industrial visit to the MOIL site at Tirodi',
    ratio: '2/1',
  },
  nsdcTraining: {
    src: nsdcTraining,
    alt: 'Trainees attending an NSDC training session in a large hall',
    ratio: '2/1',
  },
  powerHouseVisit: {
    src: powerHouseVisit,
    alt: 'Trainees during a power house visit',
    ratio: '1/1',
  },
  sportsGroup: {
    src: sportsGroup,
    alt: 'Satpuda ITI trainees and staff in a group photo on the sports ground',
    ratio: '3/2',
  },
  sportsTrophy: {
    src: sportsTrophy,
    alt: 'Trainees celebrating with a trophy after a sports event',
    ratio: '3/2',
  },
  wiringProject: {
    src: wiringProject,
    alt: 'Electrical wiring project board built by trainees',
    ratio: '4/3',
  },
  workshopAssembly: {
    src: workshopAssembly,
    alt: 'Trainees gathered in a Satpuda ITI workshop hall for a session',
    ratio: '4/3',
  },
  workshopFloor: {
    src: workshopFloor,
    alt: 'Workshop floor with work tables at a Satpuda ITI campus',
    ratio: '4/3',
  },
  workshopSeminar: {
    src: workshopSeminar,
    alt: 'Trainees seated in rows in a workshop hall during a session',
    ratio: '16/9',
  },
  activitiesCollage: {
    src: activitiesCollage,
    alt: 'Satpuda ITI activities board: newspaper coverage of institute events and photographs from industrial visits',
    ratio: '10/7',
  },
};

/**
 * The Gallery page's photographs, grouped for its filter. Every photograph is
 * the institute's own; the grouping is by what each one shows.
 */
export const galleryGroups = [
  { id: 'workshop', label: 'Workshops & practicals' },
  { id: 'classroom', label: 'Classrooms & sessions' },
  { id: 'visits', label: 'Industrial visits' },
  { id: 'life', label: 'Campus life' },
];

export const galleryPhotos = [
  ['garraWorkshop', 'workshop'],
  ['campusPanorama', 'classroom'],
  ['culturalDance', 'life'],
  ['moilVisit', 'visits'],
  ['practicalTraining', 'workshop'],
  ['facultyClassroom', 'classroom'],
  ['sportsTrophy', 'life'],
  ['powerHouseVisit', 'visits'],
  ['benchPractical', 'workshop'],
  ['nsdcTraining', 'classroom'],
  ['students01', 'life'],
  ['industrialVisit', 'visits'],
  ['wiringProject', 'workshop'],
  ['examHall', 'classroom'],
  ['sportsGroup', 'life'],
  ['practicalWorkshop', 'workshop'],
  ['classroom', 'classroom'],
  ['certificates', 'life'],
  ['workshopFloor', 'workshop'],
  ['workshopSeminar', 'classroom'],
  ['students02', 'life'],
  ['fittingWorkshop', 'workshop'],
  ['workshopAssembly', 'classroom'],
  ['students03', 'life'],
].map(([key, group]) => ({ key, group, ...photos[key] }));

export const portraits = {
  'shailendra-mishra.png': shailendra,
  'deepak-patre.png': deepak,
  'abhimanyu-jamre.png': abhimanyu,
  'lomesh-sanodiya.png': lomesh,
};

/**
 * Recruiter marks shown on the official homepage, in file order
 * (recruiter-1.png … recruiter-11.png). Each company also appears on the
 * institute's recruiters board, so the marks are named for their alt text.
 */
const recruiterModules = import.meta.glob(
  '../assets/images/recruiters/*.png',
  { eager: true, import: 'default' }
);

const RECRUITER_NAMES = [
  'IndianOil',
  'Bridgestone',
  'Suzuki',
  'Mahindra',
  'Tata Motors',
  'Honda',
  'Bajaj',
  'BHEL',
  'Toyota',
  'Hero',
  'Hyundai',
];

export const recruiterLogos = Object.entries(recruiterModules)
  .sort(([a], [b]) => {
    const n = (s) => Number(s.match(/recruiter-(\d+)/)?.[1] ?? 0);
    return n(a) - n(b);
  })
  .map((entry, i) => ({
    src: entry[1],
    name: RECRUITER_NAMES[i] ?? `Recruiter ${i + 1}`,
    alt: RECRUITER_NAMES[i] ? `${RECRUITER_NAMES[i]} logo` : `Recruiter ${i + 1}`,
  }));

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

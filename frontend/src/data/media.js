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
import logoMark from '../assets/images/brand/logo-round.webp';
import mpMap from '../assets/images/brand/mp-locations-map.webp';

// Campus / training photography
import campusPanorama from '../assets/images/gallery/campus-panorama.webp';
import classroom from '../assets/images/gallery/classroom.webp';
import garraWorkshop from '../assets/images/gallery/garra-workshop.webp';
import practicalWorkshop from '../assets/images/gallery/practical-workshop.webp';
import practicalTraining from '../assets/images/gallery/practical-training.webp';
import students01 from '../assets/images/gallery/students-01.webp';
import students02 from '../assets/images/gallery/students-02.webp';
import students03 from '../assets/images/gallery/students-03.webp';
import benchPractical from '../assets/images/gallery/bench-practical.webp';
import certificates from '../assets/images/gallery/certificates.webp';
import culturalDance from '../assets/images/gallery/cultural-dance.webp';
import examHall from '../assets/images/gallery/exam-hall.webp';
import facultyClassroom from '../assets/images/gallery/faculty-classroom.webp';
import fittingWorkshop from '../assets/images/gallery/fitting-workshop.webp';
import industrialVisit from '../assets/images/gallery/industrial-visit.webp';
import moilVisit from '../assets/images/gallery/moil-visit.webp';
import nsdcTraining from '../assets/images/gallery/nsdc-training.webp';
import powerHouseVisit from '../assets/images/gallery/power-house-visit.webp';
import sportsGroup from '../assets/images/gallery/sports-group.webp';
import sportsTrophy from '../assets/images/gallery/sports-trophy.webp';
import wiringProject from '../assets/images/gallery/wiring-project.webp';
import workshopAssembly from '../assets/images/gallery/workshop-assembly.webp';
import workshopFloor from '../assets/images/gallery/workshop-floor.webp';
import workshopSeminar from '../assets/images/gallery/workshop-seminar.webp';
import activitiesCollage from '../assets/images/gallery/activities-collage.webp';

// Alumni portraits
import shailendra from '../assets/images/testimonials/shailendra-mishra.webp';
import deepak from '../assets/images/testimonials/deepak-patre.webp';
import abhimanyu from '../assets/images/testimonials/abhimanyu-jamre.webp';
import lomesh from '../assets/images/testimonials/lomesh-sanodiya.webp';

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
    alt: 'Satpuda ITI की वर्कशॉप में बेंच वाइस पर हैकसॉ से काम करते Fitter ट्रेड के प्रशिक्षु',
    ratio: '16/9',
  },
  campusPanorama: {
    src: campusPanorama,
    alt: 'Satpuda ITI के परीक्षा हॉल का दृश्य, जहाँ प्रशिक्षु डेस्क पर बैठे हैं',
    ratio: '3/2',
  },
  classroom: {
    src: classroom,
    alt: 'Satpuda ITI की कक्षा में सत्र के दौरान बैठे प्रशिक्षु',
    ratio: '4/3',
  },
  practicalWorkshop: {
    src: practicalWorkshop,
    alt: 'Satpuda ITI में चल रहा प्रैक्टिकल वर्कशॉप सत्र',
    ratio: '4/3',
  },
  practicalTraining: {
    src: practicalTraining,
    alt: 'Satpuda ITI में हाथों से प्रैक्टिकल प्रशिक्षण लेते प्रशिक्षु',
    ratio: '4/3',
  },
  students01: {
    src: students01,
    alt: 'कैंपस गतिविधि के दौरान Satpuda ITI के प्रशिक्षु',
    ratio: '4/3',
  },
  students02: {
    src: students02,
    alt: 'कैंपस में एकत्र Satpuda ITI के प्रशिक्षु',
    ratio: '3/4',
  },
  students03: {
    src: students03,
    alt: 'संस्थान के एक कार्यक्रम में Satpuda ITI के प्रशिक्षु',
    ratio: '4/3',
  },
  // From the institute's gallery and activities pages.
  benchPractical: {
    src: benchPractical,
    alt: 'प्रैक्टिकल सत्र के दौरान अपने इंस्ट्रक्टर के साथ बेंच पर काम करते प्रशिक्षु',
    ratio: '4/3',
  },
  certificates: {
    src: certificates,
    alt: 'Satpuda Pvt. ITI के एक हॉल में अपने प्रमाणपत्र दिखाते प्रशिक्षु',
    ratio: '3/2',
  },
  culturalDance: {
    src: culturalDance,
    alt: 'Satpuda Pvt. ITI के सांस्कृतिक कार्यक्रम में मंच पर नृत्य प्रस्तुत करते प्रशिक्षु',
    ratio: '3/2',
  },
  examHall: {
    src: examHall,
    alt: 'Satpuda ITI के परीक्षा हॉल में डेस्कों की कतारों में बैठे प्रशिक्षु',
    ratio: '3/2',
  },
  facultyClassroom: {
    src: facultyClassroom,
    alt: 'Satpuda ITI की कक्षा में प्रशिक्षुओं के साथ शिक्षक',
    ratio: '2/1',
  },
  fittingWorkshop: {
    src: fittingWorkshop,
    alt: 'Satpuda ITI कैंपस की फिटिंग वर्कशॉप, जिसमें बेंच वाइस की कतारें लगी हैं',
    ratio: '4/3',
  },
  industrialVisit: {
    src: industrialVisit,
    alt: 'औद्योगिक भ्रमण के दौरान अपने इंस्ट्रक्टर के साथ प्रशिक्षु',
    ratio: '16/9',
  },
  moilVisit: {
    src: moilVisit,
    alt: 'तिरोड़ी स्थित MOIL साइट पर औद्योगिक भ्रमण के दौरान प्रशिक्षु',
    ratio: '2/1',
  },
  nsdcTraining: {
    src: nsdcTraining,
    alt: 'एक बड़े हॉल में NSDC प्रशिक्षण सत्र में शामिल प्रशिक्षु',
    ratio: '2/1',
  },
  powerHouseVisit: {
    src: powerHouseVisit,
    alt: 'पावर हाउस भ्रमण के दौरान प्रशिक्षु',
    ratio: '1/1',
  },
  sportsGroup: {
    src: sportsGroup,
    alt: 'खेल मैदान पर ग्रुप फोटो में Satpuda ITI के प्रशिक्षु और स्टाफ',
    ratio: '3/2',
  },
  sportsTrophy: {
    src: sportsTrophy,
    alt: 'खेल प्रतियोगिता के बाद ट्रॉफी के साथ जश्न मनाते प्रशिक्षु',
    ratio: '3/2',
  },
  wiringProject: {
    src: wiringProject,
    alt: 'प्रशिक्षुओं द्वारा बनाया गया इलेक्ट्रिकल वायरिंग प्रोजेक्ट बोर्ड',
    ratio: '4/3',
  },
  workshopAssembly: {
    src: workshopAssembly,
    alt: 'एक सत्र के लिए Satpuda ITI के वर्कशॉप हॉल में एकत्र प्रशिक्षु',
    ratio: '4/3',
  },
  workshopFloor: {
    src: workshopFloor,
    alt: 'Satpuda ITI कैंपस में वर्क टेबल वाला वर्कशॉप फ्लोर',
    ratio: '4/3',
  },
  workshopSeminar: {
    src: workshopSeminar,
    alt: 'सत्र के दौरान वर्कशॉप हॉल में कतारों में बैठे प्रशिक्षु',
    ratio: '16/9',
  },
  activitiesCollage: {
    src: activitiesCollage,
    alt: 'Satpuda ITI का गतिविधि बोर्ड: संस्थान के कार्यक्रमों की अख़बारी कवरेज और औद्योगिक भ्रमण की तस्वीरें',
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
  'shailendra-mishra.webp': shailendra,
  'deepak-patre.webp': deepak,
  'abhimanyu-jamre.webp': abhimanyu,
  'lomesh-sanodiya.webp': lomesh,
};

/**
 * Recruiter marks shown on the official homepage, in file order
 * (recruiter-1.webp … recruiter-11.webp). Each company also appears on the
 * institute's recruiters board, so the marks are named for their alt text.
 */
const recruiterModules = import.meta.glob(
  '../assets/images/recruiters/*.webp',
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

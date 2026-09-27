/**
 * Satpuda ITI — story and verified milestones.
 *
 * Milestones come only from dated statements on official Satpuda pages: the
 * "started from" line on each campus page, DGET references on the Balaghat
 * page, the published placement table and the 2022 "23 years" graphic on
 * /about-us/. Retrieved 2026-09-26. No milestone is inferred.
 */

const VERIFIED_AT = '2026-09-26';

export const story = {
  foundedYear: 1999,
  operator: 'Maharana Pratap Shikshan Samiti, Balaghat',
  // Official taglines from the /about-us/ graphics (2022).
  taglineEn: 'A New Horizon in Skill Development',
  taglineHi: 'कौशल विकास के नये आयाम',
  mottoHi: 'हुनर से रोजगार तक',
  mottoEn: 'From skill to employment',
  paragraphs: [
    'Satpuda Industrial Training Institute, under Maharana Pratap Shikshan Samiti, Balaghat, was established in 1999 by a team of professional entrepreneurs with sound technical backgrounds and qualified engineers — with a mission to promote quality vocational and technical training for students from rural and urban areas.',
    'The group started with a motto of nourishing young minds by providing high-class training to master a trade and be industry ready, and has since worked to reduce the gap between what industry requires and the skills trainees bring.',
    'From Balaghat the network grew across Madhya Pradesh — into Chhindwara, Narmadapuram, Seoni, Rewa, Mandla, Betul and Mauganj — running NCVT-affiliated Craftsman Training Scheme trades administered by the Directorate of Technical Education, Govt. of MP.',
  ],
  sourceUrls: [
    'https://satpudaiti.com/',
    'https://satpudaiti.com/campus-balaghat/',
    'https://satpudaiti.com/about-us/',
  ],
  verifiedAt: VERIFIED_AT,
};

/**
 * `kind` drives the timeline icon: origin | campus | record | legacy.
 * `campuses` lists institute ids from itiInstitutes.js.
 */
export const milestones = [
  {
    year: '1999',
    title: 'The Samiti begins',
    body: 'Maharana Pratap Shikshan Samiti enters education and training in Balaghat. Maharana Pratap ITI, Garra carries DGET reference 6/12/22/99-TC.',
    kind: 'origin',
    campuses: ['garra'],
    sourceUrls: ['https://satpudaiti.com/about-us/', 'https://satpudaiti.com/campus-balaghat/'],
  },
  {
    year: '2003',
    title: 'First step beyond Balaghat',
    body: 'Satpuda ITI Kundipura opens in Chhindwara (August 2003).',
    kind: 'campus',
    campuses: ['chhindwara-kundipura'],
    sourceUrls: ['https://satpudaiti.com/chhindwara/'],
  },
  {
    year: '2007',
    title: 'Three new regions',
    body: 'Campuses start at Itarsi, Seoni and Rewa in August 2007 — extending the network west to Narmadapuram and north to Vindhya.',
    kind: 'campus',
    campuses: ['itarsi', 'seoni', 'rewa'],
    sourceUrls: [
      'https://satpudaiti.com/itarsi/',
      'https://satpudaiti.com/seoni/',
      'https://satpudaiti.com/iti-rewa/',
    ],
  },
  {
    year: '2010',
    title: 'The Manjhapur campus',
    body: 'Satpuda Private ITI Manjhapur is established (DGET-6/12/6/2010-TC) and Satpuda ITI Mauganj starts in August 2010.',
    kind: 'campus',
    campuses: ['manjhapur', 'mauganj'],
    sourceUrls: ['https://satpudaiti.com/campus-balaghat/', 'https://satpudaiti.com/mauganj/'],
  },
  {
    year: '2014',
    title: 'Into Baihar',
    body: 'Maharana Pratap ITI Baihar starts in August 2014.',
    kind: 'campus',
    campuses: ['baihar'],
    sourceUrls: ['https://satpudaiti.com/iti-baihar/'],
  },
  {
    year: '2015',
    title: 'Largest single-year expansion',
    body: 'New Satpuda ITIs at Budhi and Katangi receive DGET references, and campuses start at Betul, Multai and Mandla.',
    kind: 'campus',
    campuses: ['budhi', 'katangi', 'betul', 'multai', 'mandla'],
    sourceUrls: [
      'https://satpudaiti.com/campus-balaghat/',
      'https://satpudaiti.com/betul/',
      'https://satpudaiti.com/multai/',
      'https://satpudaiti.com/mandla/',
    ],
  },
  {
    year: '2017',
    title: 'Sarni joins',
    body: 'Satpuda ITI Sarni starts in December 2017. The same year the group records 587 placements across 11 campus drives.',
    kind: 'campus',
    campuses: ['sarni'],
    sourceUrls: ['https://satpudaiti.com/iti-sarni/', 'https://satpudaiti.com/placement/'],
  },
  {
    year: '2018',
    title: 'Peak placement year',
    body: '1,044 trainees placed through 23 campus drives — the highest year in the published record.',
    kind: 'record',
    campuses: [],
    sourceUrls: ['https://satpudaiti.com/placement/'],
  },
  {
    year: '2021',
    title: '94% placement rate',
    body: '632 trainees placed across 10 drives, as published by the institute.',
    kind: 'record',
    campuses: [],
    sourceUrls: ['https://satpudaiti.com/placement/'],
  },
  {
    year: '2022',
    title: '23 years of technical education',
    body: 'Satpuda Group marks 23 years (1999–2022) across ITI, school, polytechnic and education colleges.',
    kind: 'legacy',
    campuses: [],
    sourceUrls: ['https://satpudaiti.com/about-us/'],
  },
].map((m) => ({ ...m, verifiedAt: VERIFIED_AT }));

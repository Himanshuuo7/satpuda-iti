/**
 * Satpuda ITI — story and milestones.
 *
 * Institution years come from the Samiti's "Our Institutions" board
 * (src/assets/iti detail.jpg); placement years from the placement table.
 */

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
};

/**
 * `kind` drives the timeline icon: origin | campus | college | school | record | legacy.
 * `institutions` lists what opened that year — name, place and affiliation as
 * printed on the Samiti's institutions board.
 */
const NCVT = 'NCVT & QCI, New Delhi';
const iti = (place) => ({ name: 'Satpuda Private ITI', place, affiliation: NCVT });

export const milestones = [
  {
    year: '1999',
    title: 'Where it all began',
    body: 'Maharana Pratap Shikshan Samiti opens its first Satpuda Private ITI at Garra, Balaghat.',
    kind: 'origin',
    institutions: [iti('Garra, Balaghat')],
  },
  {
    year: '2003',
    title: 'First step beyond Balaghat',
    body: 'A second ITI opens in Chhindwara, near Kundipura Thana.',
    kind: 'campus',
    institutions: [iti('Near Kundipura Thana, Chhindwara')],
  },
  {
    year: '2006',
    title: 'Into teacher education',
    body: 'Satpuda D.Ed. College opens on the Manjhapur campus.',
    kind: 'college',
    institutions: [
      {
        name: 'Satpuda D.Ed. College',
        place: 'Manjhapur, Balaghat',
        affiliation: 'Madhyamik Shiksha Mandal, Bhopal · CBSE, New Delhi',
      },
    ],
  },
  {
    year: '2007',
    title: 'Seoni and Mandla',
    body: 'Two new ITIs extend the network into Seoni and Mandla districts.',
    kind: 'campus',
    institutions: [iti('Seladehi, Seoni'), iti('Poundi, Mandla')],
  },
  {
    year: '2009',
    title: 'Three institutions in one year',
    body: 'An ITI opens in Betul, while Manjhapur adds a public school and a B.Ed. college.',
    kind: 'school',
    institutions: [
      iti('Bharat Bharti, Betul'),
      { name: 'Satpuda Valley Public School', place: 'Manjhapur, Balaghat', affiliation: 'CBSE & MP Board, Bhopal' },
      {
        name: 'Satpuda B.Ed. College',
        place: 'Manjhapur, Balaghat',
        affiliation: 'Rani Durgawati Vishwavidyalaya & NCTE, New Delhi',
      },
    ],
  },
  {
    year: '2010',
    title: 'The Manjhapur ITI',
    body: 'Satpuda Private ITI opens on the Manjhapur campus — today the group’s flagship.',
    kind: 'campus',
    institutions: [iti('Manjhapur, Balaghat')],
  },
  {
    year: '2011',
    title: 'North to Rewa',
    body: 'The network reaches the Vindhya region with an ITI at Chorhata, Rewa.',
    kind: 'campus',
    institutions: [iti('Chorhata, Rewa')],
  },
  {
    year: '2012',
    title: 'A second Chhindwara ITI',
    body: 'Satpuda Private ITI opens near the Warehouse in Chhindwara.',
    kind: 'campus',
    institutions: [iti('Near Warehouse, Chhindwara')],
  },
  {
    year: '2015',
    title: 'Multai',
    body: 'Satpuda Private ITI opens at Chikhali Khurd, Multai.',
    kind: 'campus',
    institutions: [iti('Chikhali Khurd, Multai')],
  },
  {
    year: '2016',
    title: 'Three new ITIs',
    body: 'Itarsi, Sarni and Mauganj join the network in a single year.',
    kind: 'campus',
    institutions: [iti('Itarsi'), iti('Bagdona, Sarni'), iti('Mauganj, Rewa')],
  },
  {
    year: '2017',
    title: '587 trainees placed',
    body: '587 trainees placed across 11 campus drives.',
    kind: 'record',
    institutions: [],
  },
  {
    year: '2018',
    title: 'Peak placement year',
    body: '1,044 trainees placed through 23 campus drives — the group’s highest year.',
    kind: 'record',
    institutions: [],
  },
  {
    year: '2021',
    title: '94% placement rate',
    body: '632 trainees placed across 10 campus drives.',
    kind: 'record',
    institutions: [],
  },
  {
    year: '2022',
    title: '23 years of technical education',
    body: 'Satpuda Group marks 23 years (1999–2022) across ITI, school, polytechnic and education colleges.',
    kind: 'legacy',
    institutions: [],
  },
];

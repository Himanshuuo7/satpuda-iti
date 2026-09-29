/**
 * "It's DIFFERENT @ SATPUDA ITIs" — the institute's own list from /about-us/.
 *
 * `title` is the published point. `detail` is a one-line expansion drawn only
 * from other official copy (the training, placement and about pages), with the
 * page it came from in `sourceUrls`. Points the site states without any
 * supporting copy keep a detail that restates the point rather than adding a
 * claim. Retrieved 2026-09-26.
 */

const VERIFIED_AT = '2026-09-26';
const ABOUT = 'https://satpudaiti.com/about-us/';
const TRAINING = 'https://satpudaiti.com/training/';
const PLACEMENT = 'https://satpudaiti.com/placement/';

export const features = [
  {
    id: 'curriculum',
    title: 'Planned Structured Curriculum',
    detail: 'Delivered with NIMI instructional materials and the requisite hours set by NCVT guidelines.',
    icon: 'ClipboardList',
    group: 'training',
    sourceUrls: [ABOUT, TRAINING],
  },
  {
    id: 'regular-training',
    title: 'Rigorous Regular Training',
    detail: 'More practical sessions are built in to enrich each trainee’s learning experience.',
    icon: 'Timer',
    group: 'training',
    sourceUrls: [ABOUT, TRAINING],
  },
  {
    id: 'trade-testing',
    title: 'Skill & Trade Testing',
    detail: 'Skill and trade testing is part of the Satpuda training model.',
    icon: 'Gauge',
    group: 'training',
    sourceUrls: [ABOUT],
  },
  {
    id: 'nsdc',
    title: 'NSDC Courses',
    detail: 'NSDC courses are offered alongside the NCVT trade programme.',
    icon: 'BadgeCheck',
    group: 'training',
    sourceUrls: [ABOUT],
  },
  {
    id: 'industry-exposure',
    title: 'Industry Exposure',
    detail: 'Periodic industry visits, and faculty with students take up real problems from industry.',
    icon: 'Factory',
    group: 'industry',
    sourceUrls: [ABOUT, PLACEMENT],
  },
  {
    id: 'skill-connect',
    title: 'Skill Connect',
    detail: 'Connecting trained skills with employers through the placement cell.',
    icon: 'Link2',
    group: 'industry',
    sourceUrls: [ABOUT],
  },
  {
    id: 'ojt',
    title: 'On-the-Job Training',
    detail: 'Hands-on practice, field exposure and industrial projects are part of the learning process.',
    icon: 'HardHat',
    group: 'industry',
    sourceUrls: [ABOUT, TRAINING],
  },
  {
    id: 'step',
    title: 'Skill Enhancement (STEP)',
    detail: 'The Skill Enhancement Training Programme adds value beyond the core syllabus.',
    icon: 'TrendingUp',
    group: 'industry',
    sourceUrls: [ABOUT],
  },
  {
    id: 'placements',
    title: 'Placement Support',
    detail: 'The placement cell arranges campus interviews and contacts local industries for their manpower needs.',
    icon: 'Briefcase',
    group: 'career',
    sourceUrls: [ABOUT, PLACEMENT],
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship Focus',
    detail: 'Self-employment camps share information on government self-employment schemes.',
    icon: 'Lightbulb',
    group: 'career',
    sourceUrls: [ABOUT, PLACEMENT],
  },
  {
    id: 'alumni',
    title: 'Alumni Support',
    detail: 'Every passed-out trainee is followed up — one of our quality-policy targets.',
    icon: 'Users',
    group: 'career',
    sourceUrls: [ABOUT],
  },
  {
    id: 'career-updates',
    title: 'Career Updates',
    detail: 'Newspapers, employment news, and computer access for job search and online registration.',
    icon: 'Newspaper',
    group: 'career',
    sourceUrls: [ABOUT, PLACEMENT],
  },
  {
    id: 'trainers',
    title: 'Experienced Trainers',
    detail: 'Faculty attend quality-improvement and staff-development programmes every year.',
    icon: 'GraduationCap',
    group: 'mindset',
    sourceUrls: [ABOUT, TRAINING],
  },
  {
    id: 'lifelong',
    title: 'Lifelong Learning',
    detail: 'Free online knowledge content and a digital library with internet access.',
    icon: 'BookOpen',
    group: 'mindset',
    sourceUrls: [ABOUT, TRAINING],
  },
  {
    id: 'technical-mindset',
    title: 'Technical Mindset',
    detail: 'Problem-solving case studies prepare trainees to think like technicians.',
    icon: 'Cpu',
    group: 'mindset',
    sourceUrls: [ABOUT, TRAINING],
  },
].map((f) => ({ ...f, verifiedAt: VERIFIED_AT }));

export const featureGroups = [
  { id: 'training', label: 'Training' },
  { id: 'industry', label: 'Industry' },
  { id: 'career', label: 'Career' },
  { id: 'mindset', label: 'Mindset' },
];

/** The published baseline ("Other ITIs") column, for the comparison strip. */
export const baseline = [
  'NCVT curriculum',
  'NCVT infrastructure',
  'Some have placements',
  'Some have activities',
  'No guarantee on regular training',
];

/**
 * Safety & commitment, from the /about-us/ graphics (2022). The Hindi is
 * verbatim; English lines are faithful translations.
 */
export const commitments = [
  {
    hi: 'सतपुड़ा ITI ग्रुप 1999 से ही तकनीकी शिक्षा की गुणवत्ता, आधुनिक रोचक एवं सामयिक प्रशिक्षण प्रणालियों हेतु मध्य भारत में विख्यात है।',
    en: 'Since 1999 the group has been known in central India for quality technical education and modern, engaging, up-to-date training systems.',
    label: 'Quality',
  },
  {
    hi: 'यहाँ सभी क्रियाकलाप प्रशिक्षणार्थियों को सुरक्षित, रोमांचक एवं रोचक वातावरण प्रदान करते हैं।',
    en: 'Every activity gives trainees a safe, stimulating environment for continuous physical, intellectual, mental and creative development.',
    label: 'Safety',
  },
  {
    hi: 'यहाँ वे अपनी क्षमताओं का पूर्ण उपयोग करते हुए भावी चुनौतियों का सामना सकारात्मक सोच के साथ कर सकें।',
    en: 'Trainees learn to use their full ability and meet future challenges with a positive mindset.',
    label: 'Growth',
  },
  {
    hi: 'इंडस्ट्रीज के सहयोग एवं मार्गदर्शन से सभी के मध्य बेहतर समन्जस्य स्थापित रहे।',
    en: 'With industry’s cooperation and guidance, strong coordination is kept between everyone involved.',
    label: 'Industry',
  },
];

export const rightFour = [
  { en: 'Right Information', hi: 'सही और सटीक जानकारी' },
  { en: 'Right Attitude', hi: 'सही दृष्टिकोण' },
  { en: 'Right Certification', hi: 'सही और उचित प्रमाणपत्र' },
  { en: 'Right Knowledge & Skills', hi: 'सही ज्ञान एवं कौशल' },
];

/**
 * Quality Policy from /about-us/, split into the target figure and the
 * measure it applies to. The wording of each measure is the published text.
 */
export const qualityTargets = [
  { value: '100%', measure: 'Utilisation of sanctioned intake capacity' },
  { value: '> 85%', measure: 'Trainee retention rate' },
  { value: '> 80%', measure: 'Passed-out rate' },
  { value: '100%', measure: 'Follow-up of passed-out trainees' },
  { value: '0%', measure: 'Complaint rate — minimised toward zero' },
  { value: '≥ 1', measure: 'Industry every trainee is exposed to' },
  { value: '6 days', measure: 'Training programme for trainers each year' },
];

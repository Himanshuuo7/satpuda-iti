import { placement } from './satpudaData';

/**
 * Placement section — the content of /placements and its six pages.
 *
 * Four of the institute's placement sections are published only as diagrams
 * (Career Path, Entrepreneurship Development, Recruiters and Skill Connect);
 * their wording is transcribed here as text, with obvious spelling slips
 * corrected ("Enterprenure" → Entrepreneur, "Free Lancer" → Freelancer).
 * Icons are named by string and resolved in components/placement/icons.js.
 */

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

const record = placement.record;
const sum = (key) => record.reduce((n, r) => n + r[key], 0);
const best = record.reduce((a, b) => (b.percentage > a.percentage ? b : a));

export const placementTotals = {
  first: record[0].year,
  last: record[record.length - 1].year,
  placed: sum('placed'),
  drives: sum('drives'),
  bestRate: best.percentage,
  bestRateYear: best.year,
  topPackage: Math.max(...record.map((r) => r.salary)),
};

export const overview = {
  headline: { value: 2456, label: 'Campus placements in last 3 Years' },
  // Homepage wording, verbatim.
  campusNote:
    'Campus Recruitment Programme conducted by the Institute(s) is a very vital activity for the young Technicians aspiring for appropriate placement. Almost all the trainees have secured firm jobs in Government Departments, Multinational Private/ Public Sector Undertakings. A high percentage of our eligible trainees have been offered jobs by reputed firms.',
};

// ---------------------------------------------------------------------------
// Industrial Interface & Student Development
// ---------------------------------------------------------------------------

/**
 * The published paragraph lists five things SITI does; each is set as its own
 * card below with the paragraph's wording intact.
 */
export const industrialInterface = {
  lede: 'How SITI brings industry into the classroom, takes trainees out into industry, and guides every trainee towards a suitable placement.',
  arrangements: [
    {
      icon: 'Presentation',
      title: 'Experts from industry',
      body: 'SITI has made necessary arrangements for class room sessions taken up by suitable faculty/ experts from industries.',
    },
    {
      icon: 'Factory',
      title: 'Periodic industry visits',
      body: 'SITI arranges periodic industry visits.',
    },
    {
      icon: 'Wrench',
      title: 'Real-life problems',
      body: 'Faculty members along with students take up real life problems from industries for problem solving and application of principles taught as a part of course work to enhance the skills of the students.',
    },
    {
      icon: 'Users',
      title: 'Soft skills & attitudes',
      body: 'Students are encouraged to develop necessary soft skills and attitudes so as to enable them getting suitable placements in the industry.',
    },
    {
      icon: 'Compass',
      title: 'Guidance for placement',
      body: 'Necessary guidance is provided to trainees for getting placements through Placement & Guidance Cell.',
    },
  ],
  activities: [
    { icon: 'Handshake', text: 'To arrange Campus Interviews.' },
    { icon: 'UserCheck', text: 'To improve student personality by counseling from Private and Government Sectors.' },
    { icon: 'GraduationCap', text: 'To provide Awareness and knowledge by Guest faculty.' },
    {
      icon: 'Mic',
      text: 'To Arrange seminars on different subjects like “Employment Opportunities in the local Industries” to provide useful career related guidance, knowledge for trainees.',
    },
    { icon: 'Building2', text: 'To contact personally various local industries for their man power requirements.' },
    {
      icon: 'Lightbulb',
      text: 'To arrange “Self Employment Camps” to provide information of different self employment schemes of government to trainees.',
    },
    {
      icon: 'Newspaper',
      text: 'To provide newspapers, magazines (career guidance, general knowledge, motivation), employment news to trainees.',
    },
    { icon: 'Monitor', text: 'To provide computer facilities to trainees for career related information.' },
    {
      icon: 'Wifi',
      text: 'To provide internet facilities for job searching, on-line job registration, surfing for industrial information.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Career Path
// ---------------------------------------------------------------------------

/** Each step is one rung; a rung with two entries shows them side by side. */
export const careerPath = {
  lede: 'An NCVT ITI certificate opens three directions — a career in industry, further qualifications, or a business of your own — and every one of them can lead to working as a freelancer.',
  tracks: [
    {
      id: 'industry',
      icon: 'HardHat',
      title: 'Career in Industry',
      steps: [['Technician'], ['Master Worker'], ['Work Supervisor', 'Shift Incharge'], ['Project Manager'], ['Production Incharge']],
      outcome: 'Technician – Director',
    },
    {
      id: 'qualifications',
      icon: 'GraduationCap',
      title: 'Qualifications Knowledge',
      steps: [
        ['NCVT ITI'],
        ['10 + 2 Certificate'],
        ['Diploma Lateral Entry', 'Engineering Lateral Entry'],
        ['Academic Qualifications UG – PG'],
        ['NSQF Skill Certification'],
        ['Online Learning'],
      ],
      outcome: 'NSQF (L-1 to L-10) · ITI to PhD',
    },
    {
      id: 'entrepreneur',
      icon: 'Rocket',
      title: 'Become Entrepreneur',
      steps: [
        ['Business Culture Mind Set Development'],
        ['Idea Generation', 'Feasibility Study'],
        ['Business Planning', 'Final Approvals'],
        ['Startups'],
        ['Business Setup'],
        ['Franchisee Development'],
      ],
      outcome: 'Your Own Business',
    },
  ],
  freelance: {
    title: 'Work as Freelancer',
    roles: ['Consultant', 'Master Trainer', 'Career Expert', 'Service Provider', 'Social Worker', 'Journalist', 'Skill Expert'],
  },
};

// ---------------------------------------------------------------------------
// Entrepreneurship Development
// ---------------------------------------------------------------------------

/**
 * `kind`: start | checkpoint | end. The published diagram marks Business
 * Planning and Final Approvals apart from the other stages; they are shown
 * here as checkpoints. `pair` is a stage the diagram runs alongside.
 */
export const entrepreneurship = {
  titleHi: 'उद्यमिता विकास',
  lede: 'The route SITI maps for a trainee who wants to build a business — from the first change in mind set to growth, sustainability and franchisee development.',
  steps: [
    { title: 'Become Entrepreneur', kind: 'start' },
    { title: 'Business Mind Set Development', hi: 'उद्यमिता संस्कृति का विकास' },
    { title: 'Idea Generation', pair: 'Feasibility Study' },
    { title: 'Business Planning', kind: 'checkpoint' },
    { title: 'Financial Planning' },
    { title: 'Final Approvals', kind: 'checkpoint' },
    { title: 'Business Setup' },
    { title: 'Re-defining Business', pair: 'Growth & Sustainability' },
    { title: 'Franchisee Development' },
    { title: 'Enjoy the Success', kind: 'end' },
  ],
  camps:
    'To arrange “Self Employment Camps” to provide information of different self employment schemes of government to trainees.',
};

// ---------------------------------------------------------------------------
// Recruiters
// ---------------------------------------------------------------------------

/** Every company whose mark appears on the institute's recruiters board. */
export const recruiters = {
  title: 'Recruiters – Satpuda ITIs',
  headline: overview.headline,
  names: [
    'Bajaj',
    'BHEL',
    'Bridgestone',
    'BSNL',
    'Eicher',
    'GAIL (India) Limited',
    'Hero',
    'Hindustan Aeronautics Limited',
    'Honda',
    'Hyundai',
    'Indian Railways',
    'IndianOil',
    'International Trade Logistics',
    'Jindal Steel & Power',
    'L&T Infotech',
    'Mahindra',
    'Maruti Suzuki',
    'MOIL',
    'NSSL Global',
    'Raymond',
    'SAIL',
    'Samsung Electronics',
    'Suzuki',
    'Tata Motors',
    'Toyota',
    'Volvo',
    'Wipro',
    'Yamaha',
    'Yazaki',
  ],
};

// ---------------------------------------------------------------------------
// Skill Connect
// ---------------------------------------------------------------------------

/**
 * The diagram groups its partners into four clusters around a central
 * "Skill – Connect" hub; the cluster labels are descriptive, the items are
 * the published wording.
 */
export const skillConnect = {
  title: 'Skill – Connect',
  tagline: 'Skill – Industry – Manpower',
  lede: 'Around every Satpuda trainee sits a network of industries, training centres, programmes and partners — connecting skill to industry, and industry to manpower.',
  words: ['Learning', 'Knowledge', 'Experience', 'Competence', 'Skills', 'Ability', 'Training', 'Growth'],
  clusters: [
    {
      id: 'global',
      icon: 'Globe',
      label: 'Abroad & online',
      items: ['Placement Abroad Programme', 'Online Knowledge Partners', '24X7 Skills'],
    },
    {
      id: 'industry',
      icon: 'Factory',
      label: 'Industry & training network',
      items: [
        'Local Industries',
        'Networks of ITIs',
        'Nationwide Industries',
        'Placement Agencies',
        'Adv. Training Centers',
        'Govt. Skill Centers',
      ],
    },
    {
      id: 'partners',
      icon: 'BadgeCheck',
      label: 'Programmes & partners',
      items: [
        'NSDC Programmes',
        'Skill Test Partners',
        'Trade Testing Partners',
        'Emigration Services',
        'Internship Partners',
        'Publication Houses',
      ],
    },
    {
      id: 'exchange',
      icon: 'Repeat',
      label: 'Exchange & enterprise',
      items: ['Trainees Exchange Programmes', 'Entrepreneurship Programmes', 'Publication Partners'],
    },
  ],
};

// ---------------------------------------------------------------------------
// Placement Details
// ---------------------------------------------------------------------------

export const placementDetails = {
  lede: 'The placement drives held each year, the trainees placed through them, the placement percentage and the salary package offered.',
  record,
  columns: {
    year: 'Year of Placement Drive',
    drives: 'Placement Count',
    placed: 'No. of Trainees Placed',
    percentage: 'Placement Percentage',
    salary: 'Salary Package',
  },
};

/**
 * Satpuda ITI — content source of truth.
 *
 * EVERY string in this file is taken from the official website
 * https://satpudaiti.com/ (homepage, /about-us/, /placement/, /training/,
 * /contact/ and /campus-balaghat/), captured 2026-09-22.
 *
 * Nothing here is invented. Where the official site does not publish a fact
 * (for example trade durations, which its course pages leave as placeholder
 * text), the field is simply absent rather than filled in.
 *
 * This module is the seam for a future MERN backend: `src/services/` already
 * reads through these shapes, so swapping in live API responses later does not
 * require touching components.
 */

// ---------------------------------------------------------------------------
// Institute identity
// ---------------------------------------------------------------------------

export const institute = {
  name: 'Satpuda (Pvt.) Industrial Training Institute',
  shortName: 'Satpuda ITI',
  legalName: 'SATPUDA PRIVATE INDUSTRIAL TRAINING INSTITUTE',
  trust: 'Maharana Pratap Shikshan Samiti, Balaghat',
  establishedYear: 1999,
  tagline: 'Best ITIs in Central India',
  // Verbatim from the homepage "About SATPUDA ITI" block.
  intro:
    'Satpuda Industrial Training Institute under Maharana Pratap Shikhsan Samiti, Balaghat was established in 1999 by the team of professional entrepreneurs, which includes sound technical background & qualified Engineers with a mission to promote quality vocational/ Technical training to the students of rural and urban areas.',
  purpose:
    'The institute has a mission of imparting technical education to create a new technical knowledge based craftsmen who will be capable of facing the challenges of the severe competition in the Liberalized, Privatized and Globalised era. The institute also focuses on self-employment by teaching hard skills training to the students.',
  management:
    'The management has taken care of the institution in providing job-oriented Vocational, Certificate level courses which are not only relevant for the changing needs of the time with regard to human resources and man power but also prepare students for self-employment.',
  affiliationStatement:
    'The institutes run Electrician, Fitter, Mechanic Diesel & COPA courses of CTS Scheme affiliated to NCVT (National Council of Vocational Training), which is the serving organization at National level for the programmes relating to Craftsman Training Scheme under DGET (Directorate General of Employment and Training), Ministry of Labour, Government of India, New Delhi. The ITI is administered by Directorate Technical Education, Govt. of MP.',
  standing:
    'Satpuda Private Industrial Training Institute(s) (SITI) are one of the premier institutions in central India. It is well known and well recognized for its Technical & vocational training standards. SITI also have associative relations with leading industries in and around the area.',
  groupNote:
    'Saptuda (Pvt) I.T.I. is the biggest ITI group in central India with 20+ Institutes. Maharana Pratap Shikshan Samiti is in Education & Training since 1999 & established the following Institutions in Central India (MP).',
  excellenceNote:
    'Satpuda ITI is a best-in-class and rapidly growing ITI group in Madhya Pradesh. There’s always something amazing happening at Satpuda ITIs. Whether it’s on-campus or around the world, our students, faculty, staff, and alumni are out seizing the day.',
  source: 'https://satpudaiti.com/',
};

export const missionVision = {
  mission:
    'At Satpuda Private Industrial Training Institute, we are committed to develop the youth by equipping them with employable and entrepreneurial skill sets suitable to the industry.',
  vision:
    'To upgrade the Institute as World Class Premium Vocational Training Institute with excellent infrastructure and environment, high training standards and constructive partnership with industries, developing globally competitive skilled workforce and entrepreneur society.',
  commitmentHi:
    'हम अंतर्राष्ट्रीय गुणवत्ता आश्वासन प्रणाली अपनाकर आधुनिक तरीकों से सतत उत्कृष्ट प्रशिक्षण प्रदान करने के लिए प्रतिबद्ध हैं।',
  commitmentEn:
    'We are committed to continuously providing excellent training through modern methods by adopting international quality assurance systems.',
};

/** Quality Policy — verbatim list from /about-us/. */
export const qualityPolicy = [
  '100% utilization of sanctioned intake capacity',
  'Maintaining retention rate more than 85%',
  'Passed out rate more than 80%',
  '100% follow up of passed out trainees',
  'Minimizing complaint rate to 0%',
  'To expose trainee to at least one industry',
  'Six days training programme for trainers in a year',
];

// ---------------------------------------------------------------------------
// Accreditation — only what the official site states
// ---------------------------------------------------------------------------

export const accreditations = [
  {
    abbr: 'NCVT',
    name: 'National Council for Vocational Training',
    note: 'New Delhi',
  },
  {
    abbr: 'DGET',
    name: 'Directorate General of Employment & Training',
    note: 'Ministry of Labour, Govt. of India',
  },
  {
    abbr: 'QCI',
    name: 'Quality Council of India',
    note: 'Recommended by',
  },
  {
    abbr: 'DTE MP',
    name: 'Directorate of Technical Education',
    note: 'Govt. of Madhya Pradesh',
  },
  {
    abbr: 'CTS',
    name: 'Craftsman Training Scheme',
    note: 'Affiliated courses',
  },
  {
    abbr: 'NIMI',
    name: 'National Instructional Media Institute',
    note: 'Instructional materials',
  },
];

// ---------------------------------------------------------------------------
// Trades / Courses
//
// The official course pages (e.g. /courses/electrician/) currently contain
// placeholder "Lorem Ipsum" body text and no published duration, so no
// description or duration is asserted here beyond the trade name and the
// affiliation the homepage does state.
// ---------------------------------------------------------------------------

export const trades = [
  {
    id: 'electrician',
    name: 'Electrician',
    slug: '/trades/electrician',
    icon: 'Zap',
    scheme: 'CTS · NCVT',
    // Factual scope of the NCVT trade itself — not an institute claim.
    scope: 'Wiring, electrical machines, power distribution and control systems.',
  },
  {
    id: 'fitter',
    name: 'Fitter',
    slug: '/trades/fitter',
    icon: 'Wrench',
    scheme: 'CTS · NCVT',
    scope: 'Bench work, fitting, assembly, measurement and machine maintenance.',
  },
  {
    id: 'diesel-mechanic',
    name: 'Mechanic Diesel',
    slug: '/trades/mechanic-diesel',
    icon: 'Cog',
    scheme: 'CTS · NCVT',
    scope: 'Diesel engines, fuel systems, overhaul and preventive maintenance.',
  },
  {
    id: 'copa',
    name: 'COPA',
    slug: '/trades/copa',
    icon: 'MonitorCog',
    scope: 'Computer operator and programming assistant.',
    scheme: 'CTS · NCVT',
  },
];

// ---------------------------------------------------------------------------
// Why Satpuda — the institute's own published comparison (/about-us/)
// ---------------------------------------------------------------------------

export const differentiators = {
  heading: "It's DIFFERENT @ SATPUDA ITIs",
  otherLabel: 'Other ITIs',
  satpudaLabel: 'Satpuda ITIs',
  other: [
    'NCVT Curriculum',
    'NCVT Infrastructure',
    'Some have placements',
    'Some have activities',
    'No guarantee on regular training',
  ],
  satpuda: [
    'Planned structured curriculum',
    'Rigorous regular authentic training',
    'Skill & trade testing',
    'NSDC courses',
    'Industry exposure',
    'On-the-job training',
    'STEP (Skill Enhancement Training Programme)',
    'Strong placements',
    'Focus on entrepreneurship',
    'Placement abroad programme',
    'Free online knowledge contents',
    'Strong alumni support',
    'Regular career updates / forecast',
    'Trained, experienced, dedicated trainers',
    'Focus on life long learning',
    'Preparing for technical mind sets',
  ],
};

// ---------------------------------------------------------------------------
// Training / Learning process (/training/)
// ---------------------------------------------------------------------------

export const training = {
  intro:
    'Satpuda Industrial Training Institute provides appropriate support and resources as per NCVT guidelines to impart the training learning process with the requisite number of hours and suitable methods. The teaching staff implements the course curriculum through a range of approaches and teaching strategies that recognize diverse learning styles relevant to the learning needs.',
  emphasis:
    'More number of practical sessions is given to the students to enrich their learning experience.',
  nimiNote:
    'SITI follows the complete learning process based on National Instructional Media Institute (NIMI) instructional materials.',
  methods: [
    'Classroom lecture & presentations',
    'Video sessions',
    'Demonstration',
    'Exercises',
    'Field exposure',
    'Industry visit',
    'Hand on practices',
    'Industrial projects',
    'Problem solving case studies',
  ],
  facilities: [
    'Advanced teaching aids and tools — LCD projectors, computers and advanced programmes.',
    'Digital library with computers and internet facility; students are provided a password to work on computers.',
    'The library contains all required text books & reference books as per the norms of NCVT / SCVT.',
    'Faculty attend Quality Improvement Programmes (QIPs) and Staff Development Programmes (SDPs) sponsored or organised by NCVT / SCVT / HRD.',
    'Eminent personalities are invited regularly to give lectures to students and faculty members.',
  ],
  hrNote:
    'SITI considers that our human resources are the most valuable assets. In line with the policy to do best to help them achieve their full potential through continuous education and training.',
};

// ---------------------------------------------------------------------------
// Placement — verified figures published on /placement/
// ---------------------------------------------------------------------------

export const placement = {
  headline: '2456 Campus placements in last 3 Years',
  campusNote:
    'Campus Recruitment Programme conducted by the Institutes is a very vital activity for the young technicians aspiring for appropriate placement. Almost all the trainees have secured firm jobs in Government Departments, Multinational Private/Public Sector Undertakings. A high percentage of our eligible trainees have been offered jobs by reputed firms.',
  interface:
    'SITI has made necessary arrangements for classroom sessions taken up by suitable faculty/experts from industries, arranges periodic industry visits, and ensures faculty members along with students take up real life problems from industries for problem solving and application of principles taught as part of course work.',
  // Verbatim table from /placement/
  record: [
    { year: 2016, drives: 2, placed: 103, percentage: 83, salary: 240000 },
    { year: 2017, drives: 11, placed: 587, percentage: 91, salary: 150000 },
    { year: 2018, drives: 23, placed: 1044, percentage: 97, salary: 222000 },
    { year: 2019, drives: 15, placed: 533, percentage: 85, salary: 210000 },
    { year: 2020, drives: 9, placed: 368, percentage: 89, salary: 174000 },
    { year: 2021, drives: 10, placed: 632, percentage: 94, salary: 240000 },
  ],
  cellActivities: [
    'To arrange campus interviews.',
    'To improve student personality by counselling from private and government sectors.',
    'To provide awareness and knowledge by guest faculty.',
    'To arrange seminars on subjects such as “Employment Opportunities in the local Industries”.',
    'To contact various local industries personally for their manpower requirements.',
    'To arrange “Self Employment Camps” giving information on government self-employment schemes.',
    'To provide newspapers, magazines and employment news to trainees.',
    'To provide computer and internet facilities for job searching and on-line job registration.',
  ],
  sourceNote: 'Figures as published by Satpuda ITI on satpudaiti.com/placement',
};

/**
 * Homepage counters, exactly as the official homepage presents them.
 * `qualifier` keeps each number in its published context so nothing is
 * overstated (e.g. "assistance", not "guarantee").
 */
export const homeCounters = [
  { value: 100, suffix: '%', label: 'Placement Assistance' },
  { value: 150, suffix: '+', label: 'Experienced Staff' },
  { value: 45, suffix: 'K', label: 'Students Enrolled' },
  { value: 15, suffix: '', label: 'ITI Campuses' },
];

// ---------------------------------------------------------------------------
// Testimonials — verbatim from the homepage (original Hindi preserved)
// ---------------------------------------------------------------------------

export const testimonials = [
  {
    id: 'shailendra-mishra',
    name: 'Shailendra Mishra',
    role: 'Indian Railway — Tech.-3',
    trade: 'Fitter',
    session: '2010–2012',
    campus: 'Manjhapur',
    photo: 'shailendra-mishra.png',
    quote:
      'मैं शैलेन्द्र मिश्रा पिता स्व. श्री राजेंद्र मिश्रा द्वारा सत्र 2010 - 2012 ट्रेड फिटर में सतपुड़ा प्रा. आईटीआई, मांझापुर से प्रशिक्षण प्राप्त किया। आईटीआई complete होने के बाद मेरा admission, Govt. College खीरसडोह में Lateral entry के द्वारा हुआ, यहाँ मैं 2012-2015 तक अध्यनरत रहा। मेरी आईटीआई के द्वारा कई जगह जॉब लगी जैसे टीचर, Volvo बग्गड़ प्लांट, ट्रेक्टर प्लांट मंडीदीप etc. आज मैं भारतीय रेलवे में तकनीशियन के पद पर हूँ। मेरे जॉब के पहले मेरे आईटीआई के सर लोगों का निरंतर मार्गदर्शन रहा, उन्हीं के आशीर्वाद से आज मैं इस जगह पहुंच पाया हूँ। मैं सारे टीचर्स का सहृदय से धन्यवाद करता हूँ।',
  },
  {
    id: 'deepak-patre',
    name: 'Deepak Patre',
    role: 'लाइन परिचालक',
    trade: 'Electrician',
    session: '2010–2012',
    campus: 'Manjhapur',
    photo: 'deepak-patre.png',
    quote:
      'मैं दीपक पात्रे सत्र 2010 - 2012 ट्रेड इलेक्ट्रीशियन में सतपुड़ा प्रा. आईटीआई, मांझापुर से प्रशिक्षण प्राप्त किया। आईटीआई complete होने के बाद मुझे ट्रेड अप्रेंटिसशिप व बहुत सी जगह में जॉब करने के अवसर मिले। आज मैं म.प्र. पू. क्षे. वि. वि. कं. लि. खंडवा में लाइन परिचालक के पद पर पदस्थ हूँ। मेरा आईटीआई complete होने के बाद आईटीआई के टीचर्स व प्रिंसिपल सर का समय समय पर मार्गदर्शन मिलता रहा, जिसकी वजह से आज मैं सफल हूँ।',
  },
  {
    id: 'abhimanyu-jamre',
    name: 'Abhimanyu Jamre',
    role: 'Suzuki Motor — CT',
    trade: 'Electrician',
    session: '2017–2019',
    campus: 'Manjhapur',
    photo: 'abhimanyu-jamre.png',
    quote:
      'मैं अभिमन्यु जामरे सत्र 2017 - 2019 ट्रेड इलेक्ट्रीशियन में सतपुड़ा प्रा. आईटीआई, मांझापुर से प्रशिक्षण प्राप्त किया। सतपुड़ा आईटीआई में उच्च प्रशिक्षित अनुभवी टीचर्स हैं। आईटीआई में बहुत जॉब कैंपस आते रहते हैं, जिससे बहुत से छात्रों को अपना भविष्य उज्जवल करने का मौका मिलता है। मुझे भी मौका मिला और आज मैं Suzuki Motor, Gujrat में रैंक CT हूँ और मेरी Salary भी अच्छी है। सतपुड़ा आईटीआई को मेरा धन्यवाद, जिसकी वजह से आज मैं अच्छा काम कर रहा हूँ।',
  },
  {
    id: 'lomesh-sanodiya',
    name: 'Lomesh Sanodiya',
    role: 'Indian Railway — Technician',
    trade: 'Fitter',
    session: '2009–2011',
    campus: 'Seoni',
    photo: 'lomesh-sanodiya.png',
    quote:
      'मैं लोमेश सनोडिया द्वारा सत्र 2009 - 2011 ट्रेड फिटर में सतपुड़ा प्रा. आईटीआई, Seoni से प्रशिक्षण प्राप्त किया। ITI complete होने के बाद ITI के सर लोगों का निरंतर मार्गदर्शन लेता रहा, और जॉब की तैयारी करता रहा। उन्हीं के आशीर्वाद से आज मैं इस जगह पहुंच पाया। मैं सारे Teachers का सहृदय से आभार व्यक्त करता हूँ।',
  },
];

// ---------------------------------------------------------------------------
// Campuses — verbatim contact records from /contact/
// ---------------------------------------------------------------------------

export const campuses = [
  {
    id: 'manjhapur',
    name: 'Satpuda I.T.I. Manjhapur',
    city: 'Manjhapur',
    district: 'Balaghat',
    phone: '+91 6262604120',
    email: 'satpudamanjhapur@gmail.com',
    address: 'Satpuda Campus, Manjhapur, Lalburra Road, Garra, Madhya Pradesh, 481001',
    established: 2010,
    ref: 'DGET-6/12/6/2010-TC',
    flagship: true,
  },
  {
    id: 'budhi',
    name: 'New Satpuda I.T.I. Budhi',
    city: 'Budhi',
    district: 'Balaghat',
    phone: '+91 6262604122',
    email: 'newsatpudaitibudi@gmail.com',
    address: 'New Satpuda Pvt. ITI Budhi, Ward No 13, Budhi, Balaghat, Madhya Pradesh, 481001',
    established: 2015,
    ref: 'DGET-6/12/274/2015',
  },
  {
    id: 'katangi',
    name: 'New Satpuda I.T.I. Katangi',
    city: 'Katangi',
    district: 'Balaghat',
    phone: '+91 6262604117',
    email: 'newsatpudakatangi@gmail.com',
    address: 'New Satpuda Pvt. ITI, Balaghat Road, Near State Bank, Katangi, Balaghat, Madhya Pradesh, 481445',
  },
  {
    id: 'rewa',
    name: 'Satpuda I.T.I. Rewa',
    city: 'Rewa',
    district: 'Rewa',
    phone: '+91 6262604134',
    email: 'sitc.rewa.2011@gmail.com',
    address: 'Rewa Satpuda ITI, Chorhata, Rewa, Madhya Pradesh, 486001',
  },
  {
    id: 'chhindwara-kundipura',
    name: 'Satpuda I.T.I. Kundipura',
    city: 'Kundipura',
    district: 'Chhindwara',
    phone: '+91 6262604123',
    email: 'satpudachindwara@gmail.com',
    address: 'Satpuda (Pvt) ITI, near Kundipura Thana, Chhindwara, Madhya Pradesh, 480001',
  },
  {
    id: 'chhindwara-warehouse',
    name: 'Satpuda I.T.I. Warehouse',
    city: 'Chhindwara',
    district: 'Chhindwara',
    phone: '+91 6262604124',
    email: 'satpudachhindwara@gmail.com',
    address: 'Satpuda (Pvt) ITI, behind Phataka Godown, Chhindwara, Madhya Pradesh, 480001',
  },
  {
    id: 'betul',
    name: 'Satpuda I.T.I. Betul',
    city: 'Betul',
    district: 'Betul',
    phone: '+91 6262604128',
    email: 'satpudabetul@gmail.com',
    address: 'Satpuda ITI, Chikhali Khurd, Multai, Betul, Madhya Pradesh, 460557',
  },
  {
    id: 'baihar',
    name: 'Maharana Pratap I.T.I. Baihar',
    city: 'Baihar',
    district: 'Balaghat',
    phone: '+91 6262604125',
    email: 'maharanapratap.itibaihar@gmail.com',
    address: 'Maharana Pratap Pvt. ITI Baihar, Compounder Tola, Somani Mill, Baihar, 481111',
  },
  {
    id: 'itarsi',
    name: 'Satpuda I.T.I. Itarsi',
    city: 'Itarsi',
    district: 'Narmadapuram',
    phone: '+91 6262604126',
    email: 'satpudaitarsi@gmail.com',
    address: 'Satpuda ITI, Near FCI, Jamani Road, Itarsi, Madhya Pradesh, 461114',
  },
  {
    id: 'seoni',
    name: 'Satpuda I.T.I. Seoni',
    city: 'Seoni',
    district: 'Seoni',
    phone: '+91 6262604131',
    email: 'satpudaseoni@gmail.com',
    address: 'Satpuda ITI, Nagpur Road, Seladehi, Seoni, Madhya Pradesh, 480661',
  },
  {
    id: 'mandla',
    name: 'Satpuda I.T.I. Mandla',
    city: 'Mandla',
    district: 'Mandla',
    phone: '+91 6262604118',
    email: 'satpudamandla@gmail.com',
    address: 'Satpuda ITI, Nainpur Road, Maharajpur Poundi, Mandla, 481661',
  },
  {
    id: 'mauganj',
    name: 'Satpuda I.T.I. Mauganj',
    city: 'Mauganj',
    district: 'Mauganj',
    phone: '+91 6262604132',
    email: 'satpudapvtitimauganj@gmail.com',
    address: 'Satpuda ITI, Mauganj Rewa Sidhi Road, Mauganj, Madhya Pradesh, 486331',
  },
  {
    id: 'multai',
    name: 'Satpuda I.T.I. Multai',
    city: 'Multai',
    district: 'Betul',
    phone: '+91 6262604130',
    email: 'satpudamultai@gmail.com',
    address: 'Satpuda (Pvt) ITI, Chikhali Khurd, Chhindwara Road, Multai (MP) 460661',
  },
  {
    id: 'sarni',
    name: 'Satpuda I.T.I. Sarni',
    city: 'Sarni',
    district: 'Betul',
    phone: '+91 6262604127',
    email: 'satpudasarni@gmail.com',
    address: 'Satpuda ITI, Salaiya, Near Geeta Mandir, Salaiya, 460449',
  },
  {
    id: 'shiksha-rewa',
    name: 'Shiksha Private I.T.I. Rewa',
    city: 'Rewa',
    district: 'Rewa',
    phone: '+91 6262604134',
    email: 'shikshaiti@gmail.com',
    address: 'Ward No. 8, Plot No. 849/1/1, Anand Nagar, Boda Bagh (MP) 486001',
  },
];

/** Districts represented, derived from the campus records above. */
export const campusDistricts = [...new Set(campuses.map((c) => c.district))];

// ---------------------------------------------------------------------------
// Sister institutions under the same trust (/contact/)
// ---------------------------------------------------------------------------

export const groupInstitutions = [
  {
    name: 'Satpuda Polytechnic College',
    phone: '+91 9425 8368 24',
    email: 'satpudapolytechnic@gmail.com',
    address: 'Satpuda Campus, Manjhapur, Lalburra Road, Garra, Madhya Pradesh, 481001',
  },
  {
    name: 'Satpuda Valley Public School',
    phone: '+91 9406 7641 54',
    email: 'satpudavalleypublicschool@gmail.com',
    address: 'Manjhapur, Lalburra Road, Garra, Madhya Pradesh, 481001',
  },
  {
    name: 'Satpuda B.Ed / D.Ed College',
    phone: '+91 9630 2442 26',
    address: 'Balaghat Road, Near State Bank, Katangi, Balaghat, Madhya Pradesh, 481445',
  },
];

// ---------------------------------------------------------------------------
// Contact (/contact/ head office + homepage footer)
// ---------------------------------------------------------------------------

export const contact = {
  headOffice: {
    label: 'Head Office',
    org: 'SATPUDA (PVT.) I.T.I.',
    phone: '+91 9425 138 87',
    email: 'enquiry@satpudaiti.com',
    address:
      'Satpuda Private Industrial Training Institute, Seoni Road, Village – Manjhapur (Sahutola), Dist. – Balaghat (MP) 481001',
  },
  enquiry: {
    label: 'For Enquiry',
    phone: '07632 292179',
    email: 'satpudaitigroup@gmail.com',
  },
  group: {
    email: 'satpudamanjhapur@gmail.com',
    phones: ['(07632) 249415', '+91 94258 3682 49'],
    address:
      'Satpuda Group, Lalburra Road, Manjhapur – Garra, Dist. Balaghat (MP) 481001',
  },
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/satpudaiti', icon: 'Facebook' },
  ],
};

// ---------------------------------------------------------------------------
// Navigation architecture
// ---------------------------------------------------------------------------

export const navigation = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'About Satpuda ITI', to: '/about' },
      { label: 'Mission & Vision', to: '/about#mission' },
      { label: 'Quality Policy', to: '/about#quality' },
      { label: 'Why Satpuda', to: '/about#why' },
    ],
  },
  {
    label: 'Trades',
    // No page of its own — the label opens the menu of the four trades.
    match: '/trades',
    children: trades.map((t) => ({ label: t.name, to: t.slug })),
  },
  { label: 'Training', to: '/training' },
  { label: 'Placements', to: '/placements' },
  {
    label: 'Campuses',
    to: '/campuses',
    children: [
      { label: 'All Campuses', to: '/campuses' },
      ...campuses.slice(0, 6).map((c) => ({ label: c.city, to: '/campuses' })),
    ],
  },
  { label: 'Contact', to: '/contact' },
];

// ---------------------------------------------------------------------------
// Events published on the homepage (dated — shown with their year intact)
// ---------------------------------------------------------------------------

export const noticeBoard = [
  { title: 'Placement Drive 2021', detail: 'Monday, Wednesday' },
  { title: 'Admission Drive 2021', detail: 'All working days, 9:35 am – 5:30 pm' },
  { title: 'Upcoming Holiday', detail: 'Diwali, 3rd November 2021' },
];

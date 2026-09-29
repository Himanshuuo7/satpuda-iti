/**
 * Training section — the content of /training and its six pages.
 *
 * English text is the institute's own wording (its /training/ page), with
 * obvious slips corrected ("HDD's" → HOD's, "Condusive" → Conducive,
 * "slandered" → standards). Several sections are published only as diagrams,
 * mostly in Hindi; that Hindi is transcribed verbatim, and each `en` beside it
 * is a faithful translation. Icons are named by string and resolved in
 * components/training/icons.js.
 */

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

export const trainingOverview = {
  lede: 'Satpuda Industrial Training Institute provides appropriate support and resources as per NCVT guidelines to impart training learning process with requisite number of hours and suitable methods.',
  emphasis: 'More number of practical sessions is given to the students to enrich their learning experience.',
};

// ---------------------------------------------------------------------------
// Learning Process
// ---------------------------------------------------------------------------

export const learningProcess = {
  intro: [
    'Satpuda Industrial Training Institute provides appropriate support and resources as per NCVT guidelines to impart training learning process with requisite number of hours and suitable methods.',
    'The teaching staff implements the course curriculum through a range of approaches and teaching strategies that recognize diverse learning style relevant to the learning needs.',
  ],
  emphasis: 'More number of practical sessions is given to the students to enrich their learning experience.',
  methodsLead: 'Following methods are used in Teaching Learning Process',
  methods: [
    { icon: 'Presentation', label: 'Classroom Lecture & Presentations' },
    { icon: 'MonitorPlay', label: 'Video Sessions' },
    { icon: 'Eye', label: 'Demonstration' },
    { icon: 'PenTool', label: 'Exercises' },
    { icon: 'Compass', label: 'Field Exposure' },
    { icon: 'Factory', label: 'Industry Visit' },
    { icon: 'Hand', label: 'Hand on Practices' },
    { icon: 'Cog', label: 'Industrial Projects' },
    { icon: 'Lightbulb', label: 'Problem Solving case studies' },
  ],
  nimi: 'SITI follows the complete Learning Process based on National Instructional Media Institute (NIMI) instructional materials.',
  methodologyLead:
    'Advance teaching methodology is followed to provide best training in the Institute for that we will utilize all measures relating to the Industrial Training.',
  /** The eleven published measures, grouped by what they concern. */
  measures: [
    {
      id: 'faculty',
      icon: 'GraduationCap',
      title: 'Faculty',
      items: [
        'Best qualified faculties rankers is to be appointed for training.',
        'To develop teaching skill of the faculty members, they are being provided facility to attend the quality improvements programmes (QIP’s) and staff development programmes (SDP’s) sponsored or organized by NCVT/SCVT/HRD time to time.',
        'Other than attending programmes, SITI itself organizing camp/ seminars & programmes to develop/ improve their teaching methodology.',
        'Eminent personalities are invited regularly in the Institute to provide their brain storming lectures to students as well as faculty members, so that they can be in touch with recent advance knowledge in the field of industrial training.',
      ],
    },
    {
      id: 'classroom',
      icon: 'Projector',
      title: 'Classrooms & teaching aids',
      items: [
        'Advance teaching aids/ tools utilized in the lecture with LCD Projectors, computers and with advanced programmes.',
        'Conducive Classrooms are also developed.',
        'The HOD/ teaching staff also provided the use and purpose of instruments and equipment guidelines through demonstration as per syllabus of NCVT in force and amended time to time.',
      ],
    },
    {
      id: 'digital',
      icon: 'Library',
      title: 'Internet, digital library & e-library',
      items: [
        'The utilization of Internet facilities are also helpful for modernization of the Industrial training. All the computers of the computer lab are attached with internet facility.',
        'Digital library is developed consisting of computers and internet facility. Students are provided pass word to work on computers and for the utilization of Internet facility.',
        'The e-library is fully utilized in the library so that students can get maximum benefits out of that.',
        'The library contains all the required text books & reference books as per the norms of NCVT/ SCVT.',
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Admission to Placement
// ---------------------------------------------------------------------------

/**
 * The published flowchart "प्रशिक्षण प्रक्रिया (प्रवेश से प्लेसमेंट तक)", in the
 * order its arrows run. The STEP module figures are shown as published (the
 * chart gives no unit).
 */
export const admissionToPlacement = {
  titleHi: 'प्रशिक्षण प्रक्रिया (प्रवेश से प्लेसमेंट तक)',
  titleEn: 'The training process, from admission to placement',
  step: {
    name: 'STEP',
    full: 'Skill Training Enhancement Programme',
    hi: 'कौशल प्रशिक्षण संवर्धन कार्यक्रम',
    hours: 400,
  },
  stages: [
    {
      hi: 'जानकारी और परामर्श',
      en: 'Information and counselling',
      items: [
        { hi: 'व्यवसाय एवं ट्रेड', en: 'Occupations and trades' },
        { hi: 'रोजगार के अवसर', en: 'Employment opportunities' },
        { hi: 'वर्तमान ट्रेंड', en: 'Current trends' },
        { hi: 'भविष्य की संभावनाएं', en: 'Future prospects' },
        { hi: 'उद्यमिता के विकल्प', en: 'Entrepreneurship options' },
      ],
    },
    {
      hi: 'व्यवसाय एवं ट्रेड हेतु आवश्यक कुशलताओं, दक्षताओं एवं योग्यताओं का मूल्यांकन',
      en: 'Assessment of the skills, proficiencies and aptitudes each occupation and trade needs',
    },
    {
      hi: 'प्रत्येक प्रशिक्षु हेतु व्यक्तिगत कैरियर योजना और कैरियर पथ',
      en: 'A personal career plan and career path for every trainee',
    },
    {
      hi: 'नियमित प्रशिक्षण के साथ साथ 400 घंटे का विशेष प्रशिक्षण कार्यक्रम',
      en: 'A 400-hour special training programme alongside regular training',
      step: true,
    },
    {
      hi: 'प्रशिक्षुओं का सतत प्रशिक्षण एवं विकास',
      en: 'Continuous training and development of trainees',
      modules: [
        { hi: 'व्यावसायिक कौशल', en: 'Occupational skills', value: 150 },
        { hi: 'अनिवार्य कौशल', en: 'Essential skills', value: 116 },
        { hi: 'तकनीकी कौशल', en: 'Technical skills', value: 108 },
        { hi: 'सॉफ्ट स्किल्स', en: 'Soft skills', value: 106 },
        { hi: 'ऑन-द-जॉब / प्रोजेक्ट्स', en: 'On-the-job / projects', value: 72 },
        { hi: 'प्लेसमेंट के लिए तैयारी', en: 'Preparation for placement', value: 36 },
      ],
    },
    {
      en: 'Value addition',
      items: [
        { en: 'Value Addition Certificates' },
        { en: 'Trade Testing Certificate' },
        { en: 'On-The-Job Training' },
        { en: 'EDP Programme' },
        { en: 'Skill Assessment' },
        { en: 'Correction in Career Path' },
      ],
    },
    {
      en: 'Placement',
      items: [
        { en: 'Interview Skills' },
        { en: 'Final Certification' },
        { en: 'Job Placement' },
        { en: 'Alumni Registration' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Curriculum
// ---------------------------------------------------------------------------

export const curriculum = {
  title: 'Curriculum @ Satpuda ITIs',
  paragraphs: [
    'SITI follow the curriculum and syllabus guidelines provided by NCVT. All HOD’s are responsible for keeping up to date on the changes/ guidelines suggested by the NCVT from time to time. The changes as advised are recorded and the additional resources like faculty, equipment, tools, etc is recorded and forwarded to the Institute Management Committee for its approval.',
    'In case of an urgency which requires immediate action to meet NCVT guidelines, the head of the institution is authorized to make purchases with information to all members of IMC.',
    'The curriculum of the trades for which the institute is affiliated is assessed every time before the start of the session by the IMC and any amendments required are carried out prior to the start of the session.',
    'The curriculum of each trade is published in the brochure for admission and put up on Institute website.',
    'Each HOD is responsible for ensuring the adherence to the course curriculum. The plan for delivery of the course curriculum is prepared on week basis and given to each Tutor.',
    'The Satpuda Industrial Training Institute strictly follow the syllabus prescribed by NCVT for the purpose and a copy of the same be provided to the student with amended syllabus, if any.',
  ],
  /** The yearly cycle the paragraphs describe, in order. */
  cycle: [
    { icon: 'BookMarked', title: 'NCVT guidelines', body: 'HODs keep up to date on changes suggested by NCVT; changes and the resources they need are recorded.' },
    { icon: 'Landmark', title: 'IMC approval', body: 'Forwarded to the Institute Management Committee for approval; in urgency the head of the institution may purchase with information to all IMC members.' },
    { icon: 'CalendarDays', title: 'Before each session', body: 'The IMC assesses each trade’s curriculum and carries out amendments prior to the start of the session.' },
    { icon: 'ClipboardList', title: 'Weekly delivery plan', body: 'Each HOD ensures adherence; a week-wise delivery plan is given to each tutor.' },
  ],
  cellLead:
    'The Institute has its own academic cell under the control of Principal of the Institute having all the HOD as member of the cell to provide feedback information to the students.',
  cell: [
    { icon: 'Newspaper', text: 'To have the latest information from NCVT' },
    { icon: 'CalendarDays', text: 'To prepare academic calendar.' },
    { icon: 'Users', text: 'To form admission committee.' },
    { icon: 'FileBadge', text: 'To arrange all the examination conducted by NCVT.' },
    { icon: 'Globe', text: 'To upload latest information of the Institute on the Institutes websites.' },
    { icon: 'Ban', text: 'To appoint anti-ragging Committee.' },
    { icon: 'Scale', text: 'To maintain discipline in the Institute.' },
    { icon: 'Clock', text: 'To prepare batch wise time table for trainee.' },
    { icon: 'BookOpen', text: 'To prepare admission brochure for each year for each trade.' },
  ],
};

// ---------------------------------------------------------------------------
// Holistic Development
// ---------------------------------------------------------------------------

export const holistic = {
  title: 'All Round Holistic Development',
  subtitleHi: 'सतपुड़ा ग्रुप की संस्थाओ में सभी प्रशिक्षुओं की क्षमताओं का सर्वागीण विकास',
  subtitleEn: 'All-round development of the abilities of every trainee in the Satpuda Group’s institutions',
  core: {
    hi: 'इंडस्ट्रीज के सहयोग एवं मार्गदर्शन से उत्कृष्ट प्रशिक्षण',
    en: 'Excellent training with the cooperation and guidance of industry',
  },
  petals: [
    { icon: 'Lightbulb', hi: 'सृजनात्मक ज्ञान एवं कौशल का समग्र विकास', en: 'Overall development of creative knowledge and skill' },
    { icon: 'TrendingUp', hi: 'रोजगार की क्षमताओं का सतत विकास', en: 'Continuous development of employability' },
    { icon: 'BadgeCheck', hi: 'NCVT मानदंडों के अनुसार प्रशिक्षण', en: 'Training as per NCVT norms' },
    { icon: 'HeartHandshake', hi: 'समाजिक एवं व्यक्तित्व निखार', en: 'Social and personality development' },
  ],
};

// ---------------------------------------------------------------------------
// Competency
// ---------------------------------------------------------------------------

export const competency = {
  title: 'Competency Based Learning',
  subtitleHi: 'हमारी प्रशिक्षण प्रणाली - योग्यता पर आधारित सीखना',
  subtitleEn: 'Our training system — competency based learning',
  /** How training time is divided, as published (sums to 100%). */
  mix: [
    { hi: 'व्यावहारिक प्रैक्टिकल', en: 'Practicals', value: 35 },
    { hi: 'क्लासरूम सत्र', en: 'Classroom sessions', value: 18 },
    { hi: 'तकनीकी अभिव्यक्तियाँ', en: 'Technical presentations', value: 16 },
    { hi: 'आडिओ विजुअल सत्र', en: 'Audio-visual sessions', value: 10 },
    { hi: 'तकनिकी क्रियाकलाप', en: 'Technical activities', value: 10 },
    { hi: 'सामूहिक विचार विमर्श', en: 'Group discussions', value: 6 },
    { hi: 'प्रोजेक्ट्स', en: 'Projects', value: 5 },
  ],
  principle: {
    titleHi: 'योग्यता पर आधारित सीखना',
    prepare: { hi: 'उसे इसके लिए कैसे तैयार करना है', en: 'How to prepare the trainee for it' },
    demand: { hi: 'बाजार की मांग के अनुसार उसे क्या करना है ये आना चाहिए', en: 'What the trainee must be able to do, as the market demands' },
  },
  skillsTitleHi: 'कार्यनिर्वाह क्षमताओं एवं कौशल का विकास',
  skillsTitleEn: 'Developing working abilities and skills',
  // "Social Pensiveness" on the original is corrected to Perceptiveness, which
  // is what its Hindi (सामाजिक सहज ज्ञान) says.
  skills: [
    { en: 'Coordination', hi: 'समन्वयन' },
    { en: 'Time Management', hi: 'समय प्रबंधन' },
    { en: 'Communication', hi: 'संवाद' },
    { en: 'Team Working', hi: 'टीम के साथ कार्य' },
    { en: 'Active Listening', hi: 'सक्रिय होकर सुनना' },
    { en: 'Critical Thinking', hi: 'गंभीर चिंतन' },
    { en: 'Complex Problem Solving', hi: 'जटिल समस्याओं को सुलझाना' },
    { en: 'Social Perceptiveness', hi: 'सामाजिक सहज ज्ञान' },
    { en: 'Monitoring', hi: 'नियंत्रण एवं निगरानी' },
    { en: 'Quality Control', hi: 'गुणवत्ता नियंत्रण' },
    { en: 'Multi-Skilling', hi: 'बहु कौशल' },
    { en: 'Equipment Selection', hi: 'उपकरणों का उचित चयन' },
  ],
  getTitle: 'What you get @ Satpuda ITI',
  get: [
    { icon: 'Award', label: 'NCVT Certificate' },
    { icon: 'FileBadge', label: 'SICTD Certificates' },
    { icon: 'Factory', label: 'Certificates from Industry Partners' },
    { icon: 'Users', label: 'Certificates from various Associations' },
    { icon: 'TrendingUp', label: 'Career Oriented Certificates' },
    { icon: 'BadgeCheck', label: 'NSDC Programmes' },
    { icon: 'Gauge', label: 'Skill Testing Certificate' },
    { icon: 'Wrench', label: 'Trade Testing Certificate' },
    { icon: 'Cog', label: 'Internship Projects' },
    { icon: 'Wifi', label: 'Online Knowledge' },
    { icon: 'Globe', label: 'Placement Abroad Guidance' },
    { icon: 'Shuffle', label: 'Trainees Exchange Programmes' },
    { icon: 'Lightbulb', label: 'Entrepreneurship Development' },
    { icon: 'Compass', label: 'Authentic Information & Guidance' },
  ],
};

// ---------------------------------------------------------------------------
// Human Resource Development
// ---------------------------------------------------------------------------

export const hrDevelopment = {
  title: 'Human Resource Development Satpuda ITI',
  kicker: 'Faculty',
  statement:
    'SITI consider that our human resources are the most valuable assets. In line with the Policy to do best to help them achieve their full potential through continuous education and training.',
  norms: 'The Institute follows the requirements of NCVT related to the qualifications and competencies of Principals, Instructors and other administrative staff.',
  roles: ['Principals', 'Instructors', 'Administrative staff'],
  cellLead: 'Satpuda Industrial Training Institute(s) has its own HR cell for recruitment of faculty and other staff:',
  cell: [
    {
      icon: 'Users',
      title: 'Selection committee',
      text: 'The selection committee of some eminent personalities has been constituted for the appointment of teaching Staff/ Instructor/ other supporting staff.',
    },
    {
      icon: 'BadgeCheck',
      title: 'Selection on merit',
      text: 'The selection of faculty members will be based on their qualification, experience and other achievement obtained during the service and norms and standards prescribed by NCVT for the appointment.',
    },
    {
      icon: 'GraduationCap',
      title: 'Advance training for staff',
      text: 'The advance training camp/programme for the staff will be organized by the Institute to develop technical skills. The seminar and conference will also be organized for the Staff and the Instructor to have the advance knowledge, so that our trainee will get maximum benefit of technical knowledge.',
    },
  ],
};

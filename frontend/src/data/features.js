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
    detail: 'NIMI की शिक्षण सामग्री और NCVT दिशानिर्देशों में तय आवश्यक घंटों के साथ पढ़ाया जाता है।',
    icon: 'ClipboardList',
    group: 'training',
    sourceUrls: [ABOUT, TRAINING],
  },
  {
    id: 'regular-training',
    title: 'Rigorous Regular Training',
    detail: 'हर प्रशिक्षु के सीखने के अनुभव को समृद्ध बनाने के लिए अधिक प्रैक्टिकल सत्र रखे जाते हैं।',
    icon: 'Timer',
    group: 'training',
    sourceUrls: [ABOUT, TRAINING],
  },
  {
    id: 'trade-testing',
    title: 'Skill & Trade Testing',
    detail: 'कौशल और ट्रेड परीक्षण Satpuda के प्रशिक्षण मॉडल का हिस्सा है।',
    icon: 'Gauge',
    group: 'training',
    sourceUrls: [ABOUT],
  },
  {
    id: 'nsdc',
    title: 'NSDC Courses',
    detail: 'NCVT ट्रेड कार्यक्रम के साथ-साथ NSDC कोर्स भी कराए जाते हैं।',
    icon: 'BadgeCheck',
    group: 'training',
    sourceUrls: [ABOUT],
  },
  {
    id: 'industry-exposure',
    title: 'Industry Exposure',
    detail: 'समय-समय पर उद्योग भ्रमण होते हैं, और शिक्षक विद्यार्थियों के साथ मिलकर उद्योगों की वास्तविक समस्याओं पर काम करते हैं।',
    icon: 'Factory',
    group: 'industry',
    sourceUrls: [ABOUT, PLACEMENT],
  },
  {
    id: 'skill-connect',
    title: 'Skill Connect',
    detail: 'प्लेसमेंट सेल के माध्यम से प्रशिक्षित कौशल को नियोक्ताओं से जोड़ना।',
    icon: 'Link2',
    group: 'industry',
    sourceUrls: [ABOUT],
  },
  {
    id: 'ojt',
    title: 'On-the-Job Training',
    detail: 'हाथों से व्यावहारिक अभ्यास, फील्ड का अनुभव और औद्योगिक प्रोजेक्ट सीखने की प्रक्रिया का हिस्सा हैं।',
    icon: 'HardHat',
    group: 'industry',
    sourceUrls: [ABOUT, TRAINING],
  },
  {
    id: 'step',
    title: 'Skill Enhancement (STEP)',
    detail: 'कौशल संवर्धन प्रशिक्षण कार्यक्रम (STEP) मुख्य सिलेबस से आगे बढ़कर अतिरिक्त कौशल जोड़ता है।',
    icon: 'TrendingUp',
    group: 'industry',
    sourceUrls: [ABOUT],
  },
  {
    id: 'placements',
    title: 'Placement Support',
    detail: 'प्लेसमेंट सेल कैंपस इंटरव्यू आयोजित करता है और स्थानीय उद्योगों से उनकी कार्यबल संबंधी ज़रूरतों के लिए संपर्क करता है।',
    icon: 'Briefcase',
    group: 'career',
    sourceUrls: [ABOUT, PLACEMENT],
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship Focus',
    detail: 'स्वरोज़गार शिविरों में सरकारी स्वरोज़गार योजनाओं की जानकारी दी जाती है।',
    icon: 'Lightbulb',
    group: 'career',
    sourceUrls: [ABOUT, PLACEMENT],
  },
  {
    id: 'alumni',
    title: 'Alumni Support',
    detail: 'हर उत्तीर्ण प्रशिक्षु का फॉलो-अप किया जाता है — यह हमारी गुणवत्ता नीति का एक लक्ष्य है।',
    icon: 'Users',
    group: 'career',
    sourceUrls: [ABOUT],
  },
  {
    id: 'career-updates',
    title: 'Career Updates',
    detail: 'समाचार पत्र, रोज़गार समाचार, और नौकरी खोजने व ऑनलाइन रजिस्ट्रेशन के लिए कंप्यूटर की सुविधा।',
    icon: 'Newspaper',
    group: 'career',
    sourceUrls: [ABOUT, PLACEMENT],
  },
  {
    id: 'trainers',
    title: 'Experienced Trainers',
    detail: 'शिक्षक हर वर्ष गुणवत्ता सुधार और स्टाफ विकास कार्यक्रमों में भाग लेते हैं।',
    icon: 'GraduationCap',
    group: 'mindset',
    sourceUrls: [ABOUT, TRAINING],
  },
  {
    id: 'lifelong',
    title: 'Lifelong Learning',
    detail: 'मुफ़्त ऑनलाइन ज्ञान सामग्री और इंटरनेट सुविधा वाली डिजिटल लाइब्रेरी।',
    icon: 'BookOpen',
    group: 'mindset',
    sourceUrls: [ABOUT, TRAINING],
  },
  {
    id: 'technical-mindset',
    title: 'Technical Mindset',
    detail: 'समस्या-समाधान केस स्टडी प्रशिक्षुओं को एक तकनीशियन की तरह सोचना सिखाती हैं।',
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
  'NCVT पाठ्यक्रम',
  'NCVT के अनुसार बुनियादी ढाँचा',
  'कुछ में प्लेसमेंट की सुविधा',
  'कुछ में अन्य गतिविधियाँ',
  'नियमित प्रशिक्षण की कोई गारंटी नहीं',
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
  { value: '100%', measure: 'स्वीकृत प्रवेश क्षमता का उपयोग' },
  { value: '> 85%', measure: 'प्रशिक्षुओं की निरंतरता (रिटेंशन) दर' },
  { value: '> 80%', measure: 'उत्तीर्ण होने की दर' },
  { value: '100%', measure: 'उत्तीर्ण प्रशिक्षुओं का फॉलो-अप' },
  { value: '0%', measure: 'शिकायत दर — शून्य की ओर घटाई गई' },
  { value: '≥ 1', measure: 'उद्योग, जिनका प्रत्यक्ष अनुभव हर प्रशिक्षु को मिलता है' },
  { value: '6 दिन', measure: 'हर वर्ष प्रशिक्षकों के लिए प्रशिक्षण कार्यक्रम' },
];

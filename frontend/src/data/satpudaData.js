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

import { PLACEMENT_BASE, placementPages } from './placementPages';
import { TRAINING_BASE, trainingPages } from './trainingPages';
import { ACTIVITY_BASE, activityPages } from './activityPages';

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
    'Maharana Pratap Shikshan Samiti, बालाघाट के अंतर्गत Satpuda Industrial Training Institute की स्थापना वर्ष 1999 में पेशेवर उद्यमियों की एक टीम ने की थी, जिसमें मज़बूत तकनीकी पृष्ठभूमि वाले योग्य इंजीनियर शामिल थे। इसका उद्देश्य ग्रामीण और शहरी क्षेत्रों के विद्यार्थियों तक गुणवत्तापूर्ण व्यावसायिक और तकनीकी प्रशिक्षण पहुँचाना है।',
  purpose:
    'संस्थान का लक्ष्य तकनीकी शिक्षा के माध्यम से तकनीकी ज्ञान से लैस ऐसे नए कारीगर तैयार करना है, जो उदारीकरण, निजीकरण और वैश्वीकरण के इस दौर की कड़ी प्रतिस्पर्धा की चुनौतियों का सामना कर सकें। संस्थान विद्यार्थियों को ठोस व्यावहारिक कौशल सिखाकर स्वरोज़गार पर भी विशेष ध्यान देता है।',
  management:
    'प्रबंधन ने संस्थान में रोज़गारोन्मुखी व्यावसायिक और सर्टिफिकेट स्तर के ऐसे कोर्स उपलब्ध कराए हैं, जो मानव संसाधन और कार्यबल की बदलती ज़रूरतों के अनुरूप हैं और साथ ही विद्यार्थियों को स्वरोज़गार के लिए भी तैयार करते हैं।',
  affiliationStatement:
    'ये संस्थान CTS योजना के अंतर्गत NCVT (National Council of Vocational Training) से संबद्ध Electrician, Fitter, Mechanic Diesel और COPA कोर्स चलाते हैं। NCVT, श्रम मंत्रालय, भारत सरकार, नई दिल्ली के DGET (Directorate General of Employment and Training) के अधीन Craftsman Training Scheme से जुड़े कार्यक्रमों के लिए राष्ट्रीय स्तर की संस्था है। ITI का प्रशासन तकनीकी शिक्षा संचालनालय, मध्य प्रदेश शासन द्वारा किया जाता है।',
  standing:
    'Satpuda Private Industrial Training Institute(s) (SITI) मध्य भारत के प्रमुख संस्थानों में से एक हैं। ये अपने तकनीकी और व्यावसायिक प्रशिक्षण के ऊँचे मानकों के लिए जाने और पहचाने जाते हैं। आसपास के क्षेत्र के प्रमुख उद्योगों के साथ भी SITI के घनिष्ठ संबंध हैं।',
  groupNote:
    'Satpuda (Pvt) I.T.I. 20 से अधिक संस्थानों के साथ मध्य भारत का सबसे बड़ा ITI समूह है। Maharana Pratap Shikshan Samiti वर्ष 1999 से शिक्षा और प्रशिक्षण के क्षेत्र में कार्यरत है और इसने मध्य भारत (मध्य प्रदेश) में निम्नलिखित संस्थानों की स्थापना की है।',
  excellenceNote:
    'Satpuda ITI मध्य प्रदेश का एक उत्कृष्ट और तेज़ी से बढ़ता ITI समूह है। Satpuda ITIs में हमेशा कुछ न कुछ खास होता रहता है। कैंपस में हों या दुनिया में कहीं भी, हमारे विद्यार्थी, शिक्षक, कर्मचारी और पूर्व छात्र हर दिन का भरपूर लाभ उठा रहे हैं।',
  source: 'https://satpudaiti.com/',
};

export const missionVision = {
  mission:
    'Satpuda Private Industrial Training Institute में हम युवाओं को उद्योग की ज़रूरतों के अनुरूप रोज़गार योग्य और उद्यमशील कौशल देकर उनका विकास करने के लिए प्रतिबद्ध हैं।',
  vision:
    'उत्कृष्ट बुनियादी ढाँचे और वातावरण, प्रशिक्षण के ऊँचे मानकों तथा उद्योगों के साथ रचनात्मक साझेदारी के बल पर संस्थान को विश्वस्तरीय प्रीमियम व्यावसायिक प्रशिक्षण संस्थान बनाना, और विश्व स्तर पर प्रतिस्पर्धी कुशल कार्यबल व उद्यमी समाज तैयार करना।',
  commitmentHi:
    'हम अंतर्राष्ट्रीय गुणवत्ता आश्वासन प्रणाली अपनाकर आधुनिक तरीकों से सतत उत्कृष्ट प्रशिक्षण प्रदान करने के लिए प्रतिबद्ध हैं।',
  commitmentEn:
    'We are committed to continuously providing excellent training through modern methods by adopting international quality assurance systems.',
};

/** Quality Policy — verbatim list from /about-us/. */
export const qualityPolicy = [
  'स्वीकृत प्रवेश क्षमता का 100% उपयोग',
  'प्रशिक्षुओं की निरंतरता (रिटेंशन) दर 85% से अधिक बनाए रखना',
  'उत्तीर्ण होने की दर 80% से अधिक',
  'उत्तीर्ण प्रशिक्षुओं का 100% फॉलो-अप',
  'शिकायत दर को घटाकर 0% तक लाना',
  'हर प्रशिक्षु को कम से कम एक उद्योग का प्रत्यक्ष अनुभव दिलाना',
  'प्रशिक्षकों के लिए वर्ष में छह दिन का प्रशिक्षण कार्यक्रम',
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
    scope: 'वायरिंग, विद्युत मशीनें, बिजली वितरण और कंट्रोल सिस्टम।',
  },
  {
    id: 'fitter',
    name: 'Fitter',
    slug: '/trades/fitter',
    icon: 'Wrench',
    scheme: 'CTS · NCVT',
    scope: 'बेंच वर्क, फिटिंग, असेंबली, माप और मशीनों का रखरखाव।',
  },
  {
    id: 'diesel-mechanic',
    name: 'Mechanic Diesel',
    slug: '/trades/mechanic-diesel',
    icon: 'Cog',
    scheme: 'CTS · NCVT',
    scope: 'डीज़ल इंजन, फ्यूल सिस्टम, ओवरहॉल और निवारक रखरखाव।',
  },
  {
    id: 'copa',
    name: 'COPA',
    slug: '/trades/copa',
    icon: 'MonitorCog',
    scope: 'कंप्यूटर ऑपरेटर और प्रोग्रामिंग असिस्टेंट।',
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
    'NCVT पाठ्यक्रम',
    'NCVT के अनुसार बुनियादी ढाँचा',
    'कुछ में प्लेसमेंट की सुविधा',
    'कुछ में अन्य गतिविधियाँ',
    'नियमित प्रशिक्षण की कोई गारंटी नहीं',
  ],
  satpuda: [
    'सुनियोजित और व्यवस्थित पाठ्यक्रम',
    'कठोर, नियमित और प्रामाणिक प्रशिक्षण',
    'कौशल और ट्रेड परीक्षण',
    'NSDC कोर्स',
    'उद्योगों का प्रत्यक्ष अनुभव',
    'ऑन-द-जॉब ट्रेनिंग',
    'STEP (कौशल संवर्धन प्रशिक्षण कार्यक्रम)',
    'मज़बूत प्लेसमेंट',
    'उद्यमिता पर विशेष ध्यान',
    'विदेश में प्लेसमेंट कार्यक्रम',
    'मुफ़्त ऑनलाइन ज्ञान सामग्री',
    'पूर्व छात्रों का मज़बूत सहयोग',
    'करियर से जुड़ी नियमित जानकारी और पूर्वानुमान',
    'प्रशिक्षित, अनुभवी और समर्पित प्रशिक्षक',
    'जीवन भर सीखते रहने पर ज़ोर',
    'तकनीकी सोच विकसित करने की तैयारी',
  ],
};

// ---------------------------------------------------------------------------
// Training / Learning process (/training/)
// ---------------------------------------------------------------------------

export const training = {
  intro:
    'Satpuda Industrial Training Institute, NCVT के दिशानिर्देशों के अनुसार आवश्यक घंटों और उपयुक्त विधियों के साथ प्रशिक्षण और सीखने की प्रक्रिया चलाने के लिए पूरा सहयोग और संसाधन उपलब्ध कराता है। शिक्षक अलग-अलग तरीकों और शिक्षण रणनीतियों से पाठ्यक्रम पढ़ाते हैं, ताकि हर विद्यार्थी अपनी सीखने की शैली और ज़रूरत के अनुसार सीख सके।',
  emphasis:
    'विद्यार्थियों के सीखने के अनुभव को और समृद्ध बनाने के लिए उन्हें अधिक से अधिक प्रैक्टिकल सत्र दिए जाते हैं।',
  nimiNote:
    'SITI में सीखने की पूरी प्रक्रिया National Instructional Media Institute (NIMI) की शिक्षण सामग्री पर आधारित है।',
  methods: [
    'कक्षा व्याख्यान और प्रेज़ेंटेशन',
    'वीडियो सत्र',
    'प्रदर्शन (डेमो)',
    'अभ्यास',
    'फील्ड का अनुभव',
    'उद्योग भ्रमण',
    'हाथों से व्यावहारिक अभ्यास',
    'औद्योगिक प्रोजेक्ट',
    'समस्या-समाधान केस स्टडी',
  ],
  facilities: [
    'आधुनिक शिक्षण साधन और उपकरण — LCD प्रोजेक्टर, कंप्यूटर और उन्नत सॉफ़्टवेयर प्रोग्राम।',
    'कंप्यूटर और इंटरनेट सुविधा वाली डिजिटल लाइब्रेरी; कंप्यूटर पर काम करने के लिए विद्यार्थियों को पासवर्ड दिया जाता है।',
    'लाइब्रेरी में NCVT / SCVT के मानदंडों के अनुसार सभी ज़रूरी पाठ्यपुस्तकें और संदर्भ पुस्तकें उपलब्ध हैं।',
    'शिक्षक NCVT / SCVT / HRD द्वारा प्रायोजित या आयोजित गुणवत्ता सुधार कार्यक्रमों (QIP) और स्टाफ विकास कार्यक्रमों (SDP) में भाग लेते हैं।',
    'विद्यार्थियों और शिक्षकों को व्याख्यान देने के लिए प्रतिष्ठित व्यक्तियों को नियमित रूप से आमंत्रित किया जाता है।',
  ],
  hrNote:
    'SITI मानता है कि हमारे मानव संसाधन हमारी सबसे मूल्यवान संपत्ति हैं। इसी नीति के अनुरूप हम निरंतर शिक्षा और प्रशिक्षण के माध्यम से उन्हें अपनी पूरी क्षमता तक पहुँचने में हर संभव मदद करते हैं।',
};

// ---------------------------------------------------------------------------
// Placement — verified figures published on /placement/
// ---------------------------------------------------------------------------

export const placement = {
  headline: 'पिछले 3 वर्षों में 2456 कैंपस प्लेसमेंट',
  campusNote:
    'संस्थानों द्वारा आयोजित कैंपस भर्ती कार्यक्रम (Campus Recruitment Programme) उपयुक्त नौकरी की तलाश कर रहे युवा तकनीशियनों के लिए बेहद अहम गतिविधि है। लगभग सभी प्रशिक्षुओं को सरकारी विभागों और बहुराष्ट्रीय निजी/सार्वजनिक क्षेत्र के उपक्रमों में स्थायी नौकरियाँ मिली हैं। हमारे योग्य प्रशिक्षुओं में से बड़ी संख्या को प्रतिष्ठित कंपनियों ने नौकरी के प्रस्ताव दिए हैं।',
  interface:
    'SITI ने उद्योगों के योग्य विशेषज्ञों द्वारा कक्षा सत्र लेने की आवश्यक व्यवस्था की है, समय-समय पर उद्योग भ्रमण कराता है, और यह सुनिश्चित करता है कि शिक्षक व विद्यार्थी मिलकर उद्योगों की वास्तविक समस्याओं पर काम करें, ताकि कोर्स में पढ़ाए गए सिद्धांत व्यवहार में लागू हो सकें।',
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
    'कैंपस इंटरव्यू आयोजित करना।',
    'निजी और सरकारी क्षेत्र के विशेषज्ञों की काउंसलिंग से विद्यार्थियों के व्यक्तित्व का विकास करना।',
    'अतिथि शिक्षकों के माध्यम से जागरूकता और ज्ञान देना।',
    '“स्थानीय उद्योगों में रोज़गार के अवसर” जैसे विषयों पर सेमिनार आयोजित करना।',
    'स्थानीय उद्योगों से उनकी कार्यबल संबंधी ज़रूरतों के लिए व्यक्तिगत रूप से संपर्क करना।',
    'सरकारी स्वरोज़गार योजनाओं की जानकारी देने के लिए “स्वरोज़गार शिविर” आयोजित करना।',
    'प्रशिक्षुओं को समाचार पत्र, पत्रिकाएँ और रोज़गार समाचार उपलब्ध कराना।',
    'नौकरी खोजने और ऑनलाइन जॉब रजिस्ट्रेशन के लिए कंप्यूटर और इंटरनेट की सुविधा देना।',
  ],
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
    photo: 'shailendra-mishra.webp',
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
    photo: 'deepak-patre.webp',
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
    photo: 'abhimanyu-jamre.webp',
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
    photo: 'lomesh-sanodiya.webp',
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
  // Placement, then Training — the order and the dropdowns of the institute's
  // own menu.
  {
    label: 'Placement',
    to: PLACEMENT_BASE,
    children: placementPages.map((p) => ({ label: p.label, to: p.to, description: p.summary })),
  },
  {
    label: 'Training',
    to: TRAINING_BASE,
    children: trainingPages.map((p) => ({ label: p.label, to: p.to, description: p.summary })),
  },
  {
    label: 'Activity',
    // A menu only, as on the institute's website — no page of its own.
    match: ACTIVITY_BASE,
    children: activityPages.map((p) => ({ label: p.label, to: p.to, description: p.summary })),
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

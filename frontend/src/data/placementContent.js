import { placementTotals } from './placementRecord';

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

export const overview = {
  // The group record's headline figure; its years come with it.
  headline: {
    value: placementTotals.selected,
    label: `Candidates selected at campus drives, ${placementTotals.first}–${placementTotals.last}`,
  },
  // Homepage wording, verbatim.
  campusNote:
    'संस्थानों द्वारा आयोजित कैंपस भर्ती कार्यक्रम (Campus Recruitment Programme) उपयुक्त नौकरी की तलाश कर रहे युवा तकनीशियनों के लिए बेहद अहम गतिविधि है। लगभग सभी प्रशिक्षुओं को सरकारी विभागों और बहुराष्ट्रीय निजी/सार्वजनिक क्षेत्र के उपक्रमों में स्थायी नौकरियाँ मिली हैं। हमारे योग्य प्रशिक्षुओं में से बड़ी संख्या को प्रतिष्ठित कंपनियों ने नौकरी के प्रस्ताव दिए हैं।',
};

// ---------------------------------------------------------------------------
// Industrial Interface & Student Development
// ---------------------------------------------------------------------------

/**
 * The published paragraph lists five things SITI does; each is set as its own
 * card below with the paragraph's wording intact.
 */
export const industrialInterface = {
  lede: 'SITI किस तरह उद्योग को कक्षा तक लाता है, प्रशिक्षुओं को उद्योगों तक ले जाता है, और हर प्रशिक्षु को उपयुक्त प्लेसमेंट की ओर मार्गदर्शन देता है।',
  arrangements: [
    {
      icon: 'Presentation',
      title: 'Experts from industry',
      body: 'SITI ने उद्योगों के योग्य विशेषज्ञों द्वारा कक्षा सत्र लेने की आवश्यक व्यवस्था की है।',
    },
    {
      icon: 'Factory',
      title: 'Periodic industry visits',
      body: 'SITI समय-समय पर उद्योग भ्रमण आयोजित करता है।',
    },
    {
      icon: 'Wrench',
      title: 'Real-life problems',
      body: 'विद्यार्थियों का कौशल बढ़ाने के लिए शिक्षक और विद्यार्थी मिलकर उद्योगों की वास्तविक समस्याओं पर काम करते हैं, ताकि कोर्स में पढ़ाए गए सिद्धांतों को व्यवहार में लागू किया जा सके।',
    },
    {
      icon: 'Users',
      title: 'Soft skills & attitudes',
      body: 'विद्यार्थियों को ज़रूरी सॉफ्ट स्किल्स और सही दृष्टिकोण विकसित करने के लिए प्रोत्साहित किया जाता है, ताकि उन्हें उद्योग में उपयुक्त प्लेसमेंट मिल सके।',
    },
    {
      icon: 'Compass',
      title: 'Guidance for placement',
      body: 'प्लेसमेंट एवं मार्गदर्शन सेल के माध्यम से प्रशिक्षुओं को प्लेसमेंट पाने के लिए ज़रूरी मार्गदर्शन दिया जाता है।',
    },
  ],
  activities: [
    { icon: 'Handshake', text: 'कैंपस इंटरव्यू आयोजित करना।' },
    { icon: 'UserCheck', text: 'निजी और सरकारी क्षेत्र के विशेषज्ञों की काउंसलिंग से विद्यार्थियों के व्यक्तित्व का विकास करना।' },
    { icon: 'GraduationCap', text: 'अतिथि शिक्षकों के माध्यम से जागरूकता और ज्ञान देना।' },
    {
      icon: 'Mic',
      text: 'प्रशिक्षुओं को करियर से जुड़ा उपयोगी मार्गदर्शन और ज्ञान देने के लिए “स्थानीय उद्योगों में रोज़गार के अवसर” जैसे विषयों पर सेमिनार आयोजित करना।',
    },
    { icon: 'Building2', text: 'स्थानीय उद्योगों से उनकी कार्यबल संबंधी ज़रूरतों के लिए व्यक्तिगत रूप से संपर्क करना।' },
    {
      icon: 'Lightbulb',
      text: 'प्रशिक्षुओं को सरकार की विभिन्न स्वरोज़गार योजनाओं की जानकारी देने के लिए “स्वरोज़गार शिविर” आयोजित करना।',
    },
    {
      icon: 'Newspaper',
      text: 'प्रशिक्षुओं को समाचार पत्र, पत्रिकाएँ (करियर मार्गदर्शन, सामान्य ज्ञान, प्रेरणा) और रोज़गार समाचार उपलब्ध कराना।',
    },
    { icon: 'Monitor', text: 'करियर से जुड़ी जानकारी के लिए प्रशिक्षुओं को कंप्यूटर सुविधा देना।' },
    {
      icon: 'Wifi',
      text: 'नौकरी खोजने, ऑनलाइन जॉब रजिस्ट्रेशन और उद्योगों की जानकारी खोजने के लिए इंटरनेट सुविधा देना।',
    },
  ],
};

// ---------------------------------------------------------------------------
// Career Path
// ---------------------------------------------------------------------------

/** Each step is one rung; a rung with two entries shows them side by side. */
export const careerPath = {
  lede: 'NCVT ITI प्रमाणपत्र तीन रास्ते खोलता है — उद्योग में करियर, आगे की पढ़ाई, या अपना खुद का व्यवसाय — और इनमें से हर रास्ता आपको फ्रीलांसर के रूप में काम करने तक ले जा सकता है।',
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
  lede: 'अपना व्यवसाय शुरू करना चाहने वाले प्रशिक्षु के लिए SITI द्वारा तैयार किया गया रास्ता — सोच में पहले बदलाव से लेकर विकास, स्थिरता और फ्रेंचाइज़ी विकास तक।',
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
    'प्रशिक्षुओं को सरकार की विभिन्न स्वरोज़गार योजनाओं की जानकारी देने के लिए “स्वरोज़गार शिविर” आयोजित करना।',
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
  lede: 'हर Satpuda प्रशिक्षु के आसपास उद्योगों, प्रशिक्षण केंद्रों, कार्यक्रमों और साझेदारों का एक नेटवर्क है — जो कौशल को उद्योग से, और उद्योग को कार्यबल से जोड़ता है।',
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

/** The figures themselves come from placementRecord.js. */
export const placementDetails = {
  lede: 'सतपुड़ा समूह के हर ITI में हर वर्ष आयोजित कैंपस ड्राइव, उनमें शामिल हुए उम्मीदवार और चयनित उम्मीदवार — साल-दर-साल और ITI-वार।',
  columns: {
    year: 'Year of Campus Drive',
    drives: 'Campus Drives',
    attended: 'Candidates Attended',
    selected: 'Candidates Selected',
    itis: 'ITIs',
  },
};

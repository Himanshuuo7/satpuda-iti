/**
 * Activity section — the content of its four pages.
 *
 * English text is the institute's own wording (its /Safety page and homepage),
 * with one slip corrected ("recedes" → records). The activities list, the
 * safety programmes and the newspaper headlines are published only as images,
 * mostly in Hindi; that Hindi is transcribed verbatim, and each `en` beside it
 * is a faithful translation. Icons are named by string and resolved in
 * components/activity/icons.js.
 */

// ---------------------------------------------------------------------------
// Student's Life – Activities
// ---------------------------------------------------------------------------

/** The "विविध गतिविधियां" board, grouped by kind. */
export const activities = {
  titleHi: 'विविध गतिविधियां',
  // Homepage wording.
  lede: 'There’s always something amazing happening at Satpuda ITIs. Whether it’s on-campus or around the world, our students, faculty, staff, and alumni are out seizing the day.',
  groups: [
    {
      id: 'days',
      icon: 'Flag',
      label: 'Days & celebrations',
      items: [
        { hi: 'स्वतंत्रता दिवस', en: 'Independence Day' },
        { hi: 'गणतंत्र दिवस', en: 'Republic Day' },
        { hi: 'राष्ट्रीय युवा दिवस', en: 'National Youth Day' },
        { hi: 'योग दिवस समारोह', en: 'Yoga Day celebration' },
        { hi: 'शिक्षक दिवस समारोह', en: 'Teachers’ Day celebration' },
        { hi: 'वरिष्ठ तकनीशियन दिवस', en: 'Senior Technicians’ Day' },
        { hi: 'विश्वकर्मा पूजा', en: 'Vishwakarma Puja' },
      ],
    },
    {
      id: 'life',
      icon: 'Trophy',
      label: 'Culture, sports & service',
      items: [
        { hi: 'सांस्कृतिक गतिविधियां', en: 'Cultural activities' },
        { hi: 'खेलकूद गतिविधियां', en: 'Sports activities' },
        { hi: 'प्रशिक्षुओं के लिए Fun Games', en: 'Fun games for trainees' },
        { hi: 'रक्तदान शिविर', en: 'Blood donation camp' },
      ],
    },
    {
      id: 'awareness',
      icon: 'Megaphone',
      label: 'Awareness & workshops',
      items: [
        { hi: 'स्वच्छ भारत अभियान', en: 'Swachh Bharat Abhiyan' },
        { hi: 'वित्तीय साक्षरता पर कार्यशाला', en: 'Workshop on financial literacy' },
        { hi: 'मानव अधिकारों पर कार्यशाला', en: 'Workshop on human rights' },
        { hi: 'सतर्कता सप्ताह', en: 'Vigilance Week' },
        { hi: 'राष्ट्रीय सुरक्षा दिवस', en: 'National Safety Day' },
        { hi: 'विश्व गैर–तंबाकू दिवस', en: 'World No Tobacco Day' },
      ],
    },
    {
      id: 'earth',
      icon: 'Leaf',
      label: 'Environment',
      items: [
        { hi: 'ग्रीन वीक सेलिब्रेशन', en: 'Green Week celebration' },
        { hi: 'विश्व पर्यावरण दिवस', en: 'World Environment Day' },
        { hi: 'पृथ्वी दिवस समारोह', en: 'Earth Day celebration' },
      ],
    },
  ],
  visitsHi: 'औद्योगिक भ्रमण',
};

// ---------------------------------------------------------------------------
// Safety
// ---------------------------------------------------------------------------

export const safety = {
  lead: 'Administration of institute determines, maintain and comply with health, safety and security norms including:',
  norms: [
    { icon: 'Siren', text: 'Appropriate procedures and training for all staff members to implement emergency and crisis plans & Handle accidents.' },
    { icon: 'ListChecks', text: 'The safety/ emergency procedure followed by the SITI.' },
    { icon: 'Stethoscope', text: 'SITI have dispensary and MI Room.' },
    { icon: 'Scale', text: 'Applicable statutory and regulatory requirements,' },
    { icon: 'TrafficCone', text: 'Provision for emergencies covering both indoor and outdoor activities.' },
    { icon: 'HeartPulse', text: 'Health policies which include collection of medical information for all staff and students, immunization against common diseases and maintenance of comprehensive records.' },
  ],
  // "सुरक्षा पर विशेष ध्यान" — the safety graphic on the institute's about page.
  focusHi: 'सुरक्षा पर विशेष ध्यान',
  focusEn: 'Special attention to safety',
  programmes: [
    { icon: 'HardHat', hi: 'व्यक्तिगत सुरक्षा उपकरणों पर जागरूकता कार्यक्रम', en: 'Awareness programme on personal protective equipment' },
    { icon: 'TrafficCone', hi: 'प्रशिक्षुओं के लिए अनिवार्य सड़क सुरक्षा प्रशिक्षण', en: 'Mandatory road safety training for trainees' },
    { icon: 'HeartPulse', hi: 'प्राथमिक चिकित्सा तकनीकों पर प्रशिक्षण', en: 'Training in first-aid techniques' },
    { icon: 'Flame', hi: 'सुरक्षित वेल्डिंग तकनीकों पर सुरक्षा सत्र', en: 'Safety sessions on safe welding techniques' },
    { icon: 'Zap', hi: 'सुरक्षित विद्युत तकनीकों पर सुरक्षा सत्र', en: 'Safety sessions on safe electrical techniques' },
    { icon: 'CloudLightning', hi: 'आपदा प्रबंधन पर जागरूकता कार्यशाला', en: 'Awareness workshop on disaster management' },
    { icon: 'Signpost', hi: 'सुरक्षा संकेतों पर जागरूकता कार्यक्रम', en: 'Awareness programme on safety signs' },
    { icon: 'Flag', hi: 'राष्ट्रीय सुरक्षा दिवस का आयोजन', en: 'Observing National Safety Day' },
    { icon: 'TrafficCone', hi: 'सड़क सुरक्षा जागरूकता कार्यक्रम', en: 'Road safety awareness programme' },
    { icon: 'FlaskConical', hi: 'संस्था में सेफ्टी लैब की स्थापना', en: 'A safety lab set up in the institute' },
    { icon: 'Flame', hi: 'अग्नि सुरक्षा पर कार्यशालाएँ', en: 'Workshops on fire safety' },
    { icon: 'CalendarDays', hi: 'सुरक्षा सप्ताह का आयोजन', en: 'Observing Safety Week' },
    { icon: 'Siren', hi: 'सुरक्षा पर मॉक ड्रिल', en: 'Safety mock drills' },
  ],
  slogans: ['Think Safety First', 'Safety Begins with Team Work', 'Practice Safety Around the Clock', 'Take the Extra Step to Safety'],
};

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export const news = {
  /** The homepage "New Events" board, verbatim and dated as published. */
  events: [
    { icon: 'Handshake', title: 'Placement Drive 2021', detail: 'Monday, Wednesday', year: 2021 },
    { icon: 'GraduationCap', title: 'Admission Drive 2021', detail: 'All Working day, Time – 9:35am – 05:30pm', year: 2021 },
    { icon: 'CalendarDays', title: 'Upcoming Holiday', detail: 'Diwali 3rd November 2021', year: 2021 },
  ],
  /** Headlines of the newspaper coverage on the institute's activities board. */
  press: [
    { hi: 'सतपुड़ा आईटीआई में रोजगार मेले का हुआ आयोजन', en: 'Job fair held at Satpuda ITI' },
    { hi: 'कई वर्षों से रोजगार के अवसर उपलब्ध कराता है संस्थान सतपुड़ा आईटीआई', en: 'For many years, Satpuda ITI has provided employment opportunities' },
    { hi: 'आईटीआई के छात्रों ने समझी बिजली बनाने की विधि', en: 'ITI students learn how electricity is generated' },
    { hi: 'रक्तदान कर सड़क सुरक्षा की दिलाई शपथ', en: 'Blood donated and a road-safety pledge taken' },
    { hi: 'रात्रिकालीन क्रिकेट प्रतियोगिता में जमकर लगे चौके-छक्के', en: 'Fours and sixes fly at the night cricket tournament' },
    { hi: 'सतपुड़ा आईटीआई में विदाई समारोह, छात्रों ने साझा किए अपने-अपने अनुभव', en: 'Farewell at Satpuda ITI; students share their experiences' },
    { hi: 'तकनीकी शिक्षा क्षेत्र में अग्रणी सतपुड़ा आई.टी.आई.', en: 'Satpuda ITI, a leader in technical education' },
    { hi: '9 वर्षों से निरंतर तकनीकी शिक्षा के क्षेत्र में अग्रणी सतपुड़ा आई.टी.आई. बैतूल', en: 'Satpuda ITI Betul: nine years leading in technical education' },
    { hi: '18 वर्षों से निरंतर तकनीकी शिक्षा के क्षेत्र में अग्रणी सतपुड़ा ग्रुप', en: 'Satpuda Group: eighteen years leading in technical education' },
  ],
};

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
  lede: 'Satpuda Industrial Training Institute, NCVT के दिशानिर्देशों के अनुसार आवश्यक घंटों और उपयुक्त विधियों के साथ प्रशिक्षण और सीखने की प्रक्रिया चलाने के लिए पूरा सहयोग और संसाधन उपलब्ध कराता है।',
  emphasis: 'विद्यार्थियों के सीखने के अनुभव को और समृद्ध बनाने के लिए उन्हें अधिक से अधिक प्रैक्टिकल सत्र दिए जाते हैं।',
};

// ---------------------------------------------------------------------------
// Learning Process
// ---------------------------------------------------------------------------

export const learningProcess = {
  intro: [
    'Satpuda Industrial Training Institute, NCVT के दिशानिर्देशों के अनुसार आवश्यक घंटों और उपयुक्त विधियों के साथ प्रशिक्षण और सीखने की प्रक्रिया चलाने के लिए पूरा सहयोग और संसाधन उपलब्ध कराता है।',
    'शिक्षक अलग-अलग तरीकों और शिक्षण रणनीतियों से पाठ्यक्रम पढ़ाते हैं, ताकि हर विद्यार्थी अपनी सीखने की शैली और ज़रूरत के अनुसार सीख सके।',
  ],
  emphasis: 'विद्यार्थियों के सीखने के अनुभव को और समृद्ध बनाने के लिए उन्हें अधिक से अधिक प्रैक्टिकल सत्र दिए जाते हैं।',
  methodsLead: 'शिक्षण और सीखने की प्रक्रिया में नीचे दी गई विधियाँ अपनाई जाती हैं',
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
  nimi: 'SITI में सीखने की पूरी प्रक्रिया National Instructional Media Institute (NIMI) की शिक्षण सामग्री पर आधारित है।',
  methodologyLead:
    'संस्थान में सर्वश्रेष्ठ प्रशिक्षण देने के लिए उन्नत शिक्षण पद्धति अपनाई जाती है, और इसके लिए औद्योगिक प्रशिक्षण से जुड़े सभी उपायों का उपयोग किया जाता है।',
  /** The eleven published measures, grouped by what they concern. */
  measures: [
    {
      id: 'faculty',
      icon: 'GraduationCap',
      title: 'Faculty',
      items: [
        'प्रशिक्षण के लिए सर्वश्रेष्ठ योग्यता वाले और मेरिट में आगे रहे शिक्षकों की नियुक्ति की जाती है।',
        'शिक्षकों का शिक्षण कौशल बढ़ाने के लिए उन्हें NCVT/SCVT/HRD द्वारा समय-समय पर प्रायोजित या आयोजित गुणवत्ता सुधार कार्यक्रमों (QIP) और स्टाफ विकास कार्यक्रमों (SDP) में भाग लेने की सुविधा दी जाती है।',
        'इन कार्यक्रमों के अलावा SITI स्वयं भी शिक्षकों की शिक्षण पद्धति को बेहतर बनाने के लिए शिविर, सेमिनार और कार्यक्रम आयोजित करता है।',
        'प्रतिष्ठित व्यक्तियों को नियमित रूप से संस्थान में आमंत्रित किया जाता है, जो विद्यार्थियों और शिक्षकों के लिए विचारोत्तेजक व्याख्यान देते हैं, ताकि वे औद्योगिक प्रशिक्षण के क्षेत्र के नवीनतम ज्ञान से जुड़े रहें।',
      ],
    },
    {
      id: 'classroom',
      icon: 'Projector',
      title: 'Classrooms & teaching aids',
      items: [
        'व्याख्यानों में LCD प्रोजेक्टर, कंप्यूटर और उन्नत सॉफ़्टवेयर जैसे आधुनिक शिक्षण साधनों का उपयोग किया जाता है।',
        'पढ़ाई के लिए अनुकूल कक्षाएँ भी तैयार की गई हैं।',
        'HOD और शिक्षक, NCVT के लागू और समय-समय पर संशोधित सिलेबस के अनुसार, प्रदर्शन (डेमो) के माध्यम से यंत्रों और उपकरणों के उपयोग व उद्देश्य की जानकारी भी देते हैं।',
      ],
    },
    {
      id: 'digital',
      icon: 'Library',
      title: 'Internet, digital library & e-library',
      items: [
        'इंटरनेट सुविधाओं का उपयोग औद्योगिक प्रशिक्षण को आधुनिक बनाने में भी मदद करता है। कंप्यूटर लैब के सभी कंप्यूटरों में इंटरनेट सुविधा उपलब्ध है।',
        'कंप्यूटर और इंटरनेट सुविधा वाली डिजिटल लाइब्रेरी विकसित की गई है। कंप्यूटर पर काम करने और इंटरनेट सुविधा का उपयोग करने के लिए विद्यार्थियों को पासवर्ड दिया जाता है।',
        'लाइब्रेरी में ई-लाइब्रेरी का पूरा उपयोग किया जाता है, ताकि विद्यार्थियों को इसका अधिकतम लाभ मिल सके।',
        'लाइब्रेरी में NCVT/SCVT के मानदंडों के अनुसार सभी ज़रूरी पाठ्यपुस्तकें और संदर्भ पुस्तकें उपलब्ध हैं।',
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
    'SITI, NCVT द्वारा दिए गए पाठ्यक्रम और सिलेबस संबंधी दिशानिर्देशों का पालन करता है। NCVT द्वारा समय-समय पर सुझाए गए बदलावों और दिशानिर्देशों की अद्यतन जानकारी रखने की ज़िम्मेदारी सभी HOD की है। सुझाए गए बदलाव दर्ज किए जाते हैं, और उनके लिए ज़रूरी अतिरिक्त संसाधन — जैसे शिक्षक, उपकरण, औज़ार आदि — भी दर्ज करके स्वीकृति के लिए संस्थान प्रबंधन समिति (Institute Management Committee) को भेजे जाते हैं।',
    'यदि NCVT दिशानिर्देशों का पालन करने के लिए तुरंत कार्रवाई ज़रूरी हो, तो संस्थान प्रमुख IMC के सभी सदस्यों को सूचित करते हुए खरीदारी करने के लिए अधिकृत हैं।',
    'संस्थान जिन ट्रेडों के लिए संबद्ध है, उनके पाठ्यक्रम की समीक्षा IMC हर सत्र शुरू होने से पहले करती है, और ज़रूरी संशोधन सत्र शुरू होने से पहले ही कर दिए जाते हैं।',
    'हर ट्रेड का पाठ्यक्रम प्रवेश ब्रोशर में प्रकाशित किया जाता है और संस्थान की वेबसाइट पर भी उपलब्ध कराया जाता है।',
    'पाठ्यक्रम का पालन सुनिश्चित करने की ज़िम्मेदारी हर HOD की है। पाठ्यक्रम पढ़ाने की योजना सप्ताह-वार तैयार की जाती है और हर ट्यूटर को दी जाती है।',
    'Satpuda Industrial Training Institute, NCVT द्वारा निर्धारित सिलेबस का सख़्ती से पालन करता है, और इसकी एक प्रति — संशोधन होने पर संशोधित सिलेबस सहित — हर विद्यार्थी को दी जाती है।',
  ],
  /** The yearly cycle the paragraphs describe, in order. */
  cycle: [
    { icon: 'BookMarked', title: 'NCVT guidelines', body: 'HOD, NCVT के सुझाए बदलावों की अद्यतन जानकारी रखते हैं; बदलाव और उनके लिए ज़रूरी संसाधन दर्ज किए जाते हैं।' },
    { icon: 'Landmark', title: 'IMC approval', body: 'स्वीकृति के लिए संस्थान प्रबंधन समिति (IMC) को भेजा जाता है; ज़रूरत पड़ने पर संस्थान प्रमुख सभी IMC सदस्यों को सूचित करके खरीदारी कर सकते हैं।' },
    { icon: 'CalendarDays', title: 'Before each session', body: 'IMC हर ट्रेड के पाठ्यक्रम की समीक्षा करती है और सत्र शुरू होने से पहले ज़रूरी संशोधन करती है।' },
    { icon: 'ClipboardList', title: 'Weekly delivery plan', body: 'हर HOD पाठ्यक्रम का पालन सुनिश्चित करते हैं; हर ट्यूटर को सप्ताह-वार शिक्षण योजना दी जाती है।' },
  ],
  cellLead:
    'संस्थान का अपना अकादमिक सेल है, जो प्राचार्य के नियंत्रण में काम करता है और सभी HOD इसके सदस्य हैं; यह सेल विद्यार्थियों को फीडबैक और ज़रूरी जानकारी देता है।',
  cell: [
    { icon: 'Newspaper', text: 'NCVT से नवीनतम जानकारी प्राप्त करना।' },
    { icon: 'CalendarDays', text: 'अकादमिक कैलेंडर तैयार करना।' },
    { icon: 'Users', text: 'प्रवेश समिति का गठन करना।' },
    { icon: 'FileBadge', text: 'NCVT द्वारा आयोजित सभी परीक्षाओं की व्यवस्था करना।' },
    { icon: 'Globe', text: 'संस्थान की नवीनतम जानकारी संस्थानों की वेबसाइटों पर अपलोड करना।' },
    { icon: 'Ban', text: 'एंटी-रैगिंग समिति नियुक्त करना।' },
    { icon: 'Scale', text: 'संस्थान में अनुशासन बनाए रखना।' },
    { icon: 'Clock', text: 'प्रशिक्षुओं के लिए बैच-वार समय सारणी तैयार करना।' },
    { icon: 'BookOpen', text: 'हर वर्ष हर ट्रेड के लिए प्रवेश ब्रोशर तैयार करना।' },
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
    'SITI मानता है कि हमारे मानव संसाधन हमारी सबसे मूल्यवान संपत्ति हैं। इसी नीति के अनुरूप हम निरंतर शिक्षा और प्रशिक्षण के माध्यम से उन्हें अपनी पूरी क्षमता तक पहुँचने में हर संभव मदद करते हैं।',
  norms: 'संस्थान प्राचार्यों, इंस्ट्रक्टरों और अन्य प्रशासनिक कर्मचारियों की योग्यता और दक्षता से जुड़ी NCVT की सभी आवश्यकताओं का पालन करता है।',
  roles: ['Principals', 'Instructors', 'Administrative staff'],
  cellLead: 'Satpuda Industrial Training Institute(s) में शिक्षकों और अन्य कर्मचारियों की भर्ती के लिए अपना HR सेल है:',
  cell: [
    {
      icon: 'Users',
      title: 'Selection committee',
      text: 'शिक्षण स्टाफ, इंस्ट्रक्टर और अन्य सहायक कर्मचारियों की नियुक्ति के लिए प्रतिष्ठित व्यक्तियों की एक चयन समिति गठित की गई है।',
    },
    {
      icon: 'BadgeCheck',
      title: 'Selection on merit',
      text: 'शिक्षकों का चयन उनकी योग्यता, अनुभव, सेवा के दौरान की गई अन्य उपलब्धियों और नियुक्ति के लिए NCVT द्वारा निर्धारित मानदंडों व मानकों के आधार पर किया जाता है।',
    },
    {
      icon: 'GraduationCap',
      title: 'Advance training for staff',
      text: 'तकनीकी कौशल बढ़ाने के लिए संस्थान स्टाफ के लिए उन्नत प्रशिक्षण शिविर और कार्यक्रम आयोजित करता है। स्टाफ और इंस्ट्रक्टरों को उन्नत ज्ञान देने के लिए सेमिनार और सम्मेलन भी आयोजित किए जाते हैं, ताकि हमारे प्रशिक्षुओं को तकनीकी ज्ञान का अधिकतम लाभ मिल सके।',
    },
  ],
};

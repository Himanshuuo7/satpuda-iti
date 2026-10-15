/**
 * Trade pages — one record per NCVT trade Satpuda ITI runs.
 *
 * Every fact here is taken from the trade's official DGT competency-based
 * curriculum (the `source` on each record): duration, entry qualification,
 * NSQF level, hours, learning outcomes, tools, job roles and progression
 * pathways. Learning outcomes and tools are paraphrased only for length;
 * nothing is added that the curriculum does not list. Where these pages say
 * what a student learns, they describe the national trade — not a claim about
 * any one campus's workshop. Which Satpuda campus runs which trade comes from
 * the verified institute records (itiInstitutes.js), never from here.
 *
 * Retrieved from dgt.gov.in on 2026-09-28.
 */

import { tradeById } from './trades';

const CTS_LIST = 'https://dgt.gov.in/cts-details';

/** Assessment and certification rules common to every CTS trade. */
const PASS_RULE = 'ट्रेड प्रैक्टिकल और फॉर्मेटिव मूल्यांकन में 60% अंक, और बाकी हर विषय में 33% अंक';

const ENGINEERING_ENTRY =
  'विज्ञान और गणित के साथ 10वीं कक्षा उत्तीर्ण, या उसी सेक्टर के व्यावसायिक विषय के साथ 10वीं उत्तीर्ण, या इसके समकक्ष';

const TECHNICIAN_LADDER = ['Technician', 'Senior Technician', 'Supervisor', 'Manager'];

export const tradePages = [
  // ---------------------------------------------------------------------------
  {
    id: 'electrician',
    name: 'Electrician',
    code: 'DGT/1001',
    kind: 'Engineering trade',
    sector: 'Power',
    theme: 'electric',
    hero: {
      lede:
        'वायरिंग, अर्थिंग, विद्युत मशीनों, ट्रांसफार्मर और पावर सिस्टम पर दो वर्ष का व्यावहारिक प्रशिक्षण — घरेलू इंस्टॉलेशन से लेकर सोलर पैनल और EV चार्जिंग स्टेशन तक।',
    },
    facts: {
      duration: 'Two years',
      years: 2,
      hours: '2,400 hrs + 300 hrs OJT',
      nsqf: 4,
      entry: ENGINEERING_ENTRY,
      entryShort: '10th with Science & Maths',
      minAge: 14,
    },
    structure: [
      { practical: 840, theory: 240, employability: 120, ojt: 150 },
      { practical: 840, theory: 300, employability: 60, ojt: 150 },
    ],
    overview: {
      intro:
        'Electrician ट्रेड आपको बिजली की वायरिंग, मशीनों और उपकरणों को सुरक्षित तरीके से लगाना, जाँचना, उनका रखरखाव करना और मरम्मत करना सिखाता है। पहले वर्ष में सुरक्षा, कंडक्टर, बिजली के बुनियादी नियम, वायरिंग, अर्थिंग, लाइटिंग, मापक यंत्र और ट्रांसफार्मर पढ़ाए जाते हैं; दूसरे वर्ष में रोटेटिंग मशीनें, इलेक्ट्रॉनिक कंट्रोल, बिजली वितरण और नई ऊर्जा प्रणालियाँ सिखाई जाती हैं।',
      photo: 'practicalWorkshop',
      photoCaption: 'Satpuda ITI में प्रैक्टिकल वर्कशॉप सत्र',
      areas: [
        {
          icon: 'Zap',
          title: 'Electrical fundamentals',
          body: 'ओम और किरचॉफ के नियम, चुंबकत्व, और संतुलित व असंतुलित लोड वाले सिंगल-फेज़ तथा थ्री-फेज़ सर्किट।',
        },
        {
          icon: 'Plug',
          title: 'Wiring & earthing',
          body: 'घरों, हॉस्टलों और वर्कशॉप के लिए IE नियमों के अनुसार MCB, डिस्ट्रीब्यूशन बॉक्स और एनर्जी मीटर के साथ वायरिंग; पाइप और प्लेट अर्थिंग।',
        },
        {
          icon: 'Gauge',
          title: 'Measurement & testing',
          body: 'एनालॉग और डिजिटल मापक यंत्र, मीटर कैलिब्रेशन और रेंज बढ़ाना, तथा स्मार्ट मीटर।',
        },
        {
          icon: 'Cog',
          title: 'Machines & transformers',
          body: 'ट्रांसफार्मर, DC मशीनें, इंडक्शन मोटर, अल्टरनेटर और MG सेट — टेस्टिंग, वाइंडिंग और ओवरहॉल।',
        },
        {
          icon: 'CircuitBoard',
          title: 'Electronics & control',
          body: 'रेक्टिफायर, मोटरों का सॉलिड-स्टेट स्पीड कंट्रोल, कंट्रोल कैबिनेट वायरिंग, UPS, इन्वर्टर और स्टेबलाइज़र।',
        },
        {
          icon: 'Sun',
          title: 'Power & new energy',
          body: 'सोलर पैनल, घरेलू सर्विस लाइन, सर्किट ब्रेकर और रिले, स्मार्ट ग्रिड और EV चार्जिंग स्टेशन।',
        },
      ],
    },
    learn: [
      {
        label: 'First year',
        groups: [
          {
            icon: 'HardHat',
            title: 'Safety & joints',
            items: [
              'सुरक्षा सावधानियों का पालन करते हुए ड्रॉइंग के अनुसार प्रोफ़ाइल तैयार करना',
              'तारों के जोड़ बनाना; सोल्डरिंग और क्रिम्पिंग करना, तथा अंडरग्राउंड केबल का इंसुलेशन रेज़िस्टेंस मापना',
            ],
          },
          {
            icon: 'Zap',
            title: 'Circuits & cells',
            items: [
              'विद्युत और चुंबकीय सर्किट की विशेषताओं की जाँच करना',
              'बैटरी और सोलर सेल लगाना, जाँचना और उनका रखरखाव करना',
            ],
          },
          {
            icon: 'Plug',
            title: 'Installation',
            items: [
              'वायरिंग सिस्टम का एस्टिमेट बनाना, उसे असेंबल करना, लगाना और जाँचना',
              'अर्थिंग इंस्टॉलेशन की योजना बनाना और उसे तैयार करना',
              'विद्युत प्रकाश (इल्यूमिनेशन) सिस्टम की योजना बनाना, उसे लगाना और जाँचना',
            ],
          },
          {
            icon: 'Gauge',
            title: 'Measurement',
            items: [
              'एनालॉग और डिजिटल यंत्रों से माप लेना; स्मार्ट मीटर लगाना और उनकी खराबी पहचानना',
              'मापक यंत्रों की जाँच करना, उनकी त्रुटियाँ पता करना और उन्हें कैलिब्रेट करना',
            ],
          },
          {
            icon: 'Cog',
            title: 'Appliances & transformers',
            items: [
              'घरेलू उपकरण लगाना, उनकी खराबी ढूँढ़ना और मरम्मत करना',
              'ट्रांसफार्मर की जाँच, मूल्यांकन और रखरखाव करना',
            ],
          },
        ],
      },
      {
        label: 'Second year',
        groups: [
          {
            icon: 'Cog',
            title: 'DC machines',
            items: [
              'DC मशीनों को चालू (कमीशन) करना और उनके प्रदर्शन का मूल्यांकन करना',
              'DC मशीनों और मोटर स्टार्टर की जाँच और रखरखाव करना',
            ],
          },
          {
            icon: 'RotateCw',
            title: 'AC motors & alternators',
            items: [
              'AC मोटर और स्टार्टर को चालू करना, जाँचना और उनका रखरखाव करना',
              'अल्टरनेटर और MG सेट की जाँच और रखरखाव करना; अल्टरनेटर को पैरेलल में चलाना',
              'मोटर वाइंडिंग करना',
            ],
          },
          {
            icon: 'CircuitBoard',
            title: 'Electronics & control',
            items: [
              'सरल इलेक्ट्रॉनिक सर्किट असेंबल करना और जाँचना',
              'कंट्रोल कैबिनेट और उनके सहायक उपकरणों की वायरिंग करना',
              'सॉलिड-स्टेट उपकरणों से AC और DC मोटरों की गति नियंत्रित करना',
              'इन्वर्टर, स्टेबलाइज़र, बैटरी चार्जर, इमरजेंसी लाइट और UPS की खराबी दूर करना',
            ],
          },
          {
            icon: 'Sun',
            title: 'Power & new energy',
            items: [
              'सोलर पैनल की योजना बनाना, उन्हें असेंबल करना और लगाना',
              'ओवरहेड घरेलू सर्विस लाइन लगाना; पावर प्लांट के लेआउट और स्मार्ट ग्रिड की रूपरेखा समझाना',
              'सर्किट ब्रेकर की खराबी ढूँढ़ना और उनकी मरम्मत करना',
              'इलेक्ट्रिक वाहन चार्जिंग स्टेशन लगाना और उनकी खराबी दूर करना',
            ],
          },
        ],
      },
    ],
    core: 'Engineering Drawing और Workshop Calculation & Science दोनों वर्षों में साथ-साथ पढ़ाए जाते हैं।',
    practice: {
      signature: 'sequence',
      title: 'From drawing to working installation.',
      lede: 'DGT में इलेक्ट्रीशियन के काम का विवरण एक क्रम की तरह है — प्रैक्टिकल प्रशिक्षण भी इसी क्रम में चलता है।',
      steps: [
        { icon: 'FileText', title: 'Study the drawing', body: 'सर्किट और इंस्टॉलेशन का विवरण समझने के लिए ड्रॉइंग और स्पेसिफिकेशन पढ़ना।' },
        { icon: 'Wrench', title: 'Install', body: 'मोटर, ट्रांसफार्मर, स्विचगियर, स्विचबोर्ड, फिटिंग और लाइटिंग को सही जगह पर लगाना।' },
        { icon: 'Cable', title: 'Connect', body: 'कनेक्शन करना, टर्मिनल सोल्डर करना, तार और केबल खींचना, तथा सामान्य केबल जॉइंटिंग करना।' },
        { icon: 'Gauge', title: 'Test', body: 'मेगर, टेस्ट लैंप और मीटर की मदद से इंस्टॉलेशन व उपकरणों की जाँच करना और खराबी का पता लगाना।' },
        { icon: 'ShieldCheck', title: 'Repair & maintain', body: 'खराब वायरिंग, फ्यूज़ और पुर्ज़े बदलना, और फिटिंग व मशीनों को चालू हालत में रखना।' },
      ],
      tools: [
        {
          icon: 'Wrench',
          title: 'Hand tools',
          items: ['Insulated combination pliers', 'Neon tester (500 V)', 'Crimping tool', 'Soldering iron & desoldering gun', 'Hand and electric drills'],
        },
        {
          icon: 'Gauge',
          title: 'Measuring instruments',
          items: ['Digital multimeter', 'Ammeters & voltmeters', 'Wattmeters & energy meters', 'Power factor meter', 'Tachometer & lux meter'],
        },
        {
          icon: 'Cog',
          title: 'Machines',
          items: ['Transformers', 'DC machines', 'Three-phase induction motors', 'Alternators & MG sets', 'Motor starters & AC drives'],
        },
        {
          icon: 'Sun',
          title: 'Systems',
          items: ['MCBs & distribution boards', 'Pipe & plate earthing', 'Solar panels', 'UPS, inverters & battery chargers', 'Circuit breakers & relays'],
        },
      ],
    },
    careers: {
      roles: [
        {
          title: 'Electrician, General',
          nco: '7411.0100',
          body: 'विद्युत मशीनरी, उपकरण और फिटिंग लगाता है, उनका रखरखाव और मरम्मत करता है; इंस्टॉलेशन की जाँच करता है और खराबी का पता लगाता है।',
        },
        {
          title: 'Electrical Fitter',
          nco: '7412.0200',
          body: 'मोटर, ट्रांसफार्मर, जनरेटर, स्विचगियर और पंखे जैसी विद्युत मशीनरी फिट और असेंबल करता है, तथा पैनल बोर्ड और बस बार लगाता है।',
        },
      ],
      settings: ['कारखाने', 'वर्कशॉप', 'पावर हाउस', 'व्यावसायिक परिसर', 'आवासीय भवन'],
      settingsNote: 'DGT के कार्य-विवरण में बताए गए कार्यस्थल।',
    },
    pathway: {
      ladder: TECHNICIAN_LADDER,
      routes: [
        { icon: 'Handshake', title: 'Apprenticeship', body: 'उद्योग में अप्रेंटिसशिप, जिसके बाद National Apprenticeship Certificate (NAC) मिलता है।' },
        { icon: 'GraduationCap', title: 'Diploma by lateral entry', body: 'अधिसूचित इंजीनियरिंग शाखाओं के डिप्लोमा कोर्स में प्रवेश।' },
        { icon: 'BookOpen', title: '10+2 through NIOS', body: 'National Institute of Open Schooling (NIOS) के माध्यम से हायर सेकेंडरी (12वीं) प्रमाणपत्र।' },
        { icon: 'Users', title: 'Become an instructor', body: 'ITI में ट्रेड पढ़ाने के लिए Crafts Instructor Training Scheme (CITS)।' },
        { icon: 'Award', title: 'Advanced Diploma (Vocational)', body: 'लागू होने पर DGT के एडवांस्ड डिप्लोमा कोर्स।' },
        { icon: 'Lightbulb', title: 'Entrepreneurship', body: 'संबंधित क्षेत्र में अपना खुद का काम शुरू करें।' },
      ],
    },
    source: {
      label: 'DGT curriculum · Electrician · CTS 2.0 · revised July 2022',
      url: 'https://dgt.gov.in/sites/default/files/2024-01/Electrician_CTS2.0_NSQF-4.pdf',
    },
  },

  // ---------------------------------------------------------------------------
  {
    id: 'fitter',
    name: 'Fitter',
    code: 'DGT/1002',
    kind: 'Engineering trade',
    sector: 'Capital goods & manufacturing',
    theme: 'blueprint',
    hero: {
      lede:
        'दो वर्ष का सटीक बेंच वर्क — धातु के पुर्ज़ों की मार्किंग, फाइलिंग, ड्रिलिंग, फिटिंग और असेंबली, ±0.02 mm जितनी बारीक टॉलरेंस तक — साथ में लेथ का काम, वेल्डिंग, पाइप फिटिंग, न्यूमेटिक्स, हाइड्रोलिक्स और मशीनों का रखरखाव।',
    },
    facts: {
      duration: 'Two years',
      years: 2,
      hours: '2,400 hrs + 300 hrs OJT',
      nsqf: 4,
      entry: ENGINEERING_ENTRY,
      entryShort: '10th with Science & Maths',
      minAge: 14,
    },
    structure: [
      { practical: 840, theory: 240, employability: 120, ojt: 150 },
      { practical: 840, theory: 300, employability: 60, ojt: 150 },
    ],
    overview: {
      intro:
        'Fitter ट्रेड आपको हैंड टूल्स, मापक यंत्रों और मशीन टूल्स की मदद से धातु के पुर्ज़ों को सटीक माप में तैयार करना, और उन्हें फिट व असेंबल करके काम करने वाली यूनिट बनाना सिखाता है। कौशल सरल से जटिल की ओर बढ़ता है, और दो वर्षों में सटीकता कदम-दर-कदम बढ़ती जाती है।',
      photo: 'garraWorkshop',
      photoCaption: 'Satpuda ITI की वर्कशॉप में बेंच वाइस पर काम करते प्रशिक्षु',
      areas: [
        {
          icon: 'Ruler',
          title: 'Marking & measurement',
          body: 'वर्नियर कैलिपर, माइक्रोमीटर, स्क्रू पिच गेज, सरफेस प्लेट, V-ब्लॉक और एंगल प्लेट।',
        },
        {
          icon: 'Hammer',
          title: 'Basic fitting',
          body: 'सॉइंग, चिज़लिंग, फाइलिंग, ड्रिलिंग, टैपिंग और ग्राइंडिंग — पहले दिन से ही सुरक्षा, प्राथमिक चिकित्सा और 5S के साथ।',
        },
        {
          icon: 'Flame',
          title: 'Sheet metal & joining',
          body: 'शीट मेटल का काम, सोल्डरिंग, ब्रेज़िंग, रिवेटिंग, और आर्क व गैस (ऑक्सी-एसिटिलीन) वेल्डिंग।',
        },
        {
          icon: 'Crosshair',
          title: 'Precision fits & gauges',
          body: 'स्लाइडिंग, T, स्टेप, डवटेल और रेडियस फिट; स्क्रैपिंग, लैपिंग और होनिंग; स्नैप और गैप गेज।',
        },
        {
          icon: 'Cog',
          title: 'Machines & transmission',
          body: 'लेथ के ऑपरेशन, ड्रिल जिग, और पुली, गियर, की (key) व शाफ्ट की मरम्मत।',
        },
        {
          icon: 'Wind',
          title: 'Fluid power & maintenance',
          body: 'न्यूमेटिक और हाइड्रोलिक सर्किट, निवारक रखरखाव, सरल मशीनें स्थापित करना और मशीन टूल की सटीकता जाँचना।',
        },
      ],
    },
    learn: [
      {
        label: 'First year',
        groups: [
          {
            icon: 'Hammer',
            title: 'Basic fitting',
            hours: 195,
            items: ['सुरक्षा सावधानियों का पालन करते हुए ±0.25 mm तक मार्किंग, हैकसॉ से कटिंग, चिज़लिंग, फाइलिंग, ड्रिलिंग, टैपिंग और ग्राइंडिंग'],
          },
          {
            icon: 'Flame',
            title: 'Sheet metal, riveting & welding',
            hours: 315,
            items: [
              'शीट मेटल की सरल वस्तुएँ बनाना और उन्हें सोल्डरिंग, ब्रेज़िंग व रिवेटिंग से जोड़ना',
              'रिवेटिंग और आर्क वेल्डिंग से धातु जोड़ना',
              'गैस (ऑक्सी-एसिटिलीन, LPG या ऑक्सी-हाइड्रोजन) से धातु काटना और जोड़ना',
            ],
          },
          {
            icon: 'Crosshair',
            title: 'Precision operations & fits',
            hours: 330,
            items: [
              'ड्रिलिंग, रीमिंग, टैप और डाई का काम करना, और वर्नियर, स्क्रू गेज व माइक्रोमीटर से जाँचना',
              '±0.04 mm और 30 मिनट (कोणीय) की सटीकता तक स्लाइडिंग, एंगुलर, स्टेप, T, स्क्वायर और प्रोफ़ाइल फिट बनाना',
            ],
          },
          {
            icon: 'Cog',
            title: 'Lathe & machine care',
            hours: 180,
            items: [
              'लेथ पर फेसिंग, टर्निंग, पार्टिंग, चैम्फरिंग, ग्रूविंग, नर्लिंग, बोरिंग, टेपर टर्निंग और थ्रेडिंग करना',
              'ड्रिल मशीन, पावर सॉ, बेंच ग्राइंडर और लेथ की मरम्मत व ओवरहॉल करना',
            ],
          },
        ],
      },
      {
        label: 'Second year',
        groups: [
          {
            icon: 'Crosshair',
            title: 'Advanced fitting & gauges',
            hours: 465,
            items: [
              '±0.02 mm और 10 मिनट (कोणीय) की सटीकता तक सतहों की फिनिशिंग करना, और डॉवेल, स्क्रू, बोल्ट, की व कॉटर से कसना',
              'स्क्रैपिंग, लैपिंग और होनिंग से डवटेल, रेडियस और कंबाइंड फिट बनाना',
              '±0.02 mm की सटीकता तक स्नैप और गैप गेज बनाना',
            ],
          },
          {
            icon: 'Wrench',
            title: 'Pipes & jigs',
            hours: 105,
            items: [
              'पाइप काटना, थ्रेड बनाना, फ्लेयर करना, मोड़ना और जोड़ना; वाल्व असेंबल करना और लीकेज की जाँच करना',
              'ड्रिल जिग बनाना और उससे पुर्ज़े तैयार करना',
            ],
          },
          {
            icon: 'Wind',
            title: 'Power transmission & fluid power',
            hours: 285,
            items: [
              'पुली, गियर, की, जिब और शाफ्ट की मरम्मत व असेंबली करना',
              'कंप्रेसर, प्रेशर गेज, FRL यूनिट, वाल्व और एक्चुएटर खोलना और फिर से असेंबल करना',
              'न्यूमेटिक और हाइड्रोलिक सर्किट बनाना',
            ],
          },
          {
            icon: 'Settings',
            title: 'Maintenance & erection',
            hours: 195,
            items: [
              'सरल मशीनों का निवारक रखरखाव और मरम्मत करना',
              'सरल मशीन स्थापित करना और मशीन टूल की सटीकता जाँचना',
            ],
          },
        ],
      },
    ],
    core: 'Engineering Drawing और Workshop Science & Calculation दोनों वर्षों में साथ-साथ पढ़ाए जाते हैं, और दो ग्रुप प्रोजेक्ट भी होते हैं।',
    practice: {
      signature: 'tolerance',
      title: 'Accuracy you can measure.',
      lede: 'कौशल बढ़ने के साथ पाठ्यक्रम हर जॉब की टॉलरेंस को और कड़ा करता जाता है — यही सबसे साफ़ दिखाता है कि फिटिंग के दो वर्ष आपको क्या सिखाते हैं।',
      stages: [
        { stage: 'Year 1 · Basic fitting', linear: '±0.25 mm', angular: null, width: 1, body: 'मार्किंग, सॉइंग, चिज़लिंग, फाइलिंग, ड्रिलिंग और टैपिंग।' },
        { stage: 'Year 1 · Fits', linear: '±0.04 mm', angular: '30′', width: 0.16, body: 'स्लाइडिंग, एंगुलर, स्टेप, T, स्क्वायर और प्रोफ़ाइल फिट।' },
        { stage: 'Year 2 · Precision', linear: '±0.02 mm', angular: '10′', width: 0.08, body: 'डवटेल और रेडियस फिट, स्क्रैपिंग, लैपिंग, होनिंग और गेज।' },
      ],
      steps: [
        { icon: 'FileText', title: 'Read the drawing', body: 'हर पुर्ज़े का स्पेसिफिकेशन और उसका काम समझना।' },
        { icon: 'PenTool', title: 'Mark out', body: 'सरफेस प्लेट, स्क्राइबर, वर्नियर हाइट गेज, V-ब्लॉक और एंगल प्लेट का उपयोग करना।' },
        { icon: 'Hammer', title: 'Cut & shape', body: 'सॉइंग, चिपिंग, फाइलिंग, ग्राइंडिंग और ड्रिलिंग करना, और टैप व डाई से थ्रेड काटना।' },
        { icon: 'Ruler', title: 'Measure', body: 'कैलिपर, माइक्रोमीटर, वर्नियर, डायल इंडिकेटर और गेज से जाँचना।' },
        { icon: 'Settings', title: 'Assemble & test', body: 'स्क्रू, रिवेट और पिन से पुर्ज़े फिट करना और तैयार यूनिट की जाँच करना।' },
      ],
      tools: [
        {
          icon: 'Ruler',
          title: 'Marking & measuring',
          items: ['Steel rule & try square', 'Vernier calliper', 'Outside micrometers', 'Screw pitch gauge', 'Surface plate, V-blocks & angle plate'],
        },
        {
          icon: 'Hammer',
          title: 'Cutting & shaping',
          items: ['Hacksaw', 'Files — flat, half round, triangular, needle', 'Scrapers', 'Taps & dies', 'Twist drills'],
        },
        {
          icon: 'Cog',
          title: 'Machines',
          items: ['Drilling machine', 'Lathe', 'Power saw', 'Bench grinder', 'Portable electric drill'],
        },
        {
          icon: 'Flame',
          title: 'Joining & fluid power',
          items: ['Arc welding', 'Gas welding & cutting', 'Riveting, soldering & brazing', 'Pneumatic components', 'Hydraulic components'],
        },
      ],
    },
    careers: {
      roles: [
        {
          title: 'Fitter, General',
          nco: '7233.0100',
          body: 'मशीनों और अन्य धातु उत्पादों के निर्माण या मरम्मत के लिए धातु के पुर्ज़ों को सटीक माप में तैयार करता है, और उन्हें फिट व असेंबल करता है।',
        },
        {
          title: 'Fitter, Bench',
          nco: '7233.0200',
          body: 'वाइस पर हाथ से फिटिंग — पुर्ज़ों को सही माप में काटना, फाइल करना, ड्रिल करना और थ्रेड बनाना — जो पाठ्यक्रम में Fitter के कार्य-विवरण का मूल हिस्सा है।',
        },
      ],
      settings: ['मशीन निर्माण', 'मशीनों की मरम्मत और रखरखाव', 'धातु उत्पाद', 'न्यूमेटिक और हाइड्रोलिक सिस्टम'],
      settingsNote: 'DGT के कार्य-विवरण में बताए गए कार्य-क्षेत्र।',
    },
    pathway: {
      ladder: TECHNICIAN_LADDER,
      routes: [
        { icon: 'Handshake', title: 'Apprenticeship', body: 'उद्योग में अप्रेंटिसशिप, जिसके बाद National Apprenticeship Certificate (NAC) मिलता है।' },
        { icon: 'GraduationCap', title: 'Diploma by lateral entry', body: 'अधिसूचित इंजीनियरिंग शाखाओं के डिप्लोमा कोर्स में प्रवेश।' },
        { icon: 'BookOpen', title: '10+2 through NIOS', body: 'National Institute of Open Schooling (NIOS) के माध्यम से हायर सेकेंडरी (12वीं) प्रमाणपत्र।' },
        { icon: 'Users', title: 'Become an instructor', body: 'ITI में ट्रेड पढ़ाने के लिए Crafts Instructor Training Scheme (CITS)।' },
        { icon: 'Award', title: 'Advanced Diploma (Vocational)', body: 'लागू होने पर DGT के एडवांस्ड डिप्लोमा कोर्स।' },
        { icon: 'Lightbulb', title: 'Entrepreneurship', body: 'संबंधित क्षेत्र में अपना खुद का काम शुरू करें।' },
      ],
    },
    source: {
      label: 'DGT curriculum · Fitter · CTS 3.0 · revised August 2025',
      url: 'https://dgt.gov.in/sites/default/files/2026-08/Fitter_CTS3.0_NSQF-4.pdf',
    },
  },

  // ---------------------------------------------------------------------------
  {
    id: 'mechanic-diesel',
    name: 'Mechanic Diesel',
    code: 'DGT/1006',
    kind: 'Engineering trade',
    sector: 'Automotive',
    theme: 'engine',
    hero: {
      lede:
        'हल्के और भारी मोटर वाहनों के डीज़ल इंजनों पर एक वर्ष का व्यावहारिक प्रशिक्षण — इंजन खोलना, ओवरहॉल करना और जाँचना, तथा उनके कूलिंग, लुब्रिकेशन, फ्यूल और इलेक्ट्रिकल सिस्टम की सर्विसिंग करना।',
    },
    facts: {
      duration: 'One year',
      years: 1,
      hours: '1,200 hrs + 150 hrs OJT',
      nsqf: 3,
      entry: ENGINEERING_ENTRY,
      entryShort: '10th with Science & Maths',
      minAge: 14,
    },
    structure: [{ practical: 840, theory: 240, employability: 120, ojt: 150 }],
    overview: {
      intro:
        'Mechanic Diesel ट्रेड आपको डीज़ल इंजनों की मरम्मत, सर्विसिंग और ओवरहॉल करना सिखाता है, ताकि वे वाहनों और मशीनों को चलाने वाले मुख्य इंजन (प्राइम मूवर) के रूप में कुशलता से काम करें। पहले वर्कशॉप की बुनियादी बातें सिखाई जाती हैं — माप, फिटिंग, वेल्डिंग, इलेक्ट्रिकल — और फिर हल्के व भारी मोटर वाहनों पर इंजन का हर सिस्टम, एक-एक करके।',
      photo: null,
      areas: [
        {
          icon: 'Ruler',
          title: 'Measuring & marking',
          body: 'माइक्रोमीटर, टेलीस्कोप और डायल बोर गेज, डायल इंडिकेटर, फीलर, थ्रेड पिच और वैक्यूम गेज।',
        },
        {
          icon: 'Wrench',
          title: 'Fitting & welding',
          body: 'हैंड टूल्स और मशीन टूल्स से कसना और फिटिंग; आर्क व गैस वेल्डिंग से जोड़ना।',
        },
        {
          icon: 'BatteryCharging',
          title: 'Auto electrical',
          body: 'इलेक्ट्रिकल और इलेक्ट्रॉनिक सर्किट, वाहन की बैटरी, स्टार्टर मोटर और अल्टरनेटर।',
        },
        {
          icon: 'Cog',
          title: 'Engine overhaul',
          body: 'सिलेंडर हेड, वाल्व ट्रेन, पिस्टन, कनेक्टिंग रॉड, क्रैंकशाफ्ट, फ्लाईव्हील और कैमशाफ्ट।',
        },
        {
          icon: 'Fuel',
          title: 'Fuel & emission',
          body: 'डीज़ल फ्यूल सिस्टम, फ्यूल इंजेक्शन पंप, इंजेक्टर और गवर्नर; मानकों के अनुसार उत्सर्जन (एमिशन) की जाँच।',
        },
        {
          icon: 'Activity',
          title: 'Diagnosis',
          body: 'हल्के और भारी मोटर वाहनों की खराबी का पता लगाना और उसे ठीक करना।',
        },
      ],
    },
    learn: [
      {
        label: 'One year',
        groups: [
          {
            icon: 'Ruler',
            title: 'Workshop foundations',
            items: [
              'वर्नियर, माइक्रोमीटर, बोर गेज, डायल इंडिकेटर और फीलर गेज से माप लेना और मार्किंग करना',
              'सही हैंड टूल्स और मशीन टूल्स से कसना और फिट करना',
              'आर्क और गैस वेल्डिंग से पुर्ज़े जोड़ना',
            ],
          },
          {
            icon: 'BatteryCharging',
            title: 'Electrics, hydraulics & the vehicle',
            items: [
              'इलेक्ट्रिकल और इलेक्ट्रॉनिक सर्किट ट्रेस करना और जाँचना; बैटरी चार्ज करना और जाँचना',
              'हाइड्रोलिक और न्यूमेटिक पुर्ज़ों को ट्रेस करना और जाँचना',
              'वाहन का स्पेसिफिकेशन डेटा और VIN पढ़ना; सर्विस स्टेशन के उपकरणों का उपयोग करना',
            ],
          },
          {
            icon: 'Cog',
            title: 'Engine overhaul',
            items: [
              'सही टॉर्क के साथ LMV या HMV से डीज़ल इंजन निकालना और फिर से लगाना',
              'इंजन और उसके पुर्ज़ों का ओवरहॉल, सर्विसिंग और जाँच करना',
              'स्टेशनरी इंजन और उसके गवर्नर का ओवरहॉल करना',
            ],
          },
          {
            icon: 'Thermometer',
            title: 'Engine systems',
            items: [
              'कूलिंग और लुब्रिकेशन सिस्टम को ट्रेस करना, जाँचना और ठीक करना',
              'इनटेक और एग्ज़ॉस्ट सिस्टम को ट्रेस करना और जाँचना, जिसमें EGR वाल्व और मैनिफोल्ड की सफ़ाई शामिल है',
              'फ्यूल सिस्टम की सर्विसिंग — मैकेनिकल और इलेक्ट्रॉनिक पंप को कैलिब्रेट करना, इंजेक्टर और फ़िल्टर जाँचना',
              'अल्टरनेटर और स्टार्टर मोटर का ओवरहॉल करना',
            ],
          },
          {
            icon: 'Activity',
            title: 'Emission & diagnosis',
            items: [
              'वाहन के उत्सर्जन (एमिशन) की निगरानी करना और उसे मानकों के अनुरूप एडजस्ट करना',
              'हल्के और भारी मोटर वाहनों की खराबी पहचानना और उसे ठीक करना',
            ],
          },
        ],
      },
    ],
    core: 'Engineering Drawing और Workshop Calculation & Science भी इस वर्ष के पाठ्यक्रम का हिस्सा हैं।',
    practice: {
      signature: 'engine',
      title: 'Inside the engine, system by system.',
      lede: 'कोई सिस्टम चुनें और देखें कि पाठ्यक्रम उस पर आपको क्या करना सिखाता है, और उस काम के लिए कौन-से वर्कशॉप उपकरण बताए गए हैं।',
      systems: [
        {
          id: 'overhaul',
          label: 'Engine overhaul',
          body: 'इंजन को क्रम से खोलना और फिर से जोड़ना — सिलेंडर हेड, वाल्व ट्रेन, पिस्टन, कनेक्टिंग रॉड, क्रैंकशाफ्ट और कैमशाफ्ट — और फिर उसकी जाँच करना।',
          tools: ['Torque wrench', 'Valve spring compressor', 'Cylinder bore gauge', 'Compression testing gauge'],
        },
        {
          id: 'fuel',
          label: 'Fuel system',
          body: 'डीज़ल फ्यूल सिस्टम की सर्विसिंग: मैकेनिकल और इलेक्ट्रॉनिक पंप कैलिब्रेट करना, इंजेक्टर और फ़िल्टर जाँचना, और गवर्नर का ओवरहॉल करना।',
          tools: ['Injector testing set', 'Injector cleaning unit', 'CRDI diesel engine'],
        },
        {
          id: 'cooling',
          label: 'Cooling & lubrication',
          body: 'कूलिंग और लुब्रिकेशन सिस्टम को ट्रेस करना, जाँचना और ठीक करना, और इंजन के लिए सही कूलेंट व तेल चुनना।',
          tools: [],
        },
        {
          id: 'air',
          label: 'Intake & exhaust',
          body: 'इनटेक और एग्ज़ॉस्ट सिस्टम को ट्रेस करना और जाँचना, EGR वाल्व, पोर्ट और मैनिफोल्ड साफ़ करना, और उत्सर्जन को मानकों के भीतर लाना।',
          tools: ['Automotive diesel smoke meter'],
        },
        {
          id: 'electrical',
          label: 'Starting & charging',
          body: 'अल्टरनेटर और स्टार्टर मोटर का ओवरहॉल करना, और वाहन की बैटरी चार्ज करना व जाँचना।',
          tools: ['Battery charger', 'Glow plug tester', 'Digital multimeter'],
        },
      ],
      steps: [
        { icon: 'Search', title: 'Examine', body: 'औज़ारों और यंत्रों की मदद से खराबी का पता लगाना।' },
        { icon: 'Wrench', title: 'Dismantle', body: 'खराब या घिसे हुए पुर्ज़े निकालना; उनकी मरम्मत करना या उन्हें बदलना।' },
        { icon: 'Settings', title: 'Assemble', body: 'वाल्व ग्राइंड करना और पुर्ज़ों को सटीक फिट के साथ जोड़ना।' },
        { icon: 'Gauge', title: 'Tune & observe', body: 'इंजन चालू करना और तापमान, फ्यूल व ऑयल-प्रेशर की रीडिंग के आधार पर उसे मानक के अनुसार सेट करना।' },
        { icon: 'ShieldCheck', title: 'Maintain', body: 'इंजन को अच्छी हालत में रखने के लिए जाँच, एडजस्टमेंट और लुब्रिकेशन करना।' },
      ],
      tools: [
        {
          icon: 'Ruler',
          title: 'Measuring',
          items: ['Vernier calliper & micrometers', 'Telescope & dial bore gauges', 'Dial indicator', 'Feeler & thread pitch gauges', 'Vacuum & tyre pressure gauges'],
        },
        {
          icon: 'Wrench',
          title: 'Workshop tools',
          items: ['Torque wrenches', 'Air impact wrench', 'Universal puller', 'Valve spring compressor', 'Lifting jacks'],
        },
        {
          icon: 'Gauge',
          title: 'Testing equipment',
          items: ['Compression testing gauge', 'Injector testing set', 'Glow plug tester', 'Diesel smoke meter', 'Battery charger'],
        },
        {
          icon: 'Truck',
          title: 'Engines & vehicles',
          items: ['Multi-cylinder diesel engines', 'CRDI four-stroke engine', 'Cut-section engine', 'Light & heavy motor vehicles'],
        },
      ],
    },
    careers: {
      roles: [
        {
          title: 'Mechanic, Diesel Engine',
          nco: '7233.0400',
          body: 'वाहनों, मशीनरी और उपकरणों को चलाने वाले डीज़ल इंजनों की मरम्मत, सर्विसिंग और ओवरहॉल करता है; इंजन ट्यून करता है और फ्यूल पंप व इंजेक्टर की सर्विसिंग करता है।',
        },
      ],
      settings: ['हल्के मोटर वाहन', 'भारी मोटर वाहन', 'स्टेशनरी इंजन', 'डीज़ल से चलने वाली मशीनरी'],
      settingsNote: 'वे इंजन और वाहन, जिन पर पाठ्यक्रम में प्रशिक्षण दिया जाता है।',
    },
    pathway: {
      ladder: TECHNICIAN_LADDER,
      routes: [
        { icon: 'Handshake', title: 'Apprenticeship', body: 'उद्योग में अप्रेंटिसशिप, जिसके बाद National Apprenticeship Certificate (NAC) मिलता है।' },
        { icon: 'Users', title: 'Become an instructor', body: 'ITI में ट्रेड पढ़ाने के लिए Crafts Instructor Training Scheme (CITS)।' },
        { icon: 'Award', title: 'Advanced Diploma (Vocational)', body: 'लागू होने पर DGT के एडवांस्ड डिप्लोमा कोर्स।' },
        { icon: 'Lightbulb', title: 'Entrepreneurship', body: 'संबंधित क्षेत्र में अपना खुद का काम शुरू करें।' },
      ],
    },
    source: {
      label: 'DGT curriculum · Mechanic Diesel · CTS 2.0 · revised July 2022',
      url: 'https://dgt.gov.in/sites/default/files/Mechanic%20Diesel_CTS2.0_NSQF-3.pdf',
    },
  },

  // ---------------------------------------------------------------------------
  {
    id: 'copa',
    name: 'COPA',
    fullName: 'Computer Operator & Programming Assistant',
    code: 'DGT/1003',
    kind: 'Non-engineering trade',
    sector: 'IT & ITeS',
    theme: 'digital',
    hero: {
      lede:
        'एक वर्ष का व्यावहारिक कंप्यूटर प्रशिक्षण — ऑपरेटिंग सिस्टम, ऑफिस एप्लिकेशन, डेटाबेस, नेटवर्किंग, HTML, CSS और JavaScript से वेब पेज, साइबर सुरक्षा, क्लाउड और AI टूल्स, तथा Python में प्रोग्रामिंग।',
    },
    facts: {
      duration: 'One year',
      years: 1,
      hours: '1,200 hrs + 150 hrs OJT',
      nsqf: 3.5,
      entry: '10वीं कक्षा की परीक्षा उत्तीर्ण',
      entryShort: '10th pass',
      minAge: 14,
    },
    structure: [{ practical: 840, theory: 240, employability: 120, ojt: 150 }],
    overview: {
      intro:
        'COPA आपको कंप्यूटर और उससे जुड़े उपकरण चलाना, ऑफिस सॉफ़्टवेयर और डेटा पर आत्मविश्वास से काम करना, नेटवर्क सेट करना व सुरक्षित रखना, और प्रोग्राम व वेब पेज लिखना सिखाता है। यह IT & ITeS सेक्टर का एक नॉन-इंजीनियरिंग ट्रेड है, जिसमें प्रोजेक्ट वर्क और ऑन-द-जॉब ट्रेनिंग भी शामिल हैं।',
      photo: null,
      areas: [
        {
          icon: 'Monitor',
          title: 'Computer systems',
          body: 'पेरिफेरल और अंदरूनी पुर्ज़े, DOS और PowerShell कमांड, ऑपरेटिंग सिस्टम और सॉफ़्टवेयर इंस्टॉल करना।',
        },
        {
          icon: 'FileSpreadsheet',
          title: 'Office applications',
          body: 'डॉक्यूमेंट, प्रेज़ेंटेशन और स्प्रेडशीट — मैक्रो, चार्ट और पिवट टेबल तक।',
        },
        {
          icon: 'Database',
          title: 'Databases',
          body: 'MySQL से डेटाबेस फ़ाइलें बनाना और उनका प्रबंधन करना।',
        },
        {
          icon: 'Network',
          title: 'Networks & Internet',
          body: 'नेटवर्क सेट करना, कॉन्फ़िगर करना, उनकी खराबी दूर करना और उन्हें सुरक्षित रखना; ई-कॉमर्स और ऑनलाइन संचार।',
        },
        {
          icon: 'Code',
          title: 'Web & programming',
          body: 'एल्गोरिदम और फ्लोचार्ट, HTML, CSS और JavaScript में वेब पेज, डोमेन पर होस्टिंग, और Python।',
        },
        {
          icon: 'Shield',
          title: 'Cloud, security & AI',
          body: 'क्लाउड सेवाएँ, एप्लिकेशन डेवलपमेंट लाइफ़ साइकिल, साइबर सुरक्षा और रोज़मर्रा के काम में AI का उपयोग।',
        },
      ],
    },
    learn: [
      {
        label: 'One year',
        groups: [
          {
            icon: 'Monitor',
            title: 'Computer systems',
            hours: 120,
            items: ['सुरक्षा सावधानियों का पालन करते हुए ऑपरेटिंग सिस्टम और संबंधित सॉफ़्टवेयर इंस्टॉल और सेट करना'],
          },
          {
            icon: 'FileSpreadsheet',
            title: 'Office applications',
            hours: 300,
            items: [
              'वर्ड प्रोसेसर में डॉक्यूमेंट बनाना, फ़ॉर्मेट करना और एडिट करना',
              'प्रेज़ेंटेशन स्लाइड बनाना और उन्हें ज़रूरत के अनुसार बदलना',
              'स्प्रेडशीट बनाना, फिर फ़ॉर्मूला, मैक्रो, चार्ट और पिवट टेबल वाली एडवांस्ड वर्कबुक तैयार करना',
            ],
          },
          {
            icon: 'Database',
            title: 'Data & networks',
            hours: 150,
            items: [
              'MySQL से डेटाबेस फ़ाइलें बनाना और उनका प्रबंधन करना',
              'इंटरनेट सहित कंप्यूटर नेटवर्क इंस्टॉल और कॉन्फ़िगर करना, उसकी खराबी दूर करना और उसे सुरक्षित रखना',
            ],
          },
          {
            icon: 'Code',
            title: 'Web development',
            hours: 300,
            items: ['HTML और CSS से वेब पेज बनाना', 'JavaScript से डायनामिक वेब पेज बनाना'],
          },
          {
            icon: 'Shield',
            title: 'Digital world',
            hours: 120,
            items: [
              'ई-कॉमर्स वेबसाइटों पर ब्राउज़ करना, सामान चुनना और लेन-देन करना',
              'क्लाउड सेवाओं और एप्लिकेशन डेवलपमेंट लाइफ़ साइकिल को समझाना',
              'साइबर सुरक्षा की अवधारणाओं से इंटरनेट पर जानकारी सुरक्षित रखना',
              'अलग-अलग एप्लिकेशन के साथ AI को जोड़ना',
            ],
          },
          {
            icon: 'Terminal',
            title: 'Programming',
            hours: 90,
            items: ['Python में प्रोग्राम लिखना'],
          },
        ],
      },
    ],
    core: 'ट्रेड के साथ-साथ Employability Skills भी पढ़ाई जाती है; प्रोजेक्ट वर्क और औद्योगिक भ्रमण भी इस वर्ष का हिस्सा हैं।',
    practice: {
      signature: 'stack',
      title: 'Where the year’s practical hours go.',
      lede: 'पाठ्यक्रम के अनुसार हर मॉड्यूल के प्रैक्टिकल और थ्योरी घंटे — सबसे बड़ा हिस्सा वेब डेवलपमेंट और ऑफिस सॉफ़्टवेयर का है।',
      modules: [
        { label: 'Operating system & software', practical: 90, theory: 30 },
        { label: 'Word processing', practical: 50, theory: 10 },
        { label: 'Presentations', practical: 50, theory: 10 },
        { label: 'Spreadsheets', practical: 70, theory: 20 },
        { label: 'Advanced spreadsheets', practical: 70, theory: 20 },
        { label: 'MySQL databases', practical: 50, theory: 10 },
        { label: 'Networking & Internet', practical: 70, theory: 20 },
        { label: 'HTML & CSS', practical: 70, theory: 20 },
        { label: 'JavaScript', practical: 170, theory: 40 },
        { label: 'E-commerce', practical: 20, theory: 10 },
        { label: 'Cloud & app life cycle', practical: 20, theory: 10 },
        { label: 'Cyber security', practical: 20, theory: 10 },
        { label: 'AI integration', practical: 20, theory: 10 },
        { label: 'Python', practical: 70, theory: 20 },
      ],
      tools: [
        {
          icon: 'Monitor',
          title: 'Hardware',
          items: ['Desktop computers', 'Laptop', 'All-in-one printer', 'Web cameras', 'Smart interactive board', 'Online UPS'],
        },
        {
          icon: 'Network',
          title: 'Networking',
          items: ['Wi-Fi router', '24-port switch & patch panel', 'Structured cabling', 'RJ-45 crimping & punching tools', 'LAN tester'],
        },
        {
          icon: 'AppWindow',
          title: 'Software',
          items: ['Office automation software', 'Open-source office suite', 'Python', 'GIMP', 'Antivirus'],
        },
        {
          icon: 'Globe',
          title: 'Internet & web',
          items: ['Broadband connectivity', 'Registered domain with web space', 'Web browsers'],
        },
      ],
    },
    careers: {
      roles: [
        {
          title: 'Computer Operator',
          nco: '4131.0600',
          body: 'व्यावसायिक, वैज्ञानिक, इंजीनियरिंग या अन्य डेटा प्रोसेस करने के लिए कंप्यूटर और उससे जुड़े उपकरण चलाता है।',
        },
        {
          title: 'Programming Assistant',
          nco: '3514.0300',
          body: 'कंप्यूटिंग विशेषज्ञों के मार्गदर्शन में कंप्यूटर प्रोग्राम इंस्टॉल करता है, उनका रखरखाव करता है और उन्हें अपडेट करता है।',
        },
        {
          title: 'Web Developer',
          nco: '2513.0101',
          body: 'स्टैटिक और डायनामिक कंटेंट वाले वेब एप्लिकेशन डिज़ाइन करता है और उनका रखरखाव करता है — लेआउट, डिज़ाइन और कोडिंग।',
        },
        {
          title: 'User Interface Developer',
          nco: '2513.0201',
          body: 'एप्लिकेशन, डेटाबेस और वेबसाइटों के लिए यूज़र इंटरफ़ेस बनाता है।',
        },
        {
          title: 'Network Administrator',
          nco: '2523.0100',
          body: 'डेटा-कम्युनिकेशन हार्डवेयर और सॉफ़्टवेयर की जाँच, मूल्यांकन और सपोर्ट करता है, और नेटवर्क की समस्याएँ सुलझाने में यूज़र्स की मदद करता है।',
        },
      ],
      settings: ['व्यावसायिक डेटा प्रोसेसिंग', 'वैज्ञानिक और इंजीनियरिंग डेटा', 'वेब और एप्लिकेशन टीमें', 'नेटवर्क सपोर्ट'],
      settingsNote: 'DGT के कार्य-विवरणों में बताए गए कार्य-क्षेत्र।',
    },
    pathway: {
      ladder: ['Computer Operator', 'Assistant Programmer', 'Programmer', 'Senior Programmer'],
      routes: [
        { icon: 'Handshake', title: 'Apprenticeship', body: 'उद्योग में अप्रेंटिसशिप, जिसके बाद National Apprenticeship Certificate (NAC) मिलता है।' },
        { icon: 'Users', title: 'Become an instructor', body: 'ITI में ट्रेड पढ़ाने के लिए Crafts Instructor Training Scheme (CITS)।' },
        { icon: 'Award', title: 'Advanced Diploma (Vocational)', body: 'लागू होने पर DGT के एडवांस्ड डिप्लोमा कोर्स।' },
        { icon: 'Lightbulb', title: 'Entrepreneurship', body: 'संबंधित क्षेत्र में अपना खुद का काम शुरू करें।' },
      ],
    },
    source: {
      label: 'DGT curriculum · COPA · CTS 3.0 · revised August 2025',
      url: 'https://dgt.gov.in/sites/default/files/2026-08/COPA_CTS3.0_NSQF-3.5.pdf',
    },
  },
].map((t) => {
  const record = tradeById[t.id];
  return {
    ...t,
    slug: `/trades/${t.id}`,
    // Verified Satpuda campuses that publish this trade.
    campuses: record?.campuses ?? [],
    faqs: faqsFor(t),
    passRule: PASS_RULE,
    ctsList: CTS_LIST,
  };
});

/** Answers are assembled from the record so they can never disagree with it. */
function faqsFor(t) {
  const perYear = t.structure[0];
  const instruction = t.structure.reduce((n, y) => n + y.practical + y.theory + y.employability, 0);
  const ojt = t.structure.reduce((n, y) => n + y.ojt, 0);
  const lateral = t.pathway.routes.some((r) => r.title === 'Diploma by lateral entry');
  const campuses = tradeById[t.id]?.campuses ?? [];

  return [
    {
      q: `${t.name} कोर्स कितने समय का है?`,
      a: `${t.facts.years} वर्ष: ${instruction.toLocaleString('en-IN')} घंटे का प्रशिक्षण, साथ में ${ojt} घंटे की ऑन-द-जॉब ट्रेनिंग या ग्रुप प्रोजेक्ट${
        t.structure.length > 1 ? ` (हर वर्ष ${perYear.ojt} घंटे)` : ''
      }।`,
    },
    {
      q: 'प्रवेश के लिए कौन-सी योग्यता चाहिए?',
      a: `${t.facts.entry}। शैक्षणिक सत्र के पहले दिन न्यूनतम आयु ${t.facts.minAge} वर्ष होनी चाहिए।`,
    },
    {
      q: 'क्या प्रशिक्षण ज़्यादातर प्रैक्टिकल होता है?',
      a: `हाँ। हर ${(perYear.practical + perYear.theory + perYear.employability).toLocaleString('en-IN')} प्रशिक्षण घंटों में से ${perYear.practical.toLocaleString('en-IN')} घंटे ट्रेड प्रैक्टिकल के होते हैं। इसके अलावा हर वर्ष ${perYear.ojt} घंटे की ऑन-द-जॉब ट्रेनिंग पास के उद्योग में होती है — और जहाँ उद्योग उपलब्ध न हो, वहाँ ग्रुप प्रोजेक्ट कराया जाता है।`,
    },
    {
      q: 'कौन-सा प्रमाणपत्र मिलेगा?',
      a: `DGT द्वारा आयोजित All India Trade Test पास करने पर National Trade Certificate (NTC) मिलता है। उत्तीर्ण होने के लिए ${PASS_RULE} ज़रूरी हैं।`,
    },
    {
      q: 'किन नौकरियों के लिए आवेदन किया जा सकता है?',
      a: `पाठ्यक्रम में बताई गई जॉब भूमिकाएँ हैं: ${t.careers.roles.map((r) => r.title).join(', ')}।`,
    },
    {
      q: 'क्या ITI के बाद अप्रेंटिसशिप की जा सकती है?',
      a: 'हाँ। पाठ्यक्रम में उद्योग में अप्रेंटिसशिप को आगे बढ़ने के एक रास्ते के रूप में बताया गया है, जिसके बाद National Apprenticeship Certificate (NAC) मिलता है।',
    },
    {
      q: 'क्या इस ट्रेड के बाद आगे पढ़ाई जारी रखी जा सकती है?',
      a: lateral
        ? 'हाँ। पाठ्यक्रम में अधिसूचित इंजीनियरिंग शाखाओं के डिप्लोमा कोर्स में लेटरल एंट्री, NIOS के माध्यम से 10+2 परीक्षा, Crafts Instructor Training Scheme (CITS) और DGT के Advanced Diploma (Vocational) कोर्स बताए गए हैं।'
        : 'हाँ। पाठ्यक्रम में Crafts Instructor Training Scheme (CITS) और DGT के Advanced Diploma (Vocational) कोर्स बताए गए हैं। कोर्स के दौरान आप NIOS के माध्यम से 10वीं या 12वीं के प्रमाणपत्र के लिए हर वर्ष 240 घंटे तक के वैकल्पिक कोर्स भी कर सकते हैं।',
    },
    {
      q: `Satpuda के किन कैंपस में ${t.name} उपलब्ध है?`,
      a: campuses.length
        ? `${t.name} ट्रेड ${campuses.map((c) => c.shortName).join(', ')} कैंपस में उपलब्ध है। मौजूदा सीटों और प्रवेश की तारीखों के लिए कृपया संबंधित कैंपस को कॉल करें।`
        : 'इस सत्र में यह ट्रेड किन कैंपस में चल रहा है, यह जानने के लिए कृपया हेड ऑफिस से संपर्क करें।',
    },
  ];
}

export const tradePageById = Object.fromEntries(tradePages.map((t) => [t.id, t]));

/**
 * "Our ITI Institutes" — the homepage marquee and the /iti/:slug pages.
 *
 * Which institutes appear, and in what order, is the official site's own
 * "ITI Locations" menu (https://satpudaiti.com/, About Us → ITI Locations):
 * fifteen entries, of which Garra is deliberately excluded, leaving the
 * fourteen below. Shiksha Private ITI, Rewa is in `itiInstitutes` (it is on
 * the contact page) but not in that menu and has no campus page, so it is not
 * part of this set.
 *
 * Each profile is joined to its `itiInstitutes` record at the bottom of this
 * file, so name, address, phone, email, principal, year and trades live in one
 * place only. A profile adds what only the institute's own campus page
 * publishes: its photographs, the principal's message, the objectives list,
 * shifts, and the trade-wise building and workshop table.
 *
 * Every value was read from the campus page in `sourceUrl` on 2026-10-16.
 * English source text is translated into Hindi faithfully, never extended;
 * Budhi's principal message was published in Hindi and its wording is kept
 * verbatim (only split into two paragraphs).
 * Where a campus page publishes nothing for a section, that field is null and
 * the page leaves the section out.
 *
 * Images: only photographs that the official site publishes for that specific
 * campus are used. The five-photo "Our Gallery" strip that appears identically
 * on all fourteen campus pages is template content, so it is not attributed
 * to any one campus. Campuses without a photograph of their own fall back to
 * the official Satpuda ITI mark.
 */

import { itiInstitutes } from './itiInstitutes';
import { tradeById } from './trades';

import manjhapurBuilding from '../assets/images/institutes/campus/manjhapur-building.webp';
import manjhapurTrainees from '../assets/images/institutes/campus/manjhapur-campus-trainees.webp';
import manjhapurWorkshop from '../assets/images/institutes/campus/manjhapur-workshop.webp';
import manjhapurWiring from '../assets/images/institutes/campus/manjhapur-wiring-project.webp';
import manjhapurStaff from '../assets/images/institutes/campus/manjhapur-staff.webp';
import budhiBuilding from '../assets/images/institutes/campus/budhi-building.webp';
import katangiBuilding from '../assets/images/institutes/campus/katangi-building.webp';

import principalManjhapur from '../assets/images/institutes/principals/manjhapur.webp';
import principalBudhi from '../assets/images/institutes/principals/budhi.webp';
import principalKatangi from '../assets/images/institutes/principals/katangi.webp';
import principalBaihar from '../assets/images/institutes/principals/baihar.webp';
import principalBetul from '../assets/images/institutes/principals/betul.webp';
import principalMandla from '../assets/images/institutes/principals/mandla.webp';
import principalMauganj from '../assets/images/institutes/principals/mauganj.webp';
import principalMultai from '../assets/images/institutes/principals/multai.webp';
import principalRewa from '../assets/images/institutes/principals/rewa.webp';
import principalSeoni from '../assets/images/institutes/principals/seoni.webp';

export const ITI_BASE = '/iti';

/** Every campus page lists "Shift: 03" for every trade it runs. */
const SHIFTS = 3;

/** Eligibility, only where a campus page states it plainly. */
export const eligibilityHi = {
  electrician: '10वीं उत्तीर्ण (विज्ञान विषय के साथ)',
};

// ---------------------------------------------------------------------------
// Shared source text
// ---------------------------------------------------------------------------

/**
 * The principal's message that nine campus pages publish word for word,
 * each with its own institute name.
 */
const standardMessage = (name) => [
  `${name} एक ऐसा संस्थान है जिसका लक्ष्य प्रशिक्षुओं का संपूर्ण विकास है। हमारे प्रशिक्षक अच्छी तरह प्रशिक्षित हैं, ताकि प्रशिक्षुओं को उनके हर प्रयास में — शैक्षणिक हो या अन्य — हर संभव सहयोग मिल सके।`,
  'यह एक बहु-विषयक संस्थान है, जिससे विद्यार्थियों को तकनीकी सामग्री की विस्तृत श्रृंखला तक आसान पहुँच मिलती है। हमारी शिक्षा का दायरा संकीर्ण नहीं है — हम व्यावहारिक अनुभव में विश्वास करते हैं। हमारे विद्यार्थियों को अपने कौशल बढ़ाने और पाठ्यक्रम की सीमाओं से आगे पढ़ने के लिए प्रोत्साहित किया जाता है।',
];

/** The longer message the Rewa and Itarsi campus pages both publish. */
const readerMessage = [
  'प्रिय पाठक, “सफलता उन्हें मिलती है जो कड़ी मेहनत करते हैं और उस पर टिके रहते हैं, जो अतीत की उपलब्धियों पर विश्राम नहीं करते।” प्रिय विद्यार्थियो, आप सभी को स्नेहपूर्ण शुभकामनाओं के साथ यह संदेश दे रहा हूँ। अब आप हमारे संस्थान का हिस्सा हैं। मुझे विश्वास है कि आप एक अद्भुत और स्नेहपूर्ण वातावरण में हैं, जहाँ आपकी बुद्धि और व्यक्तित्व का विकास होगा, क्योंकि SATPUDA समूह विद्यार्थियों के करियर के लिए समर्पित समूह है। इसका संचालन Maharana Pratap Shikshan Samiti, बालाघाट करती है और यह औद्योगिक प्रशिक्षण के लिए एक उत्कृष्ट समूह है।',
  'जैसा कि हम सब जानते हैं, “हवाएँ और लहरें हमेशा सजग नाविकों के पक्ष में होती हैं”, इसलिए आइए हम हर हवा और लहर को अपने अनुकूल बनाकर दिखाएँ। हमारी शिक्षा का दर्शन हमेशा हर विद्यार्थी की ज़रूरतों को पूरा करना रहा है। यदि हम वातावरण को प्रेरक और उद्देश्यपूर्ण बना सकें, तो आप सभी कौशल और ज्ञान अर्जित करेंगे। डिजिटल क्रांति हम सभी को प्रभावित कर रही है — यह सचमुच सब कुछ बदल रही है, और जानकारी, साथ और शिक्षा तेज़ी से उपलब्ध हो रही है। ऐसे वातावरण में, जहाँ काम और प्रयास को महत्व दिया जाता है, विद्यार्थियों का आत्म-सम्मान बढ़ता है।',
  'हम हर विद्यार्थी को समझने और उसके साथ काम करने की पूरी कोशिश करते हैं, और अपनी देखरेख में हर व्यक्ति का सर्वांगीण विकास करना हमारी ज़िम्मेदारी है। “बढ़ो और दूसरों को बढ़ने दो।” मैं सभी के लिए एक अद्भुत वातावरण की कामना करता हूँ। यदि मैं किसी भी तरह सहायता कर सकूँ, तो बेझिझक संपर्क करें — मेरा द्वार हमेशा खुला है। आपके प्राचार्य के रूप में सेवा करना मेरे लिए सम्मान की बात है।',
];

/**
 * Trade-wise building and workshop tables, as published (areas in square
 * metres). Several campus pages carry the same table, so these are shared
 * by reference rather than repeated. `null` marks a cell the page leaves
 * blank ("…").
 */
const row = (trade, units, classroomPerUnit, classroomTotal, workshopPerUnit, workshopTotal, note = null) => ({
  trade,
  units,
  classroomPerUnit,
  classroomTotal,
  workshopPerUnit,
  workshopTotal,
  note,
});

const WITH_PARKING = 'पार्किंग सहित';

/** Manjhapur, Rewa and Mauganj. */
const INFRA_THREE_TRADE_LARGE = [
  row('electrician', '26', '30', '2400', '98.00', '1450'),
  row('fitter', '03', '30', '300', '88.00', '88'),
  row('mechanic-diesel', '03', '30', '300', '84.00', '84 + 52', WITH_PARKING),
];

/** Kundipura, Mandla and Betul. */
const INFRA_THREE_TRADE = [
  row('electrician', '06', '30', '85.51', '196.00', '215.08'),
  row('fitter', '3', '30', '30.32', '88.00', '93.24'),
  row('mechanic-diesel', '3', '30', '30.32', '84.00', '125.65'),
];

/** Budhi, Katangi and Baihar publish the Electrician row only. */
const INFRA_ELECTRICIAN = [row('electrician', '06', '30', '85.51', '196.00', '215.08')];

const SATPUDA_SITE = 'https://satpudaiti.com';

// ---------------------------------------------------------------------------
// Profiles, in the order of the official "ITI Locations" menu
// ---------------------------------------------------------------------------

const PROFILES = [
  {
    id: 'manjhapur',
    sourceUrl: `${SATPUDA_SITE}/iti-manjhapur-balaghat/`,
    image: {
      src: manjhapurBuilding,
      alt: 'Satpuda (Pvt) I.T.I. Manjhapur का भवन, जिस पर संस्थान का नाम लिखा है',
    },
    heroImage: {
      src: manjhapurTrainees,
      alt: 'मांझापुर, बालाघाट स्थित आईटीआई भवन के सामने खड़े प्रशिक्षु',
    },
    intro:
      'Satpuda Private ITI, Manjhapur बालाघाट ज़िले में स्थित Satpuda समूह का प्रमुख कैंपस है — समूह का हेड ऑफिस भी इसी परिसर में है। वर्ष 2010 में स्थापित इस संस्थान तक मध्य प्रदेश राज्य राजमार्ग–26 (बालाघाट–सिवनी रोड) से पहुँचा जा सकता है।',
    objectives: [
      'कार्यबल की माँग और आपूर्ति के बीच के अंतर को कम करने के लिए मानव संसाधन विकसित करना और उम्मीदवारों को भविष्य के रोज़गार के लिए तैयार करना।',
      'उद्योगों के लिए विभिन्न ट्रेड में कुशल कामगारों की निरंतर उपलब्धता सुनिश्चित करना।',
      'पारस्परिक लाभ के लिए उद्योगों, संस्थानों, अनुसंधान एवं विकास (R&D) संगठनों तथा उत्तीर्ण प्रशिक्षुओं और अप्रेंटिस के साथ जुड़ाव और सहयोग स्थापित करना।',
      'शिक्षकों और स्टाफ़ के लिए ज्ञान व कौशल उन्नयन प्रशिक्षण उपलब्ध कराना।',
      'अंतर्विषयी ज्ञान के लिए उपकरण और तकनीकें उपलब्ध कराना, जिससे बहु-कौशल विकसित हों, और 360° विकास के मूल उद्देश्य वाली प्रशिक्षण पद्धति अपनाना।',
      'प्रशिक्षुओं को विभिन्न क्षेत्रों में रोज़गार के व्यापक अवसर उपलब्ध कराना।',
      'योग्य उम्मीदवारों को छात्रवृत्ति प्रदान करना।',
    ],
    infrastructure: INFRA_THREE_TRADE_LARGE,
    message: {
      paragraphs: [
        'औद्योगिक प्रशिक्षण संस्थान (ITI) भारत में DGET के अंतर्गत गठित माध्यमिक-पश्चात शिक्षण संस्थान है। Satpuda ITI लगातार वर्तमान रुझानों का पालन करता है, ताकि हम सबसे अद्यतन रहें, सर्वोत्तम पद्धतियाँ अपनाएँ, सभी नियमों का पालन करें और अपने विद्यार्थियों की भविष्य की ज़रूरतों को पूरा करें।',
        'सही ITI चुनना एक महत्वपूर्ण निर्णय है। हमारा ITI हर प्रशिक्षु के कौशल विकास पर ध्यान देता है। कुछ समय निकालकर हमारे ITI आइए, और किसी भी प्रश्न या चिंता के लिए बेझिझक मुझसे संपर्क कीजिए।',
      ],
      photo: principalManjhapur,
    },
    gallery: [
      { src: manjhapurBuilding, alt: 'Satpuda (Pvt) I.T.I. Manjhapur का भवन' },
      { src: manjhapurWorkshop, alt: 'मांझापुर कैंपस की वर्कशॉप में मशीनों के साथ प्रशिक्षु और प्रशिक्षक' },
      { src: manjhapurWiring, alt: 'Domestic House Wiring प्रोजेक्ट के साथ मांझापुर कैंपस के प्रशिक्षु' },
      { src: manjhapurStaff, alt: 'Satpuda Group of Institutions के विश्वकर्मा जयंती कार्यक्रम में स्टाफ़ का समूह फ़ोटो' },
    ],
  },
  {
    id: 'budhi',
    sourceUrl: `${SATPUDA_SITE}/iti-bhudhi/`,
    image: {
      src: budhiBuilding,
      alt: 'New Satpuda Private I.T.I. Budhi, बालाघाट का भवन, जिस पर संस्थान का बोर्ड लगा है',
    },
    intro:
      'New Satpuda Private ITI, Budhi बालाघाट के बूढ़ी क्षेत्र में वार्ड नंबर 13, धीमरटोला में स्थित है और वर्ष 2015 में स्थापित हुआ। संस्थान के प्राचार्य के अनुसार यह शहर के मध्य स्थित है और सभी संसाधनों से परिपूर्ण है।',
    objectives: [
      'स्थानीय उद्योगों की माँग के अनुसार ITI में कम से कम एक कौशल ट्रेड शुरू करना।',
      'प्रशिक्षुओं को ITI के आसपास के कम से कम एक उद्योग का प्रत्यक्ष अनुभव कराना।',
      'प्रशिक्षुओं की शिकायतों में 1% की कमी लाना।',
      'पढ़ाई बीच में छोड़ने की दर में 2% की कमी सुनिश्चित करना।',
      'शिक्षकों को नई शिक्षण पद्धतियाँ अपनाने का अवसर और अनुभव सुनिश्चित करना।',
      'सॉफ्ट स्किल्स के माध्यम से प्रशिक्षुओं के समग्र व्यक्तित्व का विकास करना।',
      'उत्कृष्ट प्रशिक्षण, प्रभावी प्लेसमेंट और इनक्यूबेशन सेंटर के माध्यम से एक श्रेष्ठ संस्थान के रूप में पहचान बनाना।',
    ],
    infrastructure: INFRA_ELECTRICIAN,
    message: {
      // Published in Hindi on the campus page; kept verbatim.
      paragraphs: [
        'न्यू सतपुड़ा (प्राइवेट) आईटीआई बुढी, शहर के मध्य अवस्थित है व सभी संसाधनो से परिपूर्ण है। वर्तमान में यहां इलेक्ट्रीशियन ट्रेड संचालित किया जा रहा हैं। संस्था के माध्यम से प्रशिक्षुओं का पूर्ण विकास करना व हमारे प्रशिक्षकों को यह सुनिश्चित करने के लिए अच्छी तरह से प्रशिक्षित किया जाता है कि प्रशिक्षुओं को बेहतर प्रशिक्षण प्रदान करने के साथ ही जॉब प्लेसमेंट के लिये भी तैयार किया जा सके।',
        'संस्था के द्वारा प्रशिक्षुओं को उनके पाठ्यक्रम के अलावा औद्यौगिक भ्रमण से साथ-साथ विभिन्न कार्यक्षेत्रो पर कार्य करने के लिये भी तैयार किया जाता है। यह एक बहु-विषयक संस्थान है और यह भी सुनिश्चित करता है कि छात्रों के पास तकनीकी सामग्री की एक विस्तृत श्रृंखला तक पहुंच हो। हमारे छात्रों को अपने कौशल का विस्तार करने और पाठ्यक्रम की सीमाओं से परे अध्ययन करने के लिए प्रोत्साहित किया जाता है।',
      ],
      photo: principalBudhi,
    },
  },
  {
    id: 'katangi',
    sourceUrl: `${SATPUDA_SITE}/new-satpuda-pvt-iti-katangi/`,
    image: {
      src: katangiBuilding,
      alt: 'New Satpuda Private I.T.I. Katangi, बालाघाट का भवन, जिसकी दीवार पर संस्थान का नाम लिखा है',
    },
    intro:
      'New Satpuda Private ITI, Katangi बालाघाट ज़िले के कटंगी में, बालाघाट रोड पर स्टेट बैंक के पास स्थित है। वर्ष 2015 में स्थापित यह संस्थान बालाघाट क्षेत्र में Satpuda समूह के कैंपसों में से एक है।',
    infrastructure: INFRA_ELECTRICIAN,
    messageFor: standardMessage,
    principalPhoto: principalKatangi,
  },
  {
    id: 'baihar',
    sourceUrl: `${SATPUDA_SITE}/iti-baihar/`,
    intro:
      'Maharana Pratap Private ITI, Baihar बालाघाट ज़िले के बैहर में कंपाउंडर टोला, सोमानी मिल के पास स्थित है और अगस्त 2014 से Satpuda समूह के आईटीआई के रूप में संचालित है।',
    infrastructure: INFRA_ELECTRICIAN,
    messageFor: standardMessage,
    principalPhoto: principalBaihar,
  },
  {
    id: 'chhindwara-kundipura',
    sourceUrl: `${SATPUDA_SITE}/chhindwara/`,
    intro:
      'Satpuda Private ITI, Kundipura छिंदवाड़ा में कुंडीपुरा थाने के पास स्थित है और अगस्त 2003 से Satpuda समूह के आईटीआई के रूप में संचालित है। यह छिंदवाड़ा ज़िले में समूह के दो आईटीआई में से एक है।',
    infrastructure: INFRA_THREE_TRADE,
    messageFor: standardMessage,
  },
  {
    id: 'chhindwara-warehouse',
    sourceUrl: `${SATPUDA_SITE}/satpuda-pvt-iti-chhindwara-warehouse/`,
    intro:
      'Satpuda Private ITI, Warehouse छिंदवाड़ा में फटाका गोदाम के पीछे स्थित है। कुंडीपुरा के साथ यह छिंदवाड़ा ज़िले में Satpuda समूह के दो आईटीआई में से एक है।',
    infrastructure: [
      row('electrician', '24', '30', '240', '98.00', '850'),
      row('fitter', '9', '30', '90', '88', '275.92'),
    ],
    messageFor: standardMessage,
  },
  {
    id: 'rewa',
    sourceUrl: `${SATPUDA_SITE}/iti-rewa/`,
    intro:
      'Satpuda Private ITI, Rewa रीवा के चोरहटा क्षेत्र में स्थित है। यहाँ Electrician, Fitter और Mechanic Diesel — तीनों ट्रेड में प्रशिक्षण दिया जाता है।',
    infrastructure: INFRA_THREE_TRADE_LARGE,
    message: { paragraphs: readerMessage, photo: principalRewa },
  },
  {
    id: 'seoni',
    sourceUrl: `${SATPUDA_SITE}/seoni/`,
    intro:
      'Satpuda Private ITI, Seoni सिवनी में नागपुर रोड पर सेलादेही (शिलादेही) में स्थित है और अगस्त 2007 से Satpuda समूह के आईटीआई के रूप में संचालित है।',
    infrastructure: [
      row('electrician', '06', null, null, '195.20', '200.00'),
      row('fitter', '03', null, null, '88', '123.50'),
      row('mechanic-diesel', '03', null, null, '136', '181.50', WITH_PARKING),
    ],
    messageFor: standardMessage,
    principalPhoto: principalSeoni,
  },
  {
    id: 'multai',
    sourceUrl: `${SATPUDA_SITE}/multai/`,
    intro:
      'Satpuda Private ITI, Multai बैतूल ज़िले के मुलताई में, छिंदवाड़ा रोड पर चिखली खुर्द में स्थित है। अगस्त 2015 से संचालित इस संस्थान में Electrician ट्रेड का प्रशिक्षण दिया जाता है।',
    infrastructure: null,
    messageFor: standardMessage,
    principalPhoto: principalMultai,
  },
  {
    id: 'mandla',
    sourceUrl: `${SATPUDA_SITE}/mandla/`,
    intro:
      'Satpuda Private ITI, Mandla मंडला ज़िले में नैनपुर रोड पर महाराजपुर पौंडी में स्थित है। यहाँ Electrician, Fitter और Mechanic Diesel ट्रेड में प्रशिक्षण दिया जाता है।',
    infrastructure: INFRA_THREE_TRADE,
    messageFor: standardMessage,
    principalPhoto: principalMandla,
  },
  {
    id: 'itarsi',
    sourceUrl: `${SATPUDA_SITE}/itarsi/`,
    intro:
      'Satpuda Private ITI, Itarsi नर्मदापुरम ज़िले के इटारसी में, जमानी रोड पर FCI के पास स्थित है। यहाँ Electrician और Fitter के साथ COPA (Computer Operator & Programming Assistant) ट्रेड भी संचालित होता है।',
    infrastructure: null,
    message: { paragraphs: readerMessage, photo: null },
  },
  {
    id: 'betul',
    sourceUrl: `${SATPUDA_SITE}/betul/`,
    intro:
      'Satpuda Private ITI, Betul बैतूल ज़िले में मुलताई के पास चिखली खुर्द में स्थित है और अगस्त 2015 से Satpuda समूह के आईटीआई के रूप में संचालित है।',
    infrastructure: INFRA_THREE_TRADE,
    messageFor: standardMessage,
    principalPhoto: principalBetul,
  },
  {
    id: 'sarni',
    sourceUrl: `${SATPUDA_SITE}/iti-sarni/`,
    intro:
      'Satpuda Private ITI, Sarni बैतूल ज़िले के सारनी में, सलैया क्षेत्र में गीता मंदिर के पास स्थित है। यहाँ Electrician और Fitter ट्रेड में प्रशिक्षण दिया जाता है।',
    infrastructure: null,
    messageFor: standardMessage,
  },
  {
    id: 'mauganj',
    sourceUrl: `${SATPUDA_SITE}/mauganj/`,
    intro:
      'Satpuda Private ITI, Mauganj मऊगंज में मऊगंज–रीवा–सीधी रोड पर स्थित है। संस्थान के आधिकारिक पेज के अनुसार यह Satpuda समूह के सबसे बड़े आईटीआई में से एक है।',
    infrastructure: INFRA_THREE_TRADE_LARGE,
    message: {
      paragraphs: [
        'Satpuda Private ITI, Mauganj में हम उन चुनौतियों को समझते हैं जो विद्यार्थियों के सामने आती हैं। हमारा मिशन है कि विद्यार्थियों को इन चुनौतियों का सामना करने में सहयोग दें और तकनीकी क्षेत्र में उनके लक्ष्यों तक पहुँचने में उनकी मदद करें।',
        'प्राचार्य के रूप में मैं जानता हूँ कि अपने बच्चे के लिए सही ITI चुनना कितना महत्वपूर्ण है। जो अभिभावक इस ITI को चुनते हैं, वे भरोसा रख सकते हैं कि हम उनके बच्चों को उनके तकनीकी क्षेत्र में सही निर्णय लेने के लिए मार्गदर्शन देने का पूरा प्रयास करेंगे।',
      ],
      photo: principalMauganj,
    },
  },
];

// ---------------------------------------------------------------------------
// Join each profile to its verified record
// ---------------------------------------------------------------------------

const recordById = Object.fromEntries(itiInstitutes.map((i) => [i.id, i]));

/** "Satpuda Private ITI, Manjhapur" → ["Satpuda Private ITI", "Manjhapur"]. */
const splitName = (name) => {
  const at = name.lastIndexOf(', ');
  return at < 0 ? ['', name] : [name.slice(0, at), name.slice(at + 2)];
};

export const itiProfiles = PROFILES.map((profile, index) => {
  const record = recordById[profile.id];
  if (!record) throw new Error(`itiProfiles: no itiInstitutes record for "${profile.id}"`);

  const [prefix, place] = splitName(record.name);
  const leader = record.principal
    ? { name: record.principal, role: 'Principal' }
    : record.contactPerson
      ? { name: record.contactPerson, role: 'Contact person' }
      : null;

  const message = profile.message ?? (profile.messageFor && { paragraphs: profile.messageFor(record.name), photo: null });

  return {
    ...record,
    slug: record.id,
    path: `${ITI_BASE}/${record.id}`,
    order: index + 1,
    namePrefix: prefix,
    namePlace: place,
    sourceUrl: profile.sourceUrl,
    image: profile.image ?? null,
    heroImage: profile.heroImage ?? profile.image ?? null,
    intro: profile.intro,
    objectives: profile.objectives ?? null,
    courses: record.trades
      .map((t) => {
        const trade = tradeById[t.id];
        return trade && { ...trade, intake: t.intake, shifts: SHIFTS, eligibilityHi: eligibilityHi[t.id] ?? null };
      })
      .filter(Boolean),
    infrastructure: profile.infrastructure?.length ? profile.infrastructure : null,
    message:
      message && leader
        ? { ...message, photo: message.photo ?? profile.principalPhoto ?? null, ...leader }
        : null,
    gallery: profile.gallery ?? null,
  };
});

/**
 * Slug lookup for the /iti/:slug route. A Map, not a plain object, so a URL
 * like /iti/constructor resolves to nothing instead of an inherited property.
 */
const bySlug = new Map(itiProfiles.map((p) => [p.slug, p]));
export const getItiProfile = (slug) => bySlug.get(slug) ?? null;

/** Districts the fourteen institutes cover, in menu order. */
export const itiDistricts = [...new Set(itiProfiles.map((p) => p.district))];

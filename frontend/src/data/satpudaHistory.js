/**
 * Satpuda ITI — story and milestones.
 *
 * Institution years come from the Samiti's "Our Institutions" board
 * (src/assets/iti detail.webp); placement years from the placement table.
 */

export const story = {
  foundedYear: 1999,
  operator: 'Maharana Pratap Shikshan Samiti, Balaghat',
  // Official taglines from the /about-us/ graphics (2022).
  taglineEn: 'A New Horizon in Skill Development',
  taglineHi: 'कौशल विकास के नये आयाम',
  mottoHi: 'हुनर से रोजगार तक',
  mottoEn: 'From skill to employment',
  paragraphs: [
    'Maharana Pratap Shikshan Samiti, बालाघाट के अंतर्गत Satpuda Industrial Training Institute की स्थापना 1999 में मज़बूत तकनीकी पृष्ठभूमि वाले पेशेवर उद्यमियों और योग्य इंजीनियरों की एक टीम ने की थी — ताकि ग्रामीण और शहरी क्षेत्रों के विद्यार्थियों को गुणवत्तापूर्ण व्यावसायिक और तकनीकी प्रशिक्षण मिल सके।',
    'समूह की शुरुआत इस उद्देश्य से हुई कि युवाओं को उच्च स्तर का प्रशिक्षण देकर उन्हें किसी ट्रेड में निपुण और उद्योग के लिए तैयार बनाया जाए। तब से समूह उद्योग की ज़रूरतों और प्रशिक्षुओं के कौशल के बीच की दूरी कम करने के लिए लगातार काम कर रहा है।',
    'बालाघाट से शुरू होकर यह नेटवर्क पूरे मध्य प्रदेश में फैला — छिंदवाड़ा, नर्मदापुरम, सिवनी, रीवा, मंडला, बैतूल और मऊगंज तक। यहाँ NCVT से संबद्ध Craftsman Training Scheme के ट्रेड चलाए जाते हैं, जिनका प्रशासन तकनीकी शिक्षा संचालनालय, मध्य प्रदेश शासन करता है।',
  ],
};

/**
 * `kind` drives the timeline icon: origin | campus | college | school | record | legacy.
 * `institutions` lists what opened that year — name, place and affiliation as
 * printed on the Samiti's institutions board.
 */
const NCVT = 'NCVT & QCI, New Delhi';
const iti = (place) => ({ name: 'Satpuda Private ITI', place, affiliation: NCVT });

export const milestones = [
  {
    year: '1999',
    title: 'Where it all began',
    body: 'Maharana Pratap Shikshan Samiti ने गर्रा, बालाघाट में अपना पहला Satpuda Private ITI शुरू किया।',
    kind: 'origin',
    institutions: [iti('Garra, Balaghat')],
  },
  {
    year: '2003',
    title: 'First step beyond Balaghat',
    body: 'छिंदवाड़ा में कुंडीपुरा थाने के पास दूसरा ITI शुरू हुआ।',
    kind: 'campus',
    institutions: [iti('Near Kundipura Thana, Chhindwara')],
  },
  {
    year: '2006',
    title: 'Into teacher education',
    body: 'मांझापुर कैंपस में Satpuda D.Ed. College की शुरुआत हुई।',
    kind: 'college',
    institutions: [
      {
        name: 'Satpuda D.Ed. College',
        place: 'Manjhapur, Balaghat',
        affiliation: 'Madhyamik Shiksha Mandal, Bhopal · CBSE, New Delhi',
      },
    ],
  },
  {
    year: '2007',
    title: 'Seoni and Mandla',
    body: 'दो नए ITI के साथ नेटवर्क सिवनी और मंडला ज़िलों तक पहुँचा।',
    kind: 'campus',
    institutions: [iti('Seladehi, Seoni'), iti('Poundi, Mandla')],
  },
  {
    year: '2009',
    title: 'Three institutions in one year',
    body: 'बैतूल में एक ITI शुरू हुआ, और मांझापुर में एक पब्लिक स्कूल व एक B.Ed. कॉलेज जुड़े।',
    kind: 'school',
    institutions: [
      iti('Bharat Bharti, Betul'),
      { name: 'Satpuda Valley Public School', place: 'Manjhapur, Balaghat', affiliation: 'CBSE & MP Board, Bhopal' },
      {
        name: 'Satpuda B.Ed. College',
        place: 'Manjhapur, Balaghat',
        affiliation: 'Rani Durgawati Vishwavidyalaya & NCTE, New Delhi',
      },
    ],
  },
  {
    year: '2010',
    title: 'The Manjhapur ITI',
    body: 'मांझापुर कैंपस में Satpuda Private ITI शुरू हुआ — जो आज समूह का प्रमुख (फ्लैगशिप) संस्थान है।',
    kind: 'campus',
    institutions: [iti('Manjhapur, Balaghat')],
  },
  {
    year: '2011',
    title: 'North to Rewa',
    body: 'चोरहटा, रीवा में ITI के साथ नेटवर्क विंध्य क्षेत्र तक पहुँचा।',
    kind: 'campus',
    institutions: [iti('Chorhata, Rewa')],
  },
  {
    year: '2012',
    title: 'A second Chhindwara ITI',
    body: 'छिंदवाड़ा में वेयरहाउस के पास Satpuda Private ITI शुरू हुआ।',
    kind: 'campus',
    institutions: [iti('Near Warehouse, Chhindwara')],
  },
  {
    year: '2015',
    title: 'Multai',
    body: 'चिखली खुर्द, मुलताई में Satpuda Private ITI शुरू हुआ।',
    kind: 'campus',
    institutions: [iti('Chikhali Khurd, Multai')],
  },
  {
    year: '2016',
    title: 'Three new ITIs',
    body: 'एक ही वर्ष में इटारसी, सारनी और मऊगंज नेटवर्क से जुड़े।',
    kind: 'campus',
    institutions: [iti('Itarsi'), iti('Bagdona, Sarni'), iti('Mauganj, Rewa')],
  },
  {
    year: '2017',
    title: '587 trainees placed',
    body: '11 कैंपस ड्राइव में 587 प्रशिक्षुओं का प्लेसमेंट हुआ।',
    kind: 'record',
    institutions: [],
  },
  {
    year: '2018',
    title: 'Peak placement year',
    body: '23 कैंपस ड्राइव के ज़रिए 1,044 प्रशिक्षुओं का प्लेसमेंट — समूह का अब तक का सबसे सफल वर्ष।',
    kind: 'record',
    institutions: [],
  },
  {
    year: '2021',
    title: '94% placement rate',
    body: '10 कैंपस ड्राइव में 632 प्रशिक्षुओं का प्लेसमेंट हुआ।',
    kind: 'record',
    institutions: [],
  },
  {
    year: '2022',
    title: '23 years of technical education',
    body: 'Satpuda Group ने ITI, स्कूल, पॉलिटेक्निक और शिक्षा महाविद्यालयों के साथ 23 वर्ष (1999–2022) पूरे किए।',
    kind: 'legacy',
    institutions: [],
  },
];

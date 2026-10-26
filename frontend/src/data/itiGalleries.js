/**
 * Campus galleries supplied by the institute itself — joined to a profile
 * when its campus page publishes no gallery of its own.
 *
 * The photographs in each campus's folder of the institute's "ITI HEAD AND
 * ITI PICS" Drive (2026-10-25), all of them except the principal's portrait:
 * Kundipura's 15, Seoni's 22 — its folder also holds newspaper cuttings
 * about the institute ("In the news") — and Mandla's 6.
 *
 * Warehouse, Multai, Katangi, Itarsi and Betul (2026-10-25) are chosen from
 * their folders rather than taken whole: a run of near-identical shots of one
 * moment keeps its clearest frame, a photograph uploaded twice appears once,
 * and frames stamped with a GPS-camera overlay give way to unstamped ones of
 * the same event. Warehouse's folder holds only the institute's photo
 * collages, so its gallery is those collages. Sarni's Drive folder holds only
 * the building and the principal; its gallery is the 14 photographs the
 * institute supplied separately on 2026-10-26 (all of them), with the
 * building. Baihar and Budhi
 * (2026-10-26) are chosen the same way; Budhi's photographs are all of its
 * Vishwakarma Jayanti celebration.
 *
 * Manjhapur's gallery, as the institute asked, joins three sources: its
 * campus page's four photographs, the Drive's "POLY" folder (a school's
 * industrial visit to the campus workshop, and seminars and classes), and
 * the eight photographs of the homepage gallery (media.js). The website's
 * photographs carry no `credit` and have no separate thumbnail. Each is shipped twice — `src` at up
 * to 1600px for the viewer, `thumb` at up to 900px for the grid — except the
 * building photographs, which are small enough to ship once. Captions
 * describe only what the photograph shows; `album` groups them for the
 * gallery's filter. The order sets the layout: every fifth photograph is a
 * feature tile.
 */

import kundipuraBuilding from '../assets/images/institutes/campus/kundipura-building.webp';
import manjhapurBuilding from '../assets/images/institutes/campus/manjhapur-building.webp';
import manjhapurWorkshop from '../assets/images/institutes/campus/manjhapur-workshop.webp';
import manjhapurWiring from '../assets/images/institutes/campus/manjhapur-wiring-project.webp';
import manjhapurStaff from '../assets/images/institutes/campus/manjhapur-staff.webp';
import mandlaBuilding from '../assets/images/institutes/campus/mandla-building.webp';
import seoniBuilding from '../assets/images/institutes/campus/seoni-building.webp';
import warehouseBuilding from '../assets/images/institutes/campus/warehouse-building.webp';
import multaiBuilding from '../assets/images/institutes/campus/multai-building.webp';
import katangiBuilding from '../assets/images/institutes/campus/katangi-building.webp';
import itarsiBuilding from '../assets/images/institutes/campus/itarsi-building.webp';
import betulBuilding from '../assets/images/institutes/campus/betul-building.webp';
import baiharBuilding from '../assets/images/institutes/campus/baihar-building.webp';
import budhiBuilding from '../assets/images/institutes/campus/budhi-building.webp';
import sarniBuilding from '../assets/images/institutes/campus/sarni-building.webp';
import { photos } from './media';

const GALLERY = '../assets/images/institutes/gallery/';
const galleryFiles = import.meta.glob('../assets/images/institutes/gallery/*/*.webp', {
  eager: true,
  import: 'default',
});

const CREDIT = 'Satpuda ITI';

/** A photograph from one campus's gallery folder. */
const supplied = (campus) => (slug, album, alt) => ({
  src: galleryFiles[`${GALLERY}${campus}/${slug}.webp`],
  thumb: galleryFiles[`${GALLERY}${campus}/${slug}.thumb.webp`],
  album,
  alt,
  credit: CREDIT,
});

const kundipura = supplied('kundipura');
const seoni = supplied('seoni');
const mandla = supplied('mandla');
const manjhapur = supplied('manjhapur');
const warehouse = supplied('warehouse');
const multai = supplied('multai');
const katangi = supplied('katangi');
const itarsi = supplied('itarsi');
const betul = supplied('betul');
const baihar = supplied('baihar');
const budhi = supplied('budhi');
const sarni = supplied('sarni');
/** A photograph from the institute's website, under a caption of its own. */
const website = (src, album, alt) => ({ src, album, alt });
/** A campus's own building photograph, shipped once (it is small). */
const building = (src, album, alt) => ({ src, album, alt, credit: CREDIT });

export const itiGalleries = {
  'chhindwara-kundipura': [
    kundipura('awards-trophies', 'Campus life', 'वर्कशॉप हॉल में ट्रॉफ़ी और पुरस्कारों के साथ प्रशिक्षु और प्रशिक्षक'),
    kundipura('speech-stage', 'Campus life', 'कैंपस मैदान में मंच से माइक पर संबोधित करते प्रशिक्षु'),
    kundipura('project-model', 'Campus life', 'अपने प्रोजेक्ट मॉडल के साथ प्रशिक्षु'),
    kundipura('tree-plantation', 'Campus life', 'कैंपस में पौधारोपण करते प्रशिक्षु और स्टाफ़'),
    kundipura('environment-day-rally', 'Campus life', 'विश्व पर्यावरण दिवस के बैनर के साथ सड़क पर जागरूकता रैली निकालते प्रशिक्षु'),
    kundipura('industrial-visit-group', 'Group photos', 'औद्योगिक भ्रमण के बैनर के साथ प्रशिक्षुओं और प्रशिक्षकों की समूह फ़ोटो'),
    kundipura('volleyball-ground', 'Sports', 'सजे हुए कैंपस मैदान में वॉलीबॉल खेलते प्रशिक्षु'),
    kundipura('volleyball-match', 'Sports', 'रंगीन जर्सी में वॉलीबॉल मैच खेलती प्रशिक्षुओं की टीमें'),
    kundipura('seminar-hall', 'Campus life', 'हॉल में एक सत्र के दौरान बैठे प्रशिक्षु'),
    kundipura('skill-training-centre-group', 'Group photos', 'Skill Training Center में प्रशिक्षुओं और स्टाफ़ की समूह फ़ोटो'),
    kundipura('workshop-havan', 'Celebrations', 'वर्कशॉप में हवन-पूजन करते प्रशिक्षक और प्रशिक्षु'),
    kundipura('workshop-puja', 'Celebrations', 'फूलों से सजी वर्कशॉप में पूजा के लिए बैठे प्रशिक्षु और स्टाफ़'),
    kundipura('community-meal', 'Celebrations', 'वर्कशॉप में सामूहिक भोज करते प्रशिक्षु'),
    kundipura('group-on-steps', 'Group photos', 'सीढ़ियों पर बैठे प्रशिक्षुओं और प्रशिक्षकों की समूह फ़ोटो'),
    {
      src: kundipuraBuilding,
      album: 'Campus life',
      alt: 'Satpuda Private I.T.I. Kundipura, छिंदवाड़ा का भवन',
      credit: CREDIT,
    },
  ],
  seoni: [
    seoni('farewell-group', 'Celebrations', 'Farewell समारोह के लिए सजे वर्कशॉप हॉल में प्रशिक्षुओं और स्टाफ़ की समूह फ़ोटो'),
    seoni('visit-tata-motors', 'Industrial visits', 'औद्योगिक भ्रमण के बैनर के साथ Tata Motors के अधिकृत सर्विस स्टेशन पर प्रशिक्षु'),
    seoni('news-open-campus-midea', 'In the news', 'अख़बार में: सतपुड़ा आईटीआई में Midea India, पुणे के ओपन कैंपस की ख़बर'),
    seoni('vishwakarma-puja-group', 'Celebrations', 'विश्वकर्मा जयंती पर वर्कशॉप में पूजा के बाद प्रशिक्षुओं और स्टाफ़ की समूह फ़ोटो'),
    seoni('yoga-surya-namaskar', 'Yoga', 'संस्थान भवन के सामने मैदान में सूर्य नमस्कार करते प्रशिक्षु'),
    seoni('visit-cattle-feed-plant', 'Industrial visits', 'औद्योगिक भ्रमण: पशुआहार संयंत्र, बण्डोल (सिवनी) के गेट पर प्रशिक्षु और प्रशिक्षक'),
    seoni('nasha-mukti-seminar', 'Campus life', 'नशा मुक्त भारत अभियान के कार्यक्रम में वर्कशॉप हॉल में अतिथि, स्टाफ़ और प्रशिक्षु'),
    seoni('news-open-campus-yashaswi', 'In the news', 'अख़बार में: यशस्वी ग्रुप की प्लेसमेंट ड्राइव — "ओपन कैंपस का हुआ आयोजन"'),
    seoni('vishwakarma-aarti', 'Celebrations', 'विश्वकर्मा जयंती पर वर्कशॉप में आरती करते स्टाफ़ और प्रशिक्षु'),
    seoni('news-nasha-mukti', 'In the news', 'अख़बार में: नशा मुक्ति जागरूकता अभियान के बैनर के साथ प्रशिक्षु'),
    seoni('tree-plantation', 'Campus life', 'संस्थान भवन के सामने पौधारोपण करते प्रशिक्षु और स्टाफ़'),
    seoni('visit-mp-transco', 'Industrial visits', 'औद्योगिक भ्रमण: मध्य प्रदेश पॉवर ट्रांसमिशन कंपनी के 132 के.वी. उपकेंद्र, सिवनी पर प्रशिक्षु'),
    seoni('news-open-campus-jabil', 'In the news', 'अख़बार में: "ओपन कैम्पस से छात्रों को मिला रोज़गार"'),
    seoni('farewell-hall', 'Celebrations', 'Farewell समारोह में वर्कशॉप हॉल में बैठे प्रशिक्षु'),
    seoni('news-admission-festival', 'In the news', 'अख़बार में: सतपुड़ा आईटीआई में वृक्षारोपण के साथ मनाया गया प्रवेश उत्सव'),
    seoni('classroom-session', 'Campus life', 'कक्षा में प्रशिक्षक का सत्र सुनते प्रशिक्षु'),
    seoni('nasha-mukti-group', 'Campus life', 'नशा मुक्त भारत अभियान के बैनर के साथ संस्थान भवन के सामने प्रशिक्षु, स्टाफ़ और अतिथि'),
    seoni('news-youth-skills-day', 'In the news', 'अख़बार में: सतपुड़ा आईटीआई में पौधारोपण कर मनाया विश्व युवा कौशल दिवस'),
    seoni('morning-exercise', 'Yoga', 'कैंपस मैदान में कतार में व्यायाम करते प्रशिक्षु'),
    {
      src: seoniBuilding,
      album: 'Campus life',
      alt: 'Satpuda Private I.T.I. सिवनी का भवन',
      credit: CREDIT,
    },
    seoni('yoga-campus', 'Yoga', 'सतपुड़ा औद्योगिक प्रशिक्षण केंद्र, सिवनी के भवन के सामने योग करते प्रशिक्षु'),
    seoni('news-vishwakarma-jayanti', 'In the news', 'अख़बार में: सतपुड़ा आईटीआई में विश्वकर्मा जयंती मनाई'),
  ],
  mandla: [
    mandla(
      'open-campus-banner',
      'Open campus',
      'ओपन कैंपस ट्रेनिंग एंड जॉब के बैनर (Maruti Suzuki, फोर व्हीलर मैकेनिक) के सामने प्रशिक्षुओं को संबोधित करते वक्ता'
    ),
    mandla('open-campus-workshop', 'Open campus', 'इलेक्ट्रीशियन वर्कशॉप में ओपन कैंपस कार्यक्रम के दौरान बेंचों पर बैठे प्रशिक्षु'),
    {
      src: mandlaBuilding,
      album: 'Campus life',
      alt: 'Satpuda Private I.T.I. मंडला का भवन',
      credit: CREDIT,
    },
    mandla('open-campus-address', 'Open campus', 'मेज़ के पास खड़े होकर प्रशिक्षुओं को जानकारी देते वक्ता'),
    mandla('open-campus-trainees', 'Open campus', 'वर्कशॉप में ओपन कैंपस कार्यक्रम सुनते प्रशिक्षु'),
    mandla('open-campus-hall', 'Open campus', 'ओपन कैंपस कार्यक्रम के दौरान प्रशिक्षुओं से भरा वर्कशॉप हॉल'),
  ],
  manjhapur: [
    manjhapur('school-visit-group-banner', 'School visit', 'सतपुड़ा प्रा. आई.टी.आई. मांझापुर के बोर्ड के नीचे औद्योगिक भ्रमण पर आए विद्यार्थियों की समूह फ़ोटो'),
    website(photos.garraWorkshop.src, 'Training', 'वर्कशॉप में बेंच वाइस पर हैकसॉ से काम करते Fitter ट्रेड के प्रशिक्षु'),
    manjhapur('seminar-speaker', 'Seminars', 'सभागार में माइक से विद्यार्थियों को संबोधित करते वक्ता'),
    website(photos.students01.src, 'Industrial visits', 'औद्योगिक भ्रमण के बैनर के साथ "Satpuda Valley" बस के पास प्रशिक्षु'),
    manjhapur('school-visit-electrical-lab', 'School visit', 'इलेक्ट्रीशियन वर्कशॉप में मोटर और पैनल देखती स्कूली छात्राएँ'),
    website(manjhapurWorkshop, 'Training', 'मांझापुर कैंपस की वर्कशॉप में मशीनों के साथ प्रशिक्षु और प्रशिक्षक'),
    manjhapur('seminar-hall', 'Seminars', 'सभागार में सत्र के दौरान बैठे विद्यार्थी'),
    manjhapur('school-visit-motors', 'School visit', 'इलेक्ट्रीशियन वर्कशॉप में बिजली की मोटरों के पास खड़ी छात्राएँ'),
    website(photos.practicalWorkshop.src, 'Training', 'इलेक्ट्रिकल लैब में उपकरणों के साथ प्रैक्टिकल करते प्रशिक्षु'),
    website(photos.students02.src, 'Industrial visits', 'औद्योगिक भ्रमण के दौरान एक फ़ैक्टरी परिसर में प्रशिक्षुओं की समूह फ़ोटो'),
    manjhapur('seminar-auditorium', 'Seminars', 'सजे हुए मंच वाले सभागार में बैठे विद्यार्थी'),
    manjhapur('school-visit-classroom', 'School visit', 'वर्कशॉप हॉल में डेस्क पर बैठे स्कूली विद्यार्थी'),
    website(manjhapurBuilding, 'Campus life', 'Satpuda (Pvt) I.T.I. Manjhapur का भवन'),
    website(photos.practicalTraining.src, 'Training', 'बेंच पर बिजली के सर्किट का प्रैक्टिकल देखते प्रशिक्षु'),
    manjhapur('school-visit-group-wide', 'School visit', 'औद्योगिक भ्रमण के बैनर के साथ विद्यार्थियों, शिक्षकों और स्टाफ़ की समूह फ़ोटो'),
    website(manjhapurWiring, 'Training', 'Domestic House Wiring प्रोजेक्ट के साथ मांझापुर कैंपस के प्रशिक्षु'),
    manjhapur('school-visit-group', 'School visit', '"औद्योगिक भ्रमण" के बैनर के साथ वर्कशॉप में स्कूली विद्यार्थियों और शिक्षकों की समूह फ़ोटो'),
    manjhapur('seminar-hall-wide', 'Seminars', 'सभागार में सत्र के दौरान विद्यार्थियों के बीच वक्ता'),
    website(photos.students03.src, 'Industrial visits', 'औद्योगिक भ्रमण में एक कंट्रोल रूम में जानकारी लेते प्रशिक्षु'),
    manjhapur('school-visit-instructor', 'School visit', 'Mechanic Diesel वर्कशॉप के पास विद्यार्थियों को समझाते प्रशिक्षक'),
    website(manjhapurStaff, 'Campus life', 'Satpuda Group of Institutions के विश्वकर्मा जयंती कार्यक्रम में स्टाफ़ का समूह फ़ोटो'),
    manjhapur('school-visit-briefing', 'School visit', 'वर्कशॉप में भ्रमण पर आए विद्यार्थियों को जानकारी देते प्रशिक्षक'),
    manjhapur('classroom-session', 'Seminars', 'कक्षा में सत्र के दौरान बैठे विद्यार्थी'),
    website(photos.campusPanorama.src, 'Training', 'बड़े हॉल में डेस्क पर बैठकर परीक्षा देते प्रशिक्षु'),
    manjhapur('school-visit-boys', 'School visit', 'वर्कशॉप में मशीन के पास जानकारी लेते स्कूली छात्र'),
    manjhapur('classroom-projector', 'Seminars', 'कक्षा में लैपटॉप और प्रोजेक्टर से सत्र लेते प्रशिक्षक'),
    manjhapur('school-visit-walkthrough', 'School visit', 'सतपुड़ा प्रा. आई.टी.आई. मांझापुर के बड़े वर्कशॉप हॉल से गुज़रते विद्यार्थी'),
    manjhapur('classroom-presentation', 'Seminars', 'प्रोजेक्टर स्क्रीन पर प्रस्तुति देखते विद्यार्थी'),
    website(photos.classroom.src, 'Training', 'कक्षा में बैठे प्रशिक्षु'),
    manjhapur('school-visit-desks', 'School visit', 'वर्कशॉप हॉल में बेंचों की कतारों पर बैठे विद्यार्थी'),
  ],
  'chhindwara-warehouse': [
    warehouse(
      'industrial-visits-collage',
      'Visits',
      'औद्योगिक भ्रमण — Skills Training Centre छिंदवाड़ा, डीज़ल लोको शेड और बिजली उपकेंद्र में प्रशिक्षु'
    ),
    warehouse('practical-work-collage', 'Training', 'प्रायोगिक कार्य — वर्कशॉप और लैब में इंजन, मशीनों और बिजली के उपकरणों पर प्रैक्टिकल करते प्रशिक्षु'),
    warehouse('campus-events-collage', 'Campus life', '15 अगस्त, मॉर्निंग प्रेयर, विश्वकर्मा पूजा, योग और पौधारोपण — कैंपस के कार्यक्रमों की झलकियाँ'),
    warehouse('school-visit-collage', 'Visits', 'संस्थान में सरकारी स्कूल के विद्यार्थी — समूह फ़ोटो, वर्कशॉप भ्रमण और कक्षा में'),
    warehouse('exam-project-collage', 'Training', 'परीक्षा और प्रोजेक्ट — प्रोजेक्ट मॉडल के साथ प्रशिक्षु, लिखित परीक्षा और मौखिक परीक्षा'),
    warehouse('sports-festival-collage', 'Campus life', 'खेल महोत्सव — क्रिकेट टीमें, मैदान पर प्रशिक्षु और पुरस्कार वितरण'),
    warehouse('placement-lecture-collage', 'Training', 'कैंपस प्लेसमेंट, गेस्ट लेक्चर और स्कूल विज़िट की झलकियाँ'),
    building(warehouseBuilding, 'Campus life', 'Satpuda Private I.T.I. Warehouse, छिंदवाड़ा का भवन'),
  ],
  multai: [
    multai('project-exhibition', 'Campus life', 'संस्थान भवन के सामने मेज़ों पर सजी प्रशिक्षुओं के प्रोजेक्ट मॉडलों की प्रदर्शनी'),
    multai('workshop-puja', 'Celebrations', 'वर्कशॉप में केले के पत्तों से सजे कलश के सामने पूजन करते स्टाफ़ और प्रशिक्षु'),
    multai('skill-convocation', 'Campus life', 'कौशल दीक्षांत समारोह (Skill Convocation) में मंच पर प्रमाण-पत्र लेता प्रशिक्षु'),
    multai('workshop-aarti', 'Celebrations', '"हुनर से रोज़गार" के बैनर वाली वर्कशॉप में चित्रों के सामने पूजा करते प्रशिक्षु'),
    multai('gathering', 'Campus life', 'संस्थान के एक कार्यक्रम में ज़मीन पर साथ बैठे प्रशिक्षु और अतिथि'),
    multai('workshop-group', 'Celebrations', 'पूजा के लिए सजी वर्कशॉप में प्रशिक्षुओं और स्टाफ़ की समूह फ़ोटो'),
    multai('tribute-collage', 'Celebrations', 'संस्थान भवन के बाहर महापुरुषों के चित्रों पर माल्यार्पण करते स्टाफ़ और ध्वज-स्तंभ पर पूजन'),
    building(multaiBuilding, 'Campus life', 'Satpuda Private I.T.I. मुलताई का भवन'),
  ],
  katangi: [
    katangi('visit-banner-institute', 'Industrial visits', '"औद्योगिक भ्रमण" के बैनर के साथ संस्थान भवन के सामने प्रशिक्षु और प्रशिक्षक'),
    katangi('solar-plant-session', 'Training', 'छत पर लगे सोलर पावर प्लांट के नीचे प्रशिक्षुओं को समझाते प्रशिक्षक'),
    katangi('visit-control-panel', 'Industrial visits', 'औद्योगिक भ्रमण: कंट्रोल पैनल के मीटर और स्विच देखते प्रशिक्षु'),
    katangi('campus-letters', 'Campus life', 'कक्षा में आयोजित कैंपस कार्यक्रम में पत्र लिए प्रशिक्षु, साथ में प्रशिक्षक और अतिथि'),
    building(katangiBuilding, 'Campus life', 'New Satpuda Private I.T.I. कटंगी का भवन'),
    katangi('visit-mine-group', 'Industrial visits', 'औद्योगिक भ्रमण: खुली खदान क्षेत्र में अधिकारियों के साथ प्रशिक्षुओं का समूह'),
    katangi('solar-panel-frame', 'Training', 'सोलर पैनल के ढाँचे को पास से देखते प्रशिक्षु'),
    katangi('visit-site-talk', 'Industrial visits', 'औद्योगिक भ्रमण में साइट पर अधिकारी से जानकारी लेते प्रशिक्षु'),
    katangi('visit-panel-room', 'Industrial visits', 'औद्योगिक भ्रमण: बिजली के पैनल रूम में झाँकते प्रशिक्षु'),
    katangi('visit-banner-bus', 'Industrial visits', '"औद्योगिक भ्रमण" के बैनर के साथ बस के पास प्रशिक्षुओं और प्रशिक्षकों की समूह फ़ोटो'),
  ],
  itarsi: [
    itarsi(
      'school-visit-nsqf',
      'School visit',
      'व्यावसायिक शिक्षा (NSQF) के औद्योगिक भ्रमण पर आए शासकीय विद्यालय, इटारसी के विद्यार्थी और शिक्षक'
    ),
    itarsi(
      'mega-drive-trophy',
      'Placement drives',
      '20 जुलाई 2026 की मेगा जॉइंट कैंपस प्लेसमेंट ड्राइव के पोस्टर के सामने प्रशिक्षुओं को ट्रॉफ़ी देते अतिथि'
    ),
    itarsi('machine-puja', 'Celebrations', 'वर्कशॉप में मशीनों की पूजा करते प्रशिक्षक'),
    itarsi('library-speech', 'Campus life', 'Satpuda Library में आयोजित कार्यक्रम में अपनी बात रखती प्रशिक्षु'),
    itarsi('school-visit-workshop', 'School visit', 'वर्कशॉप में प्रशिक्षकों से जानकारी लेती स्कूली छात्राएँ'),
    itarsi('flag-hoisting', 'Celebrations', 'संस्थान परिसर में ध्वजारोहण करते अतिथि, साथ में कतार में खड़े स्टाफ़ और प्रशिक्षु'),
    itarsi(
      'open-campus-selected',
      'Placement drives',
      '"Open Campus Placement Drive" के पोस्टर के सामने हाथों में पत्र लिए प्रशिक्षु और कंपनी प्रतिनिधि'
    ),
    itarsi('poster-honour', 'Campus life', 'अपने बनाए पोस्टर के साथ प्रशिक्षु का सम्मान करते अतिथि'),
    itarsi('open-campus-session', 'Placement drives', 'ओपन कैंपस प्लेसमेंट ड्राइव में कंपनी की जानकारी सुनते प्रशिक्षु'),
    itarsi('tools-puja', 'Celebrations', 'पूजा के लिए सजाए गए वर्कशॉप के औज़ारों के पास पूजन करते अतिथि'),
    itarsi('workshop-havan', 'Celebrations', 'वर्कशॉप में हवन में बैठे प्रशिक्षु और स्टाफ़'),
    itarsi('poster-review', 'Campus life', 'तिरंगे वाले पोस्टर के बारे में प्रशिक्षु से बात करते निर्णायक'),
    itarsi('interview-table', 'Placement drives', 'कंप्यूटर लैब में मेज़ पर उम्मीदवारों का इंटरव्यू लेते कंपनी प्रतिनिधि'),
    itarsi('farewell-stage', 'Celebrations', 'गुब्बारों से सजे Farewell मंच पर माइक से संबोधित करते प्रशिक्षक'),
    itarsi('cleanliness-drive', 'Campus life', 'स्वच्छता अभियान में इकट्ठा किए गए कचरे के पास खड़े प्रशिक्षु और प्रशिक्षक'),
    itarsi('library-event', 'Campus life', 'Satpuda Library में कार्यक्रम के दौरान बैठे अतिथि, स्टाफ़ और प्रशिक्षु'),
    itarsi('mega-drive-letter', 'Placement drives', 'मेगा जॉइंट कैंपस प्लेसमेंट ड्राइव के दौरान प्रशिक्षु को पत्र सौंपते अतिथि'),
    itarsi('community-meal', 'Celebrations', 'वर्कशॉप में कतार में बैठकर सामूहिक भोज करते प्रशिक्षु'),
    itarsi('poster-judging', 'Campus life', 'पोस्टर प्रतियोगिता में प्रशिक्षुओं के पोस्टर देखते निर्णायक'),
    building(itarsiBuilding, 'Campus life', 'Satpuda Private I.T.I. इटारसी का भवन'),
    itarsi('poster-line', 'Campus life', 'अपने बनाए पोस्टरों के साथ कतार में खड़े प्रशिक्षु'),
    itarsi('award-ceremony', 'Campus life', 'वर्कशॉप में आयोजित कार्यक्रम में प्रशिक्षु को ट्रॉफ़ी देते अतिथि'),
    itarsi('staff-meal', 'Celebrations', 'कार्यक्रम के दौरान वर्कशॉप में साथ नाश्ता करते स्टाफ़'),
    itarsi('job-sahi-session', 'Placement drives', 'Job Sahi पोस्टर वाले हॉल में सत्र के दौरान बैठे प्रशिक्षु'),
    itarsi('flag-base-puja', 'Celebrations', 'ध्वज-स्तंभ पर पुष्प अर्पित करते अतिथि'),
    itarsi('copa-lab', 'Campus life', 'COPA कंप्यूटर लैब में सत्र के दौरान बैठे प्रशिक्षु'),
    itarsi('decorated-altar', 'Celebrations', 'फूलों और पर्दों से सजा पूजा-स्थल'),
  ],
  betul: [
    betul('school-visit-group', 'School visit', '"प्रशिक्षण केन्द्र बैतूल" भवन के सामने भ्रमण पर आए स्कूली विद्यार्थियों की समूह फ़ोटो'),
    betul('interview', 'Placement drives', 'वर्कशॉप में कैंपस ड्राइव के दौरान उम्मीदवारों का इंटरव्यू लेते कंपनी प्रतिनिधि'),
    betul('puja-decoration', 'Celebrations', 'फूलों, केले के पत्तों और गुब्बारों से सजे पूजा-स्थल पर पूजन करते अतिथि'),
    betul('visit-transformer-plant', 'Industrial visits', 'औद्योगिक भ्रमण: फ़ैक्टरी में ट्रांसफ़ॉर्मर के कोर और वाइंडिंग देखते प्रशिक्षु'),
    betul('teachers-day', 'Celebrations', 'शिक्षक दिवस पर डॉ. सर्वपल्ली राधाकृष्णन के चित्र के सामने दीप प्रज्वलित करते प्रशिक्षक'),
    betul(
      'yuva-sangam-address',
      'Placement drives',
      'युवा संगम रोज़गार मेले में "Satpuda ITI Campus Drive" के बैनर के सामने प्रतिभागियों को संबोधित करते वक्ता'
    ),
    betul('school-visit-engine', 'School visit', 'Mechanic Diesel वर्कशॉप में इंजन के बारे में विद्यार्थियों को समझाते प्रशिक्षक'),
    betul('community-meal', 'Celebrations', 'वर्कशॉप में हरी दरी पर कतार में बैठकर भोजन करते प्रशिक्षु'),
    betul('visit-wood-panel-machine', 'Industrial visits', 'औद्योगिक भ्रमण: लकड़ी की शीट बनाने वाली मशीन की जानकारी लेते प्रशिक्षु'),
    betul('offer-letter', 'Placement drives', 'Satpuda Group Institutions के बोर्ड के सामने उम्मीदवार को पत्र सौंपते अधिकारी'),
    betul('workshop-havan', 'Celebrations', 'वर्कशॉप में हवन करते अतिथि, स्टाफ़ और प्रशिक्षु'),
    betul('campus-placement-session', 'Placement drives', 'वर्कशॉप में कैंपस प्लेसमेंट सत्र में बैठे प्रशिक्षु'),
    betul('school-visit-computer-lab', 'School visit', 'कंप्यूटर लैब में बैठी स्कूली छात्राएँ'),
    betul('ganesh-puja', 'Celebrations', 'फूलों और गुब्बारों से सजे गणेश जी के चित्र के सामने पूजन'),
    betul('visit-banner', 'Industrial visits', '"सतपुड़ा ITI" के औद्योगिक भ्रमण बैनर के साथ फ़ैक्टरी परिसर में प्रशिक्षु और प्रशिक्षक'),
    betul('visit-factory-gate', 'Industrial visits', 'औद्योगिक भ्रमण: एक फ़ैक्टरी के गेट पर प्रशिक्षुओं और प्रशिक्षकों की समूह फ़ोटो'),
    betul(
      'cii-skilling-banner',
      'Placement drives',
      'CII–राहुल बजाज सेंटर ऑफ़ एक्सीलेंस ऑन स्किलिंग के बैनर के साथ संस्थान कार्यालय के सामने प्रशिक्षु और स्टाफ़'
    ),
    betul('written-test', 'Placement drives', 'वर्कशॉप हॉल में लिखित परीक्षा देते उम्मीदवार'),
    betul('school-visit-diesel-workshop', 'School visit', 'Mechanic Diesel वर्कशॉप में इंजनों के पास खड़े स्कूली विद्यार्थी'),
    betul('flag-hoisting', 'Celebrations', 'संस्थान कार्यालय के सामने ध्वजारोहण के लिए एकत्र स्टाफ़ और प्रशिक्षु'),
    betul('office-group', 'Campus life', 'संस्थान कार्यालय के सामने प्रशिक्षुओं और स्टाफ़ की समूह फ़ोटो'),
    betul('investor-awareness', 'Campus life', 'वर्कशॉप में SEBI–NSE के निवेशक जागरूकता कार्यक्रम की प्रस्तुति देखते प्रशिक्षु'),
    betul('school-visit-crowd', 'School visit', 'वर्कशॉप में प्रशिक्षक को घेरकर जानकारी लेते स्कूली विद्यार्थी'),
    building(betulBuilding, 'Campus life', 'Satpuda Private I.T.I. बैतूल का कार्यालय'),
    betul('visit-plant-group', 'Industrial visits', 'औद्योगिक भ्रमण में एक संयंत्र परिसर में प्रशिक्षुओं और प्रशिक्षकों का समूह'),
    betul('school-visit-saikheda', 'School visit', 'संस्थान कार्यालय के सामने शासकीय उ.मा. विद्यालय, साईंखेड़ा के विद्यार्थी और शिक्षक'),
    betul(
      'yuva-sangam-stage',
      'Placement drives',
      'युवा संगम रोज़गार, स्वरोज़गार एवं प्रधानमंत्री नेशनल अप्रेंटिसशिप मेले में मंच पर प्रतिभागी को पत्र सौंपते अतिथि'
    ),
    betul('workshop-group', 'Campus life', 'वर्कशॉप में प्रशिक्षुओं और स्टाफ़ की समूह फ़ोटो'),
    betul('school-visit-badgaon', 'School visit', 'शैक्षणिक भ्रमण पर आए पी.एम. श्री एकीकृत शासकीय हाई स्कूल, बड़गाँव के विद्यार्थी और शिक्षक'),
  ],
  baihar: [
    baihar(
      'open-campus-group',
      'Placement drive',
      'Adani Solar की ओपन कैंपस प्लेसमेंट ड्राइव के पोस्टर के साथ संस्थान भवन के सामने प्रशिक्षु और स्टाफ़'
    ),
    baihar('fitter-workshop-group', 'Placement drive', 'Fitter वर्कशॉप में प्रशिक्षुओं और प्रशिक्षकों की समूह फ़ोटो'),
    baihar('teachers-day-panel', 'Celebrations', 'शिक्षक दिवस पर डॉ. सर्वपल्ली राधाकृष्णन के चित्र के साथ बैठे प्रशिक्षक'),
    baihar('puja-decoration', 'Celebrations', 'वर्कशॉप में केले के पत्तों और गुब्बारों से सजे पूजा-स्थल के दोनों ओर खड़े प्रशिक्षु'),
    baihar('fitter-workshop-table', 'Placement drive', 'Fitter वर्कशॉप में मेज़ के पीछे खड़े प्रशिक्षु और प्रशिक्षक'),
    baihar('campus-front-group', 'Placement drive', '"महाराणा प्रताप प्रा. आई.टी.आई." के बोर्ड के नीचे प्रशिक्षुओं और स्टाफ़ की समूह फ़ोटो'),
    baihar('workshop-programme', 'Celebrations', 'वर्कशॉप में कार्यक्रम के दौरान बैठे प्रशिक्षक और प्रशिक्षु'),
    baihar('puja-group', 'Celebrations', 'पूजा के लिए सजी वर्कशॉप में प्रशिक्षुओं की समूह फ़ोटो'),
    building(baiharBuilding, 'Campus life', 'Maharana Pratap Private I.T.I. बैहर का भवन'),
  ],
  budhi: [
    budhi(
      'vishwakarma-banner',
      'Vishwakarma Jayanti',
      'संस्थान भवन पर "भगवान श्री विश्वकर्मा जयंती में आप सभी का हार्दिक स्वागत है" का बैनर'
    ),
    budhi('puja-altar', 'Vishwakarma Jayanti', 'फूलों और गुब्बारों से सजे पूजा-स्थल पर पूजन करते स्टाफ़'),
    budhi('havan', 'Vishwakarma Jayanti', 'हवन में आहुति देते स्टाफ़, पीछे खड़े प्रशिक्षु'),
    budhi('havan-preparation', 'Vishwakarma Jayanti', 'पूजा-स्थल पर हवन की तैयारी करते स्टाफ़'),
    budhi('seated-gathering', 'Vishwakarma Jayanti', 'पूजा के दौरान दरी पर बैठे प्रशिक्षु, स्टाफ़ और अतिथि'),
    budhi('puja-seated', 'Vishwakarma Jayanti', 'पूजा-स्थल के सामने बैठकर पूजन करते स्टाफ़ और प्रशिक्षु'),
    budhi('puja-hall', 'Vishwakarma Jayanti', 'गुब्बारों और रोशनी से सजे हॉल में पूजा'),
    budhi('trainees-gathering', 'Vishwakarma Jayanti', 'विश्वकर्मा जयंती के कार्यक्रम में बैठे प्रशिक्षु'),
    budhi('aarti', 'Vishwakarma Jayanti', 'दीपों और फूलों से सजे पूजा-स्थल पर आरती'),
    building(budhiBuilding, 'Campus life', 'New Satpuda Private I.T.I. बूढ़ी, बालाघाट का भवन'),
  ],
  sarni: [
    sarni(
      'yoga-tableau',
      'Celebrations',
      'तिरंगे गुब्बारों से सजी "करो योग, रहो निरोग (सूर्य नमस्कार)" की झाँकी के साथ मैदान में प्रशिक्षु और स्टाफ़'
    ),
    sarni('annual-function-dance', 'Annual function', 'वार्षिकोत्सव "गूंज" के मंच पर नृत्य प्रस्तुत करती प्रशिक्षु'),
    sarni('trainees-at-building', 'Campus life', 'संस्थान भवन के सामने प्रशिक्षुओं की समूह फ़ोटो'),
    sarni('campus-drive-poster', 'Campus life', 'कार्यालय में Job Sahi की "Open Mega Campus Drive" का पोस्टर दिखाते स्टाफ़'),
    sarni('annual-function-address', 'Annual function', 'वार्षिकोत्सव "गूंज" के मंच से माइक पर संबोधित करते वक्ता'),
    sarni('annual-function-group', 'Annual function', 'वार्षिकोत्सव "गूंज" के मंच पर स्टाफ़ और प्रशिक्षुओं की समूह फ़ोटो'),
    sarni('workshop-group', 'Campus life', 'वर्कशॉप हॉल में प्रशिक्षुओं की समूह फ़ोटो'),
    sarni('annual-function-stage', 'Annual function', 'वार्षिकोत्सव "गूंज" के मंच पर प्रशिक्षु'),
    sarni('staff-group', 'Campus life', '"प्राइवेट आई.टी.आई." लिखे संस्थान भवन के सामने स्टाफ़ की समूह फ़ोटो'),
    sarni('lab-celebration', 'Celebrations', 'Electrician Lab में गुब्बारों और पर्दों से सजे मंच पर दो प्रशिक्षु छात्राएँ'),
    sarni('campus-ground-group', 'Campus life', 'संस्थान भवन के पास मैदान में प्रशिक्षुओं की समूह फ़ोटो'),
    sarni('annual-function-winners', 'Annual function', 'वार्षिकोत्सव "गूंज" में पदक और ट्रॉफ़ी के साथ प्रशिक्षु'),
    sarni('yoga-tableau-staff', 'Celebrations', '"करो योग, रहो निरोग" की झाँकी के सामने स्टाफ़ और अतिथि'),
    sarni('workshop-motor-group', 'Campus life', 'वर्कशॉप में AC मोटर के पास प्रशिक्षुओं की समूह फ़ोटो'),
    building(sarniBuilding, 'Campus life', 'Satpuda Private I.T.I. सारनी का भवन'),
  ],
};

/**
 * Campus galleries supplied by the institute itself — joined to a profile
 * when its campus page publishes no gallery of its own.
 *
 * The photographs in each campus's folder of the institute's "ITI HEAD AND
 * ITI PICS" Drive (2026-10-25), all of them except the principal's portrait:
 * Kundipura's 15, Seoni's 22 — its folder also holds newspaper cuttings
 * about the institute ("In the news") — and Mandla's 6.
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
/** A photograph from the institute's website, under a caption of its own. */
const website = (src, album, alt) => ({ src, album, alt });

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
};

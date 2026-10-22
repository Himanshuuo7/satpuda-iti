/**
 * Training & Placement partnerships — the homepage section inviting
 * companies, training providers and organisations to work with Satpuda ITI.
 *
 * The officer's name, designations and mobile number were supplied by the
 * institute. The photograph is the one Satpuda College of Engineering &
 * Polytechnic publishes for him on its placements page
 * (https://satpudaengineeringcollege.com/placements, "Dr. Gorakhnath
 * bhure.webp", retrieved 2026-10-22), cropped to head and shoulders; its
 * faculty list publishes a second photograph of the same person with the
 * role "CEO jobsahi, Training and placement officer". No email address is
 * published, so none is given.
 *
 * As across the site, headings, names, designations, labels and buttons are
 * in English and every paragraph is in Hindi (rendered with lang="hi").
 */

import tpoPhoto from '../assets/images/placement/tpo-gorakhnath-bhure.webp';

const TPO_MOBILE = '+91 9424752071';
const WHATSAPP = `https://wa.me/${TPO_MOBILE.replace(/\D/g, '')}`;

/** A WhatsApp chat with the officer, the visitor's message already typed. */
export const whatsappWith = (text) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const trainingPlacementOfficer = {
  name: 'Dr. Gorakhnath Bhure',
  designation: 'Training & Placement Officer',
  additionalDesignation: 'CEO, JobSahi',
  summary:
    'Dr. Gorakhnath Bhure उद्योग से जुड़ाव, भर्ती समन्वय और प्रशिक्षण साझेदारियों के लिए संपर्क सूत्र हैं। कैंपस भर्ती, औद्योगिक प्रशिक्षण, अप्रेंटिसशिप और कौशल विकास की संयुक्त पहलों पर चर्चा के लिए उनसे संपर्क करें।',
  mobile: TPO_MOBILE,
  whatsappHref: WHATSAPP,
  photo: {
    src: tpoPhoto,
    alt: 'Dr. Gorakhnath Bhure, Training & Placement Officer, in a navy suit',
    width: 640,
    height: 800,
  },
};

export const partnerships = {
  eyebrow: 'Industry • Training • Career Opportunities',
  title: "Let's Build a Skilled Workforce Together",
  description:
    'Satpuda ITI के साथ साझेदारी करें — उभरती तकनीकी प्रतिभाओं से जुड़ें, उद्योग-उन्मुख प्रशिक्षण दें और सार्थक करियर के अवसर तैयार करें। कौशल विकास और कार्यबल की तैयारी के लिए प्रतिबद्ध कंपनियों, प्रशिक्षण प्रदाताओं और संगठनों का हम स्वागत करते हैं।',
  // `topic` completes the (English) WhatsApp message each card opens with.
  opportunities: [
    {
      id: 'recruitment',
      title: 'Campus Recruitment',
      description: 'प्रशिक्षित आईटीआई प्रतिभाओं से जुड़ें।',
      topic: 'campus recruitment',
    },
    {
      id: 'training',
      title: 'Industrial Training',
      description: 'व्यावहारिक कार्यशालाएँ और तकनीकी प्रशिक्षण आयोजित करें।',
      topic: 'industrial training',
    },
    {
      id: 'apprenticeships',
      title: 'Apprenticeships & Internships',
      description: 'प्रत्यक्ष, व्यावहारिक रूप से सीखने के अवसर तैयार करें।',
      topic: 'apprenticeships and internships',
    },
    {
      id: 'csr',
      title: 'Foundation & CSR Partnerships',
      description: 'व्यावसायिक प्रशिक्षण और कौशल विकास में सहयोग करें।',
      topic: 'a foundation or CSR partnership',
    },
  ],
  closing: 'आइए, मिलकर तकनीकी शिक्षा और उद्योग के बीच की दूरी को पाटें।',
  bridge: { from: 'Satpuda ITI', to: 'Industry' },
};

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
    'Dr. Gorakhnath Bhure is a point of contact for industry engagement, recruitment coordination and training partnerships. Connect with him to discuss campus hiring, industrial training, apprenticeships and collaborative skill-development initiatives.',
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
    'Partner with Satpuda ITI to connect with emerging technical talent, deliver industry-oriented training and create meaningful career opportunities. We welcome companies, training providers and organizations committed to skill development and workforce readiness.',
  // `topic` completes the WhatsApp message each card opens with.
  opportunities: [
    {
      id: 'recruitment',
      title: 'Campus Recruitment',
      description: 'Connect with trained ITI talent.',
      topic: 'campus recruitment',
    },
    {
      id: 'training',
      title: 'Industrial Training',
      description: 'Conduct practical workshops and technical training.',
      topic: 'industrial training',
    },
    {
      id: 'apprenticeships',
      title: 'Apprenticeships & Internships',
      description: 'Create hands-on learning opportunities.',
      topic: 'apprenticeships and internships',
    },
    {
      id: 'csr',
      title: 'Foundation & CSR Partnerships',
      description: 'Support vocational training and skill development.',
      topic: 'a foundation or CSR partnership',
    },
  ],
  closing: "Let's work together to bridge the gap between technical education and industry.",
  bridge: { from: 'Satpuda ITI', to: 'Industry' },
};

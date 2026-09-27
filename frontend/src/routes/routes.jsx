import { lazy } from 'react';
import PlaceholderPage from '../pages/PlaceholderPage';

/**
 * Route table.
 *
 * The homepage is code-split so the placeholder routes stay cheap to enter.
 * Every non-home route renders the shared placeholder for this phase — when a
 * real page is built, swap its `element` here and nothing else changes.
 */
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));

export const placeholderRoutes = [
  {
    path: '/courses',
    title: 'Trades & Courses.',
    eyebrow: 'Programs',
    description:
      'Detailed trade pages for Electrician, Fitter, Mechanic Diesel and COPA are being prepared, covering curriculum, workshop facilities and intake.',
  },
  {
    path: '/courses/electrician',
    title: 'Electrician.',
    eyebrow: 'Trade · CTS · NCVT',
    description:
      'The Electrician trade page is being prepared. The trade runs under the Craftsman Training Scheme, affiliated to NCVT, New Delhi.',
  },
  {
    path: '/courses/fitter',
    title: 'Fitter.',
    eyebrow: 'Trade · CTS · NCVT',
    description:
      'The Fitter trade page is being prepared. The trade runs under the Craftsman Training Scheme, affiliated to NCVT, New Delhi.',
  },
  {
    path: '/courses/diesel-mechanic',
    title: 'Mechanic Diesel.',
    eyebrow: 'Trade · CTS · NCVT',
    description:
      'The Mechanic Diesel trade page is being prepared. The trade runs under the Craftsman Training Scheme, affiliated to NCVT, New Delhi.',
  },
  {
    path: '/courses/copa',
    title: 'COPA.',
    eyebrow: 'Trade · CTS · NCVT',
    description:
      'The COPA (Computer Operator and Programming Assistant) trade page is being prepared. The trade runs under the Craftsman Training Scheme, affiliated to NCVT, New Delhi.',
  },
  {
    path: '/training',
    title: 'Training.',
    eyebrow: 'Learning Process',
    description:
      'The full training section — learning process, curriculum, competency-based learning and faculty development — is being prepared.',
  },
  {
    path: '/placements',
    title: 'Placements.',
    eyebrow: 'Placement Cell',
    description:
      'The complete placement section, including the year-by-year record, recruiters, career path and entrepreneurship development, is being prepared. A summary appears on the homepage.',
  },
  {
    path: '/campuses',
    title: 'Campuses.',
    eyebrow: 'Network',
    description:
      'Individual campus pages are being prepared. Every campus address, phone number and email is listed on the homepage campus section.',
  },
  {
    path: '/gallery',
    title: 'Gallery.',
    eyebrow: 'Campus Life',
    description:
      'The full photo gallery is being prepared. A preview of campus, classroom and workshop photography appears on the homepage.',
  },
  {
    path: '/contact',
    title: 'Contact.',
    eyebrow: 'Get in touch',
    description:
      'The contact page with an enquiry form is being prepared. Head office and campus contact details are published in the footer and campus section.',
  },
  {
    path: '/admission',
    title: 'Admission.',
    eyebrow: 'Apply',
    description:
      'Online admission enquiry is being prepared. To apply now, call the enquiry number below or email the institute directly.',
  },
];

export { Home, About, PlaceholderPage };

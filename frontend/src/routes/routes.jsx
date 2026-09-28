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
const TradePage = lazy(() => import('../pages/TradePage'));

export const placeholderRoutes = [
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

/**
 * Old and index trade URLs. The trade pages moved from /courses/* to /trades/*,
 * and the trades overview lives on the homepage, so these only redirect.
 */
export const tradeRedirects = [
  { from: '/trades', to: { pathname: '/', hash: '#trades' } },
  { from: '/courses', to: { pathname: '/', hash: '#trades' } },
  { from: '/courses/electrician', to: '/trades/electrician' },
  { from: '/courses/fitter', to: '/trades/fitter' },
  { from: '/courses/diesel-mechanic', to: '/trades/mechanic-diesel' },
  { from: '/courses/copa', to: '/trades/copa' },
];

export { Home, About, TradePage, PlaceholderPage };

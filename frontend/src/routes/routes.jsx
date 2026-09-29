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
const PlacementPage = lazy(() => import('../pages/PlacementPage'));
const TrainingPage = lazy(() => import('../pages/TrainingPage'));
const ActivityPage = lazy(() => import('../pages/ActivityPage'));

export const placeholderRoutes = [
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
 * Old and index URLs that only redirect. The trade pages moved from /courses/*
 * to /trades/*, the trades overview lives on the homepage, and the rest are the
 * institute's own addresses for pages that now live in the Placement and
 * Activity sections.
 */
export const redirects = [
  { from: '/trades', to: { pathname: '/', hash: '#trades' } },
  { from: '/courses', to: { pathname: '/', hash: '#trades' } },
  { from: '/courses/electrician', to: '/trades/electrician' },
  { from: '/courses/fitter', to: '/trades/fitter' },
  { from: '/courses/diesel-mechanic', to: '/trades/mechanic-diesel' },
  { from: '/courses/copa', to: '/trades/copa' },
  // The institute's own address for the section is singular.
  { from: '/placement', to: '/placements' },
  // The institute's Activity menu links these as pages of their own.
  { from: '/activities', to: '/activity/students-life' },
  { from: '/safety', to: '/activity/safety' },
  { from: '/gallery', to: '/activity/gallery' },
  { from: '/events', to: '/activity/news' },
  // These four briefly lived under Training.
  { from: '/training/activities', to: '/activity/students-life' },
  { from: '/training/safety', to: '/activity/safety' },
  { from: '/training/gallery', to: '/activity/gallery' },
  { from: '/training/news', to: '/activity/news' },
];

export { Home, About, TradePage, PlacementPage, TrainingPage, ActivityPage, PlaceholderPage };

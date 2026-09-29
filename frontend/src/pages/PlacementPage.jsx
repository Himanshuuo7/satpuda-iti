import { useParams } from 'react-router-dom';

import SectionLayout from '../components/section/SectionLayout';
import Overview from '../components/placement/Overview';
import Interface from '../components/placement/Interface';
import CareerRoutes from '../components/placement/CareerRoutes';
import Enterprise from '../components/placement/Enterprise';
import Recruiters from '../components/placement/Recruiters';
import SkillConnect from '../components/placement/SkillConnect';
import Details from '../components/placement/Details';
import { NotFoundPage } from './PlaceholderPage';
import useSeo from '../hooks/useSeo';
import { placementPageBySlug } from '../data/placementPages';
import { placementSection } from '../components/placement/section';

/**
 * Placement — /placements and /placements/:slug.
 *
 * One route renders the whole section so the sub-navigation stays mounted
 * while the reader moves between pages (its indicator slides instead of
 * resetting); SectionLayout keys the page body by slug.
 */

const VIEWS = {
  'industrial-interface': Interface,
  'career-path': CareerRoutes,
  entrepreneurship: Enterprise,
  recruiters: Recruiters,
  'skill-connect': SkillConnect,
  details: Details,
};

const OVERVIEW_SEO = {
  title: 'Placement | Satpuda ITI — Placement Cell, Recruiters & Placement Record',
  description:
    'The Satpuda ITI Placement & Guidance Cell: industrial interface, career path, entrepreneurship development, recruiters, Skill Connect and year-by-year placement details. 2456 campus placements in last 3 years.',
};

function PlacementView({ page }) {
  useSeo(
    page
      ? { title: `${page.label} | Placement | Satpuda ITI`, description: `${page.label} — Satpuda ITI Placement Cell. ${page.summary}` }
      : OVERVIEW_SEO
  );

  const View = page ? VIEWS[page.slug] : Overview;

  return (
    <SectionLayout section={placementSection} pageKey={page?.slug ?? 'overview'}>
      <View page={page} />
    </SectionLayout>
  );
}

export function PlacementPage() {
  const { slug } = useParams();
  const page = slug ? placementPageBySlug[slug] : null;
  if (slug && !page) return <NotFoundPage />;
  return <PlacementView page={page} />;
}

export default PlacementPage;

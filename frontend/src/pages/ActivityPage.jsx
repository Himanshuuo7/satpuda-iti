import { Navigate, useParams } from 'react-router-dom';

import SectionLayout from '../components/section/SectionLayout';
import Activities from '../components/activity/Activities';
import Safety from '../components/activity/Safety';
import Gallery from '../components/activity/Gallery';
import News from '../components/activity/News';
import { NotFoundPage } from './PlaceholderPage';
import useSeo from '../hooks/useSeo';
import { activityPageBySlug, activityPages } from '../data/activityPages';
import { activitySection } from '../components/activity/section';

/**
 * Activity — /activity/:slug.
 *
 * As on the institute's website, Activity is a menu of four pages with no
 * page of its own, so /activity alone goes to the first of them. One route
 * renders the whole section so the sub-navigation stays mounted while the
 * reader moves between pages; SectionLayout keys the page body by slug.
 */

const VIEWS = {
  'students-life': Activities,
  safety: Safety,
  gallery: Gallery,
  news: News,
};

function ActivityView({ page }) {
  useSeo({
    title: `${page.label} | Activity | Satpuda ITI`,
    description: `${page.label} — Satpuda ITI. ${page.summary}`,
  });

  const View = VIEWS[page.slug];

  return (
    <SectionLayout section={activitySection} pageKey={page.slug}>
      <View page={page} />
    </SectionLayout>
  );
}

export function ActivityPage() {
  const { slug } = useParams();
  if (!slug) return <Navigate to={activityPages[0].to} replace />;
  const page = activityPageBySlug[slug];
  if (!page) return <NotFoundPage />;
  return <ActivityView page={page} />;
}

export default ActivityPage;

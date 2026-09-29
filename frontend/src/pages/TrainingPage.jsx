import { useParams } from 'react-router-dom';

import SectionLayout from '../components/section/SectionLayout';
import TrainingOverview from '../components/training/TrainingOverview';
import LearningProcess from '../components/training/LearningProcess';
import AdmissionToPlacement from '../components/training/AdmissionToPlacement';
import Curriculum from '../components/training/Curriculum';
import Holistic from '../components/training/Holistic';
import Competency from '../components/training/Competency';
import HrDevelopment from '../components/training/HrDevelopment';
import { NotFoundPage } from './PlaceholderPage';
import useSeo from '../hooks/useSeo';
import { trainingPageBySlug } from '../data/trainingPages';
import { trainingSection } from '../components/training/section';

/**
 * Training — /training and /training/:slug.
 *
 * One route renders the whole section so the sub-navigation stays mounted
 * while the reader moves between pages (its indicator slides instead of
 * resetting); SectionLayout keys the page body by slug.
 */

const VIEWS = {
  'learning-process': LearningProcess,
  'admission-to-placement': AdmissionToPlacement,
  curriculum: Curriculum,
  'holistic-development': Holistic,
  competency: Competency,
  'human-resource-development': HrDevelopment,
};

const OVERVIEW_SEO = {
  title: 'Training | Satpuda ITI — Learning Process, Curriculum & Competency-Based Learning',
  description:
    'How Satpuda ITI trains: the NCVT learning process, admission to placement, curriculum, holistic development, competency-based learning and human resource development.',
};

function TrainingView({ page }) {
  useSeo(
    page
      ? { title: `${page.label} | Training | Satpuda ITI`, description: `${page.label} — Satpuda ITI Training. ${page.summary}` }
      : OVERVIEW_SEO
  );

  const View = page ? VIEWS[page.slug] : TrainingOverview;

  return (
    <SectionLayout section={trainingSection} pageKey={page?.slug ?? 'overview'}>
      <View page={page} />
    </SectionLayout>
  );
}

export function TrainingPage() {
  const { slug } = useParams();
  const page = slug ? trainingPageBySlug[slug] : null;
  if (slug && !page) return <NotFoundPage />;
  return <TrainingView page={page} />;
}

export default TrainingPage;

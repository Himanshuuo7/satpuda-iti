import { useParams } from 'react-router-dom';

import TradeHero from '../components/trade/TradeHero';
import TradeOverview from '../components/trade/TradeOverview';
import CourseInfo from '../components/trade/CourseInfo';
import LearnSection from '../components/trade/LearnSection';
import PracticeSection from '../components/trade/PracticeSection';
import CareerRoles from '../components/trade/CareerRoles';
import CareerPath from '../components/trade/CareerPath';
import TradeFAQ from '../components/trade/TradeFAQ';
import TradeCTA from '../components/trade/TradeCTA';
import { NotFoundPage } from './PlaceholderPage';
import useSeo from '../hooks/useSeo';
import useJsonLd from '../hooks/useJsonLd';
import { tradePageById } from '../data/tradePages';

/**
 * One NCVT trade, from /trades/:tradeId.
 *
 * All four pages share this layout and read everything from
 * `data/tradePages.js`; each trade's hero instrument, accent and practical
 * signature (components/trade/) are what make the four read differently.
 */

function TradeView({ trade }) {
  const years = trade.facts.years;
  const full = trade.fullName ? ` (${trade.fullName})` : '';

  useSeo({
    title: `${trade.name} ITI Trade — ${years}-Year NCVT Course | Satpuda ITI`,
    description: `${trade.name}${full} at Satpuda ITI, Madhya Pradesh: a ${trade.facts.duration.toLowerCase()} NCVT trade under the Craftsman Training Scheme, NSQF level ${trade.facts.nsqf}. Eligibility, syllabus, practical training, job roles and career path.`,
  });

  useJsonLd('trade-ld', {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${trade.name}${full} — ITI trade`,
    description: trade.hero.lede,
    courseCode: trade.code,
    educationalCredentialAwarded: 'National Trade Certificate (NTC)',
    educationalLevel: `NSQF Level ${trade.facts.nsqf}`,
    timeRequired: `P${years}Y`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Satpuda (Pvt.) Industrial Training Institutes',
      sameAs: 'https://satpudaiti.com/',
    },
    hasCourseInstance: trade.campuses.map((c) => ({
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: {
        '@type': 'Place',
        name: c.name,
        address: c.address,
      },
    })),
  });

  return (
    <main id="main">
      <TradeHero trade={trade} />
      <TradeOverview trade={trade} />
      <CourseInfo trade={trade} />
      <LearnSection trade={trade} />
      <PracticeSection trade={trade} />
      <CareerRoles trade={trade} />
      <CareerPath trade={trade} />
      <TradeFAQ trade={trade} />
      <TradeCTA trade={trade} />
    </main>
  );
}

export function TradePage() {
  const { tradeId } = useParams();
  const trade = tradePageById[tradeId];
  if (!trade) return <NotFoundPage />;
  // Keyed so moving between trades starts every section fresh.
  return <TradeView key={trade.id} trade={trade} />;
}

export default TradePage;

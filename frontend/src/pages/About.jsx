import { useCallback, useEffect, useState } from 'react';

import AboutHero from '../components/about/AboutHero';
import StorySection from '../components/about/StorySection';
import JourneyTimeline from '../components/about/JourneyTimeline';
import FeatureGrid from '../components/about/FeatureGrid';
import InstituteNetwork from '../components/about/InstituteNetwork';
import MPMap from '../components/about/MPMap';
import TradeSection from '../components/about/TradeSection';
import CareerSection from '../components/about/CareerSection';
import InfrastructureSection from '../components/about/InfrastructureSection';
import SafetySection from '../components/about/SafetySection';
import RegionalSection from '../components/about/RegionalSection';
import AboutCTA from '../components/about/AboutCTA';
import InstituteDialog from '../components/about/InstituteDialog';
import useSeo from '../hooks/useSeo';
import { itiInstitutes } from '../data/itiInstitutes';
import { story } from '../data/satpudaHistory';

/**
 * About Satpuda ITI.
 *
 * Twelve sections, each its own component, all reading from the verified data
 * files in `src/data/`. One institute dialog is shared by the network grid, the
 * map and the regional directory so the full record looks the same wherever
 * it is opened from.
 */

const TITLE = 'About Satpuda ITI | Industrial Training Institutes in Madhya Pradesh';
const DESCRIPTION = `Satpuda Private Industrial Training Institutes — NCVT-affiliated ITIs run by ${story.operator} since ${story.foundedYear}. ${itiInstitutes.length} institutes across Madhya Pradesh offering Electrician, Fitter, Mechanic Diesel and COPA.`;

/** Structured data: the organisation and its verified institutes. */
function useStructuredData() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Satpuda (Pvt.) Industrial Training Institutes',
      url: 'https://satpudaiti.com/about-us/',
      foundingDate: String(story.foundedYear),
      parentOrganization: { '@type': 'Organization', name: story.operator },
      subOrganization: itiInstitutes.map((i) => ({
        '@type': 'EducationalOrganization',
        name: i.name,
        telephone: i.phone,
        email: i.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: i.address,
          addressRegion: i.state,
          addressCountry: 'IN',
        },
      })),
    };
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.id = 'about-ld';
    tag.textContent = JSON.stringify(data);
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);
}

export function About() {
  useSeo({ title: TITLE, description: DESCRIPTION });
  useStructuredData();

  const [selected, setSelected] = useState(null);
  const onView = useCallback((inst) => setSelected(inst), []);
  const onClose = useCallback(() => setSelected(null), []);

  return (
    <main id="main">
      <AboutHero />
      <StorySection />
      <JourneyTimeline />
      <FeatureGrid />
      <InstituteNetwork onView={onView} />
      <MPMap onView={onView} />
      <TradeSection />
      <CareerSection />
      <InfrastructureSection />
      <SafetySection />
      <RegionalSection onView={onView} />
      <AboutCTA />
      <InstituteDialog inst={selected} onClose={onClose} />
    </main>
  );
}

export default About;

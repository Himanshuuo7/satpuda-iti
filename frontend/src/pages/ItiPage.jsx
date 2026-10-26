import { useParams } from 'react-router-dom';

import ItiHero from '../components/iti/ItiHero';
import ItiChapterNav from '../components/iti/ItiChapterNav';
import ItiOverview from '../components/iti/ItiOverview';
import ItiCourses from '../components/iti/ItiCourses';
import ItiPlacements from '../components/iti/ItiPlacements';
import ItiPrincipal from '../components/iti/ItiPrincipal';
import ItiGallery from '../components/iti/ItiGallery';
import ItiContact from '../components/iti/ItiContact';
import ItiSocial from '../components/iti/ItiSocial';
import ItiExplore from '../components/iti/ItiExplore';
import { NotFoundPage } from './PlaceholderPage';
import useSeo from '../hooks/useSeo';
import useJsonLd from '../hooks/useJsonLd';
import { getItiProfile } from '../data/itiProfiles';

/**
 * One Satpuda ITI, from /iti/:slug.
 *
 * All fourteen institutes share this layout and read everything from
 * `data/itiProfiles.js`. A section appears only when the institute's own
 * campus page (or, for placements, its drive record) has something for it,
 * so pages differ in shape as well as content — no empty or placeholder
 * sections.
 */

function ItiView({ inst }) {
  const trades = inst.courses.map((c) => c.name);
  const absolute = (src) => (src ? new URL(src, window.location.origin).href : undefined);

  useSeo({
    title: `${inst.name} — ${inst.district} | Satpuda ITI`,
    description: [
      `${inst.name}, ${inst.location}, Madhya Pradesh — an NCVT-affiliated ITI of the Satpuda Group, managed by Maharana Pratap Shikshan Samiti, Balaghat.`,
      trades.length ? `Trades: ${trades.join(', ')}.` : '',
      'Courses, intake, principal and contact details.',
    ]
      .filter(Boolean)
      .join(' '),
  });

  useJsonLd('iti-ld', {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        name: inst.name,
        url: absolute(inst.path),
        image: absolute(inst.heroImage?.src),
        foundingDate: inst.established ?? undefined,
        telephone: inst.phone,
        email: inst.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: inst.address,
          addressLocality: inst.namePlace,
          addressRegion: inst.state,
          addressCountry: 'IN',
        },
        parentOrganization: {
          '@type': 'EducationalOrganization',
          name: 'Satpuda (Pvt.) Industrial Training Institutes',
          sameAs: 'https://satpudaiti.com/',
        },
        sameAs: inst.social?.length ? [inst.sourceUrl, ...inst.social.map((p) => p.href)] : inst.sourceUrl,
        hasCourse: inst.courses.map((c) => ({
          '@type': 'Course',
          name: `${c.name}${c.fullName ? ` (${c.fullName})` : ''}`,
          url: absolute(c.slug),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
          { '@type': 'ListItem', position: 2, name: 'Our ITI Institutes', item: absolute('/#iti-institutes') },
          { '@type': 'ListItem', position: 3, name: inst.name, item: absolute(inst.path) },
        ],
      },
    ],
  });

  // Only the sections this institute's page has, in page order.
  const sections = [
    { id: 'overview', label: 'Overview', Component: ItiOverview, show: true },
    { id: 'trades', label: 'Trades', Component: ItiCourses, show: inst.courses.length > 0 },
    { id: 'placements', label: 'Placements', Component: ItiPlacements, show: Boolean(inst.drives?.length) },
    { id: 'principal', label: 'Principal', Component: ItiPrincipal, show: Boolean(inst.message) },
    { id: 'gallery', label: 'Gallery', Component: ItiGallery, show: Boolean(inst.gallery) },
    { id: 'contact', label: 'Contact', Component: ItiContact, show: true },
    { id: 'social', label: 'Social', Component: ItiSocial, show: Boolean(inst.social?.length) },
  ].filter((s) => s.show);

  return (
    <main id="main" className="iti-page">
      <ItiHero inst={inst} />
      <ItiChapterNav chapters={sections} />
      {sections.map(({ id, Component }) => (
        <Component key={id} id={id} inst={inst} />
      ))}
      <ItiExplore id="more-institutes" inst={inst} />
    </main>
  );
}

export function ItiPage() {
  const { slug } = useParams();
  const inst = getItiProfile(slug);
  if (!inst) return <NotFoundPage />;
  // Keyed so moving between institutes starts every section fresh.
  return <ItiView key={inst.slug} inst={inst} />;
}

export default ItiPage;

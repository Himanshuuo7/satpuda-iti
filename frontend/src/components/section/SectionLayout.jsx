import SectionNav from './SectionNav';

/**
 * Page frame for a section (Placement, Training): the pinned sub-navigation,
 * then the routed page. The sub-navigation stays mounted across the section's
 * pages; the body is keyed by page so each one enters fresh.
 */
export function SectionLayout({ section, pageKey, children }) {
  return (
    <main id="main" className="pt-[var(--header-h)]">
      <SectionNav section={section} />
      <div key={pageKey} className="sec-page">
        {children}
      </div>
    </main>
  );
}

export default SectionLayout;

import Hero from '../components/hero/Hero';
import TrustStrip from '../components/sections/TrustStrip';
import About from '../components/sections/About';
import Trades from '../components/sections/Trades';
import WhySatpuda from '../components/sections/WhySatpuda';
import Training from '../components/sections/Training';
import Impact from '../components/sections/Impact';
import Placements from '../components/sections/Placements';
import Campuses from '../components/sections/Campuses';
import GalleryPreview from '../components/sections/GalleryPreview';
import FinalCTA from '../components/sections/FinalCTA';
import useSeo from '../hooks/useSeo';
import { institute } from '../data/satpudaData';

/**
 * Homepage.
 *
 * Sections alternate between the light canvas and the navy brand surface so the
 * page has a reading rhythm rather than one uniform tone, and each section uses
 * a different structural model — split, register, comparison, table, snap
 * track, mosaic — so nothing reads as a repeated card grid.
 */
export function Home() {
  useSeo({
    title: 'Satpuda ITI | Industrial Training Institute',
    description:
      `${institute.shortName} — NCVT-affiliated Industrial Training Institute group in Madhya Pradesh, offering Electrician, Fitter, Mechanic Diesel and COPA trades under the Craftsman Training Scheme since ${institute.establishedYear}.`,
  });

  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <Trades />
      <WhySatpuda />
      <Training />
      <Placements />
      <Impact />
      <Campuses />
      <GalleryPreview />
      <FinalCTA />
    </>
  );
}

export default Home;

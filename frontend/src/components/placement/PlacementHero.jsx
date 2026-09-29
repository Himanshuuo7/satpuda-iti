import SectionHero from '../section/SectionHero';
import { placementSection } from './section';

/** Section hero bound to the Placement section. */
export function PlacementHero(props) {
  return <SectionHero section={placementSection} {...props} />;
}

export default PlacementHero;

import SectionNext from '../section/SectionNext';
import { placementSection } from './section';

/** Section close (next page + admission CTA) bound to the Placement section. */
export function PlacementNext({ page }) {
  return <SectionNext section={placementSection} page={page} />;
}

export default PlacementNext;

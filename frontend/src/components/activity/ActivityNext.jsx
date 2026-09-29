import SectionNext from '../section/SectionNext';
import { activitySection } from './section';

/** Section close (next page + admission CTA) bound to the Activity section. */
export function ActivityNext({ page }) {
  return <SectionNext section={activitySection} page={page} />;
}

export default ActivityNext;

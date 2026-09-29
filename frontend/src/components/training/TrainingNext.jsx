import SectionNext from '../section/SectionNext';
import { trainingSection } from './section';

/** Section close (next page + admission CTA) bound to the Training section. */
export function TrainingNext({ page }) {
  return <SectionNext section={trainingSection} page={page} />;
}

export default TrainingNext;

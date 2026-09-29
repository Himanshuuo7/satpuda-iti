import SectionHero from '../section/SectionHero';
import { trainingSection } from './section';

/** Section hero bound to the Training section. */
export function TrainingHero(props) {
  return <SectionHero section={trainingSection} {...props} />;
}

export default TrainingHero;

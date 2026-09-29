import SectionHero from '../section/SectionHero';
import { activitySection } from './section';

/** Section hero bound to the Activity section. */
export function ActivityHero(props) {
  return <SectionHero section={activitySection} {...props} />;
}

export default ActivityHero;

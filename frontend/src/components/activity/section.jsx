import { ACTIVITY_BASE, activityPages } from '../../data/activityPages';

/**
 * The Activity section's config for the shared section components. It has no
 * `overview`: as on the institute's website, Activity is a menu of four pages
 * rather than a page of its own.
 */
export const activitySection = {
  label: 'Activity',
  base: ACTIVITY_BASE,
  pages: activityPages,
  cta: {
    eyebrow: 'Student’s life at Satpuda',
    title: (
      <>
        More than a trade — <span className="text-signal">a campus life.</span>
      </>
    ),
    body: 'Train in an NCVT trade at a Satpuda ITI and take part in the activities, safety programmes and events that fill the year.',
  },
};

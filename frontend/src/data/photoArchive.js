/**
 * Photo archive — every campus photograph on the site, gathered for the
 * Activity gallery: each ITI page's gallery (itiGalleries.js, through
 * itiProfiles.js) and the website photographs of media.js's gallery.
 *
 * A photograph appears once. Manjhapur's gallery already holds eight of the
 * website photographs, so those count as Manjhapur's; the rest of the website
 * set is credited to the group as a whole, as the official site publishes it
 * (`campus: 'group'`). Principals' portraits are not campus photographs and
 * stay on their own pages.
 *
 * `theme` folds the campuses' own album names into one set for the archive's
 * filter. The archive's order deals the campuses out in turn — oldest campus
 * first, as on the homepage marquee — so neighbouring tiles come from
 * different places, while each campus keeps its own gallery's order.
 */

import { galleryPhotos, brand } from './media';
import { itiProfiles } from './itiProfiles';

export const ARCHIVE_THEMES = [
  { id: 'training', label: 'Workshops & training' },
  { id: 'placements', label: 'Placement drives' },
  { id: 'visits', label: 'Industrial visits' },
  { id: 'schools', label: 'School visits' },
  { id: 'celebrations', label: 'Celebrations' },
  { id: 'sports', label: 'Sports & yoga' },
  { id: 'news', label: 'In the news' },
  { id: 'life', label: 'Campus life' },
];

export const themeLabel = Object.fromEntries(ARCHIVE_THEMES.map((t) => [t.id, t.label]));

/** The campuses' album names, by the theme each belongs to. */
const THEME_OF_ALBUM = {
  Training: 'training',
  Seminars: 'training',
  'Placement drives': 'placements',
  'Placement drive': 'placements',
  'Open campus': 'placements',
  'Industrial visits': 'visits',
  Visits: 'visits',
  'School visit': 'schools',
  Celebrations: 'celebrations',
  'Vishwakarma Jayanti': 'celebrations',
  'Annual function': 'celebrations',
  Sports: 'sports',
  Yoga: 'sports',
  'In the news': 'news',
  'Campus life': 'life',
  'Group photos': 'life',
};

/** media.js's gallery groups, and the two of its photographs that are sport. */
const THEME_OF_GROUP = { workshop: 'training', classroom: 'training', visits: 'visits', life: 'life' };
const SPORT = new Set(['sportsGroup', 'sportsTrophy']);

const GROUP = {
  id: 'group',
  place: 'Satpuda ITI',
  name: 'Satpuda ITI Group',
  path: null,
  cover: brand.mark,
};

const campusPhotos = itiProfiles
  .filter((p) => p.gallery?.length)
  .map((p) => ({
    campus: {
      id: p.id,
      place: p.namePlace,
      name: p.name,
      path: p.path,
      cover: p.image?.src ?? p.gallery[0].thumb ?? p.gallery[0].src,
    },
    photos: p.gallery.map((g, i) => ({
      key: `${p.id}-${i}`,
      src: g.src,
      thumb: g.thumb ?? null,
      alt: g.alt,
      theme: THEME_OF_ALBUM[g.album] ?? 'life',
      campus: p.id,
      place: p.namePlace,
    })),
  }));

const held = new Set(campusPhotos.flatMap((c) => c.photos.map((p) => p.src)));

const groupPhotos = {
  campus: GROUP,
  photos: galleryPhotos
    .filter((g) => !held.has(g.src))
    .map((g) => ({
      key: `group-${g.key}`,
      src: g.src,
      thumb: null,
      alt: g.alt,
      theme: SPORT.has(g.key) ? 'sports' : THEME_OF_GROUP[g.group] ?? 'life',
      campus: GROUP.id,
      place: GROUP.place,
    })),
};

const sets = [...campusPhotos, groupPhotos].filter((s) => s.photos.length);

/** Campuses in archive order, each with how many photographs it holds. */
export const archiveCampuses = sets.map((s) => ({ ...s.campus, count: s.photos.length }));

/** Every photograph, the campuses dealt out in turn. */
export const archivePhotos = (() => {
  const out = [];
  const longest = Math.max(...sets.map((s) => s.photos.length));
  for (let i = 0; i < longest; i++) {
    for (const s of sets) if (s.photos[i]) out.push(s.photos[i]);
  }
  return out;
})();

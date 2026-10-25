/**
 * Campus drives across the Satpuda group, year by year and ITI by ITI — the
 * homepage placement section.
 *
 * Source: the campus-drive records the ITIs sent in, supplied by the
 * institute on 2026-10-25 as two workbooks: FORMATE.xlsx (a sheet each for
 * Seoni, Warehouse, Kundipura, Sarni, Mandla, Multai, Betul, Baihar and
 * Itarsi) and "Placement Information Manjhapur Update March TO OCT-1.xlsx".
 * Budhi reported no campus drives; the other ITIs sent no record, so they do
 * not appear. Only counts are kept — never a contact name, phone or email.
 *
 * Each row adds up one ITI's drives in one calendar year, by drive date:
 * - `drives` counts every drive listed. Rows merged into one block in the
 *   sheet (Warehouse, March 2025) are one drive, and so are Sarni's same-day
 *   rows that share one turnout (a joint drive; selections were added, unless
 *   the two rows repeat the same figures).
 * - `attended` and `selected` add up the figures reported, and are null when
 *   no drive that year reported one: Mandla sent dates only, Kundipura
 *   turnout only. `selected` counts everyone selected at the drive, which at
 *   an open campus drive includes candidates from other ITIs.
 * - Two Betul drives (Tata Motors Gujarat, BSA Corporation Pune) carry no
 *   date, so they sit under `year: null`, counted in the totals only.
 *
 * The record runs to the last drive listed, `GROUP_PLACEMENTS_UPTO`.
 */

export const GROUP_PLACEMENTS_UPTO = '2026-10-23';

export const groupPlacements = [
  { iti: 'seoni', year: 2016, drives: 1, attended: 50, selected: 30 },
  { iti: 'manjhapur', year: 2017, drives: 2, attended: 700, selected: 110 },
  { iti: 'seoni', year: 2017, drives: 1, attended: 110, selected: 66 },
  { iti: 'betul', year: 2018, drives: 2, attended: 151, selected: 86 },
  { iti: 'manjhapur', year: 2018, drives: 8, attended: 2130, selected: 861 },
  { iti: 'seoni', year: 2018, drives: 1, attended: 100, selected: 61 },
  { iti: 'betul', year: 2019, drives: 4, attended: 398, selected: 250 },
  { iti: 'mandla', year: 2019, drives: 1, attended: null, selected: null },
  { iti: 'manjhapur', year: 2019, drives: 9, attended: 1115, selected: 706 },
  { iti: 'seoni', year: 2019, drives: 1, attended: 50, selected: 35 },
  { iti: 'betul', year: 2020, drives: 2, attended: 241, selected: 152 },
  { iti: 'manjhapur', year: 2020, drives: 5, attended: 1110, selected: 589 },
  { iti: 'betul', year: 2021, drives: 4, attended: 250, selected: 151 },
  { iti: 'manjhapur', year: 2021, drives: 3, attended: 610, selected: 426 },
  { iti: 'seoni', year: 2021, drives: 2, attended: 130, selected: 80 },
  { iti: 'betul', year: 2022, drives: 4, attended: 284, selected: 106 },
  { iti: 'chhindwara-kundipura', year: 2022, drives: 5, attended: null, selected: null },
  { iti: 'chhindwara-warehouse', year: 2022, drives: 7, attended: 525, selected: 275 },
  { iti: 'mandla', year: 2022, drives: 4, attended: null, selected: null },
  { iti: 'manjhapur', year: 2022, drives: 6, attended: 1812, selected: 828 },
  { iti: 'sarni', year: 2022, drives: 2, attended: 80, selected: 41 },
  { iti: 'seoni', year: 2022, drives: 4, attended: 200, selected: 115 },
  { iti: 'baihar', year: 2023, drives: 2, attended: 120, selected: 46 },
  { iti: 'betul', year: 2023, drives: 8, attended: 724, selected: 516 },
  { iti: 'chhindwara-kundipura', year: 2023, drives: 4, attended: 154, selected: null },
  { iti: 'chhindwara-warehouse', year: 2023, drives: 4, attended: 229, selected: 126 },
  { iti: 'itarsi', year: 2023, drives: 5, attended: 322, selected: 233 },
  { iti: 'mandla', year: 2023, drives: 1, attended: null, selected: null },
  { iti: 'manjhapur', year: 2023, drives: 19, attended: 4062, selected: 2597 },
  { iti: 'sarni', year: 2023, drives: 1, attended: 36, selected: 21 },
  { iti: 'seoni', year: 2023, drives: 1, attended: 70, selected: 40 },
  { iti: 'baihar', year: 2024, drives: 1, attended: 60, selected: 40 },
  { iti: 'betul', year: 2024, drives: 7, attended: 143, selected: 95 },
  { iti: 'chhindwara-kundipura', year: 2024, drives: 3, attended: 181, selected: null },
  { iti: 'chhindwara-warehouse', year: 2024, drives: 3, attended: 170, selected: 109 },
  { iti: 'itarsi', year: 2024, drives: 8, attended: 524, selected: 393 },
  { iti: 'mandla', year: 2024, drives: 2, attended: null, selected: null },
  { iti: 'manjhapur', year: 2024, drives: 25, attended: 2872, selected: 1729 },
  { iti: 'sarni', year: 2024, drives: 3, attended: 142, selected: 78 },
  { iti: 'seoni', year: 2024, drives: 1, attended: 20, selected: 12 },
  { iti: 'baihar', year: 2025, drives: 3, attended: 160, selected: 116 },
  { iti: 'betul', year: 2025, drives: 9, attended: 381, selected: 186 },
  { iti: 'chhindwara-kundipura', year: 2025, drives: 2, attended: 87, selected: null },
  { iti: 'chhindwara-warehouse', year: 2025, drives: 7, attended: 624, selected: 469 },
  { iti: 'itarsi', year: 2025, drives: 10, attended: 744, selected: 594 },
  { iti: 'mandla', year: 2025, drives: 3, attended: null, selected: null },
  { iti: 'manjhapur', year: 2025, drives: 24, attended: 3159, selected: 2102 },
  { iti: 'multai', year: 2025, drives: 7, attended: 409, selected: 260 },
  { iti: 'sarni', year: 2025, drives: 2, attended: 76, selected: 34 },
  { iti: 'seoni', year: 2025, drives: 3, attended: 130, selected: 83 },
  { iti: 'baihar', year: 2026, drives: 2, attended: 103, selected: 92 },
  { iti: 'betul', year: 2026, drives: 12, attended: 461, selected: 145 },
  { iti: 'chhindwara-warehouse', year: 2026, drives: 10, attended: 832, selected: 394 },
  { iti: 'itarsi', year: 2026, drives: 8, attended: 326, selected: 312 },
  { iti: 'mandla', year: 2026, drives: 2, attended: null, selected: null },
  { iti: 'manjhapur', year: 2026, drives: 34, attended: 5468, selected: 2626 },
  { iti: 'multai', year: 2026, drives: 4, attended: 225, selected: 121 },
  { iti: 'sarni', year: 2026, drives: 2, attended: 81, selected: 34 },
  { iti: 'seoni', year: 2026, drives: 5, attended: 203, selected: 49 },
  { iti: 'betul', year: null, drives: 2, attended: 216, selected: 162 },
];

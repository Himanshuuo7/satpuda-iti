# Satpuda ITI — Frontend

Frontend for **Satpuda (Pvt.) Industrial Training Institute** (Satpuda Pvt. I.T.I.),
an NCVT-affiliated ITI group in Madhya Pradesh established in 1999 under
Maharana Pratap Shikshan Samiti, Balaghat.

React + Vite + Tailwind. Structured so a MERN backend can be attached later
without refactoring the UI.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production bundle in dist/
npm run preview      # serve the built bundle
npm run optimize:images   # re-compress bundled photography (one-off)
```

Node 18+ required.

---

## Project layout

```
satpuda-iti/
├── backend/                 # intentionally empty — future Express/Mongo API
└── frontend/
    ├── public/              # favicon, Open Graph image
    ├── scripts/
    │   └── optimize-images.mjs
    └── src/
        ├── assets/images/   # authentic institute photography (bundled)
        ├── components/
        │   ├── navbar/      # Navbar, MobileDrawer
        │   ├── hero/        # Hero (the page's authored motion moment)
        │   ├── sections/    # the eleven homepage sections
        │   ├── footer/
        │   └── ui/          # Button, Figure, Logo, SectionHeading, GearOutline…
        ├── data/
        │   ├── satpudaData.js   # all institute content — single source of truth
        │   └── media.js         # image registry with alt text + aspect ratios
        ├── hooks/           # useReveal, useCountUp, useScrollState,
        │                    # useLockBodyScroll, useSeo
        ├── pages/           # Home, PlaceholderPage (+ NotFoundPage)
        ├── routes/          # route table
        ├── services/        # api.js + contentService.js (backend seam)
        └── utils/           # cn, format
```

---

## Content policy

**Everything on the page comes from the official site, <https://satpudaiti.com/>.**
Nothing is invented. `src/data/satpudaData.js` is the only place content lives,
and each block is annotated with where it came from.

Deliberate omissions, because the official site does not publish them:

- **Trade durations.** The official course pages (`/courses/electrician/` etc.)
  currently contain placeholder Lorem Ipsum and no duration, so the trade cards
  show the affiliation (`CTS · NCVT`) instead of inventing a figure.
- **Recruiter names.** The homepage shows recruiter logos but names none of them
  in text, so they are presented as published marks only.
- **Placement guarantees.** The site says "Placement Assistance"; the UI never
  upgrades that to a guarantee. The year-by-year placement table is reproduced
  exactly, with a visible source line.

Statistics carry their published context. The four homepage counters are labelled
as the official site labels them and footnoted *"Figures as published by Satpuda
ITI on satpudaiti.com"*.

Alumni testimonials are reproduced verbatim in their original Hindi and marked
`lang="hi"` — translating or trimming them would misrepresent people's own words.

---

## Images

All photography was downloaded from the official site and is **bundled locally**
rather than hot-linked, because that origin currently serves an expired TLS
certificate (browsers would refuse the images outright). `npm run optimize:images`
re-compressed them from ~2.1 MB to ~0.86 MB.

`src/data/media.js` is the swap point: every image has one import, its own alt
text and an intrinsic aspect ratio. To replace an image, change the import —
no component edits. `<Figure>` reserves the box from the ratio, lazy-loads
below-the-fold images, and degrades to a labelled blueprint panel if a file is
missing, so a broken source never breaks the layout.

---

## Design system

Built from the official logo: royal-blue circular wordmark, red industrial gear
ring, cyan tools, red lightning bolt.

| Role | Token | Use |
|---|---|---|
| Brand surface | `navy` (`#0B2D5C`, deep `#071B33`) | dominant colour and primary voice |
| Action | `signal` (`#E01B24`) | CTAs, active state, key data only — never decoration |
| Technical accent | `tech` (`#16C7D9`) | measurement rules, blueprint grid, focus, markers |
| Text | `ink` / `ink-muted` / `ink-soft` | all ≥ 4.5:1 on the light canvas |

Type: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono** reserved
for genuine data — reference numbers, phone numbers, years, percentages — never
as decoration.

Browser surfaces are themed rather than left to defaults: text selection, custom
scrollbars, the caret, focus rings and underline offset all come from the palette.

### Motion

The hero owns the page's one authored moment — blueprint rules draw in, the
photograph unmasks upward from a measurement sweep, headline lines rise out of a
slight blur (GSAP). Every other section gets a single quiet rise via
`IntersectionObserver`, so the page is not a sequence of competing entrances.

`prefers-reduced-motion` is honoured globally, and the reveal hook and count-up
hook each short-circuit to their final state rather than relying on the CSS
override alone.

---

## Accessibility

Verified on the rendered page, not just intended:

- one `<h1>`, no heading-level jumps, `main`/`nav` landmarks, skip link
- every image has alt text; every control has an accessible name
- all body and metadata text ≥ 4.5:1 (large text ≥ 3:1)
- mobile drawer: `role="dialog"`, `aria-modal`, focus trap, focus restored on
  close, background scroll locked with scrollbar-width compensation
- visible cyan focus ring on every interactive element
- no horizontal overflow at any breakpoint (360 → 1800px)

---

## Routing

`/` is the real homepage. Every other route renders a polished "Coming Soon"
placeholder in the same visual world, plus a `*` 404. Swap a route's `element` in
`src/routes/routes.jsx` when its real page is built.

```
/  /about  /courses  /courses/{electrician,fitter,diesel-mechanic,copa}
/training  /placements  /campuses  /gallery  /contact  /admission
```

---

## Connecting the backend later

`src/services/` is already the seam. `contentService.js` exposes
`getTrades()`, `getCampuses()`, `getPlacement()` and friends, each returning a
promise. `resolve(path, localFallback)` in `api.js` reads from the bundled data
today; set `VITE_API_BASE_URL` and the same calls hit the API instead, falling
back to bundled data if a request fails so an outage never blanks the site.

```bash
# frontend/.env
VITE_API_BASE_URL=http://localhost:5000
```

Endpoints the services already expect: `/api/institute`, `/api/trades`,
`/api/campuses`, `/api/placement`, `/api/training`, `/api/testimonials`,
`/api/accreditations`, `/api/stats`, `/api/notices`, `/api/contact`.

`submitEnquiry()` is declared but intentionally throws — the admission form needs
the backend, which is out of scope for this phase.

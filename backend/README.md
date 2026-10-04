# Satpuda ITI — Backend

Express + MongoDB (Mongoose) API for the admission and contact forms.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # set ADMIN_PASSWORD and TOKEN_SECRET
npm run dev            # http://localhost:5000 (auto-restarts on change)
```

Requires Node 20.12+ and a running MongoDB. In development the frontend's Vite
server proxies `/api/*` to port 5000, so run both `npm run dev` here and in
`frontend/`.

## Admin dashboard

Open `http://localhost:5173/admin` and sign in with `ADMIN_PASSWORD` from `.env`.
The login returns a signed token (valid `TOKEN_TTL_HOURS`, default 12) that the
dashboard sends as `Authorization: Bearer <token>`. Changing `TOKEN_SECRET`
signs everyone out.

## Endpoints

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/health` | public | Server + DB status |
| POST | `/api/admin/login` | public (10 failed tries / 15 min) | `{ "password" }` → `{ token, expiresAt }` |
| GET | `/api/admin/me` | admin | Check a session |
| GET | `/api/admin/stats` | admin | Counts by status, today, last 7 days, by trade / subject |
| POST | `/api/admissions` | public (rate-limited) | Submit admission application → returns `referenceNo` |
| GET | `/api/admissions` | admin | List — `?page&limit&status&q&trade&campus` |
| GET | `/api/admissions/export` | admin | All matching records (same filters) for CSV |
| GET | `/api/admissions/:id` | admin | One application |
| PATCH | `/api/admissions/:id/status` | admin | `{ "status": "new" \| "contacted" \| "closed" }` |
| DELETE | `/api/admissions/:id` | admin | Delete |
| POST | `/api/contact` | public (rate-limited) | Submit contact message |
| GET | `/api/contact` | admin | List — `?page&limit&status&q&subject` |
| GET | `/api/contact/export` | admin | All matching records for CSV |
| PATCH | `/api/contact/:id/status` | admin | Update status |
| DELETE | `/api/contact/:id` | admin | Delete |

Validation errors return `422` with `{ success: false, message, errors: { field: message } }`,
which the frontend shows under each field.

## Structure

```
src/
  config/       env, db connection, allowed select values (trades, campuses…)
  models/       Admission, Contact
  validators/   per-form rules
  middleware/   validate, rate limit, admin session, errors
  utils/        signed session token
  controllers/  request handlers
  routes/       /api/admissions, /api/contact
  app.js        express app
  server.js     connects DB, starts server
```

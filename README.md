# Private Capital Group website

Next.js 16 (App Router) marketing site for [Private Capital Group](https://www.privatecapitalgroup.co.nz), with an embedded Sanity Studio at `/studio`, Resend contact form, and Campaign Monitor newsletter signup. Hosted on Vercel.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Studio: [http://localhost:3000/studio](http://localhost:3000/studio).

## Environment variables

Set these in `.env.local` and in the Vercel project (Production + Preview):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project (`vmnu14pm`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | e.g. `2024-01-01` |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, e.g. `https://www.privatecapitalgroup.co.nz` |
| `RESEND_API_KEY` | Contact form sending ([Resend](https://resend.com)) |
| `CONTACT_FROM_EMAIL` | Verified sender, e.g. `PCG Website <noreply@privatecapitalgroup.co.nz>` |
| `CONTACT_TO_BORROWER` | Inbox(es) for borrower enquiries (comma-separated OK) |
| `CONTACT_TO_INVESTOR` | Inbox(es) for investor enquiries |
| `CONTACT_TO_ADVISOR` | Inbox(es) for advisor enquiries |
| `CONTACT_TO_FALLBACK` | Used when a role list is empty |
| `CONTACT_TO_EMAIL` | Optional legacy single fallback |
| `CAMPAIGN_MONITOR_API_KEY` | Newsletter API key |
| `CAMPAIGN_MONITOR_LIST_ID` | Newsletter list ID |

Contact routing emails are **not** stored in Sanity (they were publicly readable via the CDN). Configure them only via the `CONTACT_TO_*` env vars above.

## Deploy

Push to `main` on the linked GitHub repo, or:

```bash
npx vercel --prod
```

Project: `pcg` under Previously Available’s Vercel team.

## Smoke tests after deploy

1. Homepage loads on the production domain; `/about`, `/borrowers`, `/investors`, `/news`, `/contact` render CMS content.
2. Contact form: submit once as borrower / investor / advisor → Resend delivery to the matching inbox.
3. Newsletter: name + email → Campaign Monitor subscriber created (or “already subscribed” treated as success).
4. `/studio` loads; only authenticated Sanity users can edit. Vision tool is disabled outside local `NODE_ENV=development`.
5. Confirm `robots.txt` disallows `/studio` and sitemap omits placeholder Privacy/Terms until final legal copy lands.

## Notes for handover

- **Privacy / Terms** pages are placeholders with `noIndex` until PCG provide final copy.
- **Season Serif** still uses trial font files in `public/fonts/` — replace with licensed files before treating fonts as finished.
- Legacy redirects: `/insights` → `/news`, `/strategies` → `/investors`, `/our-people` `/people` `/team` → `/about#team`, `/about-us` → `/about`, `/funds` → `/investors`.
- Prefer Vercel Firewall rate limits in front of `/api/contact` and `/api/newsletter` for production hardening; an in-process limiter is also in place as a soft guard.

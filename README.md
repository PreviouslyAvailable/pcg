# Private Capital Group website

Next.js 16 (App Router) marketing site for [Private Capital Group](https://www.privatecapitalgroup.co.nz), with an embedded Sanity Studio at `/studio`, Resend contact form, and Campaign Monitor newsletter signup. Hosted on Vercel.

The **embedded Studio in this repo (`/studio`) is the source of truth** for schemas and content editing. A local Sanity studio archive (e.g. `~/pcg`) is optional and should not be treated as the live schema source unless you intentionally sync it.

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

Contact routing emails are **not** stored in Sanity (the deprecated `formRecipients` schema field has been removed). Configure them only via the `CONTACT_TO_*` env vars above.

## Deploy

Push to `main` on the linked GitHub repo, or:

```bash
npx vercel --prod
```

Project: `pcg` under Previously Available’s Vercel team.

## Smoke tests after deploy

1. Homepage loads on the production domain; `/about`, `/borrowers`, `/investors`, `/news`, `/contact` render CMS content.
2. Contact form: submit once as borrower / investor / advisor → Resend delivery to the matching inbox.
3. Newsletter: name + email + consent checkbox → Campaign Monitor subscriber created (or “already subscribed” treated as success).
4. `/studio` loads; only authenticated Sanity users can edit. Vision tool is disabled outside local `NODE_ENV=development`.
5. Confirm `robots.txt` disallows `/studio` and sitemap omits placeholder Privacy/Terms until final legal copy lands.

## Security / ops checklist (handover)

### Vercel Firewall (required for production rate limits)

In-process rate limiting on `/api/contact` and `/api/newsletter` is a soft guard only (resets per serverless isolate; client IP from `X-Forwarded-For` can be spoofed). Prefer platform firewall:

1. Open the **pcg** project in Vercel → **Firewall** (or **Security**).
2. Add a rule that rate-limits `POST` to `/api/contact` and `/api/newsletter` (e.g. 8–20 requests / IP / minute).
3. Optionally challenge or block abusive ASN / bot scores on those paths.
4. Keep the in-app limiter for defence in depth.

CLI note: Firewall rules are configured in the Vercel dashboard (no reliable non-interactive CLI for custom rate rules as of this handover).

### Sanity Studio access

- Enable **MFA** for all Studio editors in the Sanity project.
- Use **least-privilege roles** (Editor vs Administrator); avoid sharing owner tokens.
- Optional: Vercel Deployment Protection / IP allowlist for `/studio` if PCG wants an extra gate in front of the public Studio shell.

### Account ownership / keys (client + ops)

- **E2**: Transfer Vercel, Sanity, Resend, Campaign Monitor, and GitHub ownership/billing to PCG after go-live.
- **E3**: Rotate the Resend API key after ownership transfer (or if the key was shared in chat/env copies).
- Do **not** create a separate Studio GitHub repo — embedded Studio here remains SSOT.

## Notes for handover

- **Privacy / Terms** pages are placeholders with `noIndex` until PCG provide final copy.
- Serif display type uses **Newsreader** Light (300) + italic via `next/font/google` (`--font-serif` / `.font-serif`, tracking `-0.03em`).
- Legacy redirects: `/insights` → `/news`, `/strategies` → `/investors`, `/our-people` `/people` `/team` → `/about?section=team` (client scrolls to `#team`), `/about-us` → `/about`, `/funds` → `/investors`.
- Footer includes a subtle **Case studies** link to `/case-studies`.

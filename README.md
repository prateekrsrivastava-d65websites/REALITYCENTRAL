# REALITYCENTRAL

AI-assisted real estate marketing cockpit for agents. The app turns one property intake into a complete listing launch kit: MLS description, social posts, buyer emails, paid ad hooks, seller proof report, and showing follow-up scripts.

## Why Agents Pay

- Saves repetitive copywriting time on every listing.
- Makes sellers feel the agent is doing more than uploading to MLS.
- Gives agents immediate follow-up scripts to convert showings into offers.
- Creates reusable marketing assets from a single intake.

## Deploy

Cloudflare Pages or GitHub Pages can build this as a static Vite app.

```bash
pnpm install
pnpm build
```

Build command: `pnpm build`

Output directory: `dist`

Cloudflare Pages Functions are scaffolded under `functions/` for health checks, future AI generation, request size limits, and D1-backed rate limiting. Create a D1 database named `realitycentral-db`, set `IP_HASH_SECRET`, then apply migrations.

## Next Revenue Wiring

- Supabase: auth, listing records, saved generations.
- Groq: fast copy generation.
- Gemini: photo analysis and room-level highlights.
- Stripe: $49 solo plan, $99 teams plan, usage-gated free trial.
- Resend: send generated nurture sequences directly.

## Open-Source Research Used

- `AleksNeStu/ai-real-estate-assistant` inspired the prompt-template, CMA, provider, and market-insight direction.
- `InsulaCRM/InsulaCRM` inspired the CRM-lite stages, lead scoring, showing follow-up, and workflow ideas.
- `brightdata/real-estate-ai-agent` inspired the strict property import JSON schema.
- `prolinkinfo/RealEstateCRM` reinforced the agent-first dashboard and communication workflow priorities.
- `microrealestate/microrealestate`, `RealtorRocket`, and Easy Property Listings research informed the operational layer: property records, open-house capture, task boards, launch calendars, and listing website readiness.

## Feature Surface

REALITYCENTRAL now covers the practical listing lifecycle: launch copy, seller reports, social/email/ads, showing follow-up, lead scoring, CMA explanation, property import, agent ops, seller updates, open-house QR capture, objection intelligence, offer readiness, photo-to-marketing briefs, voice profiles, listing playbooks, and a 14-day content calendar.

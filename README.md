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

# REALITYCENTRAL

AI-assisted real estate marketing cockpit for agents. The app turns one property intake into a complete listing launch kit: MLS description, social posts, buyer emails, paid ad hooks, seller proof report, and showing follow-up scripts.

## Why Agents Pay

- Saves repetitive copywriting time on every listing.
- Makes sellers feel the agent is doing more than uploading to MLS.
- Gives agents immediate follow-up scripts to convert showings into offers.
- Creates reusable marketing assets from a single intake.

## Realtor Feedback Version

REALITYCENTRAL is a listing launch assistant, not a replacement for your CRM or MLS.

You enter the property once, and it gives you the material and next steps needed to win the listing, market it, reassure the seller, and follow up with buyers.

What it helps with:

- Write MLS descriptions, social posts, emails, ads, and follow-up texts faster.
- Send sellers proof that work is happening every week.
- Capture open-house visitors with a QR flow and route hot leads quickly.
- Track buyer objections so price and positioning conversations are based on patterns, not feelings.
- Prepare hot buyers for serious offer conversations.
- Build a 7-day launch plan and 14-day content calendar for every listing.
- Keep the agent's own voice consistent across all copy.

The pitch to an agent:

> Keep your CRM. Keep your MLS. Use REALITYCENTRAL to turn every listing into a launch plan, seller report, follow-up system, and content engine in minutes.

Questions to ask realtors:

- Which of these outputs would you actually use weekly?
- What do you already have covered by your CRM or brokerage tools?
- Where do you lose the most time: writing, seller updates, open-house follow-up, buyer follow-up, or content?
- Would you pay per listing, monthly, or only for done-for-you concierge execution?

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

## TODO: Email and Text Integration

MVP path:

- Add unique inbound email addresses for each agent, e.g. `maya@inbound.realitycentral.ai`.
- Let agents forward or BCC client threads into REALITYCENTRAL.
- Parse forwarded emails into listing, contact, urgency, objection, and next action.
- Add Twilio inbound SMS numbers for agents.
- Log incoming buyer/seller texts and generate suggested replies.
- Detect unanswered hot leads and create follow-up tasks.
- Add a conversation summary view per listing/contact.

Deeper path:

- Gmail OAuth integration for selected labels only.
- Outlook OAuth integration for selected folders only.
- Two-way email sync with thread mapping.
- Draft replies inside REALITYCENTRAL without sending automatically.
- SMS opt-in/opt-out handling and compliance guardrails.
- Contact deduplication across email, phone, open-house QR, and manual intake.
- Daily "missed money" digest: hot leads waiting, seller updates due, unanswered objections.

## Open-Source Research Used

- `AleksNeStu/ai-real-estate-assistant` inspired the prompt-template, CMA, provider, and market-insight direction.
- `InsulaCRM/InsulaCRM` inspired the CRM-lite stages, lead scoring, showing follow-up, and workflow ideas.
- `brightdata/real-estate-ai-agent` inspired the strict property import JSON schema.
- `prolinkinfo/RealEstateCRM` reinforced the agent-first dashboard and communication workflow priorities.
- `microrealestate/microrealestate`, `RealtorRocket`, and Easy Property Listings research informed the operational layer: property records, open-house capture, task boards, launch calendars, and listing website readiness.

## Feature Surface

REALITYCENTRAL now covers the practical listing lifecycle: launch copy, seller reports, social/email/ads, showing follow-up, lead scoring, CMA explanation, property import, agent ops, seller updates, open-house QR capture, objection intelligence, offer readiness, photo-to-marketing briefs, voice profiles, listing playbooks, and a 14-day content calendar.

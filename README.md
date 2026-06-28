# REALITYCENTRAL

REALITYCENTRAL is an AI listing launch assistant for real estate agents.

It is not trying to replace the agent's CRM, MLS, website, or brokerage tools. The simple idea is:

> Enter one listing once. Get the copy, seller proof, buyer follow-up, open-house plan, lead actions, and content calendar needed to market it professionally.

## The Problem

Agents already have tools, but a lot of listing work still happens manually:

- Writing MLS descriptions.
- Creating social posts.
- Sending seller updates.
- Following up after showings.
- Remembering open-house leads.
- Explaining buyer objections to sellers.
- Preparing hot buyers to make offers.
- Posting consistent listing content for 1-2 weeks.

The result is lost time, weak follow-up, anxious sellers, and missed buyer opportunities.

## What Is Built Now

The current app is a working static MVP deployed to Cloudflare Pages and GitHub Pages.

Live demo:

- Cloudflare: https://reality-central.pages.dev/
- GitHub Pages: https://prateekrsrivastava-d65websites.github.io/REALITYCENTRAL/

Repo:

- https://github.com/prateekrsrivastava-d65websites/REALITYCENTRAL

Current feature surfaces:

- MLS Listing Description
- Social Launch Pack
- Buyer Email Sequence
- Paid Ad Variants
- Seller Proof Report
- Showing Follow-Up Scripts
- Lead Pipeline Autopilot
- Seller CMA & Comps Angle
- Property Data Import Schema
- Agent Ops Center
- Seller Update Generator
- Open House QR Capture
- Objection Intelligence
- Offer Readiness Room
- Photo-to-Marketing Brief
- Agent Voice Profile
- Reusable Listing Playbooks
- 14-Day Content Calendar

Each feature now explains:

- **Job**: what this does for the agent.
- **ROI**: why it saves time or helps make money.
- **Next**: exactly what the agent should do with the output.

## Why This Is Useful To A Realtor

The tool helps an agent look more prepared, move faster, and follow up better.

Example:

1. Agent gets a new listing.
2. They enter address, price, beds, baths, target buyer, best features, and known objections.
3. REALITYCENTRAL generates the launch kit:
   - MLS copy.
   - Social posts.
   - Buyer emails.
   - Seller update.
   - Open-house follow-up.
   - Objection scripts.
   - Offer-readiness checklist.
   - 14-day content calendar.
4. Agent uses the outputs in their existing tools: MLS, CRM, email, text, social media, and seller calls.

This is useful because agents do not get paid for typing. They get paid for winning listings, generating buyer interest, keeping sellers calm, and closing deals.

## Why AI Helps Here

AI is useful because real estate agents repeat the same kinds of work on every listing, but each property still needs to feel specific.

AI can help by:

- Turning rough property notes into polished listing copy.
- Creating multiple versions for MLS, Instagram, Facebook, LinkedIn, email, and ads.
- Summarizing seller updates in a calm, professional voice.
- Detecting buyer objections and suggesting responses.
- Drafting fast follow-ups after showings or open houses.
- Turning listing photos into room-specific marketing angles once Gemini vision is wired.
- Keeping the agent's voice consistent across all outputs.
- Helping prioritize leads based on urgency, source, and recent activity.

The key is not "AI writes words." The key is:

> AI helps the agent move from listing intake to professional execution in minutes instead of hours.

## What Is Not Built Yet

The current version is mostly a generated workflow MVP. It proves the product direction, but many pieces are not fully interactive yet.

Not fully built yet:

- Real user accounts.
- Saved listings.
- Real AI provider calls.
- Photo upload and Gemini vision analysis.
- Email sending.
- SMS sending.
- Gmail/Outlook sync.
- Twilio inbound text capture.
- Real open-house QR landing pages.
- Seller-facing share links.
- Stripe payments.
- PDF exports.
- Real MLS/IDX integration.

## To Be Done Next

Highest priority:

- Make Seller Update Generator interactive.
- Make Open House QR Capture interactive.
- Add saved listings with Supabase.
- Add Gemini photo analysis.
- Add Groq quick reply generation.
- Add email/SMS integration for real customer conversations.
- Add seller-facing share links.
- Add Stripe checkout.

## Zillow-Style Listing Website Idea

Build a simple Zillow-like website for an agent's own listings.

Free/easy version:

- Agent manually enters listings or imports CSV.
- Each listing gets a public page.
- Visitors can filter listings.
- Visitors can request a showing.
- Open-house QR codes point to listing pages.
- Lead capture connects back to REALITYCENTRAL.

Hard version:

- Live MLS/IDX/Zillow-style data feed.
- Real-time listing search across markets.
- Map search with live property data.

The free path is to build listing pages for the agent's own inventory first. Do not depend on Zillow data at the start.

## Email And Text Integration Roadmap

MVP path:

- Give each agent an inbound email address, e.g. `maya@inbound.realitycentral.ai`.
- Let agents forward or BCC customer emails.
- Parse forwarded emails into contact, listing, urgency, objection, and next action.
- Add Twilio inbound SMS numbers.
- Log incoming buyer/seller texts.
- Generate suggested replies for agent approval.
- Detect hot leads that have not been answered.

Deeper path:

- Gmail OAuth for selected labels.
- Outlook OAuth for selected folders.
- Two-way email sync.
- SMS opt-in/opt-out compliance.
- Conversation summaries per listing/contact.
- Daily "missed money" digest.

## Questions To Ask A Real Estate Agent

- Would this save you time on every listing?
- Which feature would you use first?
- Which output feels unnecessary?
- Would seller updates help you keep clients calmer?
- Would open-house QR capture help you follow up better?
- Do you already get this from your CRM or brokerage?
- Would you pay per listing, monthly, or for done-for-you concierge help?

## Pricing Hypothesis

Possible pricing:

- $49/listing for one launch kit.
- $99/month for solo agents.
- $199/month for small teams.
- $299/listing concierge upsell for done-for-you launch kit, ads, and seller update.

## Technical Notes

Current stack:

- React + Vite + TypeScript.
- Cloudflare Pages.
- Cloudflare Pages Functions.
- Cloudflare D1 migrations.
- GitHub Pages workflow.

Planned integrations:

- Supabase for auth and saved listings.
- Gemini for photo analysis and richer property reasoning.
- Groq for fast text variants and quick replies.
- Resend for email.
- Twilio for SMS.
- Stripe for billing.

## Open-Source Research Used

- `AleksNeStu/ai-real-estate-assistant` inspired the prompt-template, CMA, provider, and market-insight direction.
- `InsulaCRM/InsulaCRM` inspired the CRM-lite stages, lead scoring, showing follow-up, and workflow ideas.
- `brightdata/real-estate-ai-agent` inspired the strict property import JSON schema.
- `prolinkinfo/RealEstateCRM` reinforced the agent-first dashboard and communication workflow priorities.
- `microrealestate/microrealestate`, `RealtorRocket`, and Easy Property Listings research informed the operational layer: property records, open-house capture, task boards, launch calendars, and listing website readiness.

## Local Development

```bash
pnpm install
pnpm build
```

Build command: `pnpm build`

Output directory: `dist`

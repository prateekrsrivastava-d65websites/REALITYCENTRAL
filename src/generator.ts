import type { Asset, LeadSignal, PipelineStage, PropertyInput } from "./types";

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const bullets = (text: string) =>
  text
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

const fallbackHighlights = ["natural light", "smart layout", "move-in ready finishes", "nearby dining and commuter routes"];

export function buildMarketingKit(input: PropertyInput): Asset[] {
  const highlights = bullets(input.highlights);
  const objections = bullets(input.objections);
  const h = highlights.length ? highlights : fallbackHighlights;
  const shortAddress = input.address || "this property";
  const location = input.city || "the neighborhood";
  const cta = `Call or text ${input.agentName || "the listing agent"}${input.phone ? ` at ${input.phone}` : ""} to book a private showing.`;
  const signature = `${input.agentName || "Your agent"}${input.brokerage ? `, ${input.brokerage}` : ""}${input.email ? ` | ${input.email}` : ""}`;

  const growthAssets: Asset[] = [
    {
      id: "seller_update",
      title: "Seller Update Generator",
      subtitle: "Weekly proof-of-work report that keeps sellers calm and loyal.",
      value: "Save seller",
      score: 98,
      body: `Subject: Weekly update for ${shortAddress}\n\nHi {{seller_first_name}},\n\nHere is the clear picture from this week.\n\nWhat we did:\n- Published and positioned the listing around ${h.slice(0, 3).join(", ")}\n- Sent buyer-facing copy, social posts, and follow-up messages\n- Prepared objection responses around ${objections[0] || "price and buyer fit"}\n- Continued pushing qualified buyers toward private showings\n\nWhat buyers are reacting to:\n- Strongest positive: ${h[0]}\n- Second strongest positive: ${h[1] || "the layout"}\n- Watch item: ${objections[0] || "we need more showing feedback before changing strategy"}\n\nRecommendation:\nHold the current positioning until we have enough showing data. If traffic is strong but offers lag, we adjust the narrative first. If traffic is weak, we review price, photos, and distribution.\n\nThis week matters because buyer attention is highest early. I will keep you updated with facts, not guesses.\n\n${signature}`
    },
    {
      id: "open_house",
      title: "Open House QR Capture",
      subtitle: "Mobile sign-in script, lead questions, and instant follow-up routing.",
      value: "More leads",
      score: 96,
      body: `QR sign-in page copy:\nWelcome to ${shortAddress}. Sign in to receive photos, disclosures, private showing slots, and nearby comparable homes.\n\nFields to capture:\n- Name\n- Phone\n- Email\n- Buying timeline: now, 30 days, 90 days, browsing\n- Financing: pre-approved, cash, needs lender, unknown\n- Interest level: hot, warm, cold\n- Main question or objection\n\nInstant routing:\n- Hot + pre-approved: send offer-readiness text and call within 15 minutes.\n- Warm + 30/90 days: send comps and ask must-haves.\n- Browsing: add to neighborhood nurture.\n\nPost-open-house SMS:\nThanks for stopping by ${shortAddress}. Based on what you saw, should I send comps, private showing times, or similar homes nearby?\n\nAgent note:\nThe QR page should feel like service, not lead capture. Offer value first: photos, comps, disclosure packet, showing slots.`
    },
    {
      id: "objections",
      title: "Objection Intelligence",
      subtitle: "Turn buyer resistance into seller strategy and better follow-up.",
      value: "Price signal",
      score: 95,
      body: `Objection tracker for ${shortAddress}:\n${(objections.length ? objections : ["price", "condition", "timing"]).map((item) => `- ${item}: log count, buyer segment, and whether it blocked an offer.`).join("\n")}\n\nSeller-safe interpretation:\nOne objection is feedback. Repeated objections are market data. We should not react emotionally, but we should watch patterns.\n\nResponse scripts:\nPrice: I understand. The useful question is whether the market agrees after comparing recent sales and current competition.\nCondition: That is fair. If the rest of the home works, we can discuss credits, repairs, or pricing strategy.\nTiming: If the home fits, the next step is to understand whether timing can be solved with terms.\n\nDecision rule:\n- High traffic + repeated same objection: adjust narrative or terms.\n- Low traffic + few showings: improve distribution, photos, or price.\n- High saves + low showings: CTA or qualification friction is too high.`
    },
    {
      id: "offer_room",
      title: "Offer Readiness Room",
      subtitle: "Checklist and scripts that move hot buyers toward real offers.",
      value: "More offers",
      score: 97,
      body: `Hot buyer readiness checklist:\n- Pre-approval or proof of funds confirmed\n- Decision makers identified\n- Preferred close date known\n- Contingencies discussed\n- Earnest money comfort range known\n- Offer ceiling reviewed against comps\n- Must-have vs nice-to-have list captured\n\nBuyer call script:\nIf you like ${shortAddress}, the smart move is to understand your strongest offer before emotions take over. We will look at comparable sales, likely competition, terms, and your ceiling so you can move decisively without overpaying.\n\nOffer strategy packet:\n- Top 3 comps\n- Seller-facing strengths\n- Buyer risk notes\n- Suggested terms\n- Walk-away number\n\nAgent next action:\nFor every hot showing, schedule an offer-readiness call before the buyer leaves the driveway.`
    },
    {
      id: "photo_ai",
      title: "Photo-to-Marketing Brief",
      subtitle: "Gemini-ready visual checklist for turning photos into stronger copy.",
      value: "Vision AI",
      score: 93,
      body: `Photo analysis prompt:\nReview uploaded listing photos and return structured observations for a real estate agent. Identify room type, standout features, light quality, condition cues, lifestyle angle, buyer objections, and recommended caption.\n\nExpected photo labels:\n- Curb appeal\n- Kitchen\n- Living room\n- Primary suite\n- Office/flex space\n- Patio/outdoor area\n- Neighborhood amenity\n\nMarketing extraction for ${shortAddress}:\n- Hero photo should support: ${h[0]}\n- Secondary photo should support: ${h[1] || "daily comfort"}\n- Lifestyle angle should support: ${input.audience}\n\nOutput JSON:\n{\n  "room": "kitchen",\n  "features": ["natural light", "updated counters"],\n  "condition_notes": [],\n  "caption": "A kitchen designed for weeknight ease and weekend hosting.",\n  "objection_risk": null\n}`
    },
    {
      id: "voice",
      title: "Agent Voice Profile",
      subtitle: "Save the agent's tone so every asset sounds like them.",
      value: "Brand moat",
      score: 91,
      body: `Voice profile for ${input.agentName || "this agent"}:\nTone: ${input.tone || "confident, warm, premium but not cheesy"}\nDefault stance: helpful expert, not pushy salesperson.\nPreferred phrasing:\n- Clear next steps\n- Seller-safe market language\n- Buyer-friendly lifestyle framing\n- Confident but grounded pricing language\n\nDo say:\n- Here is what the market is telling us.\n- The strongest buyer response so far is...\n- The next smart move is...\n\nAvoid:\n- Overhyped luxury language unless the property supports it\n- Generic dream home claims\n- Fear-based pressure\n- Unsupported price promises\n\nReusable instruction:\nWrite like a sharp local agent who respects the client's intelligence and always gives a next step.`
    },
    {
      id: "playbooks",
      title: "Reusable Listing Playbooks",
      subtitle: "Fast presets for common listing situations.",
      value: "Repeatable",
      score: 94,
      body: `Recommended playbook: ${input.propertyType} for ${input.audience}\n\nStarter home:\nLead with affordability, commute, monthly payment confidence, and first-time buyer education.\n\nMove-up family home:\nLead with space, school/lifestyle fit, work-from-home utility, storage, and weekend showing urgency.\n\nLuxury listing:\nLead with scarcity, privacy, design, provenance, and private appointment experience.\n\nInvestor rental:\nLead with rent potential, cap-rate inputs, maintenance risk, neighborhood demand, and exit options.\n\nPrice reduction:\nLead with fresh opportunity, corrected market position, renewed showing push, and urgency without sounding desperate.\n\nFor ${shortAddress}, use the move-up/lifestyle playbook unless showing feedback indicates price sensitivity is the dominant objection.`
    },
    {
      id: "calendar",
      title: "14-Day Content Calendar",
      subtitle: "Daily content plan from listing launch to seller review.",
      value: "14 posts",
      score: 92,
      body: `Day 1: Just listed post with ${h[0]}\nDay 2: Reel showing the strongest room or feature\nDay 3: Neighborhood convenience post for ${location}\nDay 4: Buyer FAQ: price, showing windows, disclosures\nDay 5: Open house announcement\nDay 6: Behind-the-scenes agent walkthrough\nDay 7: Seller update and traffic recap\nDay 8: Feature spotlight: ${h[1] || "layout"}\nDay 9: Similar homes/comps education\nDay 10: Objection response post: ${objections[0] || "why the home is worth a tour"}\nDay 11: Buyer testimonial or agent credibility post\nDay 12: Last-call showing push\nDay 13: Offer-readiness education\nDay 14: Market update and next strategy\n\nRule:\nDo not post random content. Every post should create a showing, answer an objection, reassure the seller, or qualify a buyer.`
    }
  ];

  return [
    {
      id: "listing",
      title: "MLS Listing Description",
      subtitle: "Polished copy ready for MLS, Zillow, flyers, and the website.",
      value: "Saves 45 min",
      score: 96,
      body: `${shortAddress} delivers the kind of ${input.propertyType.toLowerCase()} buyers keep waiting for in ${location}: ${input.beds} bedrooms, ${input.baths} baths, and ${input.sqft.toLocaleString()} square feet arranged for everyday ease.\n\nThe first impression is practical and emotional at once. Expect ${h.slice(0, 3).join(", ")}, plus a layout that makes daily life feel simpler. At ${money(input.price)}, the home is positioned for ${input.audience.toLowerCase()} who want confidence, comfort, and a clear path to move.\n\nWhat buyers will notice: ${h.map((item) => `\n- ${item}`).join("")}\n\n${objections.length ? `Common hesitation handled: ${objections.join("; ")}. The showing narrative should frame these early and redirect attention to the home's strongest lifestyle advantages.` : "Showing strategy: lead with the lifestyle, then anchor the value with nearby amenities, commute convenience, and the property's most photogenic rooms."}\n\n${cta}\n\n${signature}`
    },
    {
      id: "social",
      title: "Social Launch Pack",
      subtitle: "Instagram, Facebook, LinkedIn, and short-form captions.",
      value: "4 channels",
      score: 93,
      body: `Instagram Reel Hook:\nPOV: You found the ${input.beds}-bed ${input.propertyType.toLowerCase()} in ${location} that actually feels calm the second you walk in.\n\nCaption:\nJust listed: ${shortAddress}. ${h[0]} meets ${h[1] || "a practical layout"} in a home designed for buyers who want less friction and more everyday comfort. Save this one, send it to the person who keeps checking listings at midnight, and come see it before the weekend rush.\n\nFacebook:\nNew to market in ${location}: ${input.beds} bed, ${input.baths} bath, ${input.sqft.toLocaleString()} sq ft at ${money(input.price)}. The standout details are ${h.slice(0, 3).join(", ")}. Message me for the showing window and full photo set.\n\nLinkedIn:\nFresh listing opportunity in ${location}. This ${input.propertyType.toLowerCase()} is positioned for ${input.audience.toLowerCase()} with strong lifestyle appeal and clean buyer talking points: ${h.slice(0, 3).join(", ")}.\n\nHashtags:\n#${location.replace(/\s+/g, "")}RealEstate #JustListed #DreamHome #RealtorLife #OpenHouse`
    },
    {
      id: "email",
      title: "Buyer Email Sequence",
      subtitle: "Three-touch nurture flow for warm leads.",
      value: "3 emails",
      score: 91,
      body: `Email 1 Subject: New listing in ${location}: ${input.beds} beds with real buyer appeal\n\nHi {{first_name}},\n\nI wanted you to see ${shortAddress} before it gets buried in the weekend traffic. It has ${input.beds} bedrooms, ${input.baths} baths, ${input.sqft.toLocaleString()} sq ft, and the details buyers usually ask for first: ${h.slice(0, 3).join(", ")}.\n\nWould you like me to send the private showing windows?\n\n${signature}\n\nEmail 2 Subject: Why ${shortAddress} is worth a closer look\n\nThe strongest reason to tour this one is not just the specs. It is the combination of ${h[0]} and ${h[1] || "daily convenience"} at ${money(input.price)}. If you are comparing homes in ${location}, this is one I would put on the shortlist.\n\nEmail 3 Subject: Should I keep this one on your list?\n\nQuick check-in before showing slots fill up. If ${shortAddress} is close to what you want, I can help you compare it against the best alternatives and avoid overpaying for the wrong home.`
    },
    {
      id: "ads",
      title: "Paid Ad Variants",
      subtitle: "Hooks for Meta, Google, and retargeting.",
      value: "9 hooks",
      score: 88,
      body: `Meta Primary Text:\nA ${input.beds}-bed ${input.propertyType.toLowerCase()} in ${location} with ${h[0]}, ${h[1] || "strong layout"}, and the kind of details buyers notice fast. See photos and book your showing.\n\nGoogle Search Headlines:\n- ${input.beds} Bed Home In ${location}\n- Tour ${shortAddress}\n- New ${location} Listing\n- ${input.propertyType} For Sale\n\nRetargeting Angles:\n- Still comparing homes in ${location}? Start with this one.\n- The photos are good. The showing is better.\n- Private tours now open for qualified buyers.\n\nCTA Buttons:\nBook Showing, View Photos, Ask A Question`
    },
    {
      id: "seller",
      title: "Seller Proof Report",
      subtitle: "A client-facing recap that shows your work.",
      value: "Retention",
      score: 95,
      body: `Marketing plan for ${shortAddress}\n\nPositioning:\nThis home should be marketed around ${h.slice(0, 3).join(", ")} for ${input.audience.toLowerCase()}.\n\nAssets prepared:\n- MLS-ready listing description\n- Social launch captions for Instagram, Facebook, and LinkedIn\n- Three-part buyer nurture sequence\n- Paid ad hooks and retargeting copy\n- Showing objection strategy\n\nSeller-facing note:\nWe are not just putting the home online. We are packaging the property so buyers understand the value quickly, remember the strongest details, and have a clear next step to schedule a showing.`
    },
    {
      id: "followup",
      title: "Showing Follow-Up Scripts",
      subtitle: "Fast SMS and voicemail scripts after each tour.",
      value: "More offers",
      score: 90,
      body: `After Showing SMS:\nThanks for touring ${shortAddress}. Based on what you said, I think the strongest fit is ${h[0]}. Want me to send comps and next-step numbers?\n\nSoft Push SMS:\nThis one may move because it checks the common boxes: ${h.slice(0, 3).join(", ")}. Want to talk through offer strategy before the next showing block?\n\nVoicemail:\nHi {{first_name}}, it is ${input.agentName || "your agent"}. I wanted to follow up on ${shortAddress}. I pulled a few quick notes on value, likely competition, and where I think there may be room to negotiate. Call me when you have two minutes.`
    },
    {
      id: "pipeline",
      title: "Lead Pipeline Autopilot",
      subtitle: "CRM-lite action plan inspired by proven real estate pipeline systems.",
      value: "Next actions",
      score: 94,
      body: `Pipeline stages for this listing:\n${pipelineStages.map((stage, index) => `${index + 1}. ${stage.label}: ${stage.nextAction}`).join("\n")}\n\nHot lead scoring model:\n- Activity engagement: up to 40 points\n- Temperature: up to 25 points\n- Speed-to-lead: up to 20 points\n- Source quality: up to 15 points\n\nToday's top leads:\n${sampleLeads.map((lead) => {
        const score = scoreLead(lead);
        return `- ${lead.name}: ${score}/100 from ${lead.source}. Next move: ${score >= 75 ? "call now and send offer-readiness packet" : score >= 50 ? "send showing slots and ask timeline" : "add to nurture with value update"}.`;
      }).join("\n")}\n\nAgent rule: no lead should sit without a next action. Every conversation becomes a task, sequence, showing, offer, or nurture.`
    },
    {
      id: "cma",
      title: "Seller CMA & Comps Angle",
      subtitle: "A simple comp-scoring frame agents can explain to sellers.",
      value: "Win listing",
      score: 92,
      body: `CMA scoring framework for ${shortAddress}:\n- Location fit: 25 points\n- Property type fit: 20 points\n- Size similarity: 15 points\n- Bed/bath similarity: 15 points\n- Recency: 15 points\n- Feature overlap: 10 points\n\nSeller script:\nI do not price your home from a single comp or a guess. I score the closest comparable sales across location, property type, size, room count, recency, and feature overlap. Then I use the highest-confidence comps to choose a launch price that protects your upside without letting the listing go stale.\n\nPositioning note:\nAt ${money(input.price)}, lead with ${h.slice(0, 3).join(", ")}. If buyer feedback clusters around ${objections[0] || "price"}, prepare a proof-backed response using the top three comps and showing activity from the first 7 days.\n\nSeller report section:\n- Launch price rationale\n- Top competing active listings\n- Top sold comps\n- Buyer objections heard\n- Recommended adjustment trigger if showing activity is weak`
    },
    {
      id: "import",
      title: "Property Data Import Schema",
      subtitle: "Structured fields for MLS/Zillow/Realtor/Redfin-style extraction.",
      value: "JSON-ready",
      score: 89,
      body: `Use this schema for listing imports, comps, and future BrightData-style extraction:\n\n{\n  "address": "${shortAddress}",\n  "city": "${location}",\n  "price": ${input.price},\n  "bedrooms": ${input.beds},\n  "bathrooms": ${input.baths},\n  "square_feet": ${input.sqft},\n  "lot_size": null,\n  "year_built": null,\n  "property_type": "${input.propertyType}",\n  "listing_agent": "${input.agentName}",\n  "brokerage": "${input.brokerage}",\n  "days_on_market": null,\n  "mls_number": null,\n  "description": null,\n  "image_urls": [],\n  "neighborhood": "${location}",\n  "highlights": ${JSON.stringify(h)},\n  "known_objections": ${JSON.stringify(objections)}\n}\n\nImport guardrails:\n- Validate every numeric field before using it in pricing copy.\n- Store source URL and import timestamp.\n- Flag stale comps older than 180 days.\n- Never publish scraped descriptions verbatim; use them as facts, then generate original copy.`
    },
    {
      id: "ops",
      title: "Agent Ops Center",
      subtitle: "Daily execution board for launch, open houses, showings, and offers.",
      value: "Run the play",
      score: 97,
      body: `7-day launch calendar for ${shortAddress}:\nDay 0: finalize MLS copy, seller report, photo order, showing instructions, and disclosure packet.\nDay 1: publish listing, email buyer list, post social launch, start retargeting audience.\nDay 2: call hot leads, confirm showing slots, send lender-ready buyer packet.\nDay 3: publish neighborhood angle, price context, and behind-the-scenes reel.\nDay 4: seller update with traffic, saves, inquiries, showings, and objections.\nDay 5: open house push with SMS reminders, QR sign-in, and lender partner alert.\nDay 6: follow up with every visitor inside 60 minutes and segment buyers by urgency.\nDay 7: pricing and positioning review using showing volume, buyer feedback, and comp pressure.\n\nOpen-house capture fields:\n- Name, phone, email\n- Buyer timeline: now, 30 days, 90 days, browsing\n- Financing: pre-approved, cash, needs lender, unknown\n- Interest level: hot, warm, cold\n- Objection heard: price, layout, condition, location, timing\n- Next action: showing, comps, lender intro, offer call, nurture\n\nOffer readiness checklist:\n- Pre-approval or proof of funds\n- Preferred close date\n- Contingencies likely needed\n- Earnest money comfort range\n- Comp-backed offer ceiling\n- Decision maker confirmed\n\nRisk radar:\n${objections.length ? objections.map((item) => `- ${item}: prepare seller-approved response before showings.`).join("\n") : "- No major objections entered. Keep collecting buyer feedback after every showing."}\n\nRevenue hooks:\n- Seller plan: $49/listing or $99/mo for unlimited active listings.\n- Team plan: $199/mo for shared lead pipeline and seller updates.\n- Concierge upsell: $299/listing for done-for-you launch kit, ads, and weekly seller report.`
    },
    ...growthAssets
  ];
}

export const pipelineStages: PipelineStage[] = [
  { key: "new", label: "New lead", nextAction: "respond inside 5 minutes with showing availability" },
  { key: "qualified", label: "Qualified buyer", nextAction: "confirm budget, timeline, must-haves, and lender status" },
  { key: "showing", label: "Showing scheduled", nextAction: "send prep text, map link, and property one-sheet" },
  { key: "feedback", label: "Post-showing feedback", nextAction: "send follow-up within 60 minutes" },
  { key: "offer", label: "Offer strategy", nextAction: "send comps, seller context, and decision deadline" },
  { key: "nurture", label: "Long-term nurture", nextAction: "send weekly match, price-drop, or market update" }
];

export const sampleLeads: LeadSignal[] = [
  { name: "Sarah M.", source: "referral", temperature: "hot", activities: 7, lastActivityDays: 1, firstContactHours: 1 },
  { name: "Daniel R.", source: "open_house", temperature: "warm", activities: 4, lastActivityDays: 3, firstContactHours: 4 },
  { name: "Priya K.", source: "zillow", temperature: "warm", activities: 2, lastActivityDays: 9, firstContactHours: 18 }
];

export function scoreLead(lead: LeadSignal): number {
  const activity = lead.activities >= 10 ? 20 : lead.activities >= 5 ? 14 : lead.activities >= 3 ? 8 : lead.activities >= 1 ? 4 : 0;
  const recency = lead.lastActivityDays <= 2 ? 20 : lead.lastActivityDays <= 7 ? 14 : lead.lastActivityDays <= 14 ? 8 : lead.lastActivityDays <= 30 ? 4 : 0;
  const temp = lead.temperature === "hot" ? 25 : lead.temperature === "warm" ? 14 : 0;
  const speed = lead.firstContactHours <= 1 ? 20 : lead.firstContactHours <= 4 ? 15 : lead.firstContactHours <= 24 ? 10 : lead.firstContactHours <= 72 ? 5 : 0;
  const source = ["referral", "past_client", "sphere", "sign_call", "open_house"].includes(lead.source) ? 15 : ["website", "zillow", "realtor_com", "mls"].includes(lead.source) ? 8 : 3;
  return Math.min(activity + recency + temp + speed + source, 100);
}

export const starterInput: PropertyInput = {
  address: "1842 Laurel Canyon Drive",
  city: "Austin",
  price: 749000,
  beds: 4,
  baths: 3,
  sqft: 2680,
  propertyType: "Single-family home",
  audience: "move-up buyers and relocating tech families",
  tone: "confident, warm, premium but not cheesy",
  highlights: "renovated chef's kitchen, private home office, covered patio, mature trees, top-rated schools, 12 minutes to downtown",
  objections: "price sensitivity, older roof disclosed with credit, busy weekend showing schedule",
  agentName: "Maya Patel",
  brokerage: "RealityCentral Realty Group",
  phone: "(512) 555-0184",
  email: "maya@realitycentral.ai"
};

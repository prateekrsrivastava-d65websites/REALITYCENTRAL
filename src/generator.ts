import type { Asset, PropertyInput } from "./types";

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
    }
  ];
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
  brokerage: "Nonlinear Realty Group",
  phone: "(512) 555-0184",
  email: "maya@nonlinearlistings.ai"
};

import { enforceRateLimit } from "../_lib/rate-limit";
import { json, problem, readJson } from "../_lib/http";
import type { Env } from "../_lib/types";

type ListingPayload = {
  address?: string;
  city?: string;
  price?: number;
  beds?: number;
  baths?: number;
  sqft?: number;
  highlights?: string;
  audience?: string;
};

const required = ["address", "city", "price", "beds", "baths", "sqft"] as const;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const allowed = await enforceRateLimit(env, ip, Number(env.AI_IP_MINUTE_LIMIT || 12), 60);
    if (!allowed) return problem(429, "RATE_LIMITED", "Too many requests. Please try again in a minute.");

    const payload = await readJson<ListingPayload>(request);
    const missing = required.filter((key) => payload[key] === undefined || payload[key] === "");
    if (missing.length) return problem(400, "MISSING_FIELDS", `Missing required fields: ${missing.join(", ")}`);

    const prompt = [
      "Create a high-converting real estate marketing kit for an agent.",
      "Return concise JSON with keys: listingDescription, socialCaptions, emailSequence, adHooks, sellerReport, followUpScripts, leadPipeline, cmaTalkingPoints, importSchema, agentOpsPlan, sellerUpdate, openHouseCapture, objectionIntelligence, offerReadinessRoom, photoMarketingBrief, agentVoiceProfile, listingPlaybooks, contentCalendar.",
      `Property: ${payload.address}, ${payload.city}.`,
      `Specs: ${payload.beds} beds, ${payload.baths} baths, ${payload.sqft} sqft, price ${payload.price}.`,
      `Audience: ${payload.audience || "qualified buyers"}.`,
      `Highlights: ${payload.highlights || "strong layout, lifestyle appeal, local convenience"}.`,
      "Lead pipeline should score buyer urgency using activity, temperature, response speed, and source quality.",
      "CMA talking points should explain comparable selection using location, type, size, rooms, recency, and feature overlap.",
      "Import schema must use snake_case keys and never reuse third-party listing descriptions verbatim.",
      "Agent ops plan should include a 7-day launch calendar, open-house capture fields, offer readiness checklist, and revenue upsells.",
      "Seller update should summarize activity, buyer reactions, objections, and next recommendation.",
      "Open-house capture should include QR sign-in fields and immediate follow-up routing.",
      "Objection intelligence should turn repeated feedback into seller-safe strategy.",
      "Offer readiness should help a hot buyer become a serious offer.",
      "Photo marketing brief should be suitable for Gemini vision analysis.",
      "Agent voice profile should preserve the realtor's tone across all outputs.",
      "Content calendar should produce 14 days of posts tied to showing demand."
    ].join("\n");

    return json({
      mode: env.GROQ_API_KEY || env.GEMINI_API_KEY ? "ready_for_ai_provider" : "deterministic_fallback",
      prompt,
      next: "Wire this function to Groq/Gemini once secrets are set. The static app already provides instant local generation."
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "PAYLOAD_TOO_LARGE") return problem(413, "PAYLOAD_TOO_LARGE", "Payload is too large.");
    if (message === "RATE_LIMIT_SECRET_UNCONFIGURED") return problem(500, "RATE_LIMIT_SECRET_UNCONFIGURED", "Rate limiting secret is not configured.");
    return problem(500, "MARKETING_KIT_FAILED", "Could not generate marketing kit.");
  }
};

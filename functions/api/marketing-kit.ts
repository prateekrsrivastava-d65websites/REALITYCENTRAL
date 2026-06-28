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
      "Return concise JSON with keys: listingDescription, socialCaptions, emailSequence, adHooks, sellerReport, followUpScripts.",
      `Property: ${payload.address}, ${payload.city}.`,
      `Specs: ${payload.beds} beds, ${payload.baths} baths, ${payload.sqft} sqft, price ${payload.price}.`,
      `Audience: ${payload.audience || "qualified buyers"}.`,
      `Highlights: ${payload.highlights || "strong layout, lifestyle appeal, local convenience"}.`
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

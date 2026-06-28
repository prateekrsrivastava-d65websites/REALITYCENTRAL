import type { Env } from "./types";

async function sha256(value: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function enforceRateLimit(env: Env, rawKey: string, limit: number, windowSeconds = 60): Promise<boolean> {
  if (!env.DB) return true;
  if (!env.IP_HASH_SECRET || env.IP_HASH_SECRET.length < 24) throw new Error("RATE_LIMIT_SECRET_UNCONFIGURED");
  const now = Math.floor(Date.now() / 1000);
  const windowStart = Math.floor(now / windowSeconds) * windowSeconds;
  const keyHash = await sha256(`${env.IP_HASH_SECRET}:${rawKey}`);
  const result = await env.DB.prepare(`
    INSERT INTO rate_limits (key_hash, window_start, request_count, expires_at)
    VALUES (?, ?, 1, ?)
    ON CONFLICT(key_hash, window_start) DO UPDATE SET request_count = request_count + 1
    RETURNING request_count
  `).bind(keyHash, windowStart, windowStart + windowSeconds * 2).first<{ request_count: number }>();
  return Boolean(result && result.request_count <= limit);
}

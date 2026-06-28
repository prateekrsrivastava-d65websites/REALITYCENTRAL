export function json(data: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "private, no-store");
  return new Response(JSON.stringify(data), { ...init, headers });
}

export function problem(status: number, code: string, message: string): Response {
  return json({ error: { code, message } }, { status });
}

export async function readJson<T>(request: Request, maxBytes = 32_768): Promise<T> {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > maxBytes) throw new Error("PAYLOAD_TOO_LARGE");
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > maxBytes) throw new Error("PAYLOAD_TOO_LARGE");
  return JSON.parse(text) as T;
}

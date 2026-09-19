import { formatErrorLog, sanitizeErrorReport } from "@/lib/errorReport.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 30;
// Best-effort per-instance throttle. It bounds log noise from one client; it is
// not a security boundary, because this endpoint stores nothing and only logs.
const recent = new Map();

function throttled(key, now = Date.now()) {
  const entry = recent.get(key);
  if (!entry || now - entry.start > WINDOW_MS) {
    if (recent.size > 5000) recent.clear();
    recent.set(key, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // sendBeacon from some browsers omits it
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

const empty = (status) => new Response(null, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request) {
  if (!sameOrigin(request)) return empty(403);
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BYTES) return empty(413);

  const client = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (throttled(client)) return empty(429);

  let payload;
  try {
    const text = await request.text();
    if (text.length > MAX_BYTES) return empty(413);
    payload = JSON.parse(text);
  } catch {
    return empty(400);
  }

  console.error(formatErrorLog("client", sanitizeErrorReport(payload), process.env));
  return empty(204);
}

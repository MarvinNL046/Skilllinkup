// Shared, dependency-free helpers for error reporting. Reports are written as
// one structured log line so they are searchable in the hosting logs today and
// can be forwarded to an error-tracking service later without touching callers.
//
// Privacy: a report never contains query strings, request bodies, cookies or
// headers, and obvious personal data inside messages is masked.

const LIMITS = { message: 500, stack: 4000, path: 200, source: 40, digest: 80, component: 2000 };

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const LONG_TOKEN = /\b[A-Za-z0-9_-]{32,}\b/g;
const PHONE = /\+?\d[\d\s().-]{8,}\d/g;

export function maskPersonalData(value) {
  return String(value ?? "")
    .replace(EMAIL, "[email]")
    .replace(LONG_TOKEN, "[token]")
    .replace(PHONE, "[number]");
}

function clip(value, max) {
  const text = maskPersonalData(value);
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/** Keep only the pathname; ids in query strings and fragments are dropped. */
export function safePath(value) {
  const raw = String(value ?? "");
  try {
    return clip(new URL(raw, "https://skilllinkup.invalid").pathname, LIMITS.path);
  } catch {
    return clip(raw.split(/[?#]/)[0], LIMITS.path);
  }
}

/** Normalise untrusted input from the browser into a bounded, masked report. */
export function sanitizeErrorReport(input) {
  const data = input && typeof input === "object" ? input : {};
  const message = clip(data.message || "Unknown error", LIMITS.message);
  return {
    message,
    stack: data.stack ? clip(data.stack, LIMITS.stack) : undefined,
    componentStack: data.componentStack ? clip(data.componentStack, LIMITS.component) : undefined,
    digest: data.digest ? clip(data.digest, LIMITS.digest) : undefined,
    path: safePath(data.path),
    source: clip(data.source || "client", LIMITS.source),
  };
}

export function releaseInfo(env = {}) {
  const commit = env.SKILLLINKUP_RELEASE_SHA ?? env.VERCEL_GIT_COMMIT_SHA;
  return {
    commit: commit ? String(commit).slice(0, 12) : "local",
    environment: env.VERCEL_ENV ?? env.NODE_ENV ?? "unknown",
  };
}

/** One JSON line per error, prefixed so log searches and drains can match it. */
export function formatErrorLog(kind, report, env = {}) {
  return `[skilllinkup-error] ${JSON.stringify({ kind, ...report, ...releaseInfo(env), at: new Date().toISOString() })}`;
}

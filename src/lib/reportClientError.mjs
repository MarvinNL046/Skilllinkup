import { sanitizeErrorReport } from "./errorReport.mjs";

// Browser-side reporter. It never throws, never blocks the UI and cannot flood
// the endpoint: identical errors are sent once and a page load sends at most ten.
const ENDPOINT = "/api/monitoring/client-error";
const MAX_PER_PAGE = 10;
const sent = new Set();

export function reportClientError(error, context = {}) {
  try {
    if (typeof window === "undefined") return false;
    const report = sanitizeErrorReport({
      message: error?.message ?? String(error ?? "Unknown error"),
      stack: error?.stack,
      digest: error?.digest,
      componentStack: context.componentStack,
      path: window.location?.pathname,
      source: context.source ?? "client",
    });
    const key = `${report.source}:${report.message}:${report.path}`;
    if (sent.has(key) || sent.size >= MAX_PER_PAGE) return false;
    sent.add(key);
    const body = JSON.stringify(report);
    if (navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "application/json" }))) return true;
    fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
    return true;
  } catch {
    return false;
  }
}

/** Test helper: forget what was already reported on this page. */
export function resetReportedErrors() {
  sent.clear();
}

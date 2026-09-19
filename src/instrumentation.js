import { formatErrorLog, sanitizeErrorReport } from "@/lib/errorReport.mjs";

// Server-side errors from rendering, route handlers, server actions and the
// proxy are written as one structured, privacy-safe log line. Headers, cookies
// and query strings are deliberately left out.
export async function onRequestError(error, request, context) {
  try {
    const report = sanitizeErrorReport({
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      digest: typeof error === "object" && error !== null && "digest" in error ? String(error.digest) : undefined,
      path: request?.path,
      source: `server:${context?.routeType ?? "unknown"}`,
    });
    console.error(formatErrorLog("server", { ...report, method: request?.method, route: context?.routePath }, process.env));
  } catch {
    // Reporting must never mask the original failure.
  }
}

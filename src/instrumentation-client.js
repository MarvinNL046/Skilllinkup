import { reportClientError } from "@/lib/reportClientError.mjs";

// Uncaught browser errors and unhandled promise rejections that never reach a
// React error boundary are still reported.
try {
  window.addEventListener("error", (event) => {
    reportClientError(event.error ?? new Error(event.message), { source: "window.error" });
  });
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    reportClientError(reason instanceof Error ? reason : new Error(String(reason)), { source: "unhandledrejection" });
  });
} catch {
  // Monitoring must never break the page.
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { reportClientError } from "@/lib/reportClientError.mjs";

// A failing query or a malformed id keeps the dashboard shell and navigation
// instead of replacing the whole workspace with the site-wide error page.
export default function DashboardError({ error, retry, reset }) {
  useEffect(() => {
    console.error("[Skilllinkup dashboard error]", error);
    reportClientError(error, { source: "dashboard-boundary" });
  }, [error]);
  const tryAgain = retry ?? reset;

  return (
    <DashboardLayout maxWidth="medium">
      <section
        role="alert"
        className="mx-auto max-w-2xl rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-8"
      >
        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          Something went wrong
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          We could not load this page.
        </h1>
        <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
          The item may have been removed, may belong to another account, or the
          link may be incomplete. Your saved work is not affected.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {tryAgain ? (
            <Button type="button" onClick={() => tryAgain()}>
              <RefreshCw aria-hidden="true" />
              Try again
            </Button>
          ) : null}
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-[var(--text-secondary)]">
          If this keeps happening, contact{" "}
          <a href="mailto:support@skilllinkup.com">support@skilllinkup.com</a>.
        </p>
      </section>
    </DashboardLayout>
  );
}

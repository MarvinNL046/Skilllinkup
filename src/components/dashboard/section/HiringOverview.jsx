"use client";
import { useState } from "react";
import Link from "next/link";
import { useQuery, usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import DashboardTabs from "../element/DashboardTabs";
import styles from "./HiringOverview.module.css";

const invitationLabels = {
  pending: "Awaiting response",
  interested: "Interested",
  declined: "Declined",
  withdrawn: "Withdrawn",
};
const applicationLabels = {
  submitted: "Submitted",
  screening: "In review",
  interview: "Interview",
  offer: "Offer",
  hired: "Hired",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};
function Invitations({ jobId, onApplication }) {
  const [filter, setFilter] = useState("all");
  const { results, status, loadMore } = usePaginatedQuery(
    api.marketplace.hiringPipeline.invitations,
    { jobId, ...(filter === "all" ? {} : { status: filter }) },
    { initialNumItems: 25 },
  );
  return (
    <section aria-label="Invitations for this vacancy">
      <label className={styles.filter}>
        Invitation response
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All invitations</option>
          {Object.entries(invitationLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      {status === "LoadingFirstPage" && (
        <p role="status">Loading invitations…</p>
      )}
      {!results.length && status === "Exhausted" && (
        <div className={styles.card}>
          <h2>No invitations in this view</h2>
          <p>
            Invite candidates who have chosen to receive vacancy invitations, or
            choose another response filter.
          </p>
          <Button asChild variant="outline">
            <Link href="/dashboard/candidates">Find candidates</Link>
          </Button>
        </div>
      )}
      <div className={styles.list}>
        {results.map((item) => (
          <article className={styles.card} key={item._id}>
            <h2>{item.candidateName}</h2>
            <p>Invitation: {invitationLabels[item.status]}</p>
            <p>
              Sent{" "}
              {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                item.createdAt,
              )}{" "}
              · Invitation deadline{" "}
              {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                item.expiresAt,
              )}
            </p>
            {item.note && <p className={styles.note}>{item.note}</p>}
            {item.applicationId ? (
              <>
                <p>
                  <strong>
                    Application:{" "}
                    {applicationLabels[item.applicationStatus] ||
                      item.applicationStatus}
                  </strong>
                </p>
                <Button onClick={() => onApplication(item.applicationId)}>
                  Review application
                </Button>
              </>
            ) : (
              <p>
                {item.status === "interested"
                  ? "Interested — no application received yet."
                  : "No application received."}
              </p>
            )}
          </article>
        ))}
      </div>
      {status !== "LoadingFirstPage" && (
        <p role="status">
          {results.length} invitations loaded
          {status === "Exhausted" ? " · All loaded" : ""}
        </p>
      )}
      {status !== "LoadingFirstPage" && status !== "Exhausted" && (
        <Button
          variant="outline"
          disabled={status !== "CanLoadMore"}
          onClick={() => loadMore(25)}
        >
          {status === "LoadingMore" ? "Loading…" : "Load more invitations"}
        </Button>
      )}
    </section>
  );
}
export default function HiringOverview({ jobId, view, onView, onApplication }) {
  const summary = useQuery(api.marketplace.hiringPipeline.summary, { jobId });
  return (
    <section className={styles.overview} aria-label="Vacancy hiring overview">
      {summary ? (
        <>
          <h2>{summary.title}</h2>
          <div className={styles.metrics}>
            {[
              ["Invitations sent", summary.invited],
              ["Interested replies", summary.interested],
              ["Applications received", summary.applications],
            ].map(([label, count]) => (
              <div className={styles.card} key={label}>
                <strong>
                  {count.value}
                  {count.capped ? "+" : ""}
                </strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p>
            These totals can overlap: an invited candidate may also have
            applied. Applications include closed and withdrawn submissions;
            drafts are excluded. Totals above 500 are shown as 500+.
          </p>
        </>
      ) : (
        <p role="status">Loading vacancy overview…</p>
      )}
      <DashboardTabs
        value={view}
        onChange={onView}
        ariaLabel="Hiring activity"
        options={[
          { value: "applications", label: "Applications" },
          { value: "invitations", label: "Invitations & interest" },
        ]}
      />
      {view === "invitations" && (
        <Invitations jobId={jobId} onApplication={onApplication} />
      )}
    </section>
  );
}

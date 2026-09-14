"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMutation, usePaginatedQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import DashboardNavigation from "../header/DashboardNavigation";
import styles from "./CandidateProfile.module.css";

const labels = {
  pending: "Awaiting response",
  interested: "Interested",
  declined: "Declined",
  withdrawn: "Withdrawn",
};
function Invitation({ item, audience, now }) {
  const respond = useMutation(api.marketplace.jobInvitations.respond),
    withdraw = useMutation(api.marketplace.jobInvitations.withdraw);
  const [busy, setBusy] = useState(false),
    [confirm, setConfirm] = useState(null);
  const lock = useRef(false);
  const current = item.available && item.expiresAt > now;
  const candidate = audience === "candidate";
  async function act(response) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    try {
      const args = {
        invitationId: item._id,
        expectedUpdatedAt: item.updatedAt,
      };
      if (candidate) await respond({ ...args, response });
      else await withdraw(args);
      setConfirm(null);
      toast.success(
        response === "interested"
          ? "Interest shared. Review the vacancy to decide whether to apply."
          : response === "declined"
            ? "Invitation declined."
            : "Invitation withdrawn.",
      );
    } catch (error) {
      toast.error(
        error?.message || "Your response could not be saved. Try again.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <article className={styles.card}>
      <p>
        {item.status === "pending" && !current
          ? "No longer available"
          : labels[item.status]}
      </p>
      <h2>{item.jobTitle}</h2>
      <p>
        {candidate
          ? `From ${item.companyName}`
          : `Invited: ${item.candidateName}`}
      </p>
      {item.note && <p className={styles.summary}>{item.note}</p>}
      <p>
        Sent{" "}
        {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
          item.createdAt,
        )}{" "}
        · Expires{" "}
        {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
          item.expiresAt,
        )}
      </p>
      {item.status === "interested" && (
        <p>
          {candidate
            ? "You shared your interest. This does not submit an application. Use the vacancy page to submit or check your application."
            : "The candidate shared their interest. Check your applicants to see whether they have applied."}
        </p>
      )}
      <div className={styles.actions}>
        {!candidate && item.jobId && (
          <Button asChild variant="outline">
            <Link href={`/manage-jobs/${item.jobId}/applications`}>
              Hiring overview
            </Link>
          </Button>
        )}
        {current && item.jobHref && (
          <Button asChild variant="outline">
            <Link href={item.jobHref}>
              {candidate && item.status === "interested"
                ? "Review vacancy and apply"
                : "View vacancy"}
            </Link>
          </Button>
        )}
        {item.status === "pending" &&
          !confirm &&
          (candidate ? (
            <>
              <Button
                disabled={busy || !current}
                onClick={() => setConfirm("interested")}
              >
                I’m interested
              </Button>
              <Button
                variant="outline"
                disabled={busy}
                onClick={() => setConfirm("declined")}
              >
                Decline
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => setConfirm("withdrawn")}
            >
              Withdraw invitation
            </Button>
          ))}
      </div>
      {item.status === "pending" && confirm && (
        <div role="group" aria-label="Confirm invitation response">
          <p>
            {confirm === "interested"
              ? "Let this company know you are interested? This shares your response only. Your CV and email stay under your existing privacy choices, and no application is submitted."
              : confirm === "declined"
                ? "Decline this invitation? The company will see your decision and cannot invite you to this vacancy again."
                : "Withdraw this pending invitation? The candidate will no longer be able to accept it."}
          </p>
          <div className={styles.actions}>
            <Button
              disabled={busy || (confirm === "interested" && !current)}
              onClick={() => act(confirm)}
            >
              {busy ? "Saving…" : "Confirm"}
            </Button>
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => setConfirm(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </article>
  );
}
export default function JobInvitations({ audience }) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.marketplace.jobInvitations.listMine,
    { audience },
    { initialNumItems: 20 },
  );
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  const candidate = audience === "candidate";
  return (
    <div className={styles.page}>
      <DashboardNavigation />
      <header>
        <p>Jobs · Invitations</p>
        <h1>{candidate ? "Your vacancy invitations" : "Sent invitations"}</h1>
        <p>
          {candidate
            ? "Explore roles that employers think could suit you. You decide whether to respond or apply."
            : "Follow the invitations you sent and each candidate’s response. An interested response is not an application."}
        </p>
      </header>
      <div className={styles.actions}>
        <Button asChild variant="outline">
          <Link
            href={
              candidate
                ? "/dashboard/candidate-profile"
                : "/dashboard/candidates"
            }
          >
            {candidate ? "Manage invitation preferences" : "Find candidates"}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={candidate ? "/dashboard/applications" : "/manage-jobs"}>
            {candidate ? "My applications" : "Manage vacancies"}
          </Link>
        </Button>
      </div>
      {status === "LoadingFirstPage" && (
        <p role="status">Loading invitations…</p>
      )}
      {!results.length && status === "Exhausted" && (
        <section className={styles.card}>
          <h2>No invitations yet</h2>
          <p>
            {candidate
              ? "To receive invitations, make your profile discoverable and turn on vacancy invitations in My profile & CV. You can also browse and apply to jobs yourself."
              : "Find a candidate who accepts invitations, choose one of your open vacancies and add a short personal note."}
          </p>
        </section>
      )}
      <div className={styles.list}>
        {results.map((item) => (
          <Invitation
            key={item._id}
            item={item}
            audience={audience}
            now={now}
          />
        ))}
      </div>
      {status !== "Exhausted" && status !== "LoadingFirstPage" && (
        <Button
          variant="outline"
          disabled={status !== "CanLoadMore"}
          onClick={() => loadMore(20)}
        >
          {status === "LoadingMore" ? "Loading…" : "Load more invitations"}
        </Button>
      )}
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMutation, usePaginatedQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import DashboardNavigation from "../header/DashboardNavigation";
import styles from "./CandidateProfile.module.css";

const labels = {
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
  rejected: "Closed",
  withdrawn: "Withdrawn",
};
const dialogCopy = {
  interested: {
    title: "Share your interest?",
    body: "This lets the company know you are interested. It shares your response only: your CV and email stay under your existing privacy choices, and no application is submitted.",
    confirm: "Confirm interest",
    success: "Interest shared. Review the vacancy to decide whether to apply.",
  },
  declined: {
    title: "Decline this invitation?",
    body: "The company will see your decision and cannot invite you to this vacancy again. You can still apply to it yourself later.",
    confirm: "Decline invitation",
    success: "Invitation declined.",
  },
  withdrawn: {
    title: "Withdraw this invitation?",
    body: "The candidate will no longer be able to respond to it, and you cannot invite them to this vacancy again.",
    confirm: "Withdraw invitation",
    success: "Invitation withdrawn.",
  },
};
// A pending invitation can still be answered only while the vacancy, company
// and candidate remain eligible and the deadline has not passed.
const isCurrent = (item, now) => item.available && item.expiresAt > now;
function statusLabel(item, now) {
  if (item.status !== "pending") return labels[item.status];
  if (item.expiresAt <= now) return "Expired";
  return item.available ? labels.pending : "No longer available";
}
function nextStep(item, candidate, now) {
  const current = isCurrent(item, now);
  if (item.applicationId)
    return candidate
      ? "You submitted an application for this vacancy. Follow its status in My applications; this invitation needs no further response."
      : "The candidate submitted an application for this vacancy. Review it to decide on the next stage.";
  if (item.status === "pending" && item.expiresAt <= now)
    return candidate
      ? "This invitation has expired. No response is needed."
      : "This invitation expired without a response. You cannot invite this candidate to this vacancy again.";
  if (item.status === "pending" && !current)
    return candidate
      ? "This vacancy is no longer open for invitations. No response is needed."
      : "This invitation is no longer active because the vacancy closed or your company verification changed.";
  if (item.status === "pending")
    return candidate
      ? "Decide whether you are interested. Showing interest only shares your response; it does not submit an application or share your CV or email."
      : "Waiting for the candidate. They can show interest, decline, or apply directly from the vacancy.";
  if (item.status === "interested")
    return candidate
      ? current
        ? "You shared your interest. No application has been submitted yet. Review the vacancy and apply if you want to be considered."
        : "You shared your interest, but the vacancy is no longer open. No application was submitted."
      : "The candidate is interested but has not applied yet. They decide whether to apply; you will see any application here and in the hiring overview.";
  if (item.status === "declined")
    return candidate
      ? "You declined this invitation. The company cannot invite you to this vacancy again."
      : "The candidate declined this invitation. You cannot invite them to this vacancy again.";
  return candidate
    ? "The company withdrew this invitation. No response is needed."
    : "You withdrew this invitation. The candidate can no longer respond to it.";
}
function Invitation({ item, audience, now, onChoose }) {
  const candidate = audience === "candidate";
  const current = isCurrent(item, now);
  const dates = new Intl.DateTimeFormat("en", { dateStyle: "medium" });
  const applicationHref = item.applicationId
    ? candidate
      ? `/dashboard/applications?application=${item.applicationId}`
      : `/manage-jobs/${item.jobId}/applications?application=${item.applicationId}`
    : null;
  return (
    <article className={styles.card}>
      <p>{statusLabel(item, now)}</p>
      <h2>{item.jobTitle}</h2>
      <p>
        {candidate
          ? `From ${item.companyName}`
          : `Invited: ${item.candidateName}`}
      </p>
      {item.note && <p className={styles.summary}>{item.note}</p>}
      <p>
        Sent {dates.format(item.createdAt)} · Expires{" "}
        {dates.format(item.expiresAt)}
      </p>
      {item.applicationId && (
        <p>
          <strong>
            Application:{" "}
            {applicationLabels[item.applicationStatus] ||
              item.applicationStatus}
          </strong>
        </p>
      )}
      <section aria-label="Next step">
        <h3>{candidate ? "Your next step" : "Next step"}</h3>
        <p>{nextStep(item, candidate, now)}</p>
      </section>
      <div className={styles.actions}>
        {applicationHref && (
          <Button asChild>
            <Link href={applicationHref}>
              {candidate ? "Manage application" : "Review application"}
            </Link>
          </Button>
        )}
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
              {candidate && item.status === "interested" && !item.applicationId
                ? "Review vacancy and apply"
                : "View vacancy"}
            </Link>
          </Button>
        )}
        {item.status === "pending" &&
          current &&
          (candidate ? (
            <>
              <Button
                type="button"
                onClick={(event) => onChoose(item, "interested", event)}
              >
                I’m interested
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={(event) => onChoose(item, "declined", event)}
              >
                Decline
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={(event) => onChoose(item, "withdrawn", event)}
            >
              Withdraw invitation
            </Button>
          ))}
      </div>
    </article>
  );
}
export default function JobInvitations({ audience, invitationId }) {
  const candidate = audience === "candidate";
  const basePath = candidate
    ? "/dashboard/job-invitations"
    : "/dashboard/sent-invitations";
  const { results, status, loadMore } = usePaginatedQuery(
    api.marketplace.jobInvitations.listMine,
    { audience, ...(invitationId !== undefined ? { invitationId } : {}) },
    { initialNumItems: 20 },
  );
  const respond = useMutation(api.marketplace.jobInvitations.respond),
    withdraw = useMutation(api.marketplace.jobInvitations.withdraw);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  const [selection, setSelection] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const cancelRef = useRef(null);
  const triggerRef = useRef(null);
  const headingRef = useRef(null);
  const selected = results.find((item) => item._id === selection?.id);
  // The confirmation is only valid while the loaded invitation is unchanged.
  const selectionIsCurrent =
    !!selected &&
    selected.status === "pending" &&
    selected.updatedAt === selection.updatedAt &&
    isCurrent(selected, now);
  const copy = selection ? dialogCopy[selection.action] : null;
  function choose(item, action, event) {
    if (lock.current) return;
    triggerRef.current = event?.currentTarget ?? null;
    setError("");
    setSelection({
      id: item._id,
      action,
      title: item.jobTitle,
      updatedAt: item.updatedAt,
    });
  }
  function close() {
    if (lock.current) return;
    setSelection(null);
    setError("");
  }
  async function confirm() {
    if (lock.current || !selectionIsCurrent) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const args = {
        invitationId: selected._id,
        expectedUpdatedAt: selected.updatedAt,
      };
      if (candidate) await respond({ ...args, response: selection.action });
      else await withdraw(args);
      toast.success(copy.success);
      setSelection(null);
    } catch (caught) {
      const message =
        caught?.message || "Your response could not be saved. Try again.";
      setError(message);
      toast.error(message);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <div className={styles.page}>
      <DashboardNavigation />
      <header>
        <p>Jobs · Invitations</p>
        <h1 ref={headingRef} tabIndex={-1}>
          {candidate ? "Your vacancy invitations" : "Sent invitations"}
        </h1>
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
      {invitationId !== undefined && (
        <section className={styles.card} aria-label="Selected invitation">
          <p>
            Showing the selected invitation. The status below is the latest
            update.
          </p>
          <Button asChild variant="outline">
            <Link href={basePath}>Show all invitations</Link>
          </Button>
        </section>
      )}
      {status === "LoadingFirstPage" && (
        <p role="status">Loading invitations…</p>
      )}
      {!results.length && status === "Exhausted" && (
        <section className={styles.card}>
          <h2>
            {invitationId !== undefined
              ? "Invitation not available"
              : "No invitations yet"}
          </h2>
          <p>
            {invitationId !== undefined
              ? "This invitation may have been removed or belong to another account. Show all invitations to continue."
              : candidate
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
            onChoose={choose}
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
      <Dialog
        open={selection !== null}
        onOpenChange={(open) => {
          if (!open) close();
        }}
      >
        <DialogContent
          className="max-w-[calc(100vw-2rem)] sm:max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg data-[state=closed]:invisible"
          showCloseButton={!busy}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            cancelRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const trigger = triggerRef.current;
            if (trigger?.isConnected && !trigger.disabled) trigger.focus();
            else headingRef.current?.focus();
          }}
        >
          <DialogHeader>
            <DialogTitle>{copy?.title}</DialogTitle>
            <DialogDescription>
              {selection ? `“${selection.title}”. ` : ""}
              {copy?.body}
            </DialogDescription>
          </DialogHeader>
          {selection && !selectionIsCurrent && (
            <p role="status">
              This invitation has changed and can no longer be answered. Close
              this window to see its latest status.
            </p>
          )}
          {error && <p role="alert">{error}</p>}
          <DialogFooter className="gap-2">
            <Button
              ref={cancelRef}
              type="button"
              variant="outline"
              disabled={busy}
              onClick={close}
            >
              {selectionIsCurrent ? "Cancel" : "Close"}
            </Button>
            <Button
              type="button"
              variant={
                selection?.action === "interested" ? "default" : "destructive"
              }
              disabled={busy || !selectionIsCurrent}
              onClick={confirm}
            >
              {busy ? "Saving…" : copy?.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

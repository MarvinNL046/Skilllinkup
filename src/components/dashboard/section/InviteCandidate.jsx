"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useMutation, usePaginatedQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import styles from "./CandidateProfile.module.css";

function InvitationForm({ profile, close }) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.marketplace.jobInvitations.options,
    { profileId: profile._id },
    { initialNumItems: 20 },
  );
  const send = useMutation(api.marketplace.jobInvitations.send);
  const [jobId, setJobId] = useState(""),
    [note, setNote] = useState(""),
    [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const chosen = results.find(
    (job) => job._id === jobId && !job.unavailableReason,
  );
  async function submit(event) {
    event.preventDefault();
    if (!chosen || lock.current) return;
    lock.current = true;
    setBusy(true);
    try {
      await send({ profileId: profile._id, jobId, note });
      toast.success(
        "Invitation saved. You can track the response in Sent invitations.",
      );
      close();
    } catch (error) {
      toast.error(
        error?.message ||
          "The invitation could not be sent. Your draft is still here.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <form
      onSubmit={submit}
      className={styles.form}
      aria-label={`Invite ${profile.displayName}`}
    >
      <p>
        Invite {profile.displayName} to one specific vacancy. They choose
        whether to show interest or apply. An invitation does not unlock their
        CV or email.
      </p>
      <label>
        Choose your vacancy
        <select
          required
          value={jobId}
          disabled={busy}
          onChange={(e) => setJobId(e.target.value)}
        >
          <option value="">Select an open vacancy</option>
          {results.map((job) => (
            <option
              key={job._id}
              value={job._id}
              disabled={!!job.unavailableReason}
            >
              {job.title}
              {job.unavailableReason ? ` — ${job.unavailableReason}` : ""}
            </option>
          ))}
        </select>
      </label>
      {status === "LoadingFirstPage" && (
        <p role="status">Loading your vacancies…</p>
      )}
      {status === "Exhausted" && !results.length && (
        <p>
          No eligible vacancies found, or this candidate is no longer accepting
          invitations. <Link href="/create-job">Post a vacancy</Link>
        </p>
      )}
      {status !== "Exhausted" && status !== "LoadingFirstPage" && (
        <Button
          type="button"
          variant="outline"
          disabled={busy || status !== "CanLoadMore"}
          onClick={() => loadMore(20)}
        >
          {status === "LoadingMore" ? "Loading…" : "Load more vacancies"}
        </Button>
      )}
      <label>
        A personal note (optional)
        <textarea
          maxLength={600}
          rows={3}
          value={note}
          disabled={busy}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Explain briefly why this role could suit them."
        />
      </label>
      <p>
        Up to 10 invitations per day. Each candidate can be invited to a vacancy
        once. Invitations expire after 30 days or when the vacancy closes.
      </p>
      <div className={styles.actions}>
        <Button type="submit" disabled={busy || !chosen}>
          {busy ? "Sending…" : "Send invitation"}
        </Button>
        <Button type="button" variant="outline" disabled={busy} onClick={close}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
export default function InviteCandidate({ profile }) {
  const [open, setOpen] = useState(false);
  if (!profile.allowInvitations)
    return <p>This candidate is not accepting vacancy invitations.</p>;
  return open ? (
    <InvitationForm profile={profile} close={() => setOpen(false)} />
  ) : (
    <Button type="button" onClick={() => setOpen(true)}>
      Invite to a vacancy
    </Button>
  );
}

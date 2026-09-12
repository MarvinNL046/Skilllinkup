"use client";
import { useRef, useState } from "react";
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LocalVerificationQueue() {
  const { results: profiles, status, loadMore } = usePaginatedQuery(api.marketplace.localVerifications.listPage, {}, { initialNumItems: 20 });
  const review = useMutation(api.marketplace.localVerifications.review);
  const [notes, setNotes] = useState({});
  const [busy, setBusy] = useState(null);
  const busyRef = useRef(false);
  const [error, setError] = useState(null);
  async function submit(profile) {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(profile.id);
    setError(null);
    try {
      await review({ profileId: profile.id, expectedUpdatedAt: profile.updatedAt, verified: !profile.verified, note: notes[profile.id] || "" });
      toast.success("Local verification updated");
      setNotes(current => ({ ...current, [profile.id]: "" }));
    } catch (failure) {
      setError({ id: profile.id, message: failure?.message || "The review could not be saved. Try again." });
    } finally {
      busyRef.current = false;
      setBusy(null);
    }
  }
  return (
    <details className="my-6 rounded-xl border bg-white p-5">
      <summary className="cursor-pointer font-semibold">Local professional verification</summary>
      <p className="my-3 text-sm">Check identity, business evidence and service area before approval. Every decision is recorded. Only active Local profiles in this workspace are shown.</p>
      {status === "LoadingFirstPage" ? <p role="status">Loading profiles…</p> : profiles.length === 0 ? <p>No local profiles to review.</p> : profiles.map(profile => (
        <article key={profile.id} className="my-4 grid gap-3 rounded-lg border p-4">
          <h3 className="font-semibold">{profile.name} · {profile.verified ? "Verified" : "Unverified"}</h3>
          <p>{profile.postcode} {profile.city}, {profile.country}</p>
          <label className="grid gap-2">Evidence and review notes
            <textarea className="rounded border p-2" maxLength={2000} disabled={busy !== null} value={notes[profile.id] || ""} onChange={e => setNotes(current => ({ ...current, [profile.id]: e.target.value }))} />
          </label>
          {error?.id === profile.id && <p role="alert">{error.message}</p>}
          <Button type="button" variant={profile.verified ? "secondary" : "default"} disabled={busy !== null || (notes[profile.id] || "").trim().length < 20} onClick={() => submit(profile)}>
            {busy === profile.id ? "Saving review…" : profile.verified ? "Revoke verification" : "Verify professional"}
          </Button>
        </article>
      ))}
      {status !== "Exhausted" && status !== "LoadingFirstPage" && (
        <Button type="button" variant="secondary" disabled={status === "LoadingMore"} onClick={() => loadMore(20)}>{status === "LoadingMore" ? "Loading…" : "Load more profiles"}</Button>
      )}
    </details>
  );
}

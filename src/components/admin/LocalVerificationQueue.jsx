"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
export default function LocalVerificationQueue() {
  const profiles = useQuery(api.marketplace.localVerifications.list, {});
  const review = useMutation(api.marketplace.localVerifications.review);
  const [notes,setNotes] = useState({});
  const [busy,setBusy] = useState(null);
  async function submit(profile) {
    setBusy(profile.id);
    try { await review({ profileId: profile.id, expectedUpdatedAt: profile.updatedAt, verified: !profile.verified, note: notes[profile.id] || "" }); toast.success("Local verification updated"); setNotes(current=>({...current,[profile.id]:""})); }
    catch(error) { toast.error(error.message); }
    finally { setBusy(null); }
  }
  return <details className="my-6 rounded-xl border bg-white p-5"><summary className="cursor-pointer font-semibold">Local professional verification</summary><p className="my-3 text-sm">Manually check identity, business evidence and service area before approval. The latest 100 profiles in this workspace are considered. Every decision is recorded.</p>{profiles === undefined ? <p role="status">Loading profiles…</p> : profiles.length === 0 ? <p>No local profiles to review.</p> : profiles.map(profile=><article key={profile.id} className="my-4 grid gap-3 rounded-lg border p-4"><h3 className="font-semibold">{profile.name} · {profile.verified ? "Verified" : "Unverified"}</h3><p>{profile.postcode} {profile.city}, {profile.country}</p><label className="grid gap-2">Evidence and review notes<textarea className="rounded border p-2" maxLength={2000} value={notes[profile.id] || ""} onChange={e=>setNotes(current=>({...current,[profile.id]:e.target.value}))} /></label><button className="rounded border px-4 py-2 disabled:opacity-50" disabled={busy===profile.id || (notes[profile.id] || "").trim().length<20} onClick={()=>submit(profile)}>{profile.verified ? "Revoke verification" : "Verify professional"}</button></article>)}</details>;
}

"use client";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useProposalComparison(projectId, isOwner) {
  const ids = useQuery(api.marketplace.proposalComparison.get, isOwner && projectId ? { projectId } : "skip");
  const update = useMutation(api.marketplace.proposalComparison.update);
  const pending = useRef(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function change(operation, bidId) {
    if (!isOwner || ids === undefined || pending.current) return;
    pending.current = true; setSaving(true); setError("");
    try { await update({ projectId, operation, ...(bidId ? { bidId } : {}) }); }
    catch (error) { setError(error?.message || "Could not save your comparison. Please try again."); }
    finally { pending.current = false; setSaving(false); }
  }
  return { ids: ids ?? [], loading: ids === undefined, saving, error, change };
}

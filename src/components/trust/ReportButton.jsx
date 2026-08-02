"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Flag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const REASONS = [
  ["spam", "Spam or duplicate content"],
  ["fraud", "Fraud or suspicious behaviour"],
  ["harassment", "Harassment or discrimination"],
  ["unsafe", "Unsafe work or conduct"],
  ["misleading", "Misleading information"],
  ["illegal", "Potentially illegal content"],
  ["other", "Something else"],
];

export default function ReportButton({ targetType, targetId, targetLabel, className = "" }) {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const createReport = useMutation(api.marketplace.trust.createReport);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("misleading");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function openReport() {
    if (!isSignedIn) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setOpen(true);
  }

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await createReport({
        targetType,
        targetId: String(targetId),
        targetLabel,
        targetUrl: pathname,
        reason,
        details,
      });
      setOpen(false);
      setDetails("");
      toast.success("Thank you. Our Trust & Safety team will review this report.");
    } catch (error) {
      toast.error(error?.message || "The report could not be sent.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !submitting && setOpen(nextOpen)}>
      <button
        type="button"
        onClick={openReport}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          border: 0,
          background: "transparent",
          color: "var(--text-secondary)",
          fontSize: "var(--text-body-sm)",
          fontWeight: 600,
          cursor: "pointer",
          padding: "8px 0",
        }}
      >
        <Flag size={15} /> Report this {targetType.replace(/_/g, " ")}
      </button>

      {open ? (
        <DialogContent className="max-w-[540px]">
          <form onSubmit={submit} style={{ display: "grid", gap: 18 }}>
            <DialogHeader>
              <DialogTitle>Report to Trust &amp; Safety</DialogTitle>
              <DialogDescription>
                Reports are private. Describe the specific problem so the team can investigate it fairly.
              </DialogDescription>
            </DialogHeader>
            <label style={{ display: "grid", gap: 8, fontWeight: 600 }}>
              Reason
              <select className="h-12 rounded-lg border border-[var(--border-default)] bg-white px-3 font-normal" value={reason} onChange={(event) => setReason(event.target.value)}>
                {REASONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label style={{ display: "grid", gap: 8, fontWeight: 600 }}>
              What happened?
              <textarea className="min-h-36 rounded-lg border border-[var(--border-default)] p-3 font-normal leading-6" minLength={20} maxLength={3000} value={details} onChange={(event) => setDetails(event.target.value)} required />
            </label>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Sending…" : "Submit report"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

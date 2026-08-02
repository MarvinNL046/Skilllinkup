"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Flag, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

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
    <>
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
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "grid",
            placeItems: "center",
            padding: 20,
            background: "rgba(4, 22, 48, .48)",
          }}
        >
          <form
            onSubmit={submit}
            className="card"
            style={{ width: "min(100%, 540px)", padding: "var(--space-7)", boxShadow: "var(--shadow-4)" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div>
                <h2 id="report-title" style={{ fontSize: "var(--text-h3)", marginBottom: 6 }}>Report to Trust & Safety</h2>
                <p className="body-sm" style={{ color: "var(--text-secondary)", margin: 0 }}>
                  Reports are private. Describe the specific problem so the team can investigate it fairly.
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close report form" className="btn btn--ghost btn--icon btn--sm"><X size={18} /></button>
            </div>
            <label style={{ display: "grid", gap: 8, marginTop: 24, fontWeight: 600 }}>
              Reason
              <select className="h-12 rounded-lg border border-[var(--border-default)] bg-white px-3 font-normal" value={reason} onChange={(event) => setReason(event.target.value)}>
                {REASONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label style={{ display: "grid", gap: 8, marginTop: 18, fontWeight: 600 }}>
              What happened?
              <textarea className="min-h-36 rounded-lg border border-[var(--border-default)] p-3 font-normal leading-6" minLength={20} maxLength={3000} value={details} onChange={(event) => setDetails(event.target.value)} required />
            </label>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Sending…" : "Submit report"}</Button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

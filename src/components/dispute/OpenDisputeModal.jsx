"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";

const REASONS = [
  { value: "not_delivered", labelKey: "disputeReasonNotDelivered" },
  { value: "quality_issues", labelKey: "disputeReasonQualityIssues" },
  { value: "communication", labelKey: "disputeReasonCommunication" },
  { value: "other", labelKey: "disputeReasonOther" },
];

export default function OpenDisputeModal({ orderId, onClose }) {
  const t = useTranslations("disputes");
  const openDispute = useMutation(api.marketplace.disputes.open);
  const [reason, setReason] = useState(REASONS[0].value);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isValid =
    reason && description.trim().length >= 30 && description.trim().length <= 1000;

  async function handleSubmit() {
    if (!isValid || submitting) return;
    setSubmitting(true);
    try {
      await openDispute({
        orderId,
        reason,
        description: description.trim(),
      });
      toast.success(t("disputeOpened"));
      onClose();
    } catch (err) {
      toast.error(err.message || t("disputeOpenFailed"));
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: 520,
          width: "calc(100% - 32px)",
          padding: "var(--space-6)",
          background: "var(--bg-elevated, white)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h4)",
            margin: 0,
            marginBottom: "var(--space-4)",
          }}
        >
          {t("openDisputeTitle")}
        </h3>

        <p
          className="body-sm"
          style={{
            color: "var(--text-secondary)",
            marginBottom: "var(--space-5)",
          }}
        >
          {t("openDisputeDescription")}
        </p>

        <label
          style={{
            display: "block",
            marginBottom: "var(--space-2)",
            fontWeight: 500,
          }}
        >
          {t("reasonLabel")}
        </label>
        <select
          className="form-control mb15"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ width: "100%", marginBottom: "var(--space-4)" }}
        >
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {t(r.labelKey)}
            </option>
          ))}
        </select>

        <label
          style={{
            display: "block",
            marginBottom: "var(--space-2)",
            fontWeight: 500,
          }}
        >
          {t("descriptionLabel")} ({description.trim().length}/1000)
        </label>
        <textarea
          className="form-control"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("descriptionPlaceholder")}
          maxLength={1000}
          style={{ width: "100%", marginBottom: "var(--space-5)" }}
        />

        <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="ud-btn btn-white fz14"
            onClick={onClose}
            disabled={submitting}
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            className="ud-btn btn-thm fz14"
            disabled={!isValid || submitting}
            onClick={handleSubmit}
          >
            {submitting ? (
              <span className="spinner-border spinner-border-sm" role="status" />
            ) : (
              t("submitDispute")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

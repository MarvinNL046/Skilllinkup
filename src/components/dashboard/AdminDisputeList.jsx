"use client";

import { useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

// No money moves during the private beta, so a decision records an outcome for
// both parties; it does not release or refund anything.
const OUTCOMES = {
  freelancer_wins: {
    action: "Decide for professional",
    title: "Decide this dispute for the professional?",
  },
  client_wins: {
    action: "Decide for client",
    title: "Decide this dispute for the client?",
  },
};

export default function AdminDisputeList() {
  const t = useTranslations("adminDisputes");
  const disputes = useQuery(api.marketplace.disputes.list, { status: "open" });
  const resolve = useMutation(api.marketplace.disputes.resolve);
  const [decision, setDecision] = useState(null);
  const [note, setNote] = useState("");
  const triggerRef = useRef(null);

  function choose(dispute, resolution, event) {
    triggerRef.current = event.currentTarget;
    setNote("");
    setDecision({ id: dispute._id, shortId: dispute._id.slice(-8), resolution });
  }

  async function confirmDecision() {
    const resolutionNote = note.trim();
    if (resolutionNote.length < 10)
      throw new Error("Add a resolution note of at least 10 characters.");
    await resolve({
      disputeId: decision.id,
      resolution: decision.resolution,
      resolutionNote,
    });
    toast.success("Dispute decision saved. Both parties are notified.");
  }

  if (disputes === undefined)
    return <p role="status">Loading open disputes…</p>;
  if (disputes.length === 0)
    return <p className="text-muted">{t("noOpenDisputes")}</p>;

  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>{t("columnDisputeId")}</th>
              <th>{t("columnOrderId")}</th>
              <th>{t("columnReason")}</th>
              <th>{t("columnOpened")}</th>
              <th>{t("columnActions")}</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((d) => (
              <tr key={d._id}>
                <td className="text-sm">{d._id.slice(-8)}</td>
                <td className="text-sm">{d.orderId.slice(-8)}</td>
                <td>{d.reason}</td>
                <td>{new Date(d.openedAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(OUTCOMES).map(([resolution, copy]) => (
                      <Button
                        key={resolution}
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={(event) => choose(d, resolution, event)}
                      >
                        {copy.action}
                      </Button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={decision !== null}
        title={decision ? OUTCOMES[decision.resolution].title : ""}
        description={`Dispute ${decision?.shortId ?? ""}. This decision is final and both parties are notified. No payment is released or refunded by Skilllinkup during the private beta.`}
        confirmLabel="Save decision"
        onConfirm={confirmDecision}
        onClose={() => setDecision(null)}
        returnFocusTo={triggerRef}
      >
        <label className="grid gap-2 text-sm font-semibold">
          Resolution note (shared in the audit trail)
          <textarea
            className="min-h-28 rounded-lg border border-[var(--border-default)] p-3 font-normal leading-6"
            value={note}
            minLength={10}
            maxLength={2000}
            onChange={(event) => setNote(event.target.value)}
            required
          />
        </label>
      </ConfirmDialog>
    </>
  );
}

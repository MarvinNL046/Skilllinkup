"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    reason &&
    description.trim().length >= 30 &&
    description.trim().length <= 1000;

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

  const handleOpenChange = (next) => {
    if (!next && !submitting) onClose();
  };

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("openDisputeTitle")}</DialogTitle>
          <DialogDescription>{t("openDisputeDescription")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dispute-reason">{t("reasonLabel")}</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="dispute-reason">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REASONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {t(r.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dispute-description">
              {t("descriptionLabel")} ({description.trim().length}/1000)
            </Label>
            <Textarea
              id="dispute-description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("descriptionPlaceholder")}
              maxLength={1000}
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={submitting}
          >
            {t("cancel")}
          </Button>
          <Button
            type="button"
            disabled={!isValid || submitting}
            onClick={handleSubmit}
          >
            {submitting ? (
              <span
                role="status"
                aria-label="Submitting"
                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              />
            ) : (
              t("submitDispute")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

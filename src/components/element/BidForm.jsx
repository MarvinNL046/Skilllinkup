"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function BidForm({ projectId, onSuccess }) {
  const t = useTranslations("projectDetail");
  const [amount, setAmount] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [pitch, setPitch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitBid = useMutation(api.marketplace.projects.submitBid);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !deliveryDays || !pitch) {
      setError(t("fillAllFields"));
      toast.error(t("fillAllFields"));
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      await submitBid({
        projectId,
        amount: Number.isFinite(parseFloat(amount)) ? parseFloat(amount) : 0,
        deliveryDays: Number.isFinite(parseInt(deliveryDays, 10))
          ? parseInt(deliveryDays, 10)
          : 1,
        pitch,
      });
      toast.success(t("bidSubmitted"));
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err.message || t("failedToSubmit"));
      toast.error(err.message || t("failedToSubmit"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Alert variant="success" className="mt-5">
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>{t("bidSubmittedSuccess")}</AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-4">
      <h4 className="text-lg font-semibold mb-5">{t("submitBid")}</h4>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bid-amount">{t("yourPrice")}</Label>
          <Input
            id="bid-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            step="0.01"
            placeholder="e.g. 500"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bid-days">{t("deliveryDays")}</Label>
          <Input
            id="bid-days"
            type="number"
            value={deliveryDays}
            onChange={(e) => setDeliveryDays(e.target.value)}
            min="1"
            placeholder="e.g. 7"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bid-pitch">{t("yourProposal")}</Label>
        <Textarea
          id="bid-pitch"
          rows={6}
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
          placeholder={t("proposalPlaceholder")}
          required
        />
      </div>
      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("submitting") : t("submitBidBtn")}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import useMyProjectProposal from "@/hook/useMyProjectProposal";
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

export default function BidForm({
  projectId,
  onSuccess,
  projectStatus = "open",
}) {
  const t = useTranslations("projectDetail");
  const [amount, setAmount] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [pitch, setPitch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const existing = useMyProjectProposal(projectId);
  const submitting = useRef(false);

  const submitBid = useMutation(api.marketplace.projects.submitBid);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting.current || existing !== null || projectStatus !== "open")
      return;
    if (!amount || !deliveryDays || !pitch) {
      setError(t("fillAllFields"));
      toast.error(t("fillAllFields"));
      return;
    }
    setIsSubmitting(true);
    submitting.current = true;
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
      submitting.current = false;
      setIsSubmitting(false);
    }
  };

  if (existing === undefined)
    return <p role="status">Checking your proposal…</p>;
  if (existing) {
    const labels = {
      pending: "Awaiting decision",
      accepted: "Accepted",
      rejected: "Not selected",
      withdrawn: "Withdrawn",
    };
    return (
      <section
        className="mt-4 space-y-4 rounded-xl border border-slate-200 bg-white p-5"
        aria-label="Your submitted proposal"
      >
        <h3 className="text-lg font-semibold">Your proposal</h3>
        <p role="status">{labels[existing.status] || existing.status}</p>
        <p>
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: existing.currency,
          }).format(existing.amount)}{" "}
          · {existing.deliveryDays} days
        </p>
        <p className="whitespace-pre-wrap break-words">{existing.pitch}</p>
        <Button asChild variant="outline">
          <Link
            href={
              existing.orderId ? `/orders/${existing.orderId}` : "/proposal"
            }
          >
            {existing.orderId ? "Open order" : "View my proposals"}
          </Link>
        </Button>
      </section>
    );
  }
  if (projectStatus !== "open")
    return <p>This project is no longer accepting proposals.</p>;
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

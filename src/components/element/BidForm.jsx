"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

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
        deliveryDays: Number.isFinite(parseInt(deliveryDays, 10)) ? parseInt(deliveryDays, 10) : 1,
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
      <div className="alert alert-success mt20 mb20 bdrs8 p20">
        <i className="fas fa-check-circle me-2"></i>
        {t("bidSubmittedSuccess")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt10">
      <h4 className="mb20">{t("submitBid")}</h4>
      {error && (
        <div className="alert alert-danger mb20 bdrs8 p15">
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <div className="mb20">
            <label className="fw500 ff-heading dark-color mb-2">
              {t("yourPrice")}
            </label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="0.01"
              placeholder="e.g. 500"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb20">
            <label className="fw500 ff-heading dark-color mb-2">
              {t("deliveryDays")}
            </label>
            <input
              type="number"
              className="form-control"
              value={deliveryDays}
              onChange={(e) => setDeliveryDays(e.target.value)}
              min="1"
              placeholder="e.g. 7"
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb20">
            <label className="fw500 fz16 ff-heading dark-color mb-2">
              {t("yourProposal")}
            </label>
            <textarea
              className="pt15 form-control"
              rows={6}
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder={t("proposalPlaceholder")}
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="d-grid">
            <button
              type="submit"
              className="ud-btn btn-thm"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("submitting") : t("submitBidBtn")}
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

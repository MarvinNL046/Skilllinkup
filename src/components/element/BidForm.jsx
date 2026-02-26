"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function BidForm({ projectId, onSuccess }) {
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
      setError("Please fill in all fields");
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
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err.message || "Failed to submit bid");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="alert alert-success mt20 mb20 bdrs8 p20">
        <i className="fas fa-check-circle me-2"></i>
        Your bid has been submitted successfully!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt10">
      <h4 className="mb20">Submit a Bid</h4>
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
              Your Price ($)
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
              Delivery (days)
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
              Your Proposal
            </label>
            <textarea
              className="pt15 form-control"
              rows={6}
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder="Describe your approach and why you're the right fit..."
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
              {isSubmitting ? "Submitting..." : "Submit Bid"}
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

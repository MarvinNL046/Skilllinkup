"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import useConvexProfile from "@/hook/useConvexProfile";

export default function StripeConnectButton({ className = "" }) {
  const t = useTranslations("stripeConnect");
  const { convexUser, profile } = useConvexProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isConnected = profile?.stripeOnboardingComplete === true;
  const isPending = !!profile?.stripeAccountId && !isConnected;

  const handleConnect = async () => {
    if (!convexUser?._id || !convexUser?.email) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: convexUser.email,
          freelancerUserId: convexUser._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("failedOnboarding"));
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(t("noUrl"));
      }
    } catch (err) {
      console.error("[StripeConnectButton] Error:", err);
      setError(err.message || t("somethingWentWrong"));
      setIsLoading(false);
    }
  };

  if (profile === undefined) {
    return (
      <div className={`stripe-connect-button ${className}`}>
        <div className="spinner-border spinner-border-sm text-muted" role="status">
          <span className="visually-hidden">{t("loading")}</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className={`stripe-connect-button ${className}`}>
      {isConnected && (
        <div className="d-flex align-items-center gap-2">
          <span
            className="badge rounded-pill px-3 py-2"
            style={{ backgroundColor: "#22c55e", color: "#fff", fontSize: "14px" }}
          >
            <i className="fal fa-check-circle me-2" />
            {t("paymentsConnected")}
          </span>
          <span className="text fz13 text-muted">
            {t("payoutsViaStripe")}
          </span>
        </div>
      )}

      {isPending && (
        <div>
          <button
            type="button"
            className="ud-btn btn-thm"
            onClick={handleConnect}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                {t("redirecting")}
              </>
            ) : (
              <>
                <i className="fal fa-exclamation-circle me-2" />
                {t("completeSetup")}
              </>
            )}
          </button>
          <p className="text fz12 mt-2 mb-0">
            {t("pendingNote")}
          </p>
        </div>
      )}

      {!isConnected && !isPending && (
        <div>
          <button
            type="button"
            className="ud-btn btn-thm2"
            onClick={handleConnect}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                {t("redirecting")}
              </>
            ) : (
              <>
                <i className="fal fa-credit-card me-2" />
                {t("setupPayments")}
              </>
            )}
          </button>
          <p className="text fz12 mt-2 mb-0">
            {t("setupNote")}
          </p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-2 mb-0 py-2 px-3 fz13">
          <i className="fal fa-exclamation-triangle me-2" />
          {error}
        </div>
      )}
    </div>
  );
}

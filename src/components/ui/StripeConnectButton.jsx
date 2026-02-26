"use client";
import { useState } from "react";
import useConvexProfile from "@/hook/useConvexProfile";

// ---------------------------------------------------------------------------
// StripeConnectButton
//
// Shown on the freelancer dashboard so they can connect their bank account
// via Stripe Express and start receiving payouts.
//
// States:
//   1. No stripeAccountId  → "Set up payments" button (initiates onboarding)
//   2. stripeAccountId set but onboarding not complete → "Complete setup" button
//   3. stripeOnboardingComplete = true → "Payments connected" (green, read-only)
//
// REQUIREMENTS:
//   STRIPE_SECRET_KEY must be set in .env.local.
//   The freelancer must be signed in (Clerk + Convex user synced).
// ---------------------------------------------------------------------------

export default function StripeConnectButton({ className = "" }) {
  const { convexUser, profile } = useConvexProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Derive Stripe connection state from the freelancer profile.
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
        throw new Error(data.error || "Failed to start Stripe onboarding");
      }

      if (data.url) {
        // Redirect to Stripe Express onboarding.
        window.location.href = data.url;
      } else {
        throw new Error("No onboarding URL returned from server");
      }
    } catch (err) {
      console.error("[StripeConnectButton] Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
    // Note: don't reset isLoading on success – the page will redirect away.
  };

  // Profile not loaded yet.
  if (profile === undefined) {
    return (
      <div className={`stripe-connect-button ${className}`}>
        <div className="spinner-border spinner-border-sm text-muted" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // User is not a freelancer (no profile).
  if (!profile) {
    return null;
  }

  return (
    <div className={`stripe-connect-button ${className}`}>
      {/* ---------------------------------------------------------------- */}
      {/* State 3: Fully connected                                          */}
      {/* ---------------------------------------------------------------- */}
      {isConnected && (
        <div className="d-flex align-items-center gap-2">
          <span
            className="badge rounded-pill px-3 py-2"
            style={{ backgroundColor: "#22c55e", color: "#fff", fontSize: "14px" }}
          >
            <i className="fal fa-check-circle me-2" />
            Payments connected
          </span>
          <span className="text fz13 text-muted">
            You can receive payouts via Stripe
          </span>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* State 2: Account created but onboarding not finished              */}
      {/* ---------------------------------------------------------------- */}
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
                Redirecting to Stripe...
              </>
            ) : (
              <>
                <i className="fal fa-exclamation-circle me-2" />
                Complete Stripe setup
              </>
            )}
          </button>
          <p className="text fz12 mt-2 mb-0">
            Your Stripe account was created but onboarding is not complete.
            Click above to finish setting up payouts.
          </p>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* State 1: No Stripe account yet                                    */}
      {/* ---------------------------------------------------------------- */}
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
                Redirecting to Stripe...
              </>
            ) : (
              <>
                <i className="fal fa-credit-card me-2" />
                Set up payments
              </>
            )}
          </button>
          <p className="text fz12 mt-2 mb-0">
            Connect your bank account via Stripe to receive payouts for completed orders.
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="alert alert-danger mt-2 mb-0 py-2 px-3 fz13">
          <i className="fal fa-exclamation-triangle me-2" />
          {error}
        </div>
      )}
    </div>
  );
}

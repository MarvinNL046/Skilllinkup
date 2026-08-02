export default function StripeConnectButton({ className = "" }) {
  return (
    <div className={`stripe-connect-button ${className}`}>
      <div className="alert alert-info mb-0 py-3 px-3">
        <strong>Free private beta</strong>
        <p className="mb-0 mt-1">Stripe onboarding and payouts are disabled until the payment and legal model is approved.</p>
      </div>
    </div>
  );
}

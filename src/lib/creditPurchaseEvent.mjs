// Turns a Stripe Checkout session into the facts the credit top-up needs.
// Pure and dependency-free so it can be tested without Stripe or Convex.
//
// The number of credits is deliberately NOT read from session metadata: the
// server derives it from the package, and the backend re-checks amount, currency
// and payment status against that package before crediting anything.

export const CREDIT_PURCHASE_REJECTED = "CREDIT_PURCHASE_REJECTED";

/**
 * @returns {{ ok: true, purchase: object } | { ok: false, reason: string }}
 */
export function creditPurchaseFromSession(session) {
  const metadata = session?.metadata ?? {};
  if (session?.mode !== "payment")
    return { ok: false, reason: "Not a one-time payment session." };
  if (!session?.id) return { ok: false, reason: "Missing session id." };
  if (!metadata.freelancerUserId)
    return { ok: false, reason: "Missing buyer in session metadata." };
  if (!metadata.packageId)
    return { ok: false, reason: "Missing credit package in session metadata." };
  if (!Number.isInteger(session.amount_total))
    return { ok: false, reason: "Missing paid amount." };
  if (typeof session.currency !== "string" || !session.currency)
    return { ok: false, reason: "Missing currency." };
  return {
    ok: true,
    purchase: {
      freelancerUserId: metadata.freelancerUserId,
      packageId: metadata.packageId,
      stripeSessionId: session.id,
      paymentStatus: String(session.payment_status ?? ""),
      amountTotalCents: session.amount_total,
      currency: session.currency,
    },
  };
}

/** A rejected purchase must not be retried; anything else is transient and must be. */
export function isRejectedCreditPurchase(error) {
  return error?.data?.code === CREDIT_PURCHASE_REJECTED;
}

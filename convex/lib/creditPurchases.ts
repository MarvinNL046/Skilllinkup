import { ConvexError } from "convex/values";
import type { Id } from "../_generated/dataModel";
import type { MutationCtx } from "../_generated/server";
import { CREDIT_PACKAGES } from "../marketplace/leadPricing";
import { getProviderProfile } from "./authHelpers";

export const CREDIT_PURCHASE_CURRENCY = "eur";

/** A purchase that must never be credited. The webhook logs it and does not retry. */
export const CREDIT_PURCHASE_REJECTED = "CREDIT_PURCHASE_REJECTED";

export type VerifiedCreditPurchase = {
  freelancerUserId: Id<"users">;
  packageId: string;
  stripeSessionId: string;
  /** Stripe Checkout `payment_status`. Only "paid" is credited. */
  paymentStatus: string;
  /** Stripe Checkout `amount_total`, in the smallest currency unit. */
  amountTotalCents: number;
  /** Stripe Checkout `currency`. */
  currency: string;
};

function reject(reason: string): never {
  throw new ConvexError({ code: CREDIT_PURCHASE_REJECTED, reason });
}

/**
 * Credit a Local professional for one paid Stripe Checkout session.
 *
 * The number of credits is never taken from the caller: it comes from the known
 * package, and the paid amount and currency must match that package exactly.
 *
 * Idempotency and concurrency: the session lookup, the purchase record, the
 * balance change and the ledger entry all happen inside this one mutation.
 * Convex runs mutations as serializable transactions, so when two webhook
 * deliveries for the same session race, one commits and the other is retried,
 * finds the purchase record and credits nothing.
 */
export async function applyCreditPurchase(
  ctx: MutationCtx,
  purchase: VerifiedCreditPurchase,
) {
  const sessionId = purchase.stripeSessionId.trim();
  if (!/^cs_[A-Za-z0-9_]{6,250}$/.test(sessionId))
    reject("The Stripe session id is missing or malformed.");

  const creditPackage = CREDIT_PACKAGES.find((item) => item.id === purchase.packageId);
  if (!creditPackage) reject("Unknown credit package.");
  if (purchase.paymentStatus !== "paid")
    reject("The Stripe session is not paid.");
  if (purchase.currency.toLowerCase() !== CREDIT_PURCHASE_CURRENCY)
    reject("The payment currency does not match the credit package.");
  // Package prices are whole cents, so exact equality also rules out fractions and NaN.
  if (purchase.amountTotalCents !== creditPackage.priceCents)
    reject("The paid amount does not match the credit package.");

  const profile = await getProviderProfile(
    ctx,
    purchase.freelancerUserId,
    "local_professional",
  );
  if (!profile) reject("The buyer has no Local professional profile.");

  const existing = await ctx.db
    .query("creditPurchases")
    .withIndex("by_stripeSessionId", (q) => q.eq("stripeSessionId", sessionId))
    .unique();
  if (existing) {
    if (
      existing.freelancerUserId !== purchase.freelancerUserId ||
      existing.packageId !== creditPackage.id
    )
      reject("This Stripe session was already processed for a different purchase.");
    return {
      newBalance: profile.creditBalance ?? 0,
      credits: existing.credits,
      alreadyProcessed: true,
    };
  }

  const now = Date.now();
  const newBalance = (profile.creditBalance ?? 0) + creditPackage.credits;
  await ctx.db.patch(profile._id, { creditBalance: newBalance });
  const creditTransactionId = await ctx.db.insert("creditTransactions", {
    freelancerId: purchase.freelancerUserId,
    amount: creditPackage.credits,
    type: "purchase",
    description: `Purchased ${creditPackage.credits} credits (${creditPackage.name} package)`,
    referenceId: sessionId,
    createdAt: now,
  });
  await ctx.db.insert("creditPurchases", {
    stripeSessionId: sessionId,
    freelancerUserId: purchase.freelancerUserId,
    profileId: profile._id,
    packageId: creditPackage.id,
    credits: creditPackage.credits,
    amountCents: purchase.amountTotalCents,
    currency: CREDIT_PURCHASE_CURRENCY,
    creditTransactionId,
    createdAt: now,
  });
  return { newBalance, credits: creditPackage.credits, alreadyProcessed: false };
}

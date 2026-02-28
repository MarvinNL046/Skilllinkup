/**
 * Lead pricing configuration for the Local Marketplace pay-per-lead system.
 */

export const CREDIT_PACKAGES = [
  { id: "starter", name: "Starter", credits: 5, priceEur: 25, priceCents: 2500 },
  { id: "popular", name: "Popular", credits: 10, priceEur: 45, priceCents: 4500 },
  { id: "pro", name: "Pro", credits: 25, priceEur: 99, priceCents: 9900 },
] as const;

export type CreditPackageId = (typeof CREDIT_PACKAGES)[number]["id"];

export function getLeadCreditCost(
  budgetIndication: string | undefined,
  claimType: "shared" | "exclusive"
): number {
  let baseCost: number;

  if (!budgetIndication) {
    baseCost = 3;
  } else if (budgetIndication.includes("500") && !budgetIndication.includes("2")) {
    baseCost = 2;
  } else if (budgetIndication.includes("2,000") || budgetIndication.includes("2000")) {
    baseCost = 4;
  } else if (budgetIndication.includes(">") || budgetIndication.includes("2,000+") || budgetIndication.includes("2000+")) {
    baseCost = 6;
  } else {
    baseCost = 3;
  }

  return claimType === "exclusive" ? baseCost * 2 : baseCost;
}

export const MAX_SHARED_SLOTS = 3;

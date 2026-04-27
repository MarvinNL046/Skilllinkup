"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Credit packages — must match convex/marketplace/leadPricing.ts
const CREDIT_PACKAGES = [
  { id: "starter", name: "Starter", credits: 5, priceEur: 25, priceCents: 2500 },
  { id: "popular", name: "Popular", credits: 10, priceEur: 45, priceCents: 4500 },
  { id: "pro", name: "Pro", credits: 25, priceEur: 99, priceCents: 9900 },
];

export default function CreditsInfo() {
  const t = useTranslations("creditsInfo");
  const credits = useQuery(api.marketplace.leads.getMyCredits);
  const transactions = useQuery(api.marketplace.leads.getMyTransactions, { limit: 20 });
  const [purchasing, setPurchasing] = useState(null);

  async function handleBuy(packageId) {
    if (!credits?.userId) {
      toast.error(t("mustBeLoggedIn"));
      return;
    }
    setPurchasing(packageId);
    try {
      const res = await fetch("/api/stripe/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId, freelancerUserId: credits.userId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || t("failedCheckout"));
        setPurchasing(null);
      }
    } catch {
      toast.error(t("somethingWrong"));
      setPurchasing(null);
    }
  }

  if (credits === undefined) {
    return (
      <div className="flex justify-center py-12">
        <div
          role="status"
          aria-label="Loading"
          className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Balance */}
      <Card className="max-w-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-5xl font-semibold text-primary mb-2">{credits?.balance ?? 0}</h2>
          <p className="text-[var(--text-secondary)]">{t("creditsAvailable")}</p>
        </CardContent>
      </Card>

      {/* Packages */}
      <div>
        <h4 className="text-xl font-semibold mb-5">{t("buyCredits")}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CREDIT_PACKAGES.map((pkg) => (
            <Card key={pkg.id} className="relative">
              <CardContent className="p-8 text-center">
                {pkg.id === "popular" && (
                  <Badge variant="warning" className="absolute right-3 top-3">
                    {t("mostPopular")}
                  </Badge>
                )}
                <h3 className="text-3xl font-semibold mb-1">{pkg.credits}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">{t("credits")}</p>
                <h4 className="text-xl font-bold mb-1">€{pkg.priceEur}</h4>
                <p className="text-xs text-[var(--text-secondary)] mb-4">
                  €{(pkg.priceEur / pkg.credits).toFixed(2)} {t("perCredit")}
                </p>
                <Button
                  className="w-full"
                  onClick={() => handleBuy(pkg.id)}
                  disabled={purchasing !== null}
                >
                  {purchasing === pkg.id
                    ? t("redirecting")
                    : t("buyNCredits", { count: pkg.credits })}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h4 className="text-xl font-semibold mb-5">{t("transactionHistory")}</h4>
        {transactions === undefined ? (
          <div className="flex justify-center py-8">
            <div
              role="status"
              className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
            />
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-[var(--text-secondary)]">{t("noTransactions")}</p>
        ) : (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch w-full">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">{t("date")}</th>
                      <th scope="col">{t("type")}</th>
                      <th scope="col">{t("description")}</th>
                      <th scope="col" className="text-right">
                        {t("creditsColumn")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {transactions.map((txn) => (
                      <tr key={txn._id}>
                        <td data-label={t("date")} className="text-sm">
                          {new Date(txn.createdAt).toLocaleDateString()}
                        </td>
                        <td data-label={t("type")}>
                          <Badge
                            variant={
                              txn.type === "purchase"
                                ? "success"
                                : txn.type === "spend"
                                ? "warning"
                                : "info"
                            }
                          >
                            {txn.type}
                          </Badge>
                        </td>
                        <td data-label={t("description")} className="text-sm">
                          {txn.description}
                        </td>
                        <td
                          data-label={t("creditsColumn")}
                          className={`text-right font-semibold ${
                            txn.amount > 0 ? "text-[var(--success-600)]" : "text-destructive"
                          }`}
                        >
                          {txn.amount > 0 ? "+" : ""}
                          {txn.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

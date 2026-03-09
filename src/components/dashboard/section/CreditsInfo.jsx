"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

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
    } catch (err) {
      toast.error(t("somethingWrong"));
      setPurchasing(null);
    }
  }

  if (credits === undefined) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status" />
      </div>
    );
  }

  return (
    <div>
      {/* Balance */}
      <div className="row mb30">
        <div className="col-lg-4">
          <div className="dashboard-style1 bdrs8 p30 text-center">
            <h2 className="title mb-1" style={{ fontSize: "3rem", color: "#22c55e" }}>
              {credits?.balance ?? 0}
            </h2>
            <p className="body-color">{t("creditsAvailable")}</p>
          </div>
        </div>
      </div>

      {/* Packages */}
      <h4 className="mb20">{t("buyCredits")}</h4>
      <div className="row mb40">
        {CREDIT_PACKAGES.map((pkg) => (
          <div key={pkg.id} className="col-sm-6 col-lg-4 mb20">
            <div className="dashboard-style1 bdrs8 p30 text-center position-relative">
              {pkg.id === "popular" && (
                <span
                  className="position-absolute top-0 end-0 badge bg-thm m10"
                  style={{ fontSize: "0.7rem" }}
                >
                  {t("mostPopular")}
                </span>
              )}
              <h3 className="title mb-1">{pkg.credits}</h3>
              <p className="body-color fz14 mb10">{t("credits")}</p>
              <h4 className="mb5">&euro;{pkg.priceEur}</h4>
              <p className="body-color fz13 mb15">
                &euro;{(pkg.priceEur / pkg.credits).toFixed(2)} {t("perCredit")}
              </p>
              <button
                className="ud-btn btn-thm bdrs4 w-100"
                onClick={() => handleBuy(pkg.id)}
                disabled={purchasing !== null}
              >
                {purchasing === pkg.id ? t("redirecting") : t("buyNCredits", { count: pkg.credits })}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <h4 className="mb20">{t("transactionHistory")}</h4>
      {transactions === undefined ? (
        <div className="spinner-border text-thm" role="status" />
      ) : transactions.length === 0 ? (
        <p className="body-color">{t("noTransactions")}</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>{t("date")}</th>
                <th>{t("type")}</th>
                <th>{t("description")}</th>
                <th className="text-end">{t("creditsColumn")}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id}>
                  <td className="fz14">{new Date(txn.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        txn.type === "purchase"
                          ? "bg-success"
                          : txn.type === "spend"
                          ? "bg-warning"
                          : "bg-info"
                      }`}
                    >
                      {txn.type}
                    </span>
                  </td>
                  <td className="fz14">{txn.description}</td>
                  <td
                    className={`text-end fw-bold ${
                      txn.amount > 0 ? "text-success" : "text-danger"
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
      )}
    </div>
  );
}

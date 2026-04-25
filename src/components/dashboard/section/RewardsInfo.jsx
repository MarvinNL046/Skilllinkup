"use client";

import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

function TierBadge({ tier, label }) {
  const TIER_COLORS = {
    bronze: { bg: "#cd7f32", text: "#fff" },
    silver: { bg: "#9e9e9e", text: "#fff" },
    gold:   { bg: "#ffd700", text: "#333" },
  };
  const config = TIER_COLORS[tier] || TIER_COLORS.bronze;
  return (
    <span
      className="badge px-3 py-2 fz14 fw600 bdrs20"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {label}
    </span>
  );
}

function ProgressBar({ value, color = "#ef2b70", label }) {
  return (
    <div className="mb15">
      {label && (
        <div className="flex justify-between mb5">
          <span className="fz13 text-muted">{label}</span>
          <span className="fz13 fw500">{value}%</span>
        </div>
      )}
      <div className="progress" style={{ height: 8, borderRadius: 4 }}>
        <div
          className="progress-bar"
          style={{ width: `${value}%`, backgroundColor: color, borderRadius: 4 }}
        />
      </div>
    </div>
  );
}

const TRANSACTION_LABELS = {
  cashback_earned: { color: "text-success", prefix: "+" },
  credit_used:     { color: "text-danger",  prefix: "-" },
  tier_upgrade:    { color: "text-primary",  prefix: "" },
};

export default function RewardsInfo() {
  const t = useTranslations("rewards");
  const { convexUser } = useConvexUser();

  const TIER_LABELS = {
    bronze: t("tierBronze"),
    silver: t("tierSilver"),
    gold: t("tierGold"),
  };

  const rewards = useQuery(
    api.marketplace.rewards.getClientRewards,
    convexUser ? { userId: convexUser._id } : "skip"
  );

  const history = useQuery(
    api.marketplace.rewards.getRewardHistory,
    convexUser ? { userId: convexUser._id, limit: 15 } : "skip"
  );

  if (!convexUser || rewards === undefined) {
    return (
      <div className="flex justify-center items-center" style={{ minHeight: 200 }}>
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  const tier = rewards?.tier || "bronze";
  const balanceEuros = ((rewards?.balanceCents || 0) / 100).toFixed(2);
  const yearlySpendEuros = ((rewards?.yearlySpendCents || 0) / 100).toFixed(2);
  const nextTierAmount = rewards?.nextTierThreshold
    ? (rewards.nextTierThreshold / 100).toLocaleString("nl-NL")
    : null;
  const cashbackPct = Math.round((rewards?.cashbackRate || 0.03) * 100);

  return (
    <div className="row">
      {/* Left: Tier card */}
      <div className="col-md-5 mb30">
        <div className="ps-widget bdrs8 p30 bdr1 mb25">
          <h5 className="mb20">{t("yourRewards")}</h5>
          <div className="flex items-center gap-3 mb20">
            <TierBadge tier={tier} label={TIER_LABELS[tier] || tier} />
            <span className="fz14 text-muted">{t("member")}</span>
          </div>

          <div className="mb20">
            <p className="fz13 text-muted mb5">{t("creditBalance")}</p>
            <h3 className="mb0" style={{ color: "#ef2b70" }}>&euro;{balanceEuros}</h3>
          </div>

          <div className="mb20">
            <p className="fz13 text-muted mb5">{t("yearlySpend")}</p>
            <h5 className="mb0">&euro;{yearlySpendEuros}</h5>
          </div>

          <div className="mb20">
            <p className="fz13 text-muted mb5">{t("cashbackRate")}</p>
            <h5 className="mb0">{cashbackPct}% {t("perCompletedOrder")}</h5>
          </div>

          {nextTierAmount && (
            <>
              <hr className="opacity-100 mb15 mt15" />
              <p className="fz13 text-muted mb10">
                {t("progressTo", {
                  tier: tier === "bronze" ? TIER_LABELS.silver : TIER_LABELS.gold,
                  amount: nextTierAmount,
                })}
              </p>
              <ProgressBar
                value={rewards?.progressToNextTier || 0}
                label={t("spent", { amount: yearlySpendEuros })}
                color={tier === "bronze" ? "#9e9e9e" : "#ffd700"}
              />
            </>
          )}

          {tier === "gold" && (
            <div className="alert alert-warning mt15 fz13 mb0">
              {t("goldMaxCashback")}
            </div>
          )}
        </div>

        {/* Tier overview */}
        <div className="ps-widget bdrs8 p30 bdr1">
          <h6 className="mb15">{t("tierOverview")}</h6>
          {[
            { key: "bronze", threshold: "€0+",        rate: "3%" },
            { key: "silver", threshold: "€1.000+/jr", rate: "5%" },
            { key: "gold",   threshold: "€5.000+/jr", rate: "7%" },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between mb10 pb10"
              style={{ borderBottom: "1px solid #f0f0f0", opacity: item.key === tier ? 1 : 0.5 }}
            >
              <TierBadge tier={item.key} label={TIER_LABELS[item.key]} />
              <span className="fz13 text-muted">{item.threshold}</span>
              <span className="fz13 fw500">{item.rate}</span>
              {item.key === tier && <i className="flaticon-check text-success fz16" />}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Transaction history */}
      <div className="col-md-7 mb30">
        <div className="ps-widget bdrs8 p30 bdr1">
          <h5 className="mb20">{t("creditHistory")}</h5>
          {!history || history.length === 0 ? (
            <div className="text-center py40 text-muted">
              <i className="flaticon-dollar fz40 mb15 block" />
              <p className="mb0">{t("noTransactions")}<br />{t("noTransactionsHint")}</p>
            </div>
          ) : (
            <div className="table-style3 table-responsive mb0">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t("columnDate")}</th>
                    <th>{t("columnDescription")}</th>
                    <th className="text-right">{t("columnAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((tx) => {
                    const config = TRANSACTION_LABELS[tx.type] || TRANSACTION_LABELS.cashback_earned;
                    const amountEuros = Math.abs(tx.amount / 100).toFixed(2);
                    const date = new Date(tx.createdAt).toLocaleDateString("nl-NL", {
                      day: "2-digit", month: "short", year: "numeric",
                    });
                    return (
                      <tr key={tx._id}>
                        <td className="fz13 text-muted">{date}</td>
                        <td className="fz13">{tx.description}</td>
                        <td className={`text-right fz13 fw500 ${config.color}`}>
                          {tx.type !== "tier_upgrade"
                            ? `${config.prefix}€${amountEuros}`
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

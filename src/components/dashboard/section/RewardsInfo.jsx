"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

const TIER_COLORS = {
  bronze: { bg: "#cd7f32", text: "#fff", label: "Bronze" },
  silver: { bg: "#9e9e9e", text: "#fff", label: "Silver" },
  gold:   { bg: "#ffd700", text: "#333", label: "Gold" },
};

const TRANSACTION_LABELS = {
  cashback_earned: { color: "text-success", prefix: "+" },
  credit_used:     { color: "text-danger",  prefix: "-" },
  tier_upgrade:    { color: "text-primary",  prefix: "" },
};

function TierBadge({ tier }) {
  const config = TIER_COLORS[tier] || TIER_COLORS.bronze;
  return (
    <span
      className="badge px-3 py-2 fz14 fw600 bdrs20"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}

function ProgressBar({ value, color = "#ef2b70", label }) {
  return (
    <div className="mb15">
      {label && (
        <div className="d-flex justify-content-between mb5">
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

export default function RewardsInfo() {
  const { convexUser } = useConvexUser();

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
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
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
          <h5 className="mb20">Your Rewards</h5>
          <div className="d-flex align-items-center gap-3 mb20">
            <TierBadge tier={tier} />
            <span className="fz14 text-muted">Member</span>
          </div>

          <div className="mb20">
            <p className="fz13 text-muted mb5">Credit Balance</p>
            <h3 className="mb0" style={{ color: "#ef2b70" }}>€{balanceEuros}</h3>
          </div>

          <div className="mb20">
            <p className="fz13 text-muted mb5">Yearly Spend</p>
            <h5 className="mb0">€{yearlySpendEuros}</h5>
          </div>

          <div className="mb20">
            <p className="fz13 text-muted mb5">Cashback Rate</p>
            <h5 className="mb0">{cashbackPct}% per completed order</h5>
          </div>

          {nextTierAmount && (
            <>
              <hr className="opacity-100 mb15 mt15" />
              <p className="fz13 text-muted mb10">
                Progress to {tier === "bronze" ? "Silver" : "Gold"} (€{nextTierAmount})
              </p>
              <ProgressBar
                value={rewards?.progressToNextTier || 0}
                label={`€${yearlySpendEuros} spent`}
                color={tier === "bronze" ? "#9e9e9e" : "#ffd700"}
              />
            </>
          )}

          {tier === "gold" && (
            <div className="alert alert-warning mt15 fz13 mb0">
              Gold member — maximum cashback!
            </div>
          )}
        </div>

        {/* Tier overview */}
        <div className="ps-widget bdrs8 p30 bdr1">
          <h6 className="mb15">Tier Overview</h6>
          {[
            { key: "bronze", threshold: "€0+",        rate: "3%" },
            { key: "silver", threshold: "€1.000+/jr", rate: "5%" },
            { key: "gold",   threshold: "€5.000+/jr", rate: "7%" },
          ].map((t) => (
            <div
              key={t.key}
              className="d-flex align-items-center justify-content-between mb10 pb10"
              style={{ borderBottom: "1px solid #f0f0f0", opacity: t.key === tier ? 1 : 0.5 }}
            >
              <TierBadge tier={t.key} />
              <span className="fz13 text-muted">{t.threshold}</span>
              <span className="fz13 fw500">{t.rate}</span>
              {t.key === tier && <i className="flaticon-check text-success fz16" />}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Transaction history */}
      <div className="col-md-7 mb30">
        <div className="ps-widget bdrs8 p30 bdr1">
          <h5 className="mb20">Credit History</h5>
          {!history || history.length === 0 ? (
            <div className="text-center py40 text-muted">
              <i className="flaticon-dollar fz40 mb15 d-block" />
              <p className="mb0">No transactions yet.<br />Complete your first order to earn credits!</p>
            </div>
          ) : (
            <div className="table-style3 table-responsive mb0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th className="text-end">Amount</th>
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
                        <td className={`text-end fz13 fw500 ${config.color}`}>
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

"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DoughnutChart from "../chart/DoughnutChart";
import LineChart from "../chart/LineChart";
import DashboardNavigation from "../header/DashboardNavigation";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Briefcase, CheckCircle2, Clock, Wallet, ArrowRight,
} from "lucide-react";

export default function DashboardInfo() {
  const t = useTranslations("dashboard");
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const userId = convexUser?._id;

  const stats = useQuery(
    api.marketplace.dashboard.getStats,
    userId ? { userId } : "skip"
  );

  const recentOrders = useQuery(
    api.marketplace.dashboard.getRecentOrders,
    userId ? { userId, limit: 5 } : "skip"
  );

  const freelancerProfile = useQuery(
    api.marketplace.freelancers.getByUserId,
    userId && convexUser?.userType === "freelancer" ? { userId } : "skip"
  );

  // Completeness for freelancers
  const completenessItems = convexUser?.userType === "freelancer" ? [
    { done: !!freelancerProfile?.bio,              label: t("addBio"),       href: "/my-profile" },
    { done: !!(freelancerProfile?.skills?.length), label: t("addSkills"),      href: "/my-profile" },
    { done: !!freelancerProfile?.hourlyRate,        label: t("setHourlyRate"), href: "/my-profile" },
    { done: !!freelancerProfile?.tagline,           label: t("addTagline"),   href: "/my-profile" },
  ] : [];
  const completedCount = completenessItems.filter(i => i.done).length;
  const completenessPct = completenessItems.length > 0
    ? Math.round((completedCount / completenessItems.length) * 100)
    : 100;
  const showBanner = convexUser?.userType === "freelancer"
    && completenessPct < 100
    && freelancerProfile !== undefined
    && freelancerProfile !== null;

  const isLoading = isAuthenticated && (stats === undefined || recentOrders === undefined);
  const notAuthenticated = isLoaded && !isAuthenticated;


  function formatCurrency(amount) {
    if (!amount && amount !== 0) return "€0";
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function getStatusClass(status) {
    switch (status) {
      case "completed":
        return "pending-style style1";
      case "in_progress":
      case "active":
        return "pending-style style2";
      case "delivered":
        return "pending-style style4";
      case "revision_requested":
        return "pending-style style5";
      case "pending":
      default:
        return "pending-style style3";
    }
  }

  function formatDate(timestamp) {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const statCards = [
    {
      Icon: Briefcase,
      accent: "var(--primary-600)",
      tint:   "var(--primary-50)",
      label: t("activeGigs"),
      subtitle: t("activeGigsSubtitle"),
      value: isLoading ? "…" : stats?.activeGigs ?? 0,
      hint: t("liveOnMarketplace"),
    },
    {
      Icon: CheckCircle2,
      accent: "oklch(55% 0.17 268)",
      tint:   "oklch(96% 0.04 268)",
      label: t("totalOrders"),
      subtitle: t("totalOrdersSubtitle"),
      value: isLoading ? "…" : stats?.totalOrders ?? 0,
      hint: (
        <>
          <strong style={{ color: "var(--primary-600)" }}>
            {isLoading ? "…" : stats?.pendingOrders ?? 0}
          </strong>{" "}
          {t("inProgress")}
        </>
      ),
    },
    {
      Icon: Clock,
      accent: "var(--secondary-600, oklch(58% 0.16 38))",
      tint:   "var(--secondary-50, oklch(96% 0.04 48))",
      label: t("pendingOrders"),
      subtitle: t("pendingOrdersSubtitle"),
      value: isLoading ? "…" : stats?.pendingOrders ?? 0,
      hint: t("activeQueue"),
    },
    {
      Icon: Wallet,
      accent: "var(--success-700)",
      tint:   "var(--success-50)",
      label: t("totalEarnings"),
      subtitle: t("totalEarningsSubtitle"),
      value: isLoading ? "…" : formatCurrency(stats?.totalEarnings ?? 0),
      hint: t("lifetimeEarnings"),
    },
  ];

  return (
    <>
      <DashboardNavigation />

      <div style={{ marginBottom: "var(--space-8)" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h2)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            margin: 0,
            marginBottom: "var(--space-2)",
          }}
        >
          {t("greeting", { name: convexUser?.name?.split(" ")[0] || "there" })}
        </h1>
        <p className="body-md" style={{ color: "var(--text-secondary)", margin: 0 }}>
          {freelancerProfile?.tagline || t("welcomeBack")}
        </p>
      </div>

      {convexUser === undefined && !notAuthenticated && (
        <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-6)", textAlign: "center" }}>
          <div
            role="status"
            aria-label="Loading"
            style={{
              width: 24,
              height: 24,
              margin: "0 auto",
              border: "3px solid var(--border-subtle)",
              borderTopColor: "var(--primary-600)",
              borderRadius: "999px",
              animation: "spin 0.9s linear infinite",
            }}
          />
        </div>
      )}
      {convexUser === null && !notAuthenticated && (
        <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-6)", textAlign: "center" }}>
          <p className="body-md" style={{ color: "var(--text-secondary)", margin: 0 }}>
            {t("settingUpAccount")}
          </p>
        </div>
      )}
      {notAuthenticated && (
        <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-6)", textAlign: "center" }}>
          <p className="body-md" style={{ color: "var(--text-secondary)", margin: 0 }}>
            {t("signInPrompt")}
          </p>
        </div>
      )}
      {!notAuthenticated && (<>
        {showBanner && (
          <div
            className="card"
            style={{
              padding: "var(--space-5)",
              marginBottom: "var(--space-6)",
              background: "var(--primary-50)",
              borderColor: "oklch(87% 0.06 293)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-5)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", flexWrap: "wrap", flex: 1 }}>
              <div style={{ minWidth: 160 }}>
                <div
                  className="overline"
                  style={{ color: "var(--primary-700)", marginBottom: 6 }}
                >
                  {t("profileCompleteness")}
                </div>
                <div
                  style={{
                    height: 6,
                    background: "oklch(88% 0.04 293)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${completenessPct}%`,
                      background: "var(--primary-600)",
                      borderRadius: 3,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                <div
                  className="body-sm"
                  style={{ color: "var(--text-tertiary)", marginTop: 4 }}
                >
                  {t("percentComplete", { pct: completenessPct })}
                </div>
              </div>
              <div style={{ display: "grid", gap: 2 }}>
                {completenessItems
                  .filter((i) => !i.done)
                  .slice(0, 2)
                  .map((item) => (
                    <div
                      key={item.label}
                      className="body-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span style={{ color: "var(--primary-600)" }}>•</span> {item.label}
                    </div>
                  ))}
              </div>
            </div>
            <Link href="/my-profile" className="btn btn--primary btn--sm">
              {t("completeProfile")}
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-4)",
            marginBottom: "var(--space-8)",
          }}
        >
          {statCards.map(({ Icon, accent, tint, label, subtitle, value, hint }) => (
            <div
              key={label}
              className="card"
              style={{
                padding: "var(--space-5)",
                borderLeft: `4px solid ${accent}`,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "var(--space-4)",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  className="body-sm"
                  style={{ color: "var(--text-secondary)", fontWeight: 500 }}
                >
                  {label}
                </div>
                <div
                  style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: -2 }}
                >
                  {subtitle}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-display-sm, 2rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    margin: "var(--space-2) 0",
                    color: "var(--text-primary)",
                  }}
                >
                  {value}
                </div>
                <div className="body-sm" style={{ color: "var(--text-secondary)" }}>
                  {hint}
                </div>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-md)",
                  background: tint,
                  color: accent,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={18} />
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-5)",
            marginBottom: "var(--space-2)",
          }}
        >
          <div style={{ gridColumn: "span 2", minWidth: 0 }} className="chart-span-2">
            <LineChart userId={userId} />
          </div>
          <div style={{ minWidth: 0 }}>
            <DoughnutChart userId={userId} />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          <div style={{ gridColumn: "span 2", minWidth: 0 }} className="chart-span-2">
            <div className="card" style={{ padding: "var(--space-6)", marginBottom: "var(--space-6)" }}>
              <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                <h5 className="title">{t("recentOrders")}</h5>
                <Link href="/orders" className="text-decoration-underline text-thm6">{t("viewAll")}</Link>
              </div>
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-thm" role="status">
                    <span className="visually-hidden">{t("loadingOrders")}</span>
                  </div>
                  <p className="text mt-2 mb-0">{t("loadingOrders")}</p>
                </div>
              ) : !recentOrders || recentOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text mb-0">{t("noOrdersYet")}</p>
                </div>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">{t("orderColumn")}</th>
                        <th scope="col">{t("amountColumn")}</th>
                        <th scope="col">{t("dateColumn")}</th>
                        <th scope="col">{t("statusColumn")}</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td className="vam">
                            <div className="fz14 fw500 dark-color">{order.title}</div>
                            <div className="fz12 text">
                              {order.orderNumber}
                              {order.clientName && ` · ${order.clientName}`}
                              {order.freelancerName && ` · ${order.freelancerName}`}
                            </div>
                          </td>
                          <td className="vam fz14 fw500">{formatCurrency(order.amount)}</td>
                          <td className="vam fz13 text">{formatDate(order.createdAt)}</td>
                          <td className="vam">
                            <span className={getStatusClass(order.status)}>
                              {order.status?.replace(/_/g, " ")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="card" style={{ padding: "var(--space-6)", marginBottom: "var(--space-6)" }}>
              <div className="bdrb1 pb15 mb30">
                <h5 className="title">{t("accountSummary")}</h5>
              </div>
              <div className="dashboard-timeline-label">
                <div className="timeline-item pb15">
                  <div className="child-timeline-label">{t("gigsLabel")}</div>
                  <div className="timeline-badge d-flex align-items-center">
                    <i className="fas fa-genderless" />
                  </div>
                  <div className="ra_pcontent pl10">
                    <span className="title">
                      {t("activeGigsCount", { count: isLoading ? "..." : stats?.activeGigs ?? 0 })}
                    </span>
                    <br />
                    <span className="subtitle">{t("availableForClients")}</span>
                  </div>
                </div>
              </div>
              <div className="dashboard-timeline-label">
                <div className="timeline-item pb15">
                  <div className="child-timeline-label color3">{t("ordersLabel")}</div>
                  <div className="timeline-badge d-flex align-items-center color3">
                    <i className="fas fa-genderless" />
                  </div>
                  <div className="ra_pcontent pl10">
                    <span className="title">
                      {t("totalOrdersCount", { count: isLoading ? "..." : stats?.totalOrders ?? 0 })}
                    </span>
                    <br />
                    <span className="subtitle">
                      {t("currentlyInProgress", { count: isLoading ? "..." : stats?.pendingOrders ?? 0 })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="dashboard-timeline-label">
                <div className="timeline-item pb15">
                  <div className="child-timeline-label color4">{t("earningsLabel")}</div>
                  <div className="timeline-badge d-flex align-items-center color4">
                    <i className="fas fa-genderless" />
                  </div>
                  <div className="ra_pcontent pl10">
                    <span className="title">
                      {t("totalAmount", { amount: isLoading ? "..." : formatCurrency(stats?.totalEarnings ?? 0) })}
                    </span>
                    <br />
                    <span className="subtitle">{t("lifetimeFreelancerEarnings")}</span>
                  </div>
                </div>
              </div>
              <div className="dashboard-timeline-label before-none mb30">
                <div className="timeline-item pb0">
                  <div className="child-timeline-label color5">{t("statusLabel")}</div>
                  <div className="timeline-badge d-flex align-items-center color5">
                    <i className="fas fa-genderless" />
                  </div>
                  <div className="ra_pcontent pl10">
                    <span className="title">{t("accountActive")}</span>
                    <br />
                    <span className="subtitle">{t("accountGoodStanding")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>)}
    </>
  );
}

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

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>{t("greeting", { name: convexUser?.name?.split(" ")[0] || "there" })}</h2>
              <p className="text">
                {freelancerProfile?.tagline || t("welcomeBack")}
              </p>
            </div>
          </div>
        </div>
        {convexUser === undefined && !notAuthenticated && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <div className="text-center py-4">
                <div className="spinner-border spinner-border-sm text-success" role="status" />
              </div>
            </div>
          </div></div>
        )}
        {convexUser === null && !notAuthenticated && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <div className="text-center py-4">
                <p className="text mb-0">{t("settingUpAccount")}</p>
              </div>
            </div>
          </div></div>
        )}
        {notAuthenticated && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text text-center mb-0">{t("signInPrompt")}</p>
            </div>
          </div></div>
        )}
        {!notAuthenticated && (<>
        {showBanner && (
          <div className="row mb20">
            <div className="col-12">
              <div
                className="bdrs8 p20 d-flex align-items-center justify-content-between flex-wrap gap-3"
                style={{ background: "#fdf0f4", border: "1px solid #fbd5e2" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div style={{ minWidth: 140 }}>
                    <div className="fz13 text-muted mb-1">{t("profileCompleteness")}</div>
                    <div style={{ height: 6, background: "#fbd5e2", borderRadius: 3 }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${completenessPct}%`,
                          background: "#ef2b70",
                          borderRadius: 3,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                    <div className="fz12 text-muted mt-1">{t("percentComplete", { pct: completenessPct })}</div>
                  </div>
                  <div>
                    {completenessItems
                      .filter(i => !i.done)
                      .slice(0, 2)
                      .map(item => (
                        <div key={item.label} className="fz13 text-muted">
                          <span style={{ color: "#ef2b70" }}>•</span> {item.label}
                        </div>
                      ))}
                  </div>
                </div>
                <Link
                  href="/my-profile"
                  className="btn btn-sm bdrs8 text-white fz13"
                  style={{ background: "#ef2b70" }}
                >
                  {t("completeProfile")} →
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact" style={{ borderLeft: "4px solid #2A8703" }}>
              <div className="details">
                <div className="fz15">{t("activeGigs")}</div>
                <div className="fz11 text-muted" style={{ marginTop: -2 }}>{t("activeGigsSubtitle")}</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    stats?.activeGigs ?? 0
                  )}
                </div>
                <div className="text fz14">
                  {t("liveOnMarketplace")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-contract" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact" style={{ borderLeft: "4px solid #6366f1" }}>
              <div className="details">
                <div className="fz15">{t("totalOrders")}</div>
                <div className="fz11 text-muted" style={{ marginTop: -2 }}>{t("totalOrdersSubtitle")}</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    stats?.totalOrders ?? 0
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">{isLoading ? "..." : stats?.pendingOrders ?? 0}</span> {t("inProgress")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-success" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact" style={{ borderLeft: "4px solid #f59e0b" }}>
              <div className="details">
                <div className="fz15">{t("pendingOrders")}</div>
                <div className="fz11 text-muted" style={{ marginTop: -2 }}>{t("pendingOrdersSubtitle")}</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    stats?.pendingOrders ?? 0
                  )}
                </div>
                <div className="text fz14">
                  {t("activeQueue")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-review" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact" style={{ borderLeft: "4px solid #10b981" }}>
              <div className="details">
                <div className="fz15">{t("totalEarnings")}</div>
                <div className="fz11 text-muted" style={{ marginTop: -2 }}>{t("totalEarningsSubtitle")}</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    formatCurrency(stats?.totalEarnings ?? 0)
                  )}
                </div>
                <div className="text fz14">
                  {t("lifetimeEarnings")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-review-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8">
            <LineChart userId={userId} />
          </div>
          <div className="col-xl-4">
            <DoughnutChart userId={userId} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-xxl-8">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
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
          <div className="col-md-6 col-xxl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
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
      </div>
    </>
  );
}

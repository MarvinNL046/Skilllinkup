"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DoughnutChart from "../chart/DoughnutChart";
import LineChart from "../chart/LineChart";
import DashboardNavigation from "../header/DashboardNavigation";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardInfo() {
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
    { done: !!freelancerProfile?.bio,              label: "Add a bio",       href: "/my-profile" },
    { done: !!(freelancerProfile?.skills?.length), label: "Add skills",      href: "/my-profile" },
    { done: !!freelancerProfile?.hourlyRate,        label: "Set hourly rate", href: "/my-profile" },
    { done: !!freelancerProfile?.tagline,           label: "Add a tagline",   href: "/my-profile" },
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
              <h2>Hi, {convexUser?.name?.split(" ")[0] || "there"}!</h2>
              <p className="text">
                {freelancerProfile?.tagline || "Welcome back! Here is what is happening with your account."}
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
                <p className="text mb-0">Setting up your account...</p>
              </div>
            </div>
          </div></div>
        )}
        {notAuthenticated && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text text-center mb-0">Please sign in to view your dashboard.</p>
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
                    <div className="fz13 text-muted mb-1">Profile completeness</div>
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
                    <div className="fz12 text-muted mt-1">{completenessPct}% complete</div>
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
                  Complete profile →
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact" style={{ borderLeft: "4px solid #2A8703" }}>
              <div className="details">
                <div className="fz15">Active Gigs</div>
                <div className="fz11 text-muted" style={{ marginTop: -2 }}>Your fixed-price service listings</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    stats?.activeGigs ?? 0
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">Live</span> on marketplace
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
                <div className="fz15">Total Orders</div>
                <div className="fz11 text-muted" style={{ marginTop: -2 }}>Purchases from your services</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    stats?.totalOrders ?? 0
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">{isLoading ? "..." : stats?.pendingOrders ?? 0}</span> In Progress
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
                <div className="fz15">Pending Orders</div>
                <div className="fz11 text-muted" style={{ marginTop: -2 }}>Orders awaiting delivery</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    stats?.pendingOrders ?? 0
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">Active</span> queue
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
                <div className="fz15">Total Earnings</div>
                <div className="fz11 text-muted" style={{ marginTop: -2 }}>Revenue from completed orders</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    formatCurrency(stats?.totalEarnings ?? 0)
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">Lifetime</span> earnings
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
                <h5 className="title">Recent Orders</h5>
                <Link href="/orders" className="text-decoration-underline text-thm6">View All</Link>
              </div>
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-thm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text mt-2 mb-0">Loading orders...</p>
                </div>
              ) : !recentOrders || recentOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text mb-0">No orders yet. Start by browsing services!</p>
                </div>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Order</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
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
                <h5 className="title">Account Summary</h5>
              </div>
              <div className="dashboard-timeline-label">
                <div className="timeline-item pb15">
                  <div className="child-timeline-label">Gigs</div>
                  <div className="timeline-badge d-flex align-items-center">
                    <i className="fas fa-genderless" />
                  </div>
                  <div className="ra_pcontent pl10">
                    <span className="title">
                      {isLoading ? "..." : stats?.activeGigs ?? 0} Active Gigs
                    </span>
                    <br />
                    <span className="subtitle">Available for clients to order</span>
                  </div>
                </div>
              </div>
              <div className="dashboard-timeline-label">
                <div className="timeline-item pb15">
                  <div className="child-timeline-label color3">Orders</div>
                  <div className="timeline-badge d-flex align-items-center color3">
                    <i className="fas fa-genderless" />
                  </div>
                  <div className="ra_pcontent pl10">
                    <span className="title">
                      {isLoading ? "..." : stats?.totalOrders ?? 0} Total Orders
                    </span>
                    <br />
                    <span className="subtitle">
                      {isLoading ? "..." : stats?.pendingOrders ?? 0} currently in progress
                    </span>
                  </div>
                </div>
              </div>
              <div className="dashboard-timeline-label">
                <div className="timeline-item pb15">
                  <div className="child-timeline-label color4">Earnings</div>
                  <div className="timeline-badge d-flex align-items-center color4">
                    <i className="fas fa-genderless" />
                  </div>
                  <div className="ra_pcontent pl10">
                    <span className="title">
                      {isLoading ? "..." : formatCurrency(stats?.totalEarnings ?? 0)} Total
                    </span>
                    <br />
                    <span className="subtitle">Lifetime freelancer earnings</span>
                  </div>
                </div>
              </div>
              <div className="dashboard-timeline-label before-none mb30">
                <div className="timeline-item pb0">
                  <div className="child-timeline-label color5">Status</div>
                  <div className="timeline-badge d-flex align-items-center color5">
                    <i className="fas fa-genderless" />
                  </div>
                  <div className="ra_pcontent pl10">
                    <span className="title">Account Active</span>
                    <br />
                    <span className="subtitle">Your account is in good standing</span>
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

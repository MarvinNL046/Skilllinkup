import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DashboardCharts from "@/components/dashboard/DashboardChartsWrapper";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { locale } = await params;

  const { getToken, userId: clerkId } = await auth();
  if (!clerkId) {
    redirect(`/${locale}/sign-in`);
  }

  const clerkUser = await currentUser();
  const userName = clerkUser
    ? clerkUser.firstName
      ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
      : clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0] ?? "User"
    : "User";

  const token = await getToken({ template: "convex" });

  // Fetch Convex user
  const convexUser = await fetchQuery(
    api.users.getByClerkId,
    { clerkId },
    { token: token ?? undefined }
  );

  // Fetch dashboard stats
  const stats = await fetchQuery(
    api.marketplace.dashboard.getStats,
    { userId: convexUser?._id },
    { token: token ?? undefined }
  );

  // Fetch recent orders
  const recentOrdersRaw = await fetchQuery(
    api.marketplace.dashboard.getRecentOrders,
    { userId: convexUser?._id, limit: 5 },
    { token: token ?? undefined }
  );

  // Fetch freelancer profile (if exists) for active gig count display
  let profile: any = null;
  if (convexUser) {
    profile = await fetchQuery(
      api.marketplace.freelancers.getByUserId,
      { userId: convexUser._id },
      { token: token ?? undefined }
    );
  }

  // Build monthly earnings for chart (last 6 months from recent orders)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);
  const sixMonthsAgoMs = sixMonthsAgo.getTime();

  const monthMap = new Map<string, { label: string; total: number }>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    monthMap.set(key, { label, total: 0 });
  }

  for (const order of recentOrdersRaw) {
    if (order.status === "completed" && order.createdAt >= sixMonthsAgoMs) {
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const existing = monthMap.get(key);
      if (existing) {
        existing.total += order.amount;
      }
    }
  }

  const monthlyEarnings = Array.from(monthMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, { label, total }]) => ({ month, monthLabel: label, total }));

  // Order distribution for doughnut chart
  const orderDistribution = {
    gig: recentOrdersRaw.filter((o) => o.orderType === "gig" && o.status === "completed").length,
    project: recentOrdersRaw.filter((o) => o.orderType === "project" && o.status === "completed").length,
    pending: recentOrdersRaw.filter((o) =>
      ["pending", "in_progress", "active"].includes(o.status)
    ).length,
  };

  // Format currency helper
  function formatEUR(amount: number): string {
    return `€${amount.toFixed(2)}`;
  }

  // Determine if user is freelancer
  const isFreelancer = !!profile;

  const statCards = [
    {
      icon: "flaticon-invoice",
      label: "Total Orders",
      value: stats.totalOrders,
      change:
        stats.pendingOrders > 0
          ? `${stats.pendingOrders} active`
          : undefined,
    },
    {
      icon: "flaticon-dollar",
      label: isFreelancer ? "Total Earnings" : "Total Spent",
      value: formatEUR(stats.totalEarnings),
      change: undefined,
    },
    {
      icon: "flaticon-briefcase",
      label: "Active Gigs",
      value: stats.activeGigs,
      change: isFreelancer ? "Your listings" : undefined,
    },
    {
      icon: "flaticon-alarm",
      label: "Pending Orders",
      value: stats.pendingOrders,
      change: stats.pendingOrders > 0 ? "Needs attention" : undefined,
    },
  ];

  return (
    <div className="dashboard__main pl0-md">
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          {/* Page header */}
          <div className="col-lg-12">
            <div className="dashboard_title_area mb30">
              <h2 className="title">Dashboard</h2>
              <p className="text">
                Welcome back, <strong>{userName}</strong>
              </p>
            </div>
          </div>

          {/* Stat cards */}
          {statCards.map((card) => (
            <div key={card.label} className="col-sm-6 col-xl-3">
              <StatCard
                icon={card.icon}
                label={card.label}
                value={card.value}
                change={card.change}
              />
            </div>
          ))}

          {/* Charts row */}
          <div className="col-lg-12">
            <DashboardCharts
              monthlyEarnings={monthlyEarnings}
              orderDistribution={orderDistribution}
            />
          </div>

          {/* Recent activity */}
          <div className="col-lg-12">
            <RecentActivity orders={recentOrdersRaw} />
          </div>

          {/* Quick links */}
          <div className="col-lg-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <h4 className="title fz17 mb20">Quick Actions</h4>
              <div className="row">
                {isFreelancer && (
                  <>
                    <div className="col-sm-6 col-lg-3 mb15">
                      <Link
                        href={`/${locale}/dashboard/manage-services`}
                        className="d-flex align-items-center gap10 p15 bdrs4 border"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="flaticon-briefcase fz20 text-thm" />
                        <span className="fz14 fw500 dark-color">My Services</span>
                      </Link>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb15">
                      <Link
                        href={`/${locale}/dashboard/proposals`}
                        className="d-flex align-items-center gap10 p15 bdrs4 border"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="flaticon-document fz20 text-thm" />
                        <span className="fz14 fw500 dark-color">Proposals</span>
                      </Link>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb15">
                      <Link
                        href={`/${locale}/dashboard/payouts`}
                        className="d-flex align-items-center gap10 p15 bdrs4 border"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="flaticon-dollar fz20 text-thm" />
                        <span className="fz14 fw500 dark-color">Payouts</span>
                      </Link>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb15">
                      <Link
                        href={`/${locale}/dashboard/my-profile`}
                        className="d-flex align-items-center gap10 p15 bdrs4 border"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="flaticon-user fz20 text-thm" />
                        <span className="fz14 fw500 dark-color">My Profile</span>
                      </Link>
                    </div>
                  </>
                )}
                {!isFreelancer && (
                  <>
                    <div className="col-sm-6 col-lg-3 mb15">
                      <Link
                        href={`/${locale}/dashboard/manage-projects`}
                        className="d-flex align-items-center gap10 p15 bdrs4 border"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="flaticon-content fz20 text-thm" />
                        <span className="fz14 fw500 dark-color">My Projects</span>
                      </Link>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb15">
                      <Link
                        href={`/${locale}/dashboard/manage-jobs`}
                        className="d-flex align-items-center gap10 p15 bdrs4 border"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="flaticon-briefcase fz20 text-thm" />
                        <span className="fz14 fw500 dark-color">My Jobs</span>
                      </Link>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb15">
                      <Link
                        href={`/${locale}/services`}
                        className="d-flex align-items-center gap10 p15 bdrs4 border"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="flaticon-search fz20 text-thm" />
                        <span className="fz14 fw500 dark-color">Browse Services</span>
                      </Link>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb15">
                      <Link
                        href={`/${locale}/dashboard/messages`}
                        className="d-flex align-items-center gap10 p15 bdrs4 border"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="flaticon-chat fz20 text-thm" />
                        <span className="fz14 fw500 dark-color">Messages</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

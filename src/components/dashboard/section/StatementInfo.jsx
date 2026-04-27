"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, BarChart3 } from "lucide-react";

function StatCard({ Icon, label, value, sublabel, isLoading }) {
  return (
    <Card>
      <CardContent className="p-5 flex items-center justify-between">
        <div className="min-w-0">
          <div className="text-sm text-[var(--text-secondary)]">{label}</div>
          <div className="text-2xl font-semibold mt-1">
            {isLoading ? (
              <span className="text-[var(--text-tertiary)] text-xl">...</span>
            ) : (
              value
            )}
          </div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">{sublabel}</div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function StatementInfo() {
  const t = useTranslations("statements");
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const userId = convexUser?._id;

  const clientOrders = useQuery(
    api.marketplace.orders.getByUser,
    userId ? { userId, role: "client" } : "skip"
  );

  const freelancerOrders = useQuery(
    api.marketplace.orders.getByUser,
    userId ? { userId, role: "freelancer" } : "skip"
  );

  const isLoading =
    isAuthenticated && (clientOrders === undefined || freelancerOrders === undefined);

  const allOrders = (() => {
    const seen = new Set();
    const merged = [...(clientOrders || []), ...(freelancerOrders || [])];
    return merged
      .filter((o) => {
        if (seen.has(o._id)) return false;
        seen.add(o._id);
        return true;
      })
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  })();

  const netIncome = (freelancerOrders || [])
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + (o.freelancerEarnings ?? 0), 0);

  const totalSpent = (clientOrders || [])
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.amount ?? 0), 0);

  const pendingAmount = (freelancerOrders || [])
    .filter((o) =>
      ["in_progress", "active", "delivered", "revision_requested"].includes(o.status)
    )
    .reduce((sum, o) => sum + (o.freelancerEarnings ?? 0), 0);

  function formatCurrency(amount) {
    if (!amount && amount !== 0) return "€0";
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(timestamp) {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function getOrderType(order) {
    const isFreelancer = (freelancerOrders || []).some((o) => o._id === order._id);
    const isClient = (clientOrders || []).some((o) => o._id === order._id);
    if (isFreelancer && isClient) return "both";
    if (isFreelancer) return "sale";
    return "purchase";
  }

  function getTypeBadge(type) {
    if (type === "sale") return <Badge variant="success">{t("serviceSale")}</Badge>;
    if (type === "purchase") return <Badge variant="info">{t("servicePurchased")}</Badge>;
    return <Badge variant="muted">{t("transaction")}</Badge>;
  }

  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />
      <div className="dashboard_title_area mb-6">
        <h2>{t("title")}</h2>
        <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
      </div>

      {isLoaded && !isAuthenticated && (
        <Card className="mb-6">
          <CardContent className="p-8 text-center">
            <p className="text-[var(--text-secondary)]">{t("signInPrompt")}</p>
          </CardContent>
        </Card>
      )}

      {isAuthenticated && convexUser === undefined && (
        <Card className="mb-6">
          <CardContent className="p-8 flex justify-center">
            <div
              role="status"
              aria-label="Loading"
              className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
            />
          </CardContent>
        </Card>
      )}

      {isAuthenticated && convexUser === null && (
        <Card className="mb-6">
          <CardContent className="p-8 text-center">
            <p className="text-[var(--text-secondary)]">{t("settingUpAccount")}</p>
          </CardContent>
        </Card>
      )}

      {(isAuthenticated || !isLoaded) && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
            <StatCard
              Icon={TrendingUp}
              label={t("netIncome")}
              value={formatCurrency(netIncome)}
              sublabel={t("freelancerEarnings")}
              isLoading={isLoading}
            />
            <StatCard
              Icon={TrendingDown}
              label={t("totalSpent")}
              value={formatCurrency(totalSpent)}
              sublabel={t("asClientPurchases")}
              isLoading={isLoading}
            />
            <StatCard
              Icon={Clock}
              label={t("pendingClearance")}
              value={formatCurrency(pendingAmount)}
              sublabel={t("activeOrders")}
              isLoading={isLoading}
            />
            <StatCard
              Icon={BarChart3}
              label={t("totalTransactions")}
              value={allOrders.length}
              sublabel={t("allOrdersCombined")}
              isLoading={isLoading}
            />
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div
                    role="status"
                    aria-label={t("loading")}
                    className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary mx-auto"
                  />
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    {t("loadingStatements")}
                  </p>
                </div>
              ) : allOrders.length === 0 ? (
                <p className="text-center text-[var(--text-secondary)] py-12">
                  {t("noTransactions")}
                </p>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">{t("columnDate")}</th>
                        <th scope="col">{t("columnType")}</th>
                        <th scope="col">{t("columnDetail")}</th>
                        <th scope="col">{t("columnAmount")}</th>
                        <th scope="col">{t("columnStatus")}</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {allOrders.map((order) => {
                        const orderType = getOrderType(order);
                        const displayAmount =
                          orderType === "sale"
                            ? order.freelancerEarnings ?? 0
                            : order.amount ?? 0;
                        return (
                          <tr key={order._id}>
                            <td data-label={t("columnDate")}>{formatDate(order.createdAt)}</td>
                            <td data-label={t("columnType")} className="vam">
                              {getTypeBadge(orderType)}
                            </td>
                            <td data-label={t("columnDetail")} className="vam">
                              <div className="text-sm">{order.title}</div>
                              <div className="text-xs text-[var(--text-secondary)]">
                                {order.orderNumber}
                              </div>
                            </td>
                            <td data-label={t("columnAmount")} className="vam">
                              {formatCurrency(order.amount ?? 0)}
                            </td>
                            <td data-label={t("columnStatus")} className="vam">
                              {formatCurrency(displayAmount)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

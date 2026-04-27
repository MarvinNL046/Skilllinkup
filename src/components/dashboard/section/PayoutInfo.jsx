"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import PaymentMethod from "./PaymentMethod";
import StripeConnectButton from "@/components/ui/StripeConnectButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Clock, Wallet } from "lucide-react";

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

function getStatusBadge(status) {
  switch (status) {
    case "completed":
      return <Badge variant="success">{status}</Badge>;
    case "in_progress":
    case "active":
      return <Badge variant="info">{status?.replace(/_/g, " ")}</Badge>;
    case "pending":
      return <Badge variant="warning">{status}</Badge>;
    default:
      return <Badge variant="muted">{status?.replace(/_/g, " ")}</Badge>;
  }
}

export default function PayoutInfo() {
  const t = useTranslations("payouts");
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const userId = convexUser?._id;

  const freelancerOrders = useQuery(
    api.marketplace.orders.getByUser,
    userId ? { userId, role: "freelancer" } : "skip"
  );

  const isLoading =
    isAuthenticated &&
    (convexUser === undefined || (userId && freelancerOrders === undefined));
  const notAuthenticated = isLoaded && !isAuthenticated;
  const noConvexProfile = isAuthenticated && convexUser === null;

  const completedOrders = (freelancerOrders || []).filter((o) => o.status === "completed");
  const totalEarnings = completedOrders.reduce(
    (sum, o) => sum + (o.freelancerEarnings ?? 0),
    0
  );
  const pendingOrders = (freelancerOrders || []).filter((o) =>
    ["pending", "in_progress", "active", "delivered", "revision_requested"].includes(o.status)
  );
  const pendingEarnings = pendingOrders.reduce(
    (sum, o) => sum + (o.freelancerEarnings ?? 0),
    0
  );

  function formatCurrency(amount) {
    if (!amount && amount !== 0) return "€0.00";
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
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

  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />
      <div className="dashboard_title_area mb-6">
        <div>
          <h2>{t("title")}</h2>
          <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
        </div>
        <Button asChild>
          <Link href="/my-profile">
            {t("manageProfile")}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {notAuthenticated && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-[var(--text-secondary)]">{t("signInPrompt")}</p>
          </CardContent>
        </Card>
      )}

      {isAuthenticated && convexUser === undefined && (
        <Card>
          <CardContent className="p-8 flex justify-center">
            <div
              role="status"
              aria-label="Loading"
              className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
            />
          </CardContent>
        </Card>
      )}

      {noConvexProfile && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-[var(--text-secondary)]">
              {t("noProfileFound", { link: "" })}
              <Link href="/onboarding" className="text-primary hover:underline ml-1">
                {t("onboarding")}
              </Link>
            </p>
          </CardContent>
        </Card>
      )}

      {!notAuthenticated && !noConvexProfile && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            <StatCard
              Icon={TrendingUp}
              label={t("totalEarned")}
              value={formatCurrency(totalEarnings)}
              sublabel={
                <>
                  <span className="text-primary font-medium">
                    {isLoading ? "..." : completedOrders.length}
                  </span>{" "}
                  {t("completedOrders")}
                </>
              }
              isLoading={isLoading}
            />
            <StatCard
              Icon={Clock}
              label={t("pendingEarnings")}
              value={formatCurrency(pendingEarnings)}
              sublabel={
                <>
                  <span className="text-primary font-medium">
                    {isLoading ? "..." : pendingOrders.length}
                  </span>{" "}
                  {t("ordersInProgress")}
                </>
              }
              isLoading={isLoading}
            />
            <StatCard
              Icon={Wallet}
              label={t("availableForWithdrawal")}
              value={formatCurrency(totalEarnings)}
              sublabel={
                <>
                  <span className="text-primary font-medium">Stripe</span>{" "}
                  {t("stripeConnectRequired")}
                </>
              }
              isLoading={isLoading}
            />
          </div>

          <Card className="mb-8 overflow-hidden">
            <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
              <CardTitle>{t("earningsHistory")}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div
                    role="status"
                    aria-label={t("loading")}
                    className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary mx-auto"
                  />
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    {t("loadingEarnings")}
                  </p>
                </div>
              ) : !freelancerOrders || freelancerOrders.length === 0 ? (
                <p className="text-center text-[var(--text-secondary)] py-12">
                  {t("noOrdersYet")}
                </p>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">{t("columnAmount")}</th>
                        <th scope="col">{t("columnOrder")}</th>
                        <th scope="col">{t("columnDate")}</th>
                        <th scope="col">{t("columnPaymentStatus")}</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {freelancerOrders.map((order) => (
                        <tr key={order._id}>
                          <td data-label={t("columnAmount")} className="font-medium">
                            {formatCurrency(order.freelancerEarnings ?? 0)}
                          </td>
                          <td data-label={t("columnOrder")} className="vam">
                            <div className="text-sm">{order.title}</div>
                            <div className="text-xs text-[var(--text-secondary)]">
                              {order.orderNumber}
                            </div>
                          </td>
                          <td data-label={t("columnDate")} className="vam">
                            {formatDate(order.createdAt)}
                          </td>
                          <td data-label={t("columnPaymentStatus")} className="vam">
                            {getStatusBadge(order.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
              <CardTitle>{t("stripePayoutSetup")}</CardTitle>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("stripePayoutDescription")}
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <StripeConnectButton />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-6 max-w-3xl">
              <PaymentMethod />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

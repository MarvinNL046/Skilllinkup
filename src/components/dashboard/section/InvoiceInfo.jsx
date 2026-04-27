"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt } from "lucide-react";

const getCurrencySymbol = (currency) => {
  if (currency === "EUR") return "€";
  if (currency === "USD") return "$";
  if (currency === "GBP") return "£";
  return currency ?? "€";
};

const formatDate = (timestamp) => {
  if (!timestamp) return "—";
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function InvoiceInfo() {
  const t = useTranslations("invoice");
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();

  const orders = useQuery(
    api.marketplace.orders.getByUser,
    convexUser?._id ? { userId: convexUser._id, role: "client" } : "skip"
  );

  const invoices =
    orders !== undefined
      ? orders.filter((order) => order.status === "completed")
      : undefined;

  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />
      <div className="dashboard_title_area mb-6">
        <h2>{t("title")}</h2>
        <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          {isLoaded && !isAuthenticated && (
            <div className="text-center py-12">
              <Receipt className="h-10 w-10 text-[var(--text-tertiary)] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)]">{t("signInPrompt")}</p>
            </div>
          )}

          {isAuthenticated && convexUser === undefined && (
            <div className="flex justify-center py-8">
              <div
                role="status"
                aria-label="Loading"
                className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
              />
            </div>
          )}

          {isAuthenticated && convexUser === null && (
            <p className="text-center text-[var(--text-secondary)] py-8">
              {t("settingUpAccount")}
            </p>
          )}

          {isAuthenticated &&
            convexUser !== undefined &&
            convexUser !== null &&
            invoices === undefined && (
              <div className="text-center py-12">
                <div
                  role="status"
                  className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary mx-auto"
                />
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  {t("loadingInvoices")}
                </p>
              </div>
            )}

          {isAuthenticated && invoices !== undefined && invoices.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="h-10 w-10 text-[var(--text-tertiary)] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)]">{t("noInvoicesYet")}</p>
            </div>
          )}

          {isAuthenticated && invoices !== undefined && invoices.length > 0 && (
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">{t("columnInvoiceId")}</th>
                    <th scope="col">{t("columnPurchaseDate")}</th>
                    <th scope="col">{t("columnAmount")}</th>
                    <th scope="col">{t("columnPaymentStatus")}</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {invoices.map((order) => (
                    <tr key={order._id}>
                      <td data-label={t("columnInvoiceId")}>
                        <div className="text-sm">
                          {order.orderNumber}
                          <span className="ms-3 font-medium">{order.title}</span>
                        </div>
                      </td>
                      <td data-label={t("columnPurchaseDate")} className="vam text-sm">
                        {formatDate(order.completedAt ?? order.updatedAt)}
                      </td>
                      <td data-label={t("columnAmount")} className="vam text-sm font-medium">
                        {getCurrencySymbol(order.currency)}
                        {(order.amount ?? 0).toFixed(2)}
                      </td>
                      <td data-label={t("columnPaymentStatus")} className="vam">
                        <Badge variant="success">{t("completed")}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";

const getCurrencySymbol = (currency) => {
  if (currency === "EUR") return "\u20AC";
  if (currency === "USD") return "$";
  if (currency === "GBP") return "\u00A3";
  return currency ?? "\u20AC";
};

const formatDate = (timestamp) => {
  if (!timestamp) return "\u2014";
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
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row items-center justify-between pb40">
          <div className="col-xl-4">
            <div className="dashboard_title_area">
              <h2>{t("title")}</h2>
              <p className="text">{t("pageDescription")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">

              {isLoaded && !isAuthenticated && (
                <div className="text-center py-5">
                  <i className="flaticon-receipt fz40 text mb20" />
                  <p className="text mb-0">{t("signInPrompt")}</p>
                </div>
              )}

              {isAuthenticated && convexUser === undefined && (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-success" role="status" />
                </div>
              )}

              {isAuthenticated && convexUser === null && (
                <div className="text-center py-4">
                  <p className="text mb-0">{t("settingUpAccount")}</p>
                </div>
              )}

              {isAuthenticated && convexUser !== undefined && convexUser !== null && invoices === undefined && (
                <div className="text-center py-5">
                  <div className="spinner-border text-thm" role="status" />
                  <p className="text mt10 mb-0">{t("loadingInvoices")}</p>
                </div>
              )}

              {isAuthenticated && invoices !== undefined && invoices.length === 0 && (
                <div className="text-center py-5">
                  <i className="flaticon-receipt fz40 text mb20" />
                  <p className="text mb-0">{t("noInvoicesYet")}</p>
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
                          <th scope="row">
                            <div className="fz14">
                              {order.orderNumber}
                              <span className="ms-3 fw500">{order.title}</span>
                            </div>
                          </th>
                          <td className="vam fz14">
                            {formatDate(order.completedAt ?? order.updatedAt)}
                          </td>
                          <td className="vam fz15 fw500">
                            {getCurrencySymbol(order.currency)}
                            {(order.amount ?? 0).toFixed(2)}
                          </td>
                          <td className="vam">
                            <span className="pending-style style3">{t("completed")}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

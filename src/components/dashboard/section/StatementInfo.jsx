"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";

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

  const isLoading = isAuthenticated && (clientOrders === undefined || freelancerOrders === undefined);

  const allOrders = (() => {
    const seen = new Set();
    const merged = [...(clientOrders || []), ...(freelancerOrders || [])];
    return merged.filter((o) => {
      if (seen.has(o._id)) return false;
      seen.add(o._id);
      return true;
    }).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
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

  function getTypeLabel(type) {
    if (type === "sale") return <span className="pending-style style4">{t("serviceSale")}</span>;
    if (type === "purchase") return <span className="pending-style style5">{t("servicePurchased")}</span>;
    return <span className="pending-style">{t("transaction")}</span>;
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
              <h2>{t("title")}</h2>
              <p className="text">{t("pageDescription")}</p>
            </div>
          </div>
        </div>
        {isLoaded && !isAuthenticated && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text text-center mb-0">{t("signInPrompt")}</p>
            </div>
          </div></div>
        )}

        {isAuthenticated && convexUser === undefined && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <div className="text-center py-4">
                <div className="spinner-border spinner-border-sm text-success" role="status" />
              </div>
            </div>
          </div></div>
        )}

        {isAuthenticated && convexUser === null && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <div className="text-center py-4">
                <p className="text mb-0">{t("settingUpAccount")}</p>
              </div>
            </div>
          </div></div>
        )}

        {(isAuthenticated || !isLoaded) && (<><div className="row">
          <div className="col-sm-6 col-xxl-3">
            <div className="flex items-center justify-between statistics_funfact">
              <div className="details">
                <div className="fz15">{t("netIncome")}</div>
                <div className="title">
                  {isLoading ? <span className="text-muted fz20">...</span> : formatCurrency(netIncome)}
                </div>
                <div className="text fz14">
                  {t("freelancerEarnings")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-income" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="flex items-center justify-between statistics_funfact">
              <div className="details">
                <div className="fz15">{t("totalSpent")}</div>
                <div className="title">
                  {isLoading ? <span className="text-muted fz20">...</span> : formatCurrency(totalSpent)}
                </div>
                <div className="text fz14">
                  {t("asClientPurchases")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-withdraw" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="flex items-center justify-between statistics_funfact">
              <div className="details">
                <div className="fz15">{t("pendingClearance")}</div>
                <div className="title">
                  {isLoading ? <span className="text-muted fz20">...</span> : formatCurrency(pendingAmount)}
                </div>
                <div className="text fz14">
                  {t("activeOrders")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-review" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="flex items-center justify-between statistics_funfact">
              <div className="details">
                <div className="fz15">{t("totalTransactions")}</div>
                <div className="title">
                  {isLoading ? <span className="text-muted fz20">...</span> : allOrders.length}
                </div>
                <div className="text fz14">
                  {t("allOrdersCombined")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-review-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-thm" role="status">
                    <span className="visually-hidden">{t("loading")}</span>
                  </div>
                  <p className="text mt-2 mb-0">{t("loadingStatements")}</p>
                </div>
              ) : allOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text mb-0">{t("noTransactions")}</p>
                </div>
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
                            <th scope="row">{formatDate(order.createdAt)}</th>
                            <td className="vam">{getTypeLabel(orderType)}</td>
                            <td className="vam">
                              <div className="fz14">{order.title}</div>
                              <div className="fz12 text">{order.orderNumber}</div>
                            </td>
                            <td className="vam">{formatCurrency(order.amount ?? 0)}</td>
                            <td className="vam">{formatCurrency(displayAmount)}</td>
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
        </>)}
      </div>
    </>
  );
}

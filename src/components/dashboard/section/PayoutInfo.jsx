"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import PaymentMethod from "./PaymentMethod";
import StripeConnectButton from "@/components/ui/StripeConnectButton";

export default function PayoutInfo() {
  const t = useTranslations("payouts");
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const userId = convexUser?._id;

  const freelancerOrders = useQuery(
    api.marketplace.orders.getByUser,
    userId ? { userId, role: "freelancer" } : "skip"
  );

  const isLoading = isAuthenticated && (convexUser === undefined || (userId && freelancerOrders === undefined));
  const notAuthenticated = isLoaded && !isAuthenticated;
  const noConvexProfile = isAuthenticated && convexUser === null;

  const completedOrders = (freelancerOrders || []).filter(
    (o) => o.status === "completed"
  );

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

  function getStatusClass(status) {
    switch (status) {
      case "completed":
        return "pending-style style1";
      case "in_progress":
      case "active":
        return "pending-style style2";
      case "pending":
        return "pending-style style3";
      default:
        return "pending-style";
    }
  }

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row align-items-center justify-content-between pb40">
          <div className="col-lg-6">
            <div className="dashboard_title_area">
              <h2>{t("title")}</h2>
              <p className="text">{t("pageDescription")}</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-lg-end">
              <Link
                href="/my-profile"
                className="ud-btn btn-thm default-box-shadow2"
              >
                {t("manageProfile")}
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>

        {notAuthenticated && (
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

        {noConvexProfile && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text text-center mb-0">
                {t("noProfileFound", { link: "" })}
                <Link href="/onboarding" className="text-thm">{t("onboarding")}</Link>
              </p>
            </div>
          </div></div>
        )}

        {!notAuthenticated && !noConvexProfile && (<>
        <div className="row mb30">
          <div className="col-sm-6 col-lg-4">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">{t("totalEarned")}</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    formatCurrency(totalEarnings)
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">{isLoading ? "..." : completedOrders.length}</span> {t("completedOrders")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-income" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">{t("pendingEarnings")}</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    formatCurrency(pendingEarnings)
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">{isLoading ? "..." : pendingOrders.length}</span> {t("ordersInProgress")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-review" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">{t("availableForWithdrawal")}</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    formatCurrency(totalEarnings)
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">Stripe</span> {t("stripeConnectRequired")}
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-dollar" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb60 overflow-hidden position-relative">
              <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                <h5 className="title">{t("earningsHistory")}</h5>
              </div>

              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-thm" role="status">
                    <span className="visually-hidden">{t("loading")}</span>
                  </div>
                  <p className="text mt-2 mb-0">{t("loadingEarnings")}</p>
                </div>
              ) : !freelancerOrders || freelancerOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text mb-0">{t("noOrdersYet")}</p>
                </div>
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
                          <th scope="row">{formatCurrency(order.freelancerEarnings ?? 0)}</th>
                          <td className="vam">
                            <div className="fz14">{order.title}</div>
                            <div className="fz12 text">{order.orderNumber}</div>
                          </td>
                          <td className="vam">{formatDate(order.createdAt)}</td>
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
            <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">{t("stripePayoutSetup")}</h5>
                <p className="text fz14 mb-0">
                  {t("stripePayoutDescription")}
                </p>
              </div>
              <StripeConnectButton />
            </div>
            <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
              <div className="row">
                <div className="col-lg-9">
                  <PaymentMethod />
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

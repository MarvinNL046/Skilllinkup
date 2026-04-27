"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useTranslations } from "next-intl";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";
import DashboardTabs from "../element/DashboardTabs";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS = {
  pending: "pending-style",
  in_progress: "style1",
  delivered: "style2",
  completed: "style3",
  revision_requested: "pending-style",
  cancelled: "style4",
};

export default function OrdersInfo() {
  const t = useTranslations("orders");
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const [role, setRole] = useState("client");
  const [actionLoading, setActionLoading] = useState(null);
  const [revisionOrderId, setRevisionOrderId] = useState(null);
  const [revisionMessage, setRevisionMessage] = useState("");

  const orders = useQuery(
    api.marketplace.orders.getByUser,
    convexUser?._id ? { userId: convexUser._id, role } : "skip"
  );

  const deliverOrder = useMutation(api.marketplace.orders.deliver);
  const approveOrder = useMutation(api.marketplace.orders.approve);
  const requestRevision = useMutation(api.marketplace.orders.requestRevision);

  const STATUS_LABELS = {
    pending: t("statusPending"),
    in_progress: t("statusInProgress"),
    delivered: t("statusDelivered"),
    completed: t("statusCompleted"),
    revision_requested: t("statusRevisionRequested"),
    cancelled: t("statusCancelled"),
  };

  const handleAction = async (action, orderId, extra) => {
    setActionLoading(orderId);
    try {
      if (action === "deliver") {
        await deliverOrder({ orderId });
        toast.success(t("orderDelivered"));
      } else if (action === "approve") {
        await approveOrder({ orderId });
        toast.success(t("orderApproved"));
      } else if (action === "revision") {
        await requestRevision({ orderId, message: extra });
        toast.success(t("revisionRequested"));
        setRevisionOrderId(null);
        setRevisionMessage("");
      }
    } catch (err) {
      toast.error(err.message || t("somethingWentWrong"));
    }
    setActionLoading(null);
  };

  const handleRevision = (orderId) => {
    setRevisionOrderId(orderId);
    setRevisionMessage("");
  };

  const submitRevision = () => {
    if (revisionMessage.trim()) {
      handleAction("revision", revisionOrderId, revisionMessage.trim());
    }
  };

  const getCurrencySymbol = (currency) => {
    if (currency === "EUR") return "\u20AC";
    if (currency === "USD") return "$";
    if (currency === "GBP") return "\u00A3";
    return currency ?? "\u20AC";
  };

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
      <div className="row pb-10">
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

      <div style={{ marginBottom: "var(--space-5)" }}>
        <DashboardTabs
          value={role}
          onChange={setRole}
          ariaLabel="Order role"
          options={[
            { value: "client",     label: t("asBuyer") },
            { value: "freelancer", label: t("asSeller") },
          ]}
        />
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p-8 mb-8 overflow-hidden relative">
            {/* Revision message inline form */}
            {revisionOrderId && (
              <div className="bgc-thm4 bdrs4 p-5 mb-5">
                <p className="text-sm font-medium mb-2.5">{t("revisionPrompt")}</p>
                <textarea
                  className="form-control mb-2.5"
                  rows={3}
                  value={revisionMessage}
                  onChange={(e) => setRevisionMessage(e.target.value)}
                  placeholder={t("revisionPlaceholder")}
                />
                <div className="flex gap-2">
                  <button
                    className="ud-btn btn-thm btn-sm text-sm"
                    disabled={!revisionMessage.trim() || actionLoading === revisionOrderId}
                    onClick={submitRevision}
                  >
                    {actionLoading === revisionOrderId ? (
                      <span className="spinner-border spinner-border-sm" role="status" />
                    ) : t("submitRevision")}
                  </button>
                  <button
                    className="ud-btn btn-white btn-sm text-sm"
                    onClick={() => { setRevisionOrderId(null); setRevisionMessage(""); }}
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            )}

            {/* Not authenticated */}
            {isLoaded && !isAuthenticated && (
              <div className="text-center py-5">
                <p className="text mb-0">{t("signInPrompt")}</p>
              </div>
            )}

            {/* Loading Convex user or loading orders */}
            {isAuthenticated && (convexUser === undefined || (convexUser?._id && orders === undefined)) && (
              <div className="text-center py-5">
                <div className="spinner-border text-thm" role="status" />
              </div>
            )}

            {/* Authenticated but no Convex profile found */}
            {isAuthenticated && convexUser === null && (
              <div className="text-center py-5">
                <p className="text mb-0">
                  {t.rich("noProfileFound", {
                    link: (chunks) => <Link href="/onboarding" className="text-thm">{chunks}</Link>,
                  }) ?? (
                    <>
                      {t("noProfileFound", { link: "" })}
                      <Link href="/onboarding" className="text-thm">{t("onboarding")}</Link>
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Empty state */}
            {orders !== undefined && orders.length === 0 && (
              <div className="text-center py-5">
                <i className="flaticon-receipt text-4xl text mb-5" />
                <p className="text mb-0">
                  {t("noOrdersYetRole", { role: role === "client" ? t("asBuyer").toLowerCase() : t("asSeller").toLowerCase() })}
                </p>
              </div>
            )}

            {/* Orders table */}
            {orders !== undefined && orders.length > 0 && (
              <div className="packages_table table-responsive">
                <table className="table-style2 table">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">{t("columnOrderNumber")}</th>
                      <th scope="col">{t("columnTitle")}</th>
                      <th scope="col">
                        {role === "client" ? t("columnFreelancer") : t("columnClient")}
                      </th>
                      <th scope="col">{t("columnAmount")}</th>
                      <th scope="col">{t("columnStatus")}</th>
                      <th scope="col">{t("columnActions")}</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td data-label={t("columnOrderNumber")}>
                          <span className="text-sm">{order.orderNumber}</span>
                        </td>
                        <td data-label={t("columnTitle")} className="vam">
                          <span className="text-base font-medium">{order.title}</span>
                        </td>
                        <td data-label={role === "client" ? t("columnFreelancer") : t("columnClient")}>
                          <span className="text-base">
                            {role === "client"
                              ? order.freelancerName ?? "\u2014"
                              : order.clientName ?? "\u2014"}
                          </span>
                        </td>
                        <td data-label={t("columnAmount")}>
                          <span className="text-base font-medium">
                            {getCurrencySymbol(order.currency)}
                            {role === "freelancer"
                              ? (order.freelancerEarnings ?? order.amount ?? 0).toFixed(2)
                              : (order.amount ?? 0).toFixed(2)}
                          </span>
                          {role === "freelancer" && order.freelancerEarnings !== null && order.freelancerEarnings !== undefined && (
                            <span className="text-xs text block">{t("afterFee")}</span>
                          )}
                        </td>
                        <td data-label={t("columnStatus")}>
                          <span
                            className={`pending-style ${STATUS_COLORS[order.status] ?? ""}`}
                          >
                            {STATUS_LABELS[order.status] ?? order.status.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td data-label={t("columnActions")}>
                          {role === "freelancer" && order.status === "in_progress" && (
                            <button
                              className="ud-btn btn-thm btn-sm text-sm"
                              disabled={actionLoading === order._id}
                              onClick={() => handleAction("deliver", order._id)}
                            >
                              {actionLoading === order._id ? (
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                />
                              ) : (
                                t("deliver")
                              )}
                            </button>
                          )}

                          {role === "client" && order.status === "delivered" && (
                            <div className="flex gap-2">
                              <button
                                className="ud-btn btn-thm btn-sm text-sm"
                                disabled={actionLoading === order._id}
                                onClick={() => handleAction("approve", order._id)}
                              >
                                {actionLoading === order._id ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                  />
                                ) : (
                                  t("approve")
                                )}
                              </button>
                              <button
                                className="ud-btn btn-white btn-sm text-sm"
                                disabled={actionLoading === order._id}
                                onClick={() => handleRevision(order._id)}
                              >
                                {t("revision")}
                              </button>
                            </div>
                          )}

                          {!(
                            (role === "freelancer" && order.status === "in_progress") ||
                            (role === "client" && order.status === "delivered")
                          ) && (
                            <span className="text-sm text">{"\u2014"}</span>
                          )}
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

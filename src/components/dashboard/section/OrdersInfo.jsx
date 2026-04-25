"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useTranslations } from "next-intl";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";
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

      {/* Role switcher — segmented control on surface-2 track */}
      <div style={{ marginBottom: "var(--space-5)" }}>
        <div
          role="tablist"
          aria-label="Order role"
          style={{
            display: "inline-flex",
            padding: 4,
            gap: 2,
            background: "var(--surface-2)",
            borderRadius: "var(--radius-md)",
          }}
        >
          {[
            { value: "client",     label: t("asBuyer") },
            { value: "freelancer", label: t("asSeller") },
          ].map((opt) => {
            const active = role === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setRole(opt.value)}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "inherit",
                  fontSize: "var(--text-body-sm)",
                  fontWeight: active ? 600 : 500,
                  cursor: active ? "default" : "pointer",
                  background: active ? "var(--bg-elevated)" : "transparent",
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  boxShadow: active ? "var(--shadow-1)" : "none",
                  transition: "all 140ms var(--ease-standard, ease-out)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
            {/* Revision message inline form */}
            {revisionOrderId && (
              <div className="bgc-thm4 bdrs4 p20 mb20">
                <p className="fz14 fw500 mb10">{t("revisionPrompt")}</p>
                <textarea
                  className="form-control mb10"
                  rows={3}
                  value={revisionMessage}
                  onChange={(e) => setRevisionMessage(e.target.value)}
                  placeholder={t("revisionPlaceholder")}
                />
                <div className="flex gap-2">
                  <button
                    className="ud-btn btn-thm btn-sm fz14"
                    disabled={!revisionMessage.trim() || actionLoading === revisionOrderId}
                    onClick={submitRevision}
                  >
                    {actionLoading === revisionOrderId ? (
                      <span className="spinner-border spinner-border-sm" role="status" />
                    ) : t("submitRevision")}
                  </button>
                  <button
                    className="ud-btn btn-white btn-sm fz14"
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
                <i className="flaticon-receipt fz40 text mb20" />
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
                        <td>
                          <span className="fz14">{order.orderNumber}</span>
                        </td>
                        <td className="vam">
                          <span className="fz15 fw500">{order.title}</span>
                        </td>
                        <td>
                          <span className="fz15">
                            {role === "client"
                              ? order.freelancerName ?? "\u2014"
                              : order.clientName ?? "\u2014"}
                          </span>
                        </td>
                        <td>
                          <span className="fz15 fw500">
                            {getCurrencySymbol(order.currency)}
                            {role === "freelancer"
                              ? (order.freelancerEarnings ?? order.amount ?? 0).toFixed(2)
                              : (order.amount ?? 0).toFixed(2)}
                          </span>
                          {role === "freelancer" && order.freelancerEarnings !== null && order.freelancerEarnings !== undefined && (
                            <span className="fz12 text block">{t("afterFee")}</span>
                          )}
                        </td>
                        <td>
                          <span
                            className={`pending-style ${STATUS_COLORS[order.status] ?? ""}`}
                          >
                            {STATUS_LABELS[order.status] ?? order.status.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td>
                          {role === "freelancer" && order.status === "in_progress" && (
                            <button
                              className="ud-btn btn-thm btn-sm fz14"
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
                                className="ud-btn btn-thm btn-sm fz14"
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
                                className="ud-btn btn-white btn-sm fz14"
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
                            <span className="fz14 text">{"\u2014"}</span>
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

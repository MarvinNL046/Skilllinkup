"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";
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

  const handleAction = async (action, orderId, extra) => {
    setActionLoading(orderId);
    setActionError(null);
    try {
      if (action === "deliver") {
        await deliverOrder({ orderId });
        toast.success("Order marked as delivered!");
      } else if (action === "approve") {
        await approveOrder({ orderId });
        toast.success("Order approved!");
      } else if (action === "revision") {
        await requestRevision({ orderId, message: extra });
        toast.success("Revision requested.");
        setRevisionOrderId(null);
        setRevisionMessage("");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
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
    if (currency === "EUR") return "€";
    if (currency === "USD") return "$";
    if (currency === "GBP") return "£";
    return currency ?? "€";
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
            <h2>My Orders</h2>
            <p className="text">Manage your orders as buyer or seller.</p>
          </div>
        </div>
      </div>

      {/* Role switcher */}
      <div className="row">
        <div className="col-12 mb20">
          <div className="d-flex gap-2">
            <button
              className={`ud-btn ${role === "client" ? "btn-thm" : "btn-white"}`}
              onClick={() => setRole("client")}
            >
              As Buyer
            </button>
            <button
              className={`ud-btn ${role === "freelancer" ? "btn-thm" : "btn-white"}`}
              onClick={() => setRole("freelancer")}
            >
              As Seller
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            {/* Revision message inline form */}
            {revisionOrderId && (
              <div className="bgc-thm4 bdrs4 p20 mb20">
                <p className="fz14 fw500 mb10">Describe what needs to be revised:</p>
                <textarea
                  className="form-control mb10"
                  rows={3}
                  value={revisionMessage}
                  onChange={(e) => setRevisionMessage(e.target.value)}
                  placeholder="e.g. Please adjust the logo colors..."
                />
                <div className="d-flex gap-2">
                  <button
                    className="ud-btn btn-thm btn-sm fz14"
                    disabled={!revisionMessage.trim() || actionLoading === revisionOrderId}
                    onClick={submitRevision}
                  >
                    {actionLoading === revisionOrderId ? (
                      <span className="spinner-border spinner-border-sm" role="status" />
                    ) : "Submit Revision"}
                  </button>
                  <button
                    className="ud-btn btn-white btn-sm fz14"
                    onClick={() => { setRevisionOrderId(null); setRevisionMessage(""); }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Not authenticated */}
            {isLoaded && !isAuthenticated && (
              <div className="text-center py-5">
                <p className="text mb-0">Please sign in to view your orders.</p>
              </div>
            )}

            {/* Loading state */}
            {isAuthenticated && orders === undefined && (
              <div className="text-center py-5">
                <div className="spinner-border text-thm" role="status" />
              </div>
            )}

            {/* Empty state */}
            {orders !== undefined && orders.length === 0 && (
              <div className="text-center py-5">
                <i className="flaticon-receipt fz40 text mb20" />
                <p className="text mb-0">No orders yet as {role === "client" ? "buyer" : "seller"}.</p>
              </div>
            )}

            {/* Orders table */}
            {orders !== undefined && orders.length > 0 && (
              <div className="packages_table table-responsive">
                <table className="table-style2 table">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Order #</th>
                      <th scope="col">Title</th>
                      <th scope="col">
                        {role === "client" ? "Freelancer" : "Client"}
                      </th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
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
                              ? order.freelancerName ?? "—"
                              : order.clientName ?? "—"}
                          </span>
                        </td>
                        <td>
                          <span className="fz15 fw500">
                            {getCurrencySymbol(order.currency)}
                            {role === "freelancer"
                              ? (order.freelancerEarnings ?? order.amount).toFixed(2)
                              : order.amount.toFixed(2)}
                          </span>
                          {role === "freelancer" && order.freelancerEarnings != null && (
                            <span className="fz12 text d-block">after fee</span>
                          )}
                        </td>
                        <td>
                          <span
                            className={`pending-style ${STATUS_COLORS[order.status] ?? ""}`}
                          >
                            {order.status.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td>
                          {/* Freelancer can deliver in_progress orders */}
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
                                "Deliver"
                              )}
                            </button>
                          )}

                          {/* Client can approve or request revision on delivered orders */}
                          {role === "client" && order.status === "delivered" && (
                            <div className="d-flex gap-2">
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
                                  "Approve"
                                )}
                              </button>
                              <button
                                className="ud-btn btn-white btn-sm fz14"
                                disabled={actionLoading === order._id}
                                onClick={() => handleRevision(order._id)}
                              >
                                Revision
                              </button>
                            </div>
                          )}

                          {/* Show dash for orders with no available action */}
                          {!(
                            (role === "freelancer" && order.status === "in_progress") ||
                            (role === "client" && order.status === "delivered")
                          ) && (
                            <span className="fz14 text">—</span>
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

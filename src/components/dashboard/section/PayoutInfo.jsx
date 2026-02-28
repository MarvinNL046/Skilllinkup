"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import PaymentMethod from "./PaymentMethod";
import StripeConnectButton from "@/components/ui/StripeConnectButton";

export default function PayoutInfo() {
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const userId = convexUser?._id;

  const freelancerOrders = useQuery(
    api.marketplace.orders.getByUser,
    userId ? { userId, role: "freelancer" } : "skip"
  );

  const isLoading = isAuthenticated && (convexUser === undefined || (userId && freelancerOrders === undefined));
  const notAuthenticated = isLoaded && !isAuthenticated;
  const noConvexProfile = isAuthenticated && convexUser === null;

  // Calculate total earnings from completed orders
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
    if (!amount && amount !== 0) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
              <h2>Payouts</h2>
              <p className="text">Manage your earnings and payout settings.</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-lg-end">
              <Link
                href="/my-profile"
                className="ud-btn btn-dark default-box-shadow2"
              >
                Manage Profile
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>

        {notAuthenticated && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text text-center mb-0">Please sign in to view your payouts.</p>
            </div>
          </div></div>
        )}

        {noConvexProfile && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text text-center mb-0">No account profile found. Please complete your <Link href="/onboarding" className="text-thm">onboarding</Link> first.</p>
            </div>
          </div></div>
        )}

        {!notAuthenticated && !noConvexProfile && (<>{/* Earnings summary cards */}
        <div className="row mb30">
          <div className="col-sm-6 col-lg-4">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Total Earned</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    formatCurrency(totalEarnings)
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">{isLoading ? "..." : completedOrders.length}</span> Completed orders
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
                <div className="fz15">Pending Earnings</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    formatCurrency(pendingEarnings)
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">{isLoading ? "..." : pendingOrders.length}</span> Orders in progress
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
                <div className="fz15">Available for Withdrawal</div>
                <div className="title">
                  {isLoading ? (
                    <span className="text-muted fz20">...</span>
                  ) : (
                    formatCurrency(totalEarnings)
                  )}
                </div>
                <div className="text fz14">
                  <span className="text-thm">Stripe</span> Connect required
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
                <h5 className="title">Order Earnings History</h5>
              </div>

              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-thm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text mt-2 mb-0">Loading earnings...</p>
                </div>
              ) : !freelancerOrders || freelancerOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text mb-0">No orders yet. Complete orders to see your earnings here.</p>
                </div>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Amount</th>
                        <th scope="col">Order</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment Status</th>
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
                <h5 className="list-title">Stripe Payout Setup</h5>
                <p className="text fz14 mb-0">
                  Connect your bank account via Stripe Express to receive automatic payouts
                  when orders are completed.
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

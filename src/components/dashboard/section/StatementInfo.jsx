"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";

export default function StatementInfo() {
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const userId = convexUser?._id;

  // Fetch orders as both client and freelancer
  const clientOrders = useQuery(
    api.marketplace.orders.getByUser,
    userId ? { userId, role: "client" } : "skip"
  );

  const freelancerOrders = useQuery(
    api.marketplace.orders.getByUser,
    userId ? { userId, role: "freelancer" } : "skip"
  );

  const isLoading = isAuthenticated && (clientOrders === undefined || freelancerOrders === undefined);

  // Merge orders, deduplicate by _id
  const allOrders = (() => {
    const seen = new Set();
    const merged = [...(clientOrders || []), ...(freelancerOrders || [])];
    return merged.filter((o) => {
      if (seen.has(o._id)) return false;
      seen.add(o._id);
      return true;
    }).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  })();

  // Calculate statement summary
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
    if (!amount && amount !== 0) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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

  // Determine if order is a sale (freelancer) or purchase (client)
  function getOrderType(order) {
    const isFreelancer = (freelancerOrders || []).some((o) => o._id === order._id);
    const isClient = (clientOrders || []).some((o) => o._id === order._id);
    if (isFreelancer && isClient) return "both";
    if (isFreelancer) return "sale";
    return "purchase";
  }

  function getTypeLabel(type) {
    if (type === "sale") return <span className="pending-style style4">Service Sale</span>;
    if (type === "purchase") return <span className="pending-style style5">Service Purchased</span>;
    return <span className="pending-style">Transaction</span>;
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
              <h2>Statements</h2>
              <p className="text">Your complete transaction history.</p>
            </div>
          </div>
        </div>
        {isLoaded && !isAuthenticated && (
          <div className="row"><div className="col-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text text-center mb-0">Please sign in to view your statements.</p>
            </div>
          </div></div>
        )}

        {(isAuthenticated || !isLoaded) && (<><div className="row">
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Net Income</div>
                <div className="title">
                  {isLoading ? <span className="text-muted fz20">...</span> : formatCurrency(netIncome)}
                </div>
                <div className="text fz14">
                  <span className="text-thm">Freelancer</span> earnings
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-income" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Total Spent</div>
                <div className="title">
                  {isLoading ? <span className="text-muted fz20">...</span> : formatCurrency(totalSpent)}
                </div>
                <div className="text fz14">
                  <span className="text-thm">As client</span> purchases
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-withdraw" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Pending Clearance</div>
                <div className="title">
                  {isLoading ? <span className="text-muted fz20">...</span> : formatCurrency(pendingAmount)}
                </div>
                <div className="text fz14">
                  <span className="text-thm">Active</span> orders
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-review" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Total Transactions</div>
                <div className="title">
                  {isLoading ? <span className="text-muted fz20">...</span> : allOrders.length}
                </div>
                <div className="text fz14">
                  <span className="text-thm">All</span> orders combined
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
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-thm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text mt-2 mb-0">Loading statements...</p>
                </div>
              ) : allOrders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text mb-0">No transactions yet. Your order history will appear here.</p>
                </div>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
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

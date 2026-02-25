"use client";

interface OrderItem {
  _id: string;
  orderNumber: string;
  title: string;
  amount: number;
  currency: string;
  status: string;
  orderType: string;
  createdAt: number;
  clientName: string | null;
  freelancerName: string | null;
}

interface RecentActivityProps {
  orders: OrderItem[];
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case "completed":
      return "bdrs4 px10 py5 fz12 fw500 bg-success text-white";
    case "in_progress":
    case "active":
      return "bdrs4 px10 py5 fz12 fw500 bg-primary text-white";
    case "pending":
      return "bdrs4 px10 py5 fz12 fw500 bg-warning text-dark";
    case "delivered":
      return "bdrs4 px10 py5 fz12 fw500 bg-info text-white";
    case "revision_requested":
      return "bdrs4 px10 py5 fz12 fw500 bg-warning text-dark";
    case "cancelled":
    case "disputed":
      return "bdrs4 px10 py5 fz12 fw500 bg-danger text-white";
    default:
      return "bdrs4 px10 py5 fz12 fw500 bg-secondary text-white";
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case "in_progress":
      return "In Progress";
    case "revision_requested":
      return "Revision";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}

function orderTypeIcon(type: string): string {
  return type === "project" ? "flaticon-folder" : "flaticon-briefcase";
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number, currency: string): string {
  const symbol = currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";
  return `${symbol}${amount.toFixed(2)}`;
}

export default function RecentActivity({ orders }: RecentActivityProps) {
  if (orders.length === 0) {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30">
        <h4 className="title fz17 mb20">Recent Activity</h4>
        <div className="text-center py-4">
          <i className="flaticon-briefcase fz40 text-light mb15" />
          <p className="fz15 text">No orders yet. Start by browsing gigs or posting a project.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
      <h4 className="title fz17 mb20">Recent Activity</h4>
      <div className="order_table table-responsive">
        <table className="table">
          <thead className="t-head">
            <tr>
              <th scope="col" className="fz14 fw500">Order</th>
              <th scope="col" className="fz14 fw500">Type</th>
              <th scope="col" className="fz14 fw500">Amount</th>
              <th scope="col" className="fz14 fw500">Date</th>
              <th scope="col" className="fz14 fw500">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="icon mr15 flex-shrink-0">
                      <i className={`${orderTypeIcon(order.orderType)} fz18`} />
                    </div>
                    <div>
                      <div className="fz14 fw500 dark-color mb-0 lh-1">
                        {order.title}
                      </div>
                      <div className="fz12 text mt-1">
                        #{order.orderNumber}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="fz14 text">
                    {order.orderType === "project" ? "Project" : "Gig"}
                  </span>
                </td>
                <td>
                  <span className="fz14 fw500 dark-color">
                    {formatCurrency(order.amount, order.currency)}
                  </span>
                </td>
                <td>
                  <span className="fz14 text">{formatDate(order.createdAt)}</span>
                </td>
                <td>
                  <span className={statusBadgeClass(order.status)}>
                    {statusLabel(order.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

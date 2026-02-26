"use client";
import { useState } from "react";
import useConvexOrders from "@/hook/useConvexOrders";
import OrderCard from "@/components/card/OrderCard";

const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "delivered", label: "Delivered" },
  { key: "completed", label: "Completed" },
];

const ACTIVE_STATUSES = ["pending", "in_progress", "revision_requested"];

function filterOrders(orders, tab) {
  if (!orders) return [];
  if (tab === "all") return orders;
  if (tab === "active") return orders.filter((o) => ACTIVE_STATUSES.includes(o.status));
  if (tab === "delivered") return orders.filter((o) => o.status === "delivered");
  if (tab === "completed") return orders.filter((o) => o.status === "completed");
  return orders;
}

export default function OrderList() {
  const [roleView, setRoleView] = useState("client");
  const [activeTab, setActiveTab] = useState("all");

  const { orders, isLoading, user } = useConvexOrders(roleView);

  // Auto-switch role based on user type (but allow manual override via buttons)
  const filteredOrders = filterOrders(orders, activeTab);

  return (
    <>
      {/* Role switcher */}
      <div className="row">
        <div className="col-12 mb20">
          <div className="d-flex gap-2">
            <button
              className={`ud-btn ${roleView === "client" ? "btn-thm" : "btn-white"}`}
              onClick={() => setRoleView("client")}
            >
              As Buyer
            </button>
            <button
              className={`ud-btn ${roleView === "freelancer" ? "btn-thm" : "btn-white"}`}
              onClick={() => setRoleView("freelancer")}
            >
              As Seller
            </button>
          </div>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="row">
        <div className="col-12 mb20">
          <div className="navtab-style1">
            <nav>
              <div className="nav nav-tabs mb30" role="tablist">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                    {orders && tab.key !== "all" && (
                      <span className="ms-1 fz12 text">
                        ({filterOrders(orders, tab.key).length})
                      </span>
                    )}
                    {orders && tab.key === "all" && (
                      <span className="ms-1 fz12 text">({orders.length})</span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            {/* Loading state */}
            {isLoading && (
              <div className="text-center py-5">
                <div className="spinner-border text-thm" role="status">
                  <span className="visually-hidden">Loading orders...</span>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && filteredOrders.length === 0 && (
              <div className="text-center py-5">
                <i className="flaticon-receipt fz40 text mb20 d-block" />
                <h5 className="mb10">No orders found</h5>
                <p className="text mb-0">
                  {activeTab === "all"
                    ? `You have no orders as ${roleView === "client" ? "buyer" : "seller"} yet.`
                    : `No ${activeTab} orders found.`}
                </p>
              </div>
            )}

            {/* Order cards */}
            {!isLoading && filteredOrders.length > 0 && (
              <div>
                {filteredOrders.map((order) => (
                  <OrderCard key={order._id} order={order} role={roleView} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

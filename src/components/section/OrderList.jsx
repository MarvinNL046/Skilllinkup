"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import useConvexOrders from "@/hook/useConvexOrders";
import OrderCard from "@/components/card/OrderCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const t = useTranslations("orders");
  const [roleView, setRoleView] = useState("client");
  const [activeTab, setActiveTab] = useState("all");

  const { orders, isLoading } = useConvexOrders(roleView);

  const tabs = [
    { key: "all", label: t("all") },
    { key: "active", label: t("active") },
    { key: "delivered", label: t("delivered") },
    { key: "completed", label: t("completed") },
  ];

  const filteredOrders = filterOrders(orders, activeTab);

  return (
    <>
      <div className="dashboard_title_area mb-6">
        <h2>{t("title")}</h2>
        <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
      </div>

      {/* Role switcher */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <Button
          variant={roleView === "client" ? "default" : "outline"}
          onClick={() => setRoleView("client")}
        >
          {t("asBuyer")}
        </Button>
        <Button
          variant={roleView === "freelancer" ? "default" : "outline"}
          onClick={() => setRoleView("freelancer")}
        >
          {t("asSeller")}
        </Button>
      </div>

      {/* Status filter tabs */}
      <div
        role="tablist"
        aria-label={t("title")}
        className="flex flex-wrap gap-1 mb-6 border-b border-[var(--border-subtle)] overflow-x-auto"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.key;
          const count =
            tab.key === "all"
              ? orders?.length
              : orders
              ? filterOrders(orders, tab.key).length
              : null;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors min-h-[44px]",
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-[var(--text-secondary)] hover:text-foreground"
              )}
            >
              {tab.label}
              {count != null && (
                <span className="ml-1 text-xs text-[var(--text-tertiary)]">
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          {isLoading && (
            <div className="flex justify-center py-12">
              <div
                role="status"
                aria-label={t("loadingOrders")}
                className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary"
              />
            </div>
          )}

          {!isLoading && filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="h-10 w-10 text-[var(--text-tertiary)] mx-auto mb-4" />
              <h5 className="text-lg font-semibold mb-2">{t("noOrdersFound")}</h5>
              <p className="text-[var(--text-secondary)] mb-0">
                {activeTab === "all"
                  ? t("noOrdersRole", {
                      role:
                        roleView === "client"
                          ? t("asBuyer").toLowerCase()
                          : t("asSeller").toLowerCase(),
                    })
                  : t("noOrdersStatus", { status: activeTab })}
              </p>
            </div>
          )}

          {!isLoading && filteredOrders.length > 0 && (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <OrderCard key={order._id} order={order} role={roleView} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

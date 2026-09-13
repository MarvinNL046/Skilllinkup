"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import useConvexOrders from "@/hook/useConvexOrders";
import OrderCard from "@/components/card/OrderCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useConvexUser from "@/hook/useConvexUser";
import { getActiveRole } from "@/lib/accountContext.mjs";

import { orderNeedsAction } from "@/lib/orderWorkspace.mjs";

const ACTIVE_STATUSES = [
  "pending",
  "active",
  "in_progress",
  "revision_requested",
];

function filterOrders(orders, tab, user) {
  if (!orders) return [];
  if (tab === "all") return orders;
  if (tab === "attention")
    return orders.filter((order) => orderNeedsAction(order, user));
  if (tab === "active")
    return orders.filter((o) => ACTIVE_STATUSES.includes(o.status));
  if (tab === "delivered")
    return orders.filter((o) => o.status === "delivered");
  if (tab === "completed")
    return orders.filter((o) => o.status === "completed");
  return orders;
}

export default function OrderList() {
  const t = useTranslations("orders");
  const { convexUser } = useConvexUser();
  const activeRole = getActiveRole(convexUser);
  const context = `${convexUser?._id}:${activeRole}:${convexUser?.preferredWorld}`;
  const [roleChoice, setRoleChoice] = useState(null);
  const defaultRole = ["freelancer", "local_professional"].includes(activeRole)
    ? "freelancer"
    : "client";
  const roleView =
    roleChoice?.context === context ? roleChoice.role : defaultRole;
  const setRoleView = (role) => setRoleChoice({ context, role });
  const [activeTab, setActiveTab] = useState("all");

  const {
    orders,
    isLoading,
    profiles,
    profileId,
    setProfileId,
    canLoadMore,
    loadingMore,
    loadMore,
  } = useConvexOrders(roleView);
  const [search, setSearch] = useState("");
  const term = search.trim().toLowerCase();
  const searchingHistory = Boolean(
    term && (isLoading || canLoadMore || loadingMore),
  );
  useEffect(() => {
    if (!term || isLoading || !canLoadMore || loadingMore) return;
    const timer = setTimeout(loadMore, 300);
    return () => clearTimeout(timer);
  }, [
    term,
    isLoading,
    canLoadMore,
    loadingMore,
    loadMore,
    profileId,
    roleView,
  ]);

  const tabs = [
    { key: "all", label: t("all") },
    { key: "attention", label: "Needs your action" },
    { key: "active", label: t("active") },
    { key: "delivered", label: t("delivered") },
    { key: "completed", label: t("completed") },
  ];

  const filteredOrders = filterOrders(orders, activeTab, convexUser).filter(
    (order) =>
      !term ||
      [
        order.title,
        order.orderNumber,
        order.clientName,
        order.freelancerName,
      ].some((value) => value?.toLowerCase().includes(term)),
  );

  return (
    <>
      <div className="dashboard_title_area mb-6">
        <h1>{t("title")}</h1>
        <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
      </div>

      {/* Role switcher */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <Button
          variant={roleView === "client" ? "default" : "outline"}
          aria-pressed={roleView === "client"}
          onClick={() => setRoleView("client")}
        >
          {t("asBuyer")}
        </Button>
        <Button
          variant={roleView === "freelancer" ? "default" : "outline"}
          aria-pressed={roleView === "freelancer"}
          onClick={() => setRoleView("freelancer")}
        >
          {t("asSeller")}
        </Button>
      </div>

      {roleView === "freelancer" && profiles.length > 1 && (
        <label className="block mb-4 text-sm">
          Professional profile
          <select
            className="block rounded-md border p-2 mt-1"
            value={profileId}
            onChange={(event) => setProfileId(event.target.value)}
          >
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.label}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="block mb-2 text-sm">
        Search order history
        <input
          type="search"
          className="block w-full rounded-md border p-3 mt-1"
          placeholder="Order number, title or person"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>
      <p role="status" className="text-sm text-[var(--text-secondary)] mb-4">
        {term
          ? searchingHistory
            ? `Searching older orders… ${orders.length} checked so far.`
            : `Search complete: ${filteredOrders.length} ${filteredOrders.length === 1 ? "match" : "matches"} in this role and profile, with the selected status filter.`
          : `${orders.length} orders loaded.`}{" "}
        Status counts apply to loaded orders.{" "}
        {roleView === "freelancer"
          ? "Choose a profile to search its history."
          : ""}
      </p>
      {term && (
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => setSearch("")}
        >
          {searchingHistory ? "Stop and clear search" : "Clear search"}
        </Button>
      )}
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
                ? filterOrders(orders, tab.key, convexUser).length
                : null;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onKeyDown={(event) => {
                const index = tabs.findIndex((item) => item.key === tab.key);
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? tabs.length - 1
                      : event.key === "ArrowRight"
                        ? (index + 1) % tabs.length
                        : event.key === "ArrowLeft"
                          ? (index - 1 + tabs.length) % tabs.length
                          : null;
                if (next === null) return;
                event.preventDefault();
                setActiveTab(tabs[next].key);
                event.currentTarget.parentElement
                  ?.querySelectorAll('[role="tab"]')
                  [next]?.focus();
              }}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors min-h-[44px]",
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-[var(--text-secondary)] hover:text-foreground",
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
        <CardContent className="p-3 sm:p-6">
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
              <h5 className="text-lg font-semibold mb-2">
                {term
                  ? searchingHistory
                    ? "Searching your order history…"
                    : "No matching orders"
                  : activeTab === "attention"
                    ? "Nothing needs your action here"
                    : t("noOrdersFound")}
              </h5>
              <p className="text-[var(--text-secondary)] mb-0">
                {term
                  ? searchingHistory
                    ? "Matches will appear as older orders are checked."
                    : "Try another order number, title or person, or change the status filter."
                  : activeTab === "attention"
                    ? "No deliveries or revision requests need your attention in the loaded orders for this account context."
                    : activeTab === "all"
                      ? t("noOrdersRole", {
                          role:
                            roleView === "client"
                              ? t("asBuyer").toLowerCase()
                              : t("asSeller").toLowerCase(),
                        })
                      : t("noOrdersStatus", { status: activeTab })}
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link
                  href={
                    roleView === "client"
                      ? convexUser?.preferredWorld === "local"
                        ? "/local/request-quote"
                        : "/online/freelancers"
                      : activeRole === "local_professional"
                        ? "/local/quote-requests"
                        : "/online/projects"
                  }
                >
                  {roleView === "client"
                    ? "Find a professional"
                    : "Find new work"}
                </Link>
              </Button>
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
      {!term && (canLoadMore || loadingMore) && (
        <div className="mt-5 flex justify-center">
          <Button variant="outline" disabled={loadingMore} onClick={loadMore}>
            {loadingMore ? "Loading more orders…" : "Load more orders"}
          </Button>
        </div>
      )}
    </>
  );
}

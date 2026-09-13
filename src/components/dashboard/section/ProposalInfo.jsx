"use client";
import { useState } from "react";
import { usePaginatedQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import ProposalCard1 from "../card/ProposalCard1";
import DashboardNavigation from "../header/DashboardNavigation";
import { Button } from "@/components/ui/button";
import useConvexProfile from "@/hook/useConvexProfile";
import useConvexUser from "@/hook/useConvexUser";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function ProposalInfo() {
  const t = useTranslations("proposals");
  const [filter, setFilter] = useState("all");
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const { profile } = useConvexProfile();

  const { results: bids, status, loadMore } = usePaginatedQuery(
    api.marketplace.projects.getMyBidsPage,
    isAuthenticated && profile?._id ? { freelancerId: profile._id } : "skip",
    { initialNumItems: 20 },
  );

  const isLoading =
    isAuthenticated &&
    (convexUser === undefined ||
      (convexUser?._id && profile === undefined) ||
      (profile?._id && status === "LoadingFirstPage"));
  const noProfile =
    isAuthenticated &&
    convexUser !== undefined &&
    convexUser !== null &&
    profile === null;
  const hasBids = bids && bids.length > 0;
  const filters = [
    ["all", "All"],
    ["pending", "Awaiting decision"],
    ["accepted", "Accepted"],
    ["rejected", "Not selected"],
    ["withdrawn", "Withdrawn"],
  ];
  const visibleBids = (bids || []).filter(
    (bid) => filter === "all" || bid.status === filter,
  );

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <DashboardNavigation />
        <div className="dashboard_title_area mb-6">
          <h1>{t("title")}</h1>
          <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            {hasBids && (
              <div className="mb-5">
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Filter proposals by status"
                >
                  {filters.map(([value, label]) => (
                    <Button
                      key={value}
                      size="sm"
                      variant={filter === value ? "default" : "outline"}
                      aria-pressed={filter === value}
                      onClick={() => setFilter(value)}
                    >
                      {label} (
                      {value === "all"
                        ? bids.length
                        : bids.filter((bid) => bid.status === value).length}
                      )
                    </Button>
                  ))}
                </div>
                <p
                  role="status"
                  className="mt-3 text-sm text-[var(--text-secondary)]"
                >
                  Showing {visibleBids.length} of {bids.length} loaded proposals.
                  {status !== "Exhausted" ? " Counts apply to loaded proposals. Load more to include older results." : " All proposals loaded."}
                </p>
              </div>
            )}
            <div className="packages_table table-responsive manage-projects-table">
              {!isLoaded || (isAuthenticated && convexUser === undefined) ? (
                <div className="flex justify-center py-8">
                  <div
                    role="status"
                    aria-label="Loading"
                    className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
                  />
                </div>
              ) : isAuthenticated && convexUser === null ? (
                <p className="text-center text-[var(--text-secondary)] py-8">
                  {t("settingUpAccount")}
                </p>
              ) : isLoaded && !isAuthenticated ? (
                <p className="text-center text-[var(--text-secondary)] py-12">
                  {t("signInPrompt")}
                </p>
              ) : noProfile ? (
                <p className="text-center text-[var(--text-secondary)] py-12">
                  {t("noProfile")}{" "}
                  <Link
                    href="/onboarding"
                    className="text-primary hover:underline"
                  >
                    {t("completeProfile")}
                  </Link>
                </p>
              ) : isLoading ? (
                <div className="text-center py-8">
                  <div
                    role="status"
                    aria-label={t("loading")}
                    className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary mx-auto"
                  />
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    {t("loadingProposals")}
                  </p>
                </div>
              ) : !hasBids ? (
                <div className="text-center py-8">
                  <p className="text-[var(--text-secondary)] mb-4">
                    {t("noProposalsYet")}
                  </p>
                  <Button asChild>
                    <Link href="/projects">Explore projects</Link>
                  </Button>
                </div>
              ) : !visibleBids.length ? (
                <div className="py-8 text-center">
                  <p className="mb-4">{status === "Exhausted" ? "No proposals with this status." : "No loaded proposals with this status. Older proposals may still match."}</p>
                  <Button variant="outline" onClick={() => setFilter("all")}>
                    Show all proposals
                  </Button>
                </div>
              ) : (
                <table className="table-style3 table at-savesearch proposal-table">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">{t("columnProject")}</th>
                      <th scope="col">{t("columnBidAmount")}</th>
                      <th scope="col">{t("columnAction")}</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {visibleBids.map((bid) => (
                      <ProposalCard1 key={bid._id} bid={bid} />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {isAuthenticated && profile?._id && (status === "CanLoadMore" || status === "LoadingMore") && (
              <div className="mt-6 flex justify-center">
                <Button variant="outline" disabled={status === "LoadingMore"} onClick={() => loadMore(20)}>
                  {status === "LoadingMore" ? "Loading more…" : "Load more proposals"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}


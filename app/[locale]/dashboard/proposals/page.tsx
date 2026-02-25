"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

// ---------------------------------------------------------------------------
// Status badge helper (Freeio classes)
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "pending-style style1",
    accepted: "pending-style style3",
    rejected: "pending-style style5",
    withdrawn: "pending-style style6",
  };

  const labels: Record<string, string> = {
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    withdrawn: "Withdrawn",
  };

  return (
    <div className={map[status] ?? "pending-style style1"}>
      {labels[status] ?? status}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Status tab keys
// ---------------------------------------------------------------------------

type TabStatus = "all" | "pending" | "accepted" | "rejected" | "withdrawn";

const TABS: { key: TabStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
  { key: "withdrawn", label: "Withdrawn" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(ts: number | null | undefined): string {
  if (!ts) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(ts));
}

function formatAmount(amount: number, currency: string | null | undefined): string {
  const sym = currency === "USD" ? "$" : currency === "GBP" ? "£" : "€";
  return `${sym}${amount.toLocaleString()}`;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ProposalsPage() {
  const locale = useLocale();
  const { user: clerkUser, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<TabStatus>("all");

  // Resolve Convex user from Clerk ID
  const convexUser = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
  );

  // Resolve freelancer profile
  const freelancerProfile = useQuery(
    api.marketplace.freelancers.getByUserId,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  // Fetch all bids for this freelancer
  const allBids = useQuery(
    api.marketplace.projects.getMyBids,
    freelancerProfile?._id ? { freelancerId: freelancerProfile._id } : "skip"
  );

  // Filter by active tab
  const filteredBids =
    allBids === undefined
      ? undefined
      : allBids.filter((b) => {
          if (activeTab === "all") return true;
          return b.status === activeTab;
        });

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------

  if (!isLoaded || convexUser === undefined) {
    return (
      <div className="dashboard__main pl0-md">
        <div className="dashboard_title_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dashbord_title_text text-center py-5">
                  <span className="flaticon-loading fz30 text-thm" />
                  <p className="body-color mt10">Loading proposals…</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // No freelancer profile
  // ---------------------------------------------------------------------------

  if (convexUser && freelancerProfile === null) {
    return (
      <div className="dashboard__main pl0-md">
        <div className="dashboard_title_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dashbord_title_text text-center py-5">
                  <span className="flaticon-warning fz30 text-thm" />
                  <h4 className="mt15">No freelancer profile found</h4>
                  <p className="body-color mt10 mb20">
                    You need a freelancer profile to submit proposals and track
                    bids.
                  </p>
                  <Link
                    href={`/${locale}/dashboard/my-profile`}
                    className="ud-btn btn-thm"
                  >
                    Set up your profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Loading bids
  // ---------------------------------------------------------------------------

  if (allBids === undefined) {
    return (
      <div className="dashboard__main pl0-md">
        <div className="dashboard_title_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dashbord_title_text text-center py-5">
                  <span className="flaticon-loading fz30 text-thm" />
                  <p className="body-color mt10">Loading proposals…</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="dashboard__main pl0-md">
      <div className="dashboard_title_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashbord_title_text d-sm-flex align-items-center justify-content-between">
                <div className="mb-3 mb-sm-0">
                  <h2 className="title">My Proposals</h2>
                  <p className="body-color mt5">
                    {allBids.length} proposal
                    {allBids.length !== 1 ? "s" : ""} submitted
                  </p>
                </div>
                <Link
                  href={`/${locale}/marketplace/projects`}
                  className="ud-btn btn-thm"
                >
                  <span className="flaticon-content mr10" />
                  Browse Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">

              {/* Status tabs */}
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb-4" role="tablist">
                    {TABS.map((tab) => {
                      const count =
                        tab.key === "all"
                          ? allBids.length
                          : allBids.filter((b) => b.status === tab.key).length;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          role="tab"
                          onClick={() => setActiveTab(tab.key)}
                          className={`nav-link fw500 ps-0 me-4${
                            activeTab === tab.key ? " active" : ""
                          }`}
                        >
                          {tab.label}
                          <span className="fz12 ms-1 body-color">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </nav>
              </div>

              {/* Empty state */}
              {filteredBids !== undefined && filteredBids.length === 0 && (
                <div className="text-center py-5">
                  <span className="flaticon-document fz50 text-thm2" />
                  <h4 className="mt20 mb10">No proposals found</h4>
                  <p className="body-color mb20">
                    {activeTab === "all"
                      ? "You haven't submitted any bids yet. Browse open projects to get started."
                      : `No ${activeTab} proposals.`}
                  </p>
                  {activeTab === "all" && (
                    <Link
                      href={`/${locale}/marketplace/projects`}
                      className="ud-btn btn-thm"
                    >
                      Browse Open Projects
                    </Link>
                  )}
                </div>
              )}

              {/* Proposals table */}
              {filteredBids !== undefined && filteredBids.length > 0 && (
                <div className="packages_table table-style3">
                  <div className="table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Project</th>
                          <th scope="col">Your Bid</th>
                          <th scope="col">Delivery</th>
                          <th scope="col">Project Status</th>
                          <th scope="col">Proposal Status</th>
                          <th scope="col">Submitted</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {filteredBids.map((bid) => (
                          <tr key={bid._id}>
                            <td>
                              <div className="listing-style1 d-flex align-items-center">
                                <div className="list-content">
                                  <h6 className="list-title fz14 mb-0">
                                    {bid.projectSlug ? (
                                      <Link
                                        href={`/${locale}/marketplace/projects/${bid.projectSlug}`}
                                        className="dark-color"
                                      >
                                        {bid.projectTitle}
                                      </Link>
                                    ) : (
                                      <span className="dark-color">
                                        {bid.projectTitle}
                                      </span>
                                    )}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="fz14 fw500 dark-color">
                                {formatAmount(bid.amount, bid.projectCurrency ?? bid.currency)}
                              </span>
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {bid.deliveryDays}{" "}
                                {bid.deliveryDays === 1 ? "day" : "days"}
                              </span>
                            </td>
                            <td>
                              <span className="fz13 body-color text-capitalize">
                                {bid.projectStatus?.replace("_", " ") ?? "—"}
                              </span>
                            </td>
                            <td>
                              <StatusBadge status={bid.status} />
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {formatDate(bid.createdAt)}
                              </span>
                            </td>
                            <td>
                              {bid.projectSlug && (
                                <Link
                                  href={`/${locale}/marketplace/projects/${bid.projectSlug}`}
                                  className="ud-btn btn-light-thm2 bdrs4 px-3 py-1 fz12 fw500"
                                  title="View project"
                                >
                                  <span className="flaticon-eye me-1" />
                                  View
                                </Link>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

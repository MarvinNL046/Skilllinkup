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
    open: "pending-style style4",
    in_progress: "pending-style style1",
    completed: "pending-style style3",
    cancelled: "pending-style style5",
    closed: "pending-style style5",
  };

  const labels: Record<string, string> = {
    open: "Open",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
    closed: "Closed",
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

type TabStatus = "all" | "open" | "in_progress" | "completed" | "cancelled";

const TABS: { key: TabStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatBudget(
  min: number | null | undefined,
  max: number | null | undefined,
  currency: string | null | undefined
): string {
  const sym = currency === "USD" ? "$" : currency === "GBP" ? "£" : "€";
  if (min && max) return `${sym}${min} – ${sym}${max}`;
  if (min) return `From ${sym}${min}`;
  if (max) return `Up to ${sym}${max}`;
  return "—";
}

function formatDate(ts: number | null | undefined): string {
  if (!ts) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(ts));
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ManageProjectsPage() {
  const locale = useLocale();
  const { user: clerkUser, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<TabStatus>("all");

  // Resolve Convex user from Clerk ID
  const convexUser = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
  );

  // Fetch all client projects
  const allProjects = useQuery(
    api.marketplace.projects.getByClient,
    convexUser?._id ? { clientId: convexUser._id } : "skip"
  );

  // Filter by active tab
  const filteredProjects =
    allProjects === undefined
      ? undefined
      : allProjects.filter((p) => {
          if (activeTab === "all") return true;
          return p.status === activeTab;
        });

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------

  if (!isLoaded || allProjects === undefined) {
    return (
      <div className="dashboard__main pl0-md">
        <div className="dashboard_title_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dashbord_title_text text-center py-5">
                  <span className="flaticon-loading fz30 text-thm" />
                  <p className="body-color mt10">Loading projects…</p>
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
                  <h2 className="title">Manage Projects</h2>
                  <p className="body-color mt5">
                    {allProjects.length} total project
                    {allProjects.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <Link
                  href={`/${locale}/dashboard/create-projects`}
                  className="ud-btn btn-thm"
                >
                  <span className="flaticon-content mr10" />
                  Post New Project
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
                          ? allProjects.length
                          : allProjects.filter((p) => p.status === tab.key).length;
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
              {filteredProjects !== undefined && filteredProjects.length === 0 && (
                <div className="text-center py-5">
                  <span className="flaticon-content fz50 text-thm2" />
                  <h4 className="mt20 mb10">No projects found</h4>
                  <p className="body-color mb20">
                    {activeTab === "all"
                      ? "You haven't posted any projects yet."
                      : `No ${activeTab.replace("_", " ")} projects.`}
                  </p>
                  {activeTab === "all" && (
                    <Link
                      href={`/${locale}/dashboard/create-projects`}
                      className="ud-btn btn-thm"
                    >
                      Post your first project
                    </Link>
                  )}
                </div>
              )}

              {/* Projects table */}
              {filteredProjects !== undefined && filteredProjects.length > 0 && (
                <div className="packages_table table-style3">
                  <div className="table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Category</th>
                          <th scope="col">Budget</th>
                          <th scope="col">Bids</th>
                          <th scope="col">Deadline</th>
                          <th scope="col">Posted</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {filteredProjects.map((project) => (
                          <tr key={project._id}>
                            <td>
                              <div className="listing-style1 d-flex align-items-center">
                                <div className="list-content">
                                  <h6 className="list-title fz14 mb-0">
                                    <Link
                                      href={`/${locale}/marketplace/projects/${project.slug}`}
                                      className="dark-color"
                                    >
                                      {project.title}
                                    </Link>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {project.categoryName ?? "Uncategorized"}
                              </span>
                            </td>
                            <td>
                              <span className="fz14 fw500 dark-color">
                                {formatBudget(
                                  project.budgetMin,
                                  project.budgetMax,
                                  project.currency
                                )}
                              </span>
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {project.bidCount ?? 0}
                              </span>
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {formatDate(project.deadline)}
                              </span>
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {formatDate(project.createdAt)}
                              </span>
                            </td>
                            <td>
                              <StatusBadge status={project.status} />
                            </td>
                            <td>
                              <div className="d-flex gap-2 align-items-center">
                                <Link
                                  href={`/${locale}/marketplace/projects/${project.slug}`}
                                  className="ud-btn btn-light-thm2 bdrs4 px-3 py-1 fz12 fw500"
                                  title="View project"
                                >
                                  <span className="flaticon-eye me-1" />
                                  View
                                </Link>
                                <Link
                                  href={`/${locale}/marketplace/projects/${project.slug}`}
                                  className="ud-btn btn-light-thm2 bdrs4 px-3 py-1 fz12 fw500"
                                  title="View bids"
                                >
                                  <span className="flaticon-user me-1" />
                                  Bids
                                </Link>
                              </div>
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

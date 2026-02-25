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
    closed: "pending-style style5",
    filled: "pending-style style3",
  };

  const labels: Record<string, string> = {
    open: "Open",
    closed: "Closed",
    filled: "Filled",
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

type TabStatus = "all" | "open" | "closed" | "filled";

const TABS: { key: TabStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "closed", label: "Closed" },
  { key: "filled", label: "Filled" },
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

function formatSalary(
  min: number | null | undefined,
  max: number | null | undefined,
  currency: string | null | undefined
): string {
  const sym = currency === "USD" ? "$" : currency === "GBP" ? "£" : "€";
  if (min && max) return `${sym}${min} – ${sym}${max}/mo`;
  if (min) return `From ${sym}${min}/mo`;
  if (max) return `Up to ${sym}${max}/mo`;
  return "—";
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ManageJobsPage() {
  const locale = useLocale();
  const { user: clerkUser, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<TabStatus>("all");

  // Resolve Convex user from Clerk ID
  const convexUser = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
  );

  // Fetch all client jobs
  const allJobs = useQuery(
    api.marketplace.jobs.getByClient,
    convexUser?._id ? { clientId: convexUser._id } : "skip"
  );

  // Filter by active tab
  const filteredJobs =
    allJobs === undefined
      ? undefined
      : allJobs.filter((j) => {
          if (activeTab === "all") return true;
          return j.status === activeTab;
        });

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------

  if (!isLoaded || allJobs === undefined) {
    return (
      <div className="dashboard__main pl0-md">
        <div className="dashboard_title_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dashbord_title_text text-center py-5">
                  <span className="flaticon-loading fz30 text-thm" />
                  <p className="body-color mt10">Loading jobs…</p>
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
                  <h2 className="title">Manage Jobs</h2>
                  <p className="body-color mt5">
                    {allJobs.length} total job listing
                    {allJobs.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <Link
                  href={`/${locale}/jobs`}
                  className="ud-btn btn-thm"
                >
                  <span className="flaticon-briefcase mr10" />
                  Browse Jobs
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
                          ? allJobs.length
                          : allJobs.filter((j) => j.status === tab.key).length;
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
              {filteredJobs !== undefined && filteredJobs.length === 0 && (
                <div className="text-center py-5">
                  <span className="flaticon-briefcase fz50 text-thm2" />
                  <h4 className="mt20 mb10">No job listings found</h4>
                  <p className="body-color mb20">
                    {activeTab === "all"
                      ? "You haven't posted any job listings yet."
                      : `No ${activeTab} job listings.`}
                  </p>
                </div>
              )}

              {/* Jobs table */}
              {filteredJobs !== undefined && filteredJobs.length > 0 && (
                <div className="packages_table table-style3">
                  <div className="table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Job Title</th>
                          <th scope="col">Company</th>
                          <th scope="col">Category</th>
                          <th scope="col">Salary</th>
                          <th scope="col">Type</th>
                          <th scope="col">Applications</th>
                          <th scope="col">Posted</th>
                          <th scope="col">Expires</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {filteredJobs.map((job) => (
                          <tr key={job._id}>
                            <td>
                              <div className="listing-style1 d-flex align-items-center">
                                <div className="list-content">
                                  <h6 className="list-title fz14 mb-0">
                                    <Link
                                      href={`/${locale}/jobs/${job.slug}`}
                                      className="dark-color"
                                    >
                                      {job.title}
                                    </Link>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {job.company ?? "—"}
                              </span>
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {job.categoryName ?? "Uncategorized"}
                              </span>
                            </td>
                            <td>
                              <span className="fz14 fw500 dark-color">
                                {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                              </span>
                            </td>
                            <td>
                              <span className="fz13 body-color text-capitalize">
                                {job.jobType?.replace("_", " ") ?? "—"}
                                {job.workType ? ` · ${job.workType}` : ""}
                              </span>
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {job.applicationCount ?? 0}
                              </span>
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {formatDate(job.createdAt)}
                              </span>
                            </td>
                            <td>
                              <span className="fz14 body-color">
                                {formatDate(job.expiresAt)}
                              </span>
                            </td>
                            <td>
                              <StatusBadge status={job.status} />
                            </td>
                            <td>
                              <div className="d-flex gap-2 align-items-center">
                                <Link
                                  href={`/${locale}/jobs/${job.slug}`}
                                  className="ud-btn btn-light-thm2 bdrs4 px-3 py-1 fz12 fw500"
                                  title="View job"
                                >
                                  <span className="flaticon-eye me-1" />
                                  View
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

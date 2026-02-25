"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

// ---------------------------------------------------------------------------
// Status badge helper (Freeio classes)
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "pending-style style4",
    pending: "pending-style style1",
    paused: "pending-style style6",
    draft: "pending-style style6",
    rejected: "pending-style style5",
    deleted: "pending-style style5",
  };

  const labels: Record<string, string> = {
    active: "Active",
    pending: "Pending",
    paused: "Paused",
    draft: "Draft",
    rejected: "Rejected",
    deleted: "Deleted",
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

type TabStatus = "all" | "active" | "pending" | "paused" | "rejected";

const TABS: { key: TabStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending" },
  { key: "paused", label: "Paused" },
  { key: "rejected", label: "Rejected" },
];

// ---------------------------------------------------------------------------
// Main component — uses useUser from Clerk to resolve Convex user + profile
// ---------------------------------------------------------------------------

export default function ManageServicesPage() {
  const locale = useLocale();
  const { user: clerkUser, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<TabStatus>("all");
  const [deletingId, setDeletingId] = useState<Id<"gigs"> | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<Id<"gigs"> | null>(null);

  const removeMutation = useMutation(api.marketplace.gigs.remove);

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

  // Fetch ALL gigs for this freelancer (all statuses)
  const allGigs = useQuery(
    api.marketplace.gigs.getAllByFreelancer,
    freelancerProfile?._id
      ? { freelancerId: freelancerProfile._id }
      : "skip"
  );

  // ---------------------------------------------------------------------------
  // Filter gigs by active tab
  // ---------------------------------------------------------------------------

  const filteredGigs =
    allGigs === undefined
      ? undefined
      : allGigs.filter((g) => {
          if (activeTab === "all") return g.status !== "deleted";
          return g.status === activeTab;
        });

  // ---------------------------------------------------------------------------
  // Delete handler
  // ---------------------------------------------------------------------------

  async function handleDelete(gigId: Id<"gigs">) {
    setDeletingId(gigId);
    try {
      await removeMutation({ gigId });
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------

  if (!isLoaded || allGigs === undefined) {
    return (
      <div className="dashboard__main pl0-md">
        <div className="dashboard_title_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dashbord_title_text text-center py-5">
                  <span className="flaticon-loading fz30 text-thm" />
                  <p className="body-color mt10">Loading services…</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Not a freelancer
  // ---------------------------------------------------------------------------

  if (convexUser && !freelancerProfile) {
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
                    You need a freelancer profile to manage services.
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
                  <h2 className="title">Manage Services</h2>
                  <p className="body-color mt5">
                    {allGigs?.filter((g) => g.status !== "deleted").length ?? 0} total service(s)
                  </p>
                </div>
                <Link
                  href={`/${locale}/dashboard/add-services`}
                  className="ud-btn btn-thm"
                >
                  <span className="flaticon-document mr10" />
                  Add New Service
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
                          ? allGigs?.filter((g) => g.status !== "deleted").length ?? 0
                          : allGigs?.filter((g) => g.status === tab.key).length ?? 0;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          role="tab"
                          onClick={() => setActiveTab(tab.key)}
                          className={`nav-link fw500 ps-0 me-4${activeTab === tab.key ? " active" : ""}`}
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
              {filteredGigs !== undefined && filteredGigs.length === 0 && (
                <div className="text-center py-5">
                  <span className="flaticon-presentation fz50 text-thm2" />
                  <h4 className="mt20 mb10">No services found</h4>
                  <p className="body-color mb20">
                    {activeTab === "all"
                      ? "You haven't created any services yet."
                      : `No ${activeTab} services.`}
                  </p>
                  {activeTab === "all" && (
                    <Link
                      href={`/${locale}/dashboard/add-services`}
                      className="ud-btn btn-thm"
                    >
                      Create your first service
                    </Link>
                  )}
                </div>
              )}

              {/* Services table */}
              {filteredGigs !== undefined && filteredGigs.length > 0 && (
                <div className="packages_table table-style3">
                  <div className="table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th className="col-sm-2">Service</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {filteredGigs.map((gig) => {
                          const imageUrl =
                            gig.firstImage?.imageUrl ?? "/images/resource/service-placeholder.jpg";
                          const categoryName =
                            (gig.category as { name?: string } | null)?.name ?? "Uncategorized";

                          return (
                            <tr key={gig._id}>
                              {/* Thumbnail + title */}
                              <td>
                                <div className="listing-style1 d-flex align-items-center gap-3 list-style-none">
                                  <div
                                    className="list-thumb bdrs4 overflow-hidden flex-shrink-0"
                                    style={{ width: 72, height: 52 }}
                                  >
                                    <Image
                                      src={imageUrl}
                                      alt={gig.title}
                                      width={72}
                                      height={52}
                                      className="w-100 h-100 object-fit-cover"
                                    />
                                  </div>
                                  <div className="list-content flex-1">
                                    <h6 className="list-title fz14 mb-0">
                                      <Link
                                        href={`/${locale}/services/${gig.slug}`}
                                        className="dark-color"
                                      >
                                        {gig.title}
                                      </Link>
                                    </h6>
                                  </div>
                                </div>
                              </td>

                              {/* Category */}
                              <td>
                                <span className="fz14 body-color">{categoryName}</span>
                              </td>

                              {/* Price */}
                              <td>
                                {gig.minPrice != null ? (
                                  <span className="fz15 fw500 dark-color">
                                    €{Number(gig.minPrice).toFixed(0)}
                                  </span>
                                ) : (
                                  <span className="fz14 body-color">—</span>
                                )}
                              </td>

                              {/* Status */}
                              <td>
                                <StatusBadge status={gig.status} />
                              </td>

                              {/* Actions */}
                              <td>
                                <div className="d-flex gap-2 align-items-center">
                                  <Link
                                    href={`/${locale}/dashboard/add-services?edit=${gig.slug}`}
                                    className="ud-btn btn-light-thm2 bdrs4 px-3 py-1 fz12 fw500"
                                    title="Edit service"
                                  >
                                    <span className="flaticon-pencil me-1" />
                                    Edit
                                  </Link>
                                  <Link
                                    href={`/${locale}/services/${gig.slug}`}
                                    className="ud-btn btn-light-thm2 bdrs4 px-3 py-1 fz12 fw500"
                                    title="Preview service"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="flaticon-eye me-1" />
                                    View
                                  </Link>
                                  {confirmDeleteId === gig._id ? (
                                    <div className="d-flex gap-1 align-items-center">
                                      <button
                                        type="button"
                                        className="ud-btn btn-thm2 bdrs4 px-3 py-1 fz12 fw500"
                                        disabled={deletingId === gig._id}
                                        onClick={() => handleDelete(gig._id)}
                                      >
                                        {deletingId === gig._id ? "Removing…" : "Confirm"}
                                      </button>
                                      <button
                                        type="button"
                                        className="ud-btn btn-light-thm bdrs4 px-3 py-1 fz12 fw500"
                                        onClick={() => setConfirmDeleteId(null)}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      className="ud-btn btn-light-thm2 bdrs4 px-3 py-1 fz12 fw500"
                                      title="Remove service"
                                      onClick={() => setConfirmDeleteId(gig._id)}
                                    >
                                      <span className="flaticon-delete me-1" />
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
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

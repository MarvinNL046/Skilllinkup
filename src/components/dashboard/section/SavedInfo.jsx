"use client";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import Image from "next/image";
import Link from "next/link";

const TABS = ["Services", "Projects", "Jobs"];
const TAB_TYPES = ["gig", "project", "job"];

export default function SavedInfo() {
  const [getCurrentTab, setCurrentTab] = useState(0);
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();

  const savedItems = useQuery(
    api.marketplace.savedItems.list,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const removeItem = useMutation(api.marketplace.savedItems.remove);
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (itemId) => {
    if (!convexUser?._id) return;
    setRemovingId(itemId);
    try {
      await removeItem({ userId: convexUser._id, itemId: String(itemId) });
    } catch (err) {
      console.error("Failed to remove saved item:", err);
    } finally {
      setRemovingId(null);
    }
  };

  // Filter items by current tab type
  const currentType = TAB_TYPES[getCurrentTab];
  const currentItems =
    savedItems && Array.isArray(savedItems)
      ? savedItems.filter((item) => item.itemType === currentType)
      : [];

  // Count per tab
  const countByType = (type) =>
    savedItems && Array.isArray(savedItems)
      ? savedItems.filter((item) => item.itemType === type).length
      : 0;

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Saved</h2>
              <p className="text">Your saved gigs, projects, and jobs.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {TABS.map((item, i) => (
                      <button
                        onClick={() => setCurrentTab(i)}
                        key={i}
                        className={`nav-link fw500 ps-0 ${
                          getCurrentTab === i ? "active" : ""
                        }`}
                      >
                        {item}
                        {savedItems !== undefined && countByType(TAB_TYPES[i]) > 0 && (
                          <span className="ms-1 fz12 text">
                            ({countByType(TAB_TYPES[i])})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Not authenticated */}
                {isLoaded && !isAuthenticated && (
                  <div className="text-center py-5">
                    <p className="text mb-0">Please sign in to view your saved items.</p>
                  </div>
                )}

                {/* Loading state */}
                {isAuthenticated && savedItems === undefined && (
                  <div className="text-center py-5">
                    <div className="spinner-border text-thm" role="status" />
                  </div>
                )}

                {/* Empty state */}
                {savedItems !== undefined && currentItems.length === 0 && (
                  <div className="text-center py-5">
                    <i className="flaticon-like fz40 text mb20" />
                    <p className="text mb-0">
                      No saved {TABS[getCurrentTab].toLowerCase()} yet.
                    </p>
                  </div>
                )}

                {/* Saved items grid */}
                {currentItems.length > 0 && (
                  <div className="row">
                    {currentItems.map((item) => (
                      <div key={item._id} className="col-sm-6 col-xl-4 mb20">
                        <div className="listing-style1 bdrs4 bdr1 overflow-hidden">
                          {/* Item image */}
                          {item.itemImage && (
                            <div
                              className="list-thumb"
                              style={{ position: "relative", height: "180px" }}
                            >
                              <Image
                                fill
                                src={item.itemImage}
                                alt={item.itemTitle ?? "Saved item"}
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          )}

                          <div className="list-content p20">
                            {/* Item type badge */}
                            <span className="list-meta fz12 fw400 ff-heading mb10 d-block">
                              <span className="tag-list bdrs4 bgc-thm4 text-thm px10 py5">
                                {item.itemType}
                              </span>
                            </span>

                            {/* Item title */}
                            <h6 className="list-title mb10">
                              {item.itemUrl ? (
                                <Link href={item.itemUrl} className="text-dark">
                                  {item.itemTitle ?? "Untitled"}
                                </Link>
                              ) : (
                                item.itemTitle ?? "Untitled"
                              )}
                            </h6>

                            {/* Actions */}
                            <div className="d-flex align-items-center justify-content-between mt15">
                              {item.itemUrl && (
                                <Link
                                  href={item.itemUrl}
                                  className="ud-btn btn-thm-border bdrs4 fz14"
                                >
                                  View
                                </Link>
                              )}
                              <button
                                className="ud-btn btn-white bdrs4 fz14 ms-auto"
                                onClick={() => handleRemove(item.itemId)}
                                disabled={removingId === item.itemId}
                              >
                                {removingId === item.itemId ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                  />
                                ) : (
                                  <>
                                    <i className="far fa-heart me-1" />
                                    Remove
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

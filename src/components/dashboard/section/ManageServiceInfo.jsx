"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ManageServiceCard1 from "../card/ManageServiceCard1";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import useConvexMyGigs from "@/hook/useConvexMyGigs";

const tab = [
  "Active Services",
  "Pending Services",
  "Ongoing Services",
  "Completed Services",
  "Canceled Services",
];

const STATUS_MAP = {
  0: "active",
  1: "pending",
  2: "ongoing",
  3: "completed",
  4: "cancelled",
};

function mapGigToCard(gig) {
  return {
    _id: gig._id,
    id: gig._id,
    img: gig.firstImage?.url || "/images/listings/g-1.jpg",
    title: gig.title || "Untitled Service",
    category: gig.category?.name || "Uncategorized",
    cost: gig.minPrice || 0,
    status: gig.status,
    list: [],
  };
}

function GigTable({ gigs, removeGig }) {
  if (gigs.length === 0) {
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
        <p className="fw500 dark-color mb-1">No services here yet</p>
        <p className="text fz14 mb20">
          Create a gig for each skill — one for web development, one for marketing, etc.
        </p>
        <Link href="/add-services" className="ud-btn btn-thm bdrs8">
          Create your first gig <i className="fal fa-arrow-right-long" />
        </Link>
      </div>
    );
  }

  return (
    <div className="packages_table table-responsive">
      <table className="table-style3 table at-savesearch">
        <thead className="t-head">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Type/Cost</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="t-body">
          {gigs.map((item, i) => (
            <ManageServiceCard1 key={item._id || i} data={item} removeGig={removeGig} />
          ))}
        </tbody>
      </table>
      <div className="mt20 mb10">
        <Link
          href="/add-services"
          className="d-flex align-items-center gap-2 fz14 fw500"
          style={{ color: "#ef2b70", textDecoration: "none" }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
          Add another gig in a different category
        </Link>
      </div>
      <div className="mt20">
        <Pagination1 />
      </div>
    </div>
  );
}

export default function ManageServiceInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { gigs, removeGig } = useConvexMyGigs();

  const currentStatus = STATUS_MAP[selectedTab];
  const filteredGigs = Array.isArray(gigs)
    ? gigs.filter((g) => g.status === currentStatus).map(mapGigToCard)
    : [];

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Manage Services</h2>
              <p className="text">
                Offer services in multiple categories — create a separate gig for each skill.
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href="/add-services"
                className="ud-btn btn-thm default-box-shadow2"
              >
                + New Gig
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {tab.map((item, i) => (
                      <button
                        key={i}
                        className={`nav-link fw500 ps-0 ${
                          selectedTab === i ? "active" : ""
                        }`}
                        onClick={() => setSelectedTab(i)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </nav>
                <GigTable gigs={filteredGigs} removeGig={removeGig} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}

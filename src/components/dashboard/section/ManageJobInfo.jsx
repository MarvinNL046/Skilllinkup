"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import ManageJobCard from "../card/ManageJobCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import useConvexUser from "@/hook/useConvexUser";

const tabs = [
  { label: "All Jobs", status: null },
  { label: "Open", status: "open" },
  { label: "Closed", status: "closed" },
  { label: "Expired", status: "expired" },
];

export default function ManageJobInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();

  const jobs = useQuery(
    api.marketplace.jobs.getByClient,
    convexUser?._id ? { clientId: convexUser._id, limit: 50 } : "skip"
  );

  const activeStatus = tabs[selectedTab].status;

  const filteredJobs = jobs
    ? activeStatus
      ? jobs.filter((j) => j.status === activeStatus)
      : jobs
    : [];

  const isLoading = !isLoaded || (convexUser?._id && jobs === undefined);

  if (isLoaded && !isAuthenticated) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="text-center py30">
                <p className="fz15 text-muted">Please sign in to manage your jobs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Manage Jobs</h2>
              <p className="text">View and manage your posted jobs.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href="/create-jobs"
                className="ud-btn btn-dark default-box-shadow2"
              >
                Post a Job
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
                    {tabs.map((tab, i) => (
                      <button
                        key={i}
                        className={`nav-link fw500 ps-0 ${
                          selectedTab === i ? "active" : ""
                        }`}
                        onClick={() => setSelectedTab(i)}
                      >
                        {tab.label}
                        {jobs && tab.status === null && (
                          <span className="ms-1 badge bg-secondary fz11">{jobs.length}</span>
                        )}
                        {jobs && tab.status !== null && (
                          <span className="ms-1 badge bg-secondary fz11">
                            {jobs.filter((j) => j.status === tab.status).length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </nav>

                <div className="packages_table table-responsive">
                  {isLoading ? (
                    <div className="text-center py30">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt10 fz14 text-muted">Loading your jobs...</p>
                    </div>
                  ) : filteredJobs.length === 0 ? (
                    <div className="text-center py30">
                      <p className="fz15 text-muted">
                        {activeStatus
                          ? `No ${activeStatus} jobs found.`
                          : "You haven't posted any jobs yet."}
                      </p>
                      {!activeStatus && (
                        <Link href="/create-jobs" className="ud-btn btn-thm mt10">
                          Post Your First Job
                          <i className="fal fa-arrow-right-long" />
                        </Link>
                      )}
                    </div>
                  ) : (
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Applications</th>
                          <th scope="col">Created &amp; Expired</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {filteredJobs.map((job) => (
                          <ManageJobCard key={job._id} data={job} />
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
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

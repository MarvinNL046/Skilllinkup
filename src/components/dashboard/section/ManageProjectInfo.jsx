"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import ManageProjectCard from "../card/ManageProjectCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import useConvexUser from "@/hook/useConvexUser";

const tabs = [
  { label: "All Projects", status: null },
  { label: "Open", status: "open" },
  { label: "In Progress", status: "in_progress" },
  { label: "Completed", status: "completed" },
  { label: "Cancelled", status: "cancelled" },
  { label: "Closed", status: "closed" },
];

export default function ManageProjectInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { convexUser, isLoaded } = useConvexUser();

  const projects = useQuery(
    api.marketplace.projects.getByClient,
    convexUser?._id ? { clientId: convexUser._id, limit: 50 } : "skip"
  );

  const activeStatus = tabs[selectedTab].status;

  const filteredProjects = projects
    ? activeStatus
      ? projects.filter((p) => p.status === activeStatus)
      : projects
    : [];

  const isLoading = !isLoaded || (convexUser?._id && projects === undefined);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Manage Projects</h2>
              <p className="text">View and manage all your posted projects.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href="/create-projects"
                className="ud-btn btn-dark default-box-shadow2"
              >
                Create Project
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
                        {projects && tab.status === null && (
                          <span className="ms-1 badge bg-secondary fz11">{projects.length}</span>
                        )}
                        {projects && tab.status !== null && (
                          <span className="ms-1 badge bg-secondary fz11">
                            {projects.filter((p) => p.status === tab.status).length}
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
                      <p className="mt10 fz14 text-muted">Loading your projects...</p>
                    </div>
                  ) : filteredProjects.length === 0 ? (
                    <div className="text-center py30">
                      <p className="fz15 text-muted">
                        {activeStatus
                          ? `No ${activeStatus.replace("_", " ")} projects found.`
                          : "You have not posted any projects yet."}
                      </p>
                      <Link href="/create-projects" className="ud-btn btn-thm mt10">
                        Post Your First Project
                        <i className="fal fa-arrow-right-long" />
                      </Link>
                    </div>
                  ) : (
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Category</th>
                          <th scope="col">Budget / Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {filteredProjects.map((project) => (
                          <ManageProjectCard key={project._id} project={project} />
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

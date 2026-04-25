"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import ManageProjectCard from "../card/ManageProjectCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import useConvexUser from "@/hook/useConvexUser";
import { toast } from "sonner";

export default function ManageProjectInfo() {
  const t = useTranslations("manageProjects");
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();

  const updateProject = useMutation(api.marketplace.projects.update);
  const removeProject = useMutation(api.marketplace.projects.remove);

  const projects = useQuery(
    api.marketplace.projects.getByClient,
    convexUser?._id ? { clientId: convexUser._id, limit: 50 } : "skip"
  );

  const tabs = [
    { label: t("allProjects"), status: null },
    { label: t("open"), status: "open" },
    { label: t("inProgress"), status: "in_progress" },
    { label: t("completed"), status: "completed" },
    { label: t("cancelled"), status: "cancelled" },
    { label: t("closed"), status: "closed" },
  ];

  const activeStatus = tabs[selectedTab].status;

  const filteredProjects = projects
    ? activeStatus
      ? projects.filter((p) => p.status === activeStatus)
      : projects
    : [];

  const isLoading = !isLoaded || (convexUser?._id && projects === undefined);

  const handleDelete = async (projectId) => {
    try {
      await removeProject({ projectId });
      toast.success(t("projectDeleted"));
    } catch (err) {
      toast.error(err.message || t("projectDeleteFailed"));
      throw err;
    }
  };

  const handleUpdate = async (fields) => {
    try {
      await updateProject(fields);
      toast.success(t("projectUpdated"));
    } catch (err) {
      toast.error(err.message || t("projectUpdateFailed"));
      throw err;
    }
  };

  if (isAuthenticated && convexUser === undefined) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
              <div className="text-center py-4">
                <div className="spinner-border spinner-border-sm text-success" role="status" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated && convexUser === null) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
              <div className="text-center py-4">
                <p className="text mb-0">{t("settingUpAccount")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
              <div className="text-center py30">
                <p className="fz15 text-muted">{t("signInPrompt")}</p>
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
              <h2>{t("title")}</h2>
              <p className="text">{t("pageDescription")}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href="/create-projects"
                className="ud-btn btn-thm default-box-shadow2"
              >
                {t("createProject")}
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
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
                        <span className="visually-hidden">{t("loading")}</span>
                      </div>
                      <p className="mt10 fz14 text-muted">{t("loadingProjects")}</p>
                    </div>
                  ) : filteredProjects.length === 0 ? (
                    <div className="text-center py30">
                      <p className="fz15 text-muted">
                        {activeStatus
                          ? t("noProjectsStatus", { status: activeStatus.replace("_", " ") })
                          : t("noProjectsYet")}
                      </p>
                      <Link href="/create-projects" className="ud-btn btn-thm mt10">
                        {t("postFirstProject")}
                        <i className="fal fa-arrow-right-long" />
                      </Link>
                    </div>
                  ) : (
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">{t("columnTitle")}</th>
                          <th scope="col">{t("columnCategory")}</th>
                          <th scope="col">{t("columnBudgetStatus")}</th>
                          <th scope="col">{t("columnActions")}</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {filteredProjects.map((project) => (
                          <ManageProjectCard
                            key={project._id}
                            project={project}
                            onEdit={(p) => setSelectedProject(p)}
                            onDelete={(p) => setSelectedProject(p)}
                          />
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
      <ProposalModal1
        project={selectedProject}
        onUpdate={handleUpdate}
      />
      <DeleteModal
        projectId={selectedProject?._id}
        projectTitle={selectedProject?.title}
        onDelete={handleDelete}
      />
    </>
  );
}

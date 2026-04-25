"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import ManageJobCard from "../card/ManageJobCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import useConvexUser from "@/hook/useConvexUser";
import { toast } from "sonner";

export default function ManageJobInfo() {
  const t = useTranslations("manageJobs");
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();

  const removeJob = useMutation(api.marketplace.jobs.remove);
  const updateJob = useMutation(api.marketplace.jobs.update);

  const jobs = useQuery(
    api.marketplace.jobs.getByClient,
    convexUser?._id ? { clientId: convexUser._id, limit: 50 } : "skip"
  );

  const tabs = [
    { label: t("allJobs"), status: null },
    { label: t("open"), status: "open" },
    { label: t("closed"), status: "closed" },
    { label: t("expired"), status: "expired" },
  ];

  const activeStatus = tabs[selectedTab].status;

  const filteredJobs = jobs
    ? activeStatus
      ? jobs.filter((j) => j.status === activeStatus)
      : jobs
    : [];

  const isLoading = !isLoaded || (convexUser?._id && jobs === undefined);

  const handleDelete = async (jobId) => {
    try {
      await removeJob({ jobId });
      toast.success(t("jobDeleted"));
    } catch (err) {
      toast.error(err.message || t("jobDeleteFailed"));
      throw err;
    }
  };

  const handleUpdate = async (fields) => {
    try {
      await updateJob(fields);
      toast.success(t("jobUpdated"));
    } catch (err) {
      toast.error(err.message || t("jobUpdateFailed"));
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
              <span
                className="ud-btn btn-thm default-box-shadow2"
                style={{ opacity: 0.5, cursor: "not-allowed" }}
                title={t("comingSoon")}
              >
                {t("postAJob")}
                <i className="fal fa-arrow-right-long" />
              </span>
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
                        <span className="visually-hidden">{t("loading")}</span>
                      </div>
                      <p className="mt10 fz14 text-muted">{t("loadingJobs")}</p>
                    </div>
                  ) : filteredJobs.length === 0 ? (
                    <div className="text-center py30">
                      <p className="fz15 text-muted">
                        {activeStatus
                          ? t("noJobsStatus", { status: activeStatus })
                          : t("noJobsYet")}
                      </p>
                      {!activeStatus && (
                        <span
                          className="ud-btn btn-thm mt10"
                          style={{ opacity: 0.5, cursor: "not-allowed" }}
                          title={t("comingSoon")}
                        >
                          {t("postFirstJob")}
                          <i className="fal fa-arrow-right-long" />
                        </span>
                      )}
                    </div>
                  ) : (
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">{t("columnTitle")}</th>
                          <th scope="col">{t("columnApplications")}</th>
                          <th scope="col">{t("columnCreatedExpired")}</th>
                          <th scope="col">{t("columnStatus")}</th>
                          <th scope="col">{t("columnAction")}</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {filteredJobs.map((job) => (
                          <ManageJobCard
                            key={job._id}
                            job={job}
                            onEdit={(j) => setSelectedJob(j)}
                            onDelete={(j) => setSelectedJob(j)}
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
        project={selectedJob}
        onUpdate={handleUpdate}
      />
      <DeleteModal
        projectId={selectedJob?._id}
        projectTitle={selectedJob?.title}
        onDelete={handleDelete}
      />
    </>
  );
}

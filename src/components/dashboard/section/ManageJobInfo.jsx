"use client";
import { useTranslations } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import DashboardTabs from "../element/DashboardTabs";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import ManageJobCard from "../card/ManageJobCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import useConvexUser from "@/hook/useConvexUser";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function PageShell({ children }) {
  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />
      {children}
    </div>
  );
}

export default function ManageJobInfo() {
  const t = useTranslations("manageJobs");
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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
      <PageShell>
        <Card>
          <CardContent className="p-8 flex justify-center">
            <div
              role="status"
              aria-label="Loading"
              className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
            />
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  if (isAuthenticated && convexUser === null) {
    return (
      <PageShell>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-[var(--text-secondary)]">{t("settingUpAccount")}</p>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  if (isLoaded && !isAuthenticated) {
    return (
      <PageShell>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-[var(--text-secondary)]">{t("signInPrompt")}</p>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <DashboardNavigation />
        <div className="dashboard_title_area mb-6">
          <div>
            <h2>{t("title")}</h2>
            <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
          </div>
          <Button disabled title={t("comingSoon")}>
            {t("postAJob")}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-5">
              <DashboardTabs
                value={selectedTab}
                onChange={setSelectedTab}
                ariaLabel={t("title")}
                options={tabs.map((tab, i) => ({
                  value: i,
                  label: tab.label,
                  count: jobs
                    ? tab.status === null
                      ? jobs.length
                      : jobs.filter((j) => j.status === tab.status).length
                    : undefined,
                }))}
              />
            </div>

            <div className="packages_table table-responsive">
              {isLoading ? (
                <div className="text-center py-12">
                  <div
                    role="status"
                    aria-label={t("loading")}
                    className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary mx-auto"
                  />
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">{t("loadingJobs")}</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[var(--text-secondary)] mb-5">
                    {activeStatus
                      ? t("noJobsStatus", { status: activeStatus })
                      : t("noJobsYet")}
                  </p>
                  {!activeStatus && (
                    <Button disabled title={t("comingSoon")}>
                      {t("postFirstJob")}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
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
                        onEdit={(j) => {
                          setSelectedJob(j);
                          setEditOpen(true);
                        }}
                        onDelete={(j) => {
                          setSelectedJob(j);
                          setDeleteOpen(true);
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <ProposalModal1
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        project={selectedJob}
        onUpdate={handleUpdate}
      />
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        projectId={selectedJob?._id}
        projectTitle={selectedJob?.title}
        onDelete={handleDelete}
      />
    </>
  );
}

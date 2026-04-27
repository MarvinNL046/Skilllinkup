"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import DashboardTabs from "../element/DashboardTabs";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import ManageProjectCard from "../card/ManageProjectCard";
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

export default function ManageProjectInfo() {
  const t = useTranslations("manageProjects");
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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
          <Button asChild>
            <Link href="/create-projects">
              {t("createProject")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
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
                  count: projects
                    ? tab.status === null
                      ? projects.length
                      : projects.filter((p) => p.status === tab.status).length
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
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    {t("loadingProjects")}
                  </p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[var(--text-secondary)] mb-5">
                    {activeStatus
                      ? t("noProjectsStatus", { status: activeStatus.replace("_", " ") })
                      : t("noProjectsYet")}
                  </p>
                  <Button asChild>
                    <Link href="/create-projects">
                      {t("postFirstProject")}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
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
                        onEdit={(p) => {
                          setSelectedProject(p);
                          setEditOpen(true);
                        }}
                        onDelete={(p) => {
                          setSelectedProject(p);
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
        project={selectedProject}
        onUpdate={handleUpdate}
      />
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        projectId={selectedProject?._id}
        projectTitle={selectedProject?.title}
        onDelete={handleDelete}
      />
    </>
  );
}

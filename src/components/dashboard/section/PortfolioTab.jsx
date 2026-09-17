"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import PortfolioProjectModal from "../modal/PortfolioProjectModal";

function ProjectCard({ project, onEdit, onDelete }) {
  const tags = project.tags || [];
  const hasImages = project.imageUrls && project.imageUrls.length > 0;

  return (
    <div className="col-sm-6 col-lg-4 mb-5">
      <div className="ps-widget bgc-white bdrs4 overflow-hidden relative bdr1">
        {/* Thumbnail */}
        <div
          className="relative flex items-center justify-center bg-[var(--bg-subtle,#f5f5f5)]"
          style={{ height: 160 }}
        >
          {hasImages ? (
            <Image
              src={project.imageUrls[0]}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          ) : (
            <span className="flaticon-photo text-3xl text-muted" />
          )}
        </div>
        <div className="p-4">
          <h6 className="mb-1">{project.title}</h6>
          {project.description && (
            <p
              className="text-sm text mb-2.5"
              style={{
                WebkitLineClamp: 2,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
              }}
            >
              {project.description}
            </p>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2.5">
              {tags.map((tag, i) => (
                <span key={i} className="badge bg-light text-dark text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onEdit(project)}>
              <Pencil aria-hidden="true" /> Edit
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Delete ${project.title}`}
              onClick={(event) => onDelete(project, event)}
            >
              <Trash2 aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioTab() {
  const tt = useTranslations("toasts");
  const { convexUser, isLoaded } = useConvexUser();
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openCreate = () => {
    setSelectedProject(null);
    setModalOpen(true);
  };
  const openEdit = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const projects = useQuery(
    api.marketplace.portfolio.getByUser,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );
  const removeProject = useMutation(api.marketplace.portfolio.remove);

  const [pendingDelete, setPendingDelete] = useState(null);
  const deleteTriggerRef = useRef(null);
  const handleDelete = (project, event) => {
    deleteTriggerRef.current = event.currentTarget;
    setPendingDelete({ id: project._id, title: project.title });
  };
  const confirmDelete = async () => {
    await removeProject({ projectId: pendingDelete.id });
    toast.success(tt("projectDeleted"));
  };


  if (!isLoaded || projects === undefined) {
    return (
      <div className="ps-widget bgc-white bdrs4 p-8 mb-8">
        <div className="spinner-border text-thm" role="status" />
      </div>
    );
  }

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p-8 mb-8">
        <div className="flex justify-between items-center bdrb1 pb-4 mb-6">
          <h5 className="list-title">Portfolio Projects</h5>
          <Button type="button" size="sm" onClick={openCreate}>
            <Plus aria-hidden="true" /> Add project
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py30">
            <span className="flaticon-photo text-4xl text-muted" />
            <p className="text mt-2.5 mb-4">
              No portfolio projects yet. Add your first project!
            </p>
            <Button type="button" onClick={openCreate}>
              <Plus aria-hidden="true" /> Add project
            </Button>
          </div>
        ) : (
          <div className="row">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this portfolio project?"
        description={`${pendingDelete?.title ?? "This project"} and its images will be removed from your profile. You cannot undo this.`}
        confirmLabel="Delete project"
        busyLabel="Deleting…"
        onConfirm={confirmDelete}
        onClose={() => setPendingDelete(null)}
        returnFocusTo={deleteTriggerRef}
      />
      <PortfolioProjectModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={(next) => {
          setModalOpen(next);
          if (!next) setSelectedProject(null);
        }}
      />
    </>
  );
}

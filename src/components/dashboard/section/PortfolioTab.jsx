"use client";
import { useState } from "react";
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
          style={{
            height: 160,
            background: hasImages ? "#ddd" : "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {hasImages ? (
            <span className="text-sm text-muted">
              {project.imageUrls.length} image
              {project.imageUrls.length !== 1 ? "s" : ""}
            </span>
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
            <button
              className="ud-btn btn-white btn-sm"
              onClick={() => onEdit(project)}
            >
              <span className="flaticon-pencil me-1" />
              Edit
            </button>
            <button
              className="ud-btn btn-white btn-sm text-danger"
              onClick={() => onDelete(project._id)}
            >
              <span className="flaticon-delete" />
            </button>
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

  const handleDelete = async (projectId) => {
    if (!confirm("Delete this portfolio project?")) return;
    try {
      await removeProject({ projectId });
      toast.success(tt("projectDeleted"));
    } catch (err) {
      toast.error(err.message || tt("failedToDelete"));
    }
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
          <button
            className="ud-btn btn-thm btn-sm"
            onClick={openCreate}
          >
            + Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py30">
            <span className="flaticon-photo text-4xl text-muted" />
            <p className="text mt-2.5 mb-4">
              No portfolio projects yet. Add your first project!
            </p>
            <button
              className="ud-btn btn-thm"
              onClick={openCreate}
            >
              + Add Project
            </button>
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

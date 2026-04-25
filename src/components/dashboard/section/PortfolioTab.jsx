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
    <div className="col-sm-6 col-lg-4 mb20">
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
            <span className="fz13 text-muted">
              {project.imageUrls.length} image
              {project.imageUrls.length !== 1 ? "s" : ""}
            </span>
          ) : (
            <span className="flaticon-photo fz30 text-muted" />
          )}
        </div>
        <div className="p15">
          <h6 className="mb5">{project.title}</h6>
          {project.description && (
            <p
              className="fz13 text mb10"
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
            <div className="flex flex-wrap gap-1 mb10">
              {tags.map((tag, i) => (
                <span key={i} className="badge bg-light text-dark fz11">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button
              className="ud-btn btn-white btn-sm"
              onClick={() => onEdit(project)}
              data-bs-target="#portfolioModal"
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

  const handleAddNew = () => setSelectedProject(null);

  if (!isLoaded || projects === undefined) {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30">
        <div className="spinner-border text-thm" role="status" />
      </div>
    );
  }

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30">
        <div className="flex justify-between items-center bdrb1 pb15 mb25">
          <h5 className="list-title">Portfolio Projects</h5>
          <button
            className="ud-btn btn-thm btn-sm"
            data-bs-target="#portfolioModal"
            onClick={handleAddNew}
          >
            + Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py30">
            <span className="flaticon-photo fz40 text-muted" />
            <p className="text mt10 mb15">
              No portfolio projects yet. Add your first project!
            </p>
            <button
              className="ud-btn btn-thm"
              data-bs-target="#portfolioModal"
              onClick={handleAddNew}
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
                onEdit={setSelectedProject}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <PortfolioProjectModal
        project={selectedProject}
        onClose={() => {
          setSelectedProject(null);
          document
            .getElementById("portfolioModal")
            ?.querySelector("[data-bs-dismiss]")
            ?.click();
        }}
      />
    </>
  );
}

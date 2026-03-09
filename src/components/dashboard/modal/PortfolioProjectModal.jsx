"use client";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function PortfolioProjectModal({ project, onClose }) {
  const tt = useTranslations("toasts");
  const createProject = useMutation(api.marketplace.portfolio.create);
  const updateProject = useMutation(api.marketplace.portfolio.update);
  const generateUploadUrl = useMutation(api.marketplace.portfolio.generateImageUploadUrl);

  const isEdit = !!project;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setTagsInput((project.tags || []).join(", "));
      setExternalUrl(project.externalUrl || "");
      setImageUrls(project.imageUrls || []);
    } else {
      setTitle("");
      setDescription("");
      setTagsInput("");
      setExternalUrl("");
      setImageUrls([]);
    }
  }, [project]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - imageUrls.length);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const storageIds = await Promise.all(
        files.map(async (file) => {
          const uploadUrl = await generateUploadUrl();
          const res = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });
          if (!res.ok) throw new Error("Upload failed");
          const { storageId } = await res.json();
          return storageId;
        })
      );
      setImageUrls((prev) => [...prev, ...storageIds].slice(0, 5));
    } catch {
      toast.error(tt("imageUploadFailed"));
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx) => setImageUrls((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error(tt("titleRequired"));
      return;
    }
    setSaving(true);
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    try {
      if (isEdit) {
        await updateProject({
          projectId: project._id,
          title,
          description: description || undefined,
          imageUrls,
          tags,
          externalUrl: externalUrl || undefined,
        });
        toast.success(tt("projectUpdated"));
      } else {
        await createProject({
          title,
          description: description || undefined,
          imageUrls,
          tags,
          externalUrl: externalUrl || undefined,
        });
        toast.success(tt("projectAdded"));
      }
      onClose?.();
    } catch (err) {
      toast.error(err.message || tt("failedToSave"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade" id="portfolioModal" tabIndex={-1}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEdit ? "Edit Project" : "Add Portfolio Project"}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>
          <form onSubmit={handleSave}>
            <div className="modal-body p30">
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">Title *</label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. E-commerce website redesign"
                  required
                />
              </div>
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">Description</label>
                <textarea
                  className="form-control pt15"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What did you build and what was the outcome?"
                />
              </div>
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">Tags</label>
                <input
                  className="form-control"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. React, UI Design, Figma"
                />
                <small className="text-muted">Separate with commas</small>
              </div>
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">External Link</label>
                <input
                  type="url"
                  className="form-control"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">
                  Images ({imageUrls.length}/5)
                </label>
                <div className="d-flex flex-wrap gap-2 mb10">
                  {imageUrls.map((url, idx) => (
                    <div
                      key={idx}
                      className="position-relative"
                      style={{ width: 80, height: 80 }}
                    >
                      <div
                        className="bdrs4 overflow-hidden"
                        style={{
                          width: 80,
                          height: 80,
                          background: "#eee",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span className="fz12 text-muted">img {idx + 1}</span>
                      </div>
                      <button
                        type="button"
                        className="position-absolute top-0 end-0 btn btn-sm btn-danger p-0"
                        style={{ width: 20, height: 20, fontSize: 10 }}
                        onClick={() => removeImage(idx)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {imageUrls.length < 5 && (
                    <label
                      className="bdrs4 bdr1 d-flex align-items-center justify-content-center text-muted"
                      style={{ width: 80, height: 80, cursor: "pointer" }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="d-none"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                      {uploading ? "..." : "+ Add"}
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="ud-btn btn-white"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ud-btn btn-thm"
                disabled={saving}
              >
                {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

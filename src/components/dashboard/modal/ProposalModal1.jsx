"use client";
import { useState, useEffect, useRef } from "react";

export default function ProposalModal1({ project, onUpdate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [workType, setWorkType] = useState("remote");
  const [isUpdating, setIsUpdating] = useState(false);
  const closeRef = useRef(null);

  // Pre-populate fields when project changes
  useEffect(() => {
    if (project) {
      setTitle(project.title ?? "");
      setDescription(project.description ?? "");
      setBudgetMin(project.budgetMin != null ? String(project.budgetMin) : "");
      setBudgetMax(project.budgetMax != null ? String(project.budgetMax) : "");
      setWorkType(project.workType ?? "remote");
    }
  }, [project]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!project?._id || !onUpdate) return;

    setIsUpdating(true);
    try {
      const fields = {
        projectId: project._id,
        title: title.trim(),
        description: description.trim(),
        workType,
      };
      if (budgetMin !== "") fields.budgetMin = Number(budgetMin);
      if (budgetMax !== "") fields.budgetMax = Number(budgetMax);

      await onUpdate(fields);
      closeRef.current?.click();
    } catch {
      // Error handled by parent via toast
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="proposalModal"
      tabIndex={-1}
      aria-labelledby="proposalModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content position-relative">
          <button
            ref={closeRef}
            type="button"
            className="btn-close position-absolute"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ top: "10px", right: "10px", zIndex: "9" }}
          />
          <div className="modal-body p-4">
            <h4 className="mb20">Edit Project</h4>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label fw500">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw500">Description</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label fw500">Budget Min (EUR)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label fw500">Budget Max (EUR)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw500">Work Type</label>
                <select
                  className="form-select"
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                >
                  <option value="remote">Remote</option>
                  <option value="local">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <button
                type="submit"
                className="ud-btn btn-thm"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Updating...
                  </>
                ) : (
                  <>
                    Update
                    <i className="fal fa-arrow-right-long" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

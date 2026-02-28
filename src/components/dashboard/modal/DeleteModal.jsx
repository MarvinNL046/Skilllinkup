"use client";
import { useState, useRef } from "react";

export default function DeleteModal({ projectId, projectTitle, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const closeRef = useRef(null);

  const handleDelete = async () => {
    if (!projectId || !onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(projectId);
      closeRef.current?.click();
    } catch {
      // Error handled by parent via toast
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex={-1}
      aria-labelledby="deleteModalLabel"
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
          <div className="modal-body px-4 pt-5">
            <div className="pb20">
              <h4 className="pb10 text-center text-black">
                Are you sure you want to delete?
              </h4>
              <p className="text-center">
                Do you really want to delete{" "}
                <strong>{projectTitle || "this project"}</strong>? This will
                cancel the project and it cannot be undone.
              </p>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="ud-btn bg-danger text-white mb25"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    Delete
                    <i className="fal fa-arrow-right-long" />
                  </>
                )}
              </button>
              <button
                className="ud-btn btn-dark mb25"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled={isDeleting}
              >
                Cancel
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

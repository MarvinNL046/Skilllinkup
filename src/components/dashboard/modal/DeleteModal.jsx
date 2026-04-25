"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

export default function DeleteModal({ projectId, projectTitle, onDelete }) {
  const t = useTranslations("proposals");
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
      data-testid="manage-project-delete-modal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content relative">
          <button
            ref={closeRef}
            type="button"
            className="btn-close absolute"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ top: "10px", right: "10px", zIndex: "9" }}
          />
          <div className="modal-body px-4 pt-5">
            <div className="pb20">
              <h4 className="pb10 text-center text-black">
                {t("deleteConfirmTitle")}
              </h4>
              <p className="text-center">
                {t("deleteConfirmMessage", { title: projectTitle || t("thisProject") })}
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                className="ud-btn bg-danger text-white mb25"
                onClick={handleDelete}
                disabled={isDeleting}
                data-testid="manage-project-delete-confirm"
              >
                {isDeleting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    {t("deleting")}
                  </>
                ) : (
                  <>
                    {t("delete")}
                    <i className="fal fa-arrow-right-long" />
                  </>
                )}
              </button>
              <button
                className="ud-btn btn-white mb25"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled={isDeleting}
              >
                {t("cancel")}
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

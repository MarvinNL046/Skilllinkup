"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Trash2, X } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Delete-confirmation modal — DS-native, controlled via isOpen prop.
 * Portal'd to document.body so the dim-backdrop covers the whole
 * viewport and stacking-contexts don't clip it. Replaces the legacy
 * Bootstrap-JS modal that was leaking into the document flow after
 * Bootstrap JS was removed.
 */
export default function DeleteModal({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  onDelete,
}) {
  const t = useTranslations("proposals");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && !isDeleting && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen) return null;
  if (typeof window === "undefined") return null;

  const handleDelete = async () => {
    if (!projectId || !onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(projectId);
      onClose?.();
    } catch {
      // toast handled in parent
    } finally {
      setIsDeleting(false);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => !isDeleting && onClose?.()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
        background: "oklch(22% 0.02 60 / 0.45)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="modal"
        style={{ maxWidth: 420, width: "100%" }}
        onClick={(e) => e.stopPropagation()}
        data-testid="manage-project-delete-modal"
      >
        <div className="modal__header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-md)",
                background: "var(--error-50, oklch(96% 0.025 25))",
                color: "var(--error-700, oklch(44% 0.175 25))",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <Trash2 size={18} />
            </span>
            <h3 className="h4" style={{ margin: 0 }}>
              {t("deleteConfirmTitle")}
            </h3>
          </div>
          <button
            type="button"
            className="btn btn--ghost btn--icon btn--sm"
            onClick={() => !isDeleting && onClose?.()}
            aria-label="Close"
            disabled={isDeleting}
          >
            <X size={16} />
          </button>
        </div>
        <div className="modal__body">
          <p className="body-md" style={{ color: "var(--text-secondary)", margin: 0 }}>
            {t("deleteConfirmMessage", { title: projectTitle || t("thisProject") })}
          </p>
        </div>
        <div className="modal__footer">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => onClose?.()}
            disabled={isDeleting}
            data-testid="manage-project-delete-cancel"
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            data-testid="manage-project-delete-confirm"
            className="btn"
            style={{
              background: "var(--error-600, oklch(52% 0.20 25))",
              color: "var(--neutral-0)",
              border: "1px solid var(--error-600, oklch(52% 0.20 25))",
            }}
          >
            {isDeleting ? t("deleting") : t("delete")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

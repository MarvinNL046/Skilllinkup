"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Edit-project modal — DS-native, controlled via isOpen prop. Portal'd
 * to document.body. Pre-fills the form from the `project` prop on open.
 * Replaces the legacy Bootstrap-JS modal markup.
 */
export default function ProposalModal1({ isOpen, onClose, project, onUpdate }) {
  const t = useTranslations("proposals");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [workType, setWorkType] = useState("remote");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!project) return;
    setTitle(project.title ?? "");
    setDescription(project.description ?? "");
    setBudgetMin(project.budgetMin != null ? String(project.budgetMin) : "");
    setBudgetMax(project.budgetMax != null ? String(project.budgetMax) : "");
    setWorkType(project.workType ?? "remote");
  }, [project]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && !isUpdating && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, isUpdating, onClose]);

  if (!isOpen) return null;
  if (typeof window === "undefined") return null;

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
      onClose?.();
    } catch {
      // parent shows toast
    } finally {
      setIsUpdating(false);
    }
  };

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-body-sm)",
    fontWeight: 500,
    color: "var(--text-primary)",
    marginBottom: "var(--space-2)",
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => !isUpdating && onClose?.()}
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
        style={{ maxWidth: 560, width: "100%" }}
        onClick={(e) => e.stopPropagation()}
        data-testid="manage-project-edit-modal"
      >
        <div className="modal__header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 className="h4" style={{ margin: 0 }}>{t("editProject")}</h3>
          <button
            type="button"
            className="btn btn--ghost btn--icon btn--sm"
            onClick={() => !isUpdating && onClose?.()}
            aria-label="Close"
            disabled={isUpdating}
          >
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="modal__body">
            <div style={{ marginBottom: "var(--space-4)" }}>
              <label style={labelStyle}>{t("labelTitle")}</label>
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                data-testid="manage-project-edit-title"
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: "var(--space-4)" }}>
              <label style={labelStyle}>{t("labelDescription")}</label>
              <textarea
                className="input"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                data-testid="manage-project-edit-description"
                style={{ width: "100%", minHeight: 96, resize: "vertical" }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-3)",
                marginBottom: "var(--space-4)",
              }}
            >
              <div>
                <label style={labelStyle}>{t("labelBudgetMin")}</label>
                <input
                  type="number"
                  className="input"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <label style={labelStyle}>{t("labelBudgetMax")}</label>
                <input
                  type="number"
                  className="input"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t("labelWorkType")}</label>
              <select
                className="input"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                style={{ width: "100%" }}
              >
                <option value="remote">{t("workTypeRemote")}</option>
                <option value="onsite">{t("workTypeOnsite")}</option>
                <option value="hybrid">{t("workTypeHybrid")}</option>
              </select>
            </div>
          </div>
          <div className="modal__footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => onClose?.()}
              disabled={isUpdating}
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isUpdating}
            >
              {isUpdating ? t("saving") : t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

"use client";
import { useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ExperienceModal from "../modal/ExperienceModal";

function SectionHeader({ title, modalType, onAdd, setModalType }) {
  return (
    <div className="flex justify-between items-center bdrb1 pb-4 mb-5">
      <h5 className="list-title mb-0">{title}</h5>
      <Button
        type="button"
        size="sm"
        aria-label={`Add ${title.toLowerCase()}`}
        onClick={() => {
          setModalType(modalType);
          onAdd();
        }}
      >
        <Plus aria-hidden="true" /> Add
      </Button>
    </div>
  );
}

function formatMonthYear(ts) {
  if (!ts) return "Present";
  return new Date(ts).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export default function ExperienceTab() {
  const tt = useTranslations("toasts");
  const { convexUser, isLoaded } = useConvexUser();
  const [modalType, setModalType] = useState("work");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const workExp = useQuery(
    api.marketplace.experience.getWorkExperience,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );
  const education = useQuery(
    api.marketplace.experience.getEducation,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );
  const certs = useQuery(
    api.marketplace.experience.getCertifications,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const removeWork = useMutation(api.marketplace.experience.removeWorkExperience);
  const removeEdu = useMutation(api.marketplace.experience.removeEducation);
  const removeCert = useMutation(api.marketplace.experience.removeCertification);

  const [pendingDelete, setPendingDelete] = useState(null);
  const deleteTriggerRef = useRef(null);
  const askDelete = (type, item, label, event) => {
    deleteTriggerRef.current = event.currentTarget;
    setPendingDelete({ type, id: item._id, label });
  };
  const confirmDelete = async () => {
    const { type, id } = pendingDelete;
    if (type === "work") await removeWork({ id });
    else if (type === "education") await removeEdu({ id });
    else await removeCert({ id });
    toast.success(tt("deleted"));
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setSelectedItem(item);
    setModalOpen(true);
  };
  const handleAdd = () => {
    setSelectedItem(null);
    setModalOpen(true);
  };

  if (!isLoaded) {
    return (
      <div className="ps-widget bgc-white bdrs4 p-8 mb-8">
        <div className="spinner-border text-thm" role="status" />
      </div>
    );
  }

  return (
    <>
      {/* Work Experience */}
      <div className="ps-widget bgc-white bdrs4 p-8 mb-5">
        <SectionHeader
          title="Work Experience"
          modalType="work"
          onAdd={handleAdd}
          setModalType={setModalType}
        />
        {(workExp || []).length === 0 ? (
          <p className="text text-sm">No work experience added yet.</p>
        ) : (
          (workExp || []).map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-start bdrb1 pb-4 mb-4"
            >
              <div>
                <h6 className="mb2">{item.title}</h6>
                <p className="text-sm text mb2">{item.company}</p>
                <p className="text-sm text-muted mb-1">
                  {formatMonthYear(item.startDate)} —{" "}
                  {item.isCurrent ? "Present" : formatMonthYear(item.endDate)}
                </p>
                {item.description && (
                  <p className="text-sm text mb-0">{item.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Edit ${item.title}`}
                  onClick={() => handleEdit("work", item)}
                >
                  <Pencil aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Delete ${item.title}`}
                  onClick={(event) => askDelete("work", item, item.title, event)}
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Education */}
      <div className="ps-widget bgc-white bdrs4 p-8 mb-5">
        <SectionHeader
          title="Education"
          modalType="education"
          onAdd={handleAdd}
          setModalType={setModalType}
        />
        {(education || []).length === 0 ? (
          <p className="text text-sm">No education added yet.</p>
        ) : (
          (education || []).map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-start bdrb1 pb-4 mb-4"
            >
              <div>
                <h6 className="mb2">{item.school}</h6>
                {item.degree && (
                  <p className="text-sm text mb2">
                    {item.degree}
                    {item.field ? `, ${item.field}` : ""}
                  </p>
                )}
                {(item.startYear || item.endYear) && (
                  <p className="text-sm text-muted mb-0">
                    {item.startYear || ""}
                    {item.endYear ? ` — ${item.endYear}` : ""}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Edit ${item.school}`}
                  onClick={() => handleEdit("education", item)}
                >
                  <Pencil aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Delete ${item.school}`}
                  onClick={(event) => askDelete("education", item, item.school, event)}
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Certifications */}
      <div className="ps-widget bgc-white bdrs4 p-8 mb-5">
        <SectionHeader
          title="Certifications"
          modalType="certification"
          onAdd={handleAdd}
          setModalType={setModalType}
        />
        {(certs || []).length === 0 ? (
          <p className="text text-sm">No certifications added yet.</p>
        ) : (
          (certs || []).map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-start bdrb1 pb-4 mb-4"
            >
              <div>
                <h6 className="mb2">{item.name}</h6>
                {item.issuer && (
                  <p className="text-sm text mb2">
                    {item.issuer}
                    {item.year ? ` · ${item.year}` : ""}
                  </p>
                )}
                {item.url?.startsWith("https://") && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-thm"
                  >
                    View certificate ↗
                  </a>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Delete ${item.name}`}
                onClick={(event) => askDelete("certification", item, item.name, event)}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this item?"
        description={`“${pendingDelete?.label ?? "This item"}” will be removed from your profile. You cannot undo this.`}
        confirmLabel="Delete"
        busyLabel="Deleting…"
        onConfirm={confirmDelete}
        onClose={() => setPendingDelete(null)}
        returnFocusTo={deleteTriggerRef}
      />
      <ExperienceModal
        type={modalType}
        item={selectedItem}
        open={modalOpen}
        onOpenChange={(next) => {
          setModalOpen(next);
          if (!next) setSelectedItem(null);
        }}
      />
    </>
  );
}

"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteModal({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  onDelete,
}) {
  const t = useTranslations("proposals");
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleOpenChange = (next) => {
    if (!next && !isDeleting) onClose?.();
  };

  return (
    <Dialog open={!!isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-md"
        data-testid="manage-project-delete-modal"
      >
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              <Trash2 className="h-4 w-4" />
            </span>
            <DialogTitle>{t("deleteConfirmTitle")}</DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription className="text-[var(--text-secondary)]">
          {t("deleteConfirmMessage", { title: projectTitle || t("thisProject") })}
        </DialogDescription>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose?.()}
            disabled={isDeleting}
            data-testid="manage-project-delete-cancel"
          >
            {t("cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            data-testid="manage-project-delete-confirm"
          >
            {isDeleting ? t("deleting") : t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

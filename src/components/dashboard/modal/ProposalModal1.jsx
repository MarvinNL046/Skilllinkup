"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { validateProjectFields } from "@/lib/projectValidation.mjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProposalModal1({ isOpen, onClose, project, onUpdate }) {
  const t = useTranslations("proposals");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [workType, setWorkType] = useState("remote");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!project || !isOpen) return;
    setTitle(project.title ?? "");
    setDescription(project.description ?? "");
    setBudgetMin(project.budgetMin != null ? String(project.budgetMin) : "");
    setBudgetMax(project.budgetMax != null ? String(project.budgetMax) : "");
    setWorkType("remote");
    setError("");
  }, [project, isOpen]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!project?._id || !onUpdate) return;
    const errors = validateProjectFields({
      title,
      description,
      budgetMin: budgetMin === "" ? project.budgetMin : budgetMin,
      budgetMax: budgetMax === "" ? project.budgetMax : budgetMax,
    });
    if (Object.keys(errors).length) {
      setError(Object.values(errors)[0]);
      return;
    }
    setError("");
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

  const handleOpenChange = (next) => {
    if (!next && !isUpdating) onClose?.();
  };

  return (
    <Dialog open={!!isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-xl"
        data-testid="manage-project-edit-modal"
      >
        <DialogHeader>
          <DialogTitle>{t("editProject")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="space-y-4">
          {error ? (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="proposal-title">{t("labelTitle")}</Label>
            <Input
              id="proposal-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={10}
              maxLength={120}
              data-testid="manage-project-edit-title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-description">
              {t("labelDescription")}
            </Label>
            <Textarea
              id="proposal-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minLength={80}
              maxLength={10000}
              data-testid="manage-project-edit-description"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="proposal-budget-min">{t("labelBudgetMin")}</Label>
              <Input
                id="proposal-budget-min"
                type="number"
                min="0.01"
                step="0.01"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
                data-testid="manage-project-edit-budget-min"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposal-budget-max">{t("labelBudgetMax")}</Label>
              <Input
                id="proposal-budget-max"
                type="number"
                min="0.01"
                step="0.01"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                data-testid="manage-project-edit-budget-max"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-work-type">{t("labelWorkType")}</Label>
            <Select value={workType} onValueChange={setWorkType}>
              <SelectTrigger
                id="proposal-work-type"
                data-testid="manage-project-edit-work-type"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">{t("remote")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose?.()}
              disabled={isUpdating}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              data-testid="manage-project-edit-submit"
            >
              {isUpdating ? t("updating") : t("update")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

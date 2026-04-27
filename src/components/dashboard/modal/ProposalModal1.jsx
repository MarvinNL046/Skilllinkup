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

  useEffect(() => {
    if (!project) return;
    setTitle(project.title ?? "");
    setDescription(project.description ?? "");
    setBudgetMin(project.budgetMin != null ? String(project.budgetMin) : "");
    setBudgetMax(project.budgetMax != null ? String(project.budgetMax) : "");
    setWorkType(project.workType ?? "remote");
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
      <DialogContent className="max-w-xl" data-testid="manage-project-edit-modal">
        <DialogHeader>
          <DialogTitle>{t("editProject")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="proposal-title">{t("labelTitle")}</Label>
            <Input
              id="proposal-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              data-testid="manage-project-edit-title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-description">{t("labelDescription")}</Label>
            <Textarea
              id="proposal-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              data-testid="manage-project-edit-description"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="proposal-budget-min">{t("labelBudgetMin")}</Label>
              <Input
                id="proposal-budget-min"
                type="number"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposal-budget-max">{t("labelBudgetMax")}</Label>
              <Input
                id="proposal-budget-max"
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-work-type">{t("labelWorkType")}</Label>
            <Select value={workType} onValueChange={setWorkType}>
              <SelectTrigger id="proposal-work-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">{t("workTypeRemote")}</SelectItem>
                <SelectItem value="onsite">{t("workTypeOnsite")}</SelectItem>
                <SelectItem value="hybrid">{t("workTypeHybrid")}</SelectItem>
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
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? t("saving") : t("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

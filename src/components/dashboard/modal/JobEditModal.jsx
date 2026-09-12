"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function JobEditModal({ isOpen, onClose, job, onUpdate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!isOpen || !job) return;
    setTitle(job.title || "");
    setDescription(job.description || "");
    setExpiresAt(
      job.expiresAt ? new Date(job.expiresAt).toLocaleDateString("en-CA") : "",
    );
    setError("");
  }, [job, isOpen]);
  async function submit(event) {
    event.preventDefault();
    if (busy || !job?._id) return;
    if (
      title.trim().length < 8 ||
      title.trim().length > 120 ||
      description.trim().length < 80 ||
      description.trim().length > 10000
    ) {
      setError(
        "Use a title of 8–120 characters and a description of 80–10,000 characters.",
      );
      return;
    }
    const deadline = expiresAt
      ? new Date(`${expiresAt}T23:59:59`).getTime()
      : null;
    if (
      deadline !== null &&
      (!Number.isFinite(deadline) || deadline <= Date.now())
    ) {
      setError("Choose a future application deadline or clear the field.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await onUpdate({
        jobId: job._id,
        title: title.trim(),
        description: description.trim(),
        expiresAt: deadline,
      });
      onClose();
    } catch (failure) {
      setError(
        failure?.message ||
          "Your changes could not be saved. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !busy) onClose();
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit vacancy</DialogTitle>
          <DialogDescription>
            Update the vacancy details candidates will see.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job-edit-title">Job title</Label>
            <Input
              id="job-edit-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              minLength={8}
              maxLength={120}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-edit-description">Role description</Label>
            <Textarea
              id="job-edit-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={8}
              minLength={80}
              maxLength={10000}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-edit-deadline">
              Application deadline (optional)
            </Label>
            <Input
              id="job-edit-deadline"
              type="date"
              value={expiresAt}
              onChange={(event) => setExpiresAt(event.target.value)}
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          ) : null}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

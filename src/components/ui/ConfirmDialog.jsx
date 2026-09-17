"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Shared confirmation for irreversible or consequential actions.
 *
 * Cancel receives focus first, the action cannot be submitted twice, a failed
 * action keeps the dialog open with its error, and focus returns to the
 * element that opened it (pass `returnFocusTo`) or to `fallbackFocusRef`.
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  busyLabel = "Saving…",
  cancelLabel = "Cancel",
  destructive = true,
  onConfirm,
  onClose,
  returnFocusTo,
  fallbackFocusRef,
  children,
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);
  const cancelRef = useRef(null);

  function close() {
    if (lock.current) return;
    setError("");
    onClose?.();
  }

  async function confirm() {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      await onConfirm?.();
      lock.current = false;
      setBusy(false);
      onClose?.();
    } catch (caught) {
      setError(
        caught?.message || "This could not be saved. Please try again.",
      );
      lock.current = false;
      setBusy(false);
    }
  }

  return (
    <Dialog
      open={!!open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
    >
      <DialogContent
        className="max-w-[calc(100vw-2rem)] sm:max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg data-[state=closed]:invisible"
        showCloseButton={!busy}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          cancelRef.current?.focus();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          const trigger = returnFocusTo?.current ?? returnFocusTo;
          if (trigger?.isConnected && !trigger.disabled) trigger.focus();
          else fallbackFocusRef?.current?.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        {error && <p role="alert">{error}</p>}
        <DialogFooter className="gap-2">
          <Button
            ref={cancelRef}
            type="button"
            variant="outline"
            disabled={busy}
            onClick={close}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={destructive ? "destructive" : "default"}
            disabled={busy}
            onClick={confirm}
          >
            {busy ? busyLabel : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

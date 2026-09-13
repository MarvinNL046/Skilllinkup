"use client";

import { Toaster } from "sonner";
import styles from "./AppToaster.module.css";

// One host survives route changes, including the onboarding → dashboard redirect.
export default function AppToaster() {
  return (
    <Toaster
      theme="light"
      position="top-right"
      closeButton
      duration={6000}
      visibleToasts={3}
      offset={{ top: 88, right: 24 }}
      mobileOffset={{ top: 80, right: 16, left: 16 }}
      containerAriaLabel="Notifications"
      toastOptions={{
        className: styles.toast,
        classNames: { description: styles.description, closeButton: styles.close },
        closeButtonAriaLabel: "Dismiss notification",
      }}
    />
  );
}

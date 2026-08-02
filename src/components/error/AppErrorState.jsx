"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import styles from "./AppErrorState.module.css";

export default function AppErrorState({
  eyebrow = "Something went wrong",
  title = "We could not load this page.",
  message = "Your work is safe. Try the page again or return to the homepage.",
  reset,
}) {
  return (
    <main className={styles.shell}>
      <section className={styles.card} role="alert">
        <span className={styles.icon}><AlertTriangle aria-hidden="true" /></span>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          {reset ? <button type="button" onClick={reset}><RefreshCw />Try again</button> : null}
          <Link href="/"><ArrowLeft />Back to home</Link>
        </div>
        <small>If this keeps happening, contact <a href="mailto:support@skilllinkup.com">support@skilllinkup.com</a>.</small>
      </section>
    </main>
  );
}

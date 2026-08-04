"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation } from "convex/react";
import { LoaderCircle, Plus } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import styles from "./AccountContextSwitcher.module.css";

const contexts = {
  client: [
    { role: "client", world: "online", label: "Customer · Online" },
    { role: "client", world: "local", label: "Customer · Local" },
  ],
  freelancer: [{ role: "freelancer", world: "online", label: "Online freelancer" }],
  local_professional: [{ role: "local_professional", world: "local", label: "Local professional" }],
  candidate: [{ role: "candidate", world: "jobs", label: "Job seeker" }],
  company: [{ role: "company", world: "jobs", label: "Company hiring" }],
};

export default function AccountContextSwitcher({ dark = false, onSwitched }) {
  const { convexUser } = useConvexUser();
  const switchContext = useMutation(api.users.switchAccountContext);
  const [switching, setSwitching] = useState(false);

  if (!convexUser) return null;
  const accountRoles = convexUser.accountRoles || [];
  if (!accountRoles.length) {
    return (
      <div className={`${styles.switcher} ${dark ? styles.dark : ""}`}>
        <Link href="/onboarding"><Plus size={14} /> Complete account setup</Link>
      </div>
    );
  }
  const options = accountRoles.flatMap((role) => contexts[role] || []);
  const requestedValue = `${convexUser.activeRole || accountRoles[0]}:${convexUser.preferredWorld || options[0]?.world}`;
  const currentValue = options.some(
    (option) => `${option.role}:${option.world}` === requestedValue,
  )
    ? requestedValue
    : `${options[0]?.role}:${options[0]?.world}`;

  async function handleChange(event) {
    const [role, world] = event.target.value.split(":");
    setSwitching(true);
    try {
      await switchContext({ activeRole: role, preferredWorld: world });
      onSwitched?.();
    } finally {
      setSwitching(false);
    }
  }

  return (
    <div className={`${styles.switcher} ${dark ? styles.dark : ""}`}>
      <label>
        <span>{switching ? <LoaderCircle className={styles.spinner} /> : null} Account context</span>
        <select value={currentValue} onChange={handleChange} disabled={switching} aria-label="Switch account role and marketplace">
          {options.map((option) => <option key={`${option.role}:${option.world}`} value={`${option.role}:${option.world}`}>{option.label}</option>)}
        </select>
      </label>
      {accountRoles.length ? <Link href="/onboarding" title="Add another role"><Plus size={14} /> Add role</Link> : null}
    </div>
  );
}

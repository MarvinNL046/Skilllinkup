"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import WaitlistButton from "@/components/ui/WaitlistButton";
import styles from "./DiscoveryEmptyState.module.css";

const copy = {
  services: {
    title: "No matching services yet",
    description: "Published services are still limited during the private beta. You can also explore freelancer profiles and discuss your project directly.",
  },
  freelancers: {
    title: "No matching freelancers yet",
    description: "The professional network is still growing during the private beta. Try a broader search, or join the waitlist for the public launch.",
  },
  local: {
    title: "No matching local professionals yet",
    description: "Local coverage is still limited during the private beta. Try a nearby area or another trade, or tell us what you need when joining the waitlist.",
  },
  jobs: {
    title: "No matching jobs yet",
    description: "Published vacancies are still limited during the private beta. Try a broader search, or join the waitlist for the public launch.",
  },
};

export default function DiscoveryEmptyState({ kind, filters = {}, categoryName = "", reset }) {
  const { title, description } = copy[kind];
  const query = (filters.q || "").trim();
  const location = (filters.location || "").trim();
  const expertise = [query, filters.skill, categoryName || filters.category]
    .filter(Boolean).filter((value, index, values) => values.indexOf(value) === index).join(" · ");
  const interest = [kind === "jobs" ? "Jobs" : "", expertise, location].filter(Boolean).join(" · ").slice(0, 120);
  const profileParams = new URLSearchParams();
  if (query || categoryName) profileParams.set("q", query || categoryName);
  if (location) profileParams.set("location", location);
  const profileHref = `/online/freelancers${profileParams.size ? `?${profileParams}` : ""}`;
  const hasFilters = Object.entries(filters).some(([key, value]) =>
    !["sort", "view", "scope", "page"].includes(key) && Boolean(value)
  );

  return (
    <div className={styles.empty}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className={styles.actions}>
        {kind === "services" && (
          <Button asChild><Link href={profileHref}>Browse freelancer profiles</Link></Button>
        )}
        <WaitlistButton
          key={`${kind}:${interest}`}
          variant={kind === "services" ? "secondary" : "default"}
          label="Get launch updates"
          initialSkill={interest}
          initialUserType={kind === "jobs" ? "" : "client"}
        />
        {reset && hasFilters && <Button type="button" variant="ghost" onClick={reset}>Clear filters</Button>}
      </div>
      <p className={styles.note}>We’ll email you when Skilllinkup opens to the public.</p>
    </div>
  );
}

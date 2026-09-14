"use client";
import { useState } from "react";
import Link from "next/link";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";
import { Button } from "@/components/ui/button";
import styles from "./CandidateProfile.module.css";
import InviteCandidate from "./InviteCandidate";

function Results({ search }) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.marketplace.candidateProfiles.listDiscoverable,
    { search },
    { initialNumItems: 20 },
  );
  return (
    <>
      <p role="status">
        {status === "LoadingFirstPage"
          ? "Finding candidates…"
          : `${results.length} profiles loaded`}
      </p>
      {!results.length && status === "Exhausted" && (
        <section className={styles.card}>
          <h2>No matching profiles yet</h2>
          <p>
            Only people who chose to be discoverable appear here. Try another
            skill, or publish a vacancy so candidates can apply to you.
          </p>
          <Button asChild>
            <Link href="/create-job">Post a vacancy</Link>
          </Button>
        </section>
      )}
      <div className={styles.list}>
        {results.map((profile) => (
          <article key={profile._id} className={styles.card}>
            <h2>{profile.displayName}</h2>
            <strong>{profile.headline}</strong>
            <p>{profile.location || "Location not provided"}</p>
            <p>{profile.skills.join(" · ")}</p>
            <p className={styles.summary}>{profile.summary}</p>
            {profile.resumeUrl ? (
              <Button asChild variant="outline">
                <a href={profile.resumeUrl}>Download shared CV</a>
              </Button>
            ) : (
              <p>This candidate has kept their CV private.</p>
            )}
            <InviteCandidate profile={profile} />
          </article>
        ))}
      </div>
      {status !== "Exhausted" && status !== "LoadingFirstPage" && (
        <Button
          variant="outline"
          disabled={status !== "CanLoadMore"}
          onClick={() => loadMore(20)}
        >
          {status === "LoadingMore" ? "Loading…" : "Load more candidates"}
        </Button>
      )}
    </>
  );
}
export default function CandidateDirectory() {
  const { convexUser } = useConvexUser();
  const [draft, setDraft] = useState(""),
    [search, setSearch] = useState("");
  const verified =
    convexUser?.companyVerificationStatus === "verified" &&
    !convexUser?.deletionRequestedAt;
  return (
    <div className={styles.page}>
      <DashboardNavigation />
      <header>
        <p>Jobs · Company hiring</p>
        <h1>Find candidates</h1>
        <p>
          Explore people who have chosen to share their profile with verified
          employers. CV downloads are available only when the candidate has
          separately enabled them.
        </p>
      </header>
      {!convexUser ? (
        <p role="status">Checking your company access…</p>
      ) : !verified ? (
        <section className={styles.card}>
          <h2>Verify your company to find candidates</h2>
          <p>
            Complete company verification from the vacancy setup page to access
            this directory.
          </p>
          <Button asChild>
            <Link href="/create-job">Open company setup</Link>
          </Button>
        </section>
      ) : (
        <>
          <form
            className={styles.search}
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(draft.trim());
            }}
          >
            <label htmlFor="candidate-search">
              Search by skill, role, name or region
              <input
                id="candidate-search"
                value={draft}
                maxLength={120}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="e.g. frontend developer"
              />
            </label>
            <Button type="submit">Search candidates</Button>
          </form>
          <p>
            Invite candidates who accept vacancy invitations. They decide
            whether to respond or apply; their CV and email are not shared by an
            invitation.
          </p>
          <Button asChild variant="outline">
            <Link href="/dashboard/sent-invitations">
              View sent invitations
            </Link>
          </Button>
          <Results key={search} search={search} />
        </>
      )}
    </div>
  );
}

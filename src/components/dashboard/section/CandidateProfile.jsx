"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";
import { Button } from "@/components/ui/button";
import styles from "./CandidateProfile.module.css";

function ProfileEditor({ profile, name }) {
  const [form, setForm] = useState(() => ({
    displayName: profile?.displayName || name || "",
    headline: profile?.headline || "",
    location: profile?.location || "",
    summary: profile?.summary || "",
    skills: (profile?.skills || []).join(", "),
    discoverable: profile?.discoverable || false,
    shareResume: profile?.shareResume || false,
    allowInvitations: profile?.allowInvitations || false,
  }));
  const [file, setFile] = useState(null),
    [busy, setBusy] = useState(false),
    [confirmRemove, setConfirmRemove] = useState(false);
  const lock = useRef(false);
  const fileInput = useRef(null);
  const [revision, setRevision] = useState(profile?.updatedAt ?? 0);
  const save = useMutation(api.marketplace.candidateProfiles.save),
    remove = useMutation(api.marketplace.candidateProfiles.removeResume);
  const change = (key, value) =>
    setForm((old) => ({
      ...old,
      [key]: value,
      ...(key === "discoverable" && !value
        ? { shareResume: false, allowInvitations: false }
        : {}),
    }));
  async function submit(event) {
    event.preventDefault();
    if (lock.current) return;
    const skills = [
      ...new Set(
        form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      ),
    ];
    if (!form.displayName.trim() || !form.headline.trim()) {
      toast.error("Add your name and a professional headline.");
      return;
    }
    if (skills.length > 12 || skills.some((skill) => skill.length > 50)) {
      toast.error("Add up to 12 skills, each no longer than 50 characters.");
      return;
    }
    lock.current = true;
    setBusy(true);
    const fields = { ...form, skills, expectedUpdatedAt: revision };
    try {
      if (file) {
        const body = new FormData();
        body.append("profile", JSON.stringify(fields));
        body.append("file", file);
        const response = await fetch("/api/candidate-profiles/resume", {
          method: "POST",
          body,
        });
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.error || "Your profile could not be saved.");
        setRevision(result.profile.updatedAt);
      } else {
        const saved = await save(fields);
        setRevision(saved.updatedAt);
      }
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      toast.success("Your profile and visibility choices are saved.");
    } catch (error) {
      toast.error(
        error?.message ||
          "Your profile could not be saved. Your entries are still here.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  async function removeCv() {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    try {
      const saved = await remove({ expectedUpdatedAt: revision });
      setRevision(saved.updatedAt);
      change("shareResume", false);
      setConfirmRemove(false);
      toast.success("Your profile CV has been removed.");
    } catch (error) {
      toast.error(error?.message || "Your CV could not be removed.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className={styles.form}>
      {(profile?.updatedAt ?? 0) !== revision && !busy && (
        <p role="alert">
          This profile changed in another tab. Your unsaved entries are still
          here. Reload the page before saving again.
        </p>
      )}
      <fieldset disabled={busy} className={styles.card}>
        <legend>Your job-seeker profile</legend>
        <p>
          This is separate from your freelancer profile. Only the details below
          appear when you choose to be discoverable.
        </p>
        <div className={styles.grid}>
          <label>
            Display name
            <input
              required
              maxLength={80}
              value={form.displayName}
              onChange={(e) => change("displayName", e.target.value)}
              autoComplete="name"
            />
          </label>
          <label>
            Professional headline
            <input
              required
              maxLength={120}
              placeholder="e.g. Frontend developer"
              value={form.headline}
              onChange={(e) => change("headline", e.target.value)}
            />
          </label>
          <label>
            City or region (optional)
            <input
              maxLength={120}
              placeholder="e.g. Amsterdam or remote"
              value={form.location}
              onChange={(e) => change("location", e.target.value)}
            />
          </label>
          <label>
            Skills (optional, separated by commas)
            <input
              maxLength={600}
              placeholder="e.g. React, customer support, project planning"
              value={form.skills}
              onChange={(e) => change("skills", e.target.value)}
            />
            <small>Up to 12 skills.</small>
          </label>
        </div>
        <label>
          About you (optional)
          <textarea
            rows={5}
            maxLength={2000}
            value={form.summary}
            onChange={(e) => change("summary", e.target.value)}
          />
          <small>
            Describe your experience and the kind of role you want. Leave out
            private contact details.
          </small>
        </label>
      </fieldset>
      <fieldset disabled={busy} className={styles.card}>
        <legend>Your CV</legend>
        <p>
          PDF, DOC or DOCX, up to 3 MB. Your profile CV is private by default.
        </p>
        {profile?.resumeUrl && (
          <div className={styles.file}>
            <div>
              <strong>{profile.resumeName}</strong>
              <p>{Math.ceil(profile.resumeSize / 1024)} KB · Saved CV</p>
            </div>
            <Button asChild variant="outline">
              <a href={profile.resumeUrl}>Download CV</a>
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setConfirmRemove(true)}
            >
              Remove CV
            </Button>
          </div>
        )}
        {confirmRemove && (
          <div role="group" aria-label="Confirm CV removal">
            <p>
              Remove the saved profile CV? Copies already sent with applications
              are kept with those applications.
            </p>
            <div className={styles.actions}>
              <Button type="button" variant="destructive" onClick={removeCv}>
                Confirm removal
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setConfirmRemove(false)}
              >
                Keep CV
              </Button>
            </div>
          </div>
        )}
        <label>
          {profile?.resumeUrl ? "Replace your CV" : "Choose your CV"}
          <input
            ref={fileInput}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              const selected = e.target.files?.[0] || null;
              if (
                selected &&
                (selected.size < 1 || selected.size > 3 * 1024 * 1024)
              ) {
                toast.error("Choose a non-empty CV up to 3 MB.");
                e.target.value = "";
                setFile(null);
                change("shareResume", false);
                return;
              }
              setFile(selected);
              change("shareResume", false);
            }}
          />
        </label>
        {file && (
          <p role="status">
            {file.name} selected. Save below to upload it. Review your
            CV-sharing choice for this file.
          </p>
        )}
      </fieldset>
      <fieldset disabled={busy} className={styles.card}>
        <legend>Who can find you?</legend>
        <label className={styles.choice}>
          <input
            type="checkbox"
            checked={form.discoverable}
            onChange={(e) => change("discoverable", e.target.checked)}
          />
          <span>
            <strong>Let verified employers find my profile</strong>
            <small>
              Share my display name, headline, region, summary and skills in the
              signed-in candidate directory. My account email is not shown.
            </small>
          </span>
        </label>
        <label className={styles.choice}>
          <input
            type="checkbox"
            disabled={!form.discoverable || !(file || profile?.resumeUrl)}
            checked={form.shareResume}
            onChange={(e) => change("shareResume", e.target.checked)}
          />
          <span>
            <strong>Also let verified employers download my CV</strong>
            <small>
              My CV may contain contact details. I have reviewed it and want to
              share it with those employers.
            </small>
          </span>
        </label>
        <p>
          Turn a sharing choice off and save to stop future access. Files
          someone already downloaded cannot be recalled. Copies sent with
          applications keep their existing access.
        </p>
        <label className={styles.choice}>
          <input
            type="checkbox"
            disabled={!form.discoverable}
            checked={form.allowInvitations}
            onChange={(e) => change("allowInvitations", e.target.checked)}
          />
          <span>
            <strong>Let verified employers invite me to vacancies</strong>
            <small>
              Receive invitations in my Jobs dashboard. I decide whether to show
              interest or apply. This does not share my CV or account email.
            </small>
          </span>
        </label>
        <p>
          Turn invitations off and save to stop new invitations. You can still
          review and decline invitations already received.
        </p>
        <p role="status">
          After saving:{" "}
          {form.discoverable
            ? form.shareResume
              ? "profile and CV available to verified employers"
              : "profile discoverable; CV private"
            : "profile and CV private"}
          .
        </p>
      </fieldset>
      <div className={styles.actions}>
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save profile and choices"}
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/applications">My applications</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/job-invitations">My invitations</Link>
        </Button>
      </div>
    </form>
  );
}
export default function CandidateProfile() {
  const { convexUser, isAuthenticated } = useConvexUser();
  const profile = useQuery(
    api.marketplace.candidateProfiles.getMine,
    isAuthenticated ? {} : "skip",
  );
  return (
    <div className={styles.page}>
      <DashboardNavigation />
      <header>
        <p>Jobs · Your profile</p>
        <h1>My profile & CV</h1>
        <p>Introduce yourself, keep a CV ready and choose who can see it.</p>
      </header>
      {profile === undefined ? (
        <p role="status">Loading your profile…</p>
      ) : (
        <ProfileEditor
          key={convexUser?._id}
          profile={profile}
          name={convexUser?.name}
        />
      )}
    </div>
  );
}

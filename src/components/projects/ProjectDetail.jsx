"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "convex/react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  Headphones,
  Heart,
  MapPin,
  MessageSquare,
  Send,
  Share2,
  ShieldCheck,
  Star,
  WalletCards,
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import useConvexProjectDetail from "@/hook/useConvexProjectDetail";
import useConvexUser from "@/hook/useConvexUser";
import BidForm from "@/components/element/BidForm";
import useMyProjectProposal from "@/hook/useMyProjectProposal";
import { DetailPageSkeleton } from "@/components/loading/PageSkeletons";
import ReportButton from "@/components/trust/ReportButton";
import styles from "./ProjectDetail.module.css";

const demoProject = {
  _id: "demo-project",
  clientId: "demo-client",
  title: "New website for a sustainable interior brand",
  description:
    "For our sustainable interior brand, we are looking for an experienced web designer who can design a modern, user-friendly and conversion-focused website in Figma. The website should communicate our brand values and deliver an excellent experience on every device.",
  status: "open",
  featured: true,
  budgetMin: 2500,
  budgetMax: 4000,
  currency: "EUR",
  workType: "hybrid",
  locationCity: "Rotterdam",
  locationCountry: "Netherlands",
  requiredSkills: [
    "Web design",
    "UX/UI design",
    "Figma",
    "Responsive design",
    "Wireframing",
    "Prototyping",
  ],
  bidCount: 12,
  deadline: new Date("2026-08-31T23:59:00Z").getTime(),
  createdAt: new Date("2026-07-01T10:00:00Z").getTime(),
  categoryName: "Interior & Design",
  clientName: "Greenhaus Living",
  clientAvatar: "/images/team/client-2.png",
};

function money(value, currency = "EUR") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function projectBudget(project) {
  const { budgetMin, budgetMax, currency = "EUR" } = project;
  if (budgetMin != null && budgetMax != null)
    return budgetMin === budgetMax
      ? money(budgetMin, currency)
      : `${money(budgetMin, currency)} – ${money(budgetMax, currency)}`;
  if (budgetMin != null) return `From ${money(budgetMin, currency)}`;
  if (budgetMax != null) return `Up to ${money(budgetMax, currency)}`;
  return "Budget to be agreed";
}

function relativeTime(timestamp) {
  if (!timestamp) return "Recently";
  const hours = Math.max(1, Math.round((Date.now() - timestamp) / 3600000));
  return hours < 24
    ? `${hours} ${hours === 1 ? "hour" : "hours"} ago`
    : `${Math.round(hours / 24)} days ago`;
}

function Fact({ icon: Icon, label, children }) {
  return (
    <div className={styles.fact}>
      <i>
        <Icon size={19} />
      </i>
      <div>
        <span>{label}</span>
        <strong>{children}</strong>
      </div>
    </div>
  );
}

function TrustRow({ icon: Icon, title, text }) {
  return (
    <div className={styles.trustRow}>
      <Icon size={20} />
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const liveProject = useConvexProjectDetail(id);
  const { convexUser, isAuthenticated, isLoaded } = useConvexUser();
  const proposalRef = useRef(null);
  const [showDemo, setShowDemo] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (liveProject !== undefined) return;
    const timer = setTimeout(() => setShowDemo(true), 1300);
    return () => clearTimeout(timer);
  }, [liveProject]);

  // The illustrative project exists for local design work only; production never shows invented clients or bids.
  const isDemoRoute = process.env.NODE_ENV === "development" && (id === "sustainable-interior-brand" || id === "demo");
  const project =
    liveProject ||
    ((showDemo || liveProject === null) && isDemoRoute ? demoProject : null);
  const isDemoProject = project?._id === "demo-project";
  const myProposal = useMyProjectProposal(project?._id);
  const similarProjects = useQuery(api.marketplace.projects.list, {
    locale: "en",
    limit: 5,
  });
  const isOwner = Boolean(
    convexUser && project && convexUser._id === project.clientId,
  );

  const similar = useMemo(() => {
    const real =
      similarProjects
        ?.filter((item) => item._id !== project?._id)
        .slice(0, 4) || [];
    if (real.length) return real;
    return isDemoProject
      ? [
          {
            _id: "s1",
            title: "Web design for a wellness platform",
            budgetMin: 3000,
            budgetMax: 5000,
            locationCity: "Utrecht",
            workType: "hybrid",
            bidCount: 18,
          },
          {
            _id: "s2",
            title: "New webshop design for a fashion brand",
            budgetMin: 2000,
            budgetMax: 3500,
            locationCity: "Amsterdam",
            workType: "hybrid",
            bidCount: 9,
          },
          {
            _id: "s3",
            title: "Corporate website redesign",
            budgetMin: 4000,
            budgetMax: 6000,
            locationCity: "The Hague",
            workType: "hybrid",
            bidCount: 14,
          },
          {
            _id: "s4",
            title: "Landing page for a product launch",
            budgetMin: 1200,
            budgetMax: 2000,
            workType: "remote",
            bidCount: 7,
          },
        ]
      : [];
  }, [similarProjects, project?._id, isDemoProject]);

  const scrollToProposal = useCallback(
    () =>
      proposalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
    [],
  );
  const shareProject = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {
      setShared(false);
    }
  }, []);

  if (!project && liveProject === undefined) return <DetailPageSkeleton />;
  if (!project)
    return (
      <div className={styles.notFound}>
        <h1>Project not found</h1>
        <Link href="/projects">Browse projects</Link>
      </div>
    );

  const location =
    [project.locationCity, project.locationCountry]
      .filter(Boolean)
      .join(", ") || "Online";
  const currency = project.currency || "EUR";
  const skills = project.requiredSkills || [];
  const description =
    project.description || "No project description has been published.";

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/projects">Projects</Link>
          <span>/</span>
          <span>{project.categoryName || "Project details"}</span>
        </nav>
        <Link className={styles.backLink} href="/projects">
          <ArrowLeft size={16} />
          Back to all projects
        </Link>
        {isDemoProject && (
          <aside className={styles.previewNotice}>
            <strong>Illustrative project preview</strong>
            <span>
              This brief, company, budget and response activity demonstrate the
              intended experience; they are not live marketplace records.
            </span>
          </aside>
        )}

        <div className={styles.layout}>
          <div className={styles.content}>
            <header className={styles.hero}>
              <p className={styles.eyebrow}>
                {project.categoryName || "Online project"}
              </p>
              <div className={styles.titleLine}>
                <h1>{project.title}</h1>
                <div className={styles.headerActions}>
                  <Button variant="outline" size="sm" onClick={shareProject}>
                    <Share2 size={17} />
                    {shared ? "Copied" : "Share"}
                  </Button>
                </div>
              </div>
              <div className={styles.badges}>
                <span className={styles.openBadge}>
                  {project.status === "in_progress"
                    ? "In progress"
                    : project.status?.replace(/^./, (letter) =>
                        letter.toUpperCase(),
                      ) || "Status unavailable"}
                </span>
                {(project.featured || isDemoRoute) && (
                  <span className={styles.featuredBadge}>
                    <Star size={13} fill="currentColor" />
                    Featured
                  </span>
                )}
              </div>
              <p className={styles.posted}>
                Posted {relativeTime(project.createdAt)}
              </p>
            </header>

            <section className={styles.facts}>
              <Fact icon={WalletCards} label="Budget">
                {projectBudget(project)}
              </Fact>
              <Fact icon={BriefcaseBusiness} label="Pricing">
                Fixed price
              </Fact>
              <Fact icon={CalendarDays} label="Deadline">
                {project.deadline
                  ? new Date(project.deadline).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Flexible"}
              </Fact>
              <Fact icon={MapPin} label="Location">
                {location}
                {project.workType === "remote" ? " · remote" : " + online"}
              </Fact>
            </section>

            <section className={styles.textSection}>
              <h2>About the project</h2>
              <p>{description}</p>
              {description.trim().length < 160 && (
                <aside className={styles.briefNote}>
                  This is a short brief. Use your proposal to clarify the scope,
                  deliverables and timing before starting.
                </aside>
              )}
            </section>
            {skills.length > 0 && (
              <section className={styles.textSection}>
                <h2>Preferred skills</h2>
                <div className={styles.skills}>
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </section>
            )}

            <section className={styles.proposalSection} ref={proposalRef}>
              <h2>
                {myProposal
                  ? "Your proposal"
                  : project.status === "open"
                    ? "Send your proposal"
                    : "Proposals closed"}
              </h2>
              {isAuthenticated && !isOwner && !isDemoProject ? (
                <BidForm
                  key={`${convexUser?._id}:${project._id}`}
                  projectId={project._id}
                  projectStatus={project.status}
                />
              ) : project.status !== "open" ? (
                <p>This project is no longer accepting proposals.</p>
              ) : !isLoaded ? (
                <div className={styles.formSkeleton} />
              ) : !isAuthenticated ? (
                <div className={styles.signInPrompt}>
                  <p>
                    Sign in to introduce yourself, share your price and propose
                    a delivery date.
                  </p>
                  <Button asChild>
                    <Link href="/login">
                      Sign in to propose <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              ) : isOwner ? (
                <p className={styles.ownerNote}>
                  This is your project. You can review proposals in your
                  dashboard.
                </p>
              ) : (
                <div className={styles.signInPrompt}>
                  <p>The proposal form becomes active for live projects.</p>
                  <Button asChild>
                    <Link href="/projects">
                      Explore live projects <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              )}
            </section>
            {project._id !== "demo-project" ? (
              <ReportButton
                targetType="project"
                targetId={project._id}
                targetLabel={project.title}
              />
            ) : null}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.interestCard}>
              <p className={styles.eyebrow}>Project budget</p>
              <p className={styles.budgetHeadline}>{projectBudget(project)}</p>
              <h2>
                {myProposal
                  ? "Your proposal is saved"
                  : "Could this be your next project?"}
              </h2>
              <p className={styles.proposalIntro}>
                {myProposal
                  ? "Review your proposal and its current status below."
                  : "Introduce yourself and explain how you would approach the work."}
              </p>
              <div className={styles.responses}>
                <span>
                  <strong>
                    {project.bidCount || 0}{" "}
                    {(project.bidCount || 0) === 1
                      ? "freelancer"
                      : "freelancers"}
                  </strong>{" "}
                  {(project.bidCount || 0) === 1
                    ? "has responded"
                    : "have responded"}
                </span>
              </div>
              <div className={styles.deadline}>
                <span>Project deadline</span>
                <strong>
                  {project.deadline
                    ? new Date(project.deadline).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "To be agreed"}
                </strong>
              </div>
              {(project.status === "open" || myProposal) && (
                <Button
                  className={styles.proposalButton}
                  onClick={scrollToProposal}
                >
                  <Send size={17} />
                  {myProposal ? "View your proposal" : "Send a proposal"}
                </Button>
              )}
              <p className={styles.betaNote}>
                Free private beta · No platform payments
              </p>
            </div>

            <div className={styles.clientCard}>
              <h2>About the client</h2>
              <div className={styles.clientIdentity}>
                <div>
                  {project.clientAvatar ? (
                    <Image
                      src={project.clientAvatar}
                      alt=""
                      width={54}
                      height={54}
                    />
                  ) : (
                    <BriefcaseBusiness size={24} />
                  )}
                </div>
                <span>
                  <strong>
                    {project.clientName || "Skilllinkup client"}
                    {project.clientVerified ? <BadgeCheck size={16} /> : null}
                  </strong>
                  <small>
                    {isDemoProject
                      ? "Illustrative company"
                      : project.clientVerified
                        ? "Email verified"
                        : "Private-beta client"}
                  </small>
                </span>
              </div>
              <dl>
                <div>
                  <dt>
                    <CalendarDays size={16} />
                    Project status
                  </dt>
                  <dd>{isDemoProject ? "Preview" : project.status}</dd>
                </div>
                <div>
                  <dt>
                    <BriefcaseBusiness size={16} />
                    Responses
                  </dt>
                  <dd>{project.bidCount || 0}</dd>
                </div>
                <div>
                  <dt>
                    <Clock3 size={16} />
                    Published
                  </dt>
                  <dd>
                    {new Date(
                      project.publishedAt || project.createdAt,
                    ).toLocaleDateString("en-GB")}
                  </dd>
                </div>
                <div>
                  <dt>
                    <MapPin size={16} />
                    Location
                  </dt>
                  <dd>{location}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>

      {similar.length > 0 && (
        <section className={styles.similarSection}>
          <div className={styles.shell}>
            <div className={styles.sectionTitle}>
              <h2>
                {isDemoProject
                  ? "Illustrative related projects"
                  : "Similar projects"}
              </h2>
              <Link href="/projects">
                View all projects <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.similarGrid}>
              {similar.map((item) => (
                <Link
                  key={item._id}
                  href={
                    item.slug ? `/online/project/${item.slug}` : "/projects"
                  }
                >
                  <div>
                    {item.featured && (
                      <span className={styles.miniFeatured}>Featured</span>
                    )}
                    <Heart size={17} />
                  </div>
                  <h3>{item.title}</h3>
                  <small>Fixed price</small>
                  <strong>{projectBudget(item)}</strong>
                  <p>
                    <MapPin size={14} />
                    {item.locationCity || "Online"} ·{" "}
                    {item.workType === "remote" ? "remote" : "online"}
                  </p>
                  <footer>{item.bidCount || 0} responses</footer>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className={styles.shell}>
        <section className={styles.bottomTrust}>
          <TrustRow
            icon={ShieldCheck}
            title="Clear milestones"
            text="Delivery and approval recorded"
          />
          <TrustRow
            icon={BadgeCheck}
            title="Visible trust signals"
            text="Email and profile status are shown clearly"
          />
          <TrustRow
            icon={MessageSquare}
            title="Free private beta"
            text="No platform payment is active"
          />
          <TrustRow
            icon={Headphones}
            title="Personal support"
            text="Support whenever you need it"
          />
        </section>
      </div>
    </main>
  );
}

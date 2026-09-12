"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  EllipsisVertical,
  Heart,
  LockKeyhole,
  MessageSquare,
  Plus,
  Star,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { getActiveRole } from "@/lib/accountContext.mjs";
import RoleDashboardInfo from "./RoleDashboardInfo";
import styles from "./DashboardInfo.module.css";
import { useRouter } from "next/navigation";
import useDashboardMetrics from "@/hook/useDashboardMetrics";
import { Button } from "@/components/ui/button";

const FALLBACK_AVATARS = [
  "/images/skilllinkup-home/professional-lucas-v1.png",
  "/images/skilllinkup-home/professional-sarah-v1.png",
  "/images/skilllinkup-home/professional-yuki-v1.png",
  "/images/skilllinkup-home/professional-adaeze-v1.png",
];

function money(amount, currency = "EUR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

function shortDate(timestamp) {
  if (!timestamp) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(timestamp);
}

function relativeTime(timestamp) {
  if (!timestamp) return "";
  const minutes = Math.max(1, Math.round((Date.now() - timestamp) / 60_000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return shortDate(timestamp);
}

function statusLabel(status) {
  return (
    {
      active: "In progress",
      in_progress: "In progress",
      delivered: "Delivered",
      revision_requested: "Revision",
      pending: "Pending",
      completed: "Completed",
    }[status] || status.replaceAll("_", " ")
  );
}

function Avatar({ src, name, index = 0, size = 40 }) {
  return (
    <Image
      className={styles.avatar}
      src={src || FALLBACK_AVATARS[index % FALLBACK_AVATARS.length]}
      alt={name || "Professional"}
      width={size}
      height={size}
      unoptimized
    />
  );
}

function SectionHead({ title, href, link = "View all" }) {
  return (
    <header className={styles.sectionHead}>
      <h2>{title}</h2>
      {href ? (
        <Link href={href}>
          {link}
          <ArrowRight size={14} />
        </Link>
      ) : null}
    </header>
  );
}

function EmptyState({ icon: Icon, title, text, href, action }) {
  return (
    <div className={styles.empty}>
      <span>
        <Icon size={22} />
      </span>
      <strong>{title}</strong>
      <p>{text}</p>
      {href ? (
        <Link href={href}>
          {action}
          <ArrowRight size={14} />
        </Link>
      ) : null}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div
      className={styles.skeletonPage}
      aria-label="Loading dashboard"
      role="status"
    >
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonStats}>
        {[0, 1, 2, 3].map((item) => (
          <div key={item} />
        ))}
      </div>
      <div className={styles.skeletonBody}>
        <div />
        <div />
      </div>
    </div>
  );
}

export default function DashboardInfo() {
  const router = useRouter();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const role = getActiveRole(convexUser);
  const world = convexUser?.preferredWorld || "online";
  const usesSpecializedDashboard =
    (role === "client" && world === "local") ||
    role === "local_professional" ||
    role === "candidate" ||
    role === "company";
  const overview = useQuery(
    api.marketplace.dashboard.getOverview,
    isAuthenticated && !usesSpecializedDashboard ? {} : "skip",
  );
  const totals = useDashboardMetrics(
    isAuthenticated && Boolean(convexUser?._id) && !usesSpecializedDashboard,
  );
  const onlineFreelancer =
    isAuthenticated && role === "freelancer" && world === "online";
  const profile = useQuery(
    api.marketplace.freelancers.getByUserId,
    onlineFreelancer && convexUser?._id
      ? { userId: convexUser._id, providerRole: "freelancer" }
      : "skip",
  );
  const services = useQuery(
    api.marketplace.gigs.getAllByFreelancer,
    onlineFreelancer && profile?._id ? { freelancerId: profile._id } : "skip",
  );
  const projects = useQuery(
    api.marketplace.projects.getByClient,
    isAuthenticated &&
      role === "client" &&
      world === "online" &&
      convexUser?._id
      ? { clientId: convexUser._id, limit: 1 }
      : "skip",
  );
  const acceptBid = useMutation(api.marketplace.projects.acceptBid);
  const [accepting, setAccepting] = useState(null);

  if (!isLoaded || (isAuthenticated && convexUser === undefined))
    return <DashboardSkeleton />;
  if (!isAuthenticated)
    return (
      <EmptyState
        icon={LockKeyhole}
        title="Sign in to open your dashboard"
        text="Your projects, messages and private workspaces stay protected."
        href="/login"
        action="Sign in"
      />
    );
  if (usesSpecializedDashboard)
    return <RoleDashboardInfo role={role} world={world} />;
  if (overview === undefined) return <DashboardSkeleton />;
  if (!overview) return null;

  const firstName = overview.user.name.split(" ")[0] || "there";
  const isFreelancer = role === "freelancer";
  const hasWorkHistory =
    overview.activeProjects.length > 0 ||
    overview.proposals.length > 0 ||
    overview.recentPayments.length > 0;
  const firstStep =
    !hasWorkHistory &&
    isFreelancer &&
    profile !== undefined &&
    (!profile || services !== undefined) &&
    !services?.length
      ? !profile?.tagline?.trim() || !profile?.bio?.trim()
        ? {
            href: "/my-profile",
            label: "Complete your profile",
            title: "Introduce yourself to clients",
            text: "Add a headline and a short introduction so clients understand what you can help with.",
          }
        : {
            href: "/add-services",
            label: "Create your first service",
            title: "Make your skills available",
            text: "Describe one service, choose a price and add a cover image. You can edit it after publishing.",
          }
      : !hasWorkHistory && !isFreelancer && projects?.length === 0
        ? {
            href: "/create-projects",
            label: "Post your first project",
            title: "Tell freelancers what you need",
            text: "Start with a clear brief and a budget. Review the details before publishing your project.",
          }
        : null;
  const primaryAction = isFreelancer
    ? { href: "/projects", label: "Find new projects" }
    : { href: "/create-projects", label: "Post a new project" };
  const statCards = [
    {
      label: "Active orders",
      value: totals?.activeProjects ?? "…",
      link: "/orders",
      hint: "View orders",
      icon: BriefcaseBusiness,
    },
    {
      label: isFreelancer ? "Active proposals" : "New proposals",
      value: totals?.newProposals ?? "…",
      link: isFreelancer ? "/proposal" : "/manage-projects",
      hint: "View proposals",
      icon: UserRoundPlus,
    },
    {
      label: "Unread messages",
      value: totals?.unreadMessages ?? "…",
      link: "/message",
      hint: "Open messages",
      icon: MessageSquare,
    },
  ];

  const handleAccept = async (bidId) => {
    setAccepting(bidId);
    try {
      const result = await acceptBid({ bidId });
      toast.success("Proposal accepted");
      router.push(`/orders/${result.orderId}`);
    } catch (error) {
      toast.error(error?.message || "Could not accept this proposal");
    } finally {
      setAccepting(null);
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <div>
          <h1>Hello, {firstName}</h1>
          <p>
            {isFreelancer
              ? "Here is an overview of your proposals, active work and client activity."
              : "Here is an overview of your projects and recent activity."}
          </p>
        </div>
        {!firstStep ? (
          <Button asChild>
            <Link href={primaryAction.href}>
              <Plus size={18} /> {primaryAction.label}
            </Link>
          </Button>
        ) : null}
      </div>
      {firstStep ? (
        <section
          className={styles.firstStep}
          aria-labelledby="first-step-title"
        >
          <div>
            <span>Get started</span>
            <h2 id="first-step-title">{firstStep.title}</h2>
            <p>{firstStep.text}</p>
          </div>
          <Button asChild>
            <Link href={firstStep.href}>
              {firstStep.label}
              <ArrowRight size={16} />
            </Link>
          </Button>
        </section>
      ) : null}

      <section className={styles.stats}>
        {statCards.map(({ label, value, link, hint, icon: Icon }) => (
          <Link href={link} key={label} className={styles.statCard}>
            <span className={styles.statIcon}>
              <Icon size={25} />
            </span>
            <span>
              <small>{label}</small>
              <strong>{value}</strong>
              <em>
                {hint}
                <ArrowRight size={13} />
              </em>
            </span>
          </Link>
        ))}
      </section>

      <div className={styles.workspaceGrid}>
        <div className={styles.workColumn}>
          {firstStep ? (
            <section className={styles.card}>
              <SectionHead title="Your work at a glance" />
              <div className={styles.empty}>
                <p>
                  {isFreelancer
                    ? "Your proposals and orders will appear here once you start working with a client."
                    : "Proposals will appear here after you publish a project. Accept a proposal to start an order."}
                </p>
              </div>
            </section>
          ) : null}
          {!firstStep || overview.activeProjects.length > 0 ? (
            <section className={`${styles.card} ${styles.projectsCard}`}>
              <SectionHead
                title={"Active orders"}
                href={"/orders"}
                link={"View all orders"}
              />
              {overview.activeProjects.length ? (
                <div className={styles.projectTable}>
                  <div className={styles.tableHead}>
                    <span>Project</span>
                    <span>{isFreelancer ? "Client" : "Professional"}</span>
                    <span>Progress</span>
                    <span>Status</span>
                    <span>Deadline</span>
                    <span />
                  </div>
                  {overview.activeProjects.map((project, index) => (
                    <Link
                      href={`/orders/${project.id}`}
                      className={styles.projectRow}
                      key={project.id}
                    >
                      <span>
                        <strong>{project.title}</strong>
                        <small>{project.category || "Project"}</small>
                      </span>
                      <span className={styles.person}>
                        <Avatar
                          src={project.freelancerAvatar}
                          name={project.freelancerName}
                          index={index}
                          size={34}
                        />
                        <b>
                          {project.freelancerName ||
                            (isFreelancer ? "Client" : "Matching…")}
                        </b>
                      </span>
                      <span className={styles.progressCell}>
                        <b>{project.progress}%</b>
                        <i>
                          <em style={{ width: `${project.progress}%` }} />
                        </i>
                      </span>
                      <span>
                        <b
                          className={`${styles.status} ${styles[`status_${project.status}`] || ""}`}
                        >
                          {statusLabel(project.status)}
                        </b>
                      </span>
                      <span>{shortDate(project.deadline)}</span>
                      <span>
                        <EllipsisVertical size={17} />
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={BriefcaseBusiness}
                  title={"No active orders"}
                  text={
                    isFreelancer
                      ? "Explore open projects and send a focused proposal to a strong match."
                      : "Accepted proposals and service orders appear here."
                  }
                />
              )}
            </section>
          ) : null}
          {!firstStep || overview.proposals.length > 0 ? (
            <section className={`${styles.card} ${styles.proposalsCard}`}>
              <SectionHead
                title={
                  isFreelancer ? "My recent proposals" : "Recent proposals"
                }
                href={isFreelancer ? "/proposal" : "/manage-projects"}
                link="View all proposals"
              />
              {overview.proposals.length ? (
                <div className={styles.proposalList}>
                  {overview.proposals.slice(0, 3).map((proposal, index) => (
                    <article key={proposal.id}>
                      <Avatar
                        src={proposal.freelancerAvatar}
                        name={proposal.freelancerName}
                        index={index + 1}
                        size={46}
                      />
                      <div>
                        <strong>
                          {isFreelancer
                            ? proposal.projectTitle
                            : proposal.freelancerName}
                          {proposal.isVerified && !isFreelancer ? (
                            <CheckCircle2 size={14} />
                          ) : null}
                        </strong>
                        <span>
                          {isFreelancer
                            ? proposal.status.replaceAll("_", " ")
                            : proposal.freelancerTagline ||
                              proposal.projectTitle}
                        </span>
                        <small>
                          <Star size={12} />{" "}
                          {proposal.ratingAverage
                            ? proposal.ratingAverage.toFixed(1)
                            : "New"}{" "}
                          {proposal.ratingCount
                            ? `(${proposal.ratingCount})`
                            : ""}
                        </small>
                      </div>
                      <p>
                        <span>Proposal</span>
                        <strong>
                          {money(proposal.amount, proposal.currency)}
                        </strong>
                      </p>
                      <Button asChild variant="secondary">
                        <Link
                          href={
                            isFreelancer
                              ? "/proposal"
                              : `/projects/${proposal.projectId}`
                          }
                        >
                          View
                        </Link>
                      </Button>
                      {!isFreelancer && proposal.status === "pending" ? (
                        <Button
                          type="button"
                          onClick={() => handleAccept(proposal.id)}
                          disabled={accepting === proposal.id}
                        >
                          {accepting === proposal.id ? "Accepting…" : "Accept"}
                        </Button>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={UsersRound}
                  title={
                    isFreelancer ? "No proposals sent yet" : "No proposals yet"
                  }
                  text={
                    isFreelancer
                      ? "Explore open projects and send a proposal when your experience is a strong match."
                      : "New proposals from professionals will appear here."
                  }
                />
              )}
            </section>
          ) : null}
          {!isFreelancer && overview.favorites.length > 0 ? (
            <section className={`${styles.card} ${styles.favoritesCard}`}>
              <SectionHead
                title="Saved professionals"
                href="/saved"
                link="View all saved"
              />
              {overview.favorites.length ? (
                <div className={styles.favoriteGrid}>
                  {overview.favorites.slice(0, 3).map((favorite, index) => (
                    <Link href={favorite.url} key={favorite.id}>
                      <Avatar
                        src={favorite.image}
                        name={favorite.title}
                        index={index + 1}
                        size={74}
                      />
                      <strong>{favorite.title}</strong>
                      <span>{favorite.subtitle}</span>
                      <em>
                        <Heart size={13} fill="currentColor" /> Saved
                      </em>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Heart}
                  title="No saved professionals"
                  text="Save strong profiles and compare them here later."
                  href="/online/freelancers"
                  action="Find professionals"
                />
              )}
            </section>
          ) : null}
        </div>
        <div className={styles.activityColumn}>
          <section className={`${styles.card} ${styles.messagesCard}`}>
            <SectionHead
              title="Messages"
              href="/message"
              link="View all messages"
            />
            {overview.messages.length ? (
              <div className={styles.messageList}>
                {overview.messages.slice(0, 4).map((message, index) => (
                  <Link
                    href={`/message?conversation=${message.id}`}
                    key={message.id}
                  >
                    <Avatar
                      src={message.counterpartAvatar}
                      name={message.counterpartName}
                      index={index}
                      size={36}
                    />
                    <span>
                      <strong>{message.counterpartName}</strong>
                      <small>{message.preview}</small>
                    </span>
                    <time>{relativeTime(message.lastMessageAt)}</time>
                    {message.unreadCount ? (
                      <em>{message.unreadCount}</em>
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={MessageSquare}
                title="No messages yet"
                text="Your conversations will appear here."
              />
            )}
          </section>
          {overview.deadlines.length > 0 ? (
            <section className={`${styles.card} ${styles.deadlinesCard}`}>
              <SectionHead
                title="Upcoming deadlines"
                href="/orders"
                link="View all"
              />
              {overview.deadlines.length ? (
                <div className={styles.timeline}>
                  {overview.deadlines.map((item) => {
                    const date = new Date(item.deadline);
                    return (
                      <Link href={`/orders/${item.id}`} key={item.id}>
                        <time>
                          <strong>{date.getDate()}</strong>
                          <small>
                            {date.toLocaleString("en-US", { month: "short" })}
                          </small>
                        </time>
                        <i />
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.subtitle}</small>
                        </span>
                        <em>{item.daysRemaining} days</em>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <EmptyState
                  icon={CalendarDays}
                  title="Your schedule is clear"
                  text="Upcoming order deadlines will appear here."
                />
              )}
            </section>
          ) : null}
        </div>
      </div>

      <footer className={styles.dashboardFooter}>
        <span>
          <LockKeyhole size={14} /> Secure platform
        </span>
        <span>© {new Date().getFullYear()} Skilllinkup</span>
        <nav>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/cookie-policy">Cookies</Link>
          <Link href="/help">Help</Link>
        </nav>
      </footer>
    </div>
  );
}

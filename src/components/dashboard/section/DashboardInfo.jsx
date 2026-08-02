"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import {
  ArrowRight, BellRing, BriefcaseBusiness, CalendarDays, CheckCircle2,
  ChevronLeft, ChevronRight, CircleDollarSign, Clock3, EllipsisVertical,
  Heart, LockKeyhole, MessageSquare, Plus, ShieldCheck, Star, UserRoundPlus,
  UsersRound, WalletCards,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import styles from "./DashboardInfo.module.css";

const FALLBACK_AVATARS = [
  "/images/skilllinkup-home/professional-lucas-v1.png",
  "/images/skilllinkup-home/professional-sarah-v1.png",
  "/images/skilllinkup-home/professional-yuki-v1.png",
  "/images/skilllinkup-home/professional-adaeze-v1.png",
];

function money(amount, currency = "EUR") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount || 0);
}

function shortDate(timestamp) {
  if (!timestamp) return "—";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(timestamp);
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
  return ({ active: "In progress", in_progress: "In progress", delivered: "Delivered", revision_requested: "Revision", pending: "Pending", completed: "Completed" })[status] || status.replaceAll("_", " ");
}

function Avatar({ src, name, index = 0, size = 40 }) {
  return <Image className={styles.avatar} src={src || FALLBACK_AVATARS[index % FALLBACK_AVATARS.length]} alt={name || "Professional"} width={size} height={size} unoptimized />;
}

function SectionHead({ title, href, link = "View all" }) {
  return <header className={styles.sectionHead}><h2>{title}</h2>{href ? <Link href={href}>{link}<ArrowRight size={14} /></Link> : null}</header>;
}

function EmptyState({ icon: Icon, title, text, href, action }) {
  return <div className={styles.empty}><span><Icon size={22} /></span><strong>{title}</strong><p>{text}</p>{href ? <Link href={href}>{action}<ArrowRight size={14} /></Link> : null}</div>;
}

function DashboardSkeleton() {
  return <div className={styles.skeletonPage} aria-label="Loading dashboard" role="status"><div className={styles.skeletonTitle} /><div className={styles.skeletonStats}>{[0,1,2,3].map((item) => <div key={item} />)}</div><div className={styles.skeletonBody}><div /><div /></div></div>;
}

function CalendarCard({ deadlines }) {
  const calendar = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const deadlineDays = new Set(deadlines.filter((item) => { const date = new Date(item.deadline); return date.getFullYear() === year && date.getMonth() === month; }).map((item) => new Date(item.deadline).getDate()));
    return { month: new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(now), today: now.getDate(), offset, days: Array.from({ length: daysInMonth }, (_, index) => index + 1), deadlineDays };
  }, [deadlines]);

  return <section className={`${styles.card} ${styles.calendarCard}`}><div className={styles.calendarHead}><strong>{calendar.month}</strong><span><button type="button" aria-label="Previous month"><ChevronLeft size={14} /></button><button type="button" aria-label="Next month"><ChevronRight size={14} /></button></span></div><div className={styles.weekdays}>{["Mo","Tu","We","Th","Fr","Sa","Su"].map((day) => <span key={day}>{day}</span>)}</div><div className={styles.days}>{Array.from({ length: calendar.offset }, (_, index) => <i key={`blank-${index}`} />)}{calendar.days.map((day) => <span key={day} className={`${day === calendar.today ? styles.today : ""} ${calendar.deadlineDays.has(day) ? styles.deadlineDay : ""}`}>{day}</span>)}</div><div className={styles.calendarLegend}><span><i /> Deadline</span><span><i /> Workspace</span><Link href="/orders">View calendar<ArrowRight size={13} /></Link></div></section>;
}

export default function DashboardInfo() {
  const { isLoaded, isAuthenticated } = useConvexUser();
  const overview = useQuery(api.marketplace.dashboard.getOverview, isAuthenticated ? {} : "skip");
  const acceptBid = useMutation(api.marketplace.projects.acceptBid);
  const [accepting, setAccepting] = useState(null);

  if (!isLoaded || (isAuthenticated && overview === undefined)) return <DashboardSkeleton />;
  if (!isAuthenticated) return <EmptyState icon={LockKeyhole} title="Sign in to open your dashboard" text="Your projects, messages and private workspaces stay protected." href="/login" action="Sign in" />;
  if (!overview) return null;

  const firstName = overview.user.name.split(" ")[0] || "there";
  const isFreelancer = overview.user.userType === "freelancer";
  const statCards = [
    { label: "Active projects", value: overview.stats.activeProjects, link: "/manage-projects", hint: "View projects", icon: BriefcaseBusiness },
    { label: isFreelancer ? "Active proposals" : "New proposals", value: overview.stats.newProposals, link: "/proposal", hint: "View proposals", icon: UserRoundPlus },
    { label: "Unread messages", value: overview.stats.unreadMessages, link: "/message", hint: "Open messages", icon: MessageSquare },
    { label: "Agreed scope value", value: money(overview.stats.outstandingAmount, overview.stats.currency), link: "/orders", hint: "View workspaces", icon: CircleDollarSign },
  ];
  const paymentTotal = overview.paymentMonths.reduce((sum, month) => sum + month.amount, 0);
  const chartMax = Math.max(1, ...overview.paymentMonths.map((month) => month.amount));

  const handleAccept = async (bidId) => {
    setAccepting(bidId);
    try { await acceptBid({ bidId }); toast.success("Proposal accepted"); }
    catch (error) { toast.error(error?.message || "Could not accept this proposal"); }
    finally { setAccepting(null); }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}><div><h1>Good morning, {firstName}</h1><p>Here is an overview of your projects and recent activity.</p></div><Link href="/create-projects"><Plus size={18} /> Post a new project</Link></div>

      <section className={styles.stats}>{statCards.map(({ label, value, link, hint, icon: Icon }) => <Link href={link} key={label} className={styles.statCard}><span className={styles.statIcon}><Icon size={25} /></span><span><small>{label}</small><strong>{value}</strong><em>{hint}<ArrowRight size={13} /></em></span></Link>)}</section>

      <div className={styles.topGrid}>
        <section className={`${styles.card} ${styles.projectsCard}`}><SectionHead title="Active projects" href="/manage-projects" link="View all projects" />{overview.activeProjects.length ? <div className={styles.projectTable}><div className={styles.tableHead}><span>Project</span><span>Professional</span><span>Progress</span><span>Status</span><span>Deadline</span><span /></div>{overview.activeProjects.map((project, index) => <Link href={`/dashboard/projects/${project.id}`} className={styles.projectRow} key={project.id}><span><strong>{project.title}</strong><small>{project.category || "Project"}</small></span><span className={styles.person}><Avatar src={project.freelancerAvatar} name={project.freelancerName} index={index} size={34} /><b>{project.freelancerName || "Matching…"}</b></span><span className={styles.progressCell}><b>{project.progress}%</b><i><em style={{ width: `${project.progress}%` }} /></i></span><span><b className={`${styles.status} ${styles[`status_${project.status}`] || ""}`}>{statusLabel(project.status)}</b></span><span>{shortDate(project.deadline)}</span><span><EllipsisVertical size={17} /></span></Link>)}</div> : <EmptyState icon={BriefcaseBusiness} title="No active projects yet" text="Post your first project and start receiving proposals." href="/create-projects" action="Post a project" />}</section>

        <section className={`${styles.card} ${styles.deadlinesCard}`}><SectionHead title="Upcoming deadlines" href="/orders" link="View deadlines" />{overview.deadlines.length ? <div className={styles.timeline}>{overview.deadlines.map((item) => { const date = new Date(item.deadline); return <Link href="/orders" key={item.id}><time><strong>{date.getDate()}</strong><small>{date.toLocaleString("en-US", { month: "short" })}</small></time><i /><span><strong>{item.title}</strong><small>{item.subtitle}</small></span><em>{item.daysRemaining} days</em></Link>; })}</div> : <EmptyState icon={CalendarDays} title="Your schedule is clear" text="Upcoming project deadlines will appear here." />}</section>
      </div>

      <div className={styles.middleGrid}>
        <section className={`${styles.card} ${styles.proposalsCard}`}><SectionHead title="Recent proposals" href="/proposal" link="View all proposals" />{overview.proposals.length ? <div className={styles.proposalList}>{overview.proposals.slice(0,3).map((proposal, index) => <article key={proposal.id}><Avatar src={proposal.freelancerAvatar} name={proposal.freelancerName} index={index + 1} size={46} /><div><strong>{proposal.freelancerName}{proposal.isVerified ? <CheckCircle2 size={14} /> : null}</strong><span>{proposal.freelancerTagline || proposal.projectTitle}</span><small><Star size={12} /> {proposal.ratingAverage ? proposal.ratingAverage.toFixed(1) : "New"} {proposal.ratingCount ? `(${proposal.ratingCount})` : ""}</small></div><p><span>Bid</span><strong>{money(proposal.amount, proposal.currency)}</strong></p><Link href={`/online/project/${proposal.projectId}`}>View</Link>{!isFreelancer && proposal.status === "pending" ? <button type="button" onClick={() => handleAccept(proposal.id)} disabled={accepting === proposal.id}>{accepting === proposal.id ? "Accepting…" : "Accept"}</button> : null}</article>)}</div> : <EmptyState icon={UsersRound} title="No proposals yet" text="New proposals from professionals will appear here." href="/create-projects" action="Post a project" />}</section>

        <section className={`${styles.card} ${styles.messagesCard}`}><SectionHead title="Messages" href="/message" link="View all messages" />{overview.messages.length ? <div className={styles.messageList}>{overview.messages.slice(0,4).map((message, index) => <Link href="/message" key={message.id}><Avatar src={message.counterpartAvatar} name={message.counterpartName} index={index} size={36} /><span><strong>{message.counterpartName}</strong><small>{message.preview}</small></span><time>{relativeTime(message.lastMessageAt)}</time>{message.unreadCount ? <em>{message.unreadCount}</em> : null}</Link>)}</div> : <EmptyState icon={MessageSquare} title="No messages yet" text="Conversations with professionals will appear here." />}</section>

        <CalendarCard deadlines={overview.deadlines} />
      </div>

      <div className={styles.bottomGrid}>
        <section className={`${styles.card} ${styles.paymentsCard}`}><SectionHead title="Scope value overview" href="/orders" link="View all workspaces" /><div className={styles.paymentContent}><div className={styles.chart}><span>Informational amounts · no beta payments</span><strong>{money(paymentTotal)}</strong><div className={styles.bars}>{overview.paymentMonths.map((month) => <i key={month.month}><em style={{ height: `${Math.max(8, (month.amount / chartMax) * 100)}%` }} /><small>{month.month}</small></i>)}</div></div><div className={styles.transactions}><strong>Recent agreements</strong>{overview.recentPayments.length ? overview.recentPayments.map((agreement) => <Link href="/orders" key={agreement.id}><span><strong>{agreement.title}</strong><small>{shortDate(agreement.date)}</small></span><b>{money(agreement.amount, agreement.currency)}<small>{agreement.status}</small></b></Link>) : <p>No agreed scope values recorded yet.</p>}</div></div></section>

        <section className={`${styles.card} ${styles.favoritesCard}`}><SectionHead title="Saved professionals" href="/saved" link="View all saved" />{overview.favorites.length ? <div className={styles.favoriteGrid}>{overview.favorites.slice(0,3).map((favorite, index) => <Link href={favorite.url} key={favorite.id}><Avatar src={favorite.image} name={favorite.title} index={index + 1} size={74} /><strong>{favorite.title}</strong><span>{favorite.subtitle}</span><em><Heart size={13} fill="currentColor" /> Saved</em></Link>)}</div> : <EmptyState icon={Heart} title="No saved professionals" text="Save strong profiles and compare them here later." href="/online/freelancers" action="Find professionals" />}</section>

        <section className={styles.cta}><div><ClipboardListIcon /><span><strong>Ready for your next project?</strong><p>Find the right professional and bring your idea to life.</p><Link href="/create-projects">Post a new project<ArrowRight size={15} /></Link></span></div></section>
      </div>

      <footer className={styles.dashboardFooter}><span><LockKeyhole size={14} /> Secure platform</span><span>© {new Date().getFullYear()} Skilllinkup</span><nav><Link href="/terms">Terms</Link><Link href="/privacy-policy">Privacy</Link><Link href="/cookie-policy">Cookies</Link><Link href="/help">Help</Link></nav></footer>
    </div>
  );
}

function ClipboardListIcon() {
  return <span className={styles.ctaIcon}><BellRing size={34} /><ShieldCheck size={20} /></span>;
}

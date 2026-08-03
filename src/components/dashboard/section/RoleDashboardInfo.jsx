"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  MapPin,
  MessageSquareText,
  Plus,
  Search,
  Send,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import styles from "./RoleDashboardInfo.module.css";

const configurations = {
  "client:local": {
    eyebrow: "Customer · Local",
    title: "Your local work, clearly organised",
    description: "Compare quotes, confirm appointments and follow every local job from one trusted workspace.",
    action: { href: "/local/request-quote", label: "Request local quotes", Icon: Plus },
    sectionTitle: "Recent quote requests",
    emptyTitle: "No local requests yet",
    emptyText: "Describe the job once and start receiving suitable local quotes.",
  },
  "local_professional:local": {
    eyebrow: "Local professional",
    title: "Turn nearby demand into trusted work",
    description: "Review claimed opportunities, prepare clear quotes and keep upcoming visits under control.",
    action: { href: "/local/quote-requests", label: "Browse local requests", Icon: Search },
    sectionTitle: "Claimed opportunities",
    emptyTitle: "No claimed opportunities yet",
    emptyText: "Browse suitable requests in your launch region and claim the work that fits.",
  },
  "candidate:jobs": {
    eyebrow: "Job seeker",
    title: "Keep your job search moving",
    description: "Track every application and see exactly which opportunities need your attention next.",
    action: { href: "/jobs/browse", label: "Browse genuine jobs", Icon: Search },
    sectionTitle: "Recent applications",
    emptyTitle: "No applications yet",
    emptyText: "Explore verified vacancies and submit your first application.",
  },
  "company:jobs": {
    eyebrow: "Company hiring",
    title: "Build your team from one hiring workspace",
    description: "Publish genuine vacancies, monitor applicant interest and keep every hiring decision visible.",
    action: { href: "/create-job", label: "Post a job", Icon: Plus },
    sectionTitle: "Your vacancies",
    emptyTitle: "No vacancies published yet",
    emptyText: "Create a verified vacancy and start receiving relevant applications.",
  },
};

const applicationLabels = {
  draft: "Draft",
  submitted: "Submitted",
  screening: "In screening",
  interview: "Interview",
  offer: "Offer received",
  hired: "Hired",
  rejected: "Closed",
  withdrawn: "Withdrawn",
};

function dateLabel(timestamp) {
  if (!timestamp) return "Date to be agreed";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(timestamp);
}

function LoadingState() {
  return <div className={styles.loading} role="status" aria-label="Loading your dashboard"><i /><i /><i /><i /></div>;
}

function StatCard({ label, value, hint, Icon }) {
  return <article className={styles.stat}><i><Icon size={22} /></i><span><small>{label}</small><strong>{value}</strong><em>{hint}</em></span></article>;
}

function EmptyState({ config }) {
  return <div className={styles.empty}><i><Sparkles size={25} /></i><h3>{config.emptyTitle}</h3><p>{config.emptyText}</p><Link href={config.action.href}>{config.action.label}<ArrowRight size={15} /></Link></div>;
}

export default function RoleDashboardInfo({ role, world }) {
  const { convexUser, isAuthenticated } = useConvexUser();
  const contextKey = `${role}:${world}`;
  const config = configurations[contextKey];
  const localCustomer = role === "client" && world === "local";
  const localProfessional = role === "local_professional";
  const candidate = role === "candidate";
  const company = role === "company";

  const requests = useQuery(api.marketplace.quotes.listMyRequests, isAuthenticated && localCustomer ? {} : "skip");
  const claims = useQuery(api.marketplace.leads.getMyClaims, isAuthenticated && localProfessional ? {} : "skip");
  const appointments = useQuery(api.marketplace.localAppointments.listMine, isAuthenticated && (localCustomer || localProfessional) ? { limit: 30 } : "skip");
  const applications = useQuery(api.marketplace.jobApplications.listMine, isAuthenticated && candidate ? { limit: 50 } : "skip");
  const jobs = useQuery(api.marketplace.jobs.getByClient, isAuthenticated && company && convexUser?._id ? { clientId: convexUser._id, limit: 50 } : "skip");

  if (!config || !convexUser) return <LoadingState />;
  const required = localCustomer ? [requests, appointments] : localProfessional ? [claims, appointments] : candidate ? [applications] : [jobs];
  if (required.some((value) => value === undefined)) return <LoadingState />;

  let stats;
  let items;
  let schedule = [];

  if (localCustomer) {
    const all = requests || [];
    const visits = (appointments || []).filter((item) => item.perspective === "client");
    stats = [
      { label: "Active requests", value: all.filter((item) => ["open", "matched", "accepted", "in_progress"].includes(item.status)).length, hint: "Local jobs in progress", Icon: ClipboardList },
      { label: "Quotes received", value: all.reduce((sum, item) => sum + item.quoteCount, 0), hint: "Ready to compare", Icon: MessageSquareText },
      { label: "Upcoming visits", value: visits.filter((item) => ["requested", "confirmed"].includes(item.appointment.status)).length, hint: "Planned appointments", Icon: CalendarDays },
      { label: "Completed", value: visits.filter((item) => item.appointment.status === "completed").length, hint: "Finished local jobs", Icon: CheckCircle2 },
    ];
    items = all.slice(0, 6).map((item) => ({ id: item._id, title: item.title, subtitle: item.categoryName || "Local service", status: item.status, meta: `${item.quoteCount} ${item.quoteCount === 1 ? "quote" : "quotes"}`, location: item.locationCity, href: `/local/quote-request/${item._id}` }));
    schedule = visits.slice(0, 5).map((item) => ({ id: item.appointment._id, title: item.request?.title || "Local appointment", subtitle: item.professionalName, status: item.appointment.status, date: item.appointment.scheduledStart }));
  } else if (localProfessional) {
    const all = claims || [];
    const visits = (appointments || []).filter((item) => item.perspective === "professional");
    stats = [
      { label: "Claimed leads", value: all.length, hint: "Qualified opportunities", Icon: FileSearch },
      { label: "Active requests", value: all.filter((item) => item.request && ["open", "matched", "accepted", "in_progress"].includes(item.request.status)).length, hint: "Still moving", Icon: BriefcaseBusiness },
      { label: "Upcoming visits", value: visits.filter((item) => ["requested", "confirmed"].includes(item.appointment.status)).length, hint: "Planned appointments", Icon: CalendarDays },
      { label: "Completed", value: visits.filter((item) => item.appointment.status === "completed").length, hint: "Finished jobs", Icon: CheckCircle2 },
    ];
    items = all.slice(0, 6).map((item) => ({ id: item._id, title: item.request?.title || "Local opportunity", subtitle: item.categoryName || "Local service", status: item.request?.status || "closed", meta: item.claimType === "exclusive" ? "Exclusive lead" : "Shared lead", location: item.request?.locationCity, href: item.request?._id ? `/local/quote-request/${item.request._id}` : "/local/quote-requests" }));
    schedule = visits.slice(0, 5).map((item) => ({ id: item.appointment._id, title: item.request?.title || "Local appointment", subtitle: item.request?.locationCity || "Location shared privately", status: item.appointment.status, date: item.appointment.scheduledStart }));
  } else if (candidate) {
    const all = applications || [];
    stats = [
      { label: "Applications", value: all.length, hint: "Submitted vacancies", Icon: Send },
      { label: "In review", value: all.filter((item) => ["submitted", "screening"].includes(item.application.status)).length, hint: "Employer reviewing", Icon: FileSearch },
      { label: "Interviews", value: all.filter((item) => item.application.status === "interview").length, hint: "Conversations planned", Icon: UsersRound },
      { label: "Offers", value: all.filter((item) => ["offer", "hired"].includes(item.application.status)).length, hint: "Positive outcomes", Icon: Sparkles },
    ];
    items = all.slice(0, 8).map((item) => ({ id: item.application._id, title: item.job.title, subtitle: item.job.company || "Verified company", status: item.application.status, meta: item.job.workType || "Job", location: item.job.locationCity, href: `/jobs/job/${item.job.id}` }));
  } else {
    const all = jobs || [];
    stats = [
      { label: "Active vacancies", value: all.filter((item) => item.status === "open").length, hint: "Currently accepting", Icon: BriefcaseBusiness },
      { label: "Applications", value: all.reduce((sum, item) => sum + (item.applicationCount || 0), 0), hint: "Across your vacancies", Icon: UsersRound },
      { label: "Draft or paused", value: all.filter((item) => ["draft", "paused"].includes(item.status)).length, hint: "Needs attention", Icon: FileSearch },
      { label: "Filled roles", value: all.filter((item) => item.status === "filled").length, hint: "Successful hires", Icon: CheckCircle2 },
    ];
    items = all.slice(0, 8).map((item) => ({ id: item._id, title: item.title, subtitle: item.company || "Your company", status: item.status, meta: `${item.applicationCount || 0} applicants`, location: item.locationCity || item.workType, href: `/manage-jobs/${item._id}/applications` }));
  }

  const firstName = convexUser.name?.split(" ")[0] || "there";
  const ActionIcon = config.action.Icon;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div><span>{config.eyebrow}</span><h1>Good morning, {firstName}</h1><h2>{config.title}</h2><p>{config.description}</p></div>
        <Link href={config.action.href}><ActionIcon size={18} />{config.action.label}</Link>
      </header>
      <section className={styles.stats}>{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</section>
      <div className={styles.contentGrid} data-has-schedule={schedule.length ? "true" : "false"}>
        <section className={styles.panel}>
          <header><h2>{config.sectionTitle}</h2><Link href={config.action.href}>View all <ArrowRight size={14} /></Link></header>
          {items.length ? <div className={styles.list}>{items.map((item) => <Link href={item.href} key={item.id}><i><BriefcaseBusiness size={19} /></i><span><strong>{item.title}</strong><small>{item.subtitle}</small><em>{item.location ? <><MapPin size={12} />{item.location}</> : null}</em></span><b><small>{candidate ? applicationLabels[item.status] || item.status : item.status.replaceAll("_", " ")}</small><strong>{item.meta}</strong></b><ArrowRight size={16} /></Link>)}</div> : <EmptyState config={config} />}
        </section>
        {schedule.length ? <section className={`${styles.panel} ${styles.schedule}`}><header><h2>Upcoming appointments</h2></header><div>{schedule.map((item) => <article key={item.id}><time><CalendarDays size={16} />{dateLabel(item.date)}</time><strong>{item.title}</strong><span>{item.subtitle}</span><small>{item.status.replaceAll("_", " ")}</small></article>)}</div></section> : null}
      </div>
      <section className={styles.trust}><span><CheckCircle2 /> Clear status tracking</span><span><MessageSquareText /> Communication in one place</span><span><CalendarDays /> Dates and next steps visible</span></section>
    </div>
  );
}

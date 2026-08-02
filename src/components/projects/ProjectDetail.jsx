"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "convex/react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Clock3,
  Download,
  FileArchive,
  FileText,
  Headphones,
  Heart,
  HelpCircle,
  MapPin,
  MessageSquare,
  Send,
  Share2,
  ShieldCheck,
  Star,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import useConvexProjectDetail from "@/hook/useConvexProjectDetail";
import useConvexUser from "@/hook/useConvexUser";
import BidForm from "@/components/element/BidForm";
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
  deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18).getTime(),
  createdAt: Date.now() - 1000 * 60 * 60 * 2,
  categoryName: "Interior & Design",
  clientName: "Greenhaus Living",
  clientAvatar: "/images/logo/skilllinkup-link-logo-light.png",
};

const deliverables = [
  "Design a unique, responsive website in Figma",
  "Create three to four distinct homepage concepts",
  "Design every important landing page and content page",
  "Build a clear, user-friendly navigation structure",
  "Create a consistent look, feel and component library",
  "Collaborate with our developer for a smooth handover",
];

const requirements = [
  "Demonstrable web design experience and a strong portfolio",
  "A strong feeling for UX/UI and visual hierarchy",
  "Experience with sustainable or creative brands is a plus",
  "Structured working style and clear communication",
  "Available to start within two weeks",
];

const attachments = [
  { name: "Brand_Guidelines.pdf", size: "2.4 MB", icon: FileText },
  { name: "Sitemap.pdf", size: "1.1 MB", icon: FileText },
  { name: "Visual_References.zip", size: "6.7 MB", icon: FileArchive },
];

const milestones = [
  {
    title: "Project start",
    detail: "Within 2 weeks after assignment",
    active: true,
  },
  { title: "Concept direction", detail: "3 days after start" },
  { title: "Design concepts", detail: "7 days after start" },
  { title: "Design refinement", detail: "10 days after start" },
  { title: "Figma handover", detail: "15 days after start" },
];

const questions = [
  {
    question:
      "Is there an existing brand identity we should take into account?",
    author: "Lisa, Web designer",
    answer:
      "Yes, we added our brand guidelines to the attachments. We are happy to clarify anything you need.",
    client: "Daan, Client",
  },
  {
    question: "Would you also like the website development included?",
    author: "Mark, UX designer",
    answer:
      "Development is handled in-house. We would appreciate a short handover period after delivery.",
    client: "Daan, Client",
  },
];

function money(value, currency = "EUR") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value || 0);
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
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);

  useEffect(() => {
    if (liveProject !== undefined) return;
    const timer = setTimeout(() => setShowDemo(true), 1300);
    return () => clearTimeout(timer);
  }, [liveProject]);

  const isDemoRoute = id === "sustainable-interior-brand" || id === "demo";
  const project =
    liveProject ||
    ((showDemo || liveProject === null) && isDemoRoute ? demoProject : null);
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
    if (real.length === 4) return real;
    return [
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
    ];
  }, [similarProjects, project?._id]);

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
  const skills = project.requiredSkills?.length
    ? project.requiredSkills
    : demoProject.requiredSkills;
  const description = project.description || demoProject.description;

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

        <div className={styles.layout}>
          <div className={styles.content}>
            <header className={styles.hero}>
              <div className={styles.titleLine}>
                <h1>{project.title}</h1>
                <div className={styles.headerActions}>
                  <button
                    onClick={() => setSaved((value) => !value)}
                    className={saved ? styles.saved : ""}
                  >
                    <Heart size={17} fill={saved ? "currentColor" : "none"} />
                    {saved ? "Saved" : "Save"}
                  </button>
                  <button onClick={shareProject}>
                    <Share2 size={17} />
                    {shared ? "Copied" : "Share"}
                  </button>
                </div>
              </div>
              <div className={styles.badges}>
                <span className={styles.openBadge}>Open</span>
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
                {money(project.budgetMin || 2500, currency)} –{" "}
                {money(project.budgetMax || 4000, currency)}
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
              <Fact icon={UsersRound} label="Experience">
                Intermediate
              </Fact>
            </section>

            <section className={styles.textSection}>
              <h2>About the project</h2>
              <p>{description}</p>
              <div className={styles.contextTags}>
                <span>
                  <strong>Industry:</strong>{" "}
                  {project.categoryName || "Interior & Design"}
                </span>
                <span>
                  <strong>Goal:</strong> Inform and convert
                </span>
              </div>
            </section>
            <section className={styles.textSection}>
              <h2>What will you do?</h2>
              <ul className={styles.checkList}>
                {deliverables.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className={styles.textSection}>
              <h2>What are we looking for?</h2>
              <ul className={styles.checkList}>
                {requirements.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.textSection}>
              <h2>Preferred skills</h2>
              <div className={styles.skills}>
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>

            <section className={styles.textSection}>
              <h2>Attachments</h2>
              <div className={styles.attachments}>
                <div>
                  {attachments.map(({ name, size, icon: Icon }) => (
                    <button type="button" key={name}>
                      <Icon size={17} />
                      <span>{name}</span>
                      <small>{size}</small>
                    </button>
                  ))}
                </div>
                <button className={styles.downloadAll}>
                  <Download size={17} />
                  Download all files
                </button>
              </div>
            </section>

            <section className={styles.textSection}>
              <h2>Planning & milestones</h2>
              <div className={styles.timeline}>
                {milestones.map((item) => (
                  <div
                    key={item.title}
                    className={item.active ? styles.activeMilestone : ""}
                  >
                    <i />
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.textSection}>
              <div className={styles.sectionTitle}>
                <h2>Questions & answers</h2>
                <button onClick={() => setQuestionOpen((value) => !value)}>
                  <MessageSquare size={17} />
                  Ask a question
                </button>
              </div>
              {questionOpen && (
                <div className={styles.questionComposer}>
                  <input placeholder="Write your question about this project…" />
                  <button type="button">Continue</button>
                </div>
              )}
              <div className={styles.questions}>
                {questions.map((item) => (
                  <article key={item.question}>
                    <header>
                      <strong>{item.question}</strong>
                      <time>1 hour ago</time>
                    </header>
                    <p>
                      <span>{item.author}</span>
                      {item.answer}
                    </p>
                    <small>{item.client} · 45 minutes ago</small>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.proposalSection} ref={proposalRef}>
              <h2>Send your proposal</h2>
              {!isLoaded ? (
                <div className={styles.formSkeleton} />
              ) : !isAuthenticated ? (
                <div className={styles.signInPrompt}>
                  <p>
                    Sign in to introduce yourself, share your price and propose
                    a delivery date.
                  </p>
                  <Link href="/login">
                    Sign in to propose <ArrowRight size={16} />
                  </Link>
                </div>
              ) : isOwner ? (
                <p className={styles.ownerNote}>
                  This is your project. You can review proposals in your
                  dashboard.
                </p>
              ) : project._id !== "demo-project" ? (
                <BidForm projectId={project._id} />
              ) : (
                <div className={styles.signInPrompt}>
                  <p>The proposal form becomes active for live projects.</p>
                  <Link href="/projects">
                    Explore live projects <ArrowRight size={16} />
                  </Link>
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
              <h2>Interested in this project?</h2>
              <div className={styles.responses}>
                <div>
                  {[
                    "/images/team/fl-1.png",
                    "/images/team/fl-2.png",
                    "/images/team/fl-3.png",
                  ].map((src) => (
                    <Image key={src} src={src} alt="" width={30} height={30} />
                  ))}
                </div>
                <span>
                  <strong>{project.bidCount || 0} freelancers</strong> have
                  responded
                </span>
              </div>
              <div className={styles.deadline}>
                <span>Application deadline</span>
                <strong>
                  {project.deadline
                    ? new Date(project.deadline).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Open until filled"}
                </strong>
              </div>
              <button
                className={styles.proposalButton}
                onClick={scrollToProposal}
              >
                <Send size={17} />
                Send a proposal
              </button>
              <button
                className={styles.questionButton}
                onClick={() => setQuestionOpen(true)}
              >
                <HelpCircle size={17} />
                Ask a question
              </button>
              <div className={styles.trustList}>
                <TrustRow
                  icon={ShieldCheck}
                  title="Protected payment"
                  text="Your payment is secured"
                />
                <TrustRow
                  icon={WalletCards}
                  title="Pay after delivery"
                  text="Release funds when satisfied"
                />
                <TrustRow
                  icon={Headphones}
                  title="Personal support"
                  text="We are here when you need us"
                />
              </div>
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
                    {project.clientName || "Verified client"}
                    <BadgeCheck size={16} />
                  </strong>
                  <small>
                    <BadgeCheck size={14} />
                    Verified company
                  </small>
                </span>
              </div>
              <div className={styles.clientRating}>
                <Star size={17} fill="currentColor" />
                <strong>4.8 / 5</strong>
                <span>32 reviews</span>
              </div>
              <dl>
                <div>
                  <dt>
                    <CalendarDays size={16} />
                    Member since
                  </dt>
                  <dd>March 2022</dd>
                </div>
                <div>
                  <dt>
                    <BriefcaseBusiness size={16} />
                    Projects posted
                  </dt>
                  <dd>8</dd>
                </div>
                <div>
                  <dt>
                    <Clock3 size={16} />
                    Average response
                  </dt>
                  <dd>2 hours</dd>
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

      <section className={styles.similarSection}>
        <div className={styles.shell}>
          <div className={styles.sectionTitle}>
            <h2>Similar projects</h2>
            <Link href="/projects">
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.similarGrid}>
            {similar.map((item, index) => (
              <Link
                key={item._id}
                href={
                  item.slug
                    ? `/online/project/${item.slug}`
                    : "/projects"
                }
              >
                <div>
                  {index === 0 && (
                    <span className={styles.miniFeatured}>Featured</span>
                  )}
                  <Heart size={17} />
                </div>
                <h3>{item.title}</h3>
                <small>Fixed price</small>
                <strong>
                  {money(item.budgetMin || 1200)} –{" "}
                  {money(item.budgetMax || 2500)}
                </strong>
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

      <div className={styles.shell}>
        <section className={styles.projectAlert}>
          <div>
            <Send size={30} />
            <span>
              <h2>Receive new projects in your inbox</h2>
              <p>
                Get notified when new work matches your skills and preferences.
              </p>
            </span>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
            />
            <button type="submit">Subscribe</button>
          </form>
        </section>
        <section className={styles.bottomTrust}>
          <TrustRow
            icon={ShieldCheck}
            title="Clear milestones"
            text="Delivery and approval recorded"
          />
          <TrustRow
            icon={BadgeCheck}
            title="Verified companies"
            text="Clients are manually reviewed"
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

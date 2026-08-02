"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "convex/react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Globe2,
  Heart,
  LockKeyhole,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import useConvexFreelancerDetail from "@/hook/useConvexFreelancerDetail";
import ContactButton from "@/components/ui/ContactButton";
import { FreelancerProfileSkeleton } from "@/components/loading/PageSkeletons";
import ReportButton from "@/components/trust/ReportButton";
import styles from "./FreelancerProfile.module.css";

const DEMO_REFERENCE_DATE = new Date("2026-07-01T12:00:00Z").getTime();

const demoProfile = {
  _id: "demo-profile",
  userId: null,
  displayName: "Lisa de Jong",
  tagline: "Web designer & UX/UI specialist",
  bio: "Hi! I’m Lisa, a passionate web designer and UX/UI specialist based in Rotterdam. I help ambitious brands turn ideas into clear, inviting digital experiences that feel effortless to use.\n\nWith more than six years of experience combining strategy, design and technology, I create websites that look polished and work hard for your business. I value honest communication, thoughtful details and long-term partnerships.",
  avatarUrl: "/images/skilllinkup-home/professional-sarah-v1.png",
  hourlyRate: 75,
  workType: "remote",
  locationCity: "Rotterdam",
  locationCountry: "Netherlands",
  languages: ["Dutch", "English"],
  skills: ["Web design", "UX/UI design", "Figma", "Webflow", "WordPress", "HTML/CSS", "SEO"],
  isVerified: true,
  responseTimeHours: 2,
  completionRate: 100,
  totalOrders: 64,
  activeProjects: 3,
  openSlots: 2,
  ratingAverage: 5,
  ratingCount: 56,
  isAvailable: true,
  createdAt: new Date("2020-07-01T12:00:00Z").getTime(),
};

const demoServices = [
  { _id: "service-1", title: "Custom business website", description: "A complete website designed around your brand and goals.", price: 75 },
  { _id: "service-2", title: "UX/UI design", description: "Friendly interfaces that create a smooth customer journey.", price: 70 },
  { _id: "service-3", title: "Website optimisation", description: "Faster, easier to find and built for stronger conversion.", price: 60 },
];

const demoPortfolio = [
  { title: "GreenLeaf — Sustainable brand", tags: ["Web design", "WordPress"], spritePosition: "0% 0%" },
  { title: "Studio Noord — Architecture", tags: ["Web design", "UX/UI"], spritePosition: "50% 0%" },
  { title: "Flow Yoga — Wellness platform", tags: ["Web design", "Branding"], spritePosition: "100% 0%" },
  { title: "Puur Koffie — E-commerce", tags: ["Shopify", "Web design"], spritePosition: "0% 100%" },
  { title: "Bright Agency — Creative studio", tags: ["UX/UI", "Development"], spritePosition: "50% 100%" },
  { title: "Minimal Living — Editorial blog", tags: ["Web design", "SEO"], spritePosition: "100% 100%" },
];

const demoExperience = [
  { _id: "exp-1", title: "Freelance web designer", company: "Lisa de Jong Design", startDate: new Date("2021-01-01").getTime(), isCurrent: true, description: "Web design, UX/UI and brand systems for international clients." },
  { _id: "exp-2", title: "Web designer", company: "Digital Creators", startDate: new Date("2019-01-01").getTime(), endDate: new Date("2021-01-01").getTime(), description: "Designed and developed conversion-focused websites for growing teams." },
  { _id: "exp-3", title: "Graphic designer", company: "Studio Pixel", startDate: new Date("2016-01-01").getTime(), endDate: new Date("2019-01-01").getTime(), description: "Visual concepts, identity systems and digital campaigns." },
];

const demoEducation = [
  { _id: "edu-1", degree: "Bachelor of Communication & Multimedia Design", school: "Rotterdam University of Applied Sciences", startYear: 2012, endYear: 2016 },
];

const demoReviews = [
  { _id: "review-1", reviewerName: "Sample client A", reviewerAvatar: "/images/skilllinkup-home/testimonial-maya-v1.png", overallRating: 5, content: "Illustrative feedback showing how a completed collaboration could appear.", createdAt: DEMO_REFERENCE_DATE - 1000 * 60 * 60 * 24 * 14 },
  { _id: "review-2", reviewerName: "Sample client B", reviewerAvatar: "/images/skilllinkup-home/testimonial-daniel-v1.png", overallRating: 5, content: "Example review content for this product preview; this is not a real endorsement.", createdAt: DEMO_REFERENCE_DATE - 1000 * 60 * 60 * 24 * 22 },
];

const fallbackPeople = [
  { _id: "similar-1", displayName: "Emma van Dijk", tagline: "Web designer", avatarUrl: "/images/skilllinkup-home/professional-sarah-v1.png", ratingAverage: 4.9, ratingCount: 48, locationCity: "Utrecht", hourlyRate: 70 },
  { _id: "similar-2", displayName: "Rik Janssen", tagline: "UX/UI designer", avatarUrl: "/images/skilllinkup-home/professional-lucas-v1.png", ratingAverage: 5, ratingCount: 62, locationCity: "Amsterdam", hourlyRate: 80 },
  { _id: "similar-3", displayName: "Nina Bakker", tagline: "Web designer", avatarUrl: "/images/skilllinkup-home/professional-yuki-v1.png", ratingAverage: 4.8, ratingCount: 37, locationCity: "The Hague", hourlyRate: 65 },
  { _id: "similar-4", displayName: "Tom de Wit", tagline: "WordPress expert", avatarUrl: "/images/skilllinkup-home/professional-adaeze-v1.png", ratingAverage: 5, ratingCount: 55, locationCity: "Rotterdam", hourlyRate: 60 },
];

function Stars({ value = 5, small = false }) {
  return <span className={styles.stars} aria-label={`${value} out of 5 stars`}>{[0, 1, 2, 3, 4].map((n) => <Star key={n} size={small ? 13 : 16} fill={n < Math.round(value) ? "currentColor" : "none"} />)}</span>;
}

function SectionHeading({ title, linkLabel, href = "#" }) {
  return <div className={styles.sectionHeading}><h2>{title}</h2>{linkLabel && <Link href={href}>{linkLabel}<ArrowRight size={16} /></Link>}</div>;
}

function formatPeriod(item) {
  const year = (date) => date ? new Date(date).getFullYear() : null;
  return `${year(item.startDate) || item.startYear || ""} — ${item.isCurrent ? "Present" : year(item.endDate) || item.endYear || "Present"}`;
}

function BookingCard({ profile }) {
  const [selectedDay, setSelectedDay] = useState(12);
  const now = new Date();
  const monthName = now.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const blanks = (firstDay + 6) % 7;

  return <aside className={styles.bookingCard}>
    <div className={styles.rate}><strong>{profile.hourlyRate ? `€${profile.hourlyRate}` : "Rate on request"}</strong>{profile.hourlyRate ? <span>/ per hour</span> : null}</div>
    <div className={styles.available}><span />{profile.isAvailable ? "Available for new projects" : "Availability by arrangement"}</div>
    <div className={styles.calendarTitle}><span>Select a date</span><div><button aria-label="Previous month"><ChevronLeft size={16} /></button><strong>{monthName}</strong><button aria-label="Next month"><ChevronRight size={16} /></button></div></div>
    <div className={styles.calendarWeek}>{["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => <span key={day}>{day}</span>)}</div>
    <div className={styles.calendarGrid}>{Array.from({ length: blanks }, (_, i) => <span key={`b-${i}`} />)}{Array.from({ length: days }, (_, i) => i + 1).map((day) => <button key={day} className={selectedDay === day ? styles.selectedDay : ""} onClick={() => setSelectedDay(day)}>{day}</button>)}</div>
    <div className={styles.bookingFacts}>
      <p><Clock3 size={18} /><span><strong>Response time</strong>{profile.responseTimeHours ? `Usually within ${profile.responseTimeHours} hours` : "Not published yet"}</span></p>
      <p><ShieldCheck size={18} /><span><strong>Clear beta agreement</strong>Record scope, delivery and approval</span></p>
    </div>
    {profile.userId ? <ContactButton recipientId={profile.userId} className={styles.contactButton} /> : <Link href="/sign-up" className={styles.contactButton}><MessageCircle size={18} />Contact freelancer</Link>}
    <Link href="/online/projects/create" className={styles.offerButton}><FileText size={17} />Request a quote</Link>
    <div className={styles.secureNote}><LockKeyhole size={18} /><span><strong>Your details stay private</strong>No payment or escrow is active during beta.</span></div>
  </aside>;
}

export default function FreelancerProfile() {
  const { id } = useParams();
  const liveProfile = useConvexFreelancerDetail(id);
  const [showDemo, setShowDemo] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (liveProfile !== undefined) return;
    const timer = setTimeout(() => setShowDemo(true), 1400);
    return () => clearTimeout(timer);
  }, [liveProfile]);

  const isDemoRoute = id === "lisa-de-jong" || id === "demo";
  const profile = liveProfile || ((showDemo || liveProfile === null) && isDemoRoute ? demoProfile : null);
  const profileId = profile && profile._id !== "demo-profile" ? profile._id : null;
  const userId = profile?.userId || null;

  const gigs = useQuery(api.marketplace.gigs.getByFreelancerWithPackages, profileId ? { freelancerId: profileId } : "skip");
  const portfolio = useQuery(api.marketplace.portfolio.getByUser, userId ? { userId } : "skip");
  const experience = useQuery(api.marketplace.experience.getWorkExperience, userId ? { userId } : "skip");
  const education = useQuery(api.marketplace.experience.getEducation, userId ? { userId } : "skip");
  const reviews = useQuery(api.marketplace.reviews.getByFreelancer, profileId ? { freelancerId: profileId, limit: 8 } : "skip");
  const similar = useQuery(api.marketplace.freelancers.list, { locale: "en", limit: 5 });

  const isDemoProfile = profile?._id === "demo-profile";
  const serviceItems = gigs?.length ? gigs.slice(0, 3).map((gig) => ({ ...gig, price: gig.packages?.[0]?.price || profile?.hourlyRate })) : isDemoProfile ? demoServices : [];
  const portfolioItems = portfolio?.length ? portfolio.slice(0, 6).map((item, index) => ({ ...item, image: item.imageUrls?.[0], spritePosition: item.imageUrls?.[0] ? null : demoPortfolio[index % demoPortfolio.length].spritePosition })) : isDemoProfile ? demoPortfolio : [];
  const experienceItems = experience?.length ? experience : isDemoProfile ? demoExperience : [];
  const educationItems = education?.length ? education : isDemoProfile ? demoEducation : [];
  const reviewItems = reviews?.length ? reviews : isDemoProfile ? demoReviews : [];
  const similarItems = useMemo(() => {
    const filtered = similar?.filter((person) => person._id !== profileId) || [];
    return filtered.length ? filtered.slice(0, 4) : isDemoProfile ? fallbackPeople : [];
  }, [similar, profileId, isDemoProfile]);

  if (!profile && liveProfile === undefined) return <FreelancerProfileSkeleton />;
  if (!profile) return <div className={styles.state}><h1>Profile not found</h1><Link href="/online/freelancers">Browse freelancers</Link></div>;

  const location = [profile.locationCity, profile.locationCountry].filter(Boolean).join(", ");
  const avatar = profile.avatarUrl || "/images/team/default-avatar.svg";
  const skills = profile.skills?.length ? profile.skills : isDemoProfile ? demoProfile.skills : [];

  return <main className={styles.page}>
    <div className={styles.shell}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/online/freelancers">Freelancers</Link><span>/</span><span>{profile.displayName}</span></nav>
      {isDemoProfile && <aside className={styles.previewNotice}><strong>Illustrative profile preview</strong><span>This page demonstrates the intended experience. Lisa, the services, work history and feedback shown here are not live marketplace records.</span></aside>}

      <div className={styles.topGrid}>
        <div>
          <article className={styles.profileCard}>
            <div className={styles.portrait}><Image src={avatar} alt={profile.displayName} fill sizes="(max-width: 720px) 100vw, 300px" priority /></div>
            <div className={styles.profileIntro}>
              <div className={styles.nameRow}><h1>{profile.displayName}</h1>{profile.isVerified && <BadgeCheck size={22} aria-label="Verified profile" />}</div>
              <p className={styles.tagline}>{profile.tagline || "Independent professional"}</p>
              <div className={styles.metaRow}><span><Star size={17} fill="currentColor" /> <strong>{(profile.ratingAverage || 0).toFixed(1)}</strong> ({profile.ratingCount || 0} reviews)</span>{location && <span><MapPin size={16} />{location}</span>}<span><Globe2 size={16} />Online</span></div>
              <div className={styles.statusRow}><span>{profile.responseTimeHours ? `Typically responds in ${profile.responseTimeHours} hours` : "Response time not published"}</span>{profile.isAvailable && <span><i />Available</span>}</div>
              <div className={styles.skillRow}>{skills.slice(0, 8).map((skill) => <span key={skill}>{skill}</span>)}</div>
            </div>
            <div className={styles.profileActions}>{profile.userId ? <ContactButton recipientId={profile.userId} className={styles.primaryAction} /> : <Link className={styles.primaryAction} href="/sign-up"><MessageCircle size={18} />Send a message</Link>}<button onClick={() => setSaved((value) => !value)} className={saved ? styles.saved : ""}><Heart size={18} fill={saved ? "currentColor" : "none"} />{saved ? "Saved" : "Save"}</button></div>
          </article>
          {profile._id !== "demo-profile" ? (
            <ReportButton
              targetType="freelancer"
              targetId={profile._id}
              targetLabel={profile.displayName}
            />
          ) : null}

          <section className={styles.workOverview} aria-label="Work overview">
            <div className={styles.workOverviewTitle}><span>Work overview</span><small>Updated today</small></div>
            <div className={`${styles.workStat} ${styles.workStatOpen}`}><i><BriefcaseBusiness size={18} /></i><div><strong>{profile.openSlots ?? (profile.isAvailable !== false ? 2 : 0)}</strong><span>Open spots</span></div><em>Available</em></div>
            <div className={`${styles.workStat} ${styles.workStatPending}`}><i><Clock3 size={18} /></i><div><strong>{profile.activeProjects ?? (profile._id === "demo-profile" ? 3 : 0)}</strong><span>In progress</span></div><em>Pending</em></div>
            <div className={`${styles.workStat} ${styles.workStatDone}`}><i><Check size={18} /></i><div><strong>{profile.totalOrders || 0}</strong><span>Completed</span></div><em>Done</em></div>
          </section>

          <section className={styles.about}><SectionHeading title="About me" /><p>{profile.bio || "This professional has not added a biography yet."}</p><div className={styles.highlights}><span><BriefcaseBusiness size={18} /><strong>{isDemoProfile ? "6+ years" : profile.totalOrders ? "Active" : "New"}</strong> profile</span><span><UsersRound size={18} /><strong>{profile.totalOrders || 0}</strong> completed projects</span><span><Check size={18} /><strong>{profile.completionRate || 0}%</strong> completion rate</span></div></section>
        </div>
        <BookingCard profile={profile} />
      </div>

      <section className={styles.section}><SectionHeading title="My services" linkLabel="View all services" href="/online/services" />{serviceItems.length ? <div className={styles.serviceGrid}>{serviceItems.map((service, index) => <article key={service._id || service.title}><div className={styles.serviceIcon}>{[<Globe2 key="a" />, <BadgeCheck key="b" />, <BriefcaseBusiness key="c" />][index]}</div><div><h3>{service.title}</h3><p>{service.description}</p><strong>From <em>€{service.price || profile.hourlyRate || 0} / hour</em></strong></div></article>)}</div> : <p className={styles.emptySection}>No services have been published yet.</p>}</section>

      <section className={styles.section}><SectionHeading title="Portfolio" linkLabel="View all projects" />{portfolioItems.length ? <div className={styles.portfolioGrid}>{portfolioItems.map((item) => <article key={item._id || item.title}><div className={styles.portfolioImage}>{item.image ? <Image src={item.image} alt={item.title} fill sizes="(max-width: 720px) 100vw, 33vw" /> : <span role="img" aria-label={item.title} style={{ backgroundPosition: item.spritePosition }} />}</div><div><h3>{item.title}</h3><p>{(item.tags || []).join(" · ")}</p></div></article>)}</div> : <p className={styles.emptySection}>No portfolio work has been published yet.</p>}</section>

      <section className={styles.resumeSection}><div><SectionHeading title="Experience & education" />{experienceItems.length || educationItems.length ? <div className={styles.timeline}>{experienceItems.map((item) => <article key={item._id}><span /><time>{formatPeriod(item)}</time><div><h3>{item.title}</h3><strong>{item.company}</strong><p>{item.description}</p></div></article>)}{educationItems.map((item) => <article key={item._id}><span /><time>{formatPeriod(item)}</time><div><h3>{item.degree || item.field || "Education"}</h3><strong>{item.school}</strong><p>{item.description}</p></div></article>)}</div> : <p className={styles.emptySection}>No work history has been added yet.</p>}</div><div><SectionHeading title="Skills" />{skills.length ? <div className={styles.skillsPanel}>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div> : <p className={styles.emptySection}>No skills have been added yet.</p>}</div></section>

      <section className={styles.section}><SectionHeading title={isDemoProfile ? "Illustrative feedback" : "Reviews"} />{reviewItems.length ? <div className={styles.reviewsLayout}><aside className={styles.reviewSummary}><strong>{(profile.ratingAverage || 0).toFixed(1)}<small>/ 5</small></strong><Stars value={profile.ratingAverage || 0} /><p>Based on {profile.ratingCount || reviewItems.length} {isDemoProfile ? "sample entries" : "reviews"}</p>{[5,4,3,2,1].map((n) => <div key={n}><span>{n} stars</span><i><b style={{ width: n === 5 ? "100%" : "0%" }} /></i><span>{n === 5 ? profile.ratingCount || reviewItems.length : 0}</span></div>)}</aside><div className={styles.reviewGrid}>{reviewItems.slice(0, 4).map((review) => <article key={review._id}><header><Image src={review.reviewerAvatar || "/images/team/default-avatar.svg"} alt="" width={44} height={44} /><div><strong>{review.reviewerName || "Client"}</strong><span>{isDemoProfile ? "Illustrative feedback" : "Verified collaboration"}</span></div></header><div className={styles.reviewRating}><Stars value={review.overallRating} small /><strong>{review.overallRating.toFixed(1)}</strong></div><p>{review.content}</p><time>{new Date(review.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</time></article>)}</div></div> : <p className={styles.emptySection}>No reviews have been published yet.</p>}</section>

      <section className={styles.section}><SectionHeading title="Availability" />{isDemoProfile ? <><div className={styles.availability}>{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => <div key={day}><strong>{day}</strong>{index < 5 ? <><span>09:00 – 17:00</span><em><i />Available</em></> : <span>Closed</span>}</div>)}</div><p className={styles.timezone}><Clock3 size={15} /> Illustrative schedule in Netherlands time (CET)</p></> : <p className={styles.emptySection}>{profile.isAvailable ? "Available for new work. Agree exact dates in the workspace." : "Not currently accepting new work."}</p>}</section>

      {similarItems.length > 0 && <section className={styles.section}><SectionHeading title={isDemoProfile ? "Illustrative related profiles" : "Similar freelancers"} linkLabel="View all freelancers" href="/online/freelancers" /><div className={styles.similarGrid}>{similarItems.map((person) => <Link href={person.slug ? `/online/freelancer/${person.slug}` : "/online/freelancers"} key={person._id}><Image src={person.avatarUrl || "/images/team/default-avatar.svg"} alt={person.displayName} width={64} height={64} /><div><h3>{person.displayName}</h3><p>{person.tagline}</p><span><Star size={13} fill="currentColor" />{person.ratingAverage || 0} ({person.ratingCount || 0}) · <MapPin size={13} />{person.locationCity || "Online"}</span><strong>{person.hourlyRate ? `From €${person.hourlyRate} / hour` : "Rate on request"}</strong></div></Link>)}</div></section>}

      <section className={styles.cta}><div className={styles.ctaIcon}><ShieldCheck /></div><div><h2>Need talent for your project?</h2><p>Post a project and receive proposals from carefully screened freelancers.</p></div><div><Link href="/online/projects/create">Post a project</Link><Link href="/how-it-works">Learn about safe collaboration <ArrowRight size={15} /></Link></div></section>
    </div>
  </main>;
}

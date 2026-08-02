import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Check, Clock3, FileCheck2, FileText, Gauge, LayoutDashboard, LockKeyhole, Megaphone, MessageSquareMore, ShieldCheck, Star, Target, UsersRound } from "lucide-react";
import styles from "./BusinessLanding.module.css";

const features = [
  { title: "A broad talent pool", text: "Find the right specialist across local and online work.", Icon: UsersRound },
  { title: "Verified professionals", text: "Profiles, skills, experience and trust signals in one view.", Icon: BadgeCheck },
  { title: "Contracts & compliance", text: "Clear agreements and auditable project records.", Icon: FileCheck2 },
  { title: "Central work records", text: "Scope, milestones, files and approval history kept organised.", Icon: FileCheck2 },
  { title: "Real-time project overview", text: "Monitor progress, milestones and delivery from one dashboard.", Icon: LayoutDashboard },
  { title: "Personal account support", text: "A dedicated contact who understands your organisation.", Icon: MessageSquareMore },
];

const plans = [
  { name: "Online", audience: "Worldwide freelance projects and services", price: "Free beta", items: ["Browse global talent", "Record scope and milestones", "Private communication", "Delivery and approval history"], cta: "Join the beta" },
  { name: "Local", audience: "Rotterdam–The Hague launch cohort", price: "Free beta", items: ["Five initial trade categories", "Privacy-first quote requests", "Compare professional quotes", "Appointment workspace"], cta: "Join the waitlist", featured: true },
  { name: "Jobs", audience: "Dutch employers and remote European roles", price: "Free beta", items: ["Published company details", "Vacancy publishing", "Applicant pipeline", "Candidate status tracking"], cta: "Join the beta" },
];

const faqs = [
  ["How quickly can you provide a professional?", "Focused shortlists can often be created within one or two business days, depending on the brief."],
  ["Are professionals screened?", "Profiles include verification and trust signals. Additional screening can be agreed for business accounts."],
  ["Are contracts and processes compliant?", "Skilllinkup keeps agreements and project records organised. Legal, tax and payment responsibilities are reviewed before any paid launch."],
  ["Can Skilllinkup integrate with our systems?", "Business and enterprise plans can include workflow, reporting and identity integrations."],
  ["How does invoicing work?", "Skilllinkup does not process payments or issue platform invoices during the free private beta."],
  ["Can we cancel or scale down?", "The private beta has no paid subscription. Future commercial terms will be published before activation."],
];

function CheckList({ items }) { return <ul>{items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>; }

export default function BusinessLanding() {
  return <main className={styles.page}>
    <section className={styles.hero}><div className={styles.container}><div className={styles.heroGrid}><div className={styles.heroCopy}><span className={styles.eyebrow}>Skilllinkup for business</span><h1>Flexible talent.<br /><em>Without the friction.</em></h1><p>Find professionals for project, local and permanent work, then manage each workflow centrally on one secure platform.</p><div className={styles.buttons}><Link href="#demo">Book a free demo<ArrowRight /></Link><Link href="#solutions">Explore solutions</Link></div><div className={styles.heroTrust}><span><BadgeCheck />Verification signals</span><span><Target />Focused matching</span><span><ShieldCheck />Control and quality</span></div></div><div className={styles.heroImage}><Image src="/images/skilllinkup-home/business-team-v2.png" alt="Business team working with external professionals" fill priority sizes="(max-width: 900px) 100vw, 54vw" /><div className={styles.metricsCard}><span>Illustrative dashboard</span><div><article><small>Products</small><strong>3</strong></article><article><small>Workspace</small><strong>One</strong></article><article><small>Payment mode</small><strong>Off</strong></article></div><b>Private beta <strong>Sample data</strong></b></div></div></div></div></section>

    <section className={`${styles.container} ${styles.logos}`}><span>Designed for modern organisations</span><div>{["Startups","Agencies","Operations","Marketing","Product teams","Local businesses"].map((label) => <strong key={label}>{label}</strong>)}</div></section>
    <section className={`${styles.container} ${styles.stats}`}><article><UsersRound /><span><strong>One account</strong><small>Multiple professional roles</small></span></article><article><BriefcaseBusiness /><span><strong>3 products</strong><small>Online, Local and Jobs</small></span></article><article><Clock3 /><span><strong>Free beta</strong><small>No platform payments</small></span></article><article><Star /><span><strong>English-first</strong><small>Worldwide Online launch</small></span></article></section>

    <section id="solutions" className={`${styles.container} ${styles.section}`}><header className={styles.centerTitle}><span className={styles.eyebrow}>Built for modern teams</span><h2>Everything you need to scale flexibly</h2></header><div className={styles.featureGrid}>{features.map(({ title,text,Icon }) => <article key={title}><i><Icon /></i><span><strong>{title}</strong><p>{text}</p></span></article>)}</div></section>

    <section className={`${styles.container} ${styles.section}`}><header className={styles.centerTitle}><span className={styles.eyebrow}>From request to result</span><h2>Four simple steps</h2></header><div className={styles.steps}>{[["Share your need","We help sharpen the brief.",FileText],["Receive proposals","Compare suitable profiles.",UsersRound],["Start working","Arrange scope and milestones.",BriefcaseBusiness],["Review and scale","Measure results and repeat.",Gauge]].map(([title,text,Icon],index) => <article key={title}><b>{index+1}</b><i><Icon /></i><strong>{title}</strong><p>{text}</p></article>)}</div></section>

    <section className={`${styles.container} ${styles.dashboardSection}`}><div><span className={styles.eyebrow}>One operational view</span><h2>One platform for all your external talent</h2><CheckList items={["Overview of projects and professionals","Live updates and milestones","Secure communication and files","Clear scope and progress reports"]} /><Link href="#demo">Book a demo<ArrowRight /></Link></div><div className={styles.dashboardImage}><Image src="/images/skilllinkup-home/project-workspace-v1.png" alt="Illustrative Skilllinkup project management dashboard" fill sizes="(max-width: 800px) 100vw, 60vw" /></div></section>

    <section className={`${styles.container} ${styles.section}`}><header className={styles.centerTitle}><span className={styles.eyebrow}>For every department</span><h2>Built around your team</h2></header><div className={styles.teamTabs}>{["Marketing teams","HR & recruitment","Agencies","Operations","Startups"].map((item,index) => <span className={index===0 ? styles.activeTab : ""} key={item}>{item}</span>)}</div><div className={styles.teamPanel}><div><Megaphone /><h3>Marketing teams</h3><p>Scale campaigns, content and design exactly when demand grows.</p><CheckList items={["Specialists in SEO, paid media and design","Flexible project or retainer support","Clear briefings and delivery dates"]} /></div><span><Image src="/images/skilllinkup-home/business-team-v1.png" alt="Marketing team planning a campaign" fill sizes="(max-width: 760px) 100vw, 55vw" /></span></div></section>

    <section className={`${styles.container} ${styles.reportSection}`}><div className={styles.chartCard}><header><span>Illustrative workspace preview</span><strong>Sample data</strong></header><div className={styles.chart}>{[35,52,68,62,88].map((height,index) => <span key={height}><i style={{height:`${height}%`}} /><b>{["Jan","Feb","Mar","Apr","May"][index]}</b></span>)}</div><em>Scope overview <small>No payment data</small></em></div><div><span className={styles.eyebrow}>Make every agreement visible</span><h2>Control scope and quality</h2><CheckList items={["Clear insight into agreed scope","Compare progress by professional and project","Concise operational reporting","Stay in control without scattered spreadsheets"]} /><Link href="#demo">Explore the preview<ArrowRight /></Link></div></section>

    <section className={`${styles.container} ${styles.caseStudy}`}><div><span className={styles.eyebrow}>Private beta workflow</span><h2>See how a team can move from brief to approved delivery</h2><p>This product preview shows the intended workflow: publish a clear need, compare relevant professionals and keep collaboration history in one workspace.</p><div><strong>1 brief<small>Clear requirements</small></strong><strong>1 workspace<small>Messages and files</small></strong><strong>1 record<small>Delivery and approval</small></strong></div></div><span><Image src="/images/skilllinkup-home/business-team-v2.png" alt="Team previewing a Skilllinkup collaboration workflow" fill sizes="(max-width: 760px) 100vw, 48vw" /></span><blockquote>Product preview — not a customer testimonial or claim of live marketplace results.<small>Skilllinkup private beta</small></blockquote></section>

    <section className={`${styles.container} ${styles.section}`}><header className={styles.centerTitle}><span className={styles.eyebrow}>Invite-only launch</span><h2>Choose the beta product that fits your organisation</h2></header><div className={styles.pricing}>{plans.map((plan) => <article className={plan.featured ? styles.featured : ""} key={plan.name}>{plan.featured ? <span>Local launch focus</span> : null}<h3>{plan.name}</h3><p>{plan.audience}</p><strong>{plan.price}<small /></strong><CheckList items={plan.items} /><Link href={plan.featured ? "#demo" : "/register"}>{plan.cta}<ArrowRight /></Link></article>)}</div></section>

    <section className={`${styles.container} ${styles.compliance}`}><h2>Secure, transparent and dependable</h2><div>{[[ShieldCheck,"Privacy by design"],[BadgeCheck,"Verification signals"],[LockKeyhole,"Protected data"],[FileCheck2,"Clear agreements"],[ShieldCheck,"No beta payments"]].map(([Icon,label]) => <span key={label}><Icon /><strong>{label}</strong></span>)}</div></section>

    <section className={`${styles.container} ${styles.section}`}><header className={styles.centerTitle}><h2>What beta teams can expect</h2></header><div className={styles.testimonials}>{[["Clear scope","Requirements, proposals and agreed milestones stay understandable."],["Visible progress","Messages, files, delivery and approval share one history."],["Honest launch policy","Example content is labelled and platform payments remain disabled."]].map(([title,text]) => <article key={title}><p>{text}</p><strong>{title}<small>Private beta principle</small></strong></article>)}</div></section>

    <section className={`${styles.container} ${styles.faqSection}`}><header className={styles.centerTitle}><span className={styles.eyebrow}>Good to know</span><h2>Frequently asked questions</h2></header><div>{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

    <section id="demo" className={`${styles.container} ${styles.demoCta}`}><div><span className={styles.eyebrow}>Let’s talk</span><h2>Discover what Skilllinkup can do for your organisation</h2><p>Book a no-obligation demo and explore how flexible talent fits your team.</p></div><form action="/register"><input name="name" placeholder="Name" aria-label="Name" /><input name="email" type="email" placeholder="Work email" aria-label="Work email" /><input name="company" placeholder="Company" aria-label="Company" /><button type="submit">Book my demo<ArrowRight /></button></form><footer><span><Clock3 />Response within one business day</span><span><ShieldCheck />No obligation</span><span><Check />Tailored advice</span></footer></section>
  </main>;
}

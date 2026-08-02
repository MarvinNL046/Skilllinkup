import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Check, CircleDollarSign, Clock3, FileCheck2, FileText, Gauge, LayoutDashboard, LockKeyhole, Megaphone, MessageSquareMore, Receipt, ShieldCheck, Star, Target, UsersRound } from "lucide-react";
import styles from "./BusinessLanding.module.css";

const features = [
  { title: "A broad talent pool", text: "Find the right specialist across local and online work.", Icon: UsersRound },
  { title: "Verified professionals", text: "Profiles, skills, experience and trust signals in one view.", Icon: BadgeCheck },
  { title: "Contracts & compliance", text: "Clear agreements and auditable project records.", Icon: FileCheck2 },
  { title: "Central invoicing", text: "Invoices, spend and payment status kept organised.", Icon: Receipt },
  { title: "Real-time project overview", text: "Monitor progress, milestones and delivery from one dashboard.", Icon: LayoutDashboard },
  { title: "Personal account support", text: "A dedicated contact who understands your organisation.", Icon: MessageSquareMore },
];

const plans = [
  { name: "Start", audience: "For small teams and occasional projects", price: "€299", items: ["Access to the talent pool", "Standard matching", "Secure communication", "Invoice overview"], cta: "Start free" },
  { name: "Business", audience: "For growing teams and several projects", price: "€799", items: ["Dedicated account manager", "Advanced reporting", "Contracts and compliance", "Priority matching"], cta: "Book a demo", featured: true },
  { name: "Enterprise", audience: "For larger organisations with complex needs", price: "Tailored", items: ["SLA and custom terms", "Integrations and SSO", "Custom reporting", "Training and onboarding"], cta: "Contact us" },
];

const faqs = [
  ["How quickly can you provide a professional?", "Focused shortlists can often be created within one or two business days, depending on the brief."],
  ["Are professionals screened?", "Profiles include verification and trust signals. Additional screening can be agreed for business accounts."],
  ["Are contracts and processes compliant?", "Skilllinkup keeps agreements, invoices and project records organised. Enterprise requirements are handled during onboarding."],
  ["Can Skilllinkup integrate with our systems?", "Business and enterprise plans can include workflow, reporting and identity integrations."],
  ["How does invoicing work?", "Projects and invoices can be consolidated into a clear organisational overview."],
  ["Can we cancel or scale down?", "Plan terms are transparent and discussed before activation, with flexibility appropriate to your organisation."],
];

function CheckList({ items }) { return <ul>{items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>; }

export default function BusinessLanding() {
  return <main className={styles.page}>
    <section className={styles.hero}><div className={styles.container}><div className={styles.heroGrid}><div className={styles.heroCopy}><span className={styles.eyebrow}>Skilllinkup for business</span><h1>Flexible talent.<br /><em>Without the friction.</em></h1><p>Find verified professionals for every project and manage external talent centrally on one secure platform.</p><div className={styles.buttons}><Link href="#demo">Book a free demo<ArrowRight /></Link><Link href="#solutions">Explore solutions</Link></div><div className={styles.heroTrust}><span><BadgeCheck />Verified specialists</span><span><Target />Fast matching</span><span><ShieldCheck />Control and quality</span></div></div><div className={styles.heroImage}><Image src="/images/skilllinkup-home/business-team-v2.png" alt="Business team working with external professionals" fill priority sizes="(max-width: 900px) 100vw, 54vw" /><div className={styles.metricsCard}><span>My organisation</span><div><article><small>Active projects</small><strong>24 <em>+15%</em></strong></article><article><small>Active talent</small><strong>86 <em>+24%</em></strong></article><article><small>Average rating</small><strong>4.8 / 5</strong></article></div><b>Spend this month <strong>€72,540</strong></b></div></div></div></div></section>

    <section className={`${styles.container} ${styles.logos}`}><span>Trusted by forward-thinking organisations</span><div>{["Northwind","Brightlane","Nextbridge","Flowstate","Stackline","Vertexa"].map((logo) => <strong key={logo}>{logo}</strong>)}</div></section>
    <section className={`${styles.container} ${styles.stats}`}><article><UsersRound /><span><strong>25,000+</strong><small>Verified professionals</small></span></article><article><BriefcaseBusiness /><span><strong>1,200+</strong><small>Organisations</small></span></article><article><Clock3 /><span><strong>98%</strong><small>Delivered on time</small></span></article><article><Star /><span><strong>4.8 / 5</strong><small>Average rating</small></span></article></section>

    <section id="solutions" className={`${styles.container} ${styles.section}`}><header className={styles.centerTitle}><span className={styles.eyebrow}>Built for modern teams</span><h2>Everything you need to scale flexibly</h2></header><div className={styles.featureGrid}>{features.map(({ title,text,Icon }) => <article key={title}><i><Icon /></i><span><strong>{title}</strong><p>{text}</p></span></article>)}</div></section>

    <section className={`${styles.container} ${styles.section}`}><header className={styles.centerTitle}><span className={styles.eyebrow}>From request to result</span><h2>Four simple steps</h2></header><div className={styles.steps}>{[["Share your need","We help sharpen the brief.",FileText],["Receive proposals","Compare suitable profiles.",UsersRound],["Start working","Arrange scope and milestones.",BriefcaseBusiness],["Review and scale","Measure results and repeat.",Gauge]].map(([title,text,Icon],index) => <article key={title}><b>{index+1}</b><i><Icon /></i><strong>{title}</strong><p>{text}</p></article>)}</div></section>

    <section className={`${styles.container} ${styles.dashboardSection}`}><div><span className={styles.eyebrow}>One operational view</span><h2>One platform for all your external talent</h2><CheckList items={["Overview of projects and professionals","Live updates and milestones","Secure communication and files","Clear spend and performance reports"]} /><Link href="#demo">Book a demo<ArrowRight /></Link></div><div className={styles.dashboardImage}><Image src="/images/skilllinkup-home/project-workspace-v1.png" alt="Skilllinkup project management dashboard" fill sizes="(max-width: 800px) 100vw, 60vw" /></div></section>

    <section className={`${styles.container} ${styles.section}`}><header className={styles.centerTitle}><span className={styles.eyebrow}>For every department</span><h2>Built around your team</h2></header><div className={styles.teamTabs}>{["Marketing teams","HR & recruitment","Agencies","Operations","Startups"].map((item,index) => <span className={index===0 ? styles.activeTab : ""} key={item}>{item}</span>)}</div><div className={styles.teamPanel}><div><Megaphone /><h3>Marketing teams</h3><p>Scale campaigns, content and design exactly when demand grows.</p><CheckList items={["Specialists in SEO, paid media and design","Flexible project or retainer support","Clear briefings and delivery dates"]} /></div><span><Image src="/images/skilllinkup-home/business-team-v1.png" alt="Marketing team planning a campaign" fill sizes="(max-width: 760px) 100vw, 55vw" /></span></div></section>

    <section className={`${styles.container} ${styles.reportSection}`}><div className={styles.chartCard}><header><span>Spend & performance</span><strong>May 2026</strong></header><div className={styles.chart}>{[35,52,68,62,88].map((height,index) => <span key={height}><i style={{height:`${height}%`}} /><b>{["Jan","Feb","Mar","Apr","May"][index]}</b></span>)}</div><em>€72,540 <small>24 projects</small></em></div><div><span className={styles.eyebrow}>Make every euro visible</span><h2>Control cost and quality</h2><CheckList items={["Clear insight into spend and ROI","Compare performance by professional and project","Data-driven decisions with concise reports","Stay in control without spreadsheets"]} /><Link href="#demo">Explore reporting<ArrowRight /></Link></div></section>

    <section className={`${styles.container} ${styles.caseStudy}`}><div><span className={styles.eyebrow}>Customer story</span><h2>How Brightlane scaled without compromising quality</h2><p>Brightlane assembled a complete campaign team in two weeks while keeping delivery, spend and communication in one place.</p><div><strong>+35%<small>Faster time-to-market</small></strong><strong>€48,000<small>Cost avoided</small></strong><strong>98%<small>On-time delivery</small></strong></div></div><span><Image src="/images/skilllinkup-home/business-team-v2.png" alt="Brightlane project team" fill sizes="(max-width: 760px) 100vw, 48vw" /></span><blockquote>“Skilllinkup is our trusted partner for flexible talent: fast, reliable and consistently high quality.”<small>Sarah de Vries · Head of Marketing</small></blockquote></section>

    <section className={`${styles.container} ${styles.section}`}><header className={styles.centerTitle}><span className={styles.eyebrow}>Clear and scalable</span><h2>Pricing that grows with your organisation</h2></header><div className={styles.pricing}>{plans.map((plan) => <article className={plan.featured ? styles.featured : ""} key={plan.name}>{plan.featured ? <span>Most chosen</span> : null}<h3>{plan.name}</h3><p>{plan.audience}</p><strong>{plan.price}<small>{plan.price.startsWith("€") ? "/month" : ""}</small></strong><CheckList items={plan.items} /><Link href={plan.featured ? "#demo" : "/register"}>{plan.cta}<ArrowRight /></Link></article>)}</div></section>

    <section className={`${styles.container} ${styles.compliance}`}><h2>Secure, compliant and dependable</h2><div>{[[ShieldCheck,"GDPR-ready"],[BadgeCheck,"Verified processes"],[LockKeyhole,"Secure data"],[FileCheck2,"Clear agreements"],[CircleDollarSign,"Reliable payments"]].map(([Icon,label]) => <span key={label}><Icon /><strong>{label}</strong></span>)}</div></section>

    <section className={`${styles.container} ${styles.section}`}><header className={styles.centerTitle}><h2>What our clients say</h2></header><div className={styles.testimonials}>{[["Mark van Dijk","Northbridge","Within weeks we found the right specialists for our international rollout."],["Elise Bakker","Flowstate","The platform gives us control over external talent without slowing the team down."],["Omar El Idrissi","Vertexa","The quality of professionals and the personal support really stand out."]].map(([name,company,quote]) => <article key={name}><p>“{quote}”</p><div>{[1,2,3,4,5].map((star) => <Star key={star} />)}</div><strong>{name}<small>{company}</small></strong></article>)}</div></section>

    <section className={`${styles.container} ${styles.faqSection}`}><header className={styles.centerTitle}><span className={styles.eyebrow}>Good to know</span><h2>Frequently asked questions</h2></header><div>{faqs.map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

    <section id="demo" className={`${styles.container} ${styles.demoCta}`}><div><span className={styles.eyebrow}>Let’s talk</span><h2>Discover what Skilllinkup can do for your organisation</h2><p>Book a no-obligation demo and explore how flexible talent fits your team.</p></div><form action="/register"><input name="name" placeholder="Name" aria-label="Name" /><input name="email" type="email" placeholder="Work email" aria-label="Work email" /><input name="company" placeholder="Company" aria-label="Company" /><button type="submit">Book my demo<ArrowRight /></button></form><footer><span><Clock3 />Response within one business day</span><span><ShieldCheck />No obligation</span><span><Check />Tailored advice</span></footer></section>
  </main>;
}

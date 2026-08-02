import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ClipboardList,
  Gauge,
  Globe2,
  LayoutTemplate,
  MapPin,
  MessageSquareMore,
  MonitorSmartphone,
  PanelsTopLeft,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  UsersRound,
} from "lucide-react";
import styles from "./WebDesignCategory.module.css";

const serviceTypes = [
  { title: "WordPress", copy: "Professional WordPress websites built around your goals.", Icon: PanelsTopLeft },
  { title: "Online stores", copy: "Powerful, secure shops designed to turn visits into sales.", Icon: ShoppingBag },
  { title: "UX/UI design", copy: "Clear digital experiences that feel effortless to use.", Icon: LayoutTemplate },
  { title: "Website optimisation", copy: "Faster, clearer and easier to find in search.", Icon: Gauge },
  { title: "Landing pages", copy: "Focused pages built for campaigns and conversion.", Icon: Target },
  { title: "Care & maintenance", copy: "Updates, backups and dependable technical support.", Icon: Settings },
];

const services = [
  { title: "One-page business website", seller: "Lisa, Web Designer", price: "€499", rating: "4.9", image: "tileOne" },
  { title: "Custom WordPress website", seller: "Mark, WordPress Expert", price: "€799", rating: "4.9", image: "tileTwo" },
  { title: "WooCommerce online store", seller: "Danique, Web Designer", price: "€1,499", rating: "4.9", image: "tileThree" },
  { title: "Modern website redesign", seller: "Rachid, UX Designer", price: "€899", rating: "4.8", image: "tileFour" },
  { title: "High-converting landing page", seller: "Sanne, Web Designer", price: "€399", rating: "4.9", image: "tileFive" },
  { title: "Monthly website care", seller: "Omar, Developer", price: "€99/mo", rating: "4.8", image: "tileSix" },
];

const designers = [
  { name: "Lisa de Jong", role: "Web Designer", city: "Amsterdam", rate: "€59/hour", rating: "4.9", image: "/images/skilllinkup-home/professional-sarah-v1.png" },
  { name: "Mark Evans", role: "WordPress Expert", city: "Rotterdam", rate: "€65/hour", rating: "5.0", image: "/images/skilllinkup-home/testimonial-daniel-v2.png" },
  { name: "Danique Post", role: "Web Designer", city: "Utrecht", rate: "€55/hour", rating: "4.9", image: "/images/skilllinkup-home/testimonial-amara-v2.png" },
  { name: "Rachid El Amrani", role: "UX/UI Designer", city: "The Hague", rate: "€60/hour", rating: "4.8", image: "/images/skilllinkup-home/professional-lucas-v1.png" },
  { name: "Sanne Müller", role: "Web Designer", city: "Eindhoven", rate: "€56/hour", rating: "4.9", image: "/images/skilllinkup-home/professional-yuki-v1.png" },
  { name: "Aïcha Mensah", role: "Front-end Developer", city: "Online", rate: "€70/hour", rating: "4.8", image: "/images/skilllinkup-home/professional-adaeze-v1.png" },
];

const portfolio = [
  { title: "Sustainable urban living", className: "portfolioOne" },
  { title: "New collection — Summer", className: "portfolioTwo" },
  { title: "Building tomorrow together", className: "portfolioThree" },
  { title: "Independent restaurant story", className: "portfolioFour" },
  { title: "Finance made human", className: "portfolioFive" },
  { title: "Furniture with character", className: "portfolioSix" },
  { title: "Stronger every day", className: "portfolioSeven" },
  { title: "Discover new destinations", className: "portfolioEight" },
];

const plans = [
  { name: "Starter", intro: "For new businesses and focused projects", price: "€499 – €999", items: ["One-page or compact website", "Responsive design", "Essential SEO setup", "Contact form", "Two revision rounds"], delivery: "5–10 days" },
  { name: "Growth", intro: "For growing companies", price: "€999 – €2,999", items: ["Professional multi-page website", "UX/UI design tailored to your brand", "SEO and performance optimisation", "WordPress CMS", "Two to five revision rounds", "Training and handover"], delivery: "10–20 days", featured: true },
  { name: "Custom", intro: "For ambitious, complex platforms", price: "€2,999+", items: ["Bespoke design and functionality", "Online store or platform", "Advanced integrations", "Performance and security", "Delivery in clear milestones", "Personal project manager"], delivery: "By agreement" },
];

const faqs = [
  ["How long does it take to build a website?", "Most focused websites take between one and three weeks. Larger stores and custom platforms are planned in milestones."],
  ["How do I choose the right web designer?", "Compare relevant work, experience, communication and verified reviews—not only the hourly rate."],
  ["What does an average website cost?", "A professional small-business website commonly starts around €499. Scope, content and integrations determine the final quote."],
  ["Can an existing website be redesigned?", "Yes. A designer can retain what works while improving structure, visual design, speed and conversion."],
  ["Can I update the website myself?", "Yes. Ask for a content management system and a clear handover so your team can manage routine updates."],
  ["Is SEO included with web design?", "Basic technical SEO is common. Content strategy and ongoing search optimisation can be added separately."],
  ["Do designers provide maintenance after launch?", "Many professionals offer care plans for updates, backups, monitoring and small improvements."],
  ["How does payment work during beta?", "Agree on milestones first and keep files, communication and approvals together. Skilllinkup does not process payment during beta."],
];

function SectionHeader({ title, href = "/online/services", link = "View all services" }) {
  return <header className={styles.sectionHeader}><h2>{title}</h2><Link href={href}>{link}<ArrowRight size={16} /></Link></header>;
}

function ServiceCard({ service }) {
  return <Link className={styles.serviceCard} href="/online/services"><span className={`${styles.serviceImage} ${styles[service.image]}`} /><strong>{service.title}</strong><small><BadgeCheck size={13} />{service.seller}</small><span className={styles.serviceMeta}><em><Star size={13} fill="currentColor" />{service.rating}</em><b>from {service.price}</b></span></Link>;
}

function DesignerCard({ person }) {
  return <Link className={styles.designerCard} href="/online/freelancers"><span className={styles.designerImage}><Image src={person.image} alt="" fill sizes="(max-width: 760px) 45vw, 16vw" /></span><strong>{person.name}<BadgeCheck size={14} /></strong><small>{person.role}</small><span><em><Star size={12} fill="currentColor" />{person.rating}</em><small><MapPin size={12} />{person.city}</small></span><b>from {person.rate}</b></Link>;
}

export default function WebDesignCategory() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>Web Design</span></nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}><span className={styles.eyebrow}>Web design professionals worldwide</span><h1>Find a web designer who brings your idea to life.</h1><strong>Professional web design. Tailored. Results-driven.</strong><p>From sharp portfolio sites to complete online stores. Experienced designers turn your vision into a user-friendly, conversion-focused website that performs.</p></div>
            <div className={styles.heroVisual}><Image src="/images/skilllinkup-webdesign/webdesign-hero-v1.png" alt="Web designer with responsive website designs" fill priority sizes="(max-width: 900px) 100vw, 48vw" /></div>
          </div>
          <form className={styles.searchBar} action="/online/freelancers" method="get"><label><Search size={19} /><input name="q" defaultValue="Web designer" aria-label="What kind of website do you need?" /></label><label><MapPin size={19} /><select name="location" defaultValue="all" aria-label="Designer location"><option value="all">Location or online</option><option value="online">Online worldwide</option><option value="local">Near me</option></select></label><button type="submit">Find a web designer</button></form>
          <div className={styles.heroTrust}><span><BadgeCheck size={19} />Verified profiles</span><span><ShieldCheck size={19} />Clear milestones</span><span><MessageSquareMore size={19} />Clear agreements</span></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.stats}`} aria-label="Web design marketplace statistics"><article><UsersRound /><span><strong>5,000+</strong><small>Active web designers</small></span></article><article><ClipboardList /><span><strong>12,000+</strong><small>Web design projects</small></span></article><article><Star /><span><strong>4.8 / 5</strong><small>Average rating</small></span></article><article><Globe2 /><span><strong>Worldwide</strong><small>Online availability</small></span></article></section>

      <section className={styles.section}><SectionHeader title="Web design services" href="/online/services?category=web-design" /><div className={styles.typeGrid}>{serviceTypes.map(({ title, copy, Icon }) => <Link href={`/online/services?q=${encodeURIComponent(title)}`} key={title}><i><Icon /></i><strong>{title}</strong><p>{copy}</p></Link>)}</div></section>

      <section className={styles.section}><SectionHeader title="Popular web design services" href="/online/services?category=web-design" /><div className={styles.serviceGrid}>{services.map((service) => <ServiceCard service={service} key={service.title} />)}</div></section>

      <section className={styles.section}><SectionHeader title="Top web designers" href="/online/freelancers?q=web+designer" link="View all web designers" /><div className={styles.designerGrid}>{designers.map((person) => <DesignerCard person={person} key={person.name} />)}</div></section>

      <section className={styles.section}><SectionHeader title="Portfolio inspiration" href="/online/freelancers?q=web+designer" link="View more projects" /><div className={styles.portfolioGrid}>{portfolio.map((item) => <Link href="/online/freelancers" aria-label={item.title} className={`${styles.portfolioItem} ${styles[item.className]}`} key={item.title}><span>{item.title}</span></Link>)}</div></section>

      <section className={`${styles.section} ${styles.pricingSection}`}><div className={styles.centerTitle}><span className={styles.eyebrow}>Transparent starting prices</span><h2>What does a web designer cost?</h2><p>Choose the level that fits your goals. Every project receives a clear proposal first.</p></div><div className={styles.pricingGrid}>{plans.map((plan) => <article className={plan.featured ? styles.featuredPlan : ""} key={plan.name}>{plan.featured ? <span className={styles.popularLabel}>Most popular</span> : null}<h3>{plan.name}</h3><p>{plan.intro}</p><strong>{plan.price}</strong><ul>{plan.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><small>Typical delivery: <b>{plan.delivery}</b></small></article>)}</div></section>

      <section className={`${styles.section} ${styles.processSection}`}><div className={styles.centerTitle}><h2>How it works</h2></div><div className={styles.process}><Image src="/images/skilllinkup-home/how-skilllinkup-works-v1.png" alt="Post your project, compare web designers and work securely" fill sizes="90vw" /></div><div className={styles.processCopy}><article><b>1</b><strong>Post your project</strong><p>Tell us what you need and receive focused proposals.</p></article><article><b>2</b><strong>Compare & choose</strong><p>Review portfolios, expertise, ratings and pricing.</p></article><article><b>3</b><strong>Build & grow</strong><p>Work securely, share feedback and launch confidently.</p></article></div></section>

      <section className={`${styles.section} ${styles.businessCta}`}><div><span className={styles.eyebrow}>Web design for every organisation</span><h2>Ready for a website that works?</h2><p>Meet designers who understand your goals, audience and brand—not just the pixels.</p><ul><li><Check />Startups and growing teams</li><li><Check />Small and medium businesses</li><li><Check />Online stores and communities</li></ul><span className={styles.ctaButtons}><Link href="/create-projects">Post a project<ArrowRight size={16} /></Link><Link href="/online/freelancers?q=web+designer">View web designers</Link></span></div><span className={styles.ctaImage}><Image src="/images/skilllinkup-home/business-team-v1.png" alt="Team planning a new website" fill sizes="(max-width: 760px) 100vw, 45vw" /></span></section>

      <section className={styles.section}><div className={styles.centerTitle}><h2>What clients say</h2></div><div className={styles.testimonials}>{[["Eva van Dijk","Within a week we found a designer who understood our brand. The process was clear from the first message."],["Bas de Jong","Our new website is faster, easier to use and finally feels like us. Everything stayed organised in one place."],["Fatima El Yousfi","Professional, thoughtful and involved. Communication was excellent and the result exceeded expectations."]].map(([name, quote], index) => <article key={name}><div>{[1,2,3,4,5].map((star) => <Star key={star} size={14} fill="currentColor" />)}</div><p>“{quote}”</p><span className={styles.quoteAuthor}><Image src={designers[index + 1].image} alt="" width={42} height={42} /><strong>{name}<small>Verified client</small></strong></span></article>)}</div></section>

      <section className={`${styles.section} ${styles.faqSection}`}><div className={styles.centerTitle}><span className={styles.eyebrow}>Good to know</span><h2>Frequently asked questions</h2></div><div className={styles.faqGrid}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className={`${styles.section} ${styles.trustStrip}`} aria-label="Skilllinkup guarantees"><article><ShieldCheck /><span><strong>Safe & reliable</strong><small>Verified profiles and recorded approvals.</small></span></article><article><MessageSquareMore /><span><strong>Clear agreements</strong><small>Transparent pricing and communication.</small></span></article><article><Sparkles /><span><strong>Satisfaction support</strong><small>We help when something needs attention.</small></span></article><article><MonitorSmartphone /><span><strong>Worldwide support</strong><small>Online professionals across time zones.</small></span></article></section>
    </main>
  );
}

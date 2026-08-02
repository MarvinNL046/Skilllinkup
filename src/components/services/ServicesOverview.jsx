import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Camera,
  ClipboardList,
  Code2,
  HeartPulse,
  Languages,
  MapPin,
  Megaphone,
  MessageCircleMore,
  Monitor,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  Video,
  Wrench,
} from "lucide-react";
import styles from "./ServicesOverview.module.css";

const categories = [
  { name: "Web Design", href: "/services/webdesign", icon: Monitor, image: "spriteOne" },
  { name: "Photography", href: "/online/services?category=photography", icon: Camera, image: "spriteTwo" },
  { name: "Home Repairs", href: "/local?category=home-repairs", icon: Wrench, image: "spriteThree" },
  { name: "Marketing", href: "/online/services?category=marketing", icon: Megaphone, image: "spriteFour" },
  { name: "Administration", href: "/online/services?category=administration", icon: ClipboardList, image: "spriteFive" },
  { name: "Coaching", href: "/online/services?category=coaching", icon: MessageCircleMore, image: "spriteSix" },
  { name: "Writing & Translation", href: "/online/services?category=writing", icon: Languages, image: "portfolioOne" },
  { name: "Video & Animation", href: "/online/services?category=video", icon: Video, image: "teamImage" },
  { name: "IT & Development", href: "/online/services?category=development", icon: Code2, image: "portfolioTwo" },
  { name: "Education", href: "/online/services?category=education", icon: BookOpen, image: "portfolioThree" },
  { name: "Events", href: "/local?category=events", icon: UsersRound, image: "businessImage" },
  { name: "Health & Wellbeing", href: "/local?category=wellbeing", icon: HeartPulse, image: "portfolioFour" },
];

const popularServices = [
  { title: "WordPress website", price: "€250", rating: "4.8", reviews: 120, href: "/online/services?category=wordpress", image: "spriteOne" },
  { title: "Business photography", price: "€150", rating: "4.9", reviews: 98, href: "/online/services?category=photography", image: "spriteTwo" },
  { title: "Interior painting", price: "€200", rating: "4.7", reviews: 76, href: "/local?category=painting", image: "spriteThree" },
  { title: "Social media management", price: "€120/mo", rating: "4.8", reviews: 89, href: "/online/services?category=social-media", image: "spriteFour" },
  { title: "Administrative support", price: "€120/mo", rating: "4.8", reviews: 69, href: "/online/services?category=administration", image: "spriteFive" },
  { title: "Career coaching", price: "€75/hr", rating: "4.9", reviews: 53, href: "/online/services?category=coaching", image: "spriteSix" },
  { title: "SEO optimisation", price: "€175", rating: "4.8", reviews: 75, href: "/online/services?category=seo", image: "portfolioTwo" },
  { title: "Logo & brand identity", price: "€180", rating: "4.9", reviews: 82, href: "/online/services?category=branding", image: "portfolioThree" },
];

const localProfessionals = [
  { name: "Lisa de Jong", role: "Web Designer", city: "Amsterdam", price: "€40/hr", rating: "5.0", image: "/images/skilllinkup-home/professional-sarah-v1.png" },
  { name: "Omar Khalil", role: "Home Professional", city: "Rotterdam", price: "€55/hr", rating: "4.9", image: "/images/skilllinkup-home/professional-lucas-v1.png" },
  { name: "Sanne Müller", role: "Marketer", city: "Utrecht", price: "€45/hr", rating: "4.9", image: "/images/skilllinkup-home/professional-yuki-v1.png" },
  { name: "Jeroen Visser", role: "Photographer", city: "The Hague", price: "€50/hr", rating: "5.0", image: "/images/skilllinkup-home/professional-adaeze-v1.png" },
  { name: "Nora Williams", role: "Coach", city: "Eindhoven", price: "€50/hr", rating: "4.9", image: "/images/skilllinkup-home/testimonial-maya-v2.png" },
  { name: "Mark Evans", role: "Developer", city: "Amsterdam", price: "€65/hr", rating: "4.9", image: "/images/skilllinkup-home/testimonial-daniel-v2.png" },
];

const onlineProfessionals = [
  { name: "Danique Post", role: "Content Strategist", price: "€30/hr", rating: "4.9", image: "/images/skilllinkup-home/testimonial-amara-v2.png" },
  { name: "Rachid El Amrani", role: "Web Developer", price: "€55/hr", rating: "4.9", image: "/images/skilllinkup-home/professional-lucas-v1.png" },
  { name: "Lotte Janssen", role: "Graphic Designer", price: "€55/hr", rating: "4.9", image: "/images/skilllinkup-home/professional-sarah-v1.png" },
  { name: "Fatima El Yousfi", role: "Translator NL/EN/FR", price: "€35/hr", rating: "4.9", image: "/images/skilllinkup-home/professional-adaeze-v1.png" },
  { name: "Bas de Jong", role: "Marketing Specialist", price: "€26/hr", rating: "4.9", image: "/images/skilllinkup-home/testimonial-daniel-v2.png" },
  { name: "Eva van Dijk", role: "Virtual Assistant", price: "€28/hr", rating: "4.9", image: "/images/skilllinkup-home/testimonial-maya-v2.png" },
];

const trending = [
  "Build a business website", "Design a logo", "Translate website copy", "Manage social media",
  "Find a local painter", "Improve my SEO", "Administrative support", "Edit a product video",
  "Develop an app", "Create a presentation",
];

const faqs = [
  ["What does it cost to request a service?", "Requesting a service is free. You only pay when you hire a professional and agree on the scope."],
  ["Can I compare several professionals?", "Yes. Save profiles, review offers and compare experience, ratings and pricing before deciding."],
  ["How do payments work during beta?", "Skilllinkup does not collect or hold payments during the free private beta. Listings still show prices to help agree scope."],
  ["What if I am not satisfied with the result?", "Start with the agreed revision process. If needed, Skilllinkup support can help both parties find a fair solution."],
  ["Can I cancel a service?", "Cancellation terms depend on the stage of the work and the agreement made with the professional."],
  ["How do chat and communication work?", "Keep project messages, files and agreements together in your Skilllinkup workspace."],
  ["How do I know a professional is trustworthy?", "Look for verified profiles, completed work, recent reviews and transparent service terms."],
  ["Can my company receive an invoice?", "Yes. Business accounts receive clear payment records and invoices for completed services."],
];

function SectionHeader({ title, href, link }) {
  return (
    <header className={styles.sectionHeader}>
      <h2>{title}</h2>
      <Link href={href}>{link}<ArrowRight size={16} /></Link>
    </header>
  );
}

function ProfessionalCard({ professional, compact = false }) {
  return (
    <Link className={compact ? styles.compactProfessional : styles.professionalCard} href={compact ? "/online/freelancers" : "/local"}>
      <Image src={professional.image} alt="" width={compact ? 58 : 180} height={compact ? 58 : 128} />
      <span>
        <strong>{professional.name}<BadgeCheck size={14} /></strong>
        <small>{professional.role}</small>
        <em><Star size={12} fill="currentColor" /> {professional.rating}</em>
        {!compact ? <small><MapPin size={12} /> {professional.city}</small> : null}
        <b>from {professional.price}</b>
      </span>
    </Link>
  );
}

export default function ServicesOverview() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Services</span></nav>
          <div className={styles.heroTop}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Worldwide services marketplace</span>
              <h1>Find the service that fits you.</h1>
              <strong>Nearby when it matters. Online everywhere.</strong>
              <p>From web design and marketing to trusted help at home. Discover skilled professionals for every kind of project.</p>
            </div>
            <div className={styles.heroProof}>
              <article><UsersRound size={27} /><strong>25,000+</strong><span>Active professionals</span></article>
              <article><ShieldCheck size={27} /><strong>Clear agreements</strong><span>Scope & approvals recorded</span></article>
              <article><MessageCircleMore size={27} /><strong>Clear agreements</strong><span>Everything in one place</span></article>
            </div>
          </div>
          <form className={styles.searchBar} action="/online/services" method="get">
            <label><Search size={20} /><input name="q" type="search" placeholder="What can we help you with?" /></label>
            <label><MapPin size={20} /><select name="scope" defaultValue="all" aria-label="Service location"><option value="all">Location or online</option><option value="local">Near me</option><option value="online">Online worldwide</option></select></label>
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <section className={`${styles.section} ${styles.categorySection}`}>
        <div className={styles.scopeTabs} aria-label="Service scope"><Link className={styles.scopeActive} href="/local"><MapPin size={15} /> Local</Link><Link href="/online/services"><Monitor size={15} /> Online</Link></div>
        <div className={styles.categoryGrid}>{categories.map(({ name, href, icon: Icon, image }) => <Link href={href} className={styles.categoryCard} key={name}><span className={`${styles.categoryImage} ${styles[image]}`} /><i><Icon size={19} /></i><strong>{name}</strong></Link>)}</div>
      </section>

      <section className={styles.section}>
        <SectionHeader title="Popular services" href="/online/services" link="View all services" />
        <div className={styles.serviceGrid}>{popularServices.map((service) => <Link className={styles.serviceCard} href={service.href} key={service.title}><span className={`${styles.serviceImage} ${styles[service.image]}`} /><strong>{service.title}</strong><small>from {service.price}</small><em><Star size={13} fill="currentColor" /> {service.rating} <span>({service.reviews})</span></em></Link>)}</div>
      </section>

      <section className={styles.section}>
        <SectionHeader title="Featured near you" href="/local" link="View local professionals" />
        <div className={styles.cityTabs}><Link className={styles.cityActive} href="/local">All cities</Link>{["Amsterdam","Rotterdam","Utrecht","Eindhoven","The Hague"].map((city) => <Link href={`/local?city=${encodeURIComponent(city)}`} key={city}>{city}</Link>)}</div>
        <div className={styles.professionalGrid}>{localProfessionals.map((professional) => <ProfessionalCard professional={professional} key={professional.name} />)}</div>
      </section>

      <section className={styles.section}>
        <SectionHeader title="Online professionals" href="/online/freelancers" link="View online professionals" />
        <div className={styles.onlineGrid}>{onlineProfessionals.map((professional) => <ProfessionalCard professional={professional} compact key={professional.name} />)}</div>
      </section>

      <section className={`${styles.section} ${styles.processSection}`}>
        <div className={styles.centerTitle}><span className={styles.eyebrow}>Simple from start to finish</span><h2>Choose the right professional</h2></div>
        <div className={styles.processWrap}>
          <Image src="/images/skilllinkup-home/how-skilllinkup-works-v1.png" alt="Post your request, compare professionals and work securely together" width={1536} height={648} />
          <div className={styles.processSteps}><article><b>1</b><strong>Post your request</strong><p>Tell us what you need and receive relevant matches.</p></article><article><b>2</b><strong>Compare & choose</strong><p>Review profiles, offers, experience and ratings.</p></article><article><b>3</b><strong>Work securely</strong><p>Agree on the details, pay safely and keep everything together.</p></article></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.trendingSection}`}>
        <div className={styles.centerTitle}><h2>Trending searches</h2></div>
        <div className={styles.trending}>{trending.map((term) => <Link href={`/online/services?q=${encodeURIComponent(term)}`} key={term}><Search size={14} />{term}</Link>)}</div>
      </section>

      <section className={`${styles.section} ${styles.joinSection}`}>
        <div className={styles.joinPanel}>
          <div><span className={styles.eyebrow}>Grow with Skilllinkup</span><h2>Can&apos;t find your service?</h2><p>Offer your expertise and reach clients nearby and worldwide. Creating a profile is free.</p><Link href="/register">Offer your services<ArrowRight size={16} /></Link></div>
          <Image src="/images/skilllinkup-home/business-team-v2.png" alt="Professionals working together" width={1100} height={640} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.centerTitle}><span className={styles.eyebrow}>Good to know</span><h2>Frequently asked questions</h2></div>
        <div className={styles.faqGrid}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={`${styles.section} ${styles.trustStrip}`} aria-label="Skilllinkup guarantees">
        <article><ShieldCheck size={27} /><span><strong>Safe & reliable</strong><small>Verified profiles and clear records.</small></span></article>
        <article><ClipboardList size={27} /><span><strong>Clear agreements</strong><small>Transparent pricing and communication.</small></span></article>
        <article><BadgeCheck size={27} /><span><strong>Trusted professionals</strong><small>Profiles, ratings and verification signals.</small></span></article>
        <article><Sparkles size={27} /><span><strong>Quality first</strong><small>Find the right match for every project.</small></span></article>
      </section>
    </main>
  );
}

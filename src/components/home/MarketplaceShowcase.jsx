import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Globe2, Wrench } from "lucide-react";
import PopularServices from "./PopularServices";
import styles from "./WorldwideHome.module.css";

const products = [
  { label: "Online Services", eyebrow: "Work worldwide", description: "Independent experts for digital work, delivered remotely wherever you are.", examples: ["Development", "Design", "Marketing"], cta: "Explore online services", href: "/services", image: "/images/skilllinkup-products/online-services-v1.png", Icon: Globe2, tone: "coral" },
  { label: "Local Services", eyebrow: "Help near you", description: "Search professionals for hands-on work at your home, office or location.", examples: ["Plumbing", "Carpentry", "HVAC"], cta: "Find local professionals", href: "/local/craftsmen", image: "/images/skilllinkup-products/local-services-v1.png", Icon: Wrench, tone: "mint" },
  { label: "Jobs", eyebrow: "Build your career", description: "Real opportunities from companies, from nearby roles to remote careers.", examples: ["Remote", "Local", "Full-time"], cta: "Browse company jobs", href: "/jobs/browse", image: "/images/skilllinkup-products/jobs-v1.png", Icon: BriefcaseBusiness, tone: "navy" },
];

const professionals = [
  { role: "Social media strategy", query: "social media", description: "Plan campaigns, content and channel priorities.", image: "/images/skilllinkup-home/professional-adaeze-v1.png" },
  { role: "Web development", query: "development", description: "Build, maintain or improve a digital product.", image: "/images/skilllinkup-home/professional-yuki-v1.png" },
  { role: "Product design", query: "design", description: "Explore user needs, interfaces and prototypes.", image: "/images/skilllinkup-home/professional-lucas-v1.png" },
  { role: "Brand copywriting", query: "writing", description: "Create clear language for your website and campaigns.", image: "/images/skilllinkup-home/professional-sarah-v1.png" },
];

export default function MarketplaceShowcase() {
  return (
    <>
      <section className={`${styles.section} ${styles.productSection}`}>
        <header className={styles.centerHeading}><span className={styles.eyebrow}>One platform, three ways forward</span><h2>What are you looking for?</h2><p>Choose the marketplace that matches the way you want to work.</p></header>
        <div className={styles.productGrid}>
          {products.map(({ label, eyebrow, description, examples, cta, href, image, Icon, tone }) => (
            <article className={`${styles.productCard} ${styles[tone]}`} key={label}>
              <div className={styles.productImage}><Image src={image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" /><span className={styles.productIcon}><Icon size={25} /></span></div>
              <div className={styles.productBody}><span className={styles.productEyebrow}>{eyebrow}</span><h3>{label}</h3><p>{description}</p><div className={styles.productTags}>{examples.map((item) => <span key={item}>{item}</span>)}</div><Link href={href}>{cta}<ArrowRight size={16} /></Link></div>
            </article>
          ))}
        </div>
      </section>

      <PopularServices />

      <section className={`${styles.section} ${styles.talentSection}`}>
        <header className={styles.sectionHeading}><div><span className={styles.eyebrow}>Explore different skills</span><h2>What expertise does your project need?</h2></div><Link href="/online/freelancers">Browse published profiles <ArrowRight size={16} /></Link></header>
        <div className={styles.professionalGrid}>
          {professionals.map((person) => (
            <article className={styles.professionalCard} key={person.role}>
              <Image src={person.image} alt="" width={66} height={66} unoptimized />
              <div className={styles.professionalInfo}><h3><Link href={`/online/freelancers?q=${encodeURIComponent(person.query)}`}>{person.role}</Link></h3><p>{person.description}</p><div><span>Explore this skill</span></div></div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

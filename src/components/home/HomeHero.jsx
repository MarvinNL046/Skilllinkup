import Image from "next/image";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Globe2,
  Headphones,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import styles from "./WorldwideHome.module.css";

const trustItems = [
  { Icon: ShieldCheck, label: "Clear agreements" },
  { Icon: BadgeCheck, label: "Compare profiles" },
  { Icon: Headphones, label: "Contact support" },
];

const stats = [
  { Icon: Users, value: "One account", label: "Multiple professional roles" },
  { Icon: BriefcaseBusiness, value: "3 products", label: "Online · Local · Jobs" },
  { Icon: ShieldCheck, value: "Private beta", label: "No platform payments" },
  { Icon: Globe2, value: "English-first", label: "Online launches worldwide" },
];

export default function HomeHero() {
  return (
    <>
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>PRIVATE BETA · ONLINE · LOCAL · JOBS</span>
            <h1>
              Find the right work. <span>Or the right person.</span>
            </h1>
            <p className={styles.lead}>
              Explore online freelancers, local professionals and company jobs
              while Skilllinkup is in private beta. Our network is growing
              ahead of public launch.
            </p>
            <form className={styles.searchBox} action="/services" method="get">
              <label className={styles.searchField}>
                <Search size={20} />
                <span className="sr-only">What are you looking for?</span>
                <input name="q" placeholder="What are you looking for?" />
              </label>
              <label className={styles.scopeField}>
                <Globe2 size={18} />
                <span className="sr-only">Marketplace type</span>
                <select name="scope" defaultValue="online">
                  <option value="online">Online services</option>
                  <option value="local">Local services</option>
                  <option value="jobs">Jobs</option>
                </select>
              </label>
              <button type="submit">Search</button>
            </form>
            <div className={styles.trustList}>
              {trustItems.map(({ Icon, label }) => (
                <span key={label}>
                  <Icon size={17} />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image
              src="/images/skilllinkup-worldwide/global-talent-collage-v2.png"
              alt="Five smiling professionals working around the world"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <div className={`${styles.floatingCard} ${styles.floatingTop}`}>
              <span className={styles.avatarDot}><Users size={18} /></span>
              <span>
                <strong>Find your professional</strong>
                <small>
                  <MapPin size={12} /> Online and local expertise
                </small>
              </span>
              <Globe2 size={19} />
            </div>
            <div className={`${styles.floatingCard} ${styles.floatingBottom}`}>
              <span className={styles.rating}>
                <Globe2 size={14} /> Global
              </span>
              <span>
                <strong>One global marketplace</strong>
                <small>Online · Local · Jobs</small>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.stats} aria-label="Marketplace statistics">
        {stats.map(({ Icon, value, label }) => (
          <div className={styles.statItem} key={value}>
            <Icon />
            <span>
              <strong>{value}</strong>
              <small>{label}</small>
            </span>
          </div>
        ))}
      </section>
    </>
  );
}

import Link from "next/link";
import { ArrowRight, Camera, ClipboardList, Megaphone, Monitor, MessagesSquare, Wrench } from "lucide-react";
import styles from "./WorldwideHome.module.css";

const services = [
  { title: "Web Design", href: "/online/services?category=web-design", Icon: Monitor, position: "serviceImageOne" },
  { title: "Photography", href: "/online/services?category=photography", Icon: Camera, position: "serviceImageTwo" },
  { title: "Home Repairs", href: "/local?category=home-repairs", Icon: Wrench, position: "serviceImageThree" },
  { title: "Digital Marketing", href: "/online/services?category=marketing", Icon: Megaphone, position: "serviceImageFour" },
  { title: "Virtual Assistance", href: "/online/services?category=virtual-assistance", Icon: ClipboardList, position: "serviceImageFive" },
  { title: "Career Coaching", href: "/online/services?category=coaching", Icon: MessagesSquare, position: "serviceImageSix" },
];

export default function PopularServices() {
  return (
    <section className={`${styles.section} ${styles.popularServicesSection}`} aria-labelledby="popular-services-title">
      <div className={styles.popularServicesHeader}>
        <div>
          <span className={styles.eyebrow}>Start with what you need</span>
          <h2 id="popular-services-title">Popular services</h2>
        </div>

        <nav className={styles.serviceScope} aria-label="Browse services by work type">
          <Link className={styles.serviceScopeActive} href="/local">Local</Link>
          <Link href="/online/services">Online</Link>
        </nav>

        <Link className={styles.popularServicesAll} href="/services">
          View all services <ArrowRight size={16} />
        </Link>
      </div>

      <div className={styles.popularServicesGrid}>
        {services.map(({ title, href, Icon, position }) => (
          <Link className={styles.popularServiceCard} href={href} key={title}>
            <span className={`${styles.popularServiceImage} ${styles[position]}`} aria-hidden="true" />
            <span className={styles.popularServiceIcon}><Icon size={21} strokeWidth={1.9} /></span>
            <strong>{title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

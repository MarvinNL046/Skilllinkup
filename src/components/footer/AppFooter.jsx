import Image from "next/image";
import Link from "next/link";
import { Globe2, Instagram, Linkedin, Mail } from "lucide-react";
import styles from "./AppFooter.module.css";

const columns = [
  {
    title: "For clients",
    links: [
      ["Post a project", "/register"],
      ["Online services", "/services"],
      ["Local services", "/local"],
      ["Post a job", "/register"],
    ],
  },
  {
    title: "For professionals",
    links: [
      ["Join Skilllinkup", "/register"],
      ["Find projects", "/projects"],
      ["Find jobs", "/jobs"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "/about"],
      ["Trust & safety", "/help"],
      ["Help center", "/help"],
      ["Contact", "/contact"],
    ],
  },
];

const socialLinks = [
  { label: "Email Skilllinkup", href: "mailto:info@skilllinkup.com", icon: Mail },
  { label: "Skilllinkup on LinkedIn", href: "https://linkedin.com/company/skilllinkup", icon: Linkedin },
  { label: "Skilllinkup on Instagram", href: "https://instagram.com/skilllinkup", icon: Instagram },
];

export default function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.pattern} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink} aria-label="Skilllinkup home">
              <Image
                src="/images/logo/skilllinkup-template-logo-v2.png"
                alt="Skilllinkup"
                width={736}
                height={168}
                className={styles.logo}
                unoptimized
              />
            </Link>
            <p>One worldwide marketplace for online services, local expertise, and real company jobs.</p>
            <div className={styles.world}><Globe2 size={16} /> English · Worldwide</div>
            <div className={styles.socials}>
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className={styles.column}>
              <h2>{column.title}</h2>
              {column.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Skilllinkup. All rights reserved.</span>
          <nav aria-label="Legal links">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookie-policy">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

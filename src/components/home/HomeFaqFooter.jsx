import Link from "next/link";
import { ArrowRight, Mail, Send } from "lucide-react";
import AppFooter from "@/components/footer/AppFooter";
import styles from "./WorldwideHome.module.css";

const faqs = [
  ["What makes Skilllinkup different?", "Online freelance work, trusted local services, and real company jobs come together in one worldwide marketplace."],
  ["Can I offer more than one type of service?", "Yes. You can offer remote expertise, provide hands-on services locally, and explore company jobs."],
  ["How does Skilllinkup build trust?", "Profiles, reviews, clear agreements, recorded approvals, and verification tools help both sides decide confidently."],
  ["Is Skilllinkup available worldwide?", "Yes. Online services and remote jobs connect globally, while local results match the location you choose."],
  ["How do payments work during beta?", "Skilllinkup does not collect, hold, or release funds during the free private beta. Payment policy will be published before activation."],
  ["Can businesses post permanent jobs?", "Yes. Companies can publish genuine local or remote roles alongside freelance projects."],
];

export default function HomeFaqFooter() {
  return (
    <>
      <section className={`${styles.section} ${styles.faqSection}`}>
        <header className={styles.centerHeading}>
          <span className={styles.eyebrow}>Good to know</span>
          <h2>Frequently asked questions</h2>
          <p>Everything you need before making your first connection.</p>
        </header>
        <div className={styles.faqList}>
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
        <Link className={styles.faqMore} href="/help">Visit the help center <ArrowRight size={16} /></Link>
      </section>

      <section className={`${styles.section} ${styles.newsletterSection}`}>
        <Send size={30} aria-hidden="true" />
        <div><h2>Stay in the loop</h2><p>Useful tips, new opportunities, and product updates—without the noise.</p></div>
        <form action="/newsletter" method="post">
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <div><Mail size={17} /><input id="newsletter-email" type="email" name="email" placeholder="Your email address" required /></div>
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <AppFooter />
    </>
  );
}

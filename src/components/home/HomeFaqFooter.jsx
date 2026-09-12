import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import WaitlistButton from "@/components/ui/WaitlistButton";
import AppFooter from "@/components/footer/AppFooter";
import styles from "./WorldwideHome.module.css";

const faqs = [
  ["What makes Skilllinkup different?", "Online freelance work, local service requests, and real company jobs come together in one worldwide marketplace."],
  ["Can I offer more than one type of service?", "Yes. You can offer remote expertise, provide hands-on services locally, and explore company jobs."],
  ["How does Skilllinkup build trust?", "Compare the published profile and reviews, check any verification badge, and confirm the scope before starting work."],
  ["Is Skilllinkup available worldwide?", "Online discovery supports international projects. Local services depend on the professionals in your chosen area, and jobs may have geographic requirements. The beta network is still growing."],
  ["How do payments work during beta?", "Skilllinkup does not collect, hold, or release funds during the free private beta. Payment policy will be published before activation."],
  ["Can businesses post permanent jobs?", "Yes. Companies can publish permanent, temporary or contract roles after company onboarding and verification."],
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
        <div><h2>Follow the launch</h2><p>Join the waitlist for updates about the Skilllinkup beta.</p></div>
        <div><WaitlistButton label="Join the waitlist" /></div>
      </section>

      <AppFooter />
    </>
  );
}

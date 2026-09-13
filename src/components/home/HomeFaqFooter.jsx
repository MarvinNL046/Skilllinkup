import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import WaitlistButton from "@/components/ui/WaitlistButton";
import AppFooter from "@/components/footer/AppFooter";
import styles from "./WorldwideHome.module.css";

const faqs = [
  ["Can I use Skilllinkup now?", "You can browse published profiles, services and jobs now. Account access is currently by invitation during our private beta. If you already have a beta account, sign in to continue your work."],
  ["What happens when I join the waitlist?", "We will email you about the public launch. Joining the waitlist does not create an account, book a service or guarantee a match."],
  ["Can I hire someone and offer my own services?", "Yes. Beta participants can add another role to the same account and switch between hiring, offering services and finding jobs."],
  ["How do I choose a professional?", "Read their profile, work samples and reviews. Check what any verification badge covers, then discuss the scope, timing and expectations before agreeing to work together."],
  ["Can I work with someone in another country?", "You can explore freelancers for remote projects. Availability depends on the professional and your requirements. Local services depend on your area, and job listings may specify where you need to live or work."],
  ["Does Skilllinkup handle payments?", "No. Skilllinkup does not collect, hold or send project payments during the private beta. Amounts shown in your workspace record agreed project values, not money paid or received."],
  ["Can my company post a job?", "Invited companies can complete onboarding and company verification to publish permanent, temporary or contract roles. Public registration is not open yet."],
];

export default function HomeFaqFooter() {
  return (
    <>
      <section className={`${styles.section} ${styles.faqSection}`}>
        <header className={styles.centerHeading}>
          <span className={styles.eyebrow}>Good to know</span>
          <h2>Frequently asked questions</h2>
          <p>What you can explore today and how the private beta works.</p>
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
        <div><h2>Be there when we open</h2><p>Join the waitlist and we’ll email you about the public launch.</p></div>
        <div><WaitlistButton label="Join the waitlist" /></div>
      </section>

      <AppFooter />
    </>
  );
}

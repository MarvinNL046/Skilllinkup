import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, Globe2, Headphones, ShieldCheck, WalletCards } from "lucide-react";
import styles from "./WorldwideHome.module.css";

const benefits = [
  { Icon: BadgeCheck, title: "Verified professionals", text: "Clear profiles, experience, and identity signals help you know who you are working with.", proof: "Profile and identity checks" },
  { Icon: WalletCards, title: "Clear agreements", text: "Keep scope, milestones and approvals in one place, with a clear record from start to finish.", proof: "Private beta: no payments" },
  { Icon: Globe2, title: "Local and worldwide", text: "Find nearby hands-on help or work with specialists across borders from one marketplace.", proof: "One trusted global network" },
  { Icon: Headphones, title: "Human support", text: "Get practical help when a project, service, quote, or application needs attention.", proof: "Support when it matters" },
];

const stories = [
  { quote: "Hire a specialist worldwide for a defined service or project, then keep scope and delivery in one workspace.", name: "Online", role: "Global freelance work", image: "/images/skilllinkup-home/testimonial-maya-v2.png" },
  { quote: "Request quotes from nearby professionals without publishing your full address to the public marketplace.", name: "Local", role: "Rotterdam–The Hague beta", image: "/images/skilllinkup-home/testimonial-daniel-v2.png" },
  { quote: "Discover a verified company vacancy and track every application step from one candidate dashboard.", name: "Jobs", role: "Dutch and remote European roles", image: "/images/skilllinkup-home/testimonial-amara-v2.png" },
];

export default function TrustStories() {
  return (
    <>
      <section className={`${styles.section} ${styles.whySection}`}>
        <div className={styles.whyInner}>
          <div className={styles.whyIntro}>
            <span className={styles.eyebrow}>Built around trust</span>
            <h2>Why people choose Skilllinkup</h2>
            <p>Good work starts with confidence. Skilllinkup brings people, agreements, progress and support around every collaboration into one clear experience.</p>

            <div className={styles.trustPromise}>
              <span><ShieldCheck size={28} strokeWidth={1.8} /></span>
              <div><strong>Work with confidence</strong><small>Built for real people, real work, and lasting professional relationships.</small></div>
            </div>

            <Link href="/help">Explore trust and safety <ArrowRight size={16} /></Link>
          </div>

          <div className={styles.whyGrid}>
            {benefits.map(({ Icon, title, text, proof }, index) => (
              <article key={title}>
                <div className={styles.whyCardTop}><span><Icon size={24} strokeWidth={1.8} /></span><small>0{index + 1}</small></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className={styles.whyProof}><Check size={14} strokeWidth={2.4} />{proof}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.businessSection}`}>
        <div className={styles.businessPanel}>
          <div className={styles.businessCopy}><span className={styles.eyebrow}>Skilllinkup for business</span><h2>Build your team without borders.</h2><p>Hire independent experts for a single project, find reliable local professionals, or reach candidates for permanent roles.</p><Link href="/business">Explore Skilllinkup for business <ArrowRight size={16} /></Link></div>
          <div className={styles.businessImage}><Image src="/images/skilllinkup-home/business-team-v2.png" alt="A diverse team of professionals collaborating around a laptop" fill unoptimized sizes="(max-width: 800px) 100vw, 55vw" /></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.testimonialSection}`}>
        <header className={styles.centerHeading}><span className={styles.eyebrow}>One connected marketplace</span><h2>Three ways to find the right fit</h2></header>
        <div className={styles.storyGrid}>
          {stories.map((story) => (
            <article className={styles.storyCard} key={story.name}>
              <p>{story.quote}</p>
              <footer><Image src={story.image} alt={story.name} width={48} height={48} unoptimized /><span><strong>{story.name}</strong><small>{story.role}</small></span></footer>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

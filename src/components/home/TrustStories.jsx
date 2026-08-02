import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, Globe2, Headphones, ShieldCheck, Star, WalletCards } from "lucide-react";
import styles from "./WorldwideHome.module.css";

const benefits = [
  { Icon: BadgeCheck, title: "Verified professionals", text: "Clear profiles, experience, and identity signals help you know who you are working with.", proof: "Profile and identity checks" },
  { Icon: WalletCards, title: "Clear agreements", text: "Keep scope, milestones and approvals in one place, with a clear record from start to finish.", proof: "Private beta: no payments" },
  { Icon: Globe2, title: "Local and worldwide", text: "Find nearby hands-on help or work with specialists across borders from one marketplace.", proof: "One trusted global network" },
  { Icon: Headphones, title: "Human support", text: "Get practical help when a project, payment, service, or application needs attention.", proof: "Support when it matters" },
];

const stories = [
  { quote: "We found a designer in Lisbon on Monday and launched our new brand three weeks later.", name: "Maya Collins", role: "Founder, Northstar Studio", image: "/images/skilllinkup-home/testimonial-maya-v2.png" },
  { quote: "The technician was verified, nearby, and had our air conditioning running that same afternoon.", name: "Daniel Weber", role: "Homeowner, Berlin", image: "/images/skilllinkup-home/testimonial-daniel-v2.png" },
  { quote: "I came for freelance projects and discovered a remote role that became my full-time career.", name: "Amara Mensah", role: "Product marketer, Accra", image: "/images/skilllinkup-home/testimonial-amara-v2.png" },
];

export default function TrustStories() {
  return (
    <>
      <section className={`${styles.section} ${styles.whySection}`}>
        <div className={styles.whyInner}>
          <div className={styles.whyIntro}>
            <span className={styles.eyebrow}>Built around trust</span>
            <h2>Why people choose Skilllinkup</h2>
            <p>Good work starts with confidence. Skilllinkup brings the people, agreements, payments, and support around every collaboration into one clear experience.</p>

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
        <header className={styles.centerHeading}><span className={styles.eyebrow}>Real connections</span><h2>What our community says</h2></header>
        <div className={styles.storyGrid}>
          {stories.map((story) => (
            <blockquote className={styles.storyCard} key={story.name}>
              <div className={styles.stars} aria-label="Five out of five stars">
                {Array.from({ length: 5 }, (_, index) => <Star size={13} fill="currentColor" key={index} />)}
              </div>
              <p>&ldquo;{story.quote}&rdquo;</p>
              <footer><Image src={story.image} alt={story.name} width={48} height={48} unoptimized /><span><strong>{story.name}</strong><small>{story.role}</small></span></footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}

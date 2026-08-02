import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileCheck2, MessageSquareText, ShieldCheck } from "lucide-react";
import styles from "./WorldwideHome.module.css";

const steps = [
  { number: "1", title: "Tell us what you need", text: "Post a project, find local help, or explore real company jobs." },
  { number: "2", title: "Compare professionals", text: "Review profiles, ratings, experience, location, and availability." },
  { number: "3", title: "Work safely together", text: "Set clear terms, pay securely, and stay connected from start to finish." },
];

export default function ProcessWorkspace() {
  return (
    <>
      <section className={`${styles.section} ${styles.processSection}`}>
        <header className={styles.centerHeading}>
          <span className={styles.eyebrow}>Simple from start to finish</span>
          <h2>How Skilllinkup works</h2>
        </header>
        <div className={styles.processVisual}>
          <Image
            src="/images/skilllinkup-home/how-skilllinkup-works-v1.png"
            alt="Three steps: describe the work, compare professionals, and collaborate securely"
            width={2172}
            height={724}
            sizes="(max-width: 760px) 100vw, 960px"
            unoptimized
            data-pin-nopin="true"
          />
        </div>
        <div className={styles.stepsGrid}>
          {steps.map(({ number, title, text }) => (
            <article className={styles.stepCard} key={number}>
              <span className={styles.stepNumber}>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.workspaceSection}`}>
        <div className={styles.workspacePanel}>
          <div className={styles.workspaceCopy}>
            <span className={styles.eyebrow}>Everything in one place</span>
            <h2>From first message to finished work.</h2>
            <p>Keep the entire collaboration clear, organized, and protected inside one shared workspace.</p>
            <ul>
              <li><ShieldCheck size={18} /><span><strong>Recorded approvals</strong>Confirm delivered milestones in one clear workspace.</span></li>
              <li><MessageSquareText size={18} /><span><strong>Built-in conversations</strong>Keep messages and project details together.</span></li>
              <li><FileCheck2 size={18} /><span><strong>Clear agreements</strong>Record scope, timing, files, and decisions.</span></li>
            </ul>
            <Link href="/how-it-works">Discover how it works <ArrowRight size={16} /></Link>
          </div>
          <div className={styles.workspaceMock} aria-label="Example Skilllinkup project workspace">
            <Image
              src="/images/skilllinkup-home/project-workspace-v1.png"
              alt="Skilllinkup project dashboard with project progress, protected payment, messages, and shared files"
              width={1536}
              height={1024}
              sizes="(max-width: 1050px) 100vw, 760px"
              unoptimized
              data-pin-nopin="true"
            />
          </div>
        </div>
      </section>
    </>
  );
}

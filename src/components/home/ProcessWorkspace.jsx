import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileCheck2, MessageSquareText, ShieldCheck } from "lucide-react";
import styles from "./WorldwideHome.module.css";

const steps = [
  { number: "1", title: "Describe your project", text: "Tell freelancers what you need, when you need it and your budget." },
  { number: "2", title: "Choose a freelancer", text: "Compare proposals, ask questions and agree on the scope and timing." },
  { number: "3", title: "Keep the work together", text: "Share messages and files, request changes and approve the finished work." },
];

export default function ProcessWorkspace() {
  return (
    <>
      <section className={`${styles.section} ${styles.processSection}`}>
        <header className={styles.centerHeading}>
          <span className={styles.eyebrow}>For Online beta participants</span>
          <h2>From project brief to delivery</h2>
        </header>
        <div className={styles.processVisual}>
          <Image
            src="/images/skilllinkup-home/how-skilllinkup-works-v1.png"
            alt="Three steps: describe the work, compare professionals, and agree on the work"
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
            <p>Keep your agreement, messages and delivery files with the order, so you and your freelancer can pick up where you left off. Skilllinkup does not process payments.</p>
            <ul>
              <li><ShieldCheck size={18} /><span><strong>Review the delivery</strong>Ask for changes or approve the finished work.</span></li>
              <li><MessageSquareText size={18} /><span><strong>Keep the conversation together</strong>Find project messages alongside the order.</span></li>
              <li><FileCheck2 size={18} /><span><strong>Find the latest files</strong>Open shared files and follow the delivery history.</span></li>
            </ul>
            <Button asChild><Link href="/help">Read the help guide <ArrowRight size={16} /></Link></Button>
          </div>
          <div className={styles.workspaceMock} aria-label="Example Skilllinkup project workspace">
            <Image
              src="/images/skilllinkup-home/project-workspace-v1.png"
              alt="Illustrative Skilllinkup project workspace showing progress, messages and shared files"
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

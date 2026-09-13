import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WaitlistButton from "@/components/ui/WaitlistButton";
import styles from "@/components/marketplace/WorldEntryPoints.module.css";

const steps = [
  ["Set up your company", "Use the company hiring role in your account. Add your company details and submit the verification request from the vacancy setup page."],
  ["Publish a vacancy", "Describe the role, requirements, location, working arrangements and salary details. Company verification is required before your vacancy appears in public search."],
  ["Review applications", "Open the vacancy in your dashboard to read applications and attached CVs. Keep candidate information within your hiring team."],
  ["Keep candidates informed", "Update the application stage as you review, interview and make a decision. Candidates can follow those updates from their own dashboard."],
];

export default function CompanyHiringLanding() {
  return <main className={styles.section}>
    <section className={styles.hero}><div><header><p className={styles.eyebrow}>The Jobs world · For employers</p><h1>Find people for your next company role.</h1><p>Publish a vacancy, review applications and keep hiring decisions organised. Here is how to get started as an invited beta employer.</p></header>
    <div className={styles.actions}><Button asChild><Link href="/create-job">Set up hiring and post a vacancy</Link></Button><Button asChild variant="outline"><Link href="/manage-jobs">Manage my vacancies</Link></Button></div>
    <p>Account access is currently by invitation. If you don’t have an invitation, join the waitlist for public launch updates.</p>
    <WaitlistButton label="Get launch updates" initialSkill="Company hiring" variant="outline" /></div>
    <Image src="/images/skilllinkup-home/business-team-v2.png" alt="A team discussing work together" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 600px" className={styles.heroImage} priority /></section>
    <h2>From company profile to applications</h2>
    <div className={styles.grid}>{steps.map(([title, text], index) => <article key={title}><p className={styles.eyebrow}>Step {index + 1}</p><h3>{title}</h3><p>{text}</p></article>)}</div>
    <section className="mt-10"><h2>What can I do as an employer?</h2>
      <p>You can publish and manage your vacancies, review people who apply to them and update their application status. There is currently no public CV bank or directory for searching all job seekers.</p>
      <p>If you need a freelancer for a project rather than a company role, explore the <Link className={styles.textLink} href="/online">Online world</Link>.</p>
    </section>
    <section className="mt-10"><h2>Looking for a job yourself?</h2><p>Browse vacancies and add your CV when applying. Your dashboard keeps track of the applications you send.</p><Button asChild variant="outline"><Link href="/jobs/browse">Browse jobs</Link></Button></section>
  </main>;
}

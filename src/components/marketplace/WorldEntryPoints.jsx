import Link from "next/link";
import { Button } from "@/components/ui/button";
import WaitlistButton from "@/components/ui/WaitlistButton";
import styles from "./WorldEntryPoints.module.css";

const entries = {
  online: [
    { title: "I need a freelancer", text: "Explore profiles and services, or post a project so freelancers can propose an approach.", primary: ["Browse freelancers", "/online/freelancers"], account: ["Post a project", "/create-projects"] },
    { title: "I offer online services", text: "Describe your skills, publish a service and send proposals for projects that fit your experience.", primary: ["Browse projects", "/projects"], account: ["Set up my freelancer profile", "/onboarding?role=freelancer"] },
  ],
  local: [
    { title: "I need help nearby", text: "Explore local professionals. Describe the job and location when you are ready to request quotes.", primary: ["Browse local professionals", "/local/craftsmen"], account: ["Request quotes", "/local/request-quote"] },
    { title: "I offer local services", text: "Add your trade and service area, explore local requests and quote for work that fits your availability.", primary: ["Browse local requests", "/local/quote-requests"], account: ["Set up my local profile", "/onboarding?role=local_professional"] },
  ],
  jobs: [
    { title: "I’m looking for a job", text: "Set up your job-seeker profile and attach a CV when you apply to a vacancy. Follow your applications from your dashboard. Your CV is not a public listing.", primary: ["Browse jobs", "/jobs/browse"], account: ["Set up my job-seeker profile", "/onboarding?role=candidate&redirect_url=%2Fdashboard%2Fapplications"], extra: ["View my applications", "/dashboard/applications"] },
    { title: "I’m looking for people", text: "Set up your company, complete verification and publish a vacancy. Review the people who apply and update their application status from your dashboard.", primary: ["See how hiring works", "/jobs/companies"], account: ["Post a vacancy", "/create-job"], extra: ["Manage my vacancies", "/manage-jobs"] },
  ],
};

export default function WorldEntryPoints({ world }) {
  const paths = entries[world];
  if (!paths) return null;
  return <section className={styles.section} aria-labelledby={`${world}-start-title`}>
    <header><p className={styles.eyebrow}>Your place in the {world === "jobs" ? "Jobs" : world === "local" ? "Local" : "Online"} world</p><h2 id={`${world}-start-title`}>What would you like to do?</h2><p>You can browse now. Account setup, posting and applications are for invited beta members.</p></header>
    <div className={styles.grid}>{paths.map(path => <article key={path.title}>
      <h3>{path.title}</h3><p>{path.text}</p>
      <div className={styles.actions}><Button asChild><Link href={path.primary[1]}>{path.primary[0]}</Link></Button><Button asChild variant="outline"><Link href={path.account[1]}>{path.account[0]}</Link></Button></div>
      {path.extra && <Link className={styles.textLink} href={path.extra[1]}>{path.extra[0]}</Link>}
    </article>)}</div>
    <div className={styles.access}><p>Don’t have an invitation? Join the waitlist for public launch updates.</p><WaitlistButton label="Get launch updates" /></div>
  </section>;
}

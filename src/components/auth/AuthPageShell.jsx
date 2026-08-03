import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Laptop2,
  Rocket,
  Search,
  ShieldCheck,
  UserRound,
  UserRoundSearch,
  Wrench,
} from "lucide-react";
import styles from "./AuthPageShell.module.css";

export const clerkAppearance = {
  elements: {
    rootBox: { width: "100%" }, cardBox: { width: "100%", boxShadow: "none" },
    card: { width: "100%", padding: 0, background: "transparent", border: 0, boxShadow: "none" }, header: { display: "none" },
    socialButtonsBlockButton: { minHeight: "46px", borderRadius: "8px", borderColor: "#dce3e7", fontWeight: 700 }, socialButtonsBlockButtonText: { fontSize: "13px" },
    dividerLine: { background: "#e1e6e9" }, dividerText: { color: "#748196", fontSize: "11px" },
    formFieldLabel: { color: "#0a2448", fontSize: "12px", fontWeight: 750 }, formFieldInput: { minHeight: "48px", borderRadius: "8px", borderColor: "#d7dfe4", fontSize: "14px" },
    formButtonPrimary: { minHeight: "48px", borderRadius: "8px", background: "#ff4d32", fontWeight: 800, boxShadow: "0 8px 18px rgba(255,77,50,.2)" },
    footerAction: { marginTop: "18px" }, footerActionText: { color: "#68778c", fontSize: "12px" }, footerActionLink: { color: "#ff4d32", fontWeight: 800 },
    identityPreviewText: { color: "#0a2448" }, formResendCodeLink: { color: "#ff4d32" },
  },
  variables: { colorPrimary: "#ff4d32", colorText: "#0a2448", colorTextSecondary: "#68778c", colorBackground: "#ffffff", borderRadius: "8px", fontFamily: "var(--font-sans)" },
};

const steps = [
  { title: "Create your account", text: "Choose how you want to use Skilllinkup.", Icon: UserRound },
  { title: "Build your profile", text: "Tell us what you need or what you offer.", Icon: BriefcaseBusiness },
  { title: "Ready to start", text: "Receive matches and work securely together.", Icon: Rocket },
];

export function AuthTopBar() {
  return <header className={styles.topbar}><Link href="/" aria-label="Skilllinkup home"><Image src="/images/logo/skilllinkup-template-logo-v2.png" alt="Skilllinkup" width={736} height={168} priority /></Link><Link href="/"><ArrowLeft size={17} />Back to home</Link></header>;
}

export function RoleChoice({ role }) {
  const choices = [
    { id: "client", title: "Hire or book someone", text: "Find online talent or a trusted professional nearby.", Icon: UserRoundSearch },
    { id: "freelancer", title: "Offer online services", text: "Work with clients worldwide as an online freelancer.", Icon: Laptop2 },
    { id: "local_professional", title: "Offer local services", text: "Receive suitable requests in your service area.", Icon: Wrench },
    { id: "candidate", title: "Find a job", text: "Apply for genuine remote, hybrid or local vacancies.", Icon: Search },
    { id: "company", title: "Hire for a company", text: "Publish vacancies and manage candidates.", Icon: Building2 },
  ];

  return (
    <div className={styles.roles}>
      <span>How do you want to start?</span>
      <div>
        {choices.map(({ id, title, text, Icon }) => (
          <Link key={id} className={role === id ? styles.selectedRole : ""} href={`/register?role=${id}`}>
            <i><Icon /></i>
            <strong>{title}</strong>
            <small>{text}</small>
            <BadgeCheck />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function AuthPageShell({ mode, title, subtitle, children }) {
  const login = mode === "login";
  return <div className={styles.page}><AuthTopBar /><main className={`${styles.shell} ${login ? styles.loginShell : styles.registerShell}`}>
    {login ? <aside className={styles.story}><div className={styles.storyImage}><Image src="/images/skilllinkup-webdesign/webdesign-hero-v1.png" alt="Professional preparing an online project" fill priority sizes="(max-width: 820px) 100vw, 38vw" /></div><div className={styles.storyQuote}><span>3</span><blockquote>One account for worldwide freelance work, trusted local services and genuine company jobs.</blockquote><div><Image src="/images/logo/skilllinkup-template-logo-v2.png" alt="" width={106} height={24} /><strong>Free private beta<small>No platform payments</small></strong></div></div></aside> : null}
    <section className={styles.formPanel}><header><span className={styles.eyebrow}>{login ? "Welcome back" : "Join Skilllinkup"}</span><h1>{title}</h1><p>{subtitle}</p></header>{children}<div className={styles.privacy}><ShieldCheck size={22} /><span><strong>Your information is safe.</strong><small>We protect your privacy and account data.</small></span></div></section>
    {!login ? <aside className={styles.stepsPanel}><span className={styles.eyebrow}>Getting started</span><h2>How Skilllinkup works</h2><div className={styles.steps}>{steps.map(({ title: stepTitle, text, Icon }, index) => <article key={stepTitle}><b>{index + 1}</b><i><Icon /></i><span><strong>{stepTitle}</strong><small>{text}</small></span></article>)}</div><div className={styles.memberProof}><ShieldCheck /><span><strong>3 connected products</strong><small>Online · Local · Jobs</small></span></div></aside> : null}
  </main></div>;
}

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
    // Clerk reuses its header for verification destinations and recovery steps.
    // Hiding it globally removes essential instructions after the first screen.
    card: { width: "100%", padding: 0, background: "transparent", border: 0, boxShadow: "none" },
    headerTitle: styles.clerkTitle,
    headerSubtitle: { color: "#68778c", textAlign: "left", fontSize: "14px", lineHeight: "1.5" },
    header: { alignItems: "flex-start", textAlign: "left" },
    socialButtonsBlockButton: "skl-action-secondary", socialButtonsBlockButtonText: { fontSize: "14px", fontWeight: 600 },
    dividerLine: { background: "#e1e6e9" }, dividerText: { color: "#748196", fontSize: "11px" },
    formFieldLabel: { color: "#0a2448", fontSize: "14px", fontWeight: 600 }, formFieldInput: styles.authInput,
    formButtonPrimary: `skl-action-primary ${styles.authPrimary}`,
    footerAction: { marginTop: "18px", gap: "6px", flexWrap: "wrap", justifyContent: "center", textAlign: "center" }, footerActionText: { color: "#68778c", fontSize: "12px" }, footerActionLink: { color: "var(--action-link-text)", fontWeight: 600, whiteSpace: "nowrap" },
    identityPreviewText: { color: "#0a2448" }, formResendCodeLink: { color: "var(--action-link-text)" },
  },
  variables: { colorPrimary: "var(--action-link-text)", colorText: "#0a2448", colorTextSecondary: "#68778c", colorBackground: "#ffffff", borderRadius: "8px", fontFamily: "var(--font-sans)" },
};

const steps = [
  { title: "Create your account", text: "Choose how you want to use Skilllinkup.", Icon: UserRound },
  { title: "Build your profile", text: "Tell us what you need or what you offer.", Icon: BriefcaseBusiness },
  { title: "Open your dashboard", text: "Find your projects, messages and next steps.", Icon: Rocket },
];

export function AuthTopBar() {
  return <header className={styles.topbar}><Link href="/" aria-label="Skilllinkup home"><Image src="/images/logo/skilllinkup-brand.png" alt="Skilllinkup" width={736} height={168} priority /></Link><Link className="skl-action-secondary" href="/"><ArrowLeft size={17} />Back to home</Link></header>;
}

export function RoleChoice({ role }) {
  const choices = [
    { id: "client", title: "Hire someone", text: "Find a freelancer or a local professional for your project.", Icon: UserRoundSearch },
    { id: "freelancer", title: "Offer online services", text: "Work with clients worldwide as an online freelancer.", Icon: Laptop2 },
    { id: "local_professional", title: "Offer local services", text: "Explore requests for work in your service area.", Icon: Wrench },
    { id: "candidate", title: "Find a job", text: "Explore remote, hybrid and on-site company roles.", Icon: Search },
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
    {login ? <aside className={styles.story}><div className={styles.storyImage}><Image src="/images/skilllinkup-webdesign/webdesign-hero-v1.png" alt="Professional preparing an online project" fill priority sizes="(max-width: 820px) 100vw, 38vw" /></div><div className={styles.storyQuote}><p>One account for worldwide freelance work, local services and company jobs.</p><div><span className={styles.storyLogo}><Image src="/images/logo/skilllinkup-brand.png" alt="Skilllinkup" width={106} height={24} /></span><strong>Free private beta<small>No platform payments</small></strong></div></div></aside> : null}
    <section className={styles.formPanel}>{!login && <header><span className={styles.eyebrow}>Join Skilllinkup</span><h1>{title}</h1><p>{subtitle}</p></header>}{children}<div className={styles.privacy}><ShieldCheck size={22} /><span><strong>Your information is safe.</strong><small>We protect your privacy and account data.</small></span></div></section>
    {!login ? <aside className={styles.stepsPanel}><span className={styles.eyebrow}>Getting started</span><h2>How Skilllinkup works</h2><div className={styles.steps}>{steps.map(({ title: stepTitle, text, Icon }, index) => <article key={stepTitle}><b>{index + 1}</b><i><Icon /></i><span><strong>{stepTitle}</strong><small>{text}</small></span></article>)}</div><div className={styles.memberProof}><ShieldCheck /><span><strong>3 connected worlds</strong><small>Online · Local · Jobs</small></span></div></aside> : null}
  </main></div>;
}

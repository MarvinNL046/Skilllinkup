import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, BriefcaseBusiness, Rocket, ShieldCheck, UserRound } from "lucide-react";
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
  return <div className={styles.roles}><span>I want to…</span><div><Link className={!role || role === "client" ? styles.selectedRole : ""} href="/register?role=client"><i><UserRound /></i><strong>Hire a professional</strong><small>I have a project and want the right match.</small><BadgeCheck /></Link><Link className={role === "freelancer" ? styles.selectedRole : ""} href="/register?role=freelancer"><i><BriefcaseBusiness /></i><strong>Work as a professional</strong><small>I want to offer services and find projects.</small><BadgeCheck /></Link></div></div>;
}

export default function AuthPageShell({ mode, title, subtitle, children }) {
  const login = mode === "login";
  return <div className={styles.page}><AuthTopBar /><main className={`${styles.shell} ${login ? styles.loginShell : styles.registerShell}`}>
    {login ? <aside className={styles.story}><div className={styles.storyImage}><Image src="/images/skilllinkup-webdesign/webdesign-hero-v1.png" alt="Professional preparing an online project" fill priority sizes="(max-width: 820px) 100vw, 38vw" /></div><div className={styles.storyQuote}><span>3</span><blockquote>One account for worldwide freelance work, trusted local services and genuine company jobs.</blockquote><div><Image src="/images/logo/skilllinkup-link-logo.png" alt="" width={46} height={46} /><strong>Free private beta<small>No platform payments</small></strong></div></div></aside> : null}
    <section className={styles.formPanel}><header><span className={styles.eyebrow}>{login ? "Welcome back" : "Join Skilllinkup"}</span><h1>{title}</h1><p>{subtitle}</p></header>{children}<div className={styles.privacy}><ShieldCheck size={22} /><span><strong>Your information is safe.</strong><small>We protect your privacy and account data.</small></span></div></section>
    {!login ? <aside className={styles.stepsPanel}><span className={styles.eyebrow}>Getting started</span><h2>How Skilllinkup works</h2><div className={styles.steps}>{steps.map(({ title: stepTitle, text, Icon }, index) => <article key={stepTitle}><b>{index + 1}</b><i><Icon /></i><span><strong>{stepTitle}</strong><small>{text}</small></span></article>)}</div><div className={styles.memberProof}><ShieldCheck /><span><strong>3 connected products</strong><small>Online · Local · Jobs</small></span></div></aside> : null}
  </main></div>;
}

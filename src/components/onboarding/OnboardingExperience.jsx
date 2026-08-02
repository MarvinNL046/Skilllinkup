"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Globe2,
  Laptop2,
  LoaderCircle,
  MapPin,
  Search,
  ShieldCheck,
  UserRoundSearch,
  Wrench,
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import styles from "./OnboardingExperience.module.css";

const roles = [
  {
    id: "client",
    title: "I want to hire",
    description: "Find online talent or trusted professionals nearby.",
    Icon: UserRoundSearch,
    world: "online",
  },
  {
    id: "freelancer",
    title: "I work online",
    description: "Offer digital services to clients worldwide.",
    Icon: Laptop2,
    world: "online",
  },
  {
    id: "local_professional",
    title: "I work locally",
    description: "Receive qualified requests in your service area.",
    Icon: Wrench,
    world: "local",
  },
  {
    id: "candidate",
    title: "I am looking for a job",
    description: "Discover verified local and remote company roles.",
    Icon: BriefcaseBusiness,
    world: "jobs",
  },
  {
    id: "company",
    title: "I hire for a company",
    description: "Publish real vacancies and manage candidates.",
    Icon: Building2,
    world: "jobs",
  },
];

const onlineSkills = ["Web development", "Product design", "Marketing", "Writing", "Video & audio", "Data & AI", "Business support", "Photography"];
const localTrades = ["HVAC", "Plumbing", "Carpentry", "Electrical", "Painting", "Roofing", "Cleaning", "Landscaping"];
const jobDisciplines = ["Engineering", "Design & product", "Marketing", "Sales", "Operations", "Finance", "People & HR", "Customer success"];
const clientNeeds = ["Build a website", "Design & branding", "Marketing & growth", "Business support", "Home maintenance", "Renovation", "Coaching", "Something else"];

function roleFromQuery(value) {
  return roles.some((item) => item.id === value) ? value : null;
}

export default function OnboardingExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { convexUser, isLoaded, isClerkSignedIn } = useConvexUser();
  const setAccountContext = useMutation(api.users.setAccountContext);
  const updateProfile = useMutation(api.marketplace.freelancers.updateProfile);
  const updateBio = useMutation(api.users.updateBio);

  const requestedRole = roleFromQuery(searchParams.get("role"));
  const [step, setStep] = useState(requestedRole ? 2 : 1);
  const [role, setRole] = useState(requestedRole);
  const [world, setWorld] = useState("online");
  const [selections, setSelections] = useState([]);
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("Rotterdam");
  const [rate, setRate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoaded && !isClerkSignedIn) {
      router.replace(`/login?redirect_url=${encodeURIComponent("/onboarding")}`);
    }
  }, [isClerkSignedIn, isLoaded, router]);

  useEffect(() => {
    if (!role) return;
    const config = roles.find((item) => item.id === role);
    setWorld(config?.world || "online");
    setSelections([]);
  }, [role]);

  const options = useMemo(() => {
    if (role === "freelancer") return onlineSkills;
    if (role === "local_professional") return localTrades;
    if (role === "candidate") return jobDisciplines;
    if (role === "client") return clientNeeds;
    return [];
  }, [role]);

  function toggleSelection(value) {
    setSelections((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : current.length < 8
          ? [...current, value]
          : current
    );
  }

  function chooseRole(nextRole) {
    setRole(nextRole);
    setError("");
    setStep(2);
  }

  function validate() {
    if (!role) return "Choose how you want to use Skilllinkup.";
    if (role === "freelancer" && selections.length === 0) return "Choose at least one online skill.";
    if (role === "local_professional" && selections.length === 0) return "Choose at least one local trade.";
    if (role === "local_professional" && city.trim().length < 2) return "Enter the city or region you serve.";
    if (role === "candidate" && selections.length === 0) return "Choose at least one job discipline.";
    if (role === "company" && companyName.trim().length < 2) return "Enter your company name.";
    if (rate && (!Number.isFinite(Number(rate)) || Number(rate) < 1 || Number(rate) > 9999)) return "Enter a valid hourly rate.";
    return null;
  }

  async function finishSetup(event) {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSaving(true);
    setError("");
    try {
      const existingRoles = convexUser?.accountRoles || [];
      const result = await setAccountContext({
        accountRoles: [...new Set([...existingRoles, role])],
        activeRole: role,
        preferredWorld: world,
        onboardingVersion: 1,
      });

      if ((role === "freelancer" || role === "local_professional") && result.profileId) {
        await updateProfile({
          profileId: result.profileId,
          tagline: headline.trim() || undefined,
          bio: bio.trim() || undefined,
          hourlyRate: rate ? Number(rate) : undefined,
          workType: role === "local_professional" ? "local" : "remote",
          locationCity: role === "local_professional" ? city.trim() : undefined,
          locationCountry: role === "local_professional" ? "Netherlands" : undefined,
          serviceRadiusKm: role === "local_professional" ? 25 : undefined,
          skills: selections,
          isAvailable: true,
        });
      } else {
        const details = [
          companyName.trim() ? `Company: ${companyName.trim()}` : "",
          headline.trim(),
          bio.trim(),
          selections.length ? `Interests: ${selections.join(", ")}` : "",
        ].filter(Boolean).join("\n");
        if (details) await updateBio({ bio: details.slice(0, 1200) });
      }

      router.replace("/dashboard");
    } catch (cause) {
      setError(cause?.message || "We could not finish your account setup. Please try again.");
      setSaving(false);
    }
  }

  if (!isLoaded || (isClerkSignedIn && convexUser === undefined)) {
    return <div className={styles.loading}><LoaderCircle /><span>Preparing your account…</span></div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image src="/images/logo/skilllinkup-template-logo-v2.png" alt="Skilllinkup" width={170} height={42} priority />
        <span><ShieldCheck size={17} /> Secure account setup</span>
      </header>

      <main className={styles.shell}>
        <section className={styles.intro}>
          <p className={styles.eyebrow}>One account · three marketplaces</p>
          <h1>{step === 1 ? "What brings you to Skilllinkup?" : "Make your account work for you"}</h1>
          <p>{step === 1 ? "Choose your starting role. You can add another role or switch product worlds later." : "A few useful details help us show better matches from day one."}</p>
          <div className={styles.progress} aria-label={`Step ${step} of 2`}><span style={{ width: `${step * 50}%` }} /></div>
          <small>Step {step} of 2</small>
        </section>

        {step === 1 ? (
          <section className={styles.roleGrid} aria-label="Choose an account role">
            {roles.map(({ id, title, description, Icon }) => (
              <button key={id} type="button" className={styles.roleCard} onClick={() => chooseRole(id)}>
                <i><Icon /></i>
                <span><strong>{title}</strong><small>{description}</small></span>
                <ArrowRight />
              </button>
            ))}
          </section>
        ) : (
          <form className={styles.form} onSubmit={finishSetup}>
            <div className={styles.selectedRole}>
              {(() => { const selected = roles.find((item) => item.id === role); const Icon = selected?.Icon || Search; return <><i><Icon /></i><div><small>Your starting role</small><strong>{selected?.title}</strong></div><button type="button" onClick={() => setStep(1)}>Change</button></>; })()}
            </div>

            {role === "client" ? (
              <fieldset className={styles.worldChoice}>
                <legend>Where do you need help first?</legend>
                <button type="button" className={world === "online" ? styles.activeChoice : ""} onClick={() => setWorld("online")}><Globe2 /><span><strong>Online, worldwide</strong><small>Digital services and freelance projects</small></span><Check /></button>
                <button type="button" className={world === "local" ? styles.activeChoice : ""} onClick={() => setWorld("local")}><MapPin /><span><strong>Local, nearby</strong><small>Trusted professionals around Rotterdam–The Hague</small></span><Check /></button>
              </fieldset>
            ) : null}

            {role === "company" ? (
              <label className={styles.field}><span>Company name</span><input value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder="Your organisation" maxLength={100} required /></label>
            ) : null}

            {role !== "client" && role !== "company" ? (
              <label className={styles.field}><span>{role === "candidate" ? "Professional headline" : "Profile headline"} <em>optional</em></span><input value={headline} onChange={(event) => setHeadline(event.target.value)} placeholder={role === "local_professional" ? "e.g. Certified HVAC technician" : "What do you do best?"} maxLength={120} /></label>
            ) : null}

            {role === "local_professional" ? (
              <label className={styles.field}><span>Primary service city</span><input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Rotterdam" maxLength={100} required /></label>
            ) : null}

            {options.length ? (
              <fieldset className={styles.options}>
                <legend>{role === "client" ? "What are you interested in?" : role === "candidate" ? "Which roles interest you?" : "Choose your strongest skills"}</legend>
                <p>Select up to eight. You can refine this later.</p>
                <div>{options.map((option) => <button key={option} type="button" className={selections.includes(option) ? styles.selectedOption : ""} onClick={() => toggleSelection(option)}>{selections.includes(option) ? <Check size={14} /> : null}{option}</button>)}</div>
              </fieldset>
            ) : null}

            {role === "freelancer" || role === "local_professional" ? (
              <div className={styles.splitFields}>
                <label className={styles.field}><span>Short introduction <em>optional</em></span><textarea value={bio} onChange={(event) => setBio(event.target.value)} placeholder="Tell clients what they can rely on you for." rows={4} maxLength={800} /></label>
                <label className={styles.field}><span>Hourly rate <em>optional</em></span><span className={styles.moneyInput}><b>€</b><input type="number" value={rate} onChange={(event) => setRate(event.target.value)} min="1" max="9999" placeholder="65" /><b>/ hour</b></span></label>
              </div>
            ) : role === "candidate" || role === "company" ? (
              <label className={styles.field}><span>{role === "company" ? "What kind of people are you hiring?" : "What are you looking for?"} <em>optional</em></span><textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={4} maxLength={800} /></label>
            ) : null}

            {error ? <p className={styles.error} role="alert">{error}</p> : null}
            <div className={styles.actions}>
              <button type="button" onClick={() => setStep(1)}><ArrowLeft size={17} /> Back</button>
              <button type="submit" disabled={saving}>{saving ? <LoaderCircle className={styles.spinner} /> : null}{saving ? "Saving your account…" : "Finish setup"}<ArrowRight size={17} /></button>
            </div>
          </form>
        )}
      </main>
      <footer className={styles.footer}><ShieldCheck size={16} /> Your role only controls your experience. You can switch safely at any time.</footer>
    </div>
  );
}

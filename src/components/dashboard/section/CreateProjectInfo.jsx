"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import {
  ArrowLeft, ArrowRight, Bold, BriefcaseBusiness, CalendarDays, Check,
  CheckCircle2, ChevronDown, CircleHelp, ClipboardList, Clock3, CloudUpload,
  FileText, Globe2, Italic, Lightbulb, Link2, List, ListOrdered, LockKeyhole,
  MapPin, MessageCircle, Monitor, Paperclip, PenLine, Plus, Redo2, ShieldCheck,
  Sparkles, Target, Trash2, Underline, Undo2, UsersRound, WandSparkles,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";
import styles from "./CreateProjectInfo.module.css";

const STEPS = ["Basics", "Details", "Budget", "Planning", "Review"];
const DEFAULT_SKILLS = ["Web Design", "UI/UX Design", "Responsive Design", "Figma", "WordPress", "HTML/CSS"];
const EXPERIENCE = [
  { value: "entry", title: "Starter", text: "Enthusiastic professional with growing experience", icon: Sparkles },
  { value: "intermediate", title: "Experienced", text: "Proven experience and successful projects", icon: WandSparkles },
  { value: "expert", title: "Expert", text: "Specialist with deep experience and top results", icon: Target },
];
const PROJECT_TYPES = [
  { value: "one-off", title: "One-time project", text: "A clear goal with one concrete result", icon: ClipboardList },
  { value: "ongoing", title: "Ongoing project", text: "Long-term collaboration across several phases", icon: Clock3 },
  { value: "consulting", title: "Advice or consulting", text: "Strategy, direction or a second opinion", icon: MessageCircle },
];

function generateSlug(title) {
  return `${title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80)}-${Date.now()}`;
}

function Field({ label, hint, optional, children }) {
  return <div className={styles.field}><div className={styles.fieldHead}><label>{label}{optional ? <span> (optional)</span> : null}</label>{hint ? <small>{hint}</small> : null}</div>{children}</div>;
}

function ChoiceCard({ active, icon: Icon, title, text, onClick }) {
  return <button type="button" className={`${styles.choiceCard} ${active ? styles.choiceActive : ""}`} onClick={onClick}><Icon size={19} /><strong>{title}</strong><span>{text}</span>{active ? <CheckCircle2 className={styles.choiceCheck} size={17} /> : null}</button>;
}

function SummaryRow({ icon: Icon, label, value }) {
  return <div className={styles.summaryRow}><span><Icon size={16} />{label}</span><strong>{value}</strong></div>;
}

export default function CreateProjectInfo() {
  const router = useRouter();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const createProject = useMutation(api.marketplace.projects.create);
  const serviceType = convexUser?.preferredWorld === "local" ? "local" : "digital";
  const categories = useQuery(api.marketplace.categories.list, { locale: "en", serviceType });
  const leafCategories = useMemo(() => categories ? flattenLeafMarketplaceCategories(categories) : [], [categories]);

  const [step, setStep] = useState(2);
  const [budgetMode, setBudgetMode] = useState("fixed");
  const [experience, setExperience] = useState("entry");
  const [projectType, setProjectType] = useState("one-off");
  const [attachmentName, setAttachmentName] = useState("Brand_Guidelines.pdf");
  const [status, setStatus] = useState({ loading: false, error: null });
  const [form, setForm] = useState({
    title: "New website for a sustainable interior brand",
    description: "We are looking for a creative web designer who can create a modern, user-friendly website for our sustainable interior brand.\n\nThe website should reflect our values: sustainable, minimal and warm, with an excellent experience on desktop and mobile.\n\nKey pages: Home, About, Collection, Sustainability, Blog and Contact.",
    categoryId: "",
    budgetMin: "1500",
    budgetMax: "3000",
    requiredSkills: DEFAULT_SKILLS,
    deadline: "2026-08-31",
    startDate: "2026-08-02",
    workType: "remote",
    location: "",
  });

  const setField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (status.error) setStatus((current) => ({ ...current, error: null }));
  };
  const selectedCategory = leafCategories.find((item) => item._id === form.categoryId)?.label || "Web Design";
  const progress = Math.min(100, 15 + (step * 15));

  const removeSkill = (skill) => setField("requiredSkills", form.requiredSkills.filter((item) => item !== skill));
  const addSkill = () => {
    const suggestion = "Brand Strategy";
    if (!form.requiredSkills.includes(suggestion)) setField("requiredSkills", [...form.requiredSkills, suggestion]);
  };

  const saveDraft = () => {
    window.localStorage.setItem("skilllinkup-project-draft", JSON.stringify({ form, experience, projectType, budgetMode }));
    toast.success("Draft saved on this device");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (step < 5) {
      setStep((current) => Math.min(5, current + 1));
      document.querySelector(`.${styles.wizardIntro}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (!isAuthenticated) {
      toast.error("Sign in to publish your project");
      router.push("/login");
      return;
    }
    if (!form.title.trim() || !form.description.trim()) {
      setStatus({ loading: false, error: "Add a title and description before publishing." });
      return;
    }
    const budgetMin = Number.parseFloat(form.budgetMin);
    const budgetMax = Number.parseFloat(form.budgetMax);
    if (Number.isFinite(budgetMin) && Number.isFinite(budgetMax) && budgetMin > budgetMax) {
      setStatus({ loading: false, error: "The minimum budget cannot exceed the maximum budget." });
      return;
    }
    setStatus({ loading: true, error: null });
    try {
      await createProject({
        title: form.title.trim(),
        slug: generateSlug(form.title),
        description: form.description.trim(),
        categoryId: form.categoryId || undefined,
        requiredSkills: form.requiredSkills.length ? form.requiredSkills : undefined,
        budgetMin: Number.isFinite(budgetMin) ? budgetMin : undefined,
        budgetMax: Number.isFinite(budgetMax) ? budgetMax : undefined,
        currency: "EUR",
        deadline: form.deadline ? new Date(form.deadline).getTime() : undefined,
        workType: form.workType,
        locale: "en",
      });
      toast.success("Your project is live");
      router.push("/manage-projects");
    } catch (error) {
      const message = error?.message || "We could not publish your project. Please try again.";
      setStatus({ loading: false, error: message });
      toast.error(message);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" aria-label="Skilllinkup home"><Image src="/images/logo/skilllinkup-template-logo-v2.png" alt="Skilllinkup" width={736} height={168} priority /></Link>
        <nav aria-label="Support and account"><Link href="/help"><CircleHelp size={17} /> Need help?</Link><Link href="/contact">Support</Link><Link href={isAuthenticated ? "/my-profile" : "/login"} className={styles.avatarLink}><Image src="/images/skilllinkup-home/professional-lucas-v1.png" alt="Your account" width={44} height={44} /><ChevronDown size={15} /></Link></nav>
      </header>

      <main className={styles.main}>
        <section className={styles.wizardIntro}>
          <span className={styles.eyebrow}>Post a project for free</span>
          <h1>Tell us about your project</h1>
          <p>In a few clear steps, we’ll help you find the right professional.</p>
          <ol className={styles.stepper}>
            {STEPS.map((label, index) => {
              const number = index + 1;
              const state = number < step ? styles.stepDone : number === step ? styles.stepCurrent : "";
              return <li key={label} className={state}><span>{number < step ? <Check size={15} /> : number}</span><strong>{number}. {label}</strong></li>;
            })}
          </ol>
        </section>

        <form id="create-project-form" onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.primaryColumn}>
            {status.error ? <div className={styles.error} role="alert">{status.error}</div> : null}
            <section className={styles.panel}>
              <div className={styles.panelTitle}><div><h2>About your project</h2><p>The more context you share, the better the matches we can make.</p></div><PenLine size={20} /></div>

              <Field label="Category">
                <div className={styles.controlWithIcon}><BriefcaseBusiness size={17} /><select value={form.categoryId} onChange={(event) => setField("categoryId", event.target.value)} aria-label="Project category"><option value="">Web Design</option>{leafCategories.map((category) => <option key={category._id} value={category._id}>{category.label}</option>)}</select><ChevronDown size={16} /></div>
              </Field>

              <Field label="Project title" hint={`${form.title.length} / 120`}>
                <div className={styles.controlValidated}><input data-testid="create-project-title" aria-label="Project title" value={form.title} maxLength={120} onChange={(event) => setField("title", event.target.value)} required /><CheckCircle2 size={17} /></div>
              </Field>

              <Field label="Project description" hint="Describe the goal, audience and desired result.">
                <div className={styles.editor}>
                  <div className={styles.toolbar}><button type="button">Normal <ChevronDown size={13} /></button><i /><button type="button" aria-label="Bold"><Bold size={15} /></button><button type="button" aria-label="Italic"><Italic size={15} /></button><button type="button" aria-label="Underline"><Underline size={15} /></button><i /><button type="button" aria-label="Bulleted list"><List size={15} /></button><button type="button" aria-label="Numbered list"><ListOrdered size={15} /></button><button type="button" aria-label="Insert link"><Link2 size={15} /></button><span /><button type="button" aria-label="Undo"><Undo2 size={15} /></button><button type="button" aria-label="Redo"><Redo2 size={15} /></button></div>
                  <textarea data-testid="create-project-description" aria-label="Project description" value={form.description} maxLength={2000} onChange={(event) => setField("description", event.target.value)} required />
                  <small>{form.description.length} / 2000</small>
                </div>
              </Field>

              <Field label="Required skills" hint="Choose the skills that best match your project.">
                <div className={styles.tags} data-testid="create-project-skills">{form.requiredSkills.map((skill) => <span key={skill}>{skill}<button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>×</button></span>)}<button type="button" className={styles.addTag} onClick={addSkill}><Plus size={15} /> Add skill</button></div>
              </Field>

              <Field label="Project location" hint="Where can the professional complete this project?">
                <div className={styles.segmented}>
                  <button type="button" className={form.workType === "local" ? styles.selected : ""} onClick={() => setField("workType", "local")}><MapPin size={17} /> On-site</button>
                  <button type="button" className={form.workType === "remote" ? styles.selected : ""} onClick={() => setField("workType", "remote")}><Monitor size={17} /> Online</button>
                  <button type="button" className={form.workType === "hybrid" ? styles.selected : ""} onClick={() => setField("workType", "hybrid")}><UsersRound size={17} /> Both</button>
                </div>
                <div className={styles.selectionNote}><Globe2 size={16} /> {form.workType === "remote" ? "You selected online delivery." : form.workType === "local" ? "You selected on-site work." : "You selected online and on-site work."}</div>
              </Field>

              <Field label="Location" optional hint="Add a city or region when it matters for the project."><input aria-label="Project location" className={styles.input} value={form.location} onChange={(event) => setField("location", event.target.value)} placeholder="For example: Amsterdam, Netherlands" /></Field>

              <Field label="Add files" optional hint="Attach a brief, brand guide or references.">
                <label className={styles.dropzone}><CloudUpload size={27} /><strong>Drop files here or click to upload</strong><span>PDF, DOCX, PPTX or ZIP (max. 20 MB per file)</span><input type="file" onChange={(event) => setAttachmentName(event.target.files?.[0]?.name || "")} /></label>
                {attachmentName ? <div className={styles.fileRow}><FileText size={19} /><strong>{attachmentName}</strong><span>1.8 MB</span><CheckCircle2 size={17} /><button type="button" onClick={() => setAttachmentName("")} aria-label="Remove attachment"><Trash2 size={16} /></button></div> : null}
              </Field>

              <Field label="Desired experience level" hint="What fits this project best?"><div className={styles.choiceGrid}>{EXPERIENCE.map((item) => <ChoiceCard key={item.value} {...item} active={experience === item.value} onClick={() => setExperience(item.value)} />)}</div></Field>
              <Field label="Project type" hint="Which description fits the work best?"><div className={styles.choiceGrid}>{PROJECT_TYPES.map((item) => <ChoiceCard key={item.value} {...item} active={projectType === item.value} onClick={() => setProjectType(item.value)} />)}</div></Field>
            </section>
          </div>

          <aside className={styles.aside}>
            <section className={styles.summaryCard}>
              <h2>Your project</h2>
              <SummaryRow icon={BriefcaseBusiness} label="Category" value={selectedCategory} />
              <SummaryRow icon={ClipboardList} label="Type" value={projectType === "one-off" ? "One-time project" : projectType === "ongoing" ? "Ongoing project" : "Consulting"} />
              <SummaryRow icon={MapPin} label="Location" value={form.workType === "remote" ? "Online" : form.workType === "local" ? (form.location || "On-site") : "Online & on-site"} />
              <SummaryRow icon={CheckCircle2} label="Status" value="Draft" />
              <div className={styles.progressHead}><span><Target size={16} /> Completion</span><strong>{progress}%</strong></div>
              <div className={styles.progress}><span style={{ width: `${progress}%` }} /></div>
              <small>Step {step} of 5</small>
              <div className={styles.tip}><Lightbulb size={19} /><p><strong>Tip:</strong> Complete every step for more and better matches.</p></div>
            </section>

            <section className={styles.helpCard}>
              <div><span>Need help?</span><h2>We’re happy to think along.</h2></div>
              <Image src="/images/skilllinkup-home/professional-lucas-v1.png" alt="Skilllinkup support specialist" width={1200} height={1200} />
              <p>Our specialists are ready to help you write a project that attracts the right people.</p>
              <ul><li><CheckCircle2 size={17} /> Personal advice</li><li><CheckCircle2 size={17} /> Fast response</li><li><CheckCircle2 size={17} /> No obligation</li></ul>
              <Link href="/contact"><MessageCircle size={17} /> Contact us</Link>
            </section>
          </aside>

          <section className={styles.nextPanel}>
            <div className={styles.nextHeading}><h2>Next steps</h2><p>A few more details and your project is ready to go live.</p></div>
            <div className={styles.nextGrid}>
              <div className={styles.miniPanel}><h3>Budget</h3><p>Choose a model that fits your project.</p><div className={styles.twoButtons}><button type="button" className={budgetMode === "fixed" ? styles.selected : ""} onClick={() => setBudgetMode("fixed")}><Paperclip size={16} /> Fixed price</button><button type="button" className={budgetMode === "hourly" ? styles.selected : ""} onClick={() => setBudgetMode("hourly")}><Clock3 size={16} /> Hourly rate</button></div><div className={styles.budgetFields}><label>Min. budget <span>€ <input data-testid="create-project-budget-min" aria-label="Minimum budget" type="number" min="0" value={form.budgetMin} onChange={(event) => setField("budgetMin", event.target.value)} /></span></label><label>Max. budget <span>€ <input data-testid="create-project-budget-max" aria-label="Maximum budget" type="number" min="0" value={form.budgetMax} onChange={(event) => setField("budgetMax", event.target.value)} /></span></label></div><small>We’ll show your project to professionals within this budget.</small></div>
              <div className={styles.miniPanel}><h3>Planning</h3><p>When should the project start and finish?</p><label>Preferred start date<span><CalendarDays size={15} /><input aria-label="Preferred start date" type="date" value={form.startDate} onChange={(event) => setField("startDate", event.target.value)} /></span></label><label>Deadline<span><CalendarDays size={15} /><input data-testid="create-project-deadline" aria-label="Project deadline" type="date" value={form.deadline} onChange={(event) => setField("deadline", event.target.value)} /></span></label><label>Priority<span><Clock3 size={15} /><select aria-label="Project priority"><option>Normal</option><option>Urgent</option><option>Flexible</option></select></span></label></div>
              <div className={styles.reviewPanel}><h3>Check your overview</h3><p>Review your details before continuing.</p>{["About your project", "Description & skills", "Location & files", "Budget", "Planning"].map((item) => <div key={item}><span>{item}</span><button type="button" onClick={() => setStep(2)}>Edit</button></div>)}<div className={styles.ready}><CheckCircle2 size={20} /> Looking good! Your project is nearly ready.</div></div>
            </div>
          </section>

          <div className={styles.actions}><button type="button" onClick={() => setStep((current) => Math.max(1, current - 1))}><ArrowLeft size={17} /> Previous</button><button type="button" onClick={saveDraft}><FileText size={17} /> Save as draft</button><button data-testid="create-project-submit" type="submit" className={styles.primaryAction} disabled={status.loading || !isLoaded || !isAuthenticated}>{status.loading ? "Publishing…" : step === 5 ? "Publish project" : "Next step"}<ArrowRight size={17} /></button></div>

          <section className={styles.trustBar}><div><Sparkles size={21} /><span><strong>Free to post</strong><small>Publish your project free of charge</small></span></div><div><ShieldCheck size={21} /><span><strong>No obligations</strong><small>You’re always in control</small></span></div><div><LockKeyhole size={21} /><span><strong>Work safely</strong><small>Your data and projects are protected</small></span></div></section>
        </form>
      </main>
    </div>
  );
}

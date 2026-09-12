import MarketplaceHub from "@/components/marketplace/MarketplaceHub";

export const metadata = {
  title: "Remote and Local Company Jobs",
  description: "Discover transparent vacancies from verified companies, including remote, hybrid and local roles.",
  alternates: { canonical: "/jobs" },
};

const config = {
  tone: "jobs",
  eyebrow: "Company jobs · Remote & local",
  title: "Find a role",
  accent: "that fits your next step.",
  description: "Browse vacancies from verified companies. Compare the role, work model and any published salary range before applying.",
  image: "/images/skilllinkup-products/jobs-v1.png",
  imageAlt: "Candidate and employer in an interview",
  search: { action: "/jobs/browse", keywordLabel: "Role, skill or company", keywordPlaceholder: "What role are you looking for?", location: "Remote, city or country", button: "Search jobs" },
  trust: ["Verified companies", "Published role details", "Remote and local roles"],
  proof: { label: "Launch focus", value: "NL + remote Europe" },
  rating: { value: "Real roles", label: "Clear employment type" },
  stats: [
    { icon: "jobs", value: "Company jobs", label: "Permanent and contract" },
    { icon: "salary", value: "Salary fields", label: "Shown when provided" },
    { icon: "verified", value: "Visible", label: "Company verification state" },
    { icon: "global", value: "Flexible", label: "Remote, hybrid or local" },
  ],
  categoryEyebrow: "Explore opportunities",
  categoryTitle: "Find work that fits your direction",
  categoryLink: "/jobs/browse",
  categories: [
    { name: "Engineering", description: "Software, cloud, data and QA", icon: "global", href: "/jobs/browse?q=engineering" },
    { name: "Design & product", description: "UX, research and product roles", icon: "design", href: "/jobs/browse?q=product" },
    { name: "Marketing & growth", description: "Brand, content, SEO and demand", icon: "people", href: "/jobs/browse?q=marketing" },
    { name: "Sales", description: "Business development and accounts", icon: "salary", href: "/jobs/browse?q=sales" },
    { name: "Operations & finance", description: "Operations, legal and finance", icon: "jobs", href: "/jobs/browse?q=operations" },
    { name: "People & HR", description: "Talent, culture and HR operations", icon: "verified", href: "/jobs/browse?q=hr" },
    { name: "Customer support", description: "Success, service and community", icon: "shield", href: "/jobs/browse?q=support" },
    { name: "Leadership", description: "Team leads and executives", icon: "fast", href: "/jobs/browse?q=leadership" },
  ],
  feature: {
    image: "/images/skilllinkup-worlds/jobs-team-v1.png",
    imageAlt: "Candidate meeting a workplace team",
    badgeLabel: "A complete opportunity",
    badgeValue: "Role · salary · work model",
    eyebrow: "See the workplace, not just the vacancy",
    title: "Make a career decision with the full picture.",
    description: "A strong role is more than a title. Skilllinkup brings the position, salary range, work model and verified company context together before you apply.",
    points: ["Salary details where the employer has provided them", "Remote, hybrid or local clearly stated", "Application progress in one place"],
    href: "/jobs/browse",
    cta: "Explore open roles",
  },
  highlightEyebrow: "Product preview",
  highlightTitle: "Types of company roles to explore",
  highlights: [
    { kicker: "Remote", meta: "Full-time", title: "Senior product designer", description: "Lead discovery and product design for an international software team with flexible working hours.", tags: ["Product design", "Figma", "SaaS"], value: "Compare role details", href: "/jobs/browse?q=product", cta: "View roles" },
    { kicker: "Hybrid · Amsterdam", meta: "Full-time", title: "Growth marketing lead", description: "Own acquisition strategy and build a small multidisciplinary growth team.", tags: ["Growth", "Analytics", "Leadership"], value: "Read the requirements", href: "/jobs/browse?q=marketing", cta: "View roles" },
    { kicker: "Local · Rotterdam", meta: "Company role", title: "Customer success manager", description: "Help growing business customers adopt a platform and turn feedback into better service.", tags: ["Customer success", "B2B", "Dutch"], value: "Check the work model", href: "/jobs/browse?q=customer+success", cta: "View roles" },
  ],
  pathTitle: "Built for candidates and companies",
  pathDescription: "Candidates get transparent opportunities. Companies get one place to publish roles, review applicants and build a trusted employer profile.",
  paths: [
    { icon: "jobs", title: "Browse verified jobs", description: "Filter by role, location, work model, experience and published salary range.", href: "/jobs/browse", cta: "Browse jobs" },
    { icon: "verified", title: "For employers", description: "Learn how company verification, vacancy publishing and application management work.", href: "/jobs/companies", cta: "For companies" },
    { icon: "people", title: "Hire through Skilllinkup", description: "Publish a real vacancy and manage candidates alongside flexible talent.", href: "/jobs/companies", cta: "Start hiring" },
  ],
  stepsTitle: "From discovery to a serious application",
  steps: [
    { title: "Find the right role", description: "Search by discipline, location, work model and salary." },
    { title: "Check the full picture", description: "Review the verified company and clear job conditions." },
    { title: "Apply with confidence", description: "Send a focused application and track its status." },
  ],
  testimonialTitle: "A better hiring experience on both sides",
  testimonials: [
    { initials: "NW", name: "Nina Williams", role: "Product designer", quote: "A candidate can compare the published salary and work model, then decide which roles to apply for." },
    { initials: "EB", name: "Elise Bakker", role: "People lead, Flowstate", quote: "An employer can explain the role, publish requirements and review applications in one place." },
    { initials: "OA", name: "Omar Ali", role: "Customer success manager", quote: "A candidate can revisit submitted applications and see status updates made by the employer." },
  ],
  faqs: [
    { question: "Are these freelance gigs or company jobs?", answer: "The Jobs product is for genuine permanent, temporary and long-term company roles. Freelance projects live in the Online product." },
    { question: "Do all vacancies show a salary?", answer: "Published role details is the default. Listings should show a range or clear compensation basis before candidates apply." },
    { question: "Can I search for fully remote jobs?", answer: "Yes. Remote, hybrid and on-site work models can be filtered separately, and you can search the published location. Check each listing for geographic restrictions." },
    { question: "How are employers verified?", answer: "A company must complete the platform’s company verification step before its vacancies appear in public search. Read the company information included with each listing." },
    { question: "How can I keep track of interesting jobs?", answer: "Save individual jobs to your account and revisit them from Saved items. Check the jobs directory for new vacancies." },
    { question: "How can a company publish a vacancy?", answer: "Complete company onboarding and verification, then add the role, requirements, work model and salary details in your dashboard." },
  ],
  cta: { eyebrow: "Make the next move", title: "Find a job—or the person who can fill it.", description: "Explore transparent vacancies or introduce your company to the right candidates.", primaryHref: "/jobs/browse", primaryLabel: "Browse jobs", secondaryHref: "/jobs/companies", secondaryLabel: "Hire talent" },
};

export default function JobsPage() { return <MarketplaceHub config={config} />; }

import MarketplaceHub from "@/components/marketplace/MarketplaceHub";

export const metadata = {
  title: "Verified Remote and Local Jobs",
  description: "Discover transparent vacancies from verified companies, including remote, hybrid and local roles.",
  alternates: { canonical: "/jobs" },
};

const config = {
  tone: "jobs",
  eyebrow: "Company jobs · Remote & local",
  title: "A real next step,",
  accent: "not another gig.",
  description: "Discover verified vacancies at companies hiring for permanent and long-term roles. Search remote, hybrid or local work with salary information up front.",
  image: "/images/skilllinkup-products/jobs-v1.png",
  imageAlt: "Candidate having a positive interview with a verified company",
  search: { action: "/jobs/browse", keywordLabel: "Role, skill or company", keywordPlaceholder: "What role are you looking for?", location: "Remote, city or country", button: "Search jobs" },
  trust: ["Verified companies", "Salary transparency", "Remote and local roles"],
  proof: { label: "Hiring now", value: "Verified companies" },
  rating: { value: "Real roles", label: "Clear employment type" },
  stats: [
    { icon: "jobs", value: "Real jobs", label: "Permanent and contract" },
    { icon: "salary", value: "Salary shown", label: "Transparent by default" },
    { icon: "verified", value: "Verified", label: "Company identities" },
    { icon: "global", value: "Flexible", label: "Remote, hybrid or local" },
  ],
  categoryEyebrow: "Explore opportunities",
  categoryTitle: "Find work that fits your direction",
  categoryLink: "/jobs/browse",
  categories: [
    { name: "Engineering", description: "Software, cloud, data and QA", icon: "global", href: "/jobs/browse?q=engineering" },
    { name: "Design & product", description: "UX, research and product roles", icon: "quality", href: "/jobs/browse?q=product" },
    { name: "Marketing & growth", description: "Brand, content, SEO and demand", icon: "people", href: "/jobs/browse?q=marketing" },
    { name: "Sales", description: "Business development and accounts", icon: "salary", href: "/jobs/browse?q=sales" },
    { name: "Operations & finance", description: "Operations, legal and finance", icon: "jobs", href: "/jobs/browse?q=operations" },
    { name: "People & HR", description: "Talent, culture and HR operations", icon: "verified", href: "/jobs/browse?q=hr" },
    { name: "Customer support", description: "Success, service and community", icon: "shield", href: "/jobs/browse?q=support" },
    { name: "Leadership", description: "Team leads and executives", icon: "fast", href: "/jobs/browse?q=leadership" },
  ],
  feature: {
    image: "/images/skilllinkup-worlds/jobs-team-v1.png",
    imageAlt: "Candidate meeting a welcoming team at a verified company",
    badgeLabel: "A complete opportunity",
    badgeValue: "Role · salary · work model",
    eyebrow: "See the workplace, not just the vacancy",
    title: "Make a career decision with the full picture.",
    description: "A strong role is more than a title. Skilllinkup brings the position, salary range, work model and verified company context together before you apply.",
    points: ["Salary range visible up front", "Remote, hybrid or local clearly stated", "Application progress in one place"],
    href: "/jobs/browse",
    cta: "Explore open roles",
  },
  highlightEyebrow: "Hiring now",
  highlightTitle: "Transparent opportunities from real companies",
  highlights: [
    { kicker: "Remote", meta: "Full-time", title: "Senior product designer", description: "Lead discovery and product design for an international software team with flexible working hours.", tags: ["Product design", "Figma", "SaaS"], value: "€70k–€88k", href: "/jobs/browse?q=product", cta: "View roles" },
    { kicker: "Hybrid · Amsterdam", meta: "Full-time", title: "Growth marketing lead", description: "Own acquisition strategy and build a small multidisciplinary growth team.", tags: ["Growth", "Analytics", "Leadership"], value: "€68k–€82k", href: "/jobs/browse?q=marketing", cta: "View roles" },
    { kicker: "Local · Rotterdam", meta: "32–40 hours", title: "Customer success manager", description: "Help growing business customers adopt a platform and turn feedback into better service.", tags: ["Customer success", "B2B", "Dutch"], value: "€52k–€64k", href: "/jobs/browse?q=customer+success", cta: "View roles" },
  ],
  pathTitle: "Built for candidates and companies",
  pathDescription: "Candidates get transparent opportunities. Companies get one place to publish roles, review applicants and build a trusted employer profile.",
  paths: [
    { icon: "jobs", title: "Browse verified jobs", description: "Filter by role, location, work model, experience and transparent salary range.", href: "/jobs/browse", cta: "Browse jobs" },
    { icon: "verified", title: "Explore companies", description: "Understand the team, workplace and open roles before you apply.", href: "/jobs/companies", cta: "For companies" },
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
    { initials: "NW", name: "Nina Williams", role: "Product designer", quote: "I could see the salary and remote policy before applying. That saved time and made the first conversation far more useful." },
    { initials: "EB", name: "Elise Bakker", role: "People lead, Flowstate", quote: "Candidates arrive with the right expectations because the role and company story are clear from the start." },
    { initials: "OA", name: "Omar Ali", role: "Customer success manager", quote: "The application did not disappear into a black hole. I always knew the status and what the next step was." },
  ],
  faqs: [
    { question: "Are these freelance gigs or company jobs?", answer: "The Jobs product is for genuine permanent, temporary and long-term company roles. Freelance projects live in the Online product." },
    { question: "Do all vacancies show a salary?", answer: "Salary transparency is the default. Listings should show a range or clear compensation basis before candidates apply." },
    { question: "Can I search for fully remote jobs?", answer: "Yes. Remote, hybrid and on-site work models can be filtered separately, including any geographic restrictions." },
    { question: "How are employers verified?", answer: "Company identity and contact details can be checked before a verified employer badge is displayed." },
    { question: "Can I save jobs and receive alerts?", answer: "Saved searches and job alerts are part of the account experience, based on role, location and work-model preferences." },
    { question: "How can a company publish a vacancy?", answer: "Companies can create an employer profile, define the role and publish it with responsibilities, requirements and salary information." },
  ],
  cta: { eyebrow: "Make the next move", title: "Find a job—or the person who can fill it.", description: "Explore transparent vacancies or introduce your company to the right candidates.", primaryHref: "/jobs/browse", primaryLabel: "Browse jobs", secondaryHref: "/jobs/companies", secondaryLabel: "Hire talent" },
};

export default function JobsPage() { return <MarketplaceHub config={config} />; }

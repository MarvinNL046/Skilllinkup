import MarketplaceHub from "@/components/marketplace/MarketplaceHub";

export const metadata = {
  title: "Hire Online Freelancers Worldwide",
  description: "Find remote freelancers and digital services for design, development, marketing, writing and more.",
  alternates: { canonical: "/online" },
};

const config = {
  tone: "online",
  eyebrow: "Online talent · Worldwide",
  title: "Great digital work,",
  accent: "wherever you are.",
  description: "Find freelancers for digital projects and compare their published services, portfolios and proposals. Agree on the work in a shared workspace.",
  image: "/images/skilllinkup-products/online-services-v1.png",
  imageAlt: "Smiling online freelancer working from her home studio",
  search: { action: "/online/services", keywordLabel: "Service or skill", keywordPlaceholder: "What do you need help with?", location: "City or country (optional)", button: "Find talent" },
  trust: ["Published profiles", "Clear agreements", "Visible deliverables"],
  proof: { label: "Launch scope", value: "Worldwide Online" },
  rating: { value: "Free beta", label: "No platform payments" },
  stats: [
    { icon: "people", value: "Global", label: "English-first discovery" },
    { icon: "global", value: "Worldwide", label: "Remote collaboration" },
    { icon: "shield", value: "Recorded", label: "Milestone approvals" },
    { icon: "quality", value: "Free beta", label: "Payments disabled" },
  ],
  categoryEyebrow: "Popular online expertise",
  categoryTitle: "Start with the skill you need",
  categoryLink: "/online/services",
  categories: [
    { name: "Web design", description: "Websites, UX/UI and conversion", icon: "global", href: "/services/webdesign" },
    { name: "Development", description: "Apps, platforms and integrations", icon: "jobs", href: "/online/services?q=development" },
    { name: "Marketing", description: "Campaigns, SEO and growth", icon: "quality", href: "/online/services?q=marketing" },
    { name: "Writing & translation", description: "Copywriting and translation", icon: "verified", href: "/online/services?q=writing" },
    { name: "Design & branding", description: "Identity, graphics and motion", icon: "people", href: "/online/services?q=design" },
    { name: "Video & audio", description: "Production, editing and voice", icon: "fast", href: "/online/services?q=video" },
    { name: "Data & AI", description: "Automation, insights and models", icon: "shield", href: "/online/services?q=data" },
    { name: "Business support", description: "Operations, finance and admin", icon: "salary", href: "/online/services?q=business" },
  ],
  feature: {
    image: "/images/skilllinkup-worlds/online-collaboration-v1.png",
    imageAlt: "Remote creative team collaborating with an online colleague",
    badgeLabel: "One shared workspace",
    badgeValue: "Brief · milestones · delivery",
    eyebrow: "More than a directory",
    title: "Everything stays clear from first message to final file.",
    description: "Bring the brief, communication and deliverables together. Both sides always know what has been agreed and what happens next.",
    points: ["Milestones with visible status", "Files and feedback in one conversation", "Record approval when work is delivered"],
    href: "/online/projects",
    cta: "See how projects work",
  },
  highlightEyebrow: "Product preview",
  highlightTitle: "Ways to start with a service or specialist",
  highlights: [
    { kicker: "Popular service", meta: "Scope to agree", title: "Conversion-focused website", description: "A polished responsive website with clear scope, delivery moments and launch support.", tags: ["Web design", "UX/UI", "Responsive"], value: "Compare packages", href: "/services/webdesign", cta: "Explore" },
    { kicker: "Specialist", meta: "Compare expertise", title: "Senior product designer", description: "Bring experienced product thinking into a sprint, redesign or growing design system.", tags: ["Figma", "Research", "Design systems"], value: "Confirm availability", href: "/online/freelancers", cta: "View talent" },
    { kicker: "Project route", meta: "Free to post", title: "Receive tailored proposals", description: "Share the outcome once and let relevant freelancers respond with an approach and price.", tags: ["Project brief", "Compare", "Proposals"], value: "Review incoming proposals", href: "/create-projects", cta: "Post project" },
  ],
  pathTitle: "Use online talent your way",
  pathDescription: "Start with a clearly scoped service, compare freelancers, or publish a project and let specialists come to you.",
  paths: [
    { icon: "quality", title: "Browse ready-made services", description: "Choose a defined package with transparent scope, timing and price.", href: "/online/services", cta: "Explore services" },
    { icon: "people", title: "Find a freelancer", description: "Search profiles, compare portfolios and contact the right specialist directly.", href: "/online/freelancers", cta: "Browse freelancers" },
    { icon: "jobs", title: "Post a project", description: "Describe the result you need and receive proposals from relevant talent.", href: "/create-projects", cta: "Post a project" },
  ],
  stepsTitle: "From brief to delivery in three steps",
  steps: [
    { title: "Describe the outcome", description: "Share your goal, scope, timing and budget." },
    { title: "Compare with confidence", description: "Review published profiles, work samples and proposals." },
    { title: "Work with clarity", description: "Use milestones, messaging and recorded approvals in one workspace." },
  ],
  testimonialTitle: "Work that feels personal—even across borders",
  testimonials: [
    { initials: "EV", name: "Eva van Dijk", role: "Founder, Bloom & Grow", quote: "A founder can share a brief, compare service packages and agree on a delivery before starting." },
    { initials: "BJ", name: "Bas de Jong", role: "Marketing lead", quote: "A marketing lead can compare portfolios, discuss the approach and keep decisions in the workspace." },
    { initials: "FE", name: "Fatima El Yousfi", role: "Independent photographer", quote: "A freelancer can publish services, explain their experience and share examples of previous work." },
  ],
  faqs: [
    { question: "How should I assess a freelancer?", answer: "Compare the biography, skills, portfolio and reviews that are published. A profile badge is one signal; confirm that the person has the experience your specific project needs." },
    { question: "Can I hire for ongoing work?", answer: "Yes. You can agree a one-off delivery, recurring support or a longer project with multiple milestones." },
    { question: "Does SkillLinkup process payment during beta?", answer: "No. The private beta records scope, milestones and approval but does not collect, hold or release funds." },
    { question: "What if the scope changes?", answer: "Discuss changes in the workspace and confirm any revised scope, price and timing together before more work begins." },
    { question: "Can I work across time zones?", answer: "Yes. Profiles show location and availability when provided. Agree working hours and useful meeting times directly with the freelancer." },
    { question: "Is posting a project free?", answer: "Yes. Publishing a project and comparing proposals is free during the private beta." },
  ],
  cta: { eyebrow: "Ready when you are", title: "Turn your next idea into finished work.", description: "Browse published profiles or describe your project to invite proposals.", primaryHref: "/online/freelancers", primaryLabel: "Find a freelancer", secondaryHref: "/create-projects", secondaryLabel: "Post a project" },
};

export default function OnlinePage() { return <MarketplaceHub config={config} />; }

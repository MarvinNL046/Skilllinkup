import MarketplaceHub from "@/components/marketplace/MarketplaceHub";

export const metadata = {
  title: "Hire Online Freelancers Worldwide",
  description: "Find vetted remote freelancers and digital services for design, development, marketing, writing and more.",
  alternates: { canonical: "/online" },
};

const config = {
  tone: "online",
  eyebrow: "Online talent · Worldwide",
  title: "Great digital work,",
  accent: "wherever you are.",
  description: "Hire vetted freelancers worldwide for focused projects or ongoing support. Compare services, portfolios and proposals in one trusted workspace.",
  image: "/images/skilllinkup-products/online-services-v1.png",
  imageAlt: "Smiling online freelancer working from her home studio",
  search: { action: "/online/services", keywordLabel: "Service or skill", keywordPlaceholder: "What do you need help with?", location: "Worldwide or time zone", button: "Find talent" },
  trust: ["Vetted profiles", "Clear agreements", "Visible deliverables"],
  proof: { label: "Available now", value: "Worldwide talent" },
  rating: { value: "4.8 / 5", label: "Average client rating" },
  stats: [
    { icon: "people", value: "25,000+", label: "Vetted freelancers" },
    { icon: "global", value: "Worldwide", label: "Remote collaboration" },
    { icon: "shield", value: "Recorded", label: "Milestone approvals" },
    { icon: "quality", value: "4.8 / 5", label: "Average rating" },
  ],
  categoryEyebrow: "Popular online expertise",
  categoryTitle: "Start with the skill you need",
  categoryLink: "/online/services",
  categories: [
    { name: "Web design", description: "Websites, UX/UI and conversion", icon: "global", href: "/services/webdesign" },
    { name: "Development", description: "Apps, platforms and integrations", icon: "jobs", href: "/online/services?q=development" },
    { name: "Marketing", description: "Campaigns, SEO and growth", icon: "quality", href: "/online/services?q=marketing" },
    { name: "Writing & translation", description: "Content in every language", icon: "verified", href: "/online/services?q=writing" },
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
  highlightEyebrow: "Ways to get work done",
  highlightTitle: "Start with a service or a specialist",
  highlights: [
    { kicker: "Popular service", meta: "From €499", title: "Conversion-focused website", description: "A polished responsive website with clear scope, delivery moments and launch support.", tags: ["Web design", "UX/UI", "Responsive"], value: "7–14 days", href: "/services/webdesign", cta: "Explore" },
    { kicker: "Specialist", meta: "€65 / hour", title: "Senior product designer", description: "Bring experienced product thinking into a sprint, redesign or growing design system.", tags: ["Figma", "Research", "Design systems"], value: "Available this week", href: "/online/freelancers", cta: "View talent" },
    { kicker: "Project route", meta: "Free to post", title: "Receive tailored proposals", description: "Share the outcome once and let relevant freelancers respond with an approach and price.", tags: ["Matched talent", "Compare", "No obligation"], value: "First replies in 24h", href: "/create-projects", cta: "Post project" },
  ],
  pathTitle: "Use online talent your way",
  pathDescription: "Buy a clearly scoped service, compare freelancers, or publish a project and let specialists come to you.",
  paths: [
    { icon: "quality", title: "Browse ready-made services", description: "Choose a defined package with transparent scope, timing and price.", href: "/online/services", cta: "Explore services" },
    { icon: "people", title: "Find a freelancer", description: "Search profiles, compare portfolios and contact the right specialist directly.", href: "/online/freelancers", cta: "Browse freelancers" },
    { icon: "jobs", title: "Post a project", description: "Describe the result you need and receive proposals from relevant talent.", href: "/create-projects", cta: "Post a project" },
  ],
  stepsTitle: "From brief to delivery in three steps",
  steps: [
    { title: "Describe the outcome", description: "Share your goal, scope, timing and budget." },
    { title: "Compare with confidence", description: "Review verified profiles, work samples and proposals." },
    { title: "Work with clarity", description: "Use milestones, messaging and recorded approvals in one workspace." },
  ],
  testimonialTitle: "Work that feels personal—even across borders",
  testimonials: [
    { initials: "EV", name: "Eva van Dijk", role: "Founder, Bloom & Grow", quote: "I found a designer who understood the brief immediately. The milestones made the whole project feel calm and controlled." },
    { initials: "BJ", name: "Bas de Jong", role: "Marketing lead", quote: "The difference is clarity. I could compare the work, discuss the approach and keep every decision in one place." },
    { initials: "FE", name: "Fatima El Yousfi", role: "Independent photographer", quote: "My profile finally shows more than a rate. Clients can see how I work and what a successful project looks like." },
  ],
  faqs: [
    { question: "How are online freelancers verified?", answer: "Profiles can be checked for identity, professional experience and portfolio quality. The exact verification status is shown on every profile." },
    { question: "Can I hire for ongoing work?", answer: "Yes. You can agree a one-off delivery, recurring support or a longer project with multiple milestones." },
    { question: "Does SkillLinkup process payment during beta?", answer: "No. The private beta records scope, milestones and approval but does not collect, hold or release funds." },
    { question: "What if the scope changes?", answer: "Changes can be discussed and added as a new milestone so price, timing and responsibilities remain explicit." },
    { question: "Can I work across time zones?", answer: "Yes. Profiles can show location, working hours and availability, allowing you to choose the overlap that suits your team." },
    { question: "Is posting a project free?", answer: "Yes. Publishing a project and comparing proposals is free during the private beta." },
  ],
  cta: { eyebrow: "Ready when you are", title: "Turn your next idea into finished work.", description: "Find the right specialist now, or publish a project for free.", primaryHref: "/online/freelancers", primaryLabel: "Find a freelancer", secondaryHref: "/create-projects", secondaryLabel: "Post a project" },
};

export default function OnlinePage() { return <MarketplaceHub config={config} />; }

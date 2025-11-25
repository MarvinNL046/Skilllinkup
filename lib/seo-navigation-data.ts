// SEO Navigation Data
// Shared between server and client components

export interface SubPillar {
  name: string;
  slug: string;
  description: string;
}

export interface Pillar {
  id: number;
  name: string;
  slug: string;
  icon: string;
  subPillars: SubPillar[];
}

export const SEO_NAVIGATION: Pillar[] = [
  {
    id: 1,
    name: "Platform Selection",
    slug: "/resources",
    icon: "🎯",
    subPillars: [
      { name: "Choose Best Platform", slug: "/resources/choose-best-freelance-platform", description: "Complete guide to finding your ideal platform" },
      { name: "Beginner vs Expert", slug: "/resources/beginner-vs-expert-platforms", description: "Platforms matched to your experience level" },
      { name: "Key Selection Factors", slug: "/resources/key-factors-choosing-freelance-marketplace", description: "What to look for when choosing" },
      { name: "Multiple Platforms", slug: "/resources/multiple-freelance-platforms-pros-cons", description: "Pros and cons of using multiple sites" },
      { name: "Platform Quiz", slug: "/resources/platform-selection-quiz", description: "Interactive quiz to find your match" },
    ],
  },
  {
    id: 2,
    name: "Platform Reviews",
    slug: "/resources",
    icon: "⭐",
    subPillars: [
      { name: "What is Upwork?", slug: "/resources/what-is-upwork", description: "Complete introduction to Upwork" },
      { name: "What is Toptal?", slug: "/resources/what-is-toptal", description: "Elite talent network explained" },
      { name: "Upwork Guide", slug: "/resources/upwork-complete-guide", description: "Everything you need to know about Upwork" },
      { name: "Fiverr for Beginners", slug: "/resources/fiverr-beginner-guide", description: "Start selling on Fiverr today" },
      { name: "Toptal Review", slug: "/resources/toptal-review", description: "Elite freelancers platform deep dive" },
      { name: "Is Toptal Legit?", slug: "/resources/is-toptal-legit", description: "Trust, verification & real experiences" },
      { name: "Freelancer.com", slug: "/resources/freelancer-platform-deep-dive", description: "Complete Freelancer.com analysis" },
      { name: "Guru Platform", slug: "/resources/guru-platform-analysis", description: "Guru platform detailed review" },
    ],
  },
  {
    id: 3,
    name: "Pricing & Earnings",
    slug: "/resources",
    icon: "💰",
    subPillars: [
      { name: "Calculate Rates", slug: "/resources/calculate-freelance-hourly-rate", description: "Find your perfect hourly rate" },
      { name: "Pricing Strategies", slug: "/resources/freelance-pricing-strategies", description: "Advanced pricing techniques" },
      { name: "Upwork Pricing", slug: "/resources/upwork-pricing", description: "Complete Upwork fee structure 2025" },
      { name: "Toptal Pricing", slug: "/resources/toptal-pricing", description: "Toptal rates & business model" },
      { name: "99designs Pricing", slug: "/resources/99designs-pricing", description: "Design contest & project costs" },
      { name: "Upwork Pricing Tactics", slug: "/resources/upwork-pricing-tactics", description: "Upwork-specific pricing tips" },
      { name: "Negotiate Rates", slug: "/resources/negotiate-higher-rates", description: "How to ask for more money" },
      { name: "Maximize Earnings", slug: "/resources/platform-fees-maximize-earnings", description: "Beat platform fees and earn more" },
    ],
  },
  {
    id: 4,
    name: "Getting Started",
    slug: "/resources",
    icon: "🚀",
    subPillars: [
      { name: "Beginner's Guide", slug: "/resources/freelance-beginners-guide", description: "Your first steps as a freelancer" },
      { name: "Toptal for Beginners", slug: "/resources/toptal-for-beginners", description: "Can beginners join Toptal?" },
      { name: "Profile Templates", slug: "/resources/freelance-profile-templates", description: "Copy-paste profile templates" },
      { name: "First Proposal", slug: "/resources/first-freelance-proposal", description: "Write proposals that win" },
      { name: "Avoid Mistakes", slug: "/resources/freelance-beginner-mistakes", description: "Common mistakes to avoid" },
      { name: "Platform Setup", slug: "/resources/freelance-platform-setup", description: "Set up your accounts correctly" },
    ],
  },
  {
    id: 5,
    name: "Tools & Productivity",
    slug: "/resources",
    icon: "🛠️",
    subPillars: [
      { name: "Essential Tools", slug: "/resources/essential-freelance-tools", description: "Must-have tools for freelancers" },
      { name: "Time Tracking", slug: "/resources/best-time-tracking-tools-freelancers", description: "Track your time effectively" },
      { name: "Invoice Generator", slug: "/resources/freelance-invoice-generator", description: "Create professional invoices" },
      { name: "Project Management", slug: "/resources/project-management-tools-freelancers", description: "Manage projects like a pro" },
      { name: "Accounting Software", slug: "/resources/freelance-accounting-software", description: "Handle your finances" },
    ],
  },
  {
    id: 6,
    name: "Platform Comparisons",
    slug: "/resources",
    icon: "⚖️",
    subPillars: [
      { name: "Upwork vs Fiverr", slug: "/resources/upwork-vs-fiverr", description: "Which platform is better?" },
      { name: "Toptal vs Upwork", slug: "/resources/toptal-vs-upwork", description: "Premium vs mainstream" },
      { name: "Freelancer vs Guru", slug: "/resources/freelancer-vs-guru", description: "Head-to-head comparison" },
      { name: "Best for Writers", slug: "/resources/best-platform-writers", description: "Top platforms for content creators" },
      { name: "Best for Designers", slug: "/resources/best-platform-designers", description: "Where designers thrive" },
    ],
  },
  {
    id: 7,
    name: "Success Strategies",
    slug: "/resources",
    icon: "🎓",
    subPillars: [
      { name: "Stand Out", slug: "/resources/how-to-stand-out-on-crowded-freelance-platforms", description: "Get noticed on busy platforms" },
      { name: "Bidding Strategies", slug: "/resources/advanced-bidding-strategies-to-win-more-freelance-projects", description: "Win more projects with smart bidding" },
      { name: "Client Relationships", slug: "/resources/building-long-term-client-relationships-on-freelance-platforms", description: "Build lasting client partnerships" },
      { name: "5-Star Reviews", slug: "/resources/how-to-get-5-star-reviews-on-every-freelance-project", description: "Consistently earn perfect ratings" },
      { name: "Scale Your Business", slug: "/resources/scaling-your-freelance-business-from-solo-to-agency", description: "Grow from solo to agency" },
    ],
  },
  {
    id: 8,
    name: "Niche Guides",
    slug: "/resources",
    icon: "💼",
    subPillars: [
      { name: "For Developers", slug: "/resources/best-freelance-platforms-web-developers-2025", description: "Best platforms for web developers" },
      { name: "For Designers", slug: "/resources/top-freelance-platforms-graphic-designers-creatives", description: "Where designers find work" },
      { name: "For Writers", slug: "/resources/best-platforms-freelance-writers-content-creators", description: "Top writing platforms" },
      { name: "For VAs", slug: "/resources/freelance-platforms-virtual-assistants-complete-guide", description: "Virtual assistant opportunities" },
      { name: "For Marketers", slug: "/resources/best-freelance-platforms-marketing-consultants", description: "Marketing consultant platforms" },
    ],
  },
  {
    id: 9,
    name: "Business Management",
    slug: "/resources",
    icon: "📊",
    subPillars: [
      { name: "Invoicing", slug: "/resources/freelance-invoicing-guide", description: "Professional invoicing practices" },
      { name: "Taxes", slug: "/resources/freelance-tax-guide", description: "Navigate freelance taxes" },
      { name: "Contracts", slug: "/resources/freelance-contracts-101", description: "Protect yourself with contracts" },
      { name: "Multiple Clients", slug: "/resources/managing-multiple-clients", description: "Juggle multiple projects" },
      { name: "Insurance", slug: "/resources/freelance-business-insurance", description: "Do you need insurance?" },
    ],
  },
  {
    id: 10,
    name: "Best Practices",
    slug: "/resources",
    icon: "✨",
    subPillars: [
      { name: "Profile Optimization", slug: "/resources/optimizing-freelance-profile-maximum-visibility", description: "Get found by clients" },
      { name: "Winning Proposals", slug: "/resources/how-to-write-proposals-that-win", description: "Proposals that convert" },
      { name: "Platform Algorithms", slug: "/resources/mastering-freelance-platform-algorithms", description: "Hack the algorithm" },
      { name: "Portfolio Building", slug: "/resources/building-portfolio-that-converts", description: "Showcase your best work" },
      { name: "Client Communication", slug: "/resources/freelance-platform-communication", description: "Impress clients with communication" },
    ],
  },
];

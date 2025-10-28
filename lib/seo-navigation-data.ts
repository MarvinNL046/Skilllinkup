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
    slug: "/seo",
    icon: "🎯",
    subPillars: [
      { name: "Choose Best Platform", slug: "/seo/choose-best-freelance-platform", description: "Complete guide to finding your ideal platform" },
      { name: "Beginner vs Expert", slug: "/seo/beginner-vs-expert-platforms", description: "Platforms matched to your experience level" },
      { name: "Key Selection Factors", slug: "/seo/key-factors-choosing-freelance-marketplace", description: "What to look for when choosing" },
      { name: "Multiple Platforms", slug: "/seo/multiple-freelance-platforms-pros-cons", description: "Pros and cons of using multiple sites" },
      { name: "Platform Quiz", slug: "/seo/platform-selection-quiz", description: "Interactive quiz to find your match" },
    ],
  },
  {
    id: 2,
    name: "Platform Reviews",
    slug: "/seo",
    icon: "⭐",
    subPillars: [
      { name: "Upwork Guide", slug: "/seo/upwork-complete-guide", description: "Everything you need to know about Upwork" },
      { name: "Fiverr for Beginners", slug: "/seo/fiverr-beginner-guide", description: "Start selling on Fiverr today" },
      { name: "Toptal Review", slug: "/seo/toptal-review", description: "Elite freelancers platform deep dive" },
      { name: "Freelancer.com", slug: "/seo/freelancer-platform-deep-dive", description: "Complete Freelancer.com analysis" },
      { name: "Guru Platform", slug: "/seo/guru-platform-analysis", description: "Guru platform detailed review" },
    ],
  },
  {
    id: 3,
    name: "Pricing & Earnings",
    slug: "/seo",
    icon: "💰",
    subPillars: [
      { name: "Calculate Rates", slug: "/seo/calculate-freelance-hourly-rate", description: "Find your perfect hourly rate" },
      { name: "Pricing Strategies", slug: "/seo/freelance-pricing-strategies", description: "Advanced pricing techniques" },
      { name: "Upwork Pricing", slug: "/seo/upwork-pricing-tactics", description: "Upwork-specific pricing tips" },
      { name: "Negotiate Rates", slug: "/seo/negotiate-higher-rates", description: "How to ask for more money" },
      { name: "Maximize Earnings", slug: "/seo/platform-fees-maximize-earnings", description: "Beat platform fees and earn more" },
    ],
  },
  {
    id: 4,
    name: "Getting Started",
    slug: "/seo",
    icon: "🚀",
    subPillars: [
      { name: "Beginner's Guide", slug: "/seo/freelance-beginners-guide", description: "Your first steps as a freelancer" },
      { name: "Profile Templates", slug: "/seo/freelance-profile-templates", description: "Copy-paste profile templates" },
      { name: "First Proposal", slug: "/seo/first-freelance-proposal", description: "Write proposals that win" },
      { name: "Avoid Mistakes", slug: "/seo/freelance-beginner-mistakes", description: "Common mistakes to avoid" },
      { name: "Platform Setup", slug: "/seo/freelance-platform-setup", description: "Set up your accounts correctly" },
    ],
  },
  {
    id: 5,
    name: "Tools & Productivity",
    slug: "/seo",
    icon: "🛠️",
    subPillars: [
      { name: "Essential Tools", slug: "/seo/essential-freelance-tools", description: "Must-have tools for freelancers" },
      { name: "Time Tracking", slug: "/seo/best-time-tracking-tools-freelancers", description: "Track your time effectively" },
      { name: "Invoice Generator", slug: "/seo/freelance-invoice-generator", description: "Create professional invoices" },
      { name: "Project Management", slug: "/seo/project-management-tools-freelancers", description: "Manage projects like a pro" },
      { name: "Accounting Software", slug: "/seo/freelance-accounting-software", description: "Handle your finances" },
    ],
  },
  {
    id: 6,
    name: "Platform Comparisons",
    slug: "/seo",
    icon: "⚖️",
    subPillars: [
      { name: "Upwork vs Fiverr", slug: "/seo/upwork-vs-fiverr", description: "Which platform is better?" },
      { name: "Toptal vs Upwork", slug: "/seo/toptal-vs-upwork", description: "Premium vs mainstream" },
      { name: "Freelancer vs Guru", slug: "/seo/freelancer-vs-guru", description: "Head-to-head comparison" },
      { name: "Best for Writers", slug: "/seo/best-platform-writers", description: "Top platforms for content creators" },
      { name: "Best for Designers", slug: "/seo/best-platform-designers", description: "Where designers thrive" },
    ],
  },
  {
    id: 7,
    name: "Success Strategies",
    slug: "/seo",
    icon: "🎓",
    subPillars: [
      { name: "Stand Out", slug: "/seo/how-to-stand-out-on-crowded-freelance-platforms", description: "Get noticed on busy platforms" },
      { name: "Bidding Strategies", slug: "/seo/advanced-bidding-strategies-to-win-more-freelance-projects", description: "Win more projects with smart bidding" },
      { name: "Client Relationships", slug: "/seo/building-long-term-client-relationships-on-freelance-platforms", description: "Build lasting client partnerships" },
      { name: "5-Star Reviews", slug: "/seo/how-to-get-5-star-reviews-on-every-freelance-project", description: "Consistently earn perfect ratings" },
      { name: "Scale Your Business", slug: "/seo/scaling-your-freelance-business-from-solo-to-agency", description: "Grow from solo to agency" },
    ],
  },
  {
    id: 8,
    name: "Niche Guides",
    slug: "/seo",
    icon: "💼",
    subPillars: [
      { name: "For Developers", slug: "/seo/best-freelance-platforms-web-developers-2025", description: "Best platforms for web developers" },
      { name: "For Designers", slug: "/seo/top-freelance-platforms-graphic-designers-creatives", description: "Where designers find work" },
      { name: "For Writers", slug: "/seo/best-platforms-freelance-writers-content-creators", description: "Top writing platforms" },
      { name: "For VAs", slug: "/seo/freelance-platforms-virtual-assistants-complete-guide", description: "Virtual assistant opportunities" },
      { name: "For Marketers", slug: "/seo/best-freelance-platforms-marketing-consultants", description: "Marketing consultant platforms" },
    ],
  },
  {
    id: 9,
    name: "Business Management",
    slug: "/seo",
    icon: "📊",
    subPillars: [
      { name: "Invoicing", slug: "/seo/freelance-invoicing-guide", description: "Professional invoicing practices" },
      { name: "Taxes", slug: "/seo/freelance-tax-guide", description: "Navigate freelance taxes" },
      { name: "Contracts", slug: "/seo/freelance-contracts-101", description: "Protect yourself with contracts" },
      { name: "Multiple Clients", slug: "/seo/managing-multiple-clients", description: "Juggle multiple projects" },
      { name: "Insurance", slug: "/seo/freelance-business-insurance", description: "Do you need insurance?" },
    ],
  },
  {
    id: 10,
    name: "Best Practices",
    slug: "/seo",
    icon: "✨",
    subPillars: [
      { name: "Profile Optimization", slug: "/seo/optimizing-freelance-profile-maximum-visibility", description: "Get found by clients" },
      { name: "Winning Proposals", slug: "/seo/how-to-write-proposals-that-win", description: "Proposals that convert" },
      { name: "Platform Algorithms", slug: "/seo/mastering-freelance-platform-algorithms", description: "Hack the algorithm" },
      { name: "Portfolio Building", slug: "/seo/building-portfolio-that-converts", description: "Showcase your best work" },
      { name: "Client Communication", slug: "/seo/freelance-platform-communication", description: "Impress clients with communication" },
    ],
  },
];

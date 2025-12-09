// SEO Navigation Data
// Shared between server and client components
// Uses /guides for English and /gids for Dutch

export interface SubPillar {
  name: string;
  nameNl: string;
  slug: string; // English slug
  slugNl: string; // Dutch slug
  description: string;
}

export interface Pillar {
  id: number;
  name: string;
  nameNl: string;
  slug: string; // English: /guides
  slugNl: string; // Dutch: /gids
  icon: string;
  subPillars: SubPillar[];
}

// Helper function to get locale-aware slug
export function getLocalizedSlug(pillar: Pillar, locale: string): string {
  return locale === 'nl' ? pillar.slugNl : pillar.slug;
}

export function getLocalizedSubPillarSlug(subPillar: SubPillar, locale: string): string {
  return locale === 'nl' ? subPillar.slugNl : subPillar.slug;
}

export function getLocalizedName(item: { name: string; nameNl: string }, locale: string): string {
  return locale === 'nl' ? item.nameNl : item.name;
}

export const SEO_NAVIGATION: Pillar[] = [
  {
    id: 1,
    name: "Platform Selection",
    nameNl: "Platform Selectie",
    slug: "/guides/platform-selectie",
    slugNl: "/gids/platform-selectie",
    icon: "🎯",
    subPillars: [
      {
        name: "Choose Best Platform",
        nameNl: "Beste Platform Kiezen",
        slug: "/guides/platform-selectie/beste-freelance-platform-kiezen",
        slugNl: "/gids/platform-selectie/beste-freelance-platform-kiezen",
        description: "Complete guide to finding your ideal platform"
      },
      {
        name: "Beginner vs Expert",
        nameNl: "Beginner vs Expert",
        slug: "/guides/platform-selectie/beginner-vs-expert-platforms",
        slugNl: "/gids/platform-selectie/beginner-vs-expert-platforms",
        description: "Platforms matched to your experience level"
      },
      {
        name: "Key Selection Factors",
        nameNl: "Belangrijke Selectiefactoren",
        slug: "/guides/platform-selectie/belangrijke-selectiefactoren",
        slugNl: "/gids/platform-selectie/belangrijke-selectiefactoren",
        description: "What to look for when choosing"
      },
    ],
  },
  {
    id: 2,
    name: "Platform Reviews",
    nameNl: "Platform Reviews",
    slug: "/guides/platform-reviews",
    slugNl: "/gids/platform-reviews",
    icon: "⭐",
    subPillars: [
      {
        name: "What is Upwork?",
        nameNl: "Wat is Upwork?",
        slug: "/guides/platform-reviews/upwork-honest-review-2026",
        slugNl: "/gids/platform-reviews/wat-is-upwork",
        description: "Complete introduction to Upwork"
      },
      {
        name: "What is Toptal?",
        nameNl: "Wat is Toptal?",
        slug: "/guides/platform-reviews/toptal-worth-it",
        slugNl: "/gids/platform-reviews/wat-is-toptal",
        description: "Elite talent network explained"
      },
      {
        name: "Fiverr Guide",
        nameNl: "Fiverr Gids",
        slug: "/guides/platform-reviews/fiverr-pros-cons-deep-dive",
        slugNl: "/gids/platform-reviews/fiverr-beginners-gids",
        description: "Everything you need to know about Fiverr"
      },
    ],
  },
  {
    id: 3,
    name: "Pricing & Earnings",
    nameNl: "Prijzen & Verdienen",
    slug: "/guides/prijzen-verdienen",
    slugNl: "/gids/prijzen-verdienen",
    icon: "💰",
    subPillars: [
      {
        name: "Calculate Rates",
        nameNl: "Uurtarief Berekenen",
        slug: "/guides/prijzen-verdienen/freelance-rate-calculator-guide",
        slugNl: "/gids/prijzen-verdienen/freelance-uurtarief-berekenen",
        description: "Find your perfect hourly rate"
      },
      {
        name: "Pricing Strategies",
        nameNl: "Prijsstrategieën",
        slug: "/guides/prijzen-verdienen/value-based-pricing-freelancers",
        slugNl: "/gids/prijzen-verdienen/freelance-prijsstrategieen",
        description: "Advanced pricing techniques"
      },
      {
        name: "Platform Fees",
        nameNl: "Platform Kosten",
        slug: "/guides/prijzen-verdienen/platform-fee-optimization",
        slugNl: "/gids/prijzen-verdienen/upwork-kosten",
        description: "Minimize fees and maximize earnings"
      },
    ],
  },
  {
    id: 4,
    name: "Getting Started",
    nameNl: "Aan de Slag",
    slug: "/guides/aan-de-slag",
    slugNl: "/gids/aan-de-slag",
    icon: "🚀",
    subPillars: [
      {
        name: "Beginner's Guide",
        nameNl: "Beginners Gids",
        slug: "/guides/aan-de-slag/first-client-in-30-days",
        slugNl: "/gids/aan-de-slag/freelance-beginners-gids",
        description: "Your first steps as a freelancer"
      },
      {
        name: "Portfolio Building",
        nameNl: "Profiel Templates",
        slug: "/guides/aan-de-slag/freelance-portfolio-from-scratch",
        slugNl: "/gids/aan-de-slag/freelance-profiel-templates",
        description: "Build a stunning portfolio"
      },
      {
        name: "First Proposal",
        nameNl: "Eerste Voorstel",
        slug: "/guides/aan-de-slag/profile-optimization-secrets",
        slugNl: "/gids/aan-de-slag/eerste-freelance-voorstel",
        description: "Write proposals that win"
      },
    ],
  },
  {
    id: 5,
    name: "Tools & Productivity",
    nameNl: "Tools & Productiviteit",
    slug: "/guides/tools-productiviteit",
    slugNl: "/gids/tools-productiviteit",
    icon: "🛠️",
    subPillars: [
      {
        name: "Essential Tools",
        nameNl: "Essentiële Tools",
        slug: "/guides/tools-productiviteit/ai-tools-for-freelancers",
        slugNl: "/gids/tools-productiviteit/essentiele-freelance-tools",
        description: "Must-have tools for freelancers"
      },
      {
        name: "Time Tracking",
        nameNl: "Tijdregistratie",
        slug: "/guides/tools-productiviteit/productivity-systems-freelancers",
        slugNl: "/gids/tools-productiviteit/beste-tijdregistratie-tools",
        description: "Track your time effectively"
      },
      {
        name: "Automation",
        nameNl: "Automatisering",
        slug: "/guides/tools-productiviteit/automation-workflows-freelance",
        slugNl: "/gids/tools-productiviteit/projectmanagement-tools",
        description: "Automate your workflow"
      },
    ],
  },
  {
    id: 6,
    name: "Platform Comparisons",
    nameNl: "Platform Vergelijkingen",
    slug: "/guides/platform-vergelijkingen",
    slugNl: "/gids/platform-vergelijkingen",
    icon: "⚖️",
    subPillars: [
      {
        name: "Upwork vs Fiverr",
        nameNl: "Upwork vs Fiverr",
        slug: "/guides/platform-vergelijkingen/upwork-vs-fiverr",
        slugNl: "/gids/platform-vergelijkingen/upwork-vs-fiverr",
        description: "Which platform is better?"
      },
      {
        name: "Toptal vs Upwork",
        nameNl: "Toptal vs Upwork",
        slug: "/guides/platform-vergelijkingen/upwork-vs-toptal-detailed",
        slugNl: "/gids/platform-vergelijkingen/toptal-vs-upwork",
        description: "Premium vs mainstream"
      },
      {
        name: "Best for Designers",
        nameNl: "Beste voor Designers",
        slug: "/guides/platform-vergelijkingen/best-platforms-by-skill",
        slugNl: "/gids/platform-vergelijkingen/beste-platform-designers",
        description: "Where designers thrive"
      },
    ],
  },
  {
    id: 7,
    name: "Success Strategies",
    nameNl: "Succes Strategieën",
    slug: "/guides/succes-strategieen",
    slugNl: "/gids/succes-strategieen",
    icon: "🎓",
    subPillars: [
      {
        name: "Stand Out",
        nameNl: "Opvallen",
        slug: "/guides/succes-strategieen/top-rated-freelancer-secrets",
        slugNl: "/gids/succes-strategieen/opvallen-op-freelance-platforms",
        description: "Get noticed on busy platforms"
      },
      {
        name: "Winning Proposals",
        nameNl: "Winnende Voorstellen",
        slug: "/guides/succes-strategieen/winning-proposals-templates",
        slugNl: "/gids/succes-strategieen/geavanceerde-biedstrategieen",
        description: "Win more projects"
      },
      {
        name: "Client Retention",
        nameNl: "Klantrelaties",
        slug: "/guides/succes-strategieen/client-retention-strategies",
        slugNl: "/gids/succes-strategieen/langdurige-klantrelaties",
        description: "Build lasting partnerships"
      },
    ],
  },
  {
    id: 8,
    name: "Niche Guides",
    nameNl: "Niche Gidsen",
    slug: "/guides/niche-gidsen",
    slugNl: "/gids/niche-gidsen",
    icon: "💼",
    subPillars: [
      {
        name: "For Developers",
        nameNl: "Voor Developers",
        slug: "/guides/niche-gidsen/platforms-for-developers-2026",
        slugNl: "/gids/niche-gidsen/beste-platforms-webdevelopers",
        description: "Best platforms for web developers"
      },
      {
        name: "For Designers",
        nameNl: "Voor Designers",
        slug: "/guides/niche-gidsen/video-editor-freelance-guide",
        slugNl: "/gids/niche-gidsen/beste-platforms-grafisch-designers",
        description: "Where designers find work"
      },
      {
        name: "For Writers",
        nameNl: "Voor Schrijvers",
        slug: "/guides/niche-gidsen/platforms-for-copywriters",
        slugNl: "/gids/niche-gidsen/beste-platforms-schrijvers",
        description: "Top writing platforms"
      },
    ],
  },
  {
    id: 9,
    name: "Business Management",
    nameNl: "Zakelijk Beheer",
    slug: "/guides/zakelijk-beheer",
    slugNl: "/gids/zakelijk-beheer",
    icon: "📊",
    subPillars: [
      {
        name: "Invoicing",
        nameNl: "Factureren",
        slug: "/guides/zakelijk-beheer/invoicing-best-practices",
        slugNl: "/gids/zakelijk-beheer/freelance-factureren-gids",
        description: "Professional invoicing practices"
      },
      {
        name: "Taxes",
        nameNl: "Belastingen",
        slug: "/guides/zakelijk-beheer/freelance-taxes-international",
        slugNl: "/gids/zakelijk-beheer/freelance-belasting-gids",
        description: "Navigate freelance taxes"
      },
      {
        name: "Contracts",
        nameNl: "Contracten",
        slug: "/guides/zakelijk-beheer/freelance-legal-structure",
        slugNl: "/gids/zakelijk-beheer/freelance-contracten-101",
        description: "Protect yourself with contracts"
      },
    ],
  },
  {
    id: 10,
    name: "Best Practices",
    nameNl: "Best Practices",
    slug: "/guides/best-practices",
    slugNl: "/gids/best-practices",
    icon: "✨",
    subPillars: [
      {
        name: "Avoid Burnout",
        nameNl: "Profiel Optimaliseren",
        slug: "/guides/best-practices/avoiding-freelance-burnout",
        slugNl: "/gids/best-practices/profiel-optimaliseren",
        description: "Self-care for freelancers"
      },
      {
        name: "Work-Life Balance",
        nameNl: "Winnende Voorstellen",
        slug: "/guides/best-practices/work-life-balance-remote",
        slugNl: "/gids/best-practices/winnende-voorstellen-schrijven",
        description: "Balance work and life"
      },
      {
        name: "Networking",
        nameNl: "Platform Algoritmes",
        slug: "/guides/best-practices/freelance-networking-strategies",
        slugNl: "/gids/best-practices/platform-algoritmes-beheersen",
        description: "Build your network"
      },
    ],
  },
];

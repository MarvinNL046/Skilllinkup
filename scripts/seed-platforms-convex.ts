/**
 * scripts/seed-platforms-convex.ts
 *
 * Seeds all platforms (14 from import-platforms.ts + 5 big traffic drivers)
 * into Convex for both 'en' and 'nl' locales.
 *
 * Usage:
 *   npx convex run platforms:seedAll --args "$(npx ts-node scripts/seed-platforms-convex.ts)"
 *
 * Or, to just print the JSON args to stdout and paste manually:
 *   npx ts-node scripts/seed-platforms-convex.ts
 *
 * Or use the helper npm script (if configured):
 *   npm run db:seed-platforms-convex
 */

interface PlatformInput {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  rating?: number;
  category?: string;
  fees?: string;
  difficulty?: string;
  color?: string;
  featured?: boolean;
  pros?: string[];
  cons?: string[];
  features?: string[];
  status?: string;
  publishedAt?: number;
  workType?: string;
  countries?: string[];
  affiliateLink?: string;
  locale: string;
  createdAt: number;
  updatedAt: number;
}

const now = Date.now();

// ---------------------------------------------------------------------------
// BASE PLATFORM DATA (locale-neutral)
// ---------------------------------------------------------------------------

const basePlatforms = [
  // ---- 14 platforms from import-platforms.ts --------------------------------

  {
    name: "PeoplePerHour",
    slug: "peopleperhour",
    description:
      "<p>PeoplePerHour is a UK-based freelance marketplace connecting businesses with skilled professionals across development, design, marketing, and more. Known for its flexible hourly and project-based pricing models.</p><p>The platform offers a user-friendly interface with robust project management tools, making it ideal for both short-term gigs and long-term collaborations.</p>",
    websiteUrl: "https://www.peopleperhour.com",
    rating: 4.2,
    category: "General Freelance",
    fees: "3.5% - 20% sliding scale",
    difficulty: "Medium",
    color: "#E87E04",
    featured: false,
    pros: [
      "Flexible pricing models (hourly and fixed)",
      "Strong presence in Europe",
      "Good quality control with verified sellers",
      "AI-powered job matching",
    ],
    cons: [
      "High competition for beginners",
      "Platform fees can be significant for small projects",
      "Limited to certain regions for payment processing",
    ],
    features: [
      "Hourlies - fixed-price micro-services",
      "WorkStream collaboration tools",
      "Verified seller badges",
      "Proposal credits system",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Guru",
    slug: "guru",
    description:
      "<p>Guru is a flexible work platform offering freelancers the ability to find work, manage projects, and get paid securely. With over 3 million members worldwide, it covers all major freelance categories.</p><p>Guru stands out with its SafePay system that ensures payment security for both freelancers and clients, along with robust workroom features for project collaboration.</p>",
    websiteUrl: "https://www.guru.com",
    rating: 4.1,
    category: "General Freelance",
    fees: "5% - 9% membership tiers",
    difficulty: "Medium",
    color: "#FF5A00",
    featured: false,
    pros: [
      "SafePay payment protection",
      "Flexible membership options",
      "Comprehensive workroom features",
      "Daily job matching emails",
    ],
    cons: [
      "Requires paid membership for full features",
      "Smaller project volume than top competitors",
      "Interface can feel outdated",
    ],
    features: [
      "SafePay escrow system",
      "Workroom collaboration tools",
      "Invoicing and time tracking",
      "Job matching algorithm",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Truelancer",
    slug: "truelancer",
    description:
      "<p>Truelancer is a global freelancing platform connecting businesses with freelancers worldwide. With competitive fees and a wide range of categories, it's particularly popular in Asia and emerging markets.</p><p>The platform focuses on making freelancing accessible to professionals from developing countries while maintaining quality standards through verification systems.</p>",
    websiteUrl: "https://www.truelancer.com",
    rating: 3.9,
    category: "General Freelance",
    fees: "10% commission",
    difficulty: "Easy",
    color: "#00A3FF",
    featured: false,
    pros: [
      "Low entry barrier for beginners",
      "Competitive rates in emerging markets",
      "Growing platform with less saturation",
      "Active in Asia and developing regions",
    ],
    cons: [
      "Smaller client base than major platforms",
      "Payment processing can be slow",
      "Limited payment methods in some regions",
    ],
    features: [
      "Secure payment gateway",
      "Project milestones",
      "Dispute resolution",
      "Prime membership benefits",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Malt",
    slug: "malt",
    description:
      "<p>Malt is Europe's leading freelance platform, especially strong in France, Germany, Spain, and the Netherlands. It focuses on high-quality professional services with a curated approach to freelancer selection.</p><p>The platform is known for its professional approach, offering business insurance, administrative support, and a strong focus on long-term B2B relationships.</p>",
    websiteUrl: "https://www.malt.com",
    rating: 4.4,
    category: "General Freelance",
    fees: "10% commission",
    difficulty: "Medium",
    color: "#FC5757",
    featured: true,
    pros: [
      "Strong European presence",
      "Professional business-focused approach",
      "Business insurance included",
      "High-quality client base",
      "Administrative support for freelancers",
    ],
    cons: [
      "Limited to European markets",
      "Selective approval process",
      "Higher competition among experienced freelancers",
    ],
    features: [
      "Professional liability insurance",
      "Invoicing and contract management",
      "Talent matching algorithm",
      "Business networking events",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "FlexJobs",
    slug: "flexjobs",
    description:
      "<p>FlexJobs specializes in remote, flexible, part-time, and freelance job opportunities. Unlike traditional freelance platforms, it focuses on curated, high-quality job listings with an emphasis on work-life balance.</p><p>The platform screens every job listing to ensure legitimacy, making it a trusted resource for professionals seeking remote work opportunities without scams or low-quality gigs.</p>",
    websiteUrl: "https://www.flexjobs.com",
    rating: 4.5,
    category: "Remote Jobs",
    fees: "Subscription-based ($14.95/month)",
    difficulty: "Easy",
    color: "#0069FF",
    featured: true,
    pros: [
      "Hand-screened, scam-free job listings",
      "Focus on quality over quantity",
      "Excellent for remote and flexible work",
      "Strong reputation with employers",
      "Career coaching and resources included",
    ],
    cons: [
      "Requires paid subscription (no free tier)",
      "More focused on jobs than freelance projects",
      "U.S.-centric job listings",
    ],
    features: [
      "Curated job database",
      "Career coaching services",
      "Skills testing",
      "Resume review services",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Arc",
    slug: "arc",
    description:
      "<p>Arc (formerly CodementorX) is a premium platform for remote software developers. It connects top tech talent with companies offering full-time remote positions and freelance contracts.</p><p>Arc uses a rigorous vetting process to ensure only the top 2% of developers join the platform, making it ideal for experienced developers looking for high-quality opportunities.</p>",
    websiteUrl: "https://arc.dev",
    rating: 4.6,
    category: "Tech & Development",
    fees: "Free for developers (clients pay)",
    difficulty: "Hard",
    color: "#5A67D8",
    featured: true,
    pros: [
      "Top-tier clients and projects",
      "Rigorous vetting ensures quality",
      "No fees for developers",
      "Full-time and contract opportunities",
      "Dedicated account management",
    ],
    cons: [
      "Extremely selective (top 2% acceptance)",
      "Long vetting process",
      "Limited to software development",
    ],
    features: [
      "AI-powered job matching",
      "Video interviews and coding tests",
      "Contract negotiation support",
      "Payroll and benefits handling",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "We Work Remotely",
    slug: "we-work-remotely",
    description:
      "<p>We Work Remotely is the world's largest remote work community with over 4.5 million visitors. It focuses exclusively on remote job opportunities across development, design, marketing, and more.</p><p>The platform is known for its clean interface and high-quality job postings from reputable companies looking for remote talent.</p>",
    websiteUrl: "https://weworkremotely.com",
    rating: 4.3,
    category: "Remote Jobs",
    fees: "Free for job seekers",
    difficulty: "Easy",
    color: "#319795",
    featured: false,
    pros: [
      "Largest remote work community",
      "High-quality job postings",
      "Free for job seekers",
      "Clean, simple interface",
      "Focus on legitimate remote positions",
    ],
    cons: [
      "High competition for listings",
      "No project-based freelance (jobs only)",
      "Limited filtering options",
    ],
    features: [
      "Daily email alerts",
      "Company profiles",
      "Remote work resources",
      "Category-specific job feeds",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Dribbble",
    slug: "dribbble",
    description:
      "<p>Dribbble is the leading community for designers to showcase their work, find inspiration, and discover job opportunities. While primarily a portfolio platform, its job board is highly respected in the design industry.</p><p>The platform is ideal for UI/UX designers, graphic designers, illustrators, and other visual creatives looking to build their reputation and find premium clients.</p>",
    websiteUrl: "https://dribbble.com",
    rating: 4.5,
    category: "Design & Creative",
    fees: "Free (Pro membership $5/month for full features)",
    difficulty: "Medium",
    color: "#EA4C89",
    featured: true,
    pros: [
      "Premium design-focused community",
      "Build portfolio and reputation",
      "High-quality clients and agencies",
      "Networking opportunities",
      "Inspiration and trends",
    ],
    cons: [
      "High competition among top designers",
      "Pro membership needed for job applications",
      "Limited to design and creative fields",
    ],
    features: [
      "Portfolio hosting",
      "Design job board",
      "Freelance marketplace",
      "Design showcases and trends",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "CloudPeeps",
    slug: "cloudpeeps",
    description:
      "<p>CloudPeeps is a curated freelance platform specializing in marketing, content creation, and social media professionals. It connects vetted freelancers with companies seeking top-tier marketing talent.</p><p>The platform stands out with its community-driven approach, offering networking events, resources, and a supportive environment for marketing freelancers.</p>",
    websiteUrl: "https://www.cloudpeeps.com",
    rating: 4.2,
    category: "Marketing & Content",
    fees: "15% commission",
    difficulty: "Medium",
    color: "#4A90E2",
    featured: false,
    pros: [
      "Specialized in marketing and content",
      "Curated community of professionals",
      "Networking events and resources",
      "Direct client communication",
      "Quality over quantity approach",
    ],
    cons: [
      "Selective approval process",
      "Smaller project volume",
      "Limited to marketing/content niches",
    ],
    features: [
      "Vetted freelancer community",
      "Direct client messaging",
      "Project management tools",
      "Educational resources",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "GoLance",
    slug: "golance",
    description:
      "<p>GoLance is a freelance marketplace offering low fees and a wide range of categories. It aims to provide a fair alternative to larger platforms with transparent pricing and flexible terms.</p><p>The platform focuses on creating a balanced marketplace where both freelancers and clients benefit from competitive rates and quality service.</p>",
    websiteUrl: "https://www.golance.com",
    rating: 3.8,
    category: "General Freelance",
    fees: "7.95% commission",
    difficulty: "Easy",
    color: "#00C48C",
    featured: false,
    pros: [
      "Lower fees than major competitors",
      "Wide range of categories",
      "Easy sign-up process",
      "Growing platform with opportunities",
    ],
    cons: [
      "Smaller client base",
      "Less established reputation",
      "Fewer high-budget projects",
    ],
    features: [
      "Secure payment system",
      "Time tracking tools",
      "Dispute resolution",
      "Project milestones",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Apploye",
    slug: "apploye",
    description:
      "<p>Apploye is a time tracking and productivity platform that also serves as a freelance marketplace. It helps freelancers manage their work with robust tracking tools while connecting with clients.</p><p>The platform is particularly useful for freelancers who need detailed time tracking, screenshots, and productivity monitoring for client transparency.</p>",
    websiteUrl: "https://apploye.com",
    rating: 4.0,
    category: "General Freelance",
    fees: "Free (Premium features $4/month)",
    difficulty: "Easy",
    color: "#6366F1",
    featured: false,
    pros: [
      "Advanced time tracking features",
      "Screenshot and activity monitoring",
      "Affordable pricing",
      "Project management integration",
    ],
    cons: [
      "Smaller marketplace",
      "More focused on time tracking than jobs",
      "Limited project variety",
    ],
    features: [
      "Automatic time tracking",
      "Screenshot monitoring",
      "Project budgeting",
      "Team collaboration tools",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Andela",
    slug: "andela",
    description:
      "<p>Andela connects companies with top software developers from Africa and around the world. Unlike traditional freelance platforms, Andela focuses on long-term engagements and full-time remote positions.</p><p>The platform is known for its rigorous vetting process and commitment to developing tech talent in emerging markets, offering training and career development alongside job placements.</p>",
    websiteUrl: "https://andela.com",
    rating: 4.4,
    category: "Tech & Development",
    fees: "Free for developers (clients pay placement fees)",
    difficulty: "Hard",
    color: "#34A853",
    featured: false,
    pros: [
      "Focus on long-term engagements",
      "Rigorous technical vetting",
      "Career development support",
      "Competitive salaries",
      "Strong community network",
    ],
    cons: [
      "Selective acceptance process",
      "Limited to software development",
      "Requires full-time availability",
      "Geographic restrictions may apply",
    ],
    features: [
      "Technical skills assessment",
      "Ongoing learning programs",
      "Career coaching",
      "Community events and networking",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "ProZ",
    slug: "proz",
    description:
      "<p>ProZ.com is the world's largest community of professional translators and interpreters, with over 1 million members. It offers a comprehensive marketplace for language services along with resources for translator development.</p><p>The platform is trusted by translation agencies and direct clients worldwide, offering everything from project listings to translation tools and certification programs.</p>",
    websiteUrl: "https://www.proz.com",
    rating: 4.3,
    category: "Translation & Languages",
    fees: "Free (Pro membership $120/year for full features)",
    difficulty: "Medium",
    color: "#0066CC",
    featured: true,
    pros: [
      "Largest translation community",
      "Extensive language pairs",
      "Professional certification programs",
      "Translation tools and resources",
      "Trusted by global agencies",
    ],
    cons: [
      "Pro membership needed for full access",
      "High competition in popular languages",
      "Some low-budget projects",
    ],
    features: [
      "Job postings and RFQs",
      "Translation memory tools",
      "Translator directory",
      "Professional development courses",
      "Blueboard credentialing system",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Ureed",
    slug: "ureed",
    description:
      "<p>Ureed is a Middle East-focused freelance platform originally specializing in translation and content but now expanding to various creative services. It connects Arabic-speaking freelancers with regional and international clients.</p><p>The platform is particularly strong in Arabic translation, localization, and Middle Eastern market expertise, making it ideal for businesses targeting Arabic-speaking audiences.</p>",
    websiteUrl: "https://ureed.com",
    rating: 4.0,
    category: "Translation & Creative",
    fees: "20% commission",
    difficulty: "Medium",
    color: "#FF6B6B",
    featured: false,
    pros: [
      "Strong in Middle East markets",
      "Arabic language specialization",
      "Growing service categories",
      "Regional market expertise",
      "Cultural localization services",
    ],
    cons: [
      "Limited global reach",
      "Higher commission rates",
      "Smaller project volume outside MENA region",
    ],
    features: [
      "Arabic translation services",
      "Content creation tools",
      "Project management system",
      "Quality assurance processes",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },

  // ---- 5 big traffic-driving platforms ------------------------------------

  {
    name: "Upwork",
    slug: "upwork",
    description:
      "<p>Upwork is the world's largest freelance marketplace, connecting millions of businesses with skilled independent professionals across every category imaginable — from software development and design to writing, marketing, and finance.</p><p>Founded in 2015 through the merger of Elance and oDesk, Upwork has grown into the go-to platform for companies of all sizes looking to hire remote talent quickly and confidently. Its sliding-scale fee structure rewards long-term relationships: the more you earn with a single client, the lower your service fee drops.</p><p>For freelancers, Upwork offers unmatched variety — hourly contracts, fixed-price projects, and long-term retainers — backed by payment protection via escrow and a built-in time-tracking tool with optional screenshot verification.</p>",
    websiteUrl: "https://www.upwork.com",
    rating: 4.7,
    category: "General Freelance",
    fees: "0-15% variable per contract",
    difficulty: "Medium",
    color: "#14a800",
    featured: true,
    pros: [
      "Largest freelance marketplace globally",
      "Wide variety of job categories",
      "Payment protection via escrow",
      "Sliding scale fees reward loyalty",
      "Robust project management tools",
    ],
    cons: [
      "High competition for beginners",
      "Service fees can be significant",
      "Complex Connects system for bidding",
    ],
    features: [
      "Escrow payment protection",
      "Time tracking with screenshots",
      "Talent badges and certifications",
      "Enterprise and agency solutions",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Fiverr",
    slug: "fiverr",
    description:
      "<p>Fiverr revolutionised the freelance industry by introducing the gig model: sellers create service packages (Gigs) that buyers can purchase instantly — no bidding, no back-and-forth negotiation required. What started as a $5-per-task site has evolved into a full-service marketplace covering hundreds of creative and professional categories.</p><p>The platform is particularly strong for creative services like logo design, copywriting, video editing, voiceovers, and social media content. Sellers build tiered packages (Basic, Standard, Premium) giving them control over their pricing and deliverables.</p><p>Fiverr Pro offers a hand-vetted tier of top-rated sellers for clients who need guaranteed quality, while Fiverr Business caters to teams and enterprises with enhanced collaboration tools.</p>",
    websiteUrl: "https://www.fiverr.com",
    rating: 4.5,
    category: "General Freelance",
    fees: "20% flat fee",
    difficulty: "Easy",
    color: "#1dbf73",
    featured: true,
    pros: [
      "Easy to get started",
      "Gig-based model gives seller control",
      "Large buyer marketplace",
      "Seller Plus program for growth",
      "Great for creative services",
    ],
    cons: [
      "20% fee on all transactions",
      "Race to the bottom on pricing",
      "Limited client communication before purchase",
    ],
    features: [
      "Gig packages with tiers",
      "Seller levels and badges",
      "Fiverr Business for teams",
      "Quick response analytics",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Toptal",
    slug: "toptal",
    description:
      "<p>Toptal is the world's most exclusive freelance network, accepting only the top 3% of applicants after a rigorous multi-stage screening process that includes English communication tests, technical skill evaluations, live problem-solving sessions, and trial projects with real clients.</p><p>The result is a talent pool of elite software engineers, designers, finance experts, project managers, and product managers trusted by companies like Airbnb, Duolingo, and Shopify. For freelancers, Toptal means access to the highest-paying clients without competing on price — the platform handles billing, contract management, and client relationships.</p><p>Unlike platforms where you bid against dozens of other candidates, Toptal matches you directly with suitable clients, typically within 24-48 hours of a search request.</p>",
    websiteUrl: "https://www.toptal.com",
    rating: 4.8,
    category: "Tech & Development",
    fees: "Free for freelancers (clients pay)",
    difficulty: "Hard",
    color: "#204ecf",
    featured: true,
    pros: [
      "Top 3% acceptance rate ensures quality",
      "Premium clients and rates",
      "No fees for freelancers",
      "Dedicated account management",
      "Strong developer community",
    ],
    cons: [
      "Extremely selective screening process",
      "Limited to tech, design, and finance",
      "Long onboarding process",
    ],
    features: [
      "Rigorous screening process",
      "Trial period for client satisfaction",
      "Global community events",
      "Toptal Scholars program",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "Freelancer.com",
    slug: "freelancer-com",
    description:
      "<p>Freelancer.com is one of the oldest and largest freelance platforms in the world, hosting millions of projects across hundreds of categories. Launched in 2009, it pioneered the competitive bidding model where freelancers submit proposals and clients choose based on price and reviews.</p><p>The platform is known for its contest system, particularly popular for creative work like logo design, where clients post a brief and multiple designers submit concepts — the client pays only for the winning entry. This model is great for clients but risky for freelancers who may work without guaranteed pay.</p><p>Freelancer.com also offers a Local Jobs feature for services that require in-person delivery, and a Preferred Freelancer program that connects clients with pre-vetted high-performers.</p>",
    websiteUrl: "https://www.freelancer.com",
    rating: 4.0,
    category: "General Freelance",
    fees: "10% or $5 minimum",
    difficulty: "Easy",
    color: "#29B2FE",
    featured: false,
    pros: [
      "Large project volume",
      "Contest system for creative work",
      "Low barrier to entry",
      "Wide category coverage",
    ],
    cons: [
      "High competition drives prices down",
      "Many low-quality projects",
      "Complex fee structure",
      "Interface can be overwhelming",
    ],
    features: [
      "Contest system",
      "Milestone payments",
      "Preferred Freelancer program",
      "Local jobs feature",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
  {
    name: "99designs",
    slug: "99designs",
    description:
      "<p>99designs is the world's leading platform dedicated exclusively to graphic design, connecting businesses with professional designers for logos, websites, packaging, illustrations, and more.</p><p>The platform pioneered two distinct ways to hire designers: the contest model (where you post a brief, dozens of designers submit concepts, and you pay only for the one you choose) and the 1-on-1 project model (where you hire a specific designer directly for a collaborative engagement).</p><p>Designers are ranked across five certification levels — from Entry Level to Top Level — based on their wins, client feedback, and design quality, making it easy for clients to filter by experience and budget.</p>",
    websiteUrl: "https://99designs.com",
    rating: 4.3,
    category: "Design & Creative",
    fees: "Platform takes 5-15% depending on level",
    difficulty: "Medium",
    color: "#FF7C49",
    featured: true,
    pros: [
      "Specialized in design work",
      "Contest model great for clients",
      "Designer levels ensure quality",
      "Money-back guarantee for clients",
      "Strong portfolio showcase",
    ],
    cons: [
      "Speculative work in contests (no guaranteed pay)",
      "High competition in contests",
      "Lower earning potential for beginners",
    ],
    features: [
      "Design contests",
      "1-on-1 projects",
      "Designer certification levels",
      "Industry-specific design categories",
    ],
    status: "published",
    publishedAt: now,
    workType: "remote",
    countries: ["Worldwide"],
  },
];

// ---------------------------------------------------------------------------
// Expand to both locales
// ---------------------------------------------------------------------------

const platforms: PlatformInput[] = [];

for (const base of basePlatforms) {
  for (const locale of ["en", "nl"]) {
    platforms.push({
      ...base,
      locale,
      createdAt: now,
      updatedAt: now,
    });
  }
}

// ---------------------------------------------------------------------------
// Output JSON args for `npx convex run platforms:seedAll`
// ---------------------------------------------------------------------------

const args = { platforms };

// When run directly, print the JSON so it can be piped to convex run
if (require.main === module) {
  // Convex run expects: --args '<json>'
  // We print just the JSON so you can do:
  //   npx convex run platforms:seedAll --args "$(npx ts-node scripts/seed-platforms-convex.ts)"
  process.stdout.write(JSON.stringify(args));
}

export { platforms, args };

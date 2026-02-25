/**
 * scripts/seed-content-convex.ts
 *
 * Outputs JSON args for the `categories:seedAll` Convex mutation.
 * Includes 7 categories for both 'en' and 'nl' locales.
 *
 * Usage — run directly and pipe to convex:
 *   npx convex run categories:seedAll --args "$(npx tsx scripts/seed-content-convex.ts)"
 *
 * Or use the npm script:
 *   npm run db:seed-categories-convex
 */

interface CategoryInput {
  name: string;
  slug: string;
  description?: string;
  locale: string;
}

const categoriesEn: CategoryInput[] = [
  {
    name: "Technology",
    slug: "technology",
    description: "Tech news, tutorials, and industry insights",
    locale: "en",
  },
  {
    name: "Development",
    slug: "development",
    description: "Software development tips, best practices, and guides",
    locale: "en",
  },
  {
    name: "Design",
    slug: "design",
    description: "UI/UX design resources and creative inspiration",
    locale: "en",
  },
  {
    name: "Business",
    slug: "business",
    description: "Business strategies, entrepreneurship, and freelancing",
    locale: "en",
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Productivity, work-life balance, and personal growth",
    locale: "en",
  },
  {
    name: "Freelancing",
    slug: "freelancing",
    description: "Freelance tips, platform guides, and career advice",
    locale: "en",
  },
  {
    name: "AI & Tools",
    slug: "ai-tools",
    description: "AI tools, automation, and productivity software",
    locale: "en",
  },
];

const categoriesNl: CategoryInput[] = [
  {
    name: "Technologie",
    slug: "technologie",
    description: "Tech nieuws, tutorials en branche-inzichten",
    locale: "nl",
  },
  {
    name: "Ontwikkeling",
    slug: "ontwikkeling",
    description: "Software development tips, best practices en gidsen",
    locale: "nl",
  },
  {
    name: "Design",
    slug: "design",
    description: "UI/UX design bronnen en creatieve inspiratie",
    locale: "nl",
  },
  {
    name: "Zakelijk",
    slug: "zakelijk",
    description: "Bedrijfsstrategieën, ondernemerschap en freelancen",
    locale: "nl",
  },
  {
    name: "Levensstijl",
    slug: "levensstijl",
    description: "Productiviteit, werk-privébalans en persoonlijke groei",
    locale: "nl",
  },
  {
    name: "Freelancen",
    slug: "freelancen",
    description: "Freelance tips, platform gidsen en carrière-advies",
    locale: "nl",
  },
  {
    name: "AI & Tools",
    slug: "ai-tools",
    description: "AI tools, automatisering en productiviteitssoftware",
    locale: "nl",
  },
];

const categories: CategoryInput[] = [...categoriesEn, ...categoriesNl];

const args = { categories };

// When run directly, print the JSON so it can be piped to convex run
if (require.main === module) {
  process.stdout.write(JSON.stringify(args));
}

export { categories, args };

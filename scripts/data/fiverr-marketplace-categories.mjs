const categoryDefinitions = [
  {
    slug: "ai-services",
    serviceType: "digital",
    sortOrder: 9,
    names: { en: "AI Services", nl: "AI-diensten" },
    children: [
      { slug: "ai-chatbots", sortOrder: 1, names: { en: "AI Chatbots", nl: "AI-chatbots" } },
      { slug: "ai-agents", sortOrder: 2, names: { en: "AI Agents", nl: "AI-agents" } },
      { slug: "ai-applications", sortOrder: 3, names: { en: "AI Applications", nl: "AI-applicaties" } },
      { slug: "ai-integrations", sortOrder: 4, names: { en: "AI Integrations", nl: "AI-integraties" } },
      { slug: "ai-fine-tuning", sortOrder: 5, names: { en: "AI Fine-Tuning", nl: "AI fine-tuning" } },
      { slug: "ai-content-editing", sortOrder: 6, names: { en: "AI Content Editing", nl: "AI-contentbewerking" } },
      { slug: "ai-voice-generation", sortOrder: 7, names: { en: "AI Voice Generation", nl: "AI-stemgeneratie" } },
      { slug: "ai-strategy", sortOrder: 8, names: { en: "AI Strategy", nl: "AI-strategie" } },
    ],
  },
  {
    slug: "data",
    serviceType: "digital",
    sortOrder: 10,
    names: { en: "Data", nl: "Data" },
    children: [
      { slug: "data-entry", sortOrder: 1, names: { en: "Data Entry", nl: "Data-invoer" } },
      { slug: "data-scraping", sortOrder: 2, names: { en: "Data Scraping", nl: "Data scraping" } },
      { slug: "data-analytics", sortOrder: 3, names: { en: "Data Analytics", nl: "Data-analyse" } },
      { slug: "data-visualization", sortOrder: 4, names: { en: "Data Visualization", nl: "Datavisualisatie" } },
      { slug: "data-science", sortOrder: 5, names: { en: "Data Science", nl: "Data science" } },
      { slug: "databases", sortOrder: 6, names: { en: "Databases", nl: "Databases" } },
      { slug: "data-engineering", sortOrder: 7, names: { en: "Data Engineering", nl: "Data-engineering" } },
      { slug: "dashboard-creation", sortOrder: 8, names: { en: "Dashboard Creation", nl: "Dashboardontwikkeling" } },
    ],
  },
  {
    slug: "business",
    serviceType: "digital",
    sortOrder: 11,
    names: { en: "Business", nl: "Zakelijk" },
    children: [
      { slug: "virtual-assistant", sortOrder: 1, names: { en: "Virtual Assistant", nl: "Virtuele assistent" } },
      { slug: "market-research", sortOrder: 2, names: { en: "Market Research", nl: "Marktonderzoek" } },
      { slug: "e-commerce-management", sortOrder: 3, names: { en: "E-Commerce Management", nl: "E-commercebeheer" } },
      { slug: "project-management", sortOrder: 4, names: { en: "Project Management", nl: "Projectmanagement" } },
      { slug: "customer-support", sortOrder: 5, names: { en: "Customer Support", nl: "Klantenservice" } },
      { slug: "sales", sortOrder: 6, names: { en: "Sales", nl: "Sales" } },
      { slug: "legal-consulting", sortOrder: 7, names: { en: "Legal Consulting", nl: "Juridisch advies" } },
      { slug: "hr-consulting", sortOrder: 8, names: { en: "HR Consulting", nl: "HR-advies" } },
    ],
  },
  {
    slug: "consulting",
    serviceType: "hybrid",
    sortOrder: 12,
    names: { en: "Consulting", nl: "Consultancy" },
    children: [
      { slug: "business-consulting", sortOrder: 1, names: { en: "Business Consulting", nl: "Bedrijfsadvies" } },
      { slug: "go-to-market-strategy", sortOrder: 2, names: { en: "Go-To-Market Strategy", nl: "Go-to-marketstrategie" } },
      { slug: "website-consulting", sortOrder: 3, names: { en: "Website Consulting", nl: "Website-advies" } },
      { slug: "software-consulting", sortOrder: 4, names: { en: "Software Consulting", nl: "Software-advies" } },
      { slug: "cybersecurity-consulting", sortOrder: 5, names: { en: "Cybersecurity Consulting", nl: "Cybersecurity-advies" } },
      { slug: "data-consulting", sortOrder: 6, names: { en: "Data Consulting", nl: "Data-advies" } },
      { slug: "career-counseling", sortOrder: 7, names: { en: "Career Counseling", nl: "Loopbaanadvies" } },
      { slug: "product-strategy", sortOrder: 8, names: { en: "Product Strategy", nl: "Productstrategie" } },
    ],
  },
  {
    slug: "photography",
    serviceType: "hybrid",
    sortOrder: 13,
    names: { en: "Photography", nl: "Fotografie" },
    children: [
      { slug: "product-photography", sortOrder: 1, names: { en: "Product Photography", nl: "Productfotografie" } },
      { slug: "real-estate-photography", sortOrder: 2, names: { en: "Real Estate Photography", nl: "Vastgoedfotografie" } },
      { slug: "event-photography", sortOrder: 3, names: { en: "Event Photography", nl: "Evenementenfotografie" } },
      { slug: "food-photography", sortOrder: 4, names: { en: "Food Photography", nl: "Foodfotografie" } },
      { slug: "portrait-photography", sortOrder: 5, names: { en: "Portrait Photography", nl: "Portretfotografie" } },
      { slug: "drone-photography", sortOrder: 6, names: { en: "Drone Photography", nl: "Dronefotografie" } },
      { slug: "photo-editing", sortOrder: 7, names: { en: "Photo Editing", nl: "Fotobewerking" } },
      { slug: "photo-retouching", sortOrder: 8, names: { en: "Photo Retouching", nl: "Fotoretouche" } },
    ],
  },
  {
    slug: "finance-accounting",
    serviceType: "digital",
    sortOrder: 8,
    names: { en: "Finance & Accounting", nl: "Financiën & boekhouding" },
    children: [
      { slug: "corporate-finance", sortOrder: 9, names: { en: "Corporate Finance", nl: "Corporate finance" } },
      { slug: "fundraising", sortOrder: 10, names: { en: "Fundraising", nl: "Fondsenwerving" } },
      {
        slug: "personal-finance-wealth-management",
        sortOrder: 11,
        names: {
          en: "Personal Finance & Wealth Management",
          nl: "Persoonlijke financiën & vermogensbeheer",
        },
      },
      { slug: "banking-consulting", sortOrder: 12, names: { en: "Banking Consulting", nl: "Bankadvies" } },
      { slug: "financial-modeling", sortOrder: 13, names: { en: "Financial Modeling", nl: "Financiële modellering" } },
      { slug: "cfo-services", sortOrder: 14, names: { en: "CFO Services", nl: "CFO-diensten" } },
    ],
  },
];

function localizeItem(item, locale) {
  return {
    name: item.names[locale] || item.names.en,
    slug: item.slug,
    sortOrder: item.sortOrder,
  };
}

export function getFiverrMarketplaceCategories(locale = "en") {
  return categoryDefinitions.map((category) => ({
    ...localizeItem(category, locale),
    serviceType: category.serviceType,
    children: category.children.map((child) => localizeItem(child, locale)),
  }));
}

export const fiverrMarketplaceCategories = getFiverrMarketplaceCategories("en");
export const fiverrMarketplaceCategoriesNl = getFiverrMarketplaceCategories("nl");

export default fiverrMarketplaceCategories;

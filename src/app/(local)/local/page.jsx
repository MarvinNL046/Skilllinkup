import MarketplaceHub from "@/components/marketplace/MarketplaceHub";

export const metadata = {
  title: "Find Trusted Local Professionals",
  description: "Book verified professionals nearby for home maintenance, repairs, renovation, cleaning and other local services.",
  alternates: { canonical: "/local" },
};

const config = {
  tone: "local",
  eyebrow: "Local professionals · Nearby",
  title: "Trusted help for jobs",
  accent: "that happen at home.",
  description: "From boiler maintenance and plumbing to carpentry, painting and cleaning. Find checked professionals nearby, compare quotes and agree everything clearly.",
  image: "/images/skilllinkup-products/local-services-v1.png",
  imageAlt: "Friendly local heating engineer servicing a home boiler",
  search: { action: "/local/craftsmen", keywordLabel: "Local service", keywordPlaceholder: "What needs to be done?", location: "City or postcode", button: "Find a pro" },
  trust: ["Identity checked", "Local availability", "Clear quotes"],
  proof: { label: "Professionals nearby", value: "Checked & available" },
  rating: { value: "4.8 / 5", label: "Average customer rating" },
  stats: [
    { icon: "local", value: "Nearby", label: "Distance-based matching" },
    { icon: "verified", value: "Verified", label: "Identity and credentials" },
    { icon: "fast", value: "Fast", label: "Compare local quotes" },
    { icon: "shield", value: "Protected", label: "Safe agreements" },
  ],
  categoryEyebrow: "Jobs around the home",
  categoryTitle: "What can we help you fix?",
  categoryLink: "/local/craftsmen",
  categories: [
    { name: "Heating & air conditioning", description: "Boilers, heat pumps and aircon", icon: "fast", href: "/local/craftsmen?q=heating" },
    { name: "Plumbing", description: "Leaks, fittings and installations", icon: "shield", href: "/local/craftsmen?q=plumbing" },
    { name: "Electrical", description: "Repairs, lighting and rewiring", icon: "verified", href: "/local/craftsmen?q=electrical" },
    { name: "Carpentry", description: "Custom woodwork and repairs", icon: "jobs", href: "/local/craftsmen?q=carpentry" },
    { name: "Painting & decorating", description: "Interior and exterior finishes", icon: "quality", href: "/local/craftsmen?q=painting" },
    { name: "Cleaning", description: "Homes, offices and end-of-tenancy", icon: "people", href: "/local/craftsmen?q=cleaning" },
    { name: "Gardening", description: "Maintenance and landscaping", icon: "local", href: "/local/craftsmen?q=gardening" },
    { name: "Moving & delivery", description: "Local transport and removals", icon: "global", href: "/local/craftsmen?q=moving" },
  ],
  feature: {
    image: "/images/skilllinkup-worlds/local-trust-v1.png",
    imageAlt: "Local tradeswoman reviewing completed carpentry with a homeowner",
    badgeLabel: "Before work begins",
    badgeValue: "Price and appointment agreed",
    eyebrow: "Confidence at the front door",
    title: "Know who is coming—and what has been agreed.",
    description: "Local work depends on trust. Profiles make experience, service area and checks visible, while the request keeps photos, quotes and appointments together.",
    points: ["Clear service radius and availability", "Credentials and verification shown", "Written scope before the appointment"],
    href: "/local/craftsmen",
    cta: "Find someone nearby",
  },
  highlightEyebrow: "Popular local requests",
  highlightTitle: "Real jobs people need help with",
  highlights: [
    { kicker: "Home maintenance", meta: "Often same week", title: "Boiler and heating service", description: "Routine maintenance, fault finding and efficiency checks by an available professional nearby.", tags: ["Heating", "Maintenance", "Local"], value: "From €95", href: "/local/craftsmen?q=heating", cta: "Find help" },
    { kicker: "Urgent repair", meta: "Fast response", title: "Plumbing and leak repair", description: "Describe the issue, add photos and quickly compare qualified local responses.", tags: ["Plumbing", "Repair", "Verified"], value: "Request a quote", href: "/local/quote-requests", cta: "Get quotes" },
    { kicker: "Home improvement", meta: "Planned project", title: "Carpentry made to fit", description: "From built-in storage to repairs and finish work, find craft matched to your project.", tags: ["Carpentry", "Interior", "Custom work"], value: "Compare locally", href: "/local/craftsmen?q=carpentry", cta: "Browse pros" },
  ],
  pathTitle: "A clearer way to arrange local work",
  pathDescription: "Choose how much help you need—from finding the right professional to comparing complete quotes for your job.",
  paths: [
    { icon: "people", title: "Browse local professionals", description: "See verified profiles, specialties, service areas and customer reviews.", href: "/local/craftsmen", cta: "Find professionals" },
    { icon: "salary", title: "Request quotes", description: "Describe the job once and compare responses from available people nearby.", href: "/local/request-quote", cta: "Request a quote" },
    { icon: "verified", title: "Agree and work safely", description: "Keep scope, appointments and communication together in one place.", href: "/help", cta: "How it works" },
  ],
  stepsTitle: "A reliable local match in three steps",
  steps: [
    { title: "Tell us what is needed", description: "Add the job, location, preferred date and useful photos." },
    { title: "Compare local professionals", description: "Review credentials, availability, ratings and quotes." },
    { title: "Book with clarity", description: "Confirm the price and appointment before work begins." },
  ],
  testimonialTitle: "Trusted locally, one job at a time",
  testimonials: [
    { initials: "LH", name: "Laura Hendriks", role: "Homeowner", quote: "I uploaded two photos and received clear responses without calling ten companies. I knew exactly who would arrive." },
    { initials: "MS", name: "Mehmet Sahin", role: "Heating engineer", quote: "The requests contain the information I need, so I can give homeowners a realistic answer before driving over." },
    { initials: "RB", name: "Rosa Bakker", role: "Property manager", quote: "I can keep different maintenance jobs organised and still work with trusted people from the neighbourhood." },
  ],
  faqs: [
    { question: "How do you check local professionals?", answer: "Identity and business details can be verified, with trade credentials and insurance shown where relevant to the category." },
    { question: "Do I need to share my full address?", answer: "No. A general area is enough while comparing professionals. Exact appointment details are shared only when needed." },
    { question: "Can I request several quotes?", answer: "Yes. A single request can be matched with suitable professionals so you can compare approach, timing and price." },
    { question: "What should I include in a request?", answer: "Describe the issue, add useful photos, note urgency and provide a few suitable visit windows for better responses." },
    { question: "Can professionals set a service radius?", answer: "Yes. Local profiles can specify the cities, postcodes or travel distance they cover." },
    { question: "What happens if plans change?", answer: "Keep rescheduling and scope changes in the platform so both sides retain a clear written record." },
  ],
  cta: { eyebrow: "A job worth doing well", title: "Find someone nearby who can get it done.", description: "Start with a search or request quotes from trusted local professionals.", primaryHref: "/local/craftsmen", primaryLabel: "Find a local pro", secondaryHref: "/local/request-quote", secondaryLabel: "Request quotes" },
};

export default function LocalPage() { return <MarketplaceHub config={config} />; }

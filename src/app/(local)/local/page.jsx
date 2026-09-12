import MarketplaceHub from "@/components/marketplace/MarketplaceHub";

export const metadata = {
  title: "Find Local Professionals",
  description: "Find local professionals for home maintenance and repairs. Compare service areas, profiles and quotes before arranging work.",
  alternates: { canonical: "/local" },
};

const config = {
  tone: "local",
  eyebrow: "Local professionals · Nearby",
  title: "Local help for jobs",
  accent: "that happen at home.",
  description: "From boiler maintenance and plumbing to carpentry, painting and cleaning. Search professional profiles by area, request quotes and agree the work before a visit.",
  image: "/images/skilllinkup-products/local-services-v1.png",
  imageAlt: "Friendly local heating engineer servicing a home boiler",
  search: { action: "/local/craftsmen", keywordLabel: "Local service", keywordPlaceholder: "What needs to be done?", location: "City or postcode", button: "Find a pro" },
  trust: ["Professional profiles", "Local service radius", "Clear quotes"],
  proof: { label: "Search your area", value: "City + postcode" },
  rating: { value: "Five trades", label: "Focused private beta" },
  stats: [
    { icon: "local", value: "Nearby", label: "City and postcode search" },
    { icon: "verified", value: "Visible", label: "Skills and service area" },
    { icon: "fast", value: "Compare", label: "Local quotes" },
    { icon: "shield", value: "Private", label: "Address by default" },
  ],
  categoryEyebrow: "Jobs around the home",
  categoryTitle: "What can we help you fix?",
  categoryLink: "/local/craftsmen",
  categories: [
    { name: "Heating & boiler", description: "Boilers, heat pumps and maintenance", icon: "fast", href: "/local/craftsmen?q=heating" },
    { name: "Air conditioning", description: "Installation, service and repair", icon: "local", href: "/local/craftsmen?q=air+conditioning" },
    { name: "Plumbing", description: "Leaks, fittings and installations", icon: "shield", href: "/local/craftsmen?q=plumbing" },
    { name: "Electrical", description: "Repairs, lighting and rewiring", icon: "verified", href: "/local/craftsmen?q=electrical" },
    { name: "Carpentry", description: "Custom woodwork and repairs", icon: "jobs", href: "/local/craftsmen?q=carpentry" },
  ],
  feature: {
    image: "/images/skilllinkup-worlds/local-trust-v1.png",
    imageAlt: "Local tradeswoman reviewing completed carpentry with a homeowner",
    badgeLabel: "Before work begins",
    badgeValue: "Price and appointment agreed",
    eyebrow: "Confidence at the front door",
    title: "Know who is coming—and what has been agreed.",
    description: "Local work depends on trust. Compare the experience and service area a professional has published. Keep your request, quotes and appointment details together.",
    points: ["Published service radius and availability", "Ask about qualifications for your specific job", "Written scope before the appointment"],
    href: "/local/craftsmen",
    cta: "Find someone nearby",
  },
  highlightEyebrow: "Product preview",
  highlightTitle: "Example requests in the launch trades",
  highlights: [
    { kicker: "Home maintenance", meta: "Dates to agree", title: "Boiler and heating service", description: "Routine maintenance, fault finding and efficiency checks by an available professional nearby.", tags: ["Heating", "Maintenance", "Local"], value: "Compare quotes", href: "/local/craftsmen?q=heating", cta: "Find help" },
    { kicker: "Repair request", meta: "Describe the issue", title: "Plumbing and leak repair", description: "Describe the issue, add photos and compare the responses you receive.", tags: ["Plumbing", "Repair", "Local"], value: "Request a quote", href: "/local/request-quote", cta: "Request quotes" },
    { kicker: "Home improvement", meta: "Planned project", title: "Carpentry made to fit", description: "From built-in storage to repairs and finish work, find craft matched to your project.", tags: ["Carpentry", "Interior", "Custom work"], value: "Compare locally", href: "/local/craftsmen?q=carpentry", cta: "Browse pros" },
  ],
  pathTitle: "A clearer way to arrange local work",
  pathDescription: "Choose how much help you need—from finding the right professional to comparing complete quotes for your job.",
  paths: [
    { icon: "people", title: "Browse local professionals", description: "Compare published profiles, specialties and service areas.", href: "/local/craftsmen", cta: "Find professionals" },
    { icon: "salary", title: "Request quotes", description: "Describe the job once and compare responses from available people nearby.", href: "/local/request-quote", cta: "Request a quote" },
    { icon: "verified", title: "Agree before work starts", description: "Keep scope, appointments and communication together in one place.", href: "/help", cta: "How it works" },
  ],
  stepsTitle: "Arrange local work in three steps",
  steps: [
    { title: "Tell us what is needed", description: "Add the job, location, preferred date and useful photos." },
    { title: "Compare local professionals", description: "Review the profile and quote, and confirm qualifications and availability directly." },
    { title: "Book with clarity", description: "Confirm the price and appointment before work begins." },
  ],
  testimonialTitle: "Ways to use a local workspace",
  testimonials: [
    { initials: "LH", name: "Laura Hendriks", role: "Homeowner", quote: "A homeowner can describe a repair, add photos and compare the quotes that arrive." },
    { initials: "MS", name: "Mehmet Sahin", role: "Heating engineer", quote: "A professional can review the request before proposing a price and suitable visit time." },
    { initials: "RB", name: "Rosa Bakker", role: "Property manager", quote: "A property manager can keep separate requests, appointments and written agreements organised." },
  ],
  faqs: [
    { question: "What should I check before hiring?", answer: "Review the published profile and any verification badge. Ask the professional directly for relevant qualifications and insurance before agreeing to regulated or specialist work." },
    { question: "Do I need to share my full address?", answer: "No. A general area is enough while comparing professionals. Exact appointment details are shared only when needed." },
    { question: "Can I request several quotes?", answer: "Yes. Professionals can respond to one request, so you can compare approach, timing and price. Responses depend on who is available in your area." },
    { question: "What should I include in a request?", answer: "Describe the issue, add useful photos, note urgency and provide a few suitable visit windows for better responses." },
    { question: "Can professionals set a service radius?", answer: "Yes. Local profiles can publish a base area and service radius. Confirm that your address falls within the professional’s coverage." },
    { question: "What happens if plans change?", answer: "Keep rescheduling and scope changes in the platform so both sides retain a clear written record." },
  ],
  cta: { eyebrow: "A job worth doing well", title: "Find someone nearby who can get it done.", description: "Start with a search or describe the work to request local quotes.", primaryHref: "/local/craftsmen", primaryLabel: "Find a local pro", secondaryHref: "/local/request-quote", secondaryLabel: "Request quotes" },
};

export default function LocalPage() { return <MarketplaceHub config={config} />; }

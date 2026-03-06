function category(slug, en, nl, options = {}) {
  const cat = {
    slug,
    name: en,
    serviceType: "local",
    sortOrder: options.sortOrder,
  };
  if (options.icon) cat.icon = options.icon;
  if (options.description) cat.description = options.description;
  if (options.children?.length) cat.children = options.children;
  return cat;
}

export const localMarketplaceCategories = [
  // ─── 1. Building & Construction ───────────────────────────────────────────
  category("local-building-construction", "Building & Construction", "Bouwen & verbouwing", {
    sortOrder: 1,
    icon: "🏗️",
    children: [
      category("local-renovation",    "Renovation",    "Verbouwing",    { sortOrder: 1 }),
      category("local-extension",     "Extension",     "Aanbouw",       { sortOrder: 2 }),
      category("local-architect",     "Architect",     "Architect",     { sortOrder: 3 }),
      category("local-roofing",       "Roofing",       "Dakbedekking",  { sortOrder: 4 }),
      category("local-dormer-window", "Dormer Window", "Dakkapel",      { sortOrder: 5 }),
      category("local-roof-window",   "Roof Window",   "Dakraam",       { sortOrder: 6 }),
      category("local-window-frames", "Window Frames", "Kozijnen",      { sortOrder: 7 }),
      category("local-sliding-door",  "Sliding Door",  "Schuifpui",     { sortOrder: 8 }),
      category("local-conservatory",  "Conservatory",  "Serre",         { sortOrder: 9 }),
      category("local-stairs",        "Stairs",        "Trap",          { sortOrder: 10 }),
    ],
  }),

  // ─── 2. Technical & Installation ──────────────────────────────────────────
  category("local-technical-installation", "Technical & Installation", "Techniek & installatie", {
    sortOrder: 2,
    icon: "⚡",
    children: [
      category("local-electrician",        "Electrician",          "Elektricien",          { sortOrder: 1 }),
      category("local-plumber",            "Plumber",              "Loodgieter",           { sortOrder: 2 }),
      category("local-central-heating",    "Central Heating Boiler","Cv-ketel",            { sortOrder: 3 }),
      category("local-air-conditioning",   "Air Conditioning",     "Airco",                { sortOrder: 4 }),
      category("local-heat-pump",          "Heat Pump",            "Warmtepomp",           { sortOrder: 5 }),
      category("local-solar-panels",       "Solar Panels",         "Zonnepanelen",         { sortOrder: 6 }),
      category("local-home-battery",       "Home Battery",         "Thuisbatterij",        { sortOrder: 7 }),
      category("local-charging-station",   "Charging Station",     "Laadpalen",            { sortOrder: 8 }),
      category("local-ventilation",        "Ventilation",          "Ventilatie",           { sortOrder: 9 }),
      category("local-underfloor-heating", "Underfloor Heating",   "Vloerverwarming",      { sortOrder: 10 }),
      category("local-garage-door",        "Garage Door",          "Garagedeur",           { sortOrder: 11 }),
    ],
  }),

  // ─── 3. Interior & Finishing ──────────────────────────────────────────────
  category("local-interior-finishing", "Interior & Finishing", "Interieur & afwerking", {
    sortOrder: 3,
    icon: "🏠",
    children: [
      category("local-kitchen",    "Kitchen Specialist",  "Keukenspecialist",    { sortOrder: 1 }),
      category("local-bathroom",   "Bathroom Specialist", "Badkamerspecialist",  { sortOrder: 2 }),
      category("local-flooring",   "Flooring",            "Vloeren",             { sortOrder: 3 }),
      category("local-painting",   "Painting",            "Schilderwerk",        { sortOrder: 4 }),
      category("local-plastering", "Plastering",          "Stucwerk",            { sortOrder: 5 }),
      category("local-tiling",     "Tiling",              "Tegels zetten",       { sortOrder: 6 }),
      category("local-glass",      "Glass",               "Glas",                { sortOrder: 7 }),
      category("local-insulation", "Insulation",          "Isolatie",            { sortOrder: 8 }),
      category("local-wellness",   "Wellness",            "Wellness",            { sortOrder: 9 }),
    ],
  }),

  // ─── 4. Garden & Exterior ─────────────────────────────────────────────────
  category("local-garden-exterior", "Garden & Exterior", "Tuin & buitenruimte", {
    sortOrder: 4,
    icon: "🌿",
    children: [
      category("local-garden-design",      "Garden Design",     "Tuinaanleg",         { sortOrder: 1 }),
      category("local-garden-maintenance", "Garden Maintenance","Tuinonderhoud",       { sortOrder: 2 }),
      category("local-paving",             "Paving",            "Bestraten",          { sortOrder: 3 }),
      category("local-fencing",            "Fencing",           "Hekwerken",          { sortOrder: 4 }),
      category("local-facade-cleaning",    "Facade Cleaning",   "Gevelreiniging",     { sortOrder: 5 }),
      category("local-roller-shutters",    "Roller Shutters",   "Rolluiken",          { sortOrder: 6 }),
      category("local-sun-blinds",         "Sun Blinds",        "Zonwering",          { sortOrder: 7 }),
    ],
  }),

  // ─── 5. Safety & Maintenance ──────────────────────────────────────────────
  category("local-safety-maintenance", "Safety & Maintenance", "Veiligheid & onderhoud", {
    sortOrder: 5,
    icon: "🛡️",
    children: [
      category("local-asbestos-removal",   "Asbestos Removal",    "Asbest verwijderen",    { sortOrder: 1 }),
      category("local-pest-control",       "Pest Control",        "Ongediertebestrijding", { sortOrder: 2 }),
      category("local-damp-control",       "Damp Control",        "Vochtbestrijding",      { sortOrder: 3 }),
      category("local-burglary-protection","Burglary Protection", "Inbraakbeveiliging",    { sortOrder: 4 }),
    ],
  }),
];

import { v } from "convex/values";
import { mutation, MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { requireServerSecret } from "../lib/authHelpers";

type SeedLookup = {
  tenantId: Id<"tenants">;
  categoryId: Id<"marketplaceCategories">;
  clientId: Id<"users">;
  freelancerId: Id<"users">;
  freelancerProfileId: Id<"freelancerProfiles">;
};

async function getSeedLookup(
  ctx: MutationCtx,
  {
    clientEmail,
    freelancerEmail,
    categorySlug,
    locale,
  }: {
    clientEmail: string;
    freelancerEmail: string;
    categorySlug: string;
    locale: string;
  }
): Promise<SeedLookup> {
  const tenant = await ctx.db.query("tenants").first();
  if (!tenant) throw new Error("No tenant found.");

  const client = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", clientEmail))
    .first();
  if (!client) throw new Error(`Client user not found for ${clientEmail}.`);

  const freelancer = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", freelancerEmail))
    .first();
  if (!freelancer) throw new Error(`Freelancer user not found for ${freelancerEmail}.`);

  const freelancerProfile = await ctx.db
    .query("freelancerProfiles")
    .withIndex("by_userId", (q) => q.eq("userId", freelancer._id))
    .first();
  if (!freelancerProfile) {
    throw new Error(`Freelancer profile not found for ${freelancerEmail}.`);
  }

  const category = await ctx.db
    .query("marketplaceCategories")
    .withIndex("by_slug_locale", (q) =>
      q.eq("slug", categorySlug).eq("locale", locale)
    )
    .first();
  if (!category) throw new Error(`Category not found for slug ${categorySlug}.`);

  return {
    tenantId: tenant._id,
    categoryId: category._id,
    clientId: client._id,
    freelancerId: freelancer._id,
    freelancerProfileId: freelancerProfile._id,
  };
}

export const seed = mutation({
  args: {
    serverSecret: v.string(),
    tag: v.string(),
    clientEmail: v.string(),
    freelancerEmail: v.string(),
    categorySlug: v.optional(v.string()),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);

    const locale = args.locale ?? "en";
    const categorySlug = args.categorySlug ?? "finance-accounting";
    const now = Date.now();
    const lookup = await getSeedLookup(ctx, {
      clientEmail: args.clientEmail,
      freelancerEmail: args.freelancerEmail,
      categorySlug,
      locale,
    });

    const serviceSlug = `smoke-service-${args.tag}`;
    const projectSlug = `smoke-project-${args.tag}`;
    const jobSlug = `smoke-job-${args.tag}`;
    const quoteTitle = `Smoke Test Quote Request ${args.tag}`;

    const gigId = await ctx.db.insert("gigs", {
      tenantId: lookup.tenantId,
      freelancerId: lookup.freelancerProfileId,
      title: `Smoke Test Service ${args.tag}`,
      slug: serviceSlug,
      description: "End-to-end service detail smoke test record.",
      categoryId: lookup.categoryId,
      tags: ["smoke", "qa", "e2e"],
      workType: "remote",
      locationCity: "Amsterdam",
      locationCountry: "Netherlands",
      serviceRadiusKm: 25,
      views: 0,
      orderCount: 0,
      ratingAverage: 0,
      ratingCount: 0,
      isFeatured: false,
      status: "active",
      locale,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    const gigPackageId = await ctx.db.insert("gigPackages", {
      gigId,
      tier: "Basic",
      title: "Smoke Test Package",
      description: "A minimal package for service detail smoke testing.",
      price: 149,
      currency: "EUR",
      deliveryDays: 5,
      revisionCount: 2,
      features: ["Kickoff call", "Implementation", "Handover"],
      createdAt: now,
      updatedAt: now,
    });

    const projectId = await ctx.db.insert("projects", {
      tenantId: lookup.tenantId,
      clientId: lookup.clientId,
      title: `Smoke Test Project ${args.tag}`,
      slug: projectSlug,
      description: "Project detail smoke test record with a real bid path.",
      categoryId: lookup.categoryId,
      requiredSkills: ["React", "Next.js", "Convex"],
      budgetMin: 1200,
      budgetMax: 1800,
      currency: "EUR",
      deadline: now + 14 * 24 * 60 * 60 * 1000,
      workType: "remote",
      bidCount: 1,
      views: 0,
      status: "open",
      locale,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    const bidId = await ctx.db.insert("bids", {
      projectId,
      freelancerId: lookup.freelancerProfileId,
      amount: 1550,
      currency: "EUR",
      deliveryDays: 10,
      pitch: "I can deliver this within ten days with a clean handoff.",
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    const quoteRequestId = await ctx.db.insert("quoteRequests", {
      tenantId: lookup.tenantId,
      clientId: lookup.clientId,
      categoryId: lookup.categoryId,
      title: quoteTitle,
      description:
        "Need help validating the quote request detail page with enough body text to test the preview and full-description paths.",
      locationCity: "Rotterdam",
      locationPostcode: "3011AA",
      locationCountry: "Netherlands",
      budgetIndication: "EUR500 - EUR1,000",
      preferredDate: now + 7 * 24 * 60 * 60 * 1000,
      status: "open",
      quoteCount: 0,
      maxSlots: 3,
      claimedSlots: 0,
      isExclusive: false,
      createdAt: now,
      updatedAt: now,
    });

    const jobId = await ctx.db.insert("jobs", {
      tenantId: lookup.tenantId,
      clientId: lookup.clientId,
      title: `Smoke Test Job ${args.tag}`,
      slug: jobSlug,
      description: "Job detail smoke test record for browser validation.",
      categoryId: lookup.categoryId,
      company: "SkillLinkup QA",
      requiredSkills: ["React", "TypeScript"],
      salaryMin: 65000,
      salaryMax: 85000,
      currency: "EUR",
      jobType: "full-time",
      experienceLevel: "mid",
      workType: "hybrid",
      locationCity: "Utrecht",
      locationCountry: "Netherlands",
      benefits: ["Remote days", "Learning budget"],
      applicationCount: 0,
      views: 0,
      status: "open",
      locale,
      publishedAt: now,
      expiresAt: now + 30 * 24 * 60 * 60 * 1000,
      createdAt: now,
      updatedAt: now,
    });

    return {
      tag: args.tag,
      locale,
      ids: {
        gigId,
        gigPackageId,
        projectId,
        bidId,
        quoteRequestId,
        jobId,
      },
      routes: {
        service: `/online/service/${serviceSlug}`,
        project: `/online/project/${projectSlug}`,
        quoteRequest: `/local/quote-request/${quoteRequestId}`,
        job: `/jobs/job/${jobSlug}`,
      },
    };
  },
});

/**
 * Seed StayCool Airconditioning freelancer profile with gigs, projects, and portfolio.
 */
export const seedStaycool = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) throw new Error("No tenant found");
    const tenantId = tenant._id;

    // Check if profile already exists
    const existing = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_slug", (q) => q.eq("slug", "staycool-airconditioning"))
      .first();
    if (existing) throw new Error("StayCool profile already exists: " + existing._id);

    // 1. Create user
    const userId = await ctx.db.insert("users", {
      name: "StayCool Airconditioning",
      email: "info@staycool-airco.nl",
      role: "freelancer",
      tenantId,
      createdAt: now,
      updatedAt: now,
    });

    // 2. Create freelancer profile
    const profileId = await ctx.db.insert("freelancerProfiles", {
      userId,
      tenantId,
      displayName: "StayCool Airconditioning",
      slug: "staycool-airconditioning",
      tagline: "Professionele airconditioning installatie & onderhoud",
      bio: "StayCool Airconditioning is uw specialist voor airconditioning in de Randstad. Met meer dan 10 jaar ervaring leveren wij hoogwaardige aircosystemen voor woningen en bedrijfspanden. Van advies tot installatie en jaarlijks onderhoud — wij zorgen voor een aangenaam binnenklimaat het hele jaar door. Wij werken uitsluitend met A-merken zoals Daikin, Mitsubishi en Samsung, en bieden garantie op al onze installaties.",
      hourlyRate: 75,
      workType: "local",
      locationCity: "Rotterdam",
      locationCountry: "Netherlands",
      serviceRadiusKm: 50,
      skills: ["Airconditioning", "HVAC", "Klimaatbeheersing", "Split-unit installatie", "Warmtepomp", "Onderhoud", "Daikin", "Mitsubishi", "Samsung"],
      languages: ["Nederlands", "English"],
      status: "active",
      profileVisibility: "public",
      isAvailable: true,
      isVerified: true,
      verificationDate: now,
      level: "pro",
      ratingAverage: 4.8,
      ratingCount: 23,
      totalOrders: 47,
      totalEarnings: 89500,
      completionRate: 98,
      responseTimeHours: 2,
      contactPermission: "everyone",
      featured: false,
      locale: "en",
      portfolioUrls: [],
      createdAt: now - 365 * 24 * 60 * 60 * 1000,
      updatedAt: now,
    });

    // Find HVAC category
    const hvacCategory = await ctx.db
      .query("marketplaceCategories")
      .withIndex("by_slug_locale", (q) => q.eq("slug", "hvac").eq("locale", "en"))
      .first();
    const hvacCategoryId = hvacCategory?._id;

    // 3. Gig 1: Airco installatie
    const gig1Id = await ctx.db.insert("gigs", {
      tenantId,
      freelancerId: profileId,
      title: "Airconditioning Installatie",
      slug: "airconditioning-installatie-staycool",
      description: "Complete airconditioning installatie voor uw woning of kantoor. Inclusief advies op locatie, levering van het systeem, professionele installatie en inbedrijfstelling. Wij werken met topmerken als Daikin, Mitsubishi en Samsung.",
      categoryId: hvacCategoryId,
      tags: ["airco", "installatie", "split-unit", "daikin", "koeling"],
      workType: "local",
      locationCity: "Rotterdam",
      locationCountry: "Netherlands",
      serviceRadiusKm: 50,
      status: "active",
      views: 124,
      orderCount: 31,
      ratingAverage: 4.9,
      ratingCount: 18,
      isFeatured: false,
      locale: "en",
      publishedAt: now - 180 * 24 * 60 * 60 * 1000,
      createdAt: now - 180 * 24 * 60 * 60 * 1000,
      updatedAt: now,
    });

    await ctx.db.insert("gigPackages", {
      gigId: gig1Id,
      tier: "basic",
      title: "Enkele Ruimte",
      description: "1 split-unit installatie voor een ruimte tot 25m²",
      price: 1495,
      currency: "EUR",
      deliveryDays: 5,
      revisionCount: 0,
      features: ["Adviesgesprek op locatie", "Daikin/Samsung split-unit", "Professionele installatie", "Inbedrijfstelling & uitleg", "2 jaar garantie"],
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("gigPackages", {
      gigId: gig1Id,
      tier: "standard",
      title: "Twee Ruimtes",
      description: "Multi-split systeem voor 2 ruimtes",
      price: 2795,
      currency: "EUR",
      deliveryDays: 7,
      revisionCount: 0,
      features: ["Adviesgesprek op locatie", "Multi-split systeem (2 units)", "Professionele installatie", "Leidingwerk weggewerkt", "Inbedrijfstelling & uitleg", "3 jaar garantie"],
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("gigPackages", {
      gigId: gig1Id,
      tier: "premium",
      title: "Complete Woning",
      description: "Multi-split systeem voor 3-4 ruimtes met premium Daikin units en WiFi-bediening",
      price: 4995,
      currency: "EUR",
      deliveryDays: 10,
      revisionCount: 0,
      features: ["Uitgebreid advies & ontwerp", "Premium Daikin multi-split (3-4 units)", "WiFi-module (app-bediening)", "Complete installatie & afwerking", "Leidingwerk volledig weggewerkt", "5 jaar garantie"],
      createdAt: now,
      updatedAt: now,
    });

    // 4. Gig 2: Airco onderhoud
    const gig2Id = await ctx.db.insert("gigs", {
      tenantId,
      freelancerId: profileId,
      title: "Airconditioning Onderhoud & Service",
      slug: "airco-onderhoud-service-staycool",
      description: "Professioneel onderhoud van uw aircosysteem. Jaarlijks onderhoud verlengt de levensduur, verbetert de luchtkwaliteit en houdt het energieverbruik laag.",
      categoryId: hvacCategoryId,
      tags: ["airco", "onderhoud", "service", "reiniging", "inspectie"],
      workType: "local",
      locationCity: "Rotterdam",
      locationCountry: "Netherlands",
      serviceRadiusKm: 50,
      status: "active",
      views: 87,
      orderCount: 16,
      ratingAverage: 4.7,
      ratingCount: 5,
      isFeatured: false,
      locale: "en",
      publishedAt: now - 150 * 24 * 60 * 60 * 1000,
      createdAt: now - 150 * 24 * 60 * 60 * 1000,
      updatedAt: now,
    });

    await ctx.db.insert("gigPackages", {
      gigId: gig2Id,
      tier: "basic",
      title: "Enkele Unit",
      description: "Onderhoudsbeurt voor 1 airco split-unit",
      price: 129,
      currency: "EUR",
      deliveryDays: 3,
      revisionCount: 0,
      features: ["Filters reinigen/vervangen", "Koudemiddel controle", "Condensafvoer reinigen", "Werking testen", "Servicerapport"],
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("gigPackages", {
      gigId: gig2Id,
      tier: "standard",
      title: "Multi-Split (2-3 units)",
      description: "Onderhoudsbeurt voor multi-split systeem met 2-3 binnenunits",
      price: 219,
      currency: "EUR",
      deliveryDays: 3,
      revisionCount: 0,
      features: ["Alle binnenunits reinigen", "Buitenunit reinigen & inspecteren", "Koudemiddel controle", "Leidingwerk inspectie", "Werking & rendement testen", "Uitgebreid servicerapport"],
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("gigPackages", {
      gigId: gig2Id,
      tier: "premium",
      title: "Jaarcontract",
      description: "Jaarlijks onderhoudscontract met 2 servicebeurten en prioriteit bij storingen",
      price: 349,
      currency: "EUR",
      deliveryDays: 7,
      revisionCount: 0,
      features: ["2x onderhoud per jaar", "Alle units gereinigd & geïnspecteerd", "Voorrang bij storingen", "10% korting op reparaties", "Telefonisch advies", "Verlengde garantie"],
      createdAt: now,
      updatedAt: now,
    });

    // 5. Projects
    const project1Id = await ctx.db.insert("projects", {
      tenantId,
      clientId: userId,
      title: "Airco installatie bovenwoning Rotterdam-Zuid",
      slug: "airco-installatie-bovenwoning-rotterdam-zuid",
      description: "We zoeken een ervaren airco-installateur voor het plaatsen van een split-unit systeem in onze bovenwoning in Rotterdam-Zuid. Het gaat om 2 slaapkamers en een woonkamer.",
      categoryId: hvacCategoryId,
      requiredSkills: ["Airconditioning", "Split-unit installatie", "Residentieel"],
      budgetMin: 2500,
      budgetMax: 4500,
      currency: "EUR",
      deadline: now + 30 * 24 * 60 * 60 * 1000,
      workType: "local",
      status: "open",
      bidCount: 0,
      views: 12,
      locale: "en",
      publishedAt: now - 3 * 24 * 60 * 60 * 1000,
      createdAt: now - 3 * 24 * 60 * 60 * 1000,
      updatedAt: now,
    });

    const project2Id = await ctx.db.insert("projects", {
      tenantId,
      clientId: userId,
      title: "Klimaatbeheersing kantoorpand Capelle a/d IJssel",
      slug: "klimaatbeheersing-kantoorpand-capelle",
      description: "Voor ons kantoorpand in Capelle aan den IJssel (ca. 200m²) zoeken wij een specialist voor het ontwerpen en installeren van een compleet klimaatbeheersing systeem.",
      categoryId: hvacCategoryId,
      requiredSkills: ["HVAC", "Warmtepomp", "Klimaatbeheersing", "Commercieel"],
      budgetMin: 8000,
      budgetMax: 15000,
      currency: "EUR",
      deadline: now + 60 * 24 * 60 * 60 * 1000,
      workType: "local",
      status: "open",
      bidCount: 0,
      views: 8,
      locale: "en",
      publishedAt: now - 5 * 24 * 60 * 60 * 1000,
      createdAt: now - 5 * 24 * 60 * 60 * 1000,
      updatedAt: now,
    });

    // 6. Portfolio
    await ctx.db.insert("portfolioProjects", {
      userId,
      tenantId,
      title: "Villa Klimaatsysteem Wassenaar",
      description: "Complete klimaatoplossing voor een vrijstaande villa. 6-zone Daikin multi-split systeem met vloerverwarming-integratie. Smart home koppeling via Daikin Onecta app.",
      tags: ["Daikin", "Villa", "Multi-split", "Smart Home"],
      sortOrder: 1,
      createdAt: now - 90 * 24 * 60 * 60 * 1000,
      updatedAt: now,
    });

    await ctx.db.insert("portfolioProjects", {
      userId,
      tenantId,
      title: "Restaurant De Havenloods — Koelinstallatie",
      description: "Commerciële koelinstallatie voor restaurant met open keuken. Mitsubishi cassette-units met 360° luchtstroom.",
      tags: ["Mitsubishi", "Horeca", "Cassette-unit", "Commercieel"],
      sortOrder: 2,
      createdAt: now - 60 * 24 * 60 * 60 * 1000,
      updatedAt: now,
    });

    await ctx.db.insert("portfolioProjects", {
      userId,
      tenantId,
      title: "Penthouse Rotterdam Kop van Zuid",
      description: "Luxe penthouse met volledig weggewerkte airconditioning. Samsung WindFree units die koelen zonder directe luchtstroom.",
      tags: ["Samsung", "WindFree", "Penthouse", "Design"],
      sortOrder: 3,
      createdAt: now - 30 * 24 * 60 * 60 * 1000,
      updatedAt: now,
    });

    return {
      userId,
      profileId,
      gig1Id,
      gig2Id,
      project1Id,
      project2Id,
      message: "StayCool Airconditioning: 2 gigs (6 packages), 2 projects, 3 portfolio items created",
    };
  },
});

export const cleanup = mutation({
  args: {
    serverSecret: v.string(),
    gigId: v.optional(v.id("gigs")),
    projectId: v.optional(v.id("projects")),
    quoteRequestId: v.optional(v.id("quoteRequests")),
    jobId: v.optional(v.id("jobs")),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);

    if (args.projectId) {
      const bids = await ctx.db
        .query("bids")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId!))
        .collect();
      for (const bid of bids) {
        await ctx.db.delete(bid._id);
      }
      if (await ctx.db.get(args.projectId)) {
        await ctx.db.delete(args.projectId);
      }
    }

    if (args.gigId) {
      const packages = await ctx.db
        .query("gigPackages")
        .withIndex("by_gig", (q) => q.eq("gigId", args.gigId!))
        .collect();
      for (const pkg of packages) {
        await ctx.db.delete(pkg._id);
      }
      const images = await ctx.db
        .query("gigImages")
        .withIndex("by_gig", (q) => q.eq("gigId", args.gigId!))
        .collect();
      for (const image of images) {
        await ctx.db.delete(image._id);
      }
      if (await ctx.db.get(args.gigId)) {
        await ctx.db.delete(args.gigId);
      }
    }

    if (args.quoteRequestId) {
      const quotes = await ctx.db
        .query("quotes")
        .withIndex("by_quoteRequest", (q) =>
          q.eq("quoteRequestId", args.quoteRequestId!)
        )
        .collect();
      for (const quote of quotes) {
        await ctx.db.delete(quote._id);
      }
      const claims = await ctx.db
        .query("leadClaims")
        .withIndex("by_quoteRequest", (q) =>
          q.eq("quoteRequestId", args.quoteRequestId!)
        )
        .collect();
      for (const claim of claims) {
        await ctx.db.delete(claim._id);
      }
      if (await ctx.db.get(args.quoteRequestId)) {
        await ctx.db.delete(args.quoteRequestId);
      }
    }

    if (args.jobId) {
      if (await ctx.db.get(args.jobId)) {
        await ctx.db.delete(args.jobId);
      }
    }

    return { ok: true };
  },
});

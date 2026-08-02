import { v } from "convex/values";
import { mutation, query, MutationCtx } from "../_generated/server";
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
    adminEmail: v.optional(v.string()),
    localClientEmail: v.optional(v.string()),
    companyEmail: v.optional(v.string()),
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

    const client = await ctx.db.get(lookup.clientId);
    const freelancer = await ctx.db.get(lookup.freelancerId);
    if (!client || !freelancer) throw new Error("Smoke test users disappeared during setup.");

    const clientRoles = new Set(client.accountRoles ?? []);
    clientRoles.add("client");
    clientRoles.add("candidate");
    await ctx.db.patch(client._id, {
      accountRoles: [...clientRoles],
      activeRole: client.activeRole ?? "client",
      onboardingVersion: 1,
      preferredWorld: client.preferredWorld ?? "online",
      updatedAt: now,
    });

    const adminUser = args.adminEmail
      ? await ctx.db
          .query("users")
          .withIndex("by_email", (q) => q.eq("email", args.adminEmail!))
          .first()
      : null;
    if (args.adminEmail && !adminUser) {
      throw new Error(`Admin QA user not found for ${args.adminEmail}.`);
    }
    const adminPreviousRole = adminUser?.role;
    if (adminUser) {
      await ctx.db.patch(adminUser._id, { role: "admin", updatedAt: now });
    }

    const localClientUser = args.localClientEmail
      ? await ctx.db
          .query("users")
          .withIndex("by_email", (q) => q.eq("email", args.localClientEmail!))
          .first()
      : null;
    if (args.localClientEmail && !localClientUser) {
      throw new Error(`Local client QA user not found for ${args.localClientEmail}.`);
    }

    const freelancerRoles = new Set(freelancer.accountRoles ?? []);
    if (freelancer._id === client._id) {
      for (const role of clientRoles) freelancerRoles.add(role);
    }
    freelancerRoles.add("freelancer");
    freelancerRoles.add("local_professional");
    await ctx.db.patch(freelancer._id, {
      accountRoles: [...freelancerRoles],
      activeRole: freelancer.activeRole ?? "freelancer",
      onboardingVersion: 1,
      preferredWorld: freelancer.preferredWorld ?? "online",
      updatedAt: now,
    });

    const companyUser = args.companyEmail
      ? await ctx.db
          .query("users")
          .withIndex("by_email", (q) => q.eq("email", args.companyEmail!))
          .first()
      : null;
    if (args.companyEmail && !companyUser) {
      throw new Error(`Company QA user not found for ${args.companyEmail}.`);
    }
    const companyUserId = companyUser?._id ?? lookup.clientId;
    const localClientId = localClientUser?._id ?? companyUserId;

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

    const jobId = await ctx.db.insert("jobs", {
      tenantId: lookup.tenantId,
      clientId: companyUserId,
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

    const jobApplicationId = await ctx.db.insert("jobApplications", {
      tenantId: lookup.tenantId,
      jobId,
      candidateId: lookup.clientId,
      coverLetter: "Smoke test application for validating the candidate and employer pipelines.",
      portfolioUrl: "https://example.com/smoke-portfolio",
      status: "submitted",
      submittedAt: now,
      statusUpdatedAt: now,
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(jobId, { applicationCount: 1, updatedAt: now });

    const withdrawalJobId = await ctx.db.insert("jobs", {
      tenantId: lookup.tenantId,
      clientId: companyUserId,
      title: `Smoke Withdrawal Job ${args.tag}`,
      slug: `smoke-withdrawal-job-${args.tag}`,
      description: "Secondary fixture used to prove that a candidate can withdraw an application.",
      categoryId: lookup.categoryId,
      company: "SkillLinkup QA",
      requiredSkills: ["Communication", "Operations"],
      currency: "EUR",
      jobType: "contract",
      experienceLevel: "mid",
      workType: "remote",
      locationCountry: "Netherlands",
      applicationCount: 1,
      views: 0,
      status: "open",
      locale,
      publishedAt: now,
      expiresAt: now + 30 * 24 * 60 * 60 * 1000,
      createdAt: now,
      updatedAt: now,
    });
    const withdrawalJobApplicationId = await ctx.db.insert("jobApplications", {
      tenantId: lookup.tenantId,
      jobId: withdrawalJobId,
      candidateId: lookup.clientId,
      coverLetter: "Secondary smoke application used only to validate the candidate withdrawal boundary.",
      status: "submitted",
      submittedAt: now,
      statusUpdatedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    const workspaceProjectId = await ctx.db.insert("projects", {
      tenantId: lookup.tenantId,
      clientId: localClientId,
      title: `Smoke Workspace Project ${args.tag}`,
      slug: `smoke-workspace-${args.tag}`,
      description: "Accepted private-beta project used to validate the complete order workspace.",
      categoryId: lookup.categoryId,
      requiredSkills: ["Product design", "Next.js", "Convex"],
      budgetMin: 1800,
      budgetMax: 2200,
      currency: "EUR",
      deadline: now + 21 * 24 * 60 * 60 * 1000,
      workType: "remote",
      bidCount: 1,
      views: 0,
      status: "in_progress",
      selectedFreelancerId: lookup.freelancerProfileId,
      locale,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    const acceptedBidId = await ctx.db.insert("bids", {
      projectId: workspaceProjectId,
      freelancerId: lookup.freelancerProfileId,
      amount: 1950,
      currency: "EUR",
      deliveryDays: 12,
      pitch: "Accepted smoke proposal for the private-beta order workspace.",
      status: "accepted",
      createdAt: now,
      updatedAt: now,
    });

    const orderId = await ctx.db.insert("orders", {
      tenantId: lookup.tenantId,
      orderNumber: `BETA-SMOKE-${args.tag}`,
      orderType: "project",
      clientId: localClientId,
      freelancerId: lookup.freelancerProfileId,
      projectId: workspaceProjectId,
      bidId: acceptedBidId,
      title: `Smoke Workspace Project ${args.tag}`,
      description: "Private-beta order with messaging and a draft deliverable.",
      amount: 1950,
      platformFee: 0,
      freelancerEarnings: 1950,
      currency: "EUR",
      deliveryDeadline: now + 12 * 24 * 60 * 60 * 1000,
      revisionsUsed: 0,
      status: "active",
      escrowStatus: "beta_no_payment",
      createdAt: now,
      updatedAt: now,
    });

    const conversationId = await ctx.db.insert("conversations", {
      tenantId: lookup.tenantId,
      orderId,
      projectId: workspaceProjectId,
      participant1: localClientId,
      participant2: lookup.freelancerId,
      lastMessageAt: now,
      lastMessagePreview: "The private-beta workspace is ready.",
      unreadCount1: 0,
      unreadCount2: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });

    const messageId = await ctx.db.insert("messages", {
      conversationId,
      senderId: lookup.freelancerId,
      content: "The private-beta workspace is ready. I will share the first delivery here.",
      messageType: "text",
      isRead: false,
      createdAt: now,
    });

    const deliverableId = await ctx.db.insert("orderDeliverables", {
      orderId,
      uploadedBy: lookup.freelancerId,
      description: "Initial delivery note for the smoke-test workspace.",
      createdAt: now,
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

    const localQuoteRequestId = await ctx.db.insert("quoteRequests", {
      tenantId: lookup.tenantId,
      clientId: localClientId,
      categoryId: lookup.categoryId,
      title: `Smoke Local Appointment ${args.tag}`,
      description: "Accepted local service request used to validate scheduling, progress and completion.",
      locationCity: "Rotterdam",
      locationPostcode: "3011AA",
      locationCountry: "Netherlands",
      budgetIndication: "EUR250 - EUR500",
      preferredDate: now + 5 * 24 * 60 * 60 * 1000,
      status: "accepted",
      quoteCount: 1,
      maxSlots: 3,
      claimedSlots: 1,
      isExclusive: false,
      createdAt: now,
      updatedAt: now,
    });
    const localLeadClaimId = await ctx.db.insert("leadClaims", {
      quoteRequestId: localQuoteRequestId,
      freelancerId: lookup.freelancerProfileId,
      creditsSpent: 0,
      claimType: "shared",
      claimedAt: now,
    });
    const localQuoteId = await ctx.db.insert("quotes", {
      quoteRequestId: localQuoteRequestId,
      freelancerId: lookup.freelancerProfileId,
      amount: 375,
      currency: "EUR",
      description: "Accepted smoke quote for a trusted local appointment.",
      estimatedDays: 1,
      status: "accepted",
      createdAt: now,
      updatedAt: now,
    });
    const localOrderId = await ctx.db.insert("orders", {
      tenantId: lookup.tenantId,
      orderNumber: `LOCAL-BETA-SMOKE-${args.tag}`,
      orderType: "local_quote",
      clientId: localClientId,
      freelancerId: lookup.freelancerProfileId,
      quoteRequestId: localQuoteRequestId,
      quoteId: localQuoteId,
      title: `Smoke Local Appointment ${args.tag}`,
      description: "Private-beta local appointment without live payment.",
      amount: 375,
      platformFee: 0,
      freelancerEarnings: 375,
      currency: "EUR",
      revisionsUsed: 0,
      status: "active",
      escrowStatus: "beta_no_payment",
      createdAt: now,
      updatedAt: now,
    });
    const localConversationId = await ctx.db.insert("conversations", {
      tenantId: lookup.tenantId,
      orderId: localOrderId,
      participant1: localClientId,
      participant2: lookup.freelancerId,
      unreadCount1: 0,
      unreadCount2: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
    const localAppointmentId = await ctx.db.insert("localAppointments", {
      tenantId: lookup.tenantId,
      quoteRequestId: localQuoteRequestId,
      quoteId: localQuoteId,
      orderId: localOrderId,
      clientId: localClientId,
      professionalId: lookup.freelancerProfileId,
      scheduledStart: now + 5 * 24 * 60 * 60 * 1000,
      timezone: "Europe/Amsterdam",
      locationAddress: "3011AA, Rotterdam, Netherlands",
      status: "requested",
      createdAt: now,
      updatedAt: now,
    });

    const cancellationQuoteRequestId = await ctx.db.insert("quoteRequests", {
      tenantId: lookup.tenantId,
      clientId: localClientId,
      categoryId: lookup.categoryId,
      title: `Smoke Local Cancellation ${args.tag}`,
      description: "Secondary accepted local request used to verify cancellation synchronization.",
      locationCity: "The Hague",
      locationPostcode: "2511AA",
      locationCountry: "Netherlands",
      budgetIndication: "EUR150 - EUR300",
      preferredDate: now + 6 * 24 * 60 * 60 * 1000,
      status: "accepted",
      quoteCount: 1,
      maxSlots: 3,
      claimedSlots: 1,
      isExclusive: false,
      createdAt: now,
      updatedAt: now,
    });
    const cancellationQuoteId = await ctx.db.insert("quotes", {
      quoteRequestId: cancellationQuoteRequestId,
      freelancerId: lookup.freelancerProfileId,
      amount: 225,
      currency: "EUR",
      description: "Accepted secondary quote for cancellation-state acceptance.",
      estimatedDays: 1,
      status: "accepted",
      createdAt: now,
      updatedAt: now,
    });
    const cancellationOrderId = await ctx.db.insert("orders", {
      tenantId: lookup.tenantId,
      orderNumber: `LOCAL-CANCEL-SMOKE-${args.tag}`,
      orderType: "local_quote",
      clientId: localClientId,
      freelancerId: lookup.freelancerProfileId,
      quoteRequestId: cancellationQuoteRequestId,
      quoteId: cancellationQuoteId,
      title: `Smoke Local Cancellation ${args.tag}`,
      amount: 225,
      platformFee: 0,
      freelancerEarnings: 225,
      currency: "EUR",
      revisionsUsed: 0,
      status: "active",
      escrowStatus: "beta_no_payment",
      createdAt: now,
      updatedAt: now,
    });
    const cancellationAppointmentId = await ctx.db.insert("localAppointments", {
      tenantId: lookup.tenantId,
      quoteRequestId: cancellationQuoteRequestId,
      quoteId: cancellationQuoteId,
      orderId: cancellationOrderId,
      clientId: localClientId,
      professionalId: lookup.freelancerProfileId,
      scheduledStart: now + 6 * 24 * 60 * 60 * 1000,
      timezone: "Europe/Amsterdam",
      locationAddress: "2511AA, The Hague, Netherlands",
      status: "requested",
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
        jobApplicationId,
        withdrawalJobId,
        withdrawalJobApplicationId,
        companyUserId,
        localClientId,
        workspaceProjectId,
        acceptedBidId,
        orderId,
        conversationId,
        messageId,
        deliverableId,
        localQuoteRequestId,
        localLeadClaimId,
        localQuoteId,
        localOrderId,
        localConversationId,
        localAppointmentId,
        cancellationQuoteRequestId,
        cancellationQuoteId,
        cancellationOrderId,
        cancellationAppointmentId,
        adminUserId: adminUser?._id,
        adminPreviousRole,
        qaUserId: lookup.clientId,
      },
      routes: {
        service: `/online/service/${serviceSlug}`,
        project: `/online/project/${projectSlug}`,
        quoteRequest: `/local/quote-request/${quoteRequestId}`,
        job: `/jobs/job/${jobSlug}`,
        candidateApplications: "/dashboard/applications",
        employerApplications: `/manage-jobs/${jobId}/applications`,
        order: `/orders/${orderId}`,
        localOrder: `/orders/${localOrderId}`,
      },
    };
  },
});

/**
 * Seed StayCool Airconditioning content (gigs, projects, portfolio).
 * Works with existing profile or creates new one.
 */
export const seedStaycool = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) throw new Error("No tenant found");
    const tenantId = tenant._id;

    // Find existing profile or create new
    const existing = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_slug", (q) => q.eq("slug", "staycool-airconditioning"))
      .first();

    let userId: any;
    let profileId: any;

    if (existing) {
      profileId = existing._id;
      userId = existing.userId;

      // Update profile with richer data
      await ctx.db.patch(existing._id, {
        tagline: "Professionele airconditioning installatie & onderhoud",
        bio: "StayCool Airconditioning is uw specialist voor airconditioning in de Randstad. Met meer dan 10 jaar ervaring leveren wij hoogwaardige aircosystemen voor woningen en bedrijfspanden. Van advies tot installatie en jaarlijks onderhoud — wij zorgen voor een aangenaam binnenklimaat het hele jaar door. Wij werken uitsluitend met A-merken zoals Daikin, Mitsubishi en Samsung, en bieden garantie op al onze installaties.",
        workType: "local",
        serviceRadiusKm: 50,
        skills: ["Airconditioning", "HVAC", "Klimaatbeheersing", "Split-unit installatie", "Warmtepomp", "Onderhoud", "Daikin", "Mitsubishi", "Samsung"],
        isVerified: true,
        verificationDate: now,
        level: "pro",
        ratingAverage: 4.8,
        ratingCount: 23,
        totalOrders: 47,
        completionRate: 98,
        responseTimeHours: 2,
        updatedAt: now,
      });
    } else {
      // Create user + profile
      userId = await ctx.db.insert("users", {
        name: "StayCool Airconditioning",
        email: "info@staycool-airco.nl",
        role: "freelancer",
        tenantId,
        createdAt: now,
        updatedAt: now,
      });

      profileId = await ctx.db.insert("freelancerProfiles", {
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
    }

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
    jobApplicationId: v.optional(v.id("jobApplications")),
    withdrawalJobId: v.optional(v.id("jobs")),
    withdrawalJobApplicationId: v.optional(v.id("jobApplications")),
    companyUserId: v.optional(v.id("users")),
    localClientId: v.optional(v.id("users")),
    workspaceProjectId: v.optional(v.id("projects")),
    acceptedBidId: v.optional(v.id("bids")),
    orderId: v.optional(v.id("orders")),
    localOrderId: v.optional(v.id("orders")),
    conversationId: v.optional(v.id("conversations")),
    messageId: v.optional(v.id("messages")),
    deliverableId: v.optional(v.id("orderDeliverables")),
    localQuoteRequestId: v.optional(v.id("quoteRequests")),
    localLeadClaimId: v.optional(v.id("leadClaims")),
    localQuoteId: v.optional(v.id("quotes")),
    localConversationId: v.optional(v.id("conversations")),
    localAppointmentId: v.optional(v.id("localAppointments")),
    cancellationQuoteRequestId: v.optional(v.id("quoteRequests")),
    cancellationQuoteId: v.optional(v.id("quotes")),
    cancellationOrderId: v.optional(v.id("orders")),
    cancellationAppointmentId: v.optional(v.id("localAppointments")),
    adminUserId: v.optional(v.id("users")),
    adminPreviousRole: v.optional(v.string()),
    qaUserId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);

    if (args.localAppointmentId || args.cancellationAppointmentId) {
      const notificationUsers = [args.qaUserId, args.localClientId].filter(
        (id): id is Id<"users"> => id !== undefined
      );
      for (const userId of notificationUsers) {
        const notifications = await ctx.db
          .query("notifications")
          .withIndex("by_user", (q) => q.eq("userId", userId))
          .order("desc")
          .take(100);
        for (const notification of notifications) {
          const metadata = notification.metadata as { appointmentId?: string } | undefined;
          if (
            metadata?.appointmentId === args.localAppointmentId
            || metadata?.appointmentId === args.cancellationAppointmentId
          ) {
            await ctx.db.delete(notification._id);
          }
        }
      }
    }

    if (args.jobId || args.withdrawalJobId) {
      for (const userId of [args.qaUserId, args.companyUserId].filter(
        (id): id is Id<"users"> => id !== undefined
      )) {
        const notifications = await ctx.db
          .query("notifications")
          .withIndex("by_user", (q) => q.eq("userId", userId))
          .order("desc")
          .take(100);
        for (const notification of notifications) {
          const metadata = notification.metadata as { jobId?: string; applicationId?: string } | undefined;
          if (
            metadata?.jobId === args.jobId
            || metadata?.jobId === args.withdrawalJobId
            || metadata?.applicationId === args.jobApplicationId
            || metadata?.applicationId === args.withdrawalJobApplicationId
          ) {
            await ctx.db.delete(notification._id);
          }
        }
      }
    }

    if (args.adminUserId) {
      const adminUser = await ctx.db.get(args.adminUserId);
      if (adminUser?.email.startsWith("skilllinkup.qa+admin")) {
        await ctx.db.patch(adminUser._id, {
          role: args.adminPreviousRole ?? "author",
          updatedAt: Date.now(),
        });
      }
    }

    if (args.qaUserId) {
      const qaUser = await ctx.db.get(args.qaUserId);
      if (qaUser?.email.startsWith("skilllinkup.qa+clerk_test")) {
        const qaJobs = await ctx.db
          .query("jobs")
          .withIndex("by_client", (q) => q.eq("clientId", qaUser._id))
          .take(200);
        for (const job of qaJobs) {
          if (job.title.startsWith("Playwright Product Designer")) {
            const applications = await ctx.db
              .query("jobApplications")
              .withIndex("by_job", (q) => q.eq("jobId", job._id))
              .take(100);
            for (const application of applications) await ctx.db.delete(application._id);
            await ctx.db.delete(job._id);
          }
        }

        const qaProjects = await ctx.db
          .query("projects")
          .withIndex("by_client", (q) => q.eq("clientId", qaUser._id))
          .take(200);
        for (const project of qaProjects) {
          if (project.title.startsWith("Playwright CRUD Project")) {
            const bids = await ctx.db
              .query("bids")
              .withIndex("by_project", (q) => q.eq("projectId", project._id))
              .take(100);
            for (const bid of bids) await ctx.db.delete(bid._id);
            await ctx.db.delete(project._id);
          }
        }
      }
    }

    if (args.localAppointmentId && (await ctx.db.get(args.localAppointmentId))) await ctx.db.delete(args.localAppointmentId);
    if (args.cancellationAppointmentId && (await ctx.db.get(args.cancellationAppointmentId))) await ctx.db.delete(args.cancellationAppointmentId);
    if (args.cancellationOrderId && (await ctx.db.get(args.cancellationOrderId))) await ctx.db.delete(args.cancellationOrderId);
    if (args.cancellationQuoteId && (await ctx.db.get(args.cancellationQuoteId))) await ctx.db.delete(args.cancellationQuoteId);
    if (args.cancellationQuoteRequestId && (await ctx.db.get(args.cancellationQuoteRequestId))) await ctx.db.delete(args.cancellationQuoteRequestId);
    if (args.localConversationId && (await ctx.db.get(args.localConversationId))) await ctx.db.delete(args.localConversationId);
    if (args.localOrderId && (await ctx.db.get(args.localOrderId))) await ctx.db.delete(args.localOrderId);
    if (args.localQuoteId && (await ctx.db.get(args.localQuoteId))) await ctx.db.delete(args.localQuoteId);
    if (args.localLeadClaimId && (await ctx.db.get(args.localLeadClaimId))) await ctx.db.delete(args.localLeadClaimId);
    if (args.localQuoteRequestId && (await ctx.db.get(args.localQuoteRequestId))) await ctx.db.delete(args.localQuoteRequestId);

    for (const lifecycleOrderId of [args.orderId, args.localOrderId].filter(
      (id): id is Id<"orders"> => id !== undefined
    )) {
      const reviews = await ctx.db
        .query("marketplaceReviews")
        .withIndex("by_order", (q) => q.eq("orderId", lifecycleOrderId))
        .take(20);
      for (const review of reviews) await ctx.db.delete(review._id);

      for (const userId of [args.qaUserId, args.localClientId].filter(
        (id): id is Id<"users"> => id !== undefined
      )) {
        const notifications = await ctx.db
          .query("notifications")
          .withIndex("by_user", (q) => q.eq("userId", userId))
          .order("desc")
          .take(100);
        for (const notification of notifications) {
          const metadata = notification.metadata as { orderId?: string } | undefined;
          if (metadata?.orderId === lifecycleOrderId) await ctx.db.delete(notification._id);
        }
      }
    }

    if (args.orderId) {
      const deliverables = await ctx.db
        .query("orderDeliverables")
        .withIndex("by_order", (q) => q.eq("orderId", args.orderId!))
        .take(100);
      for (const deliverable of deliverables) await ctx.db.delete(deliverable._id);
    } else if (args.deliverableId && (await ctx.db.get(args.deliverableId))) {
      await ctx.db.delete(args.deliverableId);
    }
    if (args.conversationId) {
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId!))
        .take(100);
      for (const message of messages) await ctx.db.delete(message._id);
    } else if (args.messageId && (await ctx.db.get(args.messageId))) {
      await ctx.db.delete(args.messageId);
    }
    if (args.conversationId && (await ctx.db.get(args.conversationId))) {
      await ctx.db.delete(args.conversationId);
    }
    if (args.orderId && (await ctx.db.get(args.orderId))) {
      await ctx.db.delete(args.orderId);
    }
    if (args.acceptedBidId && (await ctx.db.get(args.acceptedBidId))) {
      await ctx.db.delete(args.acceptedBidId);
    }
    if (args.workspaceProjectId && (await ctx.db.get(args.workspaceProjectId))) {
      await ctx.db.delete(args.workspaceProjectId);
    }
    if (args.jobApplicationId && (await ctx.db.get(args.jobApplicationId))) {
      await ctx.db.delete(args.jobApplicationId);
    }
    if (args.withdrawalJobApplicationId && (await ctx.db.get(args.withdrawalJobApplicationId))) {
      await ctx.db.delete(args.withdrawalJobApplicationId);
    }

    if (args.projectId) {
      const bids = await ctx.db
        .query("bids")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId!))
        .take(500);
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
        .take(50);
      for (const pkg of packages) {
        await ctx.db.delete(pkg._id);
      }
      const images = await ctx.db
        .query("gigImages")
        .withIndex("by_gig", (q) => q.eq("gigId", args.gigId!))
        .take(100);
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
        .take(100);
      for (const quote of quotes) {
        await ctx.db.delete(quote._id);
      }
      const claims = await ctx.db
        .query("leadClaims")
        .withIndex("by_quoteRequest", (q) =>
          q.eq("quoteRequestId", args.quoteRequestId!)
        )
        .take(20);
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
    if (args.withdrawalJobId && (await ctx.db.get(args.withdrawalJobId))) {
      await ctx.db.delete(args.withdrawalJobId);
    }
    if (args.companyUserId) {
      const companyUser = await ctx.db.get(args.companyUserId);
      if (companyUser?.email.startsWith("smoke-company-")) {
        await ctx.db.delete(companyUser._id);
      }
    }

    return { ok: true };
  },
});

export const verifyCleanup = query({
  args: {
    serverSecret: v.string(),
    fixtureIds: v.array(v.string()),
    orderId: v.optional(v.id("orders")),
    localOrderId: v.optional(v.id("orders")),
    conversationId: v.optional(v.id("conversations")),
    localAppointmentId: v.optional(v.id("localAppointments")),
    cancellationAppointmentId: v.optional(v.id("localAppointments")),
    localClientId: v.optional(v.id("users")),
    companyUserId: v.optional(v.id("users")),
    jobId: v.optional(v.id("jobs")),
    jobApplicationId: v.optional(v.id("jobApplications")),
    withdrawalJobId: v.optional(v.id("jobs")),
    withdrawalJobApplicationId: v.optional(v.id("jobApplications")),
    adminUserId: v.optional(v.id("users")),
    qaUserId: v.optional(v.id("users")),
  },
  returns: v.object({
    ok: v.boolean(),
    remainingFixtures: v.number(),
    remainingMessages: v.number(),
    remainingDeliverables: v.number(),
    remainingReviews: v.number(),
    remainingLifecycleNotifications: v.number(),
    generatedJobs: v.number(),
    generatedProjects: v.number(),
    adminRole: v.union(v.string(), v.null()),
  }),
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    let remainingFixtures = 0;
    for (const rawId of args.fixtureIds) {
      const normalized = ctx.db.normalizeId("gigs", rawId)
        ?? ctx.db.normalizeId("gigPackages", rawId)
        ?? ctx.db.normalizeId("projects", rawId)
        ?? ctx.db.normalizeId("quoteRequests", rawId)
        ?? ctx.db.normalizeId("jobs", rawId)
        ?? ctx.db.normalizeId("jobApplications", rawId)
        ?? ctx.db.normalizeId("bids", rawId)
        ?? ctx.db.normalizeId("orders", rawId)
        ?? ctx.db.normalizeId("conversations", rawId)
        ?? ctx.db.normalizeId("messages", rawId)
        ?? ctx.db.normalizeId("orderDeliverables", rawId)
        ?? ctx.db.normalizeId("leadClaims", rawId)
        ?? ctx.db.normalizeId("quotes", rawId)
        ?? ctx.db.normalizeId("localAppointments", rawId)
        ?? ctx.db.normalizeId("users", rawId);
      if (normalized && (await ctx.db.get(normalized))) remainingFixtures += 1;
    }

    const remainingMessages = args.conversationId
      ? (await ctx.db
          .query("messages")
          .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId!))
          .take(100)).length
      : 0;
    const remainingDeliverables = args.orderId
      ? (await ctx.db
          .query("orderDeliverables")
          .withIndex("by_order", (q) => q.eq("orderId", args.orderId!))
          .take(100)).length
      : 0;
    let remainingReviews = 0;
    for (const lifecycleOrderId of [args.orderId, args.localOrderId].filter(
      (id): id is Id<"orders"> => id !== undefined
    )) {
      remainingReviews += (await ctx.db
        .query("marketplaceReviews")
        .withIndex("by_order", (q) => q.eq("orderId", lifecycleOrderId))
        .take(20)).length;
    }

    let remainingLifecycleNotifications = 0;
    for (const userId of [args.qaUserId, args.localClientId, args.companyUserId].filter(
      (id): id is Id<"users"> => id !== undefined
    )) {
      const notifications = await ctx.db
        .query("notifications")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .order("desc")
        .take(100);
      remainingLifecycleNotifications += notifications.filter((notification) => {
        const metadata = notification.metadata as {
          appointmentId?: string;
          orderId?: string;
          jobId?: string;
          applicationId?: string;
        } | undefined;
        return metadata?.appointmentId === args.localAppointmentId
          || metadata?.appointmentId === args.cancellationAppointmentId
          || metadata?.orderId === args.orderId
          || metadata?.orderId === args.localOrderId
          || metadata?.jobId === args.jobId
          || metadata?.jobId === args.withdrawalJobId
          || metadata?.applicationId === args.jobApplicationId
          || metadata?.applicationId === args.withdrawalJobApplicationId;
      }).length;
    }

    const qaUser = args.qaUserId ? await ctx.db.get(args.qaUserId) : null;
    const qaJobs = qaUser
      ? await ctx.db.query("jobs").withIndex("by_client", (q) => q.eq("clientId", qaUser._id)).take(200)
      : [];
    const qaProjects = qaUser
      ? await ctx.db.query("projects").withIndex("by_client", (q) => q.eq("clientId", qaUser._id)).take(200)
      : [];
    const generatedJobs = qaJobs.filter((job) => job.title.startsWith("Playwright Product Designer")).length;
    const generatedProjects = qaProjects.filter((project) => project.title.startsWith("Playwright CRUD Project")).length;
    const admin = args.adminUserId ? await ctx.db.get(args.adminUserId) : null;
    const adminRole = admin?.role ?? null;
    const ok =
      remainingFixtures === 0 &&
      remainingMessages === 0 &&
      remainingDeliverables === 0 &&
      remainingReviews === 0 &&
      remainingLifecycleNotifications === 0 &&
      generatedJobs === 0 &&
      generatedProjects === 0 &&
      adminRole !== "admin";
    return {
      ok,
      remainingFixtures,
      remainingMessages,
      remainingDeliverables,
      remainingReviews,
      remainingLifecycleNotifications,
      generatedJobs,
      generatedProjects,
      adminRole,
    };
  },
});

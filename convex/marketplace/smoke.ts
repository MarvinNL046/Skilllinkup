import type { MutationCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";
type SeedLookup = {
  tenantId: Id<"tenants">;
  categoryId: Id<"marketplaceCategories">;
  clientId: Id<"users">;
  freelancerId: Id<"users">;
  freelancerProfileId: Id<"freelancerProfiles">;
  localProfessionalId: Id<"users">;
  localProfessionalProfileId: Id<"freelancerProfiles">;
  candidateId: Id<"users">;
};
// Reconciled with the existing development deployment (2026-09-07).
import { query } from "../_generated/server";
import { mutation, internalMutation } from "../_generated/server";
import { requireServerSecret } from "../lib/authHelpers";
import { companyVerificationStatusValidator } from "../lib/marketplaceState";
import { hasCompletedMarketplaceContext } from "../lib/marketplaceState";
import { v } from "convex/values";
var ne = v.object({
  tag: v.string(),
  locale: v.string(),
  ids: v.object({
    gigId: v.id("gigs"),
    gigPackageId: v.id("gigPackages"),
    projectId: v.id("projects"),
    bidId: v.id("bids"),
    quoteRequestId: v.id("quoteRequests"),
    jobId: v.id("jobs"),
    jobApplicationId: v.id("jobApplications"),
    withdrawalJobId: v.id("jobs"),
    withdrawalJobApplicationId: v.id("jobApplications"),
    companyUserId: v.id("users"),
    companyPreviousVerificationStatus: v.optional(companyVerificationStatusValidator),
    companyPreviousName: v.optional(v.string()),
    localClientId: v.id("users"),
    workspaceProjectId: v.id("projects"),
    acceptedBidId: v.id("bids"),
    orderId: v.id("orders"),
    conversationId: v.id("conversations"),
    messageId: v.id("messages"),
    deliverableId: v.id("orderDeliverables"),
    localQuoteRequestId: v.id("quoteRequests"),
    localLeadClaimId: v.id("leadClaims"),
    localQuoteId: v.id("quotes"),
    localOrderId: v.id("orders"),
    localConversationId: v.id("conversations"),
    localAppointmentId: v.id("localAppointments"),
    cancellationQuoteRequestId: v.id("quoteRequests"),
    cancellationQuoteId: v.id("quotes"),
    cancellationOrderId: v.id("orders"),
    cancellationAppointmentId: v.id("localAppointments"),
    adminUserId: v.optional(v.id("users")),
    adminPreviousRole: v.optional(v.string()),
    onlineClientId: v.id("users"),
    onlineFreelancerUserId: v.id("users"),
    localProfessionalUserId: v.id("users"),
    candidateUserId: v.id("users")
  }),
  routes: v.object({
    service: v.string(),
    project: v.string(),
    quoteRequest: v.string(),
    job: v.string(),
    candidateApplications: v.string(),
    employerApplications: v.string(),
    order: v.string(),
    localOrder: v.string()
  })
});
function isDedicatedQaEmail(email: string) {
  return /^skilllinkup\.qa\+(?:clerk_test|client_clerk_test|admin_clerk_test|freelancer_clerk_test|local-professional_clerk_test|candidate_clerk_test|outsider_clerk_test|local-client_clerk_test|company_clerk_test)@skilllinkup\.com$/i.test(email);
}
function assertCompletedContext(i, e, c) {
  if (!(i.accountRoles ?? []).includes(e) || !hasCompletedMarketplaceContext(i, e, c)) throw new Error(`${i.email} has not completed the required ${e}:${c} QA context.`);
}
async function getSeedLookup(ctx: MutationCtx, {
  clientEmail: e,
  freelancerEmail: c,
  localProfessionalEmail: p,
  candidateEmail: o,
  categorySlug: a,
  locale: n
}: {
  clientEmail: string;
  freelancerEmail: string;
  localProfessionalEmail: string;
  candidateEmail: string;
  categorySlug: string;
  locale: string;
}): Promise<SeedLookup> {
  let l = await ctx.db.query("tenants").first();
  if (!l) throw new Error("No tenant found.");
  let u = await ctx.db.query("users").withIndex("by_email", r => r.eq("email", e)).first();
  if (!u) throw new Error(`Client user not found for ${e}.`);
  let s = await ctx.db.query("users").withIndex("by_email", r => r.eq("email", c)).first();
  if (!s) throw new Error(`Freelancer user not found for ${c}.`);
  let m = await ctx.db.query("freelancerProfiles").withIndex("by_userId_and_providerRole", r => r.eq("userId", s._id).eq("providerRole", "freelancer")).first();
  if (!m) throw new Error(`Freelancer profile not found for ${c}.`);
  let I = await ctx.db.query("users").withIndex("by_email", r => r.eq("email", p)).first();
  if (!I) throw new Error(`Local professional user not found for ${p}.`);
  let w = await ctx.db.query("freelancerProfiles").withIndex("by_userId_and_providerRole", r => r.eq("userId", I._id).eq("providerRole", "local_professional")).first();
  if (!w) throw new Error(`Local professional profile not found for ${p}.`);
  let g = await ctx.db.query("users").withIndex("by_email", r => r.eq("email", o)).first();
  if (!g) throw new Error(`Candidate user not found for ${o}.`);
  let d = await ctx.db.query("marketplaceCategories").withIndex("by_slug_locale", r => r.eq("slug", a).eq("locale", n)).first();
  if (!d) throw new Error(`Category not found for slug ${a}.`);
  return {
    tenantId: l._id,
    categoryId: d._id,
    clientId: u._id,
    freelancerId: s._id,
    freelancerProfileId: m._id,
    localProfessionalId: I._id,
    localProfessionalProfileId: w._id,
    candidateId: g._id
  };
}
var seed = mutation({
    args: {
      serverSecret: v.string(),
      tag: v.string(),
      clientEmail: v.string(),
      freelancerEmail: v.string(),
      localProfessionalEmail: v.string(),
      candidateEmail: v.string(),
      adminEmail: v.string(),
      localClientEmail: v.string(),
      companyEmail: v.string(),
      categorySlug: v.optional(v.string()),
      locale: v.optional(v.string())
    },
    returns: ne,
    handler: async (ctx, args) => {
      requireServerSecret(args.serverSecret);
      let c = args.locale ?? "en",
        p = args.categorySlug ?? "finance-accounting",
        o = Date.now(),
        a = await getSeedLookup(ctx, {
          clientEmail: args.clientEmail,
          freelancerEmail: args.freelancerEmail,
          localProfessionalEmail: args.localProfessionalEmail,
          candidateEmail: args.candidateEmail,
          categorySlug: p,
          locale: c
        }),
        n = `smoke-service-${args.tag}`,
        l = `smoke-project-${args.tag}`,
        u = `smoke-job-${args.tag}`,
        s = `Smoke Test Quote Request ${args.tag}`,
        m = await ctx.db.get(a.clientId),
        I = await ctx.db.get(a.freelancerId);
      if (!m || !I) throw new Error("Smoke test users disappeared during setup.");
      let w = await ctx.db.get(a.localProfessionalId),
        g = await ctx.db.get(a.candidateId);
      if (!w || !g) throw new Error("Dedicated smoke actors disappeared during setup.");
      assertCompletedContext(m, "client", "online"), assertCompletedContext(I, "freelancer", "online"), assertCompletedContext(w, "local_professional", "local"), assertCompletedContext(g, "candidate", "jobs");
      let d = await ctx.db.query("users").withIndex("by_email", C => C.eq("email", args.adminEmail)).first();
      if (!d) throw new Error(`Admin QA user not found for ${args.adminEmail}.`);
      let r = d?.role;
      await ctx.db.patch(d._id, {
        role: "admin",
        updatedAt: o
      });
      let f = await ctx.db.query("users").withIndex("by_email", C => C.eq("email", args.localClientEmail)).first();
      if (!f) throw new Error(`Local client QA user not found for ${args.localClientEmail}.`);
      assertCompletedContext(f, "client", "local");
      let b = await ctx.db.query("users").withIndex("by_email", C => C.eq("email", args.companyEmail)).first();
      if (!b) throw new Error(`Company QA user not found for ${args.companyEmail}.`);
      assertCompletedContext(b, "company", "jobs");
      let y = [a.clientId, a.freelancerId, a.localProfessionalId, a.candidateId, f._id, b._id, d._id];
      if (new Set(y).size !== y.length) throw new Error("Smoke actors must use distinct QA identities.");
      let P = b._id,
        $ = b,
        Z = $.companyVerificationStatus,
        G = $.companyName;
      await ctx.db.patch(P, {
        companyName: $.companyName ?? "SkillLinkup QA",
        companyVerificationStatus: "verified",
        updatedAt: o
      });
      let v = f._id,
        Q = await ctx.db.insert("gigs", {
          tenantId: a.tenantId,
          freelancerId: a.freelancerProfileId,
          title: `Smoke Test Service ${args.tag}`,
          slug: n,
          description: "End-to-end service detail smoke test record.",
          categoryId: a.categoryId,
          tags: ["smoke", "qa", "e2e"],
          workType: "remote",
          locationCity: "Amsterdam",
          locationCountry: "Netherlands",
          serviceRadiusKm: 25,
          views: 0,
          orderCount: 0,
          ratingAverage: 0,
          ratingCount: 0,
          isFeatured: !1,
          status: "active",
          locale: c,
          publishedAt: o,
          createdAt: o,
          updatedAt: o
        }),
        X = await ctx.db.insert("gigPackages", {
          gigId: Q,
          tier: "Basic",
          title: "Smoke Test Package",
          description: "A minimal package for service detail smoke testing.",
          price: 149,
          currency: "EUR",
          deliveryDays: 5,
          revisionCount: 2,
          features: ["Kickoff call", "Implementation", "Handover"],
          createdAt: o,
          updatedAt: o
        }),
        z = await ctx.db.insert("projects", {
          tenantId: a.tenantId,
          clientId: a.clientId,
          title: `Smoke Test Project ${args.tag}`,
          slug: l,
          description: "Project detail smoke test record with a real bid path.",
          categoryId: a.categoryId,
          requiredSkills: ["React", "Next.js", "Convex"],
          budgetMin: 1200,
          budgetMax: 1800,
          currency: "EUR",
          deadline: o + 336 * 60 * 60 * 1e3,
          workType: "remote",
          bidCount: 1,
          views: 0,
          status: "open",
          locale: c,
          publishedAt: o,
          createdAt: o,
          updatedAt: o
        }),
        _ = await ctx.db.insert("jobs", {
          tenantId: a.tenantId,
          clientId: P,
          title: `Smoke Test Job ${args.tag}`,
          slug: u,
          description: "Job detail smoke test record for browser validation.",
          categoryId: a.categoryId,
          company: "SkillLinkup QA",
          requiredSkills: ["React", "TypeScript"],
          salaryMin: 65e3,
          salaryMax: 85e3,
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
          locale: c,
          publishedAt: o,
          expiresAt: o + 720 * 60 * 60 * 1e3,
          createdAt: o,
          updatedAt: o
        }),
        Y = await ctx.db.insert("jobApplications", {
          tenantId: a.tenantId,
          jobId: _,
          candidateId: a.candidateId,
          coverLetter: "Smoke test application for validating the candidate and employer pipelines.",
          portfolioUrl: "https://example.com/smoke-portfolio",
          status: "submitted",
          submittedAt: o,
          statusUpdatedAt: o,
          createdAt: o,
          updatedAt: o
        });
      await ctx.db.patch(_, {
        applicationCount: 1,
        updatedAt: o
      });
      let N = await ctx.db.insert("jobs", {
          tenantId: a.tenantId,
          clientId: P,
          title: `Smoke Withdrawal Job ${args.tag}`,
          slug: `smoke-withdrawal-job-${args.tag}`,
          description: "Secondary fixture used to prove that a candidate can withdraw an application.",
          categoryId: a.categoryId,
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
          locale: c,
          publishedAt: o,
          expiresAt: o + 720 * 60 * 60 * 1e3,
          createdAt: o,
          updatedAt: o
        }),
        x = await ctx.db.insert("jobApplications", {
          tenantId: a.tenantId,
          jobId: N,
          candidateId: a.candidateId,
          coverLetter: "Secondary smoke application used only to validate the candidate withdrawal boundary.",
          status: "submitted",
          submittedAt: o,
          statusUpdatedAt: o,
          createdAt: o,
          updatedAt: o
        }),
        R = await ctx.db.insert("projects", {
          tenantId: a.tenantId,
          clientId: a.clientId,
          title: `Smoke Workspace Project ${args.tag}`,
          slug: `smoke-workspace-${args.tag}`,
          description: "Accepted private-beta project used to validate the complete order workspace.",
          categoryId: a.categoryId,
          requiredSkills: ["Product design", "Next.js", "Convex"],
          budgetMin: 1800,
          budgetMax: 2200,
          currency: "EUR",
          deadline: o + 504 * 60 * 60 * 1e3,
          workType: "remote",
          bidCount: 1,
          views: 0,
          status: "in_progress",
          selectedFreelancerId: a.freelancerProfileId,
          locale: c,
          publishedAt: o,
          createdAt: o,
          updatedAt: o
        }),
        T = await ctx.db.insert("bids", {
          projectId: R,
          freelancerId: a.freelancerProfileId,
          amount: 1950,
          currency: "EUR",
          deliveryDays: 12,
          pitch: "Accepted smoke proposal for the private-beta order workspace.",
          status: "accepted",
          createdAt: o,
          updatedAt: o
        }),
        q = await ctx.db.insert("orders", {
          tenantId: a.tenantId,
          orderNumber: `BETA-SMOKE-${args.tag}`,
          orderType: "project",
          clientId: a.clientId,
          freelancerId: a.freelancerProfileId,
          projectId: R,
          bidId: T,
          title: `Smoke Workspace Project ${args.tag}`,
          description: "Private-beta order with messaging and a draft deliverable.",
          amount: 1950,
          platformFee: 0,
          freelancerEarnings: 1950,
          currency: "EUR",
          deliveryDeadline: o + 288 * 60 * 60 * 1e3,
          revisionsUsed: 0,
          status: "active",
          escrowStatus: "beta_no_payment",
          createdAt: o,
          updatedAt: o
        }),
        J = await ctx.db.insert("conversations", {
          tenantId: a.tenantId,
          contextType: "order",
          contextTitle: `Smoke Workspace Project ${args.tag}`,
          contextHref: `/orders/${q}`,
          orderId: q,
          projectId: R,
          bidId: T,
          freelancerProfileId: a.freelancerProfileId,
          participant1: a.clientId,
          participant2: a.freelancerId,
          lastMessageAt: o,
          lastMessagePreview: "The private-beta workspace is ready.",
          unreadCount1: 0,
          unreadCount2: 0,
          status: "active",
          createdAt: o,
          updatedAt: o
        }),
        ee = await ctx.db.insert("messages", {
          conversationId: J,
          senderId: a.freelancerId,
          content: "The private-beta workspace is ready. I will share the first delivery here.",
          messageType: "text",
          isRead: !1,
          createdAt: o
        }),
        te = await ctx.db.insert("orderDeliverables", {
          orderId: q,
          uploadedBy: a.freelancerId,
          description: "Initial delivery note for the smoke-test workspace.",
          createdAt: o
        }),
        ie = await ctx.db.insert("bids", {
          projectId: z,
          freelancerId: a.freelancerProfileId,
          amount: 1550,
          currency: "EUR",
          deliveryDays: 10,
          pitch: "I can deliver this within ten days with a clean handoff.",
          status: "pending",
          createdAt: o,
          updatedAt: o
        }),
        W = await ctx.db.insert("quoteRequests", {
          tenantId: a.tenantId,
          clientId: v,
          categoryId: a.categoryId,
          title: s,
          description: "Need help validating the quote request detail page with enough body text to test the preview and full-description paths.",
          locationCity: "Rotterdam",
          locationPostcode: "3011AA",
          locationCountry: "Netherlands",
          budgetIndication: "EUR500 - EUR1,000",
          preferredDate: o + 10080 * 60 * 1e3,
          status: "open",
          quoteCount: 0,
          maxSlots: 3,
          claimedSlots: 0,
          isExclusive: !1,
          createdAt: o,
          updatedAt: o
        }),
        k = await ctx.db.insert("quoteRequests", {
          tenantId: a.tenantId,
          clientId: v,
          categoryId: a.categoryId,
          title: `Smoke Local Appointment ${args.tag}`,
          description: "Accepted local service request used to validate scheduling, progress and completion.",
          locationCity: "Rotterdam",
          locationPostcode: "3011AA",
          locationCountry: "Netherlands",
          budgetIndication: "EUR250 - EUR500",
          preferredDate: o + 7200 * 60 * 1e3,
          status: "accepted",
          quoteCount: 1,
          maxSlots: 3,
          claimedSlots: 1,
          isExclusive: !1,
          createdAt: o,
          updatedAt: o
        }),
        oe = await ctx.db.insert("leadClaims", {
          quoteRequestId: k,
          freelancerId: a.localProfessionalProfileId,
          creditsSpent: 0,
          claimType: "shared",
          claimedAt: o
        }),
        S = await ctx.db.insert("quotes", {
          quoteRequestId: k,
          freelancerId: a.localProfessionalProfileId,
          amount: 375,
          currency: "EUR",
          description: "Accepted smoke quote for a trusted local appointment.",
          estimatedDays: 1,
          status: "accepted",
          createdAt: o,
          updatedAt: o
        }),
        j = await ctx.db.insert("orders", {
          tenantId: a.tenantId,
          orderNumber: `LOCAL-BETA-SMOKE-${args.tag}`,
          orderType: "local_quote",
          clientId: v,
          freelancerId: a.localProfessionalProfileId,
          quoteRequestId: k,
          quoteId: S,
          title: `Smoke Local Appointment ${args.tag}`,
          description: "Private-beta local appointment without live payment.",
          amount: 375,
          platformFee: 0,
          freelancerEarnings: 375,
          currency: "EUR",
          revisionsUsed: 0,
          status: "active",
          escrowStatus: "beta_no_payment",
          createdAt: o,
          updatedAt: o
        }),
        F = await ctx.db.insert("conversations", {
          tenantId: a.tenantId,
          contextType: "local_appointment",
          contextTitle: `Smoke Local Appointment ${args.tag}`,
          contextHref: `/orders/${j}`,
          orderId: j,
          freelancerProfileId: a.localProfessionalProfileId,
          quoteId: S,
          participant1: v,
          participant2: a.localProfessionalId,
          unreadCount1: 0,
          unreadCount2: 0,
          status: "active",
          createdAt: o,
          updatedAt: o
        }),
        V = await ctx.db.insert("localAppointments", {
          tenantId: a.tenantId,
          quoteRequestId: k,
          quoteId: S,
          orderId: j,
          clientId: v,
          professionalId: a.localProfessionalProfileId,
          scheduledStart: o + 7200 * 60 * 1e3,
          timezone: "Europe/Amsterdam",
          locationAddress: "3011AA, Rotterdam, Netherlands",
          status: "requested",
          createdAt: o,
          updatedAt: o
        });
      await ctx.db.patch(F, {
        localAppointmentId: V
      });
      let U = await ctx.db.insert("quoteRequests", {
          tenantId: a.tenantId,
          clientId: v,
          categoryId: a.categoryId,
          title: `Smoke Local Cancellation ${args.tag}`,
          description: "Secondary accepted local request used to verify cancellation synchronization.",
          locationCity: "The Hague",
          locationPostcode: "2511AA",
          locationCountry: "Netherlands",
          budgetIndication: "EUR150 - EUR300",
          preferredDate: o + 8640 * 60 * 1e3,
          status: "accepted",
          quoteCount: 1,
          maxSlots: 3,
          claimedSlots: 1,
          isExclusive: !1,
          createdAt: o,
          updatedAt: o
        }),
        M = await ctx.db.insert("quotes", {
          quoteRequestId: U,
          freelancerId: a.localProfessionalProfileId,
          amount: 225,
          currency: "EUR",
          description: "Accepted secondary quote for cancellation-state acceptance.",
          estimatedDays: 1,
          status: "accepted",
          createdAt: o,
          updatedAt: o
        }),
        K = await ctx.db.insert("orders", {
          tenantId: a.tenantId,
          orderNumber: `LOCAL-CANCEL-SMOKE-${args.tag}`,
          orderType: "local_quote",
          clientId: v,
          freelancerId: a.localProfessionalProfileId,
          quoteRequestId: U,
          quoteId: M,
          title: `Smoke Local Cancellation ${args.tag}`,
          amount: 225,
          platformFee: 0,
          freelancerEarnings: 225,
          currency: "EUR",
          revisionsUsed: 0,
          status: "active",
          escrowStatus: "beta_no_payment",
          createdAt: o,
          updatedAt: o
        }),
        ae = await ctx.db.insert("localAppointments", {
          tenantId: a.tenantId,
          quoteRequestId: U,
          quoteId: M,
          orderId: K,
          clientId: v,
          professionalId: a.localProfessionalProfileId,
          scheduledStart: o + 8640 * 60 * 1e3,
          timezone: "Europe/Amsterdam",
          locationAddress: "2511AA, The Hague, Netherlands",
          status: "requested",
          createdAt: o,
          updatedAt: o
        });
      return {
        tag: args.tag,
        locale: c,
        ids: {
          gigId: Q,
          gigPackageId: X,
          projectId: z,
          bidId: ie,
          quoteRequestId: W,
          jobId: _,
          jobApplicationId: Y,
          withdrawalJobId: N,
          withdrawalJobApplicationId: x,
          companyUserId: P,
          companyPreviousVerificationStatus: Z,
          companyPreviousName: G,
          localClientId: v,
          workspaceProjectId: R,
          acceptedBidId: T,
          orderId: q,
          conversationId: J,
          messageId: ee,
          deliverableId: te,
          localQuoteRequestId: k,
          localLeadClaimId: oe,
          localQuoteId: S,
          localOrderId: j,
          localConversationId: F,
          localAppointmentId: V,
          cancellationQuoteRequestId: U,
          cancellationQuoteId: M,
          cancellationOrderId: K,
          cancellationAppointmentId: ae,
          adminUserId: d._id,
          adminPreviousRole: r,
          onlineClientId: a.clientId,
          onlineFreelancerUserId: a.freelancerId,
          localProfessionalUserId: a.localProfessionalId,
          candidateUserId: a.candidateId
        },
        routes: {
          service: `/online/service/${n}`,
          project: `/online/project/${l}`,
          quoteRequest: `/local/quote-request/${W}`,
          job: `/jobs/job/${u}`,
          candidateApplications: "/dashboard/applications",
          employerApplications: `/manage-jobs/${_}/applications`,
          order: `/orders/${q}`,
          localOrder: `/orders/${j}`
        }
      };
    }
  }),
  seedStaycool = internalMutation({
    args: {},
    returns: v.object({
      userId: v.id("users"),
      profileId: v.id("freelancerProfiles"),
      gig1Id: v.id("gigs"),
      gig2Id: v.id("gigs"),
      project1Id: v.id("projects"),
      project2Id: v.id("projects"),
      message: v.string()
    }),
    handler: async ctx => {
      let e = Date.now(),
        c = await ctx.db.query("tenants").first();
      if (!c) throw new Error("No tenant found");
      let p = c._id,
        o = await ctx.db.query("freelancerProfiles").withIndex("by_slug", g => g.eq("slug", "staycool-airconditioning")).first(),
        a,
        n;
      o ? (n = o._id, a = o.userId, await ctx.db.patch(o._id, {
        tagline: "Professionele airconditioning installatie & onderhoud",
        bio: "StayCool Airconditioning is uw specialist voor airconditioning in de Randstad. Met meer dan 10 jaar ervaring leveren wij hoogwaardige aircosystemen voor woningen en bedrijfspanden. Van advies tot installatie en jaarlijks onderhoud \u2014 wij zorgen voor een aangenaam binnenklimaat het hele jaar door. Wij werken uitsluitend met A-merken zoals Daikin, Mitsubishi en Samsung, en bieden garantie op al onze installaties.",
        workType: "local",
        serviceRadiusKm: 50,
        skills: ["Airconditioning", "HVAC", "Klimaatbeheersing", "Split-unit installatie", "Warmtepomp", "Onderhoud", "Daikin", "Mitsubishi", "Samsung"],
        isVerified: !0,
        verificationDate: e,
        level: "pro",
        ratingAverage: 4.8,
        ratingCount: 23,
        totalOrders: 47,
        completionRate: 98,
        responseTimeHours: 2,
        updatedAt: e
      })) : (a = await ctx.db.insert("users", {
        name: "StayCool Airconditioning",
        email: "info@staycool-airco.nl",
        role: "freelancer",
        tenantId: p,
        createdAt: e,
        updatedAt: e
      }), n = await ctx.db.insert("freelancerProfiles", {
        userId: a,
        tenantId: p,
        displayName: "StayCool Airconditioning",
        slug: "staycool-airconditioning",
        tagline: "Professionele airconditioning installatie & onderhoud",
        bio: "StayCool Airconditioning is uw specialist voor airconditioning in de Randstad. Met meer dan 10 jaar ervaring leveren wij hoogwaardige aircosystemen voor woningen en bedrijfspanden. Van advies tot installatie en jaarlijks onderhoud \u2014 wij zorgen voor een aangenaam binnenklimaat het hele jaar door. Wij werken uitsluitend met A-merken zoals Daikin, Mitsubishi en Samsung, en bieden garantie op al onze installaties.",
        hourlyRate: 75,
        workType: "local",
        locationCity: "Rotterdam",
        locationCountry: "Netherlands",
        serviceRadiusKm: 50,
        skills: ["Airconditioning", "HVAC", "Klimaatbeheersing", "Split-unit installatie", "Warmtepomp", "Onderhoud", "Daikin", "Mitsubishi", "Samsung"],
        languages: ["Nederlands", "English"],
        status: "active",
        profileVisibility: "public",
        isAvailable: !0,
        isVerified: !0,
        verificationDate: e,
        level: "pro",
        ratingAverage: 4.8,
        ratingCount: 23,
        totalOrders: 47,
        totalEarnings: 89500,
        completionRate: 98,
        responseTimeHours: 2,
        contactPermission: "everyone",
        featured: !1,
        locale: "en",
        portfolioUrls: [],
        createdAt: e - 365 * 24 * 60 * 60 * 1e3,
        updatedAt: e
      }));
      let u = (await ctx.db.query("marketplaceCategories").withIndex("by_slug_locale", g => g.eq("slug", "hvac").eq("locale", "en")).first())?._id,
        s = await ctx.db.insert("gigs", {
          tenantId: p,
          freelancerId: n,
          title: "Airconditioning Installatie",
          slug: "airconditioning-installatie-staycool",
          description: "Complete airconditioning installatie voor uw woning of kantoor. Inclusief advies op locatie, levering van het systeem, professionele installatie en inbedrijfstelling. Wij werken met topmerken als Daikin, Mitsubishi en Samsung.",
          categoryId: u,
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
          isFeatured: !1,
          locale: "en",
          publishedAt: e - 4320 * 60 * 60 * 1e3,
          createdAt: e - 4320 * 60 * 60 * 1e3,
          updatedAt: e
        });
      await ctx.db.insert("gigPackages", {
        gigId: s,
        tier: "basic",
        title: "Enkele Ruimte",
        description: "1 split-unit installatie voor een ruimte tot 25m\xB2",
        price: 1495,
        currency: "EUR",
        deliveryDays: 5,
        revisionCount: 0,
        features: ["Adviesgesprek op locatie", "Daikin/Samsung split-unit", "Professionele installatie", "Inbedrijfstelling & uitleg", "2 jaar garantie"],
        createdAt: e,
        updatedAt: e
      }), await ctx.db.insert("gigPackages", {
        gigId: s,
        tier: "standard",
        title: "Twee Ruimtes",
        description: "Multi-split systeem voor 2 ruimtes",
        price: 2795,
        currency: "EUR",
        deliveryDays: 7,
        revisionCount: 0,
        features: ["Adviesgesprek op locatie", "Multi-split systeem (2 units)", "Professionele installatie", "Leidingwerk weggewerkt", "Inbedrijfstelling & uitleg", "3 jaar garantie"],
        createdAt: e,
        updatedAt: e
      }), await ctx.db.insert("gigPackages", {
        gigId: s,
        tier: "premium",
        title: "Complete Woning",
        description: "Multi-split systeem voor 3-4 ruimtes met premium Daikin units en WiFi-bediening",
        price: 4995,
        currency: "EUR",
        deliveryDays: 10,
        revisionCount: 0,
        features: ["Uitgebreid advies & ontwerp", "Premium Daikin multi-split (3-4 units)", "WiFi-module (app-bediening)", "Complete installatie & afwerking", "Leidingwerk volledig weggewerkt", "5 jaar garantie"],
        createdAt: e,
        updatedAt: e
      });
      let m = await ctx.db.insert("gigs", {
        tenantId: p,
        freelancerId: n,
        title: "Airconditioning Onderhoud & Service",
        slug: "airco-onderhoud-service-staycool",
        description: "Professioneel onderhoud van uw aircosysteem. Jaarlijks onderhoud verlengt de levensduur, verbetert de luchtkwaliteit en houdt het energieverbruik laag.",
        categoryId: u,
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
        isFeatured: !1,
        locale: "en",
        publishedAt: e - 3600 * 60 * 60 * 1e3,
        createdAt: e - 3600 * 60 * 60 * 1e3,
        updatedAt: e
      });
      await ctx.db.insert("gigPackages", {
        gigId: m,
        tier: "basic",
        title: "Enkele Unit",
        description: "Onderhoudsbeurt voor 1 airco split-unit",
        price: 129,
        currency: "EUR",
        deliveryDays: 3,
        revisionCount: 0,
        features: ["Filters reinigen/vervangen", "Koudemiddel controle", "Condensafvoer reinigen", "Werking testen", "Servicerapport"],
        createdAt: e,
        updatedAt: e
      }), await ctx.db.insert("gigPackages", {
        gigId: m,
        tier: "standard",
        title: "Multi-Split (2-3 units)",
        description: "Onderhoudsbeurt voor multi-split systeem met 2-3 binnenunits",
        price: 219,
        currency: "EUR",
        deliveryDays: 3,
        revisionCount: 0,
        features: ["Alle binnenunits reinigen", "Buitenunit reinigen & inspecteren", "Koudemiddel controle", "Leidingwerk inspectie", "Werking & rendement testen", "Uitgebreid servicerapport"],
        createdAt: e,
        updatedAt: e
      }), await ctx.db.insert("gigPackages", {
        gigId: m,
        tier: "premium",
        title: "Jaarcontract",
        description: "Jaarlijks onderhoudscontract met 2 servicebeurten en prioriteit bij storingen",
        price: 349,
        currency: "EUR",
        deliveryDays: 7,
        revisionCount: 0,
        features: ["2x onderhoud per jaar", "Alle units gereinigd & ge\xEFnspecteerd", "Voorrang bij storingen", "10% korting op reparaties", "Telefonisch advies", "Verlengde garantie"],
        createdAt: e,
        updatedAt: e
      });
      let I = await ctx.db.insert("projects", {
          tenantId: p,
          clientId: a,
          title: "Airco installatie bovenwoning Rotterdam-Zuid",
          slug: "airco-installatie-bovenwoning-rotterdam-zuid",
          description: "We zoeken een ervaren airco-installateur voor het plaatsen van een split-unit systeem in onze bovenwoning in Rotterdam-Zuid. Het gaat om 2 slaapkamers en een woonkamer.",
          categoryId: u,
          requiredSkills: ["Airconditioning", "Split-unit installatie", "Residentieel"],
          budgetMin: 2500,
          budgetMax: 4500,
          currency: "EUR",
          deadline: e + 720 * 60 * 60 * 1e3,
          workType: "local",
          status: "open",
          bidCount: 0,
          views: 12,
          locale: "en",
          publishedAt: e - 4320 * 60 * 1e3,
          createdAt: e - 4320 * 60 * 1e3,
          updatedAt: e
        }),
        w = await ctx.db.insert("projects", {
          tenantId: p,
          clientId: a,
          title: "Klimaatbeheersing kantoorpand Capelle a/d IJssel",
          slug: "klimaatbeheersing-kantoorpand-capelle",
          description: "Voor ons kantoorpand in Capelle aan den IJssel (ca. 200m\xB2) zoeken wij een specialist voor het ontwerpen en installeren van een compleet klimaatbeheersing systeem.",
          categoryId: u,
          requiredSkills: ["HVAC", "Warmtepomp", "Klimaatbeheersing", "Commercieel"],
          budgetMin: 8e3,
          budgetMax: 15e3,
          currency: "EUR",
          deadline: e + 1440 * 60 * 60 * 1e3,
          workType: "local",
          status: "open",
          bidCount: 0,
          views: 8,
          locale: "en",
          publishedAt: e - 7200 * 60 * 1e3,
          createdAt: e - 7200 * 60 * 1e3,
          updatedAt: e
        });
      return await ctx.db.insert("portfolioProjects", {
        userId: a,
        tenantId: p,
        title: "Villa Klimaatsysteem Wassenaar",
        description: "Complete klimaatoplossing voor een vrijstaande villa. 6-zone Daikin multi-split systeem met vloerverwarming-integratie. Smart home koppeling via Daikin Onecta app.",
        tags: ["Daikin", "Villa", "Multi-split", "Smart Home"],
        sortOrder: 1,
        createdAt: e - 2160 * 60 * 60 * 1e3,
        updatedAt: e
      }), await ctx.db.insert("portfolioProjects", {
        userId: a,
        tenantId: p,
        title: "Restaurant De Havenloods \u2014 Koelinstallatie",
        description: "Commerci\xEBle koelinstallatie voor restaurant met open keuken. Mitsubishi cassette-units met 360\xB0 luchtstroom.",
        tags: ["Mitsubishi", "Horeca", "Cassette-unit", "Commercieel"],
        sortOrder: 2,
        createdAt: e - 1440 * 60 * 60 * 1e3,
        updatedAt: e
      }), await ctx.db.insert("portfolioProjects", {
        userId: a,
        tenantId: p,
        title: "Penthouse Rotterdam Kop van Zuid",
        description: "Luxe penthouse met volledig weggewerkte airconditioning. Samsung WindFree units die koelen zonder directe luchtstroom.",
        tags: ["Samsung", "WindFree", "Penthouse", "Design"],
        sortOrder: 3,
        createdAt: e - 720 * 60 * 60 * 1e3,
        updatedAt: e
      }), {
        userId: a,
        profileId: n,
        gig1Id: s,
        gig2Id: m,
        project1Id: I,
        project2Id: w,
        message: "StayCool Airconditioning: 2 gigs (6 packages), 2 projects, 3 portfolio items created"
      };
    }
  }),
  cleanup = mutation({
    args: {
      serverSecret: v.string(),
      gigId: v.optional(v.id("gigs")),
      projectId: v.optional(v.id("projects")),
      bidId: v.optional(v.id("bids")),
      quoteRequestId: v.optional(v.id("quoteRequests")),
      jobId: v.optional(v.id("jobs")),
      jobApplicationId: v.optional(v.id("jobApplications")),
      withdrawalJobId: v.optional(v.id("jobs")),
      withdrawalJobApplicationId: v.optional(v.id("jobApplications")),
      companyUserId: v.optional(v.id("users")),
      companyPreviousVerificationStatus: v.optional(companyVerificationStatusValidator),
      companyPreviousName: v.optional(v.string()),
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
      onlineClientId: v.optional(v.id("users")),
      onlineFreelancerUserId: v.optional(v.id("users")),
      localProfessionalUserId: v.optional(v.id("users")),
      candidateUserId: v.optional(v.id("users"))
    },
    returns: v.object({
      ok: v.boolean()
    }),
    handler: async (ctx, args) => {
      if (requireServerSecret(args.serverSecret), args.localAppointmentId || args.cancellationAppointmentId) {
        let o = [args.localClientId, args.localProfessionalUserId].filter(a => a !== void 0);
        for (let a of o) {
          let n = await ctx.db.query("notifications").withIndex("by_user", l => l.eq("userId", a)).order("desc").take(100);
          for (let l of n) {
            let u = l.metadata;
            (u?.appointmentId === args.localAppointmentId || u?.appointmentId === args.cancellationAppointmentId) && (await ctx.db.delete(l._id));
          }
        }
      }
      if (args.jobId || args.withdrawalJobId) for (let o of [args.candidateUserId, args.companyUserId].filter(a => a !== void 0)) {
        let a = await ctx.db.query("notifications").withIndex("by_user", n => n.eq("userId", o)).order("desc").take(100);
        for (let n of a) {
          let l = n.metadata;
          (l?.jobId === args.jobId || l?.jobId === args.withdrawalJobId || l?.applicationId === args.jobApplicationId || l?.applicationId === args.withdrawalJobApplicationId) && (await ctx.db.delete(n._id));
        }
      }
      if (args.adminUserId) {
        let o = await ctx.db.get(args.adminUserId);
        o?.email.startsWith("skilllinkup.qa+admin") && (await ctx.db.patch(o._id, {
          role: args.adminPreviousRole ?? "author",
          updatedAt: Date.now()
        }));
      }
      if (args.companyUserId) {
        let o = await ctx.db.get(args.companyUserId);
        o && isDedicatedQaEmail(o.email) && (await ctx.db.patch(o._id, {
          companyName: args.companyPreviousName,
          companyVerificationStatus: args.companyPreviousVerificationStatus,
          updatedAt: Date.now()
        }));
      }
      let c = [...new Set([args.onlineClientId, args.onlineFreelancerUserId, args.localClientId, args.localProfessionalUserId, args.candidateUserId, args.companyUserId].filter(o => o !== void 0))];
      for (let o of c) {
        let a = await ctx.db.query("emailDeliveries").withIndex("by_user", l => l.eq("userId", o)).take(500);
        for (let l of a) await ctx.db.delete(l._id);
        let n = await ctx.db.get(o);
        if (n && isDedicatedQaEmail(n.email)) {
          let l = await ctx.db.query("jobs").withIndex("by_client", s => s.eq("clientId", n._id)).take(200);
          for (let s of l) if (s.title.startsWith("Playwright Product Designer")) {
            let m = await ctx.db.query("jobApplications").withIndex("by_job", I => I.eq("jobId", s._id)).take(100);
            for (let I of m) await ctx.db.delete(I._id);
            await ctx.db.delete(s._id);
          }
          let u = await ctx.db.query("projects").withIndex("by_client", s => s.eq("clientId", n._id)).take(200);
          for (let s of u) if (s.title.startsWith("Playwright CRUD Project")) {
            let m = await ctx.db.query("bids").withIndex("by_project", I => I.eq("projectId", s._id)).take(100);
            for (let I of m) await ctx.db.delete(I._id);
            await ctx.db.delete(s._id);
          }
        }
      }
      let p = new Set<Id<"conversations">>();
      if (args.bidId) {
        let o = await ctx.db.query("conversations").withIndex("by_bid", a => a.eq("bidId", args.bidId)).first();
        o && p.add(o._id);
      }
      if (args.jobApplicationId) {
        let o = await ctx.db.query("conversations").withIndex("by_jobApplication", a => a.eq("jobApplicationId", args.jobApplicationId)).first();
        o && p.add(o._id);
      }
      for (let o of p) {
        let a = await ctx.db.query("messages").withIndex("by_conversation", n => n.eq("conversationId", o)).take(100);
        for (let n of a) await ctx.db.delete(n._id);
        (await ctx.db.get(o)) && (await ctx.db.delete(o));
      }
      args.localAppointmentId && (await ctx.db.get(args.localAppointmentId)) && (await ctx.db.delete(args.localAppointmentId)), args.cancellationAppointmentId && (await ctx.db.get(args.cancellationAppointmentId)) && (await ctx.db.delete(args.cancellationAppointmentId)), args.cancellationOrderId && (await ctx.db.get(args.cancellationOrderId)) && (await ctx.db.delete(args.cancellationOrderId)), args.cancellationQuoteId && (await ctx.db.get(args.cancellationQuoteId)) && (await ctx.db.delete(args.cancellationQuoteId)), args.cancellationQuoteRequestId && (await ctx.db.get(args.cancellationQuoteRequestId)) && (await ctx.db.delete(args.cancellationQuoteRequestId)), args.localConversationId && (await ctx.db.get(args.localConversationId)) && (await ctx.db.delete(args.localConversationId)), args.localOrderId && (await ctx.db.get(args.localOrderId)) && (await ctx.db.delete(args.localOrderId)), args.localQuoteId && (await ctx.db.get(args.localQuoteId)) && (await ctx.db.delete(args.localQuoteId)), args.localLeadClaimId && (await ctx.db.get(args.localLeadClaimId)) && (await ctx.db.delete(args.localLeadClaimId)), args.localQuoteRequestId && (await ctx.db.get(args.localQuoteRequestId)) && (await ctx.db.delete(args.localQuoteRequestId));
      for (let o of [args.orderId, args.localOrderId].filter(a => a !== void 0)) {
        let a = await ctx.db.query("marketplaceReviews").withIndex("by_order", n => n.eq("orderId", o)).take(20);
        for (let n of a) await ctx.db.delete(n._id);
        for (let n of c) {
          let l = await ctx.db.query("notifications").withIndex("by_user", u => u.eq("userId", n)).order("desc").take(100);
          for (let u of l) u.metadata?.orderId === o && (await ctx.db.delete(u._id));
        }
      }
      if (args.orderId) {
        let o = await ctx.db.query("orderDeliverables").withIndex("by_order", a => a.eq("orderId", args.orderId)).take(100);
        for (let a of o) await ctx.db.delete(a._id);
      } else args.deliverableId && (await ctx.db.get(args.deliverableId)) && (await ctx.db.delete(args.deliverableId));
      if (args.conversationId) {
        let o = await ctx.db.query("messages").withIndex("by_conversation", a => a.eq("conversationId", args.conversationId)).take(100);
        for (let a of o) await ctx.db.delete(a._id);
      } else args.messageId && (await ctx.db.get(args.messageId)) && (await ctx.db.delete(args.messageId));
      if (args.conversationId && (await ctx.db.get(args.conversationId)) && (await ctx.db.delete(args.conversationId)), args.orderId && (await ctx.db.get(args.orderId)) && (await ctx.db.delete(args.orderId)), args.acceptedBidId && (await ctx.db.get(args.acceptedBidId)) && (await ctx.db.delete(args.acceptedBidId)), args.workspaceProjectId && (await ctx.db.get(args.workspaceProjectId)) && (await ctx.db.delete(args.workspaceProjectId)), args.jobApplicationId && (await ctx.db.get(args.jobApplicationId)) && (await ctx.db.delete(args.jobApplicationId)), args.withdrawalJobApplicationId && (await ctx.db.get(args.withdrawalJobApplicationId)) && (await ctx.db.delete(args.withdrawalJobApplicationId)), args.projectId) {
        let o = await ctx.db.query("bids").withIndex("by_project", a => a.eq("projectId", args.projectId)).take(500);
        for (let a of o) await ctx.db.delete(a._id);
        (await ctx.db.get(args.projectId)) && (await ctx.db.delete(args.projectId));
      }
      if (args.gigId) {
        let o = await ctx.db.query("gigPackages").withIndex("by_gig", n => n.eq("gigId", args.gigId)).take(50);
        for (let n of o) await ctx.db.delete(n._id);
        let a = await ctx.db.query("gigImages").withIndex("by_gig", n => n.eq("gigId", args.gigId)).take(100);
        for (let n of a) await ctx.db.delete(n._id);
        (await ctx.db.get(args.gigId)) && (await ctx.db.delete(args.gigId));
      }
      if (args.quoteRequestId) {
        let o = await ctx.db.query("quotes").withIndex("by_quoteRequest", n => n.eq("quoteRequestId", args.quoteRequestId)).take(100);
        for (let n of o) await ctx.db.delete(n._id);
        let a = await ctx.db.query("leadClaims").withIndex("by_quoteRequest", n => n.eq("quoteRequestId", args.quoteRequestId)).take(20);
        for (let n of a) await ctx.db.delete(n._id);
        (await ctx.db.get(args.quoteRequestId)) && (await ctx.db.delete(args.quoteRequestId));
      }
      if (args.jobId && (await ctx.db.get(args.jobId)) && (await ctx.db.delete(args.jobId)), args.withdrawalJobId && (await ctx.db.get(args.withdrawalJobId)) && (await ctx.db.delete(args.withdrawalJobId)), args.companyUserId) {
        let o = await ctx.db.get(args.companyUserId);
        o?.email.startsWith("smoke-company-") && (await ctx.db.delete(o._id));
      }
      return {
        ok: !0
      };
    }
  }),
  verifyCleanup = query({
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
      onlineClientId: v.optional(v.id("users")),
      onlineFreelancerUserId: v.optional(v.id("users")),
      localProfessionalUserId: v.optional(v.id("users")),
      candidateUserId: v.optional(v.id("users"))
    },
    returns: v.object({
      ok: v.boolean(),
      remainingFixtures: v.number(),
      remainingMessages: v.number(),
      remainingDeliverables: v.number(),
      remainingReviews: v.number(),
      remainingLifecycleNotifications: v.number(),
      remainingEmailDeliveries: v.number(),
      generatedJobs: v.number(),
      generatedProjects: v.number(),
      adminRole: v.union(v.string(), v.null())
    }),
    handler: async (ctx, args) => {
      requireServerSecret(args.serverSecret);
      let c = 0;
      for (let d of args.fixtureIds) {
        let r = ctx.db.normalizeId("gigs", d) ?? ctx.db.normalizeId("gigPackages", d) ?? ctx.db.normalizeId("projects", d) ?? ctx.db.normalizeId("quoteRequests", d) ?? ctx.db.normalizeId("jobs", d) ?? ctx.db.normalizeId("jobApplications", d) ?? ctx.db.normalizeId("bids", d) ?? ctx.db.normalizeId("orders", d) ?? ctx.db.normalizeId("conversations", d) ?? ctx.db.normalizeId("messages", d) ?? ctx.db.normalizeId("orderDeliverables", d) ?? ctx.db.normalizeId("leadClaims", d) ?? ctx.db.normalizeId("quotes", d) ?? ctx.db.normalizeId("localAppointments", d) ?? ctx.db.normalizeId("users", d);
        r && (await ctx.db.get(r)) && (c += 1);
      }
      let p = args.conversationId ? (await ctx.db.query("messages").withIndex("by_conversation", d => d.eq("conversationId", args.conversationId)).take(100)).length : 0,
        o = args.orderId ? (await ctx.db.query("orderDeliverables").withIndex("by_order", d => d.eq("orderId", args.orderId)).take(100)).length : 0,
        a = 0;
      for (let d of [args.orderId, args.localOrderId].filter(r => r !== void 0)) a += (await ctx.db.query("marketplaceReviews").withIndex("by_order", r => r.eq("orderId", d)).take(20)).length;
      let n = 0,
        l = 0;
      for (let d of [args.onlineClientId, args.onlineFreelancerUserId, args.localClientId, args.localProfessionalUserId, args.candidateUserId, args.companyUserId].filter(r => r !== void 0)) {
        let r = await ctx.db.query("notifications").withIndex("by_user", f => f.eq("userId", d)).order("desc").take(100);
        n += r.filter(f => {
          let b = f.metadata;
          return b?.appointmentId === args.localAppointmentId || b?.appointmentId === args.cancellationAppointmentId || b?.orderId === args.orderId || b?.orderId === args.localOrderId || b?.jobId === args.jobId || b?.jobId === args.withdrawalJobId || b?.applicationId === args.jobApplicationId || b?.applicationId === args.withdrawalJobApplicationId;
        }).length, l += (await ctx.db.query("emailDeliveries").withIndex("by_user", f => f.eq("userId", d)).take(500)).length;
      }
      let u = 0,
        s = 0,
        m = [...new Set([args.onlineClientId, args.onlineFreelancerUserId, args.localClientId, args.localProfessionalUserId, args.candidateUserId, args.companyUserId].filter(d => d !== void 0))];
      for (let d of m) {
        let r = await ctx.db.get(d);
        if (!r || !isDedicatedQaEmail(r.email)) continue;
        let f = await ctx.db.query("jobs").withIndex("by_client", y => y.eq("clientId", r._id)).take(200),
          b = await ctx.db.query("projects").withIndex("by_client", y => y.eq("clientId", r._id)).take(200);
        u += f.filter(y => y.title.startsWith("Playwright Product Designer")).length, s += b.filter(y => y.title.startsWith("Playwright CRUD Project")).length;
      }
      let w = (args.adminUserId ? await ctx.db.get(args.adminUserId) : null)?.role ?? null;
      return {
        ok: c === 0 && p === 0 && o === 0 && a === 0 && n === 0 && l === 0 && u === 0 && s === 0 && w !== "admin",
        remainingFixtures: c,
        remainingMessages: p,
        remainingDeliverables: o,
        remainingReviews: a,
        remainingLifecycleNotifications: n,
        remainingEmailDeliveries: l,
        generatedJobs: u,
        generatedProjects: s,
        adminRole: w
      };
    }
  });
export { cleanup, seed, seedStaycool, verifyCleanup };

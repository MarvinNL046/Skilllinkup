import type { Doc } from "../_generated/dataModel";
// Reconciled with the existing development deployment (2026-09-07).
import { marketplaceRoleValidator } from "./marketplaceState";
import { companyVerificationStatusValidator } from "./marketplaceState";
import { marketplaceWorldValidator } from "./marketplaceState";
import { onboardingContextValidator } from "./marketplaceState";
import { hasCompletedMarketplaceContext } from "./marketplaceState";
import { freelancerProfileStatusValidator } from "./marketplaceState";
import { quoteRequestStatusValidator } from "./marketplaceState";
import { quoteStatusValidator } from "./marketplaceState";
import { v } from "convex/values";
var l = v.union(v.string(), v.null()),
  i = v.union(v.number(), v.null()),
  P = {
    _id: v.id("quoteRequests"),
    title: v.string(),
    descriptionPreview: v.string(),
    categoryName: l,
    locationCity: l,
    locationCountry: l,
    budgetIndication: l,
    preferredDate: i,
    status: quoteRequestStatusValidator,
    quoteCount: v.number(),
    maxSlots: v.number(),
    claimedSlots: v.number(),
    isExclusive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number()
  },
  publicLocalQuoteRequestValidator = v.object(P),
  C = {
    _id: v.id("quotes"),
    amount: v.number(),
    currency: l,
    description: v.string(),
    estimatedDays: i,
    validUntil: i,
    status: quoteStatusValidator,
    createdAt: v.number(),
    updatedAt: v.number()
  },
  participantLocalQuoteValidator = v.object(C),
  participantLocalQuoteRequestValidator = v.object({
    ...P,
    description: v.string(),
    locationPostcode: l,
    latitude: i,
    longitude: i,
    photos: v.array(v.any()),
    isOwner: v.boolean(),
    clientName: l,
    canViewFullDetails: v.literal(!0),
    quotes: v.array(v.object({
      ...C,
      freelancerProfile: v.union(v.object({
        _id: v.id("freelancerProfiles"),
        displayName: v.string(),
        tagline: l,
        avatarUrl: l,
        ratingAverage: v.number(),
        ratingCount: v.number(),
        isVerified: v.boolean()
      }), v.null())
    })),
    myQuote: v.union(participantLocalQuoteValidator, v.null())
  });
function toSafePublicLocation(t) {
  let n = t?.trim().replace(/\s+/g, " ");
  return !n || n.length > 80 ? null : /^[\p{L}\p{M} .'-]+$/u.test(n) ? n : null;
}
function toSafePublicBudget(t) {
  let n = t?.trim().replace(/\s+/g, " ");
  return !n || n.length > 40 ? null : /^(?:under )?(?:EUR|\u20ac)\s?\d{1,3}(?:[.,]\d{3})*(?:\s*-\s*(?:(?:EUR|\u20ac)\s?)?\d{1,3}(?:[.,]\d{3})*|\+)?$/i.test(n) ? n : null;
}
function toSafePublicCategory(t) {
  let n = t?.trim().replace(/\s+/g, " ");
  return !n || n.length > 80 ? "Local service" : /^[\p{L}\p{M}\d &/+'-]+$/u.test(n) ? n : "Local service";
}
function buildPublicLocalRequestSummary(t, n, o) {
  let r = [n, o].filter(Boolean).join(", "),
    c = r ? ` in ${r}` : " in the selected service area";
  return `${t} request${c}. Full job details are private and become available only after an eligible professional claims the lead.`;
}
function toPublicLocalQuoteRequest(t, n) {
  let o = toSafePublicCategory(n),
    r = toSafePublicLocation(t.locationCity),
    c = toSafePublicLocation(t.locationCountry),
    R = buildPublicLocalRequestSummary(o, r, c);
  return {
    _id: t._id,
    title: `${o} request`,
    descriptionPreview: R,
    categoryName: o,
    locationCity: r,
    locationCountry: c,
    budgetIndication: toSafePublicBudget(t.budgetIndication),
    preferredDate: t.preferredDate ?? null,
    status: t.status,
    quoteCount: t.quoteCount ?? 0,
    maxSlots: t.maxSlots ?? 3,
    claimedSlots: t.claimedSlots ?? 0,
    isExclusive: t.isExclusive ?? !1,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  };
}
function toParticipantLocalQuote(t) {
  return {
    _id: t._id,
    amount: t.amount,
    currency: t.currency ?? null,
    description: t.description,
    estimatedDays: t.estimatedDays ?? null,
    validUntil: t.validUntil ?? null,
    status: t.status,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  };
}
function toParticipantLocalQuoteRequest(t, n) {
  return {
    ...toPublicLocalQuoteRequest(t, n.categoryName),
    title: t.title,
    description: t.description,
    locationCity: t.locationCity ?? null,
    locationCountry: t.locationCountry ?? null,
    budgetIndication: t.budgetIndication ?? null,
    locationPostcode: t.locationPostcode ?? null,
    latitude: t.latitude ?? null,
    longitude: t.longitude ?? null,
    photos: t.photos ?? [],
    isOwner: n.isOwner,
    clientName: n.clientName,
    canViewFullDetails: true as const,
    quotes: n.quotes.map(({
      quote: o,
      freelancerProfile: r
    }) => ({
      ...toParticipantLocalQuote(o),
      freelancerProfile: r
    })),
    myQuote: n.myQuote ? toParticipantLocalQuote(n.myQuote) : null
  };
}
var publicFreelancerProfileValidator = v.object({
    _id: v.id("freelancerProfiles"),
    userId: v.id("users"),
    displayName: v.string(),
    slug: l,
    tagline: l,
    bio: l,
    avatarUrl: l,
    coverImageUrl: l,
    hourlyRate: i,
    workType: l,
    locationCity: l,
    locationCountry: l,
    serviceRadiusKm: i,
    languages: v.array(v.string()),
    skills: v.array(v.string()),
    portfolioUrls: v.array(v.string()),
    websiteUrl: l,
    linkedinUrl: l,
    twitterUrl: l,
    githubUrl: l,
    profileVisibility: v.string(),
    contactPermission: v.string(),
    isVerified: v.boolean(),
    verificationDate: i,
    responseTimeHours: i,
    completionRate: i,
    totalOrders: v.number(),
    ratingAverage: v.number(),
    ratingCount: v.number(),
    isAvailable: v.boolean(),
    featured: v.boolean(),
    level: v.string(),
    status: freelancerProfileStatusValidator,
    locale: l,
    createdAt: v.number(),
    updatedAt: v.number()
  }),
  safeUserValidator = v.union(v.object({
    _id: v.id("users"),
    tenantId: v.id("tenants"),
    email: v.string(),
    name: v.string(),
    avatar: l,
    image: l,
    bio: l,
    role: v.string(),
    accountRoles: v.array(marketplaceRoleValidator),
    activeRole: v.union(marketplaceRoleValidator, v.null()),
    preferredWorld: v.union(marketplaceWorldValidator, v.null()),
    onboardingVersion: v.union(v.number(), v.null()),
    deletionRequestedAt: v.union(v.number(), v.null()),
    onboardingContexts: v.array(onboardingContextValidator),
    activeContextComplete: v.boolean(),
    companyName: l,
    companyVerificationStatus: v.union(companyVerificationStatusValidator, v.null()),
    clientCreditBalance: v.number(),
    clientTier: v.string(),
    clientYearlySpend: v.number(),
    createdAt: v.number(),
    updatedAt: v.number()
  }), v.null());
function toSafeUser(user: Doc<"users"> | null) {
  if (!user) return null;
  let n: "online" | "local" | "jobs" | null = user.preferredWorld === "online" || user.preferredWorld === "local" || user.preferredWorld === "jobs" ? user.preferredWorld : null,
    o = !!user.activeRole && n !== null && hasCompletedMarketplaceContext(user, user.activeRole, n);
  return {
    _id: user._id,
    tenantId: user.tenantId,
    email: user.email,
    name: user.name,
    avatar: user.avatar ?? null,
    image: user.image ?? user.avatar ?? null,
    bio: user.bio ?? null,
    role: user.role ?? "author",
    accountRoles: user.accountRoles ?? [],
    activeRole: user.activeRole ?? null,
    preferredWorld: n,
    onboardingVersion: user.onboardingVersion ?? null,
    deletionRequestedAt: user.deletionRequestedAt ?? null,
    onboardingContexts: user.onboardingContexts ?? [],
    activeContextComplete: o,
    companyName: user.companyName ?? null,
    companyVerificationStatus: user.companyVerificationStatus ?? null,
    clientCreditBalance: user.clientCreditBalance ?? 0,
    clientTier: user.clientTier ?? "bronze",
    clientYearlySpend: user.clientYearlySpend ?? 0,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}
function toPublicAuthor(user: Doc<"users"> | null) {
  return user ? {
    _id: user._id,
    name: user.name,
    image: user.image ?? user.avatar ?? null,
    avatar: user.avatar ?? user.image ?? null,
    bio: user.bio ?? null
  } : null;
}
function toPublicClient(user: Doc<"users"> | null) {
  return user ? {
    _id: user._id,
    name: user.name,
    avatar: user.avatar ?? user.image ?? null,
    bio: user.bio ?? null,
    createdAt: user.createdAt
  } : null;
}
function isPublicFreelancerProfile(profile: Doc<"freelancerProfiles"> | null) {
  return !!profile && profile.status === "active" && profile.profileVisibility !== "private";
}
function isPublicOnlineFreelancerProfile(t) {
  return isPublicFreelancerProfile(t) && (t.providerRole === "freelancer" || !t.providerRole && t.workType !== "local");
}
function isPublicLocalProfessionalProfile(t) {
  return isPublicFreelancerProfile(t) && t.providerRole === "local_professional";
}
function toPublicFreelancerProfile(profile: Doc<"freelancerProfiles"> | null) {
  return profile ? {
    _id: profile._id,
    userId: profile.userId,
    displayName: profile.displayName,
    slug: profile.slug ?? null,
    tagline: profile.tagline ?? null,
    bio: profile.bio ?? null,
    avatarUrl: profile.avatarUrl ?? null,
    coverImageUrl: profile.coverImageUrl ?? null,
    hourlyRate: profile.hourlyRate ?? null,
    workType: profile.workType ?? null,
    locationCity: profile.locationCity ?? null,
    locationCountry: profile.locationCountry ?? null,
    serviceRadiusKm: profile.serviceRadiusKm ?? null,
    languages: profile.languages ?? [],
    skills: profile.skills ?? [],
    portfolioUrls: profile.portfolioUrls ?? [],
    websiteUrl: profile.websiteUrl ?? null,
    linkedinUrl: profile.linkedinUrl ?? null,
    twitterUrl: profile.twitterUrl ?? null,
    githubUrl: profile.githubUrl ?? null,
    profileVisibility: profile.profileVisibility ?? "public",
    contactPermission: profile.contactPermission ?? "everyone",
    isVerified: profile.isVerified ?? !1,
    verificationDate: profile.verificationDate ?? null,
    responseTimeHours: profile.responseTimeHours ?? null,
    completionRate: profile.completionRate ?? null,
    totalOrders: profile.totalOrders ?? 0,
    ratingAverage: profile.ratingAverage ?? 0,
    ratingCount: profile.ratingCount ?? 0,
    isAvailable: profile.isAvailable ?? !0,
    featured: profile.featured ?? !1,
    level: profile.level ?? "new",
    status: profile.status,
    locale: profile.locale ?? null,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt
  } : null;
}
export { publicLocalQuoteRequestValidator, participantLocalQuoteValidator, participantLocalQuoteRequestValidator, toPublicLocalQuoteRequest, toParticipantLocalQuoteRequest, publicFreelancerProfileValidator, safeUserValidator, toSafeUser, toPublicAuthor, toPublicClient, isPublicFreelancerProfile, isPublicOnlineFreelancerProfile, isPublicLocalProfessionalProfile, toPublicFreelancerProfile };

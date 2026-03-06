import { Doc } from "../_generated/dataModel";

export function toSafeUser(user: Doc<"users"> | null) {
  if (!user) return null;

  return {
    _id: user._id,
    tenantId: user.tenantId,
    email: user.email,
    name: user.name,
    avatar: user.avatar ?? null,
    image: user.image ?? user.avatar ?? null,
    bio: user.bio ?? null,
    role: user.role ?? "author",
    userType: user.userType ?? null,
    preferredWorld: user.preferredWorld ?? null,
    clientCreditBalance: user.clientCreditBalance ?? 0,
    clientTier: user.clientTier ?? "bronze",
    clientYearlySpend: user.clientYearlySpend ?? 0,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function toPublicAuthor(user: Doc<"users"> | null) {
  if (!user) return null;

  return {
    _id: user._id,
    name: user.name,
    image: user.image ?? user.avatar ?? null,
    avatar: user.avatar ?? user.image ?? null,
    bio: user.bio ?? null,
  };
}

export function toPublicClient(user: Doc<"users"> | null) {
  if (!user) return null;

  return {
    _id: user._id,
    name: user.name,
    avatar: user.avatar ?? user.image ?? null,
    bio: user.bio ?? null,
    createdAt: user.createdAt,
  };
}

export function isPublicFreelancerProfile(
  profile: Doc<"freelancerProfiles"> | null
) {
  return (
    !!profile &&
    profile.status === "active" &&
    profile.profileVisibility !== "private"
  );
}

export function toPublicFreelancerProfile(
  profile: Doc<"freelancerProfiles"> | null
) {
  if (!profile) return null;

  return {
    _id: profile._id,
    userId: profile.userId,
    displayName: profile.displayName,
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
    isVerified: profile.isVerified ?? false,
    verificationDate: profile.verificationDate ?? null,
    responseTimeHours: profile.responseTimeHours ?? null,
    completionRate: profile.completionRate ?? null,
    totalEarnings: profile.totalEarnings ?? null,
    totalOrders: profile.totalOrders ?? 0,
    ratingAverage: profile.ratingAverage ?? 0,
    ratingCount: profile.ratingCount ?? 0,
    isAvailable: profile.isAvailable ?? true,
    featured: profile.featured ?? false,
    level: profile.level ?? "new",
    status: profile.status,
    locale: profile.locale ?? null,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}

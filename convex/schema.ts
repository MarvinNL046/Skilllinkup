import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ============================================================
  // CORE / MULTI-TENANT
  // ============================================================

  tenants: defineTable({
    name: v.string(),
    slug: v.string(),
    customDomain: v.optional(v.string()),
    plan: v.optional(v.string()), // free, pro, enterprise
    maxPosts: v.optional(v.number()),
    maxUsers: v.optional(v.number()),
    maxStorageMb: v.optional(v.number()),
    settings: v.optional(v.any()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  // ============================================================
  // AUTH / USERS
  // ============================================================

  users: defineTable({
    tenantId: v.id("tenants"),
    email: v.string(),
    name: v.string(),
    passwordHash: v.optional(v.string()), // "stack-auth-managed" for Stack Auth users
    role: v.optional(v.string()), // admin, editor, author
    avatar: v.optional(v.string()),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),
    emailVerified: v.optional(v.boolean()),
    userType: v.optional(v.string()), // client, freelancer
    stackAuthId: v.optional(v.string()), // Stack Auth user ID
    lastLogin: v.optional(v.number()),
    lastActiveAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_stackAuthId", ["stackAuthId"])
    .index("by_tenant", ["tenantId"]),

  // ============================================================
  // BLOG / CONTENT
  // ============================================================

  categories: defineTable({
    tenantId: v.id("tenants"),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    locale: v.string(), // en, nl
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug_locale", ["slug", "locale"])
    .index("by_tenant", ["tenantId"]),

  posts: defineTable({
    tenantId: v.id("tenants"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    featureImg: v.optional(v.string()),
    postFormat: v.optional(v.string()), // standard, video, audio, gallery, quote
    authorId: v.optional(v.id("users")),
    authorName: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    adImage: v.optional(v.string()),
    adLink: v.optional(v.string()),
    adCode: v.optional(v.string()),
    status: v.string(), // draft, published, scheduled
    publishedAt: v.optional(v.number()),
    scheduledFor: v.optional(v.number()),
    views: v.optional(v.number()),
    readTime: v.optional(v.number()),
    featured: v.optional(v.boolean()),
    sticky: v.optional(v.boolean()),
    locale: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug_locale", ["slug", "locale"])
    .index("by_status_locale", ["status", "locale"])
    .index("by_category", ["categoryId"])
    .index("by_author", ["authorId"])
    .index("by_featured", ["featured", "status", "locale"])
    .index("by_tenant", ["tenantId"])
    .searchIndex("search_posts", {
      searchField: "title",
      filterFields: ["status", "locale"],
    }),

  media: defineTable({
    tenantId: v.id("tenants"),
    fileName: v.string(),
    fileUrl: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    altText: v.optional(v.string()),
    uploadedBy: v.optional(v.id("users")),
    createdAt: v.number(),
  }).index("by_tenant", ["tenantId"]),

  comments: defineTable({
    tenantId: v.id("tenants"),
    postId: v.id("posts"),
    authorName: v.string(),
    authorEmail: v.string(),
    authorWebsite: v.optional(v.string()),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
    status: v.string(), // pending, approved, spam
    ipAddress: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_status", ["status"]),

  analytics: defineTable({
    tenantId: v.id("tenants"),
    postId: v.optional(v.id("posts")),
    event: v.string(),
    sessionId: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    referrer: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_event", ["event"]),

  // ============================================================
  // PLATFORMS (external freelance platform reviews)
  // ============================================================

  platforms: defineTable({
    tenantId: v.optional(v.id("tenants")),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    rating: v.optional(v.number()),
    category: v.optional(v.string()),
    fees: v.optional(v.string()),
    difficulty: v.optional(v.string()), // Easy, Medium, Hard
    color: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    pros: v.optional(v.array(v.string())),
    cons: v.optional(v.array(v.string())),
    features: v.optional(v.array(v.string())),
    status: v.optional(v.string()), // published, draft
    publishedAt: v.optional(v.number()),
    workType: v.optional(v.string()), // remote, local, hybrid
    countries: v.optional(v.array(v.string())),
    // Affiliate fields
    affiliateLink: v.optional(v.string()),
    commissionType: v.optional(v.string()),
    commissionValue: v.optional(v.string()),
    cookieDuration: v.optional(v.number()),
    avgAffiliateEarnings: v.optional(v.number()),
    uniqueBenefits: v.optional(v.array(v.string())),
    automationStatus: v.optional(v.string()),
    locale: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug_locale", ["slug", "locale"])
    .index("by_status_locale", ["status", "locale"])
    .index("by_workType", ["workType"])
    .index("by_featured", ["featured", "status", "locale"])
    .searchIndex("search_platforms", {
      searchField: "name",
      filterFields: ["status", "locale", "workType"],
    }),

  reviews: defineTable({
    platformId: v.id("platforms"),
    userId: v.optional(v.id("users")),
    userName: v.optional(v.string()),
    userAvatar: v.optional(v.string()),
    userRole: v.optional(v.string()),
    title: v.string(),
    content: v.string(),
    overallRating: v.number(),
    easeOfUseRating: v.optional(v.number()),
    supportRating: v.optional(v.number()),
    valueRating: v.optional(v.number()),
    pros: v.optional(v.array(v.string())),
    cons: v.optional(v.array(v.string())),
    projectType: v.optional(v.string()),
    earningsRange: v.optional(v.string()),
    yearsExperience: v.optional(v.number()),
    verified: v.optional(v.boolean()),
    helpfulCount: v.optional(v.number()),
    status: v.optional(v.string()), // pending, approved, rejected
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_platform", ["platformId"])
    .index("by_status", ["status"]),

  // ============================================================
  // TOOLS
  // ============================================================

  tools: defineTable({
    ownerId: v.string(),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
    toolUrl: v.optional(v.string()),
    isAvailable: v.optional(v.boolean()),
    featured: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
    views: v.optional(v.number()),
    status: v.optional(v.string()),
    locale: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug_locale", ["slug", "locale"])
    .index("by_category", ["category"])
    .index("by_featured", ["featured", "status", "locale"]),

  // ============================================================
  // ADS
  // ============================================================

  ads: defineTable({
    tenantId: v.id("tenants"),
    title: v.string(),
    imageUrl: v.string(),
    linkUrl: v.string(),
    placement: v.string(), // tools_listing, tools_detail, blog_sidebar
    isActive: v.boolean(),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_placement_active", ["placement", "isActive"]),

  // ============================================================
  // SEO PAGES
  // ============================================================

  seoPages: defineTable({
    tenantId: v.id("tenants"),
    title: v.string(),
    slug: v.string(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    h1: v.optional(v.string()),
    content: v.string(),
    excerpt: v.optional(v.string()),
    pillarId: v.number(),
    pillarName: v.string(),
    pillarSlug: v.string(),
    subpillarIndex: v.number(),
    keywords: v.optional(v.array(v.string())),
    schemaMarkup: v.optional(v.any()),
    canonicalUrl: v.optional(v.string()),
    internalLinks: v.optional(v.array(v.any())),
    locale: v.string(),
    alternateUrls: v.optional(v.any()),
    status: v.string(),
    publishedAt: v.optional(v.number()),
    views: v.optional(v.number()),
    conversions: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug_locale", ["slug", "locale"])
    .index("by_pillar", ["pillarSlug", "locale"]),

  seoCtas: defineTable({
    tenantId: v.id("tenants"),
    pageId: v.id("seoPages"),
    ctaText: v.string(),
    ctaType: v.string(), // primary, secondary, tertiary
    ctaAction: v.string(),
    ctaPosition: v.string(), // top, middle, bottom
    contextText: v.optional(v.string()),
    buttonStyle: v.optional(v.string()),
    clicks: v.optional(v.number()),
    conversions: v.optional(v.number()),
    conversionRate: v.optional(v.number()),
    variant: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_page", ["pageId"]),

  // ============================================================
  // MARKETPLACE: FREELANCER PROFILES & SKILLS
  // ============================================================

  freelancerProfiles: defineTable({
    userId: v.id("users"),
    tenantId: v.id("tenants"),
    displayName: v.string(),
    tagline: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
    hourlyRate: v.optional(v.number()),
    workType: v.optional(v.string()), // remote, local, hybrid
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    locationPostcode: v.optional(v.string()),
    serviceRadiusKm: v.optional(v.number()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    languages: v.optional(v.array(v.string())),
    skills: v.optional(v.array(v.string())),
    portfolioUrls: v.optional(v.array(v.string())),
    websiteUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    isVerified: v.optional(v.boolean()),
    verificationDate: v.optional(v.number()),
    stripeAccountId: v.optional(v.string()),
    stripeOnboardingComplete: v.optional(v.boolean()),
    responseTimeHours: v.optional(v.number()),
    completionRate: v.optional(v.number()),
    totalEarnings: v.optional(v.number()),
    totalOrders: v.optional(v.number()),
    ratingAverage: v.optional(v.number()),
    ratingCount: v.optional(v.number()),
    isAvailable: v.optional(v.boolean()),
    featured: v.optional(v.boolean()),
    status: v.string(), // pending, active, suspended
    locale: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["status"])
    .index("by_tenant", ["tenantId"])
    .searchIndex("search_freelancers", {
      searchField: "bio",
      filterFields: ["status", "workType"],
    }),

  marketplaceCategories: defineTable({
    tenantId: v.id("tenants"),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    parentId: v.optional(v.id("marketplaceCategories")),
    serviceType: v.optional(v.string()), // digital, local, hybrid
    sortOrder: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
    locale: v.string(),
    seoMetadata: v.optional(v.any()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug_locale", ["slug", "locale"])
    .index("by_parent", ["parentId"]),

  skills: defineTable({
    name: v.string(),
    slug: v.string(),
    categoryId: v.optional(v.id("marketplaceCategories")),
    locale: v.string(),
    createdAt: v.number(),
  }).index("by_slug_locale", ["slug", "locale"]),

  // ============================================================
  // MARKETPLACE: GIGS
  // ============================================================

  gigs: defineTable({
    tenantId: v.id("tenants"),
    freelancerId: v.id("freelancerProfiles"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    categoryId: v.optional(v.id("marketplaceCategories")),
    tags: v.optional(v.array(v.string())),
    workType: v.optional(v.string()),
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    serviceRadiusKm: v.optional(v.number()),
    views: v.optional(v.number()),
    orderCount: v.optional(v.number()),
    ratingAverage: v.optional(v.number()),
    ratingCount: v.optional(v.number()),
    isFeatured: v.optional(v.boolean()),
    status: v.string(), // pending, active, paused, rejected
    locale: v.string(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug_locale", ["slug", "locale"])
    .index("by_freelancer", ["freelancerId"])
    .index("by_category", ["categoryId"])
    .index("by_status_locale", ["status", "locale"])
    .searchIndex("search_gigs", {
      searchField: "title",
      filterFields: ["status", "locale", "workType"],
    }),

  gigPackages: defineTable({
    gigId: v.id("gigs"),
    tier: v.string(), // basic, standard, premium
    title: v.string(),
    description: v.string(),
    price: v.number(),
    currency: v.optional(v.string()),
    deliveryDays: v.number(),
    revisionCount: v.optional(v.number()),
    features: v.optional(v.array(v.any())),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_gig", ["gigId"]),

  gigImages: defineTable({
    gigId: v.id("gigs"),
    imageUrl: v.string(),
    altText: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_gig", ["gigId"]),

  // ============================================================
  // MARKETPLACE: PROJECTS & BIDS
  // ============================================================

  projects: defineTable({
    tenantId: v.id("tenants"),
    clientId: v.id("users"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    categoryId: v.optional(v.id("marketplaceCategories")),
    requiredSkills: v.optional(v.array(v.string())),
    budgetMin: v.optional(v.number()),
    budgetMax: v.optional(v.number()),
    currency: v.optional(v.string()),
    deadline: v.optional(v.number()),
    workType: v.optional(v.string()),
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    locationPostcode: v.optional(v.string()),
    attachments: v.optional(v.array(v.any())),
    bidCount: v.optional(v.number()),
    views: v.optional(v.number()),
    status: v.string(), // open, in_progress, completed, cancelled, closed
    selectedFreelancerId: v.optional(v.id("freelancerProfiles")),
    locale: v.string(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_client", ["clientId"])
    .index("by_status", ["status"])
    .index("by_slug_locale", ["slug", "locale"]),

  bids: defineTable({
    projectId: v.id("projects"),
    freelancerId: v.id("freelancerProfiles"),
    amount: v.number(),
    currency: v.optional(v.string()),
    deliveryDays: v.number(),
    pitch: v.string(),
    attachments: v.optional(v.array(v.any())),
    status: v.string(), // pending, accepted, rejected, withdrawn
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_freelancer", ["freelancerId"]),

  // ============================================================
  // MARKETPLACE: JOBS
  // ============================================================

  jobs: defineTable({
    tenantId: v.id("tenants"),
    clientId: v.id("users"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    categoryId: v.optional(v.id("marketplaceCategories")),
    company: v.optional(v.string()),
    companyLogo: v.optional(v.string()),
    requiredSkills: v.optional(v.array(v.string())),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    currency: v.optional(v.string()),
    jobType: v.string(), // full_time, part_time, freelance, internship
    experienceLevel: v.optional(v.string()), // junior, mid, senior, lead
    workType: v.optional(v.string()), // remote, local, hybrid
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    benefits: v.optional(v.array(v.string())),
    applicationCount: v.optional(v.number()),
    views: v.optional(v.number()),
    status: v.string(), // open, closed, filled
    locale: v.string(),
    publishedAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_slug_locale", ["slug", "locale"])
    .index("by_client", ["clientId"]),

  // ============================================================
  // MARKETPLACE: ORDERS & TRANSACTIONS
  // ============================================================

  orders: defineTable({
    tenantId: v.id("tenants"),
    orderNumber: v.string(),
    orderType: v.string(), // gig, project
    clientId: v.optional(v.id("users")),
    freelancerId: v.optional(v.id("freelancerProfiles")),
    gigId: v.optional(v.id("gigs")),
    gigPackageId: v.optional(v.id("gigPackages")),
    projectId: v.optional(v.id("projects")),
    bidId: v.optional(v.id("bids")),
    title: v.string(),
    description: v.optional(v.string()),
    requirements: v.optional(v.string()),
    amount: v.number(),
    platformFee: v.number(),
    freelancerEarnings: v.number(),
    currency: v.optional(v.string()),
    deliveryDeadline: v.optional(v.number()),
    revisionCount: v.optional(v.number()),
    revisionsUsed: v.optional(v.number()),
    status: v.string(), // pending, active, delivered, revision_requested, completed, cancelled, disputed
    stripePaymentIntentId: v.optional(v.string()),
    stripeTransferId: v.optional(v.string()),
    escrowStatus: v.optional(v.string()), // held, released, refunded
    completedAt: v.optional(v.number()),
    cancelledAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_client", ["clientId"])
    .index("by_freelancer", ["freelancerId"])
    .index("by_status", ["status"])
    .index("by_orderNumber", ["orderNumber"]),

  orderMilestones: defineTable({
    orderId: v.id("orders"),
    title: v.string(),
    description: v.optional(v.string()),
    amount: v.number(),
    currency: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    status: v.string(), // pending, in_progress, delivered, approved, disputed
    stripePaymentIntentId: v.optional(v.string()),
    deliveredAt: v.optional(v.number()),
    approvedAt: v.optional(v.number()),
    sortOrder: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_order", ["orderId"]),

  orderDeliverables: defineTable({
    orderId: v.id("orders"),
    milestoneId: v.optional(v.id("orderMilestones")),
    uploadedBy: v.optional(v.id("users")),
    fileUrl: v.string(),
    fileName: v.string(),
    fileSize: v.optional(v.number()),
    fileType: v.optional(v.string()),
    description: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_order", ["orderId"]),

  transactions: defineTable({
    tenantId: v.id("tenants"),
    orderId: v.optional(v.id("orders")),
    milestoneId: v.optional(v.id("orderMilestones")),
    payerId: v.optional(v.id("users")),
    payeeId: v.optional(v.id("users")),
    amount: v.number(),
    platformFee: v.optional(v.number()),
    currency: v.optional(v.string()),
    transactionType: v.string(), // payment, payout, refund, platform_fee, dispute_hold
    stripePaymentIntentId: v.optional(v.string()),
    stripeTransferId: v.optional(v.string()),
    stripeRefundId: v.optional(v.string()),
    status: v.string(), // pending, completed, failed, refunded
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_order", ["orderId"])
    .index("by_status", ["status"]),

  // ============================================================
  // MARKETPLACE: REVIEWS & TRUST
  // ============================================================

  marketplaceReviews: defineTable({
    tenantId: v.id("tenants"),
    orderId: v.optional(v.id("orders")),
    reviewerId: v.optional(v.id("users")),
    revieweeId: v.optional(v.id("users")),
    reviewerRole: v.string(), // client, freelancer
    overallRating: v.number(),
    communicationRating: v.optional(v.number()),
    qualityRating: v.optional(v.number()),
    timelinessRating: v.optional(v.number()),
    valueRating: v.optional(v.number()),
    content: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_reviewee", ["revieweeId"])
    .index("by_order", ["orderId"]),

  disputes: defineTable({
    tenantId: v.id("tenants"),
    orderId: v.optional(v.id("orders")),
    openedBy: v.optional(v.id("users")),
    reason: v.string(), // non_delivery, quality_issue, scope_creep, payment_issue, other
    description: v.string(),
    evidence: v.optional(v.array(v.any())),
    resolution: v.optional(v.string()),
    resolutionNote: v.optional(v.string()),
    resolvedBy: v.optional(v.id("users")),
    status: v.string(), // open, under_review, resolved, escalated, closed
    openedAt: v.number(),
    resolvedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_order", ["orderId"])
    .index("by_status", ["status"]),

  // ============================================================
  // COMMUNICATION (replaces Socket.io)
  // ============================================================

  conversations: defineTable({
    tenantId: v.id("tenants"),
    orderId: v.optional(v.id("orders")),
    projectId: v.optional(v.id("projects")),
    participant1: v.id("users"),
    participant2: v.id("users"),
    lastMessageAt: v.optional(v.number()),
    lastMessagePreview: v.optional(v.string()),
    unreadCount1: v.optional(v.number()),
    unreadCount2: v.optional(v.number()),
    status: v.optional(v.string()), // active, archived, blocked
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_participant1", ["participant1"])
    .index("by_participant2", ["participant2"])
    .index("by_lastMessage", ["lastMessageAt"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    senderId: v.optional(v.id("users")),
    content: v.optional(v.string()),
    messageType: v.optional(v.string()), // text, file, system, order_update
    fileUrl: v.optional(v.string()),
    fileName: v.optional(v.string()),
    fileSize: v.optional(v.number()),
    isRead: v.optional(v.boolean()),
    createdAt: v.number(),
  }).index("by_conversation", ["conversationId", "createdAt"]),

  // ============================================================
  // NOTIFICATIONS
  // ============================================================

  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(), // order_placed, order_delivered, message_received, etc.
    title: v.string(),
    body: v.optional(v.string()),
    link: v.optional(v.string()),
    metadata: v.optional(v.any()),
    isRead: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_user_read", ["userId", "isRead"])
    .index("by_user", ["userId"]),

  // ============================================================
  // LOCAL SERVICES: QUOTES
  // ============================================================

  quoteRequests: defineTable({
    tenantId: v.id("tenants"),
    clientId: v.id("users"),
    categoryId: v.id("marketplaceCategories"),
    title: v.string(),
    description: v.string(),
    locationCity: v.optional(v.string()),
    locationPostcode: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    photos: v.optional(v.array(v.any())),
    budgetIndication: v.optional(v.string()),
    preferredDate: v.optional(v.number()),
    status: v.string(), // open, closed
    quoteCount: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_client", ["clientId"])
    .index("by_status", ["status"]),

  quotes: defineTable({
    quoteRequestId: v.id("quoteRequests"),
    freelancerId: v.id("freelancerProfiles"),
    amount: v.number(),
    currency: v.optional(v.string()),
    description: v.string(),
    estimatedDays: v.optional(v.number()),
    validUntil: v.optional(v.number()),
    status: v.string(), // pending, accepted, rejected
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_quoteRequest", ["quoteRequestId"])
    .index("by_freelancer", ["freelancerId"]),
});

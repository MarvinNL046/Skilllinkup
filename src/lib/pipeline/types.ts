export type PostCategory =
  | "platform-reviews"
  | "freelancing-tips"
  | "hiring-guide"
  | "industry-trends"
  | "tool-reviews"
  | "career-development"
  | "pricing-guides"
  | "remote-work";

export interface GeneratedPost {
  title: string;
  slug: string;
  content: string; // HTML (not Markdown!)
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  categorySlug: string;
  readTime: number;
  authorName: string;
  locale: "en" | "nl";
}

export interface FactCheckResult {
  totalClaims: number;
  verifiedClaims: number;
  unverifiedClaims: FactClaim[];
  riskLevel: "low" | "medium" | "high";
}

export interface FactClaim {
  type: "price" | "statistic" | "percentage" | "date";
  value: string;
  context: string;
  verified: boolean;
}

export interface PipelineResult {
  slug: string;
  title: string;
  riskLevel: string;
  locale: string;
  imageUrl: string | null;
  dryRun: boolean;
}

export interface TopicQueueItem {
  topic: string;
  category: PostCategory;
  priority: number;
  sources?: string[];
  searchQueries?: string[];
}

export interface TopicQueue {
  queue: TopicQueueItem[];
  completed: string[];
}

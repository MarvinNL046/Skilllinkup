/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ads from "../ads.js";
import type * as categories from "../categories.js";
import type * as chat_conversations from "../chat/conversations.js";
import type * as chat_messages from "../chat/messages.js";
import type * as comments from "../comments.js";
import type * as http from "../http.js";
import type * as marketplace_categories from "../marketplace/categories.js";
import type * as marketplace_disputes from "../marketplace/disputes.js";
import type * as marketplace_freelancers from "../marketplace/freelancers.js";
import type * as marketplace_gigs from "../marketplace/gigs.js";
import type * as marketplace_jobs from "../marketplace/jobs.js";
import type * as marketplace_notifications from "../marketplace/notifications.js";
import type * as marketplace_orders from "../marketplace/orders.js";
import type * as marketplace_projects from "../marketplace/projects.js";
import type * as marketplace_quotes from "../marketplace/quotes.js";
import type * as marketplace_reviews from "../marketplace/reviews.js";
import type * as platformReviews from "../platformReviews.js";
import type * as platforms from "../platforms.js";
import type * as posts from "../posts.js";
import type * as tools from "../tools.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ads: typeof ads;
  categories: typeof categories;
  "chat/conversations": typeof chat_conversations;
  "chat/messages": typeof chat_messages;
  comments: typeof comments;
  http: typeof http;
  "marketplace/categories": typeof marketplace_categories;
  "marketplace/disputes": typeof marketplace_disputes;
  "marketplace/freelancers": typeof marketplace_freelancers;
  "marketplace/gigs": typeof marketplace_gigs;
  "marketplace/jobs": typeof marketplace_jobs;
  "marketplace/notifications": typeof marketplace_notifications;
  "marketplace/orders": typeof marketplace_orders;
  "marketplace/projects": typeof marketplace_projects;
  "marketplace/quotes": typeof marketplace_quotes;
  "marketplace/reviews": typeof marketplace_reviews;
  platformReviews: typeof platformReviews;
  platforms: typeof platforms;
  posts: typeof posts;
  tools: typeof tools;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};

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
import type * as feedback from "../feedback.js";
import type * as http from "../http.js";
import type * as lib_authHelpers from "../lib/authHelpers.js";
import type * as lib_email from "../lib/email.js";
import type * as marketplace_categories from "../marketplace/categories.js";
import type * as marketplace_clients from "../marketplace/clients.js";
import type * as marketplace_dashboard from "../marketplace/dashboard.js";
import type * as marketplace_disputes from "../marketplace/disputes.js";
import type * as marketplace_experience from "../marketplace/experience.js";
import type * as marketplace_freelancers from "../marketplace/freelancers.js";
import type * as marketplace_gigs from "../marketplace/gigs.js";
import type * as marketplace_jobs from "../marketplace/jobs.js";
import type * as marketplace_leadPricing from "../marketplace/leadPricing.js";
import type * as marketplace_leads from "../marketplace/leads.js";
import type * as marketplace_notificationSettings from "../marketplace/notificationSettings.js";
import type * as marketplace_notifications from "../marketplace/notifications.js";
import type * as marketplace_orders from "../marketplace/orders.js";
import type * as marketplace_portfolio from "../marketplace/portfolio.js";
import type * as marketplace_projects from "../marketplace/projects.js";
import type * as marketplace_quotes from "../marketplace/quotes.js";
import type * as marketplace_reviews from "../marketplace/reviews.js";
import type * as marketplace_rewards from "../marketplace/rewards.js";
import type * as marketplace_savedItems from "../marketplace/savedItems.js";
import type * as platformReviews from "../platformReviews.js";
import type * as platforms from "../platforms.js";
import type * as posts from "../posts.js";
import type * as resources from "../resources.js";
import type * as tools from "../tools.js";
import type * as users from "../users.js";
import type * as waitlist from "../waitlist.js";

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
  feedback: typeof feedback;
  http: typeof http;
  "lib/authHelpers": typeof lib_authHelpers;
  "lib/email": typeof lib_email;
  "marketplace/categories": typeof marketplace_categories;
  "marketplace/clients": typeof marketplace_clients;
  "marketplace/dashboard": typeof marketplace_dashboard;
  "marketplace/disputes": typeof marketplace_disputes;
  "marketplace/experience": typeof marketplace_experience;
  "marketplace/freelancers": typeof marketplace_freelancers;
  "marketplace/gigs": typeof marketplace_gigs;
  "marketplace/jobs": typeof marketplace_jobs;
  "marketplace/leadPricing": typeof marketplace_leadPricing;
  "marketplace/leads": typeof marketplace_leads;
  "marketplace/notificationSettings": typeof marketplace_notificationSettings;
  "marketplace/notifications": typeof marketplace_notifications;
  "marketplace/orders": typeof marketplace_orders;
  "marketplace/portfolio": typeof marketplace_portfolio;
  "marketplace/projects": typeof marketplace_projects;
  "marketplace/quotes": typeof marketplace_quotes;
  "marketplace/reviews": typeof marketplace_reviews;
  "marketplace/rewards": typeof marketplace_rewards;
  "marketplace/savedItems": typeof marketplace_savedItems;
  platformReviews: typeof platformReviews;
  platforms: typeof platforms;
  posts: typeof posts;
  resources: typeof resources;
  tools: typeof tools;
  users: typeof users;
  waitlist: typeof waitlist;
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

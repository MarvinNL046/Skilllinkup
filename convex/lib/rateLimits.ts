import { HOUR, MINUTE, RateLimiter } from "@convex-dev/rate-limiter";
import { components } from "../_generated/api";

const DAY = 24 * HOUR;

export const rateLimiter = new RateLimiter(components.rateLimiter, {
  waitlistPerEmail: { kind: "fixed window", rate: 2, period: DAY },
  waitlistGlobal: { kind: "token bucket", rate: 500, period: HOUR, shards: 5 },
  jobApplication: { kind: "token bucket", rate: 20, period: DAY, capacity: 5 },
  projectProposal: { kind: "token bucket", rate: 20, period: DAY, capacity: 5 },
  localRequest: { kind: "token bucket", rate: 10, period: DAY, capacity: 3 },
  localQuote: { kind: "token bucket", rate: 30, period: DAY, capacity: 6 },
  trustReport: { kind: "token bucket", rate: 10, period: DAY, capacity: 3 },
  supportTicket: { kind: "token bucket", rate: 10, period: DAY, capacity: 3 },
  sendMessage: { kind: "token bucket", rate: 60, period: MINUTE, capacity: 20 },
});

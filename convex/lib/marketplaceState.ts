import { v } from "convex/values";

export const marketplaceRoleValidator = v.union(
  v.literal("client"),
  v.literal("freelancer"),
  v.literal("local_professional"),
  v.literal("candidate"),
  v.literal("company")
);

export const marketplaceWorldValidator = v.union(
  v.literal("online"),
  v.literal("local"),
  v.literal("jobs")
);

export const projectStatusValidator = v.union(
  v.literal("draft"),
  v.literal("open"),
  v.literal("in_progress"),
  v.literal("completed"),
  v.literal("cancelled"),
  v.literal("closed")
);

export const bidStatusValidator = v.union(
  v.literal("pending"),
  v.literal("accepted"),
  v.literal("rejected"),
  v.literal("withdrawn")
);

export const orderStatusValidator = v.union(
  v.literal("pending"),
  v.literal("active"),
  v.literal("in_progress"),
  v.literal("delivered"),
  v.literal("revision_requested"),
  v.literal("completed"),
  v.literal("cancelled"),
  v.literal("disputed")
);

export const orderTypeValidator = v.union(
  v.literal("gig"),
  v.literal("project"),
  v.literal("local"),
  v.literal("local_quote")
);

export const escrowStatusValidator = v.union(
  v.literal("beta_no_payment"),
  v.literal("held"),
  v.literal("released"),
  v.literal("refunded"),
  v.literal("disputed")
);

export const orderMilestoneStatusValidator = v.union(
  v.literal("pending"),
  v.literal("in_progress"),
  v.literal("delivered"),
  v.literal("approved"),
  v.literal("disputed")
);

export const transactionStatusValidator = v.union(
  v.literal("pending"),
  v.literal("completed"),
  v.literal("failed"),
  v.literal("refunded")
);

export const disputeReasonValidator = v.union(
  v.literal("non_delivery"),
  v.literal("quality_issue"),
  v.literal("scope_creep"),
  v.literal("payment_issue"),
  v.literal("other")
);

export const disputeStatusValidator = v.union(
  v.literal("open"),
  v.literal("under_review"),
  v.literal("resolved"),
  v.literal("escalated"),
  v.literal("closed")
);

export const disputeResolutionValidator = v.union(
  v.literal("freelancer_wins"),
  v.literal("client_wins"),
  v.literal("mutual_agreement"),
  v.literal("no_action")
);

export const freelancerProfileStatusValidator = v.union(
  v.literal("pending"),
  v.literal("active"),
  v.literal("suspended")
);

export const quoteRequestStatusValidator = v.union(
  v.literal("draft"),
  v.literal("open"),
  v.literal("matched"),
  v.literal("accepted"),
  v.literal("in_progress"),
  v.literal("completed"),
  v.literal("cancelled"),
  v.literal("closed")
);

export const quoteStatusValidator = v.union(
  v.literal("pending"),
  v.literal("accepted"),
  v.literal("rejected"),
  v.literal("withdrawn"),
  v.literal("expired")
);

export const localAppointmentStatusValidator = v.union(
  v.literal("requested"),
  v.literal("confirmed"),
  v.literal("in_progress"),
  v.literal("completed"),
  v.literal("cancelled"),
  v.literal("no_show")
);

export const jobStatusValidator = v.union(
  v.literal("draft"),
  v.literal("open"),
  v.literal("paused"),
  v.literal("closed"),
  v.literal("filled")
);

export const gigStatusValidator = v.union(
  v.literal("draft"),
  v.literal("pending"),
  v.literal("active"),
  v.literal("paused"),
  v.literal("rejected"),
  v.literal("deleted")
);

export const jobApplicationStatusValidator = v.union(
  v.literal("draft"),
  v.literal("submitted"),
  v.literal("screening"),
  v.literal("interview"),
  v.literal("offer"),
  v.literal("hired"),
  v.literal("rejected"),
  v.literal("withdrawn")
);

type TransitionMap<T extends string> = Readonly<Record<T, readonly T[]>>;

export const projectTransitions = {
  draft: ["open", "cancelled"],
  open: ["in_progress", "cancelled", "closed"],
  in_progress: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
  closed: ["open"],
} as const satisfies TransitionMap<
  "draft" | "open" | "in_progress" | "completed" | "cancelled" | "closed"
>;

export const bidTransitions = {
  pending: ["accepted", "rejected", "withdrawn"],
  accepted: [],
  rejected: [],
  withdrawn: [],
} as const satisfies TransitionMap<"pending" | "accepted" | "rejected" | "withdrawn">;

export const orderTransitions = {
  pending: ["active", "in_progress", "cancelled"],
  active: ["delivered", "cancelled", "disputed"],
  in_progress: ["delivered", "cancelled", "disputed"],
  delivered: ["completed", "revision_requested", "disputed"],
  revision_requested: ["delivered", "disputed"],
  completed: ["disputed"],
  cancelled: [],
  disputed: ["completed", "cancelled"],
} as const satisfies TransitionMap<
  "pending" | "active" | "in_progress" | "delivered" | "revision_requested" | "completed" | "cancelled" | "disputed"
>;

export const quoteRequestTransitions = {
  draft: ["open", "cancelled"],
  open: ["matched", "accepted", "cancelled", "closed"],
  matched: ["accepted", "cancelled", "closed"],
  accepted: ["in_progress", "cancelled"],
  in_progress: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
  closed: ["open"],
} as const satisfies TransitionMap<
  "draft" | "open" | "matched" | "accepted" | "in_progress" | "completed" | "cancelled" | "closed"
>;

export const quoteTransitions = {
  pending: ["accepted", "rejected", "withdrawn", "expired"],
  accepted: [],
  rejected: [],
  withdrawn: [],
  expired: [],
} as const satisfies TransitionMap<"pending" | "accepted" | "rejected" | "withdrawn" | "expired">;

export const localAppointmentTransitions = {
  requested: ["confirmed", "cancelled"],
  confirmed: ["in_progress", "completed", "cancelled", "no_show"],
  in_progress: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
  no_show: [],
} as const satisfies TransitionMap<
  "requested" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show"
>;

export const jobTransitions = {
  draft: ["open", "closed"],
  open: ["paused", "closed", "filled"],
  paused: ["open", "closed", "filled"],
  closed: ["open"],
  filled: [],
} as const satisfies TransitionMap<"draft" | "open" | "paused" | "closed" | "filled">;

export const jobApplicationTransitions = {
  draft: ["submitted", "withdrawn"],
  submitted: ["screening", "rejected", "withdrawn"],
  screening: ["interview", "offer", "rejected", "withdrawn"],
  interview: ["interview", "offer", "rejected", "withdrawn"],
  offer: ["hired", "rejected", "withdrawn"],
  hired: [],
  rejected: [],
  withdrawn: [],
} as const satisfies TransitionMap<
  "draft" | "submitted" | "screening" | "interview" | "offer" | "hired" | "rejected" | "withdrawn"
>;

export function assertTransition<T extends string>(
  transitions: TransitionMap<T>,
  current: T,
  next: T
) {
  if (current === next) return;
  if (!transitions[current].includes(next)) {
    throw new Error(`Invalid status transition: ${current} -> ${next}`);
  }
}

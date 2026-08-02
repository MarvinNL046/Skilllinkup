import { v } from "convex/values";

export const reportTargetTypeValidator = v.union(
  v.literal("user"),
  v.literal("freelancer"),
  v.literal("gig"),
  v.literal("project"),
  v.literal("job"),
  v.literal("quote_request"),
  v.literal("message"),
  v.literal("order")
);

export const reportReasonValidator = v.union(
  v.literal("spam"),
  v.literal("fraud"),
  v.literal("harassment"),
  v.literal("unsafe"),
  v.literal("misleading"),
  v.literal("illegal"),
  v.literal("other")
);

export const reportStatusValidator = v.union(
  v.literal("open"),
  v.literal("reviewing"),
  v.literal("resolved"),
  v.literal("dismissed")
);

export const supportCategoryValidator = v.union(
  v.literal("account"),
  v.literal("online_order"),
  v.literal("local_booking"),
  v.literal("job_application"),
  v.literal("safety"),
  v.literal("technical"),
  v.literal("other")
);

export const supportPriorityValidator = v.union(
  v.literal("normal"),
  v.literal("urgent")
);

export const supportStatusValidator = v.union(
  v.literal("open"),
  v.literal("in_progress"),
  v.literal("waiting_for_user"),
  v.literal("resolved"),
  v.literal("closed")
);

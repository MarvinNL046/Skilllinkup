import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();
crons.interval("Recover due email deliveries", { minutes: 3 }, internal.lib.emailDeliveryState.recoverDueDeliveries, {});
export default crons;

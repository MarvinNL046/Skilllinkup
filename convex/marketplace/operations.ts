import { v } from "convex/values";
import { query } from "../_generated/server";
import { requireAdmin } from "../lib/authHelpers";

const productMetricValidator = v.object({
  demand: v.number(),
  responses: v.number(),
  responseCoverageRate: v.union(v.number(), v.null()),
  commitments: v.number(),
  commitmentRate: v.union(v.number(), v.null()),
  completed: v.number(),
  cancelled: v.number(),
  completionRate: v.union(v.number(), v.null()),
  medianFirstResponseHours: v.union(v.number(), v.null()),
});

function rate(numerator: number, denominator: number) {
  return denominator > 0
    ? Math.round((numerator / denominator) * 1000) / 1000
    : null;
}

function medianHours(durations: number[]) {
  if (!durations.length) return null;
  const sorted = [...durations].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const milliseconds =
    sorted.length % 2
      ? sorted[middle]
      : (sorted[middle - 1] + sorted[middle]) / 2;
  return Math.round((milliseconds / 3_600_000) * 10) / 10;
}

export const getSnapshot = query({
  args: { windowDays: v.optional(v.number()) },
  returns: v.object({
    generatedAt: v.number(),
    windowStart: v.number(),
    windowDays: v.number(),
    sampleCapped: v.boolean(),
    online: productMetricValidator,
    local: productMetricValidator,
    jobs: productMetricValidator,
    trust: v.object({
      openReports: v.number(),
      openSupportTickets: v.number(),
      urgentSupportTickets: v.number(),
    }),
  }),
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);
    const windowDays = Math.min(
      Math.max(Math.floor(args.windowDays ?? 30), 7),
      90,
    );
    const generatedAt = Date.now();
    const windowStart = generatedAt - windowDays * 24 * 60 * 60 * 1000;
    const cap = 2_000;

    const [
      projectRows,
      bidRows,
      orderRows,
      requestRows,
      quoteRows,
      jobRows,
      applicationRows,
      reportRows,
      ticketRows,
    ] = await Promise.all([
      ctx.db.query("projects").order("desc").take(cap),
      ctx.db.query("bids").order("desc").take(cap),
      ctx.db.query("orders").order("desc").take(cap),
      ctx.db.query("quoteRequests").order("desc").take(cap),
      ctx.db.query("quotes").order("desc").take(cap),
      ctx.db.query("jobs").order("desc").take(cap),
      ctx.db.query("jobApplications").order("desc").take(cap),
      ctx.db.query("moderationReports").order("desc").take(cap),
      ctx.db.query("supportTickets").order("desc").take(cap),
    ]);

    const inWindow = <T extends { createdAt: number }>(row: T) =>
      row.createdAt >= windowStart;
    const projects = projectRows.filter(
      (row) =>
        row.tenantId === admin.tenantId &&
        inWindow(row) &&
        row.status !== "draft",
    );
    const projectIds = new Set(projects.map((row) => row._id));
    const bids = bidRows.filter(
      (row) => projectIds.has(row.projectId) && inWindow(row),
    );
    const onlineOrders = orderRows.filter(
      (row) =>
        row.tenantId === admin.tenantId &&
        inWindow(row) &&
        row.orderType !== "local_quote",
    );
    const projectsWithResponses = new Set(bids.map((row) => row.projectId));
    const committedProjectIds = new Set(
      onlineOrders.map((row) => row.projectId).filter(Boolean),
    );
    const onlineTerminal = onlineOrders.filter(
      (row) => row.status === "completed" || row.status === "cancelled",
    );
    const onlineFirstResponse = projects.flatMap((project) => {
      const first = bids
        .filter((bid) => bid.projectId === project._id)
        .sort((a, b) => a.createdAt - b.createdAt)[0];
      return first ? [Math.max(0, first.createdAt - project.createdAt)] : [];
    });

    const requests = requestRows.filter(
      (row) =>
        row.tenantId === admin.tenantId &&
        inWindow(row) &&
        row.status !== "draft",
    );
    const requestIds = new Set(requests.map((row) => row._id));
    const quotes = quoteRows.filter(
      (row) => requestIds.has(row.quoteRequestId) && inWindow(row),
    );
    const localOrders = orderRows.filter(
      (row) =>
        row.tenantId === admin.tenantId &&
        inWindow(row) &&
        row.orderType === "local_quote",
    );
    const requestsWithResponses = new Set(
      quotes.map((row) => row.quoteRequestId),
    );
    const committedRequestIds = new Set(
      localOrders.map((row) => row.quoteRequestId).filter(Boolean),
    );
    const localTerminal = localOrders.filter(
      (row) => row.status === "completed" || row.status === "cancelled",
    );
    const localFirstResponse = requests.flatMap((request) => {
      const first = quotes
        .filter((quote) => quote.quoteRequestId === request._id)
        .sort((a, b) => a.createdAt - b.createdAt)[0];
      return first ? [Math.max(0, first.createdAt - request.createdAt)] : [];
    });

    const jobs = jobRows.filter(
      (row) =>
        row.tenantId === admin.tenantId &&
        inWindow(row) &&
        row.status !== "draft",
    );
    const jobIds = new Set(jobs.map((row) => row._id));
    const applications = applicationRows.filter(
      (row) =>
        row.tenantId === admin.tenantId &&
        jobIds.has(row.jobId) &&
        inWindow(row),
    );
    const jobsWithResponses = new Set(applications.map((row) => row.jobId));
    const progressedStatuses = new Set([
      "screening",
      "interview",
      "offer",
      "hired",
      "rejected",
    ]);
    const progressedJobs = new Set(
      applications
        .filter((row) => progressedStatuses.has(row.status))
        .map((row) => row.jobId),
    );
    const hiredJobs = new Set(
      applications
        .filter((row) => row.status === "hired")
        .map((row) => row.jobId),
    );
    const terminalApplications = applications.filter((row) =>
      ["hired", "rejected", "withdrawn"].includes(row.status),
    );
    const jobFirstResponse = jobs.flatMap((job) => {
      const first = applications
        .filter((application) => application.jobId === job._id)
        .sort((a, b) => a.createdAt - b.createdAt)[0];
      return first ? [Math.max(0, first.createdAt - job.createdAt)] : [];
    });

    const reports = reportRows.filter(
      (row) => row.tenantId === admin.tenantId && inWindow(row),
    );
    const tickets = ticketRows.filter(
      (row) => row.tenantId === admin.tenantId && inWindow(row),
    );

    return {
      generatedAt,
      windowStart,
      windowDays,
      sampleCapped: [
        projectRows,
        bidRows,
        orderRows,
        requestRows,
        quoteRows,
        jobRows,
        applicationRows,
        reportRows,
        ticketRows,
      ].some((rows) => rows.length === cap),
      online: {
        demand: projects.length,
        responses: bids.length,
        responseCoverageRate: rate(projectsWithResponses.size, projects.length),
        commitments: committedProjectIds.size,
        commitmentRate: rate(committedProjectIds.size, projects.length),
        completed: onlineOrders.filter((row) => row.status === "completed")
          .length,
        cancelled: onlineOrders.filter((row) => row.status === "cancelled")
          .length,
        completionRate: rate(
          onlineOrders.filter((row) => row.status === "completed").length,
          onlineTerminal.length,
        ),
        medianFirstResponseHours: medianHours(onlineFirstResponse),
      },
      local: {
        demand: requests.length,
        responses: quotes.length,
        responseCoverageRate: rate(requestsWithResponses.size, requests.length),
        commitments: committedRequestIds.size,
        commitmentRate: rate(committedRequestIds.size, requests.length),
        completed: localOrders.filter((row) => row.status === "completed")
          .length,
        cancelled: localOrders.filter((row) => row.status === "cancelled")
          .length,
        completionRate: rate(
          localOrders.filter((row) => row.status === "completed").length,
          localTerminal.length,
        ),
        medianFirstResponseHours: medianHours(localFirstResponse),
      },
      jobs: {
        demand: jobs.length,
        responses: applications.length,
        responseCoverageRate: rate(jobsWithResponses.size, jobs.length),
        commitments: progressedJobs.size,
        commitmentRate: rate(progressedJobs.size, jobs.length),
        completed: hiredJobs.size,
        cancelled: applications.filter((row) => row.status === "withdrawn")
          .length,
        completionRate: rate(
          applications.filter((row) => row.status === "hired").length,
          terminalApplications.length,
        ),
        medianFirstResponseHours: medianHours(jobFirstResponse),
      },
      trust: {
        openReports: reports.filter(
          (row) => row.status === "open" || row.status === "reviewing",
        ).length,
        openSupportTickets: tickets.filter(
          (row) => !["resolved", "closed"].includes(row.status),
        ).length,
        urgentSupportTickets: tickets.filter(
          (row) =>
            row.priority === "urgent" &&
            !["resolved", "closed"].includes(row.status),
        ).length,
      },
    };
  },
});

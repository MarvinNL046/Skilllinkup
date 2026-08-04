import { v } from "convex/values";
import { mutation, query, MutationCtx, QueryCtx } from "../_generated/server";
import { Doc, Id } from "../_generated/dataModel";
import {
  getProviderProfile,
  requireAuthUser,
  requireMarketplaceContext,
} from "../lib/authHelpers";
import { notifyUser } from "../lib/notifications";
import {
  assertTransition,
  localAppointmentStatusValidator,
  localAppointmentTransitions,
  quoteRequestTransitions,
} from "../lib/marketplaceState";

async function requireAppointmentParty(
  ctx: QueryCtx | MutationCtx,
  appointmentId: Id<"localAppointments">
) {
  const user = await requireAuthUser(ctx);
  const appointment = await ctx.db.get(appointmentId);
  if (!appointment) throw new Error("Appointment not found.");
  const professional = await ctx.db.get(appointment.professionalId);
  const isClient = appointment.clientId === user._id;
  const isProfessional = professional?.userId === user._id;
  if (!isClient && !isProfessional && user.role !== "admin") throw new Error("Unauthorized.");
  if (isClient) {
    requireMarketplaceContext(user, "client", "local", "managing a local appointment");
  } else if (isProfessional) {
    requireMarketplaceContext(
      user,
      "local_professional",
      "local",
      "managing a local appointment",
    );
  }
  return { user, appointment, professional, isClient, isProfessional };
}

export const getByOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const appointment = await ctx.db
      .query("localAppointments")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .unique();
    if (!appointment) return null;
    const professional = await ctx.db.get(appointment.professionalId);
    if (
      appointment.clientId !== user._id &&
      professional?.userId !== user._id &&
      user.role !== "admin"
    ) throw new Error("Unauthorized.");
    return appointment;
  },
});

export const listMine = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const profile = await getProviderProfile(ctx, user._id, "local_professional");
    const limit = Math.min(Math.max(args.limit ?? 50, 1), 100);
    const [clientAppointments, professionalAppointments] = await Promise.all([
      ctx.db.query("localAppointments").withIndex("by_client", (q) => q.eq("clientId", user._id)).order("desc").take(limit),
      profile
        ? ctx.db.query("localAppointments").withIndex("by_professional", (q) => q.eq("professionalId", profile._id)).order("desc").take(limit)
        : Promise.resolve([]),
    ]);
    const unique = new Map<string, Doc<"localAppointments">>(
      [...clientAppointments, ...professionalAppointments].map((item) => [item._id, item])
    );
    return await Promise.all(
      [...unique.values()]
        .sort((a, b) => (b.scheduledStart ?? b.createdAt) - (a.scheduledStart ?? a.createdAt))
        .slice(0, limit)
        .map(async (appointment) => {
          const [request, professional] = await Promise.all([
            ctx.db.get(appointment.quoteRequestId),
            ctx.db.get(appointment.professionalId),
          ]);
          return {
            appointment,
            request: request ? { title: request.title, locationCity: request.locationCity } : null,
            professionalName: professional?.displayName ?? "Local professional",
            perspective: appointment.clientId === user._id ? "client" : "professional",
          };
        })
    );
  },
});

export const reschedule = mutation({
  args: {
    appointmentId: v.id("localAppointments"),
    scheduledStart: v.number(),
    scheduledEnd: v.optional(v.number()),
    note: v.optional(v.string()),
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const { user, appointment, isClient } = await requireAppointmentParty(ctx, args.appointmentId);
    if (["completed", "cancelled", "no_show"].includes(appointment.status)) throw new Error("This appointment is closed.");
    if (args.scheduledStart < Date.now() - 5 * 60 * 1000) throw new Error("Choose a future appointment time.");
    if (args.scheduledEnd !== undefined && args.scheduledEnd <= args.scheduledStart) throw new Error("The end time must be after the start time.");
    const note = args.note?.trim();
    if (note && note.length > 1000) throw new Error("Notes cannot exceed 1,000 characters.");
    await ctx.db.patch(appointment._id, {
      scheduledStart: args.scheduledStart,
      scheduledEnd: args.scheduledEnd,
      status: "requested",
      ...(isClient ? { clientNote: note } : { professionalNote: note }),
      confirmedAt: undefined,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

export const updateStatus = mutation({
  args: {
    appointmentId: v.id("localAppointments"),
    status: localAppointmentStatusValidator,
    note: v.optional(v.string()),
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const { appointment, professional, isClient, isProfessional, user } = await requireAppointmentParty(ctx, args.appointmentId);
    assertTransition(localAppointmentTransitions, appointment.status, args.status);
    if (args.status === "confirmed" && !isProfessional && user.role !== "admin") {
      throw new Error("The professional confirms the appointment.");
    }
    if (["in_progress", "completed", "no_show"].includes(args.status) && !isProfessional && user.role !== "admin") {
      throw new Error("Only the professional can update the service progress.");
    }
    if (args.status === "cancelled" && !isClient && !isProfessional && user.role !== "admin") {
      throw new Error("Unauthorized.");
    }
    const now = Date.now();
    const note = args.note?.trim();
    if (note && note.length > 1000) throw new Error("Notes cannot exceed 1,000 characters.");
    await ctx.db.patch(appointment._id, {
      status: args.status,
      ...(isClient ? { clientNote: note } : { professionalNote: note }),
      confirmedAt: args.status === "confirmed" ? now : appointment.confirmedAt,
      completedAt: args.status === "completed" ? now : appointment.completedAt,
      cancelledAt: args.status === "cancelled" ? now : appointment.cancelledAt,
      updatedAt: now,
    });
    const order = await ctx.db.get(appointment.orderId);
    const request = await ctx.db.get(appointment.quoteRequestId);
    if (args.status === "in_progress" && request?.status === "accepted") {
      assertTransition(quoteRequestTransitions, request.status, "in_progress");
      await ctx.db.patch(request._id, { status: "in_progress", updatedAt: now });
    }
    if (args.status === "completed") {
      if (request && request.status !== "completed") {
        if (request.status === "accepted") {
          await ctx.db.patch(request._id, { status: "in_progress", updatedAt: now });
        }
        const currentRequest = await ctx.db.get(appointment.quoteRequestId);
        if (currentRequest && currentRequest.status !== "completed") {
          assertTransition(quoteRequestTransitions, currentRequest.status, "completed");
          await ctx.db.patch(currentRequest._id, { status: "completed", updatedAt: now });
        }
      }
      if (order && !["completed", "cancelled"].includes(order.status)) {
        await ctx.db.patch(order._id, { status: "completed", completedAt: now, updatedAt: now });
      }
    }
    if (args.status === "cancelled") {
      if (request && !["completed", "cancelled"].includes(request.status)) {
        await ctx.db.patch(request._id, { status: "cancelled", updatedAt: now });
      }
      if (order && !["completed", "cancelled"].includes(order.status)) {
        await ctx.db.patch(order._id, { status: "cancelled", cancelledAt: now, updatedAt: now });
      }
    }
    const recipientId = isClient ? professional?.userId : appointment.clientId;
    if (recipientId && recipientId !== user._id) {
      await notifyUser(ctx, {
        userId: recipientId,
        type: "local_appointment_status",
        title: "Local appointment updated",
        body: `The appointment is now ${args.status.replaceAll("_", " ")}.`,
        link: `/orders/${appointment.orderId}`,
        metadata: { orderId: appointment.orderId, appointmentId: appointment._id, status: args.status },
      });
    }
    return { success: true };
  },
});

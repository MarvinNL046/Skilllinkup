import { getActiveRole } from "./accountContext.mjs";

export function getWorkspaceNextStep(order, context) {
  const link = (title, detail, label, href) => ({ title, detail, label, href });
  if (order.status === "cancelled") return link("Order cancelled", "Keep the files and conversation as a record of your agreement.", "View conversation", "#workspace-conversation");
  if (order.status === "disputed") return link("Order under review", "Keep relevant files and messages available while the issue is reviewed.", "Get support", "/dashboard/support");
  if (order.status === "completed") return link("Work completed", "Your shared files and conversation remain available below.", "View files", "#workspace-files");
  if (!context.matchesContext) return { title: "Switch account context", detail: `Choose ${context.requiredContext} in the account menu to update this order.` };
  if (context.isLocal) return link("Check your appointment", "Review the visit details and agree any changes in the conversation.", "View appointment", "#workspace-work");
  if (order.status === "delivered") return context.isClient
    ? link("Your delivery is ready to review", "Check the shared work, then approve the delivery or explain the changes you need.", "Review delivery", "#workspace-files")
    : link("Waiting for your client’s review", "Your work has been submitted. Keep any follow-up questions in the conversation.", "View conversation", "#workspace-conversation");
  if (order.status === "revision_requested") return context.isClient
    ? link("Revisions requested", "Your freelancer can update the work and submit a new delivery for review.", "View conversation", "#workspace-conversation")
    : link("Update the delivery", "Read the revision feedback, add your updated work and submit it for review.", "View feedback", "#workspace-conversation");
  if (["active", "in_progress"].includes(order.status)) return context.isClient
    ? link("Keep your project moving", "Share the brief and any missing information your freelancer needs.", "Add a brief or note", "#workspace-files")
    : link("Prepare your delivery", "Add your work and a delivery note. Submit it for review when it is ready.", "Add work", "#workspace-files");
  return link("Confirm the next steps together", "Use the conversation to check the scope and timing before starting work.", "Open conversation", "#workspace-conversation");
}

export function getOrderActionContext(order, user) {
  const isClient = Boolean(order && user?._id === order.clientId);
  const isLocal = ["local", "local_quote"].includes(order?.orderType);
  const role = isClient
    ? "client"
    : isLocal
      ? "local_professional"
      : "freelancer";
  const world = isLocal ? "local" : "online";
  return {
    isClient,
    isLocal,
    requiredContext: `${role.replaceAll("_", " ")} · ${world}`,
    matchesContext: Boolean(
      order &&
      user &&
      getActiveRole(user) === role &&
      user.preferredWorld === world,
    ),
  };
}

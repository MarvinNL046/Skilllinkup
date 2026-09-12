import { getActiveRole } from "./accountContext.mjs";

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

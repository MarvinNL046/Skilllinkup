import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

/**
 * Stripe webhook endpoint.
 * Receives Stripe events and updates order/payment status in Convex.
 */
http.route({
  path: "/stripe/webhook",
  method: "POST",
  handler: httpAction(async () => {
    return new Response("Deprecated webhook endpoint. Use /api/stripe/webhook.", {
      status: 410,
    });
  }),
});

export default http;

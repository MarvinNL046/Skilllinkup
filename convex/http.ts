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
  handler: httpAction(async (ctx, request) => {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Missing stripe-signature header", { status: 400 });
    }

    // TODO: Verify Stripe signature using webhook secret
    // For now, parse the event and process it
    let event;
    try {
      event = JSON.parse(body);
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    // Process different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // TODO: Call internal mutation to update order status
        console.log("Checkout completed:", session.id);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("Payment succeeded:", paymentIntent.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log("Payment failed:", paymentIntent.id);
        break;
      }

      case "account.updated": {
        // Stripe Connect account status change
        const account = event.data.object;
        console.log("Account updated:", account.id);
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    return new Response("OK", { status: 200 });
  }),
});

export default http;

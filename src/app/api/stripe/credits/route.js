import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Credit packages — must match convex/marketplace/leadPricing.ts CREDIT_PACKAGES
const CREDIT_PACKAGES = [
  { id: "starter", name: "Starter", credits: 5, priceEur: 25, priceCents: 2500 },
  { id: "popular", name: "Popular", credits: 10, priceEur: 45, priceCents: 4500 },
  { id: "pro", name: "Pro", credits: 25, priceEur: 99, priceCents: 9900 },
];

export async function POST(request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 503 }
    );
  }

  // Verify the caller is authenticated via Clerk — do not trust userId from client.
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const verifiedEmail = clerkUser.emailAddresses[0]?.emailAddress;
  if (!verifiedEmail) {
    return NextResponse.json(
      { error: "No verified email on account" },
      { status: 401 }
    );
  }

  // Resolve the Convex user from the server-verified email.
  const convexUser = await convex.query(api.users.getByEmail, {
    email: verifiedEmail,
  });
  if (!convexUser) {
    return NextResponse.json(
      { error: "User not found in database" },
      { status: 404 }
    );
  }
  const freelancerUserId = convexUser._id;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { packageId } = body;

  if (!packageId) {
    return NextResponse.json(
      { error: "Missing required fields: packageId" },
      { status: 400 }
    );
  }

  const pkg = CREDIT_PACKAGES.find((p) => p.id === packageId);
  if (!pkg) {
    return NextResponse.json(
      { error: `Invalid packageId: ${packageId}. Valid: starter, popular, pro` },
      { status: 400 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "ideal"],

      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: pkg.priceCents,
            product_data: {
              name: `${pkg.credits} Lead Credits (${pkg.name})`,
              description: `Purchase ${pkg.credits} credits for claiming leads on SkillLinkup Local Marketplace`,
            },
          },
          quantity: 1,
        },
      ],

      metadata: {
        type: "credit_purchase",
        packageId: pkg.id,
        credits: String(pkg.credits),
        freelancerUserId,
      },

      success_url: `${baseUrl}/dashboard/credits?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/dashboard/credits?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe/credits] Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

/**
 * Paid checkout is feature-gated until commission, protected-payment,
 * refund and legal-responsibility policies are approved. Service packages
 * use the authenticated Convex private-beta order flow in the meantime.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "Paid checkout is disabled during the free private beta. Start the package from its service page to open a free beta workspace.",
      code: "PRIVATE_BETA_FREE",
    },
    { status: 503 }
  );
}

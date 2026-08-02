import { NextResponse } from "next/server";

/**
 * Credit purchases are deliberately unavailable during the free private beta.
 * Keeping the endpoint closed server-side prevents an old UI or direct request
 * from starting a payment before the commercial and legal policy is approved.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "Credit purchases are disabled during the free private beta. Local leads can currently be claimed at no cost.",
      code: "PRIVATE_BETA_FREE",
    },
    { status: 503 }
  );
}

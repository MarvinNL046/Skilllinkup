import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { requireAuth } from '@/lib/auth-helpers';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface CheckoutRequestBody {
  gigSlug: string;
  packageId: string;
  locale: string;
  requirements?: string;
}

function calculatePlatformFee(amount: number): number {
  if (amount < 50) return Math.round(amount * 0.15 * 100) / 100;
  else if (amount <= 500) return Math.round(amount * 0.12 * 100) / 100;
  else return Math.round(amount * 0.10 * 100) / 100;
}

// POST /api/stripe/checkout
// Creates a Stripe PaymentIntent with escrow for a gig package purchase.
export async function POST(request: NextRequest) {
  try {
    // Authenticate the requesting user
    const user = await requireAuth();

    // Parse request body
    let body: CheckoutRequestBody;
    try {
      body = (await request.json()) as CheckoutRequestBody;
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { gigSlug, packageId, locale, requirements } = body;

    if (!gigSlug || !packageId || !locale) {
      return NextResponse.json(
        { error: 'gigSlug, packageId, and locale are required' },
        { status: 400 }
      );
    }

    // Fetch gig data from Convex
    const gig = await fetchQuery(api.marketplace.gigs.getBySlug, {
      slug: gigSlug,
      locale,
    });

    if (!gig) {
      return NextResponse.json({ error: 'Gig not found' }, { status: 404 });
    }

    if (gig.status !== 'active') {
      return NextResponse.json(
        { error: 'Gig is not available for purchase' },
        { status: 400 }
      );
    }

    // Prevent freelancer from purchasing their own gig.
    // gig.freelancerProfile contains the freelancer profile document.
    // We compare against the user's Convex ID if available, or by
    // checking the freelancer profile's userId against the Clerk user ID
    // stored as stackAuthId.
    const freelancerProfile = gig.freelancerProfile;
    if (freelancerProfile && (freelancerProfile as { stackAuthId?: string }).stackAuthId === user.id) {
      return NextResponse.json(
        { error: 'You cannot purchase your own gig' },
        { status: 400 }
      );
    }

    // Find the selected package from the gig's packages array
    const packages = gig.packages ?? [];
    const selectedPackage = packages.find(
      (pkg: { _id: string; price: number; currency?: string; deliveryDays: number; title: string }) =>
        pkg._id === packageId
    );
    if (!selectedPackage) {
      return NextResponse.json(
        { error: 'Selected package not found' },
        { status: 404 }
      );
    }

    // Calculate platform fee
    const platformFee = calculatePlatformFee(selectedPackage.price);

    // Get the freelancer's Stripe Connect account ID from the embedded profile
    const stripeAccountId =
      freelancerProfile &&
      typeof (freelancerProfile as { stripeAccountId?: string }).stripeAccountId === 'string'
        ? (freelancerProfile as { stripeAccountId: string }).stripeAccountId
        : null;

    if (!stripeAccountId) {
      return NextResponse.json(
        { error: 'Freelancer has not set up their payment account yet' },
        { status: 400 }
      );
    }

    // Create Stripe PaymentIntent with Connect destination charge
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(selectedPackage.price * 100), // convert to cents
      currency: (selectedPackage.currency ?? 'EUR').toLowerCase(),
      metadata: {
        gig_id: gig._id,
        gig_slug: gigSlug,
        package_id: packageId,
        client_id: user.id,
        // Store the freelancer profile Convex ID so the webhook can look it up
        freelancer_profile_id: gig.freelancerId,
        platform_fee: platformFee.toString(),
        requirements: requirements || '',
        locale: locale,
        delivery_days: selectedPackage.deliveryDays.toString(),
        gig_title: gig.title,
        package_title: selectedPackage.title,
      },
      // Platform takes the application_fee_amount, rest goes to the freelancer
      application_fee_amount: Math.round(platformFee * 100),
      transfer_data: {
        destination: stripeAccountId,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('POST /api/stripe/checkout error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

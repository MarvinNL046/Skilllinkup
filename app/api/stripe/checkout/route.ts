import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { getGigBySlug, calculatePlatformFee } from '@/lib/marketplace-queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface CheckoutRequestBody {
  gigSlug: string;
  packageId: string;
  locale: string;
  requirements?: string;
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

    // Fetch gig data
    const gig = await getGigBySlug(gigSlug, locale);
    if (!gig) {
      return NextResponse.json({ error: 'Gig not found' }, { status: 404 });
    }

    if (gig.status !== 'active') {
      return NextResponse.json(
        { error: 'Gig is not available for purchase' },
        { status: 400 }
      );
    }

    // Prevent freelancer from purchasing their own gig
    if (gig.freelancer_id === user.id) {
      return NextResponse.json(
        { error: 'You cannot purchase your own gig' },
        { status: 400 }
      );
    }

    // Find the selected package
    const selectedPackage = gig.packages.find((pkg) => pkg.id === packageId);
    if (!selectedPackage) {
      return NextResponse.json(
        { error: 'Selected package not found' },
        { status: 404 }
      );
    }

    // Calculate platform fee
    const platformFee = calculatePlatformFee(selectedPackage.price);

    // Fetch the freelancer's Stripe Connect account ID
    const freelancerRows = await sql`
      SELECT stripe_account_id
      FROM freelancer_profiles
      WHERE id = ${gig.freelancer_id}
      LIMIT 1
    `;

    const stripeAccountId =
      (freelancerRows[0]?.stripe_account_id as string | null) ?? null;

    if (!stripeAccountId) {
      return NextResponse.json(
        { error: 'Freelancer has not set up their payment account yet' },
        { status: 400 }
      );
    }

    // Create Stripe PaymentIntent with Connect destination charge
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(selectedPackage.price * 100), // convert to cents
      currency: selectedPackage.currency.toLowerCase(),
      metadata: {
        gig_id: gig.id,
        gig_slug: gigSlug,
        package_id: packageId,
        client_id: user.id,
        freelancer_id: gig.freelancer_id,
        platform_fee: platformFee.toString(),
        requirements: requirements || '',
        locale: locale,
        delivery_days: selectedPackage.delivery_days.toString(),
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

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { createNotification } from '@/lib/marketplace-queries';
import { sendEmailAsync } from '@/lib/send-email';
import { getUserContact } from '@/lib/get-user-email';
import { ReviewReceivedEmail } from '@/emails/review-received';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/marketplace/orders/[id]/review
 *
 * Returns reviews for the given order.
 * Blind review system: individual reviews are only visible AFTER
 * both parties have submitted (is_public = true on both).
 * The requesting user must be the client or freelancer on the order.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const user = await requireAuth();

    // Verify user is a party on this order
    const orderRows = await sql`
      SELECT
        o.id,
        o.client_id,
        o.freelancer_id,
        o.status,
        fp.user_id AS freelancer_user_id
      FROM orders o
      LEFT JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
      WHERE o.id = ${orderId}
      LIMIT 1
    `;

    if (!orderRows || orderRows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = orderRows[0];
    const isClient = order.client_id === user.id;
    const isFreelancer = order.freelancer_user_id === user.id;

    if (!isClient && !isFreelancer) {
      return NextResponse.json(
        { error: 'You are not authorized to view reviews for this order' },
        { status: 403 }
      );
    }

    // Count how many reviews have been submitted for this order
    const countRows = await sql`
      SELECT COUNT(*)::int AS total
      FROM marketplace_reviews
      WHERE order_id = ${orderId}
    `;
    const totalReviews = countRows[0]?.total ?? 0;

    // Fetch the current user's own review (always visible to them)
    const myReviewRows = await sql`
      SELECT
        mr.id,
        mr.reviewer_id,
        mr.reviewee_id,
        mr.reviewer_role,
        mr.overall_rating,
        mr.communication_rating,
        mr.quality_rating,
        mr.timeliness_rating,
        mr.value_rating,
        mr.content,
        mr.is_public,
        mr.created_at
      FROM marketplace_reviews mr
      WHERE mr.order_id = ${orderId}
        AND mr.reviewer_id = ${user.id}
      LIMIT 1
    `;

    const myReview: Record<string, unknown> | null = myReviewRows.length > 0 ? myReviewRows[0] : null;

    // The other party's review is only visible once both have submitted
    let otherReview: Record<string, unknown> | null = null;
    if (totalReviews >= 2) {
      const otherRows = await sql`
        SELECT
          mr.id,
          mr.reviewer_id,
          mr.reviewee_id,
          mr.reviewer_role,
          mr.overall_rating,
          mr.communication_rating,
          mr.quality_rating,
          mr.timeliness_rating,
          mr.value_rating,
          mr.content,
          mr.is_public,
          mr.created_at,
          u.name AS reviewer_name,
          u.image AS reviewer_avatar
        FROM marketplace_reviews mr
        JOIN users u ON mr.reviewer_id = u.id
        WHERE mr.order_id = ${orderId}
          AND mr.reviewer_id != ${user.id}
        LIMIT 1
      `;
      otherReview = otherRows.length > 0 ? (otherRows[0] as Record<string, unknown>) : null;
    }

    return NextResponse.json(
      {
        my_review: myReview,
        other_review: otherReview,
        total_reviews: totalReviews,
        both_submitted: totalReviews >= 2,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error('GET /api/marketplace/orders/[id]/review error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/marketplace/orders/[id]/review
 *
 * Submit a review for a completed order.
 * - Order must have status = 'completed'
 * - Caller must be the client or freelancer on the order
 * - Cannot submit a second review (UNIQUE constraint on order_id + reviewer_id)
 * - Ratings must be between 1 and 5
 * - After submission: updates freelancer rating stats
 * - If both reviews now exist: marks both as is_public = true
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const user = await requireAuth();

    const body = await request.json();
    const {
      overall_rating,
      communication_rating,
      quality_rating,
      timeliness_rating,
      value_rating,
      content,
    } = body as {
      overall_rating: number;
      communication_rating?: number;
      quality_rating?: number;
      timeliness_rating?: number;
      value_rating?: number;
      content?: string;
    };

    // Validate required field
    if (
      !overall_rating ||
      typeof overall_rating !== 'number' ||
      overall_rating < 1 ||
      overall_rating > 5
    ) {
      return NextResponse.json(
        { error: 'overall_rating is required and must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Validate optional ratings
    const optionalRatings = {
      communication_rating,
      quality_rating,
      timeliness_rating,
      value_rating,
    };
    for (const [key, val] of Object.entries(optionalRatings)) {
      if (val !== undefined && val !== null) {
        if (typeof val !== 'number' || val < 1 || val > 5) {
          return NextResponse.json(
            { error: `${key} must be between 1 and 5` },
            { status: 400 }
          );
        }
      }
    }

    // Validate content length
    if (content) {
      if (content.length < 20) {
        return NextResponse.json(
          { error: 'Review content must be at least 20 characters' },
          { status: 400 }
        );
      }
      if (content.length > 500) {
        return NextResponse.json(
          { error: 'Review content cannot exceed 500 characters' },
          { status: 400 }
        );
      }
    }

    // Fetch order to validate status and parties
    const orderRows = await sql`
      SELECT
        o.id,
        o.client_id,
        o.freelancer_id,
        o.title,
        o.status,
        o.tenant_id,
        fp.user_id AS freelancer_user_id
      FROM orders o
      LEFT JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
      WHERE o.id = ${orderId}
      LIMIT 1
    `;

    if (!orderRows || orderRows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = orderRows[0];

    // Order must be completed
    if (order.status !== 'completed') {
      return NextResponse.json(
        { error: 'You can only review completed orders' },
        { status: 400 }
      );
    }

    const isClient = order.client_id === user.id;
    const isFreelancer = order.freelancer_user_id === user.id;

    if (!isClient && !isFreelancer) {
      return NextResponse.json(
        { error: 'You are not a party on this order' },
        { status: 403 }
      );
    }

    // Determine reviewer_role and reviewee_id
    const reviewerRole = isClient ? 'client' : 'freelancer';
    const revieweeId = isClient
      ? (order.freelancer_user_id as string)
      : (order.client_id as string);

    // Attempt to insert (UNIQUE constraint will catch duplicate submissions)
    let newReview;
    try {
      const insertRows = await sql`
        INSERT INTO marketplace_reviews (
          tenant_id,
          order_id,
          reviewer_id,
          reviewee_id,
          reviewer_role,
          overall_rating,
          communication_rating,
          quality_rating,
          timeliness_rating,
          value_rating,
          content,
          is_public
        ) VALUES (
          ${order.tenant_id as string},
          ${orderId},
          ${user.id},
          ${revieweeId},
          ${reviewerRole},
          ${overall_rating},
          ${communication_rating ?? null},
          ${quality_rating ?? null},
          ${timeliness_rating ?? null},
          ${value_rating ?? null},
          ${content ?? null},
          false
        )
        RETURNING
          id,
          reviewer_id,
          reviewee_id,
          reviewer_role,
          overall_rating,
          communication_rating,
          quality_rating,
          timeliness_rating,
          value_rating,
          content,
          is_public,
          created_at
      `;
      newReview = insertRows[0];
    } catch (insertErr: unknown) {
      // Unique constraint violation = already reviewed
      const errMsg =
        insertErr instanceof Error ? insertErr.message : String(insertErr);
      if (errMsg.includes('marketplace_reviews_order_reviewer_unique')) {
        return NextResponse.json(
          { error: 'You have already submitted a review for this order' },
          { status: 409 }
        );
      }
      throw insertErr;
    }

    // Count reviews now submitted for this order
    const countRows = await sql`
      SELECT COUNT(*)::int AS total
      FROM marketplace_reviews
      WHERE order_id = ${orderId}
    `;
    const totalReviews = countRows[0]?.total ?? 0;
    const bothSubmitted = totalReviews >= 2;

    // If both parties reviewed, make both reviews public
    if (bothSubmitted) {
      await sql`
        UPDATE marketplace_reviews
        SET is_public = true, updated_at = NOW()
        WHERE order_id = ${orderId}
      `;
    }

    // Update freelancer's rating stats (based on reviews where reviewee = freelancer user)
    try {
      await sql`
        UPDATE freelancer_profiles
        SET
          rating_average = (
            SELECT ROUND(AVG(overall_rating)::numeric, 2)
            FROM marketplace_reviews
            WHERE reviewee_id = ${order.freelancer_user_id as string}
              AND is_public = true
          ),
          rating_count = (
            SELECT COUNT(*)::int
            FROM marketplace_reviews
            WHERE reviewee_id = ${order.freelancer_user_id as string}
              AND is_public = true
          ),
          updated_at = NOW()
        WHERE user_id = ${order.freelancer_user_id as string}
      `;
    } catch {
      // Skip if update fails
    }

    // Notify the reviewee that they received a review
    try {
      if (revieweeId) {
        await createNotification(
          revieweeId,
          'review_received',
          'You received a new review',
          `A review has been submitted for the order "${order.title as string}".`,
          `/en/dashboard/orders/${orderId}`
        );
      }
    } catch {
      // Skip notification failures
    }

    // Send review email to reviewee
    if (revieweeId) {
      const revieweeContact = await getUserContact(revieweeId);
      if (revieweeContact) {
        sendEmailAsync({
          to: revieweeContact.email,
          subject: 'You received a new review - SkillLinkup',
          react: ReviewReceivedEmail({
            userName: revieweeContact.name,
            orderTitle: order.title as string,
            rating: overall_rating,
            orderId,
          }),
        });
      }
    }

    return NextResponse.json(
      {
        review: newReview,
        both_submitted: bothSubmitted,
        message: bothSubmitted
          ? 'Both reviews are now public'
          : 'Review submitted. It will be visible once both parties have reviewed.',
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error('POST /api/marketplace/orders/[id]/review error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

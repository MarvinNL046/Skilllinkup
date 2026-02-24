import { auth, currentUser } from '@clerk/nextjs/server';

/**
 * Get the current user from Clerk session.
 * Returns user info from Clerk (server-side).
 *
 * NOTE: After Convex migration is complete, this will be replaced
 * with Convex queries. During transition, this provides the same
 * interface as the old Stack Auth helper.
 */
export async function getCurrentUser() {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) return null;

    return {
      id: userId,
      email,
      name: clerkUser.firstName
        ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim()
        : email.split('@')[0],
      image: clerkUser.imageUrl || null,
      // userType will come from Convex once migration is complete
      userType: (clerkUser.publicMetadata?.userType as string) || 'client',
      tenantId: null, // Will be resolved via Convex
    };
  } catch (e) {
    console.error('[auth-helpers] getCurrentUser error:', e);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  return user;
}

export async function requireFreelancer() {
  const user = await requireAuth();
  // TODO: Check freelancer profile in Convex once migration is complete
  if (user.userType !== 'freelancer') {
    throw new Error('No active freelancer profile');
  }
  return { user, profile: { id: user.id, status: 'active', stripe_onboarding_complete: false } };
}

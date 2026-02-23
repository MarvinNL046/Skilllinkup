import { auth } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return session.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  return user;
}

export async function requireFreelancer() {
  const user = await requireAuth();
  const profiles = await sql`
    SELECT id, status, stripe_onboarding_complete
    FROM freelancer_profiles WHERE user_id = ${user.id} AND status = 'active' LIMIT 1
  `;
  if (profiles.length === 0) throw new Error('No active freelancer profile');
  return { user, profile: profiles[0] };
}

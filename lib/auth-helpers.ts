import { getStackServerApp } from '@/lib/stack';
import { sql } from '@/lib/db';

/**
 * Get the current user from Stack Auth session and sync with local DB.
 * Returns the same shape as the old NextAuth-based helper:
 * { id, email, name, image, userType, tenantId }
 */
export async function getCurrentUser() {
  try {
    const stackUser = await getStackServerApp().getUser();
    if (!stackUser) return null;

    const email = stackUser.primaryEmail;
    if (!email) return null;

    const existing = await sql`
      SELECT id, email, name, image, user_type, tenant_id
      FROM users WHERE email = ${email} LIMIT 1
    `;

    if (existing.length > 0) {
      const u = existing[0];
      return {
        id: u.id,
        email: u.email,
        name: u.name || stackUser.displayName,
        image: u.image || stackUser.profileImageUrl,
        userType: u.user_type,
        tenantId: u.tenant_id,
      };
    }

    // Auto-create local user on first Stack Auth login
    const tenants = await sql`SELECT id FROM tenants LIMIT 1`;
    const tenantId = tenants[0]?.id;

    await sql`
      INSERT INTO users (email, name, image, user_type, tenant_id, role, email_verified)
      VALUES (
        ${email},
        ${stackUser.displayName || email.split('@')[0]},
        ${stackUser.profileImageUrl || null},
        'client',
        ${tenantId},
        'author',
        NOW()
      )
    `;

    const created = await sql`
      SELECT id, email, name, image, user_type, tenant_id
      FROM users WHERE email = ${email} LIMIT 1
    `;

    const u = created[0];
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      image: u.image,
      userType: u.user_type,
      tenantId: u.tenant_id,
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
  const profiles = await sql`
    SELECT id, status, stripe_onboarding_complete
    FROM freelancer_profiles WHERE user_id = ${user.id} AND status = 'active' LIMIT 1
  `;
  if (profiles.length === 0) throw new Error('No active freelancer profile');
  return { user, profile: profiles[0] };
}

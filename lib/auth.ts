import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { sql } from '@/lib/db';
import crypto from 'crypto';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const users = await sql`
          SELECT id, email, name, password_hash, user_type, image
          FROM users WHERE email = ${credentials.email as string} LIMIT 1
        `;
        if (users.length === 0) return null;

        const user = users[0];
        const hash = crypto.createHash('sha256').update(credentials.password as string).digest('hex');
        if (hash !== user.password_hash) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          userType: user.user_type,
        };
      },
    }),
  ],
  pages: {
    signIn: '/en/auth/signin',
    error: '/en/auth/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existing = await sql`SELECT id, user_type FROM users WHERE email = ${user.email} LIMIT 1`;

        if (existing.length === 0) {
          const tenants = await sql`SELECT id FROM tenants LIMIT 1`;
          const tenantId = tenants[0]?.id;
          await sql`
            INSERT INTO users (email, name, image, user_type, tenant_id, role, email_verified)
            VALUES (${user.email}, ${user.name}, ${user.image}, 'client', ${tenantId}, 'author', NOW())
          `;
        }

        const userId = existing.length > 0
          ? existing[0].id
          : (await sql`SELECT id FROM users WHERE email = ${user.email} LIMIT 1`)[0].id;

        const accountExists = await sql`
          SELECT id FROM accounts WHERE provider = ${account.provider} AND provider_account_id = ${account.providerAccountId} LIMIT 1
        `;
        if (accountExists.length === 0) {
          await sql`
            INSERT INTO accounts (user_id, type, provider, provider_account_id, access_token, refresh_token, expires_at)
            VALUES (${userId}, ${account.type}, ${account.provider}, ${account.providerAccountId},
                    ${account.access_token}, ${account.refresh_token}, ${account.expires_at})
          `;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await sql`SELECT id, user_type, tenant_id FROM users WHERE email = ${user.email} LIMIT 1`;
        if (dbUser.length > 0) {
          token.userId = dbUser[0].id;
          token.userType = dbUser[0].user_type;
          token.tenantId = dbUser[0].tenant_id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.userType = token.userType as string;
        session.user.tenantId = token.tenantId as string;
      }
      return session;
    },
  },
  session: { strategy: 'jwt' },
});

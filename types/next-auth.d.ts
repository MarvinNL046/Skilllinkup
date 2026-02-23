import 'next-auth';

declare module 'next-auth' {
  interface User {
    userType?: string;
    tenantId?: string;
  }
  interface Session {
    user: User & {
      id: string;
      userType: string;
      tenantId: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    userType?: string;
    tenantId?: string;
  }
}

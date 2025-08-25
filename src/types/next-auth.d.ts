import { DefaultSession, DefaultUser } from 'next-auth';
import { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      firmId?: string;
      locale: string;
      tz: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: UserRole;
    firmId?: string;
    locale: string;
    tz: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole;
    firmId?: string;
    locale: string;
    tz: string;
  }
}

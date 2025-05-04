import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from '../../../../../lib/prisma'
import { NextAuthOptions, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

type ExtendedUser = AdapterUser & { role?: string | null };

const authOptions: NextAuthOptions = {
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }: { session: Session; user: ExtendedUser }) {
      if (session.user) {
        session.user.role = user.role ?? null;
      }
      return session;
    },
  },
};

  
  // Export handlers individually
export const stuff = NextAuth(authOptions);
export {stuff as GET, stuff as POST};

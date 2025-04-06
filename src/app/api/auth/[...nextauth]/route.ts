import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from '../../../../../lib/prisma'

const authOptions = {
    providers: [
      Auth0({
        clientId: process.env.AUTH0_CLIENT_ID!,
        clientSecret: process.env.AUTH0_CLIENT_SECRET!,
        issuer: process.env.AUTH0_ISSUER_BASE_URL,
      }),
    ],
    adapter: PrismaAdapter(prisma),
  };
  
  // Export handlers individually
export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};

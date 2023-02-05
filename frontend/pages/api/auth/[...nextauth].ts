import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_URL,
  callbacks: {
    async session({ session, user, token }) {
      console.log("INSIDE OF THE SESSION CALLBACK");

      // Send properties to the client, like an access_token from a provider
      return { ...session, user: { ...session.user, ...user } };
    },
  }
})

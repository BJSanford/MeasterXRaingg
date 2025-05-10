import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Rain.gg username is passed via query param/session
      const rainUsername = credentials?.rainUsername;

      if (!rainUsername) {
        return false;
      }

      // Store Discord info + Rain.gg username in DB if not exists
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            rainUsername,
            verified: false,
          },
        });
      }

      return true;
    },
    async session({ session, token, user }) {
      // Attach verification status to session
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (dbUser) {
        session.user.verified = dbUser.verified;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
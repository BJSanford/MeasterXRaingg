import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Discord user ID
      name: string; // Discord username
    };
  }
}

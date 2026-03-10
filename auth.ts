import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
// import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email as string },
        });

        // if (user && bcrypt.compareSync(credentials?.password as string, user.password)) {
        if (user && (credentials?.password as string === user.password)) {
          return { id: user.id.toString(), name: user.name, email: user.email };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.BETTER_AUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },

});
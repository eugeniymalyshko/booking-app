import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";
import { compare } from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Login & Password",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Логін" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { login, password } = credentials ?? {};
        if (!login || !password) return null;

        const existingUser = await prisma.user.findUnique({
          where: { username },
        });
        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(password, existingUser.password);
        if (!passwordMatch) {
          return null;
        }

        return { id: existingUser.id, username: existingUser.username };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, existingUser }) {
      if (existingUser) {
        token.id = existingUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.existingUser.id = token.id;

      return session;
    },
  },
};

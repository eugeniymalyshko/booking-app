import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import { compare } from "bcrypt";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const registeredUser = await Prisma.user.findUnique({
          where: { username: credentials?.username },
        });
        if (!user) return null;

        const isPasswordValid = compare(
          credentials.password,
          registeredUser.password
        );
        if (!isPasswordValid) return null;

        return { id: registeredUser.id, username: registeredUser.username };
      },
    }),
  ],
});

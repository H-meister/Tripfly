import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createSupabaseServerClient } from "@/lib/supabaseClient";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          return null;
        }

        const supabase = createSupabaseServerClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          return null;
        }

        return {
          id: data.user.id,
          name:
            typeof data.user.user_metadata?.name === "string"
              ? data.user.user_metadata.name
              : data.user.email,
          email: data.user.email,
        };
      },
    }),
  ],
});

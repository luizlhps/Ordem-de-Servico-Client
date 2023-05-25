import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Cookies from "js-cookie";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "nextAuth",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          if (response.status !== 200) throw new Error("Usuario não encontrado.");

          const userData = await response.json();

          const authorization = { id: userData.accessToken };

          if (authorization.id) {
            return userData;
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.accessToken;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (!token.sub) {
        throw new Error("Sessão inválida.");
      }
      return { ...session, accessToken: token.sub };
    },
  },
});

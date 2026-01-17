// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "UAE Pass",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // MOCK USERS FOR DEMO
        // 1. Resident
        if (credentials?.email === "resident@uae.ae" && credentials?.password === "123") {
          return { id: "1", name: "Ahmed Al Mansoori", email: "resident@uae.ae", role: "resident" };
        }
        
        // 2. Employee (Admin)
        if (credentials?.email === "admin@gov.ae" && credentials?.password === "123") {
          return { id: "2", name: "Fatima Al Kaabi", email: "admin@gov.ae", role: "employee" };
        }

        return null; // Login failed
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add 'role' to the token so we can access it later
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      // Add 'role' to the session
      if (session.user) (session.user as any).role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
  }
});

export { handler as GET, handler as POST };
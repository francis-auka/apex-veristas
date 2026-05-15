import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email.toLowerCase() });

        if (!user) {
          throw new Error("No account found with that email address");
        }

        if (!user.isActive) {
          throw new Error("Your account has been deactivated. Contact support.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Incorrect password");
        }

        // Update last login timestamp
        user.lastLoginAt = new Date();
        await user.save();

        return {
          id:        user._id.toString(),
          email:     user.email,
          name:      `${user.firstName} ${user.lastName}`,
          role:      user.role,
          companyId: user.company?.toString() ?? null,
          avatarUrl: user.avatarUrl ?? null,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge:   30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id        = user.id;
        token.role      = (user as any).role;
        token.companyId = (user as any).companyId;
        token.avatarUrl = (user as any).avatarUrl;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id        = token.id as string;
        session.user.role      = token.role as string;
        session.user.companyId = token.companyId as string | null;
        session.user.avatarUrl = token.avatarUrl as string | null;
      }
      return session;
    },
  },

  pages: {
    signIn:      "/login",
    error:       "/login",    // redirect auth errors to login page
    signOut:     "/",
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
};

// Augment next-auth types so TypeScript knows about our custom fields
declare module "next-auth" {
  interface Session {
    user: {
      id:        string;
      email:     string;
      name:      string;
      role:      string;
      companyId: string | null;
      avatarUrl: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id:        string;
    role:      string;
    companyId: string | null;
    avatarUrl: string | null;
  }
}

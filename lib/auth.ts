import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: new Database("./sqlite.db"),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [nextCookies()],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      enabled: true,
      redirectURI: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/api/auth/callback/google`,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      enabled: true,
      redirectURI: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/api/auth/callback/github`,
    },
  },
  onAPIError: {
    throw: true,
    onError: (error, ctx) => {
      console.error("Auth error:", error);
      console.error("Context:", ctx);
    },
  },
});
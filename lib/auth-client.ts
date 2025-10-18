"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      console.error("Auth client error:", response.status, response.statusText);
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
      }
    },
  },
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;
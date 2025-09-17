"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthSessionProviders({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

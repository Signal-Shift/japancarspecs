"use client"

import * as React from "react"
import { SessionProvider } from "next-auth/react"

/** Limits SessionProvider to routes that use `next-auth/react` (e.g. signIn). */
export function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}

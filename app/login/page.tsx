import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Importer sign-in for JapanCarSpecs dashboard and API keys.",
}

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Sign in
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Access your organisation dashboard, API keys, and usage metrics.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
          <LoginForm />
        </Suspense>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        Ireland-first registration context, not legal advice. See{" "}
        <Link href="/faq" className="text-primary hover:underline">
          FAQ
        </Link>
        .
      </p>
    </div>
  )
}

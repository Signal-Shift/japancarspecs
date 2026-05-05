import type { Metadata } from "next"

import { SignupForm } from "@/components/signup-form"

export const metadata: Metadata = {
  title: "Create importer account",
  description:
    "Sign up your organisation for JapanCarSpecs API access and dashboard tools.",
}

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Create an importer account
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        One organisation per signup. You will be the owner and can issue API keys
        from the dashboard.
      </p>
      <div className="mt-8">
        <SignupForm />
      </div>
    </div>
  )
}

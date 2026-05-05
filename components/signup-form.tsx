"use client"

import * as React from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  FormFieldShell,
  FormSectionTitle,
} from "@/components/form-field-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function passwordStrengthLevel(password: string): 0 | 1 | 2 | 3 {
  if (password.length < 10) return 0
  let level = 1
  if (password.length >= 12) level++
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasDigit = /\d/.test(password)
  const hasSymbol = /[^\w\s]/.test(password)
  if ((hasLower && hasUpper) || hasDigit || hasSymbol) level++
  if (password.length >= 14 && (hasDigit || hasSymbol) && hasLower && hasUpper) {
    level++
  }
  return Math.min(3, level) as 0 | 1 | 2 | 3
}

export function SignupForm() {
  const router = useRouter()
  const [organizationName, setOrganizationName] = React.useState("")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  const pwdLevel = passwordStrengthLevel(password)
  const pwdLabel =
    password.length === 0
      ? ""
      : pwdLevel <= 1
        ? "Could be stronger"
        : pwdLevel === 2
          ? "Good"
          : "Strong"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: organizationName.trim(),
          name: name.trim() || undefined,
          email: email.trim(),
          password,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        error?: string
      }
      if (!res.ok) {
        setError(data.error ?? "Could not create account.")
        setPending(false)
        return
      }
      router.push("/login?registered=1")
      router.refresh()
    } catch {
      setError("Something went wrong. Try again.")
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <div className="space-y-4">
        <FormSectionTitle step="1" stepNumber={1} totalSteps={2}>
          Organisation
        </FormSectionTitle>
        <FormFieldShell className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-org">Organisation name</Label>
            <Input
              id="signup-org"
              autoComplete="organization"
              required
              className="rounded-md"
              value={organizationName}
              onChange={(ev) => setOrganizationName(ev.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-name">Your name (optional)</Label>
            <Input
              id="signup-name"
              autoComplete="name"
              className="rounded-md"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
        </FormFieldShell>
      </div>
      <div className="space-y-4">
        <FormSectionTitle step="2" stepNumber={2} totalSteps={2}>
          Account
        </FormSectionTitle>
        <FormFieldShell className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              required
              className="rounded-md"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="signup-password">Password</Label>
              {pwdLabel ? (
                <span
                  className={
                    pwdLevel <= 1
                      ? "text-xs text-amber-600 dark:text-amber-500"
                      : pwdLevel === 2
                        ? "text-xs text-primary"
                        : "text-xs text-emerald-600 dark:text-emerald-500"
                  }
                  aria-live="polite"
                >
                  {pwdLabel}
                </span>
              ) : null}
            </div>
            <Input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={10}
              className="rounded-md"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              aria-describedby="signup-password-hint"
            />
            <div
              className="flex gap-1.5 pt-0.5"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={3}
              aria-valuenow={pwdLevel}
              aria-label="Password strength"
            >
              {[1, 2, 3].map((segment) => (
                <span
                  key={segment}
                  className={
                    segment <= pwdLevel
                      ? pwdLevel <= 1
                        ? "h-1 flex-1 rounded-full bg-amber-500/90"
                        : pwdLevel === 2
                          ? "h-1 flex-1 rounded-full bg-primary/80"
                          : "h-1 flex-1 rounded-full bg-emerald-500/90"
                      : "h-1 flex-1 rounded-full bg-muted"
                  }
                />
              ))}
            </div>
            <p
              id="signup-password-hint"
              className="text-xs text-muted-foreground"
            >
              At least 10 characters. Use a unique password; we never show it
              again.
            </p>
          </div>
        </FormFieldShell>
      </div>
      <Button type="submit" className="w-full rounded-md" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Creating account
          </>
        ) : (
          "Create importer account"
        )}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}

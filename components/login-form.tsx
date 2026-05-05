"use client"

import * as React from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { FormFieldShell } from "@/components/form-field-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function safeInternalPath(path: string | null, fallback: string): string {
  if (!path) return fallback
  const t = path.trim()
  if (!t.startsWith("/") || t.startsWith("//") || t.includes("://")) {
    return fallback
  }
  return t
}

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = safeInternalPath(
    searchParams.get("callbackUrl"),
    "/dashboard"
  )

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      })
      if (result?.error) {
        setError("Invalid email or password.")
        setPending(false)
        return
      }
      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError("Something went wrong. Try again.")
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <FormFieldShell className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            required
            className="rounded-md"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            className="rounded-md"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
      </FormFieldShell>
      <Button type="submit" className="w-full rounded-md" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Signing in
          </>
        ) : (
          "Sign in"
        )}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}

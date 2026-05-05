import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { DashboardApiKeys } from "@/components/dashboard-api-keys"
import { Button } from "@/components/ui/button"
import { auth, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Importer dashboard: API keys and usage for JapanCarSpecs.",
}

async function signOutAction() {
  "use server"
  await signOut({ redirectTo: "/" })
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const orgId = session.user.orgId
  const org = orgId
    ? await prisma.organization.findUnique({ where: { id: orgId } })
    : null
  const usage = orgId
    ? await prisma.usageCounter.findUnique({ where: { organizationId: orgId } })
    : null

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Signed in as{" "}
            <span className="text-foreground">{session.user.email}</span>
          </p>
          {org ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Organisation:{" "}
              <span className="font-medium text-foreground">{org.name}</span> (
              <span className="font-mono text-xs">{org.slug}</span>)
            </p>
          ) : null}
        </div>
        <form action={signOutAction}>
          <Button type="submit" variant="outline" size="sm" className="rounded-md">
            Sign out
          </Button>
        </form>
      </div>

      <div className="mt-10 rounded-xl border border-border/80 bg-card/50 p-6">
        <h2 className="text-lg font-semibold text-foreground">Usage (stub API)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Count of{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">POST /api/v1/reports</code>{" "}
          calls for your organisation. Stripe metered billing can mirror this
          once products are configured.
        </p>
        <p className="mt-4 text-3xl font-semibold tabular-nums text-primary">
          {usage?.reportApiCalls ?? 0}
        </p>
      </div>

      <div className="mt-10">
        <DashboardApiKeys />
      </div>

      <div className="mt-10 text-sm text-muted-foreground">
        <p>
          OpenAPI:{" "}
          <Link href="/api/openapi" className="text-primary hover:underline">
            /api/openapi
          </Link>
        </p>
        <p className="mt-2">
          Read the{" "}
          <Link href="/importers" className="text-primary hover:underline">
            importers overview
          </Link>{" "}
          for product positioning in Ireland.
        </p>
      </div>
    </div>
  )
}

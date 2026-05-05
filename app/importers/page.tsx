import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Importers & API",
  description:
    "JDM Technical Data Reports for Irish importers: MLIT-backed fields where available, optional API access, and honest coverage metadata.",
}

export default function ImportersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium text-primary">For trade & volume buyers</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        JDM Technical Data Report, built for Ireland-first workflows
      </h1>
      <p className="mt-4 text-muted-foreground">
        JapanCarSpecs centres on a structured{" "}
        <strong className="font-medium text-foreground">
          JDM Technical Data Report
        </strong>
        : a technical data layout populated where Japanese MLIT bulk data
        supports each field. It is{" "}
        <strong className="font-medium text-foreground">
          not manufacturer paperwork from the OEM
        </strong>{" "}
        and not legal advice. Importers still need to satisfy Revenue, NCTS, and
        any type-approval path that applies to their vehicle.
      </p>
      <p className="mt-4 text-muted-foreground">
        <strong className="font-medium text-foreground">Core value</strong> for
        Irish registration packs: emissions and consumption facts (for example
        WLTC / JC08 CO₂ where present, combined fuel use, displacement, power,
        fuel type) with each field carrying coverage metadata (filled, partial,
        missing, not applicable, or service/admin).
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Card className="rounded-xl border-border/80 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base">Volume-friendly pricing</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Plans will follow a Stripe Billing model: committed tiers for
            low-to-high annual volumes plus metered usage aligned to API report
            requests. Checkout for retail reports stays available for one-offs.
          </CardContent>
        </Card>
        <Card className="rounded-xl border-border/80 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base">API (stub phase)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Authenticate with organisation API keys from the dashboard.{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              POST /api/v1/reports
            </code>{" "}
            returns a typed JSON contract today; a future gateway will attach
            live MLIT-backed population with no change to your integration
            shape.
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button nativeButton={false} render={<Link href="/signup" />} className="rounded-md">
          Create importer account
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/login" />}
          variant="outline"
          className="rounded-md"
        >
          Sign in
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/api/openapi" />}
          variant="ghost"
          className="rounded-md text-muted-foreground"
        >
          OpenAPI JSON
        </Button>
      </div>
    </div>
  )
}

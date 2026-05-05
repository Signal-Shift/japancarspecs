import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Sample report",
  description:
    "Illustrative layout of a JapanCarSpecs vehicle specification report (redacted).",
}

export default function SampleReportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium text-primary">Preview</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Sample specification report
      </h1>
      <p className="mt-4 text-muted-foreground">
        This page shows the <strong className="text-foreground">structure</strong>{" "}
        of a typical report. Figures below are fictional and redacted. Your real
        document is generated from the chassis you submit after payment.
      </p>

      <div className="mt-10 space-y-6">
        <Card className="rounded-xl border-border/80 bg-card/70">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-semibold">
              Vehicle summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm">
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Chassis / frame</dt>
                <dd className="mt-0.5 font-mono text-foreground">XXXX-*****</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Make / model / year</dt>
                <dd className="mt-0.5 text-foreground">
                  [Manufacturer] [Model] ([Year])
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Market</dt>
                <dd className="mt-0.5 text-foreground">Japan domestic (JDM)</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Report reference</dt>
                <dd className="mt-0.5 font-mono text-foreground">JCS-000000</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border/80 bg-card/70">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-semibold">
              Factory equipment & codes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <ul className="list-inside list-disc space-y-2">
              <li>Paint code: [redacted]</li>
              <li>Trim / interior code: [redacted]</li>
              <li>Engine & drivetrain summary (as recorded): [redacted]</li>
              <li>Notable factory options: [redacted]</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border/80 bg-card/70">
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base font-semibold">
              Notes for import / registration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            <p>
              Short factual notes where they help your agent or workshop, not
              legal advice. Your jurisdiction may require additional inspections
              or documents.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6">
        <p className="text-sm font-medium text-foreground">Order your own report</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your real chassis on the order form. We match data to that vehicle
          only.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            className="rounded-md"
          >
            Start from home
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/reports" />}
            variant="outline"
            className="rounded-md"
          >
            Go to order form
          </Button>
        </div>
      </div>
    </div>
  )
}

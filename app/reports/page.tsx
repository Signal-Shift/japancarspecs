"use client"

import { ReportForm } from "@/components/report-form"

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Order your report
        </h1>
        <p className="mt-3 text-muted-foreground">
          One clear price. No guesswork. We compile factory-correct specs and
          context for your chassis so you can buy, import, or insure with
          confidence.
        </p>
      </div>
      <ReportForm />
    </div>
  )
}

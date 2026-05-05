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
          Retail checkout for a chassis-led report. You get structured technical
          data with per-field coverage metadata (see our Ireland-first positioning
          sitewide). This is not a manufacturer paperwork pack from the OEM.
        </p>
      </div>
      <ReportForm />
    </div>
  )
}

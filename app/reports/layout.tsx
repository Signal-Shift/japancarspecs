import type { Metadata } from "next"

import { siteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Order a Japanese import specification report",
  description:
    "Pay securely and receive a chassis-based technical data report by email. Built for importers, dealers, and buyers who need factory-correct context before they commit.",
  alternates: {
    canonical: `${siteUrl}/reports/`,
  },
}

export default function ReportsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

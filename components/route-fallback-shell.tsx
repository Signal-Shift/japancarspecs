"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

type RouteFallbackShellProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Shared layout for error boundary and 404: brand link, spacing, max width.
 */
export function RouteFallbackShell({
  children,
  className,
}: RouteFallbackShellProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-lg px-4 py-24 text-center sm:px-6 sm:py-32",
        className
      )}
    >
      <p className="text-sm font-medium tracking-wide text-primary">
        <Link
          href="/"
          className="rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          JapanCarSpecs
        </Link>
      </p>
      {children}
    </div>
  )
}

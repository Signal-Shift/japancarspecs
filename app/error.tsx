"use client"

import * as React from "react"
import Link from "next/link"

import {
  BrokenCarIllustration,
  NounBrokenCarAttribution,
} from "@/components/broken-car-illustration"
import { RouteFallbackShell } from "@/components/route-fallback-shell"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <RouteFallbackShell>
      <div className="mt-6 flex justify-center opacity-90">
        <BrokenCarIllustration />
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 text-muted-foreground">
        An unexpected error occurred while loading this page. You can try
        again or return to the homepage.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Reference: {error.digest}
        </p>
      ) : null}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={() => reset()} className="rounded-md">
          Try again
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="outline"
          className="rounded-md"
        >
          Home
        </Button>
      </div>
      <NounBrokenCarAttribution />
    </RouteFallbackShell>
  )
}

import type { Metadata } from "next"
import Link from "next/link"

import {
  BrokenCarIllustration,
  NounBrokenCarAttribution,
} from "@/components/broken-car-illustration"
import { RouteFallbackShell } from "@/components/route-fallback-shell"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This JapanCarSpecs page does not exist or may have moved. Return home or order a specification report.",
}

export default function NotFound() {
  return (
    <RouteFallbackShell>
      <div className="mt-6 flex justify-center opacity-90">
        <BrokenCarIllustration />
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-muted-foreground">
        That page doesn&apos;t exist or the link may have moved. Check the URL
        or use the shortcuts below.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          className="rounded-md"
        >
          Home
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/reports/" />}
          variant="outline"
          className="rounded-md"
        >
          Order a report
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/contact/" />}
          variant="outline"
          className="rounded-md"
        >
          Contact
        </Button>
      </div>
      <NounBrokenCarAttribution />
    </RouteFallbackShell>
  )
}

import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About",
  description:
    "JapanCarSpecs helps buyers and importers get factory-correct specification reports for Japanese vehicles.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        About JapanCarSpecs
      </h1>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <p className="leading-relaxed">
          JapanCarSpecs exists for one job: turn a Japanese chassis into a
          clear, trustworthy specification report. We work with buyers,
          specialist dealers, and private importers who are tired of vague
          translations and forum guesses, especially when real money is on the
          line.
        </p>
        <p className="leading-relaxed">
          Our checkout flow uses{" "}
          <strong className="text-foreground">Stripe</strong> so payments are
          handled on industry-standard rails. Report delivery is automated: in
          most cases you will see your document by email within{" "}
          <strong className="text-foreground">five to ten minutes</strong> of
          successful payment.
        </p>
        <p className="leading-relaxed">
          This site is the public face of the service. Heavy lifting (order
          processing, data assembly, and delivery) runs on our own backend
          infrastructure so the frontend stays fast and easy to host anywhere.
        </p>
      </div>
      <div className="mt-10">
        <Button
          nativeButton={false}
          render={<Link href="/reports" />}
          className="rounded-md"
        >
          Request a report
        </Button>
      </div>
    </div>
  )
}

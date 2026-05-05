import type { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "FAQ",
  description:
    "JDM Technical Data Report, MLIT field coverage, Ireland-first context, importer API, pricing, and checkout.",
}

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What is a JDM Technical Data Report?",
    a: (
      <>
        A structured technical data report for a Japanese import. Each value
        carries{" "}
        <strong className="font-medium text-foreground">coverage metadata</strong>{" "}
        (filled, partial, missing, not applicable, or admin/service) so you can
        see where MLIT-sourced bulk data supports the row and where it does
        not. This is not manufacturer paperwork from the OEM and not Revenue or
        NCTS legal advice. Importers remain responsible for their own
        registration path in Ireland or elsewhere.
      </>
    ),
  },
  {
    q: "What am I buying (retail)?",
    a: "A vehicle specification report for a Japanese import, built around the chassis or frame number you provide. It is tailored to that car, not a generic brochure summary. Importers can consume the same JSON shape via API once integrated.",
  },
  {
    q: "How much does it cost?",
    a: (
      <>
        We show the exact price at Stripe Checkout before you pay. The site may
        display a guide figure (for example from €9.99); final amounts are
        confirmed in checkout.
      </>
    ),
  },
  {
    q: "How fast do I get the report?",
    a: "Most orders are emailed within 5 to 10 minutes of successful payment. Automated delivery runs 24/7; if you need a human, we respond during Irish business hours.",
  },
  {
    q: "Why do you need my chassis / VIN?",
    a: "Japanese listings and translations are easy to misread. The chassis ties the car to factory-correct trim, codes, and equipment so the report matches the vehicle you are actually buying.",
  },
  {
    q: "How do payments work?",
    a: "You pay through Stripe Checkout. Card details are handled by Stripe, not stored on our servers. You are redirected to their hosted payment page.",
  },
  {
    q: "What if my details are wrong?",
    a: "Double-check the chassis and email before you submit. If something in the report does not match what you ordered, contact us with your order reference and we will help.",
  },
  {
    q: "Do you store my data?",
    a: "We use what you submit to fulfil the report and operate the service. For legal detail, see our privacy policy when published; we do not sell your email for marketing without consent.",
  },
  {
    q: "Can I get a refund?",
    a: "Refund rules depend on what was delivered and whether work has started. Ask via the contact page with your payment reference; we will answer fairly and clearly.",
  },
  {
    q: "Do you fill every line my broker asks for?",
    a: "No. MLIT XLS and PDF bulk sources are strong on emissions and consumption (for example WLTC / JC08 CO₂, combined fuel use) and many engine identifiers, but they do not hold every technical field some registration packs ask for (noise, tyres, axle loads, OEM EU address, foreign type-approval numbers, and so on). We mark those as missing or partial rather than inventing them.",
  },
  {
    q: "How does the importer API work?",
    a: (
      <>
        Create an organisation account, issue an API key in the dashboard, and
        call{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">
          POST /api/v1/reports
        </code>{" "}
        with{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">
          Authorization: Bearer jcs_live_...
        </code>
        . Today the response is a validated stub that demonstrates the JSON
        contract; a future gateway will populate fields from MLIT-backed
        processing without breaking your integration shape. OpenAPI lives at{" "}
        <a href="/api/openapi" className="text-primary hover:underline">
          /api/openapi
        </a>
        .
      </>
    ),
  },
  {
    q: "Is this Ireland-specific?",
    a: "Our default copy and positioning are Ireland-first (Revenue / NCTS context) because that is where we are clearest today. The underlying technical layout stays portable so we can add other market footers later.",
  },
]

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Frequently asked questions
      </h1>
      <p className="mt-4 text-muted-foreground">
        Quick answers about ordering, delivery, and checkout. Still stuck?{" "}
        <Link href="/contact" className="text-primary hover:underline">
          Contact us
        </Link>
        .
      </p>

      <dl className="mt-12 space-y-10">
        {faqs.map((item) => (
          <div key={item.q}>
            <dt className="text-lg font-semibold text-foreground">{item.q}</dt>
            <dd className="mt-2 leading-relaxed text-muted-foreground">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 rounded-xl border border-border/80 bg-card/50 p-6">
        <p className="font-medium text-foreground">Ready to order?</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Start from the home page with make and model, or go straight to the
          full form.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            className="rounded-md"
          >
            Search make & model
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/reports" />}
            variant="outline"
            className="rounded-md"
          >
            Order form
          </Button>
        </div>
      </div>
    </div>
  )
}

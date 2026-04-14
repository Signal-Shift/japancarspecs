import type { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about JapanCarSpecs reports, pricing, delivery, and checkout.",
}

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What am I buying?",
    a: "A vehicle specification report for a Japanese import, built around the chassis or frame number you provide. It is tailored to that car — not a generic brochure summary.",
  },
  {
    q: "How much does it cost?",
    a: (
      <>
        We show the exact price at Stripe Checkout before you pay. The site may
        display a guide figure (for example from €29); final amounts are
        confirmed in checkout.
      </>
    ),
  },
  {
    q: "How fast do I get the report?",
    a: "Most orders are emailed within 5–10 minutes of successful payment. Automated delivery runs 24/7; if you need a human, we respond during Irish business hours.",
  },
  {
    q: "Why do you need my chassis / VIN?",
    a: "Japanese listings and translations are easy to misread. The chassis ties the car to factory-correct trim, codes, and equipment so the report matches the vehicle you are actually buying.",
  },
  {
    q: "How do payments work?",
    a: "You pay through Stripe Checkout. Card details are handled by Stripe — not stored on our servers. You are redirected to their hosted payment page.",
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
    a: "Refund rules depend on what was delivered and whether work has started. Ask via the contact page with your payment reference — we will answer fairly and clearly.",
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

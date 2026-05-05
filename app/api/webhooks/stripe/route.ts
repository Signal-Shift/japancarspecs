import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

/**
 * Stripe webhooks for Billing / metered usage. When STRIPE_WEBHOOK_SECRET is
 * unset, returns 503 so Stripe does not silently accept invalid setup.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (!secret) {
    return NextResponse.json(
      { error: "Webhook not configured (STRIPE_WEBHOOK_SECRET)." },
      { status: 503 }
    )
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim()
  if (!stripeKey) {
    return NextResponse.json(
      { error: "Stripe secret key not configured." },
      { status: 503 }
    )
  }

  const stripe = new Stripe(stripeKey)
  const rawBody = await req.text()
  const sig = req.headers.get("stripe-signature")
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "invoice.paid":
    case "invoice.payment_failed":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      // Hook for syncing subscription state and reconciling metered line items
      // (e.g. report API usage) once products are defined in Stripe Dashboard.
      break
    default:
      break
  }

  return NextResponse.json({ received: true })
}

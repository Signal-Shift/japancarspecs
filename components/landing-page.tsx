"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { HeroSearch } from "@/components/hero-search"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.45 },
}

export function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-[1fr,minmax(0,28rem)] lg:items-start lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl lg:pt-4"
          >
            <p className="text-sm font-medium tracking-wide text-primary">
              JapanCarSpecs
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Specification reports for Japanese imports —{" "}
              <span className="text-primary">minutes</span>, not weeks.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Submit your chassis details, pay securely, and get a detailed
              report by email. Built for importers, dealers, and enthusiasts who
              need facts before they wire money.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 lg:hidden">
              <Button
                nativeButton={false}
                render={<Link href="/sample" />}
                variant="outline"
                size="lg"
                className="rounded-md px-6"
              >
                Sample report
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/blog" />}
                variant="outline"
                size="lg"
                className="rounded-md px-6"
              >
                Read the blog
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:justify-self-end lg:w-full"
          >
            <HeroSearch />
            <div className="mt-4 hidden flex-wrap gap-3 lg:flex">
              <Button
                nativeButton={false}
                render={<Link href="/sample" />}
                variant="ghost"
                size="sm"
                className="rounded-md text-muted-foreground"
              >
                Sample report
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/blog" />}
                variant="ghost"
                size="sm"
                className="rounded-md text-muted-foreground"
              >
                Read the blog
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <motion.h2
          {...fadeUp}
          className="text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          How it works
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Three steps from chassis number to clarity — no accounts, no waiting
          on callbacks.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Submit details",
              body: "Tell us who you are, how to reach you, and the chassis / VIN plus make, model, and year.",
            },
            {
              step: "02",
              title: "Pay securely",
              body: "Checkout runs on Stripe. Your card never touches our servers — you’re redirected to their hosted flow.",
            },
            {
              step: "03",
              title: "Receive your report",
              body: "We email your specification report within minutes. Same-day peace of mind for your next bid or purchase.",
            },
          ].map((item, i) => (
            <motion.div key={item.step} {...fadeUp} transition={{ delay: i * 0.08 }}>
              <Card className="h-full rounded-xl border-border/80 bg-card/60">
                <CardHeader>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {item.step}
                  </p>
                  <CardTitle className="text-lg font-semibold">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-3">
          {[
            {
              title: "Instant payment",
              body: "Stripe Checkout — trusted, fast, and familiar to buyers worldwide.",
            },
            {
              title: "Delivered in minutes",
              body: "Typical turnaround is 5–10 minutes by email so you can move before the auction ends.",
            },
            {
              title: "Comprehensive specs",
              body: "Factory-correct equipment, codes, and context — not a vague one-page printout.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ delay: i * 0.06 }}
            >
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <motion.div
          {...fadeUp}
          className="flex flex-col gap-8 rounded-xl border border-border/80 bg-card/50 p-8 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              One product. One price.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Vehicle specification report — tailored to your chassis, with the
              level of detail you need to import, register, or negotiate. Full
              pricing appears at checkout when we launch live payments.{" "}
              <Link
                href="/sample"
                className="font-medium text-primary hover:underline"
              >
                See a sample layout
              </Link>
              .
            </p>
          </div>
          <div className="shrink-0 text-left md:text-right">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-primary">
              €9.99
            </p>
            <p className="text-xs text-muted-foreground">placeholder — TBC</p>
            <Button
              nativeButton={false}
              render={<Link href="/reports" />}
              className="mt-6 rounded-md"
            >
              Request a report
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

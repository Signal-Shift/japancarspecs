import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata = {
  title: "Contact",
  description: "Contact JapanCarSpecs for questions about specification reports.",
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Contact
          </h1>
          <p className="mt-4 text-muted-foreground">
            We are wiring up inbound messaging. For now, use the details below
            — or go straight to the report form if you are ready to order.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-medium text-foreground">Email</dt>
              <dd className="text-muted-foreground">
                <a
                  href="mailto:hello@japancarspecs.com"
                  className="text-primary hover:underline"
                >
                  hello@japancarspecs.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Hours</dt>
              <dd className="text-muted-foreground">
                Automated reports run 24/7. Human replies: Irish business hours.
              </dd>
            </div>
          </dl>
        </div>

        <Card className="rounded-xl border-border/80 bg-card/60">
          <CardHeader>
            <CardTitle className="text-lg">Send a message</CardTitle>
            <CardDescription>
              This form is a placeholder — submit is disabled until backend mail
              is connected.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" className="rounded-md" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                className="rounded-md"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                className="min-h-[120px] rounded-md"
                disabled
              />
            </div>
            <Button type="button" className="rounded-md" disabled>
              Coming soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

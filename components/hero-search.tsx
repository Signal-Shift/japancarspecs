"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getModelYearOptions } from "@/lib/vehicle-years"

const yearOptions = getModelYearOptions()

export function HeroSearch() {
  const router = useRouter()
  const [make, setMake] = React.useState("")
  const [model, setModel] = React.useState("")
  const [year, setYear] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!make.trim() || !model.trim()) {
      setError("Enter both make and model to continue.")
      return
    }
    const params = new URLSearchParams()
    params.set("make", make.trim())
    params.set("model", model.trim())
    if (year) params.set("year", year)
    router.push(`/reports?${params.toString()}`)
  }

  return (
    <Card className="mt-10 max-w-lg rounded-xl border-border/80 bg-card/90 shadow-lg">
      <CardContent className="pt-6">
        <form onSubmit={handleContinue} className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">
              Start your report            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              This pre-fills the order form — it does not run a free lookup. You
              still add chassis details and pay at checkout.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hero-make">Manufacturer</Label>
              <Input
                id="hero-make"
                placeholder="e.g. Toyota"
                className="rounded-md"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                autoComplete="organization"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hero-model">Model</Label>
              <Input
                id="hero-model"
                placeholder="e.g. Supra"
                className="rounded-md"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hero-year">Year (optional)</Label>
              <Select
                value={year}
                onValueChange={(v) => setYear(typeof v === "string" ? v : null)}
              >
                <SelectTrigger id="hero-year" className="w-full rounded-md">
                  <SelectValue placeholder="Select year if known" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full rounded-md sm:w-auto">
            Continue to order report
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

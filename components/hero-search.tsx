"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getMakeOptions, getModelOptions } from "@/lib/vehicle-catalog"
import { getModelYearOptions } from "@/lib/vehicle-years"

const yearOptions = getModelYearOptions()

export function HeroSearch() {
  const router = useRouter()
  const [make, setMakeInternal] = React.useState("")
  const [model, setModelInternal] = React.useState("")

  const setMake = React.useCallback((value: string) => {
    setMakeInternal(value)
    setModelInternal("")
  }, [])

  const setModel = React.useCallback((value: string) => {
    setModelInternal(value)
  }, [])

  const makeOptions = React.useMemo(() => getMakeOptions(), [])
  const modelOptions = React.useMemo(
    () => getModelOptions(make),
    [make]
  )
  const [year, setYear] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!make.trim() || !model.trim()) {
      setError("Select both manufacturer and model to continue.")
      return
    }
    const params = new URLSearchParams()
    params.set("make", make.trim())
    params.set("model", model.trim())
    if (year.trim()) params.set("year", year.trim())
    router.push(`/reports?${params.toString()}`)
  }

  return (
    <Card className="mt-10 max-w-lg rounded-xl border-border/80 bg-card/90 shadow-lg">
      <CardContent className="pt-6">
        <form onSubmit={handleContinue} className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">
              Start your report
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Vehicle look up, search by Manufacturer and Model to match your exact vehicle.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hero-make">Manufacturer</Label>
              <Select
                value={make}
                onValueChange={(v) => setMake(typeof v === "string" ? v : "")}
              >
                <SelectTrigger id="hero-make" className="w-full rounded-md">
                  <SelectValue placeholder="Select manufacturer" />
                </SelectTrigger>
                <SelectContent>
                  {makeOptions.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hero-model">Model</Label>
              <Select
                value={model}
                onValueChange={(v) => setModel(typeof v === "string" ? v : "")}
                disabled={!make}
              >
                <SelectTrigger id="hero-model" className="w-full rounded-md">
                  <SelectValue
                    placeholder={
                      make ? "Select model" : "Select manufacturer first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {modelOptions.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hero-year">Year (optional)</Label>
              <Select
                value={year}
                onValueChange={(v) =>
                  setYear(typeof v === "string" ? v : "")
                }
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

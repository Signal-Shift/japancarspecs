"use client"

import * as React from "react"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { submitReportRequest } from "@/lib/api"
import type { ReportFormData } from "@/lib/types"
import {
  getMakeOptionsWithCurrent,
  getModelOptionsWithCurrent,
} from "@/lib/vehicle-catalog"
import { getModelYearOptions, isValidModelYear } from "@/lib/vehicle-years"
import { FormFieldShell, FormSectionTitle } from "@/components/form-field-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const yearOptions = getModelYearOptions()

const reportFormSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  chassisNumber: z
    .string()
    .min(4, "Chassis / VIN is too short")
    .max(32, "Chassis / VIN is too long"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Select a year"),
  notes: z.string().optional(),
})

type ReportFormValues = z.infer<typeof reportFormSchema>

const defaultFormValues: ReportFormValues = {
  fullName: "",
  email: "",
  chassisNumber: "",
  make: "",
  model: "",
  year: "",
  notes: "",
}

function ariaDescribedBy(
  ...ids: Array<string | undefined | false | null>
): string | undefined {
  const joined = ids.filter(Boolean).join(" ").trim()
  return joined === "" ? undefined : joined
}

function ReportFormFields() {
  const searchParams = useSearchParams()
  const prefilledRef = React.useRef(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const fid = React.useId()

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: defaultFormValues,
  })

  React.useEffect(() => {
    if (prefilledRef.current) return
    const make = searchParams.get("make")?.trim()
    const model = searchParams.get("model")?.trim()
    const yearParam = searchParams.get("year")?.trim()
    if (!make && !model && !yearParam) return

    const year =
      yearParam && isValidModelYear(yearParam) ? yearParam : defaultFormValues.year

    form.reset({
      ...defaultFormValues,
      ...(make ? { make } : {}),
      ...(model ? { model } : {}),
      ...(year ? { year } : {}),
    })
    prefilledRef.current = true
  }, [searchParams, form])

  async function onSubmit(values: ReportFormValues) {
    setSubmitError(null)
    try {
      const payload: ReportFormData = {
        fullName: values.fullName,
        email: values.email,
        chassisNumber: values.chassisNumber,
        make: values.make,
        model: values.model,
        year: values.year,
        notes: values.notes || undefined,
      }
      const result = await submitReportRequest(payload)
      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl
        return
      }
      setSubmitError(
        result.success === false
          ? result.error
          : "Checkout could not be started. Please try again."
      )
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or contact us if it keeps happening."
      )
    }
  }

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form

  const watchedChassis = watch("chassisNumber") ?? ""
  const watchedMake = watch("make")
  const watchedModel = watch("model")

  const makeOptions = React.useMemo(
    () => getMakeOptionsWithCurrent(watchedMake ?? ""),
    [watchedMake]
  )

  const modelOptions = React.useMemo(
    () =>
      getModelOptionsWithCurrent(watchedMake ?? "", watchedModel ?? ""),
    [watchedMake, watchedModel]
  )

  const fullNameId = `${fid}-fullName`
  const fullNameErrorId = `${fid}-fullName-error`
  const emailId = `${fid}-email`
  const emailErrorId = `${fid}-email-error`
  const chassisId = `${fid}-chassis`
  const chassisCounterId = `${fid}-chassis-counter`
  const chassisErrorId = `${fid}-chassis-error`
  const makeId = `${fid}-make`
  const makeErrorId = `${fid}-make-error`
  const modelId = `${fid}-model`
  const modelErrorId = `${fid}-model-error`
  const yearId = `${fid}-year`
  const yearErrorId = `${fid}-year-error`
  const notesId = `${fid}-notes`

  return (
    <Card className="mx-auto max-w-xl rounded-xl border-border/80 bg-card/80 shadow-lg transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight">
          Request a specification report
        </CardTitle>
        <CardDescription>
          Tell us about the vehicle. After you submit, you&apos;ll be redirected
          to secure checkout. Your report arrives by email shortly after
          payment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
          noValidate
        >
          <div className="space-y-4">
            <FormSectionTitle step="1" stepNumber={1} totalSteps={3}>
              Your details
            </FormSectionTitle>
            <FormFieldShell className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor={fullNameId}>Full name</Label>
                <Input
                  id={fullNameId}
                  className="rounded-md"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={ariaDescribedBy(
                    errors.fullName && fullNameErrorId
                  )}
                  {...register("fullName")}
                />
                {errors.fullName ? (
                  <p
                    id={fullNameErrorId}
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.fullName.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor={emailId}>Email address</Label>
                <Input
                  id={emailId}
                  type="email"
                  autoComplete="email"
                  className="rounded-md"
                  aria-invalid={!!errors.email}
                  aria-describedby={ariaDescribedBy(
                    errors.email && emailErrorId
                  )}
                  {...register("email")}
                />
                {errors.email ? (
                  <p
                    id={emailErrorId}
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                ) : null}
              </div>
            </FormFieldShell>
          </div>

          <div className="space-y-4">
            <FormSectionTitle step="2" stepNumber={2} totalSteps={3}>
              Vehicle
            </FormSectionTitle>
            <FormFieldShell className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor={chassisId}>Chassis number / VIN</Label>
                  <span
                    id={chassisCounterId}
                    className="text-xs tabular-nums text-muted-foreground"
                    aria-live="polite"
                  >
                    {watchedChassis.length} / 32
                  </span>
                </div>
                <Input
                  id={chassisId}
                  className="rounded-md font-mono text-sm"
                  placeholder="e.g. JZA80-00xxxx"
                  aria-invalid={!!errors.chassisNumber}
                  aria-describedby={ariaDescribedBy(
                    chassisCounterId,
                    errors.chassisNumber && chassisErrorId
                  )}
                  {...register("chassisNumber")}
                />
                {errors.chassisNumber ? (
                  <p
                    id={chassisErrorId}
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.chassisNumber.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={makeId}>Make</Label>
                  <Controller
                    name="make"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(v) => {
                          field.onChange(typeof v === "string" ? v : "")
                          setValue("model", "")
                        }}
                      >
                        <SelectTrigger
                          id={makeId}
                          className="w-full rounded-md"
                          aria-invalid={!!errors.make}
                          aria-describedby={ariaDescribedBy(
                            errors.make && makeErrorId
                          )}
                        >
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
                    )}
                  />
                  {errors.make ? (
                    <p
                      id={makeErrorId}
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.make.message}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={modelId}>Model</Label>
                  <Controller
                    name="model"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(v) =>
                          field.onChange(typeof v === "string" ? v : "")
                        }
                        disabled={!watchedMake}
                      >
                        <SelectTrigger
                          id={modelId}
                          className="w-full rounded-md"
                          aria-invalid={!!errors.model}
                          aria-describedby={ariaDescribedBy(
                            errors.model && modelErrorId
                          )}
                        >
                          <SelectValue
                            placeholder={
                              watchedMake
                                ? "Select model"
                                : "Select manufacturer first"
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
                    )}
                  />
                  {errors.model ? (
                    <p
                      id={modelErrorId}
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {errors.model.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={yearId}>Year</Label>
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(v) =>
                        field.onChange(
                          typeof v === "string" ? v : String(v ?? "")
                        )
                      }
                    >
                      <SelectTrigger
                        id={yearId}
                        className="w-full rounded-md"
                        aria-invalid={!!errors.year}
                        aria-describedby={ariaDescribedBy(
                          errors.year && yearErrorId
                        )}
                      >
                        <SelectValue placeholder="Select model year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((y) => (
                          <SelectItem key={y} value={y}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.year ? (
                  <p
                    id={yearErrorId}
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    {errors.year.message}
                  </p>
                ) : null}
              </div>
            </FormFieldShell>
          </div>

          <div className="space-y-4">
            <FormSectionTitle step="3" stepNumber={3} totalSteps={3}>
              Anything else?
            </FormSectionTitle>
            <FormFieldShell>
              <div className="space-y-2">
                <Label htmlFor={notesId}>Additional notes (optional)</Label>
                <Textarea
                  id={notesId}
                  className="min-h-[100px] rounded-md"
                  placeholder="Auction grade, mileage claims, or anything we should double-check..."
                  {...register("notes")}
                />
              </div>
            </FormFieldShell>
          </div>

          {submitError ? (
            <p className="text-sm text-destructive" role="alert">
              {submitError}
            </p>
          ) : null}

          <Button
            type="submit"
            className="w-full rounded-md sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Processing
              </>
            ) : (
              "Continue to checkout"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function ReportFormFallback() {
  return (
    <Card className="mx-auto max-w-xl rounded-xl border-border/80 bg-card/80 shadow-lg">
      <CardContent className="py-12 text-center text-sm text-muted-foreground">
        Loading form…
      </CardContent>
    </Card>
  )
}

export function ReportForm() {
  return (
    <Suspense fallback={<ReportFormFallback />}>
      <ReportFormFields />
    </Suspense>
  )
}

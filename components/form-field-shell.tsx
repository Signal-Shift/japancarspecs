import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Wraps one or more controls so the group gets a subtle border and background
 * lift on focus-within (keyboard and mouse).
 */
export function FormFieldShell({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/70 bg-muted/15 p-4 shadow-sm transition-[border-color,box-shadow,background-color] duration-200",
        "focus-within:border-primary/45 focus-within:bg-primary/[0.06] focus-within:shadow-md focus-within:shadow-primary/[0.07]",
        className
      )}
    >
      {children}
    </div>
  )
}

export function FormSectionTitle({
  step,
  stepNumber,
  totalSteps,
  children,
}: {
  step: string
  stepNumber?: number
  totalSteps?: number
  children: React.ReactNode
}) {
  const showStepContext =
    typeof stepNumber === "number" &&
    typeof totalSteps === "number" &&
    stepNumber >= 1 &&
    totalSteps >= stepNumber

  return (
    <div className="flex items-baseline gap-3 border-b border-border/60 pb-2">
      <span
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold tabular-nums text-primary"
        aria-hidden
      >
        {step}
      </span>
      <h2 className="text-sm font-semibold tracking-tight text-foreground">
        {showStepContext ? (
          <span className="sr-only">
            Step {stepNumber} of {totalSteps}:{" "}
          </span>
        ) : null}
        {children}
      </h2>
    </div>
  )
}

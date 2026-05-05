import { z } from "zod"

/** Maps to product legend: filled, partial, missing, not_applicable, admin_only. */
export const tdrFieldCoverageSchema = z.enum([
  "filled",
  "partial",
  "missing",
  "not_applicable",
  "admin_only",
])

export type TdrFieldCoverage = z.infer<typeof tdrFieldCoverageSchema>

export const tdrFieldSourceSchema = z.enum([
  "mlit_xls",
  "mlit_pdf_low_emission",
  "derived_mapping",
  "importer_supplied",
  "service_generated",
  "none",
])

export type TdrFieldSource = z.infer<typeof tdrFieldSourceSchema>

/** Per-field wrapper with provenance (JDM Technical Data Report). */
export function tdrFieldSchema<T extends z.ZodType>(valueSchema: T) {
  return z.object({
    value: valueSchema.optional(),
    coverage: tdrFieldCoverageSchema,
    source: tdrFieldSourceSchema,
    confidence: z.number().min(0).max(1).optional(),
    notes: z.string().optional(),
  })
}

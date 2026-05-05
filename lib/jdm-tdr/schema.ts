import { z } from "zod"

import { tdrFieldSchema } from "./coverage"

const strField = tdrFieldSchema(z.string())
const numField = tdrFieldSchema(z.number())

/** Section 0-1: manufacturer and vehicle identification. */
export const jdmTdrSectionManufacturerSchema = z.object({
  manufacturerNameAndAddress: strField,
  makeTradeName: strField,
  vehicleTypeVariantVersion: strField,
  ecTypeApprovalNumber: strField,
  vin: strField,
})

/** Section P.*: engine and drivetrain. */
export const jdmTdrSectionEngineSchema = z.object({
  p1_engineDisplacementCc: numField,
  p2_maxNetPowerKw: numField,
  p3_fuelType: strField,
  p4_engineCode: strField,
  p5_numberOfCylinders: numField,
  p6_maxEngineSpeedRpm: numField,
})

/** Section V.*: emissions and fuel consumption (strong MLIT coverage). */
export const jdmTdrSectionEmissionsSchema = z.object({
  v7_co2WltcCombinedGPerKm: numField,
  v7_co2Jc08GPerKm: numField,
  v9_noxGPerKm: numField,
  euroEmissionStandardEquivalent: strField,
  v2_coGPerKm: numField,
  v4_hcGPerKm: numField,
  v8_pmGPerKm: numField,
  v1_fuelConsumptionCombinedLPer100Km: numField,
})

/** Section L, G, F.*: dimensions, mass, and axles. */
export const jdmTdrSectionDimensionsSchema = z.object({
  l_wheelbaseMm: numField,
  g_kerbWeightKg: numField,
  f1_maxPermissibleMassKg: numField,
  f2_axleLoadsKg: strField,
})

/** Section U.*, 52, 53: noise, tyres, and safety. */
export const jdmTdrSectionNoiseTyresSafetySchema = z.object({
  u1_stationaryNoiseDbA: numField,
  u2_driveByNoiseDbA: numField,
  field52_tyreSizesSpeedRatings: strField,
  field53_towingCapacity: strField,
})

/** Section K and related admin fields (mostly absent from MLIT bulk). */
export const jdmTdrSectionAdminSchema = z.object({
  k_typeApprovalNumber: strField,
  manufacturerSignatureStamp: strField,
  placeAndDateOfIssue: strField,
})

export const jdmTechnicalDataReportSchema = z.object({
  schemaVersion: z.literal("1.0"),
  /** Ireland-first framing; extend to uk | eu without changing field layout. */
  market: z.enum(["ie", "uk", "eu"]).default("ie"),
  documentTitle: z.literal("JDM Technical Data Report"),
  generatedAt: z.iso.datetime().optional(),
  disclaimers: z
    .object({
      notManufacturerCoc: z.boolean(),
      notLegalAdvice: z.boolean(),
    })
    .optional(),
  sections: z.object({
    manufacturerAndIdentification: jdmTdrSectionManufacturerSchema,
    engine: jdmTdrSectionEngineSchema,
    emissionsAndConsumption: jdmTdrSectionEmissionsSchema,
    dimensionsMassAxles: jdmTdrSectionDimensionsSchema,
    noiseTyresSafety: jdmTdrSectionNoiseTyresSafetySchema,
    adminAndConformity: jdmTdrSectionAdminSchema,
  }),
})

export type JdmTechnicalDataReport = z.infer<typeof jdmTechnicalDataReportSchema>

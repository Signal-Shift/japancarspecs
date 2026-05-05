import type { JdmTechnicalDataReport } from "./schema"

const missing = {
  coverage: "missing" as const,
  source: "none" as const,
}

const na = {
  coverage: "not_applicable" as const,
  source: "none" as const,
}

const admin = {
  coverage: "admin_only" as const,
  source: "service_generated" as const,
}

/** Contract preview: all MLIT-heavy fields marked missing until gateway is live. */
export function createStubJdmTechnicalDataReport(): JdmTechnicalDataReport {
  return {
    schemaVersion: "1.0",
    market: "ie",
    documentTitle: "JDM Technical Data Report",
    disclaimers: {
      notManufacturerCoc: true,
      notLegalAdvice: true,
    },
    sections: {
      manufacturerAndIdentification: {
        manufacturerNameAndAddress: { ...missing },
        makeTradeName: { ...missing },
        vehicleTypeVariantVersion: { ...missing },
        ecTypeApprovalNumber: { ...missing },
        vin: { ...na, notes: "Per-vehicle; supply at order time when automation is live." },
      },
      engine: {
        p1_engineDisplacementCc: { ...missing },
        p2_maxNetPowerKw: { ...missing },
        p3_fuelType: { ...missing },
        p4_engineCode: { ...missing },
        p5_numberOfCylinders: { ...missing },
        p6_maxEngineSpeedRpm: { ...missing },
      },
      emissionsAndConsumption: {
        v7_co2WltcCombinedGPerKm: { ...missing },
        v7_co2Jc08GPerKm: { ...missing },
        v9_noxGPerKm: { ...missing },
        euroEmissionStandardEquivalent: { ...missing },
        v2_coGPerKm: { ...missing },
        v4_hcGPerKm: { ...missing },
        v8_pmGPerKm: { ...missing },
        v1_fuelConsumptionCombinedLPer100Km: { ...missing },
      },
      dimensionsMassAxles: {
        l_wheelbaseMm: { ...missing },
        g_kerbWeightKg: { ...missing },
        f1_maxPermissibleMassKg: { ...missing },
        f2_axleLoadsKg: { ...missing },
      },
      noiseTyresSafety: {
        u1_stationaryNoiseDbA: { ...missing },
        u2_driveByNoiseDbA: { ...missing },
        field52_tyreSizesSpeedRatings: { ...missing },
        field53_towingCapacity: { ...missing },
      },
      adminAndConformity: {
        k_typeApprovalNumber: { ...missing },
        manufacturerSignatureStamp: { ...missing },
        placeAndDateOfIssue: {
          ...admin,
          notes: "Issued by JapanCarSpecs service layer when report is finalised.",
        },
      },
    },
  }
}

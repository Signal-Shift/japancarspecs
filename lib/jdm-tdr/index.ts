export {
  tdrFieldCoverageSchema,
  tdrFieldSourceSchema,
  tdrFieldSchema,
  type TdrFieldCoverage,
  type TdrFieldSource,
} from "./coverage"

export {
  jdmTechnicalDataReportSchema,
  jdmTdrSectionAdminSchema,
  jdmTdrSectionDimensionsSchema,
  jdmTdrSectionEmissionsSchema,
  jdmTdrSectionEngineSchema,
  jdmTdrSectionManufacturerSchema,
  jdmTdrSectionNoiseTyresSafetySchema,
  type JdmTechnicalDataReport,
} from "./schema"

export { createStubJdmTechnicalDataReport } from "./stub-report"

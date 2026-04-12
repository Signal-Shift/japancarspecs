import type { ReportFormData } from "@/lib/types"

// Placeholder — will be replaced with real AWS API Gateway call
export async function submitReportRequest(data: ReportFormData) {
  console.log("Submitting report request:", data)
  // TODO: POST to AWS API Gateway endpoint
  return { success: true, checkoutUrl: "https://stripe.com" }
}

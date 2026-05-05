import { NextResponse } from "next/server"

import {
  createStubJdmTechnicalDataReport,
  jdmTechnicalDataReportSchema,
} from "@/lib/jdm-tdr"
import { findActiveApiKeyOrg, parseBearerToken } from "@/lib/validate-api-key"
import { prisma } from "@/lib/prisma"

/**
 * Contract stub: validates API keys, increments usage, returns a typed
 * JDM TDR-shaped payload. No call to MLIT or an external report gateway.
 */
export async function POST(req: Request) {
  const token = parseBearerToken(req.headers.get("authorization"))
  if (!token?.startsWith("jcs_live_")) {
    return NextResponse.json(
      { error: "Missing or invalid Bearer API key." },
      { status: 401 }
    )
  }

  const keyRow = await findActiveApiKeyOrg(token)
  if (!keyRow) {
    return NextResponse.json({ error: "Invalid API key." }, { status: 401 })
  }

  await prisma.usageCounter.upsert({
    where: { organizationId: keyRow.organizationId },
    create: {
      organizationId: keyRow.organizationId,
      reportApiCalls: 1,
    },
    update: {
      reportApiCalls: { increment: 1 },
    },
  })

  let body: { market?: "ie" | "uk" | "eu"; chassisHint?: string } = {}
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  const stub = createStubJdmTechnicalDataReport()
  if (body.market === "uk" || body.market === "eu") {
    stub.market = body.market
  }
  if (typeof body.chassisHint === "string" && body.chassisHint.trim()) {
    stub.sections.manufacturerAndIdentification.vin = {
      value: body.chassisHint.trim(),
      coverage: "not_applicable",
      source: "importer_supplied",
      notes: "Importer-supplied hint; not verified against MLIT bulk data.",
    }
  }

  stub.generatedAt = new Date().toISOString()

  const parsed = jdmTechnicalDataReportSchema.safeParse(stub)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Internal schema validation failed." },
      { status: 500 }
    )
  }

  return NextResponse.json({
    status: "stub",
    message:
      "Report gateway not connected. Payload demonstrates the JDM Technical Data Report JSON contract.",
    organizationId: keyRow.organizationId,
    report: parsed.data,
  })
}

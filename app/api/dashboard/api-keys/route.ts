import { NextResponse } from "next/server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { generateApiKeyPair, hashApiKey } from "@/lib/api-key-crypto"

export async function GET() {
  const session = await auth()
  if (!session?.user?.orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const keys = await prisma.apiKey.findMany({
    where: { organizationId: session.user.orgId, revokedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      prefix: true,
      label: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ keys })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let label: string | undefined
  try {
    const body = await req.json().catch(() => ({}))
    if (typeof body?.label === "string" && body.label.trim().length > 0) {
      label = body.label.trim().slice(0, 80)
    }
  } catch {
    label = undefined
  }

  const { full, prefix } = generateApiKeyPair()
  const keyHash = hashApiKey(full)

  const row = await prisma.apiKey.create({
    data: {
      organizationId: session.user.orgId,
      keyHash,
      prefix,
      label: label ?? null,
    },
    select: { id: true, prefix: true, createdAt: true },
  })

  return NextResponse.json({
    id: row.id,
    prefix: row.prefix,
    createdAt: row.createdAt,
    apiKey: full,
    message:
      "Store this secret now; we only keep a hash and cannot show it again.",
  })
}

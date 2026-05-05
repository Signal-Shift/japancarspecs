import { NextResponse } from "next/server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

type RouteParams = { params: Promise<{ id: string }> }

export async function DELETE(_req: Request, context: RouteParams) {
  const session = await auth()
  if (!session?.user?.orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await context.params
  const key = await prisma.apiKey.findFirst({
    where: {
      id,
      organizationId: session.user.orgId,
      revokedAt: null,
    },
  })

  if (!key) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.apiKey.update({
    where: { id: key.id },
    data: { revokedAt: new Date() },
  })

  return new NextResponse(null, { status: 204 })
}

import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { slugifyOrganizationName } from "@/lib/org-slug"

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
  name: z.string().max(120).optional(),
  organizationName: z.string().min(1).max(120),
})

async function uniqueOrganizationSlug(base: string): Promise<string> {
  let slug = base
  let n = 0
  while (await prisma.organization.findUnique({ where: { slug } })) {
    n += 1
    slug = `${base}-${n}`
  }
  return slug
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input.", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { email, password, name, organizationName } = parsed.data
  const normalizedEmail = email.toLowerCase().trim()

  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  })
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    )
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const slugBase = slugifyOrganizationName(organizationName)
  const slug = await uniqueOrganizationSlug(slugBase)

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: normalizedEmail,
        name: name?.trim() || null,
        passwordHash,
      },
    })
    const org = await tx.organization.create({
      data: {
        name: organizationName.trim(),
        slug,
      },
    })
    await tx.organizationMember.create({
      data: {
        organizationId: org.id,
        userId: user.id,
        role: "owner",
      },
    })
    await tx.usageCounter.create({
      data: {
        organizationId: org.id,
      },
    })
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}

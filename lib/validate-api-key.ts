import { prisma } from "@/lib/prisma"
import { hashApiKey } from "@/lib/api-key-crypto"

export async function findActiveApiKeyOrg(bearerSecret: string) {
  const hash = hashApiKey(bearerSecret)
  return prisma.apiKey.findFirst({
    where: { keyHash: hash, revokedAt: null },
    include: { organization: { select: { id: true, name: true, slug: true } } },
  })
}

export function parseBearerToken(authHeader: string | null): string | null {
  if (!authHeader?.startsWith("Bearer ")) return null
  return authHeader.slice(7).trim()
}

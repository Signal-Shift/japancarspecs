import { createHash, randomBytes } from "node:crypto"

/** Full bearer secret shown once; prefix is safe to display in dashboards. */
export function generateApiKeyPair(): { full: string; prefix: string } {
  const raw = randomBytes(24).toString("base64url")
  const full = `jcs_live_${raw}`
  const prefix = full.slice(0, 18)
  return { full, prefix }
}

export function hashApiKey(secret: string): string {
  return createHash("sha256").update(secret, "utf8").digest("hex")
}

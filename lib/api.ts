import type { ReportFormData } from "@/lib/types"

export type SubmitReportResult =
  | { success: true; checkoutUrl: string }
  | { success: false; error: string }

const DEFAULT_FETCH_TIMEOUT_MS = 15_000

const DEFAULT_ALLOWED_CHECKOUT_HOSTS = [
  "checkout.stripe.com",
  "buy.stripe.com",
] as const

function getAllowedCheckoutHosts(): string[] {
  const fromEnv =
    process.env.NEXT_PUBLIC_CHECKOUT_REDIRECT_HOSTS?.split(",")
      .map((h) => h.trim().toLowerCase())
      .filter(Boolean) ?? []
  const devOnly =
    process.env.NODE_ENV !== "production" ? (["stripe.com"] as const) : []
  return [...DEFAULT_ALLOWED_CHECKOUT_HOSTS, ...devOnly, ...fromEnv]
}

/** Only https URLs on an allowlisted host may be used for redirect. */
export function isAllowedCheckoutUrl(raw: string): boolean {
  try {
    const u = new URL(raw)
    if (u.protocol !== "https:") return false
    const host = u.hostname.toLowerCase()
    return getAllowedCheckoutHosts().some(
      (allowed) => host === allowed || host.endsWith(`.${allowed}`)
    )
  } catch {
    return false
  }
}

function isAbortError(e: unknown): boolean {
  if (e instanceof DOMException && e.name === "AbortError") return true
  if (e instanceof Error && e.name === "AbortError") return true
  return false
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

function parseCheckoutJson(raw: unknown): { checkoutUrl?: string; message?: string } | null {
  if (!raw || typeof raw !== "object") return null
  const o = raw as Record<string, unknown>
  const checkoutUrl =
    typeof o.checkoutUrl === "string" ? o.checkoutUrl : undefined
  const message = typeof o.message === "string" ? o.message : undefined
  return { checkoutUrl, message }
}

/**
 * Starts checkout: calls `NEXT_PUBLIC_CHECKOUT_API_URL` when set, otherwise
 * returns a dev placeholder. Timeouts and HTTP errors map to safe user copy.
 */
export async function submitReportRequest(
  data: ReportFormData
): Promise<SubmitReportResult> {
  const apiUrl = process.env.NEXT_PUBLIC_CHECKOUT_API_URL?.trim()

  if (!apiUrl) {
    const devUrl = "https://stripe.com"
    if (!isAllowedCheckoutUrl(devUrl)) {
      return {
        success: false,
        error: "Checkout is not configured correctly. Please contact support.",
      }
    }
    return { success: true, checkoutUrl: devUrl }
  }

  try {
    const res = await fetchWithTimeout(
      apiUrl,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
      DEFAULT_FETCH_TIMEOUT_MS
    )

    const json = parseCheckoutJson(await res.json().catch(() => null))

    if (res.ok && json?.checkoutUrl) {
      if (!isAllowedCheckoutUrl(json.checkoutUrl)) {
        return {
          success: false,
          error:
            "Checkout could not be started securely. Please contact support.",
        }
      }
      return { success: true, checkoutUrl: json.checkoutUrl }
    }

    if (res.status >= 400 && res.status < 500) {
      return {
        success: false,
        error:
          json?.message ??
          "We couldn’t start checkout with these details. Check the form and try again.",
      }
    }

    if (res.status >= 500) {
      return {
        success: false,
        error:
          "Our checkout service is temporarily unavailable. Please try again in a few minutes.",
      }
    }

    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  } catch (e) {
    if (isAbortError(e)) {
      return {
        success: false,
        error:
          "The request took too long. Check your connection and try again.",
      }
    }
    return {
      success: false,
      error:
        "We couldn’t reach our servers. Check your connection and try again.",
    }
  }
}

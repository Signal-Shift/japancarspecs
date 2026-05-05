"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ApiKeyRow = {
  id: string
  prefix: string
  label: string | null
  createdAt: string
}

export function DashboardApiKeys() {
  const [keys, setKeys] = React.useState<ApiKeyRow[] | null>(null)
  const [loadError, setLoadError] = React.useState<string | null>(null)
  const [label, setLabel] = React.useState("")
  const [newKeySecret, setNewKeySecret] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  async function refresh() {
    setLoadError(null)
    try {
      const res = await fetch("/api/dashboard/api-keys")
      if (!res.ok) throw new Error()
      const data = (await res.json()) as { keys: ApiKeyRow[] }
      setKeys(data.keys)
    } catch {
      setLoadError("Could not load API keys.")
    }
  }

  React.useEffect(() => {
    void refresh()
  }, [])

  async function createKey() {
    setPending(true)
    setNewKeySecret(null)
    try {
      const res = await fetch("/api/dashboard/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: label.trim() || undefined }),
      })
      const data = (await res.json()) as { apiKey?: string; error?: string }
      if (!res.ok) {
        setLoadError(data.error ?? "Could not create key.")
        setPending(false)
        return
      }
      if (data.apiKey) setNewKeySecret(data.apiKey)
      setLabel("")
      await refresh()
    } catch {
      setLoadError("Could not create key.")
    }
    setPending(false)
  }

  async function revokeKey(id: string) {
    if (!confirm("Revoke this key? Integrations using it will stop working.")) {
      return
    }
    await fetch(`/api/dashboard/api-keys/${id}`, { method: "DELETE" })
    await refresh()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">API keys</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Use a key as{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            Authorization: Bearer jcs_live_...
          </code>{" "}
          on{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            POST /api/v1/reports
          </code>
          . Keys are stored as hashes; the full secret is shown only once.
        </p>
      </div>

      {loadError ? (
        <p className="text-sm text-destructive" role="alert">
          {loadError}
        </p>
      ) : null}

      {newKeySecret ? (
        <div className="rounded-lg border border-primary/40 bg-primary/5 p-4">
          <p className="text-sm font-medium text-foreground">New key (copy now)</p>
          <p className="mt-2 break-all font-mono text-sm text-foreground">
            {newKeySecret}
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="key-label">Label (optional)</Label>
          <Input
            id="key-label"
            placeholder="e.g. production ERP"
            value={label}
            onChange={(ev) => setLabel(ev.target.value)}
          />
        </div>
        <Button
          type="button"
          className="rounded-md sm:shrink-0"
          disabled={pending}
          onClick={() => void createKey()}
        >
          {pending ? "Creating…" : "Create key"}
        </Button>
      </div>

      {keys === null ? (
        <p className="text-sm text-muted-foreground">Loading keys…</p>
      ) : keys.length === 0 ? (
        <p className="text-sm text-muted-foreground">No active keys yet.</p>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {keys.map((k) => (
            <li
              key={k.id}
              className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-sm text-foreground">{k.prefix}...</p>
                {k.label ? (
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                ) : null}
                <p className="text-xs text-muted-foreground">
                  Created {new Date(k.createdAt).toLocaleString()}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-md"
                onClick={() => void revokeKey(k.id)}
              >
                Revoke
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

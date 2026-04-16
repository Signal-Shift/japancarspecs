/**
 * Static manufacturer → models map. Expand or replace with generated data as needed.
 *
 * API-ready: when you have a backend, fetch JSON from a Route Handler (e.g.
 * `GET /api/vehicles/catalog`) and pass the result into components as props, or
 * hydrate from a server component — keep the same shape (`Record<string, string[]>`).
 */
export const VEHICLE_CATALOG: Record<string, readonly string[]> = {
  Honda: [
    "Accord",
    "Civic",
    "CR-X",
    "Integra",
    "NSX",
    "Prelude",
    "S2000",
  ],
  Mazda: ["323", "626", "MX-5 Miata", "RX-7", "RX-8", "Roadster"],
  Mitsubishi: [
    "3000GT",
    "Eclipse",
    "Galant",
    "GTO",
    "Lancer Evolution",
    "Starion",
  ],
  Nissan: [
    "180SX",
    "240SX",
    "300ZX",
    "Fairlady Z",
    "GT-R",
    "Silvia",
    "Skyline",
  ],
  Subaru: ["BRZ", "Forester", "Impreza", "Legacy", "WRX"],
  Suzuki: ["Cappuccino", "Samurai", "Swift"],
  Toyota: [
    "86",
    "AE86",
    "Celica",
    "Chaser",
    "Corolla",
    "Crown",
    "MR2",
    "Soarer",
    "Supra",
  ],
}

function sortedUnique(items: string[]): string[] {
  return [...new Set(items)].sort((a, b) => a.localeCompare(b))
}

function catalogModelsForMake(make: string): string[] {
  const key = make.trim()
  if (!key || !(key in VEHICLE_CATALOG)) return []
  return [...VEHICLE_CATALOG[key]]
}

/** Sorted makes from the static catalog (dropdown source for hero / default lists). */
export function getMakeOptions(): string[] {
  return sortedUnique(Object.keys(VEHICLE_CATALOG))
}

/**
 * Models for a manufacturer. Unknown `make` returns only `extraModel` if provided
 * (supports deep links with values not yet in the catalog).
 */
export function getModelOptions(make: string, extraModel?: string): string[] {
  const base = catalogModelsForMake(make)
  const ex = extraModel?.trim()
  if (ex && !base.includes(ex)) return sortedUnique([...base, ex])
  return sortedUnique(base)
}

/**
 * Make list including `currentMake` when it is not in the catalog (URL prefill / legacy links).
 */
export function getMakeOptionsWithCurrent(currentMake: string): string[] {
  const base = Object.keys(VEHICLE_CATALOG)
  const cur = currentMake.trim()
  if (cur && !base.includes(cur)) return sortedUnique([...base, cur])
  return sortedUnique(base)
}

/**
 * Model list for the selected make, including `currentModel` when not in the catalog.
 */
export function getModelOptionsWithCurrent(
  make: string,
  currentModel: string
): string[] {
  const base = catalogModelsForMake(make)
  const cur = currentModel.trim()
  if (cur && !base.includes(cur)) return sortedUnique([...base, cur])
  return sortedUnique(base)
}

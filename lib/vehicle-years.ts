/** Model years offered in report + hero search (current year back 40 years). */
export function getModelYearOptions(): string[] {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 40 }, (_, i) => String(currentYear - i))
}

export function isValidModelYear(value: string): boolean {
  return getModelYearOptions().includes(value)
}

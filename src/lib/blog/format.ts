// Date and reading-time formatting. Written by hand (no toLocaleDateString), so the server and
// every runtime print exactly the same text.

const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

/** "2026-11-24" -> "24 de novembro de 2026" */
export function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return `${day} de ${MONTHS[month - 1]} de ${year}`
}

/** "2026-11-24" -> "24 nov 2026" */
export function formatShortDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return `${day} ${MONTHS[month - 1].slice(0, 3)} ${year}`
}

/** About 200 words per minute, at least one. */
export const readingMinutes = (wordCount: number) => Math.max(1, Math.round(wordCount / 200))

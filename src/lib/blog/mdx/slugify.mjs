// Heading ids for the blog. Shared by the MDX compiler (plugins.mjs) and the table of contents
// (src/lib/blog/content.ts), so both produce the same anchor for the same heading.

/** "Quanto custa o projeto?" -> "quanto-custa-o-projeto" */
export function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** A slugger for one document: repeated headings get -2, -3... */
export function createSlugger() {
  const seen = new Map()
  return (text) => {
    const base = slugify(text) || 'secao'
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    return count === 0 ? base : `${base}-${count + 1}`
  }
}

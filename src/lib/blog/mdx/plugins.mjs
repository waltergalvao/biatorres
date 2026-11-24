// MDX plugins for the blog, loaded by next.config.mjs. Plain .mjs because next.config imports it.

import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import { createSlugger } from './slugify.mjs'

/** Text content of a hast node. */
function textOf(node) {
  if (node.type === 'text') return node.value
  return (node.children ?? []).map(textOf).join('')
}

/**
 * Gives every h2 and h3 an id (from its text, without accents), so the table of contents and
 * shared links can point at a section. src/lib/blog/content.ts builds the same ids from the
 * Markdown source with the same slugger.
 */
function rehypeHeadingIds() {
  return (tree) => {
    const slug = createSlugger()
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'h2' && node.tagName !== 'h3') return
      const id = slug(textOf(node))
      node.properties ??= {}
      node.properties.id ??= id
    })
  }
}

export const remarkPlugins = [remarkGfm]
export const rehypePlugins = [rehypeHeadingIds]

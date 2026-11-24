// Reads a post's MDX source and derives what the HTML page can't give us directly: the plain
// Markdown body (for /blog/<slug>.md and /llms-full.txt), the FAQ (for FAQPage JSON-LD), the
// sections (table of contents) and the word count.

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'
import { SITE_URL } from '@/lib/site'
import { POSTS_DIR } from './articles'
import { createSlugger } from './mdx/slugify.mjs'

export interface FaqItem {
  question: string
  answer: string
}

export interface Section {
  id: string
  title: string
}

export interface ArticleContent {
  /** The body as plain Markdown: no import/export lines, components turned into Markdown. */
  markdown: string
  /** Questions under "## Perguntas frequentes" (### question + answer). */
  faq: FaqItem[]
  /** The article's h2 headings, with the ids the page gives them. */
  sections: Section[]
  wordCount: number
}

/** The FAQ section's exact heading. The writing skill requires it. */
export const FAQ_HEADING = 'Perguntas frequentes'

/** MDX components that become a labelled quote in the Markdown version. */
const CALLOUT_LABELS: Record<string, string> = {
  RespostaRapida: 'Resposta rápida',
}

/** Loosely typed mdast/MDX node (the MDX node types come from module augmentations). */
interface Node {
  type: string
  depth?: number
  name?: string | null
  children?: Node[]
  position?: { start: { offset?: number }; end: { offset?: number } }
}

type Root = Node & { children: Node[] }

const textOf = (node: Node) => toString(node as Parameters<typeof toString>[0])

function offsets(node: Node | undefined) {
  const start = node?.position?.start.offset
  const end = node?.position?.end.offset
  return start === undefined || end === undefined ? undefined : { start, end }
}

function quote(text: string) {
  return text
    .trim()
    .split('\n')
    .map((line) => (line.trim() ? `> ${line}` : '>'))
    .join('\n')
}

/**
 * Turns the post's MDX into clean Markdown while keeping the original text: drops the ESM block
 * (import/export), replaces JSX components with their content, and makes site links absolute
 * so the text still points at the right pages when read outside the site.
 */
function mdxToMarkdown(source: string, tree: Root) {
  const edits: { start: number; end: number; text: string }[] = []

  visit(tree as never, (node: Node) => {
    const range = offsets(node)
    if (!range) return

    if (node.type === 'mdxjsEsm') {
      edits.push({ ...range, text: '' })
      return 'skip'
    }

    if (node.type === 'mdxJsxFlowElement') {
      const children = node.children ?? []
      const first = offsets(children[0])
      const last = offsets(children[children.length - 1])
      const inner = first && last ? source.slice(first.start, last.end) : ''
      const label = node.name ? CALLOUT_LABELS[node.name] : undefined
      edits.push({ ...range, text: !inner ? '' : label ? quote(`**${label}:** ${inner}`) : inner })
      return 'skip'
    }
  })

  let output = source
  for (const { start, end, text } of edits.sort((a, b) => b.start - a.start)) {
    output = output.slice(0, start) + text + output.slice(end)
  }
  return output
    .replace(/\]\(\//g, `](${SITE_URL}/`) // [text](/servicos/x) -> absolute URL
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function extractFaq(tree: Root): FaqItem[] {
  const items: FaqItem[] = []
  let inFaq = false
  let current: { question: string; parts: string[] } | undefined

  const flush = () => {
    if (current && current.parts.length > 0) {
      items.push({ question: current.question, answer: current.parts.join('\n\n').trim() })
    }
    current = undefined
  }

  for (const node of tree.children) {
    if (node.type === 'heading' && (node.depth ?? 0) <= 2) {
      flush()
      inFaq = node.depth === 2 && textOf(node).trim().toLowerCase() === FAQ_HEADING.toLowerCase()
      continue
    }
    if (!inFaq) continue
    if (node.type === 'heading' && node.depth === 3) {
      flush()
      current = { question: textOf(node).trim(), parts: [] }
      continue
    }
    if (current && node.type !== 'thematicBreak' && node.type !== 'mdxjsEsm') {
      const text = textOf(node).trim()
      if (text) current.parts.push(text)
    }
  }

  flush()
  return items
}

/** h2 sections with the same ids the MDX compiler gives them (see mdx/plugins.mjs). */
function extractSections(tree: Root): Section[] {
  const slug = createSlugger()
  const sections: Section[] = []
  visit(tree as never, 'heading', (node: Node) => {
    if (node.depth !== 2 && node.depth !== 3) return
    const title = textOf(node).trim()
    const id = slug(title)
    if (node.depth === 2) sections.push({ id, title })
  })
  return sections
}

function countWords(tree: Root) {
  return tree.children
    .filter((node) => node.type !== 'mdxjsEsm')
    .map(textOf)
    .join(' ')
    .split(/\s+/)
    .filter((word) => /[0-9A-Za-zÀ-ÿ]/.test(word)).length
}

const cache = new Map<string, Promise<ArticleContent>>()

async function load(slug: string): Promise<ArticleContent> {
  const file = path.join(process.cwd(), POSTS_DIR, slug, 'page.mdx')
  const source = (await readFile(file, 'utf8')).replace(/\r\n/g, '\n')
  const tree = remark().use(remarkMdx).use(remarkGfm).parse(source) as unknown as Root
  return {
    markdown: mdxToMarkdown(source, tree),
    faq: extractFaq(tree),
    sections: extractSections(tree),
    wordCount: countWords(tree),
  }
}

export function getArticleContent(slug: string): Promise<ArticleContent> {
  if (process.env.NODE_ENV !== 'production') return load(slug)
  if (!cache.has(slug)) cache.set(slug, load(slug))
  return cache.get(slug)!
}

// Blog articles: the one place the rest of the site reads posts from
// (sitemap, llms.txt, RSS, related links). The exported names and types are the contract.
//
// Each post is an MDX page at src/app/blog/(posts)/<slug>/page.mdx that exports an `article`
// object with the fields below. The folder name is the slug.
//
// Reads the posts folder from disk, so call it at build time (static pages and route handlers
// with `dynamic = 'force-static'`), not from a request-time function.

import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { isCategory } from './categories'

export interface Article {
  title: string
  /** 140 to 160 characters: used for <meta description>, OG and listings. */
  description: string
  /** Publication date, YYYY-MM-DD. */
  date: string
  /** Last meaningful content revision, YYYY-MM-DD. */
  updated?: string
  /** Category slug (see categories). */
  category: string
  /** Cover image path under /public, e.g. /images/blog/<slug>.jpg */
  image: string
  imageAlt: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

/** Where the posts live, relative to the project root. */
export const POSTS_DIR = path.join('src', 'app', 'blog', '(posts)')

const DATE = /^\d{4}-\d{2}-\d{2}$/
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Fails the build with a clear message instead of publishing a broken post. */
function validate(slug: string, article: Partial<Article> | undefined): asserts article is Article {
  const fail = (problem: string) => {
    throw new Error(`Blog post "${slug}" (${POSTS_DIR}/${slug}/page.mdx): ${problem}`)
  }
  if (!SLUG.test(slug)) fail('the folder name must be lowercase words separated by hyphens')
  if (!article) return fail('missing `export const article = { ... }`')
  for (const field of ['title', 'description', 'date', 'category', 'image', 'imageAlt'] as const) {
    if (typeof article[field] !== 'string' || !article[field]) fail(`missing \`${field}\``)
  }
  if (!DATE.test(article.date!)) fail('`date` must be YYYY-MM-DD')
  if (article.updated !== undefined && !DATE.test(article.updated)) fail('`updated` must be YYYY-MM-DD')
  if (article.updated && article.updated < article.date!) fail('`updated` is earlier than `date`')
  if (!isCategory(article.category!)) fail(`unknown category "${article.category}" (see src/lib/blog/categories.ts)`)
  if (!article.image!.startsWith('/')) fail('`image` must be a path under /public, e.g. /images/blog/<slug>.jpg')
  // The share image (src/lib/blog/og.ts) draws the cover with Satori, which reads JPEG and PNG only.
  if (!/\.(jpe?g|png)$/i.test(article.image!)) fail('`image` must be a .jpg or .png file (the share image reads no other format)')

  const length = article.description!.length
  if (length < 140 || length > 160) {
    console.warn(`[blog] "${slug}": description has ${length} characters (aim for 140 to 160).`)
  }
}

async function loadArticle(slug: string): Promise<ArticleWithSlug> {
  const mod = (await import(`../../app/blog/(posts)/${slug}/page.mdx`)) as { article?: Partial<Article> }
  validate(slug, mod.article)
  const { title, description, date, updated, category, image, imageAlt } = mod.article
  return { slug, title, description, date, ...(updated ? { updated } : {}), category, image, imageAlt }
}

async function loadAll(): Promise<ArticleWithSlug[]> {
  const entries = await readdir(path.join(process.cwd(), POSTS_DIR), { withFileTypes: true }).catch(() => [])
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name)
  const articles = await Promise.all(slugs.map(loadArticle))

  const titles = new Set<string>()
  for (const a of articles) {
    // The layout finds a post's slug by its title and date, so both must be unique together.
    const key = `${a.title}|${a.date}`
    if (titles.has(key)) throw new Error(`Blog: two posts share the title "${a.title}" and date ${a.date}`)
    titles.add(key)
  }

  return articles.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'pt-BR'))
}

let cached: Promise<ArticleWithSlug[]> | undefined

/** All published articles, newest first. */
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  // Re-read on every call in development, so a new post shows up without a restart.
  if (process.env.NODE_ENV !== 'production') return loadAll()
  cached ??= loadAll()
  return cached
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithSlug | undefined> {
  return (await getAllArticles()).find((a) => a.slug === slug)
}

/**
 * The post layout only receives the `article` object, not the URL. The slug is found by title
 * and date, so the MDX file doesn't need to repeat its own folder name.
 */
export async function findArticleSlug(article: Pick<Article, 'title' | 'date'>): Promise<string | undefined> {
  return (await getAllArticles()).find((a) => a.title === article.title && a.date === article.date)?.slug
}

/** "Leia também": same category first, then the most recent. */
export async function getRelatedArticles(slug: string, limit = 3): Promise<ArticleWithSlug[]> {
  const all = await getAllArticles()
  const current = all.find((a) => a.slug === slug)
  if (!current) return []
  const others = all.filter((a) => a.slug !== slug)
  const same = others.filter((a) => a.category === current.category)
  const rest = others.filter((a) => a.category !== current.category)
  return [...same, ...rest].slice(0, limit)
}

/** Date of the latest change to any article (for listings and feeds). */
export const lastModified = (a: Article) => a.updated ?? a.date

/** Public path of an article page. */
export const articlePath = (slug: string) => `/blog/${slug}`
/** Public path of an article's Markdown version (for AI assistants and agents). */
export const articleMarkdownPath = (slug: string) => `/blog/${slug}.md`

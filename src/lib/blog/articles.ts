// Blog articles: the one place the rest of the site reads posts from
// (sitemap, llms.txt, RSS, related links). The blog workstream fills in the
// implementation; the exported names and types are the contract.

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

/** All published articles, newest first. */
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  return []
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithSlug | undefined> {
  return (await getAllArticles()).find((a) => a.slug === slug)
}

/** Public path of an article page. */
export const articlePath = (slug: string) => `/blog/${slug}`
/** Public path of an article's Markdown version (for AI assistants and agents). */
export const articleMarkdownPath = (slug: string) => `/blog/${slug}.md`
